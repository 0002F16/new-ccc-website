import { z } from 'zod'
import { isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js/min'

/**
 * The application form's contract, shared by the client (instant field errors)
 * and `/api/applications` (the authority). Values of `needJobBy` are the CRM's
 * own `NEED_BY` codes (crm/lib/intake.ts), so the lead drawer's select shows the
 * applicant's answer without a translation table on either side.
 */
export const NEED_JOB_BY = [
  { value: 'urgent_30d', label: 'Within a month' },
  { value: '1_2m', label: 'In 1–2 months' },
  { value: '3_6m', label: 'In 3–6 months' },
  { value: 'exploring', label: 'Just exploring' },
] as const

type NeedJobBy = (typeof NEED_JOB_BY)[number]['value']
const NEED_JOB_BY_VALUES = NEED_JOB_BY.map((option) => option.value) as [NeedJobBy, ...NeedJobBy[]]

/** Field order on the page. The first invalid one in this order gets focus. */
export const APPLICATION_FIELDS = ['name', 'email', 'phone', 'needJobBy', 'reason', 'cv'] as const
export type ApplicationField = (typeof APPLICATION_FIELDS)[number]
export type ApplicationErrors = Partial<Record<ApplicationField, string>>

export const CV_MAX_BYTES = 10 * 1024 * 1024
export const CV_TYPES = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
} as const
export type CvKind = keyof typeof CV_TYPES
export const CV_ACCEPT = ['.pdf', '.doc', '.docx', ...Object.values(CV_TYPES)].join(',')

/** Leading bytes of each accepted format. The extension alone proves nothing. */
const CV_MAGIC: Record<CvKind, number[]> = {
  pdf: [0x25, 0x50, 0x44, 0x46], // %PDF
  docx: [0x50, 0x4b, 0x03, 0x04], // ZIP container
  doc: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1], // OLE compound file
}

const CV_REQUIRED = 'Attach your CV (PDF or Word, up to 10 MB).'

/** E.164 (`+48512345678`) for a valid international number, else null. */
export function normalizePhone(raw: string): string | null {
  const value = raw.trim()
  if (!value.startsWith('+') || !isValidPhoneNumber(value)) return null
  return parsePhoneNumberFromString(value)?.number ?? null
}

/** An http(s) link, with `https://` added when the scheme was left off. */
export function normalizeCvLink(raw: string): string | null {
  let value = raw.trim()
  if (!value) return null
  if (!/^https?:\/\//i.test(value)) value = `https://${value}`
  try {
    const url = new URL(value)
    if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.')) return null
    return url.toString()
  } catch {
    return null
  }
}

/** Checks size, extension and leading bytes; returns a safe display name. */
export function validateCvFile(
  meta: { name: string; size: number },
  head: Uint8Array,
): { ok: true; kind: CvKind; name: string; type: string } | { ok: false; error: string } {
  if (meta.size === 0) return { ok: false, error: 'That file is empty. Choose another, or paste a link.' }
  if (meta.size > CV_MAX_BYTES) {
    return { ok: false, error: 'That file is over 10 MB. Choose a smaller one, or paste a link.' }
  }
  const extension = (meta.name.split('.').pop() || '').toLowerCase()
  if (!(extension in CV_TYPES)) {
    return { ok: false, error: 'Upload a PDF or Word document (.pdf, .doc or .docx).' }
  }
  const kind = extension as CvKind
  if (!CV_MAGIC[kind].every((byte, index) => head[index] === byte)) {
    return { ok: false, error: 'That file does not look like a real PDF or Word document.' }
  }
  const base = (meta.name.split(/[\\/]/).pop() || 'cv').replace(/\.[^.]*$/, '')
  const clean =
    base
      .replace(/[^A-Za-z0-9 ._()\-À-ɏ]+/g, '_')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 100) || 'cv'
  return { ok: true, kind, name: `${clean}.${kind}`, type: CV_TYPES[kind] }
}

export const applicationSchema = z.object({
  name: z
    .string({ error: 'Enter your full name.' })
    .trim()
    .min(2, 'Enter your full name.')
    .max(120, 'Keep your name under 120 characters.'),
  email: z
    .string({ error: 'Enter your email address.' })
    .trim()
    .max(200, 'Keep your email under 200 characters.')
    .email('Enter an email address like name@example.com.'),
  phone: z.string({ error: 'Enter your phone number.' }).transform((value, ctx) => {
    const trimmed = value.trim()
    if (!trimmed || trimmed === '+') {
      ctx.addIssue({ code: 'custom', message: 'Enter your phone number.' })
      return z.NEVER
    }
    const normalized = normalizePhone(trimmed)
    if (!normalized) {
      ctx.addIssue({ code: 'custom', message: 'That number does not look right. Check the country code and the digits.' })
      return z.NEVER
    }
    return normalized
  }),
  needJobBy: z.enum(NEED_JOB_BY_VALUES, { error: 'Choose when you need a new job by.' }),
  reason: z
    .string({ error: 'Tell us why you want to work with us.' })
    .trim()
    .min(1, 'Tell us why you want to work with us.')
    .min(20, 'Add a little more: two or three sentences is enough.')
    .max(600, 'Keep this under 600 characters.'),
  cvLink: z
    .string()
    .optional()
    .default('')
    .transform((value, ctx) => {
      if (!value.trim()) return ''
      const normalized = normalizeCvLink(value)
      if (!normalized) {
        ctx.addIssue({ code: 'custom', message: 'Paste a full link to your CV, like https://drive.google.com/…' })
        return z.NEVER
      }
      return normalized
    }),
})

export type Application = z.infer<typeof applicationSchema>

/** First message per field, keyed by field name. Link errors belong to the CV field. */
export function fieldErrors(error: z.ZodError): ApplicationErrors {
  const errors: ApplicationErrors = {}
  for (const issue of error.issues) {
    const key = issue.path[0] === 'cvLink' ? 'cv' : (issue.path[0] as ApplicationField | undefined)
    if (key && !errors[key]) errors[key] = issue.message
  }
  return errors
}

/**
 * Full check, including the CV rule the schema cannot see: a file or a link
 * must be present. Runs outside zod so the CV error shows alongside the rest
 * on an empty submit, instead of only after every other field is fixed.
 */
export function validateApplication(
  input: Record<string, unknown>,
  hasCvFile: boolean,
): { ok: true; data: Application } | { ok: false; errors: ApplicationErrors } {
  const parsed = applicationSchema.safeParse(input)
  const errors: ApplicationErrors = parsed.success ? {} : fieldErrors(parsed.error)
  const link = typeof input.cvLink === 'string' ? input.cvLink.trim() : ''
  if (!errors.cv && !hasCvFile && !link) errors.cv = CV_REQUIRED
  if (!parsed.success || Object.keys(errors).length > 0) return { ok: false, errors }
  return { ok: true, data: parsed.data }
}
