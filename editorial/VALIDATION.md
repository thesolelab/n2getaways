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
- Owner supplied SF Image.zip with the Painted Ladies photograph. It is installed with its original-byte receipt, credit and descriptive alt text. The cover now uses full image proportions so the houses remain visible; cards position this image toward the bottom.
- Patched YAML 2.9.1 is the only added development dependency. npm audit returned zero vulnerabilities.

No production article, email setting, DNS record, schedule, auto-merge or paid service was changed by this test. New workflow tooling on main deploys normally through the existing Pages project; the test article remains solely in its unmerged branch.

Preview deployments are public and excluded from indexing, not access-controlled. The initial test covered automatic checks and HTTP output; independent transit operations verification remains an editorial responsibility.

## Metadata and destination cluster extension

Ten Node tests now pass, including publisher/page/image/article relationships, draft-date exclusions and script-safe JSON-LD serialization. Preview validation covers 39 HTML pages, full metadata consistency, six destination hubs and 12 published supporting-article backlinks. Twenty additional supporting topics are proposed in the queue, not approved or published. Production validation checks the same cluster/metadata behavior with all draft routes absent. All imported article/page prose and original URLs remain intact; original publication dates are retained.

The draft PR includes enhanced title/description metadata for the imported archive, consistent Open Graph and X/Twitter metadata, optimized social images, visible breadcrumbs and matching structured data, truthful editorial byline/source citations, and related reading. No synthetic update dates, personal experiences, rankings promises or special AI crawler policies are introduced. Full-image cover display is enabled for the supplied Painted Ladies photograph.

Final cover layout check: local Chromium at 1440px desktop and 390px mobile confirmed full image proportions (`object-fit: contain`, automatic height), no horizontal overflow, and visible Painted Ladies houses in screenshots. Font fallbacks were used for this local composition check. The updated Cloudflare branch preview was verified to contain the full-cover class, BlogPosting/BreadcrumbList data and noindex protections. GitHub validation and Cloudflare Pages checks passed for the source change.

## Related reading and cluster usability correction

Reproduced the related-reading collapse at 2560px and 3440px: viewport-derived `.section` gutters consumed the width of the capped container, leaving a 40px list box. Removed that inherited class and gave the section bounded internal padding. Chromium confirms a 350px list at 390px and a 1008px list at 1440/2560/3440, with no horizontal overflow.

Destination topic groups now share one responsive grid, with compact category headers/counts and consistently sized article images. Removed the repeated Explore heading and generic category descriptions. A single-guide destination uses a horizontal featured card on desktop and a stacked card on mobile. Checked all six destination hubs at 390, 1440 and 3440px: no overflow or collapsed columns. San Francisco's three groups occupy one desktop row. Inspected screenshots of the corrected related-reading section and San Francisco hub. Full preview validation passes (39 HTML pages, original content/URLs, metadata and six-hub linking checks).
