# IA critique — consolidated findings

8 September 2026. Five independent reviews of
`2026-09-08-landing-page-ia-design.md`: conversion, information architecture,
UX, skeptical buyer, and risk/claims. Each read the full document set without
seeing the others. Convergence between lenses is noted, because agreement
reached independently is the strongest signal in this document.

Nobody here is a lawyer, including the risk reviewer. Legal items below are
structural observations with a defined question attached, not opinions.

---

## Tier 0 — verify before any copy is written

### 0.1 The representation frame may put CCC inside Poland's regulated employment-agency regime

Raised by the risk review, which was the only one to extract
`CCC_Offer_Letter.pdf`. Not present in any of the four planning documents, not
on the OPEN list, and not in the spec's risk register.

Polish law regulates *pośrednictwo pracy* under the Act on employment promotion
and labour market institutions. Entities carrying it out are entered in the
KRAZ register, and the Act restricts charging the person seeking work — the
model is employer-pays. CCC charges the job seeker 6,000 PLN plus three
instalments.

Whether CCC is a career-services supplier (outside the regime) or a placement
intermediary (inside it) turns substantially on what CCC does, and evidentially
on **what CCC says it does in its own marketing**. This page is designed to say,
as loudly as it can, that CCC places people. The offer letter's own language —
"we present you as a named, vetted candidate", "the interviews we arrange",
"who open the doors", "you will be placed" — is the most exposed material.

**Actions, in order:**
1. Look up CCC's current KRAZ status. Minutes, not a legal opinion.
2. Put the offer letter, the Representation Agreement and spec sections 4–8 to
   Polish employment counsel with one question: does the described activity
   constitute pośrednictwo pracy, and if so what may lawfully be charged to the
   candidate?
3. Until answered, draft on the **execution** framing, not the representation
   framing. CCC prepares materials and executes applications and outreach on the
   client's instruction and in the client's name. "We represent you", "we place
   you", "we present you", "the interviews we arrange" stay out.
4. Add to the OPEN list above the fee cap.

Note that Door Two's "warm introduction through professionals we have already
placed inside the companies you want to enter" is the same activity as the
held-back Door Three, under a different name, and it is currently in section 6.

### 0.2 A hero chip appears to state something the offer letter contradicts

The chip row includes **"you approve every application."** The offer letter's
approval obligation is "approve your CV, profile, and content inside the agreed
windows" — applications are not in that list, and Door One is "ten or more
precisely targeted applications every week" with no approval step.

If the offer letter is accurate, this is a false statement placed in the hero,
in the most screenshot-friendly element on the page. Kill it until
`[CONFIRM APPROVALS AND ACCESS]` closes. Replace with what is confirmable.

The adjacent chip, "full fee stated before the call", is also unkeepable — the
back-end fee is a percentage of an unknown future salary. Use "the full fee
structure is on this page", which does the same objection-handling work.

### 0.3 The Net Positive claim is false once the activation fee is counted

Spec section 14 states "the cap is the raise, so a payment can never exceed the
increase." The offer letter goes further: "there is no month in which working
with me costs you money. That is arithmetic, not a promise."

It is not. A client moving 10,000 → 11,000 PLN pays 6,000 on signature and
1,000 x 3 from the raise. Three months in they are 6,000 down against staying
put. The claim is true per-instalment and only if the activation fee is excluded.

`CLAUDE.md` forbids "we only get paid when you do" precisely because of the
upfront fee. This is that claim wearing a different name.

**Permitted form:** "From the new role onwards, each instalment is capped at the
raise, so no monthly payment exceeds your increase. The 6,000 PLN activation fee
is paid before that and is separate." Two sentences, both true. The worked
example must show the total including activation, and must use a low-raise case
rather than a flattering one.

### 0.4 The page has no compliance furniture, because the spec banned navigation

"What is not in this page: navigation." That was read as excluding the privacy
notice, terms link, imprint, complaints route and cookie control. Those are not
navigation and they do not compete with the CTA.

Sharpest item: the **14-day withdrawal right**. The onboarding sequence the page
publishes as a selling point — sign, pay, intake in 48h, live by day seven —
begins full performance deep inside the withdrawal window. That is lawful only
with the consumer's express request to begin early and their acknowledgement of
the consequence. Section 10 advertises the very fact that creates the problem.

**Actions:** footer carries identity, registered address, privacy policy,
`regulamin`, complaints/ADR, cookie control. Section 10 gains one line on the
withdrawal right and early-start consent, captured explicitly at signature.
Add `[CONFIRM WITHDRAWAL AND EARLY-PERFORMANCE CONSENT]` and
`[CONFIRM CONTROLLER, PROCESSORS, TRANSFERS]` to OPEN — the proposal to move
screening questions into Calendly is a data-collection decision made with no
data-protection consideration, and Calendly is a US processor.

---

## Tier 1 — convergent findings

Ordered by how many independent lenses reached them.

### 1.1 The artefact strategy fails as specified — 3 of 5, for three unrelated reasons

The strongest signal in the whole exercise. Three reviewers who could not see
each other's work reached the same verdict from completely different directions.

- **Buyer:** unfalsifiable. "Redaction deletes precisely the fields that would
  let me check anything. Four artefacts, zero of them falsifiable."
- **UX:** unreadable. An A4 dossier at `w-content` is 1,414px tall; at 390px it
  is unreadable. Readers register "document" as texture and scroll. "A dense
  document is not readable proof — it is texture."
- **Risk:** unpublishable. Name removal is not anonymisation. Retained sector,
  city, seniority, date and question set defeat none of the singling-out,
  linkability or inference tests. The dossier is also a profiling record about
  named third parties who never contracted with CCC.

**The three fixes compose into one strategy:**

1. **Build specimens, not redacted originals.** Real template, real methodology,
   fictitious client and fictitious employer in a real sector. Captioned in
   body-copy type: *"Specimen. Real format and real methodology, reconstructed
   with a fictional client and employer."* This dissolves the consent problem,
   the third-party problem, the client-confidentiality problem and the
   re-identification problem simultaneously. What the reader is buying is the
   existence and quality of the format — 15–20 predicted questions, structured
   answers, 24-hour turnaround. A specimen demonstrates all three.
2. **Transcribe two of the four into live HTML.** The outreach thread and the
   negotiation exchange become real text, not images — a screenshot of a message
   proves nothing a typeset message doesn't, and everyone knows screenshots are
   trivially faked. The activity log becomes a real HTML table, which is what
   the design system was drawn for. Only the dossier stays an image.
3. **Crop hard, set at real size, annotate.** Never scale a document down to
   fit. Show one-fifth at 100% and the reader believes the rest; show all of it
   at 20% and they believe none. The artefact is the backdrop; the annotation in
   the page's own type is the proof.

**Exhibit anatomy** (from the UX review, five parts in order):
provenance line in mono carrying volume, speed and consent claims —
the exhibit — 2 to 4 numbered callouts written as the argument —
redaction legend stating what was removed and why —
verification state, with `flag-unverified` on anything constructed.

The provenance line does more work than the artefact: `EXHIBIT 03 · INTERVIEW
DOSSIER · 18 PAGES · DELIVERED 22 HOURS AFTER INTERVIEW CONFIRMED` is a row of
mono type a skimmer will actually read.

**Accessibility is also the fallback.** Each exhibit carries alt text plus a
visually-hidden block containing the extracted content as text. Writing that
text forces the question the section turns on: what does this document prove, in
words? If four sentences cannot carry the argument without the picture, the
picture was never carrying it.

**One artefact must change substance, not just treatment.** Section 8's "offer
comparison" is, definitionally, salary figures — directly forbidden by the
design system's do-not list. Reframe to negotiation *preparation*: anchor
rationale, market-data structure, scripted language, every figure as a relative
marker. It evidences that the client was prepared, not what they were paid. Also
check the client is not under a confidentiality obligation to the employer
covering offer terms; the client cannot consent on the employer's behalf.

### 1.2 The page has no human presence — 4 of 5

Every reviewer except the IA one reached this independently, and the IA review
reached it too, filed under a different heading.

The team block was cut. The testimonial slot ships empty. The founder exists in
exactly one place — inside a video, behind a play button, at ~2,400px — on a
page that also specifies it "must still work with the video removed."

- **Buyer:** "There is not one verifiable human attached to this business
  anywhere in the funnel, while the copy asks for 6,000 PLN and access to my
  LinkedIn credentials." Named this the worst compounding failure on the page.
- **Conversion:** the founder is the only high-value asset blocked on nothing.
  Consent, redaction, the VSL audit, `/regulamin` and the cap rule all block
  something. Aziz exists, is in Warsaw, can be photographed this week.
- **IA:** the page's central metaphor is representation, which requires a
  representative, and the page never names one. Section 10 promises "a named
  person is on your search" and names nobody.
- **UX:** with the video skipped, the entire page is an unattributed
  institutional voice describing a machine — the exact failure the design system
  warns against.

**Actions:** restore a founder block — photograph, name, Warsaw, signed
statement carrying "you are short of hours and short of access" as attributed
speech. Name at least one delivery person with a specialism inside the "within
24 hours" block. Give the video a poster frame with a visible face at rest and a
caption stating the argument, not just the runtime. Escalate team naming from
OPEN to launch blocker.

### 1.3 The Signal Layer is architecturally absent, and so is discretion — 4 of 5

Stage 4 of 7 — three to five posts a week published in the client's voice, on
the client's profile, using credentials handed over within 48 hours — appears
nowhere in the architecture. Neither does any statement about confidentiality,
approval of published content, or what a currently-employed client's employer
can see.

The research pack flags this twice: `[CONFIRM APPROVALS AND ACCESS]`, and
"confirm actual client time, response expectations, account access and
outreach/publication controls. No invented privacy promise." The spec inherited
neither.

The risk review's framing is the one to take seriously: omitting a material
characteristic of the service from a sales page is the textbook shape of a
misleading omission. The practical version is worse — a client discovers after
signature that CCC has been posting under their name, and if an employed
client's manager sees it, the harm is career-scale and CCC caused it.

**Actions:** add a Signal Layer block to the machine movement stating plainly
what is published, by whom, under whose approval, and what an employed client
can opt out of. Add a discretion spec pair directly under the outreach artefact
covering who is contacted, what is said, and what the current employer can see.
Add a named FAQ item — "will my current employer see this" — distinct from the
existing "can I do this while employed", which is a scheduling question.

If the honest version is unattractive, that is information about the offer, not
about the copy.

### 1.4 The results slot cannot ship empty — 3 of 5

The spec permits section 11 to launch empty and names the artefacts in 5–8 as
the fallback spine. The artefact inventory lists all six as "not collected." The
fallback is as missing as the thing it backs up.

- **Buyer:** "A page selling a done-for-you job search, with a blank results
  section. Either those results weren't solid enough to survive a scrub, or this
  page is a shell that went live before it was finished." Named this the
  tab-closer.
- **IA:** section 11 is the only host for the outcome ladder. Without it the
  case card — the most constrained component in the system, built specifically
  to keep the claim rules enforceable — is never instantiated. A launch page
  with zero instances of its own proof component is not a proof-led page.
- **Conversion:** the identity question ("someone like me?") is answered at
  section 11 or never, when both source briefs put it at position 3.

**Actions:** one fully consented case beats six unverified ones and beats zero
by an order of magnitude. If none can be ready, cut the section header rather
than shipping a visible hole — an announced absence is worse than no
announcement. Move the case slot to a seam rather than a climax, so its absence
removes a section instead of decapitating a movement. Rename it: "What came out
of it" is a euphemism sitting on the one component the claim rules exist to
constrain. Call it "Interviews, offers and job starts."

### 1.5 Fit criteria were dissolved into Admissions — 3 of 5

The strategy brief has fit criteria as its own item. Admissions is a different
object: CCC's judgement about the reader, not the reader's own checklist.
Collapsing them lost the checklist, and with it affordability as a stated
criterion, permitted role families and pivots, and any guard against immigration
adjacency.

The risk review adds one line the page needs: for an audience of expats and
immigrants being offered representation into Polish employment, **"CCC does not
provide immigration, visa or work-permit services"** closes an inference the
page otherwise invites.

Qualification currently rests on an 11.5px eyebrow, a chip row the system caps
at six words, and a section at 88% scroll depth — against 28% of lost leads
marked unqualified.

**Action:** restore a fit section early, in the recognition movement, as the
reader's own in/out list. Keep Admissions late, where it does its different job.

### 1.6 The video sits too early — 3 of 5, three different reasons

- **Buyer:** it is the genre signature of the thing that burned them, arriving
  before any evidence. "The first human moment on this page is a sales pitch."
- **IA:** at section 3 the reader has not been told what the service is, so the
  video must carry definition, diagnosis and offer — which means sections 4–16
  restate it in full, and nothing tells a watcher where to rejoin.
- **UX:** a mode-switch decision two screens in, before any reason to invest in
  a stranger.

**Actions:** move it after the diagnosis sections, where the reader has a
specific question rather than a general ache. Give it a designated re-entry
point — the section after it should be the one a watcher would naturally want
next. Caption states the thesis. Never autoplay. Add a CTA directly beneath the
frame; a finisher currently has no action available.

---

## Tier 2 — single-lens findings worth acting on

### 2.1 There is no bridge between problem and solution (IA)

The page runs situations → video → "you stop applying." Nothing explains why
the reader's own effort failed. The research pack specifies that section
explicitly (§8 row 4, "Why the search needs work"); it has no counterpart in
the architecture.

Every outcome heading in 5–8 is therefore an answer to an unasked question.
"You reach people applications never reach" only lands if someone has just
explained that the roles they want are not reachable by applying. Without it,
5–8 are a feature list with better grammar — the exact "expensive CV editing"
failure the outcome amendment claims to avoid.

The likely cause: the easy version of this section is forbidden (no blanket ATS
explanations). Avoiding one banned diagnosis is not the same as deciding the
page needs no diagnosis.

**Action:** add a bottlenecks section — volume you cannot sustain alone / roles
that never reach an applicant / interviews entered unprepared — each framed as
*a* bottleneck, not *the* cause, and each tagged to which situation it serves.
This also gives the third-largest observed pain (43/145, interviews but no
success) its only entry point on the page.

### 2.2 The CV rebuild should not have been demoted (conversion)

38% of respondents named "CV/LinkedIn not noticed" as their challenge. That is
the reader's own self-diagnosis, and you do not get to skip it to arrive at
your better one — you satisfy it, then extend it. Commoditisation is CCC's
problem, not the reader's.

The before/after CV is also the only artefact needing no employer redaction and
no third-party consent. The most producible asset was demoted for not being the
most distinctive one.

**Action:** restore it as the first block of the machine movement, under a
heading that concedes then extends, with a pivot line that earns the rest:
*"That fixes what you can see. It does not fix the fact that most of these
roles are filled before anyone reads a CV."* The back channel then lands on
prepared ground instead of arguing against the reader's own theory.

### 2.3 The fee creates a conflict of interest at the negotiation table (buyer)

The back end is capped by the raise, so CCC earns nothing if the client takes a
lateral move into a better company — and CCC negotiates on their behalf. The
buyer's unprompted conclusion: "you will steer me toward the highest-salary
offer regardless of whether it's the right job."

**Action:** name the incentive before the reader finds it. A spec pair in the
fee block: our fee rises with your raise, which means we are paid nothing if you
take a sideways move, and you are free to take one; the decision to accept any
offer is yours alone. Naming your own incentive is the cheapest credibility
purchase on the page, and declining to name it reads as hiding it.

### 2.4 The question that decides the sale is not answered anywhere (buyer)

*"If an offer arrives from an application I sent before I ever met you, do I owe
the back-end fee?"* Client obligation seven says report any offer from any
source immediately. The FAQ covers getting an *interview* independently. The
buyer noticed the easy version of the question was written down and the hard one
left out, and drew the uncharitable conclusion unaided.

**Action:** make it FAQ item one, open by default, worded as the buyer words it,
answered with the cut-off rule and the date basis. Blocked on
`[CONFIRM SUCCESS-FEE EVENTS]`. If the honest answer is "yes, any offer during
the engagement", say so — a visible rule is acceptable, an inferred one is not.

### 2.5 The guarantees are published without the condition that voids them (risk)

The offer letter states: "the guarantees hold only if you hold up your side.
There are seven things." The spec puts guarantees at 12 and obligations at 9 and
never links them. A guarantee published without its voiding condition is a
different and stronger guarantee than the one being sold.

Two compounding problems: the letter says the Representation Agreement prevails
where the two differ, so an unpublished document silently overrides the page's
central risk reversal; and No-Stop has no defined end, creating a perpetual
obligation to a client who refuses every offer or goes silent.

Separately, the buyer found No-Stop arithmetically implausible against the
published volumes and concluded there must be a hidden exit — and that this
contaminates the other three guarantees, which are modest and believable.

**Actions:** merge guarantees and obligations into one adjacent section with the
condition stated in the guarantee block, not inferred from proximity. Define
No-Stop's termination in the Agreement and state it in one line on the page.
Reconcile `/regulamin` in the direction of the marketing, or narrow the
marketing. State the mechanism that makes No-Stop survivable — strict
admissions, and a back end that only arrives on a raise — because a guarantee
with visible economics behind it is believable and one without is a slogan.

### 2.6 "We expect to place you" changes meaning on a public page (risk)

In the offer letter it is addressed to a named person who has passed a screen —
a judgement about an individual. On a landing page it addresses a stranger, and
becomes *we place the people we accept*: a general effectiveness claim with no
verified denominator. Adjacency to "we decline the majority" does not survive a
screenshot, an ad crop, or a competitor quoting the line alone.

The spec also recast Admissions as the page's scarcity device. Nothing in any
source document establishes a capacity constraint, and the research pack's claim
register says to omit artificial scarcity.

The buyer independently found the same sentence arrogant rather than confident,
for a different reason: it sits one section after an empty results slot.

**Actions:** rewrite in the third person as an admissions standard, not a
prediction addressed to the reader. Bind both clauses in one sentence so no
single-sentence screenshot carries the forbidden implication. Add a written
prohibition: the phrase may not appear in ad creative, headline fields, meta
descriptions, social cards or OG images. Either evidence the capacity claim or
drop "scarcity" from the section's stated job.

### 2.7 Three of four outcome headings fail the spec's own test (risk)

The spec's test: if keeping the promise requires an employer to agree, the
heading is wrong. Applied honestly:

- **"You get your week back"** — contradicted by section 9's seven obligations
  three sections later, and section 9's own prohibition is "never imply the
  client does nothing."
- **"You walk into every interview already briefed"** — "every" is unkeepable.
  The commitment is within 24 hours of every *confirmed* interview and depends
  on the client reporting it. Twelve hours' notice breaks it.
- **"You reach people applications never reach"** — a comparative efficacy
  claim. CCC controls the sending, not the reaching.
- **"You don't negotiate alone"** — passes.

**Action:** name the act, not the effect. "Ten or more applications a week, sent
for you." "Every confirmed interview gets a dossier within 24 hours." "Direct
approaches to the people who decide, every week." Duller, checkable, which is
the premise of Blueprint. If the outcome frame only works in the unkeepable
version, the amendment fails its own test.

### 2.8 Only two CTAs on a page this long (conversion)

Sections 1 and 16, plus an ambient sticky bar. All five reference pages repeat
the CTA every 1.5–2 screens; one repeats it eight times. Between the hero and
the final CTA sit four proof blocks, the guarantees, admissions and the price —
every one a peak-desire moment with no route to action but a bar the reader
stopped seeing two screens ago.

The single-CTA rule governs wording, not frequency.

**Action:** five CTA blocks, identical six words, each with a different note
stating what happens next — after the video, after the dossier, after the
guarantees, after the fee, and at the close.

### 2.9 The obligations section is isolated at the worst possible point (UX)

Seven duties, alone, at ~10,000px — peak fatigue — five sections after "you stop
applying" and four before the fee. At 390px it becomes fourteen stacked rows.
Effort perception spikes immediately before price is named.

The strategy brief specified *one* section: what the team does and what the
client still does. Splitting it into 5,900px of team work and one lonely block
of client work destroys the comparison, and the comparison is the answer to the
delegation objection.

**Action:** rebuild as a single two-column ledger between the outreach and
dossier blocks. Left: everything CCC runs, one line each. Right: the seven
compressed into three named commitments — give us your history, approve what
goes out, show up and tell us what happened — each expanding to exact
obligations and deadlines. Seven duties beside twenty CCC duties reads as a
bargain. Seven alone reads as a contract.

### 2.10 Scroll and orientation (UX)

Measured: ~15,300px desktop with slot 11 empty, ~16,700 filled, **~24,000px at
390px — about 28 viewport heights.** Top of the reference range (8,420–18,785px)
while running on the one persuasion engine those references did not need,
because numbers are banned. Longest page, thinnest per-pixel payload.

The reader is never told the movements exist, so every section is the same
unknown distance from the end.

**Actions:** movement markers in mono at each rule. A 1px accent progress
hairline on the sticky bar's existing top border — a position indicator, not a
counter, and it survives reduced-motion. One line at the end of the reframe
naming what the rest of the page contains.

### 2.11 The sticky bar is inverted (UX)

It hides on scroll-up. Users scroll down to read and up to look for something —
the button disappears at the moment of intent. It also occupies ~10% of an 844px
viewport across 24,000px, and will collide with the final CTA, putting two
primary buttons on one screen against the design system's own rule.

**Action:** hide on scroll-down, reveal on scroll-up. Retire the bar on an
IntersectionObserver when the final CTA enters view. Button-only at 56px on
mobile.

### 2.12 The FAQ answers questions asked 10,000px earlier (UX)

"Is this coaching or execution", "who approves applications", "what if I get an
interview independently" — those doubts occur at the reframe, the outreach block
and the fee. An unanswered objection does not sit still; it discounts everything
after it.

**Action:** hoist three answers to where the doubt happens as caption-weight
blocks, and leave them in the FAQ too. Repetition at the point of decision is
not redundancy. Nothing about money is collapsed by default.

### 2.13 The CTA leaves the page (UX)

Click → third-party domain → different typeface and chrome → a slot grid with no
price, no restatement of audience, no "we decline the majority", after up to
24,000px of scroll that iOS Safari will not restore.

**Action:** build the final section as an inline application step and scroll
every CTA to it: a panel restating who this is for, what the 30 minutes covers,
and the fee in one line, then screening questions in the page's own form
primitive, then the Calendly widget embedded below. If the embed is not viable
for v1: in-page confirmation before redirect, `target="_blank"`, and the event
renamed.

### 2.14 Fee arithmetic the page must survive (buyer)

Run on a realistic Warsaw case — 11,000 → 14,000 gross, raise 3,000, 23% of
14,000 = 3,220, lesser is 3,000 — the total is **6,000 + 9,000 = 15,000 PLN**,
more than a full month of the new salary, eating the first five months of the
raise.

Unanswered: gross under which contract? Poland is UoP or B2B and the two words
mean different amounts; on B2B, is 23% calculated on invoice value? And is
"current earnings" for the Raise Guarantee base only, or base plus variable? If
base-only, an offer can be higher on paper, worse in cash, and still collect.

**Action:** state the contract basis explicitly. Publish two worked examples — a
raise case and an equal-pay-or-career-change case — and answer whether the 6,000
can be split, whether it includes VAT, and whether it is invoiced to a person or
a company.

---

## Contradictions to arbitrate

**1. Page length.** The IA review adds six sections; the UX review measures the
existing page at 24,000px on mobile and treats length as the primary experience
risk. Both are right about their own lens. Resolution: the IA additions that
close genuine argument gaps (the bridge, the Signal Layer, fit criteria) are
non-optional; pay for them by merging the reframe into the founder block,
merging guarantees with obligations, cutting the standalone reframe section, and
compressing the four artefact blocks by transcribing two of them.

**2. Price placement.** Conversion wants the number in the hero to filter early;
IA wants it out of the day-seven list and first in the terms movement; risk
wants it stated with the activation fee included wherever it appears. These
compose: figure in the hero chip row, full explanation first in the terms
movement, activation always named alongside.

**3. Outcome headings.** The conversion review wants them sharper and more
emotive; the risk review shows three of four are unkeepable as written.
Risk wins on the wording; conversion wins on the principle. Name the act, and
put the emotional register in the body copy and the situations section, where
nothing is being promised.

---

## Immediate action list

**Before copy:**
1. KRAZ status lookup and the counsel question in 0.1.
2. Confirm whether clients approve applications; kill the chip if not.
3. Reconcile `/regulamin` with the No-Stop Guarantee.
4. Define the cap rule for unemployed, equal-pay and career-change clients.
5. Confirm Signal Layer controls and what employed clients can opt out of.
6. Confirm success-fee events, including offers from pre-existing applications.

**Before build:**
7. Founder photograph and a named delivery person with a specialism.
8. Working Calendly URL; rename the event to match the CTA.
9. Decide specimen-versus-real on the artefacts; if specimen, brief the
   reconstruction.
10. Count the testimonial screenshots and start consent collection on the six
    strongest.

**Spec revisions:**
11. Add the bridge/bottlenecks section, the Signal Layer section, a fit-criteria
    section, and the founder block.
12. Restore the CV rebuild as the first machine block.
13. Merge obligations into a two-column ledger; merge guarantees with the
    condition that voids them.
14. Move the video later; move the case slot to a seam; rename it.
15. Rewrite the four outcome headings to name the act.
16. Add compliance furniture to the footer and the withdrawal line to onboarding.
