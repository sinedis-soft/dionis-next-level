// components/blog/BlogCards.tsx
import Image from "next/image";
import type { Lang } from "@/dictionaries/header";
import type { BlogArticleCard } from "@/lib/blog";

function localeByLang(lang: Lang) {
  if (lang === "kz") return "kk-KZ";
  if (lang === "en") return "en-KZ";
  return "ru-RU";
}

export default function BlogCards({
  lang,
  articles,
}: {
  lang: Lang;
  articles: BlogArticleCard[];
}) {
  const locale = localeByLang(lang);

  return (
    <div className="bc-grid">
      {articles.map((a) => (
        <a key={a.slug} href={`/${lang}/blog/${a.slug}`} className="bc-card">
          <div className="bc-media">
            <Image
              src={a.image}
              alt={a.imageAlt || a.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="bc-img"
              priority={false}
            />
          </div>

          <div className="bc-body">
            {/* Tags */}
            {a.tags?.length ? (
              <div className="bc-tags">
                {a.tags.slice(0, 2).map((t) => (
                  <span key={t} className="bc-tag">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}

            <h3 className="bc-title">{a.title}</h3>

            <p className="bc-excerpt">{a.excerpt}</p>

            <div className="bc-meta">
              <span>{new Date(a.publishedAt).toLocaleDateString(locale)}</span>
              <span className="bc-dot" aria-hidden="true">
                •
              </span>
              <span>{a.readingTime}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
