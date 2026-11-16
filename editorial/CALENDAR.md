# Approved N2Getaways editorial calendar

Approved by the owner on November 16, 2026. One new article per week, manually initiated. **Do not draft the first article until explicitly requested.** Every article still needs separate owner approval before publication.

Week 1 starts with the first verified calendar publication; weeks are Monday–Sunday in America/Chicago. Earlier unfinished or reserved slots block later ones. Delayed work does not permit multiple catch-up releases in one week. `calendar.json` controls order, `queue.json` holds permanent topic IDs and statuses, and `optimizations.json` is a separate six-task backlog.

| Week | Approved article | Primary keyword | Existing-article optimization |
|---|---|---|---|
| 1 | Getting to La Fortuna: San José vs. Liberia and Airport Transfer Options | getting to La Fortuna | 48 Hours in Asheville |
| 2 | Where to Stay in Asheville for a Weekend: Choosing Your Base | where to stay in Asheville | — |
| 3 | Waikiki Without a Car: Airport Transfers and Getting Around | Waikiki without a car | Springs Resort overview |
| 4 | Where to Stay on Maui: Choosing Your Base | where to stay on Maui | — |
| 5 | Riding San Francisco Cable Cars: Routes, Boarding and Tickets | San Francisco cable car guide | SF weekend itinerary |
| 6 | Three Days in La Fortuna: Arenal Sights and Resort Time | La Fortuna 3 day itinerary | — |
| 7 | Five Days on Maui: A Flexible First-Visit Itinerary | Maui 5 day itinerary | Waikiki activities |
| 8 | Planning Where to Eat in Asheville: Areas, Reservations and Your Weekend Route | where to eat in Asheville | — |
| 9 | San Francisco in the Rain: Indoor Alternatives for Your Trip | things to do in San Francisco when it rains | Wailea lunch guide |
| 10 | Where to Stay in Waikiki: Choosing Your Location | where to stay in Waikiki | — |
| 11 | Maui Reservations: What to Check and Book Before Your Trip | Maui trip planning reservations | Springs Resort activities |
| 12 | San Francisco, Asheville or Waikiki: Which Fits Your Short Getaway? | San Francisco vs Asheville vs Waikiki | — |

All articles are researched guides/comparison; firsthand experience is unconfirmed. Clearly label researched information, date checks, source claims and editorial suggestions. Only separately label firsthand observations after owner confirmation of visit/date and evidence. No invented visits, stays, meals, tested routes or endorsements. The preserved [approved planning reference](approved-12-week-plan.md) contains scope, search intent, links and overlap boundaries; its original proposal-status language is historical, superseded by the approval and operational files above.

Inspect status without drafting: `npm run editorial:status`. On explicit request, use the existing “Draft the next approved N2Getaways topic” process. Optimizations require their own explicit request and never compete with new articles in the selector.

To reprioritize based on Search Console evidence, obtain explicit owner approval, append the approving owner/date/rationale and complete revised order to `calendar.revisions`, and update entries/queue in the same reviewed PR. Preserve existing IDs, publication receipts and reservations; do not silently skip an in-progress topic. A calendar change is not publication approval. No paid service, cron, unattended drafting or auto-publication is configured.
