// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsManager from "@/components/AnalyticsManager";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ??
    "https://dionis-insurance.kz") as string;

const HREFLANG: Record<Lang, string> = {
  ru: "ru",
  kz: "kk-KZ",
  en: "en",
};

const LANG_PATH: Record<Lang, string> = {
  ru: "/ru",
  kz: "/kz",
  en: "/en",
};

export const dynamicParams = false;

export function generateStaticParams(): Array<{ lang: Lang }> {
  return [{ lang: "ru" }, { lang: "kz" }, { lang: "en" }];
}

function normalizeLang(value: unknown): Lang {
  return value === "ru" || value === "kz" || value === "en" ? value : "ru";
}

function getSeo(lang: Lang) {
  if (lang === "ru") {
    return {
      title:
        "Dionis Insurance Broker — страховой брокер в Казахстане (Алматы) | Официально",
      description:
        "Страховой брокер в Казахстане: подбор страховых программ, консультации и сопровождение. Официально по лицензии. Алматы, связь по телефону и в мессенджерах.",
    };
  }

  if (lang === "kz") {
    return {
      title:
        "Dionis Insurance Broker — Қазақстандағы сақтандыру брокері (Алматы) | Ресми",
      description:
        "Қазақстандағы сақтандыру брокері: бағдарламаларды таңдау, кеңес беру және сүйемелдеу. Лицензия бойынша ресми жұмыс. Алматы, байланыс телефоны және мессенджерлер.",
    };
  }

  return {
    title:
      "Dionis Insurance Broker — insurance broker in Kazakhstan (Almaty) | Official",
    description:
      "Insurance broker in Kazakhstan: program selection, consulting and support. Officially licensed. Almaty, phone and messengers.",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params; // ✅ важно
  const lang = normalizeLang(rawLang);
  const seo = getSeo(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: LANG_PATH[lang],
      languages: {
        [HREFLANG.ru]: LANG_PATH.ru,
        [HREFLANG.kz]: LANG_PATH.kz,
        [HREFLANG.en]: LANG_PATH.en,
        "x-default": LANG_PATH.ru,
      },
      types: {
        "application/rss+xml": [
          {
            url: `/${lang}/rss.xml`,
            title: `Dionis Blog RSS (${lang.toUpperCase()})`,
          },
        ],
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
  const { lang: rawLang } = await params; // ✅ важно
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
