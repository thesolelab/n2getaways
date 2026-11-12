# Destination content clusters

The destination landing pages are the hubs. Existing articles are the supporting coverage; additional topics are proposals in the editorial queue. Only published articles appear on hubs or in related-reading links.

| Hub           | Existing supporting coverage                   | Next supporting topics proposed                                                                      |
| ------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| San Francisco | Weekend itinerary, where to stay, scenic views | Budget, neighborhood selection, cable-car planning. Car-free transport guide is an unapproved draft. |
| Maui          | Wailea-area lunch                              | Reservation planning, five-day itinerary, where to stay, transport, responsible beach planning       |
| Waikiki       | First-visit things to do, breakfast, lunch     | Two-day itinerary, where to stay, car-free transport                                                 |
| Costa Rica    | Arenal resort overview and resort activities   | La Fortuna itinerary, getting to La Fortuna, Arenal National Park planning                           |
| Asheville     | Weekend itinerary and things to do             | Where to stay, food planning, scenic drives and access                                               |
| Santorini     | Fira itinerary                                 | Fira versus Oia, transport, seasonal trip planning                                                   |

`src/config/clusters.json` controls each hub's SEO title, description, introductory guidance, scope and image alt text. `clusterRole` on articles controls grouping: planning, itineraries, food, stays, experiences. Hubs show only nonempty groups. The existing original destination copy remains intact below the collection. Supporting articles link back to the hub and offer up to three existing same-destination articles. The external airport/TSA archive remains outside these six destination clusters.

This is an honest foundation for a growing cluster: a hub and internal links are implemented, while missing subjects are explicitly future editorial work. Existing coverage is not presented as a complete destination encyclopedia. Queue additions are proposed, not approved; the owner chooses which topics become eligible. Once approved articles are published, their hub group and related-reading links update from the content collection without hand-editing navigation.

All existing public URLs are retained. Do not change old URLs just for keyword placement. New articles should address distinct search intent and link to relevant existing supporting guides instead of repeating them. Review the existing coverage and record overlap analysis before drafting.

Metadata uses readable titles/descriptions, canonical URLs, Open Graph and X/Twitter fields with descriptive image text, optimized social images, publisher/website/page identities, visible article breadcrumbs and matching BreadcrumbList data. Article data includes category, destination, real source citations when available, and real publication/update dates only. The editorial byline is the publication name, not a fabricated traveler. Existing imported prose and original publication dates are preserved.

Google's AI search guidance says no special AI markup is required: https://developers.google.com/search/docs/appearance/ai-features . Crawlable useful content and reliable source attribution support interpretation, not guaranteed rankings or citations. No paid AI API, new scheduled workflow or crawler-policy change is part of this cluster work.
