'use client'

import { useEffect, useRef, useState } from 'react'
import { cx } from './cx'

/**
 * VideoEmbed — click-to-play facade for a YouTube video.
 *
 * Anatomy: the poster frame with a 64px `accent` play control; on activation the
 * poster is replaced in place by a youtube-nocookie iframe. Nothing is requested
 * from YouTube until the viewer asks for it, so the page sets no third-party
 * cookies on arrival and loads no player script.
 *
 * Never autoplays on arrival. Never a black rectangle for a poster. The control
 * is a real <button>, so it is keyboard operable and takes the base focus ring.
 *
 * `control` is an accent-budget decision, not a style preference:
 *   accent — 64px gold disc. ONE video on a screen, never a grid.
 *   quiet  — 44px outlined disc. Grids. Nine gold discs would be nine accents.
 *
 * `alt=""` on the poster is correct ONLY because every use sites the title as
 * adjacent live text. Keep it that way.
 *
 * `poster` is a quality choice, not a style one:
 *   hq  — 480×360, and YouTube letterboxes 16:9 into it. Fine for a grid tile,
 *         where `object-cover` crops the bars off and nothing is upscaled.
 *   max — 1280×720, true 16:9. Required for a featured video at `w-structure`,
 *         where hq would be upscaled more than twice and look it. Costs ~200KB,
 *         so never use it for a grid: nine of them is 1.8MB of poster.
 * `maxresdefault` is absent for some uploads, so it falls back to hq on error.
 */
export function VideoEmbed({
  id,
  title,
  control = 'accent',
  poster = 'hq',
  className,
}: {
  id: string
  title: string
  control?: 'accent' | 'quiet'
  poster?: 'hq' | 'max'
  className?: string
}) {
  const [playing, setPlaying] = useState(false)
  const [posterQuality, setPosterQuality] = useState(poster)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Activating a tile otherwise drops focus to <body>, so the next Tab restarts
  // from the top of the page. Cross-origin means we can focus the frame but not
  // inside it, which is enough to keep tab order sane.
  useEffect(() => {
    if (playing) iframeRef.current?.focus()
  }, [playing])

  return (
    <div
      className={cx(
        'relative aspect-video w-full overflow-hidden rounded border border-line bg-surface',
        className,
      )}
    >
      {playing ? (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/${posterQuality === 'max' ? 'maxresdefault' : 'hqdefault'}.jpg`}
            alt=""
            loading="lazy"
            onError={() => setPosterQuality('hq')}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span
              className={cx(
                'flex items-center justify-center transition duration-ui ease-ui',
                control === 'accent'
                  ? 'h-[64px] w-[64px] rounded-[32px] bg-accent group-hover:bg-accent-hover'
                  : 'h-[44px] w-[44px] rounded-[22px] border border-line bg-surface/90 group-hover:border-ink',
              )}
            >
              <svg
                aria-hidden
                width={control === 'accent' ? 20 : 14}
                height={control === 'accent' ? 22 : 16}
                viewBox="0 0 20 22"
                className={cx('ml-1', control === 'accent' ? 'text-accent-on' : 'text-ink')}
              >
                <path d="M2 2l16 9-16 9V2z" fill="currentColor" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
