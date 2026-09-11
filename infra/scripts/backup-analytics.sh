#!/usr/bin/env bash
set -euo pipefail

backup_kind="${1:-daily}"
case "$backup_kind" in
  daily|weekly) ;;
  *) echo "backup kind must be daily or weekly" >&2; exit 2 ;;
esac

set -a
source /etc/ccc-website.env
set +a

backup_root="/var/backups/ccc-analytics/${backup_kind}"
mkdir -p "$backup_root"
umask 077
timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
pg_dump --format=custom --no-owner --no-acl "$DATABASE_URL" > "${backup_root}/ccc-analytics-${timestamp}.dump"

if [[ "$backup_kind" == "daily" ]]; then
  find /var/backups/ccc-analytics/daily -type f -name 'ccc-analytics-*.dump' -mtime +7 -delete
else
  find /var/backups/ccc-analytics/weekly -type f -name 'ccc-analytics-*.dump' -mtime +28 -delete
fi

