import { NextRequest, NextResponse } from 'next/server'
import { crmFetch } from '@/lib/crm'
import { publicUrl } from '@/lib/admin-url'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Gate = { status: 'open'; destination: string } | { status: 'booked' | 'expired' | 'invalid' | 'unavailable' }
const privateHeaders = { 'cache-control': 'private, no-store, max-age=0', 'referrer-policy': 'no-referrer', 'x-robots-tag': 'noindex' }

/** The signed email link lands here. Valid, unbooked visits redirect to Calendly. */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const token = req.nextUrl.searchParams.get('token') ?? ''
  let result: Gate = { status: 'unavailable' }
  try {
    const response = await crmFetch('/api/booking/gate', {
      method: 'POST', body: JSON.stringify({ id, token }),
    })
    if (response.ok) result = (await response.json()) as Gate
  } catch { /* The status page tells the client to retry. */ }

  if (result.status === 'open') {
    try {
      const destination = new URL(result.destination)
      const demoDestination = process.env.BOOKING_DEMO_MODE === '1' && destination.origin === req.nextUrl.origin
        && destination.pathname === '/demo/calendly'
      if ((destination.protocol === 'https:' && ['calendly.com', 'www.calendly.com'].includes(destination.hostname)) || demoDestination) {
        return NextResponse.redirect(destination, { status: 302, headers: privateHeaders })
      }
    } catch { /* Malformed CRM destination is an unavailable state. */ }
    result = { status: 'unavailable' }
  }
  return NextResponse.redirect(publicUrl(req, `/booking/status?state=${result.status}`), { status: 302, headers: privateHeaders })
}
