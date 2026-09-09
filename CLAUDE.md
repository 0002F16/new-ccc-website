# Capital Career Club — landing page

Working file for the new landing page. Updated as decisions are made. Anything
marked OPEN is not yet decided and must not be treated as settled.

## What this is

A standalone long-form landing page for capitalcareerclub.com, selling the
done-for-you job-search service to experienced international professionals in
Poland. One primary CTA throughout: **Apply for a fit call.**

The existing site stays live. This page is not a full site replacement, but the
design system should be built so the rest of the site could adopt it later.

## What CCC actually does

Source: `CCC_Offer_Letter.pdf` — the Letter of Acceptance, "The Representation
Method · Done For You Programme". Founder: Aziz Khaitov, Warsaw. This is the
operating model, and it supersedes the strategy brief's more cautious guesses
about scope. The letter is not the contract; the Representation Agreement
governs and prevails where they differ.

**The frame:** representation, not coaching. "Athletes do not apply for teams.
Actors do not apply for films. They are represented." From signature, the client
stops applying and the team runs the search.

**Seven stages:** Admissions Screen · Positioning Rebuild (CV rebuilt from raw
history, LinkedIn reconstructed) · The Three Doors · The Signal Layer (3–5 posts
a week in the client's voice) · The Interview Dossier (within 24h of every
confirmed interview: company, interviewers, 15–20 predicted questions with
answers built) · The Negotiation Table · The Net Positive Close.

**The Three Doors, run simultaneously from week one:**
- Open Market — 10+ tailored, tracked, followed-up applications per week
- Back Channel — 30–70 direct approaches per week to hiring managers, internal
  recruiters and functional leaders; plus warm introductions where a
  relationship exists
- Direct Presentation — named, vetted presentation to employers where CCC holds
  a relationship. Never without asking the client first, in writing, about that
  specific employer.

**Four guarantees:**
1. *No-Stop* — work continues until an offer is signed. No time limit, no
   further fee.
2. *Raise* — if the accepted offer does not beat current earnings, nothing is
   owed on the back end.
3. *Probation* — the fee comes from the first three paycheques; if the role is
   lost before the third, remaining payments are cancelled and the search
   reopens at no new fee.
4. *Admissions* — CCC declines applicants it does not expect to place.

**The fee — resolved.** 6,000 PLN activation on signature, then three
instalments, each **the lesser of 23% of the new gross monthly salary or the
monthly raise secured**. The cap is the raise, so the payment can never exceed
the increase. *This is neither of the two interpretations the research pack was
weighing — do not use its 14,280 / 8,760 arithmetic.*

**Client obligations (seven):** complete three intake documents; give access
credentials within 48h; approve CV, profile and content inside agreed windows;
respond immediately to any recruiter contact and report it; attend every
arranged interview prepared; report each interview within 24h; report any offer
from any source immediately.

**Onboarding timings:** sign → 6,000 PLN (BLIK or transfer) → three intake
documents, 48h to complete → dedicated delivery team member within 24h →
CV draft within 48h of the Raw Experience Dump → search live by day seven.

**The line worth keeping:** "You are not short of ability. You are short of
hours and short of access. Those are the only two things I sell."

## Stack

- Next.js + Tailwind
- `motion` (Motion for React), added 9 September 2026. Permitted for exactly two
  things: the hero load stagger, and one scroll reveal per section via `Reveal`.
  Nothing else — no parallax, no layout animation, no counters.
- Deploy target: **Vercel**, decided 10 September 2026. Resolved against the
  existing VPS at 76.13.177.250, which hosts unrelated apps (fyxor.eu, the CV
  Tailor API) behind nginx and pm2 — nothing on this page needs to sit beside
  them, and Next.js on Vercel is zero-config. Source of truth is the GitHub
  repo `0002F16/new-ccc-website`; `main` is production and every push
  redeploys. No environment variables are required — the page has no API keys,
  no database and no server-side integrations yet. That changes the moment the
  application form or Calendly is wired in, which is still OPEN.
- Component library: none exists. Primitives get built from the design system
  before section work starts.

## Source documents

Read these before writing any copy. They are research, not finished copy.

- `2026-09-07-landing-page-strategy.md` — positioning, page sequence, pricing
  problem, measurement plan
- `2026-09-08-copywriter-research-pack.md` — evidence base, customer-language
  library, objection map, claim rules, business facts to confirm
- `Testimonials Screenshots/` — 125 raw screenshots, uncurated (105 from 2025,
  20 from 2026; counted 8 September 2026)

## Page sequence (from the strategy doc)

1. Hero — audience, outcome, service, one CTA
2. Two recognizable situations — stalled search; stalled career
3. Three to five experienced-client cases — start, obstacle, work done, outcome
4. What the team does / what the client still does
5. How the first weeks work
6. Fit criteria
7. Price explanation, objections, FAQ
8. Repeat fit-call CTA; free resources as a secondary route

## Claim rules — non-negotiable

Carried from the research pack. These bind the copy regardless of what reads well.

- No placement percentages, no guaranteed timelines, no salary-increase promises
  — **except the hero stat row, overridden by the owner 9 September 2026.** See
  "Overridden 9 September 2026" below.
- No blanket "ATS rejects you" explanations — that is customer perception, not a
  verified diagnosis
- No claimed employer partnerships. Employer names locate public examples only
- Never write "we only get paid when you do" — there is a 6,000 PLN upfront fee
- Label outcomes precisely: an interview is not an offer, an offer is not a job start
- CRM "Won" means a recorded sale, not a placement
- Private customer language from the research pack is research material, not
  permission to publish a testimonial

**Decided 8 September 2026 — what this page may claim.**

- **The four guarantees are published.** They are contractual terms, not
  outcome predictions, and they are the strongest material available.
- **"We expect to place you" is approved copy.** Owner's call, and it is
  defensible because it describes CCC's own admissions judgement, not a promised
  result: CCC declines applicants it does not expect to place, so acceptance is
  the judgement. Two conditions on it, which are what keep it a statement of
  process rather than a promise of employment:
  - It stays attached to the Admissions Screen wherever it appears. "We expect
    to place you" without "we decline the majority of applicants" next to it is
    a different and weaker claim.
  - It is never converted into a number. No placement rate, no success
    percentage, no "X% of accepted clients". The moment it becomes a statistic
    it needs a verified denominator, and there isn't one.
  - It may not appear in ad creative, headline fields, meta descriptions,
    social cards or OG images. Only in body copy, in the Admissions section,
    with both clauses bound in a single sentence so that no screenshot of one
    sentence can carry the forbidden implication. On a public page addressed to
    a stranger the words mean "we place the people we accept", which is a
    general effectiveness claim; in the offer letter, addressed to a named
    person who has passed a screen, they are a judgement about an individual.
    The binding is what preserves the second reading.
- **The weekly operating volumes are published** — confirmed current and
  sustainable by the owner, 8 September 2026.
- **Door Three (Direct Presentation) is real but held back from v1.** Owner's
  instruction: do not put it on the page yet. Keep the Three Doors structure to
  two doors in copy, or describe the third without naming employer relationships,
  until the evidence is assembled.

## Build workflow

Adapted from the reference process (inspiration → design system → section-by-section
→ polish). Roughly 40% inspiration and planning, 20% building, 40% polish.

1. **Inspiration** — collect links, screenshot each, log what structure/type/spacing
   is doing the work. Target 3–5 variations per section type.
2. **Design system** — derived from the inspiration, not invented. Tokens, type
   scale, spacing, component patterns. Lives in this file.
3. **Primitives** — button, card, section shell, eyebrow, stat, quote.
4. **Sections** — one at a time, 3–4 layout concepts before committing, reviewed
   against the system with screenshots.
5. **Polish** — micro-interactions, custom SVG, separate mobile components where
   needed, real-device testing.

Reference class is high-ticket service, consultancy and agency sites — not SaaS
product pages. Borrow structure from SaaS if it fits; do not borrow the surface.

---

# Design system — Gilt

Chosen 8 September 2026 — direction 03 of `docs/mocks/seven-directions.html`,
replacing the Blueprint system written earlier the same day.
**This section is binding.** Do not introduce a colour, size, radius, shadow or
typeface that is not defined here. If a section seems to need one, that is a
signal the section is wrong, not the system.

## The idea

The page has to sell a service whose proof cannot be a number. Competitors in
this format run on income figures and tracked sales; the claim rules forbid the
equivalent here. So the substitute is **visible process**: the reader should be
able to see the machine, the people operating it, and exactly which levers are
theirs to pull.

What Gilt adds to that is **selectivity**. The offer letter already says CCC
screens every applicant against a written standard and declines the majority.
Gilt is the visual form of that sentence — warm near-black, one gold, a large
serif, a narrow centred column, and almost nothing else. A page that refuses to
shout is consistent with a business that refuses most applicants.

Four constraints this places on every decision:

1. **Precision over enthusiasm.** The system should make an accurate, modest
   claim look better than an inflated one. If a section only works with a big
   number in it, the section is wrong.
2. **Warm, not cold.** The type and the ground carry authority; photography of
   real people and plain-sentence copy carry the warmth. The research describes
   an audience frustrated at not being recognised — the page must not read as an
   institution processing them.
3. **Legible at a glance.** 88% of leads with a recorded timeline said they need
   work within two months. Scanners outnumber readers. Small-caps labels, gold
   hairlines and spec-sheet pairs exist so a skimmer can still assemble the
   argument.
4. **Nothing decorative survives.** On this ground every added element is
   conspicuous. A section that needs ornament to feel finished is a section with
   nothing to say. Cut the element, or write the section again.

## Colour

One dark theme. This page commits to a single visual world — no light variant,
no theme toggle, no light middle section. Every surface is painted explicitly.

### Tokens

| Token | Value | Use — and only this use |
|---|---|---|
| `ground` | `#0A0908` | The page, hero to footer. Never used on a card. |
| `surface` | `#131110` | Cards, panels, the video frame, form fields. |
| `sunken` | `#060505` | Wells: the price block, quoted material. |
| `line` | `#2A2521` | Default 1px border on cards, inputs, section rules. |
| `line-soft` | `#1F1B18` | Dividers inside a card. |
| `line-gold` | `rgba(201,162,39,.35)` | The hairline marking the one element that matters most in a section. **Maximum one per section.** |
| `ink` | `#F6F1E8` | Headings, display type, emphasised values. Warm white — never `#FFFFFF`. |
| `body` | `#B0A79A` | Running text. |
| `muted` | `#877D71` | Small-caps labels, captions, helper text. Never below 14px for prose, never for anything essential to the argument. |
| `accent` | `#C9A227` | Gold. CTAs, links, the one picked-out phrase per screen, confirmed job starts. |
| `accent-hover` | `#D8B43F` | Button and link hover only. |
| `accent-wash` | `rgba(201,162,39,.12)` | Badge fills and active states. Never a section background. |
| `on-accent` | `#14110B` | Text on `accent`. Never white on gold. |

### The outcome ladder — semantic, not decorative

The claim rules require an interview, an offer and a job start to be visibly
different things. Blueprint encoded that with slate, teal and green. **Those do
not come across to Gilt** — importing two extra hues breaks the one-accent
discipline and muddies the gold. The ladder is encoded with weight and
enclosure instead, using only the tokens above.

| Stage | Treatment | Why |
|---|---|---|
| Interview invitation | `muted` small-caps label. No fill, no border. | The most common and least conclusive outcome, so the quietest. |
| Signed offer | `ink` small-caps label inside a 1px `line` border. | Enclosure marks a completed thing. |
| Confirmed job start | `on-accent` on `accent-wash`, `line-gold` border. | The strongest claim on the page. The only outcome that earns the gold. Use least. |
| Unverified / placeholder | 1px **dashed** `muted` border, `muted` text, no fill. | Dashed edges appear nowhere else in this system, so unverified material is unmistakable and physically looks unfinished. Must not survive to production. |

### Rules

- One accent. If two things on a screen are gold, one of them is wrong. **The
  primary button is exempt** — it is the page's single call to action and it is
  gold everywhere it appears. Amended 9 September 2026, ratifying what every
  section with a `CtaBlock` already did.
- Never signal a section change with a background colour. Use spacing and a gold
  hairline. `ground` runs unbroken from header to footer.
- Colour is never the only carrier of meaning — every outcome badge states its
  stage in words.
- Contrast floor is 4.5:1 for text and 3:1 for interface edges. `muted` on
  `ground` measures ~5:1 and is the lowest-contrast pairing permitted.

## Typography

**Display: Instrument Serif. Body and labels: Familjen Grotesk.**

A large, light serif against a plain grotesk is the oldest luxury pairing there
is, and it works here for a specific reason: the serif can carry the emotional
sentences at 72px without raising its voice, while the grotesk keeps the
operational detail — volumes, stages, fees — matter-of-fact.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap">
```

Fallback stacks are mandatory:
`"Instrument Serif", Georgia, "Times New Roman", serif`
`"Familjen Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif`

Two hard rules follow from the faces themselves:

- **Instrument Serif has one weight (400).** Never synthesise bold. The serif
  covers `display-xl`, `display-l` and `h2` only; `h3` and `h4` are Familjen
  Grotesk 600. **Never set the serif below 21px** — it is a display face and it
  falls apart small.
- **Labels are letterspaced small caps in the grotesk.** This is Gilt's
  equivalent of a monospace label and it does the same job: it marks a piece of
  structure as structure.

### Scale

Every size on the page comes from this table. No arbitrary values.

| Role | Desktop / mobile | Line height | Tracking | Weight | Face |
|---|---|---|---|---|---|
| `display-xl` | 72px / 44px | 1.04 | −0.012em | 400 | Serif |
| `display-l` | 52px / 38px | 1.06 | −0.010em | 400 | Serif |
| `h2` | 40px / 30px | 1.12 | −0.008em | 400 | Serif |
| `h3` | 24px / 21px | 1.30 | 0 | 600 | Grotesk |
| `h4` | 19px | 1.40 | 0 | 600 | Grotesk |
| `body-l` | 18px | 1.65 | 0 | 400 | Grotesk |
| `body` | 16.5px | 1.65 | 0 | 400 | Grotesk |
| `body-s` | 14.5px | 1.60 | 0 | 400 | Grotesk |
| `caption` | 13px | 1.50 | 0 | 400 | Grotesk |
| `label` | 11px | 1.20 | 0.22em | 500 | Grotesk, uppercase |
| `micro` | 10px | 1.20 | 0.26em | 500 | Grotesk, uppercase |

`display-xl` appears exactly once per page, in the hero.

### Rules

- **Dark grounds add optical weight.** Prose stays at 400 and never 500, and
  line height runs looser than a light design would need — hence 1.65 on body.
- `ink` is `#F6F1E8`. Pure white is never used, anywhere.
- Running text sits between 60 and 70 characters. `w-text` enforces it.
- **Emphasis has exactly two forms:** Instrument Serif *italic* in `ink` for
  editorial emphasis, and `accent` gold for the single most important phrase on
  a screen. Never both in one heading. Never bold.
- `text-wrap: balance` on every heading; `text-wrap: pretty` on ledes.
- `font-variant-numeric: tabular-nums` on every figure in a column, a spec pair
  or a price.
- Sentence case for headings. Uppercase only for small-caps labels.

## Spacing

Gilt is airier than a light system needs to be; dark grounds swallow space.
Base unit 4px, and nothing between these steps:

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128`

| Token | Desktop | Mobile | Use |
|---|---|---|---|
| `space-section` | 128px | 80px | Vertical padding on every top-level section. Identical on all of them. |
| `space-block` | 56px | 36px | Between major groups inside a section. |
| `space-flow` | 24px | 20px | Between consecutive elements in a stack — the default gap. |
| `space-tight` | 12px | 12px | Label to value, icon to text. |
| `card-pad` | 28px | 22px | Inside every card. One value; cards do not have padding variants. |
| `gutter` | 24px | 16px | Page edge padding. |

**Use `gap`, never margins between siblings.** Every stack is a flex or grid
container with a gap token. Margins on individual elements are how the rhythm
silently breaks.

### Containers

| Token | Width | Use |
|---|---|---|
| `w-page` | 1120px | Outer bound. Sticky bar, footer. |
| `w-structure` | 1040px | Cards, the seven stages, the price block, case grids, the video frame. |
| `w-text` | 720px | All prose, centred. |
| `w-narrow` | 520px | Form column, FAQ. |
| `bleed` | none | Viewport less 2×`gutter`. The proof wall only. Never prose. |

**The alternation between 720px centred prose and 1040px structural bands is the
page's rhythm.** It is what stops a long dark page from reading as one
undifferentiated column. Prose narrows; structure widens; nothing sits at an
in-between width.

### Breakpoints

`480 · 768 · 1024 · 1280`. Design at 1280 and 390 first; the middle sizes are
interpolation. A section that cannot be made to work by reflowing gets a
**separate mobile component** rather than a pile of overrides.

## Shape and elevation

- **Radius:** `2px` badges and tags · `4px` cards, buttons, inputs — the
  default · `6px` the video frame and full-width panels · `0` rules. Nothing
  above 6px, ever. No pill shapes.
- **Borders:** `1px solid line` is the default edge. `line-gold` at most once
  per section, on the element that matters most.
- **Elevation:** shadows barely read on `#0A0908`, so do not simulate them.
  Cards get an inset top highlight, `inset 0 1px 0 rgba(246,241,232,.05)` — the
  dark-ground equivalent of a lifted edge. The video frame gets
  `0 24px 60px -30px #000`. Nothing else is raised.
- **No glows.** A gold glow is the single most likely way this direction turns
  cheap. No gold gradients, no metallic textures, no shimmer.

## Signature devices

These five are what make Gilt *Gilt*. They are the whole permitted vocabulary
of visual interest; anything beyond them is decoration.

1. **Letterspaced small-caps labels** at `.22em` — eyebrows and every spec term.
2. **A 48px gold hairline** above a section eyebrow, marking a new movement of
   the page.
3. **Centred 720px prose against 1040px structural bands.**
4. **Large serif as the only display voice.** No large grotesk headline anywhere
   on the page.
5. **Uppercase letterspaced buttons** at `.14em`.

## Components

Every component states its anatomy, the tokens it uses, its states, and its
prohibition. Build all of these as primitives before any section work starts.

### Eyebrow
Optional 48px `line-gold` hairline, then `label` small caps in `accent`,
centred, gap `space-tight` to the heading below. No chip, no border, no fill.
**Job:** name the audience or the section before anything is claimed. 42 of 151
lost leads were marked unqualified — the eyebrow is where qualification starts.
**Never:** more than one per section; sentence case; longer than six words.

### Display heading
`display-xl` or `display-l` in Instrument Serif, `ink`, `text-wrap: balance`,
max 16ch measure at `display-xl`. One gold phrase or one italic phrase
permitted, never both.
**Never:** a heading that needs a subheading to make sense.

### Section header
Gold hairline → eyebrow → `h2` → optional `body-l` lede at `w-text`. Gaps:
`space-tight` hairline to eyebrow and eyebrow to `h2`, `space-flow` to lede,
`space-block` to content.

### Button
- **Primary:** `accent` fill, `on-accent` text, `4px` radius, `18px 40px`
  padding, 14px, weight 600, uppercase, `.14em` tracking. Hover `accent-hover`
  and `translateY(-1px)`. Focus-visible: 2px `accent` ring at 3px offset.
- **Secondary:** transparent fill, `1px line` border, `ink` text. Same geometry.
- **Ghost:** `accent` text, no fill, underline on hover.
- One primary per screenful. The primary always reads **"Yes — I'm ready to
  apply"** — the same words every time, per the single-CTA rule. `CTA_LABEL` in
  `components/ui/Button.tsx` is the single source; never hardcode a label.
  (Was "Apply for a fit call" until 9 September 2026.)
- Minimum target 44×44. Never a bare icon button.

### CTA block
Primary button, then a `caption` in `muted` at `w-narrow`, gap `space-flow`,
centred. The note states what happens next; it never repeats the button.

### Chip row
`body-s`, `muted` text, `1px line` border, `2px` radius, `8px 14px`, gap 10px,
centred.
**Job:** pre-empt objections directly under the headline. Fill from the
objection map — not coaching · you approve every application · full fee before
the call · 3+ years required.
**Never:** more than five; never a benefit claim; never longer than six words.

### Card
`surface`, `1px line`, `4px` radius, `card-pad`, inset top highlight. Contents
stack with `space-flow`. `h3` or `h4` title in `ink`, `body-s` prose.
**Never:** a gradient, a glow, an accent rail, or an emoji.

### Spec pair — the workhorse
A `<dl>` on a two-column grid, `auto 1fr`, gap `12px 24px`. Term is a `muted`
small-caps `label`. Value is `body-s` in `body`, with `ink` for the operative
phrase. Two columns inside `w-structure`; stacked inside centred prose;
collapses to one column below 560px.
**Use for:** case cards, fit criteria, the fee breakdown, what-we-do /
what-you-do, the seven stages, structured FAQ answers.
This is the pattern that makes the page look documented. Reach for it before
reaching for prose.

### Case card
The most constrained component on the page, because it carries the claims.

Anatomy: outcome heading (`h3` serif, stage named in words) · outcome badge from
the ladder · spec pairs in fixed order — **Starting point · Obstacle · Work
done · Outcome** · date.

- The outcome heading names the stage: "interviews", "offer", "job start".
  Never "success", "result", "win".
- The badge takes its treatment from the outcome ladder.
- **Work done is mandatory and must be specific** — what was repositioned, how
  many applications, how much outreach. It is what distinguishes this from CV
  editing, and it is where the confirmed weekly volumes belong.
- Any unverified case carries the dashed placeholder treatment and must not ship.

### Process step
`micro` numeral in `accent`, then `h4` and `body-s`. **Numbers only where the
order is real** — the seven stages and the first-weeks sequence are genuinely
ordered, so they are numbered; a list of services is not, so it is not.

### Price block
`sunken` well, `line-gold` top rule, `4px` radius, `card-pad`, `w-structure`.
Figures in tabular numerals at `h3`. Spec pairs, then a worked example in
`body-s`.

The fee is confirmed: **6,000 PLN on signature**, then **three instalments, each
the lesser of 23% of the new gross monthly salary or the monthly raise
secured**. The cap is the raise, so the payment can never exceed the increase —
that is the section's strongest sentence and it needs its own line, not a
footnote. Two spec pairs minimum: one per fee component.
**Still blocked** on the cap rule for unemployed clients — see OPEN.

### Testimonial
`surface`, `1px line`, quote at `body-l` in `ink`, attribution in `label` small
caps. No portrait without consent. No quotation-mark graphics, no star ratings.

### FAQ
A definition list at `w-narrow`. Question `h4`, answer `body`. Native
`<details>`/`<summary>` with a rotating 1.5px chevron; all closed at rest except
the first. `line-soft` rules between items, not cards.

### Sticky CTA bar
Appears after the hero leaves the viewport. `surface`, top border `line-gold`,
`w-page`, one primary button plus a one-line restatement of who the service is
for. Hides on scroll-up on mobile.

### Video frame
16:9, `surface`, `6px` radius, `1px line`, `0 24px 60px -30px #000`,
`w-structure`. Play control is a 64px `accent` circle with `on-accent` glyph. A
`caption` below states what the video covers **and its runtime** — a stated
runtime makes it likelier to be started.

### Work-product plate
**New in Gilt, and the real problem this direction creates.** The strongest
visual proof available is work product — a before/after CV, a redrawn LinkedIn
headline, a real outreach message with the name removed. Those artefacts are
white, and a white rectangle sitting full-bleed on `#0A0908` looks pasted on.

Anatomy: the artefact centred on a `surface` panel with **24px of dark padding
on all sides**, `4px` radius, `1px line`, `caption` beneath in `muted`. It
should read as a print mounted on a dark wall.
**Never** full-bleed a white screenshot. **Never** tint, overlay, duotone or
recolour the artefact — it is evidence, and altering it makes it worthless.

### Form field
`surface`, `1px line`, `4px` radius, `12px 14px`, `body` size. Label above in
`label` small caps, `muted`. Error text in `accent` below the field, stating
what is wrong and how to fix it. Never placeholder-as-label.

### Stat row
Added 9 September 2026. Headline proof above the hero `h1`. Figure in `ink` at
`h3` with tabular numerals, label beneath in `muted` small caps, items divided by
a vertical `line` hairline, centred; stacks below `sm` with the rule turning
horizontal. No fill, no card, no gold — the hero's accent belongs to the CTA.
**Never** animate a figure counting up, and never more than one stat row on the
page.

### Video embed
Added 9 September 2026. Click-to-play facade: poster frame plus the 64px `accent`
play control, replaced in place by a `youtube-nocookie` iframe on activation.
Nothing is requested from YouTube until the viewer asks, so the page sets no
third-party cookies on arrival.
**Never** autoplay on arrival, never a black rectangle as the poster, never a
`<div>` where the control must be a `<button>`.

### Reveal
Added 9 September 2026. The page's only motion device — see Motion below. Wraps a
block; 8px rise over 240ms, once, on entering the viewport. `delay` staggers a
group at 40ms steps.
**Never** wrap something whose absence would break the page if motion fails, and
never use it to sequence content a reader is waiting on.

### Proof wall
Added 9 September 2026, for the three-pronged proof section. The volume device:
many client screenshots at once, so the page can show that a lot of people got
somewhere without stating a number the claim rules forbid.

**Why it is not the work-product plate.** The plate presents *one* artefact for
reading. The wall presents *many* for scanning.

**It runs at `bleed` width, and that is load-bearing.** Amended 9 September 2026,
same day, after the owner cut the legible specimen tier that had preceded it. The
original rule here required two to three specimens on `WorkProductPlate`s above
every wall, because at 240px a screenshot is texture and texture alone is
decoration claiming to be evidence. That rule is withdrawn on one condition: the
wall must span the viewport, so tiles grow with the screen — 244px at 1280,
371px at 1920 — instead of staying at the 240px they had inside `w-structure`.
A wall confined to `w-structure` with no specimen tier is still forbidden. Size
is the whole compensation.

Anatomy: CSS multi-column masonry, `columns-2 md:columns-3 lg:columns-4
xl:columns-5`, each tile `break-inside-avoid`, the artefact unaltered inside
`surface`, `1px line`, `4px` radius and `space-tight` of dark padding — a plate
at wall scale. `next/image` with intrinsic width and height from the file, lazy
below the fold. One `label` naming the register; no per-tile caption.

Past `xl` the column count stops rising. Tiles get bigger, not more numerous —
the opposite of the usual responsive instinct, and the reason the wall stays
readable on a large display.

**Reported deviation, deliberate:** CSS columns cannot take `gap`, so tiles carry
a bottom margin. This is the one place in the system where a margin sets rhythm
between siblings.

**Never** crop a post to fit a uniform tile — the crop removes the sentence that
is the evidence. **Never** tint, overlay, duotone or recolour a tile. **Never** a
fixed aspect ratio: the corpus runs from 10.87:1 to 0.73:1. **Never** randomise
the order or the selection — hand-authored constant, or it is a fabrication.
**Never** a fade-out mask at the foot of the wall to imply more: that is a
gradient, and the count of what is shown is the honest version of the same idea.

### Case ledger
Added 9 September 2026. A compact list of published cases — employer locator and
role in `ink`, an outcome badge per row, rows divided by `line-soft`, two columns
of three at `md`.

It exists because `CaseCard` cannot be honestly instantiated: that component makes
"Work done" mandatory and specific, and no work-done fact is recorded for any of
P01–P06. The ledger states only what the results page publishes — who, what role,
which milestone — and stops there. When a case is verified it graduates to a
`CaseCard` above the ledger; the ledger is the holding pattern, not a replacement.
**Never** give a ledger row the `start` rung until a job start is established.

## Overridden 9 September 2026

Owner's instruction, recorded so the contradiction is visible rather than
forgotten. The rest of the claim rules stand unchanged.

- **The hero publishes "180+ Internationals placed in Poland" and "15M+ PLN
  earned by clients annually".** Both come from the live site. Neither is
  verified: the CRM records 27 "Won" *sales*, not placements, and the founder's
  YouTube bio says 14M where the site says 15M. "Placed" is also the most
  load-bearing word for the open KRAZ question. The owner was shown all of this
  and chose these figures.
- **Copy is no longer verbatim from the deck.** `docs/BUILD-BRIEF.md` rule 7 is
  relaxed: prose may be rewritten for length. Inventing facts is still forbidden.
- The page's target is **no rendered paragraph over 45 words**, and no
  build-scaffolding caption over 15 words.

## Motion

- Durations: `160ms` for hover and focus, `240ms` for anything that moves or
  reveals. **No single element animates longer than 240ms; a staggered group may
  total 500ms.** (Amended 9 September 2026 — the hero stagger is six items at
  40ms steps, 440ms end to end.)
- Easing: `cubic-bezier(.2,.6,.2,1)`.
- Permitted: 1px hover lift on buttons; border-colour transitions; the FAQ
  chevron; a fade-and-rise of 8px on section entry. The entry reveal may start at
  `opacity: 0`, but **only** once, only within 240ms, and only through `Reveal`,
  which renders content at its final position whenever `prefers-reduced-motion`
  is set. Nothing else is ever parked invisible. (Amended 9 September 2026.)
- Forbidden: parallax, scroll-jacking, counters that tick up, marquees,
  typewriter effects, anything that delays reading.
- `@media (prefers-reduced-motion: reduce)` disables all of it. Not optional.

## Imagery and icons

- **Photography:** low-key and warm, portraits with dark surrounds, shot to sit
  on the ground rather than be punched out of it. Real people in real
  workplaces; Warsaw and Kraków where the setting is legible. The type carries
  the authority; the photography is where the warmth goes. No handshakes, no
  stock smiling-at-laptop, no flags.
- **Forbid duotone.** It is the obvious, cheap answer to photography on a dark
  page, and it would make the whole direction look templated.
- **The strongest asset class is work product**, presented on a plate. This is
  the visual proof that replaces the income figure. Design sections to hold it.
- **Icons:** 1.5px stroke, 20px, line only, never filled, never coloured except
  `accent` on an active state.
- **Diagrams** (added 9 September 2026). Inline SVG only, no illustration
  library. Fills limited to `line`, `body` and `ink`; strokes 1.5px; **never
  `accent`** — a diagram is not the one gold thing on a screen. Always
  `aria-hidden`, with the meaning carried by the adjacent heading and body, since
  a diagram of an argument is not an accessible substitute for the argument.
  Always captioned `Illustrative.` — these draw a claim, they do not measure one.
  **Never randomise the data**: a hand-authored constant array, or it is both a
  hydration bug and a fabrication.
- **No emoji anywhere.**

## Accessibility

- Contrast floor 4.5:1 text, 3:1 edges. On `#0A0908`: `ink` and `body` pass
  comfortably, `accent` measures roughly 7.5:1, and `muted` is the lowest
  permitted pairing at roughly 5:1 — capped at labels and captions.
- `on-accent` dark text on gold. Never white on gold.
- Visible focus on everything focusable: 2px `accent` ring, 3px offset.
- Heading order never skips a level. The hero is the only `h1`.
- Targets ≥44×44.
- Every image gets real alt text; decorative rules are `aria-hidden`.
- The page must be fully usable with motion disabled and at 200% zoom.

## Tailwind mapping

The tokens exist so they can be enforced. Extend rather than replace, and delete
the default palette entries the design does not use so a stray `bg-slate-200`
fails loudly.

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        ground:'#0A0908', surface:'#131110', sunken:'#060505',
        line:{DEFAULT:'#2A2521', soft:'#1F1B18', gold:'rgba(201,162,39,.35)'},
        ink:'#F6F1E8', body:'#B0A79A', muted:'#877D71',
        accent:{DEFAULT:'#C9A227', hover:'#D8B43F', wash:'rgba(201,162,39,.12)', on:'#14110B'},
      },
      fontFamily: {
        serif:['"Instrument Serif"','Georgia','"Times New Roman"','serif'],
        sans:['"Familjen Grotesk"','-apple-system','BlinkMacSystemFont','"Segoe UI"','Helvetica','Arial','sans-serif'],
      },
      fontSize: {
        micro:['10px',{lineHeight:'1.2',letterSpacing:'0.26em'}],
        label:['11px',{lineHeight:'1.2',letterSpacing:'0.22em'}],
        caption:['13px',{lineHeight:'1.5'}],
        's':['14.5px',{lineHeight:'1.6'}],
        'base':['16.5px',{lineHeight:'1.65'}],
        'l':['18px',{lineHeight:'1.65'}],
        'h4':['19px',{lineHeight:'1.4'}],
        'h3':['24px',{lineHeight:'1.3'}],
        'h2':['40px',{lineHeight:'1.12',letterSpacing:'-0.008em'}],
        'display-l':['52px',{lineHeight:'1.06',letterSpacing:'-0.010em'}],
        'display-xl':['72px',{lineHeight:'1.04',letterSpacing:'-0.012em'}],
      },
      spacing: {section:'128px','section-sm':'80px', block:'56px', flow:'24px', card:'28px'},
      maxWidth: {page:'1120px', structure:'1040px', text:'720px', narrow:'520px'},
      borderRadius: {DEFAULT:'4px', badge:'2px', panel:'6px'},
      boxShadow: {
        card:'inset 0 1px 0 rgba(246,241,232,.05)',
        panel:'0 24px 60px -30px #000',
      },
      transitionTimingFunction: {ui:'cubic-bezier(.2,.6,.2,1)'},
    },
  },
}
```

## Do not

Violating any of these is a defect, not a preference.

**About the claims and the page**

- No countdown timers, scarcity bars, fake urgency, or "spots remaining".
- No value-stack pricing theatre — no crossed-out totals, no per-item values
  summing to an inflated figure.
- No income or salary figures as proof. No follower counts. No placement rates.
- No logo wall without context. Employer names locate an example and nothing more.
- No numbered markers on content that is not a real sequence.
- No section whose only content is a heading and three feature cards.

**About the system**

- No second accent. No gradients. No gold glow, shimmer or metallic texture.
- No pure white anywhere — `ink` is `#F6F1E8`.
- No serif below 21px, and never a synthesised bold on Instrument Serif.
- No pill shapes; radius is 2, 4 or 6 by role.
- No duotone photography, and no stock handshakes or laptop smiles.
- No full-bleed white screenshots — work product goes on a plate.
- No semantic hue imports; the outcome ladder uses weight and enclosure.
- No emoji as section markers.
- No component invented at build time. If a section needs something new, add it
  to this file first, with anatomy and prohibition, then build it.

---

## OPEN — must be resolved before this page can ship

Resolved by the offer letter: fee arithmetic, fee basis, cap rule, probation
trigger, service duration, delivery scope, client obligations, onboarding
timings, fit-call format (30 minutes, screened against a written standard).

Still open, in priority order:

**Blocks the whole page — added 8 September 2026, revision 2**

- **Is CCC carrying out regulated job placement?** Polish law regulates
  *pośrednictwo pracy* under the Act on employment promotion and labour market
  institutions. Entities doing it are entered in the **KRAZ** register, and the
  Act restricts charging the person seeking work — the model is employer-pays.
  CCC charges the job seeker 6,000 PLN plus three instalments. Which side of the
  line CCC sits on turns substantially on what it does, and evidentially on what
  its own marketing says it does. This page is designed to say, as loudly as it
  can, that CCC places people.

  Three steps, in order: (1) look up CCC’s current KRAZ status — minutes, not a
  legal opinion; (2) put the offer letter, the Representation Agreement and the
  IA spec’s work sections to Polish employment counsel with one question — does
  the described activity constitute pośrednictwo pracy, and if so what may
  lawfully be charged to the candidate; (3) **until answered, draft on the
  execution framing, not the representation framing.** CCC prepares materials and
  executes applications and outreach on the client’s instruction and in the
  client’s name. "We represent you", "we place you", "we present you", "the
  interviews we arrange" and "we open the doors" stay out of the draft.

  Note that Door Two’s warm introduction "through professionals we have already
  placed inside the companies you want to enter" is the same activity as the
  held-back Door Three, under another name.

**Page-blocking questions answered earlier**

All three page-blocking questions were answered on 8 September 2026 — see the
decisions under Claim rules. Operating volumes are publishable, the guarantees
are published, "we expect to place you" is approved, and Door Three is held
back from v1.

**Blocks specific sections**

Added 8 September 2026, revision 2 — each maps to a section in the IA spec:

- `[CONFIRM APPLICATION APPROVAL]` — does the client approve each application?
  The offer letter’s approval obligation covers CV, profile and content only, and
  Door One is ten or more a week with no approval step. Until this closes, the
  hero chip "you approve every application" is cut, because on the source
  documents it appears to be false.
- `[CONFIRM SIGNAL LAYER CONTROLS]` — the Signal Layer publishes 3–5 posts a week
  in the client’s voice on the client’s own profile. Need the approval mechanism,
  what an employed client may decline, and what a current employer can see. This
  is a material characteristic of the service and omitting it from the page is a
  misleading omission.
- `[CONFIRM SUCCESS-FEE EVENTS]` — specifically: an offer arising from an
  application the client sent before signing. Obligation seven requires reporting
  any offer from any source. This is the question that decides the sale.
- `[CONFIRM WITHDRAWAL AND EARLY-PERFORMANCE CONSENT]` — the onboarding sequence
  begins full performance inside the 14-day withdrawal window, which needs the
  consumer’s express request to start early and acknowledgement of the effect.
- `[CONFIRM CONTROLLER, PROCESSORS, TRANSFERS]` — the inline application form and
  Calendly both collect personal data, and Calendly is a US processor. Needed
  before the footer and the application step can be built.
- **A working Calendly URL.** Every CTA on the live site points at one that
  redirects to the Calendly homepage. Needs a human click to confirm.
- **Whether a VSL exists.** The audit found none on the live site — only nine
  testimonial embeds and a decorative background loop. If none exists it must be
  commissioned, scripted against the offer letter and these claim rules.

- **Case verification (P01–P06).** For each: consent, service actually received
  (coaching vs DFY), relevant experience, starting situation, specific work
  performed, dated evidence, exact milestone. Two known conflicts to reconcile:
  P02 Associate vs Senior Associate; P06 Business Development vs Data Analyst.
  Four of the six are interview-only and must never imply a hire.
- **Testimonial screenshots.** 125 in total — 105 from 2025, 20 from 2026,
  counted 8 September 2026. Sampled: they are
  community-platform posts by named individuals, showing interview invitations,
  with relative timestamps only. Consent to publish is unknown, service
  attribution is unknown, and a community post does not evidence DFY delivery.
  Need consent per person, service received, and absolute dates.
- **Raise cap for unemployed clients**, equal-pay moves and career changes. The
  cap is defined against a raise; for someone with no current salary the rule is
  undefined.
- **Tax and invoicing on the 6,000 PLN** — gross or net, VAT, invoice to
  individual or company. And whether instalments are available on it.
- **Supported roles, languages and permitted pivots.** "3+ years" is a threshold,
  not a fit definition.
- **Escalation policy** — what changes when responses are weak, and the review
  cadence. The copy brief requires this for the process section.
- **The delivery team.** Named individuals with stated specialisms are one of the
  strongest patterns in the reference set. Confirm who they are and whether they
  can be named.
- **Duration conflict.** The No-Stop Guarantee says unlimited; the published
  terms page (`/regulamin`) says individually agreed. Reconcile before either
  statement is carried into copy. Now urgent: the No-Stop Guarantee is going on
  the page, so the terms page has to agree with it.
- **Door Three evidence**, for a later version — which employers, how many
  placements, live or aspirational. Parked, not cancelled.

**Launch blockers — added 8 September 2026, revision 2**

- **Filming matched video cases.** Seven of the nine testimonial videos on the
  live site are graduate or survival-job stories — the framing the strategy brief
  told us to replace. Only the ING → US Bank case clearly fits. Four to five new
  films with experienced clients, each carrying the seven fields in
  `docs/assets/2026-09-08-video-inventory.md`.
- **Founder photography.** The page carries a signed founder statement in the
  representation section; four of five critique lenses found the page otherwise
  has no human presence at all.
- **Artefact specimens.** Built from real templates with a fictional client and
  employer, labelled as such. Redacted originals were ruled out: name removal is
  not anonymisation, and the dossier profiles third parties who never contracted
  with CCC.

**Accepted risk — recorded, not resolved**

The live site carries claims this page forbids: "180+ Internationals Placed in
Poland", "15M+ PLN earned by clients annually", "15+ interviews in 30 days", and
an uncontextualised employer list. The founder’s YouTube bio says "180+ hires |
14M zł/yr", which disagrees with the site’s own figure. Decision of 8 September:
new page only, existing site untouched. Consequence: the two surfaces contradict
each other, and "180+ Internationals Placed in Poland" is the most load-bearing
sentence for the KRAZ question while that question is open.

**Needed before launch, not before drafting**

- VSL title, runtime, and whether its claims match the offer letter.
- Brand assets: logo, founder and team photography, and work-product samples
  (before/after CV, a redrawn LinkedIn headline, a real outreach message with
  the name removed). The design system treats work product as the primary
  visual proof class.
- Whether a Polish-language version is needed.
- Page location (path or subdomain), the application form or booking tool, and
  UTM/analytics so the funnel in the strategy brief can actually be measured.
- ~~Deploy target~~ — decided 10 September 2026: Vercel, deploying from `main`
  of `0002F16/new-ccc-website`. See Stack.

## Current phase

Design system replaced 8 September 2026: **Gilt** (direction 03) supersedes the
Blueprint system written earlier the same day. The seven-direction specimen page
is preserved unchanged as the record of the choice.

Next: scaffold the Next.js + Tailwind project and build the primitives listed
under Components, before any section work.
