import React from "react";

type Lang = "ru" | "en" | "kz";

type Props = {
  title?: string;
  children?: React.ReactNode;
  lang?: string;
};

const TITLE: Record<Lang, string> = {
  ru: "Ключевая мысль",
  en: "Key takeaway",
  kz: "Негізгі ой",
};

function normalizeLang(lang?: string): Lang {
  const value = String(lang ?? "ru").toLowerCase();
  if (value === "kk") return "kz";
  return value === "ru" || value === "en" || value === "kz" ? value : "ru";
}

export default function KeyTakeaway({ title, children, lang }: Props) {
  if (!children) return null;

  return (
    <aside className="u-my-6 u-rounded-2xl u-border u-border--1a3a5f-15 u-bg--1a3a5f-0-04 u-p-5">
      <div className="u-text-sm u-font-semibold u-text--1a3a5f">
        {title ?? TITLE[normalizeLang(lang)]}
      </div>
      <div className="u-mt-2 u-text-base u-leading-relaxed u-text-gray-700">{children}</div>
    </aside>
  );
}
