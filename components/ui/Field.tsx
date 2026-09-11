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
  autoComplete,
  inputMode,
  maxLength,
  minLength,
  defaultValue,
  className,
}: {
  id: string
  label: string
  type?: string
  // Choice controls are `ChoiceGroup`, which has its own anatomy in CLAUDE.md.
  as?: 'input' | 'textarea'
  required?: boolean
  error?: string
  hint?: string
  autoComplete?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  maxLength?: number
  minLength?: number
  defaultValue?: string
  className?: string
  children?: React.ReactNode
}) {
  const control =
    'w-full rounded border border-line bg-surface px-[14px] py-[12px] text-base text-ink transition-colors duration-ui ease-ui placeholder:text-muted hover:border-muted focus:border-accent focus-visible:border-accent'
  const hintId = hint && !error ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const shared = {
    id,
    name: id,
    required,
    maxLength,
    minLength,
    defaultValue,
    className: control,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': errorId ?? hintId,
  }
  return (
    <div className={cx('flex flex-col gap-tight', className)}>
      <label htmlFor={id} className="text-label font-medium uppercase text-muted">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea {...shared} rows={4} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} inputMode={inputMode} />
      )}
      {hintId && (
        <p id={hintId} className="text-caption text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-caption text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
