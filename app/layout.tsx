// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Roboto, Montserrat } from "next/font/google";

import AnalyticsScripts from "@/components/AnalyticsScripts";
import AnalyticsManager from "@/components/AnalyticsManager";

const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.kz").replace(
    /\/$/,
    ""
  );

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

/* ---------- Viewport ---------- */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
};

/* ---------- Metadata ---------- */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dionis Insurance Broker",
    template: "%s — Dionis Insurance Broker",
  },
};

/* ---------- Root layout ---------- */

export default function RootLayout({ children }: { children: ReactNode }) {
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
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["ru", "kk", "en"],
      },
      {
        "@type": "InsuranceAgency",
        "@id": `${SITE_URL}/#insurance-broker`,
        name: "Dionis Insurance Broker",
        url: SITE_URL,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
        description:
          "Licensed insurance broker providing independent insurance brokerage services.",
        areaServed: ["KZ"],
        knowsLanguage: ["ru", "kk", "en"],
        knowsAbout: [
          "Insurance brokerage",
          "Insurance consulting",
          "Green Card insurance",
          "Motor third-party liability insurance (OSAGO/MTPL)",
          "Cargo insurance",
          "Carrier and freight forwarder liability insurance",
          "International transportation insurance",
          "Claims assistance / loss settlement support",
        ],
      },
    ],
  };

  return (
    <html lang="ru" className={`${roboto.variable} ${montserrat.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* ✅ Аналитика грузится ТОЛЬКО после cookie-consent=accepted */}
        <AnalyticsScripts />

        {/* ✅ Pageview/events (если используешь GTM dataLayer) */}
        <AnalyticsManager />

        {children}
      </body>
    </html>
  );
}
