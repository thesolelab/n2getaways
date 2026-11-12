import { readFileSync } from "node:fs";
import { json, inventory, assert } from "./core.mjs";
const clusters = json("src/config/clusters.json"),
  queue = json("editorial/queue.json"),
  config = json("editorial/config.json"),
  inv = inventory();
let links = 0;
for (const [slug, c] of Object.entries(clusters)) {
  assert(
    config.destinations[c.name]?.path === `/destinations/${slug}/`,
    "Cluster hub/config mismatch",
  );
  assert(
    c.title.length <= 60 &&
      c.description.length >= 100 &&
      c.description.length <= 170,
    "Invalid cluster SEO copy",
  );
  const hub = readFileSync(`dist/destinations/${slug}/index.html`, "utf8");
  const published = inv.all.filter(
    (a) =>
      a.data.destination === c.name &&
      !a.data.draft &&
      !a.data.placeholder &&
      new Date(a.data.publishDate) <= new Date(),
  );
  assert(
    published.length > 0,
    "Do not present an empty cluster as a published guide",
  );
  for (const a of published) {
    assert(a.data.clusterRole, "Published cluster article needs a role");
    assert(
      hub.includes(`href="${a.data.permalink}"`),
      "Hub misses published supporting article",
    );
    const html = readFileSync(`dist${a.data.permalink}index.html`, "utf8");
    assert(
      html.includes(`href="/destinations/${slug}/"`),
      "Supporting article misses hub backlink",
    );
    links++;
  }
  assert(
    queue.filter((t) => t.destination === c.name && t.status === "proposed")
      .length >= 3,
    "Cluster needs at least three planned supporting topics",
  );
  for (const t of queue.filter(
    (t) =>
      t.destination === c.name && ["proposed", "approved"].includes(t.status),
  )) {
    if (t.permalink)
      assert(
        !hub.includes(`href="${t.permalink}"`),
        "Unpublished plan leaked into hub",
      );
  }
}
console.log(
  `PASS: ${Object.keys(clusters).length} live-content hubs; ${links} supporting-article backlinks; planned coverage separated from publication`,
);
