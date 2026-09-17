import { ValuePropScroll } from '@/components/sections/02-value-prop-scroll'
import { Outcomes } from '@/components/sections/07-outcomes'
import { FaqSection } from '@/components/sections/19-faq'
import { ApplicationForm } from '@/components/sections/ApplicationForm'
import { MovementRule } from '@/components/ui'
import { AnalyticsTracker } from '@/components/analytics/AnalyticsTracker'
import type { ExperimentContext, OutcomesOrder } from '@/lib/analytics/types'
import type { HeroVariant } from './hero-variants'
import { HeroVariantView } from './HeroVariant'

export function LandingPage({
  variant,
  outcomesOrder = 'wall-first',
  analytics,
}: {
  variant: HeroVariant
  outcomesOrder?: OutcomesOrder
  analytics?: { enabled: boolean; heatmapSample: boolean; experiment: ExperimentContext }
}) {
  return (
    <>
      <main>
        <HeroVariantView variant={variant} />
        <ValuePropScroll />

        <MovementRule />

        <Outcomes order={outcomesOrder} />

        <MovementRule />

        <FaqSection />

        <MovementRule />

        <ApplicationForm />
      </main>
      {analytics && <AnalyticsTracker {...analytics} />}
    </>
  )
}
