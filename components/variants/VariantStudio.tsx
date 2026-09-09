'use client'

import { useEffect, useMemo, useState } from 'react'
import { heroVariants, type HeroVariantId, type HeroVariantStatus } from './hero-variants'

type Viewport = 'desktop' | 'mobile'

const statusLabel: Record<HeroVariantStatus, string> = {
  baseline: 'Baseline',
  'in-review': 'In review',
  draft: 'Draft',
  approved: 'Approved',
}

const statusClass: Record<HeroVariantStatus, string> = {
  baseline: 'border-line text-muted',
  'in-review': 'border-line-gold bg-accent-wash text-accent',
  draft: 'border-dashed border-muted text-muted',
  approved: 'border-line-gold bg-accent-wash text-ink',
}

export function VariantStudio({ initialVariantId }: { initialVariantId: HeroVariantId }) {
  const [selectedId, setSelectedId] = useState<HeroVariantId>(initialVariantId)
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const [presenting, setPresenting] = useState(false)

  const selectedIndex = heroVariants.findIndex((variant) => variant.id === selectedId)
  const selected = heroVariants[selectedIndex] ?? heroVariants[0]

  const previewStyle = useMemo(
    () => ({ width: viewport === 'mobile' ? '390px' : '100%' }),
    [viewport],
  )

  const selectAt = (index: number) => {
    const normalized = (index + heroVariants.length) % heroVariants.length
    const next = heroVariants[normalized]
    setSelectedId(next.id)
    window.history.replaceState(null, '', `/variants?v=${next.id}`)
  }

  const selectVariant = (id: HeroVariantId) => {
    const index = heroVariants.findIndex((variant) => variant.id === id)
    if (index !== -1) selectAt(index)
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPresenting(false)
      if (event.key === 'ArrowLeft') selectAt(selectedIndex - 1)
      if (event.key === 'ArrowRight') selectAt(selectedIndex + 1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  if (presenting) {
    return (
      <main className="fixed inset-0 z-50 bg-ground">
        <iframe
          key={`${selected.id}-presentation`}
          src={selected.path}
          title={`${selected.name} presentation preview`}
          className="h-full w-full border-0 bg-ground"
        />

        <div className="fixed inset-x-0 bottom-gutter flex justify-center px-gutter-m">
          <div className="flex items-center gap-tight rounded border border-line bg-surface px-[16px] py-[12px] shadow-card">
            <button
              type="button"
              onClick={() => selectAt(selectedIndex - 1)}
              className="min-h-[44px] px-[12px] text-label font-medium uppercase text-body transition duration-ui ease-ui hover:text-ink"
            >
              Previous
            </button>
            <p className="hidden min-w-[180px] text-center text-s text-ink sm:block">
              {selectedIndex + 1} / {heroVariants.length} · {selected.name}
            </p>
            <button
              type="button"
              onClick={() => selectAt(selectedIndex + 1)}
              className="min-h-[44px] px-[12px] text-label font-medium uppercase text-body transition duration-ui ease-ui hover:text-ink"
            >
              Next
            </button>
            <span aria-hidden className="h-[24px] w-px bg-line" />
            <button
              type="button"
              onClick={() => setPresenting(false)}
              className="min-h-[44px] px-[12px] text-label font-medium uppercase text-accent hover:text-accent-hover"
            >
              Exit
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-ground text-body">
      <header className="border-b border-line px-gutter-m py-[16px] md:px-gutter">
        <div className="mx-auto flex w-full max-w-page flex-col gap-flow-m md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-flow-m md:gap-flow">
            <p className="text-label font-medium uppercase text-accent">CCC · Hero Lab</p>
            <span aria-hidden className="hidden h-[24px] w-px bg-line md:block" />
            <h1 className="text-h4 font-semibold text-ink">Variant studio</h1>
          </div>

          <div className="flex flex-wrap items-center gap-tight">
            <div className="flex rounded border border-line p-[4px]" aria-label="Preview viewport">
              {(['desktop', 'mobile'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={viewport === option}
                  onClick={() => setViewport(option)}
                  className={[
                    'min-h-[44px] rounded-badge px-[14px] text-label font-medium uppercase transition duration-ui ease-ui',
                    viewport === option ? 'bg-accent-wash text-accent' : 'text-muted hover:text-ink',
                  ].join(' ')}
                >
                  {option}
                </button>
              ))}
            </div>
            <a
              href={selected.path}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[44px] items-center rounded border border-line px-[16px] text-label font-medium uppercase text-ink transition duration-ui ease-ui hover:border-ink"
            >
              Open clean
            </a>
            <button
              type="button"
              onClick={() => setPresenting(true)}
              className="min-h-[44px] rounded bg-accent px-[18px] text-label font-semibold uppercase text-accent-on transition duration-ui ease-ui hover:bg-accent-hover"
            >
              Present
            </button>
          </div>
        </div>
      </header>

      <div className="grid min-h-[calc(100vh-77px)] lg:grid-cols-[320px_1fr]">
        <aside className="border-b border-line bg-surface lg:max-h-[calc(100vh-77px)] lg:overflow-y-auto lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between border-b border-line-soft px-card-m py-[16px] md:px-card">
            <p className="text-label font-medium uppercase text-muted">Seven directions</p>
            <p className="tnum text-caption text-muted">{selectedIndex + 1} / 7</p>
          </div>

          <nav aria-label="Hero variants" className="grid sm:grid-cols-2 lg:grid-cols-1">
            {heroVariants.map((variant, index) => {
              const active = variant.id === selected.id
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => selectVariant(variant.id)}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'flex min-h-[112px] flex-col gap-tight border-b border-line-soft px-card-m py-[16px] text-left transition duration-ui ease-ui md:px-card',
                    active ? 'bg-accent-wash' : 'hover:bg-sunken',
                  ].join(' ')}
                >
                  <span className="flex w-full items-center justify-between gap-tight">
                    <span className={active ? 'text-s text-ink' : 'text-s text-body'}>
                      <span className="tnum text-caption text-muted">0{index + 1}</span>
                      {' · '}
                      {variant.name}
                    </span>
                    <span
                      className={`rounded-badge border px-[8px] py-[4px] text-micro font-medium uppercase ${statusClass[variant.status]}`}
                    >
                      {statusLabel[variant.status]}
                    </span>
                  </span>
                  <span className="text-caption text-muted">{variant.hypothesis}</span>
                </button>
              )
            })}
          </nav>
        </aside>

        <section aria-label={`${selected.name} preview`} className="overflow-hidden bg-sunken p-gutter-m md:p-gutter">
          <div
            className="mx-auto flex h-full max-w-full justify-center overflow-hidden rounded-panel border border-line bg-ground shadow-panel transition-[width] duration-ui-slow ease-ui"
            style={previewStyle}
          >
            <iframe
              key={`${selected.id}-${viewport}`}
              src={selected.path}
              title={`${selected.name} website preview`}
              className="h-[calc(100vh-126px)] min-h-[720px] w-full border-0 bg-ground"
            />
          </div>
        </section>
      </div>
    </main>
  )
}
