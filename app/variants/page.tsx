import type { Metadata } from 'next'
import { VariantStudio } from '@/components/variants/VariantStudio'
import { getHeroVariant, type HeroVariantId } from '@/components/variants/hero-variants'

export const metadata: Metadata = {
  title: 'Hero Variant Studio | Capital Career Club',
  description: 'Local review studio for Capital Career Club landing-page hero experiments.',
  robots: { index: false, follow: false },
}

export default function VariantsPage({ searchParams }: { searchParams: { v?: string } }) {
  const requested = searchParams.v
  const initialVariantId = (requested && getHeroVariant(requested) ? requested : 'value-first') as HeroVariantId

  return <VariantStudio initialVariantId={initialVariantId} />
}
