import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Call booking · Capital Career Club', robots: { index: false, follow: false } }

const messages = {
  booked: {
    eyebrow: 'Your call is set', title: 'Your call is booked.',
    body: 'Check your email for the Calendly confirmation and calendar invitation. We look forward to speaking with you.',
  },
  expired: {
    eyebrow: 'Booking window closed', title: 'The 48-hour window has closed.',
    body: 'Your personal booking link has expired. Reply to your acceptance email if you need help or want to speak with our team.',
  },
  invalid: {
    eyebrow: 'Link unavailable', title: 'This booking link is invalid.',
    body: 'Open the link in your acceptance email again. If it still does not work, reply to that email and we will help.',
  },
  unavailable: {
    eyebrow: 'Please try again', title: 'Booking is temporarily unavailable.',
    body: 'We could not check your booking right now. Please try your email link again shortly, or reply to your acceptance email.',
  },
} as const

export default async function BookingStatus({ searchParams }: { searchParams: Promise<{ state?: string }> }) {
  const { state } = await searchParams
  const message = messages[state as keyof typeof messages] ?? messages.invalid
  return <main className="relative flex min-h-screen flex-col overflow-hidden bg-ground text-ink">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-50" style={{ background: 'radial-gradient(circle at 80% 15%, rgba(201,162,39,.13), transparent 38%)' }} />
    <header className="relative border-b border-line px-gutter-m py-flow md:px-gutter">
      <div className="mx-auto max-w-page text-label font-semibold uppercase tracking-[.22em] text-accent">Capital Career Club</div>
    </header>
    <div className="relative mx-auto flex w-full max-w-page flex-1 items-center px-gutter-m py-section-m md:px-gutter md:py-section">
      <div className="max-w-text">
        <p className="rise text-label font-medium uppercase text-accent">{message.eyebrow}</p>
        <h1 className="rise mt-flow font-serif text-display-xl-m leading-none md:text-display-xl" style={{ animationDelay: '60ms' }}>{message.title}</h1>
        <div className="rise mt-block-m h-px w-24 bg-accent md:mt-block" style={{ animationDelay: '120ms' }} />
        <p className="rise mt-flow max-w-narrow text-l text-body" style={{ animationDelay: '180ms' }}>{message.body}</p>
        <a href="/" className="rise mt-block-m inline-flex min-h-[48px] items-center border-b border-line-gold text-label font-semibold uppercase text-ink transition-colors hover:text-accent md:mt-block" style={{ animationDelay: '240ms' }}>Capital Career Club <span aria-hidden="true" className="ml-tight">↗</span></a>
      </div>
    </div>
    <footer className="relative border-t border-line px-gutter-m py-flow text-caption text-muted md:px-gutter">
      <div className="mx-auto max-w-page">Your next step starts with a conversation.</div>
    </footer>
  </main>
}
