import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import {
  CV_MAX_BYTES,
  normalizeCvLink,
  normalizePhone,
  validateApplication,
  validateCvFile,
} from '@/lib/applications/schema'
import { POST } from '@/app/api/applications/route'

const PDF_HEAD = [0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34] // %PDF-1.4
const pdfBytes = (size = 64) => {
  const bytes = new Uint8Array(size)
  bytes.set(PDF_HEAD)
  return bytes
}

const valid = {
  name: 'Ada Nowak',
  email: 'ada@example.com',
  phone: '+48512345678',
  needJobBy: 'urgent_30d',
  reason: 'I want a team to run the search while I keep doing my current job.',
  cvLink: 'https://drive.google.com/file/d/abc/view',
}

describe('normalizePhone', () => {
  it.each([
    ['+48 512 345 678', '+48512345678'],
    ['+44 7911 123456', '+447911123456'],
    ['+49 1512 3456789', '+4915123456789'],
  ])('accepts %s', (input, expected) => {
    expect(normalizePhone(input)).toBe(expected)
  })

  it.each(['', '512345678', '+48 12', 'call me', '+999 123'])('rejects %j', (input) => {
    expect(normalizePhone(input)).toBeNull()
  })
})

describe('normalizeCvLink', () => {
  it('adds https and keeps real links', () => {
    expect(normalizeCvLink('drive.google.com/file/d/abc')).toBe('https://drive.google.com/file/d/abc')
    expect(normalizeCvLink('https://dropbox.com/s/x/cv.pdf')).toBe('https://dropbox.com/s/x/cv.pdf')
  })
  it('rejects things that are not links', () => {
    expect(normalizeCvLink('my cv')).toBeNull()
    expect(normalizeCvLink('javascript:alert(1)')).toBeNull()
  })
})

describe('validateCvFile', () => {
  it('accepts a real PDF and cleans the name', () => {
    const result = validateCvFile({ name: '../../My CV (2026).pdf', size: 64 }, pdfBytes().subarray(0, 8))
    expect(result).toEqual({ ok: true, kind: 'pdf', name: 'My CV (2026).pdf', type: 'application/pdf' })
  })
  it('accepts a DOCX by its ZIP header', () => {
    const head = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0, 0, 0, 0])
    expect(validateCvFile({ name: 'cv.docx', size: 10 }, head).ok).toBe(true)
  })
  it('rejects a renamed executable', () => {
    const head = new Uint8Array([0x4d, 0x5a, 0x90, 0, 0, 0, 0, 0]) // MZ
    const result = validateCvFile({ name: 'cv.pdf', size: 10 }, head)
    expect(result.ok).toBe(false)
  })
  it('rejects other extensions, empty files and oversized files', () => {
    expect(validateCvFile({ name: 'cv.png', size: 10 }, pdfBytes()).ok).toBe(false)
    expect(validateCvFile({ name: 'cv.pdf', size: 0 }, pdfBytes()).ok).toBe(false)
    expect(validateCvFile({ name: 'cv.pdf', size: CV_MAX_BYTES + 1 }, pdfBytes()).ok).toBe(false)
  })
})

describe('validateApplication', () => {
  it('accepts a link CV', () => {
    const result = validateApplication(valid, false)
    expect(result.ok && result.data.phone).toBe('+48512345678')
  })
  it('accepts a file CV without a link', () => {
    expect(validateApplication({ ...valid, cvLink: '' }, true).ok).toBe(true)
  })
  it('requires a file or a link', () => {
    const result = validateApplication({ ...valid, cvLink: '' }, false)
    expect(result.ok ? null : result.errors.cv).toBe('Attach your CV (PDF or Word, up to 10 MB).')
  })
  it('reports a bad link against the CV field', () => {
    const result = validateApplication({ ...valid, cvLink: 'not a link' }, false)
    expect(result.ok ? null : result.errors.cv).toMatch(/full link/)
  })
  it('shows every field error, the CV one included, on an empty submit', () => {
    const result = validateApplication({}, false)
    expect(result.ok ? [] : Object.keys(result.errors).sort()).toEqual(
      ['cv', 'email', 'name', 'needJobBy', 'phone', 'reason'].sort(),
    )
  })
  it('explains a phone number with the wrong digits', () => {
    const result = validateApplication({ ...valid, phone: '+4812' }, false)
    expect(result.ok ? null : result.errors.phone).toMatch(/country code/)
  })
})

describe('POST /api/applications', () => {
  let ipCounter = 0
  const request = (fields: Record<string, string | File>, headers: Record<string, string> = {}) => {
    const form = new FormData()
    for (const [key, value] of Object.entries(fields)) form.append(key, value)
    return new NextRequest('http://localhost:3210/api/applications', {
      method: 'POST',
      headers: { origin: 'http://localhost:3210', 'x-forwarded-for': `10.1.0.${(ipCounter += 1)}`, ...headers },
      body: form,
    })
  }

  beforeEach(() => {
    process.env.CRM_INTAKE_URL = 'http://crm.test/api/intake'
    process.env.CRM_INTAKE_TOKEN = 'test-token'
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('forwards a link application to the CRM intake', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)
    const response = await POST(request({ ...valid, phone: '+48 512 345 678' }))
    expect(response.status).toBe(200)
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('http://crm.test/api/intake')
    expect(init.headers['x-intake-token']).toBe('test-token')
    expect(JSON.parse(init.body)).toMatchObject({
      source: 'website',
      fullName: 'Ada Nowak',
      phone: '+48512345678',
      stageName: 'New',
      intake: { needJobBy: 'urgent_30d' },
      application: { reason: valid.reason, cv: { link: valid.cvLink, file: null } },
    })
  })

  it('forwards an uploaded PDF as base64', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 201 }))
    vi.stubGlobal('fetch', fetchMock)
    const bytes = pdfBytes(128)
    const response = await POST(
      request({ ...valid, cvLink: '', cvFile: new File([bytes], 'Ada CV.pdf', { type: 'application/pdf' }) }),
    )
    expect(response.status).toBe(200)
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(sent.application.cv.link).toBeNull()
    expect(sent.application.cv.file.name).toBe('Ada CV.pdf')
    expect(sent.application.cv.file.type).toBe('application/pdf')
    expect(Buffer.from(sent.application.cv.file.base64, 'base64')).toEqual(Buffer.from(bytes))
  })

  it('rejects a renamed executable with 422 and sends nothing', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const fake = new File([new Uint8Array([0x4d, 0x5a, 0, 0, 0, 0, 0, 0])], 'cv.pdf')
    const response = await POST(request({ ...valid, cvLink: '', cvFile: fake }))
    expect(response.status).toBe(422)
    expect((await response.json()).errors.cv).toMatch(/real PDF/)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects a file over 10 MB with 413', async () => {
    vi.stubGlobal('fetch', vi.fn())
    const big = new File([pdfBytes(CV_MAX_BYTES + 1)], 'cv.pdf', { type: 'application/pdf' })
    const response = await POST(request({ ...valid, cvLink: '', cvFile: big }))
    expect(response.status).toBe(413)
    expect((await response.json()).errors.cv).toMatch(/10 MB/)
  })

  it('returns field errors with 422 when the CV is missing', async () => {
    vi.stubGlobal('fetch', vi.fn())
    const response = await POST(request({ ...valid, cvLink: '' }))
    expect(response.status).toBe(422)
    expect((await response.json()).errors.cv).toBe('Attach your CV (PDF or Word, up to 10 MB).')
  })

  it('answers a filled honeypot with success and sends nothing', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const response = await POST(request({ ...valid, website: 'spam.example' }))
    expect(response.status).toBe(200)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('rejects a cross-origin post', async () => {
    const response = await POST(request(valid, { origin: 'https://evil.example' }))
    expect(response.status).toBe(403)
  })

  it('returns 503 without logging form values when the CRM fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 500 })))
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    const response = await POST(request(valid))
    expect(response.status).toBe(503)
    expect(JSON.stringify(log.mock.calls)).not.toContain('ada@example.com')
  })

  it('returns 503 when the CRM is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('fetch failed')))
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect((await POST(request(valid))).status).toBe(503)
  })

  it('rate-limits repeated attempts from one address', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}', { status: 201 })))
    const statuses: number[] = []
    for (let attempt = 0; attempt < 9; attempt += 1) {
      statuses.push((await POST(request(valid, { 'x-forwarded-for': '192.0.2.88' }))).status)
    }
    expect(statuses.slice(0, 8).every((status) => status === 200)).toBe(true)
    expect(statuses[8]).toBe(429)
  })
})
