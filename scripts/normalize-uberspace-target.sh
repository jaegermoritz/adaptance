#!/usr/bin/env bash

set -euo pipefail

if [[ -z "${GITHUB_ENV:-}" ]]; then
  echo "::error::GITHUB_ENV is not set; this script must run inside GitHub Actions."
  exit 1
fi

if [[ -z "${UBERSPACE_HOST:-}" ]]; then
  echo "::error::UBERSPACE_HOST is required."
  exit 1
fi

if [[ -z "${UBERSPACE_USER:-}" ]]; then
  echo "::error::UBERSPACE_USER is required."
  exit 1
fi

if [[ -z "${UBERSPACE_DEPLOY_PATH:-}" ]]; then
  echo "::error::UBERSPACE_DEPLOY_PATH is required. Set the repository variable to Applications/adaptance.org/. There is no html/ fallback."
  exit 1
fi

raw_host="${UBERSPACE_HOST#ssh://}"
raw_host="${raw_host//$'\r'/}"
raw_host="${raw_host#"${raw_host%%[![:space:]]*}"}"
raw_host="${raw_host%"${raw_host##*[![:space:]]}"}"
if [[ "${raw_host}" == *:* && "${raw_host}" != *@* ]]; then
  raw_host="${raw_host%%:*}"
elif [[ "${raw_host}" == *@*:* ]]; then
  raw_host="${raw_host%:*}";
fi
while [[ "${raw_host}" == */ ]]; do raw_host="${raw_host%/}"; done
while [[ "${raw_host}" == *"." ]]; do raw_host="${raw_host%.}"; done

if [[ "${raw_host}" == */* ]]; then
  echo "::error::UBERSPACE_HOST must not include a remote path. Set UBERSPACE_DEPLOY_PATH instead."
  exit 1
fi

if [[ "${UBERSPACE_USER}" == *"@"* ]]; then
  echo "::error::UBERSPACE_USER must be the account name only, without @host, spaces or a command."
  exit 1
fi

normalized_user="${UBERSPACE_USER//$'\r'/}"
normalized_user="${normalized_user#"${normalized_user%%[![:space:]]*}"}"
normalized_user="${normalized_user%"${normalized_user##*[![:space:]]}"}"

if [[ "${raw_host}" == *@* ]]; then
  embedded_user="${raw_host%@*}"
  raw_host="${raw_host#*@}"

  if [[ -n "${normalized_user}" && "${normalized_user}" != "${embedded_user}" ]]; then
    echo "::error::UBERSPACE_USER does not match the user embedded in UBERSPACE_HOST."
    exit 1
  fi

  if [[ -z "${normalized_user}" ]]; then
    normalized_user="${embedded_user}"
  fi
fi

normalized_host="${raw_host}"

if [[ ! "${normalized_user}" =~ ^[a-zA-Z0-9_-]+$ ]]; then
  echo "::error::UBERSPACE_USER must be the account name only, without @host, spaces or a command."
  exit 1
fi

if [[ ! "${normalized_host}" =~ ^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])(\.([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]))*$ ]]; then
  echo "::error::UBERSPACE_HOST must contain a valid hostname."
  exit 1
fi

raw_path="${UBERSPACE_DEPLOY_PATH#/}"
while [[ "${raw_path}" == */ ]]; do raw_path="${raw_path%/}"; done

if [[ "${raw_path}" == "html" || "${raw_path}" == */html ]]; then
  echo "::error::UBERSPACE_DEPLOY_PATH must not fall back to html/. Use Applications/adaptance.org/."
  exit 1
fi

if [[ ! "${raw_path}" =~ ^Applications/[A-Za-z0-9._-]+$ ]]; then
  echo "::error::UBERSPACE_DEPLOY_PATH must be an Applications/ directory such as Applications/adaptance.org/."
  exit 1
fi

echo "ADAPTANCE_UBERSPACE_USER=${normalized_user}" >> "${GITHUB_ENV}"
echo "ADAPTANCE_UBERSPACE_HOST=${normalized_host}" >> "${GITHUB_ENV}"
echo "ADAPTANCE_DEPLOY_PATH=${raw_path}/" >> "${GITHUB_ENV}"
