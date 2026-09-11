'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { DashboardHeatmap, HeatmapLayout } from '@/lib/analytics/store'

const LAYOUT_WIDTHS: Record<HeatmapLayout, number> = {
  mobile: 390,
  tablet: 900,
  desktop: 1200,
  wide: 1440,
}

function zone(x: number, y: number) {
  const horizontal = x < 7 ? 'left' : x < 13 ? 'centre' : 'right'
  const vertical = y < 7 ? 'upper' : y < 13 ? 'middle' : 'lower'
  return `${vertical} ${horizontal}`
}

export function HeatmapOverlay({
  data,
  section,
  layout,
  kind,
}: {
  data: DashboardHeatmap
  section: string
  layout: HeatmapLayout
  kind: 'move' | 'click'
}) {
  const frame = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [imageMissing, setImageMissing] = useState(false)
  const maximum = Math.max(...data.bins.map((bin) => bin.value), 0)
  const description = useMemo(() => {
    if (!data.bins.length) return 'No interaction samples in this selection.'
    const peak = data.peak ? ` Peak density is in the ${zone(data.peak.x, data.peak.y)} of the section.` : ''
    return `${data.sampledSessions} sampled sessions across ${data.viewers} section viewers.${peak}`
  }, [data])

  useEffect(() => {
    const element = frame.current
    const target = canvas.current
    if (!element || !target) return
    const draw = () => {
      const width = Math.max(1, Math.round(element.clientWidth))
      const height = Math.max(1, Math.round(element.clientHeight))
      const ratio = Math.max(0.5, Math.min(window.devicePixelRatio || 1, 2, 16_000 / Math.max(width, height)))
      target.width = Math.round(width * ratio)
      target.height = Math.round(height * ratio)
      target.style.width = `${width}px`
      target.style.height = `${height}px`
      const context = target.getContext('2d')
      if (!context) return
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, width, height)
      context.globalCompositeOperation = 'lighter'
      if (!maximum) return
      const radiusX = (width / 20) * 2.8
      const radiusY = (height / 20) * 2.8
      for (const bin of data.bins) {
        const x = ((bin.x + 0.5) / 20) * width
        const y = ((bin.y + 0.5) / 20) * height
        const strength = Math.max(0.12, Math.sqrt(bin.value / maximum))
        context.save()
        context.translate(x, y)
        context.scale(radiusX, radiusY)
        const gradient = context.createRadialGradient(0, 0, 0, 0, 0, 1)
        gradient.addColorStop(0, `rgba(216,180,63,${0.74 * strength})`)
        gradient.addColorStop(0.34, `rgba(201,162,39,${0.42 * strength})`)
        gradient.addColorStop(1, 'rgba(201,162,39,0)')
        context.fillStyle = gradient
        context.fillRect(-1, -1, 2, 2)
        context.restore()
      }
    }
    const observer = new ResizeObserver(draw)
    observer.observe(element)
    draw()
    return () => observer.disconnect()
  }, [data.bins, maximum])

  const screenshot = `/analytics/sections/${layout}-${section}.jpg`
  return (
    <div>
      <div
        className="max-h-[72vh] overflow-auto rounded border border-line bg-sunken shadow-panel"
        role="img"
        aria-label={`${kind === 'move' ? 'Mouse attention' : 'Click and tap'} heatmap for ${section}. ${description}`}
      >
        <div ref={frame} className="relative mx-auto min-h-[220px]" style={{ maxWidth: LAYOUT_WIDTHS[layout] }}>
          {!imageMissing && (
            // Generated from this site by scripts/analytics-snapshots.mjs.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={screenshot}
              alt=""
              width={LAYOUT_WIDTHS[layout]}
              onError={() => setImageMissing(true)}
              className="block h-auto w-full opacity-60 grayscale-[.2]"
            />
          )}
          {imageMissing && (
            <div className="grid min-h-[260px] place-items-center px-card text-center text-s text-muted">
              Run the analytics snapshot command to generate this section backdrop.
            </div>
          )}
          <canvas ref={canvas} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
          {!data.bins.length && (
            <div className="absolute inset-0 grid place-items-center bg-ground/80 px-card text-center">
              <div>
                <p className="font-serif text-h3-m text-ink">No density to draw yet</p>
                <p className="mt-tight text-s text-muted">Try a longer window or another layout.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-tight flex flex-col gap-tight text-caption text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{data.sampledSessions} sampled · {data.viewers} viewed this section · {Math.round(data.coverage * 100)}% coverage</p>
        <div className="flex items-center gap-tight" aria-label="Heatmap density from low to high">
          <span>Low</span>
          <span className="h-[8px] w-[120px] rounded-badge bg-[linear-gradient(90deg,rgba(201,162,39,.08),rgba(201,162,39,.85))]" />
          <span>High</span>
        </div>
      </div>
      {data.peak && (
        <p className="mt-tight text-caption text-body">
          Peak zone: <span className="text-ink">{zone(data.peak.x, data.peak.y)}</span>
          {' · '}{kind === 'click'
            ? `${Math.round(data.peak.value * 100)}% of section viewers clicked in this cell`
            : `${data.peak.value.toFixed(1)} average seconds per sampled session`}
        </p>
      )}
    </div>
  )
}
