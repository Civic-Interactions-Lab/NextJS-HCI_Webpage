#!/usr/bin/env bash
set -euo pipefail

REPO="${APP_REPO_DIR:?APP_REPO_DIR not set}"
BRANCH="${REPO_BRANCH:-main}"
DEPLOY_COMPOSE_FILE="${DEPLOY_COMPOSE_FILE:-docker-compose.deploy.yml}"
DEPLOY_COMMIT_SHA="${DEPLOY_COMMIT_SHA:-unknown}"
DEPLOY_WORKFLOW_RUN_ID="${DEPLOY_WORKFLOW_RUN_ID:-unknown}"

compose() {
  docker compose --env-file .env -f "$DEPLOY_COMPOSE_FILE" "$@"
}

container_id() {
  compose ps -q "$1" 2>/dev/null || true
}

container_image_id() {
  local cid="$1"
  if [ -n "$cid" ]; then
    docker inspect --format '{{.Image}}' "$cid" 2>/dev/null || true
  fi
}

image_digest() {
  local image_ref="$1"
  if [ -n "$image_ref" ]; then
    docker image inspect "$image_ref" --format '{{index .RepoDigests 0}}' 2>/dev/null || true
  fi
}

echo "=== Deploy started at $(date -u +%FT%TZ) ==="
echo "Requested commit SHA: $DEPLOY_COMMIT_SHA"
echo "Requested workflow run ID: $DEPLOY_WORKFLOW_RUN_ID"

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

IMAGE_REF="$(grep '^HCI_WEB_IMAGE=' .env 2>/dev/null | tail -n 1 | cut -d= -f2- || true)"
WEB_BEFORE_CONTAINER_ID="$(container_id hci-web)"
WEB_BEFORE_IMAGE_ID="$(container_image_id "$WEB_BEFORE_CONTAINER_ID")"
IMAGE_DIGEST_BEFORE="$(image_digest "$IMAGE_REF")"

echo "Image reference: ${IMAGE_REF:-unknown}"
echo "hci-web container before deploy: ${WEB_BEFORE_CONTAINER_ID:-none}"
echo "hci-web image id before deploy: ${WEB_BEFORE_IMAGE_ID:-unknown}"
echo "Image digest before pull: ${IMAGE_DIGEST_BEFORE:-unknown}"

if [ -n "${GHCR_USERNAME:-}" ] && [ -n "${GHCR_TOKEN:-}" ]; then
  echo "--- docker login ghcr.io ---"
  printf '%s' "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USERNAME" --password-stdin
fi

echo "--- docker compose -f $DEPLOY_COMPOSE_FILE pull hci-web ---"
compose pull hci-web

IMAGE_DIGEST_AFTER_PULL="$(image_digest "$IMAGE_REF")"
echo "Image digest after pull: ${IMAGE_DIGEST_AFTER_PULL:-unknown}"

echo "--- docker compose -f $DEPLOY_COMPOSE_FILE up -d --force-recreate --no-deps hci-web ---"
compose up -d --force-recreate --no-deps hci-web

WEB_AFTER_CONTAINER_ID="$(container_id hci-web)"
WEB_AFTER_IMAGE_ID="$(container_image_id "$WEB_AFTER_CONTAINER_ID")"

echo "hci-web container after deploy: ${WEB_AFTER_CONTAINER_ID:-none}"
echo "hci-web image id after deploy: ${WEB_AFTER_IMAGE_ID:-unknown}"

echo "=== Deploy finished at $(date -u +%FT%TZ) ==="
