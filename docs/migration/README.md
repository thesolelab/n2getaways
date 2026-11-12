# WordPress pilot migration — November 12, 2026

## Export inventory

User-supplied WXR export: 14 published posts, 11 published pages, 71 attachment records. Other records include reusable blocks, menu items and theme/plugin settings; these are not articles. The published Travel Stories page has an empty body. `inventory.json` records the public content titles, exact source URLs, paths and pilot status; author details, comment records, raw export and private post metadata are excluded from Git.

## Pilot imported

- `/48-hours-in-san-francisco-the-perfect-quick-city-guide/`
- `/48-hours-in-asheville/`

Original article prose, heading wording, inline links and UTC publication dates are preserved. WordPress block comments, classes and style attributes are stripped, with an allowlist for static HTML. Headings become Markdown for Astro's table of contents. No source image is replaced by unrelated imagery. Both pilot image downloads return HTTP 202 `text/html` bot challenges, not image bytes. Their source URLs remain in `pilot.json` for later media transfer. No redirect is needed for these unchanged article paths.

Reproduce with Python 3 (standard library only), from the project root:

```sh
python scripts/import-wordpress.py /path/to/WordPress-export.xml
npm run validate
```

The importer is intentionally restricted to these two reviewed paths. It confirms normalized prose fidelity before writing each article. Do not treat it as a general WordPress converter: other posts may contain galleries, reusable blocks, shortcodes or embeds requiring separate conversion. No source document instructions are executed.

## Review findings

- The San Francisco article includes Day 3 in its quick plan despite the 48-hour title and includes a malformed sentence under “Is 48 Hours in San Francisco Enough?”. Retained for owner review, not silently rewritten.
- Asheville recommends specific drive times, businesses and seasonal activities. Check current road access, business details, availability and timings before production.
- The original article links to other WordPress articles stay absolute until those articles are migrated. This intentionally keeps them working against the current site.
- Source destination landing pages are inventoried but not yet migrated. Imported article navigation returns to `/migration-review/` instead of inventing destination page copy.
- Existing sample articles remain clearly labeled. Imported articles show “Migration review”, not “Sample”.
- Original image captions/alt text in these two posts are empty. Meaningful descriptions need owner review after original files are available.

## Inquiry recipient

Owner specified `hello@n2getaways.com`. The contact form URL-encodes a `mailto:` draft containing the visitor's entered name, reply email, destination and trip details. The visitor must send it from their email app. A direct email link is also provided. No email was sent during development; inbox deliverability is unverified. No server endpoint, email provider, storage, spam protection, tracking or automated sending is connected. A server-delivered form remains a later integration.

## Validation and next steps

Astro check: zero errors, warnings or hints. Static build: 14 pages. Local route/asset and SEO/noindex checks pass. Importer prose fidelity: both articles pass. Browser interaction and real email delivery have not been verified.

For the next batch, obtain `wp-content/uploads` (ZIP or equivalent original media backup), review the pilot, then map the remaining 12 posts and 11 pages. Keep source URL paths whenever feasible; review changed paths before generating redirects. No WordPress changes, DNS edits, production-domain launch or automatic AI publishing are included.
