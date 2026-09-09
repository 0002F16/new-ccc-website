# Proposed amendments to the Gilt system and the specs

9 September 2026. Raised by the section builds of Movements I–III. **Nothing here
is applied.** `CLAUDE.md` is binding and the IA spec is a record; both are the
owner's to change. Each item states what was hit, what was done in the meantime,
and what the amendment would say.

## A. Documents that now contradict each other — fix before more building

**A1. The warm-introduction line is retired in the copy deck and live in the IA
spec.** The deck records that introductions "through professionals we have
already placed inside the companies you want to enter" were rewritten as outreach
sent in the client's name. The IA spec still carries the original in three
places, including under Accepted risks, where it says the phrase "stays in §11
pending the regulatory answer."

*Risk:* the sentence uses "placed", it is the held-back Door Three under another
name, and `CLAUDE.md` names it as the KRAZ trap. Anyone revising §11 from the IA
rather than the deck reinstates it.
*Amendment:* correct the IA spec's three occurrences and its Accepted-risks entry
to match the deck. Highest priority item on this page.

**A1b. The IA spec's §16 contains "while CCC negotiates on their behalf".** That
is representation framing, not execution framing, and it is exactly what the open
KRAZ item says to draft away from. It reached no section file — but whoever builds
§16 (the fee) reads that line first.
*Amendment:* strike it from the spec before §16 is built.

**A1c. The IA titles §13 "The Negotiation Table and the Net Positive Close".** The
copy deck's §13 is the negotiation only and supplies no Net Positive Close copy,
so the stage is currently absent from the page.
*Amendment:* decide whether the Close belongs in v1; if so, the deck owes copy.

**A1d. The Raise Guarantee has no cross-reference sentence.** §13 deliberately did
not restate it (restating it there would publish it without the condition that
voids it), and the deck supplies no pointer wording.
*Amendment:* if a pointer from §13 to §17 is wanted, the deck owes the sentence.

**A2. The copy deck describes the outcome ladder as carrying "its outcome-ladder
colour".** Gilt encodes the ladder with weight and enclosure precisely because
importing extra hues breaks the one-accent discipline.
*Amendment:* the deck should read "its outcome-ladder treatment".

**A3. The IA specifies exhibit callout numerals in `accent`.** Two callout
numerals plus an eyebrow hairline is three golds on one screen, which the system
forbids. Sections 04 and 10 both independently rejected it and used `muted`.
*Amendment:* ratify `muted` numerals in the IA, or grant callouts an explicit
exemption from the accent budget. Sections 11–13 all carry callouts.

**A4. "Two of these three cost you nothing"** (copy deck §5) sits against a
do-it-yourself row whose stated cost is "Your time". Copy-owner fix.

**A5. `display-xl` is specced at a max 16ch measure**, which the hero headline
cannot meet without breaking mid-sentence.
*Amendment:* state 16ch as guidance for short display headings, not a constraint.

**A6. Is the dossier exhibit an image or live text?** The IA inventory says the
dossier is the one artefact that stays an image; the copy deck supplies alt text
for it, which also implies an image. Every other Movement III exhibit is live
HTML. The specimen is blocked, so nothing forces the choice today, but it decides
whether `WorkProductPlate` or a text plate is correct when it is built.

**A7. The IA asks §12 to run to `w-page`** "the largest through contrast", while
`CLAUDE.md` reserves `w-page` for the sticky bar and footer and forbids
in-between widths. The build resolved it in the system's favour (`w-structure`).
*Amendment:* correct the IA, or grant §12 a stated exception.

## B. Components the sections needed and the system does not define

**B1. Exhibit shell — the significant gap.** The IA specifies a five-part
anatomy: provenance line · crop window · numbered callouts · legend ·
verification state, with a separately authored mobile crop. `WorkProductPlate`
implements part two and a caption. Sections 9, 10, 11, 12 and 13 all need the
full anatomy, and three of them have now hand-rolled a version of it.
*Amendment:* add `Exhibit` to `CLAUDE.md` with anatomy and prohibition, then
refactor 09/10/11 onto it. Without this, five sections drift.

**B2. Text artefact plate.** `WorkProductPlate` takes an `<img>`, but three
Movement III exhibits are specified as live HTML text, not screenshots — the
activity log, the outreach message, the dossier contents. Live text is also the
accessible and selectable option.
*Amendment:* either a `variant="text"` on the plate, or a sibling component.

**B3. Blocked slot.** Used three ways across sections 06, 07, 09, 10 and 11 and
converging on one shape: dashed `unverified` edge, a badge naming what is missing
in words, `data-blocked="<reason>"` on the outermost node, scaffolding caption.
*Amendment:* ratify that anatomy, with the prohibition that it must not survive
to production, and keep `grep -r data-blocked` as the pre-launch check.

**B4. Situation marker.** The IA asks for a "mono label"; Gilt has no monospace
face, so it is the small-caps `Label` primitive. Sections 04, 09, 10 and 11 have
each placed one, two of them at section level with no precedent to follow.
*Amendment:* add a `marker` prop to `SectionHeader` and fix the placement, or
three more sections will each compose their own.

**B5. Ledger row.** `Label` + `H3` + `Body` on a two-column grid, hairline
divided, nothing enclosed — for peer items with unequal prose lengths, where a
card grid would rag and `SpecList` is too small-typed to carry a heading plus a
paragraph.
*Amendment:* name it, or accept it as a composition and document it.

**B6. `SpecList` stacked variant.** `CLAUDE.md` sanctions term-above-value
"stacked inside centred prose", but the primitive only reaches that below 480px,
so it is a viewport behaviour rather than an option. This is what made a three-up
comparison layout unbuildable in §5.
*Amendment:* add `layout="stacked"`.

**B7. No emphasis form for a prohibition sentence in running prose.** Gilt
permits serif italic (editorial) and gold (one phrase per screen). The
immigration/visa line needed neither, and only landed correctly because it
happened to sit inside a spec pair, where `Op` (ink) was available.
*Amendment:* define one, or state that such sentences always go in spec pairs.

**B8. `CaseCard` has no employer-locator slot.** Employer names are the one thing
the claim rules explicitly permit as a locator, and they currently have to be
folded into `startingPoint`. Decide before verified cases land.

**B10. `ProcessStep` is unusable as specced.** Its numeral renders in `accent`, so
any section with more than one step — which is every section it exists for —
breaks the one-accent rule on instantiation. Sections 04, 10 and 20 have each
independently worked around it with `muted` numerals, and the primitive is
currently used by nothing.
*Amendment:* give it a `tone` prop (`accent` | `muted`, default `muted`) and
ratify the rule that **repeated elements never take the accent, regardless of
whether the eyebrow hairline is present.** The current accent-budget rule
resolves "hairline vs one other gold element" but not "hairline vs N repeated
gold elements".

## B9. A blocked *section*, not a blocked element

`data-blocked` was designed for a missing element inside a written section. §15
(how the search is reviewed) is the first case where the blocked slot **is** the
section — the copy deck supplies no eyebrow, no h2, no lede and no body, only the
blocker. It renders no heading at all, deliberately: announcing "how the search is
reviewed" over an empty panel is the IA's own "zero under a heading" failure, and
it would undercut the No-Stop Guarantee that §15 exists to support.
*Amendment:* ratify "blocked section" with the rule that it renders no heading.

**Recommendation carried forward: §15 is NOT composed into `app/page.tsx` for
v1.** Movement III closes on §14 until the policy is written. Note this is a
structural cost, not a missing nicety: §17 publishes the No-Stop Guarantee ("no
time limit"), Movement III describes only the first weeks, and §15 is the only
thing specified to bridge them. That is an argument for writing the policy.

**These three are one gap, and should be answered together:** the §15 escalation
and review policy; §17's blocked "what discharges CCC under the No-Stop
Guarantee"; and the `/regulamin` duration conflict (unlimited vs individually
agreed). Nobody has yet written down what the unlimited-duration promise commits
CCC to over time.

## D. A launch blocker nobody had logged

**The free resources have no destination.** The copy deck gives the link label
("Free resources and templates") and the footer body names a free course, CV
templates and a community — but no URL exists for any of them in the deck, the IA
spec or `CLAUDE.md`. The label therefore renders as text, not a link.

This matters more than a missing URL usually would: the free resources are the
page's entire secondary route for readers who are not ready to apply, and **two
other sections point at them** — §5's closing line ("free resources are at the
bottom of this page") and the FAQ's coaching answer. Both currently point at
prose that goes nowhere. Add it to the OPEN list.

## C. Content decisions the builds are waiting on

- Do the situation markers ship as page copy? The deck sets them in the same
  italic register it uses for "Claim note:", which is clearly authorial.
- "An advertised job with three hundred applicants is a queue" — the only
  unsourced number in Movement II.
- §9's provenance line, three callouts, legend and alt text are copy-complete but
  were held back with the missing artefact, on the grounds that they describe
  evidence the page does not have. Same judgement in §11. Confirm or reverse.
- §7: if the case placeholders are stripped before verified cases arrive, the
  whole section goes, heading included — its h2 is a claim about content that
  would not exist.
