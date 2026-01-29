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
        classes: "border-emerald-200 bg-emerald-50 text-emerald-900",
      };
    case "needs-check":
      return {
        classes: "border-amber-200 bg-amber-50 text-amber-900",
      };
    case "archived":
      return {
        classes: "border-gray-200 bg-gray-50 text-gray-800",
      };
  }
}

export default function ContentStatus({ status, reason, lang }: Props) {
  const ui = statusUi(status);

  const safeLang = normalizeLang(lang);
  const t = STATUS_DICTIONARY[safeLang] ?? STATUS_DICTIONARY[DEFAULT_LANG];

  return (
    <div className={`my-6 rounded-2xl border p-5 ${ui.classes}`}>
      <div className="text-sm font-semibold">
        {t.title}: <span className="font-bold">{t.statuses[status]}</span>
      </div>
      

      {reason ? (
        <div className="mt-2 text-sm leading-relaxed opacity-80">{reason}</div>
      ) : null}
    </div>
  );
}
