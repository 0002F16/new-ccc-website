import { requireAdmin } from '@/lib/admin-auth'
import { crmError, crmFetch } from '@/lib/crm'
import { AdminNav } from '../AdminNav'

export const dynamic = 'force-dynamic'

type Kind = 'received' | 'accepted' | 'rejected'
type Settings = {
  enabled: boolean
  fromName: string
  fromEmail: string
  hasPassword: boolean
  templates: Record<Kind, { subject: string; body: string }>
}

const KINDS: { kind: Kind; title: string; when: string }[] = [
  { kind: 'received', title: 'Application received', when: 'Sent as soon as an application arrives.' },
  { kind: 'accepted', title: 'Accepted', when: 'Sent on Accept, never sooner than 5 hours after they applied.' },
  { kind: 'rejected', title: 'Rejected', when: 'Sent on Reject, never sooner than 5 hours after they applied.' },
]

const input =
  'w-full min-h-[48px] rounded border border-line bg-sunken px-[14px] text-base normal-case tracking-normal text-ink focus:border-accent'
const label = 'flex flex-col gap-tight text-label font-medium uppercase text-muted'
const button =
  'min-h-[48px] rounded bg-accent px-[24px] text-label font-semibold uppercase text-accent-on hover:bg-accent-hover'

async function loadSettings(): Promise<{ settings: Settings } | { error: string }> {
  try {
    const response = await crmFetch('/api/email-settings')
    if (!response.ok) return { error: await crmError(response, `The CRM answered ${response.status}.`) }
    return { settings: (await response.json()) as Settings }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'The CRM is unreachable.' }
  }
}

function Panel({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-panel border border-line bg-surface p-card-m shadow-card md:p-card">
      <h2 className="font-serif text-h3-m text-ink md:text-h3">{title}</h2>
      {note && <p className="mt-tight text-caption text-muted">{note}</p>}
      <div className="mt-flow flex flex-col gap-flow-m">{children}</div>
    </section>
  )
}

export default async function EmailSetup({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; tested?: string; error?: string }>
}) {
  await requireAdmin()
  const { saved, tested, error } = await searchParams
  const loaded = await loadSettings()

  return (
    <main className="min-h-screen bg-ground text-body">
      <header className="border-b border-line bg-sunken px-gutter-m py-flow md:px-gutter">
        <div className="mx-auto flex max-w-text flex-col gap-flow">
          <AdminNav current="/admin/email" />
          <div>
            <p className="text-label font-medium uppercase text-accent">CCC · Applicant emails</p>
            <h1 className="mt-tight font-serif text-display-l-m text-ink md:text-display-l">Email setup</h1>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-text flex-col gap-block px-gutter-m py-block md:px-gutter">
        {(saved || tested || error) && (
          <p role="status" className={`rounded border px-[14px] py-[12px] text-s ${error ? 'border-accent text-accent' : 'border-line text-ink'}`}>
            {error ? error : saved ? 'Saved.' : 'Test email sent. Check the inbox.'}
          </p>
        )}

        {'error' in loaded ? (
          <p role="alert" className="text-s text-accent">Could not load settings from the CRM: {loaded.error}</p>
        ) : (
          <>
            <form action="/api/admin/email" method="post" className="flex flex-col gap-block">
              <Panel title="Sending" note="Gmail or Google Workspace. The address is also the login.">
                <label className="flex min-h-[44px] items-center gap-tight text-s text-ink">
                  <input type="checkbox" name="enabled" defaultChecked={loaded.settings.enabled} className="size-[18px] accent-accent" />
                  Send emails to applicants
                </label>
                <label className={label}>
                  From name
                  <input name="fromName" defaultValue={loaded.settings.fromName} placeholder="John Yumul" className={input} />
                </label>
                <label className={label}>
                  Sending address
                  <input name="fromEmail" type="email" defaultValue={loaded.settings.fromEmail} placeholder="ops@capitalcareerclub.com" className={input} />
                </label>
                <label className={label}>
                  App password {loaded.settings.hasPassword && <span className="normal-case tracking-normal text-accent">· saved, leave blank to keep</span>}
                  <input name="password" type="password" autoComplete="new-password" className={input} />
                </label>
              </Panel>

              {KINDS.map(({ kind, title, when }) => (
                <Panel key={kind} title={title} note={`${when} Use {firstName} or {fullName}. A blank line starts a new paragraph, **text** is bold and pasted links are clickable.`}>
                  <label className={label}>
                    Subject
                    <input name={`${kind}_subject`} defaultValue={loaded.settings.templates[kind].subject} required className={input} />
                  </label>
                  <label className={label}>
                    Body
                    <textarea name={`${kind}_body`} defaultValue={loaded.settings.templates[kind].body} required rows={9} className={`${input} py-[12px] leading-relaxed`} />
                  </label>
                </Panel>
              ))}

              <button className={`${button} self-start`}>Save</button>
            </form>

            <form action="/api/admin/email/test" method="post">
              <Panel title="Send a test" note="Uses the saved settings and a sample name, Ada Nowak. Works while sending is off.">
                <label className={label}>
                  Send to
                  <input name="to" type="email" required className={input} />
                </label>
                <label className={label}>
                  Email
                  <select name="kind" className={input}>
                    {KINDS.map(({ kind, title }) => (
                      <option key={kind} value={kind}>{title}</option>
                    ))}
                  </select>
                </label>
                <button className="min-h-[48px] self-start rounded border border-line px-[24px] text-label font-medium uppercase text-ink hover:border-ink">
                  Send test
                </button>
              </Panel>
            </form>
          </>
        )}
      </div>
    </main>
  )
}
