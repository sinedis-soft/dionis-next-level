import type { MetadataRoute } from "next";
import type { Lang } from "@/dictionaries/header";
import { AUTHORS } from "@/data/blog/authors";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/blog";
import { getFastApiLastmodMap } from "@/lib/seoLastmod";

const BASE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.com").replace(/\/$/, "");

const SUPPORTED_LANGS: Lang[] = ["ru", "kz", "en"];

const STATIC_SECTIONS = [
  "",
  "about",
  "contacts",
  "green-card",
  "osago-rf",
  "products",
  "insurance-comparison",
  "blog",
  "blog/",
  "authors",
  "authors/",
  "privacy/cookies",
  "cookie-policy",
  "privacy/regulation",
] as const;

type RouteDef = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

function toPath(lang: Lang, section: string): string {
  if (!section) return `/${lang}`;
  return `/${lang}/${section}`;
}

function staticRouteDefs(): RouteDef[] {
  return STATIC_SECTIONS.map((section) => ({
    path: section,
    changeFrequency: section.startsWith("blog") ? "weekly" : "monthly",
    priority: section === "" ? 1.0 : section.startsWith("blog") ? 0.8 : 0.7,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticDefs = staticRouteDefs();

  const staticPaths: string[] = [];
  for (const lang of SUPPORTED_LANGS) {
    for (const route of staticDefs) {
      staticPaths.push(toPath(lang, route.path));
    }

    for (const author of AUTHORS) {
      staticPaths.push(`/${lang}/authors/${author.slug}`);
    }
  }

  const articleSlugs = await getAllArticleSlugs();
  const articlePaths = articleSlugs.map(({ lang, slug }) => `/${lang}/blog/${slug}`);

  const fastApiLastmod = await getFastApiLastmodMap([...staticPaths, ...articlePaths]);
  const defaultLastmod = new Date().toISOString();

  const urls: MetadataRoute.Sitemap = [];

  for (const lang of SUPPORTED_LANGS) {
    for (const route of staticDefs) {
      const path = toPath(lang, route.path);
      urls.push({
        url: `${BASE_URL}${path}`,
        lastModified: fastApiLastmod[path] ?? defaultLastmod,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }

    for (const author of AUTHORS) {
      const path = `/${lang}/authors/${author.slug}`;
      urls.push({
        url: `${BASE_URL}${path}`,
        lastModified: fastApiLastmod[path] ?? defaultLastmod,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  for (const { lang, slug } of articleSlugs) {
    const article = await getArticleBySlug(lang, slug);
    if (!article) continue;

    const path = `/${lang}/blog/${slug}`;

    urls.push({
      url: `${BASE_URL}${path}`,
      lastModified:
        fastApiLastmod[path] ?? article.modifiedAt ?? article.publishedAt ?? defaultLastmod,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return urls;
}
