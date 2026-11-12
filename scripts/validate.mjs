import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, relative, sep } from "node:path";
import {
  isProduction,
  isReviewPath,
  productionOrigin,
} from "../src/config/site.mjs";
const root = resolve("dist");
let pages = [];
function walk(p) {
  for (const f of readdirSync(p, { withFileTypes: true })) {
    const q = join(p, f.name);
    if (f.isDirectory()) walk(q);
    else if (q.endsWith(".html")) pages.push(q);
  }
}
walk(root);
const errors = [];
for (const p of pages) {
  const html = readFileSync(p, "utf8");
  for (const expected of [
    "<title>",
    'rel="canonical"',
    'name="description"',
    'property="og:image"',
    "application/ld+json",
  ])
    if (!html.includes(expected)) errors.push(`${p}: missing ${expected}`);
  const route =
    p === join(root, "index.html")
      ? "/"
      : "/" +
        relative(root, p)
          .split(sep)
          .join("/")
          .replace(/index\.html$/, "");
  const expectedNoindex = !isProduction || isReviewPath(route);
  if (
    !html.includes(
      `name="robots" content="${expectedNoindex ? "noindex, nofollow" : "index, follow"}"`,
    )
  )
    errors.push(`${p}: incorrect indexing mode`);
  if (
    isProduction &&
    !isReviewPath(route) &&
    (html.includes("Development preview") ||
      html.includes("Private migration preview") ||
      html.includes("Review original WordPress page copy"))
  )
    errors.push(`${p}: preview UI leaked into production`);
  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const url = m[1];
    if (url.startsWith("//")) continue;
    const target = join(root, url);
    if (!existsSync(target) && !existsSync(join(target, "index.html")))
      errors.push(`${p}: broken local URL ${url}`);
  }
}
for (const p of [
  "index.html",
  "404.html",
  "destinations/italy/index.html",
  "guides/italian-riviera/index.html",
  "sitemap-index.xml",
  "robots.txt",
])
  if (!existsSync(join(root, p))) errors.push(`Missing ${p}`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `PASS: ${pages.length} HTML pages; local links/assets; SEO metadata; noindex safeguards; sitemap; representative templates.`,
);

const pilot = JSON.parse(readFileSync("docs/migration/pilot.json", "utf8"));
for (const item of pilot.imported) {
  const html = readFileSync(join(root, item.path, "index.html"), "utf8");
  if (
    !isProduction &&
    (!html.includes("Imported from WordPress") ||
      !html.includes("Migration review") ||
      html.includes("Editorial placeholder"))
  )
    throw new Error(`Incorrect migration labeling: ${item.path}`);
  if (
    isProduction &&
    (html.includes("Imported from WordPress · Review copy") ||
      html.includes("Migration review —"))
  )
    throw new Error(`Preview article labels in production: ${item.path}`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1)
    throw new Error(`Expected one h1: ${item.path}`);
  if (
    html.includes("wp:image") ||
    html.includes("wp-block-") ||
    html.includes('src="http://n2getaways.com')
  )
    throw new Error(`Unconverted WordPress markup: ${item.path}`);
  const tocLinks = [...html.matchAll(/href="#([^"]+)"/g)]
    .map((m) => m[1])
    .filter((id) => id !== "main");
  if (!tocLinks.length || tocLinks.some((id) => !html.includes(`id="${id}"`)))
    throw new Error(`Broken migration table of contents: ${item.path}`);
}
const contact = readFileSync(join(root, "contact/index.html"), "utf8");
const direct = Boolean(
  process.env.PUBLIC_FORMSPREE_FORM_ID ||
  JSON.parse(readFileSync("src/config/inquiry.json", "utf8")).formspreeFormId,
);
if (
  !contact.includes("mailto:hello@n2getaways.com") ||
  !contact.includes(direct ? "Send inquiry" : "Open inquiry in email app")
)
  throw new Error("Missing inquiry recipient or correct delivery-mode label");
if (
  direct &&
  (!contact.includes("https://formspree.io/f/") ||
    !contact.includes('name="_gotcha"') ||
    !contact.includes("data-fs-success") ||
    !contact.includes("data-fs-error"))
)
  throw new Error(
    "Direct inquiry form is missing its endpoint, spam field or feedback states",
  );
console.log(
  "PASS: migration paths, labels, heading structure, table of contents, and inquiry recipient.",
);

const robots = readFileSync(join(root, "robots.txt"), "utf8");
const headers = readFileSync(join(root, "_headers"), "utf8");
const globalHeaders = headers.split("\n\n")[0];
if (isProduction) {
  if (
    robots.includes("Disallow: /\n") ||
    !robots.includes(`Sitemap: ${productionOrigin}/sitemap-index.xml`)
  )
    throw new Error("Incorrect production robots output");
  if (globalHeaders.includes("X-Robots-Tag"))
    throw new Error("Production globally blocks indexing");
  if (
    !headers.includes("https://:project.pages.dev/*") ||
    !headers.includes("https://:version.:project.pages.dev/*")
  )
    throw new Error("Missing pages.dev indexing protections");
  const sitemap = readFileSync(join(root, "sitemap-0.xml"), "utf8");
  for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g))
    if (isReviewPath(new URL(match[1]).pathname))
      throw new Error("Review route leaked into production sitemap");
} else if (
  !robots.includes("Disallow: /") ||
  !globalHeaders.includes("X-Robots-Tag: noindex")
)
  throw new Error("Preview indexing protections missing");
console.log(
  `PASS: ${isProduction ? "production" : "preview"} indexing mode, robots, response-header rules and sitemap scope.`,
);
