import { cx } from './cx'

/** Form field — label above in small caps. Never placeholder-as-label. */
export function Field({
  id,
  label,
  type = 'text',
  as = 'input',
  required,
  error,
  hint,
  className,
}: {
  id: string
  label: string
  type?: string
  // No 'select' or radio variant exists: Gilt defines no anatomy for a choice
  // control. Adding one is a CLAUDE.md amendment, not a build-time decision.
  as?: 'input' | 'textarea'
  required?: boolean
  error?: string
  hint?: string
  className?: string
  children?: React.ReactNode
}) {
  const control =
    'w-full rounded border border-line bg-surface px-[14px] py-[12px] text-base text-ink transition-colors duration-ui ease-ui placeholder:text-muted focus:border-accent'
  return (
    <div className={cx('flex flex-col gap-tight', className)}>
      <label htmlFor={id} className="text-label font-medium uppercase text-muted">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea id={id} name={id} required={required} rows={4} className={control} />
      ) : (
        <input id={id} name={id} type={type} required={required} className={control} />
      )}
      {hint && !error && <p className="text-caption text-muted">{hint}</p>}
      {error && (
        <p className="text-caption text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
