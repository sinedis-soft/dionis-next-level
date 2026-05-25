import type { Lang } from "@/dictionaries/header";
import { getAllArticles } from "@/lib/blog";

export const BLOG_PAGE_SIZE = 12;

export async function getBlogPagination(lang: Lang) {
  const articles = await getAllArticles(lang);
  const total = articles.length;
  const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));
  return { articles, totalPages, total };
}

export function getBlogPagePath(lang: Lang, page: number) {
  if (page <= 1) return `/${lang}/blog`;
  return `/${lang}/blog/page/${page}`;
}
