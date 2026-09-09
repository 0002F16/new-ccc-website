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
 * 11. Thirty to seventy direct approaches a week — Movement III, Door Two.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REGULATORY NOTE — read before editing a word of this file.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * This is the highest-risk section on the page. Three things are load-bearing:
 *
 * 1. **Door Three (Direct Presentation) does not appear here, and is not
 *    alluded to.** Owner instruction, 8 September 2026. Nothing in this file
 *    says or implies that CCC holds employer relationships, presents candidates,
 *    or has a route into a company that the client does not have.
 *
 * 2. **The warm-introduction line is not on this page.** The IA spec (§11 and
 *    its Accepted risks) still carries Door Two as "30–70 per week, plus warm
 *    introductions where a relationship exists", with the phrase "introduction
 *    through professionals we have already placed inside the companies you want
 *    to enter". CLAUDE.md flags that sentence twice over: it is Door Three under
 *    another name, and it uses "placed", which the claim rules forbid and which
 *    is the exact word the KRAZ / pośrednictwo pracy question turns on. Copy
 *    deck v1 § 11 has already resolved this — its framing note records that the
 *    passage "has been rewritten as outreach sent in the client's name" — so the
 *    string is absent from the shippable copy and no blocked slot is required
 *    for it. It is recorded here so that nobody reinstates it from the IA spec,
 *    which is the older document. If it ever needs to return, it returns as a
 *    `data-blocked` slot pending the regulatory answer, not as softened prose.
 *
 * 3. **Execution framing without exception.** The messages go out on the
 *    client's instruction, in the client's name, from the client's account, to
 *    companies the client has agreed to target. Nothing here says CCC
 *    represents, presents, places, or opens doors for anyone, and the section
 *    claims no outcome from the outreach at all — not a reply rate, not a
 *    meeting, not an interview.
 *
 * The 30–70 weekly volume is owner-confirmed as current and sustainable
 * (8 September 2026) and is therefore publishable. The copy states it in words
 * rather than numerals, so there is no figure in the running text to set in
 * tabular numerals; `tnum` is applied to the one numeral this file renders, the
 * exhibit number in the placeholder caption.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Layout — three treatments considered.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *   (a) A ledger, per section 04 — marker and heading left, prose right, at
 *       w-structure. Rejected: the ledger exists to hold several peer items
 *       whose prose lengths differ. This section is one item with two
 *       paragraphs, so a ledger row with nothing under it reads as a table that
 *       lost its other rows, and it spends the structural band on prose that
 *       belongs at 720px.
 *   (b) The body enclosed in a `Card` at w-structure, with the exhibit inside
 *       it. Rejected: enclosure marks a completed, self-contained thing, and the
 *       thing this section is built around does not exist yet. It would also put
 *       a `surface` panel around a dashed placeholder — a finished frame with an
 *       unfinished centre, which reads as a design intention rather than as
 *       missing work.
 *   (c) Chosen. Centred prose at w-text under a centred header, then the exhibit
 *       slot alone at w-structure. This is the page's own rhythm — prose
 *       narrows, structure widens — and it is what sections 9, 10, 12 and 13
 *       each do with their own artefact, so Movement III reads as five
 *       mechanism blocks of one kind rather than five different layouts. It also
 *       leaves the exhibit as the only structural element in the section, which
 *       is the correct emphasis once a real specimen lands: the message is the
 *       argument, the prose only introduces it.
 *
 * Gold budget: one element, the eyebrow hairline. The placeholder is dashed
 * `muted`, per the outcome ladder's unverified rung.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 11.
 */
export function Outreach() {
  return (
    <Section id="outreach">
      <Stack gap="block">
        {/* Header. Situation marker (muted small caps) above the gold hairline,
            so the taxonomy tag and the eyebrow stay visibly different things. */}
        <Band width="text" className="flex flex-col items-center gap-tight text-center">
          <Label>Both situations</Label>
          <Eyebrow>The second door</Eyebrow>
          <Display as="h2" size="h2">
            Thirty to seventy messages a week, written to a person
          </Display>
        </Band>

        <Band width="text">
          <Stack>
            <Body>
              Between thirty and seventy messages a week go out to hiring managers, internal
              recruiters and functional leaders at the companies you have agreed to target. They go
              in your name, from your account, saying what you have done and why you are writing to
              that person specifically.
            </Body>
            <Body>
              This is the part that does not scale for one person doing it alone in the evenings,
              and it is the reason most searches never touch it.
            </Body>
          </Stack>
        </Band>

        {/*
          Exhibit 03 — BLOCKED. Build scaffolding, not page copy.

          The copy deck supplies the exhibit label, three callouts and a legend,
          but not the specimen itself: the message is an artefact, and artefact
          specimens are an open launch blocker in CLAUDE.md ("Built from real
          templates with a fictional client and employer, labelled as such").
          Redacted real outreach was ruled out there — name removal is not
          anonymisation, and a real message profiles a third party who never
          contracted with CCC.

          So nothing annotated ships. The callouts describe a specimen that does
          not exist, and the legend asserts "real format and real methodology,
          reconstructed with a fictional recipient" about a thing that has not
          been reconstructed. Rendering either would be a claim about absent
          evidence, so both are omitted and are listed as owed in the build
          report.

          When the specimen is written it renders as live HTML text, not as an
          image — the deck's build note is explicit — so it will not use
          `WorkProductPlate`, which takes an <img>. The recipient's reply is
          never published in any form.

          Delete this entire figure when the specimen lands.
        */}
        <figure
          data-blocked="artefact-specimen-outreach-message"
          className="mx-auto flex w-full max-w-structure flex-col gap-tight"
        >
          <div className="flex flex-col items-center justify-center gap-flow-m rounded border border-dashed border-muted px-gutter-m py-block-m text-center md:gap-flow md:px-gutter md:py-block">
            <OutcomeBadge stage="unverified">Specimen missing</OutcomeBadge>
            <Caption className="max-w-text">
              No direct-approach specimen exists. It is to be built from the real template with a
              fictional recipient and employer and labelled as such, then set as live text rather
              than as a screenshot. No real outreach message is used, and no recipient reply is
              published in any form.
            </Caption>
          </div>
          <figcaption>
            <Caption>
              Placeholder for <span className="tnum">exhibit 03</span>. Its three callouts and its
              legend are held with it, because every one of them is an annotation on a specimen that
              has not been written. This block must be deleted before launch.
            </Caption>
          </figcaption>
        </figure>
      </Stack>
    </Section>
  )
}
