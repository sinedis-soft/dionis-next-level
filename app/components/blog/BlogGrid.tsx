// components/blog/BlogGrid.tsx
import type { Lang } from "@/dictionaries/header";
import type { BlogArticleCard } from "@/lib/blog";

import BlogFilters from "@/components/blog/BlogFilters.client";

export type BlogGridUi = {
  searchPlaceholder: string;
  allTag: string;
};

export default function BlogGrid({
  lang,
  articles,
  ui,
}: {
  lang: Lang;
  articles: BlogArticleCard[];
  ui: BlogGridUi;
}) {
  return (
    <section className="u-mt-6">
      <BlogFilters lang={lang} articles={articles} ui={ui} />
    </section>
  );
}
