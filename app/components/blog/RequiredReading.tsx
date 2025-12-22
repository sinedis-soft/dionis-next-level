import type { BlogArticleCard } from "@/lib/blog";
import ArticleCard from "@/components/blog/ArticleCard";

type Props = {
  items: BlogArticleCard[];
};

export default function RequiredReading({ items }: Props) {
  if (!items.length) return null;

  return (
    <section className="mt-12 rounded-xl border bg-slate-50 p-6">
      <h3 className="text-lg font-semibold mb-4">Обязательное чтение</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
