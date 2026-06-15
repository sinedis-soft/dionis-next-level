// app/[lang]/layout.tsx

import type { ReactNode } from "react";
import { Suspense } from "react";

import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";

import AnalyticsScripts from "@/components/AnalyticsScripts";
import AnalyticsManager from "@/components/AnalyticsManager";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.kz"
).replace(/\/$/, "");

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
        "ru-RU": `${SITE_URL}/ru`,
        "kk-KZ": `${SITE_URL}/kz`,
        "en-US": `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/en`,
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
        name: "Dionis Insurance Broker",
        legalName: "Dionis Insurance Broker",
        url: SITE_URL,
        logo: `${SITE_URL}/logo_1.webp`,
        image: `${SITE_URL}/logo_1.webp`,
        email: "info@dionis-insurance.kz",
        telephone: "+7-727-357-30-30",
        address: {
          "@type": "PostalAddress",
          addressCountry: "KZ",
          addressLocality: "Алматы",
          streetAddress: "ул. Ауэзова, дом 14А",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+7-727-357-30-30",
          email: "info@dionis-insurance.kz",
          contactType: "customer service",
          availableLanguage: ["Russian", "English", "Kazakh"],
          areaServed: "KZ",
        },
        sameAs: [
          "https://www.instagram.com/dionis_insurance",
          "https://wa.me/77765275553",
          "https://t.me/Dionis_insurance_broker_bot",
        ],
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
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(htmlLang(lang))};`,
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <AnalyticsScripts />
      <AnalyticsManager />

      <Suspense fallback={<div className="u-h-16 u-xl-h-20" />}>
        <Header lang={lang} />
      </Suspense>

      <div className="u-flex-1" lang={htmlLang(lang)}>
        {children}
      </div>

      <SiteFooter lang={lang} />
      <CookieConsent lang={lang} />
    </>
  );
}
