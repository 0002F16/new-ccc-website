import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/admin-auth'
import { validSameOrigin } from '@/lib/analytics/request'
import { signIdentifier } from '@/lib/analytics/signing'
import { publicUrl } from '@/lib/admin-url'

export async function POST(request: NextRequest) {
  if (!validSameOrigin(request)) return new NextResponse('Forbidden', { status: 403 })
  if (!verifyAdminSession(request.cookies.get('ccc_admin_session')?.value)) {
    return NextResponse.redirect(publicUrl(request, '/admin/login'), 303)
  }
  const data = await request.formData()
  const enabled = data.get('enabled') === 'true'
  const response = NextResponse.redirect(publicUrl(request, '/admin/analytics'), 303)
  if (enabled) {
    const signed = signIdentifier('1')
    if (!signed) return new NextResponse('Analytics signing is not configured', { status: 503 })
    response.cookies.set('ccc_internal', signed, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 365 * 24 * 60 * 60,
    })
    response.cookies.set('ccc_visitor', '', { path: '/', maxAge: 0 })
    response.cookies.set('ccc_session', '', { path: '/', maxAge: 0 })
  } else {
    response.cookies.set('ccc_internal', '', { path: '/', maxAge: 0 })
  }
  return response
}
