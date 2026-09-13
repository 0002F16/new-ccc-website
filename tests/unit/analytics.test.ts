import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { expectedOutcomeSucceeded, heatmapCell, isHesitation, rageCluster } from '@/lib/analytics/behavior'
import { assignExperiment, EXPERIMENT_REGISTRY } from '@/lib/analytics/experiments'
import { sanitizeAttribution, sanitizePath } from '@/lib/analytics/privacy'
import { deterministicBucket, signIdentifier, verifyIdentifier } from '@/lib/analytics/signing'
import { compareConversions, experimentVerdict, wilsonInterval } from '@/lib/analytics/statistics'
import { analyticsBatchSchema } from '@/lib/analytics/validation'
import { isAutomatedUserAgent, withinRateLimit } from '@/lib/analytics/request'
import { sanitizeGeo } from '@/lib/analytics/geo'
import { engagedTimeIncrement } from '@/lib/analytics/engagement'
import { dashboardMetricDelta, groupDashboardGeography, normalizeDashboardHeatmap } from '@/lib/analytics/store'
import { publicUrl } from '@/lib/admin-url'
import argon2 from 'argon2'
import { POST as loginPost } from '@/app/api/admin/login/route'
import { POST as logoutPost } from '@/app/api/admin/logout/route'
import { POST as internalPost } from '@/app/api/admin/internal/route'
import { POST as experimentPost } from '@/app/api/admin/experiments/route'

beforeAll(() => {
  process.env.ANALYTICS_HMAC_SECRET = 'test-secret-with-more-than-thirty-two-bytes'
})

afterEach(() => vi.unstubAllEnvs())

describe('privacy boundaries', () => {
  it('stores paths without query strings and sanitizes attribution', () => {
    expect(sanitizePath('/?utm_source=linkedin&email=person@example.com')).toBe('/')
    expect(sanitizeAttribution({
      utmSource: 'linkedin',
      utmCampaign: 'sept_launch',
      referrerHost: 'https://example.com/private/path?q=secret',
      extra: 'not accepted',
    })).toEqual({
      utmSource: 'linkedin',
      utmMedium: undefined,
      utmCampaign: 'sept_launch',
      utmContent: undefined,
      utmTerm: undefined,
      referrerHost: 'example.com',
    })
  })

  it('rejects arbitrary fields and stale batches', () => {
    const result = analyticsBatchSchema.safeParse({
      schemaVersion: 1,
      batchId: crypto.randomUUID(),
      pageviewId: crypto.randomUUID(),
      sentAt: Date.now() - 2 * 86_400_000,
      path: '/',
      device: 'desktop',
      viewportWidth: 1200,
      viewportHeight: 800,
      attribution: {},
      experiment: null,
      events: [],
      heatmap: [],
      capturedText: 'must never pass',
    })
    expect(result.success).toBe(false)
  })

  it('requires semantic identifiers for typed interaction events', () => {
    const result = analyticsBatchSchema.safeParse({
      schemaVersion: 1,
      batchId: crypto.randomUUID(),
      pageviewId: crypto.randomUUID(),
      sentAt: Date.now(),
      path: '/',
      device: 'desktop',
      viewportWidth: 1200,
      viewportHeight: 800,
      attribution: {},
      experiment: null,
      events: [{ id: crypto.randomUUID(), name: 'cta_click', timestamp: Date.now() }],
      heatmap: [],
    })
    expect(result.success).toBe(false)
  })

  it('accepts safe application outcomes but rejects a failure without a category', () => {
    const base = {
      schemaVersion: 1 as const,
      batchId: crypto.randomUUID(),
      pageviewId: crypto.randomUUID(),
      sentAt: Date.now(),
      path: '/',
      device: 'desktop' as const,
      viewportWidth: 1200,
      viewportHeight: 800,
      attribution: {},
      experiment: null,
      heatmap: [],
    }
    expect(analyticsBatchSchema.safeParse({
      ...base,
      events: [{ id: crypto.randomUUID(), name: 'application_submitted', timestamp: Date.now(), sectionId: 'apply', elementId: 'apply-submit' }],
    }).success).toBe(true)
    expect(analyticsBatchSchema.safeParse({
      ...base,
      batchId: crypto.randomUUID(),
      events: [{ id: crypto.randomUUID(), name: 'application_submit_failed', timestamp: Date.now(), sectionId: 'apply' }],
    }).success).toBe(false)
    expect(analyticsBatchSchema.safeParse({
      ...base,
      batchId: crypto.randomUUID(),
      events: [{ id: crypto.randomUUID(), name: 'engaged_time', timestamp: Date.now(), sectionId: 'hero', value: 8_000 }],
    }).success).toBe(true)
    expect(analyticsBatchSchema.safeParse({
      ...base,
      batchId: crypto.randomUUID(),
      events: [{ id: crypto.randomUUID(), name: 'engaged_time', timestamp: Date.now(), value: 8_000 }],
    }).success).toBe(false)
  })

  it('sanitizes coarse geography without retaining an address or unsafe names', () => {
    expect(sanitizeGeo({ countryCode: 'pl', subdivisionCode: '14', subdivisionName: 'Masovian Voivodeship' })).toEqual({
      countryCode: 'PL', subdivisionCode: '14', subdivisionName: 'Masovian Voivodeship',
    })
    expect(sanitizeGeo({ countryCode: 'POLAND', subdivisionCode: '<script>', subdivisionName: 'x@example.com' })).toEqual({
      countryCode: undefined, subdivisionCode: undefined, subdivisionName: undefined,
    })
  })

  it('groups low-volume regions while preserving country totals', () => {
    const grouped = groupDashboardGeography([
      { country_code: 'PL', subdivision_code: '14', subdivision_name: 'Masovian', sessions: '8', applications: '2' },
      { country_code: 'PL', subdivision_code: '12', subdivision_name: 'Lesser Poland', sessions: '3', applications: '1' },
      { country_code: '', subdivision_code: '', subdivision_name: '', sessions: '2', applications: '0' },
    ])
    expect(grouped[0]).toMatchObject({ countryCode: 'PL', sessions: 11, applications: 3 })
    expect(grouped[0].regions.map((region) => region.label)).toEqual(['Masovian', 'Other / low volume'])
    expect(grouped[1]).toMatchObject({ countryCode: 'unknown', sessions: 2 })
  })

  it('normalizes heatmaps by sessions and calculates comparable metric changes', () => {
    const rows = [{ x: 3, y: 7, sessions: '5', dwell_ms: '10000' }]
    expect(normalizeDashboardHeatmap(rows, 'click', 10, 5)[0].value).toBe(0.5)
    expect(normalizeDashboardHeatmap(rows, 'move', 10, 2)[0].value).toBe(5)
    expect(dashboardMetricDelta({ key: 'rate', label: 'Rate', current: 0.2, previous: 0.15, format: 'rate' })?.value).toBeCloseTo(5)
    expect(dashboardMetricDelta({ key: 'count', label: 'Count', current: 120, previous: 100, format: 'count' })).toEqual({ value: 20, unit: '%' })
  })

  it('identifies bots and bounds application ingestion attempts', () => {
    expect(isAutomatedUserAgent('Googlebot/2.1')).toBe(true)
    expect(isAutomatedUserAgent('Mozilla/5.0 Safari/605.1.15')).toBe(false)
    const key = `test-${crypto.randomUUID()}`
    expect(withinRateLimit(key, 2, 60_000)).toBe(true)
    expect(withinRateLimit(key, 2, 60_000)).toBe(true)
    expect(withinRateLimit(key, 2, 60_000)).toBe(false)
  })

  it('counts only recent visible engagement and caps delayed samples', () => {
    expect(engagedTimeIncrement({
      wasVisible: true, lastActivityAt: 9_000, previousSampleAt: 9_000, now: 10_000,
    })).toBe(1_000)
    expect(engagedTimeIncrement({
      wasVisible: false, lastActivityAt: 9_000, previousSampleAt: 9_000, now: 10_000,
    })).toBe(0)
    expect(engagedTimeIncrement({
      wasVisible: true, lastActivityAt: 0, previousSampleAt: 39_000, now: 40_000,
    })).toBe(0)
    expect(engagedTimeIncrement({
      wasVisible: true, lastActivityAt: 10_000, previousSampleAt: 10_000, now: 20_000,
    })).toBe(5_000)
  })
})

describe('canonical redirects', () => {
  it('never exposes the internal production listener', () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('SITE_URL', 'https://capitalcareerclub.com')
    const request = new NextRequest('http://localhost:3211/api/admin/login')
    expect(publicUrl(request, '/admin/login?error=invalid').toString()).toBe('https://capitalcareerclub.com/admin/login?error=invalid')
    expect(publicUrl(request, '/admin/analytics#experiments').toString()).toBe('https://capitalcareerclub.com/admin/analytics#experiments')
    vi.stubEnv('SITE_URL', 'http://localhost:3211')
    expect(publicUrl(request, '/admin/analytics').toString()).toBe('https://capitalcareerclub.com/admin/analytics')
  })

  it('keeps the active origin during local development', () => {
    vi.stubEnv('NODE_ENV', 'development')
    const request = new NextRequest('http://localhost:3211/api/admin/login')
    expect(publicUrl(request, '/admin/analytics').toString()).toBe('http://localhost:3211/admin/analytics')
  })

  it('uses the public origin in every admin POST route', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    vi.stubEnv('SITE_URL', 'https://capitalcareerclub.com')
    vi.stubEnv('ADMIN_SESSION_SECRET', 'admin-test-session-secret-with-thirty-two-bytes')
    vi.stubEnv('ADMIN_PASSWORD_HASH', await argon2.hash('owner-test-password'))
    const headers = { origin: 'https://capitalcareerclub.com', 'content-type': 'application/x-www-form-urlencoded' }
    const request = (path: string, body = '') => new NextRequest(`http://localhost:3211${path}`, {
      method: 'POST', headers: { ...headers, 'x-forwarded-for': crypto.randomUUID() }, body,
    })

    const login = await loginPost(request('/api/admin/login', 'password=owner-test-password'))
    const logout = await logoutPost(request('/api/admin/logout'))
    const internal = await internalPost(request('/api/admin/internal', 'enabled=true'))
    const experiment = await experimentPost(request('/api/admin/experiments', 'experimentId=x&version=1&action=start'))

    expect(login.headers.get('location')).toBe('https://capitalcareerclub.com/admin/analytics')
    expect(logout.headers.get('location')).toBe('https://capitalcareerclub.com/admin/login')
    expect(internal.headers.get('location')).toBe('https://capitalcareerclub.com/admin/login')
    expect(experiment.headers.get('location')).toBe('https://capitalcareerclub.com/admin/login')
  })
})

describe('signed identity and assignment', () => {
  it('signs and verifies identifiers', () => {
    const id = crypto.randomUUID()
    const signed = signIdentifier(id)
    expect(signed).toBeTruthy()
    expect(verifyIdentifier(signed!)).toBe(id)
    expect(verifyIdentifier(`${signed}tampered`)).toBeNull()
  })

  it('is stable and distributes ten thousand visitors within 48–52 percent', () => {
    const definition = EXPERIMENT_REGISTRY[0]
    const first = assignExperiment('visitor-42', definition)
    expect(assignExperiment('visitor-42', definition)).toEqual(first)
    let control = 0
    for (let index = 0; index < 10_000; index += 1) {
      if (deterministicBucket(`visitor-${index}`, `${definition.id}:${definition.version}`) < 5_000) control += 1
    }
    expect(control).toBeGreaterThanOrEqual(4_800)
    expect(control).toBeLessThanOrEqual(5_200)
  })
})

describe('behaviour rules', () => {
  it('normalizes coordinates to a bounded twenty-by-twenty grid', () => {
    expect(heatmapCell(50, 25, { left: 0, top: 0, width: 100, height: 100 })).toEqual({ x: 10, y: 5 })
    expect(heatmapCell(500, -10, { left: 0, top: 0, width: 100, height: 100 })).toEqual({ x: 19, y: 0 })
  })

  it('detects the specified rage and hesitation thresholds', () => {
    const current = { at: 2_000, x: 20, y: 20, target: 'hero' }
    const points = [
      { at: 200, x: 20, y: 20, target: 'hero' },
      { at: 1_200, x: 22, y: 20, target: 'hero' },
      current,
    ]
    expect(rageCluster(points, current)).toHaveLength(3)
    expect(isHesitation(1_500, 23, false)).toBe(true)
    expect(isHesitation(1_500, 24, false)).toBe(false)
    expect(isHesitation(2_000, 1, true)).toBe(false)
  })

  it('recognises expected outcomes and leaves unchanged controls as dead clicks', () => {
    const before = { scrollY: 100, hash: '#hero', expanded: 'false' }
    expect(expectedOutcomeSucceeded('scroll', before, {
      scrollY: 120, hash: '#hero', expanded: 'false', elementPresent: true, pageHidden: false,
    })).toBe(true)
    expect(expectedOutcomeSucceeded('disclosure', before, {
      scrollY: 100, hash: '#hero', expanded: 'true', elementPresent: true, pageHidden: false,
    })).toBe(true)
    expect(expectedOutcomeSucceeded('media', before, {
      scrollY: 100, hash: '#hero', expanded: 'false', elementPresent: false, pageHidden: false,
    })).toBe(true)
    expect(expectedOutcomeSucceeded('navigate', before, {
      scrollY: 100, hash: '#hero', expanded: 'false', elementPresent: true, pageHidden: false,
    })).toBe(false)
  })
})

describe('experiment reporting', () => {
  it('does not declare a winner before minimum evidence', () => {
    expect(experimentVerdict(wilsonInterval(15, 80), wilsonInterval(30, 80))).toBe('Collecting data')
  })

  it('reports a clear lead only after separated intervals', () => {
    const control = wilsonInterval(25, 200)
    const treatment = wilsonInterval(70, 200)
    const comparison = compareConversions(control, treatment)
    expect(comparison.absoluteLift).toBeCloseTo(0.225)
    expect(comparison.relativeLift).toBeCloseTo(1.8)
    expect(comparison.differenceLower).toBeGreaterThan(0)
    expect(experimentVerdict(control, treatment)).toBe('Treatment ahead')
  })
})
