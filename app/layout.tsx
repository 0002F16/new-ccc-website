import type { Metadata } from 'next'
import { Familjen_Grotesk, Instrument_Serif } from 'next/font/google'
import './globals.css'

const sans = Familjen_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Capital Career Club — a job-search team for experienced internationals in Poland',
  description:
    'The only end-to-end career engineering system built for internationals in Poland. We rebuild your CV and LinkedIn, run the applications and outreach every week, and prepare you for every interview.',

  /**
   * Kept out of search until launch. Added 10 September 2026, when the page went
   * onto Vercel — Vercel marks preview deployments `noindex` but production is
   * indexable by default.
   *
   * Three reasons, all of them in the OPEN list: the KRAZ question is recorded as
   * blocking the whole page and turns on what CCC's own marketing says it does;
   * the hero publishes "placed in Poland", the most load-bearing sentence for
   * exactly that question; and the proof wall carries thirty-nine named people
   * whose consent is not yet on file. Indexing is far harder to undo than to
   * withhold.
   *
   * DELETE THIS on launch day, once those close. It is one line and it is the
   * only thing keeping the page out of Google.
   */
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>
        {/* Without JS, Reveal's animated blocks would stay at opacity 0 forever. */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  )
}
