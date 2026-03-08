import type { BlogArticleCard } from "@/lib/blog";
import ArticleCard from "@/components/blog/ArticleCard";

type Props = {
  items: BlogArticleCard[];
};

export default function NextStep({ items }: Props) {
  if (!items.length) return null;

  return (
    <section className="u-mt-12">
      <h3 className="u-text-lg u-font-semibold u-mb-4">Что читать дальше</h3>

      <div className="u-grid u-gap-4 u-sm-grid-cols-2 u-lg-grid-cols-3">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
