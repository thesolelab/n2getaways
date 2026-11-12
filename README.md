# N2Getaways — Astro editorial redesign

Astro redesign with all 14 published articles and 11 original page paths migrated from the WordPress export. A Cloudflare Pages review site and the separate private Sites preview are deployed; no WordPress site changes, DNS changes, production-domain deployment, or automated AI publishing has occurred.

## Preview locally

Use Node.js 24 and Python 3 (standard library; used by the migration validation checks):

```sh
npm ci
npm run dev
```

Open http://localhost:4321. For a local static preview build:

```sh
npm run validate
npm run preview
```

Open http://localhost:4321 (or the URL Astro prints). In restricted environments set `ASTRO_TELEMETRY_DISABLED=1` and use a writable npm cache. See VALIDATION.md.

## Included

- Responsive editorial homepage, accessible navigation with native mobile disclosure, skip link, visible keyboard focus, and reduced-motion support.
- Six archive destination collections, including the four original destination-page paths; development examples are separated at `/samples/`.
- Markdown article collection, reusable article view, table of contents and guide index.
- Original About, Privacy and Contact copy, plus a custom itinerary inquiry form. Formspree direct submission is configured for the owner-supplied endpoint with validation, a spam honeypot and feedback states. The owner confirmed receipt of a test submission; a direct email link remains available. See `docs/INQUIRIES.md`.
- Canonical URLs, social metadata, WebSite/Article JSON-LD, generated XML sitemap, local optimized responsive images.
- TypeScript, static Cloudflare Pages configuration, GitHub validation workflow, and deliberately disabled scheduling example.

## Content workflow

Add Markdown in `src/content/articles/`. Schema lives in `src/content.config.ts`. Explicit `permalink` determines the article route, allowing verified existing WordPress URLs to be retained later. `draft: true` and future `publishDate` values exclude articles from generated routes, discovery, and sitemaps. Static pages only update on a rebuild. Sample entries use `placeholder: true`. The 14 imported WordPress entries use `placeholder: false`, `migrationReview: true`, and a source URL. Their original text is preserved. The two pilot files and all 18 files from Batches 1–4 are restored; remaining old page-layout references are tracked separately; unavailable external images in the accommodation guide have been retired. Pages use a separate Markdown collection in `src/content/pages/`. See `docs/migration/README.md`.

Templates can render guides, itineraries, stories, and reviews. No review endorsements or first-hand experiences are fabricated. Replace sample copy only with verified material. Date fields on examples are build gating values, not claimed publication dates.

## Cloudflare Pages review site

GitHub-linked review site: https://n2getaways-preview.pages.dev. This is separate from the existing WordPress production domain. Framework: Astro. Build command: `npm run build`. Output directory: `dist`. Node version: `24`. No adapter is needed for this static site. Set `SITE_URL` to that project's actual `https://<project>.pages.dev` URL for preview canonicals and sitemap URLs. Astro uses an explicit `SITE_URL` first, then Cloudflare's `CF_PAGES_URL`, then `https://n2getaways.com` for other builds. The automatic Cloudflare fallback keeps review metadata on the deployment origin when `SITE_URL` is absent. For the stable review URL, set `SITE_URL=https://n2getaways-preview.pages.dev`; before production launch set the actual production origin explicitly. None of these settings connects or modifies the production domain.

`wrangler.toml` records the output directory. Do not attach the production domain or change DNS during this milestone. The generated sitemap is intentionally non-indexable during development.

Build mode defaults to `preview`, keeping all routes blocked from indexing. Production preparation is documented in [the cutover plan](docs/launch/CUTOVER.md), with a 25-route URL map and read-only DNS snapshot. Only after separately authorized cutover, set `SITE_MODE=production` and `SITE_URL=https://n2getaways.com` for the main production build. Branch previews must retain preview mode. Generated robots, headers, metadata and sitemap follow this mode automatically; no manual SEO file removal is needed. Production hides review notices and excludes internal review routes from the sitemap. DNS and production mode remain unchanged.

## Future publishing (not enabled)

`.github/workflows/future-publishing.yml.disabled` is documentation, not an executable workflow. A future reviewed weekly rebuild could expose date-gated human-approved content. Cloudflare would need an explicit deploy hook or deployment workflow for rebuilds without source changes. No AI generation, deployment credentials, or publishing schedule is active.

## Migration and eventual launch

Do not guess WordPress slugs. Obtain a full URL/content export and inventory, retain matching paths through `permalink`, and create reviewed 301 redirects in Cloudflare's `_redirects` only for changed paths. The supplied WordPress export is imported at all 25 original public paths, with source-text checksums and local internal links. The owner supplied the two pilot photos in a ZIP after direct WordPress image downloads were blocked; see the migration report.

## Images and fonts

Development photographs downloaded from Unsplash under its standard license (https://unsplash.com/license). See ASSETS.md for exact sources. Astro generates responsive WebP variants during build. Fonts load from Google Fonts with system fallbacks and display=swap; self-hosting is a possible pre-launch improvement. No new affiliate links, testimonials, or partnerships were invented. The current privacy page describes implemented services; the original policy is retained only in a preview disclosure for comparison.

## Hosted design review

A separate owner-private Sites preview is configured in `.openai/hosting.json`. This is a review copy, not the final Cloudflare Pages deployment. It does not change the WordPress site or domain DNS. Preview builds use the Sites origin via `SITE_URL`; Cloudflare Pages setup remains available as documented above.

Cloudflare build variables are maintained in `wrangler.toml`: main production builds target the live origin; branch previews remain noindex and derive their origin from `CF_PAGES_URL`. This does not bind a custom domain. Local builds still default to preview unless explicitly configured.

## Free editorial drafts

Say “Draft the next approved N2Getaways topic” in the connected chat. The editable queue, research record, draft PR procedure and manual publication gate are documented in [editorial/README.md](editorial/README.md). No AI API or scheduled publishing is enabled.
