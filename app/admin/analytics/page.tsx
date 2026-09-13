import { cookies } from 'next/headers'
import { requireAdmin } from '@/lib/admin-auth'
import { AdminNav } from '../AdminNav'
import {
  getDashboardHeatmap,
  getDashboardOverview,
  getStoredExperiments,
  dashboardMetricDelta,
  type DashboardConversionRow,
  type DashboardMetric,
  type DashboardVital,
  type HeatmapLayout,
} from '@/lib/analytics/store'
import { EXPERIMENT_REGISTRY } from '@/lib/analytics/experiments'
import { compareConversions, experimentVerdict, wilsonInterval } from '@/lib/analytics/statistics'
import { HeatmapOverlay } from '@/components/analytics/HeatmapOverlay'

export const dynamic = 'force-dynamic'

const SECTIONS = ['hero', 'two-situations', 'bottlenecks', 'outcomes', 'faq', 'apply'] as const
const LAYOUTS = ['mobile', 'tablet', 'desktop', 'wide'] as const
const ARMS = ['all', 'control', 'treatment'] as const

function metric(value: number, suffix = '') {
  return `${new Intl.NumberFormat('en-GB', { maximumFractionDigits: 1 }).format(value)}${suffix}`
}

function duration(milliseconds: number) {
  const seconds = Math.max(0, Math.round(milliseconds / 1000))
  if (seconds < 60) return `${seconds}s`
  const minutes = Math.floor(seconds / 60)
  const remainder = seconds % 60
  if (minutes < 60) return remainder ? `${minutes}m ${remainder}s` : `${minutes}m`
  const hours = Math.floor(minutes / 60)
  return `${hours}h ${minutes % 60}m`
}

function readable(value: string) {
  return value.replaceAll('_', ' ').replaceAll('-', ' ')
}

function trendNote(item: DashboardMetric) {
  if (item.previous === null) return 'No prior-period data'
  if (item.previous === 0) return item.current === 0 ? 'No change vs previous period' : 'New activity vs previous period'
  const delta = dashboardMetricDelta(item)
  return delta ? `${delta.value >= 0 ? '+' : ''}${metric(delta.value, ` ${delta.unit}`)} vs previous period` : 'No prior-period data'
}

function MetricCard({ item }: { item: DashboardMetric }) {
  const positive = item.previous !== null && item.current >= item.previous
  return (
    <article className="rounded border border-line bg-surface p-card-m shadow-card md:p-card">
      <p className="text-label font-medium uppercase text-muted">{item.label}</p>
      <p className="mt-tight font-serif text-h2-m text-ink md:text-h2">
        {item.format === 'rate'
          ? metric(item.current * 100, '%')
          : item.format === 'duration' ? duration(item.current) : metric(item.current)}
      </p>
      <p className={`mt-tight text-caption ${item.previous === null ? 'text-muted' : positive ? 'text-accent' : 'text-body'}`}>
        {trendNote(item)}
      </p>
    </article>
  )
}

function Panel({ title, eyebrow, note, children }: { title: string; eyebrow: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-panel border border-line bg-surface p-card-m shadow-card md:p-card">
      <p className="text-micro font-medium uppercase text-accent">{eyebrow}</p>
      <h2 className="mt-tight font-serif text-h3-m text-ink md:text-h3">{title}</h2>
      {note && <p className="mt-tight max-w-text text-caption text-muted">{note}</p>}
      <div className="mt-flow">{children}</div>
    </section>
  )
}

function Empty() {
  return <p className="text-s text-muted">No data in this window yet.</p>
}

function ConversionTable({ rows, labelHeading = 'Source' }: { rows: DashboardConversionRow[]; labelHeading?: string }) {
  if (!rows.length) return <Empty />
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-s">
        <thead className="text-micro font-medium uppercase text-muted">
          <tr className="border-b border-line">
            <th className="pb-tight pr-tight font-medium">{labelHeading}</th>
            <th className="pb-tight text-right font-medium">Sessions</th>
            <th className="pb-tight text-right font-medium">Applications</th>
            <th className="pb-tight text-right font-medium">Rate</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.label}:${row.detail || ''}`} className="border-b border-line-soft last:border-0">
              <td className="py-tight pr-tight text-body">
                <span className="text-ink">{readable(row.label)}</span>
                {row.detail && <span className="mt-[2px] block text-caption text-muted">Campaign: {row.detail}</span>}
              </td>
              <td className="py-tight text-right tnum text-body">{row.sessions}</td>
              <td className="py-tight text-right tnum text-body">{row.applications}</td>
              <td className="py-tight text-right tnum text-accent">{metric(row.rate * 100, '%')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function vitalState(vital: DashboardVital) {
  const limits = vital.label === 'LCP' ? [2500, 4000] : vital.label === 'INP' ? [200, 500] : [0.1, 0.25]
  return vital.value <= limits[0] ? 'Good' : vital.value <= limits[1] ? 'Needs attention' : 'Poor'
}

function countryName(code: string) {
  if (code === 'unknown') return 'Unknown'
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code) || code
  } catch {
    return code
  }
}

export default async function AnalyticsDashboard({ searchParams }: {
  searchParams: Promise<{ days?: string; section?: string; kind?: string; layout?: string; arm?: string }>
}) {
  await requireAdmin()
  const params = await searchParams
  const days = [7, 14, 30, 90].includes(Number(params.days)) ? Number(params.days) : 30
  const section = SECTIONS.includes(params.section as (typeof SECTIONS)[number]) ? params.section! : 'hero'
  const layout = LAYOUTS.includes(params.layout as HeatmapLayout) ? params.layout as HeatmapLayout : 'wide'
  const requestedKind = params.kind === 'click' ? 'click' : 'move'
  const kind = layout === 'mobile' ? 'click' : requestedKind
  const arm = ARMS.includes(params.arm as (typeof ARMS)[number]) ? params.arm as (typeof ARMS)[number] : 'all'
  const [overview, heatmap, storedExperiments] = await Promise.all([
    getDashboardOverview(days),
    getDashboardHeatmap(days, section, kind, layout, arm),
    getStoredExperiments(),
  ])
  const cookieStore = await cookies()
  const internal = cookieStore.has('ccc_internal')

  return (
    <main className="min-h-screen bg-ground text-body">
      <header className="border-b border-line bg-sunken px-gutter-m py-flow md:px-gutter">
        <div className="mx-auto flex max-w-page flex-col gap-flow md:flex-row md:items-end md:justify-between">
          <div>
            <AdminNav current="/admin/analytics" />
            <p className="mt-flow text-label font-medium uppercase text-accent">CCC · Measurement desk</p>
            <h1 className="mt-tight font-serif text-display-l-m text-ink md:text-display-l">From attention to application.</h1>
            <p className="mt-tight max-w-text text-s text-muted">Europe/Warsaw reporting · anonymous detail retained for 90 days · rates always include their counts.</p>
          </div>
          <div className="flex flex-wrap gap-tight">
            <form action="/api/admin/internal" method="post">
              <input type="hidden" name="enabled" value={internal ? 'false' : 'true'} />
              <button className="min-h-[44px] rounded border border-line px-[14px] text-label font-medium uppercase text-body hover:border-ink hover:text-ink">
                {internal ? 'Resume counting me' : 'Exclude this browser'}
              </button>
            </form>
            <form action="/api/admin/logout" method="post">
              <button className="min-h-[44px] px-[12px] text-label font-medium uppercase text-muted hover:text-ink">Sign out</button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-page flex-col gap-block px-gutter-m py-block md:px-gutter md:py-section-m">
        <nav className="flex flex-wrap items-center gap-tight" aria-label="Reporting window">
          {[7, 14, 30, 90].map((window) => (
            <a key={window}
              href={`?days=${window}&section=${section}&kind=${kind}&layout=${layout}&arm=${arm}`}
              aria-current={days === window ? 'page' : undefined}
              className={`rounded border px-[14px] py-[10px] text-label font-medium uppercase ${days === window ? 'border-line-gold bg-accent-wash text-accent' : 'border-line text-muted hover:text-ink'}`}>
              {window} days
            </a>
          ))}
        </nav>

        <section className="grid gap-tight sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" aria-label="Key metrics">
          {overview.headline.map((item) => <MetricCard key={item.key} item={item} />)}
        </section>

        <section className="grid gap-flow lg:grid-cols-[1.2fr_.8fr]">
          <Panel eyebrow="Conversion" title="The application journey" note="Unique sessions at each stage. Step rate compares with the stage immediately before it.">
            {overview.funnel.length ? (
              <ol className="space-y-flow-m">
                {overview.funnel.map((stage) => (
                  <li key={stage.key} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-flow gap-y-[7px]">
                    <div className="flex min-w-0 items-baseline justify-between gap-tight text-s">
                      <span className="truncate text-body">{stage.label}</span>
                      <span className="text-caption text-muted">{metric(stage.stepRate * 100, '%')} of prior</span>
                    </div>
                    <span className="row-span-2 tnum text-h4 text-ink">{stage.sessions}</span>
                    <div className="h-[4px] overflow-hidden bg-line-soft">
                      <div className="h-full bg-accent" style={{ width: `${Math.max(stage.sessionRate * 100, stage.sessions ? 1 : 0)}%` }} />
                    </div>
                  </li>
                ))}
              </ol>
            ) : <Empty />}
          </Panel>

          <Panel eyebrow="Page progression" title="Where the argument loses people" note="Reach is measured once per session; drop-off compares adjacent sections.">
            <div className="space-y-flow-m">
              {overview.sections.map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between gap-tight text-s">
                    <span className="text-body">{readable(row.label)}</span>
                    <span className="tnum text-ink">{row.sessions} · {metric(row.rate * 100, '%')}</span>
                  </div>
                  <div className="mt-[6px] flex items-center gap-tight">
                    <div className="h-[3px] flex-1 bg-line-soft"><div className="h-full bg-accent" style={{ width: `${row.rate * 100}%` }} /></div>
                    <span className="w-[88px] text-right text-caption text-muted">{row.dropoff === null ? 'Entry' : `${metric(row.dropoff * 100, '%')} drop`}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section>
          <Panel
            eyebrow="Attention quality"
            title="How much focused time the page earns"
            note="Engaged time counts only while the page is visible and the visitor has shown activity within the last 30 seconds. Rates below use timed sessions as their denominator."
          >
            {overview.engagement.timedSessions ? (
              <div>
                <div className="grid gap-tight sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ['Average', duration(overview.engagement.averageMs), `across ${overview.engagement.timedSessions} timed sessions`],
                    ['Median', duration(overview.engagement.medianMs), 'less distorted by unusually long visits'],
                    ['Engaged 10s+', metric(overview.engagement.engagementRate * 100, '%'), `${overview.engagement.engagedSessions} of ${overview.engagement.timedSessions} timed sessions`],
                    ['Deep readers 60s+', metric(overview.engagement.deepRate * 100, '%'), `${overview.engagement.deepSessions} of ${overview.engagement.timedSessions} timed sessions`],
                  ].map(([label, value, detail]) => (
                    <div key={label} className="border-l border-line-gold pl-tight">
                      <p className="text-micro font-medium uppercase text-muted">{label}</p>
                      <p className="mt-[5px] tnum text-h3 text-ink">{value}</p>
                      <p className="mt-[3px] text-caption text-muted">{detail}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-flow border-t border-line pt-flow">
                  <div className="flex flex-wrap items-baseline justify-between gap-tight">
                    <p className="text-label font-medium uppercase text-muted">Where active attention accumulates</p>
                    <p className="text-caption text-muted">
                      Timing coverage: {overview.engagement.timedSessions} of {overview.sessions} sessions
                      {overview.sessions ? ` · ${metric(overview.engagement.timedSessions / overview.sessions * 100, '%')}` : ''}
                    </p>
                  </div>
                  <div className="mt-tight grid gap-tight md:grid-cols-2">
                    {overview.engagement.sections.map((row) => (
                      <div key={row.label} className="rounded border border-line-soft bg-sunken px-[12px] py-[10px]">
                        <div className="flex items-baseline justify-between gap-tight text-s">
                          <span className="truncate text-body">{readable(row.label)}</span>
                          <span className="shrink-0 tnum text-ink">{duration(row.averageMs)} avg · {row.sessions}</span>
                        </div>
                        <div className="mt-[7px] h-[3px] overflow-hidden bg-line-soft">
                          <div className="h-full bg-accent" style={{ width: `${Math.max(row.share * 100, 1)}%` }} />
                        </div>
                        <p className="mt-[4px] text-caption text-muted">{metric(row.share * 100, '%')} of recorded active time</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-s text-muted">No engaged-time samples in this window yet. Collection begins with this release.</p>
            )}
          </Panel>
        </section>

        <section className="grid gap-flow lg:grid-cols-2">
          <Panel eyebrow="Acquisition" title="Which sources produce applications" note="UTM source and medium take precedence; referrers are used when campaign tags are absent.">
            <ConversionTable rows={overview.sources} />
          </Panel>
          <Panel eyebrow="Geography" title="Where visitors are arriving from" note="Resolved locally from IP, then the IP is discarded. Regions below five sessions are grouped.">
            {overview.geography.length ? (
              <div className="space-y-flow">
                {overview.geography.map((country) => (
                  <article key={country.countryCode} className="border-b border-line-soft pb-flow last:border-0 last:pb-0">
                    <div className="grid grid-cols-[1fr_auto_auto] items-baseline gap-tight">
                      <h3 className="text-h4 text-ink">{countryName(country.countryCode)}</h3>
                      <span className="tnum text-s text-body">{country.sessions} sessions</span>
                      <span className="tnum text-s text-accent">{country.applications} · {metric(country.rate * 100, '%')}</span>
                    </div>
                    {country.regions.length > 0 && (
                      <div className="mt-tight border-l border-line-gold pl-tight">
                        {country.regions.map((region) => (
                          <div key={`${region.label}:${region.detail || ''}`} className="flex justify-between gap-tight py-[5px] text-caption">
                            <span className="text-muted">{region.label}</span>
                            <span className="tnum text-body">{region.sessions} · {region.applications} apps · {metric(region.rate * 100, '%')}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            ) : <Empty />}
          </Panel>
        </section>

        <section className="grid gap-flow lg:grid-cols-2">
          <Panel eyebrow="Environment" title="Device conversion and field performance">
            <ConversionTable rows={overview.devices} labelHeading="Device" />
            <div className="mt-flow grid gap-tight border-t border-line pt-flow sm:grid-cols-3">
              {overview.vitals.length ? overview.vitals.map((vital) => (
                <div key={vital.label}>
                  <p className="text-micro font-medium uppercase text-muted">p75 {vital.label}</p>
                  <p className="mt-[6px] tnum text-h4 text-ink">{metric(vital.value, vital.label === 'CLS' ? '' : 'ms')}</p>
                  <p className="mt-[3px] text-caption text-muted">{vitalState(vital)} · {vital.samples} samples</p>
                </div>
              )) : <Empty />}
            </div>
          </Panel>
          <Panel eyebrow="Friction" title="What prevents completion" note="Only safe categories and field identifiers are retained—never entered answers.">
            <div className="grid gap-flow sm:grid-cols-2">
              <div>
                <p className="text-label font-medium uppercase text-muted">Application form</p>
                <div className="mt-tight space-y-tight">
                  {overview.formFriction.length ? overview.formFriction.map((row) => (
                    <div key={`${row.label}:${row.detail}`} className="flex justify-between gap-tight text-s">
                      <span className="text-body">{readable(row.detail || row.label)}</span>
                      <span className="tnum text-ink">{row.sessions}</span>
                    </div>
                  )) : <Empty />}
                </div>
              </div>
              <div>
                <p className="text-label font-medium uppercase text-muted">Interaction warnings</p>
                <div className="mt-tight space-y-tight">
                  {overview.behavior.length ? overview.behavior.map((row) => (
                    <div key={row.label} className="flex justify-between gap-tight text-s">
                      <span className="text-body">{readable(row.label)}</span>
                      <span className="tnum text-ink">{row.sessions}</span>
                    </div>
                  )) : <Empty />}
                </div>
              </div>
            </div>
          </Panel>
        </section>

        <section id="behaviour">
          <Panel eyebrow="Behaviour map"
            title={`${kind === 'move' ? 'Mouse attention' : 'Click and tap density'} · ${readable(section)}`}
            note={`${kind === 'move' ? 'Average dwell per sampled session' : 'Share of section viewers clicking each area'} · heatmap detail is retained for 30 days.`}>
            <form className="mb-flow grid gap-tight sm:grid-cols-2 lg:grid-cols-5">
              <input type="hidden" name="days" value={days} />
              <select name="section" defaultValue={section} aria-label="Section" className="min-h-[44px] rounded border border-line bg-sunken px-[12px] text-s text-ink">
                {SECTIONS.map((value) => <option key={value} value={value}>{readable(value)}</option>)}
              </select>
              <select name="layout" defaultValue={layout} aria-label="Layout" className="min-h-[44px] rounded border border-line bg-sunken px-[12px] text-s text-ink">
                <option value="mobile">mobile · under 768</option><option value="tablet">tablet · 768–1023</option>
                <option value="desktop">desktop · 1024–1279</option><option value="wide">wide · 1280+</option>
              </select>
              <select name="kind" defaultValue={kind} aria-label="Heatmap type" className="min-h-[44px] rounded border border-line bg-sunken px-[12px] text-s text-ink">
                {layout !== 'mobile' && <option value="move">mouse attention</option>}
                <option value="click">clicks and taps</option>
              </select>
              <select name="arm" defaultValue={arm} aria-label="Experiment arm" className="min-h-[44px] rounded border border-line bg-sunken px-[12px] text-s text-ink">
                <option value="all">all experiment arms</option><option value="control">control</option><option value="treatment">treatment</option>
              </select>
              <button className="min-h-[44px] rounded bg-accent px-[14px] text-label font-semibold uppercase text-accent-on">Update map</button>
            </form>
            <HeatmapOverlay data={heatmap} section={section} layout={layout} kind={kind} />
            <p className="mt-tight text-caption text-muted">
              Mouse attention uses a deterministic 20% desktop sample. Coordinates are aggregated into section-relative bins; no pointer trail is retained.
              {days > 30 ? ' This map uses the latest 30 days within the selected reporting window.' : ''}
            </p>
          </Panel>
        </section>

        <section id="experiments">
          <Panel eyebrow="Experiments" title="One deliberate change at a time">
            <div className="space-y-flow">
              {EXPERIMENT_REGISTRY.map((definition) => {
                const stored = storedExperiments.find((row) => row.experiment_id === definition.id && row.version === definition.version)
                const control = wilsonInterval(stored?.control_conversions || 0, stored?.control_visitors || 0)
                const treatment = wilsonInterval(stored?.treatment_conversions || 0, stored?.treatment_visitors || 0)
                const comparison = compareConversions(control, treatment)
                return (
                  <article key={definition.id} className="rounded border border-line bg-sunken p-card-m md:p-card">
                    <div className="flex flex-col gap-flow md:flex-row md:items-start md:justify-between">
                      <div className="max-w-text">
                        <p className="text-micro font-medium uppercase text-muted">{definition.id} · v{definition.version}</p>
                        <h3 className="mt-tight text-h4 font-semibold text-ink">{definition.name}</h3>
                        <p className="mt-tight text-s text-body">{definition.hypothesis}</p>
                      </div>
                      <span className="rounded-badge border border-line-gold bg-accent-wash px-[10px] py-[7px] text-label font-medium uppercase text-accent">{stored?.status || 'not started'}</span>
                    </div>
                    <div className="mt-flow grid gap-tight sm:grid-cols-2">
                      {([['Control', control], ['Treatment', treatment]] as const).map(([label, stats]) => (
                        <div key={label} className="border-t border-line-soft pt-tight">
                          <p className="text-label font-medium uppercase text-muted">{label}</p>
                          <p className="mt-[6px] tnum text-h3 text-ink">{metric(stats.rate * 100, '%')}</p>
                          <p className="text-caption text-muted">{stats.conversions} conversions · {stats.visitors} exposed visitors</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-flow flex flex-wrap items-center justify-between gap-tight border-t border-line pt-flow-m">
                      <div className="text-s text-body">
                        <p>Verdict: <span className="text-ink">{experimentVerdict(control, treatment)}</span></p>
                        <p className="mt-[4px] text-caption text-muted">
                          Lift {comparison.absoluteLift >= 0 ? '+' : ''}{metric(comparison.absoluteLift * 100, ' pp')}
                          {' · '}{comparison.relativeLift === null ? 'relative lift n/a' : `${comparison.relativeLift >= 0 ? '+' : ''}${metric(comparison.relativeLift * 100, '%')} relative`}
                          {' · '}95% difference CI [{metric(comparison.differenceLower * 100, ' pp')}, {metric(comparison.differenceUpper * 100, ' pp')}]
                        </p>
                      </div>
                      <form action="/api/admin/experiments" method="post" className="flex gap-tight">
                        <input type="hidden" name="experimentId" value={definition.id} /><input type="hidden" name="version" value={definition.version} />
                        {stored?.status !== 'running' && stored?.status !== 'ended' && <button name="action" value="start" className="min-h-[44px] rounded bg-accent px-[16px] text-label font-semibold uppercase text-accent-on">Start 50/50</button>}
                        {stored?.status === 'running' && <button name="action" value="pause" className="min-h-[44px] rounded border border-line px-[16px] text-label font-medium uppercase text-ink">Pause</button>}
                        {stored && stored.status !== 'ended' && <button name="action" value="end" className="min-h-[44px] px-[12px] text-label font-medium uppercase text-muted hover:text-ink">End</button>}
                      </form>
                    </div>
                  </article>
                )
              })}
            </div>
          </Panel>
        </section>
      </div>
    </main>
  )
}
