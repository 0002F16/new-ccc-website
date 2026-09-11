import { cx } from './cx'

/**
 * One affirmative label, used by every CTA on the page. The single-CTA rule is
 * unchanged — the same words every time — only the words changed, on the owner's
 * instruction of 9 September 2026, replacing "Apply for a fit call".
 */
export const CTA_LABEL = "Yes — I'm ready to apply"

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'group inline-flex min-h-[44px] items-center justify-center gap-tight rounded text-[14px] font-semibold uppercase tracking-[0.14em] transition duration-ui ease-ui hover:-translate-y-px focus-visible:-translate-y-px active:translate-y-0 active:scale-[.99]'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-on px-[40px] py-[18px] hover:bg-accent-hover focus-visible:bg-accent-hover',
  secondary:
    'border border-line bg-transparent px-[40px] py-[18px] text-ink hover:border-ink focus-visible:border-ink',
  ghost:
    'px-0 py-2 text-accent underline-offset-4 hover:text-accent-hover hover:underline focus-visible:text-accent-hover focus-visible:underline',
}

export function Button({
  analyticsId,
  href = '#apply',
  variant = 'primary',
  type,
  disabled,
  className,
  children = CTA_LABEL,
}: {
  analyticsId: string
  href?: string
  variant?: Variant
  /** Renders a `<button type="submit">` for the application form instead of a link. */
  type?: 'submit'
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}) {
  const content = (
    <>
      <span
        className={cx(
          'transition-transform duration-ui ease-ui',
          variant !== 'ghost' &&
            'group-hover:-translate-x-[2px] group-focus-visible:-translate-x-[2px]',
        )}
      >
        {children}
      </span>
      {variant !== 'ghost' && (
        <svg
          aria-hidden
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          className="shrink-0 transition-transform duration-ui ease-ui group-hover:translate-x-[2px] group-focus-visible:translate-x-[2px]"
        >
          <path
            d="M1 7h14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="[stroke-dasharray:14] [stroke-dashoffset:5] transition-[stroke-dashoffset] duration-ui ease-ui group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]"
          />
          <path
            d="m12 2 5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  )

  // Submit mode carries no analytics attributes: it is not a placement of the
  // page CTA, and its "outcome" is a network request, not a scroll or navigation.
  if (type === 'submit') {
    return (
      <button
        type="submit"
        disabled={disabled}
        className={cx(base, variants[variant], 'disabled:pointer-events-none disabled:opacity-60', className)}
      >
        {content}
      </button>
    )
  }

  return (
    <a
      href={href}
      className={cx(base, variants[variant], className)}
      data-analytics-event="cta_click"
      data-analytics-id={analyticsId}
      data-analytics-hesitation="true"
      data-analytics-outcome={href.startsWith('#') ? 'scroll' : 'navigate'}
    >
      {content}
    </a>
  )
}

/**
 * CTA block — button, then a caption in muted at w-narrow. The note states what
 * happens next; it never repeats the button.
 */
export function CtaBlock({
  analyticsId,
  note,
  href = '#apply',
  align = 'center',
  label = CTA_LABEL,
}: {
  analyticsId: string
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
      <Button analyticsId={analyticsId} href={href}>{label}</Button>
      {note && <p className="max-w-narrow text-caption text-muted">{note}</p>}
    </div>
  )
}
