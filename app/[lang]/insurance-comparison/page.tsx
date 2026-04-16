import type { Metadata } from "next";
import Link from "next/link";

import type { Lang } from "@/dictionaries/header";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dionis-insurance.kz";

const ALLOWED_LANGS: Lang[] = ["ru", "kz", "en"];

function normalizeLang(value: string): Lang {
  return (ALLOWED_LANGS as readonly string[]).includes(value)
    ? (value as Lang)
    : "ru";
}

const UI = {
  ru: {
    title: "Сравнение страховых решений",
    description:
      "Сравнение страховых продуктов Dionis: ключевые отличия, покрытие и выбор оптимального решения.",
    h1: "Сравнение страховых решений",
    text: "Перейдите в каталог, чтобы сравнить доступные страховые продукты и условия.",
    cta: "Открыть каталог",
  },
  kz: {
    title: "Сақтандыру шешімдерін салыстыру",
    description:
      "Dionis сақтандыру өнімдерін салыстыру: негізгі айырмашылықтар, қамту және оңтайлы шешім.",
    h1: "Сақтандыру шешімдерін салыстыру",
    text: "Қолжетімді сақтандыру өнімдері мен шарттарды салыстыру үшін каталогқа өтіңіз.",
    cta: "Каталогты ашу",
  },
  en: {
    title: "Insurance Comparison",
    description:
      "Compare Dionis insurance options by coverage, conditions, and use case to choose the best policy.",
    h1: "Insurance Comparison",
    text: "Open the catalog to compare available insurance products and terms.",
    cta: "Open catalog",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);
  const ui = UI[lang];
  const canonical = `${SITE_URL}/insurance-comparison`;

  return {
    title: ui.title,
    description: ui.description,
    alternates: {
      canonical,
      languages: {
        ru: canonical,
        "kk-KZ": `${SITE_URL}/kz/insurance-comparison`,
        en: `${SITE_URL}/en/insurance-comparison`,
        "x-default": canonical,
      },
    },
  };
}

export default async function InsuranceComparisonPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);
  const ui = UI[lang];

  return (
    <main className="gc-container" style={{ paddingBlock: "48px" }}>
      <section>
        <h1>{ui.h1}</h1>
        <p>{ui.text}</p>
        <p>
          <Link href={`/${lang}/products`}>{ui.cta}</Link>
        </p>
      </section>
    </main>
  );
}
