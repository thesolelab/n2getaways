import { getCollection } from "astro:content";
import italy from "./assets/italy.jpg";
import japan from "./assets/japan.jpg";
import portugal from "./assets/portugal.jpg";
import asheville from "./assets/asheville.jpg";
import sanFrancisco from "./assets/san-francisco.jpeg";
export const photos = {
  italy,
  japan,
  portugal,
  asheville,
  "san-francisco": sanFrancisco,
};
export const destinations = [
  {
    slug: "italy",
    name: "Italy",
    region: "Europe",
    line: "Coastal roads, timeless cities, and the art of slowing down.",
  },
  {
    slug: "japan",
    name: "Japan",
    region: "Asia",
    line: "Quiet gardens, bright cities, and journeys between them.",
  },
  {
    slug: "portugal",
    name: "Portugal",
    region: "Europe",
    line: "Atlantic horizons, tiled streets, and a slower rhythm.",
  },
] as const;
export const getArticles = async () =>
  (
    await getCollection(
      "articles",
      ({ data }) => !data.draft && data.publishDate <= new Date(),
    )
  ).sort(
    (a, b) =>
      Number(a.data.placeholder) - Number(b.data.placeholder) ||
      b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );
