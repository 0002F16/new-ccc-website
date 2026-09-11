'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { cx } from './cx'

/**
 * Proof wall — the volume device. See CLAUDE.md § Components › Proof wall.
 *
 * Many screenshots at once, so the page can show that a lot of people got
 * somewhere without stating a number the claim rules forbid. Tiles run one to
 * three columns and open at their intrinsic size for deliberate inspection.
 *
 * MASONRY, NOT A GRID. The corpus runs from 10.87:1 to 0.73:1 and 40% of it is
 * wider than 3:1. Every fixed-ratio tile would crop away the sentence that is
 * the evidence, so the wall is CSS multi-column and each tile keeps its own
 * aspect ratio.
 *
 * REPORTED DEVIATION — CSS columns cannot take `gap`, so tiles carry `mb-tight`.
 * CLAUDE.md's spacing rule is "use `gap`, never margins between siblings"; this
 * is the one place in the system where a margin sets rhythm between siblings,
 * and it is recorded in the component spec rather than left to be discovered.
 *
 * Channels are `space-tight`, not `space-flow`: at 24px the tiles read as a grid
 * of cards, at 12px as one field. Density is the argument here.
 *
 * `sizes` tracks the column count: a full column on mobile, half from `md`, a
 * third from `xl`. `vw` in `sizes` resolves against the viewport, never the
 * layout box, so the reflowing multi-column container cannot distort it. The
 * earlier blank-tile bug (a fallback asking for `w=3840`) is prevented by the
 * `deviceSizes` cap in next.config.mjs. Fixed px values here over-fetched at
 * `md` (560px for a ~370px tile) and would blur tiles on wide displays.
 *
 * Column counts assume a `bleed` section — the wall runs the viewport less the
 * page gutter, not `w-structure`. One column on mobile, two from `md`, and three
 * from `xl` make the post itself readable before the inspection view is opened.
 *
 * Each tile is a plate at wall scale: the artefact unaltered on `surface` with
 * `space-tight` of dark padding, so no white screenshot is ever full-bleed. The
 * artefact is never tinted, overlaid or recoloured — it is evidence.
 */
export function ProofWall({
  shots,
  className,
}: {
  shots: readonly { src: string; width: number; height: number; alt: string }[]
  className?: string
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([])
  const originRef = useRef<number | null>(null)
  const viewerOpen = selected !== null
  const selectedShot = selected === null ? null : shots[selected]

  useEffect(() => {
    if (!viewerOpen) return

    const dialog = dialogRef.current
    if (!dialog) return

    if (!dialog.open) dialog.showModal()
    const focusFrame = window.requestAnimationFrame(() => closeRef.current?.focus())
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
    }
  }, [viewerOpen])

  function openViewer(index: number) {
    originRef.current = index
    setSelected(index)
  }

  function closeViewer() {
    dialogRef.current?.close()
  }

  function handleClosed() {
    setSelected(null)
    const origin = originRef.current
    originRef.current = null
    if (origin !== null) triggerRefs.current[origin]?.focus()
  }

  function moveSelection(delta: number) {
    setSelected((current) => {
      if (current === null || shots.length === 0) return current
      return (current + delta + shots.length) % shots.length
    })
  }

  return (
    <>
      <ul className={cx('columns-1 gap-tight md:columns-2 xl:columns-3', className)}>
        {shots.map((shot, index) => (
          <li key={shot.src} className="mb-tight break-inside-avoid">
            <button
              ref={(node) => {
                triggerRefs.current[index] = node
              }}
              type="button"
              aria-label={`View larger: ${shot.alt}`}
              onClick={() => openViewer(index)}
              className="group block w-full cursor-zoom-in rounded border border-line bg-surface p-tight text-left shadow-card transition-[transform,border-color] duration-ui ease-ui hover:-translate-y-[2px] hover:border-ink focus-visible:-translate-y-[2px] focus-visible:border-ink active:translate-y-0 active:scale-[.99]"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(min-width: 1280px) 34vw, (min-width: 768px) 50vw, 100vw"
                loading="lazy"
                className="block h-auto w-full rounded-badge transition-transform duration-ui-slow ease-ui group-hover:scale-[1.01] group-focus-visible:scale-[1.01]"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Proof image viewer"
        onClose={handleClosed}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeViewer()
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            moveSelection(-1)
          } else if (event.key === 'ArrowRight') {
            event.preventDefault()
            moveSelection(1)
          }
        }}
        className="m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-page overflow-y-auto rounded-panel border border-line bg-surface p-0 text-ink shadow-panel backdrop:bg-ground/90 md:max-h-[calc(100dvh-48px)] md:w-[calc(100%-48px)]"
      >
        {selectedShot && selected !== null && (
          <div className="flex min-h-0 flex-col">
            <div className="flex min-h-[56px] items-center justify-between gap-tight border-b border-line px-tight">
              <span className="text-label font-medium uppercase text-muted tnum">
                {selected + 1} of {shots.length}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={closeViewer}
                className="min-h-[44px] rounded-badge px-tight text-label font-medium uppercase text-body transition-colors duration-ui ease-ui hover:text-ink focus-visible:text-ink active:text-muted"
              >
                Close
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center bg-ground p-tight md:p-flow">
              <Image
                src={selectedShot.src}
                alt={selectedShot.alt}
                width={selectedShot.width}
                height={selectedShot.height}
                sizes="90vw"
                loading="eager"
                className="block h-auto max-h-[calc(100dvh-220px)] w-auto max-w-full rounded-badge object-contain"
                style={{ maxWidth: selectedShot.width }}
              />
            </div>

            <div className="flex flex-col gap-tight border-t border-line px-tight py-tight sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-text text-caption text-muted">{selectedShot.alt}</p>
              <div className="flex shrink-0 items-center gap-tight">
                <button
                  type="button"
                  onClick={() => moveSelection(-1)}
                  className="min-h-[44px] rounded-badge border border-line px-tight text-label font-medium uppercase text-body transition-colors duration-ui ease-ui hover:border-ink hover:text-ink focus-visible:border-ink focus-visible:text-ink active:text-muted"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => moveSelection(1)}
                  className="min-h-[44px] rounded-badge border border-line px-tight text-label font-medium uppercase text-body transition-colors duration-ui ease-ui hover:border-ink hover:text-ink focus-visible:border-ink focus-visible:text-ink active:text-muted"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
