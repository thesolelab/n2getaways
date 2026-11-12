# Editorial workflow test — November 12, 2026

Initial end-to-end test: [draft PR #1](https://github.com/thesolelab/n2getaways/pull/1), topic `sf-without-a-car`.

- Manual initiation in the existing chat; no inference API, secret, paid research service or scheduled job used.
- Seven Node editorial tests pass: eligibility, topic/content/PR reservations, official-source host checks, broken internal/external links, unknown images, first-person claims and the human publication gate.
- Full Astro/TypeScript, metadata, local-link and migration validations pass in preview and explicit production modes.
- Initial draft: 1,105 words; seven opened official sources from SFMTA, BART and San Francisco Travel; mapped claims, time-sensitive flags, overlap assessment, SEO title/description/excerpt and existing destination/article links.
- `editorial:submit` created the topic branch and draft PR. Source article has `draft: true`; research approval is false and unsigned.
- GitHub's push/PR validation jobs and Cloudflare Pages preview deployment passed for the initial draft.
- Remote review URL returned 200 with noindex meta and response header, one H1, an unpublished-draft notice and the reusable article layout: https://editorial-topic-sf-without-a.n2getaways-preview.pages.dev/editorial-preview/sf-without-a-car/
- Normal article route is absent from the branch build; live article and live editorial-preview URLs both returned 404. Production rehearsal generated 38 pages, compared with 39 in the draft branch preview. Draft not present in production sitemap or homepage.
- Running the selector again from clean main returned no eligible unreserved topic: the existing PR reserves the approved topic even though main's queue remains approved until that PR is merged. No duplicate draft created.
- Publication sync on main returned no newly published topics and left the queue unchanged. Actual publication/merge was intentionally not tested because the owner has not approved the article for release.
- Owner subsequently selected a different cityscape-at-dusk photo inline. The original downloadable image file is pending; PR research notes require replacing the provisional cover before approval. This is the only pending asset setup item.
- Patched YAML 2.9.1 is the only added development dependency. npm audit returned zero vulnerabilities.

No production article, email setting, DNS record, schedule, auto-merge or paid service was changed by this test. New workflow tooling on main deploys normally through the existing Pages project; the test article remains solely in its unmerged branch.

Preview deployments are public and excluded from indexing, not access-controlled. The test covers automatic checks and HTTP output, not a fresh visual/mobile browser inspection or independent transit operations audit.
