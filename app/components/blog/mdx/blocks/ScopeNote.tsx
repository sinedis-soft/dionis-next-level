import React from "react";

type Lang = "ru" | "en" | "kz";

type Props = {
  region?: string;
  children?: React.ReactNode;
  lang?: string;
};

const DICT: Record<Lang, { title: string; currentFor: string; defaultRegion: string }> = {
  ru: { title: "Область применимости", currentFor: "Актуально для", defaultRegion: "РК" },
  en: { title: "Scope", currentFor: "Current for", defaultRegion: "KZ" },
  kz: { title: "Қолданылу аясы", currentFor: "Өзекті аймақ", defaultRegion: "ҚР" },
};

function normalizeLang(lang?: string): Lang {
  const value = String(lang ?? "ru").toLowerCase();
  if (value === "kk") return "kz";
  return value === "ru" || value === "en" || value === "kz" ? value : "ru";
}

export default function ScopeNote({ region, children, lang }: Props) {
  const t = DICT[normalizeLang(lang)];

  return (
    <div className="u-my-6 u-rounded-2xl u-border u-border-amber-200 u-bg-amber-50 u-p-5">
      <div className="u-text-sm u-font-semibold u-text-amber-900">{t.title}</div>
      <div className="u-mt-1 u-text-sm u-text-amber-900-80">
        {t.currentFor}: <span className="u-font-semibold">{region ?? t.defaultRegion}</span>
      </div>

      {children ? (
        <div className="u-mt-3 u-text-sm u-leading-relaxed u-text-amber-900-80">
          {children}
        </div>
      ) : null}
    </div>
  );
}
