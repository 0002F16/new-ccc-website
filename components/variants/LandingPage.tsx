import { TwoSituations } from '@/components/sections/02-two-situations'
import { ThreeBottlenecks } from '@/components/sections/04-three-bottlenecks'
import { Outcomes } from '@/components/sections/07-outcomes'
import { FaqSection } from '@/components/sections/19-faq'
import { FinalCta } from '@/components/sections/23-final-cta'
import { MovementRule } from '@/components/ui'
import type { HeroVariant } from './hero-variants'
import { HeroVariantView } from './HeroVariant'

export function LandingPage({ variant }: { variant: HeroVariant }) {
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

        <FinalCta />
      </main>
    </>
  )
}
