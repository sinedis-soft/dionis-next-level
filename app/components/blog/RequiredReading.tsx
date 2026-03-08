import type { BlogArticleCard } from "@/lib/blog";
import ArticleCard from "@/components/blog/ArticleCard";

type Props = {
  items: BlogArticleCard[];
};

export default function RequiredReading({ items }: Props) {
  if (!items.length) return null;

  return (
    <section className="u-mt-12 u-rounded-xl u-border u-bg-slate-50 u-p-6">
      <h3 className="u-text-lg u-font-semibold u-mb-4">Обязательное чтение</h3>

      <div className="u-grid u-gap-4 u-sm-grid-cols-2">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
