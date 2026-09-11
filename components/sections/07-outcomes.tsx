import {
  Band,
  Display,
  Eyebrow,
  Lede,
  LogoCarousel,
  ProofWall,
  Reveal,
  Section,
  Stack,
  VideoEmbed,
} from '@/components/ui'
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
 * 2. VIDEOS. One featured film at the full band width, then the same nine
 *    three-across at `lg` — a 3×3 block reads as "nine" at a glance where five
 *    rows of two read as a list. That reverses round 2's two-across rule, which
 *    was set on the grounds that a 16:9 embed at ~310px collapses the YouTube
 *    control bar. Three across inside `w-structure` is ~330px, above that
 *    threshold, and the tiles are facades until clicked, so nothing but a poster
 *    image is laid out at rest.
 *
 *    The featured film is the section's only `control="accent"` — a 64px gold
 *    disc, which the component permits for one video and forbids in a grid. It
 *    also takes `poster="max"`: at ~1040px the 480×360 `hqdefault` the tiles use
 *    would be upscaled more than twice and letterboxed. See `FEATURE` below for
 *    why its accessible title is not its YouTube title.
 *
 * ── Gold budget ─────────────────────────────────────────────────────────────
 *
 * Zero `line-gold` elements. The eyebrow ships `hairline={false}`, the videos
 * use `control="quiet"` (nine gold discs would be nine accents). The section's
 * only accent is the eyebrow, which every section has.
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
 * dates — for all thirty-nine screenshots and all ten videos, the featured film
 * included. Note that with
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

/**
 * The featured film. Added 10 September 2026 on the owner's instruction — one
 * video, ahead of the nine and much larger.
 *
 * It earns the position: it is the only long-form piece on the page, the founder
 * is in it, and the subject is an employed international in Poland moving between
 * two named employers — which is the ICP the strategy brief describes and which
 * seven of the nine below are not. Uploaded 5 September 2026, so it is also the
 * newest thing here by a year.
 *
 * TITLE IS NOT THE YOUTUBE TITLE, and this is a claim-rule decision rather than
 * an editorial one. The video is published as "Why Good Expats Make Bad Money in
 * Poland (And How She Tripled Her Pay in 30 Days" — a salary-increase claim and a
 * thirty-day timeline, both on the non-negotiable list, and neither covered by the
 * 9 September override, which reaches the hero stat row and nothing else. Setting
 * that string as page copy would publish both claims in the largest type in the
 * section. What is used instead is the first clause of the real title, verbatim
 * and unaltered, which carries no claim. The video is linked as it is; the page
 * does not repeat what the page may not say.
 *
 * The thumbnail was checked for the same reason and is clean — two people, two
 * employer marks, "your job search done for you". No figure, no timeline.
 *
 * Starts at 0:00. The owner's link carried `t=1023s`, which is almost certainly
 * where they happened to be watching; opening a stranger seventeen minutes into a
 * thirty-two-minute film is not a highlight. One prop to change if it was meant.
 */
const FEATURE = {
  id: '8NZYSVMTdF4',
  title: 'Why good expats make bad money in Poland',
} as const

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
                Posts from the client community and nine filmed conversations.
              </Lede>
            </div>
          </Band>
        </Reveal>

        <Band width="structure">
          <Reveal delay={0.04}>
            <LogoCarousel />
          </Reveal>
        </Band>

        {/* Register 1 — the wall, at the section's full bleed width. */}
        <Stack gap="flow">
          <Reveal delay={0.04}>
            <ProofWall shots={WALL} />
          </Reveal>
        </Stack>

        {/* Register 2 — the nine videos, 3×3, banded back to structure. */}
        <Band width="structure" className="flex flex-col gap-flow-m md:gap-flow">
          <Reveal delay={0.04}>
            <VideoEmbed
              id={FEATURE.id}
              title={FEATURE.title}
              control="accent"
              poster="max"
            />
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
      </Stack>
    </Section>
  )
}
