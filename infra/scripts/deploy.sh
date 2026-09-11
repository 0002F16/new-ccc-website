#!/usr/bin/env bash
set -euo pipefail

release_sha="${1:-$(git rev-parse HEAD)}"
release_root="/srv/ccc-website/releases"
release_dir="${release_root}/${release_sha}"

mkdir -p "$release_dir"
git archive "$release_sha" | tar -x -C "$release_dir"
cd "$release_dir"
npm ci
set -a
source /etc/ccc-website.env
set +a
npm run db:migrate
npm run build
ln -sfn "$release_dir" /srv/ccc-website/current
pm2 startOrReload "$release_dir/ecosystem.config.cjs" --update-env
pm2 save
curl --fail --silent http://127.0.0.1:3210/api/health >/dev/null
node scripts/warm-images.mjs || echo "warning: image cache warm-up failed" >&2
echo "Deployed ${release_sha}"

