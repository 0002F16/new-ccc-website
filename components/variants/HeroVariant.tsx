import Image from 'next/image'
import {
  ChipRow,
  CtaBlock,
  Display,
  Eyebrow,
  Gold,
  Label,
  Lede,
  Reveal,
  Section,
  Stack,
  StatRow,
  VideoEmbed,
  type Chip,
  type Stat,
} from '@/components/ui'
import type { HeroVariant } from './hero-variants'

const stats: Stat[] = [
  { figure: '200+', label: 'Internationals placed in Poland' },
  { figure: '20M+ PLN', label: 'Earned by clients annually' },
  { figure: '2,000+', label: 'Job interviews landed in Poland' },
  { figure: '40–60 days', label: 'Average time to dream job offer' },
]

const YOUTUBE_ID = 'QpElUNDrkTc'

const clientAvatars = [
  {
    src: '/images/client-avatar-01.png',
    zoom: 1.72,
    faceX: 52,
    faceY: 36,
    hover: 'group-hover/client-avatars:-translate-y-[4px] group-hover/client-avatars:-rotate-[6deg] group-hover/client-avatars:scale-110',
  },
  {
    src: '/images/client-avatar-02.jpeg',
    zoom: 1.78,
    faceX: 52,
    faceY: 38,
    hover: 'group-hover/client-avatars:translate-x-[2px] group-hover/client-avatars:translate-y-[2px] group-hover/client-avatars:rotate-[3deg] group-hover/client-avatars:scale-105',
  },
  {
    src: '/images/client-avatar-03.png',
    zoom: 1.58,
    faceX: 50,
    faceY: 32,
    hover: 'group-hover/client-avatars:translate-x-[4px] group-hover/client-avatars:-translate-y-[3px] group-hover/client-avatars:-rotate-[2deg] group-hover/client-avatars:scale-105',
  },
  {
    src: '/images/client-avatar-04.jpeg',
    zoom: 1.42,
    faceX: 53,
    faceY: 37,
    hover: 'group-hover/client-avatars:translate-x-[6px] group-hover/client-avatars:translate-y-[2px] group-hover/client-avatars:rotate-[5deg] group-hover/client-avatars:scale-105',
  },
  {
    src: '/images/client-avatar-05.jpeg',
    zoom: 1.48,
    faceX: 49,
    faceY: 36,
    hover: 'group-hover/client-avatars:translate-x-[8px] group-hover/client-avatars:-translate-y-[2px] group-hover/client-avatars:-rotate-[3deg] group-hover/client-avatars:scale-105',
  },
] as const

function ClientAvatarStrip() {
  return (
    <div className="group/client-avatars flex shrink-0 items-center py-[4px]" aria-hidden>
      {clientAvatars.map(({ src, zoom, faceX, faceY, hover }, index) => (
        <div
          key={src}
          className={`relative size-[32px] overflow-hidden rounded-full border-2 border-ground bg-surface motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out ${hover} ${
            index === 0 ? '' : '-ml-[8px]'
          }`}
          style={{ zIndex: clientAvatars.length - index }}
        >
          <Image
            src={src}
            alt=""
            width={96}
            height={96}
            sizes="32px"
            priority
            className="absolute max-w-none object-cover"
            style={{
              width: `${zoom * 100}%`,
              height: `${zoom * 100}%`,
              left: `${50 - zoom * faceX}%`,
              top: `${50 - zoom * faceY}%`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

function Highlight({ line, phrase }: { line: string; phrase: string }) {
  const start = line.indexOf(phrase)
  if (start === -1) return line

  return (
    <>
      {line.slice(0, start)}
      <Gold>{phrase}</Gold>
      {line.slice(start + phrase.length)}
    </>
  )
}

function Headline({ variant }: { variant: HeroVariant }) {
  return (
    <Display as="h1" size={variant.headlineSize}>
      {variant.headline.map((line) => (
        <span
          key={line}
          className={variant.layout === 'baseline' ? 'block md:whitespace-nowrap' : 'block whitespace-nowrap'}
        >
          <Highlight line={line} phrase={variant.accentPhrase} />
        </span>
      ))}
    </Display>
  )
}

function HeroStats() {
  return (
    <StatRow
      stats={stats}
      className="w-full justify-center"
      data-claim="unverified-live-site-metrics"
    />
  )
}

function BaselineHero({ variant }: { variant: HeroVariant }) {
  return (
    <Section id="hero" width="structure" className="md:!py-section-m">
      <Stack gap="block" className="items-center text-center">
        <Stack gap="flow" className="w-full items-center text-center">
          <Reveal className="w-full">
            <div className="flex flex-col items-center gap-tight">
              <Eyebrow hairline={false}>{variant.eyebrow}</Eyebrow>
              <Headline variant={variant} />
            </div>
          </Reveal>

          <Reveal delay={0.04} className="max-w-text">
            <Lede>{variant.lede}</Lede>
          </Reveal>

          {variant.chips && (
            <Reveal delay={0.08} className="max-w-text">
              <ChipRow chips={variant.chips as Chip[]} />
            </Reveal>
          )}
        </Stack>

        <Reveal delay={0.12}>
          <CtaBlock analyticsId="hero" note={variant.ctaNote} />
        </Reveal>

        <Reveal delay={0.16} className="w-full">
          <HeroStats />
        </Reveal>
      </Stack>
    </Section>
  )
}

function VideoFirstHero({ variant }: { variant: HeroVariant }) {
  return (
    <Section id="hero" width="page" className="md:!py-section-m">
      <Stack gap="flow">
        <Stack gap="flow" className="mx-auto w-full max-w-text items-center text-center">
          <Reveal>
            <Eyebrow hairline={false}>{variant.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.04}>
            <Headline variant={variant} />
          </Reveal>

          <Reveal delay={0.08}>
            <Lede>{variant.lede}</Lede>
          </Reveal>
        </Stack>

        {variant.showVideo && (
          <Reveal delay={0.12} className="mx-auto w-full max-w-structure">
            <div className="flex flex-col gap-tight">
              <VideoEmbed
                id={YOUTUBE_ID}
                title="How to Get a zl20k/mo Job in 60 Days in Poland"
                poster="max"
                priority={variant.preloadVideo}
              />
              {variant.videoCaption && (
                <p className="text-center text-caption text-muted">{variant.videoCaption}</p>
              )}
            </div>
          </Reveal>
        )}

        <Stack gap="flow" className="mx-auto w-full max-w-text items-center text-center">
          {variant.qualifiers && (
            <Reveal delay={0.16} className="w-full">
              <div className="grid gap-tight border-y border-line py-tight sm:grid-cols-3">
                {variant.qualifiers.map((qualifier) => (
                  <div key={qualifier.label} className="flex flex-col items-center gap-tight">
                    <Label className="text-micro">{qualifier.label}</Label>
                    <p className="text-caption text-ink">{qualifier.value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={0.2}>
            <CtaBlock analyticsId="hero" note={variant.ctaNote} />
          </Reveal>
        </Stack>

        {variant.showStats !== false && (
          <Reveal delay={0.24} className="w-full">
            <HeroStats />
          </Reveal>
        )}
      </Stack>
    </Section>
  )
}

function SocialProofVideoHero({ variant }: { variant: HeroVariant }) {
  return (
    <Section id="hero" width="page" className="!py-block-m md:!py-block">
      <Stack gap="flow" className="items-center">
        {variant.socialProof && (
          <Reveal>
            <div className="flex min-h-[44px] max-w-narrow items-center gap-tight rounded border border-line bg-surface px-[16px] py-[8px] shadow-card">
              <ClientAvatarStrip />
              <span className="text-caption text-body">
                <span className="tnum font-serif text-h4 text-ink">
                  {variant.socialProof.figure}
                </span>{' '}
                {variant.socialProof.label}
              </span>
            </div>
          </Reveal>
        )}

        <Stack gap="flow" className="mx-auto w-full max-w-structure items-center text-center">
          <Reveal delay={0.04}>
            <Eyebrow hairline={false}>{variant.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <Headline variant={variant} />
          </Reveal>

          <Reveal delay={0.12} className="max-w-text">
            <Lede>{variant.lede}</Lede>
          </Reveal>

          {variant.bridgeLine && (
            <Reveal delay={0.16}>
              <p className="text-s text-ink">{variant.bridgeLine}</p>
            </Reveal>
          )}
        </Stack>

        {variant.showVideo && (
          <Reveal delay={0.2} className="mx-auto w-full max-w-structure">
            <div className="flex flex-col gap-tight">
              <VideoEmbed
                id={YOUTUBE_ID}
                title="How to Get a zl20k/mo Job in 60 Days in Poland"
                poster="max"
                priority={variant.preloadVideo}
              />
              {variant.videoCaption && (
                <p className="text-center text-caption text-muted">{variant.videoCaption}</p>
              )}
            </div>
          </Reveal>
        )}

        <Reveal delay={0.24}>
          <CtaBlock analyticsId="hero" note={variant.ctaNote} />
        </Reveal>

        {variant.showStats !== false && (
          <Reveal delay={0.28} className="w-full">
            <HeroStats />
          </Reveal>
        )}
      </Stack>
    </Section>
  )
}

export function HeroVariantView({ variant }: { variant: HeroVariant }) {
  if (variant.layout === 'baseline') return <BaselineHero variant={variant} />
  if (variant.layout === 'social-proof-video') return <SocialProofVideoHero variant={variant} />
  return <VideoFirstHero variant={variant} />
}
