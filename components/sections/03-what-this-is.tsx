import {
  Band,
  Body,
  Caption,
  Card,
  H3,
  Label,
  Op,
  OutcomeBadge,
  Reveal,
  Section,
  SectionHeader,
  SpecList,
  Stack,
  type Spec,
} from '@/components/ui'

/**
 * 3. What this is, who it is for, and how we decide — Movement I.
 *
 * Four jobs, kept visibly distinct by width and enclosure:
 *   (a) DFY defined in plain language, as centred prose at w-text;
 *   (b) the reader's own fit checklist, as two enclosed spec-pair cards at
 *       w-structure — fits / does not fit, stated neutrally;
 *   (c) one line sending the two readers this is wrong for to the free
 *       resources, absorbed from the cut § 5 comparison;
 *   (d) the fit call — what it is and how it ends — as a single card closing
 *       the section, with the admissions blockers beneath it.
 *
 * The one gold element in this section is the eyebrow hairline. The free
 * resources link takes `accent` text, which is the token's stated use ("CTAs,
 * links"); nothing here takes `line-gold`.
 *
 * `id="what-this-is"` and `id="fit-criteria"` are both load-bearing: the hero
 * chips point at them. Do not rename either.
 *
 * ─── Round 2, 9 September 2026 ──────────────────────────────────────────────
 *
 * Copy rewritten for length under the owner's instruction. The DFY definition
 * was 62 words and is now 33; the section's own copy went from 256 words to
 * roughly 170, and it now also carries content folded in from two cut sections.
 *
 * Deduplicated on the way through, because the audit found each of these stated
 * in four or more places:
 *   - "You approve the direction, we run everything in between" is cut. § 14
 *     division of labour owns it.
 *   - The fit criteria no longer repeat "right to work" in both cards; the visa
 *     row owns it, and the location row is now just location.
 *   - "Our free resources are a better use of your time" is cut from the
 *     early-career row, because the line below the cards now says it once, with
 *     a link, for both of the readers it applies to.
 *   - This section owns the canonical description of the fit call. Other
 *     sections referring to it must not restate what it covers.
 *
 * ─── Folded in from § 18 admissions, which is cut ───────────────────────────
 *
 * § 18 existed to say one thing: the fit call ends in a no more often than a
 * yes. That claim could not simply be dropped — the hero's CTA note already
 * says "We turn down more applicants than we accept", so the page has to make
 * good on it somewhere. It is now the second paragraph of the fit-call card,
 * which is the right home for it: § 18 was an argument about the outcome of the
 * fit call, and the fit call is described here.
 *
 * The distinction § 18 was built to protect still holds. The checklist above is
 * the READER's own — location, experience, participation, budget, things they
 * can check about themselves. The fit-call paragraph is CCC's judgement about
 * them. Different objects, and they stay in different blocks; the fit-call card
 * does not restate a single row of the checklist.
 *
 * § 18's two blocked slots come across intact, with their `data-blocked` values
 * unchanged, so a `grep -rn data-blocked components/sections` loses nothing:
 *   - `closing-sentence-version-unchosen`
 *   - `written-admissions-standard-not-published`
 * Their long explanations moved into this comment, per Round 2's cap of fifteen
 * words on any build-scaffolding caption.
 *
 * ─── Why the closing sentence still does not ship ───────────────────────────
 *
 * The copy deck offers two versions of the sentence that closes the admissions
 * argument and marks NEITHER as the default. Its own note leans toward Version
 * A ("your approved wording and it is the stronger sentence") and in the same
 * breath records why it cannot simply be taken: A "is also the most
 * placement-asserting line available, which puts it in tension with the
 * decision to drop employer-side claims from this page while OQ-01 is open."
 *
 * That tension is not a matter of taste. CLAUDE.md's page-blocking KRAZ item
 * instructs: "until answered, draft on the execution framing, not the
 * representation framing. ... 'we place you' ... stay out of the draft."
 * Version A is placement framing; Version B is execution framing. So A is
 * barred from the draft by an open regulatory question, and B has never been
 * chosen by the owner. Picking B on that reasoning alone would be choosing the
 * copy silently, which is not this file's call to make. The choice is therefore
 * the blocked thing, and it ships as a blocked slot rather than as a sentence.
 *
 * ─── How the two clauses are bound ──────────────────────────────────────────
 *
 * CLAUDE.md, 8 September: "we expect to place you" is approved copy only in
 * body copy, only in the admissions material, only bound to "we decline the
 * majority of applicants" IN A SINGLE SENTENCE, never as a number, and never in
 * ad creative, headline fields, meta descriptions, social cards or OG images.
 * The IA spec gives the reason: "Adjacency of separate blocks does not survive
 * an ad crop."
 *
 * The mechanism, carried over from § 18 unchanged: each candidate sentence is
 * ONE string, rendered by ONE `<p>` whose only child is that string — no
 * `<span>`, no `<Gold>`, no `<Op>`, no `<Em>`, no `<br>`, no nested element of
 * any kind. There is consequently no element boundary at the clause junction,
 * so there is nothing for a stylesheet, a script, a print stylesheet or a
 * future edit to hide, float, reorder or break at. Splitting the clauses would
 * require rewriting the string.
 *
 * The paragraph is kept in ordinary block flow inside a `flex-col` stack at
 * `max-w-text`: no CSS `columns`, no grid or flex on the paragraph itself, no
 * fixed or maximum height, no `overflow`, no `line-clamp`, no truncation, no
 * `position: sticky` or `fixed`, and no transform. So the sentence cannot be
 * dealt across two columns, cannot be split by a scroll container, and cannot
 * be clipped at a viewport boundary with one clause left showing.
 *
 * Note also that the live copy in this file never uses the approved phrase at
 * all: the fit-call paragraph says "we decline more applicants than we accept"
 * and stops there. The phrase exists in this file only inside the blocked slot,
 * inside a bound sentence. When the owner picks a version, delete that slot and
 * move the chosen string into the fit-call card as one `<p>` with one string
 * child — not as a fragment assembled from parts.
 *
 * ─── Also folded in: one line from § 5, which is cut ────────────────────────
 *
 * § 5 compared three routes and ended by sending two of the three readers away.
 * That honesty is worth more than the comparison table was, so the closing line
 * survives here, under the checklist, and it now links to `#free-resources` —
 * the anchor § 22 established for exactly this. § 5 could not link, because the
 * id did not exist when it was written.
 */

const FITS: Spec[] = [
  { term: 'Location', value: 'You live in Poland' },
  { term: 'Experience', value: 'Three or more years of professional experience' },
  // TARGET row omitted — [BLOCKED: supported role families, languages and
  // permitted pivots — owner. "3+ years" is a threshold, not a fit definition.]
  { term: 'Participation', value: 'Reply within a day, attend interviews prepared' },
  { term: 'Budget', value: '6,000 PLN at signature, instalments after you start' },
]

const DOES_NOT_FIT: Spec[] = [
  { term: 'Early career', value: 'Under three years of experience' },
  {
    term: 'Visa and permits',
    value: (
      <>
        <Op>We do not provide immigration, visa or work-permit services.</Op> You need the right to
        work here already
      </>
    ),
  },
  { term: 'Delegation', value: 'You want advice and will run the search yourself' },
]

/**
 * The two candidate closing sentences, verbatim from the deck, in the deck's
 * order. Held as data, rendered only inside the blocked slot, and deleted from
 * this file entirely once the owner picks one and the picked one becomes live
 * body copy in the fit-call card above. See the binding note in the header
 * comment before touching either string.
 */
const CLOSING_SENTENCE_VERSIONS: readonly { id: string; version: string; note: string }[] = [
  {
    id: 'version-a',
    version: 'Version A',
    note: 'Owner-approved, and placement framing, which the open KRAZ question keeps out of the draft.',
  },
  {
    id: 'version-b',
    version: 'Version B',
    note: 'Execution framing, which the KRAZ question requires. Never chosen by the owner.',
  },
] as const

/** Kept beside the metadata above so the strings themselves stay untouched. */
const CLOSING_SENTENCE_TEXT: Record<string, string> = {
  'version-a':
    'We decline the majority of applicants, and we accept the people we expect to place.',
  'version-b':
    'We decline the majority of applicants, and we accept the people whose search we expect to work.',
}

export function WhatThisIs() {
  return (
    <Section id="what-this-is">
      <Reveal>
        <Stack gap="block">
          <SectionHeader
            eyebrow="Before you read any further"
            heading="This is a paid service, and it is not for everyone"
          />

          {/* (a) DFY, defined on first use. Prose narrows to 720px. */}
          <Band width="text">
            <Stack>
              <Body>
                Done for you means we do the work, not teach you to do it. We rebuild your CV and
                LinkedIn, send the applications, contact people every week, and brief you before
                every interview.
              </Body>
              <Body>
                Not coaching, not a course, not a CV rewrite. There is a fee before it starts.
              </Body>
            </Stack>
          </Band>

          {/* (b) The reader's own checklist. Structure widens to 1040px. */}
          <ul className="grid list-none grid-cols-1 gap-flow-m md:grid-cols-2 md:gap-flow">
            <Card as="li" className="scroll-mt-block" id="fit-criteria">
              <H3>Who it fits</H3>
              <SpecList specs={FITS} />
            </Card>
            <Card as="li">
              <H3>Who it does not fit</H3>
              <SpecList specs={DOES_NOT_FIT} />
            </Card>
          </ul>

          {/* (c) Absorbed from the cut § 5. The two free routes, named as real. */}
          <Band width="text">
            <Body>
              Doing it yourself or buying advice are legitimate routes. If advice was never the
              missing piece, the{' '}
              <a
                href="#free-resources"
                className="text-accent underline underline-offset-4 transition-colors duration-ui ease-ui hover:text-accent-hover"
              >
                free resources
              </a>{' '}
              are the better answer.
            </Body>
          </Band>

          {/* (d) The fit call, and how it ends. Folded in from the cut § 18. */}
          <Card>
            <H3>The fit call</H3>
            <Body className="max-w-text">
              Thirty minutes on your background, your target and where the search has got to,
              assessed against a written standard. It is an assessment, not a sales call.
            </Body>
            <Body className="max-w-text">
              It ends in a yes or a no, and we decline more applicants than we accept. It is not a
              judgement about how good you are at your job, but about whether the search we would
              run is one we think works.
            </Body>
          </Card>

          {/*
            Build scaffolding, not page copy. Delete this whole block when the
            owner picks a version; the picked sentence then joins the fit-call
            card above as live body copy, as one `<p>` with one string child,
            per the binding note in the header comment.
          */}
          <Band width="text">
            <div
              data-blocked="closing-sentence-version-unchosen"
              className="flex flex-col gap-flow-m rounded border border-dashed border-muted p-card-m md:gap-flow md:p-card"
            >
              <div className="flex">
                <OutcomeBadge stage="unverified">Decision owed</OutcomeBadge>
              </div>

              <Caption>Two closing sentences, neither chosen. Nothing closes this yet.</Caption>

              <dl className="flex flex-col gap-flow-m md:gap-flow">
                {CLOSING_SENTENCE_VERSIONS.map((item) => (
                  <div key={item.id} className="flex flex-col gap-tight">
                    <Label as="dt">{item.version}</Label>
                    <dd className="flex flex-col gap-tight">
                      {/*
                        One <p>, one string, no child elements. The clause
                        junction has no element boundary to break at.
                      */}
                      <p className="text-s text-muted">{CLOSING_SENTENCE_TEXT[item.id]}</p>
                      <Caption>{item.note}</Caption>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Band>

          {/*
            Deck § 18, "What we screen against": [BLOCKED: the written admissions
            standard — owner.] The criteria are what make the selectivity
            credible. The reader-facing checklist above is a different object and
            is not borrowed here to fill the gap.
          */}
          <Band width="text">
            <div
              data-blocked="written-admissions-standard-not-published"
              className="flex flex-col items-start gap-tight rounded border border-dashed border-muted p-card-m md:p-card"
            >
              <OutcomeBadge stage="unverified">Criteria missing</OutcomeBadge>
              <Caption>
                The written standard the fit call assesses against has not been supplied.
              </Caption>
            </div>
          </Band>
        </Stack>
      </Reveal>
    </Section>
  )
}
