import { Band, Caption, H3, OutcomeBadge, Section, SectionHeader, Stack } from '@/components/ui'

/**
 * 20. Where you are by day seven — Movement V, the opening of the invitation.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 20.
 *
 * ─── What this section is for ───────────────────────────────────────────────
 *
 * Movement V has to convert, and the last thing a reader needs before the form
 * is a picture of the week that follows signature. The IA's framing constraint
 * is the whole brief and it is followed exactly: this section "states what is
 * true at each point rather than what CCC does". Every step is written from the
 * client's side — a named person is on your search, your CV draft is in your
 * hands, the search is live — and step 02 is the one that says the timeline
 * depends on the client, not on us.
 *
 * ─── This IS a real sequence, so it is numbered ─────────────────────────────
 *
 * CLAUDE.md permits numerals "only where the order is real", and the IA agrees
 * ("Numbering permitted, the order is real"). The onboarding sequence in the
 * offer letter is genuinely ordered and each step is gated on the one before
 * it: the named delivery person precedes the intake documents, the intake
 * documents produce the Raw Experience Dump, the Dump gates the CV draft, and
 * the CV draft gates the search going live. Renumbering or reordering would
 * describe a different service. So this is one of the few blocks on the page
 * that earns its numerals.
 *
 * ─── The numeral colour: deliberate, and not gold ───────────────────────────
 *
 * `ProcessStep` renders its numeral as `text-micro ... text-accent`. Four steps
 * instantiated with it would put four gold numerals on one screen, plus the
 * eyebrow hairline — five golds against a rule that says "if two things on a
 * screen are gold, one of them is wrong". The house accent-budget pattern in
 * the build brief settles the tie in the same direction the two earlier
 * sections that hit this did: § 04 rejected `ProcessStep` partly because "its
 * numeral is `accent`, which would put three golds on one screen", and § 10
 * renders the IA's specified accent callout numerals as `micro` in `muted`
 * instead, "resolved in the system's favour because the system is binding".
 *
 * The alternative permitted by the accent budget — drop the eyebrow hairline
 * and let the numerals be gold — was considered and rejected. It spends the
 * section's single gold on four elements rather than one, which is not what
 * "one accent per screen" means; the hairline is also a signature device
 * marking a new movement of the page, and this is the first section of the last
 * movement, which is the worst possible place to omit it.
 *
 * So the numerals are `micro` in `muted`, matching § 10 exactly, and set with
 * `tnum`. The ordinal information is carried by the numerals, by the `<ol>`
 * element, and by the step titles themselves, which are time markers in reading
 * order. Colour carries nothing here, which is also what the colour rule asks.
 *
 * `ProcessStep` is therefore composed by hand rather than imported. That is not
 * an invented component — it is the same anatomy (`micro` numeral, `H4`, `text-s`
 * body) with the house accent budget applied. Reported: as shipped, the
 * primitive is unusable in any section with more than one step, which is every
 * section it exists for. It needs a `tone` prop, ratified in CLAUDE.md, before
 * anyone can use it as written.
 *
 * ─── Layout: three treatments considered ────────────────────────────────────
 *
 *   (a) Four `ProcessStep`s across a four-column grid at `max-w-structure`.
 *       Rejected on the gold count above, and independently on raggedness: the
 *       four bodies run 15, 30, 8 and 17 words, so a four-across grid leaves
 *       step 03 as a third of a column beside step 02's full one. The house
 *       pattern is explicit that peers with unequal prose lengths take a ledger,
 *       not a grid.
 *   (b) A vertical timeline — a rail down the left with markers at each step.
 *       Rejected. Gilt's five signature devices are the whole permitted
 *       vocabulary of visual interest and a rail is not among them; a connector
 *       drawn between steps is ornament asserting continuity the copy already
 *       states in words. "Nothing decorative survives" applies with full force
 *       to the obvious answer for a sequence section.
 *   (c) Chosen — the house ledger row (§ 04, § 17) as an `<ol>` at
 *       `max-w-structure`: numeral in a fixed left column, `H4` time marker and
 *       `text-s` body capped at `max-w-text` on the right, rows divided by a
 *       `border-line` hairline, nothing enclosed. It absorbs the unequal prose
 *       without ragging, it keeps the four steps visibly peer while the numerals
 *       and the reading order carry the sequence, and the 1040px band against
 *       the 720px header and withdrawal note preserves the page's alternation.
 *
 * ─── The withdrawal right: surfaced, never invented ─────────────────────────
 *
 * `[CONFIRM WITHDRAWAL AND EARLY-PERFORMANCE CONSENT]` lands here rather than
 * anywhere else for the reason the IA gives: "the section that advertises the
 * fast start is the section that states the right". Everything above this note
 * describes full performance beginning within 24 hours of signature, which is
 * inside the statutory 14-day withdrawal window, and that is lawful only with
 * the consumer's express request to begin early and their acknowledgement of
 * the effect on their right to withdraw.
 *
 * The deck's withdrawal note is `[BLOCKED: ... — counsel]`, so per build-brief
 * rule 7 it ships as nothing. Nothing in this file states, paraphrases,
 * summarises or hints at a withdrawal policy. A withdrawal right is a statutory
 * consumer right; drafting one at build time would be the most serious
 * fabrication available on this page, and a wrong one is worse than an absent
 * one because it would look authoritative.
 *
 * What ships instead is the house blocked slot — `data-blocked` on the outermost
 * node, the dashed `unverified` treatment from the outcome ladder, and a badge
 * naming what is missing in words:
 *
 *   data-blocked="withdrawal-and-early-performance-consent"
 *
 * It is build scaffolding, not page copy, and it sits directly beneath the
 * sequence it qualifies rather than in a footer band, so the reader of the
 * review build meets the gap at the point the gap arises. It must be deleted
 * before launch and replaced by counsel's wording.
 *
 * ─── Boundaries ────────────────────────────────────────────────────────────
 *
 * No fee figure. The deck's build note is explicit that 6,000 PLN does not
 * appear here — § 16 establishes it — and no sum, percentage or payment
 * instruction appears in this file.
 *
 * Framing is execution throughout. "The search is live. Applications going out,
 * approaches going out, the profile rebuilt" is the deck's wording and it
 * describes work executed on the client's instruction. Nothing here says CCC
 * represents, places or presents anyone, and no interview is arranged.
 *
 * No timeline is promised beyond what the deck states, and what it states is
 * process, not outcome: what CCC delivers by when, plus the client-side
 * dependency in step 02. There is no claim about interviews, offers or a job
 * start at any point in the first week.
 *
 * ─── Nothing is added to the deck ──────────────────────────────────────────
 *
 * The deck supplies an eyebrow, an h2, four process steps and one blocked note.
 * That is the entire section. No closing line, no lede, no CTA block and no
 * transition sentence into § 21 is written here — every one of those would be
 * invented copy. § 21 is the CTA and it follows immediately.
 *
 * ─── Gold budget ───────────────────────────────────────────────────────────
 *
 * One element: the eyebrow hairline. Numerals are `muted`, row rules are `line`,
 * the blocked slot's edge is dashed `muted`. No `line-gold` anywhere else.
 */

/**
 * Verbatim from the deck's "Process steps". The numeral and the title are the
 * deck's own; `01 — Within 24 hours` is split into its two parts so the numeral
 * can take `micro`/`tnum` treatment and the title can be a real `H4`.
 */
const STEPS: readonly { n: string; title: string; body: string }[] = [
  {
    n: '01',
    title: 'Within 24 hours',
    body: 'A named person on our team is on your search and has introduced themselves.',
  },
  {
    n: '02',
    title: 'Your first 48 hours',
    body: 'You complete three intake documents, including the raw history we build the CV from. This part is yours and the timeline depends on it.',
  },
  {
    n: '03',
    title: 'Within 48 hours of that',
    body: 'Your CV draft is in your hands.',
  },
  {
    n: '04',
    title: 'By day seven',
    body: 'The search is live. Applications going out, approaches going out, the profile rebuilt.',
  },
] as const

export function DaySeven() {
  return (
    <Section id="day-seven" width="structure">
      <Stack gap="block">
        <SectionHeader eyebrow="The first week" heading="What is true seven days after you sign" />

        {/*
          The ledger, as an ordered list — the order is real and the element
          says so. Numerals are `muted`, not `accent`: see the note above.
        */}
        <ol className="flex list-none flex-col gap-block-m md:gap-block">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="grid grid-cols-1 gap-y-flow-m border-t border-line pt-block-m md:grid-cols-[minmax(200px,260px)_1fr] md:gap-x-block md:gap-y-0 md:pt-block"
            >
              <span className="tnum text-micro font-medium uppercase text-muted">{step.n}</span>

              <div className="flex flex-col gap-tight">
                <H3>{step.title}</H3>
                <p className="max-w-text text-s text-body [text-wrap:pretty]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        {/*
          The withdrawal right. Deck § 20's note is blocked on counsel, so it
          ships as nothing — no policy is stated, paraphrased or implied. This
          block is build scaffolding recording the debt and must be deleted
          before launch, replaced by counsel's wording.
        */}
        <Band width="text">
          <div
            data-blocked="withdrawal-and-early-performance-consent"
            className="flex flex-col items-start gap-tight rounded border border-dashed border-muted p-card-m md:p-card"
          >
            <OutcomeBadge stage="unverified">Withdrawal right not stated</OutcomeBadge>
            <Caption>
              Full performance starts inside the statutory 14-day withdrawal window. Wording with
              counsel.
            </Caption>
          </div>
        </Band>
      </Stack>
    </Section>
  )
}
