export function AnalyticsPrivacyControl() {
  return (
    <footer className="border-t border-line-soft bg-sunken px-gutter-m py-flow-m text-center md:px-gutter">
      <div className="text-caption text-muted">
        This site uses first-party, privacy-minimised analytics to improve the page. No form text or
        session recording is collected.{` `}
        <form action="/api/analytics/opt-out" method="post" className="inline">
          <button type="submit" className="text-body underline underline-offset-4 hover:text-ink">
            Turn analytics off
          </button>
        </form>
      </div>
    </footer>
  )
}
