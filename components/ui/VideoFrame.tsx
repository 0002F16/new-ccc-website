import { cx } from './cx'

/** 16:9 frame. The caption states what the video covers and its runtime. */
export function VideoFrame({
  caption,
  href,
  poster,
  className,
}: {
  caption: React.ReactNode
  href?: string
  poster?: { src: string; alt: string }
  className?: string
}) {
  return (
    <figure className={cx('mx-auto flex w-full max-w-structure flex-col gap-tight', className)}>
      <a
        href={href ?? '#'}
        className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-panel border border-line bg-surface shadow-panel"
        aria-label="Play the video"
      >
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster.src}
            alt={poster.alt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <span className="relative flex h-[64px] w-[64px] items-center justify-center rounded-[32px] bg-accent transition duration-ui ease-ui group-hover:bg-accent-hover">
          <svg
            aria-hidden
            width="20"
            height="22"
            viewBox="0 0 20 22"
            className="ml-1 text-accent-on"
          >
            <path d="M2 2l16 9-16 9V2z" fill="currentColor" />
          </svg>
        </span>
      </a>
      <figcaption className="text-caption text-muted">{caption}</figcaption>
    </figure>
  )
}
