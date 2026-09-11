# CCC analytics operations

The public site, analytics collector, experiment assignment, and private
dashboard are one Next.js service. PostgreSQL is the only persistent dependency.
No page content, form values, uploaded-file details, full URLs, raw IP
addresses, user-agent strings, or ordered mouse trails belong in the analytics
database. Country and subdivision are resolved locally; low-volume regions are
grouped in the dashboard.

## First VPS installation

1. Install Node.js 22, PostgreSQL, Nginx, PM2, `certbot`, `pg_dump`, and
   `geoipupdate`.
2. Create Unix user `ccc-web`, directories `/srv/ccc-website/releases` and
   `/var/backups/ccc-analytics/{daily,weekly}`, and grant only that user access.
3. Create database `ccc_analytics` and login `ccc_analytics_app`. Grant it DML
   and migration privileges only on that database; keep PostgreSQL on localhost.
4. Copy `.env.example` to `/etc/ccc-website.env`, mode `0600`, owned by
   `ccc-web`. Generate independent secrets, at least 32 random bytes each. Keep
   `SITE_URL` set to the public origin; admin redirects deliberately use it
   instead of the private Next.js listener.
5. Create a free MaxMind account and configure `/etc/GeoIP.conf` with its
   account ID, license key, and `EditionIDs GeoLite2-City`. Run `geoipupdate`,
   confirm `/var/lib/GeoIP/GeoLite2-City.mmdb` is readable by `ccc-web`, and
   schedule a weekly update. Missing lookup data becomes `Unknown` and never
   interrupts collection.
6. Generate the owner password hash without writing the plaintext password:

   ```bash
   node -e "require('argon2').hash(process.argv[1]).then(console.log)" 'chosen-password'
   ```

7. Create `/etc/nginx/.htpasswd-ccc-staging`, copy the staging Nginx config,
   deploy a committed revision with `infra/scripts/deploy.sh <git-sha>`, and
   verify `/api/health` locally. Provision TLS before sharing Basic-Auth
   credentials.
8. Validate through `staging.capitalcareerclub.com`, then follow the snapshot
   and checklist in `docs/dns-cutover-record.md`. After cutover, use Certbot for
   the apex and `www`; the production Nginx config permanently redirects `www`.

## Normal operation

- Dashboard: `https://capitalcareerclub.com/admin/analytics`
- Health: `https://capitalcareerclub.com/api/health`
- Run migrations: `npm run db:migrate`
- Run retention manually: `npm run analytics:maintain`
- Regenerate heatmap backdrops while the site is running locally:
  `ANALYTICS_SNAPSHOT_URL=http://localhost:3210 npm run analytics:snapshots`
- Deploy: `infra/scripts/deploy.sh <git-sha>`
- Roll back: `infra/scripts/rollback.sh <previous-git-sha>`

The dashboard can start, pause, and end only experiments registered in
`lib/analytics/experiments.ts`. Keep one active homepage experiment at a time.
No experiment is active after initial installation.

## Retention and incident response

- Per-session heatmap bins: 30 days.
- Detailed events and anonymous identifiers: 90 days.
- Daily anonymous aggregates: 24 months.
- Daily backups: 7 days; weekly backups: 4 weeks.

If collection fails, keep the public site serving. Check PM2 logs, PostgreSQL,
disk capacity, and `/api/health`; analytics deliberately fails open. If a privacy
incident is suspected, set `ANALYTICS_ENABLED=false`, reload PM2, preserve only
the minimum logs needed for investigation, and run the retention job after the
scope is understood.

## Privacy decision

The owner chose tracking without a consent gate, overriding PRD requirement
R-24. The implementation honours GPC and DNT, offers a persistent opt-out, and
minimises stored data. That design choice is not a legal conclusion and should
be reviewed before production activation.
