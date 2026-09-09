import { TwoSituations } from '@/components/sections/02-two-situations'
import { WhatThisIs } from '@/components/sections/03-what-this-is'
import { ThreeBottlenecks } from '@/components/sections/04-three-bottlenecks'
import { Outcomes } from '@/components/sections/07-outcomes'
import { TheWork } from '@/components/sections/09-the-work'
import { DivisionOfLabour } from '@/components/sections/14-division-of-labour'
import { Fee } from '@/components/sections/16-fee'
import { Guarantees } from '@/components/sections/17-guarantees'
import { FaqSection } from '@/components/sections/19-faq'
import { DaySeven } from '@/components/sections/20-day-seven'
import { Apply } from '@/components/sections/21-apply'
import { Footer } from '@/components/sections/22-footer'
import { MovementRule, StickyCta } from '@/components/ui'
import type { HeroVariant } from './hero-variants'
import { HeroVariantView } from './HeroVariant'

export function LandingPage({ variant }: { variant: HeroVariant }) {
  return (
    <>
      <main>
        <HeroVariantView variant={variant} />
        <TwoSituations />
        <WhatThisIs />

        <MovementRule />

        <ThreeBottlenecks />
        <Outcomes />

        <MovementRule />

        <TheWork />
        <DivisionOfLabour />

        <MovementRule />

        <Fee />
        <Guarantees />
        <FaqSection />

        <MovementRule />

        <DaySeven />
        <Apply />
      </main>
      <Footer />
      <StickyCta line={variant.stickyLine} />
    </>
  )
}
