import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LandingPage } from '@/components/variants/LandingPage'
import { getRoutedHeroVariant, routedHeroVariants } from '@/components/variants/hero-variants'

export function generateStaticParams() {
  return routedHeroVariants.map((variant) => ({ slug: variant.path.split('/').pop()! }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const variant = getRoutedHeroVariant(slug)
  if (!variant) return {}

  return {
    title: `${variant.name} hero | Capital Career Club`,
    description: variant.lede,
    robots: { index: false, follow: false },
  }
}

export default async function VariantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const variant = getRoutedHeroVariant(slug)
  if (!variant) notFound()

  return <LandingPage variant={variant} />
}
