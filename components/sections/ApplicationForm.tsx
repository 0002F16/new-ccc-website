'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Body,
  Button,
  Caption,
  ChoiceGroup,
  CvField,
  Display,
  Eyebrow,
  Field,
  H3,
  PhoneField,
  Reveal,
  Section,
  Stack,
} from '@/components/ui'
import {
  APPLICATION_FIELDS,
  NEED_JOB_BY,
  validateApplication,
  type ApplicationErrors,
  type ApplicationField,
} from '@/lib/applications/schema'
import { trackClientEvent } from '@/lib/analytics/client'

type Status = 'idle' | 'submitting' | 'sent'

/** DOM id of the element that takes focus for each field's error. */
const FOCUS_TARGET: Record<ApplicationField, string> = {
  name: 'name',
  email: 'email',
  phone: 'phone',
  needJobBy: `needJobBy-${NEED_JOB_BY[0].value}`,
  reason: 'reason',
  cv: 'cv-choose',
}

/**
 * The page's conversion point — see CLAUDE.md "Application form". It owns
 * `id="apply"`, which every CTA on the page targets. The hero button scrolls
 * here (smooth scroll is global CSS, off under reduced motion) and focus moves
 * to the first field so keyboard and screen-reader users land in the form.
 *
 * Submissions go to `/api/applications` as multipart form data (the CV may be a
 * file), and the route forwards them to the CRM. The answers are validated here
 * with the same rules the route uses, so most errors show without a round trip.
 *
 * Copy stays on the execution framing (CLAUDE.md OPEN, KRAZ): nothing here says
 * the applicant will be placed, represented or accepted.
 */
export function ApplicationForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<ApplicationErrors>({})
  const [sendError, setSendError] = useState<string | null>(null)
  const [firstName, setFirstName] = useState('')
  const confirmationRef = useRef<HTMLSpanElement>(null)
  const analyticsStarted = useRef(false)

  useEffect(() => {
    const focusFirstField = () => document.getElementById('name')?.focus({ preventScroll: true })
    if (window.location.hash === '#apply') focusFirstField()
    // A link to #apply does not fire `hashchange` when the hash is already
    // #apply, so listen for the clicks themselves as well.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href="#apply"]')
      if (link) window.setTimeout(focusFirstField, 0)
    }
    document.addEventListener('click', onClick)
    window.addEventListener('hashchange', focusFirstField)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', focusFirstField)
    }
  }, [])

  useEffect(() => {
    if (status === 'sent') confirmationRef.current?.focus()
  }, [status])

  const showErrors = (next: ApplicationErrors) => {
    setErrors(next)
    const first = APPLICATION_FIELDS.find((field) => next[field])
    if (first) window.setTimeout(() => document.getElementById(FOCUS_TARGET[first])?.focus(), 0)
  }

  const markApplicationStarted = (target: EventTarget) => {
    if (analyticsStarted.current || !(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return
    if (!target.name || target.name === 'website') return
    analyticsStarted.current = true
    trackClientEvent({ name: 'application_started', sectionId: 'apply' })
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return
    setSendError(null)
    trackClientEvent({ name: 'application_submit_attempted', sectionId: 'apply', elementId: 'apply-submit' })

    const formData = new FormData(event.currentTarget)
    const value = (key: string) => {
      const entry = formData.get(key)
      return typeof entry === 'string' ? entry : ''
    }
    const cvFile = formData.get('cvFile')
    const hasCvFile = cvFile instanceof File && cvFile.size > 0
    if (!hasCvFile) formData.delete('cvFile')

    const result = validateApplication(
      {
        name: value('name'),
        email: value('email'),
        phone: value('phone'),
        needJobBy: value('needJobBy'),
        reason: value('reason'),
        cvLink: value('cvLink'),
      },
      hasCvFile,
    )
    if (!result.ok) {
      showErrors(result.errors)
      const first = APPLICATION_FIELDS.find((field) => result.errors[field])
      trackClientEvent({
        name: 'application_validation_failed',
        sectionId: 'apply',
        elementId: first || 'unknown',
      })
      return
    }
    setErrors({})
    setStatus('submitting')

    try {
      const response = await fetch('/api/applications', { method: 'POST', body: formData })
      const body = (await response.json().catch(() => ({}))) as { errors?: ApplicationErrors; error?: string }
      if (response.ok) {
        setFirstName(result.data.name.split(/\s+/)[0] ?? '')
        setStatus('sent')
        trackClientEvent({
          name: 'application_submitted',
          sectionId: 'apply',
          elementId: 'apply-submit',
          immediate: true,
        })
        return
      }
      setStatus('idle')
      if ((response.status === 422 || response.status === 413) && body.errors) {
        showErrors(body.errors)
        const first = APPLICATION_FIELDS.find((field) => body.errors?.[field])
        trackClientEvent({ name: 'application_validation_failed', sectionId: 'apply', elementId: first || 'cv' })
      } else {
        const category = response.status === 429 ? 'rate-limited' : response.status >= 500 ? 'server' : 'rejected'
        trackClientEvent({ name: 'application_submit_failed', sectionId: 'apply', elementId: category })
        setSendError(body.error ?? 'We could not send your application just now. Please try again in a minute.')
      }
    } catch {
      setStatus('idle')
      trackClientEvent({ name: 'application_submit_failed', sectionId: 'apply', elementId: 'network' })
      setSendError('We could not reach our server. Check your connection and try again.')
    }
  }

  return (
    <Section id="apply" width="narrow" ariaLabel="Apply">
      <Stack gap="block">
        <Reveal>
          <div className="flex flex-col gap-tight text-center">
            <Eyebrow hairline={false}>The next step</Eyebrow>
            <Display as="h2" size="h2">
              Tell us where the search has got to
            </Display>
            <div className="pt-flow-m md:pt-flow">
              <Body>
                Six short questions. Every application is read by the team, and nothing is charged
                at this stage.
              </Body>
            </div>
          </div>
        </Reveal>

        <div aria-live="polite">
          {status === 'sent' ? (
            <div className="flex flex-col gap-flow-m text-center md:gap-flow">
              <H3>
                <span ref={confirmationRef} tabIndex={-1} className="outline-none">
                  Application received{firstName ? `, ${firstName}` : ''}
                </span>
              </H3>
              <Body>
                The team reads every application. If it looks like a fit, we will contact you by
                email or phone to arrange a 30-minute call.
              </Body>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={onSubmit}
              onInputCapture={(event) => markApplicationStarted(event.target)}
              onChangeCapture={(event) => markApplicationStarted(event.target)}
              className="flex flex-col gap-flow-m md:gap-flow"
            >
              <Field id="name" label="Full name" autoComplete="name" required maxLength={120} error={errors.name} />
              <Field
                id="email"
                label="Email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                maxLength={200}
                error={errors.email}
              />
              <PhoneField id="phone" label="Phone number" required error={errors.phone} />
              <ChoiceGroup
                name="needJobBy"
                legend="When do you need a new job by?"
                options={NEED_JOB_BY}
                required
                error={errors.needJobBy}
              />
              <Field
                id="reason"
                label="Why do you want to work with us?"
                as="textarea"
                required
                maxLength={600}
                error={errors.reason}
              />
              <CvField error={errors.cv} />

              {/* Honeypot. Off-screen and out of the tab order; people never see it. */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex flex-col items-center gap-flow-m pt-tight text-center md:gap-flow">
                {sendError && (
                  <p className="text-caption text-accent" role="alert">
                    {sendError}
                  </p>
                )}
                <Button analyticsId="apply-submit" type="submit" disabled={status === 'submitting'} />
                <Caption className="max-w-narrow">
                  Used only to review your application. We never pass it to an employer.
                </Caption>
              </div>
            </form>
          )}
        </div>
      </Stack>
    </Section>
  )
}
