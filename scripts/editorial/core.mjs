import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse, stringify } from "yaml";
export const root = process.cwd();
export const json = (p) => JSON.parse(readFileSync(p, "utf8"));
export const config = () => json("editorial/config.json");
export function assert(ok, message) {
  if (!ok) throw new Error(message);
}
export function markdown(file) {
  const raw = readFileSync(file, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  assert(match, `Invalid frontmatter: ${file}`);
  return { file, data: parse(match[1]), body: match[2] };
}
export function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
  );
}
export function inventory() {
  const all = files("src/content")
    .filter((p) => p.endsWith(".md"))
    .map(markdown);
  const routes = new Set([
    "/",
    "/about/",
    "/contact/",
    "/privacy-policy/",
    "/travel-guides/",
    "/travel-stories/",
    "/destinations/",
  ]);
  for (const item of all)
    if (
      !item.data.draft &&
      !item.data.placeholder &&
      new Date(item.data.publishDate || 0) <= new Date()
    )
      routes.add(item.data.permalink);
  for (const d of Object.values(config().destinations)) routes.add(d.path);
  return { all, routes };
}
export function validateQueue(queue) {
  const ids = new Set();
  for (const t of queue) {
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.id), "Invalid topic id");
    assert(!ids.has(t.id), `Duplicate topic id: ${t.id}`);
    ids.add(t.id);
    for (const k of ["title", "destination", "targetKeyword"])
      assert(
        typeof t[k] === "string" && t[k].trim(),
        `Topic ${t.id} needs ${k}`,
      );
    assert(
      config().destinations[t.destination],
      `Destination not represented: ${t.destination}`,
    );
    if (t.clusterRole)
      assert(
        ["planning", "itineraries", "food", "stays", "experiences"].includes(
          t.clusterRole,
        ),
        `Invalid cluster role: ${t.id}`,
      );
    assert(
      Number.isInteger(t.priority) && t.priority > 0,
      `Invalid priority: ${t.id}`,
    );
    assert(
      ["proposed", "approved", "drafted", "published", "paused"].includes(
        t.status,
      ),
      `Invalid status: ${t.id}`,
    );
    if (t.notBefore)
      assert(
        /^\d{4}-\d{2}-\d{2}$/.test(t.notBefore) &&
          !isNaN(Date.parse(t.notBefore)),
        "Invalid eligibility date",
      );
  }
}
export const normalized = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
export function selectTopic(
  queue,
  articles,
  reserved = [],
  today = new Date().toISOString().slice(0, 10),
) {
  validateQueue(queue);
  return queue
    .filter(
      (t) =>
        t.status === "approved" &&
        (!t.notBefore || t.notBefore <= today) &&
        !reserved.includes(t.id) &&
        !articles.some(
          (a) =>
            a.data.editorialTopicId === t.id ||
            normalized(a.data.title) === normalized(t.title) ||
            normalized(a.data.targetKeyword || "") ===
              normalized(t.targetKeyword),
        ),
    )
    .sort((a, b) => a.priority - b.priority || a.id.localeCompare(b.id))[0];
}
export function officialURL(url, domains) {
  try {
    const u = new URL(url);
    return (
      u.protocol === "https:" &&
      !u.username &&
      !u.password &&
      domains.some((d) => u.hostname === d || u.hostname.endsWith("." + d))
    );
  } catch {
    return false;
  }
}
export function knownImages() {
  const received = json("docs/migration/received-media.json");
  return new Set([
    "maui-coast",
    "italy",
    "japan",
    "portugal",
    "asheville",
    "san-francisco",
    "sf-painted-ladies",
    ...Object.values(received).map((x) => x.key),
  ]);
}
export function validateDraft(
  data,
  body,
  note,
  { routes, all },
  { publishing = false } = {},
) {
  assert(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.editorialTopicId),
    "Missing valid topic identifier",
  );
  const topic = json("editorial/queue.json").find(
    (t) => t.id === data.editorialTopicId,
  );
  assert(
    topic && topic.destination === data.destination,
    "Topic/destination mismatch",
  );
  assert(data.permalink === `/${note.slug}/`, "Permalink/slug mismatch");
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(note.slug), "Unsafe slug");
  assert(
    !routes.has(data.permalink) ||
      all.some(
        (a) =>
          a.data.editorialTopicId === data.editorialTopicId &&
          a.data.permalink === data.permalink,
      ),
    "Slug collides with an existing page",
  );
  assert(
    !all.some(
      (a) =>
        a.data.editorialTopicId !== data.editorialTopicId &&
        a.data.permalink === data.permalink,
    ),
    "Duplicate article route",
  );
  for (const [k, min, max] of [
    ["title", 20, 110],
    ["seoTitle", 20, 65],
    ["description", 100, 170],
    ["excerpt", 50, 240],
  ])
    assert(
      typeof data[k] === "string" &&
        data[k].length >= min &&
        data[k].length <= max,
      `Invalid ${k} length`,
    );
  assert(
    ["Travel guide", "Itinerary", "Travel story", "Review"].includes(
      data.category,
    ),
    "Invalid category",
  );
  assert(
    data.placeholder === false &&
      typeof data.draft === "boolean" &&
      !isNaN(Date.parse(data.publishDate)),
    "Invalid publication metadata",
  );
  assert(data.targetKeyword === topic.targetKeyword, "Target keyword mismatch");
  if (topic.clusterRole)
    assert(
      data.clusterRole === topic.clusterRole,
      "Article must match the planned cluster role",
    );
  if (data.updatedDate)
    assert(
      Date.parse(data.updatedDate) >= Date.parse(data.publishDate),
      "Updated date cannot precede publication",
    );
  assert(
    Number.isInteger(data.readTime) &&
      data.readTime >= 1 &&
      data.readTime <= 30,
    "Invalid read time",
  );
  assert(
    data.image
      ? knownImages().has(data.image) &&
          typeof data.imageAlt === "string" &&
          data.imageAlt.trim()
      : data.imageAlt === "",
    "Unknown image or missing alt text",
  );
  assert(data.draft || data.image, "Publication requires approved imagery");
  assert(
    typeof body === "string" &&
      body.split(/\s+/).length >= 700 &&
      body.split(/\s+/).length <= 2000,
    "Expected 700–2000 words",
  );
  assert(
    !/^# /m.test(body) && (body.match(/^## /gm) || []).length >= 4,
    "Use at least four H2s and no H1",
  );
  assert(
    !/<|!\[|```|\{\{|\]\[/m.test(body),
    "HTML, images, code, or reference links are not permitted in generated copy",
  );
  assert(
    !/\b(I|we|our|my)\b/i.test(body),
    "First-person claims require a human rewrite",
  );
  assert(!/\b(TODO|TBD|lorem ipsum)\b/i.test(body), "Unfinished article text");
  assert(
    Array.isArray(note.sources) &&
      new Set(note.sources.map((s) => s.url)).size >= 2,
    "At least two cited official sources required",
  );
  const allowed = new Set(note.sources.map((s) => s.url));
  assert(
    note.sources.every((s) =>
      officialURL(s.url, config().destinations[data.destination].domains),
    ),
    "Unapproved research source",
  );
  assert(
    note.sources.every(
      (s) =>
        s.title &&
        /^\d{4}-\d{2}-\d{2}$/.test(s.accessedAt || "") &&
        s.summary?.trim(),
    ),
    "Source titles/access dates required",
  );
  const links = [...body.matchAll(/\[[^\]]+\]\(([^\s)]+)\)/g)].map((m) => m[1]);
  const internal = links.filter((u) => u.startsWith("/"));
  assert(
    new Set(internal).size >= 2 &&
      internal.includes(config().destinations[data.destination].path) &&
      all.some(
        (a) =>
          !a.data.draft &&
          !a.data.placeholder &&
          a.data.destination === data.destination &&
          internal.includes(a.data.permalink),
      ),
    "Include destination and another relevant internal link",
  );
  for (const u of internal)
    assert(routes.has(u), `Nonexistent internal link: ${u}`);
  for (const u of links.filter((u) => !u.startsWith("/")))
    assert(allowed.has(u), `Unresearched external link: ${u}`);
  assert(
    note.sources.every((s) => links.includes(s.url)),
    "Every listed source needs an inline citation",
  );
  assert(
    Array.isArray(note.claims) &&
      note.claims.length >= 4 &&
      note.claims.every(
        (c) =>
          c.claim &&
          c.sourceUrls.length &&
          c.sourceUrls.every((u) => allowed.has(u)),
      ),
    "Claims need source mappings",
  );
  assert(
    note.verificationFlags?.length > 0,
    "Editorial verification flags required",
  );
  if (!data.image)
    assert(
      note.verificationFlags.some((s) => /imag/i.test(s)),
      "Flag missing imagery explicitly",
    );
  if (publishing || !data.draft) {
    const r = note.review;
    assert(
      r?.approved === true &&
        r.reviewedBy?.trim() &&
        /^\d{4}-\d{2}-\d{2}$/.test(r.reviewedAt || "") &&
        [
          "sourcesChecked",
          "claimsChecked",
          "linksChecked",
          "imageryChecked",
        ].every((k) => r[k] === true),
      "Human editorial approval and all review checks required before publication",
    );
  }
}
export function articleMarkdown(data, body) {
  return `---\n${stringify(data)}---\n\n${body.trim()}\n`;
}
