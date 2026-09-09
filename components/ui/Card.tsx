import { cx } from './cx'

/** Card — surface, 1px line, 4px radius, card-pad, inset top highlight. */
export function Card({
  as: Tag = 'div',
  gold = false,
  id,
  className,
  children,
}: {
  as?: 'div' | 'li' | 'article'
  id?: string
  /** line-gold edge: at most one element per section. */
  gold?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <Tag
      id={id}
      className={cx(
        'flex flex-col gap-flow-m rounded border bg-surface p-card-m shadow-card md:gap-flow md:p-card',
        gold ? 'border-line-gold' : 'border-line',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

/** Wells: the price block, quoted material. */
export function Well({
  goldTop = false,
  className,
  children,
}: {
  goldTop?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={cx(
        'flex flex-col gap-flow-m rounded border border-line bg-sunken p-card-m md:gap-flow md:p-card',
        goldTop && 'border-t-2 border-t-line-gold',
        className,
      )}
    >
      {children}
    </div>
  )
}
