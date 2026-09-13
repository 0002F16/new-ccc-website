export const ANALYTICS_EVENT_NAMES = [
  'page_view',
  'section_view',
  'cta_click',
  'faq_open',
  'video_start',
  'rage_click',
  'dead_click',
  'hesitation',
  'web_vital',
  'experiment_exposure',
  'application_started',
  'application_submit_attempted',
  'application_validation_failed',
  'application_submit_failed',
  'application_submitted',
  'engaged_time',
  'application_qualified',
  'call_booked',
  'call_attended',
  'enrollment_paid',
] as const

export type AnalyticsEventName = (typeof ANALYTICS_EVENT_NAMES)[number]
export type DeviceBucket = 'mobile' | 'tablet' | 'desktop'
export type HeatmapKind = 'move' | 'click'

export type AnalyticsGeo = {
  countryCode?: string
  subdivisionCode?: string
  subdivisionName?: string
}

export type Attribution = {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
  referrerHost?: string
}

export type ExperimentContext = {
  experimentId: string
  version: number
  variantKey: 'control' | 'treatment'
} | null

export type AnalyticsEvent = {
  id: string
  name: AnalyticsEventName
  timestamp: number
  sectionId?: string
  elementId?: string
  value?: number
  metricName?: 'LCP' | 'CLS' | 'INP'
}

export type HeatmapBin = {
  sectionId: string
  kind: HeatmapKind
  x: number
  y: number
  count: number
  dwellMs: number
}

export type AnalyticsBatch = {
  schemaVersion: 1
  batchId: string
  pageviewId: string
  sentAt: number
  path: string
  device: DeviceBucket
  viewportWidth: number
  viewportHeight: number
  attribution: Attribution
  experiment: ExperimentContext
  events: AnalyticsEvent[]
  heatmap: HeatmapBin[]
}

export type ExperimentDefinition = {
  id: string
  version: number
  name: string
  hypothesis: string
  page: 'homepage'
  slot: 'hero.headline'
  primaryEvent: AnalyticsEventName
  allocation: { control: 50; treatment: 50 }
  variants: readonly [
    { key: 'control'; label: string; value: { headline: readonly [string, string]; accentPhrase: string } },
    { key: 'treatment'; label: string; value: { headline: readonly [string, string]; accentPhrase: string } },
  ]
}
