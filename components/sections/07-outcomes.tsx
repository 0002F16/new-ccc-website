import {
  Band,
  Caption,
  Display,
  Eyebrow,
  Lede,
  OutcomeBadge,
  Reveal,
  Section,
  Stack,
  VideoEmbed,
} from '@/components/ui'

/**
 * 7. Interviews, offers and job starts — Movement II, the case slot.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * REBUILT 9 SEPTEMBER 2026 — Round 2. Two changes, both on owner instruction.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * 1. THE NINE VIDEOS NOW PLAY INLINE. They were outbound `<a>` links to
 *    youtube.com; a reader who clicked one left the page and did not come back.
 *    They are now `VideoEmbed` — poster plus a play control, swapped in place for
 *    a youtube-nocookie iframe on click. Nothing is requested from YouTube until
 *    the reader asks, so the page still sets no third-party cookie on arrival.
 *
 * 2. THE SIX PLACEHOLDER CASE CARDS (P01–P06) ARE CUT. Rationale below, under
 *    "What was removed and why", together with everything they used to render so
 *    that no verification debt is lost by deleting them.
 *
 * Word budget. This section rendered roughly 950 words of build scaffolding
 * around roughly 70 words of reader-facing copy — the worst ratio on the page.
 * Round 2 caps a scaffolding caption at fifteen words and moves the explanation
 * here, where the build team actually reads it. Rendered scaffolding is now the
 * badge, one caption and the employer-name note: under thirty words in total.
 *
 * ── What was removed and why ────────────────────────────────────────────────
 *
 * A placeholder register of the six public case candidates P01–P06 from the
 * research pack occupied this slot as six `CaseCard`s on the ladder's
 * `unverified` rung. Every card carried the same four findings in different
 * words — starting situation not recorded, obstacle not recorded, work done
 * cannot be written, milestone claimed but not established — and every card
 * repeated the identical 67-word "work done" paragraph. That is roughly 800 of
 * the section's 950 scaffolding words spent restating one fact six times.
 *
 * They are cut rather than compressed, on the judgement that nine videos a
 * reader can actually play are stronger evidence than six cards that say
 * nothing, and that a wall of dashed empty cards immediately above a dashed
 * block of real videos reads as one undifferentiated apology. Note that the
 * cards never carried a `data-blocked` attribute, so a `data-blocked` grep is
 * not weakened by their removal — nothing was greppable there to lose. The debt
 * itself stays live in CLAUDE.md's OPEN list under "Case verification (P01–P06)"
 * and is restated here so it survives in the file:
 *
 *   P01  ING → US Bank, portfolio risk management. Published as a signed offer.
 *        An offer is not a job someone started; neither is established.
 *   P02  Alcon, data science. Two published records conflict — the offer item
 *        says Associate, the interview item says Senior Associate.
 *   P03  Oanda, senior cash management. Interview invitation only. Seniority in
 *        a role title does not establish years of experience.
 *   P04  Smith & Nephew, senior master data management. Interview invitation
 *        only. Evidence of a specialist opportunity, not of a placement.
 *   P05  Cantor Fitzgerald, AVP. Interview invitation only.
 *   P06  Linklaters. Two published records conflict — the results wall says
 *        business development, the homepage says data analyst.
 *
 * For all six: consent, service actually received (DFY or coaching), relevant
 * experience, starting situation, specific work performed, an absolute date and
 * the exact milestone are open. "Work done" is mandatory on a shipped
 * `CaseCard` and must be specific — what was repositioned, how many
 * applications, how much outreach. The programme's confirmed weekly volumes (ten
 * or more tailored applications, thirty to seventy direct approaches) are
 * publishable and belong in that field, but no record links either figure to any
 * of these six, so neither may be written into a card until the file for that
 * case shows it. When a verified case arrives it comes back as a `CaseCard`
 * above the video block; the anatomy is unchanged and nothing here blocks it.
 *
 * ── The video block ─────────────────────────────────────────────────────────
 *
 * Playing inline does not verify anything, so the block keeps the ladder's
 * `unverified` treatment: dashed `muted` edge, no fill, and a badge naming what
 * is missing in words. Per docs/assets/2026-09-08-video-inventory.md, all seven
 * required facts are open for every one of the nine — most importantly consent
 * to reuse on this page (consent to be filmed for the old site is not that),
 * which service was received, and one exact milestone. Two strap-lines aggregate
 * outcomes ("4 Tier-1 Offers", "Multi-Offers"), which the claim rules require to
 * be relabelled to a single milestone or dropped. Seven of the nine are graduate
 * or survival-job stories, which is the framing this page exists to replace —
 * filming four to five matched experienced cases remains a launch blocker.
 *
 * Titles and strap-lines are the LIVE SITE'S OWN wording, carried across
 * unaltered. Nothing in this block is written here, which is what keeps a block
 * of unverified material from also being unverified copy.
 *
 * ── System notes ────────────────────────────────────────────────────────────
 *
 * Accent budget. Nine gold play controls would spend the section's accent nine
 * times over, so the tiles use `VideoEmbed control="quiet"` — a 44px outlined
 * disc. The 64px gold disc is for a single video at structural width, never a
 * grid. The eyebrow also ships `hairline={false}` and the header is composed
 * from `Eyebrow`/`Display`/`Lede` rather than `SectionHeader`, which has no
 * hairline prop, so this section renders zero gold elements.
 *
 * Grid. Two across at desktop, not three. At `max-w-structure` less the blocked
 * slot's padding, three across puts a 16:9 embed at roughly 310px wide — the
 * YouTube control bar collapses and a talking head is unreadable. Two across
 * gives roughly 480px, which is watchable. One column below 640px.
 *
 * Framing: execution only. Nothing here says CCC placed, presented or
 * represented anyone, or that CCC arranged an interview.
 */

/**
 * The nine testimonial videos already published on capitalcareerclub.com/en.
 * `title` and `strap` are the live site's own wording — see the note above.
 */
type Video = { id: string; title: string; strap: string }

const VIDEOS: readonly Video[] = [
  {
    id: 'Gh50BMbTUoM',
    title: 'Laid Off to 4 Tier-1 Offers',
    strap: 'ING → US Bank, JP Morgan, Goldman Sachs',
  },
  {
    id: 'mFswtguDKJU',
    title: 'Interpreter to Nomagic',
    strap: 'Language specialist → field ops specialist',
  },
  {
    id: 'otKB4VQQVHU',
    title: 'Jobless Grad to Linklaters',
    strap: '0 interviews → data analyst @ magic circle',
  },
  {
    id: '6A-3quJBGS0',
    title: '2-Year Career Gap to Maersk',
    strap: 'Home-stay mum → financial tax analyst',
  },
  {
    id: 'rfgxaKpNE5k',
    title: 'Tier-1 Multi-Offers',
    strap: 'Fresh grad → JP Morgan, Goldman Sachs, Maersk',
  },
  {
    id: '0DM04UMIl2w',
    title: 'Pizza Delivery to DHL',
    strap: "Domino's rider → supply chain specialist",
  },
  {
    id: 'oeD4N7RjzFU',
    title: "McDonald's to Marketing",
    strap: 'Server → marketing specialist @ Chisage',
  },
  {
    id: 'sp43Jl-coFw',
    title: 'Kebab Shop to Citi Bank',
    strap: 'Service staff → asset servicing specialist',
  },
  {
    id: 'YIMMS-YTGjo',
    title: 'Fresh Graduate to US Bank',
    strap: 'University → fraud analyst @ US Bank',
  },
]

export function Outcomes() {
  return (
    <Section id="outcomes">
      <Stack gap="block">
        <Reveal>
          <Band width="text" className="flex flex-col gap-tight text-center">
            <Eyebrow hairline={false}>What happened for other people</Eyebrow>
            <Display as="h2" size="h2">
              Nine people, in their own words
            </Display>
            <div className="pt-flow-m md:pt-flow">
              <Lede>
                Filmed for our current site, describing their own search. Play any of them here.
              </Lede>
            </div>
          </Band>
        </Reveal>

        {/*
          Blocked slot. Deleted in full, or replaced video by video, once the
          seven facts in the video inventory are established for each one. The
          long-form reason lives in the file comment above, not on the page.
        */}
        <Reveal delay={0.04}>
          <div
            data-blocked="testimonial-videos-unverified"
            className="flex flex-col gap-flow-m rounded border border-dashed border-muted p-card-m md:gap-flow md:p-card"
          >
            <div className="flex">
              <OutcomeBadge stage="unverified">Nine videos, none verified</OutcomeBadge>
            </div>

            <Caption>
              Consent to reuse, service received and exact milestone are open on all nine.
            </Caption>

            <ul className="grid grid-cols-1 gap-flow-m sm:grid-cols-2 md:gap-flow">
              {VIDEOS.map((v) => (
                <li key={v.id} className="flex flex-col gap-tight">
                  <VideoEmbed id={v.id} title={v.title} control="quiet" />
                  <span className="text-s text-ink">{v.title}</span>
                  <span className="text-caption text-muted">{v.strap}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <Band width="text">
            <Caption>
              Employer names locate a public example. They do not indicate a partnership.
            </Caption>
          </Band>
        </Reveal>
      </Stack>
    </Section>
  )
}
