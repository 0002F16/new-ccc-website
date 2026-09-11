import { cx } from './cx'

export type Chip = { label: string; href?: string }

/**
 * Chip row — pre-empts objections directly under the headline. Max five, never a
 * benefit claim, never longer than six words. Each chip anchors to the section
 * that keeps its promise.
 */
export function ChipRow({ chips, className }: { chips: Chip[]; className?: string }) {
  return (
    <ul className={cx('flex flex-wrap items-center justify-center gap-[10px]', className)}>
      {chips.slice(0, 5).map((chip) => {
        const inner = (interactive: boolean) => (
          <span
            className={cx(
              'block rounded-badge border border-line px-[14px] py-[8px] text-s text-muted',
              interactive &&
                'transition-colors duration-ui ease-ui group-hover:border-ink group-hover:text-ink group-focus-visible:border-ink group-focus-visible:text-ink',
            )}
          >
            {chip.label}
          </span>
        )
        return (
          <li key={chip.label}>
            {chip.href ? (
              <a
                href={chip.href}
                className="group block min-h-[44px] content-center transition-transform duration-ui ease-ui hover:-translate-y-px focus-visible:-translate-y-px active:translate-y-0 active:scale-[.99]"
              >
                {inner(true)}
              </a>
            ) : (
              inner(false)
            )}
          </li>
        )
      })}
    </ul>
  )
}
