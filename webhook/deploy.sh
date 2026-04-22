#!/usr/bin/env bash
set -euo pipefail

REPO="${APP_REPO_DIR:?APP_REPO_DIR not set}"
BRANCH="${REPO_BRANCH:-main}"

echo "=== Deploy started at $(date -u +%FT%TZ) ==="

if ! git -C "$REPO" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "ERROR: $REPO is not a git repository." >&2
  exit 1
fi

cd "$REPO"

if [ ! -f docker-compose.yml ] && [ ! -f compose.yml ]; then
  echo "ERROR: $REPO does not contain docker-compose.yml or compose.yml." >&2
  exit 1
fi

git config --global --add safe.directory "$REPO"

if command -v getent >/dev/null 2>&1; then
  if ! getent hosts github.com >/dev/null; then
    echo "ERROR: cannot resolve github.com from inside the webhook container." >&2
    exit 1
  fi
fi

git fetch --all
git checkout "$BRANCH"
git pull origin "$BRANCH"
docker compose up -d --build --remove-orphans hci-web hci-proxy

echo "=== Deploy finished at $(date -u +%FT%TZ) ==="
