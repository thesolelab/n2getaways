import type { ImageMetadata } from "astro";
import italy from "./assets/italy.jpg";
import japan from "./assets/japan.jpg";
import portugal from "./assets/portugal.jpg";
import asheville from "./assets/asheville.jpg";
import sanFrancisco from "./assets/san-francisco.jpeg";
import received from "../docs/migration/received-media.json";
const files = import.meta.glob<{ default: ImageMetadata }>(
  "./assets/wordpress/*",
  { eager: true },
);
export const photos: Record<string, ImageMetadata> = {
  italy,
  japan,
  portugal,
  asheville,
  "san-francisco": sanFrancisco,
};
for (const item of Object.values(received)) {
  const file = files[`./assets/wordpress/${item.filename}`];
  if (!file) throw new Error(`Missing received image: ${item.filename}`);
  photos[item.key] = file.default;
}
