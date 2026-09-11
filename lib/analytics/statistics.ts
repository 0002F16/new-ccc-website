export type ConversionStats = {
  visitors: number
  conversions: number
  rate: number
  lower: number
  upper: number
}

export type ExperimentComparison = {
  absoluteLift: number
  relativeLift: number | null
  differenceLower: number
  differenceUpper: number
}

export function wilsonInterval(conversions: number, visitors: number, z = 1.96): ConversionStats {
  if (visitors <= 0) return { visitors: 0, conversions: 0, rate: 0, lower: 0, upper: 0 }
  const rate = conversions / visitors
  const denominator = 1 + (z * z) / visitors
  const center = (rate + (z * z) / (2 * visitors)) / denominator
  const margin =
    (z / denominator) *
    Math.sqrt((rate * (1 - rate)) / visitors + (z * z) / (4 * visitors * visitors))
  return {
    visitors,
    conversions,
    rate,
    lower: Math.max(0, center - margin),
    upper: Math.min(1, center + margin),
  }
}

/** Newcombe interval for the difference between two proportions, using Wilson bounds. */
export function compareConversions(control: ConversionStats, treatment: ConversionStats): ExperimentComparison {
  const absoluteLift = treatment.rate - control.rate
  return {
    absoluteLift,
    relativeLift: control.rate > 0 ? absoluteLift / control.rate : null,
    differenceLower: treatment.lower - control.upper,
    differenceUpper: treatment.upper - control.lower,
  }
}

export function experimentVerdict(control: ConversionStats, treatment: ConversionStats) {
  const enoughData =
    control.visitors >= 100 &&
    treatment.visitors >= 100 &&
    control.conversions >= 20 &&
    treatment.conversions >= 20
  if (!enoughData) return 'Collecting data' as const
  const difference = compareConversions(control, treatment)
  if (difference.differenceLower > 0) return 'Treatment ahead' as const
  if (difference.differenceUpper < 0) return 'Control ahead' as const
  return 'No clear difference' as const
}
