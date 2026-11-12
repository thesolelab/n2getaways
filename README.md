# N2Getaways — Astro editorial redesign

Astro redesign with all 14 published articles and 11 original page paths migrated from the WordPress export. Only the separate private design preview is deployed; no WordPress site changes, DNS changes, production-domain deployment, or automated AI publishing has occurred.

## Preview locally

Use Node.js 24 and Python 3 (standard library; used by the migration validation checks):

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
- Six archive destination collections, including the four original destination-page paths; development examples are separated at `/samples/`.
- Markdown article collection, reusable article view, table of contents and guide index.
- Original About, Privacy and Contact copy, plus a custom itinerary inquiry form. Form opens a draft to `hello@n2getaways.com` in the visitor's email app; no backend or delivery provider is connected.
- Canonical URLs, social metadata, WebSite/Article JSON-LD, generated XML sitemap, local optimized responsive images.
- TypeScript, static Cloudflare Pages configuration, GitHub validation workflow, and deliberately disabled scheduling example.

## Content workflow

Add Markdown in `src/content/articles/`. Schema lives in `src/content.config.ts`. Explicit `permalink` determines the article route, allowing verified existing WordPress URLs to be retained later. `draft: true` and future `publishDate` values exclude articles from generated routes, discovery, and sitemaps. Static pages only update on a rebuild. Sample entries use `placeholder: true`. The 14 imported WordPress entries use `placeholder: false`, `migrationReview: true`, and a source URL. Their original text is preserved. The two pilot files and all 18 files from Batches 1–4 are restored; remaining old page-layout and externally hosted references are tracked separately. Pages use a separate Markdown collection in `src/content/pages/`. See `docs/migration/README.md`.

Templates can render guides, itineraries, stories, and reviews. No review endorsements or first-hand experiences are fabricated. Replace sample copy only with verified material. Date fields on examples are build gating values, not claimed publication dates.

## Cloudflare Pages (configured, not deployed)

Connect this GitHub repository to a **new preview-only Pages project** after reviewing the initial milestone. Framework: Astro. Build command: `npm run build`. Output directory: `dist`. Node version: `24`. No adapter is needed for this static site. Set `SITE_URL` to that project's actual `https://<project>.pages.dev` URL for preview canonicals and sitemap URLs. The default production base in Astro config is `https://n2getaways.com`; it does not connect or modify that domain.

`wrangler.toml` records the output directory. Do not attach the production domain or change DNS during this milestone. The generated sitemap is intentionally non-indexable during development.

Before a separately authorized production launch, remove the noindex meta in Base.astro, X-Robots-Tag in public/_headers and Disallow in public/robots.txt; add the production Sitemap directive. Verify all content, imagery context, contact delivery, privacy policy, affiliate disclosures (if applicable), accessibility, performance and the URL migration map first.

## Future publishing (not enabled)

`.github/workflows/future-publishing.yml.disabled` is documentation, not an executable workflow. A future reviewed weekly rebuild could expose date-gated human-approved content. Cloudflare would need an explicit deploy hook or deployment workflow for rebuilds without source changes. No AI generation, deployment credentials, or publishing schedule is active.

## Migration and eventual launch

Do not guess WordPress slugs. Obtain a full URL/content export and inventory, retain matching paths through `permalink`, and create reviewed 301 redirects in Cloudflare's `_redirects` only for changed paths. The supplied WordPress export is imported at all 25 original public paths, with source-text checksums and local internal links. The owner supplied the two pilot photos in a ZIP after direct WordPress image downloads were blocked; see the migration report.

## Images and fonts

Development photographs downloaded from Unsplash under its standard license (https://unsplash.com/license). See ASSETS.md for exact sources. Astro generates responsive WebP variants during build. Fonts load from Google Fonts with system fallbacks and display=swap; self-hosting is a possible pre-launch improvement. No new affiliate links, testimonials, or partnerships were invented. The imported privacy policy contains unverified source claims about affiliates and analytics, prominently flagged for review.

## Hosted design review

A separate owner-private Sites preview is configured in `.openai/hosting.json`. This is a review copy, not the final Cloudflare Pages deployment. It does not change the WordPress site or domain DNS. Preview builds use the Sites origin via `SITE_URL`; Cloudflare Pages setup remains available as documented above.
