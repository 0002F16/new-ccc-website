import {
  Band,
  CtaBlock,
  Display,
  Eyebrow,
  LogoCarousel,
  ProofWall,
  Reveal,
  Section,
  Stack,
  VideoEmbed,
} from '@/components/ui'
import type { OutcomesOrder } from '@/lib/analytics/types'
import { WALL } from './proof-shots'

/**
 * 7. Proof — Movement II. Two evidence forms, one argument.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REBUILT 9 SEPTEMBER 2026 — Round 3. The original brief was three-pronged:
 * cases, videos and screenshots. The published-case ledger was removed on the
 * owner's instruction on 10 September; screenshots and videos now carry proof.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * What it was: nine YouTube tiles two-across, inside a dashed `data-blocked`
 * container whose badge read "Nine videos, none verified". The section that has
 * to say *this works for people* opened by saying it could not prove anything.
 * Round 2 was right that the debt is real and wrong about where to record it —
 * a build note does not belong in the reader's eyeline. The debt now lives here
 * and in CLAUDE.md's OPEN list, which is where the people who can close it look.
 *
 * ── The two evidence forms, in reading order ────────────────────────────────
 *
 * 1. SCREENSHOTS — the wall, at full bleed. Thirty-nine community posts across
 *    the viewport less the page gutter, one to three columns by breakpoint,
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
 *    Full-bleed width plus the revised one/two/three-column anatomy makes each
 *    tile materially readable at every breakpoint. Every plate also opens the
 *    unaltered source at its intrinsic size in the proof viewer. The three
 *    former specimens remain folded into the wall at positions 2, 14 and 27.
 *
 *    This is also why the section is `width="bleed"`: the wall gets the whole
 *    measure and registers 2 and 3 band themselves back to `structure`. The
 *    page's rhythm — prose narrows, structure widens — gains a third and widest
 *    tier, used exactly once.
 *
 * 2. VIDEOS. A featured pair two-across at `lg` (one film at the full band
 *    width until 12 October 2026), then the same nine three-across at `lg` — a 3×3 block reads as "nine" at a glance where five
 *    rows of two read as a list. That reverses round 2's two-across rule, which
 *    was set on the grounds that a 16:9 embed at ~310px collapses the YouTube
 *    control bar. Three across inside `w-structure` is ~330px, above that
 *    threshold, and the tiles are facades until clicked, so nothing but a poster
 *    image is laid out at rest.
 *
 *    The featured pair take `poster="max"`: at ~510px each the 480×360
 *    `hqdefault` the tiles use would be upscaled and letterboxed. See `FEATURED`
 *    below for why their titles are not their YouTube titles and why both
 *    controls are quiet.
 *
 * ── Gold budget ─────────────────────────────────────────────────────────────
 *
 * Zero `line-gold` elements. The eyebrow ships `hairline={false}`, every video
 * uses `control="quiet"` (eleven gold discs would be eleven accents). The section's
 * only accent is the eyebrow, which every section has, plus the primary button
 * at the foot (exempt under the 9 September amendment). It closes the section
 * whichever order the experiment serves, so a visitor who has just watched a
 * story can act on it without scrolling past the FAQ.
 *
 * Before the three proof registers, a restrained employer rail locates the
 * market the reader is navigating. Its accessible name identifies it as a set
 * of multinational employers in Poland. Its placement makes it market context,
 * not a fourth proof register.
 *
 * The one gold element it used to carry — the `start` rung on the third
 * specimen, the only confirmed job start shown — went with the specimen tier.
 *
 * ── What is still open ──────────────────────────────────────────────────────
 *
 * Consent per person, service actually received (DFY or coaching), and absolute
 * dates — for all thirty-nine screenshots and all eleven videos, the featured
 * pair included. Note that with
 * the specimen tier gone, no outcome on the wall is labelled by rung any more:
 * interviews, offers and job starts sit side by side at the same weight, and
 * only the posts' own words distinguish them. A community post
 * does not evidence done-for-you delivery, and consent to be filmed for the old
 * site is not consent to appear here. Shipping this material now was the
 * owner's decision, taken on 9 September 2026 with the position stated. The
 * curation that was applied regardless is documented in `proof-shots.ts`.
 *
 * Four of the nine video strap-lines carry employer names. They locate the
 * conversation and do not assert a relationship with the employer.
 */

/** A filmed case. The featured pair shows no caption; see `FEATURED`. */
type Video = { id: string; title: string; strap?: string; start?: number }

/**
 * The featured pair. The first film was added 10 September 2026 on the owner's
 * instruction, one video ahead of the nine and much larger; the second joined it
 * on 12 October 2026, also on the owner's instruction. The two are stacked at
 * the full band width, the first above the second.
 *
 * They earn the position: they are the only long-form pieces on the page, the
 * founder is in both, and both subjects are internationals already working in
 * Poland who moved to a better role, which is the ICP the strategy brief
 * describes and which seven of the nine below are not.
 *
 * TITLES ARE NOT THE YOUTUBE TITLES, and this is a claim-rule decision rather
 * than an editorial one. They are not shown on the page (see below) but still
 * name the play button and the iframe for assistive technology. The first is published as "Why Good Expats Make Bad
 * Money in Poland (And How She Tripled Her Pay in 30 Days"; the second as "How
 * to Get a Job in Poland That Pays 120k+ PLN a Year". Both carry salary claims
 * and the first a thirty-day timeline, all on the non-negotiable list. What is
 * used instead is the first clause of each real title, verbatim, which carries
 * no claim. The videos are linked as they are; the page does not repeat what the
 * page may not say.
 *
 * THUMBNAILS. The first was checked and is clean: two people, two employer
 * marks, "your job search done for you". The second is not: it reads "I LEFT.
 * THEN MY SALARY DOUBLED.", a salary-increase claim. The owner chose to show it
 * unaltered on 12 October 2026; recorded under Accepted risk in CLAUDE.md.
 *
 * Both take the 64px gold `accent` control. Stacked at ~585px tall each, there
 * is one per screenful, which is what the component permits; side by side they
 * would have been two accents on one screen.
 *
 * NO CAPTIONS UNDER THE PAIR: no title, strap or runtime, removed 12 October
 * 2026 at the owner's request. The thumbnails already show the people and the
 * move, and "1 h 36 min" told a skimmer the cost of pressing play before the
 * poster had sold it. This departs from the Video frame rule that a caption
 * states the runtime, and from `VideoEmbed`'s note that the title sits beside
 * it as live text; the button's `aria-label` still carries the title.
 *
 * The first starts at 18:40, the chapter "The Done-For-You pivot: why she
 * handed us her job search", on the owner's call of 12 October 2026. A stranger
 * lands on the minute the service is described, not on her backstory. The
 * owner's original link carried `t=1023s` (17:03), the lead-in to the same
 * moment. The second starts at 0:00: its opening chapter is a cold-open highlight.
 */
const FEATURED: readonly Video[] = [
  {
    id: '8NZYSVMTdF4',
    title: 'Why good expats make bad money in Poland',
    start: 1120,
  },
  {
    id: 'LqP9vXsiJz8',
    title: 'How to get a job in Poland',
  },
]

/** The nine testimonial videos already published on capitalcareerclub.com/en. */

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
 * `order` is the `outcomes-videos-first-v1` experiment (17 September 2026).
 * `wall-first` is the page as it stood; `videos-first` swaps the two registers
 * and nothing else. The lede follows the order so it never describes the page
 * backwards.
 */
export function Outcomes({ order = 'wall-first' }: { order?: OutcomesOrder }) {
  const wall = (
    <Stack gap="flow">
      <Reveal delay={0.04}>
        <ProofWall shots={WALL} />
      </Reveal>
    </Stack>
  )

  const videos = (
    <Band width="structure" className="flex flex-col gap-block-m md:gap-block">
      <Reveal delay={0.04}>
        <ul className="flex flex-col gap-flow-m md:gap-flow">
          {FEATURED.map((video) => (
            <li key={video.id}>
              <VideoEmbed
                id={video.id}
                title={video.title}
                control="accent"
                poster="max"
                start={video.start}
                className="rounded-panel shadow-panel"
              />
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.08}>
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
  )

  const videosFirst = order === 'videos-first'

  return (
    <Section id="outcomes" width="bleed">
      <Stack gap="block">
        <Reveal>
          <Band width="text" className="flex flex-col gap-tight text-center">
            <Eyebrow hairline={false}>What happened for other people</Eyebrow>
            <Display as="h2" size="h2">
              The results speak for themselves
            </Display>
          </Band>
        </Reveal>

        <Band width="structure">
          <Reveal delay={0.04}>
            <LogoCarousel />
          </Reveal>
        </Band>

        {videosFirst ? videos : wall}
        {videosFirst ? wall : videos}

        <Reveal delay={0.04}>
          <CtaBlock
            analyticsId="outcomes"
            note="Thirty minutes on a call, and we tell you whether we would take this on."
          />
        </Reveal>
      </Stack>
    </Section>
  )
}
