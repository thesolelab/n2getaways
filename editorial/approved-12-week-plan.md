> Owner approved this revised calendar and six optimizations on November 16, 2026. The original proposal below is retained as planning context; `calendar.json`, `queue.json` and `optimizations.json` are the implemented operational records. Drafting still requires a fresh manual request; each publication requires separate article approval. No first article has been generated.

# N2Getaways: proposed 12-week editorial and SEO plan

Revised November 16, 2026 (America/Chicago). Original audit November 15. **For review only; calendar not approved.** Repository audit at main commit `c2bb9ae`. No website, queue, article, workflow, deployment setting or approval record changed. Planning artifacts are outside the repository. No new articles written and no scheduling activated.

## Recommendation and evidence

Start with **getting to La Fortuna from SJO or LIR, with resort-specific arrival details**, and refresh **48 Hours in Asheville in Week 1**. Then fill practical gaps in existing destination clusters. Refresh current content alongside new work. Preserve established URLs. Do not spread the next 12 weeks across more destinations simply to fill a quota.

The Springs priority is based on the owner's report of traffic and the clear travel-planning need; page-level Google organic performance has not been supplied. This is not evidence that it is the site's highest organic-search opportunity. Asheville has the strongest supplied near-page-two query signal, but only 20 impressions for that query. Neither observation supports a traffic forecast.

### Supplied year-to-date Google organic baseline

| Metric | Historical baseline | Interpretation |
|---|---:|---|
| Impressions | 6,964 | Search appearances, not visits |
| Clicks | 1 | Very small sample; avoid percentage-growth targets |
| CTR | Approximately 0.01% supplied; 1 / 6,964 = 0.0144% | Rounded; do not diagnose poor snippets from this alone |
| Average position | 49.68 | Aggregate across different queries/pages; not a ranking for one article |

| Query | Impressions | Average position | Proposed response |
|---|---:|---:|---|
| 48 hours in Asheville | 20 | 17.35 | Early refresh of existing weekend URL; no separate “48 hours” article |
| 2 days in Asheville | 43 | 45.40 | Address as the same itinerary intent, not a competing new URL |
| 48 hours in San Francisco | 67 | 54.13 | Improve the existing itinerary's usefulness and connections to transport/lodging |
| 10 best things to do in Waikiki | 4 | 89.25 | Improve existing activities page; do not force a “10 best” clone |

These are historical reference points, not current ranks. Query totals cannot be assumed to map to particular URLs until query-by-page data confirms it. No Search Console access assumed, no keyword volume or difficulty figures invented.

## 1. Existing content inventory

**16 non-sample articles:** San Francisco 4; Asheville 2; Waikiki 3; Maui 1; Costa Rica 2; Santorini 2; travel tips 2. Of these, 14 are migrated WordPress articles and two are newly published editorial articles. `migrationReview: true` is an import flag, not an unpublished status or proof of current factual verification.

**Six destination hubs:** San Francisco, Asheville, Waikiki, Maui, Costa Rica, Santorini. No Milwaukee article, hub, approved asset inventory or editorial destination configuration found.

**Three additional sample articles:** Italian Riviera, Japan and Portugal; placeholders excluded from production article discovery, with review/noindex handling. They are not real coverage to expand this quarter.

The accompanying `content-inventory.csv` records all **19 article files and 11 imported page files**, titles, paths, metadata, roles and review notes. Current hub output also depends on `src/config/clusters.json`, `src/lib.ts` and templates; source-page frontmatter alone is not the rendered SEO inventory.

### Santorini

| Existing article | URL | Primary intent |
|---|---|---|
| Planning Oia, Santorini: Crowds, Sunset Photos and Dinner | [Open](https://n2getaways.com/planning-a-trip-to-oia-santorini/) | planning |
| The Ultimate Santorini Itinerary: 3 to 7 Days in Fira | [Open](https://n2getaways.com/santorini-fira-itinerary-3-to-7-days/) | itineraries |

### San Francisco

| Existing article | URL | Primary intent |
|---|---|---|
| Getting Around San Francisco Without a Car: A First-Visit Guide | [Open](https://n2getaways.com/getting-around-san-francisco-without-a-car/) | planning |
| 48 Hours in San Francisco: The Perfect Weekend Itinerary | [Open](https://n2getaways.com/48-hours-in-san-francisco-the-perfect-quick-city-guide/) | itineraries |
| Best Views in San Francisco (Most Scenic Spots) | [Open](https://n2getaways.com/best-views-in-san-francisco/) | experiences |
| Where to Stay in San Francisco (Best Area for First-Time Visitors) | [Open](https://n2getaways.com/where-to-stay-in-san-francisco/) | stays |

### Asheville

| Existing article | URL | Primary intent |
|---|---|---|
| 48 Hours in Asheville: A Simple Mountain Getaway | [Open](https://n2getaways.com/48-hours-in-asheville/) | itineraries |
| Best Things to Do in Asheville (Top Attractions + Local Spots) | [Open](https://n2getaways.com/things-to-do-in-asheville/) | experiences |

### Travel tips

| Existing article | URL | Primary intent |
|---|---|---|
| Are Airports Really Operating Without TSA? Here’s What Travelers Need to Know Right Now | [Open](https://n2getaways.com/airports-without-tsa/) | Airport screening information |
| How to Get Through TSA Faster Right Now (Avoid Airport Delays in 2026) | [Open](https://n2getaways.com/how-to-get-through-tsa-faster/) | Airport screening information |

### Maui

| Existing article | URL | Primary intent |
|---|---|---|
| Best Lunch Spots Near Wailea Beach Resort (Local Favorites in Maui) | [Open](https://n2getaways.com/best-lunch-spots-near-wailea-beach-resort-local-favorites-in-maui/) | food |

### Costa Rica

| Existing article | URL | Primary intent |
|---|---|---|
| Best Things to Do at The Springs Resort & Spa at Arenal (Costa Rica Guide) | [Open](https://n2getaways.com/best-things-to-do-at-the-springs-resort-spa-at-arenal-costa-rica-guide/) | experiences |
| The Springs Resort & Spa at Arenal: A Luxury Escape in La Fortuna, Costa Rica | [Open](https://n2getaways.com/the-springs-resort-spa-at-arenal-a-luxury-escape-in-la-fortuna-costa-rica/) | stays |

### Waikiki

| Existing article | URL | Primary intent |
|---|---|---|
| Eggs ’n Things Waikiki Beach: The Perfect Breakfast to Start Your Day in Honolulu | [Open](https://n2getaways.com/eggs-n-things-waikiki-beach-the-perfect-breakfast-to-start-your-day-in-honolulu/) | food |
| Lunch at Lulu’s Waikiki: The Perfect Way to Start Your Hawaii Vacation | [Open](https://n2getaways.com/lunch-at-lulus-waikiki-the-perfect-way-to-start-your-hawaii-vacation/) | food |
| Best Things to Do in Waikiki for First-Time Visitors | [Open](https://n2getaways.com/things-to-do-in-waikiki-first-time-visitors/) | experiences |

### Destination landing pages and other pages

| Landing page | Published supporting articles | Findings |
|---|---:|---|
| [/destinations/san-francisco/](https://n2getaways.com/destinations/san-francisco/) | 4 | Strongest coverage breadth: itinerary, lodging, views, transport. Needs deeper decisions rather than another introductory guide. |
| [/destinations/asheville/](https://n2getaways.com/destinations/asheville/) | 2 | Weekend and attractions; lodging, dining and logistics gaps. No imported hub copy, so review generated hub directly. |
| [/destinations/waikiki/](https://n2getaways.com/destinations/waikiki/) | 3 | Activities and two individual restaurants; missing airport/car-free and lodging decisions. Imported hub's breakfast framing links to Lulu's lunch article; review label-to-destination consistency. |
| [/destinations/maui/](https://n2getaways.com/destinations/maui/) | 1 | Only a Wailea-area food article. Add coherent lodging and trip structure before broad lists. Imported “coming soon” statements must match published coverage. |
| [/destinations/costa-rica/](https://n2getaways.com/destinations/costa-rica/) | 2 | Arenal/The Springs focus is accurate; not yet a countrywide guide. Strong transport gap and existing article overlap. |
| [/destinations/santorini/](https://n2getaways.com/destinations/santorini/) | 2 | Fira itinerary + newly published Oia planning guide. Cluster intro still says one detailed itinerary, and hero line refers only to Fira; propose correction. |

Other imported page records reviewed: home `/`, destinations directory `/destinations/`, travel guides `/travel-guides/`, travel stories `/travel-stories/`, about `/about/`, contact `/contact/`, privacy `/privacy-policy/`, plus the four imported destination page files represented above. Home, directories and some standalone pages use custom templates; do not infer live behavior solely from imported prose. `/travel-stories/` has essentially no imported body, but its live template is a populated index of existing Review/Travel story articles. Treat it as a collection, not a missing article or empty live page. Privacy import notes flag WordPress-era integration claims for owner verification; not an organic-content expansion target.

## 2. Cluster gaps and overlap boundaries

| Cluster | Best gap to fill | Avoid overlap / competing intent | Approach this quarter |
|---|---|---|---|
| Costa Rica / Arenal | SJO vs LIR, resort drop-off, arrival/departure planning; area itinerary beyond resort | Resort overview already includes activities, a seven-day stay outline and short airport section; activities article repeats many experiences | Keep overview focused on stay decisions; activity detail on existing activities URL; one transport URL for resort access, not a second generic La Fortuna airport article |
| Asheville | Weekend base, restaurant planning, verified logistics | “48 hours” and “2 days” are the same itinerary intent; attractions list already covers Biltmore/RAD/breweries | Refresh itinerary first; add stays and dining articles that help implement it |
| San Francisco | Cable-car specifics and rainy-day alternatives | Proposed first-visit neighborhoods article substantially overlaps the current lodging article; avoid new general “best neighborhoods” URL | Expand lodging article later; new cable-car guide narrowly about riding, not another all-system transport overview |
| Waikiki | Car-free airport/local transport, location comparison for lodging | Existing things-to-do guide already contains a one-day outline; don't turn it into a competing two-day guide without a distinct plan | Improve attractions page; add transport and stays. Keep restaurant pages focused on actual named venues |
| Maui | Lodging-area choice, geographically feasible first trip, booking requirements | Do not split airport transport and car-free options into multiple near-identical articles; do not duplicate Wailea lunch list | Build foundational cluster; itinerary, stays and reservations have separate reader decisions |
| Santorini | Accurate hub + contextual Fira/Oia links now | Oia article already covers season, sunset, local transfers and dinner. Broad transport/season topics must go beyond that to warrant their own pages | Maintain existing cluster this quarter; leave island-wide proposals proposed, not discarded |
| Milwaukee | Evidence and owner experience first | No existing hub/content; new city dilutes this quarter's cluster focus | Conditional future pilot only if owner can supply useful original material; no fabricated local expertise |

### Concrete content-quality and intent findings

- Springs overview links to the Maui lunch article, but does not have a body link to the Springs activities guide. The activities article links back to the overview. Replace the unrelated journey with meaningful Arenal next steps when editorial edits are approved.
- Springs activities article contains “This is where your hero image of the volcano should go.” This is a published production note, not useful reader copy. Remove in its approved optimization pass.
- Springs overview currently quotes SJO “2.5 to 3 hours” and LIR “3 to 3.5 hours,” plus broad road-condition advice. Treat these as claims to reverify, not research for the new transport guide. Distinguish airport-to-resort from airport-to-town, driving time from total arrival time, and provider quotes from guarantees.
- Asheville itinerary mentions “best things to do,” “Asheville food guide” and “where to stay” without actual links. Link existing pages now only after change approval; link proposed food/stays pages only after their publication. Also inspect the split Biltmore “B” / “ook” link markup.
- Asheville timing, road access, recovery-related operating status and venue details need current primary-source checks; no claim in this plan that a named road or venue is currently open or closed.
- Both TSA articles use “right now,” shutdown/staffing claims and procedural advice. Existing caution banners do not make the underlying claims current. Review screening exceptions, private screening vs no screening, ID/shoes/electronics rules and operator programs against official sources. Do not create a third TSA article to solve this.
- SF weekend article contains a “Quick San Francisco Plan” with Day 3 despite the 48-hour title, and its closing section includes a repeated/incomplete cable-car sentence. Fix these specific consistency defects in the Week 5 refresh; do not create a second weekend itinerary.
- The Fira itinerary makes precise short transfer-time claims, broad bus-coverage claims and a suggested onward Akrotiri-to-Perissa sequence. Propose a later factual review against operator routing and current access, not merely a hub-copy update. Existing text is not verification for future Santorini articles.
- Most migrated descriptions start “Explore/Read the N2Getaways article…” and describe the existence of a guide rather than its answer. Rewrite selectively around the reader decision once factual scope is confirmed.
- Current templates already provide canonical/social tags, BlogPosting/breadcrumb data, destination backlinks and same-destination related reading. Do not rebuild these or sell special “AI SEO” markup. Improve original answers, source attribution and contextual links; no ranking or AI-citation promises.

## 3. Proposed 12-week calendar

**Start:** Week 1 is the first mutually agreed publishing week after calendar approval; no dates or deadlines are activated by this document. One primary article each week is a target subject to editorial readiness, never a reason to publish unsupported work. Release dates are set at final approval.

**Allocation, mutually exclusive for counting:** 8 destination-cluster articles (66.7%), 3 practical-planning articles (25%), 1 cross-destination roundup (8.3%). This is the closest useful whole-article approximation to 70/20/10. Practical articles still strengthen their destination clusters, but are counted only once. No second weekly article is assumed.

Every entry below has status **PROPOSED — awaiting calendar approval; not approved to draft or publish**. Keywords are intent hypotheses, not measured demand. “Firsthand not required” means a transparent researched guide, not an experience review. Owner experience availability is unconfirmed unless explicitly noted; photographs alone do not prove firsthand claims.

### Experience and recommendation labels — apply to every week

All 12 planned articles are **R: researched planning guides or researched synthesis**. Firsthand experience is not required for the scoped factual comparisons, but its availability is **unconfirmed**, even where existing articles contain personal language. Do not infer personal experience from an image, migrated prose or a previous topic approval.

Use a visible basis-of-guide statement for each new article identifying researched planning and the date checked. Clearly attribute venue/operator information; distinguish factual information, modeled examples and editorial planning suggestions. Describe unvisited venues as options to investigate, not personally recommended or “tested” picks. Do not turn researched coverage into a purported restaurant/hotel review.

**F: confirmed firsthand experience** may be included only when the owner supplies/confirms the actual visit, relevant date and observations. Label it separately (“From our [date] visit…”), distinguish personal impressions from independently checked current information, and do not generalize one visit into service/availability guarantees. For existing-article optimizations, preserve verified personal observations; ask the owner to verify unsupported first-person claims rather than adding or attributing experiences. Restaurant names, hotel quality, transport testing and lived accessibility claims require particular care.

### Week 1 — Getting to La Fortuna: San José vs. Liberia and Airport Transfer Options

- **Destination / allocation:** Costa Rica / practical planning. **Primary keyword:** getting to La Fortuna. **Supporting queries to investigate:** San José to La Fortuna; Liberia to La Fortuna; getting to The Springs Resort. **Intent:** compare arrival airports and plan the complete airport-to-accommodation journey. **Type:** transport decision guide. **Priority:** P1, first release.
- **Support and links:** Costa Rica hub; existing Springs overview and Springs activities guide. Include a clearly labeled section on the last leg to out-of-town accommodation, using The Springs as a sourced example. Confirm whether any shared service drops at the booked property or in town; do not imply a town drop-off reaches every resort.
- **Why / scope decision:** recommend the broader La Fortuna intent because the airport, arrival-time and transfer decision applies to more travelers and matches the existing proposed queue topic. Preserve the site's resort advantage through useful property-specific detail and reciprocal links. This is a relevance/coverage judgment, not evidence of greater search volume or easier rankings. Confirm page-query data before fixing the final SEO wording.
- **Coverage boundary:** choose SJO vs LIR based on flights, arrival times, route estimates and onward plans; compare private transfer, shared service, public transport and rental car only where actual routes/services are verified. Explain airport-to-town vs airport-to-resort timing, late-arrival overnight choices, departure buffers and local onward transport. Do not expand into a countrywide transportation guide or duplicate the Week 6 itinerary.
- **Experience basis:** **researched planning guide (R)**; no firsthand route or provider use confirmed. Attribute operator claims and time estimates, date-check services, and clearly label editorial allowances. Any owner account must be a separately labeled, confirmed experience with visit date/context, not a generalized endorsement.
- **Queue proposal only:** retain `la-fortuna-transport` and existing keyword `getting to La Fortuna`; refine title/notes and move priority 14 to calendar sequence 1 after approval. Do not create a second Springs-only airport article this quarter.

### Week 2 — Where to Stay in Asheville for a Weekend: Choosing Your Base

- **Destination / allocation:** Asheville / cluster. **Keyword:** where to stay in Asheville. **Intent:** choose a neighborhood/base. **Type:** location decision guide. **Priority:** P1, second release.
- **Support and links:** Asheville hub; 48 Hours in Asheville; Things to Do in Asheville; future dining guide only once live.
- **Why:** closes an explicit unlinked next-step reference in the itinerary and supports the supplied Asheville query opportunity. Compare walkability, access and tradeoffs rather than invented hotel rankings.
- **Experience:** no stay experience required for sourced area comparison; hotel-specific endorsement requires owner evidence or omission.
- **Queue proposal:** reuse `asheville-where-to-stay`, currently priority 16; calendar sequence 2.

### Week 3 — Waikiki Without a Car: Airport Transfers and Getting Around

- **Destination / allocation:** Waikiki / practical planning. **Keyword:** Waikiki without a car. **Intent:** decide whether a car is necessary and plan arrival/local movements. **Type:** transport guide. **Priority:** P1, third release.
- **Support and links:** Waikiki hub; existing activities guide; Lulu's lunch and Eggs ’n Things breakfast where geographically relevant; stays article once published.
- **Why:** connects arrival planning to existing food/activity coverage. Distinguish Waikiki from all of Oahu; verify luggage/accessibility/service constraints and airport pickup rules.
- **Experience:** sourced guide possible; no personal route testing claimed.
- **Queue proposal:** reuse `waikiki-without-car`, priority 12 → sequence 3.

### Week 4 — Where to Stay on Maui: Wailea, Kihei and Other Base Options

- **Destination / allocation:** Maui / cluster. **Keyword:** where to stay on Maui. **Intent:** choose a base aligned with the trip. **Type:** area comparison. **Priority:** P1, fourth release.
- **Support and links:** Maui hub; Wailea lunch guide; itinerary/reservations guides only after release.
- **Why:** creates a useful bridge from the existing Wailea article to broader planning. Verify access and current destination guidance; avoid assuming every area suits every visitor or presenting unvisited hotels as reviewed.
- **Experience:** sourced geography/tradeoff guide possible; owner observations optional and labeled.
- **Queue proposal:** reuse `maui-where-to-stay`, priority 7 → sequence 4.

### Week 5 — Riding San Francisco Cable Cars: Routes, Boarding and Tickets

- **Destination / allocation:** San Francisco / cluster. **Keyword:** San Francisco cable car guide. **Intent:** plan a particular ride. **Type:** attraction logistics. **Priority:** P2, fifth release.
- **Support and links:** SF hub; car-free guide; weekend itinerary; scenic views guide. Link back from the existing transport overview's cable-car section.
- **Why:** deeper task-level coverage for an experience already mentioned on several pages. Keep BART/Muni system comparison on the existing car-free URL. Source routes, boarding/payment and accessibility from the operator.
- **Experience:** no ride experience required for a researched guide; no claim that we tested waits or routes.
- **Queue proposal:** reuse `sf-cable-cars-planning`, priority 5 → sequence 5.

### Week 6 — Three Days in La Fortuna: Balancing Arenal Sights and Resort Time

- **Destination / allocation:** Costa Rica / cluster. **Keyword:** La Fortuna 3 day itinerary. **Intent:** organize an area visit across three days. **Type:** itinerary. **Priority:** P1, sixth release after transport foundation.
- **Support and links:** Costa Rica hub; Springs overview; existing activities article; Week 1 transport guide once live.
- **Why:** extends coverage beyond one property. Explicitly distinguish town/region exploration from the overview's existing seven-day resort outline. Explain who should adapt it and avoid overloading arrival day.
- **Experience:** source-grounded suggested itinerary possible, clearly not personally road-tested; verify opening/access/travel feasibility. Owner experience would improve it.
- **Queue proposal:** reuse `la-fortuna-itinerary`, priority 13 → sequence 6.

### Week 7 — Five Days on Maui: A Flexible First-Visit Itinerary

- **Destination / allocation:** Maui / cluster. **Keyword:** Maui 5 day itinerary. **Intent:** sequence a first trip. **Type:** itinerary. **Priority:** P2, seventh release.
- **Support and links:** Maui hub; Week 4 stays article; Wailea lunch guide; reservations guide after publication.
- **Why:** develops a one-article cluster into a coherent trip-planning path. Group stops geographically, preserve flexible arrival time and distinguish optional excursions from essential reservations.
- **Experience:** sourced suggested itinerary possible; no fabricated drive testing, meals or hotel stays. Current local guidance and capacity/access checks required.
- **Queue proposal:** reuse `maui-first-visit-itinerary`, priority 6 → sequence 7.

### Week 8 — Planning Where to Eat in Asheville: Areas, Reservations and Your Weekend Route

- **Destination / allocation:** Asheville / cluster. **Keyword:** where to eat in Asheville. **Intent:** plan dining around the weekend route. **Type:** researched dining decision guide. **Priority:** P2, eighth release.
- **Support and links:** Asheville hub; weekend itinerary; activities guide; Week 2 stays guide once live. Reciprocal links from itinerary meal sections.
- **Why:** develops another existing but unlinked guide reference. Organize by itinerary area/booking needs, not a generic “best restaurants” claim. Verify operating location and reservation policies directly.
- **Experience:** no tasting required if strictly a sourced planning guide; personal taste rankings/reviews require documented owner meals. Experience availability unconfirmed.
- **Queue proposal:** reuse `asheville-food-planning`; proposed keyword changes from “Asheville food planning”; priority 17 → sequence 8.

### Week 9 — San Francisco in the Rain: Indoor Alternatives for Your Trip

- **Destination / allocation:** San Francisco / cluster. **Keyword:** things to do in San Francisco when it rains. **Intent:** adapt sightseeing when outdoor plans become less appealing. **Type:** weather-contingency decision guide. **Priority:** P2, ninth release.
- **Support and links:** SF hub; existing weekend itinerary, scenic viewpoints and car-free guide; cable-car guide only where relevant. Add short weather-alternative links in the itinerary/views articles after publication.
- **Why / replacement decision:** defer the budget article. A genuinely useful budget requires dated accommodation examples, fares, tickets and explicit assumptions across variable travel dates; maintaining a convincing total would be disproportionate without a regular pricing-review commitment. Official prices can be researched, but easy ongoing maintenance is not established. Rainy-day adaptation solves a separate reader problem with less price dependency.
- **Coverage boundary:** options grouped by location, time available and indoor exposure; explain substitutions for outdoor portions rather than writing another full weekend itinerary or general attractions list. No promise of dry transfers, shelter on all routes, availability or weather. Avoid budget totals and volatile price tables; link official admission/booking details.
- **Experience basis:** **R**; no personally tested rainy-day routes or venue visits assumed. Primary-source verification of indoor access, booking requirements, locations and accessibility remains necessary. Lower maintenance does not mean maintenance-free.
- **Queue proposal only:** add `sf-rainy-day-planning` after approval. Leave `sf-first-trip-budget` unchanged and outside this calendar; do not silently rename its ID or delete its history. Count as destination-cluster coverage.

### Week 10 — Where to Stay in Waikiki: Choosing a Location for Your Trip

- **Destination / allocation:** Waikiki / cluster. **Keyword:** where to stay in Waikiki. **Intent:** choose location by walkability, budget priorities and planned activities. **Type:** location comparison. **Priority:** P2, tenth release.
- **Support and links:** Waikiki hub; Week 3 transport guide; existing attractions and two food articles when location fits.
- **Why:** fills lodging intent without another activities list. Treat hotel examples as researched options, not personally recommended stays.
- **Experience:** sourced location guide possible; owner hotel experience optional, unconfirmed.
- **Queue proposal:** reuse `waikiki-where-to-stay`, priority 11 → sequence 10.

### Week 11 — Maui Reservations: What to Check and Book Before Your Trip

- **Destination / allocation:** Maui / practical planning. **Keyword:** Maui trip planning reservations. **Intent:** understand current booking requirements and avoid missed access. **Type:** booking checklist. **Priority:** P2, eleventh release; outline requirements during earlier Maui research even though this article publishes later.
- **Support and links:** Maui hub; Week 7 itinerary; Week 4 stays; Wailea lunch guide for dining context only.
- **Why:** complements an itinerary rather than duplicates it. Separate required permits from recommended advance bookings; show checked dates and official booking sources. Earlier articles must themselves verify requirements, not wait for this piece.
- **Experience:** researched checklist possible; current official park/local guidance required. No fee/reservation guarantees.
- **Queue proposal:** reuse `maui-trip-planning`, priority 2 → sequence 11; narrow title to the booking task.

### Week 12 — San Francisco, Asheville or Waikiki: Which Fits Your Next Short Getaway?

- **Destination / allocation:** cross-destination / inspiration. **Keyword:** San Francisco vs Asheville vs Waikiki. **Intent:** compare destinations before choosing a trip. **Type:** evidence-backed destination comparison. **Priority:** P3, twelfth release; lower-confidence demand hypothesis.
- **Support and links:** three existing hubs, their published itineraries/activities, transport and lodging guides. Include only pages actually live at drafting/release time.
- **Why:** a single useful discovery bridge to developed clusters. Compare total travel time, usable days, mobility/transport preferences and trip style; do not promise universal cheap flights, weather or ranking superiority. Not “all three are equally easy for 48 hours”; Waikiki suitability depends strongly on origin and available nights.
- **Experience:** researched synthesis possible; no fabricated favorite-trip claims. Query evidence would improve confidence. If weak, defer instead of filling the slot with generic inspiration.
- **Queue proposal:** new ID `short-getaway-sf-asheville-waikiki`; likely destination/category `Travel tips`, but existing configuration lacks a Travel tips drafting entry. Requires a small reviewed config/validation extension after approval; no new infrastructure or invented destination hub.

### Future reserve topics — no second weekly article

**The Springs Resort Day Pass: What to Check Before Booking.** Consider only for a later calendar if official availability, inclusions and restrictions are verified and owner/Search Console signals justify distinct visitor intent. Existing resort guides cover activities; this would address non-guest booking eligibility, not another activities list. Status remains proposed; requires separate topic approval, no second weekly release in this plan. Firsthand experience unconfirmed; no day-pass review without it.

**Milwaukee reserve:** no slot by default. If the owner has recent original observations/photos, propose a focused Milwaukee getaway angle after confirming search intent and creating the minimal destination configuration. Do not insert it silently into this calendar.

## 4. SEO optimization backlog — six planned article refreshes

Approximately one existing article every two weeks. All changes below are **proposals**, not edits made. Example SEO titles are candidates, not evidence of better CTR. Each pass should verify primary-source facts, put a useful answer near the top, improve relevant contextual links, check metadata/social/structured data and mobile output, preserve the URL and require owner approval. Update `updatedDate` only after substantive reviewed edits; never manufacture a fresh publication date.

| Target week / priority | Existing article and current URL | Intent and improvements | Candidate metadata and internal links | Rationale |
|---|---|---|---|---|
| 1 / P1 | [48 Hours in Asheville](https://n2getaways.com/48-hours-in-asheville/) | Plan a two-day trip. Clear two-day summary, feasible routing, reservation lead-time assumptions, current road/attraction/venue checks and alternatives. Fix unlinked references and split Biltmore anchor. | Existing SEO title “48 Hours in Asheville: Weekend Itinerary” already matches; consider “48 Hours in Asheville: A Two-Day Weekend Itinerary” only after substantive review. Intent-led description, no brand-prefaced filler. Link things-to-do, hub and stays/food guides only after publication. | Historical “48 hours” position 17.35 is the strongest supplied near-page-two signal; 20 impressions is still very small. |
| 3 / P1 | [Springs overview](https://n2getaways.com/the-springs-resort-spa-at-arenal-a-luxury-escape-in-la-fortuna-costa-rica/) | Decide whether/how to stay. Reverify airport duration/road claims, current amenities, extra-cost activities and superlatives. Keep brief arrival summary, move deep transport to Week 1. Reduce activity duplication without gutting the stay guide. | Title: “The Springs Resort & Spa, Arenal: Stay Planning Guide.” Description should answer location, stay considerations and next-step transport. Body links to activities + new La Fortuna transport + Costa Rica hub; replace unrelated Maui detour. | Owner-reported traffic and direct transport need; support the first release. |
| 5 / P1 | [SF weekend itinerary](https://n2getaways.com/48-hours-in-san-francisco-the-perfect-quick-city-guide/) | A workable 48-hour visit. Clarify two actual days, geographic sequence, transit and reservation needs; check opening times/location claims. Keep itinerary intent here. | Candidate title “48 Hours in San Francisco: A Weekend Itinerary.” Link car-free, stays, viewpoints and live cable-car article in relevant sections, not only footer. | 67 supplied query impressions; historical position 54.13 implies relevance/depth work before a snippet-only fix. |
| 7 / P2 | [Waikiki activities](https://n2getaways.com/things-to-do-in-waikiki-first-time-visitors/) | Choose activities for a first visit. Distinguish Waikiki from nearby Honolulu outings, verify Diamond Head reservations/access, clarify itinerary pacing and breakfast location. | Current title already fits; keep “Things to Do in Waikiki for First-Time Visitors.” Make description specific to checked activities and planning choices. Link hub, restaurant articles and live car-free guide. No forced “10 best” count. | Four impressions at 89.25 is weak evidence; prioritize usefulness and cluster paths rather than a claimed ranking win. |
| 9 / P2 | [Wailea lunch guide](https://n2getaways.com/best-lunch-spots-near-wailea-beach-resort-local-favorites-in-maui/) | Find lunch near a specific property. Verify each named venue's current location, lunch availability and distance; distinguish walkable from drive-required Kihei options and breakfast-only relevance. Ask owner to substantiate personal claims. | Keep “Lunch Near Wailea Beach Resort: Maui Food Guide” unless scope changes. Replace generic description with verified proximity/options, no invented minutes or “local favorite” authority. Link Maui hub, stays and live itinerary. | Only current Maui article; better reader fit before sending broader traffic into it. |
| 11 / P2 | [Springs activities](https://n2getaways.com/best-things-to-do-at-the-springs-resort-spa-at-arenal-costa-rica-guide/) | Plan actual activities and booking tradeoffs. Remove hero-image production note; verify current on-site vs off-site offerings, inclusions/fees and wildlife claims. Separate overview's stay decision from this article's activity logistics. | Retain “Things to Do at The Springs Resort, Arenal” if accurate. Description should name verified scope/inclusions distinction. Link overview, live transport and La Fortuna itinerary. | Fix a concrete published defect and reduce overlap after cluster additions exist. |

### Urgent maintenance outside the six-article cadence

- **P1 factual review before promoting either TSA page:** `/airports-without-tsa/` and `/how-to-get-through-tsa-faster/`. Preserve distinct policy-explainer vs screening-preparation intents. Verify or remove unsupported shutdown, wait-time and screening-procedure statements; retain an appropriately dated caution if needed. Don't simply change the year in a title. If content cannot be supported, propose a separate owner-reviewed correction, consolidation or retirement decision; no automatic redirects/noindex/removal in this plan.
- **P1 hub accuracy:** update Santorini's “one itinerary” and Fira-only framing to acknowledge Oia; adjust stale Maui/Costa Rica “coming soon” copy as real guides publish; fix Waikiki breakfast/lunch label mismatch. These are small navigation/copy maintenance tasks, not six new article rewrites.
- **P2 later:** SF lodging page promises “where to stay” but largely covers Union Square. Prefer expanding the existing URL into a clear area comparison or accurately narrowing its title, rather than publishing the proposed neighborhoods clone. Check source evidence and owner stays before hotel endorsements.
- **P2 later:** verify current venues and owner-experience basis on Eggs ’n Things and Lulu's reviews. No new generic Waikiki food roundup until those records are sound.
- **P3 utility pages:** review source-policy accuracy with owner. Keep the existing populated travel-stories/reviews collection as a navigation aid; its empty imported body does not mean its live page is empty. Do not launch filler stories to populate it.

Migration originals are checksum-protected by existing validation. Approved body edits will need explicit, reviewed provenance/baseline updates to the migration records rather than silently bypassing or disabling those checks. Preserve original source evidence and established permalinks.

## 5. Internal linking recommendations

Existing hub/card, related-reading and destination-backlink automation already supplies a crawlable baseline. The gap is **useful contextual body links**, not adding an arbitrary link quota. Avoid calling the articles orphaned when template links already reach them.

| Source | Destination / anchor idea | When |
|---|---|---|
| Springs overview arrival section | New transport guide — “compare San José and Liberia airport transfers” | After Week 1 publication; immediately pair with activities guide link |
| Springs activities booking/logistics section | Overview for stay decisions; new transfer guide for arrival; La Fortuna itinerary for off-property days | Only once each target is live |
| Costa Rica hub | Arrival planning → stay guide → activities → regional itinerary | Publish-order-aware; no empty categories or advertised drafts |
| Asheville weekend itinerary | Existing activities; stays guide; dining guide | Existing target after approved maintenance; future targets after release |
| Asheville activities | Weekend itinerary + stays/dining when relevant | As guides publish |
| SF itinerary | Existing car-free/stays/views guides; new cable-car/rainy-day pages at matching decisions | Existing targets in refresh; new targets after release |
| SF transport overview | Narrow cable-car detail; itinerary for route context | Avoid repeating all cable-car detail on both URLs |
| Waikiki food articles | Activities, transport and nearby location guidance | Location-specific context; no forced links to unrelated Maui food |
| Maui lunch | Maui hub and lodging/itinerary guides | Reciprocal links from Wailea sections after publication |
| Fira itinerary / Oia guide | Contextual links to each other and accurate Santorini hub | Existing live targets; do not make another Oia sunset article |
| Week 12 comparison | Existing hubs and the most relevant published support guides | No draft, proposed-topic or empty destination links |

Use descriptive natural anchors, not the exact target keyword on every link. On each approved release, check source and target HTTP/canonical behavior, draft isolation, role grouping and related reading. Do not link a queued permalink until publication is verified.

## 6. Workflow integration proposal — only after calendar approval

### Existing state and proposed queue changes

The queue has **22 records: two published and 20 proposed; no currently approved unpublished topics**. Preserve the published SF/Oia records, IDs, dates, branch reservations and research. Preserve unscheduled proposals. One Oia note still describes its historical drafting state/provisional image; a future editorial maintenance change may annotate that history, not rewrite the publication receipt.

Reuse **10 existing topic IDs**, with title/keyword/scope changes explicitly described in the weekly entries. Add the Week 9 rainy-day ID and Week 12 comparison ID after support for its category is reviewed. The existing SF budget topic remains proposed and outside the calendar. Proposed order is calendar sequence 1–12, not the current priority order. Do not assign different IDs merely to avoid existing branch/PR reservations.

Keep outside this calendar, still proposed: SF budget, SF neighborhoods (overlap hold), Maui airport transport and beach planning, Waikiki two-day itinerary (overlap review), Arenal park, Asheville scenic drives, and three broad Santorini proposals. Future performance or owner experience may justify them. No approved topic is overwritten by this proposal.

### Ordering and approval controls

The current selector filters for `approved`, date-eligible, unreserved items and then sorts by priority. **It can skip a reserved/in-progress earlier topic and choose a later one.** Dates and priorities alone therefore do not fully enforce the requested “do not skip ahead” behavior.

After approval, implement the smallest source-controlled extension: calendar ID/week/sequence and explicit predecessor publication gates, validated alongside existing queue fields. Treat the earliest unfinished calendar slot as a gate: if proposed, drafted, reserved, paused, missing prerequisites or not yet due, report that state and resume/wait; do not silently select a later calendar slot or unrelated backlog topic. A skip/reorder requires explicit owner authorization recorded in the calendar. Use a local-week eligibility rule in **America/Chicago** if dates are added; current selection uses a UTC date. No cron or scheduler required.

Before drafting, also verify and add only the necessary official source domains (resort, airports and actual transfer operators for Week 1; individual venues for dining) to the existing research allowlists. The Costa Rica allowlist currently includes tourism/park authorities but not the resort or airport/transfer operators. This is a proposed configuration change after approval, not a reason to invent sources or add services.

Until that change is reviewed and tested, the simplest safe operating practice is to approve **only the next slot** and leave all later ones proposed. A calendar approval should not silently turn all future entries into eligible topics. Recommend calendar approval authorizes planning/order, then per-topic approval authorizes drafting; neither authorizes publication. This calendar permits one primary article per week, with no second articles. Any future expansion requires a separately revised calendar, not a loophole in the gate.

Continue to say **“Draft the next approved N2Getaways topic.”** The assistant checks remote topic branches/PRs, resumes existing work rather than duplicating it, researches in this existing session, uses approved imagery or flags the need, validates SEO/links/Astro, and creates a draft PR. Preview remains public/noindex; article stays `draft: true`. Owner reviews and explicitly approves the article for publication. Only then update review fields/release date, remove draft state and merge the authorized release; verify production and sync the queue. Merging an unapproved draft must continue to leave it unpublished.

Required focused checks after integration: earliest slot blocks later selection; future and paused slots don't get bypassed; existing draft/closed PR reservation prevents duplicates and identifies resumable work; publication receipt unlocks successor; approval-to-draft never grants publication; production excludes drafts/previews. Reuse existing standard CI, Astro and GitHub/Cloudflare setup. No paid API, new subscription, scheduler or service.

## 7. Search Console exports to improve prioritization

No connection required. Export CSV or Google Sheets files; CSV files are sufficient. Record property, selected dates, filters and export date. Use **Search type: Web** and all countries/devices first. Keep periods separate so comparisons are interpretable.

1. **Performance → Search results:** export the supplied YTD period, the last 90 complete days and the preceding 90 days. Include Queries and Pages tabs with clicks, impressions, CTR and position. Exclude incomplete latest data and retain exact date ranges. If available, a same-period prior-year comparison can help with seasonality.
2. **Filter each priority URL exactly, then export its Queries table:** both Springs articles, Asheville weekend + attractions, SF weekend + lodging, Waikiki activities and Maui lunch. This identifies the actual page-query relationships and whether Springs interest is hotel stays, day passes or transfers.
3. **For overlap checking:** filter queries such as Springs, Asheville weekend/48 hours/2 days, Waikiki activities and SF lodging, then export Pages. Do multiple URLs receive impressions for the same decision? Shared terms alone are not proof of cannibalization.
4. **Device and country tabs** for the same periods, especially the Springs pages, to distinguish audience and mobile snippet needs.
5. **Indexing → Pages and Sitemaps:** export coverage reasons and examples; include sitemap submission/status. For priority URLs that look excluded, share URL Inspection details: Google-selected vs declared canonical, last crawl and indexing reason. Do not request indexing repeatedly as a substitute for correcting problems.

The standard UI export may limit rows; the filtered page exports are particularly useful. No API purchase, paid keyword tool or credentials needed. If “Springs traffic” came from analytics rather than Search Console, optionally supply that URL's source/medium and landing-page totals so direct/social visits are not counted as Google organic. Do not send visitor-level personal data.

## 8. Measurement and review points

Before Week 1, save the supplied baseline and export dates; record existing URL/query metrics separately from new URLs. Maintain a free local/GitHub tracking table with publication/update date, URL, target intent, approval PR, index status and 28-day impressions/clicks/CTR/position.

- **Week 4:** check published URL indexability/canonicals and initial impressions; address access/indexing problems before increasing output.
- **Week 8:** compare like-for-like 28-day windows for refreshed pages and new query relevance. Reorder only with owner approval; avoid reacting to a single click.
- **Week 12:** review cluster/page totals, impressions for relevant non-brand queries, clicks and useful inquiry outcomes if already measurable. Evaluate CTR within comparable query/position/device groups, not just sitewide.

Operational targets: up to 12 owner-approved primary releases, six reviewed article refreshes, no duplicate-intent new URLs, accurate source checks and working contextual links. These are capacity targets, not guaranteed traffic or rank gains. If research/imagery/approval is not ready, leave a slot open rather than publish filler. Search improvement can lag publication; newly migrated URLs and small samples limit causal claims.

## Approval requested

Approve or revise **the proposed order and scope**, particularly Springs transport first and the single cross-destination roundup. Confirm the preferred start week. No article, queue approval, calendar code change, website modification or scheduled execution is authorized merely by receiving this plan. After calendar approval, implement only the agreed workflow/queue changes and begin the first explicitly approved draft through the existing manual process.
