# Adaptance website

Public website and privacy policy for Adaptance, a focused consulting team for AI adoption, digital transformation and organizational change.

## Pages

- `/` presents the Adaptance positioning, sprint, method and team model.
- `/privacy` covers the public website and the private social media workflow.

## Local development

Requirements: Node.js 22 or newer and npm.

```bash
npm ci
npm run dev
```

The production build can be checked with:

```bash
npm test
```

## Hosting

The site contains no forms, accounts or server-side business logic. It is therefore exported as static HTML, CSS and assets for GitHub Pages. A custom GitHub Actions workflow builds the Vinext source and writes the deployment bundle to `dist/pages`.

```bash
BASE_PATH=/adaptance npm run export:pages
```

`BASE_PATH` supports the temporary GitHub Pages project URL. The final public domain is `adaptance.org`; publish with an empty base path on its production host.

The current public production version is also deployed through OpenAI Sites. The same source can later be served from Hetzner without changing the page content or asset structure.

## Brand assets

- `public/adaptance-logo.svg`: A within D combination mark on light backgrounds
- `public/adaptance-logo-light.svg`: reversed combination mark on dark backgrounds
- `public/adaptance-mark.svg`: compact A within D mark for app icons
- `public/adaptance-mark-512.png`: 512 × 512 app icon
- `public/favicon.svg`: browser favicon

Photography is stored locally. Sources and visible attribution are documented in [docs/asset-credits.md](docs/asset-credits.md).
