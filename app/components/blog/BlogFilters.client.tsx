// components/blog/BlogFilters.client.tsx
"use client";

import { useMemo, useState } from "react";
import type { Lang } from "@/dictionaries/header";
import type { BlogArticleCard } from "@/lib/blog";
import BlogCards from "@/components/blog/BlogCards";

export default function BlogFilters({
  lang,
  articles,
}: {
  lang: Lang;
  articles: BlogArticleCard[];
}) {
  const allTags = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => a.tags.forEach((t) => set.add(t)));
    return ["Все", ...Array.from(set)];
  }, [articles]);

  const [tag, setTag] = useState<string>("Все");
  const [q, setQ] = useState<string>("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return articles.filter((a) => {
      const tagOk = tag === "Все" ? true : a.tags.includes(tag);
      if (!tagOk) return false;
      if (!query) return true;

      const hay = (a.title + " " + a.excerpt + " " + a.tags.join(" "))
        .toLowerCase();

      return hay.includes(query);
    });
  }, [articles, tag, q]);

  // Live search suggestions (по заголовку)
  const suggestions = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return articles
      .filter((a) => a.title.toLowerCase().includes(query))
      .slice(0, 6);
  }, [articles, q]);

  return (
    <>
      <div className="mt-6 flex flex-col gap-4">
        {/* Search */}
        <div className="relative max-w-xl">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Поиск по блогу…"
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#1A3A5F]/20"
          />

          {suggestions.length ? (
            <div className="absolute z-10 mt-2 w-full rounded-xl border bg-white shadow-sm overflow-hidden">
              {suggestions.map((s) => (
                <a
                  key={s.slug}
                  href={`/${lang}/blog/${s.slug}`}
                  className="block px-4 py-3 text-sm hover:bg-gray-50"
                >
                  {s.title}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => {
            const active = t === tag;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTag(t)}
                className={
                  active
                    ? "rounded-full bg-[#1A3A5F] text-white px-4 py-2 text-sm"
                    : "rounded-full border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                }
              >
                #{t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <BlogCards lang={lang} articles={filtered} />
    </>
  );
}
