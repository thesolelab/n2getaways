/** Build mode defaults to preview. Never enable production mode during preparation. */
export const siteMode = process.env.SITE_MODE || "preview";
if (!["preview", "production"].includes(siteMode))
  throw new Error("SITE_MODE must be preview or production.");
export const isProduction = siteMode === "production";
export const productionOrigin = "https://n2getaways.com";
if (isProduction) {
  if (
    !process.env.SITE_URL ||
    new URL(process.env.SITE_URL).origin !== productionOrigin ||
    new URL(process.env.SITE_URL).pathname !== "/" ||
    new URL(process.env.SITE_URL).search ||
    new URL(process.env.SITE_URL).hash
  )
    throw new Error(
      "Production mode requires SITE_URL=https://n2getaways.com explicitly.",
    );
  if (process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== "main")
    throw new Error("Production indexing is restricted to the main branch.");
}
export const siteOrigin =
  process.env.SITE_URL || process.env.CF_PAGES_URL || productionOrigin;
export const reviewRoots = [
  "/samples/",
  "/editorial-preview/",
  "/migration-review/",
  "/guides/",
  "/destinations/italy/",
  "/destinations/japan/",
  "/destinations/portugal/",
];
/** @param {string} path */
export function isReviewPath(path) {
  return (
    reviewRoots.some(
      (root) => path === root.slice(0, -1) || path.startsWith(root),
    ) || /\/404(?:\.html|\/)?$/.test(path)
  );
}
