import { Body, Display, Eyebrow, Label, Lede, Reveal, Section, Stack } from '@/components/ui'

/**
 * 4. Three bottlenecks — Movement II, the bridge.
 *
 * Rebuilt 9 September 2026 against the owner's note: *"make it more visual,
 * more relatable — like gagi this is me"*. Revision 1 was a correct ledger of
 * three named diagnoses in three ~53-word paragraphs. It was accurate and it
 * was inert: the reader had to finish a paragraph before recognising himself in
 * it, and the section's only visual event was a hairline.
 *
 * Two things changed, and they carry the section:
 *
 * 1. **Each row now opens in the reader's own voice** — one short first-person
 *    sentence, Instrument Serif at h3 size, before any diagnosis. Recognition
 *    happens on the first line instead of the fourth. The diagnosis follows in
 *    two lines, and the CCC-side name of the bottleneck (Volume / Reach / The
 *    interview) drops into the situation marker above, where a skimmer still
 *    gets the three-part structure without it competing with the sentence.
 * 2. **Each row carries an inline diagnostic** — 1.5px line drawings in `line`
 *    and `muted` with one `accent` mark each. They are `aria-hidden`; the text
 *    carries all meaning. They exist because this section's argument is about
 *    shape (a gap in a run, a position in a queue, an asymmetry across a table)
 *    and shape is the one thing prose is bad at.
 *
 * SERIF AT h3 — a deliberate, reported deviation. CLAUDE.md's type scale
 * assigns the serif to display-xl / display-l / h2 and gives h3 to Familjen
 * Grotesk 600. The reader's sentence is set in the serif at h3 (24px desktop /
 * 21px mobile, exactly at the serif's 21px floor, weight 400, never
 * synthesised) because it is the only editorial voice in the section and the
 * grotesk reads as operational label copy — which is precisely what the
 * sentence must not sound like. If this is rejected, the fix is one class.
 *
 * GOLD BUDGET — the eyebrow hairline is dropped (`hairline={false}`), so this
 * section renders **zero** `line-gold` elements. The three `accent` strokes in
 * the diagnostics are one repeated device under a single rule: *gold marks the
 * reader*. Weeks he did not send in; his row in the queue of three hundred; his
 * empty side of the interview table. Three instances of one indexical mark do
 * not compete for attention the way two unrelated golds would — they read as a
 * series, which is the effect the one-accent rule exists to protect. Nothing
 * else in the section is gold.
 *
 * Layout — the ledger survives, because it is the house pattern for peers with
 * unequal prose. Text left at `max-w-text`, diagnostic right in a fixed 260px
 * column, rows divided by a `line` hairline, nothing enclosed. Below 768px the
 * row stacks and the diagnostic sits under its own paragraph. Cards were
 * rejected again: the system forbids a section that is a heading plus three
 * feature cards, and enclosure would present three diagnoses as three products.
 *
 * NOT numbered. These are named diagnoses, not a sequence — the lede says so.
 * The count lives in the heading.
 *
 * Copy rewritten under the 9 September relaxation of BUILD-BRIEF rule 7. No new
 * facts: the weekly volume, the three-hundred-applicant queue and the first-ten-
 * minutes observation all come from copy deck § 4. The fit-call sentence was cut
 * from the lede as duplication — the fit call is described six times elsewhere.
 */

type Bottleneck = {
  id: string
  /** Situation marker, house pattern — CCC's name for the bottleneck leads it. */
  marker: string
  /** The reader's own sentence. First person, short, said before it is explained. */
  line: string
  body: string
  figure: React.ReactNode
}

/* Uniform 260×104 frame for all three diagnostics, so the right column aligns. */
const FRAME = '0 0 260 104'

/**
 * Volume — twelve weeks. Weeks sent in are solid, weeks skipped are hollow, and
 * the gold bracket marks the reader's longest gap. The strip is the sentence.
 */
function VolumeFigure() {
  const sent = new Set([0, 1, 2, 3, 6, 10])
  return (
    <svg viewBox={FRAME} aria-hidden focusable="false" className="h-auto w-full">
      {Array.from({ length: 12 }, (_, i) => {
        const x = 14 + i * 20
        return sent.has(i) ? (
          <rect key={i} x={x} y={24} width={12} height={44} className="fill-muted" />
        ) : (
          <rect
            key={i}
            x={x + 0.75}
            y={24.75}
            width={10.5}
            height={42.5}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            className="fill-transparent stroke-muted"
          />
        )
      })}
      <line
        x1={14}
        y1={78}
        x2={246}
        y2={78}
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
        className="stroke-line"
      />
      <path
        d="M154 86 V 94 H 206 V 86"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="fill-transparent stroke-accent"
      />
    </svg>
  )
}

/**
 * Reach — the queue. Sixteen hairline rows of an advertised posting's applicant
 * list; one is gold and sits a little proud of the stack. That row is the reader.
 */
function ReachFigure() {
  const rows = [196, 224, 168, 210, 182, 232, 160, 204, 188, 218, 226, 150, 174, 208, 190, 164]
  const you = 10
  return (
    <svg viewBox={FRAME} aria-hidden focusable="false" className="h-auto w-full">
      {rows.map((width, i) => {
        const y = 8 + i * 6
        const x = i === you ? 22 : 32
        return (
          <line
            key={i}
            x1={x}
            y1={y}
            x2={x + width}
            y2={y}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            className={i === you ? 'stroke-accent' : 'stroke-muted'}
          />
        )
      })}
    </svg>
  )
}

/**
 * The interview — two facing brackets. Theirs holds a stack of what they have
 * read about the candidate. The reader's is gold, and it is empty.
 */
function InterviewFigure() {
  const theirs = [86, 70, 90, 64, 78]
  return (
    <svg viewBox={FRAME} aria-hidden focusable="false" className="h-auto w-full">
      <path
        d="M42 16 H26 V88 H42"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="fill-transparent stroke-muted"
      />
      {theirs.map((width, i) => {
        const y = 26 + i * 14
        return (
          <line
            key={i}
            x1={58}
            y1={y}
            x2={58 + width}
            y2={y}
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
            className="stroke-muted"
          />
        )
      })}
      <path
        d="M218 16 H234 V88 H218"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="fill-transparent stroke-accent"
      />
    </svg>
  )
}

const BOTTLENECKS: readonly Bottleneck[] = [
  {
    id: 'bottleneck-volume',
    marker: 'Volume · Both situations',
    line: 'A week goes past and I’ve sent nothing.',
    body: 'Ten or more targeted applications a week, every week. The search does not fail on one application. It fails on the weeks that get skipped.',
    figure: <VolumeFigure />,
  },
  {
    id: 'bottleneck-reach',
    marker: 'Reach · Mostly stalled search',
    line: 'Every job I find, everyone else found too.',
    body: 'The roles you can see are the roles everyone can see. An advertised job with three hundred applicants is a queue, and applying harder does not change its shape.',
    figure: <ReachFigure />,
  },
  {
    id: 'bottleneck-interview',
    marker: 'The interview · Both situations',
    line: 'I get the interview, then I’m guessing.',
    body: 'Some people are getting interviews and losing them. Skimming the company page that morning is not preparation, and it shows in the first ten minutes.',
    figure: <InterviewFigure />,
  },
] as const

export function ThreeBottlenecks() {
  return (
    <Section id="bottlenecks" width="structure">
      <Stack gap="block">
        {/* Composed by hand rather than via SectionHeader: the eyebrow hairline
            is dropped so the diagnostics own the section's gold. */}
        <div className="mx-auto flex w-full max-w-text flex-col gap-tight text-center">
          <Eyebrow hairline={false}>Why the effort is not converting</Eyebrow>
          <Display as="h2" size="h2">
            Most stalled searches are stuck on one of three things
          </Display>
          <div className="pt-flow-m md:pt-flow">
            <Lede>Not all three, and not the same one for everyone.</Lede>
          </div>
        </div>

        <ul className="flex list-none flex-col gap-block-m md:gap-block">
          {BOTTLENECKS.map((bottleneck, index) => (
            <li key={bottleneck.id} className="border-t border-line pt-block-m md:pt-block">
              <Reveal delay={index * 0.06}>
                <div className="grid grid-cols-1 items-center gap-flow-m md:grid-cols-[1fr_260px] md:gap-block">
                  <div className="flex flex-col gap-flow-m md:gap-flow">
                    <div className="flex flex-col gap-tight">
                      <Label>{bottleneck.marker}</Label>
                      <h3 className="font-serif text-h3-m font-normal text-ink [text-wrap:balance] md:text-h3">
                        {bottleneck.line}
                      </h3>
                    </div>
                    <Body className="max-w-text">{bottleneck.body}</Body>
                  </div>
                  <div className="w-full max-w-[260px]">{bottleneck.figure}</div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Stack>
    </Section>
  )
}
