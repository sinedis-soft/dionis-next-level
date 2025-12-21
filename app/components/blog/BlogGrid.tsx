// components/blog/BlogGrid.tsx
import type { Lang } from "@/dictionaries/header";
import type { BlogArticleCard } from "@/lib/blog";

import BlogFilters from "@/components/blog/BlogFilters.client";

export default function BlogGrid({
  lang,
  articles,
}: {
  lang: Lang;
  articles: BlogArticleCard[];
}) {
  return (
    <section className="mt-6">
      <BlogFilters lang={lang} articles={articles} />
    </section>
  );
}
