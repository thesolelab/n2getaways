import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
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
    "noindex",
  ])
    if (!html.includes(expected)) errors.push(`${p}: missing ${expected}`);
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
    !html.includes("Imported from WordPress") ||
    !html.includes("Migration review") ||
    html.includes("Editorial placeholder")
  )
    throw new Error(`Incorrect migration labeling: ${item.path}`);
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
if (
  !contact.includes("mailto:hello@n2getaways.com") ||
  !contact.includes("Open inquiry in email app")
)
  throw new Error("Missing inquiry recipient or email-app disclosure");
console.log(
  "PASS: migration paths, labels, heading structure, table of contents, and inquiry recipient.",
);
