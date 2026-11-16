# La Fortuna draft: owner review notes

**Draft only. Do not merge or publish.** Original source text is archived unchanged in `editorial/sources/la-fortuna-transport.txt`; its SHA-256 and every adaptation are recorded in the JSON research record.

## What changed

- Exact supplied title moved to Astro frontmatter; duplicate Markdown H1 removed. Original subtitle, H2/H3 structure and narrative retained.
- Three expressly requested clarifications: SJO + private transportation in the introduction, private-transfer section and conclusion.
- Existing airport/route/road-safety/shared-shuttle/property phrases linked to opened primary references. No exact bus departures, prices, driver/provider identity or travel dates invented.
- Two absolute N2Getaways article links converted to existing local permalinks; Costa Rica hub link added.
- A visible research/firsthand distinction and contextual-photo disclosure added. No other narrative sections rewritten. Original travel-time numbers and route descriptions remain unchanged for draft review, not represented as verified.

## Proposed SEO metadata

The supplied article includes its title and subtitle but no standalone SEO metadata block. These fields are proposed, not represented as already approved:

- SEO title: Getting to La Fortuna: San José vs. Liberia & Transfers
- Description: Compare San José and Liberia for getting to La Fortuna, with private transfers, shared shuttles, rental cars, and my experience arriving through SJO.
- Permalink: `/getting-to-la-fortuna-costa-rica/`
- Primary keyword: `getting to La Fortuna` (existing approved calendar keyword).
- Excerpt: I flew into SJO and booked private transportation to La Fortuna. Here’s how to compare airports and choose transport that fits your trip.

## Verification and photography

Airport-owned pages support SJO’s Alajuela address and LIR’s identity/branding. The resort supports its approximately 20-minute town-to-property estimate. RideCR advertises SJO/LIR–Arenal shared routes and asks for exact pickup/drop-off confirmation; it is a researched reference, not an owner-identified provider. Government road guidance supports general caution, not current condition of a specific road. The older resort return-route PDF supports a San Ramón corridor, not current journey times, tolls or optimal navigation.

Proposed cover: existing owner-supplied `arenal-view`, shown in full composition and labeled destination context. The file already has provenance/checksum inventory. No new photography is fetched, generated or attributed to an unknown photographer. An original photo from the actual SJO arrival or transfer would be more specific if available; it can be supplied through the existing upload workflow.

## Required confirmations before publication

- **visit-date**: What month/year was the SJO private-transfer visit? No visit date is supplied; do not infer it from publication/check dates.
- **drive-time-ranges**: Original 2.5–3.5 h SJO / 2.5–3.5+ h LIR ranges and repeated approximately-three-hour claims are preserved, but not independently substantiated as current general ranges by the opened primary sources. Confirm route/date estimates with accommodation or provider before publication; distinguish drive-only from flight arrival, immigration, baggage, pickup wait and resort drop-off. Suggested alternative for approval: several hours, with a current provider estimate rather than a fixed optimistic lower bound.
- **liberia-route**: Original Cañas–Tilarán–Lake Arenal route description is preserved, but current primary-source routing/road status was not established. Owner explicitly has not taken this route. Confirm current routing with a provider or approve a less prescriptive wording; do not treat it as a tested route.
- **road-observations**: The owner-approved source says unfinished road sections were observed firsthand. Confirm the visit period/context; distinguish historic personal observations from the article’s generalized present-tense road claims. Government guidance supports broad caution, not that a particular airport road is unfinished today.
- **service-availability**: Confirm travel-date pickup location, resort drop-off, luggage/fees and flight-delay terms. RideCR is a researched example, not the owner’s identified driver; no operator name, booking date or price has been invented. Public-bus connections and the Liberia driving corridor remain to be confirmed; do not imply direct airport buses. Original general cost comparisons and 4x4 advice are conditional, not quoted tariffs or road guarantees.
- **seo-metadata**: Uploaded article contained title and subtitle but no standalone approved SEO title, description or slug. Exact article title is retained; SEO title, description, excerpt and /getting-to-la-fortuna-costa-rica/ are proposed for owner review.
- **photography**: Proposed contextual cover is existing owner-supplied arenal-view, shown uncropped with a context caption. Approve this reuse or supply a route/arrival photograph using the existing upload workflow. No licensed or location-specific image has been invented.

The owner explicitly approved using the supplied text as source and confirmed personal SJO arrival/private transportation. That does not approve release; review.approved remains false and all publication review checkboxes remain false. Unknown visit date is allowed only in a draft; unresolved confirmation items block publication. Resolve with evidence or an explicitly owner-approved correction, then rerun validation.

## Source-to-draft diff

```diff
--- Owner-supplied original
+++ Astro article body
@@ -1,4 +1,6 @@
-# Getting to La Fortuna, Costa Rica: San José vs. Liberia and Your Transportation Options
+*A researched planning guide checked November 16, 2026, with my own SJO arrival and private-transfer experience. I have not personally taken the Liberia route; current service details and driving conditions should be reconfirmed before travel.*
+
+*Cover photograph: Arenal Volcano viewed from The Springs Resort; destination context, not a photograph of the airport-transfer route.*
 
 *Flying into Costa Rica and heading to La Fortuna? Here's what you should know about choosing an airport, arranging transportation, and navigating the journey to the Arenal region.*
 
@@ -8,7 +10,7 @@
 
 One of the first decisions you'll face is whether to fly into San José or Liberia. Both airports can get you to La Fortuna, but your flight schedule, travel plans, and transportation preferences can make one more convenient than the other.
 
-**When I visited La Fortuna, I flew into San José (SJO) and arranged transportation rather than renting a car.** Having someone familiar with the roads handle the drive made the journey much easier, especially after traveling internationally.
+**When I visited La Fortuna, I flew into San José (SJO) and booked private transportation to La Fortuna rather than renting a car.** Having someone familiar with the roads handle the drive made the journey much easier, especially after traveling internationally.
 
 And after seeing the road conditions firsthand, it's an approach I'd recommend considering if you're visiting Costa Rica for the first time.
 
@@ -26,8 +28,8 @@
 
 Most international visitors fly into one of two airports:
 
-- **Juan Santamaría International Airport (SJO):** Located in Alajuela, near San José.
-- **Guanacaste Airport (LIR):** Located near Liberia in northwestern Costa Rica.
+- **[Juan Santamaría International Airport (SJO)](https://www.sjoairport.com/contacts/?lang=en):** Located in Alajuela, near San José.
+- **[Guanacaste Airport (LIR)](https://www.guanacasteairport.com/en/about-us):** Located near Liberia in northwestern Costa Rica.
 
 Neither airport is particularly close to La Fortuna, so you'll need to arrange ground transportation for the final part of your journey.
 
@@ -40,7 +42,7 @@
 | | San José (SJO) | Liberia (LIR) |
 |---|---|---|
 | Approximate drive | 2.5–3.5 hours | 2.5–3.5+ hours |
-| Common route | Through San Ramón | Through Cañas and Tilarán |
+| Common route | Through [San Ramón](https://www.thespringscostarica.com/wp-content/uploads/2020/09/DESDE-THE-SPRINGS-AL-JUAN-SANTAMARIA.pdf) | Through Cañas and Tilarán |
 | Transportation options | Private transfers, shuttles, rental cars, buses | Private transfers, shuttles, rental cars, buses |
 | Good for combining with | Central Costa Rica destinations | Guanacaste and Pacific beaches |
 | Something to consider | Traffic around the Central Valley | Winding roads near Lake Arenal |
@@ -141,7 +143,7 @@
 
 If convenience is your priority, I'd start by looking at private transportation.
 
-This is the approach I took when visiting La Fortuna, and it's the one I'd seriously consider again.
+I booked private transportation from SJO to La Fortuna, and it's the approach I'd seriously consider again.
 
 With a private transfer, you arrange transportation in advance and travel directly to your accommodation.
 
@@ -157,7 +159,7 @@
 
 ### 2. Shared shuttle: A practical middle ground
 
-If you'd rather not drive but want something more budget-friendly than a private transfer, consider a shared shuttle.
+If you'd rather not drive but want something more budget-friendly than a private transfer, consider a [shared shuttle](https://ridecr.com/shuttle/).
 
 These services transport multiple travelers along established routes, usually with scheduled departure times.
 
@@ -179,7 +181,7 @@
 
 However, I'd approach this option with some caution.
 
-**Driving in Costa Rica isn't something I'd recommend taking lightly if you're unfamiliar with the roads.**
+**[Driving in Costa Rica](https://travel.gc.ca/destinations/costa-rica) isn't something I'd recommend taking lightly if you're unfamiliar with the roads.**
 
 During my trip, I saw firsthand how unfinished road sections could make travel uncomfortable. Rain only adds another challenge, particularly when visibility is reduced.
 
@@ -231,7 +233,7 @@
 
 The resort is located outside downtown La Fortuna, overlooking the surrounding Arenal region.
 
-According to the property, it's approximately a 20-minute drive from the town center.
+According to [the property](https://www.thespringscostarica.com/contact/), it's approximately a 20-minute drive from the town center.
 
 That means reaching La Fortuna doesn't necessarily mean you've reached your accommodation.
 
@@ -239,7 +241,7 @@
 
 If you're using a shared shuttle, confirm whether it serves the property directly or requires a separate ride.
 
-For more information about the resort, check out my [guide to The Springs Resort & Spa at Arenal](https://n2getaways.com/the-springs-resort-spa-at-arenal-a-luxury-escape-in-la-fortuna-costa-rica/) and my breakdown of the [best things to do at The Springs Resort](https://n2getaways.com/best-things-to-do-at-the-springs-resort-spa-at-arenal-costa-rica-guide/).
+For more information about the resort, check out my [guide to The Springs Resort & Spa at Arenal](/the-springs-resort-spa-at-arenal-a-luxury-escape-in-la-fortuna-costa-rica/) and my breakdown of the [best things to do at The Springs Resort](/best-things-to-do-at-the-springs-resort-spa-at-arenal-costa-rica-guide/).
 
 ## A Few Things I'd Recommend Before Traveling to La Fortuna
 
@@ -303,7 +305,7 @@
 
 La Fortuna is absolutely worth including on a Costa Rica itinerary, but getting there is one part of the trip I'd recommend planning ahead.
 
-For my visit, flying into San José and arranging transportation worked well. I didn't have to worry about navigating unfamiliar roads, and I could enjoy the journey instead of concentrating on every turn.
+For my visit, flying into San José and booking private transportation to La Fortuna worked well. I didn't have to worry about navigating unfamiliar roads, and I could enjoy the journey instead of concentrating on every turn.
 
 After seeing some of the road conditions, particularly the unfinished sections that can become unpleasant in the rain, I'm glad I made that decision.
 
@@ -313,4 +315,6 @@
 
 **My biggest piece of advice? Choose the transportation option that lets you start your La Fortuna getaway feeling relaxed rather than exhausted.**
 
-You'll have plenty of opportunities for adventure once you arrive.+You'll have plenty of opportunities for adventure once you arrive.
+
+Explore the [Costa Rica destination guides](/destinations/costa-rica/) for more Arenal and La Fortuna planning.
```
