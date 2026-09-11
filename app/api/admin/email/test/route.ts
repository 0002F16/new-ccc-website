import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/admin-auth'
import { validSameOrigin } from '@/lib/analytics/request'
import { publicUrl } from '@/lib/admin-url'
import { crmError, crmFetch } from '@/lib/crm'

/** Sends one template to a test address through the CRM. */
export async function POST(request: NextRequest) {
  if (!validSameOrigin(request)) return new NextResponse('Forbidden', { status: 403 })
  if (!verifyAdminSession(request.cookies.get('ccc_admin_session')?.value)) {
    return NextResponse.redirect(publicUrl(request, '/admin/login'), 303)
  }
  const data = await request.formData()
  const back = (query: string) => NextResponse.redirect(publicUrl(request, `/admin/email?${query}`), 303)
  try {
    const response = await crmFetch('/api/email-settings/test', {
      method: 'POST',
      body: JSON.stringify({ to: String(data.get('to') ?? ''), kind: String(data.get('kind') ?? '') }),
    })
    if (!response.ok) return back(`error=${encodeURIComponent(await crmError(response, 'Test send failed.'))}`)
    return back('tested=1')
  } catch {
    return back(`error=${encodeURIComponent('The CRM is unreachable.')}`)
  }
}
