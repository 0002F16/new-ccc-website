import { Hero } from '@/components/sections/01-hero'
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

/**
 * Twelve sections, down from twenty-one (9 September 2026).
 *
 * Uncomposed, files kept on disk:
 *   05-three-routes      cut — every claim in it is made elsewhere
 *   06-video             cut — the VSL is blocked on its claims audit
 *   08-you-stop-applying merged into 09-the-work (its founder statement survives)
 *   09-positioning · 10-applications · 11-outreach · 12-dossier · 13-negotiation
 *                        merged into 09-the-work
 *   15-search-review     no publishable copy; the review policy is undefined
 *   18-admissions        folded into 03-what-this-is
 */
export default function Page() {
  return (
    <>
      <main>
        {/* Movement I — Recognition: is this me, and what is being sold? */}
        <Hero />
        <TwoSituations />
        <WhatThisIs />

        <MovementRule />

        {/* Movement II — Why it hasn't worked. */}
        <ThreeBottlenecks />
        <Outcomes />

        <MovementRule />

        {/* Movement III — The work. */}
        <TheWork />
        <DivisionOfLabour />

        <MovementRule />

        {/* Movement IV — The commitment. */}
        <Fee />
        <Guarantees />
        <FaqSection />

        <MovementRule />

        {/* Movement V — The invitation. */}
        <DaySeven />
        <Apply />
      </main>
      <Footer />
      <StickyCta line="A job-search team for experienced internationals in Poland." />
    </>
  )
}
