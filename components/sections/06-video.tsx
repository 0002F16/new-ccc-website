import { Caption, CtaBlock, OutcomeBadge, Section, Stack } from '@/components/ui'

/**
 * 6. The video — Movement II, after the alternatives table.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * AN ASSET NOW EXISTS, AND IT IS NOT YET PUBLISHABLE.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Supplied by the owner, 9 September 2026: the Loom recorded in `VSL_URL` below.
 * That answers the deck's original blocker ("no VSL exists"), and replaces it
 * with a harder one.
 *
 * The video's own title is "How to Get a zl20k/mo Job in 60 Days in Poland".
 * That is a salary figure used as proof AND a stated timeline — two separate
 * claim-rule breaches, from CLAUDE.md:
 *
 *   "No placement percentages, no guaranteed timelines, no salary-increase
 *    promises" · "No income or salary figures as proof."
 *
 * A page does not escape a claim by keeping it out of the caption: embedding the
 * video makes the page carry whatever the video asserts. So the URL is recorded
 * here and the section stays blocked until someone watches it against the offer
 * letter and the claim rules, per the OPEN item "VSL title, runtime, and whether
 * its claims match the offer letter". Three outcomes are possible: the video is
 * re-cut and re-titled, a new one is scripted against the offer letter, or the
 * section ships without a video — the architecture already works without one.
 *
 * Runtime is still unknown, and the deck's caption is still blocked.
 *
 * So the reader-facing content of this section is, at present, empty. Per the
 * build brief's rule 7 a blocked passage ships as nothing, and the section is
 * therefore built as the *slot* rather than as the video:
 *
 *   - No `VideoFrame`. The primitive's contract is a poster frame plus a caption
 *     stating what the video covers AND its runtime. There is no poster, no
 *     runtime and no video. Instantiating it would render a gold play control
 *     over a black rectangle — which the IA spec explicitly rules out ("Poster
 *     frame shows a face at rest ... should not be a black rectangle") — and
 *     would put a second accent on the same screen as the CTA button.
 *   - No caption. The one written line in the deck, "Aziz Khaitov on how the
 *     search is actually run, and what it costs", is annotated *written once the
 *     video exists* and is paired with a blocked runtime. Half a caption about a
 *     video that does not exist is a fabrication, so it is omitted.
 *   - No href, no embed, no third-party script, no poster image.
 *
 * What does ship is the placeholder treatment from the Gilt outcome ladder:
 * a 1px **dashed** `muted` edge, `muted` text, no fill. Dashed edges appear
 * nowhere else in this system, which is the whole point of them — this block is
 * meant to look unfinished and to be impossible to miss in review. Per CLAUDE.md
 * it "must not survive to production".
 *
 * The CTA block below it is real. Its note is verbatim from the deck's "CTA note
 * for this position", and it is one of the five required CTA blocks. It is kept
 * because the deck's requirements-regardless-of-content list demands a CTA block
 * directly beneath the video, and because a live CTA under a dead frame is what
 * makes it legible that the shell is finished and the asset is what is owed.
 *
 * Accent budget: the CTA button is the only accent in this section. No eyebrow
 * (the deck supplies none, and an eyebrow would add a `line-gold` hairline), no
 * heading (the deck supplies none), no `line-gold` anywhere.
 *
 * When the claims audit clears, this whole placeholder is deleted and replaced by
 * a `VideoFrame` carrying a real poster (a face at rest, never a black
 * rectangle), `VSL_URL` as its href, and the completed caption including runtime.
 */

/**
 * Owner-supplied, 9 September 2026. Recorded, deliberately NOT rendered as a
 * playable control — see the claims note above. Do not wire this to a
 * `VideoFrame` until the audit clears.
 */
const VSL_URL = 'https://www.loom.com/share/ee574d181bb7444e84884afa81a9bc58'
export function VideoSection() {
  return (
    <Section id="video" ariaLabel="The video">
      <Stack gap="block">
        {/*
          Build scaffolding, not page copy. Delete this entire figure when the
          asset lands. `data-blocked` is here so the missing asset is greppable
          and can be asserted against in a pre-launch check.
        */}
        <figure
          data-blocked="vsl-claims-audit-not-done"
          data-asset={VSL_URL}
          className="mx-auto flex w-full max-w-structure flex-col gap-tight"
        >
          <div className="flex aspect-video w-full flex-col items-center justify-center gap-flow rounded-panel border border-dashed border-muted px-gutter-m text-center md:px-gutter">
            <OutcomeBadge stage="unverified">Claims not audited</OutcomeBadge>
            <Caption className="max-w-text">
              A video has been supplied, and it is not yet publishable. Its title states a monthly
              salary figure and a sixty-day timeline. Both are forbidden as claims, and embedding
              the video would put them on the page whatever the caption says. It has to be watched
              against the offer letter before it can run here.
            </Caption>
          </div>
          <figcaption>
            <Caption>
              Placeholder. No poster, no play control and no link are rendered, and the deck&rsquo;s
              caption is still blocked on runtime. This block must be deleted before launch.
            </Caption>
          </figcaption>
        </figure>

        <CtaBlock
          analyticsId="video-section"
          note="Thirty minutes on a call, and we tell you whether we would take this on."
        />
      </Stack>
    </Section>
  )
}
