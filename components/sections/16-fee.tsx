import {
  Band,
  Body,
  Caption,
  Card,
  Eyebrow,
  Display,
  Label,
  Lede,
  Op,
  OutcomeBadge,
  Section,
  SpecList,
  Stack,
  Well,
  type Spec,
} from '@/components/ui'

/**
 * 16. The fee — Movement IV, the commitment.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 16.
 * `id="fee"` is load-bearing: the hero chip row anchors to it.
 *
 * ─── The arithmetic, checked ────────────────────────────────────────────────
 *
 * The rule: 6,000 PLN activation on signature, then three instalments, each the
 * lesser of 23% of the new gross monthly salary or the monthly raise secured.
 * The deck's worked example was recomputed against that rule before it was
 * rendered, and it holds exactly:
 *
 *   23% × 14,000            = 3,220
 *   raise = 14,000 − 11,000 = 3,000
 *   lesser of the two       = 3,000  ← the cap binds
 *   three instalments       = 9,000
 *   plus activation         = 15,000
 *   15,000 ÷ 3,000          = 5 months of the increase
 *
 * Every figure the deck prints matches, including "the first five months of the
 * increase". No number in this file was adjusted. The research pack's
 * 14,280 / 8,760 arithmetic is a different and wrong reading of the fee and
 * appears nowhere here.
 *
 * ─── What this section may not say ──────────────────────────────────────────
 *
 * "We only get paid when you do" is forbidden, because there is a 6,000 PLN fee
 * before anything else happens. The IA's own note is that the offer letter's
 * "there is no month in which working with me costs you money" is that claim
 * renamed, and false: 10,000 → 11,000 PLN pays 6,000 up front plus 1,000 × 3 and
 * is 6,000 down at three months. So the activation fee is named in four places
 * on this screen — the price well's ON SIGNATURE pair, the cap statement's
 * second sentence, the worked example's PLUS SIGNATURE FEE row, and its TOTAL —
 * and the cap sentence and the activation sentence are bound inside one
 * paragraph so that no screenshot of one carries the other's absence.
 *
 * No value-stack theatre either: nothing is crossed out, no per-item "value" is
 * quoted, and the only total on the page is the total the client pays.
 *
 * ─── Layout: three treatments considered ────────────────────────────────────
 *
 *   (a) One well holding the terms, the cap statement and the worked example.
 *       Rejected. It equates a contractual term with an illustration, which is
 *       the one confusion this section cannot afford — a reader who takes
 *       11,000 → 14,000 as the deal has been misled by the layout. It also
 *       produces a single sunken slab about 700px tall with no rhythm in it.
 *   (b) Terms well and worked example side by side at half of w-structure.
 *       Rejected on two counts. The longest spec value — "The lesser of 23% of
 *       your new gross monthly salary, or the monthly raise you secured" — wraps
 *       to four lines in a 500px column, and `SpecList`'s term column is
 *       `whitespace-nowrap`, so "23% of new salary" would force the value column
 *       narrower still. And side-by-side ranks the example as a peer of the
 *       terms, which is treatment (a)'s error in a different geometry.
 *   (c) Chosen — one vertical run, alternating 720 and 1040 as the system asks.
 *       Header as centred prose at w-text · price well at w-structure · the cap
 *       statement back at w-text · worked example as a `Card` at w-structure ·
 *       the two blocked slots · the incentive paragraph at w-text. The reader
 *       gets terms, then the sentence that interprets them, then the numbers
 *       that demonstrate them, then our own interest declared — which is the
 *       deck's order, and the order in which a sceptical reader asks.
 *
 * Enclosure carries the distinction (b) and (a) lose: `sunken` for what is
 * contractual, `surface` for what is illustrative. The worked example's own
 * label says "Worked example", not "your price".
 *
 * ─── Gold budget ────────────────────────────────────────────────────────────
 *
 * CLAUDE.md specifies the price block as a `sunken` well with a `line-gold` top
 * rule, and that spend is not optional — it is the component's anatomy. So the
 * eyebrow ships with `hairline={false}` per the house accent-budget pattern, and
 * the well's top rule is the section's single gold element. Nothing else on this
 * screen is accented: not the total, not the cap sentence, not the badges.
 *
 * `tnum` is on both spec lists and on the cap statement, so every figure in the
 * section is tabular.
 */

/** Verbatim from the deck's price block. `Op` marks the operative phrase. */
const TERMS: Spec[] = [
  {
    term: 'On signature',
    value: (
      <>
        <Op>6,000 PLN</Op>, by transfer or BLIK
      </>
    ),
  },
  {
    term: 'Then',
    value: (
      <>
        <Op>Three instalments</Op>, after you start the new role
      </>
    ),
  },
  {
    term: 'Each instalment',
    value: (
      <>
        The lesser of <Op>23% of your new gross monthly salary</Op>, or{' '}
        <Op>the monthly raise you secured</Op>
      </>
    ),
  },
  {
    term: 'The cap',
    value: (
      <>
        <Op>Your raise.</Op> If 23% is more than the increase, you pay the increase
      </>
    ),
  },
]

/**
 * Verbatim from the deck's "Worked example — a raise". The deck bolds the TOTAL
 * row; Gilt forbids bold in prose, so the emphasis becomes `Op` — ink on the
 * value, which is the spec pair's own emphasis mechanism.
 */
const WORKED_EXAMPLE: Spec[] = [
  { term: 'Now', value: '11,000 PLN gross a month' },
  { term: 'New role', value: '14,000 PLN gross a month' },
  { term: 'Your raise', value: '3,000 PLN a month' },
  { term: '23% of new salary', value: '3,220 PLN' },
  {
    term: 'You pay, each time',
    value: (
      <>
        <Op>3,000 PLN</Op>, because the raise is lower
      </>
    ),
  },
  { term: 'Three instalments', value: '9,000 PLN' },
  { term: 'Plus signature fee', value: '6,000 PLN' },
  { term: 'Total', value: <Op>15,000 PLN</Op> },
]

export function Fee() {
  return (
    <Section id="fee" width="structure">
      <Stack gap="block">
        <Band width="text">
          <Stack gap="tight" className="items-center text-center">
            {/*
              hairline={false}: the price well's line-gold top rule is this
              section's one accent. House accent-budget pattern.
            */}
            <Eyebrow hairline={false}>What it costs, in full</Eyebrow>
            <Display as="h2" size="h2">
              6,000 PLN, then three instalments capped at your raise
            </Display>
          </Stack>
        </Band>

        {/* The price block. sunken well, line-gold top rule, w-structure. */}
        <Well goldTop>
          <Label as="p">The fee</Label>
          <SpecList specs={TERMS} className="tnum" />
        </Well>

        {/*
          The section's strongest sentence, on its own line rather than as a
          footnote — CLAUDE.md's instruction. Both sentences are one paragraph on
          purpose: the cap is never stated without the activation fee beside it.
        */}
        <Band width="text">
          <Lede className="tnum">
            From the new role onwards, each instalment is capped at the raise, so no monthly payment
            is larger than the increase you got. The 6,000 PLN at signature is paid before any of
            that and is separate from it.
          </Lede>
        </Band>

        {/* Illustration, not terms: surface, not sunken, and labelled as such. */}
        <Card>
          <Label as="p">Worked example — a raise</Label>
          <SpecList specs={WORKED_EXAMPLE} className="tnum" />
          <Body className="tnum">
            After the three instalments the raise is yours. On these numbers the fee is covered by
            the first five months of the increase.
          </Body>
        </Card>

        {/*
          Build scaffolding, not page copy. Two blocked slots, both from the copy
          deck, both greppable by `data-blocked`. Neither is answered here and
          neither may be guessed at: the cap rule is genuinely undefined for the
          clients named, and the tax basis is unresolved.

          The IA requires TWO worked examples, "one of them a low-raise case
          rather than a flattering one". Shipping only the flattering one is a
          launch blocker, which is what the first slot records.
        */}
        <div className="grid grid-cols-1 gap-flow-m md:grid-cols-2 md:gap-flow">
          <div
            data-blocked="fee-cap-undefined-no-raise-sideways-career-change"
            className="flex flex-col items-start gap-tight rounded border border-dashed border-muted p-card-m md:p-card"
          >
            <OutcomeBadge stage="unverified">Second example missing</OutcomeBadge>
            <Caption>
              Cap undefined for unemployed clients, equal-pay moves and career changes. Owner.
            </Caption>
          </div>

          <div
            data-blocked="fee-contract-basis-and-tax-unresolved"
            className="flex flex-col items-start gap-tight rounded border border-dashed border-muted p-card-m md:p-card"
          >
            <OutcomeBadge stage="unverified">Basis unresolved</OutcomeBadge>
            <Caption>
              Contract basis, and the tax and invoicing treatment of the 6,000 PLN. Owner.
            </Caption>
          </div>
        </div>

        <Band width="text">
          <Stack gap="tight">
            <Label as="p">Our own incentive, stated</Label>
            <Body>
              Our instalments rise with your raise, so a sideways move at the same money pays us
              nothing. You should know that, because we are the ones preparing your negotiation. The
              decision is always yours.
            </Body>
            <Body>The 6,000 PLN at signature is separate, and is paid before any of it.</Body>
          </Stack>
        </Band>
      </Stack>
    </Section>
  )
}
