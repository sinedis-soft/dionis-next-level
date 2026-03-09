// components/blog/AuthorArticles.tsx
import type { BlogArticleCard } from "@/lib/blog";
import ContentTypeBadge from "@/components/blog/ContentTypeBadge";

type Props = {
  lang: string;
  items: BlogArticleCard[];
};

export default function AuthorArticles({ lang, items }: Props) {
  if (!items.length) {
    return (
      <div className="mt-6 rounded-2xl border bg-white p-4 text-sm text-gray-700">
        Пока нет опубликованных статей этого автора.
      </div>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-[#1A3A5F]">Статьи автора</h2>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((x) => (
          <a
            key={x.slug}
            href={`/${lang}/blog/${x.slug}`}
            className="rounded-2xl border bg-white p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between gap-3">
              <ContentTypeBadge type={x.contentType} size="sm" />
              <div className="text-xs text-gray-500">{x.readingTime}</div>
            </div>

            <div className="mt-2 font-semibold text-[#1A3A5F]">{x.title}</div>

            <div className="mt-2 text-sm text-gray-700 line-clamp-2">
              {x.excerpt}
            </div>

            <div className="mt-3 text-xs text-gray-500">
              {new Date(x.publishedAt).toLocaleDateString(
                lang === "kz" ? "kk-KZ" : lang === "en" ? "en-US" : "ru-RU"
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
