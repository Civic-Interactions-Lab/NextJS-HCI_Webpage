#!/usr/bin/env bash
set -euo pipefail

REPO="${APP_REPO_DIR:?APP_REPO_DIR not set}"
BRANCH="${REPO_BRANCH:-main}"
DEPLOY_COMPOSE_FILE="${DEPLOY_COMPOSE_FILE:-docker-compose.deploy.yml}"

echo "=== Deploy started at $(date -u +%FT%TZ) ==="

if [ ! -d "$REPO" ]; then
  echo "ERROR: $REPO does not exist inside the webhook container." >&2
  exit 1
fi

git config --global --add safe.directory "$REPO"

if ! git -C "$REPO" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "ERROR: $REPO is not a git repository." >&2
  exit 1
fi

cd "$REPO"

if [ ! -f "$DEPLOY_COMPOSE_FILE" ]; then
  echo "ERROR: $REPO does not contain $DEPLOY_COMPOSE_FILE." >&2
  exit 1
fi

if command -v getent >/dev/null 2>&1; then
  if ! getent hosts github.com >/dev/null; then
    echo "ERROR: cannot resolve github.com from inside the webhook container." >&2
    exit 1
  fi
fi

git fetch --all
git checkout "$BRANCH"
git pull origin "$BRANCH"

if [ -n "${GHCR_USERNAME:-}" ] && [ -n "${GHCR_TOKEN:-}" ]; then
  echo "--- docker login ghcr.io ---"
  printf '%s' "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
fi

echo "--- docker compose -f $DEPLOY_COMPOSE_FILE pull hci-web ---"
docker compose --env-file .env -f "$DEPLOY_COMPOSE_FILE" pull hci-web

echo "--- docker compose -f $DEPLOY_COMPOSE_FILE up -d --remove-orphans hci-web hci-proxy ---"
docker compose --env-file .env -f "$DEPLOY_COMPOSE_FILE" up -d --remove-orphans hci-web hci-proxy

echo "=== Deploy finished at $(date -u +%FT%TZ) ==="
