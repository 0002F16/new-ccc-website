export type Point = { at: number; x: number; y: number; target: string }

export function heatmapCell(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number },
) {
  if (rect.width <= 0 || rect.height <= 0) return null
  return {
    x: Math.max(0, Math.min(19, Math.floor(((clientX - rect.left) / rect.width) * 20))),
    y: Math.max(0, Math.min(19, Math.floor(((clientY - rect.top) / rect.height) * 20))),
  }
}

export function rageCluster(points: Point[], current: Point) {
  return points.filter(
    (point) =>
      current.at - point.at <= 2_000 &&
      point.target === current.target &&
      Math.hypot(point.x - current.x, point.y - current.y) <= 40,
  )
}

export function isHesitation(elapsedMs: number, movementPx: number, clicked: boolean) {
  return !clicked && elapsedMs >= 1_500 && movementPx < 24
}

export type ExpectedOutcome = 'scroll' | 'navigate' | 'disclosure' | 'media'

export function expectedOutcomeSucceeded(
  expected: ExpectedOutcome,
  before: { scrollY: number; hash: string; expanded: string | null },
  after: { scrollY: number; hash: string; expanded: string | null; elementPresent: boolean; pageHidden: boolean },
) {
  if (expected === 'scroll') return Math.abs(after.scrollY - before.scrollY) > 16 || after.hash !== before.hash
  if (expected === 'disclosure') return after.expanded !== before.expanded
  if (expected === 'media') return !after.elementPresent
  return after.pageHidden
}

/** 1% steps to 25%, so a section many viewports tall still reports as it scrolls. */
export const SECTION_VIEW_THRESHOLDS = Array.from({ length: 26 }, (_, index) => index / 100)

/**
 * A section counts as viewed once a quarter of it is on screen, or once it
 * fills half the viewport. The second rule is for sections taller than four
 * viewports, which can never be a quarter visible.
 */
export function sectionCountsAsViewed(intersectionRatio: number, visibleHeight: number, viewportHeight: number) {
  return intersectionRatio >= 0.25 || (viewportHeight > 0 && visibleHeight >= viewportHeight * 0.5)
}
