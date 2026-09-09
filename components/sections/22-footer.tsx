import { Band, Body, Caption, H3, Label, OutcomeBadge, Stack } from '@/components/ui'

/**
 * 22. Free resources and footer — the close of Movement V, and the page's foot.
 *
 * Copy is verbatim from docs/copy/2026-09-08-copy-deck-v1.md § 22.
 *
 * ─── Landmark ───────────────────────────────────────────────────────────────
 *
 * This is deliberately NOT built on the `Section` primitive. `Section` renders
 * a `<section>`, and a `<section>` at the foot of the document gives the page a
 * generic region where it needs a `contentinfo` landmark. So the shell is a real
 * `<footer>` carrying `Section`'s own class string verbatim — `px-gutter-m
 * py-section-m md:px-gutter md:py-section`, then a centred container. Nothing
 * about the spacing or the width tokens changes; only the element does. It sits
 * outside `<main>` in app/page.tsx, which is what makes it the page's
 * `contentinfo` rather than a region inside the main content.
 *
 * `w-page` (1120px) is the wider of the two widths CLAUDE.md reserves for the
 * footer — the other is the sticky bar. Prose inside it still narrows to
 * `w-text`, so the page's 720/1040 rhythm is not broken at the last moment by a
 * paragraph running to 1120px.
 *
 * The ground does not change. `#0A0908` runs unbroken from the hero to the last
 * line of this file; the separation between the free-resources block and the
 * footer proper is a 1px `line` hairline and `space-block`, never a panel, a
 * `surface` fill or a darker foot.
 *
 * ─── Layout: three treatments considered ────────────────────────────────────
 *
 *   (a) Free resources as a full section header — `Eyebrow` + `Display` at h2,
 *       lede, then a primary-geometry link. Rejected. It makes the exit route
 *       the loudest thing after the application step, and §21 has to be the last
 *       raised voice on the page. It also contradicts the deck, which specifies
 *       an `h3` here and an `h2` nowhere in § 22 — the deck is deliberately
 *       quieting this block, and the IA agrees: "a quiet secondary route for
 *       people outside the paid offer".
 *   (b) A two-column foot — free resources on the left at `w-structure`, the
 *       compliance furniture stacked on the right, sharing one row. Rejected on
 *       two counts. It reads as site navigation, which the IA rules out
 *       explicitly ("Site navigation. Compliance furniture in the footer is not
 *       navigation"), and it sets the free-resources copy beside a block that is
 *       almost entirely a blocked slot, so the one live thing in the foot ends
 *       up sharing a row with the page's largest piece of unfinished business.
 *   (c) Chosen — one column, two movements, in the deck's own order. Free
 *       resources first as centred prose at `w-text`: `H3`, `Body`, then the
 *       link. A `line` hairline. Then the footer proper at `w-page`: the
 *       wordmark line, and the blocked legal row beneath it. Read top to bottom
 *       it is exactly the deck; read as furniture it is a foot, not a menu.
 *
 * ─── The anchor ─────────────────────────────────────────────────────────────
 *
 * Two sections already point here in copy that shipped before this one existed:
 * §05 ("free resources are at the bottom of this page and you should use them")
 * and §19.2 ("the free resources at the bottom of this page are a better fit").
 * Neither had anywhere to link to. The free-resources block therefore carries a
 * stable `id="free-resources"`, and the footer landmark carries `id="footer"`.
 * `#free-resources` is the id those two sections should link to; making that
 * link is their owners' change, not this file's.
 *
 * ─── What is blocked, and how it is surfaced ────────────────────────────────
 *
 * Two blocked slots, both on the house pattern: `data-blocked` on the outermost
 * node, the dashed `unverified` treatment, and a badge naming what is missing in
 * words. One grep for `data-blocked` lists everything owed.
 *
 *   1. `free-resources-destination-unknown`. The deck supplies the link *label*
 *      — "Free resources and templates" — and no URL, and no URL for the free
 *      course, the templates or the community appears anywhere in the deck, the
 *      IA spec or CLAUDE.md. A secondary route with no destination is not a
 *      route, and inventing one is out of the question, so the label is rendered
 *      as text inside the slot rather than as an anchor. It becomes an `<a>` the
 *      moment somebody supplies the address.
 *
 *   2. `footer-legal-furniture-missing`. CLAUDE.md blocks the footer
 *      specifically: `[CONFIRM CONTROLLER, PROCESSORS, TRANSFERS]` is listed
 *      under "Blocks specific sections" as "needed before the footer and the
 *      application step can be built". The deck blocks it twice more — the
 *      registered entity name and address are `[BLOCKED — owner]`, and the
 *      complaints and ADR/ODR information is `[BLOCKED — counsel]`. So nothing
 *      in this file names a controller, a company, a registration number, an
 *      address or an email, and nothing here is a privacy policy or a summary
 *      of one. The deck's furniture line is set as plain text inside the dashed
 *      slot, explicitly not linked, because four link labels pointing nowhere
 *      would read as a finished foot with broken links rather than as an
 *      unfinished one. "Cookie settings" is a control, not a link, and no
 *      consent mechanism exists to attach it to.
 *
 * "Capital Career Club" itself is not blocked — the deck's block tag follows the
 * name and covers the registered entity and the address — so the wordmark line
 * ships, alone, with the entity identity owed beside it in the slot below.
 *
 * ─── Claims ────────────────────────────────────────────────────────────────
 *
 * Nothing from the live site's foot comes across: no "180+ Internationals
 * Placed in Poland", no "15M+ PLN earned by clients annually", no employer list,
 * no counts of any kind. No CTA either — §21 owns the close, and a second
 * primary button in the foot would put two on one screen.
 *
 * ─── Accent budget ─────────────────────────────────────────────────────────
 *
 * Zero. No eyebrow, so no gold hairline; the divider is `line`, not `line-gold`;
 * the one element that would normally be gold — the free-resources link — is
 * blocked and therefore `muted`. A foot is not where the page's gold should be
 * spent, and "at most one" permits none.
 */
export function Footer() {
  return (
    <footer id="footer" className="px-gutter-m py-section-m md:px-gutter md:py-section">
      <div className="mx-auto flex w-full max-w-page flex-col gap-block-m md:gap-block">
        {/*
          The secondary route. §05 and §19 both point at this id.
          Prose narrows to 720px inside the 1120px foot.
        */}
        <Band width="text">
          {/*
            Neither `Band` nor `Stack` accepts an id, and adding one to a
            primitive is not this file's change to make — so the anchor sits on a
            plain div carrying `Stack`'s own gap classes verbatim.
          */}
          <div id="free-resources" className="flex scroll-mt-block flex-col gap-flow-m md:gap-flow">
            <H3 className="text-center">If this is not for you, or not yet</H3>
            <Body className="text-center">
              There is a free course, CV templates and a community of internationals doing this in
              Poland. Under three years in, or would rather run the search yourself? Start there. It
              costs nothing.
            </Body>

            {/*
              Build scaffolding, not page copy. The deck gives the link label and
              no destination. Delete this block and render the label as an <a>
              when the address exists.
            */}
            <div
              data-blocked="free-resources-destination-unknown"
              className="mx-auto flex flex-col items-center gap-tight rounded border border-dashed border-muted p-card-m text-center md:p-card"
            >
              <OutcomeBadge stage="unverified">Destination missing</OutcomeBadge>
              <p className="text-base text-muted">Free resources and templates</p>
              <Caption className="max-w-narrow">
                No address exists for the free course, templates or community. Owner.
              </Caption>
            </div>
          </div>
        </Band>

        <div aria-hidden className="h-px w-full bg-line" />

        {/* The footer proper. Compliance furniture, not navigation. */}
        <Stack gap="flow">
          <Label as="p">Capital Career Club</Label>

          {/*
            Build scaffolding, not page copy. The legal foot cannot be written
            until the controller, the processors and the transfers are settled —
            the application step and the Calendly embed both collect personal
            data and Calendly is a US processor — and until the registered entity
            and the complaints and ADR/ODR route are supplied. Nothing here is
            drafted past that.
          */}
          <div
            data-blocked="footer-legal-furniture-missing"
            className="flex flex-col items-start gap-tight rounded border border-dashed border-muted p-card-m md:p-card"
          >
            <OutcomeBadge stage="unverified">Legal furniture missing</OutcomeBadge>
            <p className="text-base text-muted">
              Privacy policy · Terms · Complaints · Cookie settings
            </p>
            <Caption className="max-w-text">
              None of these exists yet. Owed before launch — see this file&rsquo;s header comment.
            </Caption>
          </div>
        </Stack>
      </div>
    </footer>
  )
}
