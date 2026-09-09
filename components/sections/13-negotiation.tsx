import {
  Band,
  Body,
  Caption,
  Display,
  Eyebrow,
  Label,
  OutcomeBadge,
  Section,
  Stack,
} from '@/components/ui'

/**
 * 13. The offer conversation, not had alone — Movement III, the last stage.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 13.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * MONEY — read before editing a word of this file.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * This is the section about improving an offer, so it is the section most likely
 * to acquire a number. It has none, and it must never acquire one.
 *
 * 1. **No compensation figure, anywhere.** Not a salary, not a raise, not a
 *    percentage, not a currency symbol, not an illustrative "10,000 → 11,000".
 *    The claim rules forbid salary figures as proof, and the copy deck's own
 *    claim note for this section is explicit: "no compensation figure appears
 *    anywhere in this exhibit or this section". A worked example here would be
 *    invented evidence for an outcome CCC cannot promise. The deck's legend
 *    ("figures are shown as relative markers only") governs the specimen when it
 *    is built — relative markers, never absolute amounts.
 *
 * 2. **No claim that the offer improves.** The section claims preparation, not
 *    movement. "Most people accept the first number they hear" is a statement
 *    about most people, not a prediction about this reader. Nothing here says an
 *    ask succeeds, that anything is usually won, or by how much. The one
 *    directional sentence on the page — that movement is usually outside base
 *    pay — belongs to callout 02, which is held with the unbuilt specimen below.
 *
 * 3. **The Raise Guarantee is not repeated here.** It interacts with this
 *    section (nothing is owed on the back end if the accepted offer does not
 *    beat current earnings) but it is a contractual term and it has its own
 *    block in § 17, where each guarantee is stated with the condition that voids
 *    it. Restating it here would publish it unconditioned. No cross-reference is
 *    rendered either, because the deck supplies no wording for one and rule 7
 *    forbids writing it.
 *
 * 4. **Execution framing, and the client is in the room.** The deck's sentence
 *    is "we work out what to ask for and how to ask for it, and you go into that
 *    conversation with the wording already prepared" — preparation by CCC,
 *    attendance and decision by the client. Nothing in this file says CCC
 *    negotiates, speaks to the employer, or handles the call. See the IA
 *    conflict noted below.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * IA conflicts — copy deck wins, per the build brief.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *   · The IA spec titles § 13 "The Negotiation Table and the Net Positive
 *     Close" — two of the seven stages. The deck's § 13 is the negotiation only
 *     and supplies no Net Positive Close copy. Nothing is written to fill the
 *     gap; the deck's scope is the section's scope.
 *   · The IA spec's § 16 contains the phrase "while CCC negotiates on their
 *     behalf". That is not execution framing, it is representation, and it is
 *     the framing CLAUDE.md's open KRAZ / pośrednictwo pracy question tells us
 *     to draft away from. It appears nowhere in this file and should not be
 *     carried into § 16 either. Flagged in the build report.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Layout — three treatments considered.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *   (a) Spec pairs — WHAT WE PREPARE / WHEN / WHO SPEAKS down a `SpecList`,
 *       structural band. Rejected. The page's workhorse, and it would look
 *       documented, but the deck supplies one paragraph and no terms: every
 *       term and every value would be invented copy (rule 7). It also invites
 *       exactly the thing this section must not have — a row whose value is a
 *       number.
 *   (b) A `Well` — the negotiation prose sunk, the way the price block is.
 *       Rejected. `sunken` is reserved for wells: the price block and quoted
 *       material. Using it here would visually rhyme the negotiation with the
 *       fee, which is the one association this section must not make, and it
 *       would spend enclosure on a single paragraph.
 *   (c) Chosen. Situation marker, eyebrow and serif h2 centred at w-text, one
 *       body paragraph at w-text, then the exhibit slot alone at w-structure.
 *       Identical to § 11 and to the header half of § 10, which is the point:
 *       Movement III is five mechanism blocks and it should read as one run of
 *       exhibits, not five layouts. Prose narrows, structure widens.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * The exhibit ships as a blocked slot.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Exhibit 05 does not exist. Artefact specimens are an open launch blocker in
 * CLAUDE.md, and the deck supplies the provenance line, two callouts and a
 * legend but not the artefact itself. Following § 11's precedent rather than
 * § 10's: § 10 could render its callouts because its table head is verbatim copy
 * and the callouts annotate visible columns. Here there is nothing visible —
 * the deck gives the negotiation preparation no fields, no headings, no
 * structure — so both callouts and the legend would be assertions about absent
 * evidence. Callout 02 in particular ("everything beyond base pay is listed,
 * because that is usually where the movement is") is a claim about where
 * movement happens, and it must not appear without the specimen it annotates.
 * All three are held here, in writing, and are listed as owed in the report.
 *
 * The specimen renders as live HTML text when it lands, not as an image — the
 * IA inventory is explicit ("Transcribed HTML, no figures") — so it will not use
 * `WorkProductPlate`, which takes an <img>.
 *
 * Delete this entire figure when the specimen lands.
 *
 * Gold budget: one element, the eyebrow hairline. The placeholder is dashed
 * `muted`, the outcome ladder's unverified rung.
 */
export function Negotiation() {
  return (
    <Section id="negotiation">
      <Stack gap="block">
        {/* Header. Situation marker in muted small caps above the gold hairline,
            so the taxonomy tag and the eyebrow stay visibly different things. */}
        <Band width="text" className="flex flex-col items-center gap-tight text-center">
          <Label>Mostly stalled career</Label>
          <Eyebrow>The last stage</Eyebrow>
          <Display as="h2" size="h2">
            Most people accept the first number they hear
          </Display>
        </Band>

        <Band width="text">
          <Body>
            When an offer arrives we work out what to ask for and how to ask for it, and you go into
            that conversation with the wording already prepared. Nobody is asking you to improvise a
            negotiation on a phone call you did not know was coming.
          </Body>
        </Band>

        {/* Exhibit 05 — BLOCKED. Build scaffolding, not page copy. */}
        <figure
          data-blocked="artefact-specimen-negotiation-preparation"
          className="mx-auto flex w-full max-w-structure flex-col gap-tight"
        >
          <div className="flex flex-col items-center justify-center gap-flow-m rounded border border-dashed border-muted px-gutter-m py-block-m text-center md:gap-flow md:px-gutter md:py-block">
            <OutcomeBadge stage="unverified">Specimen missing</OutcomeBadge>
            <Caption className="max-w-text">
              No negotiation-preparation specimen exists. It is to be built from the real template
              with a fictional client and employer and labelled as such, then set as live text
              rather than as a screenshot. No compensation figure appears in it: amounts are shown
              as relative markers only, never as salaries, raises or percentages.
            </Caption>
          </div>
          <figcaption>
            <Caption>
              Placeholder for <span className="tnum">exhibit 05</span>. Its two callouts and its
              legend are held with it, because each is an annotation on a specimen that has not been
              written. This block must be deleted before launch.
            </Caption>
          </figcaption>
        </figure>
      </Stack>
    </Section>
  )
}
