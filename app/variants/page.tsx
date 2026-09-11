import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { VariantStudio } from '@/components/variants/VariantStudio'
import { getHeroVariant, type HeroVariantId } from '@/components/variants/hero-variants'

export const metadata: Metadata = {
  title: 'Hero Variant Studio | Capital Career Club',
  description: 'Local review studio for Capital Career Club landing-page hero experiments.',
  robots: { index: false, follow: false },
}

export default async function VariantsPage({ searchParams }: { searchParams: Promise<{ v?: string }> }) {
  const requested = (await searchParams).v
  if (requested === 'no-interviews') redirect('/variants?v=working')

  const initialVariantId = (requested && getHeroVariant(requested) ? requested : 'value-first') as HeroVariantId

  return <VariantStudio initialVariantId={initialVariantId} />
}
