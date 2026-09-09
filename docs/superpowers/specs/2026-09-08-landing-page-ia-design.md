# Landing page — information architecture

8 September 2026, revision 2. Design spec. Supersedes the page sequence in
`2026-09-07-landing-page-strategy.md` §"Proposed hero and page sequence" and in
`2026-09-08-copywriter-research-pack.md` §8. The claim rules in `CLAUDE.md` are
unchanged and bind everything below.

**Revision 2** rewrites revision 1 against five independent critiques —
conversion, information architecture, UX, skeptical buyer, and risk/claims —
consolidated in `2026-09-08-ia-critique-findings.md`. Asset findings are in
`../assets/2026-09-08-video-inventory.md`.

## What this document decides

The order of the argument, what each section is for, which proof it carries, and
what blocks it. It does not write copy or choose layouts.

## Decisions

| Question | Decision |
|---|---|
| Scope | One standalone long-form page. No navigation, one CTA wording. |
| Video placement | Movement II, after the diagnosis. The page must work without it. |
| CTA destination | Inline application step with Calendly embedded below it. |
| Proof spine | Work artefacts, at volume, built as **specimens** rather than redacted originals. |
| Testimonials | Video, matched to the experienced ICP. **Filming matched cases is a launch blocker.** |
| Founder presence | Woven through the page. No standalone team section. |
| Framing | Outcome-led, with headings that name the act rather than the effect. |
| Existing site's claims | Out of scope. See Accepted risks. |

## Two rules that govern everything below

### The deliverable/result test

**Deliverable outcomes** — things CCC does and controls by acting — are
publishable. **Result outcomes** — things requiring an employer to agree — are
not. If keeping a promise requires an employer to agree, the heading is wrong.

Revision 1 stated this test and then failed it three times out of four. Applied
honestly it also rules out absolutes ("every interview") and comparatives ("reach
people applications never reach"), because CCC controls the sending, not the
reaching, and cannot brief an interview reported to it twelve hours beforehand.

**So headings name the act, not the effect.** "Ten or more applications a week,
sent for you" rather than "you get your week back." Duller, checkable, and
checkable is the premise of Blueprint. The emotional register moves to the
situations section and to body copy, where nothing is being promised.

### Outcome frames the section; process evidences it

`CLAUDE.md` states Blueprint's idea as *"visible process."* This narrows it: the
process stays fully visible, it has just stopped being the headline. The reason is
in the research — a list of documents reads as expensive CV editing. But the
correction from revision 1 is that **the reader's own diagnosis comes first**.
38% named "CV/LinkedIn not noticed" as their challenge. You satisfy that theory,
then extend past it. You do not skip it to arrive at your better one.

## Structure — five movements

Revision 1 derived four movements from a border-colour token permitting three
`line-strong` rules. That reasoned backwards. The argument decides its own
boundaries; the system records the result. Five movements, four rules — and
`CLAUDE.md` is amended to match.

Each movement answers exactly one question.

---

### Movement I — Recognition
*Is this me, and what is being sold?*

**1. Hero**
Eyebrow names audience, Poland and the 3+ year threshold. `display-xl` headline
with its one permitted `accent` phrase, subhead, primary CTA, objection chip row.

*Chips, corrected.* Revision 1 proposed "you approve every application." The offer
letter's approval obligation covers CV, profile and content — applications are not
in it, and Door One is ten or more a week with no approval step. **That chip is
cut** until `[CONFIRM APPLICATION APPROVAL]` closes. "Full fee stated before the
call" is also unkeepable, since the back-end fee is a percentage of an unknown
future salary; it is replaced by the activation figure itself.

Chips become anchors that jump to the section keeping their promise. A chip
promising information with no way to reach it is a scent trail to nothing.

**2. Two situations**
Stalled search and stalled career, parallel, equal space and specificity. Each
carries a stakes paragraph written in the research pack's emotional register —
the applications you stopped counting, the rejection with no reason in it; the
manager conversation that goes the same way every year. Written, not quoted:
private customer language is research material, not publishable testimony.

*Mobile:* stacking makes "equal weight" impossible, because the second panel is
read by fewer people by definition. Separate mobile component — a two-panel
segmented control, both labels visible and equal, both panels in the DOM, real tab
semantics, neither hidden from a screen reader.

**3. What this is, and who it is for**
DFY defined in plain language on first use. Fit criteria as the reader's own
checklist — location, years, role families, participation, ability to fund, stated
neutrally. What the fit call is: 30 minutes, screened against a written standard.

One explicit line: **CCC does not provide immigration, visa or work-permit
services.** For a page offering to represent immigrants into Polish employment,
that inference is invited and must be closed.

*Why this exists:* revision 1 dissolved fit criteria into Admissions. They are
different objects — Admissions is CCC's judgement about the reader; fit criteria
are the reader's own checklist. Collapsing them left qualification resting on an
11.5px eyebrow and a six-word chip, against 28% of lost leads marked unqualified.

`[CONFIRM SUPPORTED PROFILES]`

⎯ `line-strong` ⎯

### Movement II — Why it hasn't worked
*The bridge. Absent from revision 1 entirely.*

Revision 1 ran situations → video → "you stop applying," with nothing explaining
why the reader's own effort failed. Every outcome block was therefore an answer to
an unasked question. The research pack specified this section (§8 row 4) and it
was dropped — because the easy version is forbidden, and avoiding one banned
diagnosis is not the same as deciding the page needs no diagnosis.

**4. Three bottlenecks**
Volume you cannot sustain alone · roles that never reach an applicant · interviews
entered unprepared. Each framed as *a* bottleneck, not *the* cause, and each
tagged to the situation it serves.

*Prohibition:* no blanket ATS explanation, no universal mechanism claim. The third
bottleneck is also the only entry point on the page for the third-largest observed
pain — 43/145 reporting interviews without success — which revision 1 stranded.

**5. Do it alone, buy advice, or be represented**
Three columns as spec pairs: what each costs in the reader's own hours, and what
each does not include. Honest about DIY and coaching as legitimate choices, not as
failures of commitment.

*Why this exists:* of 76 recorded involvement answers only 12 chose fully handled;
29 chose self-directed with guidance. DIY and coaching are the actual competitors,
and revision 1 handled them with a two-word chip. Route the first two columns to
the free resources.

**6. The video**
Placed here, where the reader has a specific question rather than a general ache.

Poster frame shows a face at rest — this is the founder's largest single
appearance and it should not be a black rectangle behind a play button. Caption
states the thesis and the runtime, so a skipper still gets the argument. CTA block
directly beneath: a viewer who finishes currently has no action available. Never
autoplay.

`[BLOCKED: no VSL exists.]` The asset audit found no video sales letter anywhere
on the live site. Either one is supplied or one is commissioned, scripted against
the offer letter and these claim rules — not against the current homepage's copy.

**7. Interviews, offers and job starts**
The case slot, on a seam. Placed here so that if it is empty its absence removes a
section from a running argument rather than decapitating a movement — which is
what happened in revision 1, where it was the climax.

**One case per situation, minimum** — a stalled search and a stalled career.
Revision 1 pooled all cases into a single slot, which let the employed reader
reach the end of the page without seeing anyone resembling themselves. Video cases matched to the experienced ICP, each stating one precise milestone in
words and in ladder colour. Case cards keep the fixed order: starting point,
obstacle, work done, outcome, date.

*Renamed.* "What came out of it" was a euphemism sitting on the one component the
claim rules exist to constrain. Precise labelling is the rule; the heading is the
first place it applies.

`[LAUNCH BLOCKER]` Seven of the nine existing testimonial videos are graduate or
survival-job stories — the framing the strategy brief told us to remove. Filming
four to five matched cases is a launch blocker. See the video inventory for the
seven fields required per case. One fully consented case beats six unverified
ones; zero, announced under a heading, is worse than no heading at all.

⎯ `line-strong` ⎯

### Movement III — The work
*One job: what the team does. Interleaved artefacts throughout.*

**8. You stop applying**
The representation idea, stated once. Carries a **signed founder statement with a
photograph** — name, Warsaw, two sentences, and the offer letter's own line about
being short of hours and short of access, as attributed speech rather than page
copy.

*Why the founder is here.* Four of five critiques independently found the page had
no human presence, and the page's own metaphor is representation, which requires a
representative. This is not a team section — it is the founder appearing where the
idea he is accountable for is stated.

*Also here:* one spec pair on existing pipelines. What happens to applications
already in flight, whether CCC prepares the client for an interview they sourced
themselves, and how the fee treats an offer arising from them. "You stop applying"
is inaudible to an employed reader with three live processes, and revision 1 never
addressed them.

`[CONFIRM SUCCESS-FEE EVENTS]`

**9. Your CV and profile, rebuilt from your raw history**
Restored as the first mechanism block. Concedes the reader's own diagnosis, then
extends past it — the pivot line is what earns the rest of the movement:
*that fixes what you can see; it does not fix the fact that most of these roles
are filled before anyone reads a CV.*
*Artefacts:* CV before/after, redrawn LinkedIn headline.

**Carries the Signal Layer**, which was absent from revision 1 altogether: three
to five posts a week, published in the client's voice on the client's own profile,
using access the client provides. Stated plainly, with the approval mechanism and
what an employed client can decline.

**Carries discretion** as explicit spec pairs: who is contacted, what is said,
what is published in the client's name, what a current employer can see, and what
the client approves first.

*Why:* omitting a material characteristic of the service from a sales page is a
misleading omission. The practical version is worse — a client discovers after
signature that CCC has been posting under their name, and if an employed client's
manager sees it, the harm is career-scale and CCC caused it. If the honest version
is unattractive, that is information about the offer, not about the copy.

`[CONFIRM SIGNAL LAYER CONTROLS]` `[CONFIRM APPROVALS AND ACCESS]`

**10. Ten or more applications a week, sent for you**
*Artefact:* weekly activity log, built as a real HTML table.

**11. Thirty to seventy direct approaches a week, to the people who decide**
30–70 per week, plus warm introductions where a relationship exists.
*Artefact:* outreach thread, transcribed to live HTML.
Door Three remains held back per the 8 September decision. Note that Door Two's
"introduction through professionals we have already placed inside the companies
you want to enter" is the same activity under another name — see Accepted risks.

**12. Every confirmed interview gets a dossier within 24 hours**
The movement's climax and the strongest exhibit available: company, interviewers,
15–20 predicted questions with answers built.
*Artefact:* dossier specimen, cropped and annotated, plus its contents list in
live text. Runs to `w-page` where the others run to `w-content` — it reads as the
largest through contrast, not height.

**13. The offer conversation, not had alone**
The Negotiation Table and the Net Positive Close.
*Artefact:* negotiation **preparation** — anchor rationale, market-data structure,
scripted language. Revision 1 proposed an "offer comparison," which is by
definition salary figures and is directly forbidden. Every figure becomes a
relative marker. The exhibit evidences that the client was prepared, not what they
were paid.

**14. What we run, what you do**
A two-column ledger. Left: everything CCC runs, one line each, drawn from 9–13.
Right: the seven client obligations compressed into three named commitments —
give us your history · approve what goes out · show up and tell us what happened —
each expanding to its exact obligations and deadlines.

*Why merged.* The strategy brief specified one section. Revision 1 split it into
thousands of pixels of team work and one isolated block of client duties at peak
fatigue, immediately before the price — which destroys the comparison, and the
comparison is the answer to the delegation objection. Seven duties beside twenty
CCC duties reads as a bargain; seven alone reads as a contract schedule.

*Prohibition:* never imply the client does nothing.

**15. How the search is reviewed**
Review cadence, and what changes when responses are weak. `[BLOCKED: escalation
policy]` — on the OPEN list, and the copy brief requires it.

*Why it matters here:* the No-Stop Guarantee promises work continues indefinitely.
A page that promises unlimited duration and then describes only week one leaves
its strongest promise structurally unsupported.

⎯ `line-strong` ⎯

### Movement IV — The commitment
*What it costs, what protects me, am I accepted?*

**16. The fee — 6,000 PLN, then three capped instalments**
Figure in the heading. 6,000 PLN activation on signature, then three instalments,
each the lesser of 23% of the new gross monthly salary or the monthly raise
secured.

**The Net Positive claim must be restated.** Revision 1 carried "the cap is the
raise, so a payment can never exceed the increase," and the offer letter goes
further: "there is no month in which working with me costs you money. That is
arithmetic, not a promise." It is not. A client moving 10,000 → 11,000 PLN pays
6,000 on signature plus 1,000 × 3; three months in they are 6,000 down against
staying put. `CLAUDE.md` forbids "we only get paid when you do" precisely because
of the activation fee, and this is that claim renamed.

Permitted form: *from the new role onwards, each instalment is capped at the
raise, so no monthly payment exceeds your increase. The 6,000 PLN activation fee
is paid before that and is separate.* Both sentences true. **The activation fee is
named wherever the cap is named.**

*Two worked examples, not one*, and one of them a low-raise case rather than a
flattering one. Each shows the total including activation. State the contract
basis explicitly — UoP and B2B mean different numbers in Poland — and whether
"current earnings" for the Raise Guarantee is base only or base plus variable.

*Names CCC's own incentive.* The back end is capped by the raise, so CCC earns
nothing if the client takes a lateral move — while CCC negotiates on their behalf.
One spec pair states this and confirms the decision to accept any offer is the
client's alone. Naming your own incentive is the cheapest credibility purchase on
the page; declining to name it reads as hiding it.

`[CONFIRM CAP RULE]` — undefined for unemployed clients, equal-pay moves and
career changes, which is a large share of the audience. `[CONFIRM TAX]` — gross or
net, VAT, invoice to individual or company, and whether activation can be split.

**17. The guarantees**
No-Stop, Raise, Probation, Admissions — as contractual terms, arriving as
protections on a number the reader now has.

**Each is stated with the condition that voids it.** The offer letter says "the
guarantees hold only if you hold up your side. There are seven things." Revision 1
published the guarantees three sections from the obligations and never linked
them, which publishes a different and stronger guarantee than the one being sold.
The block cross-refers to the ledger in §14 rather than repeating it.

**No-Stop needs its economics stated**, because on the published volumes it is not
believable: 10+ applications and 30–70 approaches a week, indefinitely, on a 6,000
PLN activation. The mechanism that makes it survivable — strict admissions, and a
back end that only arrives on a raise — belongs on the page. A guarantee with
visible economics is believable; one without is a slogan.

**No-Stop also needs a defined end.** Nothing currently discharges CCC. Define
termination in the Agreement and state it in one line.

`[BLOCKED: /regulamin]` The terms page says duration is individually agreed; the
guarantee says no time limit. Reconcile before publishing, in the direction of the
marketing or by narrowing the marketing. A suspicious reader opens the terms page,
and a contradiction found there discredits the whole page, not one section.

**18. Admissions**
Rewritten in the third person as a standard, not a prediction addressed to the
reader. In the offer letter, "we expect to place you" is a judgement about a named
individual who has passed a screen. On a public page addressed to a stranger the
same words become *we place the people we accept* — a general effectiveness claim
with no verified denominator.

Both clauses bound **in one sentence**, so no single-sentence screenshot carries
the forbidden implication. Adjacency of separate blocks does not survive an ad
crop.

Publish the actual criteria screened against. Selectivity that lists its own
rejection reasons is credible; selectivity that only asserts itself is a
technique, and every high-ticket seller uses it.

*"Scarcity" is removed from this section's stated job.* Revision 1 called it "the
page's scarcity, and it is a real one." Nothing in any source document establishes
a capacity constraint, and the research pack's claim register says to omit
artificial scarcity. An admissions standard argued honestly does not need to be
scarcity to work.

**19. FAQ**
Definition list at `w-narrow`, native details/summary. **Nothing about money is
collapsed by default.**

**First item, open:** *I have applications out already. If one of them turns into
an offer, do I pay you?* Client obligation seven requires reporting any offer from
any source; the FAQ previously covered only getting an *interview* independently.
That gap is the question that decides the sale, and a reader who has to infer the
answer infers a worse one than the truth. `[CONFIRM SUCCESS-FEE EVENTS]`

Add: *will my current employer see this?* — distinct from "can I do this while
employed," which is a scheduling question.

Three answers are hoisted to where the doubt occurs and left here as well —
"is this coaching?" under §8, "who approves what goes out?" under §11, "what if I
get an interview on my own?" under §16. Repetition at the point of decision is not
redundancy; an unanswered objection discounts everything after it.

*Rule:* a question without a confirmed policy stays off the page rather than
receiving an invented answer. Five of the nine priority questions are currently
blocked.

⎯ `line-strong` ⎯

### Movement V — The invitation

**20. Where you are by day seven**
States what is true at each point rather than what CCC does: within 24 hours a
named person is on your search; within 48 hours of the Raw Experience Dump your CV
draft is in your hands; by day seven your search is live. Numbering permitted, the
order is real.

**The fee figure is removed from here.** Revision 1 opened this section with
"signature, then 6,000 PLN activation by BLIK or transfer," which introduced the
price as a payment instruction inside a logistics checklist, before anything
justified it. The figure is established in §16 and referenced here.

**Adds the withdrawal line.** This sequence begins full performance inside the
14-day withdrawal window, which is lawful only with the consumer's express request
to begin early and their acknowledgement of the consequence. The section that
advertises the fast start is the section that states the right.
`[CONFIRM WITHDRAWAL AND EARLY-PERFORMANCE CONSENT]`

**21. Apply for a fit call**
Built as an **inline application step**. Every CTA on the page scrolls here rather
than navigating away.

Three parts: a panel restating who this is for, what the 30 minutes covers and
what it does not, and the fee in one line so nobody books to discover the price;
three or four screening questions in the page's own form primitive; the Calendly
widget embedded below, so the calendar appears inside CCC's own frame and the
scroll position survives.

*Why:* a reader told "we decline the majority of applicants" who then meets an
unscreened open calendar has been given evidence the admissions story is
marketing. Frictionless booking is how 28% of lost leads became unqualified.

If the embed is not viable for v1: in-page confirmation before redirect,
`target="_blank"` so the page survives behind it, and the Calendly event renamed
from "Book Your Strategy Call" to match the CTA.

`[BLOCKED]` The live Calendly URL redirects to the Calendly homepage. Needs a
human click to confirm, and a working URL before build.

**22. Free resources and footer**
The free community and the founder's video library as a quiet secondary route for
people outside the paid offer.

**Footer carries the compliance furniture**: company identity and registered
address, privacy policy, `regulamin`, complaints and ADR/ODR information, and the
cookie consent control. Revision 1's "no navigation" was read as excluding these.
They are not navigation and they do not compete with the CTA.
`[CONFIRM CONTROLLER, PROCESSORS, TRANSFERS]` — the inline form and Calendly both
collect personal data, and Calendly is a US processor.

---

## Recurring elements

**Five CTA blocks**, identical six words, each with a different note stating what
happens next: after the video, after the dossier, after the guarantees, after the
fee, and at the close. Revision 1 had two on a page running past 15,000px, with
every peak-desire moment unserved. The single-CTA rule governs wording, not
frequency; all five reference pages repeat theirs every 1.5–2 screens.

**Sticky CTA bar, inverted.** Hide on scroll-down, reveal on scroll-up — revision
1 had it backwards, removing the button at the moment of intent. Retire it on an
`IntersectionObserver` when §21 enters view, so two primary buttons never share a
screen. Button-only at 56px on mobile.

**Situation markers.** Each mechanism block in Movement III carries a mono `label`
stating which of the two situations it does the most work for. The two-audience
requirement is a page-wide obligation, not a section-2 obligation — revision 1
addressed both readers in the situations section and then drifted to the stalled
search for the rest of the page. The marker is cheap, design-system-legal, and it
makes the drift visible during the build instead of after launch.

Applies to Movement II as well: the three bottlenecks are each tagged to the
situation they belong to, and the alternatives table is read differently by an
employed reader (whose scarce resource is hours) than by an unemployed one (whose
scarce resource is access). Both readings are written.

**Orientation without navigation.** A mono movement marker at each `line-strong`
rule. A 1px `accent` progress hairline filling the sticky bar's existing top
border — a position indicator, not a counter, and it survives reduced-motion. One
line at the end of §8 naming what the rest of the page contains. Twenty-eight
mobile screens with no sense of where the end is produces sample-sample-give-up.

---

## The artefact strategy

Three critiques killed revision 1's approach for three unrelated reasons: the
artefacts were unfalsifiable to a buyer, unreadable at 390px, and unpublishable
under data-protection law, since name removal is not anonymisation and the dossier
profiles third parties who never contracted with CCC.

### Specimens, not redacted originals

Each artefact is **built fresh from CCC's real template and real methodology,
populated with a fictitious client and a fictitious employer in a real sector.**
Nothing traceable to a person is in the file because no person was in the file.

Captioned in body-copy type, same size as the surrounding text:
**"Specimen. Real format and real methodology, reconstructed with a fictional
client and employer."**

This is not weaker proof. What the reader is buying is that the format exists and
is good — 15–20 predicted questions, structured answers, a 24-hour turnaround. A
specimen demonstrates all three, and dissolves the consent, third-party,
client-confidentiality and re-identification problems at once. It is also the only
version that can actually be built, since none of the artefacts exists yet.

If real documents are used instead, the full redaction standard in
`2026-09-08-ia-critique-findings.md` applies, every `[CONSENT]` item must exist in
writing first, and the dossier is unpublishable because interviewer consent is not
obtainable by any realistic route.

### Presentation

**Two of the four are not images.** The outreach thread (§11) and the negotiation
preparation (§13) are transcribed to live HTML — a screenshot of a message proves
nothing a typeset message doesn't, and everyone knows screenshots are trivially
faked. Set as text they reflow, are selectable, survive 200% zoom and reach a
screen reader. The activity log (§10) is a real HTML table with `tabular-nums`,
which is what the design system was drawn for. **Only the dossier stays an image.**

**Crop hard, set at real size, annotate.** Never scale a document down to fit.
Show one-fifth at 100% and the reader believes the rest; show all of it at 20% and
they believe none of it. The artefact is the backdrop; the annotation in the
page's own type is the proof.

**Exhibit anatomy, five parts in order:**

1. **Provenance line** — mono `label`, above everything. `EXHIBIT 03 · INTERVIEW
   DOSSIER · 18 PAGES · DELIVERED 22 HOURS AFTER INTERVIEW CONFIRMED`. This does
   more work than the artefact: volume, speed and status in one row a skimmer
   reads.
2. **The exhibit** — cropped image or transcribed text.
3. **Numbered callouts** — two on mobile, three to four on desktop, `micro`
   number in `accent` plus one `body-s` sentence, written as the argument. This is
   the part that gets read.
4. **Provenance legend** — one `caption` line stating the specimen status, or what
   was removed and why if real.
5. **Verification state** — anything unverified carries `flag-unverified` in words.

**Desktop:** crop window fixed at 620 × 420px, `1px line`, `4px` radius, no
shadow, `overflow: hidden`, document positioned so the chosen region fills it at
100% scale. Hard-cut on all four edges — the cut says "this continues," and fades
are decoration. Callout column beside it at ~340px. One `ghost` control below:
**View full page.**

**390px — a separate mobile component.** A different crop authored for portrait,
not the desktop crop scaled: a region with short lines, window 358 × 300px, type
still at 100%, maximum height 60vh so the reader always sees page above and below.
Callouts drop to two. One tap target opening a full-screen viewer with pinch-zoom,
a 44×44 labelled close control, Esc and back-gesture both closing, focus trapped
and returned, scroll position preserved.

**Accessibility is also the fallback.** Every exhibit carries real alt text plus a
visually-hidden block containing the extracted content as text. Writing that block
forces the question the section turns on: what does this prove, in words? If four
sentences cannot carry the argument without the picture, the picture was never
carrying it, and the block needs a different artefact.

### Inventory

| Artefact | Section | Form | Priority |
|---|---|---|---|
| Interview Dossier | 12 | Image, cropped + annotated + live contents list | Highest |
| Back-channel outreach | 11 | Transcribed HTML | High |
| Weekly activity log | 10 | HTML table | High |
| CV before/after | 9 | Image pair | High — no redaction or consent burden |
| LinkedIn headline rewrite | 9 | Image or transcribed | Medium |
| Negotiation preparation | 13 | Transcribed HTML, no figures | Medium |

The activity log must not be readable as an outcome rate. Forty applications
beside three interviews lets a reader compute a conversion rate the claim rules
forbid. Show a single week, or omit the outcome column.

---

## Blockers, mapped

| Blocker | Sections |
|---|---|
| KRAZ status / pośrednictwo pracy question | 8, 11, 18 — and the whole representation frame |
| `[CONFIRM APPLICATION APPROVAL]` | 1, 14 |
| `[CONFIRM SIGNAL LAYER CONTROLS]` `[CONFIRM APPROVALS AND ACCESS]` | 9 |
| `[CONFIRM SUCCESS-FEE EVENTS]` | 8, 19 |
| `[CONFIRM CAP RULE]` `[CONFIRM TAX]` | 16 |
| `/regulamin` vs No-Stop | 17 |
| Escalation policy | 15 |
| `[CONFIRM SUPPORTED PROFILES]` | 3, 19 |
| `[CONFIRM WITHDRAWAL AND EARLY-PERFORMANCE CONSENT]` | 20 |
| `[CONFIRM CONTROLLER, PROCESSORS, TRANSFERS]` | 21, 22 |
| No VSL exists | 6 |
| Working Calendly URL | 21 |
| Matched video cases — **launch blocker** | 7 |

Five of the nine priority FAQ questions are blocked. §19 is more constrained than
revision 1 showed.

## Accepted risks

**The live site's claims are out of scope.** `capitalcareerclub.com` currently
carries "180+ Internationals Placed in Poland", "15M+ PLN earned by clients
annually", "15+ interviews in 30 days", "40+ interviews in 4 months", and an
uncontextualised employer list. All are forbidden here. The founder's YouTube bio
states "180+ hires | 14M zł/yr", which disagrees with the site's own figure.
Decision of 8 September: new page only, existing site untouched.

Recorded consequence: the two surfaces will contradict each other, and "180+
Internationals Placed in Poland" is the most load-bearing sentence for the
employment-agency characterisation question while that question is open.

**Door Two describes the same activity as the held-back Door Three.** "Warm
introduction through professionals we have already placed inside the companies you
want to enter" is presentation by another name. It stays in §11 pending the
regulatory answer.

## What is not on this page, and why

- Door Three by name, and employer relationships — owner instruction, 8 September.
- Placement rates, totals, typical timelines, salary uplift, income figures — claim
  rules.
- Salary figures inside any artefact — claim rules.
- The testimonial screenshot wall — consent and service attribution unresolved.
- Countdown timers, spots remaining, value stacking, fake scarcity — design system.
- Site navigation. Compliance furniture in the footer is not navigation.

## Next

Build plan for the Next.js and Tailwind project, primitives first. Section work
does not begin until the primitives exist. Re-run the risk and buyer lenses
against this revision before build.
