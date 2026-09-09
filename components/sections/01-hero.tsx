import {
  Section,
  Stack,
  Eyebrow,
  Display,
  Gold,
  Lede,
  ChipRow,
  CtaBlock,
  StatRow,
  Reveal,
  type Chip,
  type Stat,
} from '@/components/ui'

/**
 * Movement I · 1. Hero.
 *
 * The page's only <h1> and its only display-xl. Centred 720px prose column.
 *
 * The stat row above the headline is owner-instructed (9 September 2026) and
 * knowingly breaks the claim rules that forbid placement counts and income
 * figures as proof. Both figures come from the live site. Neither is verified —
 * the CRM records 27 "Won" sales rather than placements, and the founder's
 * YouTube bio states 14M against the site's 15M. Recorded in
 * docs/2026-09-09-build-state.md; do not quietly "fix" either number here.
 *
 * The chip "you approve every application" stays cut: [CONFIRM APPLICATION
 * APPROVAL] is open, and on the source documents the claim appears to be false.
 */
const stats: Stat[] = [
  { figure: '180+', label: 'Internationals placed in Poland' },
  { figure: '15M+ PLN', label: 'Earned by clients annually' },
  { figure: '1,000+', label: 'Job interviews landed in Poland' },
  { figure: '40–60 days', label: 'Average time to dream job offer' },
]

const chips: Chip[] = [
  { label: 'Not coaching. We do the work.', href: '#what-this-is' },
  { label: '3+ years of experience required', href: '#fit-criteria' },
  { label: '6,000 PLN to start', href: '#fee' },
]

export function Hero() {
  return (
    <Section id="hero" width="structure" className="md:!py-section-m">
      <Stack gap="block" className="items-center text-center">
        <Stack gap="flow" className="w-full items-center text-center">
          <Reveal className="w-full">
            <div className="flex flex-col items-center gap-tight">
              <Eyebrow hairline={false}>Done for you · Poland · 3+ years</Eyebrow>
              <Display as="h1" size="xl">
                <span className="block">You have the experience.</span>
                <span className="block md:whitespace-nowrap">
                  Your job search should <Gold>reflect it</Gold>.
                </span>
              </Display>
            </div>
          </Reveal>

          <Reveal delay={0.04} className="max-w-text">
            <Lede>
              The only end-to-end career engineering system built for internationals in Poland. We
              rebuild your CV and LinkedIn, run the applications and outreach every week, and get
              you ready for every interview.
            </Lede>
          </Reveal>

          <Reveal delay={0.08} className="max-w-text">
            <ChipRow chips={chips} />
          </Reveal>
        </Stack>

        <Reveal delay={0.12}>
          <CtaBlock note="Four questions, then a 30-minute call. We turn down more applicants than we accept." />
        </Reveal>

        <Reveal delay={0.16} className="w-full">
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
