import { cx } from './cx'

export type FaqItem = { q: string; a: React.ReactNode }

/**
 * FAQ — native details/summary with a rotating chevron. All closed at rest
 * except the first. line-soft rules between items, not cards.
 */
export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={cx('mx-auto w-full max-w-narrow', className)}>
      {items.map((item, i) => (
        <details
          key={item.q}
          open={i === 0}
          className="group border-b border-line-soft [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-flow py-flow-m text-h4 font-semibold text-ink md:py-flow">
            {item.q}
            <svg
              aria-hidden
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="mt-1 shrink-0 text-muted transition-transform duration-ui-slow ease-ui group-open:rotate-180"
            >
              <path
                d="M5 8l5 5 5-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </summary>
          <div className="pb-flow-m text-base text-body md:pb-flow">{item.a}</div>
        </details>
      ))}
    </div>
  )
}
