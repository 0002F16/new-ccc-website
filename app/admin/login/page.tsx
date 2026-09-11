import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE, verifyAdminSession } from '@/lib/admin-auth'

export const dynamic = 'force-dynamic'

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const cookieStore = await cookies()
  if (verifyAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect('/admin/analytics')
  const { error } = await searchParams
  return (
    <main className="grid min-h-screen place-items-center bg-ground px-gutter-m py-section-m text-body">
      <section className="w-full max-w-narrow rounded-panel border border-line bg-surface p-card-m shadow-panel md:p-card">
        <p className="text-label font-medium uppercase text-accent">CCC · Private operations</p>
        <h1 className="mt-flow font-serif text-h2-m text-ink md:text-h2">Analytics desk</h1>
        <p className="mt-tight text-s text-muted">
          One private view of acquisition, behaviour, and controlled experiments.
        </p>
        <form action="/api/admin/login" method="post" className="mt-block flex flex-col gap-flow-m">
          <label className="flex flex-col gap-tight text-label font-medium uppercase text-body">
            Owner password
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="min-h-[48px] rounded border border-line bg-sunken px-[14px] text-base normal-case tracking-normal text-ink"
            />
          </label>
          {error && (
            <p role="alert" className="text-caption text-accent">
              {error === 'locked' ? 'Too many attempts. Try again in fifteen minutes.' : 'That password was not accepted.'}
            </p>
          )}
          <button className="min-h-[48px] rounded bg-accent px-[24px] text-label font-semibold uppercase text-accent-on hover:bg-accent-hover">
            Open analytics
          </button>
        </form>
      </section>
    </main>
  )
}

