# Capital Career Club landing page — product requirements

8 September 2026. Scopes and measures the build. The architecture is in
`2026-09-08-landing-page-ia-design.md` revision 2; the design system in
`CLAUDE.md` is binding; the claim rules bind everything.

**Framing rule for this build.** Write what CCC does on the client's instruction
and in the client's name. Do not write CCC as an intermediary acting toward
employers. See Open questions, OQ-01.

---

## Problem statement

Experienced international professionals in Poland who are not getting interviews,
or who are stuck in underpaid roles, have no way to find out what CCC actually
does or whether it is for them. The existing site splits attention across three
destinations — enrolment, a strategy call, and a free community — leads with
graduate and survival-job transformations, and describes the service concretely
only on the checkout page, after the visitor has been asked to buy.

The cost shows in the CRM. Of 151 lost B2C records, **42 are marked unqualified**
(27.8%) and **21 carry explicit price labels** (13.9%). One booking response reads
as an application to CCC's engineering team. People are booking calls without
understanding what is being sold, to whom, or for how much — and the sales team
absorbs that in wasted 30-minute slots.

Meanwhile the strongest material CCC has is invisible. Four contractual
guarantees, seven documented delivery stages, a published weekly operating volume,
and an admissions screen that declines applicants appear nowhere a prospect can
read them before a call.

## Goals

Outcomes, not outputs. All are measured against the funnel in Success metrics.

1. **A visitor can determine fit without speaking to anyone.** Location, years of
   experience, role families, participation required and total cost are all
   readable on the page.
2. **Qualified applications rise as a share of applications.** The share of
   attended calls that pass the written admissions standard is the primary
   measure, not the count of calls booked.
3. **Price objections move from the call to the page.** A prospect who cannot
   fund 6,000 PLN plus instalments learns that before booking, not during.
4. **Both mandated audiences convert.** The stalled-career segment produces
   applications at a rate the business can measure separately from stalled-search,
   so the strategy brief's segment test can actually run.
5. **Nothing published requires retraction.** Every claim on the page survives the
   claim rules, and every outcome carries a precise milestone label.

**Explicit success condition:** total bookings may fall. If bookings fall while
qualified applications and attended-qualified-call rate rise, the page has worked.
The strategy brief states plainly that raw booking volume is an inadequate measure
given the qualification and affordability problems in the CRM.

## Non-goals

1. **Not a replacement for capitalcareerclub.com.** The existing site stays live
   and untouched. Its claims are recorded as an accepted risk in `CLAUDE.md`.
2. **No multi-page site and no navigation.** One page, one action. Compliance
   furniture in the footer is not navigation.
3. **No Polish version in v1.** On the OPEN list. The mandatory consumer
   information may need Polish separately — see OQ-09.
4. **No CMS, blog, or content marketing surface.** The page is a flat build.
   Copy changes are code changes until there is a reason for that to be untrue.
5. **No application form in v1.** Calendly with screening questions ships first;
   the form is designed into the layout and replaces it in phase two.
6. **No direct enrolment or checkout.** The page's only action is applying for a
   fit call. Enrolment stays where it is.

## User stories

### Stalled search — applying, getting nothing back

- As someone with six years of experience and five months of silence, I want to
  see what a team would do differently from what I have already tried, so that I
  can judge whether paying for it changes anything.
- As someone who has been told before that my CV is the problem, I want to see
  what a rebuilt CV actually looks like, so that I can tell whether this is the
  same advice I have already bought.
- As someone who suspects every service in this market is a scam, I want to see a
  named person who is accountable, so that I am not sending 6,000 PLN to a logo.
- As someone whose search is urgent, I want to know what happens in the first week,
  so that I can judge whether this starts fast enough to matter.

### Stalled career — employed, underpaid, going nowhere

- As someone in a full-time job, I want to know exactly how many hours a week this
  costs me, so that I can tell whether it is survivable alongside work.
- As someone whose employer must not find out, I want to know what gets published
  in my name and what my current employer can see, so that I can decide whether to
  risk it.
- As someone with three live applications already in flight, I want to know what
  happens to them and whether an offer from one triggers a fee, so that I am not
  paying for work I did myself.
- As someone considering a sideways move to a better company, I want to know
  whether the fee structure pushes CCC to talk me out of it.

### Every visitor

- As a reader who will not watch a video, I want the full argument in text, so
  that skipping the video costs me nothing.
- As a reader on a phone, I want the work samples to be legible without pinching,
  so that the evidence is actually evidence.
- As a reader who is not eligible, I want to find that out in the first screen or
  two, so that I do not spend twenty minutes learning I cannot buy.
- As a reader who cannot afford it, I want a route to the free resources that does
  not feel like a consolation prize.

### Operator

- As the person reviewing applications, I want screening answers captured before
  the call, so that I can decline before spending 30 minutes.
- As the owner, I want to know which message variant and which traffic source
  produced each qualified application, so that I can compare within an audience
  rather than across audiences.

## Requirements

### P0 — cannot ship without

**Content and structure**

| ID | Requirement | Acceptance |
|---|---|---|
| R-01 | All 22 sections per IA revision 2, in order, across five movements separated by four `line-strong` rules | Section-by-section diff against the IA passes |
| R-02 | Five CTA blocks with identical button wording and distinct notes, plus the hero CTA | Six instances of "Apply for a fit call"; six distinct notes |
| R-03 | Situation marker on each Movement III mechanism block | Every mechanism block carries a mono label naming the audience it serves |
| R-04 | Compliance furniture in the footer: identity, registered address, privacy policy, `regulamin`, complaints/ADR, cookie control | All six present and reachable |
| R-05 | The activation fee named wherever the instalment cap is named | No occurrence of the cap without 6,000 PLN adjacent |

**Interaction**

| ID | Requirement | Acceptance |
|---|---|---|
| R-06 | Inline application step; every CTA scrolls to it rather than navigating away | Given the reader clicks any CTA, when the action fires, then the page scrolls to §21 and no navigation occurs |
| R-07 | Calendly embedded inside §21 | Given §21 is in view, when the widget loads, then the calendar renders within the page frame and scroll position is preserved |
| R-08 | Sticky CTA bar: hide on scroll-down, reveal on scroll-up, retire when §21 enters view | Given the reader scrolls up, when the bar is hidden, then it reveals. Given §21 intersects, when it does, then the bar is removed and never shares a screen with the final CTA |
| R-09 | FAQ as native `<details>`; first item open; no money item collapsed by default | Given JS is disabled, when the page loads, then all FAQ answers are readable |
| R-10 | Artefact viewer on mobile: full-screen, pinch-zoom, 44×44 labelled close, Esc and back both close, focus trapped and returned, scroll preserved | All six behaviours verified on a real device |
| R-11 | `prefers-reduced-motion: reduce` disables all motion | Given the setting is on, when the page loads, then no transition, transform or reveal runs and nothing is hidden |

**Proof**

| ID | Requirement | Acceptance |
|---|---|---|
| R-12 | Exhibit component with five parts: provenance line, exhibit, numbered callouts, provenance legend, verification state | Every exhibit instance has all five |
| R-13 | Outreach and negotiation exhibits are live HTML text; activity log is an HTML table; only the dossier is an image | No screenshot used where text will do |
| R-14 | Every exhibit carries real alt text plus a visually-hidden block containing the extracted content as text | Screen-reader pass receives the argument, not a description of a picture |
| R-15 | Every artefact labelled as a specimen in body-copy type | "Specimen" label present and at the same size as surrounding copy |
| R-16 | Activity log cannot be read as an outcome rate | Single week shown, or outcome column omitted |

**Responsive and accessible**

| ID | Requirement | Acceptance |
|---|---|---|
| R-17 | Separate mobile components for the two-situation panel, the fee block, and the artefact viewer | Each has a distinct mobile implementation, not overrides |
| R-18 | Two-situation panel on mobile: both labels visible and equal, both panels in the DOM, tab semantics, arrow-key navigation, neither hidden from assistive tech | Keyboard and screen-reader pass |
| R-19 | WCAG 2.1 AA: 4.5:1 text, 3:1 edges, visible focus at 2px/3px offset, no skipped heading levels, targets ≥44×44 | Automated pass plus manual keyboard traversal |
| R-20 | Fully usable at 200% zoom; no horizontal page scroll at 390px | Wide content scrolls inside its own container only |

**Measurement**

| ID | Requirement | Acceptance |
|---|---|---|
| R-21 | Funnel events: page view, scroll depth by movement, video play and completion, each CTA click by position, application step reached, booking completed | All fire with position and variant attached |
| R-22 | UTM and referrer captured and persisted to the booking record | Source survives the Calendly handoff |
| R-23 | Screening answers captured before the call | Years, target role, in Poland, ability to fund — all four recorded and queryable |
| R-24 | Cookie consent gates any non-essential analytics | No non-essential script fires before consent |

### P1 — fast follow

- FAQ answers hoisted to point-of-doubt under §8, §11 and §16, retained in §19.
- Movement markers at each rule; accent progress hairline on the sticky bar.
- Video transcript and chapter list.
- Chips as anchors jumping to the section that keeps their promise.
- `View full page` desktop artefact viewer.

### P2 — design for, do not build

- The inline application form replacing Calendly, with automatic qualification.
- Polish version.
- The rest of capitalcareerclub.com adopting the design system.
- A second landing page for the stalled-career segment as a separate test.

## Success metrics

Record counts alongside rates. Do not declare a winner from a handful of sales.

**Leading — days to weeks**

| Metric | Definition | Target |
|---|---|---|
| Fit-check depth | % of sessions reaching §3 | ≥60% |
| Proof engagement | % reaching §12, the dossier exhibit | ≥30% |
| Application step reached | % reaching §21 | ≥12% |
| Booking rate | Bookings ÷ sessions | Baseline only — not a target |
| **Qualified application rate** | Applications passing the written standard ÷ applications | **≥60%** |
| Video play rate | Plays ÷ sessions reaching §6 | Baseline |
| Mobile parity | Application-step-reached on mobile ÷ desktop | ≥0.7 |

**Lagging — weeks to months**

| Metric | Definition | Target |
|---|---|---|
| Attended qualified call rate | Attended calls passing the standard ÷ attended calls | ≥70% |
| Unqualified loss share | Lost marked unqualified ÷ all lost | **Below 27.8%**, the current baseline |
| Price-labelled loss share | Lost marked no-budget or too-expensive ÷ all lost | **Below 13.9%**, the current baseline |
| Segment split | Qualified applications by starting situation | Both segments measurable; neither below 25% |
| Paid enrolment | Enrolments ÷ attended qualified calls | Baseline for one quarter before any target |

**Recorded per application:** source and UTM, message variant, years of relevant
experience, current employment, starting situation, stated objection. The current
CRM source field mixes booking infrastructure with import defaults and cannot
establish channel effectiveness — this must be fixed at capture, not inferred
later.

**Evaluation windows:** leading at 14 and 30 days; lagging at 90 days. Keep client
placements and time-to-offer in a separate delivery dataset with explicit
denominators, never merged into funnel reporting.

## Open questions

### Blocking — must answer before the affected section is built

| ID | Question | Answers | Blocks |
|---|---|---|---|
| OQ-01 | Is CCC carrying out regulated job placement (*pośrednictwo pracy*), and what is its KRAZ status? What may lawfully be charged to a candidate? | **Counsel**, after an owner lookup | The framing of the whole page; §8, §11, §18 |
| OQ-02 | Does the client approve each application, or only CV, profile and content? | **Owner / delivery** | Hero chip; §14 |
| OQ-03 | Signal Layer controls: what is published, under whose approval, what may an employed client decline, what can a current employer see? | **Owner / delivery** | §9 |
| OQ-04 | What triggers an instalment — and specifically, does an offer from an application sent before signature? | **Owner / counsel** | §8, §19 item 1 |
| OQ-05 | The cap rule for unemployed clients, equal-pay moves and career changes. The cap is defined against a raise, which does not exist for them | **Owner** | §16 |
| OQ-06 | Reconcile `/regulamin` (duration individually agreed) with the No-Stop Guarantee (no time limit) | **Owner / counsel** | §17 |
| OQ-07 | Escalation and review policy: cadence, and what changes when responses are weak | **Delivery** | §15 |
| OQ-08 | Supported role families, languages, permitted pivots. "3+ years" is a threshold, not a fit definition | **Owner** | §3, §19 |
| OQ-09 | Consumer information: withdrawal right and early-performance consent; gross/net and VAT on 6,000 PLN; invoice to individual or company; whether activation can be split; whether mandatory information needs Polish; registered entity name and address, and complaints/ADR route for the footer | **Counsel / owner** | §16, §20, §22 |
| OQ-10 | Data protection: controller, processors, international transfer for Calendly, lawful basis and Article 14 notices for the outreach and dossier processes | **Counsel** | §21, §22 |
| OQ-11 | The written admissions standard. Publishing the criteria is what makes the selectivity credible; selectivity that only asserts itself is the oldest line in the category | **Owner** | §18 |

### Non-blocking — resolve during implementation

| ID | Question | Answers |
|---|---|---|
| OQ-12 | Does a VSL exist off-site? If not, commission one scripted against the offer letter and these claim rules | Owner |
| OQ-13 | Working Calendly URL, and rename the event from "Book Your Strategy Call" | Owner |
| OQ-14 | Deploy target: Vercel or the existing VPS | Owner |
| OQ-15 | Page location — path or subdomain | Owner |
| OQ-16 | Can delivery team members be named, with specialisms? | Owner |
| OQ-17 | Which of the six case candidates clear verification, and P02/P06 title conflicts | Owner |

## Timeline and phasing

**On the critical path, and not a design task.** These gate launch and none of them
is engineering work:

1. **OQ-01** — everything else is rework if this comes back badly.
2. **Matched video cases.** Seven of nine existing testimonials are graduate or
   survival-job stories. Four to five new films with experienced clients, each
   carrying the seven fields in the video inventory.
3. **Artefact specimens.** Four exhibits built from real templates with a
   fictional client and employer. The proof spine does not exist without them.
4. **Founder photography** and a signed statement.
5. **OQ-05 and OQ-06** — two sections cannot be written until these close.

**Phasing**

- **Phase 0 — unblock.** OQ-01 through OQ-10. No build.
- **Phase 1 — foundation.** Next.js and Tailwind scaffold, tokens from the
  design system, and every primitive under Components. No section work until the
  primitives exist and are validated against real strings from the copy deck.
- **Phase 2 — sections.** In IA order, three to four layout concepts per section,
  reviewed against the system with screenshots.
- **Phase 3 — polish.** Micro-interactions, custom SVG, separate mobile
  components, real-device testing.
- **Phase 4 — post-launch.** P1 list, then the application form.

The build workflow in `CLAUDE.md` allocates roughly 40% inspiration and planning,
20% building, 40% polish. Phases 0 and 1 are the 40%.
