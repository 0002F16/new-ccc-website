import { NextRequest, NextResponse } from 'next/server'
import { validSameOrigin, withinRateLimit } from '@/lib/analytics/request'
import { CV_MAX_BYTES, validateApplication, validateCvFile, type ApplicationErrors } from '@/lib/applications/schema'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** A 10 MB CV plus the text fields and multipart overhead. Nginx caps at 12m. */
const MAX_BODY_BYTES = 11 * 1024 * 1024
const CRM_TIMEOUT_MS = 20_000
const TRY_AGAIN = 'We could not send your application just now. Please try again in a minute.'
const TOO_LARGE = 'That file is over 10 MB. Choose a smaller one, or paste a link.'

/**
 * POST /api/applications — the `#apply` form, as multipart/form-data.
 *
 * The CRM is the only store: this route validates, then forwards to the CRM's
 * `/api/intake` over localhost, with an uploaded CV carried as base64. Nothing
 * here is written to the analytics database, and no form value is ever logged.
 * If the CRM is unreachable the applicant is told to try again rather than
 * having the application dropped.
 */
export async function POST(request: NextRequest) {
  if (!validSameOrigin(request)) return NextResponse.json({ error: 'Invalid origin' }, { status: 403 })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!withinRateLimit(`apply:${ip}`, 8, 10 * 60_000)) {
    return NextResponse.json(
      { error: 'Too many attempts. Please wait a few minutes and try again.' },
      { status: 429 },
    )
  }

  if (Number(request.headers.get('content-length') || 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: TOO_LARGE, errors: { cv: TOO_LARGE } }, { status: 413 })
  }

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }
  const value = (key: string) => {
    const entry = form.get(key)
    return typeof entry === 'string' ? entry : ''
  }

  // Honeypot: a hidden field only bots fill. They get the success response.
  if (value('website').trim() !== '') return NextResponse.json({ ok: true })

  const entry = form.get('cvFile')
  const upload = entry instanceof File && entry.size > 0 ? entry : null
  if (upload && upload.size > CV_MAX_BYTES) {
    return NextResponse.json({ error: TOO_LARGE, errors: { cv: TOO_LARGE } }, { status: 413 })
  }

  const errors: ApplicationErrors = {}
  let cvFile: { name: string; type: string; base64: string } | null = null
  if (upload) {
    const bytes = new Uint8Array(await upload.arrayBuffer())
    const check = validateCvFile({ name: upload.name, size: upload.size }, bytes.subarray(0, 8))
    if (check.ok) cvFile = { name: check.name, type: check.type, base64: Buffer.from(bytes).toString('base64') }
    else errors.cv = check.error
  }

  const result = validateApplication(
    {
      name: value('name'),
      email: value('email'),
      phone: value('phone'),
      needJobBy: value('needJobBy'),
      reason: value('reason'),
      cvLink: value('cvLink'),
    },
    Boolean(upload),
  )
  if (!result.ok || errors.cv) {
    return NextResponse.json({ errors: { ...(result.ok ? {} : result.errors), ...errors } }, { status: 422 })
  }

  const intakeUrl = process.env.CRM_INTAKE_URL
  const intakeToken = process.env.CRM_INTAKE_TOKEN
  if (!intakeUrl || !intakeToken) {
    console.error('Application intake is not configured (CRM_INTAKE_URL / CRM_INTAKE_TOKEN)')
    return NextResponse.json({ error: TRY_AGAIN }, { status: 503 })
  }

  const application = result.data
  try {
    const response = await fetch(intakeUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-intake-token': intakeToken },
      body: JSON.stringify({
        source: 'website',
        segment: 'b2c',
        fullName: application.name,
        email: application.email,
        phone: application.phone,
        stageName: 'New',
        intake: { needJobBy: application.needJobBy },
        application: {
          reason: application.reason,
          cv: { link: application.cvLink || null, file: cvFile },
        },
      }),
      signal: AbortSignal.timeout(CRM_TIMEOUT_MS),
    })
    if (!response.ok) {
      console.error(`CRM intake rejected an application (status ${response.status})`)
      return NextResponse.json({ error: TRY_AGAIN }, { status: 503 })
    }
  } catch (error) {
    console.error('CRM intake unreachable', error instanceof Error ? error.name : 'unknown error')
    return NextResponse.json({ error: TRY_AGAIN }, { status: 503 })
  }

  return NextResponse.json({ ok: true })
}
