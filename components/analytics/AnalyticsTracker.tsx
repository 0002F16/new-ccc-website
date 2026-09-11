'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onLCP } from 'web-vitals'
import type {
  AnalyticsBatch,
  AnalyticsEvent,
  AnalyticsEventName,
  Attribution,
  DeviceBucket,
  ExperimentContext,
  HeatmapBin,
} from '@/lib/analytics/types'
import { deviceBucket } from '@/lib/analytics/privacy'
import {
  ANALYTICS_CLIENT_EVENT,
  type ClientAnalyticsDetail,
} from '@/lib/analytics/client'
import {
  expectedOutcomeSucceeded,
  heatmapCell,
  isHesitation,
  rageCluster,
  type ExpectedOutcome,
  type Point,
} from '@/lib/analytics/behavior'

declare global {
  interface Window { __cccAnalyticsMounted?: boolean }
}

type Props = {
  enabled: boolean
  heatmapSample: boolean
  experiment: ExperimentContext
}

type MutableBin = HeatmapBin

const MAX_BATCH_BYTES = 64 * 1024
const MAX_HEATMAP_BYTES = 32 * 1024
const encoder = new TextEncoder()

function byteLength(value: string) {
  return encoder.encode(value).byteLength
}

function clean(value: string | null | undefined, max = 120) {
  const result = value?.trim().slice(0, max)
  return result || undefined
}

function attribution(): Attribution {
  const query = new URLSearchParams(window.location.search)
  let referrerHost: string | undefined
  try { referrerHost = document.referrer ? new URL(document.referrer).hostname : undefined } catch { /* empty */ }
  return {
    utmSource: clean(query.get('utm_source')),
    utmMedium: clean(query.get('utm_medium')),
    utmCampaign: clean(query.get('utm_campaign')),
    utmContent: clean(query.get('utm_content')),
    utmTerm: clean(query.get('utm_term')),
    referrerHost: clean(referrerHost, 160),
  }
}

function analyticsElement(target: EventTarget | null) {
  return target instanceof Element
    ? target.closest<HTMLElement>('[data-analytics-event], [data-analytics-hesitation]')
    : null
}

function sectionFor(element: Element | null) {
  return element?.closest<HTMLElement>('section[id], main[id]')?.id || 'page'
}

export function AnalyticsTracker({ enabled, heatmapSample, experiment }: Props) {
  useEffect(() => {
    if (!enabled || window.__cccAnalyticsMounted || window.location.pathname !== '/') return
    if (navigator.doNotTrack === '1' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl) return
    window.__cccAnalyticsMounted = true

    const pageviewId = crypto.randomUUID()
    const pageAttribution = attribution()
    const device: DeviceBucket = deviceBucket(window.innerWidth)
    let events: AnalyticsEvent[] = []
    const bins = new Map<string, MutableBin>()
    let flushTimer: number | undefined
    let lastMoveAt = 0
    let lastHeatmapAt = 0
    let disposed = false
    let ragePoints: Point[] = []
    let hesitation: { element: HTMLElement; started: number; x: number; y: number; moved: number; clicked: boolean } | null = null

    const push = (
      name: AnalyticsEventName,
      detail: Omit<AnalyticsEvent, 'id' | 'name' | 'timestamp'> = {},
    ) => {
      events.push({ id: crypto.randomUUID(), name, timestamp: Date.now(), ...detail })
      if (events.length >= 20) void flush(false)
    }

    const onClientAnalytics = (event: Event) => {
      const detail = (event as CustomEvent<ClientAnalyticsDetail>).detail
      if (!detail?.name) return
      push(detail.name, {
        sectionId: detail.sectionId,
        elementId: detail.elementId,
        value: detail.value,
      })
      if (detail.immediate) void flush(false)
    }

    const addBin = (kind: 'move' | 'click', event: PointerEvent, dwellMs = 0) => {
      if (kind === 'move' && !heatmapSample) return
      const section = event.target instanceof Element
        ? event.target.closest<HTMLElement>('section[id]')
        : null
      if (!section) return
      const cell = heatmapCell(event.clientX, event.clientY, section.getBoundingClientRect())
      if (!cell) return
      const key = `${section.id}:${kind}:${cell.x}:${cell.y}`
      const current = bins.get(key)
      if (current) {
        current.count += 1
        current.dwellMs = Math.min(600_000, current.dwellMs + dwellMs)
      } else {
        bins.set(key, { sectionId: section.id, kind, x: cell.x, y: cell.y, count: 1, dwellMs })
      }
    }

    const makeBatch = (): AnalyticsBatch | null => {
      if (!events.length && !bins.size) return null
      let heatmap = Array.from(bins.values())
      while (byteLength(JSON.stringify(heatmap)) > MAX_HEATMAP_BYTES && heatmap.length) heatmap = heatmap.slice(0, -1)
      const batch: AnalyticsBatch = {
        schemaVersion: 1,
        batchId: crypto.randomUUID(),
        pageviewId,
        sentAt: Date.now(),
        path: window.location.pathname,
        device,
        viewportWidth: Math.round(window.innerWidth),
        viewportHeight: Math.round(window.innerHeight),
        attribution: pageAttribution,
        experiment,
        events,
        heatmap,
      }
      events = []
      bins.clear()
      return batch
    }

    const flush = async (unloading: boolean) => {
      if (disposed && !unloading) return
      const batch = makeBatch()
      if (!batch) return
      const body = JSON.stringify(batch)
      if (byteLength(body) > MAX_BATCH_BYTES) return
      if (unloading && navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/batch', new Blob([body], { type: 'application/json' }))
        return
      }
      try {
        await fetch('/api/analytics/batch', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          credentials: 'same-origin',
          keepalive: true,
          body,
        })
      } catch {
        // Analytics is intentionally lossy rather than user-blocking.
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now()
      if (hesitation) {
        const distance = Math.hypot(event.clientX - hesitation.x, event.clientY - hesitation.y)
        hesitation.moved = Math.max(hesitation.moved, distance)
      }
      if (event.pointerType !== 'mouse' || now - lastMoveAt < 100) return
      const dwell = lastHeatmapAt ? Math.min(250, Math.round(now - lastHeatmapAt)) : 0
      lastMoveAt = now
      lastHeatmapAt = now
      addBin('move', event, dwell)
    }

    const onPointerOver = (event: PointerEvent) => {
      const element = analyticsElement(event.target)
      if (!element?.dataset.analyticsHesitation) return
      hesitation = { element, started: performance.now(), x: event.clientX, y: event.clientY, moved: 0, clicked: false }
    }

    const onPointerOut = (event: PointerEvent) => {
      if (!hesitation) return
      const leaving = event.relatedTarget instanceof Node && hesitation.element.contains(event.relatedTarget)
      if (leaving) return
      const elapsed = performance.now() - hesitation.started
      if (isHesitation(elapsed, hesitation.moved, hesitation.clicked)) {
        push('hesitation', {
          sectionId: sectionFor(hesitation.element),
          elementId: hesitation.element.dataset.analyticsId,
          value: Math.round(elapsed),
        })
      }
      hesitation = null
    }

    const onPointerUp = (event: PointerEvent) => {
      addBin('click', event)
      const target = analyticsElement(event.target)
      const logicalTarget = target?.dataset.analyticsId || sectionFor(event.target instanceof Element ? event.target : null)
      const now = performance.now()
      ragePoints = ragePoints.filter((point) => now - point.at <= 2_000)
      const current = { at: now, x: event.clientX, y: event.clientY, target: logicalTarget }
      ragePoints.push(current)
      const nearby = rageCluster(ragePoints, current)
      if (nearby.length === 3) {
        push('rage_click', { sectionId: sectionFor(target), elementId: logicalTarget, value: nearby.length })
      }
    }

    const onClick = (event: MouseEvent) => {
      const element = analyticsElement(event.target)
      if (!element) return
      if (hesitation?.element === element) hesitation.clicked = true
      const eventName = element.dataset.analyticsEvent as AnalyticsEventName | undefined
      if (eventName) {
        push(eventName, { sectionId: sectionFor(element), elementId: element.dataset.analyticsId })
      }

      const expected = element.dataset.analyticsOutcome as ExpectedOutcome | undefined
      if (!expected) return
      const before = {
        scrollY: window.scrollY,
        hash: window.location.hash,
        expanded: element.getAttribute('aria-expanded'),
      }
      window.setTimeout(() => {
        const succeeded = expectedOutcomeSucceeded(expected, before, {
          scrollY: window.scrollY,
          hash: window.location.hash,
          expanded: element.getAttribute('aria-expanded'),
          elementPresent: document.contains(element),
          pageHidden: document.visibilityState === 'hidden',
        })
        if (!succeeded) push('dead_click', { sectionId: sectionFor(element), elementId: element.dataset.analyticsId })
      }, 1_000)
    }

    const seenSections = new Set<string>()
    const sectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25 && id && !seenSections.has(id)) {
          seenSections.add(id)
          push('section_view', { sectionId: id })
        }
      }
    }, { threshold: [0.25] })
    document.querySelectorAll<HTMLElement>('main section[id]').forEach((section) => sectionObserver.observe(section))

    push('page_view')
    if (experiment && document.querySelector('#hero h1')) {
      push('experiment_exposure', { elementId: experiment.variantKey })
    }
    void flush(false)
    onCLS((metric) => push('web_vital', { metricName: 'CLS', value: metric.value }))
    onINP((metric) => push('web_vital', { metricName: 'INP', value: metric.value }))
    onLCP((metric) => push('web_vital', { metricName: 'LCP', value: metric.value }))

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerover', onPointerOver, { passive: true })
    document.addEventListener('pointerout', onPointerOut, { passive: true })
    document.addEventListener('pointerup', onPointerUp, { passive: true })
    document.addEventListener('click', onClick, true)
    window.addEventListener(ANALYTICS_CLIENT_EVENT, onClientAnalytics)
    const onPageHide = () => void flush(true)
    window.addEventListener('pagehide', onPageHide)
    flushTimer = window.setInterval(() => void flush(false), 10_000)

    return () => {
      disposed = true
      if (flushTimer) window.clearInterval(flushTimer)
      sectionObserver.disconnect()
      document.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerout', onPointerOut)
      document.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('click', onClick, true)
      window.removeEventListener(ANALYTICS_CLIENT_EVENT, onClientAnalytics)
      window.removeEventListener('pagehide', onPageHide)
      void flush(true)
      window.__cccAnalyticsMounted = false
    }
  }, [enabled, experiment, heatmapSample])

  return null
}
