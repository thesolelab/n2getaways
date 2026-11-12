import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";
const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    excerpt: z.string().optional(),
    editorialTopicId: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    targetKeyword: z.string().optional(),
    description: z.string(),
    destination: z.string(),
    clusterRole: z
      .enum(["planning", "itineraries", "food", "stays", "experiences"])
      .optional(),
    category: z.enum(["Travel guide", "Itinerary", "Travel story", "Review"]),
    image: z
      .string()
      .regex(/^[a-z0-9-]+$/)
      .optional(),
    imageDisplay: z.enum(["cover", "full"]).default("cover"),
    imageAlt: z.string(),
    readTime: z.number(),
    placeholder: z.boolean(),
    sourceUrl: z.url().optional(),
    migrationReview: z.boolean().default(false),
    reviewNotes: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    permalink: z.string().regex(/^\/[a-z0-9/-]+\/$/),
  }),
});
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    displayTitle: z.string(),
    description: z.string(),
    permalink: z.string().regex(/^\/(?:[a-z0-9/-]+\/)?$/),
    sourceUrl: z.url(),
    migrationReview: z.literal(true),
    reviewNotes: z.array(z.string()).default([]),
  }),
});
export const collections = { articles, pages };
