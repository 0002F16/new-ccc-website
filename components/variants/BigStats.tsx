'use client'

import { useEffect, useRef } from 'react'

/**
 * Large metrics, modelled on the bendingspoons.com stats block (measured live,
 * 18 September 2026). Used under the no-video hero only; owner override, see
 * CLAUDE.md.
 *
 * Each stat stacks centred on two lines with one hierarchy throughout: the
 * serif gold number (suffix at 0.78em, dropped to the bottom), then a single
 * sans caption line in ink. Each block
 * rises 100px on a spring (fitted to Bending Spoons' measured curve: damping
 * ratio 0.68, ~6% overshoot on both position and opacity, settled by 1.2s)
 * once, when half of it is in the viewport.
 *
 * Fails open: server HTML carries no `data-armed`, so without JS (or under
 * reduced motion) every figure renders at rest.
 *
 * Figures are the owner-approved live-site metrics (override of 9 September
 * 2026), unverified; a hand-authored constant, never computed.
 */

type BigStat = { figure: string; suffix?: string; unit?: string; caption: string }

/**
 * Order set by the owner, 18 September 2026. "50%+ salary increase" was added
 * the same day at the owner's instruction; it has no source in the research
 * pack or the CRM, and a salary-increase figure is outside the claim rules'
 * 9 September override. Unverified.
 *
 * Every stat has the same two levels: the gold number line (with its unit where
 * the owner put the unit in gold, 18 September 2026), then one caption line.
 */
const STATS: readonly BigStat[] = [
  { figure: '20', suffix: '+', unit: 'million PLN', caption: 'earned by clients annually' },
  { figure: '50', suffix: '%+', caption: 'typical salary increase' },
  { figure: '40–60', unit: 'days', caption: 'average time to dream job offer' },
]

export function BigStats() {
  const listRef = useRef<HTMLDListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const blocks = Array.from(list.querySelectorAll<HTMLElement>('.big-stat'))
    // Bending Spoons triggers each block when half of it (measured with its
    // 100px offset applied) is inside the viewport, and plays it once.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          el.dataset.in = ''
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 },
    )

    const vh = window.innerHeight
    for (const el of blocks) {
      const rect = el.getBoundingClientRect()
      // Already at least half on screen, or above it: stays at rest.
      if (rect.top + rect.height / 2 <= vh) continue
      el.dataset.armed = ''
      observer.observe(el)
    }

    // A jump past a block (an anchor link, a restored scroll position) never
    // intersects it, so the observer never fires. Reveal anything that ends up
    // above the viewport, so nothing is left hidden on the way back up.
    const onScroll = () => {
      let pending = false
      for (const el of blocks) {
        if (!('armed' in el.dataset) || 'in' in el.dataset) continue
        if (el.getBoundingClientRect().bottom < 0) {
          el.dataset.in = ''
          observer.unobserve(el)
        } else {
          pending = true
        }
      }
      if (!pending) window.removeEventListener('scroll', onScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
      for (const el of blocks) {
        delete el.dataset.armed
        delete el.dataset.in
      }
    }
  }, [])

  return (
    <dl
      ref={listRef}
      className="flex flex-col items-center py-[64px] text-center md:py-[104px]"
      data-claim="unverified-live-site-metrics"
    >
      {STATS.map((stat) => (
        <div key={stat.caption} className="big-stat flex flex-col-reverse items-center gap-[8px] py-[40px]">
          {/* Number over caption visually; DOM keeps term/description order. */}
          <dt className="max-w-[18em] font-sans text-[clamp(26px,3.8vw,54px)] leading-[1.2] tracking-[-0.04em] text-ink [text-wrap:balance]">
            {stat.caption}
          </dt>
          <dd className="font-serif text-[clamp(64px,12.8vw,185px)] leading-[0.93] tracking-[-0.02em] text-accent [text-wrap:balance]">
            <span className="tnum">{stat.figure}</span>
            {stat.suffix && <span className="align-bottom text-[0.78em]">{stat.suffix}</span>}
            {stat.unit && <> {stat.unit}</>}
          </dd>
        </div>
      ))}
    </dl>
  )
}
