import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
export default defineConfig({
  site: process.env.SITE_URL || "https://n2getaways.com",
  trailingSlash: "always",
  integrations: [sitemap()],
  output: "static",
});
