import {
  Band,
  Body,
  Caption,
  H3,
  Label,
  OutcomeBadge,
  Reveal,
  Section,
  SectionHeader,
  Stack,
  Well,
} from '@/components/ui'

/**
 * 9. The work — Movement III, merged.
 *
 * ─── What this replaces ─────────────────────────────────────────────────────
 *
 * One section in place of six: § 08 (you stop applying), § 09 (positioning and
 * the Signal Layer), § 10 (Door One), § 11 (Door Two), § 12 (the dossier) and
 * § 13 (the negotiation). Round 2 owner feedback, 9 September 2026 — the page
 * reads too long and too careful, no rendered paragraph over 45 words, and
 * duplication is to be cut ruthlessly. The six originals rendered roughly 600
 * reader-facing words plus five separate blocks of build scaffolding; this
 * renders ~255 and one.
 *
 * § 08 is cut, but two things from it survive here because nothing else on the
 * page carries them:
 *   · The signed founder statement. Four of five critique lenses found the page
 *     had no human presence; this is the only place a named person stands
 *     behind the claim. Its `data-blocked="founder-photograph"` slot stays
 *     attached to the statement rather than moving to the collapsed slot below,
 *     because the missing asset belongs to this element specifically.
 *   · `data-blocked="success-fee-events"` — the offer arising from an
 *     application the client sent before signing. The deck calls it the
 *     question most likely to decide the sale; losing the slot would lose the
 *     record of it.
 * § 08's other two in-flight rows (applications already sent stay in flight; an
 * interview you sourced gets the same briefing) are dropped. They cost ~30
 * reader words to make a concession the merged section has no room for, and
 * neither is a claim the page depends on. Restore them in the FAQ if the owner
 * wants them back.
 *
 * ─── Deduplication ──────────────────────────────────────────────────────────
 *
 * Each fact is stated once, in the block that owns it. What was cut, and where
 * the fact still lives:
 *   · The Signal Layer was stated three times inside § 09 alone (prose, an H3,
 *     and a spec list). Once here, in the positioning row.
 *   · "Ten or more applications a week" appears page-wide in § 04, § 07, § 14
 *     and § 17. This section owns the operational statement of it; the earlier
 *     mentions are diagnosis and division of labour, not a restatement of the
 *     mechanism, so nothing is restated here that the row does not own.
 *   · "In your name / on your instruction" was restated in four of the five
 *     originals. It is stated once, in the lede, which is why no row repeats
 *     it — and it is the framing, so it must not be dropped, only centralised.
 *   · § 12's dossier contents list (five spec pairs) is folded into the row's
 *     one sentence; the "what to ask them" row is the only item lost.
 *   · § 10's exhibit callouts, § 11's and § 13's exhibit legends, § 09's
 *     provenance line — all annotations on specimens that do not exist. They
 *     were already held back in the originals and are not reinstated.
 *   · § 13's "preparation of this kind is ordinary at senior level" and § 11's
 *     "does not scale for one person in the evenings" are commentary, not
 *     mechanism. Cut.
 *
 * ─── Framing: execution, not representation ─────────────────────────────────
 *
 * Unchanged and not relaxed. The KRAZ / pośrednictwo pracy question is open, so
 * CCC prepares materials and executes applications and outreach ON THE CLIENT'S
 * INSTRUCTION and IN THE CLIENT'S NAME. "We represent you", "we place you",
 * "we present you", "the interviews we arrange" and "we open the doors" appear
 * nowhere here and must not be added. Door Three (Direct Presentation) is held
 * back from v1 by owner instruction and is not alluded to; the warm-introduction
 * line from the older IA spec is Door Three under another name and stays out.
 *
 * The dossier row binds the 24-hour commitment to the client reporting the
 * interview ("tell us it is booked"), because an unqualified "every interview"
 * would be a promise CCC cannot keep. The negotiation row claims preparation,
 * never movement: no compensation figure, no percentage, no claim that an ask
 * succeeds. The Raise Guarantee is not repeated here; § 17 owns it with the
 * condition that voids it.
 *
 * ─── Layout ─────────────────────────────────────────────────────────────────
 *
 * Section header at w-text · founder statement as a `Well` at w-text · five
 * house ledger rows at w-structure (§ 04, § 17: `Label` + `H3` in a fixed left
 * column, `Body` capped at w-text on the right, hairline-divided, nothing
 * enclosed and nothing ranked) · one collapsed blocked slot at w-text.
 *
 * The ledger is right for five peers of unequal prose length, and it is what
 * makes the volumes scannable: a reader running down the left-hand column reads
 * 10+, 30–70, 24 hours without reading a sentence. `tnum` on every figure.
 *
 * The `Label` on each row is the stage or route name rather than the house
 * situation marker. Three of the five originals were tagged "Both situations",
 * so five rows would have carried three identical labels — noise where the
 * label is the row's only differentiator at a glance. Flagged in the report.
 *
 * Gold budget: one element, the eyebrow hairline. The `Well` takes no `goldTop`
 * and no row is picked out.
 *
 * Motion: `Reveal` on the four groups at 40ms steps, per the hero.
 */

type Block = {
  id: string
  label: string
  heading: React.ReactNode
  body: React.ReactNode
}

const BLOCKS: readonly Block[] = [
  {
    id: 'positioning',
    label: 'Positioning',
    heading: 'Your CV and profile, rebuilt from raw history',
    body: (
      <>
        Not edited. Rebuilt from what you actually did, with the LinkedIn profile rewritten
        alongside it. Then <span className="tnum">3&ndash;5</span> posts a week publish on your own
        profile, in your voice.
      </>
    ),
  },
  {
    id: 'applications',
    label: 'The first door',
    heading: (
      <>
        <span className="tnum">10+</span> applications a week
      </>
    ),
    body: 'Targeted to the role rather than sent in bulk, tracked, followed up. They go out on the weeks you would have skipped, which in a long search is most of them.',
  },
  {
    id: 'outreach',
    label: 'The second door',
    heading: (
      <>
        <span className="tnum">30&ndash;70</span> direct approaches a week
      </>
    ),
    body: 'To hiring managers, internal recruiters and functional leaders at the companies you agreed to target. From your account, saying what you have done and why you are writing to that person.',
  },
  {
    id: 'dossier',
    label: 'Before the interview',
    heading: (
      <>
        A dossier within <span className="tnum">24</span> hours of every confirmed interview
      </>
    ),
    body: (
      <>
        Tell us it is booked and it arrives: the company as it operates, who is on the panel and
        what they own, and <span className="tnum">15&ndash;20</span> questions we expect, with your
        answers built from your history.
      </>
    ),
  },
  {
    id: 'negotiation',
    label: 'When the offer comes',
    heading: 'Most people accept the first number they hear',
    body: 'We work out what to ask for and how to ask it. You go into that conversation with the wording already prepared, not improvising on a call you did not expect.',
  },
] as const

/**
 * The collapsed blocked slot. Five separate scaffolding blocks in the originals,
 * each with its own badge and its own multi-sentence caption, became one panel
 * with one badge and one short line per item — roughly half the text those five
 * sections rendered was scaffolding, and this is where that saving comes from.
 *
 * Every `data-blocked` slug from the originals survives on its own `<li>`, so
 * `grep -rn data-blocked` still lists all of them. The full explanations live in
 * the originals' history and in CLAUDE.md's OPEN list, which is where the build
 * team reads them; the page renders a few words each.
 *
 * Notes the page must not render, kept here:
 *   · signal-layer-controls — the approval mechanism, what an employed client
 *     may decline, and what a current employer can see. Publishing in a client's
 *     name is a material characteristic of the service; omitting it is a
 *     misleading omission, which is why the Signal Layer stays visible in the
 *     positioning row while its controls are marked missing here.
 *   · application-approval-unresolved — the offer letter's approval obligation
 *     covers CV, profile and content only, and Door One runs at ten or more a
 *     week with no approval step. Nothing on this page may imply per-application
 *     approval until it closes.
 *   · The four specimens — built fresh from the real templates with a fictional
 *     client and employer, labelled as such. Redacted originals were ruled out:
 *     name removal is not anonymisation, and the dossier profiles third parties
 *     who never contracted with CCC. The negotiation specimen carries relative
 *     markers only, never a salary, raise or percentage.
 *   · success-fee-events — whether an offer arising from an application sent
 *     before signature triggers an instalment. Owner and counsel.
 *
 * This whole block must be deleted before launch.
 */
const OWED: readonly { slug: string; text: string }[] = [
  {
    slug: 'signal-layer-controls',
    text: 'Signal Layer: approval, and what a current employer sees',
  },
  { slug: 'cv-specimen-not-built', text: 'CV before-and-after specimen' },
  {
    slug: 'application-approval-unresolved',
    text: 'Who selects roles, and whether you see an application first',
  },
  { slug: 'exhibit-02-activity-log-specimen-not-built', text: 'Weekly activity log specimen' },
  { slug: 'artefact-specimen-outreach-message', text: 'Direct approach message specimen' },
  { slug: 'artefact-specimen-interview-dossier', text: 'Interview dossier specimen' },
  { slug: 'artefact-specimen-negotiation-preparation', text: 'Negotiation preparation specimen' },
  { slug: 'success-fee-events', text: 'Offer from an application you sent before signing' },
] as const

export function TheWork() {
  return (
    <Section id="the-work" width="structure">
      <Stack gap="block">
        <Reveal>
          <SectionHeader
            eyebrow="What the team runs"
            heading="From the day you sign, you stop being the one applying"
            lede="All of it goes out on your instruction and in your name. Which roles, how you are described and which offer you take stay yours."
          />
        </Reveal>

        {/* The founder statement, carried over from the cut § 08. A `Well` —
            the system assigns wells to quoted material — and deliberately not
            the `Testimonial` primitive, which would file the founder's own
            accountability under social proof. */}
        <Reveal delay={0.04}>
          <Band width="text">
            <Well>
              <div className="flex flex-col gap-flow-m sm:flex-row sm:items-start md:gap-flow">
                {/* Scaffolding. Replace with the founder portrait when the asset
                    lands; the photograph is a launch blocker. */}
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
          </Band>
        </Reveal>

        {/* The ledger. Five peers, identical anatomy, hairline-divided. */}
        <Reveal delay={0.08}>
          <ul className="flex list-none flex-col gap-block-m md:gap-block">
            {BLOCKS.map((block) => (
              <li
                key={block.id}
                className="grid grid-cols-1 gap-y-flow-m border-t border-line pt-block-m md:grid-cols-[minmax(200px,300px)_1fr] md:gap-x-block md:gap-y-0 md:pt-block"
              >
                <div className="flex flex-col gap-tight">
                  <Label>{block.label}</Label>
                  <H3>{block.heading}</H3>
                </div>
                <Body className="max-w-text">{block.body}</Body>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Scaffolding, not page copy. See the block comment above `OWED`. */}
        <Reveal delay={0.12}>
          <Band width="text">
            <div className="flex flex-col items-start gap-tight rounded border border-dashed border-muted p-card-m md:p-card">
              <OutcomeBadge stage="unverified">Not for publication</OutcomeBadge>
              <Label as="p">What is still owed on this section</Label>
              <ul className="flex list-none flex-col gap-tight">
                {OWED.map((item) => (
                  <li key={item.slug} data-blocked={item.slug}>
                    <Caption>{item.text}</Caption>
                  </li>
                ))}
              </ul>
            </div>
          </Band>
        </Reveal>
      </Stack>
    </Section>
  )
}
