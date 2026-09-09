import type { Metadata } from 'next'
import { LandingPage } from '@/components/variants/LandingPage'
import { getHeroVariant } from '@/components/variants/hero-variants'

export const metadata: Metadata = {
  title: 'Turn your experience into your next role | Capital Career Club',
  description:
    'A focused job-search campaign for experienced internationals in Poland: positioning, employer access, applications, outreach and interview preparation.',
}

export default function ValueFirstPage() {
  return <LandingPage variant={getHeroVariant('value-first')!} />
}
