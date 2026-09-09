import { cx } from './cx'

/**
 * Reveal — the page's only motion device: an 8px rise over 240ms on load.
 *
 * Deliberately CSS-only, and deliberately not scroll-triggered.
 *
 * The first implementation used Motion's `whileInView`, which parks content at
 * `opacity: 0` until an IntersectionObserver fires and a JS animation loop runs
 * to completion. Testing in a real browser caught that loop stalling, leaving
 * every section below the hero permanently invisible. On a page whose entire job
 * is to be read, a reveal that can fail closed is not worth having.
 *
 * So: the animation is a CSS keyframe, the reduced-motion block in globals.css
 * collapses it to nothing, and the `<noscript>` guard in layout.tsx is belt and
 * braces. There is no JS in the path at all — nothing to stall.
 *
 * Children pass straight through, so wrapping a server component keeps it one.
 * Never import a section into this file.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className,
}: {
  children: React.ReactNode
  /** Seconds. Staggers a group; keep the whole group under 500ms. */
  delay?: number
  /** Match the parent's expected child so a grid or list is not broken. */
  as?: 'div' | 'li' | 'section'
  className?: string
}) {
  return (
    <Tag
      data-reveal
      className={cx('rise', className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  )
}
