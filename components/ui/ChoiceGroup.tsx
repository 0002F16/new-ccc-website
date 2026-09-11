import { cx } from './cx'

/**
 * Choice group — a native radio set drawn as bordered rows. See CLAUDE.md
 * "Choice group". Native inputs keep arrow-key movement and screen-reader
 * semantics; the row only restyles what the browser already does.
 */
export function ChoiceGroup({
  name,
  legend,
  options,
  required,
  error,
  className,
}: {
  name: string
  legend: string
  options: readonly { value: string; label: string }[]
  required?: boolean
  error?: string
  className?: string
}) {
  const errorId = error ? `${name}-error` : undefined
  return (
    <fieldset
      className={cx('flex flex-col gap-tight', className)}
      aria-invalid={error ? true : undefined}
      aria-describedby={errorId}
    >
      <legend className="mb-tight text-label font-medium uppercase text-muted">{legend}</legend>
      <div className="grid gap-tight sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex min-h-[44px] cursor-pointer items-center gap-tight rounded border border-line bg-surface px-[14px] py-[12px] text-s text-body transition-colors duration-ui ease-ui hover:border-muted has-[:checked]:border-accent has-[:checked]:bg-accent-wash has-[:checked]:text-ink has-[:focus-visible]:border-accent"
          >
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              required={required}
              className="h-4 w-4 shrink-0 accent-accent"
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="text-caption text-accent" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
}
