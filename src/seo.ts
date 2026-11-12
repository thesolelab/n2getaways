export interface SocialImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
export interface Breadcrumb {
  name: string;
  path: string;
}
export interface ArticleMetadata {
  headline: string;
  destination: string;
  category: string;
  publishDate?: Date;
  updatedDate?: Date;
  draft: boolean;
  placeholder: boolean;
  publicationByline?: boolean;
  sources?: string[];
}
export function jsonLD(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
export function structuredGraph({
  origin,
  path,
  title,
  description,
  image,
  article,
  breadcrumbs = [],
  collectionItems = [],
}: {
  origin: string;
  path: string;
  title: string;
  description: string;
  image: SocialImage;
  article?: ArticleMetadata;
  breadcrumbs?: Breadcrumb[];
  collectionItems?: Breadcrumb[];
}) {
  const home = new URL("/", origin).href,
    url = new URL(path, origin).href;
  const org = home + "#organization",
    website = home + "#website",
    page = url + "#webpage";
  const imageNode = {
    "@type": "ImageObject",
    "@id": url + "#primaryimage",
    url: new URL(image.src, origin).href,
    caption: image.alt,
    ...(image.width ? { width: image.width, height: image.height } : {}),
  };
  const pageType =
    path === "/about/"
      ? "AboutPage"
      : path === "/contact/"
        ? "ContactPage"
        : path.startsWith("/destinations/") ||
            ["/destinations/", "/travel-guides/", "/travel-stories/"].includes(
              path,
            )
          ? "CollectionPage"
          : "WebPage";
  const nodes: Record<string, unknown>[] = [
    { "@type": "Organization", "@id": org, name: "N2Getaways", url: home },
    {
      "@type": "WebSite",
      "@id": website,
      name: "N2Getaways",
      url: home,
      publisher: { "@id": org },
      inLanguage: "en-US",
    },
    imageNode,
    {
      "@type": pageType,
      "@id": page,
      url,
      name: title,
      description,
      inLanguage: "en-US",
      isPartOf: { "@id": website },
      ...(collectionItems.length
        ? {
            mainEntity: {
              "@type": "ItemList",
              itemListElement: collectionItems.map((item, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: item.name,
                url: new URL(item.path, origin).href,
              })),
            },
          }
        : {}),
      primaryImageOfPage: { "@id": imageNode["@id"] },
      ...(breadcrumbs.length
        ? { breadcrumb: { "@id": url + "#breadcrumb" } }
        : {}),
    },
  ];
  if (breadcrumbs.length)
    nodes.push({
      "@type": "BreadcrumbList",
      "@id": url + "#breadcrumb",
      itemListElement: breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: new URL(b.path, origin).href,
      })),
    });
  if (article)
    nodes.push({
      "@type": "BlogPosting",
      "@id": url + "#article",
      url,
      headline: article.headline,
      description,
      mainEntityOfPage: { "@id": page },
      isPartOf: { "@id": website },
      publisher: { "@id": org },
      ...(article.publicationByline
        ? {
            author: {
              "@type": "Organization",
              "@id": org,
              name: "N2Getaways",
              url: new URL("/about/", origin).href,
            },
          }
        : {}),
      inLanguage: "en-US",
      articleSection: article.category,
      about: {
        "@type": article.destination === "Travel tips" ? "Thing" : "Place",
        name: article.destination,
      },
      image: { "@id": imageNode["@id"] },
      isAccessibleForFree: true,
      ...(!article.draft && !article.placeholder && article.publishDate
        ? { datePublished: article.publishDate.toISOString() }
        : {}),
      ...(!article.draft && !article.placeholder && article.updatedDate
        ? { dateModified: article.updatedDate.toISOString() }
        : {}),
      ...(article.sources?.length
        ? {
            citation: article.sources.map((url) => ({
              "@type": "CreativeWork",
              url,
            })),
          }
        : {}),
    });
  return { "@context": "https://schema.org", "@graph": nodes };
}
