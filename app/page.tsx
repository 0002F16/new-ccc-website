import { LandingPage } from '@/components/variants/LandingPage'
import { getHeroVariant } from '@/components/variants/hero-variants'

/**
 * Eleven sections, down from twenty-one (9 September 2026).
 *
 * Uncomposed, files kept on disk:
 *   03-what-this-is     cut — removed from the shared page by owner
 *   05-three-routes      cut — every claim in it is made elsewhere
 *   06-video             cut — the VSL is blocked on its claims audit
 *   08-you-stop-applying merged into 09-the-work (its founder statement survives)
 *   09-positioning · 10-applications · 11-outreach · 12-dossier · 13-negotiation
 *                        merged into 09-the-work
 *   15-search-review     no publishable copy; the review policy is undefined
 *   18-admissions        folded into the now-uncomposed 03-what-this-is
 */
export default function Page() {
  return <LandingPage variant={getHeroVariant('working')!} />
}
