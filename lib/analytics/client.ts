'use client'

import type { AnalyticsEventName } from './types'

export const ANALYTICS_CLIENT_EVENT = 'ccc:analytics-event'

export type ClientAnalyticsDetail = {
  name: AnalyticsEventName
  sectionId?: string
  elementId?: string
  value?: number
  immediate?: boolean
}

/**
 * Small, typed bridge for client components that need to report a semantic
 * outcome. It deliberately accepts identifiers and numbers only: form values
 * and page text have no route into the analytics payload.
 */
export function trackClientEvent(detail: ClientAnalyticsDetail) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<ClientAnalyticsDetail>(ANALYTICS_CLIENT_EVENT, { detail }))
}
