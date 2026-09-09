'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from './Button'

/**
 * Sticky CTA bar — appears after the hero leaves the viewport, hides on
 * scroll-up on mobile. One primary button plus a one-line restatement of who the
 * service is for.
 */
export function StickyCta({ line, watch = 'hero' }: { line: string; watch?: string }) {
  const [shown, setShown] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const hero = document.getElementById(watch)
    if (!hero) return
    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting), {
      rootMargin: '-80px 0px 0px 0px',
    })
    io.observe(hero)

    const onScroll = () => {
      const y = window.scrollY
      setHidden(y < lastY.current && window.innerWidth < 768)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [watch])

  return (
    <div
      aria-hidden={!shown || hidden}
      className={[
        'fixed inset-x-0 bottom-0 z-50 border-t border-line-gold bg-surface transition-transform duration-ui-slow ease-ui',
        shown && !hidden ? 'translate-y-0' : 'translate-y-full',
      ].join(' ')}
    >
      <div className="mx-auto flex w-full max-w-page flex-col items-center gap-tight px-gutter-m py-[16px] md:flex-row md:justify-between md:px-gutter">
        <p className="text-s text-body">{line}</p>
        <Button className="w-full md:w-auto" />
      </div>
    </div>
  )
}
