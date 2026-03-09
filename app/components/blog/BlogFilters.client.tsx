"use client";

import { useMemo, useState } from "react";
import type { Lang } from "@/dictionaries/header";
import type { BlogArticleCard } from "@/lib/blog";
import BlogCards from "@/components/blog/BlogCards";

const ALL_TAG_KEY = "__all__" as const;

export default function BlogFilters({
  lang,
  articles,
  ui,
}: {
  lang: Lang;
  articles: BlogArticleCard[] | undefined | null; // защита от реального runtime
  ui: { searchPlaceholder: string; allTag: string };
}) {
  const list = useMemo(() => (Array.isArray(articles) ? articles : []), [articles]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const a of list) {
      const t = Array.isArray((a as any)?.tags) ? (a as any).tags as string[] : [];
      for (const tag of t) set.add(tag);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [list]);

  const allTags = useMemo(
    () => [{ key: ALL_TAG_KEY, label: ui.allTag }, ...tags.map((x) => ({ key: x, label: x }))],
    [tags, ui.allTag]
  );

  const [tag, setTag] = useState<string>(ALL_TAG_KEY);
  const [q, setQ] = useState<string>("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return list.filter((a) => {
      const t = Array.isArray((a as any)?.tags) ? (a as any).tags as string[] : [];
      const tagOk = tag === ALL_TAG_KEY ? true : t.includes(tag);
      if (!tagOk) return false;
      if (!query) return true;
      const hay = ((a.title ?? "") + " " + (a.excerpt ?? "") + " " + t.join(" ")).toLowerCase();
      return hay.includes(query);
    });
  }, [list, tag, q]);

  const suggestions = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return list
      .filter((a) => (a.title ?? "").toLowerCase().includes(query))
      .slice(0, 6);
  }, [list, q]);

  return (
    <>
      <div className="mt-6 flex flex-col gap-4">
        <div className="relative max-w-xl">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={ui.searchPlaceholder}
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

        <div className="flex flex-wrap gap-2">
          {allTags.map((item) => {
            const active = item.key === tag;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTag(item.key)}
                className={
                  active
                    ? "rounded-full bg-[#1A3A5F] text-white px-4 py-2 text-sm"
                    : "rounded-full border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                }
              >
                #{item.label}
              </button>
            );
          })}
        </div>
      </div>

      <BlogCards lang={lang} articles={filtered} />
    </>
  );
}
