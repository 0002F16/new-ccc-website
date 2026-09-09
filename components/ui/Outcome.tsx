import { cx } from './cx'

/**
 * The outcome ladder. Encoded with weight and enclosure — no second hue.
 * Every badge states its stage in words: colour is never the only carrier.
 */
export type Stage = 'interview' | 'offer' | 'start' | 'unverified'

const styles: Record<Stage, string> = {
  interview: 'text-muted',
  offer: 'rounded-badge border border-line px-[8px] py-[4px] text-ink',
  start: 'rounded-badge border border-line-gold bg-accent-wash px-[8px] py-[4px] text-accent',
  unverified: 'rounded-badge border border-dashed border-muted px-[8px] py-[4px] text-muted',
}

export function OutcomeBadge({ stage, children }: { stage: Stage; children: React.ReactNode }) {
  return (
    <span className={cx('inline-block text-label font-medium uppercase', styles[stage])}>
      {children}
    </span>
  )
}
