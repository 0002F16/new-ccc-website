'use client'

import { useRef, useState } from 'react'
import { Body, cx, H3, Reveal, Section, SectionHeader, Stack } from '@/components/ui'

/**
 * 2. Two situations — stalled search and stalled career, parallel, equal space
 * and equal specificity. Neither panel is framed as the more serious one.
 *
 * Two presentations, one content source:
 *
 * - ≥1024px: `SituationsSpread`, both panels visible at once, separated by a
 *   single vertical `line` rule. No card fill: the panels sit on the unbroken
 *   ground and the rule is the only structure, which keeps the two of them
 *   identical in weight rather than nearly identical.
 * - <1024px: `SituationTabs`, a two-panel segmented control with both labels
 *   visible and equal. Stacking would make equal weight impossible, because the
 *   second panel would be read by fewer people by definition.
 *
 * Only one of the two trees is ever rendered to the accessibility tree — the
 * other is `display:none` — so no content is announced twice.
 *
 * Gold budget: one `line-gold` element in this section, the eyebrow hairline.
 * The active tab is marked with `accent-wash`, the token's stated use for an
 * active state, and carries no gold edge.
 *
 * ─── Round 2, 9 September 2026 ──────────────────────────────────────────────
 *
 * The owner named this section's first panel as the example of copy that is far
 * too long. All four paragraphs were rewritten: 193 words of prose down to 105,
 * longest paragraph now 34 words against a 45-word ceiling. Nothing was added.
 *
 * This is the one section allowed to be felt rather than argued, so the cuts
 * kept the concrete details that do the recognising — the count of applications,
 * the reason-free rejection, the person hired in from outside — and dropped the
 * connective reasoning around them, which the reader supplies unaided.
 *
 * Panel B's "You are not short of ability and you are not short of intent" is
 * gone. The founder statement elsewhere on the page owns that line, and a
 * near-verbatim echo of it here was the strongest duplication in Movement I.
 * What survives is its second half, stated plainly: the hours are the problem.
 *
 * The presentation split above is unchanged, including the full tab semantics.
 * `Reveal` wraps the section once, as a block, not per element.
 */

type Situation = {
  id: string
  /** Segmented-control label. Mobile only; the deck sets these separately. */
  tabLabel: string
  heading: string
  paragraphs: readonly [string, string]
}

const SITUATIONS: readonly [Situation, Situation] = [
  {
    id: 'situation-search',
    tabLabel: 'Applying, hearing nothing',
    heading: 'You are applying, and hearing nothing back',
    paragraphs: [
      'Eighty applications. Most get nothing. The ones that answer send a rejection with no reason in it, so there is nothing to fix.',
      'It is not you. A good CV in an inbox is a weak instrument, and it is the only one you have.',
    ],
  },
  {
    id: 'situation-career',
    tabLabel: 'Employed, going nowhere',
    heading: 'You are employed, and going nowhere',
    paragraphs: [
      'The job is fine. That is the problem. Another year, no title change, the same pay conversation, and the person hired above you came from outside. Nothing is wrong enough to force a decision.',
      'So the search happens at night, in the gaps, badly. Two applications one week, none the next. A real search takes hours you do not have.',
    ],
  },
] as const

/** The panel body. Identical markup in both presentations. */
function SituationBody({ situation }: { situation: Situation }) {
  return (
    <Stack gap="flow">
      <H3>{situation.heading}</H3>
      {situation.paragraphs.map((paragraph) => (
        <Body key={paragraph.slice(0, 32)}>{paragraph}</Body>
      ))}
    </Stack>
  )
}

/** ≥1024px: both panels present and visible, split by one vertical rule. */
function SituationsSpread() {
  return (
    <div className="hidden lg:grid lg:grid-cols-2">
      {SITUATIONS.map((situation, index) => (
        <div
          key={situation.id}
          className={cx(index === 0 ? 'lg:pr-block' : 'lg:border-l lg:border-line lg:pl-block')}
        >
          <SituationBody situation={situation} />
        </div>
      ))}
    </div>
  )
}

/** <1024px: segmented control, both labels visible and equal, real tab semantics. */
function SituationTabs() {
  const [selected, setSelected] = useState(0)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])

  function select(index: number) {
    setSelected(index)
    tabs.current[index]?.focus()
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const last = SITUATIONS.length - 1
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault()
      select(selected === last ? 0 : selected + 1)
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault()
      select(selected === 0 ? last : selected - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      select(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      select(last)
    }
  }

  return (
    <div className="mx-auto w-full max-w-text lg:hidden">
      <Stack gap="block">
        <div
          role="tablist"
          aria-label="Two ways people arrive here"
          onKeyDown={onKeyDown}
          className="grid grid-cols-2 overflow-hidden rounded border border-line"
        >
          {SITUATIONS.map((situation, index) => {
            const active = index === selected
            return (
              <button
                key={situation.id}
                type="button"
                role="tab"
                id={`${situation.id}-tab`}
                aria-selected={active}
                aria-controls={`${situation.id}-panel`}
                tabIndex={active ? 0 : -1}
                ref={(node) => {
                  tabs.current[index] = node
                }}
                onClick={() => setSelected(index)}
                className={cx(
                  'min-h-[44px] p-tight text-center text-s transition-colors duration-ui ease-ui',
                  index === 1 && 'border-l border-line',
                  active ? 'bg-accent-wash text-ink' : 'text-muted hover:text-ink',
                )}
              >
                {situation.tabLabel}
              </button>
            )
          })}
        </div>

        {SITUATIONS.map((situation, index) => (
          <div
            key={situation.id}
            role="tabpanel"
            id={`${situation.id}-panel`}
            aria-labelledby={`${situation.id}-tab`}
            tabIndex={0}
            hidden={index !== selected}
          >
            <SituationBody situation={situation} />
          </div>
        ))}
      </Stack>
    </div>
  )
}

export function TwoSituations() {
  return (
    <Section id="two-situations" width="structure">
      <Reveal>
        <Stack gap="block">
          <SectionHeader
            eyebrow="TWO WAYS PEOPLE ARRIVE HERE"
            heading="One of these is probably you"
          />
          <SituationsSpread />
          <SituationTabs />
        </Stack>
      </Reveal>
    </Section>
  )
}
