import { NextRequest, NextResponse } from 'next/server'
import { isAutomatedUserAgent } from '@/lib/analytics/request'

const VISITOR_COOKIE = 'ccc_visitor'
const SESSION_COOKIE = 'ccc_session'
const OPTOUT_COOKIE = 'ccc_analytics_optout'
const INTERNAL_COOKIE = 'ccc_internal'

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function signature(id: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signed = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(id))
  return bytesToBase64Url(new Uint8Array(signed))
}

async function signedIdentifier(id: string, secret: string) {
  return `${id}.${await signature(id, secret)}`
}

async function readIdentifier(value: string | undefined, secret: string) {
  if (!value) return null
  const dot = value.lastIndexOf('.')
  if (dot < 1) return null
  const id = value.slice(0, dot)
  const expected = await signedIdentifier(id, secret)
  return value === expected ? id : null
}

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const secret = process.env.ANALYTICS_HMAC_SECRET ||
    (process.env.NODE_ENV === 'production' ? '' : 'ccc-local-development-only-secret')
  const optedOut =
    request.cookies.get(OPTOUT_COOKIE)?.value === '1' ||
    request.headers.get('sec-gpc') === '1' ||
    request.headers.get('dnt') === '1' ||
    isAutomatedUserAgent(request.headers.get('user-agent'))

  const internal = secret
    ? await readIdentifier(request.cookies.get(INTERNAL_COOKIE)?.value, secret)
    : null

  if (!secret || process.env.ANALYTICS_ENABLED === 'false' || optedOut || internal === '1') {
    requestHeaders.set('x-ccc-tracking', '0')
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  let visitorId = await readIdentifier(request.cookies.get(VISITOR_COOKIE)?.value, secret)
  let sessionId = await readIdentifier(request.cookies.get(SESSION_COOKIE)?.value, secret)
  let visitorCookie: string | null = null
  let sessionCookie: string | null = null

  if (!visitorId) {
    visitorId = crypto.randomUUID()
    visitorCookie = await signedIdentifier(visitorId, secret)
  }
  if (!sessionId) {
    sessionId = crypto.randomUUID()
    sessionCookie = await signedIdentifier(sessionId, secret)
  }

  requestHeaders.set('x-ccc-tracking', '1')
  requestHeaders.set('x-ccc-visitor-id', visitorId)
  requestHeaders.set('x-ccc-session-id', sessionId)

  const response = NextResponse.next({ request: { headers: requestHeaders } })
  const secure = process.env.NODE_ENV === 'production'
  if (visitorCookie) {
    response.cookies.set(VISITOR_COOKIE, visitorCookie, {
      httpOnly: true,
      secure,
      sameSite: 'lax',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    })
  }
  response.cookies.set(SESSION_COOKIE, sessionCookie || request.cookies.get(SESSION_COOKIE)!.value, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: 30 * 60,
  })
  return response
}

export const config = { matcher: ['/'] }
