import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/admin-auth'
import { validSameOrigin } from '@/lib/analytics/request'
import { publicUrl } from '@/lib/admin-url'
import { crmError, crmFetch } from '@/lib/crm'

const KINDS = ['received', 'accepted', 'rejected'] as const

/** Saves /admin/email to the CRM, which stores it and encrypts the app password. */
export async function POST(request: NextRequest) {
  if (!validSameOrigin(request)) return new NextResponse('Forbidden', { status: 403 })
  if (!verifyAdminSession(request.cookies.get('ccc_admin_session')?.value)) {
    return NextResponse.redirect(publicUrl(request, '/admin/login'), 303)
  }
  const data = await request.formData()
  const field = (name: string) => String(data.get(name) ?? '')
  const back = (query: string) => NextResponse.redirect(publicUrl(request, `/admin/email?${query}`), 303)
  try {
    const response = await crmFetch('/api/email-settings', {
      method: 'PUT',
      body: JSON.stringify({
        enabled: data.get('enabled') === 'on',
        fromName: field('fromName'),
        fromEmail: field('fromEmail'),
        password: field('password'),
        templates: Object.fromEntries(
          KINDS.map((kind) => [kind, { subject: field(`${kind}_subject`), body: field(`${kind}_body`) }]),
        ),
      }),
    })
    if (!response.ok) return back(`error=${encodeURIComponent(await crmError(response, 'Could not save.'))}`)
    return back('saved=1')
  } catch {
    return back(`error=${encodeURIComponent('The CRM is unreachable.')}`)
  }
}
