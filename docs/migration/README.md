# WordPress content migration — November 12, 2026

## Current state

All 14 published posts and 11 original page paths from the supplied WXR export are represented in the private redesign. Original WordPress and DNS are unchanged. All preview pages retain noindex safeguards. The build includes 37 routes: the original 25, two added archive destination collections, three sample destinations, three sample articles, a legacy `/guides/` index, a samples page, and two migration-review pages.

Source files are in `src/content/articles/wp-*.md` and `src/content/pages/*.md`. `inventory.json` records original public paths; `manifest.json` records export-derived prose checksums, original image references, review notes and conversion decisions. The raw XML, comments, authors, legacy form tokens and private metadata are excluded from Git.

## What changed during conversion

- All article prose and heading wording are retained; body h1 headings become h2 so each rendered document has one h1. Source punctuation is preserved by disabling automatic smart punctuation in the Markdown processor.
- Standard prose, lists, links, emphasis and tables are sanitized with a static HTML allowlist. WordPress/Elementor classes, style attributes, block comments and executable form/plugin markup are removed. The supplied posts contain no reusable-block references or shortcodes requiring expansion; unsupported references fail the importer rather than being silently omitted.
- Links to any of the 25 migrated WordPress paths are rewritten to local preview paths. Link wording and external destinations are retained. No unresolved links to the original site remain in the imported content.
- About, Privacy, Contact and the four existing destination guides include the original page prose. The legacy contact form is replaced by the already configured email-app draft flow; it is not copied as an active WordPress endpoint.
- Homepage, destination index and travel-guide index use the redesigned discovery layouts. Their complete original page text is retained under “Review original WordPress page copy” disclosures. Old “Load More” buttons are replaced by a complete static article list; the legacy listings remain text-only inside those review disclosures.
- The exported `/travel-stories/` page is empty. That path now presents an explicitly labeled collection of imported restaurant/resort articles; no new personal experiences or reviews were invented.
- `/destinations/asheville/` and `/destinations/santorini/` are new article collections, with no fabricated destination narrative. The four original destination-page paths remain unchanged.
- Original development examples remain available at `/samples/` and their existing paths, separately from the primary archive discovery.

## Media status

The owner supplied the two pilot photos and all 18 requested files in Batches 1–4. Their original bytes are retained in source control, with SHA-256 receipts in `received-media.json`. Article covers/cards and inline images are restored using Astro image processing; `src/media.ts` loads the received assets for cover selection. Image descriptions were written from visual inspection without identifying people or presenting illustrative airport graphics as documentary evidence.

`media.json` maps covers to original article paths. The importer replaces image placeholders with local Markdown images and reuses received originals for unambiguous WordPress size variants. All 25 rendered-source text checks still pass. `missing-media.json` now lists six older page-layout files. The San Francisco accommodation guide uses an existing owner-supplied Golden Gate Bridge photograph as its cover. The 18 requested batch files are no longer missing.

`media-batches.json` preserves the original four batch numbers and filenames. The private checklist marks each received file and retains completed batches, so pre-created ZIPs never become mislabeled when files arrive. The media validator checks the byte receipts and verifies that each image appears with its descriptive alt text at every original usage path listed in those batches.

The accommodation guide's two unavailable `images.openai.com` references are deliberately retired in `retired-media.json`; their empty inline slots are removed. A city-context cover is reused from the supplied San Francisco imagery without presenting it as a hotel or Union Square photograph. Source image URLs remain in the export-derived manifest for provenance. All 14 original articles now have covers and no pending-image blocks. Lower-priority page-layout media may be unnecessary after the new design is approved.

## Editorial review findings

- The San Francisco 48-hour article includes Day 3 and a malformed sentence. Source wording is preserved for owner review.
- The two TSA posts discuss “right now” conditions and shutdown-related staffing. They show prominent review notes; verify dates and current official guidance before production.
- The imported Privacy Policy claims Google Analytics, a cookie banner and affiliate participation including Amazon Associates. These are statements in the supplied source, not verified integrations. The preview does not enable them. A prominent notice explains that the policy requires owner review before launch.
- Prices, schedules, attraction availability, road access, business details and travel recommendations have not been re-researched.
- Repeated headings/paragraphs and “coming soon” promises in the original page copy are retained, not silently edited.

## Reproduce and validate

Requires Node.js 24 and Python 3 (standard library only):

```sh
python3 scripts/import-wordpress.py /path/to/WordPress-export.xml
npm run validate
```

The importer fails on a prose mismatch or an unsupported reusable-block/shortcode/embed reference. It imports published posts/pages only and preserves the cover and received-image mappings on reimport. After importing, do not automatically reformat the generated Markdown: whitespace affects HTML-versus-code rendering. The importer normalizes legacy indentation deliberately.

Validation checks all original route paths, rendered prose against export-derived checksums, one h1, unique element IDs, working same-page anchors, local links/assets, metadata, noindex safeguards, original pilot table-of-contents links, removal of the executable WordPress form, and the inquiry recipient. These are content/build checks; browser interaction, Lighthouse and real email deliverability are not claimed.

## Inquiry and release boundaries

Recipient: `hello@n2getaways.com`. The owner-supplied Formspree endpoint is now configured for direct website submissions, with a honeypot and accessible feedback states. A direct email link remains available. No mailbox password or DNS change was required. Provider routing and inbox delivery require an owner-submitted test; no test email was sent by the agent.

No Cloudflare Pages project, production-domain deployment, DNS change, WordPress modification, or automatic AI publishing is included. All 25 original paths are retained, so no redirects are required for this set. `/guides/` is retained as a development alias; decide whether to redirect it to `/travel-guides/` at launch. Next: owner review and small photo batches, then direct inquiry delivery and a Cloudflare Pages preview.
