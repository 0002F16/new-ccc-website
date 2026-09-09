import { cx } from './cx'
import { Display } from './Type'

export type Stat = { figure: string; label: string }

/**
 * Stat row — headline proof, in the hero.
 *
 * Anatomy: figure in Instrument Serif at `h2` in `ink` with tabular numerals,
 * label beneath in `muted` small caps, items divided by a `line` hairline,
 * centred. Stacks below `sm`, where the rule turns horizontal.
 *
 * The figure uses the serif at display size because it has to out-weigh the
 * 18px lede beside it — a 24px grotesk figure reads as a caption, not a claim.
 * `as="p"` keeps heading order intact.
 *
 * No fill, no card, no gold — the hero's accent belongs to the CTA.
 * NEVER animate a figure counting up: CLAUDE.md forbids counters that tick.
 */
export function StatRow({
  stats,
  className,
  ...rest
}: {
  stats: Stat[]
  className?: string
} & React.HTMLAttributes<HTMLDListElement>) {
  return (
    <dl
      className={cx(
        'flex flex-col items-center divide-y divide-line sm:flex-row sm:divide-x sm:divide-y-0',
        className,
      )}
      {...rest}
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col-reverse items-center gap-tight px-0 py-flow-m text-center sm:flex-1 sm:px-flow sm:py-0 md:px-card"
        >
          {/* Column order is figure-over-label; DOM order is label-then-figure so
              the <dl> stays a real term/description pair. */}
          <dt className="text-label font-medium uppercase text-muted">{stat.label}</dt>
          <dd>
            <Display as="p" size="h2" className="tnum whitespace-nowrap md:!text-h2-m">
              {stat.figure}
            </Display>
          </dd>
        </div>
      ))}
    </dl>
  )
}
