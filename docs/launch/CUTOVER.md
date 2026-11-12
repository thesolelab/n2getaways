# N2Getaways production cutover plan

Status: **website cutover pending.** The owner has moved nameservers to Cloudflare and confirmed an incoming email arrived in Spam. The copied website records still target SiteGround. Production build variables are now maintained in `wrangler.toml`; dashboard variables were not reaching the build. The user approved the preview and confirmed receiving a Formspree submission. A separate approval is required before the DNS/custom-domain steps below.

## Reviewable release settings

| Setting | Current preview | Prepared production |
| --- | --- | --- |
| `SITE_MODE` | unset (defaults to `preview`) | `production` |
| `SITE_URL` | explicit preview URL or Cloudflare deployment origin | `https://n2getaways.com` (mandatory) |
| Public page robots meta | noindex, nofollow | index, follow |
| Response headers | all paths noindex | pages.dev hosts and review/sample paths noindex |
| robots.txt | Disallow all | Allow public pages; disallow review/sample roots; production sitemap |
| Sitemap | review build | 27 publication paths; excludes review tools, samples, alias and 404 |
| Review banners, labels, legacy-copy disclosures | visible | hidden on publication pages |
| Article words, publication dates and original URLs | retained | retained; dated TSA articles retain a current-information notice |
| Privacy page | current implementation plus preserved legacy copy | current implementation only |
| Inquiry endpoint | `https://formspree.io/f/xaeonjpv` | unchanged |

Production mode fails the build unless the explicit origin is exactly `https://n2getaways.com`; a Cloudflare branch other than `main` is also rejected. A flag does not attach a domain or change DNS. Review/sample URLs remain accessible if requested directly but are unlinked from publication navigation, excluded from the production sitemap and noindex; this is not an authentication system. There is no sensitive customer content in those review tools.

## Read-only DNS findings (November 12, 2026)

See `public-dns-snapshot.json`. It is **not a complete DNS-zone export**.

- Current website A record: `35.215.126.21` (TTL 86400 seconds at lookup).
- Current authoritative nameservers: `ns1.siteground.net`, `ns2.siteground.net`.
- SiteGround email MX: priority 10 `mx10.antispam.mailspamprotection.com`, priority 20 `mx20.antispam.mailspamprotection.com`, priority 30 `mx30.antispam.mailspamprotection.com`.
- `mail.n2getaways.com` A record: `35.215.126.21`. Preserve this independent mail-host target; do not repoint it to Pages or make it follow the new apex website address.
- Current SPF: `v=spf1 +a +mx include:n2getaways.com.spf.auto.dnssmarthost.net ~all`.
- Current DMARC: `v=DMARC1; p=none; aspf=r; adkim=r;`.
- Google and Pinterest verification TXT records were also observed and must be preserved.
- No apex AAAA, CAA or DS answer was observed in these queries. Recheck at cutover; this does not replace checking registrar/DNSSEC settings.
- DKIM selectors and other mail/service records cannot be reliably enumerated through these lookups.

## Needed before requesting a cutover approval

1. Obtain screenshots or an export of **all** SiteGround records from Site Tools → Domain → DNS Zone Editor, including full TXT values and all pages of records. Include DKIM/SRV, mail, autoconfig/autodiscover, verification and any other subdomains. DNS records are public; mailbox passwords and account tokens are not needed.
2. Identify the registrar where nameservers are controlled. SiteGround hosting alone does not establish which registrar holds the domain.
3. Save a complete WordPress files/database backup and a DNS-zone backup. Keep SiteGround hosting, the WordPress installation and all email mailboxes running.
4. Review the production-mode privacy text (Cloudflare hosting, Google Fonts, Formspree inquiries; no invented analytics/affiliate integrations) and the dated-content notice. The original WordPress policy remains in Markdown and the preview for comparison.
5. Compare the full zone with the read-only snapshot and create a record-by-record migration sheet. Do not rely only on Cloudflare's automatic scan.

## Staging the DNS zone — only after separate approval

An apex domain on Cloudflare Pages requires Cloudflare authoritative nameservers. This is a DNS-provider move, not a transfer of domain registration or a move of the SiteGround inbox.

1. Add `n2getaways.com` as a Cloudflare zone and obtain its assigned nameservers. Do not yet change nameservers at the registrar.
2. Import and compare every existing record. Initially retain the SiteGround web A records so the old site keeps serving during the nameserver transition. Keep mail-related host records DNS-only. MX, SPF, DKIM, DMARC and verification records must be carried across without speculative changes.
3. SPF contains `+a`; changing the apex website address changes that mechanism's result. Keep exactly one SPF record and verify the SiteGround sending configuration and DKIM rather than assuming an unchanged SPF string alone guarantees outgoing mail.
4. Inspect DNSSEC/DS at the registrar. If signed delegation is present, coordinate the provider transition so old DS data does not break resolution. The read-only lookup observed no DS, but this must be refreshed.
5. If supported and approved, lower website-record TTL ahead of the cutover window. Existing cached answers can persist for their original TTL; a shorter new TTL does not erase old caches.
6. After the copied zone is verified, change only the authoritative nameservers at the registrar. Verify the zone becomes active while the website still points to SiteGround. Test inbound and outbound SiteGround email before proceeding.

## Website cutover — still within the explicitly approved window

1. Verify `wrangler.toml` has production `[vars]` with `SITE_MODE=production` and `SITE_URL=https://n2getaways.com`, and `[env.preview.vars]` with `SITE_MODE=preview` and no fixed SITE_URL. Variables in the repository configuration are authoritative for these builds. Trigger a production build and verify it succeeds. The generated pages.dev response-header rules continue to block indexing on that host.
2. In Pages → n2getaways-preview → Custom domains, associate `n2getaways.com` through the Pages workflow. **This can automatically add/change the apex CNAME when the zone is active; it is an actual DNS change.** Do not add a bare CNAME without associating the custom domain in Pages.
3. Add `www.n2getaways.com` as required and configure a single canonical redirect to `https://n2getaways.com`, preserving path and query. Confirm the TLS/custom-domain state is active and there is no redirect loop. Do not alter mail/FTP/autodiscover records as part of the website change.
4. Verify all 25 original paths in `url-map.csv`, including `/contact/`, `/about/`, `/privacy-policy/`, `/travel-guides/`, `/travel-stories/` and the destination/article routes. Article redirects are unnecessary because the original paths are retained. The development-only `/guides/` alias redirects to `/travel-guides/` in production.
5. Check the live domain has production canonicals/social URLs, a live sitemap and indexable public-page meta; ensure it has no global noindex response header. Verify pages.dev remains noindex and an unknown URL returns 404.
6. Submit a clearly identified inquiry from the live domain and confirm receipt at `hello@n2getaways.com`; review Formspree's domain restriction settings if enabled. Separately verify normal inbound and outbound mailbox delivery. Keep the existing successful preview test as baseline.
7. Recheck mobile layouts and critical navigation, then submit `https://n2getaways.com/sitemap-index.xml` in the owner's Search Console. Do not start AI publishing, new analytics, advertising or affiliate integrations as part of this cutover.

## Rollback

Keep the captured SiteGround web records available. If the Pages domain/TLS or page checks fail, restore **website** DNS records to their recorded SiteGround values at whichever provider is currently authoritative. Leave the verified mail records intact. Do not reflexively switch nameservers again: doing so adds another cache/propagation transition. The old WordPress installation remains available for a website rollback. Revert Pages `SITE_MODE` to preview if withdrawing the release. Record the change time and results; do not delete either hosting setup during verification.

## Official references

- Cloudflare apex domains and automatic DNS association: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Host-specific noindex header patterns: https://developers.cloudflare.com/pages/configuration/headers/
- Nameserver migration: https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/
- SiteGround DNS editor: https://www.siteground.com/kb/manage-dns-records-site-tools/
- SiteGround SPF/DKIM/DMARC: https://www.siteground.com/kb/configure-spf-dkim-dmarc-records/
