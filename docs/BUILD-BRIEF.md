# Section build brief

Read this before building any section component. It is the contract between the
Gilt design system (`CLAUDE.md`, binding) and the section files.

## Where things are

- `app/page.tsx` — composes sections in IA order. Sections are added here.
- `components/sections/` — one file per numbered IA section.
- `components/ui/` — the primitives. **Import from `@/components/ui` only.**
- Copy: `docs/copy/2026-09-08-copy-deck-v1.md` — verbatim source of every string.
- IA: `docs/superpowers/specs/2026-09-08-landing-page-ia-design.md` — structure.
- System: `CLAUDE.md` — colour, type, spacing, components, prohibitions.

## File contract

One file per section: `components/sections/NN-slug.tsx`, default-free named
export in PascalCase, e.g. `export function Hero()`. Server components by
default; add `'use client'` only where interaction genuinely requires it.

## Primitives available

`Section` `Band` `Stack` `MovementRule` · `Eyebrow` `Display` `Gold` `Em` `H3`
`H4` `Lede` `Body` `Caption` `Label` `SectionHeader` · `Button` `CtaBlock`
`CTA_LABEL` · `ChipRow` · `Card` `Well` · `SpecList` `Op` · `OutcomeBadge` ·
`CaseCard` · `ProcessStep` · `Faq` · `Testimonial` · `VideoFrame` ·
`WorkProductPlate` · `Field` · `StickyCta` · `cx`

**Do not invent a component.** If a section appears to need one, stop and report
it rather than adding it — new components go into `CLAUDE.md` first, with
anatomy and prohibition.

## Hard rules (violations are defects)

1. **Tokens only.** No arbitrary colour, size, radius or shadow. Every class
   resolves to a token in `tailwind.config.ts`. The default Tailwind palette is
   deleted, so `bg-slate-200` fails the build — that is intentional.
2. **One accent per screen.** At most one `line-gold` element per section.
3. **Never signal a section change with a background colour.** `ground` runs
   unbroken. Movement boundaries use `MovementRule`, and there are exactly four.
4. **Serif never below 21px, never bold, never synthesised.** `h3`/`h4` are
   grotesk 600.
5. **Prose at `max-w-text` (720px), structure at `max-w-structure` (1040px).**
   Nothing sits at an in-between width — that alternation is the page's rhythm.
6. **Gap, never margins between siblings.** Use `Stack` or a `gap-*` token.
7. **Copy is verbatim from the copy deck.** Do not write, improve or invent
   copy. A `[BLOCKED: ...]` passage ships as nothing — omit the element and note
   it in your report. Never guess past a blocker.
8. **Claim rules bind.** No placement rates, no salary figures, no guaranteed
   timelines, no employer partnerships, no "we only get paid when you do".
   Execution framing only: CCC prepares materials and executes applications and
   outreach on the client's instruction and in the client's name — never
   "we represent you", "we place you", "we present you", "the interviews we
   arrange", "we open the doors".
9. **Accessibility.** Heading order never skips (hero owns the only `h1`);
   targets ≥44×44; real alt text; decorative rules `aria-hidden`; usable at 200%
   zoom and with motion disabled.
10. **No emoji, no gradients, no glow, no pill radius, no pure white, no
    duotone, no full-bleed white screenshots.**

## Build isolation — mandatory when agents run in parallel

Concurrent builds race on `.next` and produce spurious `MODULE_NOT_FOUND` /
`PageNotFoundError` failures that have nothing to do with your code. So always
build and preview into your own directory and your own port:

```
NEXT_DIST_DIR=.next-<your-slug> npm run build
NEXT_DIST_DIR=.next-dev-<your-slug> npx next dev -p <your port>
```

Never delete `.next` or `.next-*` belonging to anyone else. Delete your own
preview route and your own dist dirs before you finish.

## Definition of done

- `NEXT_DIST_DIR=.next-<your-slug> npm run build` passes (type-check + lint).
- Section renders at 1280px and 390px. A section that cannot reflow gets a
  separate mobile component, not a pile of overrides.
- Report: what you built, every copy-deck blocker you hit, every place the
  system felt short a component, and anything you had to assume.

---

## House patterns — settled by earlier waves, do not re-invent

These emerged from Movements I and II. They are compositions of existing
primitives, not new components, and they are **pending ratification in
`CLAUDE.md`**. Follow them exactly so the page does not drift; do not improve on
them unilaterally.

- **Situation marker** — the IA's "mono label" tagging a block to the situation
  it serves. Gilt has no monospace face, so it is the `Label` primitive:
  letterspaced small caps in `muted`, above the block's `H3`. See
  `components/sections/04-three-bottlenecks.tsx`.
- **Ledger row** — a `Label` + `H3` + `Body` on a two-column grid inside
  `max-w-structure`, prose column capped at `max-w-text`, rows divided by a
  `border-line` hairline, nothing enclosed. Use this instead of a card grid
  whenever items are peers with unequal prose lengths. `SpecList` is too
  small-typed to carry a heading plus a body paragraph. See section 04.
- **Blocked slot** — any element standing in for missing content carries
  `data-blocked="<short-reason>"` on its outermost node, the dashed `unverified`
  treatment, and a badge naming what is missing in words. One grep for
  `data-blocked` must list everything owed before launch. See
  `components/sections/06-video.tsx`.
- **Peer comparison** — when a block compares CCC against alternatives, all
  options take identical enclosure, identical anatomy and identical type weight.
  `Op` (ink emphasis) is not used to mark CCC's column. See section 05.
- **Accent budget** — in practice the eyebrow hairline spends the section's one
  gold element. If a section needs gold elsewhere, drop the eyebrow hairline
  (`<Eyebrow hairline={false}>`) rather than adding a second.

---

## Round 2 — owner feedback, 9 September 2026. These override earlier rules.

The page reads too long and too careful. The owner's words: *"keep the text sharp,
to the point, short, intentional… 3 lines or less. ppl aint reading all that
shit."*

**Rule 7 is relaxed.** Copy is no longer verbatim from the deck — prose may be
rewritten for length and punch. **Inventing facts is still forbidden**, and every
claim rule not explicitly overridden in `CLAUDE.md`'s "Overridden 9 September
2026" section still binds: no new figures, no timelines, execution framing intact,
blocked passages still ship as nothing.

Hard targets:

- **No rendered paragraph over 45 words.** None over 3 lines at `w-text`.
- **No build-scaffolding caption over 15 words.** A blocked slot keeps its badge,
  its `data-blocked` attribute and one short line; the full explanation moves into
  the file's code comment, where the build team actually reads it. Roughly half of
  all text the page renders today is scaffolding — that is the biggest single win
  available and it costs no argument.
- **Cut duplication ruthlessly.** An audit found 17 clusters of repeated content:
  the fit call is described in 6 places, "not coaching" in 5, selectivity in 5,
  "ten or more applications a week" in 4, the client obligations in 4. If a fact
  is stated in an earlier section, do not restate it — reference it or drop it.

New primitives available:

- `StatRow` — `{ stats: Stat[] }`, `Stat = { figure, label }`. Hero only.
- `VideoEmbed` — `{ id, title }`. Click-to-play YouTube facade, plays inline.
- `Reveal` — `{ delay?, className? }`. The page's only motion device: 8px rise,
  240ms, once, reduced-motion safe. Wrap a block, do not wrap every element.

The CTA label changed to **"Yes — I'm ready to apply"**. It lives in `CTA_LABEL`
(`components/ui/Button.tsx`) — never hardcode a label.
