# Build state — 9 September 2026

Next.js + Tailwind scaffolded, Gilt tokens enforced in `tailwind.config.ts` (the
default palette is deleted, so an off-system colour fails the build), all
primitives built, and **21 of the 22 IA sections composed into `app/page.tsx`**.

`npm run build` passes. One `h1`, 51 headings, no skipped levels, no dangling
anchors, one `main` and one `footer` landmark, zero `<form>` elements on the page.

## Not composed

- **§15 how the search is reviewed.** The copy deck supplies no publishable
  string for it; the escalation and review policy is undefined. The component
  exists but is deliberately left out of the page — a heading over an empty panel
  would undercut the No-Stop Guarantee the section exists to support.

## What is owed before launch — `grep -rn data-blocked components/sections`

22 blocked slots, each dashed, badged in words, and greppable. **None may survive
to production.**

**Assets (7)** — the CV before/after specimen; the outreach message specimen; the
interview dossier specimen; the negotiation preparation specimen; Exhibit 02's
activity-log specimen; the founder photograph; and the VSL claims audit.

*VSL, updated 9 September 2026.* A Loom was supplied and is recorded in
`components/sections/06-video.tsx` as `VSL_URL`. It is **not** wired to a player.
Its title — "How to Get a zl20k/mo Job in 60 Days in Poland" — is a salary figure
used as proof and a stated timeline, two separate claim-rule breaches, and
embedding it would put both on the page whatever the caption says. Someone has to
watch it against the offer letter. Runtime is still unknown and the deck's caption
is still blocked.

*Testimonial videos, added 9 September 2026.* All nine live-site YouTube videos are
now in §7 on the owner's instruction, in the dashed `unverified` treatment. Each
still needs written consent to reuse on this page, confirmation of which service
was received (DFY or coaching), and one exact milestone — two strap-lines aggregate
outcomes ("4 Tier-1 Offers", "Multi-Offers"), which the claim rules forbid. Seven of
the nine are graduate or survival-job framings the strategy brief told us to replace.

**Counsel (5)** — withdrawal and early-performance consent; controller,
processors and transfers (blocks both the application step and the footer);
footer legal furniture; success-fee events; the No-Stop discharge condition.

**Owner (7)** — application approval scope; Signal Layer controls; supported
profiles; the fee cap for unemployed / sideways / career-change clients; fee
contract basis and tax; the admissions closing sentence (two versions, unchosen);
the written admissions standard.

**Conflicts (2)** — No-Stop duration vs `/regulamin`; four FAQ answers with no
confirmed policy behind them.

**Destinations (2)** — no working Calendly URL; no address for the free
resources, which two other sections point at. *The video inventory names
`free.capitalcareerclub.com` as the existing free-resources destination — likely
the answer, but it needs a human click to confirm before it is wired.*

## Also pending

`docs/2026-09-09-proposed-system-amendments.md` — document contradictions,
component gaps and content decisions raised by the builds. Nothing in it applied.
