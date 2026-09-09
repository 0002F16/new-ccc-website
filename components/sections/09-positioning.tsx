import {
  Band,
  Body,
  Caption,
  Card,
  H3,
  Label,
  OutcomeBadge,
  Op,
  Section,
  SectionHeader,
  SpecList,
  Stack,
  type Spec,
} from '@/components/ui'

/**
 * 9. Your CV and profile, rebuilt from your raw history — Movement III, the
 * first mechanism block.
 *
 * Two jobs in one section, and they pull in opposite directions:
 *
 *   1. The rebuild. This is the concession — the reader already believes the CV
 *      is the problem, so the section agrees, then pivots past it. The pivot
 *      line ("that fixes what you can see") is what earns the rest of Movement
 *      III, so it has to land as prose, not as a feature.
 *   2. The Signal Layer. Three to five posts a week published in the client's
 *      name, on the client's own profile, using access the client hands over.
 *      The IA is explicit that leaving this to be discovered after signature is
 *      the worst version of it, and that omitting a material characteristic of
 *      the service from a sales page is a misleading omission.
 *
 * Layout — three treatments considered against the system:
 *
 *   (A) One centred 720px prose column for the whole section, exhibit slot and
 *       Signal Layer stacked in flow. Rejected: it spends no structural band at
 *       all, so the first block of Movement III — the movement whose whole job
 *       is "here is the machine" — reads as more of the same essay. The 720/1040
 *       alternation is the page's rhythm and this is the section where the
 *       machine first becomes visible.
 *   (B) The IA's eventual exhibit shape: a 620 × 420 crop window at left with a
 *       ~340px callout column beside it, prose above. Rejected *for now*, not on
 *       principle — it is the right shape once the specimen exists. With no
 *       artefact it renders as an empty box beside an empty column, which is two
 *       holes where one is honest. Build it when the file lands.
 *   (C) Chosen. Prose at w-text → a single full-width blocked exhibit slot at
 *       w-structure → the Signal Layer as its own titled sub-block, prose at
 *       w-text and its controls in a Card at w-structure. Two structural bands
 *       either side of a prose passage, which is the rhythm the system asks for,
 *       and it lets the Signal Layer read as a second subject rather than as a
 *       footnote to the CV rebuild. That separation matters: an employed reader
 *       needs to find this block, not stumble into it.
 *
 * The exhibit is a blocked slot, not an exhibit. The CV before/after specimen
 * does not exist — it is a launch blocker, and redacted originals were ruled out
 * (name removal is not anonymisation). So this follows the house blocked-slot
 * pattern from § 6: dashed `unverified` edge, a badge naming what is missing in
 * words, `data-blocked` on the outermost node. No image, no filename, no path,
 * no `WorkProductPlate` — instantiating the plate requires a `src`, and there is
 * no honest string to put in it.
 *
 * What is deliberately NOT rendered with it: the provenance line (EXHIBIT 01 ·
 * CV REBUILD · BEFORE AND AFTER · SPECIMEN), the three numbered callouts, the
 * specimen legend and the alt text. All four are written in copy deck § 9 and
 * none is marked blocked, but all four are annotations *on* an artefact — the
 * callouts point at regions of an image ("the same eleven years of experience,
 * reordered"), and the provenance line asserts the exhibit exists. Setting them
 * beside an empty frame would describe evidence the page does not have, which
 * is the one thing the claim rules are for. They ship, verbatim, with the file.
 *
 * The Signal Layer gap is surfaced, not swallowed. Two of the four control rows
 * are blocked in the deck. Rule 7 says a blocked passage ships as nothing — but
 * "nothing" here would mean a controls list that answers the two easy questions
 * and silently drops the two an employed reader is actually asking. So the terms
 * stay visible and the *answers* are what is missing: the two unanswered terms
 * sit in their own `data-blocked` dashed block with an `unverified` badge in
 * place of each value. A reader would see an unfinished page; a grep for
 * `data-blocked` lists what is owed. Neither reading is wrong.
 *
 * Gold budget: one element, the eyebrow hairline. The unverified badges are
 * dashed `muted`, not gold.
 *
 * Situation marker: BOTH SITUATIONS, per the IA's page-wide requirement that
 * every Movement III mechanism block is tagged. Gilt has no monospace face, so
 * the marker is a `Label`. It sits above the section header at `space-flow`,
 * far enough not to read as a second eyebrow.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 9.
 */

/** The two Signal Layer controls the source documents actually answer. */
const SIGNAL_CONTROLS: Spec[] = [
  {
    term: 'What is published',
    value: (
      <>
        Three to five posts a week, <Op>on your own profile</Op>, written in your voice
      </>
    ),
  },
  {
    term: 'Access',
    value: (
      <>
        You provide account access <Op>within 48 hours of signing</Op>
      </>
    ),
  },
]

/**
 * The two the deck cannot answer yet. Terms verbatim; the values are build
 * scaffolding, not page copy, and the whole block is deleted when the answers
 * arrive and these rows join `SIGNAL_CONTROLS`.
 */
const SIGNAL_CONTROLS_BLOCKED: Spec[] = [
  {
    term: 'Approval',
    value: <OutcomeBadge stage="unverified">Not yet answered</OutcomeBadge>,
  },
  {
    term: 'Your current employer',
    value: <OutcomeBadge stage="unverified">Not yet answered</OutcomeBadge>,
  },
]

export function Positioning() {
  return (
    <Section id="positioning" width="structure">
      <Stack gap="block">
        <Band width="text">
          <Stack gap="flow">
            <Label as="p" className="text-center">
              Both situations
            </Label>
            <SectionHeader
              eyebrow="Stage two of seven"
              heading="We start where everyone told you the problem was"
            />
          </Stack>
        </Band>

        <Band width="text">
          <Stack gap="flow">
            <Body>
              You have probably been told your CV is the issue. It might be. We rebuild it from your
              raw history rather than editing what you have, because editing a document that is not
              working mostly produces a tidier document that is not working. Same with the LinkedIn
              profile, which gets rewritten rather than tweaked.
            </Body>
            <Body>
              That fixes what you can see. It does not fix the fact that a lot of these roles are
              decided by people who will never read a CV, which is what the rest of this page is
              about.
            </Body>
          </Stack>
        </Band>

        {/*
          Build scaffolding, not page copy. Delete this entire figure when the
          specimen lands and replace it with the IA's crop window plus callout
          column, carrying the deck's provenance line, three callouts, legend and
          alt text. `data-blocked` keeps the missing artefact greppable.
        */}
        <figure data-blocked="cv-specimen-not-built" className="flex flex-col gap-tight">
          <div className="flex flex-col items-center justify-center gap-flow rounded border border-dashed border-muted px-gutter-m py-block-m text-center md:px-gutter md:py-block">
            <OutcomeBadge stage="unverified">Specimen not built</OutcomeBadge>
            <Caption className="max-w-text">
              No CV before/after specimen exists. Redacted client documents were ruled out — name
              removal is not anonymisation — so the exhibit has to be built fresh from the real
              template and real methodology with a fictional client and employer.
            </Caption>
          </div>
          <figcaption>
            <Caption>
              Placeholder. No image, filename or path is rendered, and the exhibit&rsquo;s
              provenance line, numbered callouts, legend and alt text are held back with it, because
              all four describe an artefact the page does not have. This block must be deleted
              before launch.
            </Caption>
          </figcaption>
        </figure>

        <Band width="text">
          <Stack gap="flow">
            <H3>We also post in your name, and you need to know that before you sign</H3>
            <Body>
              Part of the service is publishing three to five posts a week on your own LinkedIn
              profile, written in your voice. It works because it makes you visible to people who
              are not reading job boards. It also means we have access to your account and that your
              network sees you posting.
            </Body>
          </Stack>
        </Band>

        <Card>
          <Label as="p">What you are agreeing to</Label>
          <SpecList specs={SIGNAL_CONTROLS} />

          {/*
            Build scaffolding, not page copy. The two terms are verbatim from the
            deck; their values are blocked on the owner and delivery. Fold these
            rows into the list above and delete this block when they are answered.
          */}
          <div
            data-blocked="signal-layer-controls"
            className="flex flex-col gap-flow-m rounded border border-dashed border-muted p-card-m md:gap-flow md:p-card"
          >
            <Label as="p">Placeholder — not for publication</Label>
            <SpecList specs={SIGNAL_CONTROLS_BLOCKED} />
            <Caption>
              Two controls are unanswered: what the approval mechanism is and whether an employed
              client can decline the Signal Layer, and what a current employer can see. The terms
              are left standing rather than removed because publishing in a client&rsquo;s name is a
              material characteristic of the service, and a controls list that answers only the easy
              half is worse than none. This block must be answered before launch.
            </Caption>
          </div>
        </Card>
      </Stack>
    </Section>
  )
}
