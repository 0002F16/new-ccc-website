import {
  ChipRow,
  CtaBlock,
  Display,
  Eyebrow,
  Gold,
  Label,
  Lede,
  LoomEmbed,
  Reveal,
  Section,
  Stack,
  StatRow,
  type Chip,
  type Stat,
} from '@/components/ui'
import type { HeroVariant } from './hero-variants'

const stats: Stat[] = [
  { figure: '180+', label: 'Internationals placed in Poland' },
  { figure: '15M+ PLN', label: 'Earned by clients annually' },
  { figure: '1,000+', label: 'Job interviews landed in Poland' },
  { figure: '40–60 days', label: 'Average time to dream job offer' },
]

const LOOM_ID = 'ee574d181bb7444e84884afa81a9bc58'

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
          <CtaBlock note={variant.ctaNote} />
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
              <LoomEmbed
                id={LOOM_ID}
                title="How Capital Career Club runs an end-to-end job-search campaign"
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
            <CtaBlock note={variant.ctaNote} />
          </Reveal>
        </Stack>

        <Reveal delay={0.24} className="w-full">
          <HeroStats />
        </Reveal>
      </Stack>
    </Section>
  )
}

export function HeroVariantView({ variant }: { variant: HeroVariant }) {
  return variant.layout === 'baseline' ? (
    <BaselineHero variant={variant} />
  ) : (
    <VideoFirstHero variant={variant} />
  )
}
