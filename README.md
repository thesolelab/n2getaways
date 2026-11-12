# N2Getaways — Astro editorial redesign

Initial milestone. No WordPress migration, DNS changes, production deployment, or automated AI publishing has occurred.

## Preview locally

Use Node.js 24 (CI uses Node 24):

```sh
npm ci
npm run dev
```

Open http://localhost:4321. For a production build:

```sh
npm run validate
npm run preview
```

Open http://localhost:4321 (or the URL Astro prints). In restricted environments set `ASTRO_TELEMETRY_DISABLED=1` and use a writable npm cache. See VALIDATION.md.

## Included

- Responsive editorial homepage, accessible navigation with native mobile disclosure, skip link, visible keyboard focus, and reduced-motion support.
- Destination index and generated Italy, Japan, Portugal collections.
- Markdown article collection, reusable article view, table of contents and guide index.
- About scaffold and custom itinerary form preview. Form does not send or store anything; no backend or delivery provider is connected.
- Canonical URLs, social metadata, WebSite/Article JSON-LD, generated XML sitemap, local optimized responsive images.
- TypeScript, static Cloudflare Pages configuration, GitHub validation workflow, and deliberately disabled scheduling example.

## Content workflow

Add Markdown in `src/content/articles/`. Schema lives in `src/content.config.ts`. Explicit `permalink` determines the article route, allowing verified existing WordPress URLs to be retained later. `draft: true` and future `publishDate` values exclude articles from generated routes, discovery, and sitemaps. Static pages only update on a rebuild. All current entries are placeholders; the schema intentionally requires `placeholder: true` until a reviewed production content model is introduced.

Templates can render guides, itineraries, stories, and reviews. No review endorsements or first-hand experiences are fabricated. Replace sample copy only with verified material. Date fields on examples are build gating values, not claimed publication dates.

## Cloudflare Pages (configured, not deployed)

Connect this GitHub repository to a **new preview-only Pages project** after reviewing the initial milestone. Framework: Astro. Build command: `npm run build`. Output directory: `dist`. Node version: `24`. No adapter is needed for this static site. Set `SITE_URL` to that project's actual `https://<project>.pages.dev` URL for preview canonicals and sitemap URLs. The default production base in Astro config is `https://n2getaways.com`; it does not connect or modify that domain.

`wrangler.toml` records the output directory. Do not attach the production domain or change DNS during this milestone. The generated sitemap is intentionally non-indexable during development.

Before a separately authorized production launch, remove the noindex meta in Base.astro, X-Robots-Tag in public/_headers and Disallow in public/robots.txt; add the production Sitemap directive. Verify all content, imagery context, contact delivery, privacy policy, affiliate disclosures (if applicable), accessibility, performance and the URL migration map first.

## Future publishing (not enabled)

`.github/workflows/future-publishing.yml.disabled` is documentation, not an executable workflow. A future reviewed weekly rebuild could expose date-gated human-approved content. Cloudflare would need an explicit deploy hook or deployment workflow for rebuilds without source changes. No AI generation, deployment credentials, or publishing schedule is active.

## Eventual migration

Do not guess WordPress slugs. Obtain a full URL/content export and inventory, retain matching paths through `permalink`, and create reviewed 301 redirects in Cloudflare's `_redirects` only for changed paths. WordPress currently presents a bot challenge to this environment; no article inventory or migration has been performed.

## Images and fonts

Development photographs downloaded from Unsplash under its standard license (https://unsplash.com/license). See ASSETS.md for exact sources. Astro generates responsive WebP variants during build. Fonts load from Google Fonts with system fallbacks and display=swap; self-hosting is a possible pre-launch improvement. No affiliate links, testimonials, or partnerships are represented.
