# Initial milestone validation

Validated November 12, 2026 with Node 24.22.1 and npm 11.9.0.

- `ASTRO_TELEMETRY_DISABLED=1 npm run validate`: Astro TypeScript/content checks, static build, and built-output validation.
- 11 generated pages: homepage, destination index, 3 destinations, journal index, 3 sample articles, About, inquiry preview.
- Build generates responsive WebP images and XML sitemap.
- Output validation checks all local href/src targets, representative routes, metadata, JSON-LD presence, and noindex safeguards.
- `npm audit --audit-level=high`: zero reported vulnerabilities after upgrading Astro to 7.4.11.
- No browser QA, mobile interaction test, Lighthouse score, or measured accessibility conformance is claimed. The managed environment has no available `cua_repl.js` browser interface; its Sites preview instructions prohibit substituting another browser path. Preview locally to review layout, keyboard navigation, mobile menu, and demo form behavior.
- WordPress returned a bot challenge; no source content or URL inventory was imported.

The first install needed a workspace-local npm cache; Astro telemetry was disabled because the sandbox home config directory is unavailable. Successful validation uses:

```sh
npm ci --cache /workspace/n2getaways/work/npm-cache
ASTRO_TELEMETRY_DISABLED=1 npm run validate
```

Normal local machines can use the README commands. CI validates on Node 24. Cloudflare deployment remains unperformed. The disabled future publishing file cannot execute.

## GitHub handoff

The initial milestone is committed and pushed to `main` in https://github.com/thesolelab/n2getaways. The initial HTTP 403 was resolved after the owner updated the GitHub app repository access. No deployment, WordPress migration, or DNS changes were performed.

## WordPress pilot update

The supplied export was inventoried (14 posts, 11 pages, 71 attachment records), and two original articles were imported at their existing URL paths. Prose-fidelity checks pass for both. Current static build: 14 pages. Migration checks cover original paths, review labels, single h1, table-of-contents targets and the inquiry recipient. Contact now composes a `mailto:` draft to the owner-specified address; actual website email sending remains unconnected. Source media is blocked by HTTP 202 bot challenges. Details and follow-up review items: `docs/migration/README.md`.

## Pilot photo restoration

Both original pilot photos were received in an owner-uploaded ZIP and restored to article covers, cards and social metadata. No article wording or URL changed. Article image sizes are capped to avoid enlarging these 1024-pixel source files. Importer media mappings retain these photos on subsequent pilot reimports.

## Complete text migration

All 14 published posts and 11 original page paths are imported. `npm run validate` passes with zero Astro errors, warnings or hints and a 37-page static build. The importer compares normalized source prose before writing; `scripts/validate-migration.py` independently checks rendered prose against export-derived hashes for every original path, a single h1, unique IDs, same-page anchors and complete local link mapping. The check caught legacy indentation rendering as code, automatic punctuation changes and an old destination fragment target; these are corrected.

Media remains a separate transfer task: two original photos restored, 18 missing WordPress article image filenames, two externally hosted references, and 18 lower-priority old page-layout filenames. Exact batches are available in the private preview at `/migration-review/media/`. Time-sensitive TSA reporting and the imported privacy policy have prominent review notes. Source personal experiences and claims were preserved rather than invented or reverified. No browser interaction, email delivery, or Lighthouse result is claimed. Source and review notes are in `docs/migration/`.

## Photo checklist readability fix

The narrow checklist no longer inherits viewport-based section gutters, which could consume its entire content width on wide screens. Each file now has a separate folder label, a single-line selectable filename, and a copy button with a manual-selection fallback. Shared narrow-page gutters are capped for About, Contact and Privacy as well. The existing 37-page build, Astro checks and migration validations pass; no browser measurement is claimed.

## Image Batches 1–4

Received and matched all 18 batch files. Cover/card selection and inline images are restored; original bytes are checksum-verified. The media checks verify every original usage path from the batch checklist and confirm that received files are not listed as missing. Source prose comparisons still pass for all 25 original paths. Original batch numbering is retained with per-file Received status. Six older page-layout references and two external references remain separate from the completed article batches.
