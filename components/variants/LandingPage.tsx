import { TwoSituations } from '@/components/sections/02-two-situations'
import { ThreeBottlenecks } from '@/components/sections/04-three-bottlenecks'
import { Outcomes } from '@/components/sections/07-outcomes'
import { FaqSection } from '@/components/sections/19-faq'
import { ApplicationForm } from '@/components/sections/ApplicationForm'
import { MovementRule } from '@/components/ui'
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker'
import type { ExperimentContext } from '@/lib/analytics/types'
import type { HeroVariant } from './hero-variants'
import { HeroVariantView } from './HeroVariant'

export function LandingPage({
  variant,
  analytics,
}: {
  variant: HeroVariant
  analytics?: { enabled: boolean; heatmapSample: boolean; experiment: ExperimentContext }
}) {
  return (
    <>
      <main>
        <HeroVariantView variant={variant} />
        <TwoSituations />

        <MovementRule />

        <ThreeBottlenecks />
        <Outcomes />

        <MovementRule />

        <FaqSection />

        <MovementRule />

        <ApplicationForm />
      </main>
      {analytics && <AnalyticsTracker {...analytics} />}
    </>
  )
}
