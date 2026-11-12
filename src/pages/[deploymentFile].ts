import type { APIRoute, GetStaticPaths } from "astro";
import { isProduction, reviewRoots } from "../config/site.mjs";
export const getStaticPaths: GetStaticPaths = () => {
  const common =
    "/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n";
  const noindex = "  X-Robots-Tag: noindex, nofollow\n";
  const headers = isProduction
    ? common +
      "\nhttps://:project.pages.dev/*\n" +
      noindex +
      "\nhttps://:version.:project.pages.dev/*\n" +
      noindex +
      "\n" +
      reviewRoots.map((path) => path + "*\n" + noindex).join("\n")
    : common + noindex;
  return [
    { params: { "deploymentFile": "_headers" }, props: { content: headers } },
    {
      params: { "deploymentFile": "_redirects" },
      props: {
        content: isProduction
          ? "/guides/ /travel-guides/ 301\n"
          : "# Preview: original article paths need no redirects.\n",
      },
    },
  ];
};
export const GET: APIRoute = ({ props }) =>
  new Response(props.content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
