import { readFileSync } from "node:fs";
import { files, assert } from "./core.mjs";
let count = 0;
for (const file of files("dist").filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  const tags = [...html.matchAll(/<meta\s[^>]*>/g)].map((m) =>
    Object.fromEntries(
      [...m[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]),
    ),
  );
  const value = (k) =>
    tags.find((t) => t.name === k || t.property === k)?.content;
  for (const k of [
    "description",
    "og:title",
    "og:description",
    "og:url",
    "og:image",
    "og:image:alt",
    "og:site_name",
    "og:locale",
    "twitter:title",
    "twitter:description",
    "twitter:image",
    "twitter:image:alt",
  ])
    assert(value(k), `${file}: missing ${k}`);
  assert(
    value("description") === value("og:description") &&
      value("description") === value("twitter:description"),
    `${file}: inconsistent descriptions`,
  );
  assert(
    value("og:image") === value("twitter:image"),
    `${file}: inconsistent social images`,
  );
  const canonical = html.match(
    /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/,
  )[1];
  assert(
    value("og:url") === canonical,
    `${file}: inconsistent canonical/OG URL`,
  );
  const nodes = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ].flatMap((m) => {
    const d = JSON.parse(m[1]);
    return d["@graph"] || [d];
  });
  for (const type of ["Organization", "WebSite", "ImageObject"])
    assert(
      nodes.some((n) => n["@type"] === type),
      `${file}: missing ${type}`,
    );
  const article = nodes.find((n) => n["@type"] === "BlogPosting");
  if (article) {
    assert(
      nodes.some((n) => n["@type"] === "BreadcrumbList"),
      `${file}: missing breadcrumb data`,
    );
    assert(
      article.mainEntityOfPage["@id"] === canonical + "#webpage",
      `${file}: article/page identity mismatch`,
    );
    assert(
      article.publisher["@id"].endsWith("/#organization"),
      `${file}: publisher identity missing`,
    );
    if (
      html.includes("data-editorial-topic=") &&
      html.includes("Unpublished editorial draft")
    )
      assert(
        !article.datePublished && !article.dateModified,
        `${file}: draft claims publication`,
      );
  }
  count++;
}
console.log(
  `PASS: ${count} pages with aligned SEO/social metadata, safe JSON-LD and publication identities`,
);
