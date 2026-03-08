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
    <section className="u-py-10 u-sm-py-14">
      <div className="u-max-w-6xl u-mx-auto u-px-4">
        {/* MOBILE MENU */}
        <div className="u-lg-hidden">
          <label className="u-block u-text-sm u-font-medium u-text-gray-700 u-mb-2">
            {dict.mobileLabel}
          </label>

          <select
            value={active}
            onChange={(e) => onPick(coerceKey(e.target.value))}
            className="u-w-full u-rounded-xl u-border u-border-black-10 u-bg-white u-px-4 u-py-3 u-text-sm"
          >
            {safe.map((c) => (
              <option key={c.key} value={c.key}>
                {c.title[lang]}
              </option>
            ))}
          </select>
        </div>

        <div className="u-mt-6 u-grid u-grid-cols-1 u-lg-grid-cols--280px_minmax-0-1fr u-gap-8">
          {/* LEFT NAV (DESKTOP) */}
          <aside className="u-hidden u-lg-block">
            <div className="u-sticky u-top-24 u-rounded-2xl u-border u-border-black-10 u-bg-white">
              <div className="u-px-4 u-py-3 u-border-b u-border-black-10">
                <div className="u-text-sm u-font-semibold u-text--1a3a5f">{ui.quick}</div>
              </div>

              <nav className="u-p-2">
                {safe.map((c) => {
                  const isActive = c.key === active;

                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => onPick(c.key)}
                      className={cx(
                        "u-w-full u-text-left u-rounded-xl u-px-3 u-py-3 u-transition",
                        "u-border u-border-transparent",
                        isActive
                          ? "u-bg--f4f6fa u-border-black-10"
                          : "u-hover-bg-black-0-03"
                      )}
                    >
                      <div className="u-text-sm u-font-semibold u-text--0f2238">
                        {c.title[lang]}
                      </div>
                      <div className="u-mt-1 u-text-xs u-text-gray-600 u-line-clamp-2">
                        {c.lead[lang]}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <div className="u-space-y-6">
            {safe.map((c) => {
              const isOpen = c.key === active;

              return (
                <section
                  key={c.key}
                  id={c.key}
                  className={cx(
                    "u-rounded-2xl u-border u-border-black-10 u-bg-white",
                    isOpen ? "u-shadow-sm" : ""
                  )}
                >
                  <button
                    type="button"
                    onClick={() => onPick(c.key)}
                    className={cx(
                      "u-w-full u-text-left u-px-5 u-sm-px-6 u-py-5 u-sm-py-6",
                      "u-flex u-items-start u-justify-between u-gap-4"
                    )}
                    aria-expanded={isOpen}
                  >
                    <div className="u-min-w-0">
                      <div className="u-text-base u-sm-text-lg u-font-bold u-text--0f2238">
                        {c.title[lang]}
                      </div>
                      <p className="u-mt-2 u-text-sm u-text-gray-700">{c.lead[lang]}</p>

                      <div className="u-mt-3 u-text-sm u-text-gray-700">
                        {(c.bullets?.[lang] ?? []).join(" • ")}
                      </div>
                    </div>

                    <div className="shrink-0 u-text-xs u-text-gray-500 u-pt-1">
                      {isOpen ? dict.hide : dict.open}
                    </div>
                  </button>

                  {isOpen ? (
                    <div className="u-px-5 u-sm-px-6 u-pb-6">
                      {c.key === "auto" ? (
                        <AutoProductsSection lang={lang} base={base} ui={ui} />
                      ) : c.key === "property" ? (
                        <PropertyProductsSection lang={lang} base={base} ui={ui} />
                      ) : (
                        <div className="u-rounded-2xl u-border u-border-black-10 u-bg--f7f7f7 u-p-5">
                          <div className="u-text-sm u-font-semibold u-text--1a3a5f">
                            {dict.inProgressTitle}
                          </div>
                          <p className="u-mt-2 u-text-sm u-text-gray-700">
                            {dict.inProgressText}
                          </p>

                          <div className="u-mt-4">
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
