import type { APIRoute } from "astro";
import {
  isProduction,
  productionOrigin,
  reviewRoots,
} from "../config/site.mjs";
export const GET: APIRoute = () =>
  new Response(
    isProduction
      ? [
          "User-agent: *",
          "Allow: /",
          ...reviewRoots.map((path) => `Disallow: ${path}`),
          `Sitemap: ${productionOrigin}/sitemap-index.xml`,
          "",
        ].join("\n")
      : "User-agent: *\nDisallow: /\n",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
