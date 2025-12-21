// app/sitemap.ts
import type { MetadataRoute } from "next";
import type { Lang } from "@/dictionaries/header";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/blog";

const BASE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.com").replace(/\/$/, "");

const SUPPORTED_LANGS: Lang[] = ["ru", "kz", "en"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [];
  const now = new Date().toISOString();

  // ---- Основные страницы
  for (const lang of SUPPORTED_LANGS) {
    const prefix = `/${lang}`;

    urls.push(
      {
        url: `${BASE_URL}${prefix}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${BASE_URL}${prefix}/green-card`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}${prefix}/osago-rf`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${BASE_URL}${prefix}/products`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${BASE_URL}${prefix}/blog`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      }
    );
  }

  // ---- Статьи блога (из MDX)
  const slugs = await getAllArticleSlugs();

  for (const { lang, slug } of slugs) {
    const article = await getArticleBySlug(lang, slug);
    if (!article) continue;

    urls.push({
      url: `${BASE_URL}/${lang}/blog/${slug}`,
      lastModified: article.modifiedAt ?? article.publishedAt,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return urls;
}
