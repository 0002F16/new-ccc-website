import {
  Section,
  Stack,
  Eyebrow,
  Display,
  Gold,
  Lede,
  CtaBlock,
  StatRow,
  Reveal,
  LoomEmbed,
  Label,
  type Stat,
} from '@/components/ui'

const stats: Stat[] = [
  { figure: '180+', label: 'Internationals placed in Poland' },
  { figure: '15M+ PLN', label: 'Earned by clients annually' },
  { figure: '1,000+', label: 'Job interviews landed in Poland' },
  { figure: '40–60 days', label: 'Average time to dream job offer' },
]

const LOOM_ID = 'ee574d181bb7444e84884afa81a9bc58'

export function ValueFirstHero() {
  return (
    <Section id="hero" width="page" className="md:!py-section-m">
      <Stack gap="flow">
        <Stack gap="flow" className="mx-auto w-full max-w-text items-center text-center">
          <Reveal>
            <Eyebrow hairline={false}>For experienced internationals in Poland</Eyebrow>
          </Reveal>

          <Reveal delay={0.04}>
            <Display as="h1" size="xl">
              <span className="block whitespace-nowrap">Get the role your</span>
              <span className="block whitespace-nowrap">
                experience has <Gold>earned.</Gold>
              </span>
            </Display>
          </Reveal>

          <Reveal delay={0.08}>
            <Lede>
              We turn your track record into a focused job-search campaign—stronger positioning,
              consistent access to the right employers, and sharper performance when interviews
              arrive.
            </Lede>
          </Reveal>
        </Stack>

        <Reveal delay={0.12} className="mx-auto w-full max-w-structure">
          <div className="flex flex-col gap-tight">
            <LoomEmbed
              id={LOOM_ID}
              title="How Capital Career Club runs an end-to-end job-search campaign"
            />
            <p className="text-center text-caption text-muted">Watch the overview here.</p>
          </div>
        </Reveal>

        <Stack gap="flow" className="mx-auto w-full max-w-text items-center text-center">
          <Reveal delay={0.16} className="w-full">
            <div className="grid gap-tight border-y border-line py-tight sm:grid-cols-3">
              <div className="flex flex-col items-center gap-tight">
                <Label className="text-micro">Built for</Label>
                <p className="text-caption text-ink">3+ years of experience</p>
              </div>
              <div className="flex flex-col items-center gap-tight">
                <Label className="text-micro">We operate</Label>
                <p className="text-caption text-ink">The search campaign</p>
              </div>
              <div className="flex flex-col items-center gap-tight">
                <Label className="text-micro">You own</Label>
                <p className="text-caption text-ink">The interviews and decisions</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <CtaBlock />
          </Reveal>
        </Stack>

        <Reveal delay={0.24} className="w-full">
          <StatRow
            stats={stats}
            className="w-full justify-center"
            data-claim="unverified-live-site-metrics"
          />
        </Reveal>
      </Stack>
    </Section>
  )
}
