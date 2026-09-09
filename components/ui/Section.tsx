import { cx } from './cx'

type Width = 'page' | 'structure' | 'text' | 'narrow'

const widths: Record<Width, string> = {
  page: 'max-w-page',
  structure: 'max-w-structure',
  text: 'max-w-text',
  narrow: 'max-w-narrow',
}

/**
 * Section shell. `space-section` top and bottom on every top-level section —
 * identical on all of them. The ground never changes colour; a section change is
 * marked by spacing and, at a movement boundary, a gold hairline.
 */
export function Section({
  id,
  width = 'structure',
  className,
  children,
  ariaLabel,
}: {
  id?: string
  width?: Width
  className?: string
  children: React.ReactNode
  ariaLabel?: string
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cx('px-gutter-m py-section-m md:px-gutter md:py-section', className)}
    >
      <div className={cx('mx-auto w-full', widths[width])}>{children}</div>
    </section>
  )
}

/** Inner band: prose narrows to 720px inside a 1040px structural section. */
export function Band({
  width = 'text',
  className,
  children,
}: {
  width?: Width
  className?: string
  children: React.ReactNode
}) {
  return <div className={cx('mx-auto w-full', widths[width], className)}>{children}</div>
}

/** The movement rule. One per movement boundary, four on the page. */
export function MovementRule() {
  return (
    <div aria-hidden className="px-gutter-m md:px-gutter">
      <div className="mx-auto h-px w-full max-w-structure bg-line" />
    </div>
  )
}

/** Default vertical stack. Uses gap, never margins between siblings. */
export function Stack({
  gap = 'flow',
  className,
  children,
}: {
  gap?: 'tight' | 'flow' | 'block'
  className?: string
  children: React.ReactNode
}) {
  const g =
    gap === 'tight'
      ? 'gap-tight'
      : gap === 'block'
        ? 'gap-block-m md:gap-block'
        : 'gap-flow-m md:gap-flow'
  return <div className={cx('flex flex-col', g, className)}>{children}</div>
}
