// app/components/products/ProductsDirectory.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/dictionaries/header";
import type { Category, ProductsPageUI } from "@/dictionaries/products";

import AutoProductsSection from "@/components/products/AutoProductsSection";
import PropertyProductsSection from "@/components/products/PropertyProductsSection";

import {
  getProductsDirectoryDictionary,
  type ProductsDirectoryDictionary,
} from "@/dictionaries/products/productsDirectory";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

type Props = {
  categories: Category[];
  lang: Lang;
  base: string;
  ui: ProductsPageUI;
};

export default function ProductsDirectory({ categories, lang, base, ui }: Props) {
  const dict: ProductsDirectoryDictionary = getProductsDirectoryDictionary(lang);

  // ✅ memo, чтобы deps useMemo/useEffect не "прыгали" на каждом рендере
  const safe = useMemo<Category[]>(
    () => (Array.isArray(categories) ? categories : []),
    [categories]
  );

  const keys = useMemo<Array<Category["key"]>>(() => safe.map((c) => c.key), [safe]);

  const keysSet = useMemo<Set<Category["key"]>>(() => new Set(keys), [keys]);

  const coerceKey = (raw: string): Category["key"] => {
    const candidate = raw as Category["key"];
    if (keysSet.has(candidate)) return candidate;
    return keys[0] ?? "auto";
  };

  const [active, setActive] = useState<Category["key"]>(keys[0] ?? "auto");

  // ✅ если categories/keys поменялись и active стал невалидным — исправляем
  useEffect(() => {
    if (!keysSet.has(active)) {
      setActive(keys[0] ?? "auto");
    }
  }, [active, keys, keysSet]);

  // открыть по hash при загрузке + реагировать на смену hash
  useEffect(() => {
    const applyHash = () => {
      const raw = window.location.hash?.replace("#", "") || "";
      if (!raw) return;

      const nextKey = raw as Category["key"];
      if (keysSet.has(nextKey)) setActive(nextKey);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [keysSet]);

  const onPick = (key: Category["key"]) => {
    setActive(key);
    window.history.replaceState(null, "", `#${key}`);
  };

  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4">
        {/* MOBILE MENU */}
        <div className="lg:hidden">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {dict.mobileLabel}
          </label>

          <select
            value={active}
            onChange={(e) => onPick(coerceKey(e.target.value))}
            className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm"
          >
            {safe.map((c) => (
              <option key={c.key} value={c.key}>
                {c.title[lang]}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8">
          {/* LEFT NAV (DESKTOP) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-black/10 bg-white">
              <div className="px-4 py-3 border-b border-black/10">
                <div className="text-sm font-semibold text-[#1A3A5F]">{ui.quick}</div>
              </div>

              <nav className="p-2">
                {safe.map((c) => {
                  const isActive = c.key === active;

                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => onPick(c.key)}
                      className={cx(
                        "w-full text-left rounded-xl px-3 py-3 transition",
                        "border border-transparent",
                        isActive
                          ? "bg-[#F4F6FA] border-black/10"
                          : "hover:bg-black/[0.03]"
                      )}
                    >
                      <div className="text-sm font-semibold text-[#0f2238]">
                        {c.title[lang]}
                      </div>
                      <div className="mt-1 text-xs text-gray-600 line-clamp-2">
                        {c.lead[lang]}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <div className="space-y-6">
            {safe.map((c) => {
              const isOpen = c.key === active;

              return (
                <section
                  key={c.key}
                  id={c.key}
                  className={cx(
                    "rounded-2xl border border-black/10 bg-white",
                    isOpen ? "shadow-sm" : ""
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onPick(c.key)}
                    className={cx(
                      "w-full text-left px-5 sm:px-6 py-5 sm:py-6",
                      "flex items-start justify-between gap-4"
                    )}
                    aria-expanded={isOpen}
                  >
                    <div className="min-w-0">
                      <div className="text-base sm:text-lg font-bold text-[#0f2238]">
                        {c.title[lang]}
                      </div>
                      <p className="mt-2 text-sm text-gray-700">{c.lead[lang]}</p>

                      <div className="mt-3 text-sm text-gray-700">
                        {(c.bullets?.[lang] ?? []).join(" • ")}
                      </div>
                    </div>

                    <div className="shrink-0 text-xs text-gray-500 pt-1">
                      {isOpen ? dict.hide : dict.open}
                    </div>
                  </button>

                  {isOpen ? (
                    <div className="px-5 sm:px-6 pb-6">
                      {c.key === "auto" ? (
                        <AutoProductsSection lang={lang} base={base} ui={ui} />
                      ) : c.key === "property" ? (
                        <PropertyProductsSection lang={lang} base={base} ui={ui} />
                      ) : (
                        <div className="rounded-2xl border border-black/10 bg-[#F7F7F7] p-5">
                          <div className="text-sm font-semibold text-[#1A3A5F]">
                            {dict.inProgressTitle}
                          </div>
                          <p className="mt-2 text-sm text-gray-700">
                            {dict.inProgressText}
                          </p>

                          <div className="mt-4">
                            <a href={`${base}/contacts`} className="btn btn-secondary">
                              {ui.btnRequest}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
