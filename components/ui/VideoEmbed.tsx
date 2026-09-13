'use client'

import { useRef, useState } from 'react'
import { cx } from './cx'

type PosterQuality = 'hq' | 'max'
type Control = 'accent' | 'quiet'

// WebP first — roughly a third smaller than YouTube's JPEG. Each error steps to
// the next source: maxres is missing on some uploads, WebP on a few old ones.
function posterSources(id: string, quality: PosterQuality) {
  const hq = [
    `https://i.ytimg.com/vi_webp/${id}/hqdefault.webp`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  ]
  return quality === 'max'
    ? [`https://i.ytimg.com/vi_webp/${id}/maxresdefault.webp`, ...hq]
    : hq
}

function VideoPoster({
  src,
  control,
  interactive = false,
  loading = false,
  priority = false,
  onError,
}: {
  src: string
  control: Control
  interactive?: boolean
  loading?: boolean
  priority?: boolean
  onError: () => void
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onError={onError}
        className={cx(
          'absolute inset-0 h-full w-full object-cover transition-transform duration-ui-slow ease-ui',
          interactive && 'group-hover:scale-[1.015] group-focus-visible:scale-[1.015]',
        )}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={cx(
            'flex items-center justify-center transition duration-ui ease-ui group-active:scale-[.97]',
            control === 'accent'
              ? 'h-[64px] w-[64px] rounded-[32px] bg-accent group-hover:-translate-y-px group-hover:bg-accent-hover group-focus-visible:-translate-y-px group-focus-visible:bg-accent-hover'
              : 'h-[44px] w-[44px] rounded-[22px] border border-line bg-surface/90 group-hover:-translate-y-px group-hover:border-ink group-focus-visible:-translate-y-px group-focus-visible:border-ink',
          )}
        >
          <svg
            aria-hidden
            width={control === 'accent' ? 20 : 14}
            height={control === 'accent' ? 22 : 16}
            viewBox="0 0 20 22"
            className={cx(
              'ml-1 transition-transform duration-ui ease-ui group-hover:translate-x-[2px] group-focus-visible:translate-x-[2px]',
              control === 'accent' ? 'text-accent-on' : 'text-ink',
            )}
          >
            <path d="M2 2l16 9-16 9V2z" fill="currentColor" />
          </svg>
        </span>
      </span>
      {loading && (
        <span className="absolute bottom-tight left-1/2 -translate-x-1/2 rounded-badge bg-surface/90 px-[8px] py-[4px] text-label font-medium uppercase text-ink">
          Loading video
        </span>
      )}
    </>
  )
}

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
 * Both load as WebP; `posterSources` steps down to hq WebP, then hq JPEG, on error.
 */
export function VideoEmbed({
  id,
  title,
  control = 'accent',
  poster = 'hq',
  priority = false,
  className,
}: {
  id: string
  title: string
  control?: Control
  poster?: PosterQuality
  /** Load the poster eagerly and at high priority — for a video visible on arrival (e.g. the hero), never for a below-the-fold or grid tile. */
  priority?: boolean
  className?: string
}) {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const sources = posterSources(id, poster)
  const [posterIndex, setPosterIndex] = useState(0)
  const posterSrc = sources[posterIndex]
  const nextPoster = () => setPosterIndex((i) => Math.min(i + 1, sources.length - 1))
  const iframeRef = useRef<HTMLIFrameElement>(null)

  return (
    <div
      className={cx(
        'relative aspect-video w-full overflow-hidden rounded border border-line bg-surface',
        className,
      )}
    >
      {playing ? (
        <>
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => {
              setReady(true)
              iframeRef.current?.focus()
            }}
            className={cx(
              'absolute inset-0 h-full w-full border-0 transition-opacity duration-ui-slow ease-ui',
              ready ? 'opacity-100' : 'opacity-0',
            )}
          />
          <div
            aria-hidden
            className={cx(
              'pointer-events-none absolute inset-0 transition-opacity duration-ui-slow ease-ui',
              ready ? 'opacity-0' : 'opacity-100',
            )}
          >
            <VideoPoster
              src={posterSrc}
              control={control}
              loading
              priority={priority}
              onError={nextPoster}
            />
          </div>
          {!ready && (
            <span className="sr-only" role="status">
              Loading video
            </span>
          )}
        </>
      ) : (
        <button
          type="button"
          data-analytics-event="video_start"
          data-analytics-id={`video-${id}`}
          data-analytics-hesitation="true"
          data-analytics-outcome="media"
          onClick={() => {
            setReady(false)
            setPlaying(true)
          }}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          <VideoPoster
            src={posterSrc}
            control={control}
            interactive
            priority={priority}
            onError={nextPoster}
          />
        </button>
      )}
    </div>
  )
}
