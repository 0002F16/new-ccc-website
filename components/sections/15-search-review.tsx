import { Band, Caption, Label, OutcomeBadge, Section } from '@/components/ui'

/**
 * 15. How the search is reviewed — Movement III, the closing section.
 *
 * ─── Copy status: the whole section is blocked ──────────────────────────────
 *
 * Copy deck § 15 supplies no eyebrow, no h2, no lede and no body. Its entire
 * content is one blocker:
 *
 *   [BLOCKED: escalation and review policy — delivery. What the review cadence
 *   is, and what changes when responses are weak at week 4, week 8 and week 12.
 *   On the OPEN list in CLAUDE.md, and the copy brief requires it for the
 *   process section.]
 *
 * Build brief rule 7: a `[BLOCKED: ...]` passage ships as nothing. There is
 * therefore no publishable string in this section — not one. Everything below
 * is scaffolding in the builder's voice, carried so the debt is greppable, and
 * it must be deleted before launch.
 *
 * The deck's own section title, "How the search is reviewed", is NOT copy. The
 * deck names each section and then supplies its h2 separately — § 14 is titled
 * "What we run, what you do" and its h2 is "You are not buying a service you can
 * ignore" — so promoting a deck title into an h2 would be writing copy, which is
 * rule 7 again. No visible heading is rendered here.
 *
 * ─── Why this cannot be filled in from the source documents ─────────────────
 *
 * A cadence, a threshold, a meeting rhythm or an escalation ladder written here
 * would not be page copy — it would be a service commitment invented at build
 * time, in the one section whose subject is what CCC promises to do when the
 * search is not working. The offer letter defines seven stages and the No-Stop
 * Guarantee; it defines no review point and no trigger. Nothing in the research
 * pack does either. There is nothing to draft from.
 *
 * ─── Layout: three treatments considered ────────────────────────────────────
 *
 *   (a) Full section header — eyebrow, the deck title promoted to h2, then the
 *       blocked slot underneath. Rejected twice over. It invents an h2, and it
 *       is precisely the failure the IA spec names in § 7: "zero, announced
 *       under a heading, is worse than no heading at all." Announcing "how the
 *       search is reviewed" and then delivering an empty panel damages the
 *       No-Stop Guarantee this section exists to support, rather than leaving it
 *       merely unsupported.
 *   (b) A `Well` at w-structure carrying the owed questions as `SpecList` pairs
 *       — REVIEW CADENCE / WEEK 4 / WEEK 8 / WEEK 12. Rejected. `Well` is the
 *       sunken treatment reserved for the price block and quoted material, and
 *       a designed, enclosed, spec-paired panel reads as finished — the opposite
 *       of what a blocked slot must look like. It would also invent four terms
 *       and four values that appear nowhere in the deck, and setting WEEK 4 /
 *       8 / 12 as spec terms states a cadence in the act of asking for one.
 *   (c) Chosen — no heading, no eyebrow, no gold, no enclosure but the dashed
 *       one. A single `data-blocked` slot at `max-w-text`: the `unverified`
 *       badge, the reader's question stated once as a question, and an itemised
 *       record of the three things owed. The section is identifiable to
 *       assistive technology through `aria-label` on the shell, so it can be
 *       found and audited without anything being announced under a heading.
 *
 * The week markers below are quoted from the blocker, which is where they come
 * from. They are the question, not an answer, and they are written as such.
 *
 * ─── Gold budget ────────────────────────────────────────────────────────────
 *
 * Zero. No eyebrow, so no hairline, so no accent on this screen. A section with
 * nothing to say does not get the page's scarcest device.
 *
 * ─── Recommendation, repeated in the build report ───────────────────────────
 *
 * This section should not be composed into `app/page.tsx` for v1 until the
 * escalation and review policy is written. The file exists so the slot and its
 * debt are visible in the tree and in a `data-blocked` grep, not because there
 * is a section here to ship.
 */

/**
 * What is owed before this section can carry a single published word. Drawn
 * from the deck's blocker and the matching OPEN item in CLAUDE.md ("Escalation
 * policy — what changes when responses are weak, and the review cadence").
 * Scaffolding, not copy.
 */
const OWED: readonly { id: string; term: string; text: string }[] = [
  {
    id: 'cadence',
    term: 'The review cadence',
    text: 'How often the search is formally reviewed, who is in that review, and what the client sees of it. Undefined on every source document: the offer letter sets out seven stages and no review point.',
  },
  {
    id: 'trigger',
    term: 'What counts as weak',
    text: 'The threshold that opens a review before the cadence would. Undefined, and it cannot be written here — a threshold invented at build time is a service commitment invented at build time.',
  },
  {
    id: 'escalation',
    term: 'What changes, and when',
    text: 'The copy deck asks what changes at week four, week eight and week twelve when responses are weak. None of the three is defined. Those weeks are the question being asked, not a cadence being stated.',
  },
]

export function SearchReview() {
  return (
    <Section
      id="search-review"
      width="text"
      ariaLabel="How the search is reviewed — section not yet written"
    >
      <Band width="text">
        <div
          data-blocked="escalation-and-review-policy-undefined"
          className="flex flex-col gap-flow-m rounded border border-dashed border-muted p-card-m md:gap-flow md:p-card"
        >
          {/* Wrapped so the badge keeps its own width inside a stretch-aligned column. */}
          <div className="flex">
            <OutcomeBadge stage="unverified">Section not written</OutcomeBadge>
          </div>

          <Caption>
            The question this section answers is what happens when the search is not working. The
            No-Stop Guarantee promises the work continues with no time limit, and Movement III
            otherwise describes only the first weeks, so without this section the strongest promise
            on the page is left unsupported. Copy deck § 15 is blocked in full — it supplies no
            eyebrow, no heading, no lede and no body — so nothing here is page copy and this whole
            block must be deleted before launch.
          </Caption>

          <dl className="flex flex-col gap-flow-m md:grid md:grid-cols-[minmax(160px,200px)_1fr] md:gap-x-flow md:gap-y-flow">
            {OWED.map((item) => (
              /* Below md the pair is its own tight stack; at md it dissolves into the grid. */
              <div key={item.id} className="flex flex-col gap-tight md:contents">
                <Label as="dt">{item.term}</Label>
                <dd className="text-s text-muted">{item.text}</dd>
              </div>
            ))}
          </dl>

          <Caption>
            Owner and delivery. Until all three are answered in writing, no cadence, threshold,
            meeting rhythm or escalation ladder may be written on this page, and this section should
            not be composed into the page at all — a heading over nothing is worse than no heading.
          </Caption>
        </div>
      </Band>
    </Section>
  )
}
