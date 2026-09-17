'use client'

import { useEffect, useRef } from 'react'

/**
 * 2. Value proposition, read at scroll pace. Added 17 September 2026; copy
 * supplied by the owner the same day.
 *
 * Owner override, 17 September 2026: this section breaks the Gilt rules on
 * purpose. Its type runs far above `display-xl`, its spacing sits outside the
 * scale, and its motion is scroll-linked. See "Overridden 17 September 2026"
 * in CLAUDE.md.
 *
 * Replaces 02-two-situations and 04-three-bottlenecks on the page (both files
 * kept on disk). Modelled on the bendingspoons.com scroll text, measured live:
 *
 * - Every paragraph is split into characters that start at blur(20px) and
 *   opacity 0. Here the blur is drawn with text-shadow (see `paint`).
 * - Each paragraph has its own progress, scrubbed by scroll: 0 when its top
 *   reaches 80% of the viewport, 1 when its top reaches about 50% (or when its
 *   bottom reaches about 85%, for a paragraph taller than that window).
 * - A band of ~14 characters is mid-transition at any moment, eased out.
 * - Progress trails the scroll position with a ~90ms exponential lag, then the
 *   loop stops. Scrolling back up reverses it.
 *
 * Guarantees:
 *
 * - Fails open. Server render and no-JS show every character at full `ink`;
 *   hiding is only applied once the effect runs.
 * - Scroll-linked, not scroll-jacked. Native scrolling is never intercepted.
 * - Reduced motion: the effect bails out and the text is static.
 * - Screen readers get each paragraph once, from an `sr-only` copy; the split
 *   characters are `aria-hidden`.
 */

const STATEMENTS = [
  'We build better careers for experienced internationals in Poland.',
  'Not by giving advice, but by taking ownership of the work between ambition and an offer.',
  'Positioning. Applications. Outreach. Interview preparation. One team, operating your entire job search.',
] as const

const PARAGRAPHS = STATEMENTS.map((s) => s.split(' ').map((word) => Array.from(word)))

/** Viewport fraction where a paragraph's top starts revealing. */
const START = 0.8
/** Minimum reveal distance, as a viewport fraction. */
const RANGE = 0.3
/** How far above the viewport bottom a tall paragraph finishes. */
const BOTTOM_INSET = 0.05
/** Characters mid-transition at once. */
const BAND = 14
/** Blur on a fully hidden character, px. */
const BLUR = 20
/** Smoothing time constant, ms. */
const LAG = 90
/** `ink` (#F6F1E8) as RGB channels, for the per-character colour and shadow. */
const INK = '246, 241, 232'

type Paragraph = {
  el: HTMLElement
  chars: HTMLElement[]
  /** Last reveal value written per character, quantised; -1 = never written. */
  written: number[]
  current: number
  target: number
}

export function ValuePropScroll() {
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const paragraphs: Paragraph[] = paragraphRefs.current
      .filter((el): el is HTMLParagraphElement => el !== null)
      .map((el) => {
        const chars = Array.from(el.querySelectorAll<HTMLElement>('[data-char]'))
        return { el, chars, written: chars.map(() => -1), current: 0, target: 0 }
      })

    const measure = () => {
      const vh = window.innerHeight
      for (const p of paragraphs) {
        const rect = p.el.getBoundingClientRect()
        const distance = Math.max(RANGE * vh, rect.height - BOTTOM_INSET * vh)
        p.target = Math.min(1, Math.max(0, (START * vh - rect.top) / distance))
      }
    }

    const paint = (p: Paragraph) => {
      const n = p.chars.length
      const head = p.current * (n + BAND)
      for (let i = 0; i < n; i++) {
        const t = Math.min(1, Math.max(0, (head - i) / BAND))
        const q = Math.round((1 - (1 - t) * (1 - t)) * 200) / 200
        if (q === p.written[i]) continue
        p.written[i] = q
        const style = p.chars[i].style
        if (q === 1) {
          style.removeProperty('color')
          style.removeProperty('text-shadow')
          continue
        }
        // The blur is a text-shadow, not `filter`: Chrome clips and fails to
        // repaint filters on inline spans, leaving boxes and stale letters.
        // Shadow blur radius is ~2σ, so 2×BLUR matches blur(20px). The crisp
        // glyph fades in later than the shadow, so the letter resolves last.
        style.color = `rgba(${INK}, ${(q * q * q).toFixed(3)})`
        style.textShadow = `0 0 ${(2 * BLUR * (1 - q)).toFixed(1)}px rgba(${INK}, ${q.toFixed(3)})`
      }
    }

    let frame = 0
    let last = 0

    const tick = (now: number) => {
      const dt = last ? Math.min(64, now - last) : 16
      last = now
      const k = 1 - Math.exp(-dt / LAG)
      let moving = false
      for (const p of paragraphs) {
        const gap = p.target - p.current
        if (Math.abs(gap) < 0.0005) {
          if (p.current !== p.target) {
            p.current = p.target
            paint(p)
          }
          continue
        }
        p.current += gap * k
        paint(p)
        moving = true
      }
      if (moving) {
        frame = requestAnimationFrame(tick)
      } else {
        frame = 0
        last = 0
      }
    }

    const onScroll = () => {
      measure()
      if (!frame) frame = requestAnimationFrame(tick)
    }

    // Start from wherever the page already is, without easing in from zero.
    measure()
    for (const p of paragraphs) {
      p.current = p.target
      paint(p)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      for (const p of paragraphs) {
        for (const c of p.chars) {
          c.style.removeProperty('color')
          c.style.removeProperty('text-shadow')
        }
      }
    }
  }, [])

  return (
    <section
      id="value-prop"
      aria-labelledby="value-prop-heading"
      className="px-gutter-m py-[80px] md:px-gutter md:py-[200px]"
    >
      <h2 id="value-prop-heading" className="sr-only">
        What we do
      </h2>

      <div className="mx-auto flex w-full max-w-page flex-col gap-[56px] md:gap-[100px]">
        {PARAGRAPHS.map((words, s) => (
          <p
            key={s}
            ref={(el) => {
              paragraphRefs.current[s] = el
            }}
            className="max-w-[12.5em] font-serif text-[clamp(38px,5.6vw,88px)] font-normal leading-[1.18] tracking-[-0.015em] text-ink [text-wrap:pretty] md:leading-[1.1]"
          >
            <span className="sr-only">{STATEMENTS[s]}</span>
            <span aria-hidden>
              {/* Word wrappers stay inline so kerning and text-wrap work across
                  them; the last two words share a no-break space, so a line
                  never ends on a lone word. */}
              {words.map((chars, w) => (
                <span key={w}>
                  <span className="whitespace-nowrap">
                    {chars.map((char, c) => (
                      <span key={c} data-char>
                        {char}
                      </span>
                    ))}
                  </span>
                  {w < words.length - 2 ? ' ' : w === words.length - 2 ? '\u00A0' : null}
                </span>
              ))}
            </span>
          </p>
        ))}
      </div>
    </section>
  )
}
