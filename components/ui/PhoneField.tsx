'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from 'libphonenumber-js/min'
import { cx } from './cx'

type Country = { code: CountryCode; name: string; dial: string }

/** Names people type that are not the official English region name. */
const ALIASES: Partial<Record<CountryCode, string[]>> = {
  GB: ['uk', 'britain', 'great britain', 'england', 'scotland', 'wales'],
  US: ['usa', 'america'],
  AE: ['uae', 'emirates'],
  KR: ['korea'],
  CZ: ['czech republic'],
  NL: ['holland'],
}

let displayNames: Intl.DisplayNames | null = null
const regionName = (code: string) => {
  displayNames ??= new Intl.DisplayNames(['en'], { type: 'region' })
  return displayNames.of(code) ?? code
}

let countries: Country[] | null = null
/** Poland pinned first, then alphabetical by English name. Built once, on first open. */
function countryList(): Country[] {
  if (countries) return countries
  const all = getCountries()
    .map((code) => ({ code, name: regionName(code), dial: getCountryCallingCode(code) }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'))
  countries = [...all.filter((c) => c.code === 'PL'), ...all.filter((c) => c.code !== 'PL')]
  return countries
}

/**
 * Phone field — see CLAUDE.md "Phone field". A country button with a searchable
 * listbox (ARIA combobox pattern) joined to a number input that formats as it
 * is typed. A hidden input named after `id` carries the E.164 value, so the
 * form's FormData holds one clean number whatever the visitor typed.
 */
export function PhoneField({
  id,
  label,
  required,
  error,
  defaultCountry = 'PL',
  className,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  defaultCountry?: CountryCode
  className?: string
}) {
  const [country, setCountry] = useState<CountryCode>(defaultCountry)
  const [national, setNational] = useState('')
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const listId = `${useId()}countries`
  const errorId = error ? `${id}-error` : undefined
  const dial = getCountryCallingCode(country)

  const filtered = useMemo(() => {
    if (!open) return []
    const q = query.trim().toLowerCase().replace(/^\+/, '')
    const list = countryList()
    if (!q) return list
    // Best matches first: an exact code, then names (or common aliases) that
    // start with the search, then a word that starts with it, then a dial code,
    // then anything containing it. The sort is stable, so each rank keeps the
    // Poland-first alphabetical order.
    const rank = (c: Country) => {
      const name = c.name.toLowerCase()
      const aliases = ALIASES[c.code] ?? []
      if (c.code.toLowerCase() === q || c.dial === q || aliases.includes(q)) return 0
      if (name.startsWith(q) || aliases.some((alias) => alias.startsWith(q))) return 1
      if (name.split(/[\s&(),.\-]+/).some((word) => word.startsWith(q))) return 2
      if (c.dial.startsWith(q)) return 3
      if (name.includes(q)) return 4
      return 9
    }
    return list
      .map((country) => ({ country, score: rank(country) }))
      .filter((entry) => entry.score < 9)
      .sort((a, b) => a.score - b.score)
      .map((entry) => entry.country)
  }, [open, query])

  const e164 = useMemo(() => {
    const trimmed = national.trim()
    const digits = trimmed.replace(/\D/g, '')
    if (!digits) return ''
    if (trimmed.startsWith('+')) return parsePhoneNumberFromString(trimmed)?.number ?? `+${digits}`
    return parsePhoneNumberFromString(trimmed, country)?.number ?? `+${dial}${digits}`
  }, [national, country, dial])

  useEffect(() => {
    if (!open) return
    searchRef.current?.focus()
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [open, active, filtered])

  const openList = () => {
    setQuery('')
    setActive(Math.max(0, countryList().findIndex((c) => c.code === country)))
    setOpen(true)
  }

  const close = (returnFocus: boolean) => {
    setOpen(false)
    if (returnFocus) buttonRef.current?.focus()
  }

  const choose = (code: CountryCode) => {
    setCountry(code)
    setOpen(false)
    const digits = national.replace(/\D/g, '')
    if (digits && !national.trim().startsWith('+')) setNational(new AsYouType(code).input(digits))
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }

  const onNumberChange = (raw: string) => {
    if (raw.trim().startsWith('+')) {
      // A pasted or autofilled international number picks its own country.
      const parsed = parsePhoneNumberFromString(raw)
      if (parsed?.country) {
        setCountry(parsed.country)
        setNational(new AsYouType(parsed.country).input(String(parsed.nationalNumber)))
      } else {
        setNational(raw)
      }
      return
    }
    // Format only while the number grows, so backspacing over a space or
    // bracket is not undone by the formatter putting it straight back.
    setNational(raw.length > national.length ? new AsYouType(country).input(raw) : raw)
  }

  const onSearchKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const last = filtered.length - 1
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActive((index) => Math.min(index + 1, last))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActive((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Home') {
      event.preventDefault()
      setActive(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setActive(Math.max(last, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const picked = filtered[active]
      if (picked) choose(picked.code)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      close(true)
    } else if (event.key === 'Tab') {
      close(false)
    }
  }

  const activeOption = filtered[active]

  return (
    <div ref={rootRef} className={cx('flex flex-col gap-tight', className)}>
      <label htmlFor={id} className="text-label font-medium uppercase text-muted">
        {label}
      </label>
      <div className="relative">
        <div className="flex rounded border border-line bg-surface transition-colors duration-ui ease-ui hover:border-muted focus-within:border-accent">
          <button
            ref={buttonRef}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            aria-label={`Country code: ${regionName(country)} +${dial}`}
            onClick={() => (open ? close(false) : openList())}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown' && !open) {
                event.preventDefault()
                openList()
              }
            }}
            className="flex min-h-[44px] shrink-0 items-center gap-2 border-r border-line px-[14px] text-base text-ink outline-none focus-visible:bg-accent-wash"
          >
            <span className="text-label font-medium uppercase text-muted">{country}</span>
            <span className="tabular-nums">+{dial}</span>
            <svg
              aria-hidden
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className={cx('text-muted transition-transform duration-ui ease-ui', open && 'rotate-180')}
            >
              <path d="m2.5 4.5 3.5 3.5 3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <input
            ref={inputRef}
            id={id}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={national}
            onChange={(event) => onNumberChange(event.target.value)}
            required={required}
            maxLength={30}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            className="min-w-0 flex-1 bg-transparent px-[14px] py-[12px] text-base text-ink outline-none"
          />
        </div>

        {open && (
          <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded border border-line bg-surface shadow-card">
            <input
              ref={searchRef}
              type="text"
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={activeOption ? `${listId}-${activeOption.code}` : undefined}
              aria-label="Search countries"
              placeholder="Search country or code"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setActive(0)
              }}
              onKeyDown={onSearchKey}
              className="w-full border-b border-line-soft bg-transparent px-[14px] py-[12px] text-s text-ink outline-none placeholder:text-muted"
            />
            <ul ref={listRef} id={listId} role="listbox" aria-label="Countries" className="max-h-[320px] overflow-y-auto py-1">
              {filtered.map((option, index) => (
                <li
                  key={option.code}
                  id={`${listId}-${option.code}`}
                  role="option"
                  aria-selected={option.code === country}
                  data-index={index}
                  onMouseEnter={() => setActive(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(option.code)}
                  className={cx(
                    'flex cursor-pointer items-center gap-tight px-[14px] py-[12px] text-s',
                    index === active ? 'bg-accent-wash text-ink' : 'text-body',
                  )}
                >
                  <span className="min-w-0 flex-1 truncate">{option.name}</span>
                  <span className="text-label font-medium uppercase text-muted">{option.code}</span>
                  <span className="w-[56px] text-right tabular-nums text-muted">+{option.dial}</span>
                </li>
              ))}
            </ul>
            {filtered.length === 0 && (
              <p className="px-[14px] pb-[12px] text-s text-muted">No country matches that search.</p>
            )}
          </div>
        )}
      </div>
      <input type="hidden" name={id} value={e164} />
      {error && (
        <p id={errorId} className="text-caption text-accent" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
