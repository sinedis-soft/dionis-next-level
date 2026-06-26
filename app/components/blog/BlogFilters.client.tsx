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
      <div className="u-mt-6 u-flex u-flex-col u-gap-4">
        <div className="u-relative u-max-w-xl">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label={ui.searchPlaceholder}
            placeholder={ui.searchPlaceholder}
            className="u-w-full u-rounded-xl u-border u-px-4 u-py-3 u-text-sm u-outline-none u-focus-ring-2 u-focus-ring--1a3a5f-20"
          />

          {suggestions.length ? (
            <div className="u-absolute u-z-10 u-mt-2 u-w-full u-rounded-xl u-border u-bg-white u-shadow-sm u-overflow-hidden">
              {suggestions.map((s) => (
                <a
                  key={s.slug}
                  href={`/${lang}/blog/${s.slug}`}
                  className="u-block u-px-4 u-py-3 u-text-sm u-hover-bg-gray-50"
                >
                  {s.title}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <div className="u-flex u-flex-wrap u-gap-2">
          {allTags.map((item) => {
            const active = item.key === tag;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setTag(item.key)}
                className={
                  active
                    ? "u-rounded-full u-bg--1a3a5f u-text-white u-px-4 u-py-2 u-text-sm"
                    : "u-rounded-full u-border u-px-4 u-py-2 u-text-sm u-text-gray-700 u-hover-bg-gray-50"
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
