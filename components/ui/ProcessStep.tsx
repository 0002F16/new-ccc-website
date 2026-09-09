import { H4 } from './Type'

/** Numbers only where the order is real. */
export function ProcessStep({
  n,
  title,
  children,
}: {
  n: string
  title: string
  children: React.ReactNode
}) {
  return (
    <li className="flex flex-col gap-tight">
      <span className="text-micro font-medium uppercase text-accent tnum">{n}</span>
      <H4>{title}</H4>
      <div className="text-s text-body">{children}</div>
    </li>
  )
}
