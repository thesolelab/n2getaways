import { validateCalendarArticles } from "./calendar.mjs";
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

validateCalendarArticles(
  json("editorial/calendar.json"),
  queue,
  inv.all,
  (id) => json(`editorial/research/${id}.json`),
);
const backlog = json("editorial/optimizations.json");
assert(
  backlog.calendarId === json("editorial/calendar.json").id &&
    backlog.tasks.length === 6,
  "Six separate optimization tasks required",
);
assert(
  new Set(backlog.tasks.map((t) => t.id)).size === 6,
  "Duplicate optimization task",
);
assert(
  JSON.stringify(backlog.tasks.map((t) => t.week)) === "[1,3,5,7,9,11]",
  "Optimization cadence must remain every two weeks",
);
for (const task of backlog.tasks) {
  assert(
    inv.all.some(
      (a) =>
        a.file === task.articleFile &&
        `https://n2getaways.com${a.data.permalink}` === task.url,
    ),
    "Optimization target missing",
  );
  assert(
    task.publicationApprovalRequired === true &&
      [
        "approved-planned",
        "in-progress",
        "awaiting-review",
        "completed",
        "paused",
      ].includes(task.status),
    "Invalid optimization approval/status",
  );
  if (task.status === "completed")
    assert(
      task.completedAt && task.pullRequest,
      "Completed optimization needs completion/PR receipt",
    );
}
console.log(
  "PASS: approved calendar order, weekly release gates, research/firsthand basis and six separate optimization tasks",
);
