import { NextRequest, NextResponse } from 'next/server'
import { ingestAnalyticsBatch } from '@/lib/analytics/store'
import { verifyIdentifier } from '@/lib/analytics/signing'
import { analyticsBatchSchema } from '@/lib/analytics/validation'
import { isAutomatedRequest, privacySignalEnabled, validSameOrigin, withinRateLimit } from '@/lib/analytics/request'
import { sanitizeAttribution, sanitizePath } from '@/lib/analytics/privacy'
import { assignExperiment, getExperimentDefinition } from '@/lib/analytics/experiments'
import { resolveAnalyticsGeo } from '@/lib/analytics/geo'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 64 * 1024

export async function POST(request: NextRequest) {
  if (!validSameOrigin(request) || isAutomatedRequest(request) || privacySignalEnabled(request)) {
    return new NextResponse(null, { status: 204 })
  }
  if (request.cookies.get('ccc_analytics_optout')?.value === '1' || request.cookies.has('ccc_internal')) {
    return new NextResponse(null, { status: 204 })
  }
  const declaredLength = Number(request.headers.get('content-length') || 0)
  if (declaredLength > MAX_BODY_BYTES) return NextResponse.json({ error: 'Payload too large' }, { status: 413 })

  const visitorId = verifyIdentifier(request.cookies.get('ccc_visitor')?.value)
  const sessionId = verifyIdentifier(request.cookies.get('ccc_session')?.value)
  if (!visitorId || !sessionId) return new NextResponse(null, { status: 204 })
  if (!withinRateLimit(sessionId)) return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 })

  let text: string
  try {
    text = await request.text()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
  if (Buffer.byteLength(text, 'utf8') > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  let candidate: unknown
  try {
    candidate = JSON.parse(text)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const parsed = analyticsBatchSchema.safeParse(candidate)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid analytics batch' }, { status: 400 })

  if (parsed.data.experiment) {
    const definition = getExperimentDefinition(parsed.data.experiment.experimentId, parsed.data.experiment.version)
    const expected = assignExperiment(visitorId, definition || null)
    if (!expected || expected.variantKey !== parsed.data.experiment.variantKey) {
      return NextResponse.json({ error: 'Invalid experiment assignment' }, { status: 400 })
    }
  }

  const batch = {
    ...parsed.data,
    path: sanitizePath(parsed.data.path),
    attribution: sanitizeAttribution(parsed.data.attribution),
  }
  try {
    const geo = await resolveAnalyticsGeo(request.headers.get('x-real-ip'))
    await ingestAnalyticsBatch({ visitorId, sessionId }, batch, geo)
  } catch (error) {
    // Analytics must never make the public page fail. PM2 logs retain the error
    // for the health check and operator without leaking infrastructure details.
    console.error('Analytics ingestion failed', error)
  }
  return NextResponse.json({ accepted: true }, { status: 202 })
}
