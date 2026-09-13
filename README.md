# Adaptance website

Public website and privacy policy for Adaptance, a focused consulting team for AI adoption, digital transformation and organizational change.

## Pages

- `/` presents the Adaptance positioning, sprint, method and team model.
- `/privacy/` covers the public website and the private social media workflow.

## Local development

Requirements: Node.js 22.13.0 or newer and npm.

```bash
npm ci
npm run dev
```

Typecheck, build the static site, and run the tests with:

```bash
npm run verify
```

Individual commands:

```bash
npm run check
npm run build
```

## Hosting

The site contains no forms, accounts or server-side business logic. Astro builds it as static HTML, CSS and assets in `dist/`. Canonical URLs use `https://adaptance.org`.

## Uberspace deployment

Every push to `main` runs `npm run verify`, then uploads only `dist/` with rsync to the Adaptance document root. The same workflow can be triggered manually with `workflow_dispatch`.

Required GitHub repository secrets:

- `UBERSPACE_HOST`: the Uberspace hostname, optionally `user@host` or with an `ssh://` prefix, but without a remote path
- `UBERSPACE_USER`: the Uberspace account name only
- `DEPLOY_KEY_PRIVATE`: the complete private deploy key, including line breaks

Required GitHub repository variable:

- Name: `UBERSPACE_DEPLOY_PATH`
- Value: `Applications/adaptance.org/`

Create it under **Settings → Secrets and variables → Actions → Variables**. The workflow fails with a clear error when this variable is missing. It does not fall back to `html/`.

The Uberspace domain document root for `adaptance.org` (and the chosen `www` behaviour) must point to that same `Applications/adaptance.org/` directory. The matching public key must be present in `~/.ssh/authorized_keys`.

Optional repository variable:

- `ADAPTANCE_PUBLIC_URL=https://adaptance.org/` — when set, the workflow curls this URL after upload

Run the same checks locally before pushing:

```bash
npm run verify
```

## Brand assets

- `public/adaptance-logo.svg`: A within D combination mark on light backgrounds
- `public/adaptance-logo-light.svg`: reversed combination mark on dark backgrounds
- `public/adaptance-mark.svg`: compact A within D mark for app icons
- `public/adaptance-mark-512.png`: 512 × 512 app icon
- `public/favicon.svg`: browser favicon

Photography is stored locally. Sources and visible attribution are documented in [docs/asset-credits.md](docs/asset-credits.md).
