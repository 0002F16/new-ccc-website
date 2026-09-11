/**
 * The screenshot corpus, curated.
 *
 * 125 captures sit in `Testimonials Screenshots/` (gitignored, never referenced
 * by code before 9 September 2026). This file records the 39 that ship, their
 * intrinsic dimensions — `next/image` requires them and they come from the files
 * themselves, not from guesses — and real alt text written from the content of
 * each capture.
 *
 * Hand-authored constant. Never randomise the order or the selection: the wall's
 * rhythm depends on tall and wide alternating, and a randomised evidence wall is
 * both a hydration bug and a fabrication.
 *
 * ── One flat wall, no specimen tier ─────────────────────────────────────────
 *
 * Round 3 shipped three of these larger and first, on `WorkProductPlate`s, one
 * per rung of the outcome ladder, so that a reader could actually read one
 * before being shown that there are dozens. The owner cut that tier on 9
 * September 2026: the collection alone, spanning the viewport.
 *
 * The three are not discarded — they are folded into the wall at positions 2, 14
 * and 27, because they are among the strongest captures in the corpus. What the
 * full-bleed width buys back is size: the wall now runs one column on mobile,
 * two from `md` and three from `xl`, and every plate opens at intrinsic size in
 * a proof viewer. The source remains unaltered in both presentations.
 *
 * ── What was left out, and why ──────────────────────────────────────────────
 *
 * Owner's instruction of 9 September 2026 was to ship the wall raw and live.
 * These were still excluded, on rules already written in CLAUDE.md rather than
 * on the consent question:
 *
 *   - `2026/July/WhatsApp Image 2026-07-14 at 12.52.10.jpeg` — a job-offer email
 *     naming an HR employee at Novocure, stating a gross monthly salary and
 *     equity terms, and requesting PESEL and passport. Claim rules forbid salary
 *     figures as proof, and the third party never contracted with CCC.
 *   - `2026/July/WhatsApp Image 2026-07-10 at 19.29.23.jpeg` — a Citi screening
 *     invitation carrying a named recruiter's e-mail address and direct line.
 *   - The 2025-09/10 direct-message captures — private DMs, several already
 *     struck through with red marker, which reads as tampering at wall scale.
 *   - Roughly thirty product, calendar and marketing captures that are not
 *     testimonials at all, including two carrying an "84% Job Offers" figure.
 *
 * ── Still open ──────────────────────────────────────────────────────────────
 *
 * Consent per person, service actually received (DFY or coaching), and absolute
 * dates. A community post does not evidence done-for-you delivery. See the OPEN
 * list in CLAUDE.md; shipping these was the owner's call, recorded 9 September.
 */

export type ProofShot = {
  src: string
  width: number
  height: number
  alt: string
}

export const WALL: readonly ProofShot[] = [
  {
    src: '/proof/post-01.png',
    width: 900,
    height: 850,
    alt: 'Community post by Sam Abdullaev: an offer from Alcon for Associate Data Scientist after two interviews.',
  },
  {
    src: '/proof/post-02.png',
    width: 900,
    height: 267,
    alt: 'Community post by Saodat Mirazorova: Linklaters invited her to a fifteen-minute phone interview for an AP intern position.',
  },
  {
    src: '/proof/post-03.png',
    width: 788,
    height: 225,
    alt: 'Community post by Rushikesh Ingale: a job offer from Warner Bros. Discovery as Financial Analyst.',
  },
  {
    src: '/proof/post-04.png',
    width: 788,
    height: 634,
    alt: 'Community post by Maharram Orujlu: passed the video interview stage at Clifford Chance and invited to online assessments.',
  },
  {
    src: '/proof/post-05.png',
    width: 797,
    height: 202,
    alt: 'Community post by Osman Can Savran: a job offer from MicroStrategy for a software engineer position.',
  },
  {
    src: '/proof/post-06.png',
    width: 900,
    height: 691,
    alt: 'Community post by Gaurang Gohil: an HR interview at Revolut scheduled for the following Tuesday.',
  },
  {
    src: '/proof/post-07.png',
    width: 786,
    height: 227,
    alt: 'Community post by Iulia Samotiia: a job offer as assistant to the CEO and chief office manager.',
  },
  {
    src: '/proof/post-08.png',
    width: 900,
    height: 794,
    alt: 'Community post by Gaurang Gohil: an HR interview for an AVP role at Cantor Fitzgerald.',
  },
  {
    src: '/proof/post-09.png',
    width: 786,
    height: 223,
    alt: 'Community post by Madameen Mamadaliev: a job offer from JLL for a data analyst position requiring German.',
  },
  {
    src: '/proof/post-10.png',
    width: 900,
    height: 707,
    alt: 'Community post by Brian Chaggu: a scheduled interview for Junior Client Solution Architect at Nielsen IQ.',
  },
  {
    src: '/proof/post-11.png',
    width: 798,
    height: 233,
    alt: 'Community post by Islombek Yakhshiboev: a job in the procurement department at Schneider Electric.',
  },
  {
    src: '/proof/post-12.png',
    width: 900,
    height: 411,
    alt: 'Community post by Abhijeet Salvi: a first automated HR interview round completed.',
  },
  {
    src: '/proof/post-13.png',
    width: 804,
    height: 337,
    alt: 'Community post by Rakhim Mirzakhmetov: an offer for Junior AR with French at Perrigo, after forty days and eighteen interviews.',
  },
  {
    src: '/proof/post-14.png',
    width: 779,
    height: 229,
    alt: 'Community post by Bilolidin Nasimov: after months of rejection, an offer received as an interpreter.',
  },
  {
    src: '/proof/post-15.png',
    width: 900,
    height: 413,
    alt: 'Community post by Javanshir Rustamov: second-stage interviews at both Hylogic and BEC.',
  },
  {
    src: '/proof/post-16.png',
    width: 860,
    height: 299,
    alt: 'Community post by Siyovush Islamov: a job at Linklaters in business development and marketing process.',
  },
  {
    src: '/proof/post-17.png',
    width: 900,
    height: 471,
    alt: 'Community post by Javanshir Rustamov: passed the first interview stage for a Java developer role at TD SYNNEX.',
  },
  {
    src: '/proof/post-18.png',
    width: 867,
    height: 295,
    alt: 'Community post by Nurmukhammad Nurmatov: hired at Ria Money Transfer as a customer care representative.',
  },
  {
    src: '/proof/post-19.png',
    width: 900,
    height: 732,
    alt: 'Community post by Yaashitha Boddeda: an offer letter received from Maersk for Associate, Indirect Tax Operations in Warsaw.',
  },
  {
    src: '/proof/post-20.png',
    width: 900,
    height: 266,
    alt: 'Community post by Nurmukhammad Nurmatov: an interview at Adisseo and a second-round interview at Ria.',
  },
  {
    src: '/proof/post-21.png',
    width: 814,
    height: 397,
    alt: 'Community post by Daria Prilutskaia: a job offer received from PepsiCo.',
  },
  {
    src: '/proof/post-22.png',
    width: 900,
    height: 252,
    alt: 'Community post by Assylzhan Zhumabay: an interview with TELUS for a Kazakh data labeller position.',
  },
  {
    src: '/proof/post-23.png',
    width: 879,
    height: 647,
    alt: 'Community post by Loraine Mukwauri: an interview invitation at Oanda for Senior Client Cash Management Associate.',
  },
  {
    src: '/proof/post-24.png',
    width: 900,
    height: 273,
    alt: 'Community post by Mohamed Turki: an upcoming interview with Amazon for a French-speaking data associate role.',
  },
  {
    src: '/proof/post-25.png',
    width: 873,
    height: 755,
    alt: 'Community post by Zaka Mikayilzade: an interview invitation received within a week of applying.',
  },
  {
    src: '/proof/post-26.png',
    width: 900,
    height: 259,
    alt: 'Community post by Ilyosjon Anvarjonov: an interview for the global marketing programme at Schneider Electric.',
  },
  {
    src: '/proof/post-27.png',
    width: 796,
    height: 230,
    alt: 'Community post by Rakhamtillo Khaydarov: hired as an interpreter at Teleperformance, with onboarding documents received and training starting on 14 April.',
  },
  {
    src: '/proof/post-28.png',
    width: 795,
    height: 475,
    alt: 'Community post by Mushfig Omarov: an interview invitation for Senior Operations Lead, the third opportunity that week.',
  },
  {
    src: '/proof/post-29.png',
    width: 900,
    height: 251,
    alt: 'Community post by Anilet Thomas: a forty-five-minute recruiter interview for a technical support role.',
  },
  {
    src: '/proof/post-30.png',
    width: 819,
    height: 440,
    alt: 'Community post by Shakhzodbek Dekhkonov: a direct call from Ryanair HR and an interview set for Monday.',
  },
  {
    src: '/proof/post-31.png',
    width: 900,
    height: 269,
    alt: 'Community post by Ashwarthi Sivashanmugam: two interviews lined up, at Armatis and at Eiffage.',
  },
  {
    src: '/proof/post-32.png',
    width: 788,
    height: 665,
    alt: 'Community post by Muhillarasu Venkatesan: an interview for a site engineer role at Piper Maddox, applied to the previous night.',
  },
  {
    src: '/proof/post-33.png',
    width: 900,
    height: 259,
    alt: 'Community post by Rakhim Mirzakhmetov, headed "3 interviews in a week", a week after joining the community.',
  },
  {
    src: '/proof/post-34.png',
    width: 900,
    height: 254,
    alt: 'Community post: an onsite interview at Alcon for Senior Associate Data Scientist, scheduled for 17 September.',
  },
  {
    src: '/proof/post-35.png',
    width: 900,
    height: 262,
    alt: 'Community post by Akhmadullo Shokirov: a first HR interview secured.',
  },
  {
    src: '/proof/post-36.png',
    width: 900,
    height: 345,
    alt: 'Community post by Alima Kaidarova: hired at Visa.',
  },
  {
    src: '/proof/post-37.png',
    width: 900,
    height: 267,
    alt: 'Community post by Aikanym Kasieva: an interview invitation for Junior Billing Specialist at Planet.',
  },
  {
    src: '/proof/post-38.png',
    width: 900,
    height: 653,
    alt: 'Community post by Ashwarthi Sivashanmugam: officially joined Ryanair as a customer service consultant.',
  },
  {
    src: '/proof/post-39.png',
    width: 900,
    height: 257,
    alt: 'Community post by Abdurehman Asfaw: invited to a second interview at Heli-One for an inventory and planning data scientist role.',
  },
]
