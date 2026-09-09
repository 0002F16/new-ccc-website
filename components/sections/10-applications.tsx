import {
  Band,
  Body,
  Caption,
  Label,
  OutcomeBadge,
  Section,
  SectionHeader,
  Stack,
} from '@/components/ui'

/**
 * 10. Ten or more applications a week, sent for you — Movement III, Door One.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 10.
 *
 * ─── Layout: three treatments considered ────────────────────────────────────
 *
 *   (a) Prose only — header, body, no exhibit. Rejected. The whole argument of
 *       this section is that a volume claim is checkable, and the IA gives § 10
 *       a named exhibit built as "a real HTML table with tabular-nums, which is
 *       what the design system was drawn for". Dropping it would also hide the
 *       fact that the specimen is owed: nothing would grep.
 *   (b) Spec pairs — WHAT GOES OUT / HOW MANY / TRACKED / FOLLOWED UP down a
 *       `SpecList`. Rejected. It reads well and it is the page's workhorse, but
 *       it restates the body paragraph in smaller type, and it invents four
 *       terms and four values that are nowhere in the copy deck. Rule 7.
 *   (c) Chosen — header and body as centred 720px prose, then the exhibit as a
 *       full 1040px structural band carrying the IA's five-part exhibit anatomy
 *       in order: provenance line · the exhibit · numbered callouts · provenance
 *       legend · verification state. That is the 720/1040 alternation the system
 *       asks for, and it is the treatment the neighbouring door sections (§ 11,
 *       § 12) are specified to take, so the movement reads as one run of
 *       exhibits rather than three unrelated blocks.
 *
 * ─── The exhibit ships as a shell, not as evidence ──────────────────────────
 *
 * The specimen does not exist. It is on the launch-blocker list in CLAUDE.md
 * ("Artefact specimens. Built from real templates with a fictional client and
 * employer, labelled as such"), and the copy deck supplies the six column
 * headers but no rows. Populating them here would be two defects at once:
 * inventing copy, and manufacturing the evidence the section exists to offer.
 *
 * So the table is real and its head is verbatim; its body is a blocked slot —
 * the dashed `unverified` treatment from the outcome ladder, which appears
 * nowhere else in Gilt and is meant to look unfinished. The column structure is
 * what the two callouts annotate (SENT and FOLLOWED UP are the two dates; ROLE
 * FAMILY and SECTOR are why no employer is named), so the callouts still land
 * against something visible rather than dangling off an empty rectangle.
 *
 * ─── The approval gap is surfaced, not answered ─────────────────────────────
 *
 * `[CONFIRM APPLICATION APPROVAL]` is open and it bites hardest here. The offer
 * letter's approval obligation covers CV, profile and content only, and Door One
 * is ten or more a week with no approval step; the hero chip "you approve every
 * application" was cut for that reason. This section therefore says nothing
 * about who selects the roles or whether the client sees an application before
 * it goes — no reassuring phrasing, no hedge, no implied approval. The unanswered
 * question is carried by a second blocked slot so that it is owed in writing
 * rather than quietly left to the reader.
 *
 * ─── Framing ────────────────────────────────────────────────────────────────
 *
 * Execution only. Applications are prepared and sent on the client's instruction
 * and in the client's name. No "we place you", no "we present you", no interview
 * CCC arranges. The deck's own heading — "sent for you" — is the strongest form
 * permitted and it is the deck's, not ours.
 *
 * ─── Gold budget ────────────────────────────────────────────────────────────
 *
 * One element: the eyebrow hairline. The IA's exhibit anatomy specifies the
 * callout numerals as `micro` in `accent`; two accent numerals plus the hairline
 * would put three golds on one screen, which the system forbids and which
 * section 04 already rejected for the same reason. The numerals are `micro` in
 * `muted` instead. Flagged in the build report as a deviation from the IA spec,
 * resolved in the system's favour because the system is binding.
 *
 * Figures carry `tnum` — the callout numerals and the table.
 */

/** Verbatim from the deck's "Table headers" row. */
const COLUMNS = ['Week', 'Role family', 'Sector', 'Sent', 'Followed up', 'Status'] as const

/** Verbatim from the deck's "Callouts". */
const CALLOUTS = [
  {
    n: '01',
    text: 'Each row is one application, with the date it went out and the date it was followed up.',
  },
  {
    n: '02',
    text: 'Roles are described by family and sector. Employers are not named.',
  },
] as const

export function Applications() {
  return (
    <Section id="applications" width="structure">
      <Stack gap="block">
        <Band width="text">
          <Stack gap="tight" className="items-center text-center">
            {/* Situation marker — house pattern, the IA's mono label as a `Label`. */}
            <Label as="p">Mostly stalled search</Label>
            <SectionHeader
              eyebrow="The first door"
              heading="Ten or more a week, whether or not you had the energy"
            />
          </Stack>
        </Band>

        <Band width="text">
          <Body>
            Ten or more applications a week, each one targeted to the role rather than sent in bulk,
            each one tracked, each one followed up. The number matters less than the fact that it
            happens on the weeks you would have skipped, which in a search of any length is most of
            them.
          </Body>
        </Band>

        {/*
          Exhibit 02. Five-part anatomy per the IA. The table head is verbatim
          copy; the table body is build scaffolding and must not survive to
          production — see the block comment above.
        */}
        <figure
          data-blocked="exhibit-02-activity-log-specimen-not-built"
          className="flex w-full flex-col gap-flow-m md:gap-flow"
        >
          {/* 1 — Provenance line. */}
          <Label as="p" className="tnum">
            Exhibit 02 · Weekly activity log · One week · Specimen
          </Label>

          {/* 2 — The exhibit. Real table, verbatim head, blocked body. */}
          <div className="overflow-x-auto rounded border border-line bg-surface shadow-card">
            <table className="tnum w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Weekly activity log specimen — one week of applications. The specimen rows have not
                been built, so the table has no data.
              </caption>
              <thead>
                <tr>
                  {COLUMNS.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="border-b border-line-soft px-tight py-tight text-label font-medium uppercase text-muted first:pl-card-m last:pr-card-m md:first:pl-card md:last:pr-card"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={COLUMNS.length} className="p-card-m md:p-card">
                    <div className="flex flex-col items-center gap-tight rounded border border-dashed border-muted p-card-m text-center md:p-card">
                      <OutcomeBadge stage="unverified">Specimen not built</OutcomeBadge>
                      <Caption className="max-w-text">
                        No activity-log specimen exists yet. It is to be built from the real
                        template and the real methodology with a fictional client and employer, one
                        week only. This block must be deleted before launch.
                      </Caption>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3 — Numbered callouts. */}
          <ul className="grid list-none grid-cols-1 gap-flow-m md:grid-cols-2 md:gap-flow">
            {CALLOUTS.map((callout) => (
              <li key={callout.n} className="flex flex-col gap-tight">
                <span className="tnum text-micro font-medium uppercase text-muted">
                  {callout.n}
                </span>
                <p className="text-s text-body">{callout.text}</p>
              </li>
            ))}
          </ul>

          {/* 4 and 5 — Provenance legend, and the verification state in words. */}
          <figcaption>
            <Caption>
              Specimen. Real format and real methodology, reconstructed with a fictional client and
              employer.
            </Caption>
          </figcaption>
        </figure>

        {/*
          The open question this section must not answer. [CONFIRM APPLICATION
          APPROVAL] — the offer letter's approval obligation covers CV, profile
          and content only, and Door One runs at ten or more a week with no
          approval step. Nothing on this page may imply per-application approval
          until this closes. Scaffolding, not page copy.
        */}
        <Band width="text">
          <div
            data-blocked="application-approval-unresolved"
            className="flex flex-col items-start gap-tight rounded border border-dashed border-muted p-card-m md:p-card"
          >
            <OutcomeBadge stage="unverified">Answer missing</OutcomeBadge>
            <Caption>
              Who selects the roles, and whether the client sees an application before it is sent,
              is unresolved on the source documents. Until it is answered in writing this section
              states nothing about approval, and the page must not imply that every application is
              approved. This block must be deleted before launch and replaced by the answer.
            </Caption>
          </div>
        </Band>
      </Stack>
    </Section>
  )
}
