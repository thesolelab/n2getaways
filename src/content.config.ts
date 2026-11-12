import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    destination: z.string(),
    category: z.enum(["Travel guide", "Itinerary", "Travel story", "Review"]),
    image: z.enum(["italy", "japan", "portugal"]).optional(),
    imageAlt: z.string(),
    readTime: z.number(),
    placeholder: z.boolean(),
    sourceUrl: z.url().optional(),
    migrationReview: z.boolean().default(false),
    draft: z.boolean().default(false),
    publishDate: z.coerce.date(),
    permalink: z.string().regex(/^\/[a-z0-9/-]+\/$/),
  }),
});
export const collections = { articles };
