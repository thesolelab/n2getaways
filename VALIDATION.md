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
