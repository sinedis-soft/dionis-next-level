import React from "react";

type Lang = "ru" | "en" | "kz";

type Props = {
  date: string;
  note?: string;
  lang?: string;
};

const DICT: Record<Lang, { dateLabel: string }> = {
  ru: { dateLabel: "Дата актуальности" },
  en: { dateLabel: "Current as of" },
  kz: { dateLabel: "Өзекті күні" },
};

function normalizeLang(lang?: string): Lang {
  const value = String(lang ?? "ru").toLowerCase();
  if (value === "kk") return "kz";
  return value === "ru" || value === "en" || value === "kz" ? value : "ru";
}

export default function UpdateNotice({ date, note, lang }: Props) {
  const t = DICT[normalizeLang(lang)];

  return (
    <div className="u-my-6 u-rounded-2xl u-border u-border-sky-200 u-bg-sky-50 u-p-5">
      <div className="u-text-sm u-font-semibold u-text-sky-900">
        {t.dateLabel}: <span className="u-font-bold">{date}</span>
      </div>
      {note ? (
        <div className="u-mt-2 u-text-sm u-leading-relaxed u-text-sky-900-80">
          {note}
        </div>
      ) : null}
    </div>
  );
}
