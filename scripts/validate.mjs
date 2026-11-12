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
