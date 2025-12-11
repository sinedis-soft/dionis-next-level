// app/sitemap.ts
import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.com";

const SUPPORTED_LANGS = ["ru", "kz", "en"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  // Главные страницы по языкам
  for (const lang of SUPPORTED_LANGS) {
    const prefix = `/${lang}`;

    urls.push(
      {
        url: `${BASE_URL}${prefix}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1.0,
      },
      {
        url: `${BASE_URL}${prefix}/green-card`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${BASE_URL}${prefix}/osago-rf`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${BASE_URL}${prefix}/products`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${BASE_URL}${prefix}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      }
    );
  }

  return urls;
}
