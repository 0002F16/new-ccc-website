import { cx } from './cx'

export type Spec = { term: string; value: React.ReactNode }

/**
 * Spec pair — the workhorse. Reach for this before reaching for prose.
 * Two columns inside w-structure; stacked inside centred prose; one column below 560px.
 */
export function SpecList({
  specs,
  columns = 1,
  className,
}: {
  specs: Spec[]
  columns?: 1 | 2
  className?: string
}) {
  return (
    <dl
      className={cx(
        'grid gap-x-[24px] gap-y-[12px]',
        columns === 2
          ? 'sm:grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto_1fr]'
          : 'sm:grid-cols-[auto_1fr]',
        className,
      )}
    >
      {specs.map((spec) => (
        <div key={spec.term} className="contents">
          <dt className="self-baseline whitespace-nowrap pt-[3px] text-label font-medium uppercase text-muted">
            {spec.term}
          </dt>
          <dd className="text-s text-body">{spec.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** The operative phrase inside a spec value. */
export function Op({ children }: { children: React.ReactNode }) {
  return <span className="text-ink">{children}</span>
}
