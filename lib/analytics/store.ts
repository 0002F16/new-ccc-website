import type { PoolClient } from 'pg'
import { databaseConfigured, query, transaction } from '@/lib/db'
import { getExperimentDefinition } from './experiments'
import type { AnalyticsGeo, ExperimentDefinition } from './types'
import type { ValidAnalyticsBatch } from './validation'

export type AnalyticsIdentity = { visitorId: string; sessionId: string }

function nullable(value: string | undefined) {
  return value || null
}

export async function ingestAnalyticsBatch(identity: AnalyticsIdentity, batch: ValidAnalyticsBatch, geo: AnalyticsGeo = {}) {
  return transaction(async (client) => {
    const attribution = batch.attribution
    await client.query(
      `INSERT INTO analytics_visitors (
        visitor_id, first_utm_source, first_utm_medium, first_utm_campaign,
        first_utm_content, first_utm_term, first_referrer_host
      ) VALUES ($1,$2,$3,$4,$5,$6,$7)
      ON CONFLICT (visitor_id) DO UPDATE SET last_seen_at = now()`,
      [
        identity.visitorId,
        nullable(attribution.utmSource),
        nullable(attribution.utmMedium),
        nullable(attribution.utmCampaign),
        nullable(attribution.utmContent),
        nullable(attribution.utmTerm),
        nullable(attribution.referrerHost),
      ],
    )
    await client.query(
      `INSERT INTO analytics_sessions (
        session_id, visitor_id, entry_path, device_bucket, viewport_width, viewport_height,
        utm_source, utm_medium, utm_campaign, utm_content, utm_term, referrer_host,
        country_code, subdivision_code, subdivision_name
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      ON CONFLICT (session_id) DO UPDATE SET last_seen_at = now()`,
      [
        identity.sessionId,
        identity.visitorId,
        batch.path,
        batch.device,
        batch.viewportWidth,
        batch.viewportHeight,
        nullable(attribution.utmSource),
        nullable(attribution.utmMedium),
        nullable(attribution.utmCampaign),
        nullable(attribution.utmContent),
        nullable(attribution.utmTerm),
        nullable(attribution.referrerHost),
        nullable(geo.countryCode),
        nullable(geo.subdivisionCode),
        nullable(geo.subdivisionName),
      ],
    )

    const accepted = await client.query(
      `INSERT INTO analytics_batches (batch_id, session_id) VALUES ($1,$2)
       ON CONFLICT (batch_id) DO NOTHING RETURNING batch_id`,
      [batch.batchId, identity.sessionId],
    )
    if (accepted.rowCount === 0) return false

    for (const event of batch.events) {
      await client.query(
        `INSERT INTO analytics_events (
          event_id, session_id, pageview_id, occurred_at, event_name, page_path,
          section_id, element_id, numeric_value, metric_name,
          experiment_id, experiment_version, variant_key
        ) VALUES ($1,$2,$3,to_timestamp($4 / 1000.0),$5,$6,$7,$8,$9,$10,$11,$12,$13)
        ON CONFLICT DO NOTHING`,
        [
          event.id,
          identity.sessionId,
          batch.pageviewId,
          event.timestamp,
          event.name,
          batch.path,
          nullable(event.sectionId),
          nullable(event.elementId),
          event.value ?? null,
          event.metricName ?? null,
          batch.experiment?.experimentId ?? null,
          batch.experiment?.version ?? null,
          batch.experiment?.variantKey ?? null,
        ],
      )
    }

    if (batch.experiment && batch.events.some((event) => event.name === 'experiment_exposure')) {
      await client.query(
        `INSERT INTO analytics_exposures (
          experiment_id, experiment_version, visitor_id, session_id, variant_key
        ) VALUES ($1,$2,$3,$4,$5)
        ON CONFLICT (experiment_id, experiment_version, visitor_id) DO NOTHING`,
        [
          batch.experiment.experimentId,
          batch.experiment.version,
          identity.visitorId,
          identity.sessionId,
          batch.experiment.variantKey,
        ],
      )
    }

    for (const bin of batch.heatmap) {
      if (!bin.sectionId) continue
      await client.query(
        `INSERT INTO analytics_heatmap_bins (
          session_id, page_path, section_id, device_bucket, experiment_id, variant_key,
          kind, grid_x, grid_y, sample_count, dwell_ms
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        ON CONFLICT (session_id, page_path, section_id, kind, grid_x, grid_y)
        DO UPDATE SET
          sample_count = analytics_heatmap_bins.sample_count + EXCLUDED.sample_count,
          dwell_ms = analytics_heatmap_bins.dwell_ms + EXCLUDED.dwell_ms,
          updated_at = now()`,
        [
          identity.sessionId,
          batch.path,
          bin.sectionId,
          batch.device,
          batch.experiment?.experimentId ?? '',
          batch.experiment?.variantKey ?? '',
          bin.kind,
          bin.x,
          bin.y,
          bin.count,
          bin.dwellMs,
        ],
      )
    }
    return true
  })
}

type ExperimentRow = {
  experiment_id: string
  version: number
  status: 'running' | 'paused' | 'ended'
  started_at: Date | null
  ended_at: Date | null
}

let experimentCache: { expires: number; definition: ExperimentDefinition | null } | null = null

export async function getActiveHomepageExperiment(): Promise<ExperimentDefinition | null> {
  if (!databaseConfigured()) return null
  if (experimentCache && experimentCache.expires > Date.now()) return experimentCache.definition
  try {
    const result = await query<ExperimentRow>(
      `SELECT experiment_id, version, status, started_at, ended_at
       FROM analytics_experiments WHERE page = 'homepage' AND status = 'running'
       ORDER BY updated_at DESC LIMIT 1`,
    )
    const row = result.rows[0]
    const definition = row ? getExperimentDefinition(row.experiment_id, row.version) ?? null : null
    experimentCache = { expires: Date.now() + 5_000, definition }
    return definition
  } catch (error) {
    console.error('Unable to load active experiment', error)
    return null
  }
}

export function clearExperimentCache() {
  experimentCache = null
}

export type DashboardMetric = {
  key: string
  label: string
  current: number
  previous: number | null
  format: 'count' | 'rate'
}

export function dashboardMetricDelta(item: DashboardMetric) {
  if (item.previous === null) return null
  if (item.format === 'rate') return { value: (item.current - item.previous) * 100, unit: 'pp' as const }
  if (item.previous === 0) return item.current === 0 ? { value: 0, unit: '%' as const } : null
  return { value: ((item.current - item.previous) / item.previous) * 100, unit: '%' as const }
}

export type DashboardFunnelStage = {
  key: string
  label: string
  sessions: number
  sessionRate: number
  stepRate: number
}

export type DashboardConversionRow = {
  label: string
  detail?: string
  sessions: number
  applications: number
  rate: number
}

export type DashboardGeoCountry = DashboardConversionRow & {
  countryCode: string
  regions: DashboardConversionRow[]
}

export type DashboardSectionRow = {
  label: string
  sessions: number
  rate: number
  dropoff: number | null
}

export type DashboardVital = {
  label: 'LCP' | 'CLS' | 'INP'
  value: number
  samples: number
}

export type DashboardOverview = {
  sessions: number
  headline: DashboardMetric[]
  funnel: DashboardFunnelStage[]
  sources: DashboardConversionRow[]
  geography: DashboardGeoCountry[]
  sections: DashboardSectionRow[]
  devices: DashboardConversionRow[]
  vitals: DashboardVital[]
  formFriction: { label: string; detail?: string; sessions: number }[]
  behavior: { label: string; sessions: number }[]
}

function number(value: unknown) {
  return Number(value || 0)
}

export async function getDashboardOverview(days: number): Promise<DashboardOverview> {
  if (!databaseConfigured()) {
    return {
      sessions: 0, headline: [], funnel: [], sources: [], geography: [], sections: [],
      devices: [], vitals: [], formFriction: [], behavior: [],
    }
  }
  const since = Math.max(1, Math.min(days, 90))
  type Totals = {
    sessions: string; progressed: string; apply_reached: string; application_started: string
    submit_attempted: string; applications: string
  }
  const eventWindow = `now() - ($1 || ' days')::interval`
  const [totals, previousDaily, sources, rawGeo, sectionCounts, devices, vitals, formFriction, behavior] = await Promise.all([
    query<Totals>(
      `WITH flags AS (
         SELECT s.session_id,
           bool_or(e.event_name = 'cta_click' OR (e.event_name = 'section_view' AND e.section_id IN ('two-situations','apply'))) progressed,
           bool_or(e.event_name = 'section_view' AND e.section_id = 'apply') apply_reached,
           bool_or(e.event_name = 'application_started') application_started,
           bool_or(e.event_name = 'application_submit_attempted') submit_attempted,
           bool_or(e.event_name = 'application_submitted') applications
         FROM analytics_sessions s
         LEFT JOIN analytics_events e ON e.session_id = s.session_id AND e.occurred_at >= ${eventWindow}
         WHERE s.started_at >= ${eventWindow}
         GROUP BY s.session_id
       ) SELECT count(*)::text sessions,
         count(*) FILTER (WHERE progressed)::text progressed,
         count(*) FILTER (WHERE apply_reached)::text apply_reached,
         count(*) FILTER (WHERE application_started)::text application_started,
         count(*) FILTER (WHERE submit_attempted)::text submit_attempted,
         count(*) FILTER (WHERE applications)::text applications
       FROM flags`, [since],
    ),
    query<{ event_name: string; section_id: string; sessions: string }>(
      `SELECT event_name, section_id, sum(unique_sessions)::text sessions
       FROM analytics_daily
       WHERE day >= current_date - ($1 * 2) AND day < current_date - $1
         AND (event_name IN ('page_view','application_started','application_submit_attempted','application_submitted')
           OR (event_name = 'section_view' AND section_id = 'apply'))
       GROUP BY event_name, section_id`, [since],
    ),
    query<{ label: string; detail: string; sessions: string; applications: string }>(
      `SELECT
         CASE
           WHEN nullif(s.utm_source,'') IS NOT NULL THEN s.utm_source || coalesce(' / ' || nullif(s.utm_medium,''), '')
           WHEN nullif(s.referrer_host,'') IS NOT NULL THEN s.referrer_host || ' / referral'
           ELSE 'Direct / none'
         END label,
         coalesce(nullif(s.utm_campaign,''), '') detail,
         count(*)::text sessions,
         count(*) FILTER (WHERE EXISTS (
           SELECT 1 FROM analytics_events e WHERE e.session_id = s.session_id
             AND e.event_name = 'application_submitted' AND e.occurred_at >= ${eventWindow}
         ))::text applications
       FROM analytics_sessions s WHERE s.started_at >= ${eventWindow}
       GROUP BY 1,2 ORDER BY count(*) DESC LIMIT 12`, [since],
    ),
    query<{ country_code: string; subdivision_code: string; subdivision_name: string; sessions: string; applications: string }>(
      `SELECT coalesce(country_code, '') country_code,
         coalesce(subdivision_code, '') subdivision_code,
         coalesce(subdivision_name, '') subdivision_name,
         count(*)::text sessions,
         count(*) FILTER (WHERE EXISTS (
           SELECT 1 FROM analytics_events e WHERE e.session_id = s.session_id
             AND e.event_name = 'application_submitted' AND e.occurred_at >= ${eventWindow}
         ))::text applications
       FROM analytics_sessions s WHERE s.started_at >= ${eventWindow}
       GROUP BY 1,2,3 ORDER BY count(*) DESC`, [since],
    ),
    query<{ label: string; sessions: string }>(
      `SELECT coalesce(section_id, 'unknown') label, count(DISTINCT session_id)::text sessions
       FROM analytics_events WHERE event_name = 'section_view' AND occurred_at >= ${eventWindow}
       GROUP BY 1`, [since],
    ),
    query<{ label: string; sessions: string; applications: string }>(
      `SELECT s.device_bucket label, count(*)::text sessions,
         count(*) FILTER (WHERE EXISTS (
           SELECT 1 FROM analytics_events e WHERE e.session_id = s.session_id
             AND e.event_name = 'application_submitted' AND e.occurred_at >= ${eventWindow}
         ))::text applications
       FROM analytics_sessions s WHERE s.started_at >= ${eventWindow}
       GROUP BY 1 ORDER BY count(*) DESC`, [since],
    ),
    query<{ label: 'LCP' | 'CLS' | 'INP'; value: number; samples: string }>(
      `SELECT metric_name label,
         percentile_cont(0.75) WITHIN GROUP (ORDER BY numeric_value)::float8 value,
         count(*)::text samples
       FROM analytics_events WHERE event_name = 'web_vital' AND occurred_at >= ${eventWindow}
       GROUP BY metric_name ORDER BY metric_name`, [since],
    ),
    query<{ label: string; detail: string; sessions: string }>(
      `SELECT event_name label, coalesce(element_id, 'unknown') detail,
         count(DISTINCT session_id)::text sessions
       FROM analytics_events
       WHERE event_name IN ('application_validation_failed','application_submit_failed')
         AND occurred_at >= ${eventWindow}
       GROUP BY 1,2 ORDER BY count(DISTINCT session_id) DESC`, [since],
    ),
    query<{ label: string; sessions: string }>(
      `SELECT event_name label, count(DISTINCT session_id)::text sessions
       FROM analytics_events WHERE event_name IN ('rage_click','dead_click','hesitation')
         AND occurred_at >= ${eventWindow}
       GROUP BY event_name ORDER BY event_name`, [since],
    ),
  ])

  const total = totals.rows[0] || {
    sessions: '0', progressed: '0', apply_reached: '0', application_started: '0',
    submit_attempted: '0', applications: '0',
  }
  const current = {
    sessions: number(total.sessions),
    progressed: number(total.progressed),
    applyReached: number(total.apply_reached),
    applicationStarted: number(total.application_started),
    submitAttempted: number(total.submit_attempted),
    applications: number(total.applications),
  }
  const previousValue = (eventName: string, sectionId = '') => {
    const rows = previousDaily.rows.filter((row) => row.event_name === eventName && row.section_id === sectionId)
    return rows.length ? rows.reduce((sum, row) => sum + number(row.sessions), 0) : null
  }
  const previousSessions = previousValue('page_view')
  const previousApplications = previousValue('application_submitted')
  const applicationRate = current.sessions ? current.applications / current.sessions : 0
  const previousRate = previousSessions && previousApplications !== null ? previousApplications / previousSessions : null

  const funnelValues = [
    ['sessions', 'Sessions', current.sessions],
    ['progressed', 'Progressed past hero', current.progressed],
    ['apply-reached', 'Apply section reached', current.applyReached],
    ['application-started', 'Application started', current.applicationStarted],
    ['submit-attempted', 'Submit attempted', current.submitAttempted],
    ['application-submitted', 'Application submitted', current.applications],
  ] as const

  const sectionOrder = ['hero', 'two-situations', 'bottlenecks', 'outcomes', 'faq', 'apply']
  const sectionMap = new Map(sectionCounts.rows.map((row) => [row.label, number(row.sessions)]))
  const sections: DashboardSectionRow[] = sectionOrder.map((label, index) => {
    const count = sectionMap.get(label) || 0
    const prior = index === 0 ? current.sessions : sectionMap.get(sectionOrder[index - 1]) || 0
    return {
      label,
      sessions: count,
      rate: current.sessions ? count / current.sessions : 0,
      dropoff: index === 0 || !prior ? null : Math.max(0, (prior - count) / prior),
    }
  })

  return {
    sessions: current.sessions,
    headline: [
      { key: 'sessions', label: 'Sessions', current: current.sessions, previous: previousSessions, format: 'count' },
      { key: 'apply-reached', label: 'Apply reached', current: current.applyReached, previous: previousValue('section_view', 'apply'), format: 'count' },
      { key: 'application-started', label: 'Application starts', current: current.applicationStarted, previous: previousValue('application_started'), format: 'count' },
      { key: 'applications', label: 'Applications', current: current.applications, previous: previousApplications, format: 'count' },
      { key: 'application-rate', label: 'Application rate', current: applicationRate, previous: previousRate, format: 'rate' },
    ],
    funnel: funnelValues.map(([key, label, count], index) => ({
      key,
      label,
      sessions: count,
      sessionRate: current.sessions ? count / current.sessions : 0,
      stepRate: index === 0 ? 1 : (funnelValues[index - 1][2] ? count / funnelValues[index - 1][2] : 0),
    })),
    sources: sources.rows.map((row) => {
      const sessions = number(row.sessions)
      const applications = number(row.applications)
      return { label: row.label, detail: row.detail || undefined, sessions, applications, rate: sessions ? applications / sessions : 0 }
    }),
    geography: groupDashboardGeography(rawGeo.rows),
    sections,
    devices: devices.rows.map((row) => {
      const sessions = number(row.sessions)
      const applications = number(row.applications)
      return { label: row.label, sessions, applications, rate: sessions ? applications / sessions : 0 }
    }),
    vitals: vitals.rows.map((row) => ({ label: row.label, value: number(row.value), samples: number(row.samples) })),
    formFriction: formFriction.rows.map((row) => ({ label: row.label, detail: row.detail, sessions: number(row.sessions) })),
    behavior: behavior.rows.map((row) => ({ label: row.label, sessions: number(row.sessions) })),
  }
}

type RawGeoRow = {
  country_code: string
  subdivision_code: string
  subdivision_name: string
  sessions: string
  applications: string
}

export function groupDashboardGeography(rows: RawGeoRow[], minimumRegionSessions = 5): DashboardGeoCountry[] {
  const countries = new Map<string, { sessions: number; applications: number; regions: DashboardConversionRow[]; lowSessions: number; lowApplications: number }>()
  for (const row of rows) {
    const countryCode = row.country_code || 'unknown'
    const country = countries.get(countryCode) || { sessions: 0, applications: 0, regions: [], lowSessions: 0, lowApplications: 0 }
    const sessions = number(row.sessions)
    const applications = number(row.applications)
    country.sessions += sessions
    country.applications += applications
    if (row.subdivision_name && sessions >= minimumRegionSessions) {
      country.regions.push({
        label: row.subdivision_name,
        detail: row.subdivision_code || undefined,
        sessions,
        applications,
        rate: sessions ? applications / sessions : 0,
      })
    } else if (row.subdivision_name || row.subdivision_code) {
      country.lowSessions += sessions
      country.lowApplications += applications
    }
    countries.set(countryCode, country)
  }
  return Array.from(countries, ([countryCode, value]) => {
    if (value.lowSessions) {
      value.regions.push({
        label: 'Other / low volume', sessions: value.lowSessions,
        applications: value.lowApplications,
        rate: value.lowSessions ? value.lowApplications / value.lowSessions : 0,
      })
    }
    value.regions.sort((a, b) => b.sessions - a.sessions)
    return {
      countryCode,
      label: countryCode,
      sessions: value.sessions,
      applications: value.applications,
      rate: value.sessions ? value.applications / value.sessions : 0,
      regions: value.regions,
    }
  }).sort((a, b) => b.sessions - a.sessions)
}

export type HeatmapLayout = 'mobile' | 'tablet' | 'desktop' | 'wide'
export type DashboardHeatmapBin = { x: number; y: number; sessions: number; dwellMs: number; value: number }
export type DashboardHeatmap = {
  bins: DashboardHeatmapBin[]
  viewers: number
  sampledSessions: number
  coverage: number
  peak: DashboardHeatmapBin | null
}

type RawHeatmapRow = { x: number; y: number; sessions: string; dwell_ms: string }

export function normalizeDashboardHeatmap(
  rows: RawHeatmapRow[],
  kind: 'move' | 'click',
  viewers: number,
  sampledSessions: number,
) {
  return rows.map((row): DashboardHeatmapBin => {
    const sessions = number(row.sessions)
    const dwellMs = number(row.dwell_ms)
    const value = kind === 'click'
      ? (viewers ? sessions / viewers : 0)
      : (sampledSessions ? dwellMs / 1000 / sampledSessions : 0)
    return { x: row.x, y: row.y, sessions, dwellMs, value }
  })
}

export async function getDashboardHeatmap(
  days: number,
  section: string,
  kind: 'move' | 'click',
  layout: HeatmapLayout,
  arm: 'all' | 'control' | 'treatment',
): Promise<DashboardHeatmap> {
  if (!databaseConfigured()) return { bins: [], viewers: 0, sampledSessions: 0, coverage: 0, peak: null }
  const ranges = { mobile: [1, 767], tablet: [768, 1023], desktop: [1024, 1279], wide: [1280, 10_000] } as const
  const values: unknown[] = [Math.max(1, Math.min(days, 30)), section, kind, ranges[layout][0], ranges[layout][1]]
  const filters: string[] = ['s.viewport_width BETWEEN $4 AND $5']
  if (arm !== 'all') {
    values.push(arm)
    filters.push(`h.variant_key = $${values.length}`)
  }
  const filterSql = `AND ${filters.join(' AND ')}`
  const viewerValues: unknown[] = [values[0], section, values[3], values[4]]
  const viewerFilters = ['s.viewport_width BETWEEN $3 AND $4']
  if (arm !== 'all') {
    viewerValues.push(arm)
    viewerFilters.push(`e.variant_key = $${viewerValues.length}`)
  }
  const [result, viewerResult] = await Promise.all([
    query<RawHeatmapRow>(
    `SELECT grid_x x, grid_y y, count(DISTINCT h.session_id)::text sessions, sum(dwell_ms)::text dwell_ms
     FROM analytics_heatmap_bins h
     JOIN analytics_sessions s ON s.session_id = h.session_id
     WHERE h.updated_at >= now() - ($1 || ' days')::interval
       AND h.section_id = $2 AND h.kind = $3 ${filterSql}
     GROUP BY grid_x, grid_y`, values,
    ),
    query<{ viewers: string }>(
      `SELECT count(DISTINCT e.session_id)::text viewers
       FROM analytics_events e JOIN analytics_sessions s ON s.session_id = e.session_id
       WHERE e.occurred_at >= now() - ($1 || ' days')::interval
         AND e.event_name = 'section_view' AND e.section_id = $2
         AND ${viewerFilters.join(' AND ')}`, viewerValues,
    ),
  ])
  const viewers = number(viewerResult.rows[0]?.viewers)
  const sampledSessions = result.rows.length
    ? await query<{ sessions: string }>(
      `SELECT count(DISTINCT h.session_id)::text sessions
       FROM analytics_heatmap_bins h JOIN analytics_sessions s ON s.session_id = h.session_id
       WHERE h.updated_at >= now() - ($1 || ' days')::interval
         AND h.section_id = $2 AND h.kind = $3 ${filterSql}`, values,
    ).then((rows) => number(rows.rows[0]?.sessions))
    : 0
  const bins = normalizeDashboardHeatmap(result.rows, kind, viewers, sampledSessions)
  const peak = bins.reduce<DashboardHeatmapBin | null>((best, bin) => !best || bin.value > best.value ? bin : best, null)
  return { bins, viewers, sampledSessions, coverage: viewers ? sampledSessions / viewers : 0, peak }
}

export type StoredExperiment = ExperimentRow & {
  name: string
  primary_event: string
  control_visitors: number
  control_conversions: number
  treatment_visitors: number
  treatment_conversions: number
}

export async function getStoredExperiments(): Promise<StoredExperiment[]> {
  if (!databaseConfigured()) return []
  const result = await query<ExperimentRow & { name: string; primary_event: string }>(
    `SELECT experiment_id, version, name, primary_event, status, started_at, ended_at
     FROM analytics_experiments ORDER BY updated_at DESC`,
  )
  const rows: StoredExperiment[] = []
  for (const experiment of result.rows) {
    const stats = await query<{ variant_key: string; visitors: string; conversions: string }>(
      `SELECT x.variant_key,
              count(*)::text visitors,
              count(*) FILTER (WHERE EXISTS (
                SELECT 1 FROM analytics_sessions s
                JOIN analytics_events e ON e.session_id = s.session_id
                WHERE s.visitor_id = x.visitor_id
                  AND e.event_name = $3
                  AND e.occurred_at >= x.exposed_at
              ))::text conversions
       FROM analytics_exposures x
       WHERE x.experiment_id = $1 AND x.experiment_version = $2
       GROUP BY x.variant_key`,
      [experiment.experiment_id, experiment.version, experiment.primary_event],
    )
    const control = stats.rows.find((row) => row.variant_key === 'control')
    const treatment = stats.rows.find((row) => row.variant_key === 'treatment')
    rows.push({
      ...experiment,
      control_visitors: number(control?.visitors),
      control_conversions: number(control?.conversions),
      treatment_visitors: number(treatment?.visitors),
      treatment_conversions: number(treatment?.conversions),
    })
  }
  return rows
}

export async function updateExperimentStatus(
  definition: ExperimentDefinition,
  action: 'start' | 'pause' | 'end',
) {
  await transaction(async (client: PoolClient) => {
    const existing = await client.query<{ status: 'running' | 'paused' | 'ended' }>(
      `SELECT status FROM analytics_experiments
       WHERE experiment_id = $1 AND version = $2 FOR UPDATE`,
      [definition.id, definition.version],
    )
    if (action === 'start' && existing.rows[0]?.status === 'ended') {
      throw new Error('Ended experiments require a new code-defined version')
    }
    if (action !== 'start' && !existing.rows[0]) {
      throw new Error('Experiment has not been started')
    }
    if (action === 'start') {
      await client.query(
        `UPDATE analytics_experiments SET status = 'paused', updated_at = now()
         WHERE page = $1 AND status = 'running'`, [definition.page],
      )
      await client.query(
        `INSERT INTO analytics_experiments (
          experiment_id, version, name, page, slot, primary_event, status, started_at
        ) VALUES ($1,$2,$3,$4,$5,$6,'running',now())
        ON CONFLICT (experiment_id, version) DO UPDATE SET
          status = 'running', started_at = coalesce(analytics_experiments.started_at, now()),
          ended_at = null, updated_at = now()`,
        [definition.id, definition.version, definition.name, definition.page, definition.slot, definition.primaryEvent],
      )
    } else {
      await client.query(
        `UPDATE analytics_experiments SET status = $3,
          ended_at = CASE WHEN $3 = 'ended' THEN now() ELSE ended_at END,
          updated_at = now()
         WHERE experiment_id = $1 AND version = $2`,
        [definition.id, definition.version, action === 'pause' ? 'paused' : 'ended'],
      )
    }
    await client.query(
      `INSERT INTO analytics_admin_audit (action, subject, details)
       VALUES ($1,$2,$3::jsonb)`,
      [`experiment.${action}`, definition.id, JSON.stringify({ version: definition.version })],
    )
  })
  clearExperimentCache()
}
