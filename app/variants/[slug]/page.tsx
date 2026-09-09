import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LandingPage } from '@/components/variants/LandingPage'
import { experimentVariants, getHeroVariant } from '@/components/variants/hero-variants'

export function generateStaticParams() {
  return experimentVariants.map((variant) => ({ slug: variant.id }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const variant = getHeroVariant(params.slug)
  if (!variant || variant.path !== `/variants/${params.slug}`) return {}

  return {
    title: `${variant.name} hero | Capital Career Club`,
    description: variant.lede,
    robots: { index: false, follow: false },
  }
}

export default function VariantPage({ params }: { params: { slug: string } }) {
  const variant = getHeroVariant(params.slug)
  if (!variant || variant.path !== `/variants/${params.slug}`) notFound()

  return <LandingPage variant={variant} />
}
