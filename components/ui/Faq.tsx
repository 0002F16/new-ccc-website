'use client'

import { useId, useState } from 'react'
import { cx } from './cx'

export type FaqItem = { q: string; a: React.ReactNode }

/**
 * FAQ — accessible disclosure buttons with smoothly animated answer regions.
 * The first item starts open; subsequent interactions may leave several open.
 * line-soft rules separate items, not cards.
 */
export function Faq({ items, className }: { items: FaqItem[]; className?: string }) {
  const baseId = useId()
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]))

  function toggle(index: number) {
    setOpenItems((current) => {
      const next = new Set(current)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  return (
    <div className={cx('mx-auto w-full max-w-narrow', className)}>
      {items.map((item, index) => {
        const open = openItems.has(index)
        const triggerId = `${baseId}-trigger-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <div
            key={item.q}
            className="group border-b border-line-soft transition-colors duration-ui ease-ui hover:border-line focus-within:border-line"
          >
            <button
              type="button"
              id={triggerId}
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              data-analytics-event={!open ? 'faq_open' : undefined}
              data-analytics-id={`faq-${index + 1}`}
              data-analytics-hesitation="true"
              data-analytics-outcome="disclosure"
              className="flex w-full cursor-pointer items-start justify-between gap-flow py-flow-m text-left text-h4 font-semibold text-ink transition-colors duration-ui ease-ui group-hover:text-ink md:py-flow"
            >
              {item.q}
              <svg
                aria-hidden
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className={cx(
                  'mt-1 shrink-0 text-muted transition-[transform,color] duration-ui-slow ease-ui group-hover:text-ink group-focus-within:text-ink',
                  open && 'rotate-180 text-ink',
                )}
              >
                <path
                  d="M5 8l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!open}
              className={cx(
                'grid transition-[grid-template-rows] duration-ui-slow ease-ui',
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  className={cx(
                    'pb-flow-m text-base text-body transition-[opacity,transform] duration-ui ease-ui md:pb-flow',
                    open ? 'translate-y-0 opacity-100' : '-translate-y-[4px] opacity-0',
                  )}
                >
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
