import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE, createAdminSession, verifyAdminPassword } from '@/lib/admin-auth'
import { validSameOrigin, withinRateLimit } from '@/lib/analytics/request'
import { publicUrl } from '@/lib/admin-url'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  if (!validSameOrigin(request)) return new NextResponse('Forbidden', { status: 403 })
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!withinRateLimit(`admin:${forwarded}`, 5, 15 * 60 * 1000)) {
    return NextResponse.redirect(publicUrl(request, '/admin/login?error=locked'), 303)
  }
  const data = await request.formData()
  const password = data.get('password')
  if (typeof password !== 'string' || !(await verifyAdminPassword(password))) {
    return NextResponse.redirect(publicUrl(request, '/admin/login?error=invalid'), 303)
  }
  const session = createAdminSession()
  if (!session) return new NextResponse('Admin authentication is not configured', { status: 503 })
  const response = NextResponse.redirect(publicUrl(request, '/admin/analytics'), 303)
  response.cookies.set(ADMIN_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 8 * 60 * 60,
  })
  return response
}
