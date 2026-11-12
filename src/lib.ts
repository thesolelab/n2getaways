import { getCollection } from "astro:content";
import { photos } from "./media";
export { photos };
export const destinations = [
  {
    slug: "san-francisco",
    name: "San Francisco",
    region: "California",
    line: "Explore one of California’s most iconic cities with simple travel guides, local food spots, and easy itineraries.",
    image: "golden-gate",
  },
  {
    slug: "maui",
    name: "Maui",
    region: "Hawaii",
    line: "Travel guides, local food recommendations, and island inspiration.",
    image: "maui-food",
  },
  {
    slug: "costa-rica",
    name: "Costa Rica",
    region: "Central America",
    line: "Resort recommendations, natural beauty, and outdoor experiences.",
    image: "arenal-view",
  },
  {
    slug: "waikiki",
    name: "Waikiki",
    region: "Hawaii",
    line: "Beachfront energy, food finds, and Honolulu travel guides.",
    image: "diamond-head",
  },
  {
    slug: "asheville",
    name: "Asheville",
    region: "North Carolina",
    line: "Weekend itineraries and things to do from the N2Getaways archive.",
    image: "asheville",
  },
  {
    slug: "santorini",
    name: "Santorini",
    region: "Greece",
    line: "An original N2Getaways itinerary for a stay in Fira.",
    image: "santorini-sunset",
  },
] satisfies Array<{
  slug: string;
  name: string;
  region: string;
  line: string;
  image?: keyof typeof photos;
}>;
export const sampleDestinations = [
  {
    slug: "italy",
    name: "Italy",
    region: "Europe",
    line: "Coastal roads, timeless cities, and the art of slowing down.",
    image: "italy",
  },
  {
    slug: "japan",
    name: "Japan",
    region: "Asia",
    line: "Quiet gardens, bright cities, and journeys between them.",
    image: "japan",
  },
  {
    slug: "portugal",
    name: "Portugal",
    region: "Europe",
    line: "Atlantic horizons, tiled streets, and a slower rhythm.",
    image: "portugal",
  },
] satisfies Array<{
  slug: string;
  name: string;
  region: string;
  line: string;
  image?: keyof typeof photos;
}>;
export const getArticles = async (includeSamples = false) =>
  (
    await getCollection(
      "articles",
      ({ data }) =>
        !data.draft &&
        data.publishDate <= new Date() &&
        (includeSamples || !data.placeholder),
    )
  ).sort(
    (a, b) =>
      Number(a.data.placeholder) - Number(b.data.placeholder) ||
      b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );
export const getSourcePage = async (path: string) => {
  const page = (await getCollection("pages")).find(
    (p) => p.data.permalink === path,
  );
  if (!page) throw new Error(`Missing imported page: ${path}`);
  return page;
};
export const destinationPath = (name: string) => {
  const d = [...destinations, ...sampleDestinations].find(
    (d) => d.name === name,
  );
  return d ? `/destinations/${d.slug}/` : "/travel-guides/";
};
