This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Run the development server locally:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Docker Deployment

This repo includes two compose stacks:

1. the main site stack in `docker-compose.yml`
2. the webhook stack in `webhook/docker-compose.yml`

### Server setup

1. Create `.env` on the server from `.env.example`.
2. Set `HOST_REPO_DIR` to the absolute path of this repo on `cis-linux1.temple.edu`.
3. Set `HOST_GIT_COMMON_DIR` to the checkout's git metadata directory.
4. Set `WEBHOOK_SECRET` to a strong random value.
5. Build and start the main site stack:

```bash
docker compose up -d --build
```

6. Build and start the webhook stack:

```bash
docker compose --env-file .env -f webhook/docker-compose.yml up -d --build
```

7. Confirm both services are reachable through the local bindings:

```bash
curl http://127.0.0.1
curl http://127.0.0.1:9001/health
curl http://127.0.0.1/webhook-health
```

By default, the site stack binds to `127.0.0.1:80` and the webhook stack binds to `127.0.0.1:9001`. You can override those with `APP_HOST_BIND` / `APP_HOST_PORT` and `WEBHOOK_HOST_BIND` / `WEBHOOK_HOST_PORT`.

TLS stays on the host machine, so the containers serve plain HTTP and Apache can continue terminating HTTPS for `hci.temple.edu`.

### GitHub webhook setup

Configure a GitHub webhook for this repository with:

- Payload URL: `https://hci.temple.edu/github-webhook`
- Content type: `application/json`
- Secret: the same value as `WEBHOOK_SECRET`
- Event: `Just the push event`

When a push lands on the configured branch, the webhook container pulls the latest code in `HOST_REPO_DIR` and rebuilds only the site stack.

If `HOST_REPO_DIR` is a git worktree, `HOST_GIT_COMMON_DIR` must point to the parent repository's `.git` directory. For a normal clone, `HOST_GIT_COMMON_DIR` is usually just `HOST_REPO_DIR/.git`. This mount must be writable because `git fetch` updates files like `FETCH_HEAD` there.

For the smoothest Vercel-like setup, point `HOST_REPO_DIR` at a dedicated normal clone used only for deployment, not your active development worktree.

The webhook is intentionally deployed as a separate compose project so a webhook-triggered site rebuild does not recycle the webhook service that received the request.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
