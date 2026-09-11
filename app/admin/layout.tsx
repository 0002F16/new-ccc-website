import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics | Capital Career Club',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}

