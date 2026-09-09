import { cx } from './cx'

/**
 * Eyebrow — names the audience or the section before anything is claimed.
 * Optional 48px gold hairline above. One per section, six words maximum.
 */
export function Eyebrow({
  children,
  hairline = true,
  align = 'center',
  className,
}: {
  children: React.ReactNode
  hairline?: boolean
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div
      className={cx(
        'flex flex-col gap-tight',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {hairline && <span aria-hidden className="block h-px w-[48px] bg-line-gold" />}
      <p className="text-label font-medium uppercase text-accent">{children}</p>
    </div>
  )
}

/** Display heading. Serif, one weight. One gold phrase or one italic phrase, never both. */
export function Display({
  as: Tag = 'h2',
  size = 'l',
  className,
  children,
}: {
  as?: 'h1' | 'h2' | 'p'
  size?: 'xl' | 'l' | 'h2'
  className?: string
  children: React.ReactNode
}) {
  const sizes = {
    xl: 'text-display-xl-m md:text-display-xl',
    l: 'text-display-l-m md:text-display-l',
    h2: 'text-h2-m md:text-h2',
  }
  return (
    <Tag className={cx('font-serif font-normal text-ink', sizes[size], className)}>{children}</Tag>
  )
}

/** The one picked-out phrase per screen. */
export function Gold({ children }: { children: React.ReactNode }) {
  return <span className="text-accent">{children}</span>
}

/** Editorial emphasis. Instrument Serif italic in ink. Never with Gold in one heading. */
export function Em({ children }: { children: React.ReactNode }) {
  return <em className="font-serif italic text-ink">{children}</em>
}

export function H3({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <h3 className={cx('text-h3-m font-semibold text-ink md:text-h3', className)}>{children}</h3>
  )
}

export function H4({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h4 className={cx('text-h4 font-semibold text-ink', className)}>{children}</h4>
}

export function Lede({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cx('text-l text-body [text-wrap:pretty]', className)}>{children}</p>
}

export function Body({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cx('text-base text-body [text-wrap:pretty]', className)}>{children}</p>
}

export function Caption({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <p className={cx('text-caption text-muted', className)}>{children}</p>
}

export function Label({
  as: Tag = 'span',
  className,
  children,
}: {
  as?: 'span' | 'dt' | 'p'
  className?: string
  children: React.ReactNode
}) {
  return (
    <Tag className={cx('text-label font-medium uppercase text-muted', className)}>{children}</Tag>
  )
}

/**
 * Section header — gold hairline → eyebrow → h2 → optional lede at w-text.
 */
export function SectionHeader({
  eyebrow,
  heading,
  lede,
  align = 'center',
  headingSize = 'h2',
}: {
  eyebrow?: React.ReactNode
  heading: React.ReactNode
  lede?: React.ReactNode
  align?: 'center' | 'left'
  headingSize?: 'h2' | 'l'
}) {
  const centred = align === 'center'
  return (
    <div
      className={cx('mx-auto flex w-full max-w-text flex-col gap-tight', centred && 'text-center')}
    >
      {eyebrow && <Eyebrow align={align}>{eyebrow}</Eyebrow>}
      <Display as="h2" size={headingSize}>
        {heading}
      </Display>
      {lede && (
        <div className="pt-flow-m md:pt-flow">
          {typeof lede === 'string' ? <Lede>{lede}</Lede> : lede}
        </div>
      )}
    </div>
  )
}
