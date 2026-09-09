import {
  Band,
  Body,
  Caption,
  H3,
  OutcomeBadge,
  Section,
  SectionHeader,
  Stack,
} from '@/components/ui'

/**
 * 17. The guarantees — Movement IV, the protections on the number just given.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 17.
 *
 * ─── What this section is for ───────────────────────────────────────────────
 *
 * The four guarantees are publishable — the decision of 8 September 2026 in
 * CLAUDE.md — precisely because they are contractual terms rather than outcome
 * predictions. That distinction only survives if the terms arrive with the
 * conditions that qualify them. A guarantee published without the condition that
 * voids it is a misrepresentation, and the failure mode the IA names is
 * Revision 1's: it published the guarantees three sections away from the client
 * obligations and never linked them, "which publishes a different and stronger
 * guarantee than the one being sold."
 *
 * ─── Equal weight: how it is enforced here ──────────────────────────────────
 *
 * The deck writes each guarantee as ONE sentence carrying both halves — "Work
 * continues until an offer is signed. No time limit and no further fee", "If the
 * offer you accept does not beat what you earn now…", "If you lose the role
 * before the third…". That sentence is rendered whole and undivided:
 *
 *   - One paragraph, one size (`Body`, 16.5px), one colour (`body`), one weight.
 *     The promise clause and the conditional clause are indistinguishable
 *     typographically because they are the same run of text.
 *   - `Op` (ink emphasis) is used nowhere in this section. Picking out the
 *     promise clause in `ink` and leaving the condition in `body` would be the
 *     exact defect, executed with a system primitive.
 *   - Nothing is set in `muted` except the two blocked slots' captions, which are
 *     build scaffolding rather than page copy. No condition, limit or exception
 *     appears at `caption` size, in `muted`, in a footnote, or behind a
 *     disclosure.
 *   - The shared condition — the guarantees hold only while the client holds up
 *     their side — is not a footnote either. It is the opening line, at w-text
 *     before any guarantee is stated, and it cross-refers to the § 14 ledger
 *     rather than restating it, per the IA.
 *
 * The guarantee NAME is the row's `H3`. The name is a label for the term, not
 * the promise; promise and condition both live in the sentence beside it, at
 * equal weight to each other. That is the distinction the constraint is about.
 *
 * ─── Layout: three treatments considered ────────────────────────────────────
 *
 *   (a) `SpecList` spec pairs — NO-STOP / RAISE / PROBATION / ADMISSIONS as
 *       terms, the sentences as values. It is the page's workhorse and the deck
 *       hands it a four-row table, so it is the obvious reading. Rejected on the
 *       brief's central constraint: spec values are `text-s` (14.5px) and terms
 *       are `muted`, so the whole block — promise and condition together —
 *       renders as the smallest prose on the page, in the section that carries
 *       the strongest contractual claims. "Not small print" has to be true of
 *       the promise as well as the condition. It also leaves nowhere to attach
 *       the two No-Stop blockers to the No-Stop row; a `dd` full of dashed panels
 *       breaks the grid.
 *   (b) A 2×2 `Card` grid, each card an `H3` promise over a `Body` condition —
 *       "Work continues until an offer is signed" as the heading, the limits
 *       underneath. Rejected outright, and it is worth recording why, because it
 *       is the treatment this section would get by default: it renders the
 *       promise at 24px in `ink` and the condition at 16.5px in `body`, which is
 *       the misrepresentation shape exactly. Uniform card enclosure also forces
 *       the No-Stop contradiction out of the No-Stop card and into a footnote
 *       band under the grid, detaching the conflict from the guarantee it
 *       qualifies — the same adjacency failure as Revision 1, one section down.
 *   (c) Chosen — the house ledger row (§ 04): four peers at `max-w-structure`,
 *       `H3` name in a fixed left column, the deck's sentence as `Body` capped
 *       at `max-w-text` on the right, rows divided by a `border-line` hairline,
 *       nothing enclosed and nothing ranked. It carries a full sentence at
 *       reading size, it keeps the four terms visibly peer, and the right column
 *       is a flow container, so the No-Stop row can carry its own unresolved
 *       questions directly beneath its own sentence, where a reader meets them
 *       while reading that guarantee and not after having accepted it.
 *
 * ─── The No-Stop duration conflict: surfaced, not resolved ──────────────────
 *
 * CLAUDE.md marks this urgent because this guarantee is going on the page: the
 * No-Stop Guarantee says there is no time limit, and the published terms page at
 * /regulamin says duration is individually agreed. The deck carries it as a
 * blocker, and a second one: nothing currently discharges CCC under the
 * guarantee, which makes it a perpetual obligation.
 *
 * Neither is answered here. Inventing a discharge condition would be writing the
 * contract at build time, and silently narrowing the sentence to fit /regulamin
 * would be writing copy. Both ship as house blocked slots — dashed `unverified`
 * treatment, a badge naming what is missing in words, `data-blocked` on the
 * outermost node — placed inside the No-Stop row. Two separate nodes, because
 * they are two separate items of work and one grep must list both:
 *
 *   data-blocked="no-stop-discharge-undefined"
 *   data-blocked="no-stop-duration-conflicts-with-regulamin"
 *
 * The deck's sentence is published unchanged in the meantime, which is the
 * correct order of operations: the sentence is the owner's contractual term, and
 * the visible debt is the record that it cannot ship until /regulamin agrees
 * with it. Both slots must be deleted before launch.
 *
 * ─── "We expect to place you" ───────────────────────────────────────────────
 *
 * It does not appear in this section, and that is the deck's placement, not a
 * judgement call made here. Deck § 17's ADMISSIONS row reads "We decline
 * applicants we do not expect to succeed with. That is why the three above are
 * affordable to offer" — the approved sentence and its two candidate wordings
 * live in § 18, which is a different section and a different owner. The deck
 * wins over the IA and over the brief's permission, so § 17 ships the § 17
 * wording verbatim.
 *
 * That is also the safer outcome on the conditions attached to the approval. The
 * sentence may appear only bound to "we decline the majority of applicants" in a
 * single sentence, and duplicating it across two adjacent sections would double
 * the number of one-sentence crops in circulation without adding an argument.
 * The deck's § 17 wording is bound in the same way and is weaker on placement —
 * "succeed with", not "place" — which suits a page drafted on execution framing
 * while the KRAZ question is open.
 *
 * ─── Boundaries ─────────────────────────────────────────────────────────────
 *
 * No fee arithmetic. § 16 owns the 6,000 PLN, the 23% and the cap; the Raise and
 * Probation rows here refer to "the instalments", "the fee" and "the remaining
 * payments" exactly as the deck writes them, with no figure repeated. The
 * economics paragraph names the published weekly volumes and the fact that the
 * back end only arrives on a raise, which is what the IA requires to make the
 * guarantee believable, and it states no sum.
 *
 * Framing is execution throughout. Nothing here says CCC represents, places or
 * presents anyone. "Nothing is owed on the instalments" is not "we only get paid
 * when you do" — the activation fee is stated in § 16 and is unaffected by these
 * terms, and no sentence in this section claims otherwise.
 *
 * ─── Gold budget ────────────────────────────────────────────────────────────
 *
 * One element: the eyebrow hairline. No gold row, no gold rule under the ledger,
 * no `start`-stage badge — the outcome ladder's gold is reserved for a confirmed
 * job start and a guarantee is not an outcome.
 */

/**
 * Verbatim from the deck's four-row table. Each `term` is the row's name; each
 * `text` is the deck's sentence in full, promise and condition undivided.
 */
const GUARANTEES: readonly { id: string; name: string; text: string }[] = [
  {
    id: 'no-stop',
    name: 'No-Stop',
    text: 'Work continues until an offer is signed. No time limit and no further fee',
  },
  {
    id: 'raise',
    name: 'Raise',
    text: 'If the offer you accept does not beat what you earn now, nothing is owed on the instalments',
  },
  {
    id: 'probation',
    name: 'Probation',
    text: 'The fee comes from your first three paycheques. If you lose the role before the third, the remaining payments are cancelled and the search reopens at no new fee',
  },
  {
    id: 'admissions',
    name: 'Admissions',
    text: 'We decline applicants we do not expect to succeed with. That is why the three above are affordable to offer',
  },
] as const

export function Guarantees() {
  return (
    <Section id="guarantees" width="structure">
      <Stack gap="block">
        <SectionHeader
          eyebrow="Contractual terms, not predictions"
          heading="Four commitments, and the condition that applies to all of them"
          lede="These are terms in the agreement rather than claims about what will happen. They hold while you hold up your side, which is the three commitments in the section above."
        />

        {/*
          The ledger. Four peers, identical anatomy, hairline-divided, nothing
          enclosed and nothing ranked. Each sentence is one undivided run of
          `Body` — no ink emphasis, no muted clause, no footnote.
        */}
        <ul className="flex list-none flex-col gap-block-m md:gap-block">
          {GUARANTEES.map((guarantee) => (
            <li
              key={guarantee.id}
              className="grid grid-cols-1 gap-y-flow-m border-t border-line pt-block-m md:grid-cols-[minmax(200px,260px)_1fr] md:gap-x-block md:gap-y-0 md:pt-block"
            >
              <H3>{guarantee.name}</H3>

              <div className="flex flex-col gap-flow-m md:gap-flow">
                <Body className="max-w-text">{guarantee.text}</Body>

                {guarantee.id === 'no-stop' && (
                  <>
                    {/*
                      Blocked slot 1 — the guarantee has no stated end. Nothing
                      here invents one. Scaffolding, not page copy; delete before
                      launch and replace with the Agreement's termination line.
                    */}
                    <div
                      data-blocked="no-stop-discharge-undefined"
                      className="flex max-w-text flex-col items-start gap-tight rounded border border-dashed border-muted p-card-m md:p-card"
                    >
                      <OutcomeBadge stage="unverified">End of the guarantee missing</OutcomeBadge>
                      <Caption>
                        What discharges CCC under this guarantee is undefined. Owner and counsel.
                      </Caption>
                    </div>

                    {/*
                      Blocked slot 2 — the live contradiction with the published
                      terms page. Surfaced, not resolved, and attached to the
                      guarantee it contradicts rather than to a footnote band.
                    */}
                    <div
                      data-blocked="no-stop-duration-conflicts-with-regulamin"
                      className="flex max-w-text flex-col items-start gap-tight rounded border border-dashed border-muted p-card-m md:p-card"
                    >
                      <OutcomeBadge stage="unverified">Conflicts with the terms page</OutcomeBadge>
                      <Caption>
                        The terms page says duration is individually agreed. Both cannot stand.
                      </Caption>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/*
          The economics. The IA's requirement: on the published weekly volumes an
          unlimited guarantee is not believable unless the mechanism that makes it
          survivable is on the page. It sits after all four rows because it draws
          on the Admissions row as well as the No-Stop one. Prose narrows to
          720px. No figure — § 16 owns the money.
        */}
        <Band width="text">
          <Body>
            An unlimited search is expensive to run, so it is fair to ask how it holds up. We turn
            down most applicants, and our instalments only arrive if you get a raise. A long search
            costs us more and pays us the same.
          </Body>
        </Band>
      </Stack>
    </Section>
  )
}
