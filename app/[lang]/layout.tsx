// app/[lang]/layout.tsx

import type { ReactNode } from "react";
import { Suspense } from "react";

import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";

import type { Lang } from "@/dictionaries/header";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";

import AnalyticsScripts from "@/components/AnalyticsScripts";
import AnalyticsManager from "@/components/AnalyticsManager";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.kz"
).replace(/\/$/, "");

/* ---------- Fonts ---------- */

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-roboto",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

/* ---------- Helpers ---------- */

function normalizeLang(value: string): Lang {
  return value === "ru" || value === "kz" || value === "en"
    ? value
    : "ru";
}

function langToIana(lang: Lang): string {
  if (lang === "kz") return "kk-KZ";
  if (lang === "en") return "en-US";
  return "ru-RU";
}

function htmlLang(lang: Lang): string {
  if (lang === "kz") return "kk";
  if (lang === "en") return "en";
  return "ru";
}

/* ---------- Metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;

  const lang = normalizeLang(rawLang);

  return {
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        ru: `${SITE_URL}/ru`,
        "kk-KZ": `${SITE_URL}/kz`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}`,
      },
    },
  };
}

/* ---------- Layout ---------- */

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;

  const lang = normalizeLang(rawLang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Dionis Insurance Broker, LLP",
        legalName:
          "Товарищество с ограниченной ответственностью «Страховой брокер Дионис»",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.webp`,
        image: `${SITE_URL}/logo.webp`,
        email: "info@dionis-insurance.kz",
        telephone: ["+77273573030", "+375447030303"],
        address: {
          "@type": "PostalAddress",
          addressCountry: "KZ",
          addressLocality: "Almaty",
          streetAddress: "Auezova Street, 14A",
          postalCode: "050009",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Dionis Insurance Broker",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
        inLanguage: [langToIana("ru"), langToIana("kz"), langToIana("en")],
      },
      {
        "@type": "InsuranceAgency",
        "@id": `${SITE_URL}/#insurance-broker`,
        name: "Dionis Insurance Broker",
        url: SITE_URL,
        parentOrganization: {
          "@id": `${SITE_URL}/#organization`,
        },
        description:
          "Licensed insurance broker providing independent insurance brokerage services.",
        areaServed: ["KZ"],
        knowsLanguage: [langToIana("ru"), langToIana("kz"), langToIana("en")],
      },
    ],
  };

  return (
    <html
      lang={htmlLang(lang)}
      className={`${roboto.variable} ${montserrat.variable}`}
    >
      <head>
        <link rel="stylesheet" href="/legacy.css" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>

      <body className="u-min-h-screen u-flex u-flex-col">
        <AnalyticsScripts />
        <AnalyticsManager />

        <Suspense fallback={<div className="u-h-16 u-xl-h-20" />}>
          <Header lang={lang} />
        </Suspense>

        <main className="u-flex-1">
          {children}
        </main>

        <SiteFooter lang={lang} />
        <CookieConsent lang={lang} />
      </body>
    </html>
  );
}