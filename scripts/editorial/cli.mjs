/** No inference API, billing integration, or automatic publishing. */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import {
  config,
  json,
  inventory,
  validateQueue,
  selectTopic,
  validateDraft,
  markdown,
  articleMarkdown,
  assert,
  normalized,
} from "./core.mjs";
const repo = "thesolelab/n2getaways";
const gh = (args) =>
  execFileSync("gh", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
const git = (args) =>
  execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trimEnd();
const save = (file, data) =>
  writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
function reservations() {
  const prs = JSON.parse(
    gh([
      "api",
      "--paginate",
      "--slurp",
      `repos/${repo}/pulls?state=all&per_page=100`,
    ]),
  ).flat();
  const branches = JSON.parse(
    gh(["api", "--paginate", "--slurp", `repos/${repo}/branches?per_page=100`]),
  ).flat();
  return [
    ...new Set(
      [...prs.map((p) => p.head.ref), ...branches.map((b) => b.name)]
        .filter((b) => b.startsWith("editorial/topic-"))
        .map((b) => b.slice("editorial/topic-".length)),
    ),
  ];
}
function cleanMain() {
  assert(git(["branch", "--show-current"]) === "main", "Start on main");
  assert(
    !git(["status", "--porcelain"]),
    "Commit or stash unrelated changes first",
  );
  git(["fetch", "origin", "main"]);
  assert(
    git(["rev-parse", "HEAD"]) === git(["rev-parse", "origin/main"]),
    "Update main before selecting a topic",
  );
}
async function next() {
  cleanMain();
  const inv = inventory(),
    reserved = reservations(),
    queue = json("editorial/queue.json");
  const topic = selectTopic(queue, inv.all, reserved);
  if (!topic) {
    console.log(
      "No approved, eligible, unreserved topic. Edit editorial/queue.json first.",
    );
    return;
  }
  // Similarity is an editorial warning, never permission to copy an existing guide.
  const terms = new Set(
    normalized(topic.title)
      .split(" ")
      .filter((w) => w.length > 3),
  );
  const related = inv.all
    .filter(
      (a) => !a.data.placeholder && a.data.destination === topic.destination,
    )
    .map((a) => ({
      title: a.data.title,
      path: a.data.permalink,
      overlap: normalized(a.data.title)
        .split(" ")
        .filter((w) => terms.has(w)).length,
    }))
    .sort((a, b) => b.overlap - a.overlap);
  const plan = {
    topic,
    baseCommit: git(["rev-parse", "HEAD"]),
    branch: `editorial/topic-${topic.id}`,
    researchDomains: config().destinations[topic.destination].domains,
    existingContent: related,
    allowedInternalPaths: [...inv.routes].sort(),
    instructions:
      "Use current primary sources. Document overlap review. Write 700–2000 original words, cited claims and no first-person experience. Stage only after research and validation.",
  };
  mkdirSync("work/editorial", { recursive: true });
  save("work/editorial/plan.json", plan);
  console.log(JSON.stringify(plan, null, 2));
}
function stage(file) {
  cleanMain();
  const plan = json("work/editorial/plan.json");
  assert(
    plan.baseCommit === git(["rev-parse", "HEAD"]),
    "Main changed: regenerate the plan and recheck research",
  );
  assert(
    !reservations().includes(plan.topic.id),
    "Topic already has a branch or PR; resume it rather than draft again",
  );
  const queue = json("editorial/queue.json"),
    inv = inventory();
  assert(
    selectTopic(queue, inv.all, reservations())?.id === plan.topic.id,
    "Topic no longer next eligible item",
  );
  const input = json(file);
  assert(
    input.topicId === plan.topic.id,
    "Draft does not match the selected topic",
  );
  assert(
    input.note?.overlapReview?.trim(),
    "Explain how this differs from existing coverage",
  );
  const data = {
    ...input.metadata,
    editorialTopicId: plan.topic.id,
    targetKeyword: plan.topic.targetKeyword,
    destination: plan.topic.destination,
    draft: true,
    placeholder: false,
    migrationReview: false,
    reviewNotes: [],
  };
  // Approval fields are always initialized here; generated input cannot approve itself.
  const note = {
    ...input.note,
    topicId: plan.topic.id,
    slug: data.permalink?.replace(/^\/|\/$/g, ""),
    assistedBy: "Existing ChatGPT session; no paid API",
    preparedAt: new Date().toISOString(),
    review: {
      approved: false,
      reviewedBy: "",
      reviewedAt: "",
      sourcesChecked: false,
      claimsChecked: false,
      linksChecked: false,
      imageryChecked: false,
    },
  };
  validateDraft(data, input.body, note, inv);
  git(["switch", "-c", plan.branch]);
  mkdirSync("editorial/research", { recursive: true });
  writeFileSync(
    `src/content/articles/editorial-${plan.topic.id}.md`,
    articleMarkdown(data, input.body),
  );
  save(`editorial/research/${plan.topic.id}.json`, note);
  const item = queue.find((t) => t.id === plan.topic.id);
  item.status = "drafted";
  item.branch = plan.branch;
  item.permalink = data.permalink;
  save("editorial/queue.json", queue);
  console.log(
    `Staged ${plan.branch}. Run npm run editorial:test and npm run validate, then npm run editorial:submit.`,
  );
}
function submit() {
  const branch = git(["branch", "--show-current"]);
  assert(
    branch.startsWith("editorial/topic-"),
    "Submit only from an editorial topic branch",
  );
  const id = branch.slice("editorial/topic-".length),
    article = markdown(`src/content/articles/editorial-${id}.md`);
  assert(article.data.draft === true, "Submit must keep draft: true");
  validateDraft(
    article.data,
    article.body,
    json(`editorial/research/${id}.json`),
    inventory(),
  );
  // Validate the exact working tree before any publication to GitHub.
  execFileSync("npm", ["run", "editorial:test"], {
    stdio: "inherit",
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
  });
  execFileSync("npm", ["run", "validate"], {
    stdio: "inherit",
    env: {
      ...process.env,
      ASTRO_TELEMETRY_DISABLED: "1",
      SITE_MODE: "preview",
    },
  });
  const expected = [
    `src/content/articles/editorial-${id}.md`,
    `editorial/research/${id}.json`,
    "editorial/queue.json",
  ];
  const changed = git(["status", "--porcelain", "--untracked-files=all"])
    .split("\n")
    .filter(Boolean)
    .map((l) => l.slice(3));
  assert(
    changed.every((p) => expected.includes(p)),
    "Unrelated changes: submit only the selected article, research and queue",
  );
  assert(
    !reservations().includes(id),
    "Branch/PR already exists remotely; resume that PR without submitting another",
  );
  git(["add", "--", ...expected]);
  git(["commit", "-m", `Draft editorial topic: ${id}`]);
  // No force push: the server rejects simultaneous attempts to reserve the same topic.
  git(["push", "-u", "origin", branch]);
  const body = `## Editorial draft — manual approval required\n\n${article.data.title}\n\nTopic: ${id}. Keyword: ${article.data.targetKeyword}. No paid services or inference APIs used.\n\nPreview: find the Cloudflare Pages check on this PR, then open /editorial-preview/${id}/ on that branch deployment. Branch previews are public and noindex, not private. Draft is excluded from normal routes and production output.\n\nResearch and claim verification: editorial/research/${id}.json. Sources are cited inline.\n\n- [ ] Read article and research notes; confirm original angle and useful SEO\n- [ ] Open sources and verify every factual/time-sensitive claim\n- [ ] Resolve verification flags and confirm internal links\n- [ ] Approve contextual cover/alt text or supply licensed imagery\n- [ ] Recheck publication date\n- [ ] Owner explicitly approves this article; record reviewer/date and set all research.review checks true\n- [ ] Set article draft: false, mark PR ready, and merge manually\n- [ ] Confirm live URL after deployment, then run npm run editorial:sync to update queue\n\nValidation passed before submission. A draft PR merge with draft:true does not publish an article. No auto-merge or publishing schedule is configured.\n`;
  mkdirSync("work/editorial", { recursive: true });
  writeFileSync("work/editorial/pr-body.md", body);
  try {
    console.log(
      gh([
        "pr",
        "create",
        "--repo",
        repo,
        "--base",
        "main",
        "--head",
        branch,
        "--draft",
        "--title",
        `Editorial draft: ${article.data.title}`,
        "--body-file",
        "work/editorial/pr-body.md",
      ]),
    );
  } catch {
    throw new Error(
      `Branch pushed but PR creation failed. Do not regenerate. Create a draft PR from ${branch} using work/editorial/pr-body.md.`,
    );
  }
}
async function sync() {
  cleanMain();
  const queue = json("editorial/queue.json"),
    inv = inventory();
  let count = 0;
  for (const topic of queue.filter((t) => t.status === "drafted")) {
    const a = inv.all.find((a) => a.data.editorialTopicId === topic.id);
    if (!a || a.data.draft || new Date(a.data.publishDate) > new Date())
      continue;
    validateDraft(
      a.data,
      a.body,
      json(`editorial/research/${topic.id}.json`),
      inv,
      { publishing: true },
    );
    const url = `https://n2getaways.com${a.data.permalink}`;
    const response = await fetch(url, { signal: AbortSignal.timeout(20000) });
    assert(
      response.ok && response.url === url,
      `Publication not live yet: ${url}`,
    );
    const html = await response.text();
    assert(
      html.includes(`data-editorial-topic="${topic.id}"`) &&
        html.includes(`href="${url}"`),
      "Live page did not identify the approved article",
    );
    topic.status = "published";
    topic.publishedAt = new Date().toISOString();
    topic.publishedUrl = url;
    count++;
  }
  if (count) {
    save("editorial/queue.json", queue);
    console.log(
      `${count} verified publication(s). Commit the queue-only update; this command never publishes content.`,
    );
  } else console.log("No newly published topics. Queue unchanged.");
}
try {
  const command = process.argv[2];
  if (command === "next") await next();
  else if (command === "stage") stage(process.argv[3]);
  else if (command === "submit") submit();
  else if (command === "sync") await sync();
  else throw new Error("Use next, stage <input.json>, submit, or sync");
} catch (e) {
  console.error(`EDITORIAL FAILED: ${e.message}`);
  process.exitCode = 1;
}
