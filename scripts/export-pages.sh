#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
vinext="${project_root}/node_modules/.bin/vinext"

if [[ ! -x "${vinext}" ]]; then
  echo "Vinext is unavailable. Run npm ci first." >&2
  exit 69
fi

"${vinext}" build

server_log="$(mktemp)"
"${vinext}" start >"${server_log}" 2>&1 &
site_pid=$!

cleanup() {
  kill "${site_pid}" 2>/dev/null || true
  wait "${site_pid}" 2>/dev/null || true
  unlink "${server_log}" 2>/dev/null || true
}
trap cleanup EXIT

ready=0
for attempt in $(seq 1 30); do
  if curl --fail --silent "http://127.0.0.1:3000/" >/dev/null; then
    ready=1
    break
  fi
  sleep 1
done

if [[ "${ready}" != "1" ]]; then
  echo "The production server did not become ready." >&2
  sed -n '1,160p' "${server_log}" >&2
  exit 70
fi

SITE_ORIGIN="http://127.0.0.1:3000" node "${project_root}/scripts/export-pages.mjs"
