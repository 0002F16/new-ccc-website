import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LandingPage } from '@/components/variants/LandingPage'
import { getRoutedHeroVariant, routedHeroVariants } from '@/components/variants/hero-variants'

export function generateStaticParams() {
  return routedHeroVariants.map((variant) => ({ slug: variant.path.split('/').pop()! }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const variant = getRoutedHeroVariant(params.slug)
  if (!variant) return {}

  return {
    title: `${variant.name} hero | Capital Career Club`,
    description: variant.lede,
    robots: { index: false, follow: false },
  }
}

export default function VariantPage({ params }: { params: { slug: string } }) {
  const variant = getRoutedHeroVariant(params.slug)
  if (!variant) notFound()

  return <LandingPage variant={variant} />
}
