// lib/blog.tsx
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import type { ReactNode } from "react";
import { cache } from "react";

import type { Lang } from "@/dictionaries/header";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import Callout from "@/components/blog/mdx/Callout";
import Cta from "@/components/blog/mdx/Cta";
import Table from "@/components/blog/mdx/Table";

import type { BlogContentType } from "@/lib/blogContentType";
import { isBlogContentType } from "@/lib/blogContentType";

import {
  MdxTable,
  MdxThead,
  MdxTbody,
  MdxTr,
  MdxTh,
  MdxTd,
} from "@/components/blog/mdx/MdxTable";

import { mdxHeadingComponents } from "@/components/blog/mdx/mdxHeadingComponents";
import { slugifyHeading, normalizeHeadingText } from "@/lib/slugifyHeading";

// ✅ новые блоки
import Lead from "@/components/blog/mdx/blocks/Lead";
import KeyTakeaway from "@/components/blog/mdx/blocks/KeyTakeaway";
import Divider from "@/components/blog/mdx/blocks/Divider";
import ScopeNote from "@/components/blog/mdx/blocks/ScopeNote";
import FromPractice from "@/components/blog/mdx/blocks/FromPractice";
import UpdateNotice from "@/components/blog/mdx/blocks/UpdateNotice";
import ContentStatus from "@/components/blog/mdx/blocks/ContentStatus";
import InlineCta from "@/components/blog/mdx/InlineCta";

// ✅ AUTHORS вынесли в отдельный файл данных (без циклов)
import { AUTHORS } from "@/data/blog/authors";

export type BlogFAQItem = { q: string; a: string };

// ✅ тип автора оставляем здесь (в данных AUTHORS он должен использовать совместимый shape)
export type ArticleAuthor = {
  slug: string;
  name: string;
  title?: string;
  shortBio?: string;
  bio?: string;
  photo?: string;
  linkedin?: string;
};

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type BlogFrontmatter = {
  slug: string;
  lang: Lang;

  // ✅ новый тип контента
  contentType: BlogContentType;

  title: string;
  seoTitle?: string;
  seoDescription: string;

  publishedAt: string; // ISO
  modifiedAt?: string; // ISO
  readingTime: string;

  image: string;
  imageAlt: string;

  tags: string[];
  authorSlug?: string;

  faq?: BlogFAQItem[];

  // ✅ явные связи статей (управляются редактором)
  nextSlugs?: string[];
  requiredSlugs?: string[];

  // ✅ масштабирование: version + changes
  // version лучше строкой ("1.2", "1.10")
  version?: string;
  changes?: string[];
};

export type BlogArticle = BlogFrontmatter & {
  content: ReactNode;
  raw: string;
  toc: TocItem[];

  // ✅ резолвнутые связи (готовые карточки)
  nextSteps?: BlogArticleCard[];
  requiredReading?: BlogArticleCard[];
};

// ✅ ВАЖНО: добавили authorSlug, чтобы можно было строить страницу автора
export type BlogArticleCard = Pick<
  BlogFrontmatter,
  | "slug"
  | "lang"
  | "contentType"
  | "title"
  | "seoDescription"
  | "publishedAt"
  | "readingTime"
  | "image"
  | "imageAlt"
  | "tags"
  | "authorSlug"
> & { excerpt: string };

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

function normalizeLang(lang: string): Lang {
  if (lang === "ru" || lang === "kz" || lang === "en") return lang;
  return "ru";
}

function safeExcerpt(seoDescription: string) {
  return (seoDescription || "").trim();
}

function toDateMs(iso: string): number {
  const ms = +new Date(iso);
  return Number.isFinite(ms) ? ms : 0;
}

function toStringArray(v: unknown): string[] | undefined {
  if (!Array.isArray(v)) return undefined;
  const out = v
    .map((x) => String(x ?? "").trim())
    .filter((s) => s.length > 0);
  return out.length ? out : undefined;
}

// TOC из сырого MDX (до компиляции)
function extractTocFromMdx(rawMdx: string): TocItem[] {
  const lines = rawMdx.split("\n");
  const toc: TocItem[] = [];

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?\s*$/);
    if (h2) {
      const text = normalizeHeadingText(h2[1]);
      toc.push({
        level: 2,
        text,
        id: h2[2] || slugifyHeading(text),
      });
      continue;
    }

    const h3 = line.match(/^###\s+(.+?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?\s*$/);
    if (h3) {
      const text = normalizeHeadingText(h3[1]);
      toc.push({
        level: 3,
        text,
        id: h3[2] || slugifyHeading(text),
      });
    }
  }

  return toc;
}

async function listMdxFilesForLang(lang: Lang): Promise<string[]> {
  const dir = path.join(CONTENT_DIR, lang);
  try {
    const files = await fs.readdir(dir);
    return files.filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
}

async function readMdxFile(lang: Lang, slug: string): Promise<string | null> {
  const p = path.join(CONTENT_DIR, lang, `${slug}.mdx`);
  try {
    return await fs.readFile(p, "utf8");
  } catch {
    return null;
  }
}

function parseFrontmatter(rawFile: string): BlogFrontmatter {
  const { data } = matter(rawFile);

  const lang = normalizeLang(String(data.lang ?? "ru"));
  const slug = String(data.slug ?? "");
  const title = String(data.title ?? "");
  const seoDescription = String(data.seoDescription ?? "");

  if (!slug || !title || !seoDescription) {
    throw new Error(
      "MDX frontmatter missing required fields: slug/title/seoDescription"
    );
  }

  // ✅ contentType (с валидацией + дефолтом)
  const rawContentType = (data as Record<string, unknown>).contentType;
  const contentType: BlogContentType = isBlogContentType(rawContentType)
    ? rawContentType
    : "guide";

  const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];

  const faq: BlogFAQItem[] | undefined = Array.isArray(data.faq)
    ? (data.faq as unknown[])
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const o = item as Record<string, unknown>;
          const q = String(o.q ?? "");
          const a = String(o.a ?? "");
          if (!q || !a) return null;
          return { q, a };
        })
        .filter((x): x is BlogFAQItem => Boolean(x))
    : undefined;

  // ✅ явные связи
  const nextSlugs = toStringArray((data as Record<string, unknown>).nextSlugs);
  const requiredSlugs = toStringArray(
    (data as Record<string, unknown>).requiredSlugs
  );

  // ✅ version + changes
  const versionRaw = (data as Record<string, unknown>).version;
  const version =
    typeof versionRaw === "string" && versionRaw.trim().length > 0
      ? versionRaw.trim()
      : typeof versionRaw === "number"
        ? String(versionRaw)
        : undefined;

  const changes = toStringArray((data as Record<string, unknown>).changes);

  return {
    slug,
    lang,
    contentType,
    title,
    seoTitle: data.seoTitle ? String(data.seoTitle) : undefined,
    seoDescription,
    publishedAt: String(data.publishedAt ?? ""),
    modifiedAt: data.modifiedAt ? String(data.modifiedAt) : undefined,
    readingTime: String(data.readingTime ?? "5 мин"),
    image: String(data.image ?? "/blog/cover.webp"),
    imageAlt: String(data.imageAlt ?? title),
    tags,
    authorSlug: data.authorSlug ? String(data.authorSlug) : undefined,
    faq,
    nextSlugs,
    requiredSlugs,

    // ✅ versioning
    version,
    changes,
  };
}

function frontmatterToCard(fm: BlogFrontmatter): BlogArticleCard {
  return {
    slug: fm.slug,
    lang: fm.lang,
    contentType: fm.contentType,
    title: fm.title,
    seoDescription: fm.seoDescription,
    excerpt: safeExcerpt(fm.seoDescription),
    publishedAt: fm.publishedAt,
    readingTime: fm.readingTime,
    image: fm.image,
    imageAlt: fm.imageAlt,
    tags: fm.tags,
    authorSlug: fm.authorSlug,
  };
}

async function getCardBySlug(
  lang: Lang,
  slug: string
): Promise<BlogArticleCard | null> {
  const raw = await readMdxFile(lang, slug);
  if (!raw) return null;
  const fm = parseFrontmatter(raw);
  return frontmatterToCard(fm);
}

// ✅ сохраняем порядок как в frontmatter (и исключаем саму статью)
async function resolveLinkedCards(
  lang: Lang,
  currentSlug: string,
  slugs?: string[]
): Promise<BlogArticleCard[]> {
  if (!slugs?.length) return [];

  const unique = Array.from(
    new Set(
      slugs
        .map((s) => String(s ?? "").trim())
        .filter((s) => s && s !== currentSlug)
    )
  );

  const cards = await Promise.all(unique.map((s) => getCardBySlug(lang, s)));
  return cards.filter(Boolean) as BlogArticleCard[];
}

// ✅ slugs для generateStaticParams / sitemap
export const getAllArticleSlugs = cache(
  async (): Promise<Array<{ lang: Lang; slug: string }>> => {
    const langs: Lang[] = ["ru", "kz", "en"];
    const all: Array<{ lang: Lang; slug: string }> = [];

    for (const lang of langs) {
      const files = await listMdxFilesForLang(lang);
      for (const f of files) {
        all.push({ lang, slug: f.replace(/\.mdx$/, "") });
      }
    }

    return all;
  }
);

// ✅ карточки для /[lang]/blog
export const getAllArticles = cache(
  async (lang: Lang): Promise<BlogArticleCard[]> => {
    const files = await listMdxFilesForLang(lang);

    const cards: BlogArticleCard[] = [];
    for (const f of files) {
      const fileSlug = f.replace(/\.mdx$/, "");
      const raw = await readMdxFile(lang, fileSlug);
      if (!raw) continue;

      const fm = parseFrontmatter(raw);
      cards.push(frontmatterToCard(fm));
    }

    // надёжная сортировка по дате
    cards.sort((a, b) => toDateMs(b.publishedAt) - toDateMs(a.publishedAt));
    return cards;
  }
);

// ✅ статьи автора (для страницы автора)
export const getArticlesByAuthor = cache(
  async (lang: Lang, authorSlug: string): Promise<BlogArticleCard[]> => {
    const cards = await getAllArticles(lang);
    return cards
      .filter((c) => c.authorSlug === authorSlug)
      .sort((a, b) => toDateMs(b.publishedAt) - toDateMs(a.publishedAt));
  }
);

// ✅ статья /[lang]/blog/[slug]
export const getArticleBySlug = cache(
  async (lang: Lang, slug: string): Promise<BlogArticle | null> => {
    const rawFile = await readMdxFile(lang, slug);
    if (!rawFile) return null;

    const parsed = matter(rawFile);
    const fm = parseFrontmatter(rawFile);
    const toc = extractTocFromMdx(parsed.content);

    // ✅ резолвим явные связи в карточки (без компиляции MDX у связных статей)
    const [requiredReading, nextSteps] = await Promise.all([
      resolveLinkedCards(lang, fm.slug, fm.requiredSlugs),
      resolveLinkedCards(lang, fm.slug, fm.nextSlugs),
    ]);

    const compiled = await compileMDX({
      source: parsed.content,
      options: {
        parseFrontmatter: false,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
      components: {
        Callout,
        Cta,
        Table,

        // ✅ новые “инструменты оформления”
        Lead,
        KeyTakeaway,
        Divider,
        ScopeNote,
        FromPractice,
        UpdateNotice,
        ContentStatus,
        InlineCta,

        // ✅ headings + списки + чекбоксы
        ...mdxHeadingComponents,

        // ✅ markdown-таблицы
        table: MdxTable,
        thead: MdxThead,
        tbody: MdxTbody,
        tr: MdxTr,
        th: MdxTh,
        td: MdxTd,
      },
    });

    return {
      ...fm,
      content: compiled.content,
      raw: parsed.content,
      toc,

      // ✅ новые поля для “системы обучения”
      requiredReading,
      nextSteps,
    };
  }
);

// ✅ автор
export async function getAuthorBySlug(
  slug?: string,
  lang: Lang = "ru"
): Promise<ArticleAuthor | null> {
  if (!slug) return null;

  const record = AUTHORS.find((a) => a.slug === slug);
  if (!record) return null;

  const loc = record.i18n[lang] ?? record.i18n.ru;

  return {
    slug: record.slug,
    name: loc.name,
    title: loc.title,
    shortBio: loc.shortBio,
    bio: loc.bio,
    photo: record.photo,
    linkedin: record.linkedin,
  };
}

// ✅ похожие статьи (по тегам) — оставляем как fallback/доп. блок
export async function getRelatedArticles(
  article: BlogFrontmatter,
  limit = 6
): Promise<BlogArticleCard[]> {
  const cards = await getAllArticles(article.lang);
  const currentTags = new Set(article.tags);

  return cards
    .filter((c) => c.slug !== article.slug)
    .map((c) => ({
      c,
      score: c.tags.reduce(
        (acc, t) => acc + (currentTags.has(t) ? 1 : 0),
        0
      ),
    }))
    .sort((x, y) => {
      if (y.score !== x.score) return y.score - x.score;
      return toDateMs(y.c.publishedAt) - toDateMs(x.c.publishedAt);
    })
    .slice(0, limit)
    .map((x) => x.c);
}
