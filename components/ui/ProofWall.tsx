import Image from 'next/image'
import { cx } from './cx'

/**
 * Proof wall — the volume device. See CLAUDE.md § Components › Proof wall.
 *
 * Many screenshots at once, so the page can show that a lot of people got
 * somewhere without stating a number the claim rules forbid. It is always
 * preceded by a legible tier of specimens on `WorkProductPlate`s: at wall scale
 * a screenshot is texture, and texture alone claiming to be evidence is
 * decoration.
 *
 * MASONRY, NOT A GRID. The corpus runs from 10.87:1 to 0.73:1 and 40% of it is
 * wider than 3:1. Every fixed-ratio tile would crop away the sentence that is
 * the evidence, so the wall is CSS multi-column and each tile keeps its own
 * aspect ratio.
 *
 * REPORTED DEVIATION — CSS columns cannot take `gap`, so tiles carry `mb-tight`.
 * CLAUDE.md's spacing rule is "use `gap`, never margins between siblings"; this
 * is the one place in the system where a margin sets rhythm between siblings,
 * and it is recorded in the component spec rather than left to be discovered.
 *
 * Channels are `space-tight`, not `space-flow`: at 24px the tiles read as a grid
 * of cards, at 12px as one field. Density is the argument here.
 *
 * `sizes` is in px, not vw, and that is a bug fix rather than a preference. A
 * `vw` measure has to be resolved against the element's layout box, and inside a
 * reflowing multi-column container that box can read as zero — at which point the
 * browser falls back to the largest srcset candidate and asks the optimiser for
 * `w=3840`. Since every source here is at most 900px wide, that made Next upscale
 * a screenshot to 3840px, and four tiles never finished loading. Absolute widths
 * resolve without layout, so the candidate is always sane.
 *
 * Column counts assume a `bleed` section — the wall runs the viewport less the
 * page gutter, not `w-structure`. Five columns at 1280 is a 244px tile and five
 * at 1920 is 371px, so the wall gets *larger* tiles as the screen grows rather
 * than more of them past `xl`. That is deliberate: it is the only thing buying
 * back the legibility the specimen tier used to provide.
 *
 * Each tile is a plate at wall scale: the artefact unaltered on `surface` with
 * `space-tight` of dark padding, so no white screenshot is ever full-bleed. The
 * artefact is never tinted, overlaid or recoloured — it is evidence.
 */
export function ProofWall({
  shots,
  className,
}: {
  shots: readonly { src: string; width: number; height: number; alt: string }[]
  className?: string
}) {
  return (
    <ul className={cx('columns-2 gap-tight md:columns-3 lg:columns-4 xl:columns-5', className)}>
      {shots.map((shot) => (
        <li key={shot.src} className="mb-tight break-inside-avoid">
          <div className="rounded border border-line bg-surface p-tight shadow-card">
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 1280px) 400px, (min-width: 1024px) 260px, (min-width: 768px) 250px, 190px"
              loading="lazy"
              className="block h-auto w-full rounded-badge"
            />
          </div>
        </li>
      ))}
    </ul>
  )
}
