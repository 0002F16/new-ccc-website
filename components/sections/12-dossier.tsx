import {
  Band,
  Body,
  Caption,
  Card,
  Display,
  Eyebrow,
  Label,
  OutcomeBadge,
  Op,
  Section,
  SpecList,
  Stack,
  type Spec,
} from '@/components/ui'

/**
 * 12. Every confirmed interview gets a dossier within 24 hours — Movement III,
 * the mechanism block that carries the strongest concrete deliverable on the
 * page.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 12.
 *
 * ─── Layout: three treatments considered ────────────────────────────────────
 *
 *   (a) Numbered process steps — the five contents entries as `ProcessStep`,
 *       01 through 05. Rejected on the system's own rule: "numbers only where
 *       the order is real". A dossier's five parts are the parts of one
 *       document, not a sequence; numbering them would assert an order that
 *       does not exist, and it would spend five accent numerals against a gold
 *       budget of one.
 *   (b) A five-card grid — one `Card` per contents entry, title plus gloss.
 *       Rejected twice over. It is the "heading and three feature cards"
 *       section the system forbids, and enclosure in Gilt marks a completed,
 *       self-contained thing: five separate enclosures say five deliverables,
 *       when the claim is that one document arrives containing all five. The
 *       gloss text is also short and uneven, which is precisely the shape the
 *       spec pair exists for and the shape a card grid handles worst.
 *   (c) Chosen — centred prose at w-text, then the contents list as a single
 *       `SpecList` inside one `Card` at w-structure, its own `Label` header
 *       ("What is in it") above the pairs. The deck supplies this content as a
 *       two-column table of term and gloss, which is the spec pair verbatim —
 *       "reach for it before reaching for prose". One enclosure for one
 *       document is the honest reading of the enclosure rule, the 720/1040
 *       alternation is the page's rhythm, and it matches how § 10 and § 11
 *       lay out their own mechanism blocks so Movement III reads as one run.
 *
 * ─── The specimen is blocked and must never be manufactured ─────────────────
 *
 * Exhibit 04 does not ship. A real dossier profiles the interviewers — third
 * parties who never contracted with CCC and whose consent is not obtainable by
 * any realistic route — so it is unpublishable even redacted, because name
 * removal is not anonymisation. The IA is explicit about this and CLAUDE.md
 * carries "Artefact specimens" as a launch blocker: the permitted version is
 * built fresh from the real template with a fictional client and employer, and
 * it has not been built.
 *
 * So the deck's exhibit label, its two callouts, its legend and its alt text
 * are all held back with it. Every one of them is an annotation on a specimen
 * that does not exist: the legend would assert "real format and real
 * methodology, reconstructed" about a thing nobody has reconstructed, and the
 * alt text would describe a page nobody has set. Rendering any of them would be
 * a claim about absent evidence. They are owed, and the blocked slot below is
 * the record of that — one grep for `data-blocked` lists it.
 *
 * The contents list is a different thing and it does ship: it states what the
 * document contains, in the deck's own words, and it makes no claim about an
 * artefact the reader is being shown.
 *
 * ─── Framing ────────────────────────────────────────────────────────────────
 *
 * Execution only. The dossier is prepared for an interview the client obtained
 * and reported — never an interview CCC arranged, sourced or opened. The
 * deck's claim note is load-bearing and is preserved exactly: "confirmed" in
 * the heading and "once you have told us about it" in the body, because the
 * 24-hour commitment depends on the client reporting the interview and an
 * unqualified "every interview" would be a promise CCC cannot keep. Nothing
 * here predicts an outcome from the preparation.
 *
 * The figures — 24 hours, fifteen to twenty questions, 17 — are the offer
 * letter's and are publishable. They describe the document, not a result.
 *
 * ─── Gold budget ────────────────────────────────────────────────────────────
 *
 * One element: the eyebrow hairline. The contents `Card` therefore takes the
 * default `line` edge, not `gold`, even though it is the section's most
 * important element — same resolution § 10 reached for its callout numerals.
 *
 * Figures carry `tnum`.
 */

/** Verbatim from the deck's "Dossier contents, in live text" table. */
const CONTENTS: Spec[] = [
  { term: 'The company', value: 'Structure, recent changes, how the team you would join fits' },
  { term: 'The panel', value: 'Each interviewer, what they own, what they are likely to press on' },
  { term: '17 questions', value: 'Predicted from the role, the panel and the stage' },
  {
    term: 'Your answers',
    value: (
      <>
        Built from your history, <Op>in your words</Op>, before you walk in
      </>
    ),
  },
  { term: 'What to ask them', value: 'Questions that tell you whether you want the job' },
]

export function Dossier() {
  return (
    <Section id="dossier">
      <Stack gap="block">
        {/* Header. Situation marker above the gold hairline, per the house
            pattern, so the taxonomy tag and the eyebrow stay distinct. */}
        <Band width="text" className="flex flex-col items-center gap-tight text-center">
          <Label>Both situations</Label>
          <Eyebrow>The part nobody else builds</Eyebrow>
          <Display as="h2" size="h2">
            Within <span className="tnum">24</span> hours, you know who is across the table
          </Display>
        </Band>

        <Band width="text">
          <Stack>
            <Body>
              Once an interview is confirmed and you have told us about it, you get a briefing
              within <span className="tnum">24</span> hours. The company as it actually operates
              rather than as it describes itself. Who is interviewing you and what they are
              responsible for. Between fifteen and twenty questions we expect you to be asked, with
              your answers built out, using your own experience.
            </Body>
            <Body>
              Preparation of this kind is ordinary practice at senior level and almost nobody below
              that gets it. It is the single biggest difference between the two candidates in the
              final round.
            </Body>
          </Stack>
        </Band>

        {/* The contents list — live text, the section's shippable structure. */}
        <Band width="structure">
          <Card>
            <Label as="p">What is in it</Label>
            <SpecList specs={CONTENTS} className="tnum" />
          </Card>
        </Band>

        {/*
          Exhibit 04 — BLOCKED. Build scaffolding, not page copy. Delete this
          entire figure when the specimen lands; see the block comment above for
          why nothing annotating it may ship in the meantime.
        */}
        <figure
          data-blocked="artefact-specimen-interview-dossier"
          className="mx-auto flex w-full max-w-structure flex-col gap-tight"
        >
          <div className="flex flex-col items-center justify-center gap-flow-m rounded border border-dashed border-muted px-gutter-m py-block-m text-center md:gap-flow md:px-gutter md:py-block">
            <OutcomeBadge stage="unverified">Specimen missing</OutcomeBadge>
            <Caption className="max-w-text">
              No dossier specimen exists. It is to be built from the real template and the real
              methodology with a fictional client and employer and labelled as such. No real dossier
              is used in any form: it profiles the interviewers, who never contracted with CCC, and
              removing their names would not anonymise it.
            </Caption>
          </div>
          <figcaption>
            <Caption>
              Placeholder for <span className="tnum">exhibit 04</span>. Its callouts, its legend and
              its alt text are held with it, because each is an annotation on a specimen that has
              not been built. This block must be deleted before launch.
            </Caption>
          </figcaption>
        </figure>
      </Stack>
    </Section>
  )
}
