import {
  config,
  json,
  inventory,
  validateQueue,
  validateDraft,
  assert,
} from "./core.mjs";
const queue = json("editorial/queue.json");
validateQueue(queue);
assert(
  config().mode === "manual-chat" && config().scheduleEnabled === false,
  "Only the zero-cost manually initiated workflow is authorized",
);
const inv = inventory(),
  seen = new Set();
let n = 0;
for (const a of inv.all.filter((a) => a.data.editorialTopicId)) {
  const id = a.data.editorialTopicId;
  assert(!seen.has(id), `Duplicate topic article: ${id}`);
  seen.add(id);
  const note = json(`editorial/research/${id}.json`);
  validateDraft(a.data, a.body, note, inv);
  n++;
}
for (const t of queue)
  if (["drafted", "published"].includes(t.status)) {
    assert(seen.has(t.id), `Queue status without article: ${t.id}`);
    if (t.status === "published")
      assert(
        t.publishedAt &&
          t.publishedUrl === `https://n2getaways.com${t.permalink}`,
        `Missing publication receipt: ${t.id}`,
      );
  }
console.log(
  `PASS: editorial queue, ${n} assisted article(s), sources, links, image keys and publication approval gate`,
);
