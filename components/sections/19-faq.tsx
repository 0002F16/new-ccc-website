import {
  Band,
  Caption,
  Faq,
  Label,
  OutcomeBadge,
  Section,
  SectionHeader,
  Stack,
} from '@/components/ui'
import type { FaqItem } from '@/components/ui'

/**
 * 19. FAQ — Movement IV, the objection floor.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 19.
 *
 * ─── What this section is for ───────────────────────────────────────────────
 *
 * This is where an objection either dies or discounts everything after it. The
 * IA's rule for it is the whole brief and it is a prohibition, not a target:
 * "a question without a confirmed policy stays off the page rather than
 * receiving an invented answer." Five of the deck's nine were flagged blocked
 * in the IA; three of them are blocked in a way that removes the question
 * entirely, and those three are not on the page.
 *
 * ─── What ships and what does not ───────────────────────────────────────────
 *
 * Off the page — no answer exists, and an FAQ answer is read as a commitment:
 *
 *   Q1  I have applications out already. If one of them turns into an offer,
 *       do I pay you?                    [CONFIRM SUCCESS-FEE EVENTS]
 *   Q5  Will my current employer find out?   [CONFIRM SIGNAL LAYER CONTROLS]
 *   Q7  What roles do you support?           [CONFIRM SUPPORTED PROFILES]
 *
 * Shipped with a blocked clause dropped, per build brief rule 7 (a `[BLOCKED]`
 * passage ships as nothing, the written sentence around it ships):
 *
 *   Q3  loses "whether the client approves each individual application".
 *   Q6  loses "what discharges that obligation, and reconciliation with
 *       /regulamin".
 *
 * Both are flagged in the build report. Neither is widened, softened or
 * completed here, and no sentence is written to cover the hole.
 *
 * ─── Ordering: three treatments ─────────────────────────────────────────────
 *
 *   (a) Deck order, blocked items simply removed — Q2, Q3, Q4, Q6, Q8, Q9.
 *       Rejected. The deck's build note is explicit: "nothing about money is
 *       collapsed by default. Questions 1, 6 and the fee-related parts render
 *       open." The `Faq` primitive opens exactly one item, index 0, and the
 *       deck's designated open item (Q1) is off the page. Under (a) the item
 *       that renders open is "Is this coaching?" and every fee question is
 *       collapsed — the one arrangement the deck rules out.
 *   (b) Thematic groups — money / the work / the call — as three `Faq`
 *       instances under sub-heads. Rejected twice over. It opens three items at
 *       rest, against CLAUDE.md's "all closed at rest except the first"; and
 *       the deck supplies no group names, so the sub-heads would be copy
 *       invented at build time in the one section where invented copy reads as
 *       a commitment. Six questions do not need a taxonomy to be skimmed.
 *   (c) Chosen — one list at `w-narrow`, deck order preserved, with the single
 *       exception that the remaining money question is promoted to first so it
 *       is the item the primitive renders open. That is the deck's build note
 *       satisfied with the primitive as written and with no second `Faq`
 *       instance, no override and no new component. Everything after it is in
 *       deck sequence, so anyone reading the page against the deck sees one
 *       deliberate move rather than a reshuffle.
 *
 * For a skimmer the promoted order also front-loads correctly: the two
 * questions that decide the sale are what happens if it does not work and what
 * this actually is, and they are now first and second.
 *
 * ─── Claim rules ────────────────────────────────────────────────────────────
 *
 * Every shipped answer is verbatim and was checked against the register. No
 * placement rate, no timeline, no salary figure, no employer relationship, and
 * nothing resembling "we only get paid when you do" — Q6 says "no further fee",
 * which is the No-Stop term and is stated about continuing work, not about the
 * 6,000 PLN at signature. Nothing here says CCC represents, places, presents or
 * arranges anything; Q2's "we run it" is execution framing and matches § 14.
 *
 * ─── Gold budget ────────────────────────────────────────────────────────────
 *
 * Zero. The deck gives § 19 no eyebrow, so there is no hairline, and the
 * section carries no CTA — the deck's CTA table places notes after §§ 6, 12,
 * 16, 17 and 21, and not here.
 */

/**
 * Verbatim answers. Deck order is 6, 2, 3, 4, 8, 9 — see treatment (c) above
 * for why 6 leads. Bracketed `[BLOCKED: …]` clauses are dropped, not paraphrased.
 */
const ITEMS: FaqItem[] = [
  {
    q: 'What if the search does not work?',
    a: 'Work continues until an offer is signed, with no time limit and no further fee, as long as you are holding up your side.',
  },
  {
    q: 'Is this coaching?',
    a: 'No. Coaching teaches you to run the search. We run it. If what you want is advice and you intend to do the work yourself, the free resources at the bottom of this page are a better fit and they cost nothing.',
  },
  {
    q: 'Can I do this while I am employed?',
    a: 'Most clients are. It costs roughly an hour a week, plus the interviews. What we need from you is set out in full above.',
  },
  {
    q: 'What happens on the call?',
    a: 'Thirty minutes, assessed against a written standard. It ends in a yes or a no, and a no comes with what we would want to see change.',
  },
  {
    q: 'Do you help with visas or work permits?',
    a: 'No. We work with the right to work you already have.',
  },
]

/**
 * Build scaffolding, not page copy. The three questions the deck asks and cannot
 * answer. Each is a question a reader will genuinely arrive with, so the debt is
 * recorded on the page rather than only in the deck. Delete this block when the
 * three are answered and fold the questions into ITEMS in deck order.
 */
const OWED: { id: string; term: string; text: string }[] = [
  {
    id: 'success-fee-events',
    term: 'Offers already in flight',
    text: 'Whether a fee is owed on an offer arising from an application sent before signature. The deck calls it the question most likely to decide the sale, and obligation seven requires reporting any offer from any source. Owner and counsel.',
  },
  {
    id: 'employer-visibility',
    term: 'What an employer can see',
    text: 'Discretion and the Signal Layer controls for an employed client. A separate question from whether the search fits around a job, because the service publishes on the client’s own profile several times a week. Owner and delivery.',
  },
  {
    id: 'supported-profiles',
    term: 'Roles supported',
    text: 'Supported role families, the languages worked in, and which pivots are accepted. Three or more years of experience is a threshold, not a fit definition. Owner.',
  },
  {
    id: 'application-approval',
    term: 'Who decides which jobs I go for',
    text: 'Whether the client approves each application. Pulled 9 September 2026; restore it whole. Owner and delivery.',
  },
]

export function FaqSection() {
  return (
    <Section id="faq" width="text">
      <Stack gap="block">
        <SectionHeader heading="The questions people actually ask" />

        {/* Definition list at w-narrow — the primitive applies the width itself. */}
        <Faq items={ITEMS} />

        <Band width="narrow">
          <div
            data-blocked="faq-questions-without-confirmed-answers"
            className="flex flex-col gap-flow-m rounded border border-dashed border-muted p-card-m md:gap-flow md:p-card"
          >
            {/* Wrapped so the badge keeps its own width in a stretch-aligned column. */}
            <div className="flex">
              <OutcomeBadge stage="unverified">Four answers missing</OutcomeBadge>
            </div>

            <Caption>
              Four questions have no confirmed policy behind them, so they are off the page.
            </Caption>

            <dl className="flex flex-col gap-flow-m md:gap-flow">
              {OWED.map((item) => (
                <div key={item.id} className="flex flex-col gap-tight">
                  <Label as="dt">{item.term}</Label>
                  <dd className="text-s text-muted">{item.text}</dd>
                </div>
              ))}
            </dl>

            <Caption>
              Two further answers ship incomplete. Details in this file&rsquo;s header comment.
            </Caption>
          </div>
        </Band>
      </Stack>
    </Section>
  )
}
