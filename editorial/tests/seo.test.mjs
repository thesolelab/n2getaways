import test from "node:test";
import assert from "node:assert/strict";
import { structuredGraph, jsonLD } from "../../src/seo.ts";
const input = {
  origin: "https://n2getaways.com",
  path: "/guide/",
  title: "A useful guide",
  description: "A researched travel guide",
  image: {
    src: "/photo.jpg",
    alt: "Actual visible subject",
    width: 1200,
    height: 630,
  },
  breadcrumbs: [
    { name: "Home", path: "/" },
    { name: "Guide", path: "/guide/" },
  ],
};
test("structured data ties page, publisher, image, breadcrumb and cited article together", () => {
  const graph = structuredGraph({
    ...input,
    article: {
      headline: "Visible article heading",
      destination: "San Francisco",
      category: "Travel guide",
      publishDate: new Date("2026-11-12"),
      draft: false,
      placeholder: false,
      publicationByline: true,
      sources: ["https://www.sfmta.com/visitors"],
    },
  })["@graph"];
  const article = graph.find((n) => n["@type"] === "BlogPosting");
  assert.equal(
    article.mainEntityOfPage["@id"],
    "https://n2getaways.com/guide/#webpage",
  );
  assert.equal(article.about.name, "San Francisco");
  assert.equal(article.author.name, "N2Getaways");
  assert.equal(article.datePublished, "2026-11-12T00:00:00.000Z");
  assert.equal(article.dateModified, undefined);
  assert.equal(article.citation[0].url, "https://www.sfmta.com/visitors");
  const crumbs = graph.find(
    (n) => n["@type"] === "BreadcrumbList",
  ).itemListElement;
  assert.equal(crumbs[1].item, "https://n2getaways.com/guide/");
  assert.equal(graph.find((n) => n["@type"] === "ImageObject").width, 1200);
});
test("drafts and placeholders do not claim publication; unknown archive author and update dates are omitted", () => {
  for (const flags of [
    { draft: true, placeholder: false },
    { draft: false, placeholder: true },
  ]) {
    const graph = structuredGraph({
      ...input,
      article: {
        headline: "Draft",
        destination: "Maui",
        category: "Itinerary",
        publishDate: new Date("2026-11-12"),
        updatedDate: new Date("2026-11-13"),
        ...flags,
      },
    })["@graph"];
    const a = graph.find((n) => n["@type"] === "BlogPosting");
    assert.equal(a.datePublished, undefined);
    assert.equal(a.dateModified, undefined);
    assert.equal(a.author, undefined);
  }
});
test("JSON-LD serialization cannot break out of its script element", () => {
  const text = jsonLD({ headline: "</script><script>alert(1)</script>" });
  assert.equal(text.includes("</script>"), false);
  assert.equal(JSON.parse(text).headline, "</script><script>alert(1)</script>");
});
