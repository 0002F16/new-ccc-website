export type HeroVariantStatus = 'baseline' | 'in-review' | 'draft' | 'approved'
export type HeroVariantLayout = 'baseline' | 'video-first'
export type HeroHeadlineSize = 'xl' | 'compact'

export type HeroQualifier = {
  label: string
  value: string
}

export type HeroChip = {
  label: string
  href: string
}

export type HeroVariant = {
  id: string
  name: string
  path: string
  hypothesis: string
  status: HeroVariantStatus
  layout: HeroVariantLayout
  eyebrow: string
  headline: readonly [string, string]
  accentPhrase: string
  headlineSize: HeroHeadlineSize
  lede: string
  chips?: readonly HeroChip[]
  qualifiers?: readonly HeroQualifier[]
  showVideo: boolean
  videoCaption?: string
  ctaNote?: string
  stickyLine: string
}

const defaultQualifiers: readonly HeroQualifier[] = [
  { label: 'Built for', value: '3+ years of experience' },
  { label: 'We operate', value: 'The search campaign' },
  { label: 'You own', value: 'The interviews and decisions' },
]

export const heroVariants = [
  {
    id: 'baseline',
    name: 'Original baseline',
    path: '/',
    hypothesis: 'Recognition of existing experience establishes relevance before explaining the service.',
    status: 'baseline',
    layout: 'baseline',
    eyebrow: 'Done for you · Poland · 3+ years',
    headline: ['You have the experience.', 'Your job search should reflect it.'],
    accentPhrase: 'reflect it',
    headlineSize: 'xl',
    lede:
      'The only end-to-end career engineering system built for internationals in Poland. We rebuild your CV and LinkedIn, run the applications and outreach every week, and get you ready for every interview.',
    chips: [
      { label: 'Not coaching. We do the work.', href: '#what-this-is' },
      { label: '3+ years of experience required', href: '#fit-criteria' },
      { label: '6,000 PLN to start', href: '#fee' },
    ],
    showVideo: false,
    ctaNote: 'Four questions, then a 30-minute call. We turn down more applicants than we accept.',
    stickyLine: 'A job-search team for experienced internationals in Poland.',
  },
  {
    id: 'value-first',
    name: 'Value first',
    path: '/value-first',
    hypothesis: 'Aspirational value attracts ambitious professionals before the delivery model is introduced.',
    status: 'in-review',
    layout: 'video-first',
    eyebrow: 'For experienced internationals in Poland',
    headline: ['Get the role your', 'experience has earned.'],
    accentPhrase: 'earned.',
    headlineSize: 'xl',
    lede:
      'We turn your track record into a focused job-search campaign—stronger positioning, consistent access to the right employers, and sharper performance when interviews arrive.',
    qualifiers: defaultQualifiers,
    showVideo: true,
    videoCaption: 'Watch the overview here.',
    stickyLine: 'A serious search campaign for experienced internationals in Poland.',
  },
  {
    id: 'no-interviews',
    name: 'No interviews',
    path: '/variants/no-interviews',
    hypothesis: 'The most common observed pain creates immediate recognition for active job seekers.',
    status: 'draft',
    layout: 'video-first',
    eyebrow: 'For experienced internationals in Poland',
    headline: ['Applying in Poland,', 'but still not getting interviews?'],
    accentPhrase: 'interviews?',
    headlineSize: 'compact',
    lede:
      'You have a professional track record. We help the right employers see it through sharper positioning, targeted applications, direct outreach, and preparation for every conversation.',
    qualifiers: defaultQualifiers,
    showVideo: true,
    videoCaption: 'See how the search campaign works.',
    stickyLine: 'Turn strong experience into a search employers can recognise.',
  },
  {
    id: 'career-progression',
    name: 'Career progression',
    path: '/variants/career-progression',
    hypothesis: 'Progression language resonates with employed professionals who feel underused or stuck.',
    status: 'draft',
    layout: 'video-first',
    eyebrow: 'For experienced internationals in Poland',
    headline: ['Your next role should', 'build on your experience.'],
    accentPhrase: 'build on',
    headlineSize: 'compact',
    lede:
      'You do not need to start over to move forward. We build a focused search around what you have already achieved, then take it to employers where it can carry weight.',
    qualifiers: defaultQualifiers,
    showVideo: true,
    videoCaption: 'See how the search campaign works.',
    stickyLine: 'Make your next role build on the experience you already have.',
  },
  {
    id: 'second-shift',
    name: 'The second shift',
    path: '/variants/second-shift',
    hypothesis: 'Time-pressure framing makes the operational value tangible for employed candidates.',
    status: 'draft',
    layout: 'video-first',
    eyebrow: 'For experienced internationals in Poland',
    headline: ["Your job search shouldn't", 'need a second shift.'],
    accentPhrase: 'second shift.',
    headlineSize: 'compact',
    lede:
      'You bring the experience and make the career decisions. Our team handles the positioning, applications, outreach, tracking, and interview preparation that a serious search demands every week.',
    qualifiers: defaultQualifiers,
    showVideo: true,
    videoCaption: 'See what the team takes off your plate.',
    stickyLine: 'Run a serious job search without adding a second shift.',
  },
  {
    id: 'interview-conversion',
    name: 'Interview conversion',
    path: '/variants/interview-conversion',
    hypothesis: 'A conversion-led message isolates the pain of opportunities repeatedly ending before an offer.',
    status: 'draft',
    layout: 'video-first',
    eyebrow: 'For experienced internationals in Poland',
    headline: ['Getting interviews,', 'but not the offer?'],
    accentPhrase: 'offer?',
    headlineSize: 'xl',
    lede:
      'We help you turn opportunity into a stronger performance—with company research, interviewer context, predicted questions, answers built from your history, and negotiation preparation.',
    qualifiers: defaultQualifiers,
    showVideo: true,
    videoCaption: 'See how preparation fits the wider search.',
    stickyLine: 'Turn interview opportunities into stronger performances.',
  },
  {
    id: 'hours-and-access',
    name: 'Hours and access',
    path: '/variants/hours-and-access',
    hypothesis: 'The founder’s core value proposition names the two constraints the service directly supplies.',
    status: 'draft',
    layout: 'video-first',
    eyebrow: 'For experienced internationals in Poland',
    headline: ['You have the ability.', 'We bring the hours and access.'],
    accentPhrase: 'hours and access.',
    headlineSize: 'compact',
    lede:
      'A stronger move takes consistent execution and reach beyond the same advertised roles. We supply both while you stay focused on the conversations and decisions only you can make.',
    qualifiers: defaultQualifiers,
    showVideo: true,
    videoCaption: 'See how the team runs the search.',
    stickyLine: 'Your ability, backed by the hours and access a serious search needs.',
  },
] as const satisfies readonly HeroVariant[]

export type HeroVariantId = (typeof heroVariants)[number]['id']

export const experimentVariants = heroVariants.filter(
  (variant) => variant.id !== 'baseline' && variant.id !== 'value-first',
)

export function getHeroVariant(id: string): HeroVariant | undefined {
  return heroVariants.find((variant) => variant.id === id)
}
