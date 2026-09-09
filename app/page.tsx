import { LandingPage } from '@/components/variants/LandingPage'
import { getHeroVariant } from '@/components/variants/hero-variants'

/**
 * Six sections, down from twenty-one (9 September 2026), down to five on
 * 10 September 2026, plus the closing CTA added back the same day.
 *
 * 23-final-cta is not a deck section. It carries the half of § 21 that stands
 * without the application form, and it owns `id="apply"` so the hero's button
 * resolves. 21-apply supersedes it once counsel's privacy notice and a
 * confirmed booking URL land.
 *
 * Uncomposed, files kept on disk:
 *   03-what-this-is     cut — removed from the shared page by owner
 *   05-three-routes      cut — every claim in it is made elsewhere
 *   06-video             cut — the VSL is blocked on its claims audit
 *   08-you-stop-applying merged into 09-the-work (its founder statement survives)
 *   09-positioning · 10-applications · 11-outreach · 12-dossier · 13-negotiation
 *                        merged into 09-the-work
 *   09-the-work          cut — removed from the shared page by owner
 *   15-search-review     no publishable copy; the review policy is undefined
 *   17-guarantees        cut — removed from the shared page by owner
 *   18-admissions        folded into the now-uncomposed 03-what-this-is
 *   21-apply             blocked on the privacy notice and the booking URL;
 *                        23-final-cta stands in until both land
 *   14-division-of-labour · 16-fee · 20-day-seven · 22-footer
 *                        cut — removed from the shared page by owner
 */
export default function Page() {
  return <LandingPage variant={getHeroVariant('working')!} />
}
