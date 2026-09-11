import { NextRequest, NextResponse } from 'next/server'
import { validSameOrigin } from '@/lib/analytics/request'

export async function POST(request: NextRequest) {
  if (!validSameOrigin(request)) return new NextResponse('Forbidden', { status: 403 })
  const response = NextResponse.redirect(new URL('/?analytics=off', request.url), 303)
  for (const name of ['ccc_visitor', 'ccc_session', 'ccc_internal']) {
    response.cookies.set(name, '', { path: '/', maxAge: 0 })
  }
  response.cookies.set('ccc_analytics_optout', '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
  })
  return response
}
