import { Display, Eyebrow, Label, Lede, Reveal, Section, Stack } from '@/components/ui'

/**
 * 4. Three bottlenecks — Movement II, the bridge.
 *
 * ─── Round 3, 9 September 2026 ──────────────────────────────────────────────
 *
 * Owner's note: the section was *"so shitty"*, took too much vertical space, and
 * did not carry enough weight for the reader it is written for. Round 2 was a
 * correct argument in the wrong shape — three stacked full-width ledger rows,
 * each 56px apart with a `border-t` and a 260px drawing on the right, under a
 * centred header that hedged three times before saying anything. 1,135px of
 * desktop height for what is, in substance, three short sentences.
 *
 * Two changes, and they are both about arrangement rather than argument:
 *
 * 1. **The three rows become one three-column band.** Columns are divided by
 *    vertical `line` hairlines and nothing else — no fill, no radius, no
 *    enclosure — the pattern already proven in `SituationsSpread` in § 2. This
 *    is not the forbidden "heading plus three feature cards": nothing here is a
 *    card, and enclosure would present three diagnoses as three products.
 * 2. **The diagnostics become one instrument panel.** All three share the same
 *    260×104 frame, so at equal column widths they align exactly across a single
 *    horizontal band and read as a series rather than three separate ornaments.
 *    Side by side, the "gold marks the reader" device below gets stronger, not
 *    weaker: three instances of one indexical mark are visibly one device.
 *
 * The header stays centred — the house rhythm every other section uses — and is
 * compressed: the h2 loses six words, the lede keeps the qualifier that stops the
 * section over-claiming. Boldness is bought with type and composition, not with a
 * stronger claim, which is what the system asks for: an accurate, modest claim
 * should look better than an inflated one.
 *
 * SERIF AT h3 — a deliberate, reported deviation, carried over from round 2.
 * CLAUDE.md's type scale assigns the serif to display-xl / display-l / h2 and
 * gives h3 to Familjen Grotesk 600. The reader's sentence is set in the serif at
 * h3 (24px desktop / 21px mobile, exactly at the serif's 21px floor, weight 400,
 * never synthesised) because it is the only editorial voice in the section and
 * the grotesk reads as operational label copy — which is precisely what the
 * sentence must not sound like. If this is rejected, the fix is one class.
 *
 * GOLD BUDGET — unchanged and still zero. The eyebrow hairline is dropped
 * (`hairline={false}`), so this section renders no `line-gold` element at all.
 * The three `accent` strokes in the diagnostics are one repeated device under a
 * single rule: *gold marks the reader*. Weeks he did not send in; his row in the
 * queue of three hundred; his empty side of the interview table. Nothing else in
 * the section is gold.
 *
 * NOT numbered. These are named diagnoses, not a sequence — the lede says so.
 * The count lives in the heading.
 *
 * COPY. Tightened, not rewritten, under the 9 September relaxation of
 * BUILD-BRIEF rule 7: prose may be shortened, facts may not be invented. Every
 * fact below was already in the round-2 strings and in copy deck § 4 — the weekly
 * volume, the three-hundred-applicant queue, the first-ten-minutes observation.
 * The diagnoses drop from 25–31 words to 18–19 so three of them sit level in a
 * ~315px column, and they are set at `text-s`, the system's card prose size.
 *
 * One deliberate cut: the situation qualifier that used to trail each marker
 * (`· Both situations`, `· Mostly stalled search`). At 11px with .22em tracking
 * it wraps to two lines in a column this wide and pushes the whole band down, and
 * its only job — tying back to § 2 — is done by the lede and by § 2 sitting
 * directly above this one.
 */

type Bottleneck = {
  id: string
  /** CCC's name for the bottleneck. Structure marker, not a claim. */
  marker: string
  /** The reader's own sentence. First person, short, said before it is explained. */
  line: string
  body: string
  figure: React.ReactNode
}

/* Uniform 260×104 frame for all three diagnostics, so the band aligns exactly. */
const FRAME = '0 0 260 104'

/*
 * Stacked on mobile, a full-width drawing stands 143px tall over a 21px
 * sentence and outweighs the thing it is illustrating. Two thirds is the
 * proportion where the drawing still reads and the sentence still leads.
 */
const FIGURE = 'h-auto w-2/3 md:w-full'

/**
 * Volume — twelve weeks. Weeks sent in are solid, weeks skipped are hollow, and
 * the gold bracket marks the reader's longest gap. The strip is the sentence.
 */
function VolumeFigure() {
  const sent = new Set([0, 1, 2, 3, 6, 10])
  return (
    <svg viewBox={FRAME} aria-hidden focusable="false" className={FIGURE}>
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
 * list; one is gold and sits proud of the stack. That row is the reader.
 *
 * The reader's row is set apart three ways — colour, a 22px left protrusion, and
 * 4px of clear air above and below it — because at the column's real width one
 * gold hairline among fifteen muted ones of varying length is not findable, and a
 * mark nobody finds is not a mark.
 */
function ReachFigure() {
  const rows = [196, 224, 168, 210, 182, 232, 160, 204, 188, 218, 226, 150, 174, 208, 190, 164]
  const you = 10
  return (
    <svg viewBox={FRAME} aria-hidden focusable="false" className={FIGURE}>
      {rows.map((width, i) => {
        const y = 8 + i * 6 + (i < you ? 0 : 4) + (i > you ? 4 : 0)
        const x = i === you ? 10 : 32
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
    <svg viewBox={FRAME} aria-hidden focusable="false" className={FIGURE}>
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
    marker: 'Volume',
    line: 'A week goes past and I’ve sent nothing.',
    body: 'Ten or more targeted applications a week, every week. The search fails on the weeks that get skipped.',
    figure: <VolumeFigure />,
  },
  {
    id: 'bottleneck-reach',
    marker: 'Reach',
    line: 'Every job I find, everyone else found too.',
    body: 'The roles you can see, everyone can see. An advertised job with three hundred applicants is a queue.',
    figure: <ReachFigure />,
  },
  {
    id: 'bottleneck-interview',
    marker: 'The interview',
    line: 'I get the interview, then I’m guessing.',
    body: 'Some people get interviews and lose them. A company page skimmed that morning is not preparation, and it shows.',
    figure: <InterviewFigure />,
  },
] as const

/**
 * Column rules. The hairline lives on the grid item so it runs the full height of
 * the tallest column, and every column carries the same 24px of `flow` padding on
 * both sides — so the three drawings are identical in width and their baselines
 * land on one line. The `-mx-flow` on the list cancels the section's own 24px
 * gutter exactly (both tokens are 24px at md and above), which puts the outer
 * columns' content back on the 1040px structural edge and can never overflow.
 *
 * The columns are `grid-rows-subgrid` rather than three independent flex stacks,
 * because one of the three sentences wraps to a second line and the others do
 * not. Without the shared row track the diagnoses below them would each start at
 * a different height. Subgrid aligns them with no margin on any sibling.
 */
const COLUMN = [
  'md:px-flow',
  'md:border-l md:border-line md:px-flow',
  'md:border-l md:border-line md:px-flow',
] as const

export function ThreeBottlenecks() {
  return (
    <Section id="bottlenecks" width="structure">
      <Stack gap="block">
        {/* Composed by hand rather than via SectionHeader: the eyebrow hairline
            is dropped so the diagnostics own the section's gold. */}
        <Reveal>
          <div className="mx-auto flex w-full max-w-text flex-col gap-tight text-center">
            <Eyebrow hairline={false}>Why the effort is not converting</Eyebrow>
            <Display as="h2" size="h2">
              Most searches stall on one of these three
            </Display>
            <div className="pt-flow-m md:pt-flow">
              <Lede>Not all three, and not the same one for everyone.</Lede>
            </div>
          </div>
        </Reveal>

        <ul className="grid list-none grid-cols-1 gap-flow-m md:-mx-flow md:grid-cols-3 md:grid-rows-[auto_auto_1fr] md:gap-x-0 md:gap-y-flow">
          {BOTTLENECKS.map((bottleneck, index) => (
            <Reveal
              as="li"
              key={bottleneck.id}
              delay={index * 0.04}
              className={[
                'flex flex-col gap-flow-m md:grid md:grid-rows-subgrid md:row-span-3',
                index > 0 && 'border-t border-line pt-flow-m md:border-t-0 md:pt-0',
                COLUMN[index],
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {bottleneck.figure}
              <div className="flex flex-col gap-tight">
                <Label>{bottleneck.marker}</Label>
                <h3 className="font-serif text-h3-m font-normal text-ink [text-wrap:balance] md:text-h3">
                  {bottleneck.line}
                </h3>
              </div>
              <p className="text-s text-body [text-wrap:pretty]">{bottleneck.body}</p>
            </Reveal>
          ))}
        </ul>
      </Stack>
    </Section>
  )
}
