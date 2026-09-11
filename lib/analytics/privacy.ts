import type { Attribution, DeviceBucket } from './types'

const SAFE_VALUE = /^[\p{L}\p{N} ._~:@/+\-]*$/u

export function sanitizeValue(value: unknown, max = 120): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim().slice(0, max)
  if (!trimmed || !SAFE_VALUE.test(trimmed)) return undefined
  return trimmed
}

export function sanitizePath(value: unknown): string {
  if (typeof value !== 'string' || !value.startsWith('/')) return '/'
  return value.split(/[?#]/, 1)[0].slice(0, 240)
}

export function sanitizeReferrer(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value) return undefined
  try {
    const host = new URL(value).hostname.toLowerCase()
    return sanitizeValue(host, 160)
  } catch {
    return sanitizeValue(value.toLowerCase(), 160)
  }
}

export function sanitizeAttribution(input: Record<string, unknown>): Attribution {
  return {
    utmSource: sanitizeValue(input.utmSource),
    utmMedium: sanitizeValue(input.utmMedium),
    utmCampaign: sanitizeValue(input.utmCampaign),
    utmContent: sanitizeValue(input.utmContent),
    utmTerm: sanitizeValue(input.utmTerm),
    referrerHost: sanitizeReferrer(input.referrerHost),
  }
}

export function deviceBucket(width: number): DeviceBucket {
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

