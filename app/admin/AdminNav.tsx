const LINKS = [
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/email', label: 'Email' },
] as const

/** The two admin desks. */
export function AdminNav({ current }: { current: (typeof LINKS)[number]['href'] }) {
  return (
    <nav aria-label="Admin" className="flex gap-flow">
      {LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          aria-current={current === link.href ? 'page' : undefined}
          className="text-label font-medium uppercase text-muted hover:text-ink aria-[current=page]:text-accent"
        >
          {link.label}
        </a>
      ))}
    </nav>
  )
}
