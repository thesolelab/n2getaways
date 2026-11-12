import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { satteri } from "@astrojs/markdown-satteri";
export default defineConfig({
  site: process.env.SITE_URL || "https://n2getaways.com",
  trailingSlash: "always",
  integrations: [sitemap()],
  output: "static",
  markdown: { processor: satteri({ features: { smartPunctuation: false } }) },
});
