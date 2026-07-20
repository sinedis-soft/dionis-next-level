// components/blog/AuthorArticles.tsx
import type { Lang } from "@/dictionaries/header";
import { getBlogDictionary } from "@/dictionaries/blog";
import type { BlogArticleCard } from "@/lib/blog";
import ContentTypeBadge from "@/components/blog/ContentTypeBadge";

type Props = {
  lang: Lang;
  items: BlogArticleCard[];
};

export default function AuthorArticles({ lang, items }: Props) {
  const dict = getBlogDictionary(lang);

  if (!items.length) {
    return (
      <div className="u-mt-6 u-rounded-2xl u-border u-bg-white u-p-4 u-text-sm u-text-gray-700">
        {dict.noAuthorArticles}
      </div>
    );
  }

  return (
    <section className="u-mt-8">
      <h2 className="u-text-xl u-font-semibold u-text--1a3a5f">
        {dict.authorArticlesTitle}
      </h2>

      <div className="u-mt-4 u-grid u-grid-cols-1 u-sm-grid-cols-2 u-lg-grid-cols-3 u-gap-6">
        {items.map((x) => (
          <a
            key={x.slug}
            href={`/${lang}/blog/${x.slug}`}
            className="u-rounded-2xl u-border u-bg-white u-p-4 u-hover-shadow-sm u-transition-shadow"
          >
            <div className="u-flex u-items-center u-justify-between u-gap-3">
              <ContentTypeBadge type={x.contentType} lang={lang} size="sm" />
              <div className="u-text-xs u-text-gray-500">{x.readingTime}</div>
            </div>

            <div className="u-mt-2 u-font-semibold u-text--1a3a5f">
              {x.title}
            </div>

            <div className="u-mt-2 u-text-sm u-text-gray-700 u-line-clamp-2">
              {x.excerpt}
            </div>

            <div className="u-mt-3 u-text-xs u-text-gray-500">
              {new Date(x.publishedAt).toLocaleDateString(
                lang === "kz" ? "kk-KZ" : lang === "en" ? "en-KZ" : "ru-RU",
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
