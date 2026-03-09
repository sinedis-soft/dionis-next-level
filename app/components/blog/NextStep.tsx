import type { BlogArticleCard } from "@/lib/blog";
import ArticleCard from "@/components/blog/ArticleCard";

type Props = {
  items: BlogArticleCard[];
};

export default function NextStep({ items }: Props) {
  if (!items.length) return null;

  return (
    <section className="mt-12">
      <h3 className="text-lg font-semibold mb-4">Что читать дальше</h3>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
