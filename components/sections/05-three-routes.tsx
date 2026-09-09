import {
  Band,
  Body,
  Card,
  H3,
  Section,
  SectionHeader,
  SpecList,
  Stack,
  type Spec,
} from '@/components/ui'

/**
 * 5. Do it yourself, buy advice, or have a team run it — Movement II.
 *
 * The design problem: a three-way comparison whose third option is the seller's
 * own is the standard shape of pricing theatre. Three treatments were considered.
 *
 *   (A) A literal comparison table — criteria down the side, the three routes
 *       across the top. Rejected on two counts. The system defines no table
 *       component, and a table invites cell-by-cell scoring, which is one step
 *       from ticks and crosses; and a scorecard read left to right always
 *       resolves in favour of whichever column the author controls.
 *   (B) Three cards side by side, each carrying the same five spec pairs.
 *       Rejected on measurement, not principle: at w-structure a three-up grid
 *       leaves each card roughly 274px of content, and the spec-pair term column
 *       is sized by "DOES NOT WORK WHEN" — around 200px at the label token's
 *       11px and .22em tracking. The value column collapses to nothing.
 *   (C) Chosen. Three full-width peer blocks stacked at w-structure, identical
 *       anatomy, identical geometry, in the copy deck's own order. Each route is
 *       read as a whole description rather than as a row of cells scored against
 *       its neighbours, and the spec-pair term column has the width it needs.
 *
 * How the comparison is kept honest:
 *
 *   - Identical enclosure. Three `Card`s, same border, same padding, same
 *     shadow. Nothing distinguishes the third.
 *   - Identical anatomy. The same five terms in the same fixed order in all
 *     three, including DOES NOT WORK WHEN, which is stated about CCC as plainly
 *     as it is about the other two.
 *   - No `Op`. The operative-phrase treatment is deliberately unused in this
 *     section: putting "Us" in `ink` while the other two say "You" in `body`
 *     would weight the comparison typographically. All three read at one value.
 *   - No badge, no ranking numeral, no recommendation marker. Which route is
 *     the seller's is disclosed by the WHO DOES THE WORK value and by the
 *     heading, not by styling.
 *
 * Gold budget — one `line-gold` element, spent on the eyebrow hairline.
 * Gold-edging the third card is exactly the highlighted-plan move the system
 * forbids, and it would contradict the copy, which sends two of the three
 * readers away. The hairline is also what the neighbouring sections spend it on,
 * so the section reads as a peer of theirs rather than as an offer block.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 5. Route names
 * are the deck's own section title, in sentence case per the type rules; the
 * deck's table headers are uppercase only because they are table headers.
 *
 * Assumption recorded: the closing line's "free resources at the bottom of this
 * page" is set as plain prose, not as a link. The resources section (deck § 22)
 * is another agent's file and has no agreed anchor id yet. The IA asks for the
 * first two routes to be routed there; that is a one-line change once the id
 * exists.
 */

type Route = {
  id: string
  name: string
  specs: Spec[]
}

/** The five terms, in one fixed order, in all three blocks. */
const ROUTES: readonly [Route, Route, Route] = [
  {
    id: 'route-yourself',
    name: 'Do it yourself',
    specs: [
      { term: 'Who does the work', value: 'You' },
      { term: 'Your time per week', value: '8 to 15 hours to do it properly' },
      { term: 'Costs', value: 'Your time' },
      { term: 'Works when', value: 'You have time and the search is close to working' },
      { term: 'Does not work when', value: 'The weeks keep getting skipped' },
    ],
  },
  {
    id: 'route-advice',
    name: 'Buy advice',
    specs: [
      { term: 'Who does the work', value: 'You' },
      { term: 'Your time per week', value: '2 to 4 hours, plus the session' },
      { term: 'Costs', value: 'A few hundred to a few thousand PLN' },
      { term: 'Works when', value: 'You know what to do and are not doing it' },
      { term: 'Does not work when', value: 'The advice was never the missing piece' },
    ],
  },
  {
    id: 'route-team',
    name: 'Have a team run it',
    specs: [
      { term: 'Who does the work', value: 'Us' },
      { term: 'Your time per week', value: 'Roughly one hour, plus interviews' },
      { term: 'Costs', value: '6,000 PLN, then instalments' },
      {
        term: 'Works when',
        value: 'You are short of hours or short of reach, not short of ability',
      },
      { term: 'Does not work when', value: 'You want to keep control of every outgoing message' },
    ],
  },
] as const

export function ThreeRoutes() {
  return (
    <Section id="routes">
      <Stack gap="block">
        <SectionHeader
          eyebrow="The honest comparison"
          heading="Three ways forward, and this is only one of them"
        />

        {/* Structure at 1040px. Three peers, identical in every respect. */}
        <ul className="grid list-none grid-cols-1 gap-flow-m md:gap-flow">
          {ROUTES.map((route) => (
            <Card as="li" key={route.id}>
              <H3>{route.name}</H3>
              <SpecList specs={route.specs} />
            </Card>
          ))}
        </ul>

        {/* Prose narrows to 720px. The section ends by sending two readers away. */}
        <Band width="text">
          <Body>
            Two of these three cost you nothing. If either is the right answer for you, our free
            resources are at the bottom of this page and you should use them.
          </Body>
        </Band>
      </Stack>
    </Section>
  )
}
