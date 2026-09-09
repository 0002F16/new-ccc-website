import {
  Band,
  Caption,
  Display,
  Eyebrow,
  Label,
  Lede,
  OutcomeBadge,
  ProofWall,
  Reveal,
  Section,
  Stack,
  VideoEmbed,
} from '@/components/ui'
import { WALL } from './proof-shots'

/**
 * 7. Proof — Movement II. Three registers, one argument.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REBUILT 9 SEPTEMBER 2026 — Round 3. Owner's brief: make the testimonials work,
 * three-pronged — cases, videos, screenshots — and the priority is that it looks
 * like volume: a lot of people have got somewhere.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * What it was: nine YouTube tiles two-across, inside a dashed `data-blocked`
 * container whose badge read "Nine videos, none verified". The section that has
 * to say *this works for people* opened by saying it could not prove anything.
 * Round 2 was right that the debt is real and wrong about where to record it —
 * a build note does not belong in the reader's eyeline. The debt now lives here
 * and in CLAUDE.md's OPEN list, which is where the people who can close it look.
 *
 * ── The three registers, in reading order ───────────────────────────────────
 *
 * 1. SCREENSHOTS — the wall, at full bleed. Thirty-nine community posts across
 *    the viewport less the page gutter, two to five columns by breakpoint,
 *    12px channels. This is the volume device and it is now the section's
 *    opening image.
 *
 *    HISTORY, because this reverses a decision made an hour earlier. Round 3
 *    put three captures above the wall on `WorkProductPlate`s at ~990px — one
 *    per rung of the outcome ladder — on the argument that at wall scale a
 *    screenshot is texture and texture alone is decoration claiming to be
 *    evidence. The owner cut that tier on 9 September 2026: the collection
 *    alone, spanning the page.
 *
 *    The full-bleed width is what makes that workable rather than merely
 *    smaller. Inside `w-structure` a tile was 240px at every size above `lg`;
 *    at bleed it is 244px at 1280 and 371px at 1920, so tiles grow with the
 *    screen instead of multiplying. A post headline is legible on a wide
 *    display where it was not before. It is not a plate at 990px and the
 *    trade is real — recorded here and in `proof-shots.ts` rather than argued
 *    again. The three former specimens were not dropped; they are folded into
 *    the wall at positions 2, 14 and 27.
 *
 *    This is also why the section is `width="bleed"`: the wall gets the whole
 *    measure and registers 2 and 3 band themselves back to `structure`. The
 *    page's rhythm — prose narrows, structure widens — gains a third and widest
 *    tier, used exactly once.
 *
 * 2. VIDEOS. The same nine, now three-across at `lg` — a 3×3 block reads as
 *    "nine" at a glance where five rows of two read as a list. This reverses
 *    round 2's two-across rule, which was set on the grounds that a 16:9 embed
 *    at ~310px collapses the YouTube control bar. Three across inside
 *    `w-structure` is ~330px, above that threshold, and the tiles are facades
 *    until clicked, so nothing but a poster image is laid out at rest.
 *
 * 3. CASES. Six rows, not six `CaseCard`s. `CaseCard` makes "Work done"
 *    mandatory and specific and no work-done fact is recorded for any of
 *    P01–P06, which is exactly why its six instances were deleted on 9
 *    September. The ledger states what the results page publishes and stops.
 *
 * ── Gold budget ─────────────────────────────────────────────────────────────
 *
 * Zero `line-gold` elements. The eyebrow ships `hairline={false}`, the videos
 * use `control="quiet"` (nine gold discs would be nine accents), and no ledger
 * row takes the `start` rung because no job start is established for any of the
 * six. The section's only accent is the eyebrow, which every section has.
 *
 * The one gold element it used to carry — the `start` rung on the third
 * specimen, the only confirmed job start shown — went with the specimen tier.
 *
 * ── What is still open ──────────────────────────────────────────────────────
 *
 * Consent per person, service actually received (DFY or coaching), and absolute
 * dates — for all thirty-nine screenshots and all nine videos. Note that with
 * the specimen tier gone, no outcome on the wall is labelled by rung any more:
 * interviews, offers and job starts sit side by side at the same weight, and
 * only the posts' own words distinguish them. A community post
 * does not evidence done-for-you delivery, and consent to be filmed for the old
 * site is not consent to appear here. Shipping this material now was the
 * owner's decision, taken on 9 September 2026 with the position stated. The
 * curation that was applied regardless is documented in `proof-shots.ts`.
 *
 * For the six cases: P02's title conflicts across two published records
 * (Associate vs Senior Associate) and P06's does too (business development vs
 * data analyst), so neither row states a title. Four of the nine video
 * strap-lines carry employer names; the note under the block is what keeps them
 * from reading as partnerships.
 */

/** The nine testimonial videos already published on capitalcareerclub.com/en. */
type Video = { id: string; title: string; strap: string }

const VIDEOS: readonly Video[] = [
  {
    id: 'Gh50BMbTUoM',
    title: 'Laid Off to 4 Tier-1 Offers',
    strap: 'ING → US Bank, JP Morgan, Goldman Sachs',
  },
  {
    id: 'mFswtguDKJU',
    title: 'Interpreter to Nomagic',
    strap: 'Language specialist → field ops specialist',
  },
  {
    id: 'otKB4VQQVHU',
    title: 'Jobless Grad to Linklaters',
    strap: '0 interviews → data analyst @ magic circle',
  },
  {
    id: '6A-3quJBGS0',
    title: '2-Year Career Gap to Maersk',
    strap: 'Home-stay mum → financial tax analyst',
  },
  {
    id: 'rfgxaKpNE5k',
    title: 'Tier-1 Multi-Offers',
    strap: 'Fresh grad → JP Morgan, Goldman Sachs, Maersk',
  },
  {
    id: '0DM04UMIl2w',
    title: 'Pizza Delivery to DHL',
    strap: "Domino's rider → supply chain specialist",
  },
  {
    id: 'oeD4N7RjzFU',
    title: "McDonald's to Marketing",
    strap: 'Server → marketing specialist @ Chisage',
  },
  {
    id: 'sp43Jl-coFw',
    title: 'Kebab Shop to Citi Bank',
    strap: 'Service staff → asset servicing specialist',
  },
  {
    id: 'YIMMS-YTGjo',
    title: 'Fresh Graduate to US Bank',
    strap: 'University → fraud analyst @ US Bank',
  },
]

/**
 * The six public case candidates from the results page. Employer locator and
 * milestone only — the research pack records nothing else for any of them, and
 * inventing a "work done" line is the one thing the case anatomy forbids.
 */
type Case = { id: string; locator: string; stage: 'interview' | 'offer'; milestone: string }

const CASES: readonly Case[] = [
  { id: 'P01', locator: 'ING → US Bank · Portfolio risk management', stage: 'offer', milestone: 'Signed offer' },
  { id: 'P02', locator: 'Alcon · Data science', stage: 'offer', milestone: 'Signed offer' },
  { id: 'P03', locator: 'Oanda · Senior cash management', stage: 'interview', milestone: 'Interview' },
  { id: 'P04', locator: 'Smith & Nephew · Senior master data management', stage: 'interview', milestone: 'Interview' },
  { id: 'P05', locator: 'Cantor Fitzgerald · AVP', stage: 'interview', milestone: 'Interview' },
  { id: 'P06', locator: 'Linklaters', stage: 'offer', milestone: 'Signed offer' },
]

/**
 * Register label. The three prongs are one section, so they are separated by a
 * named rule rather than by a heading — a second and third `h2` here would claim
 * three arguments where there is one.
 */
function Register({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-tight border-b border-line pb-tight">
      <Label>{children}</Label>
    </div>
  )
}

export function Outcomes() {
  return (
    <Section id="outcomes" width="bleed">
      <Stack gap="block">
        <Reveal>
          <Band width="text" className="flex flex-col gap-tight text-center">
            <Eyebrow hairline={false}>What happened for other people</Eyebrow>
            <Display as="h2" size="h2">
              The results speak for themselves
            </Display>
            <div className="pt-flow-m md:pt-flow">
              <Lede>
                Posts from the client community, nine filmed conversations, and the cases published
                on our results page.
              </Lede>
            </div>
          </Band>
        </Reveal>

        {/* Register 1 — the wall, at the section's full bleed width. */}
        <Stack gap="flow">
          <Reveal>
            <Register>From the client community</Register>
          </Reveal>

          <Reveal delay={0.04}>
            <ProofWall shots={WALL} />
          </Reveal>
        </Stack>

        {/* Register 2 — the nine videos, 3×3, banded back to structure. */}
        <Band width="structure" className="flex flex-col gap-flow-m md:gap-flow">
          <Reveal>
            <Register>In their own words</Register>
          </Reveal>

          <Reveal delay={0.04}>
            <ul className="grid grid-cols-1 gap-flow-m sm:grid-cols-2 md:gap-flow lg:grid-cols-3">
              {VIDEOS.map((video) => (
                <li key={video.id} className="flex flex-col gap-tight">
                  <VideoEmbed id={video.id} title={video.title} control="quiet" />
                  <span className="text-s text-ink">{video.title}</span>
                  <span className="text-caption text-muted">{video.strap}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Band>

        {/* Register 3 — the published cases, banded back to structure. */}
        <Band width="structure" className="flex flex-col gap-flow-m md:gap-flow">
          <Reveal>
            <Register>Published cases</Register>
          </Reveal>

          <Reveal delay={0.04}>
            <ul className="grid grid-cols-1 md:grid-cols-2 md:gap-x-block">
              {CASES.map((entry) => (
                <li
                  key={entry.id}
                  className="flex flex-col gap-tight border-t border-line-soft py-flow-m md:py-flow"
                >
                  <span className="text-s text-ink">{entry.locator}</span>
                  <div className="flex">
                    <OutcomeBadge stage={entry.stage}>{entry.milestone}</OutcomeBadge>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <Band width="text">
              <Caption>
                Employer names locate a public example. They do not indicate a partnership.
              </Caption>
            </Band>
          </Reveal>
        </Band>
      </Stack>
    </Section>
  )
}
