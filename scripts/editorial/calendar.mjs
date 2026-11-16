/** Source-controlled, manually initiated calendar. No timers or API calls. */
const requireThat = (ok, message) => {
  if (!ok) throw new Error(message);
};
export function localDate(now = new Date(), timezone = "America/Chicago") {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(now));
  return ["year", "month", "day"]
    .map((k) => parts.find((p) => p.type === k).value)
    .join("-");
}
export function weekStart(date) {
  const d = new Date(`${date}T12:00:00Z`);
  requireThat(!Number.isNaN(+d), `Invalid calendar date: ${date}`);
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d.toISOString().slice(0, 10);
}
const plusWeeks = (date, weeks) =>
  new Date(Date.parse(`${date}T12:00:00Z`) + weeks * 604800000)
    .toISOString()
    .slice(0, 10);
export function validateCalendar(calendar, queue) {
  requireThat(
    calendar.status === "approved" &&
      calendar.timezone === "America/Chicago" &&
      calendar.articlesPerWeek === 1,
    "Calendar must be approved, Chicago-local and one article per week",
  );
  requireThat(
    calendar.entries.length === 12,
    "Calendar requires 12 ordered slots",
  );
  const ids = calendar.entries.map((e) => e.topicId);
  requireThat(new Set(ids).size === ids.length, "Duplicate calendar topic");
  calendar.entries.forEach((e, i) => {
    requireThat(
      e.week === i + 1 && queue.some((t) => t.id === e.topicId),
      "Invalid calendar sequence or missing queue topic",
    );
    requireThat(
      e.experienceBasis === "researched" &&
        e.firsthandAvailability === "unconfirmed",
      "Calendar experience basis must distinguish research from unconfirmed firsthand experience",
    );
  });
  const revision = calendar.revisions.at(-1);
  requireThat(
    revision?.approvedBy &&
      revision.approvedAt &&
      revision.reason &&
      JSON.stringify(revision.order) === JSON.stringify(ids),
    "Calendar order changes require an explicit owner-approved revision record",
  );
}
function duplicates(topic, articles) {
  const normal = (value) =>
    (value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
  return articles.some(
    (a) =>
      a.data.editorialTopicId === topic.id ||
      normal(a.data.title) === normal(topic.title) ||
      (a.data.targetKeyword &&
        normal(a.data.targetKeyword) === normal(topic.targetKeyword)),
  );
}
export function calendarSelection(
  calendar,
  queue,
  articles,
  reserved = [],
  now = new Date(),
) {
  validateCalendar(calendar, queue);
  const entry = calendar.entries.find(
    (e) => queue.find((t) => t.id === e.topicId).status !== "published",
  );
  if (!entry)
    return {
      reason: "Approved calendar complete; no fallback to unscheduled topics.",
    };
  const topic = queue.find((t) => t.id === entry.topicId);
  if (topic.status !== "approved")
    return {
      reason: `Week ${entry.week}: ${topic.id} is ${topic.status}; resume/review this slot. Later slots are blocked.`,
    };
  if (reserved.includes(topic.id) || duplicates(topic, articles))
    return {
      reason: `Week ${entry.week}: ${topic.id} already has an article or branch/PR reservation; resume existing work. Later slots are blocked.`,
    };
  const today = localDate(now, calendar.timezone);
  if (topic.notBefore && today < topic.notBefore)
    return {
      reason: `Week ${entry.week} is not eligible before ${topic.notBefore}. Later slots are blocked.`,
    };
  try {
    assertReleaseWindow(calendar, queue, topic.id, today);
  } catch (e) {
    return { reason: e.message };
  }
  return { topic, entry };
}
export function assertReleaseWindow(calendar, queue, topicId, date) {
  const index = calendar.entries.findIndex((e) => e.topicId === topicId);
  if (index < 0) return; // Historical/non-calendar articles retain their original rules.
  const prior = calendar.entries
    .slice(0, index)
    .map((e) => queue.find((t) => t.id === e.topicId));
  requireThat(
    prior.every(
      (t) => t?.status === "published" && t.publishedAt && t.publishedUrl,
    ),
    `Calendar blocked: earlier slot must be verified published before ${topicId}.`,
  );
  const first = queue.find((t) => t.id === calendar.entries[0].topicId);
  if (index > 0) {
    const earliest = plusWeeks(
      weekStart(localDate(first.publishedAt, calendar.timezone)),
      index,
    );
    requireThat(
      date >= earliest,
      `Week ${index + 1} is not due before ${earliest}; later slots cannot skip ahead.`,
    );
    const lastWeek = weekStart(
      localDate(prior.at(-1).publishedAt, calendar.timezone),
    );
    requireThat(
      weekStart(date) > lastWeek,
      `One new article per week: ${topicId} must wait until after the prior release week (${lastWeek}).`,
    );
  }
  const topic = queue.find((t) => t.id === topicId);
  requireThat(
    !topic.notBefore || date >= topic.notBefore,
    `Topic is not eligible before ${topic.notBefore}`,
  );
}
export function validateCalendarArticles(
  calendar,
  queue,
  articles,
  readNote,
  now = new Date(),
) {
  validateCalendar(calendar, queue);
  const weeks = new Set();
  for (const entry of calendar.entries) {
    const topic = queue.find((t) => t.id === entry.topicId);
    const matches = articles.filter(
      (a) => a.data.editorialTopicId === topic.id,
    );
    requireThat(matches.length <= 1, `Duplicate calendar article: ${topic.id}`);
    if (["drafted", "published"].includes(topic.status))
      requireThat(
        matches.length === 1,
        `Calendar status without article: ${topic.id}`,
      );
    const article = matches[0];
    if (!article) continue;
    const note = readNote(topic.id),
      basis = note.experienceBasis;
    requireThat(
      basis?.type === "researched" &&
        /^\d{4}-\d{2}-\d{2}$/.test(basis.checkedAt || "") &&
        Array.isArray(basis.firsthandExperiences),
      `Research/firsthand evidence record required: ${topic.id}`,
    );
    requireThat(
      /researched (?:planning )?guide|researched comparison/i.test(
        article.body,
      ),
      `Visible research basis required: ${topic.id}`,
    );
    for (const experience of basis.firsthandExperiences)
      requireThat(
        experience.confirmedBy &&
          (experience.visitDate ||
            (article.data.draft &&
              experience.dateConfirmationRequired === true)) &&
          experience.evidence &&
          experience.visibleLabel &&
          article.body.includes(experience.visibleLabel),
        `Unverified firsthand experience: ${topic.id}`,
      );
    if (!article.data.draft) {
      requireThat(
        ["approved", "drafted", "published"].includes(topic.status),
        `Calendar article not approved: ${topic.id}`,
      );
      const date =
        topic.status === "published"
          ? localDate(topic.publishedAt, calendar.timezone)
          : localDate(now, calendar.timezone);
      assertReleaseWindow(calendar, queue, topic.id, date);
      const releaseDate = localDate(
        new Date(article.data.publishDate),
        calendar.timezone,
      );
      // Date-only frontmatter is a calendar label, not midnight UTC in Chicago.
      const label = String(article.data.publishDate).match(
        /^\d{4}-\d{2}-\d{2}$/,
      )
        ? article.data.publishDate
        : releaseDate;
      assertReleaseWindow(calendar, queue, topic.id, label);
      const week = weekStart(date);
      requireThat(
        !weeks.has(week),
        `Multiple new calendar articles in release week ${week}`,
      );
      weeks.add(week);
    }
  }
  // A new off-calendar article cannot bypass the active approved sequence.
  const active = calendar.entries.some(
    (e) => queue.find((t) => t.id === e.topicId).status !== "published",
  );
  if (active)
    for (const article of articles.filter((a) => a.data.editorialTopicId)) {
      const topic = queue.find((t) => t.id === article.data.editorialTopicId);
      if (!calendar.entries.some((e) => e.topicId === topic?.id))
        requireThat(
          topic?.status === "published" &&
            new Date(topic.publishedAt) < new Date(calendar.approvedAt),
          "Unscheduled new article requires an owner-approved calendar revision",
        );
    }
}
