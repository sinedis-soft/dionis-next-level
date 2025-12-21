// lib/blog.ts
import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import type { ReactNode } from "react";
import type { Lang } from "@/dictionaries/header";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";
import Callout from "@/components/blog/mdx/Callout";
import Cta from "@/components/blog/mdx/Cta";
import Table from "@/components/blog/mdx/Table";
import remarkGfm from "remark-gfm";
import {
  MdxTable,
  MdxThead,
  MdxTbody,
  MdxTr,
  MdxTh,
  MdxTd,
} from "@/components/blog/mdx/MdxTable";


export type BlogFAQItem = { q: string; a: string };

export type ArticleAuthor = {
  slug: string;
  name: string;
  title?: string;
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
};

export type BlogArticle = BlogFrontmatter & {
  content: ReactNode; // compiled MDX content
  raw: string;        // MDX без frontmatter
  toc: TocItem[];     // оглавление (H2/H3)
};

export type BlogArticleCard = Pick<
  BlogFrontmatter,
  | "slug"
  | "lang"
  | "title"
  | "seoDescription"
  | "publishedAt"
  | "readingTime"
  | "image"
  | "imageAlt"
  | "tags"
> & { excerpt: string };

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

// ---- Авторы (пока можно держать в коде/JSON, это не контент статей)
const AUTHORS: ArticleAuthor[] = [
  {
    slug: "denis-borovoy",
    name: "Денис Боровой",
    title: "Исполнительный директор, страховой брокер",
    bio: "Практика в страховании и урегулировании убытков. Специализация — авто, ответственность, логистика.",
    photo: "/director-photo.webp",
  },
];

function normalizeLang(lang: string): Lang {
  if (lang === "ru" || lang === "kz" || lang === "en") return lang;
  return "ru";
}

function safeExcerpt(seoDescription: string) {
  return (seoDescription || "").trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

// Парсим оглавление из сырого MDX (без frontmatter)
// Поддержка:
//   ## Заголовок {#id}
//   ### Подзаголовок {#id}
// Если {#id} нет — генерим slugify()
function extractTocFromMdx(rawMdx: string): TocItem[] {
  const lines = rawMdx.split("\n");
  const toc: TocItem[] = [];

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?\s*$/);
    if (h2) {
      const text = h2[1].trim();
      toc.push({
        level: 2,
        text,
        id: h2[2] || slugify(text),
      });
      continue;
    }

    const h3 = line.match(/^###\s+(.+?)(?:\s+\{#([a-zA-Z0-9_-]+)\})?\s*$/);
    if (h3) {
      const text = h3[1].trim();
      toc.push({
        level: 3,
        text,
        id: h3[2] || slugify(text),
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

  const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];

  // без any — используем unknown
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

  return {
    slug,
    lang,
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
  };
}

// Кэшируем на уровне RSC (ускоряет dev и билд)
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

export const getAllArticles = cache(
  async (lang: Lang): Promise<BlogArticleCard[]> => {
    const files = await listMdxFilesForLang(lang);

    const cards: BlogArticleCard[] = [];
    for (const f of files) {
      const slug = f.replace(/\.mdx$/, "");
      const raw = await readMdxFile(lang, slug);
      if (!raw) continue;

      const fm = parseFrontmatter(raw);
      cards.push({
        slug: fm.slug,
        lang: fm.lang,
        title: fm.title,
        seoDescription: fm.seoDescription,
        excerpt: safeExcerpt(fm.seoDescription),
        publishedAt: fm.publishedAt,
        readingTime: fm.readingTime,
        image: fm.image,
        imageAlt: fm.imageAlt,
        tags: fm.tags,
      });
    }

    cards.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
    return cards;
  }
);

export const getArticleBySlug = cache(
  async (lang: Lang, slug: string): Promise<BlogArticle | null> => {
    const rawFile = await readMdxFile(lang, slug);
    if (!rawFile) return null;

    const parsed = matter(rawFile);
    const fm = parseFrontmatter(rawFile);

    const toc = extractTocFromMdx(parsed.content);

    // MDX -> ReactNode (server)
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

    // Markdown tables styling (заработает после remark-gfm)
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
    };
  }
);

export async function getAuthorBySlug(
  slug?: string
): Promise<ArticleAuthor | null> {
  if (!slug) return null;
  return AUTHORS.find((a) => a.slug === slug) ?? null;
}

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
      return x.c.publishedAt < y.c.publishedAt ? 1 : -1;
    })
    .slice(0, limit)
    .map((x) => x.c);
}
