import {
  Band,
  Body,
  Caption,
  Card,
  Label,
  Op,
  OutcomeBadge,
  Section,
  SectionHeader,
  SpecList,
  Stack,
  Well,
  type Spec,
} from '@/components/ui'

/**
 * 8. You stop applying — the opening section of Movement III, and the hinge of
 * the page. Everything before it diagnoses; everything after it describes the
 * machine. This is where the promise the whole service rests on is stated once.
 *
 * ── FRAMING: EXECUTION, NOT REPRESENTATION ──────────────────────────────────
 *
 * This is the most legally exposed section on the page. CLAUDE.md's open KRAZ
 * question (is CCC carrying out regulated pośrednictwo pracy?) is unanswered,
 * and its instruction is to draft on the execution framing until it is: CCC
 * prepares materials and executes applications and outreach ON THE CLIENT'S
 * INSTRUCTION and IN THE CLIENT'S NAME. "We represent you", "we place you",
 * "we present you", "the interviews we arrange" and "we open the doors" are
 * out. None of those strings appear here, and none must be added.
 *
 * Two deck strings sit close to that line and are shipped verbatim per the
 * build brief's rule 7, flagged rather than rewritten. See the report:
 *   - "The applications go out from us." — the only sentence in the body that
 *     is not immediately qualified by "in your name". The next sentence does
 *     carry the qualifier, for outreach.
 *   - "...the same briefing we would build for one we sourced" — "we sourced"
 *     describes CCC sourcing an interview, which is a short step from "the
 *     interviews we arrange".
 * Neither is mine to fix. Both are copy-deck decisions and belong to the owner
 * and to counsel with the rest of the KRAZ question.
 *
 * ── LAYOUT: THREE TREATMENTS CONSIDERED ─────────────────────────────────────
 *
 *   (a) One centred 720px column end to end — header, prose, founder quote,
 *       and the in-flight pairs all at w-text. Rejected: it spends no
 *       structural band at all, so the page's 720/1040 alternation stalls
 *       exactly at the movement boundary, where the reader most needs to feel
 *       a new movement start. The in-flight block is also structural material —
 *       three terms and three values — and reads as an afterthought in prose.
 *
 *   (b) Two columns at w-structure: the body argument left, the founder
 *       statement right as a portrait card. Rejected on two counts. Setting
 *       attributed speech alongside the argument turns the founder into a
 *       pull-quote decorating the copy rather than a person standing behind
 *       it — and the IA is explicit that he is here because the page had no
 *       human presence and the idea needs someone accountable for it. And the
 *       photograph is blocked, so for the whole pre-launch period the right
 *       half of the section's most important screen would be a dashed
 *       rectangle sitting beside the prose it is supposed to answer for.
 *
 *   (c) Chosen — a vertical movement in three beats, alternating width:
 *       centred header and prose at w-text · the founder statement as a
 *       `Well` at w-text · the in-flight block as a `Card` at w-structure.
 *       The claim is made, a named person signs it, then the section
 *       immediately concedes the case where the claim is inaudible. That
 *       order is the argument. Prose stays at 720 for the first two beats and
 *       the section widens to 1040 only for the structural block, so the
 *       widening coincides with the change from claim to specification.
 *
 * The founder statement is a `Well` — the system assigns wells to "the price
 * block, quoted material", and this is the page's only quoted material outside
 * the testimonials. It is deliberately NOT the `Testimonial` primitive: a
 * testimonial is a client vouching for the service, and reusing it here would
 * file the founder's own accountability under social proof.
 *
 * Gold budget: one element, the eyebrow hairline. The well takes no `goldTop`
 * and the card takes no `gold` edge for that reason.
 *
 * Situation marker: none. The IA asks every *mechanism* block in Movement III
 * to carry one; deck § 8 supplies no marker (§ 9 onward do), and this section
 * is the movement's statement of the idea rather than a mechanism block. Copy
 * is verbatim, so none is invented. Noted as an assumption.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 8.
 */

const IN_FLIGHT: Spec[] = [
  {
    term: 'Applications in flight',
    value: (
      <>
        <Op>They stay in flight.</Op> We do not withdraw anything you sent before we started
      </>
    ),
  },
  {
    term: 'An interview you sourced',
    value: (
      <>
        We build you <Op>the same briefing</Op> we would build for one we sourced
      </>
    ),
  },
  {
    // Copy deck § 8 blocks this value outright. Per build-brief rule 7 the
    // passage ships as nothing; per the house blocked-slot pattern the slot it
    // would have filled is marked, not silently dropped — this is the single
    // question the deck says is most likely to decide the sale, and dropping
    // the row would make the omission invisible in review.
    term: 'An offer from one of them',
    value: (
      <div
        data-blocked="success-fee-events"
        className="flex flex-col items-start gap-tight sm:flex-row sm:items-center"
      >
        <OutcomeBadge stage="unverified">Answer owed</OutcomeBadge>
        <Caption>
          Blocked on owner and counsel: whether an offer arising from an application sent before
          signature triggers an instalment. Must not ship unanswered.
        </Caption>
      </div>
    ),
  },
]

export function YouStopApplying() {
  return (
    <Section id="you-stop-applying" width="structure">
      <Stack gap="block">
        <SectionHeader
          eyebrow="What changes on day one"
          heading="From the day you sign, you are not the one applying any more"
        />

        {/* Beat one — the claim, in prose at 720px. */}
        <Band width="text">
          <Stack gap="flow">
            <Body>
              This is the part people find hardest to believe, so it is worth being plain about. You
              do not get a template, a tracker and a weekly call to check whether you used them. The
              applications go out from us. The outreach goes out from us, in your name and with your
              approval on how you are described. The interview preparation arrives in your inbox
              before the interview rather than after you asked for it.
            </Body>
            <Body>
              What stays yours is every decision that should be yours. Which roles are worth going
              for. How you are described. Which offer you take. We do not make those and we would
              not want to.
            </Body>
          </Stack>
        </Band>

        {/* Beat two — a named person signs the claim. Photograph is blocked. */}
        <Band width="text">
          <Stack gap="tight">
            <Well>
              <div className="flex flex-col gap-flow-m sm:flex-row sm:items-start md:gap-flow">
                {/*
                Build scaffolding, not page copy. Delete this placeholder and
                replace it with the founder portrait when the asset lands.
                Dashed edges appear nowhere else in Gilt, so this cannot be
                mistaken for a finished element.
              */}
                <div
                  data-blocked="founder-photograph"
                  className="flex aspect-square w-[120px] shrink-0 flex-col items-center justify-center rounded border border-dashed border-muted text-center sm:w-[152px]"
                >
                  <OutcomeBadge stage="unverified">Photo owed</OutcomeBadge>
                </div>

                <figure className="flex flex-col gap-flow-m md:gap-flow">
                  <blockquote className="text-l text-ink">
                    &ldquo;You are not short of ability. You are short of hours and short of access.
                    Those are the only two things I sell.&rdquo;
                  </blockquote>
                  <figcaption className="text-label font-medium uppercase text-muted">
                    Aziz Khaitov, founder. Warsaw.
                  </figcaption>
                </figure>
              </div>
            </Well>
            <Caption>
              Placeholder. The signed founder statement requires a photograph, which is a launch
              blocker and does not exist yet.
            </Caption>
          </Stack>
        </Band>

        {/* Beat three — structure widens to 1040px for the concession. */}
        <Card>
          <Label as="p">If you already have something running</Label>
          <SpecList specs={IN_FLIGHT} />
        </Card>
      </Stack>
    </Section>
  )
}
