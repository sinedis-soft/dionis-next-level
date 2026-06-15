import React from "react";

type Lang = "ru" | "en" | "kz";

type Props = {
  title?: string;
  children?: React.ReactNode;
  lang?: string;
};

const TITLE: Record<Lang, string> = {
  ru: "Из практики",
  en: "From practice",
  kz: "Тәжірибеден",
};

function normalizeLang(lang?: string): Lang {
  const value = String(lang ?? "ru").toLowerCase();
  if (value === "kk") return "kz";
  return value === "ru" || value === "en" || value === "kz" ? value : "ru";
}

export default function FromPractice({ title, children, lang }: Props) {
  if (!children) return null;

  return (
    <section className="u-my-6 u-rounded-2xl u-border u-border-gray-200 u-bg-gray-50 u-p-5">
      <div className="u-text-sm u-font-semibold u-text-gray-900">
        {title ?? TITLE[normalizeLang(lang)]}
      </div>
      <div className="u-mt-2 u-text-sm u-leading-relaxed u-text-gray-700">{children}</div>
    </section>
  );
}
