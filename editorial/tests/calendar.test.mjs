import test from "node:test";
import assert from "node:assert/strict";
import { json, selectTopic } from "../../scripts/editorial/core.mjs";
import {
  calendarSelection,
  validateCalendar,
  assertReleaseWindow,
  validateCalendarArticles,
  localDate,
  weekStart,
} from "../../scripts/editorial/calendar.mjs";
const fixture = () => ({
  calendar: structuredClone(json("editorial/calendar.json")),
  queue: structuredClone(json("editorial/queue.json")),
});
const firstId = "la-fortuna-transport";
const date = new Date("2026-11-16T18:00:00Z");
const selection = (f, articles = [], reserved = [], now = date) =>
  calendarSelection(f.calendar, f.queue, articles, reserved, now);
function publishFirst(f, publishedAt = "2026-11-16T18:00:00Z") {
  Object.assign(
    f.queue.find((t) => t.id === firstId),
    {
      status: "published",
      publishedAt,
      publishedUrl: "https://n2getaways.com/test/",
    },
  );
}
test("approved calendar selects Week 1, not old queue priority or unrelated proposals", () => {
  const f = fixture();
  f.queue.find((t) => t.id === "sf-first-trip-budget").status = "approved";
  f.queue.find((t) => t.id === "sf-first-trip-budget").priority = 1;
  assert.equal(selection(f).topic.id, firstId);
  assert.equal(
    selectTopic(f.queue, [], [], "2026-11-16", f.calendar).id,
    firstId,
  );
});
for (const status of ["proposed", "paused", "drafted"])
  test(`earliest ${status} slot blocks every later topic`, () => {
    const f = fixture();
    f.queue.find((t) => t.id === firstId).status = status;
    assert.equal(selection(f).topic, undefined);
    assert.match(selection(f).reason, /Later slots are blocked/);
  });
test("future date blocks, rather than filtering to next topic", () => {
  const f = fixture();
  f.queue.find((t) => t.id === firstId).notBefore = "2026-12-01";
  assert.equal(selection(f).topic, undefined);
  assert.match(selection(f).reason, /2026-12-01/);
});
test("existing open/closed PR reservation and article identity each block later slots", () => {
  const f = fixture(),
    t = f.queue.find((t) => t.id === firstId);
  assert.equal(selection(f, [], [firstId]).topic, undefined);
  for (const data of [
    { editorialTopicId: firstId },
    { title: t.title },
    { targetKeyword: t.targetKeyword },
  ]) {
    assert.equal(selection(f, [{ data }]).topic, undefined);
    assert.match(selection(f, [{ data }]).reason, /resume existing work/);
  }
});
test("published predecessor unlocks next slot only in a later eligible week", () => {
  const f = fixture();
  publishFirst(f);
  assert.equal(selection(f).topic, undefined);
  assert.equal(
    selection(f, [], [], new Date("2026-11-23T18:00:00Z")).topic.id,
    "asheville-where-to-stay",
  );
});
test("a delay cannot produce same-week catch-up releases", () => {
  const f = fixture();
  publishFirst(f);
  Object.assign(
    f.queue.find((t) => t.id === "asheville-where-to-stay"),
    {
      status: "published",
      publishedAt: "2026-12-07T18:00:00Z",
      publishedUrl: "https://n2getaways.com/two/",
    },
  );
  assert.equal(
    selection(f, [], [], new Date("2026-12-08T18:00:00Z")).topic,
    undefined,
  );
  assert.equal(
    selection(f, [], [], new Date("2026-12-14T18:00:00Z")).topic.id,
    "waikiki-without-car",
  );
});
test("Chicago Monday boundary and DST use local weeks, not UTC weeks", () => {
  assert.equal(localDate("2026-11-23T05:59:00Z"), "2026-11-22");
  assert.equal(localDate("2026-11-23T06:00:00Z"), "2026-11-23");
  assert.equal(weekStart(localDate("2026-11-23T05:59:00Z")), "2026-11-16");
  assert.equal(localDate("2027-03-15T04:59:00Z"), "2027-03-14");
  assert.equal(localDate("2027-03-15T05:00:00Z"), "2027-03-15");
});
test("reordering requires a matching owner-approved revision; recorded reordering works", () => {
  const f = fixture();
  [f.calendar.entries[0], f.calendar.entries[1]] = [
    f.calendar.entries[1],
    f.calendar.entries[0],
  ];
  f.calendar.entries.forEach((e, i) => (e.week = i + 1));
  assert.throws(() => validateCalendar(f.calendar, f.queue), /revision/);
  f.calendar.revisions.push({
    approvedBy: "Owner",
    approvedAt: "2026-11-16",
    reason: "Owner approved based on supplied Search Console export",
    order: f.calendar.entries.map((e) => e.topicId),
  });
  assert.equal(selection(f).topic.id, "asheville-where-to-stay");
});
test("completed calendar never falls back to unscheduled topics", () => {
  const f = fixture();
  for (const e of f.calendar.entries)
    f.queue.find((t) => t.id === e.topicId).status = "published";
  assert.match(selection(f).reason, /complete/);
  assert.equal(selection(f).topic, undefined);
});
const note = () => ({
  experienceBasis: {
    type: "researched",
    checkedAt: "2026-11-16",
    firsthandExperiences: [],
  },
});
const article = (id = firstId, draft = true) => ({
  data: { editorialTopicId: id, draft, publishDate: "2026-11-16" },
  body: "This is a researched planning guide, checked November 16, 2026.",
});
test("CI blocks publishing a later slot, independent of topic selection", () => {
  const f = fixture();
  assert.throws(
    () =>
      validateCalendarArticles(
        f.calendar,
        f.queue,
        [article("asheville-where-to-stay", false)],
        note,
        date,
      ),
    /earlier slot/,
  );
  publishFirst(f);
  assert.throws(
    () =>
      assertReleaseWindow(
        f.calendar,
        f.queue,
        "asheville-where-to-stay",
        "2026-11-16",
      ),
    /not due/,
  );
});
test("visible research basis and evidence records are required, no invented firsthand defaults", () => {
  const f = fixture();
  validateCalendarArticles(f.calendar, f.queue, [article()], note, date);
  assert.throws(
    () =>
      validateCalendarArticles(
        f.calendar,
        f.queue,
        [article()],
        () => ({}),
        date,
      ),
    /evidence record/,
  );
  assert.throws(
    () =>
      validateCalendarArticles(
        f.calendar,
        f.queue,
        [{ ...article(), body: "Our tested hotel recommendations" }],
        note,
        date,
      ),
    /Visible research/,
  );
  const n = note();
  n.experienceBasis.firsthandExperiences = [{ visitDate: "2026-01-01" }];
  assert.throws(
    () =>
      validateCalendarArticles(f.calendar, f.queue, [article()], () => n, date),
    /Unverified firsthand/,
  );
});
test("unscheduled article cannot bypass the active calendar; historical articles still validate", () => {
  const f = fixture();
  assert.throws(
    () =>
      validateCalendarArticles(
        f.calendar,
        f.queue,
        [article("sf-first-trip-budget")],
        note,
        date,
      ),
    /Unscheduled/,
  );
  validateCalendarArticles(
    f.calendar,
    f.queue,
    [article("sf-without-a-car", false)],
    note,
    date,
  );
});
test("six separate optimization tasks keep cadence and never become article topics", () => {
  const f = fixture(),
    backlog = json("editorial/optimizations.json");
  assert.deepEqual(
    backlog.tasks.map((t) => t.week),
    [1, 3, 5, 7, 9, 11],
  );
  assert.match(backlog.tasks[0].url, /48-hours-in-asheville/);
  assert.equal(backlog.tasks.length, 6);
  assert.ok(backlog.tasks.every((t) => !f.queue.some((q) => q.id === t.id)));
});
