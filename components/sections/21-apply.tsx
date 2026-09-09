import {
  Body,
  Button,
  Caption,
  Display,
  Eyebrow,
  Field,
  OutcomeBadge,
  Section,
  Stack,
  Well,
} from '@/components/ui'

/**
 * 21. Apply for a fit call — Movement V, the page's conversion point.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 21. The section
 * owns `id="apply"`: every CTA on the page, and the sticky bar's retirement
 * observer, anchor here.
 *
 * ─── The state this section is in ───────────────────────────────────────────
 *
 * Two things this section needs do not exist, and both of them are the kind that
 * must not be improvised:
 *
 *   1. `[BLOCKED: working Calendly URL]` (deck § 21, owner). Every CTA on the
 *      live site points at a URL that redirects to the Calendly homepage, and it
 *      needs a human click to confirm. So there is no booking destination — no
 *      embed, no href, no third-party script.
 *   2. `[CONFIRM CONTROLLER, PROCESSORS, TRANSFERS]` (IA spec, Movement V,
 *      counsel). The four questions collect personal data and Calendly is a US
 *      processor. A form that collects personal data without a lawful-basis
 *      notice must not ship, and the notice is not mine to draft.
 *
 * ─── Three treatments considered ────────────────────────────────────────────
 *
 *   (a) Ship the booking route only — no form, one button pointing at Calendly
 *       when the URL lands. Rejected on the IA's own reasoning: "a reader told
 *       'we decline the majority of applicants' who then meets an unscreened
 *       open calendar has been given evidence the admissions story is
 *       marketing." § 18 is two sections above this one; an open calendar here
 *       contradicts it on the same screenful. The screen is the argument.
 *   (b) Ship the live form and post it somewhere provisional — a mailto, a
 *       placeholder endpoint, a `formspree`-shaped action to be swapped later.
 *       Rejected outright. That is the failure mode the second blocker exists to
 *       prevent: personal data moving with no stated controller, no stated
 *       processors and no stated transfer basis. A placeholder endpoint is a
 *       real endpoint the moment anyone types into it.
 *   (c) Chosen — build the written half and mark the missing half. The four
 *       questions are written copy and they are the section's substance, so they
 *       are rendered at full quality in the `Field` primitive. The two things
 *       that do not exist are rendered as house blocked slots, dashed, each
 *       naming its owner. The reader-facing section is therefore complete in
 *       everything the deck has written and visibly incomplete in exactly the
 *       two places where it is.
 *
 * ─── How submission is made impossible ──────────────────────────────────────
 *
 * Structurally, not by validation:
 *
 *   - **There is no `<form>` element.** The controls sit in a `<fieldset>`
 *     inside a plain `<div>`. With no form ancestor there is no implicit
 *     submission on Enter, no submit event to intercept, and nowhere for a
 *     browser to send anything.
 *   - No `action`, no `method`, no `formAction`, no `mailto:`, no endpoint
 *     constant, and no `<button type="submit">` anywhere in this file.
 *   - This is a server component. No `'use client'`, so no handler, no `fetch`,
 *     no third-party script and no analytics beacon can be attached to these
 *     inputs at runtime.
 *   - The one gold button is the shared `Button` primitive, which renders an
 *     anchor. It resolves to `#apply` — this section — so it is a self-anchor
 *     that navigates nowhere, and the blocked slot immediately beneath it states
 *     that the step it will eventually open does not exist yet.
 *
 * The fields stay enabled rather than `disabled` on purpose: a disabled form
 * reads as broken UI, while an enabled form under a dashed panel that says the
 * application cannot be sent reads as unfinished work. Unfinished is the true
 * state, and the second is the readable way to say it.
 *
 * ─── Deck vs IA ─────────────────────────────────────────────────────────────
 *
 * The IA asks the panel to carry "the fee in one line so nobody books to
 * discover the price". The deck's § 21 body does not state the figure — it
 * states "Nothing is charged before the call" — and the deck wins. The figure is
 * not absent, though: the fourth screening question is "Can you fund 6,000 PLN
 * at signature?", which puts the number in front of the reader before they book,
 * which is what the IA was actually protecting. Flagged in the report; nothing
 * is invented here to close the gap.
 *
 * The IA also specifies the Calendly widget embedded below the questions. With
 * no URL there is nothing to embed, and its fallback — confirm in page, then
 * `target="_blank"` — needs the same URL. Both are blocked on one thing.
 *
 * ─── Copy withheld ──────────────────────────────────────────────────────────
 *
 * The deck's three error messages are written and are not rendered. They are
 * validation states, and there is no validation, no submission and therefore no
 * error condition. Rendering them at rest would put three false alarms — and
 * three `accent` items — on a form nobody has touched. They are held for
 * whoever wires the endpoint.
 *
 * The deck's "Pick a time" button label is likewise not rendered as a control:
 * it belongs to the blocked booking step, and a blocked passage ships as
 * nothing. It is named inside the placeholder as build scaffolding.
 *
 * ─── Gold budget ────────────────────────────────────────────────────────────
 *
 * One accent: the primary button. Per the house accent rule the eyebrow is
 * built with `hairline={false}` rather than via `SectionHeader`, which has no
 * way to switch the hairline off.
 */

/** The four screening questions, verbatim from the deck's "Form labels". */
const QUESTIONS: readonly { id: string; label: string; type: string }[] = [
  { id: 'apply-experience', label: 'Years of relevant experience', type: 'number' },
  { id: 'apply-role', label: 'The role you are targeting', type: 'text' },
  { id: 'apply-in-poland', label: 'Are you currently in Poland?', type: 'text' },
  { id: 'apply-funding', label: 'Can you fund 6,000 PLN at signature?', type: 'text' },
] as const

export function Apply() {
  return (
    <Section id="apply" width="structure" ariaLabel="Apply">
      <Stack gap="block">
        {/* Header. Hairline off: the primary button spends this section's gold. */}
        <div className="mx-auto flex w-full max-w-text flex-col gap-tight text-center">
          <Eyebrow hairline={false}>The next step</Eyebrow>
          <Display as="h2" size="h2">
            Tell us where the search has got to
          </Display>
          <div className="pt-flow-m md:pt-flow">
            <Body>
              Four questions, then you pick a time. Thirty minutes, and it ends in a yes or a no. If
              it is a yes we will walk you through the agreement and the fee before you commit to
              anything. Nothing is charged before the call.
            </Body>
          </div>
        </div>

        {/* The application column. w-narrow throughout, per the form-column token. */}
        <div className="mx-auto flex w-full max-w-narrow flex-col gap-block-m md:gap-block">
          {/* The IA's panel restating who this is for, immediately above the questions. */}
          <Well>
            <Body>
              This is for people in Poland with three or more years of experience who are either
              applying without getting interviews, or employed and stuck below where they should be.
            </Body>
          </Well>

          <div className="flex flex-col gap-flow-m md:gap-flow">
            {/*
              No <form> ancestor, by design: nothing to submit, nowhere to submit
              it. See the note above. `aria-label` names the group for assistive
              technology; the deck writes no visible heading here.
            */}
            <fieldset
              aria-label="Application questions"
              className="flex flex-col gap-flow-m border-0 p-0 md:gap-flow"
            >
              {QUESTIONS.map((q) => (
                <Field key={q.id} id={q.id} label={q.label} type={q.type} />
              ))}
            </fieldset>

            {/* The deck's helper text. Written against the questions as a set. */}
            <Caption>
              We ask this because we decline applicants we do not expect to succeed with, and it is
              fairer to do that here than after thirty minutes of your time.
            </Caption>

            {/*
              Build scaffolding, not page copy. The lawful-basis notice is not
              written and is not mine to write. Delete this block and replace it
              with counsel's notice; until then nothing here may be wired.
            */}
            <div
              data-blocked="no-controller-processors-transfers-notice"
              className="flex flex-col items-start gap-tight rounded border border-dashed border-muted p-card-m md:p-card"
            >
              <OutcomeBadge stage="unverified">Privacy notice missing</OutcomeBadge>
              <Caption>No privacy notice yet, so these fields post nowhere. Counsel.</Caption>
            </div>
          </div>

          {/*
            The page's closing CTA. Note verbatim from the deck's CTA table,
            "§21 final". The button resolves to #apply — this section — so it
            neither navigates nor submits.
          */}
          <div className="flex flex-col items-center gap-flow-m text-center md:gap-flow">
            <Button href="#apply" />
            <Caption>Four questions, then you pick a time.</Caption>
          </div>

          {/*
            Build scaffolding, not page copy. Delete when the URL is confirmed
            and replace with the embedded calendar the IA specifies.
          */}
          <div
            data-blocked="no-working-calendly-url"
            className="flex flex-col items-start gap-tight rounded border border-dashed border-muted p-card-m md:p-card"
          >
            <OutcomeBadge stage="unverified">Booking step missing</OutcomeBadge>
            <Caption>No working booking link yet. Owner.</Caption>
          </div>
        </div>
      </Stack>
    </Section>
  )
}
