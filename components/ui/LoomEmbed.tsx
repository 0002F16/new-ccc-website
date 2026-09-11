'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { cx } from './cx'

function HeroPoster() {
  return (
    <Image
      src="/images/hero-video-thumbnail.jpg"
      alt=""
      fill
      priority
      sizes="(min-width: 1024px) 1040px, calc(100vw - 32px)"
      className="object-cover"
    />
  )
}

/**
 * A click-to-play Loom facade. Its local poster is priority-loaded with the hero,
 * while the Loom player itself is not requested until the visitor activates it.
 */
export function LoomEmbed({
  id,
  title,
  eager = false,
  className,
}: {
  id: string
  title: string
  eager?: boolean
  className?: string
}) {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const showPlayer = playing || eager

  return (
    <div
      className={cx(
        'relative aspect-video w-full overflow-hidden rounded-panel border border-line bg-surface shadow-panel',
        className,
      )}
    >
      {showPlayer ? (
        <>
          <iframe
            ref={iframeRef}
            src={`https://www.loom.com/embed/${id}?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&autoplay=${playing ? '1' : '0'}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => {
              setReady(true)
              if (playing) iframeRef.current?.focus()
            }}
            className={cx(
              'absolute inset-0 h-full w-full border-0 transition-opacity duration-ui-slow ease-ui',
              eager || ready ? 'opacity-100' : 'opacity-0',
            )}
          />
          {!eager && (
            <>
              <div
                aria-hidden
                className={cx(
                  'pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-surface transition-opacity duration-ui-slow ease-ui',
                  ready ? 'opacity-0' : 'opacity-100',
                )}
              >
                <HeroPoster />
              </div>
              {!ready && (
                <span className="sr-only" role="status">
                  Loading video
                </span>
              )}
            </>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          data-analytics-event="video_start"
          data-analytics-id="hero-video"
          data-analytics-hesitation="true"
          data-analytics-outcome="media"
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden bg-surface text-left"
        >
          <HeroPoster />
        </button>
      )}
    </div>
  )
}
