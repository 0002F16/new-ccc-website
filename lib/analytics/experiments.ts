import type { ExperimentContext, ExperimentDefinition } from './types'
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
): { headline: readonly [string, string]; accentPhrase: string } | null {
  if (!definition || !context) return null
  return definition.variants.find((variant) => variant.key === context.variantKey)?.value ?? null
}
