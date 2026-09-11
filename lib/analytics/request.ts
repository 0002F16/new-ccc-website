import type { NextRequest } from 'next/server'

const BOT_PATTERN = /bot|crawler|spider|headless|preview|lighthouse|pagespeed/i
const counters = new Map<string, { started: number; count: number }>()

export function isAutomatedUserAgent(userAgent: string | null | undefined) {
  return BOT_PATTERN.test(userAgent || '')
}

export function isAutomatedRequest(request: NextRequest) {
  return isAutomatedUserAgent(request.headers.get('user-agent'))
}

export function privacySignalEnabled(request: NextRequest) {
  return request.headers.get('sec-gpc') === '1' || request.headers.get('dnt') === '1'
}

export function validSameOrigin(request: NextRequest) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    const supplied = new URL(origin)
    const canonical = new URL(process.env.SITE_URL || request.nextUrl.origin)
    if (process.env.NODE_ENV !== 'production' && ['localhost', '127.0.0.1'].includes(supplied.hostname)) return true
    const requestHost = request.headers.get('x-forwarded-host') || request.headers.get('host')
    return supplied.protocol === 'https:' && (supplied.host === canonical.host || supplied.host === requestHost)
  } catch {
    return false
  }
}

export function withinRateLimit(key: string, limit = 120, windowMs = 60_000) {
  const now = Date.now()
  const existing = counters.get(key)
  if (!existing || existing.started + windowMs <= now) {
    counters.set(key, { started: now, count: 1 })
    return true
  }
  existing.count += 1
  if (counters.size > 10_000) {
    for (const [candidate, value] of counters) {
      if (value.started + windowMs <= now) counters.delete(candidate)
    }
  }
  return existing.count <= limit
}
