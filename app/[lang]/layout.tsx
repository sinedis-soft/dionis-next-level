// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsManager from "@/components/AnalyticsManager";

// ✅ PROD домен + можно переопределять через env
const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") as string | undefined) ??
  "https://dionis-insurance.kz";

const HREFLANG: Record<Lang, string> = {
  ru: "ru",
  kz: "kk-KZ", // SEO: казахский (Казахстан)
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

function abs(path: string) {
  return `${SITE_URL}${path}`;
}

// ✅ Главная /ru — брендовая (без продуктового интента)
// Продукты — на отдельных страницах
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
    title: "Dionis Insurance Broker — insurance broker in Kazakhstan (Almaty) | Official",
    description:
      "Insurance broker in Kazakhstan: program selection, consulting and support. Officially licensed. Almaty, phone and messengers.",
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

    // ✅ абсолютный canonical
    alternates: {
      canonical: abs(LANG_PATH[lang]),

      // ✅ абсолютные hreflang
      languages: {
        [HREFLANG.ru]: abs(LANG_PATH.ru),
        [HREFLANG.kz]: abs(LANG_PATH.kz),
        [HREFLANG.en]: abs(LANG_PATH.en),
        "x-default": abs(LANG_PATH.ru),
      },
    },

    // (не обязательно, но полезно)
    metadataBase: new URL(SITE_URL),
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
