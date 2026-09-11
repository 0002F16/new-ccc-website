/**
 * Server-to-server calls to the CRM on the same box. The CRM origin comes from
 * CRM_INTAKE_URL and the shared secret is CRM_INTAKE_TOKEN (the CRM's INTAKE_TOKEN).
 */
export async function crmFetch(path: string, init: RequestInit = {}) {
  const intakeUrl = process.env.CRM_INTAKE_URL
  const token = process.env.CRM_INTAKE_TOKEN
  if (!intakeUrl || !token) throw new Error('CRM is not configured (CRM_INTAKE_URL / CRM_INTAKE_TOKEN)')
  return fetch(new URL(path, new URL(intakeUrl).origin), {
    ...init,
    headers: { 'content-type': 'application/json', 'x-intake-token': token, ...init.headers },
    cache: 'no-store',
    signal: AbortSignal.timeout(20_000),
  })
}

/** The CRM's `{ error }` message, or a fallback. */
export async function crmError(response: Response, fallback: string) {
  const body = await response.json().catch(() => null)
  return typeof body?.error === 'string' ? body.error : fallback
}
