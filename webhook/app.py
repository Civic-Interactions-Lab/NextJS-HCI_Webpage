import hashlib
import hmac
import json
import logging
import os
import subprocess
import threading
from datetime import datetime, timezone
from urllib.parse import parse_qs

from flask import Flask, jsonify, request

WEBHOOK_SECRET = os.environ.get("WEBHOOK_SECRET", "")
REPO_FULL_NAME = os.environ.get("REPO_FULL_NAME", "owner/repo")
REPO_BRANCH = os.environ.get("REPO_BRANCH", "main")
APP_REPO_DIR = os.environ.get("APP_REPO_DIR", "")
DEPLOY_SCRIPT = os.environ.get("DEPLOY_SCRIPT", "/app/deploy.sh")

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger("github-webhook")

deploy_lock = threading.Lock()
deploy_state = {
    "status": "idle",
    "last_result": None,
    "last_timestamp": None,
    "last_commit": None,
    "last_error": None,
}

app = Flask(__name__)


def verify_signature(payload_body: bytes, signature_header: str | None) -> bool:
    if not WEBHOOK_SECRET or not signature_header:
        return False
    if not signature_header.startswith("sha256="):
        return False
    expected = "sha256=" + hmac.new(
        WEBHOOK_SECRET.encode(), payload_body, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature_header)


def parse_github_payload(payload_body: bytes) -> dict:
    content_type = request.headers.get("Content-Type", "")
    if "application/x-www-form-urlencoded" in content_type:
        form = parse_qs(payload_body.decode("utf-8"), keep_blank_values=True)
        payload_values = form.get("payload")
        if not payload_values:
            raise ValueError("missing form payload")
        return json.loads(payload_values[0])
    return json.loads(payload_body)


def run_deploy(commit_sha: str) -> None:
    try:
        deploy_state["status"] = "deploying"
        deploy_state["last_commit"] = commit_sha
        deploy_state["last_error"] = None
        log.info("Starting deployment for commit %s", commit_sha[:8])

        result = subprocess.run(
            ["/bin/bash", DEPLOY_SCRIPT],
            env={
                **os.environ,
                "APP_REPO_DIR": APP_REPO_DIR,
                "REPO_BRANCH": REPO_BRANCH,
            },
            capture_output=True,
            text=True,
            timeout=900,
        )

        if result.stdout:
            log.info("deploy stdout:\n%s", result.stdout)
        if result.stderr:
            log.warning("deploy stderr:\n%s", result.stderr)

        if result.returncode == 0:
            deploy_state["last_result"] = "success"
        else:
            deploy_state["last_result"] = "failure"
            deploy_state["last_error"] = f"deploy script exited {result.returncode}"
    except subprocess.TimeoutExpired:
        deploy_state["last_result"] = "failure"
        deploy_state["last_error"] = "deployment timed out"
        log.exception("Deployment timed out")
    except Exception:
        deploy_state["last_result"] = "failure"
        deploy_state["last_error"] = "deployment error"
        log.exception("Deployment failed")
    finally:
        deploy_state["status"] = "idle"
        deploy_state["last_timestamp"] = datetime.now(timezone.utc).isoformat()
        deploy_lock.release()


@app.get("/health")
def health():
    configured = bool(WEBHOOK_SECRET and APP_REPO_DIR)
    return jsonify({"ok": configured, "configured": configured, **deploy_state}), 200


@app.post("/github-webhook")
def github_webhook():
    payload = request.get_data()
    signature = request.headers.get("X-Hub-Signature-256")

    if not WEBHOOK_SECRET or not APP_REPO_DIR:
        log.error("Webhook service is missing required configuration")
        return jsonify({"error": "server misconfigured"}), 500

    if not verify_signature(payload, signature):
        log.warning("Invalid or missing signature")
        return jsonify({"error": "invalid signature"}), 401

    try:
        data = parse_github_payload(payload)
    except (json.JSONDecodeError, UnicodeDecodeError, TypeError, ValueError):
        return jsonify({"error": "malformed payload"}), 400

    event = request.headers.get("X-GitHub-Event", "")
    if event == "ping":
        return jsonify({"message": "pong"}), 200
    if event != "push":
        return jsonify({"message": "ignored", "event": event}), 200

    repo = data.get("repository", {}).get("full_name", "")
    ref = data.get("ref", "")
    if repo != REPO_FULL_NAME:
        return jsonify({"message": "ignored", "reason": "repo mismatch"}), 200
    if ref != f"refs/heads/{REPO_BRANCH}":
        return jsonify({"message": "ignored", "reason": "branch mismatch"}), 200

    acquired = deploy_lock.acquire(blocking=False)
    if not acquired:
        return jsonify({"error": "deployment already in progress"}), 409

    commit_sha = data.get("after", "unknown")
    thread = threading.Thread(target=run_deploy, args=(commit_sha,), daemon=True)
    thread.start()
    return jsonify({"message": "deployment started", "commit": commit_sha}), 202
