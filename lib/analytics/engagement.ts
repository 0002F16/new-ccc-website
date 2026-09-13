export const ENGAGEMENT_IDLE_LIMIT_MS = 30_000
export const ENGAGEMENT_SAMPLE_LIMIT_MS = 5_000
export const ENGAGEMENT_EVENT_MINIMUM_MS = 250

type EngagementSample = {
  wasVisible: boolean
  lastActivityAt: number
  previousSampleAt: number
  now: number
}

/**
 * Return a conservative active-time increment. Long scheduler gaps are capped,
 * and time is ignored once the visitor has been inactive for thirty seconds.
 */
export function engagedTimeIncrement({
  wasVisible,
  lastActivityAt,
  previousSampleAt,
  now,
}: EngagementSample) {
  if (!wasVisible || now < previousSampleAt || now - lastActivityAt > ENGAGEMENT_IDLE_LIMIT_MS) return 0
  return Math.min(ENGAGEMENT_SAMPLE_LIMIT_MS, now - previousSampleAt)
}
