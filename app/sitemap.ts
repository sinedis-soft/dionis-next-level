// app/sitemap.ts

import type { MetadataRoute } from "next";

import type { Lang } from "@/dictionaries/header";

import {
  getAllArticleSlugs,
  getArticleBySlug,
  getAllAuthors,
} from "@/lib/blog";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://dionis-insurance.kz"
).replace(/\/$/, "");

const SUPPORTED_LANGS: Lang[] = ["ru", "kz", "en"];

// Set only for routes with a verified, meaningful content update.
// Keep this in sync with the published page, not every repository commit.
const PAGE_LASTMOD: Record<string, string> = {
  "": "2026-09-28",
  "/green-card": "2026-09-28",
  "/osago-rf": "2026-09-28",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];

  /* ---------- STATIC PAGES ---------- */

  const staticRoutes = [
    "",
    "/green-card",
    "/osago-rf",
    "/osago-rf/passenger-car-prices",
    "/products",
    "/blog",
    "/contacts",
    "/about",
    "/privacy",
    "/privacy/cookies",
    "/privacy/regulation",
  ];

  // Russian corporate transport insurance landing page. Localized versions
  // will be added after their regulated copy has been editorially approved.
  urls.push({
    url: `${BASE_URL}/ru/legal`,
    lastModified: "2026-08-02",
    changeFrequency: "monthly",
    priority: 0.8,
  });

  for (const lang of SUPPORTED_LANGS) {
    const prefix = `/${lang}`;

    for (const route of staticRoutes) {
      urls.push({
        url: `${BASE_URL}${prefix}${route}`,
        ...(PAGE_LASTMOD[route] ? { lastModified: PAGE_LASTMOD[route] } : {}),
        changeFrequency:
          route === "" ||
          route === "/green-card" ||
          route === "/osago-rf" ||
          route === "/osago-rf/passenger-car-prices"
            ? "weekly"
            : "monthly",
        priority:
          route === ""
            ? 1.0
            : route === "/green-card"
            ? 0.9
            : route === "/osago-rf" ||
          route === "/osago-rf/passenger-car-prices"
            ? 0.8
            : route === "/osago-rf/passenger-car-prices"
            ? 0.7
            : 0.6,
      });
    }
  }

  /* ---------- BLOG ARTICLES ---------- */

  const slugs = await getAllArticleSlugs();

  for (const { lang, slug } of slugs) {
    const article = await getArticleBySlug(lang, slug);

    if (!article) continue;

    urls.push({
      url: `${BASE_URL}/${lang}/blog/${slug}`,
      lastModified:
        article.modifiedAt ?? article.publishedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  /* ---------- AUTHORS ---------- */

  const authors = await getAllAuthors();

  for (const author of authors) {
    for (const lang of SUPPORTED_LANGS) {
      urls.push({
        url: `${BASE_URL}/${lang}/authors/${author.slug}`,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return urls;
}
