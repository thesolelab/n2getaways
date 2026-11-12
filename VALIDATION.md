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
