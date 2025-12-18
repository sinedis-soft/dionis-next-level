// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";
const HREFLANG: Record<Lang, string> = {
  ru: "ru",
  kz: "kk-KZ", // ВАЖНО: для SEO
  en: "en",
};

const LANG_URL: Record<Lang, string> = {
  ru: "/ru",
  kz: "/kz",
  en: "/en",
};


import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsManager from "@/components/AnalyticsManager";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ lang: Lang }> {
  return [{ lang: "ru" }, { lang: "kz" }, { lang: "en" }];
}

function normalizeLang(value: unknown): Lang {
  return value === "ru" || value === "kz" || value === "en" ? value : "ru";
}

function getSeo(lang: Lang) {
  // Минимально. Потом можешь вынести в словари.
  if (lang === "ru") {
    return {
      title: "Dionis Insurance — страхование онлайн",
      description:
        "Оформление страховых продуктов онлайн: Зеленая карта, ОСАГО, страхование грузов и ответственность перевозчиков.",
    };
  }
  if (lang === "kz") {
    return {
      title: "Dionis Insurance — онлайн сақтандыру",
      description:
        "Онлайн сақтандыру: Green Card, ОСАГО және басқа сақтандыру өнімдері. Жылдам өтінім және кеңес.",
    };
  }
  return {
    title: "Dionis Insurance — online insurance",
    description:
      "Buy insurance online: Green Card, OSAGO and other insurance products. Fast request and support.",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const seo = getSeo(lang);

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: LANG_URL[lang],
      languages: {
        [HREFLANG.ru]: LANG_URL.ru,
        [HREFLANG.kz]: LANG_URL.kz,
        [HREFLANG.en]: LANG_URL.en,
        "x-default": LANG_URL.ru,
      },
    },
  };
}


export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  return (
    <>
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <SiteFooter lang={lang} />
      <CookieConsent lang={lang} />
      <AnalyticsManager />
    </>
  );
}
