// app/sitemap.ts

import type { MetadataRoute } from "next";

import type { Lang } from "@/dictionaries/header";

import { getAllArticles, getAllAuthors } from "@/lib/blog";

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
    "/legal",
    "/privacy/cookies",
    "/privacy/regulation",
  ];

  for (const lang of SUPPORTED_LANGS) {
    const prefix = `/${lang}`;

    for (const route of staticRoutes) {
      const lastModified =
        PAGE_LASTMOD[route] ??
        (route === "/legal" && lang === "ru" ? "2026-08-02" : undefined);

      urls.push({
        url: `${BASE_URL}${prefix}${route}`,
        ...(lastModified ? { lastModified } : {}),
      });
    }
  }

  /* ---------- BLOG ARTICLES ---------- */

  for (const lang of SUPPORTED_LANGS) {
    const articles = await getAllArticles(lang);

    for (const article of articles) {
      urls.push({
        url: `${BASE_URL}/${lang}/blog/${article.slug}`,
        lastModified: article.modifiedAt ?? article.publishedAt,
      });
    }
  }

  /* ---------- AUTHORS ---------- */

  const authors = await getAllAuthors();

  for (const author of authors) {
    for (const lang of SUPPORTED_LANGS) {
      urls.push({
        url: `${BASE_URL}/${lang}/authors/${author.slug}`,
      });
    }
  }

  return urls;
}
