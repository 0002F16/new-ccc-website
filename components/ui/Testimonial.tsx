import { Card } from './Card'

/** No portrait without consent. No quotation-mark graphics, no star ratings. */
export function Testimonial({
  quote,
  attribution,
}: {
  quote: React.ReactNode
  attribution: string
}) {
  return (
    <Card as="article">
      <blockquote className="text-l text-ink">{quote}</blockquote>
      <p className="text-label font-medium uppercase text-muted">{attribution}</p>
    </Card>
  )
}
