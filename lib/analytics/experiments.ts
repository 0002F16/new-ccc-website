import type { ExperimentContext, ExperimentDefinition, HeroHeadlineValue, HeroLayout, OutcomesOrder } from './types'
import { deterministicBucket } from './signing'

/**
 * Experiments are reviewed in code. The dashboard can activate a registered
 * definition, but cannot create arbitrary page copy.
 */
export const EXPERIMENT_REGISTRY: readonly ExperimentDefinition[] = [
  {
    id: 'hero-headline-recognition-v1',
    version: 1,
    name: 'Hero headline: recognition vs. no interviews',
    hypothesis: 'A concrete no-interviews problem increases qualified CTA intent.',
    page: 'homepage',
    slot: 'hero.headline',
    primaryEvent: 'cta_click',
    allocation: { control: 50, treatment: 50 },
    variants: [
      {
        key: 'control',
        label: 'Recognition',
        value: {
          headline: ['You have the experience.', 'We turn it into your next role.'],
          accentPhrase: 'your next role.',
        },
      },
      {
        key: 'treatment',
        label: 'No interviews',
        value: {
          headline: ['Applying in Poland,', 'but still not getting interviews?'],
          accentPhrase: 'interviews?',
        },
      },
    ],
  },
  {
    id: 'outcomes-videos-first-v1',
    version: 1,
    name: 'Outcomes: videos before the screenshot wall',
    hypothesis: 'Putting the filmed testimonials above the screenshot wall gets more visitors to watch one.',
    page: 'homepage',
    slot: 'outcomes.order',
    primaryEvent: 'video_start',
    primarySection: 'outcomes',
    allocation: { control: 50, treatment: 50 },
    variants: [
      { key: 'control', label: 'Wall first', value: { order: 'wall-first' } },
      { key: 'treatment', label: 'Videos first', value: { order: 'videos-first' } },
    ],
  },
  {
    id: 'hero-no-video-v1',
    version: 1,
    name: 'Hero: current vs. new (no video, new headline, large metrics)',
    hypothesis: 'An editorial no-video hero with a pay-off headline and large metrics raises CTA clicks.',
    page: 'homepage',
    slot: 'hero.layout',
    primaryEvent: 'cta_click',
    primarySection: 'hero',
    allocation: { control: 50, treatment: 50 },
    variants: [
      { key: 'control', label: 'Current hero', value: { layout: 'video' } },
      { key: 'treatment', label: 'New hero', value: { layout: 'no-video' } },
    ],
  },
]

export function getExperimentDefinition(id: string, version?: number) {
  return EXPERIMENT_REGISTRY.find(
    (definition) => definition.id === id && (version === undefined || definition.version === version),
  )
}

export function assignExperiment(
  visitorId: string | null,
  definition: ExperimentDefinition | null,
): ExperimentContext {
  if (!visitorId || !definition) return null
  const variantKey = deterministicBucket(visitorId, `${definition.id}:${definition.version}`) < definition.allocation.control * 100
    ? 'control'
    : 'treatment'
  return { experimentId: definition.id, version: definition.version, variantKey }
}

export function experimentHeroCopy(
  definition: ExperimentDefinition | null,
  context: ExperimentContext,
): HeroHeadlineValue | null {
  if (!definition || !context || definition.slot !== 'hero.headline') return null
  return definition.variants.find((variant) => variant.key === context.variantKey)?.value ?? null
}

export function experimentOutcomesOrder(
  definition: ExperimentDefinition | null,
  context: ExperimentContext,
): OutcomesOrder {
  if (!definition || !context || definition.slot !== 'outcomes.order') return 'wall-first'
  return definition.variants.find((variant) => variant.key === context.variantKey)?.value.order ?? 'wall-first'
}

export function experimentHeroLayout(
  definition: ExperimentDefinition | null,
  context: ExperimentContext,
): HeroLayout {
  if (!definition || !context || definition.slot !== 'hero.layout') return 'no-video'
  return definition.variants.find((variant) => variant.key === context.variantKey)?.value.layout ?? 'no-video'
}
