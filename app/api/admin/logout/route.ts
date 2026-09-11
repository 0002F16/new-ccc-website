import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_COOKIE } from '@/lib/admin-auth'
import { publicUrl } from '@/lib/admin-url'

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(publicUrl(request, '/admin/login'), 303)
  response.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 })
  return response
}
