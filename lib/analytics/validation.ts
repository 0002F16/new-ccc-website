import { z } from 'zod'
import { ANALYTICS_EVENT_NAMES } from './types'

const shortText = z.string().trim().max(160).regex(/^[\p{L}\p{N} ._~:@/+\-]*$/u).optional()
const attributionText = z.string().trim().max(160).optional()

const eventSchema = z.object({
  id: z.string().uuid(),
  name: z.enum(ANALYTICS_EVENT_NAMES),
  timestamp: z.number().int().nonnegative(),
  sectionId: shortText,
  elementId: shortText,
  value: z.number().finite().optional(),
  metricName: z.enum(['LCP', 'CLS', 'INP']).optional(),
}).strict()

const heatmapSchema = z.object({
  sectionId: shortText.unwrap(),
  kind: z.enum(['move', 'click']),
  x: z.number().int().min(0).max(19),
  y: z.number().int().min(0).max(19),
  count: z.number().int().min(1).max(10_000),
  dwellMs: z.number().int().min(0).max(600_000),
}).strict()

export const analyticsBatchSchema = z.object({
  schemaVersion: z.literal(1),
  batchId: z.string().uuid(),
  pageviewId: z.string().uuid(),
  sentAt: z.number().int().nonnegative(),
  path: z.string().startsWith('/').max(240),
  device: z.enum(['mobile', 'tablet', 'desktop']),
  viewportWidth: z.number().int().min(1).max(10_000),
  viewportHeight: z.number().int().min(1).max(10_000),
  attribution: z.object({
    utmSource: attributionText,
    utmMedium: attributionText,
    utmCampaign: attributionText,
    utmContent: attributionText,
    utmTerm: attributionText,
    referrerHost: attributionText,
  }).strict(),
  experiment: z.object({
    experimentId: shortText.unwrap(),
    version: z.number().int().positive(),
    variantKey: z.enum(['control', 'treatment']),
  }).strict().nullable(),
  events: z.array(eventSchema).max(100),
  heatmap: z.array(heatmapSchema).max(2_400),
}).strict().superRefine((batch, context) => {
  const now = Date.now()
  if (Math.abs(batch.sentAt - now) > 24 * 60 * 60 * 1000) {
    context.addIssue({ code: 'custom', path: ['sentAt'], message: 'Timestamp outside accepted window' })
  }
  for (const [index, event] of batch.events.entries()) {
    if (Math.abs(event.timestamp - now) > 24 * 60 * 60 * 1000) {
      context.addIssue({ code: 'custom', path: ['events', index, 'timestamp'], message: 'Timestamp outside accepted window' })
    }
    if (event.name === 'web_vital' && (!event.metricName || event.value === undefined)) {
      context.addIssue({ code: 'custom', path: ['events', index], message: 'Web vital requires metricName and value' })
    }
    if (event.name === 'section_view' && !event.sectionId) {
      context.addIssue({ code: 'custom', path: ['events', index, 'sectionId'], message: 'Section view requires sectionId' })
    }
    if (event.name === 'engaged_time' && (
      !event.sectionId || event.value === undefined || event.value < 1 || event.value > 60_000
    )) {
      context.addIssue({
        code: 'custom', path: ['events', index],
        message: 'Engaged time requires a section and a duration between 1 and 60000ms',
      })
    }
    if ([
      'cta_click', 'faq_open', 'video_start', 'dead_click', 'hesitation',
      'application_submit_attempted', 'application_validation_failed',
      'application_submit_failed', 'application_submitted',
    ].includes(event.name) && !event.elementId) {
      context.addIssue({ code: 'custom', path: ['events', index, 'elementId'], message: 'Interactive event requires elementId' })
    }
    if (event.name === 'experiment_exposure' && !batch.experiment) {
      context.addIssue({ code: 'custom', path: ['events', index], message: 'Exposure requires experiment context' })
    }
  }
})

export type ValidAnalyticsBatch = z.infer<typeof analyticsBatchSchema>
