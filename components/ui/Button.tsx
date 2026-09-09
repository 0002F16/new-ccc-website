import { cx } from './cx'

/**
 * One affirmative label, used by every CTA on the page. The single-CTA rule is
 * unchanged — the same words every time — only the words changed, on the owner's
 * instruction of 9 September 2026, replacing "Apply for a fit call".
 */
export const CTA_LABEL = "Yes — I'm ready to apply"

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex min-h-[44px] items-center justify-center rounded text-[14px] font-semibold uppercase tracking-[0.14em] transition duration-ui ease-ui'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-on px-[40px] py-[18px] hover:bg-accent-hover hover:-translate-y-px',
  secondary:
    'border border-line bg-transparent px-[40px] py-[18px] text-ink hover:border-ink hover:-translate-y-px',
  ghost: 'px-0 py-2 text-accent hover:underline underline-offset-4',
}

export function Button({
  href = '#apply',
  variant = 'primary',
  className,
  children = CTA_LABEL,
}: {
  href?: string
  variant?: Variant
  className?: string
  children?: React.ReactNode
}) {
  return (
    <a href={href} className={cx(base, variants[variant], className)}>
      {children}
    </a>
  )
}

/**
 * CTA block — button, then a caption in muted at w-narrow. The note states what
 * happens next; it never repeats the button.
 */
export function CtaBlock({
  note,
  href = '#apply',
  align = 'center',
  label = CTA_LABEL,
}: {
  note?: React.ReactNode
  href?: string
  align?: 'center' | 'left'
  label?: string
}) {
  return (
    <div
      className={cx(
        'flex flex-col gap-flow-m md:gap-flow',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
      )}
    >
      <Button href={href}>{label}</Button>
      {note && <p className="max-w-narrow text-caption text-muted">{note}</p>}
    </div>
  )
}
