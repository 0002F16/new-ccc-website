import { Faq, Section, SectionHeader, Stack } from '@/components/ui'
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

export function FaqSection() {
  return (
    <Section id="faq" width="text">
      <Stack gap="block">
        <SectionHeader heading="The questions people actually ask" />

        {/* Definition list at w-narrow — the primitive applies the width itself. */}
        <Faq items={ITEMS} />
      </Stack>
    </Section>
  )
}
