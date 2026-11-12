import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { isProduction } from "../../src/config/site.mjs";
import { inventory, assert } from "./core.mjs";
const sitemap = readFileSync("dist/sitemap-0.xml", "utf8");
for (const a of inventory().all.filter(
  (a) => a.data.editorialTopicId && a.data.draft,
)) {
  assert(
    !existsSync(join("dist", a.data.permalink, "index.html")),
    `Draft leaked to public article route: ${a.data.permalink}`,
  );
  assert(!sitemap.includes(a.data.permalink), "Draft leaked into sitemap");
  const path = `dist/editorial-preview/${a.data.editorialTopicId}/index.html`;
  assert(
    existsSync(path) !== isProduction,
    "Incorrect branch-only preview behavior",
  );
  if (!isProduction)
    assert(
      readFileSync(path, "utf8").includes(
        'name="robots" content="noindex, nofollow"',
      ),
      "Draft preview must be noindex",
    );
  const home = readFileSync("dist/index.html", "utf8");
  assert(!home.includes(a.data.permalink), "Draft leaked into homepage");
}
console.log(
  `PASS: editorial drafts excluded from discovery/public routes; ${isProduction ? "production excludes" : "branch build includes"} review previews`,
);
