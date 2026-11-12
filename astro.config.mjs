import { defineConfig } from "astro/config";
import { fileURLToPath } from "node:url";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
import { siteOrigin, isProduction, isReviewPath } from "./src/config/site.mjs";
export default defineConfig({
  site: siteOrigin,
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) =>
        !new URL(page).pathname.match(
          /\/(?:404(?:\.html|\/)?|_headers|_redirects|robots\.txt)$/,
        ) &&
        (!isProduction || !isReviewPath(new URL(page).pathname)),
    }),
  ],
  output: "static",
  vite: {
    resolve: {
      alias: [
        {
          find: "@formspree/ajax",
          replacement: fileURLToPath(
            new URL(
              "./node_modules/@formspree/ajax/dist/index.mjs",
              import.meta.url,
            ),
          ),
        },
      ],
    },
  },
  markdown: { processor: satteri({ features: { smartPunctuation: false } }) },
});
