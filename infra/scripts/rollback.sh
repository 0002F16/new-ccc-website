#!/usr/bin/env bash
set -euo pipefail

target_sha="${1:?usage: rollback.sh <deployed-sha>}"
target_dir="/srv/ccc-website/releases/${target_sha}"
if [[ ! -f "${target_dir}/package.json" ]]; then
  echo "Release does not exist: ${target_dir}" >&2
  exit 2
fi
ln -sfn "$target_dir" /srv/ccc-website/current
pm2 startOrReload "${target_dir}/ecosystem.config.cjs" --update-env
curl --fail --silent http://127.0.0.1:3210/api/health >/dev/null
echo "Rolled back to ${target_sha}"

