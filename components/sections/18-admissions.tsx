import {
  Band,
  Body,
  Caption,
  Label,
  OutcomeBadge,
  Section,
  SectionHeader,
  Stack,
} from '@/components/ui'

/**
 * 18. Admissions — Movement IV, after the guarantees.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 18.
 *
 * ─── What this section is, and what it is not ───────────────────────────────
 *
 * Admissions is CCC's judgement about the reader. The fit criteria in § 3 are
 * the reader's own checklist, and the IA spec is explicit that collapsing the
 * two was revision 1's error: "They are different objects." Nothing here
 * restates § 3's list — no location row, no years threshold, no budget line, no
 * participation line. This section says only how the decision is made and that
 * the usual answer is no. `components/sections/03-what-this-is.tsx` owns the
 * checklist and keeps it.
 *
 * ─── The governing constraint ───────────────────────────────────────────────
 *
 * CLAUDE.md, 8 September: "we expect to place you" is approved copy only in
 * body copy, only in this section, only bound to "we decline the majority of
 * applicants" IN A SINGLE SENTENCE, never as a number, and never in ad creative,
 * headline fields, meta descriptions, social cards or OG images. The IA spec
 * gives the reason: "Adjacency of separate blocks does not survive an ad crop."
 *
 * Everything in this file that touches either clause is built to that rule. The
 * binding mechanism is described at the candidate sentences below.
 *
 * ─── Why the closing sentence does not ship ─────────────────────────────────
 *
 * The deck offers two versions under the heading "The closing sentence — two
 * versions, owner picks" and marks NEITHER as the default. Its note leans
 * toward Version A ("your approved wording and it is the stronger sentence")
 * and in the same breath records why it cannot simply be taken: A "is also the
 * most placement-asserting line available, which puts it in tension with the
 * decision to drop employer-side claims from this page while OQ-01 is open."
 *
 * That tension is not a matter of taste. CLAUDE.md's page-blocking KRAZ item
 * instructs: "until answered, draft on the execution framing, not the
 * representation framing. ... 'we place you' ... stay out of the draft."
 * Version A is placement framing; Version B is execution framing. So Version A
 * is barred from the draft by an open regulatory question, and Version B has
 * never been chosen by the owner. Picking B on that reasoning alone would be
 * choosing the copy silently, which is not this file's call to make.
 *
 * The choice is therefore the blocked thing, and it ships as a blocked slot
 * rather than as either sentence. The section still works without it: the
 * eyebrow, the heading and the body paragraph are live copy and they carry the
 * selectivity argument. What is missing is the line that closes it.
 *
 * ─── Layout: three treatments considered ────────────────────────────────────
 *
 *   (a) The closing sentence as a `Well` — sunken, quoted, set apart. Rejected,
 *       and it is the most instructive rejection in the file. Enclosing that
 *       sentence turns it into a pull quote, which is to say into a
 *       screenshot-shaped object sitting on its own with nothing around it.
 *       The one requirement on this sentence is that it resist being lifted out
 *       of context; designing a frame that invites lifting it out is the exact
 *       inverse. `Well` is also reserved by CLAUDE.md for the price block and
 *       quoted material.
 *   (b) A `SpecList` of what CCC screens against, at `max-w-structure`, in the
 *       page's workhorse pattern — the treatment the IA asks for ("Publish the
 *       actual criteria screened against"). Rejected because the criteria are
 *       blocked: the written admissions standard does not exist on the page yet.
 *       A spec list built from § 3's checklist would be the § 3 duplication the
 *       IA forbids, and a spec list of invented terms would be invented copy.
 *   (c) Chosen — one centred prose column at `max-w-text`, nothing enclosed,
 *       nothing widened to a structural band. The section is an argument, not an
 *       exhibit: it has no artefact, no ledger, no case and no figure. Prose at
 *       720px is the page's most-read width and the plainest available register,
 *       which is the right one for a paragraph whose whole content is "the
 *       answer is usually no". It also means the only enclosed, dashed objects
 *       in the section are the two blocked slots, so what is owed is the only
 *       thing that draws the eye in review.
 *
 * ─── Gold budget ────────────────────────────────────────────────────────────
 *
 * One element: the eyebrow hairline. No `Gold`, no gold-edged card, no accent
 * badge. Note that `Gold` is additionally unusable on the closing sentence for a
 * structural reason — see the binding note below.
 */

/**
 * The two candidate closing sentences, verbatim from the deck, in the deck's
 * order. Held as data, rendered only inside the blocked slot, and deleted from
 * this file entirely once the owner picks one and the picked one becomes live
 * body copy in the paragraph above.
 *
 * ─── How the two clauses are bound ──────────────────────────────────────────
 *
 * Each sentence is ONE string. It is rendered by ONE `<p>` whose only child is
 * that string — no `<span>`, no `<Gold>`, no `<Op>`, no `<Em>`, no `<br>`, no
 * nested element of any kind. There is consequently no element boundary at the
 * clause junction, so there is nothing for a stylesheet, a script, a print
 * stylesheet or a future edit to hide, float, reorder or break at. Splitting the
 * clauses would require rewriting the string.
 *
 * The paragraph is then kept in ordinary block flow inside a `flex-col` stack at
 * `max-w-text`: no CSS `columns`, no grid or flex on the paragraph itself, no
 * fixed or maximum height, no `overflow`, no `line-clamp`, no truncation, no
 * `position: sticky` or `fixed`, and no transform. So the sentence cannot be
 * dealt across two columns, cannot be split by a scroll container, and cannot be
 * clipped at a viewport boundary with one clause left showing.
 *
 * What markup cannot prevent is a person cropping a screenshot mid-paragraph.
 * Nothing in HTML can. The deck's answer to that is the one this file inherits:
 * the clauses are a single sentence, so a crop that keeps a whole sentence keeps
 * both clauses, and a crop that keeps less than a sentence is visibly a crop.
 */
const CLOSING_SENTENCE_VERSIONS: readonly { id: string; version: string; note: string }[] = [
  {
    id: 'version-a',
    version: 'Version A',
    note: 'As approved in CLAUDE.md, 8 September. Placement framing, and barred from the draft while the KRAZ question is open.',
    // Verbatim. One string, one sentence, both clauses.
  },
  {
    id: 'version-b',
    version: 'Version B',
    note: "Consistent with the deck's framing rule and with the execution framing the open KRAZ question requires. Not chosen by the owner.",
  },
] as const

/** Kept beside the metadata above so the strings themselves stay untouched. */
const CLOSING_SENTENCE_TEXT: Record<string, string> = {
  'version-a':
    'We decline the majority of applicants, and we accept the people we expect to place.',
  'version-b':
    'We decline the majority of applicants, and we accept the people whose search we expect to work.',
}

export function Admissions() {
  return (
    <Section id="admissions" width="text">
      <Stack gap="block">
        <SectionHeader eyebrow="How we decide" heading="We turn down more people than we take" />

        {/* Live copy. Verbatim, deck § 18. */}
        <Band width="text">
          <Body>
            The fit call ends in a yes or a no, and the no is more common. It is not a judgement
            about how good you are at your job. It is a judgement about whether the search we would
            run is one we think works, given your experience, your target and the market you are
            aiming at.
          </Body>
        </Band>

        {/*
          Build scaffolding, not page copy. Delete this whole block when the
          owner picks a version; the picked sentence then joins the paragraph
          above as live body copy, as one `<p>` with one string child, per the
          binding note on CLOSING_SENTENCE_VERSIONS.
        */}
        <Band width="text">
          <div
            data-blocked="closing-sentence-version-unchosen"
            className="flex flex-col gap-flow-m rounded border border-dashed border-muted p-card-m md:gap-flow md:p-card"
          >
            <div className="flex">
              <OutcomeBadge stage="unverified">Decision owed</OutcomeBadge>
            </div>

            <Caption>
              The copy deck offers two closing sentences for this section and marks neither as the
              default, so nothing closes the section yet. Version A is the owner-approved wording
              and is also the most placement-asserting line available, which CLAUDE.md keeps out of
              the draft until the KRAZ question is answered. Version B is the execution-framed
              equivalent and has not been chosen. Both are written as a single sentence so that a
              screenshot of either half cannot carry the claim on its own, and neither may appear in
              ad creative, headline fields, meta descriptions, social cards or OG images. This block
              must be deleted before launch and replaced by the chosen sentence.
            </Caption>

            <dl className="flex flex-col gap-flow-m md:gap-flow">
              {CLOSING_SENTENCE_VERSIONS.map((item) => (
                <div key={item.id} className="flex flex-col gap-tight">
                  <Label as="dt">{item.version}</Label>
                  <dd className="flex flex-col gap-tight">
                    {/*
                      One <p>, one string, no child elements. The clause junction
                      has no element boundary to break at.
                    */}
                    <p className="text-s text-muted">{CLOSING_SENTENCE_TEXT[item.id]}</p>
                    <Caption>{item.note}</Caption>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Band>

        {/*
          Deck § 18, "What we screen against": [BLOCKED: the written admissions
          standard — owner.] The criteria are what make the selectivity credible;
          § 3's reader-facing checklist is a different object and is not
          borrowed here to fill the gap.
        */}
        <Band width="text">
          <div
            data-blocked="written-admissions-standard-not-published"
            className="flex flex-col items-start gap-tight rounded border border-dashed border-muted p-card-m md:p-card"
          >
            <OutcomeBadge stage="unverified">Criteria missing</OutcomeBadge>
            <Caption>
              The written standard the fit call assesses against has not been supplied, so this
              section asserts selectivity without showing what it screens for. Selectivity that only
              asserts itself is the oldest line in this category, and the criteria are what make it
              credible. This block must be deleted before launch and replaced by the standard.
            </Caption>
          </div>
        </Band>
      </Stack>
    </Section>
  )
}
