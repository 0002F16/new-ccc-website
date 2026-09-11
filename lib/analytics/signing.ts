import { createHmac, timingSafeEqual } from 'node:crypto'

function secret() {
  const value = process.env.ANALYTICS_HMAC_SECRET
  if (!value && process.env.NODE_ENV === 'production') return null
  return value || 'ccc-local-development-only-secret'
}

export function signIdentifier(id: string): string | null {
  const key = secret()
  if (!key) return null
  const signature = createHmac('sha256', key).update(id).digest('base64url')
  return `${id}.${signature}`
}

export function verifyIdentifier(value: string | undefined): string | null {
  if (!value) return null
  const dot = value.lastIndexOf('.')
  if (dot < 1) return null
  const id = value.slice(0, dot)
  const expected = signIdentifier(id)
  if (!expected) return null
  const actualBuffer = Buffer.from(value)
  const expectedBuffer = Buffer.from(expected)
  if (actualBuffer.length !== expectedBuffer.length) return null
  return timingSafeEqual(actualBuffer, expectedBuffer) ? id : null
}

export function deterministicBucket(visitorId: string, experimentId: string): number {
  const key = secret() || 'disabled'
  const digest = createHmac('sha256', key)
    .update(`${visitorId}:${experimentId}`)
    .digest()
  return digest.readUInt32BE(0) % 10_000
}

export function isHeatmapSample(sessionId: string): boolean {
  return deterministicBucket(sessionId, 'heatmap-v1') < 2_000
}

