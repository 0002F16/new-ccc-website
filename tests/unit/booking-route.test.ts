import { afterEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from '@/app/book/[id]/route'
import { crmFetch } from '@/lib/crm'

vi.mock('@/lib/crm', () => ({ crmFetch: vi.fn() }))
const gate = vi.mocked(crmFetch)
const request = () => new NextRequest('https://capitalcareerclub.com/book/lead-1?token=signed-token')
const params = { params: Promise.resolve({ id: 'lead-1' }) }

afterEach(() => { gate.mockReset(); vi.unstubAllEnvs() })

describe('CCC email booking link', () => {
  it('redirects an open link to Calendly without leaking the signed URL as a referrer', async () => {
    gate.mockResolvedValue(new Response(JSON.stringify({ status: 'open', destination: 'https://calendly.com/ccc/job?utm_content=opaque' }), { status: 200 }))
    const response = await GET(request(), params)
    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('https://calendly.com/ccc/job?utm_content=opaque')
    expect(response.headers.get('referrer-policy')).toBe('no-referrer')
    expect(response.headers.get('cache-control')).toContain('no-store')
    expect(gate).toHaveBeenCalledWith('/api/booking/gate', expect.objectContaining({ method: 'POST', body: JSON.stringify({ id: 'lead-1', token: 'signed-token' }) }))
  })

  it.each(['booked', 'expired', 'invalid'])('keeps a %s link on a CCC status page', async (status) => {
    gate.mockResolvedValue(new Response(JSON.stringify({ status }), { status: 200 }))
    const response = await GET(request(), params)
    expect(response.headers.get('location')).toBe(`https://capitalcareerclub.com/booking/status?state=${status}`)
    expect(response.headers.get('location')).not.toContain('signed-token')
  })

  it('refuses a non-Calendly destination returned by the CRM', async () => {
    gate.mockResolvedValue(new Response(JSON.stringify({ status: 'open', destination: 'https://example.com/collect' }), { status: 200 }))
    const response = await GET(request(), params)
    expect(response.headers.get('location')).toContain('state=unavailable')
  })

  it('uses the public website origin behind the production reverse proxy', async () => {
    vi.stubEnv('NODE_ENV', 'production')
    gate.mockResolvedValue(new Response(JSON.stringify({ status: 'expired' }), { status: 200 }))
    const response = await GET(new NextRequest('https://localhost:3210/book/lead-1?token=signed-token'), params)
    expect(response.headers.get('location')).toBe('https://capitalcareerclub.com/booking/status?state=expired')
  })
})
