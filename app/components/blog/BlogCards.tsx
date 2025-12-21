// components/blog/BlogCards.tsx
import Image from "next/image";
import type { Lang } from "@/dictionaries/header";
import type { BlogArticleCard } from "@/lib/blog";

export default function BlogCards({
  lang,
  articles,
}: {
  lang: Lang;
  articles: BlogArticleCard[];
}) {
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((a) => (
        <a
          key={a.slug}
          href={`/${lang}/blog/${a.slug}`}
          className="group rounded-2xl border bg-white overflow-hidden hover:shadow-sm transition-shadow"
        >
          <div className="relative aspect-[16/9] bg-gray-50">
            <Image
              src={a.image}
              alt={a.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          </div>

          <div className="p-5">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {a.tags.slice(0, 2).map((t) => (
                <span
                  key={t}
                  className="text-xs rounded-full px-2.5 py-1 bg-[#F4F6FA] text-[#1A3A5F]"
                >
                  {t}
                </span>
              ))}
            </div>

            <h3 className="mt-3 text-base font-semibold text-[#1A3A5F] group-hover:underline">
              {a.title}
            </h3>

            <p className="mt-2 text-sm text-gray-700 line-clamp-2">
              {a.excerpt}
            </p>

            <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
              <span>{new Date(a.publishedAt).toLocaleDateString("ru-RU")}</span>
              <span>•</span>
              <span>{a.readingTime}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
