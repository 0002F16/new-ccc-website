import { cx } from './cx'

/**
 * Work-product plate — the artefact centred on a surface panel with 24px of dark
 * padding on all sides. Never full-bleed a white screenshot; never tint, overlay
 * or recolour the artefact. It is evidence.
 */
export function WorkProductPlate({
  src,
  alt,
  caption,
  className,
}: {
  src: string
  alt: string
  caption: React.ReactNode
  className?: string
}) {
  return (
    <figure className={cx('flex flex-col gap-tight', className)}>
      <div className="rounded border border-line bg-surface p-[24px] shadow-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full" />
      </div>
      <figcaption className="text-caption text-muted">{caption}</figcaption>
    </figure>
  )
}
