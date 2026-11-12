import test from "node:test";
import assert from "node:assert/strict";
import {
  selectTopic,
  validateQueue,
  officialURL,
  validateDraft,
  inventory,
  json,
} from "../../scripts/editorial/core.mjs";
const t = { ...json("editorial/queue.json")[0], status: "approved" };
test("only approved, date-eligible topics are selected in priority order", () => {
  const q = [
    { ...t, id: "future", notBefore: "2099-01-01", priority: 1 },
    { ...t, id: "proposed", status: "proposed" },
    { ...t, id: "second", priority: 3 },
    { ...t, id: "first", priority: 2 },
  ];
  assert.equal(selectTopic(q, [], [], "2026-11-12").id, "first");
});
test("open/closed PR reservations, existing ids, titles and target keywords prevent re-drafting", () => {
  assert.equal(selectTopic([t], [], [t.id]), undefined);
  for (const data of [
    { editorialTopicId: t.id },
    { title: t.title },
    { title: "Different title", targetKeyword: t.targetKeyword },
  ])
    assert.equal(
      selectTopic([t], [{ data: { title: "Existing article", ...data } }]),
      undefined,
    );
});
test("duplicate ids and unsupported destinations fail clearly", () => {
  assert.throws(() => validateQueue([t, t]), /Duplicate/);
  assert.throws(
    () => validateQueue([{ ...t, destination: "Invented place" }]),
    /represented/,
  );
});
test("research URLs must belong to official domains, not lookalikes or credentials", () => {
  assert.equal(
    officialURL("https://www.sfmta.com/getting-around", ["sfmta.com"]),
    true,
  );
  for (const url of [
    "https://sfmta.com.evil.com/",
    "http://sfmta.com/",
    "https://user@sfmta.com/",
    "javascript:alert(1)",
  ])
    assert.equal(officialURL(url, ["sfmta.com"]), false);
});
function fixture() {
  const a = "https://www.sfmta.com/getting-around",
    b = "https://www.bart.gov/guide";
  const data = {
    editorialTopicId: t.id,
    targetKeyword: t.targetKeyword,
    destination: t.destination,
    clusterRole: t.clusterRole,
    title: t.title,
    seoTitle: "San Francisco Without a Car: Getting Around",
    description:
      "Plan a car-free San Francisco visit with practical transit choices, official planning resources, and useful ways to organize a first trip.",
    excerpt:
      "A practical first-visit guide to choosing transport and organizing a car-free San Francisco trip.",
    category: "Travel guide",
    readTime: 5,
    placeholder: false,
    draft: true,
    publishDate: "2026-11-12",
    permalink: "/editorial-test-route/",
    image: "golden-gate",
    imageAlt: "Golden Gate Bridge",
  };
  const body =
    Array.from(
      { length: 5 },
      (_, i) =>
        `## Planning section ${i + 1}\n\n` +
        "Plan each journey around the places on the itinerary and check the official resources before setting out. ".repeat(
          9,
        ),
    ).join("\n\n") +
    `\n\n[Destination](/destinations/san-francisco/) [Weekend itinerary](/48-hours-in-san-francisco-the-perfect-quick-city-guide/) [Muni](${a}) [BART](${b})`;
  const note = {
    slug: "editorial-test-route",
    sources: [a, b].map((url) => ({
      url,
      title: "Official travel planning source",
      accessedAt: "2026-11-12",
      summary: "Primary-source evidence for planning claims",
    })),
    claims: Array.from({ length: 4 }, (_, i) => ({
      claim: `Supported planning claim ${i}`,
      sourceUrls: [a],
    })),
    verificationFlags: ["Recheck current details"],
    review: { approved: false },
  };
  return { data, body, note };
}
test("valid draft accepted; publishing fails without specific human signoff and imagery", () => {
  const { data, body, note } = fixture();
  validateDraft(data, body, note, inventory());
  assert.throws(
    () => validateDraft({ ...data, draft: false }, body, note, inventory()),
    /approval/,
  );
  assert.throws(
    () =>
      validateDraft(
        { ...data, draft: false, image: undefined, imageAlt: "" },
        body,
        note,
        inventory(),
      ),
    /imagery/,
  );
  const review = {
    approved: true,
    reviewedBy: "Owner",
    reviewedAt: "2026-11-12",
    sourcesChecked: true,
    claimsChecked: true,
    linksChecked: true,
    imageryChecked: true,
  };
  validateDraft(
    { ...data, draft: false },
    body,
    { ...note, review },
    inventory(),
  );
});
test("nonexistent links, fabricated sources/images, first-person experience and route collisions fail", () => {
  const { data, body, note } = fixture();
  assert.throws(
    () =>
      validateDraft(data, body + " [Bad](/missing-place/)", note, inventory()),
    /Nonexistent/,
  );
  assert.throws(
    () =>
      validateDraft(
        data,
        body + " [Bad](https://invented.example/)",
        note,
        inventory(),
      ),
    /Unresearched/,
  );
  assert.throws(
    () =>
      validateDraft(
        { ...data, image: "invented-image" },
        body,
        note,
        inventory(),
      ),
    /image/,
  );
  assert.throws(
    () => validateDraft(data, body + " We stayed here.", note, inventory()),
    /First-person/,
  );
  assert.throws(
    () =>
      validateDraft(
        { ...data, permalink: "/about/" },
        body,
        { ...note, slug: "about" },
        inventory(),
      ),
    /collides/,
  );
});
test("a stale future publication date cannot make a topic eligible", () => {
  assert.equal(
    selectTopic([{ ...t, notBefore: "2099-02-01" }], [], []),
    undefined,
  );
});
