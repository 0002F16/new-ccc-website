import { Band, Body, Card, H3, Label, Section, SectionHeader, Stack } from '@/components/ui'

/**
 * 14. What we run, what you do — Movement III, the close of the delivery run.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 14.
 *
 * ─── What this section is for ───────────────────────────────────────────────
 *
 * This is the honesty section. Everything before it describes work CCC does; a
 * reader arriving here has spent four exhibits being told the search is run for
 * them. The IA's prohibition is the whole brief: "never imply the client does
 * nothing." The client's seven contractual obligations live here, compressed by
 * the deck into three named commitments, and each one carries a real deadline.
 *
 * ─── Layout: three treatments considered ────────────────────────────────────
 *
 *   (a) The deck's markdown table rendered literally — ten left cells, three
 *       right cells, the right column's blanks preserved so each commitment
 *       lines up with a CCC row. Rejected. The alignment is an artefact of
 *       writing the deck in markdown, not a real correspondence: "approve what
 *       goes out" does not answer "write and publish three to five posts a
 *       week" specifically. Rendering it would assert a mapping the source does
 *       not make, and seven blank cells down the client's side is precisely the
 *       visual claim — "not much over here" — that this section must not make.
 *   (b) Two stacked ledgers, section 04's row pattern, CCC's ten then the
 *       client's three. Rejected on the IA's reasoning for merging the two
 *       sections in the first place: "seven duties beside twenty CCC duties
 *       reads as a bargain; seven alone reads as a contract schedule." Stacked
 *       is functionally the split version again, with the client's duties last
 *       and at peak fatigue. The beside-ness is the argument.
 *   (c) Chosen — two peer columns at w-structure, side by side from `md`, each
 *       an identically enclosed `Card` headed by a `Label` naming the column.
 *       Equal enclosure, equal padding, equal border, equal shadow; neither
 *       column is gold-edged, badged, ordered or ranked. Below `md` they stack
 *       in the deck's order, which reads as two headed lists rather than as a
 *       broken table.
 *
 * ─── How the client's column is kept at full weight ─────────────────────────
 *
 * A ten-versus-three count is the obvious way to make the client's side look
 * light, so weight is deliberately redistributed against the count:
 *
 *   - Each commitment is an `H3` — real heading type, grotesk 600 in `ink` —
 *     with its exact obligations as `Body` beneath. CCC's ten items are single
 *     unheaded lines of the same `Body` size. Per item the client's column is
 *     the heavier of the two, and it occupies comparable height despite having
 *     under a third of the entries.
 *   - Deadlines are never abbreviated or moved to a caption. "Within 48 hours
 *     of signing", "the same day", "within 24 hours", "immediately" all sit in
 *     running text at reading size, not in `muted` small print.
 *   - The closing line is the section's last word and it is the client's side
 *     talking: it names the commitments as a count and says plainly that the
 *     service does not work without them. It is set as centred prose at w-text,
 *     the page's most-read width, not as a footnote under the right column.
 *   - No enclosure, colour, numeral or badge distinguishes the two columns, so
 *     nothing typographic tells the reader which side is the seller's.
 *
 * ─── The approval scope ─────────────────────────────────────────────────────
 *
 * `[CONFIRM APPLICATION APPROVAL]` is open. The deck's own wording is already
 * scoped correctly and is shipped verbatim: the client approves "Your CV, your
 * profile and your content" — not applications. Nothing here is widened to
 * "everything that goes out" or "what we send", and the CCC column states
 * applications and outreach as work CCC writes and sends with no approval step
 * mentioned, which is what the source documents actually support. The blocked
 * slot recording that the question is unanswered is owned by
 * components/sections/10-applications.tsx (`data-blocked="application-approval
 * -unresolved"`); it is not duplicated here, so one grep still returns one item
 * of work.
 *
 * ─── Framing ────────────────────────────────────────────────────────────────
 *
 * The offer letter's obligation reads "attend every arranged interview". The
 * deck writes "Attend every interview prepared" and the deck wins — "the
 * interviews we arrange" is forbidden framing, and the deck's phrasing is the
 * execution-framed version of the same duty. Nothing in this file says CCC
 * represents, places, presents or arranges anything.
 *
 * ─── Gold budget ────────────────────────────────────────────────────────────
 *
 * One element: the eyebrow hairline. Neither card takes `gold`; gold-edging
 * either column would rank them.
 */

/**
 * Verbatim, in the deck's order, from the ledger's WE RUN column. One line each,
 * drawn from sections 9–13.
 */
const WE_RUN: readonly string[] = [
  'Rebuild the CV from your raw history',
  'Rewrite the LinkedIn profile',
  'Write and publish three to five posts a week in your voice',
  'Choose and target the roles',
  'Write and send ten or more applications a week',
  'Track and follow up every one',
  'Send thirty to seventy direct approaches a week',
  'Build a dossier within 24 hours of every confirmed interview',
  'Prepare the negotiation',
  'Keep going until an offer is signed',
] as const

/**
 * Verbatim, in the deck's order, from the ledger's YOU DO column. The seven
 * contractual obligations, compressed into three named commitments and expanded
 * to their exact wording. The deck bolds the commitment name; Gilt forbids bold
 * in prose, so the name becomes the row's heading instead — which gives it more
 * weight, not less.
 */
const YOU_DO: readonly { id: string; commitment: string; detail: string }[] = [
  {
    id: 'commitment-history',
    commitment: 'Give us your history.',
    detail: 'Three intake documents, and account access within 48 hours of signing',
  },
  {
    id: 'commitment-approve',
    commitment: 'Approve what goes out.',
    detail: 'Your CV, your profile and your content, inside the agreed windows',
  },
  {
    id: 'commitment-show-up',
    commitment: 'Show up, and tell us what happened.',
    detail:
      'Attend every interview prepared, report each one within 24 hours, respond the same day when a recruiter contacts you, and tell us immediately about any offer from any source',
  },
] as const

export function DivisionOfLabour() {
  return (
    <Section id="division-of-labour" width="structure">
      <Stack gap="block">
        <SectionHeader
          eyebrow="The split, in full"
          heading="You are not buying a service you can ignore"
        />

        {/*
          Two peers at w-structure. Identical enclosure, identical geometry,
          identical column-head treatment. Nothing marks which side is ours.
        */}
        <div className="grid grid-cols-1 gap-flow-m md:grid-cols-2 md:gap-flow">
          <Card>
            <Label as="p">We run</Label>
            <ul aria-label="What we run" className="flex list-none flex-col">
              {WE_RUN.map((item, i) => (
                <li
                  key={item}
                  className={
                    i === 0 ? 'pb-tight' : 'border-t border-line-soft pb-tight pt-tight last:pb-0'
                  }
                >
                  <p className="text-base text-body">{item}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <Label as="p">You do</Label>
            <ul aria-label="What you do" className="flex list-none flex-col">
              {YOU_DO.map((item, i) => (
                <li
                  key={item.id}
                  className={
                    i === 0
                      ? 'flex flex-col gap-tight pb-flow-m md:pb-flow'
                      : 'flex flex-col gap-tight border-t border-line-soft pb-flow-m pt-flow-m last:pb-0 md:pb-flow md:pt-flow'
                  }
                >
                  <H3>{item.commitment}</H3>
                  <Body>{item.detail}</Body>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Prose narrows to 720px. The client's side has the last word. */}
        <Band width="text">
          <Body className="text-center">
            Three commitments on your side. If responding within a day and attending interviews
            prepared is not something you can commit to right now, this will not work and we would
            rather say so here than on the call.
          </Body>
        </Band>
      </Stack>
    </Section>
  )
}
