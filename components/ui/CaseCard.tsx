import { Card } from './Card'
import { OutcomeBadge, type Stage } from './Outcome'
import { SpecList } from './SpecPair'
import { H3 } from './Type'

/**
 * Case card — the most constrained component on the page, because it carries the
 * claims. Fixed field order. "Work done" is mandatory and must be specific.
 * An unverified case uses the dashed treatment and must not ship.
 */
export function CaseCard({
  heading,
  stage,
  badge,
  startingPoint,
  obstacle,
  workDone,
  outcome,
  date,
}: {
  heading: string
  stage: Stage
  badge: string
  startingPoint: React.ReactNode
  obstacle: React.ReactNode
  workDone: React.ReactNode
  outcome: React.ReactNode
  date: string
}) {
  return (
    <Card as="article">
      <div className="flex flex-col gap-tight">
        <H3>{heading}</H3>
        <div>
          <OutcomeBadge stage={stage}>{badge}</OutcomeBadge>
        </div>
      </div>
      <SpecList
        specs={[
          { term: 'Starting point', value: startingPoint },
          { term: 'Obstacle', value: obstacle },
          { term: 'Work done', value: workDone },
          { term: 'Outcome', value: outcome },
        ]}
      />
      <p className="text-caption text-muted tnum">{date}</p>
    </Card>
  )
}
