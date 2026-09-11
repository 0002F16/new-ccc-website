import { Body, CtaBlock, Display, Eyebrow, Reveal, Section, Stack } from '@/components/ui'

/**
 * 23. The closing call to action — the page's last screen.
 *
 * Not a deck section. The file numbering runs 02–22 against
 * docs/copy/2026-09-08-copy-deck-v1.md; this one is numbered past the end
 * because it was written on 10 September 2026, after the page was cut from
 * twenty-one sections to five and lost its conversion point with them.
 *
 * ─── What this section is for ───────────────────────────────────────────────
 *
 * Two things.
 *
 *   1. The page ended on the FAQ, so its one CTA appeared once, in the hero.
 *      A reader who scrolled the argument had nowhere to act on it.
 *   2. `Button` and `CtaBlock` both default to `href="#apply"`, and the only
 *      `id="apply"` in the repo was on the uncomposed 21-apply. The hero's
 *      button was a dead anchor. This section owns the id, so it resolves.
 *
 * ─── Relationship to 21-apply ───────────────────────────────────────────────
 *
 * 21-apply is the deck's § 21 in full: the qualifying panel, the four screening
 * questions in the `Field` primitive, and two dashed blocked slots for the
 * things that do not exist. It stays on disk, uncomposed, and it supersedes this
 * file the moment its two blockers close — counsel's controller/processors/
 * transfers notice, and a confirmed booking URL. This is the lean stand-in for
 * that section, not a replacement for it.
 *
 * ─── Copy, and the sentence that is deliberately absent ─────────────────────
 *
 * Every string here is verbatim from the deck. The eyebrow, heading and body are
 * § 21; the note is the § 6 row of the deck's CTA table, which is unused on the
 * live page because 06-video is uncomposed.
 *
 * The deck's § 21 body opens "Four questions, then you pick a time", and the CTA
 * table's own "§21 final" note is that same sentence. Both are dropped. Without
 * the form there are no four questions on this page and no time to pick, so both
 * would describe a step that does not exist. Copy written for absent UI is the
 * failure the claim rules exist to prevent, and it is not fixed by rewording —
 * the deck's remaining three sentences are true as written, so they ship and the
 * fourth waits for 21-apply.
 *
 * ─── Treatments rejected ────────────────────────────────────────────────────
 *
 *   (a) Compose 21-apply as it stands. Rejected by the owner on 10 September:
 *       it would put two dashed build-debt panels back on a page that had just
 *       had every one of them removed, and the fields post nowhere.
 *   (b) The screening questions with the dashed panels stripped. Rejected as the
 *       worse half of both options — it collects personal data with no lawful
 *       basis notice and no statement that it goes nowhere, which is the one
 *       thing 21-apply's comment says must not ship.
 *   (c) Chosen — the written half of § 21 that survives without the form, and
 *       nothing else. Nothing on screen promises a step that does not exist.
 *
 * ─── Gold budget ────────────────────────────────────────────────────────────
 *
 * The eyebrow's small caps in `accent`, which is what `Eyebrow` is, and the
 * primary button, which the one-accent rule exempts as the page's single call to
 * action. The 48px gold hairline is declined: it marks a new movement, and this
 * section is the close of the last one rather than the start of another. Since
 * `SectionHeader` always draws that hairline and offers no way to switch it off,
 * the header is composed from `Eyebrow hairline={false}` and `Display` directly
 * — same reasoning, same markup, as 21-apply and 07-outcomes.
 *
 * ─── What is still open ─────────────────────────────────────────────────────
 *
 * The button is a self-anchor: it resolves to this section and navigates
 * nowhere, because there is no confirmed booking destination — CLAUDE.md still
 * carries "a working Calendly URL" as an open blocker, and every CTA on the live
 * site points at one that redirects to the Calendly homepage. That is recorded
 * here and in CLAUDE.md rather than as a dashed slot on the page, which is the
 * treatment 07-outcomes settled on: a build note does not belong in the reader's
 * eyeline. No `<form>`, no `action`, no `mailto:`, no endpoint, and no
 * `'use client'` — there is nothing here to submit and nowhere to submit it.
 */
export function FinalCta() {
  return (
    <Section id="apply" width="text" ariaLabel="Apply">
      <Stack gap="block">
        <Reveal>
          <div className="flex flex-col gap-tight text-center">
            <Eyebrow hairline={false}>The next step</Eyebrow>

            <Display as="h2" size="h2">
              Tell us where the search has got to
            </Display>

            <div className="pt-flow-m md:pt-flow">
              <Body>
                Thirty minutes, and it ends in a yes or a no. If it is a yes we will walk you
                through the agreement and the fee before you commit to anything. Nothing is charged
                before the call.
              </Body>
            </div>
          </div>
        </Reveal>

        {/*
          No `label` and no `href`: CtaBlock defaults to CTA_LABEL and to #apply,
          which is this section. The label has one source and is never written out
          at a call site.
        */}
        <Reveal delay={0.04}>
          <CtaBlock
            analyticsId="final"
            note="Thirty minutes on a call, and we tell you whether we would take this on."
          />
        </Reveal>
      </Stack>
    </Section>
  )
}
