import type { NextRequest } from 'next/server'

const PRODUCTION_FALLBACK = 'https://capitalcareerclub.com'

/** Build redirects from the public origin, never the private Next.js listener. */
export function publicUrl(request: NextRequest, path: string) {
  const configured = process.env.SITE_URL?.trim()
  let base = request.nextUrl.origin
  if (process.env.NODE_ENV === 'production') {
    try {
      const candidate = new URL(configured || PRODUCTION_FALLBACK)
      base = candidate.protocol === 'https:' && !['localhost', '127.0.0.1'].includes(candidate.hostname)
        ? candidate.origin
        : PRODUCTION_FALLBACK
    } catch {
      base = PRODUCTION_FALLBACK
    }
  }
  return new URL(path, base)
}
