import React from "react";

type Status = "actual" | "needs-check" | "archived";
type Lang = "ru" | "en" | "kz";

type Props = {
  status: Status;
  reason?: string;
  lang?: string; // важно: строка, потому что из MDX/route часто нестрогая
};

const DEFAULT_LANG: Lang = "ru";

const STATUS_DICTIONARY: Record<
  Lang,
  { title: string; statuses: Record<Status, string> }
> = {
  ru: {
    title: "Статус материала",
    statuses: {
      actual: "Актуально",
      "needs-check": "Требует проверки",
      archived: "Архив",
    },
  },
  en: {
    title: "Content status",
    statuses: {
      actual: "Up to date",
      "needs-check": "Needs review",
      archived: "Archived",
    },
  },
  kz: {
    title: "Материал мәртебесі",
    statuses: {
      actual: "Өзекті",
      "needs-check": "Тексеруді қажет етеді",
      archived: "Мұрағат",
    },
  },
};

function normalizeLang(lang?: string): Lang {
  if (!lang) return DEFAULT_LANG;

  const v = String(lang).toLowerCase();

  // на случай, если кто-то передаст "kk" вместо "kz"
  if (v === "kk") return "kz";

  if (v === "ru" || v === "en" || v === "kz") return v;
  return DEFAULT_LANG;
}

function statusUi(status: Status) {
  switch (status) {
    case "actual":
      return {
        classes: "u-border-emerald-200 u-bg-emerald-50 u-text-emerald-900",
      };
    case "needs-check":
      return {
        classes: "u-border-amber-200 u-bg-amber-50 u-text-amber-900",
      };
    case "archived":
      return {
        classes: "u-border-gray-200 u-bg-gray-50 u-text-gray-800",
      };
  }
}

export default function ContentStatus({ status, reason, lang }: Props) {
  const ui = statusUi(status);

  const safeLang = normalizeLang(lang);
  const t = STATUS_DICTIONARY[safeLang] ?? STATUS_DICTIONARY[DEFAULT_LANG];

  return (
    <div className={`u-my-6 u-rounded-2xl u-border u-p-5 ${ui.classes}`}>
      <div className="u-text-sm u-font-semibold">
        {t.title}: <span className="u-font-bold">{t.statuses[status]}</span>
      </div>
      

      {reason ? (
        <div className="u-mt-2 u-text-sm u-leading-relaxed u-opacity-80">{reason}</div>
      ) : null}
    </div>
  );
}
