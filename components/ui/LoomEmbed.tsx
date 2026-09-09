'use client'

import { useState } from 'react'
import { cx } from './cx'

/**
 * A click-to-play Loom facade. The Loom player is not loaded until requested,
 * keeping the hero fast while still letting a visitor watch without leaving it.
 */
export function LoomEmbed({
  id,
  title,
  className,
}: {
  id: string
  title: string
  className?: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <div
      className={cx(
        'relative aspect-video w-full overflow-hidden rounded-panel border border-line bg-surface shadow-panel',
        className,
      )}
    >
      {playing ? (
        <iframe
          src={`https://www.loom.com/embed/${id}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 flex h-full w-full items-center justify-center bg-surface text-left"
        >
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-line-gold"
          />
          <span className="relative flex flex-col items-center gap-flow-m px-card-m text-center md:gap-flow md:px-card">
            <span className="flex h-[64px] w-[64px] items-center justify-center rounded-[32px] bg-accent transition duration-ui ease-ui group-hover:bg-accent-hover group-hover:-translate-y-px">
              <svg aria-hidden width="20" height="22" viewBox="0 0 20 22" className="ml-1 text-accent-on">
                <path d="M2 2l16 9-16 9V2z" fill="currentColor" />
              </svg>
            </span>
            <span className="flex flex-col gap-tight">
              <span className="text-label font-medium uppercase text-accent">Watch the overview</span>
              <span className="max-w-narrow text-s text-body">
                See how Capital Career Club builds and runs a job-search campaign.
              </span>
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
