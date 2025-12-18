// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Roboto, Montserrat } from "next/font/google";

const SITE_URL = "https://dionis-insurance.kz";

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

export const metadata: Metadata = {
  title: {
    default: "Dionis Insurance Broker",
    template: "%s — Dionis Insurance Broker",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1) Организация (юридическое лицо / бренд)
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Dionis Insurance Broker, LLP",
        // можно оставить и так, но лучше явно указать юр. наименование (RU/KZ) если оно используется на сайте:
        legalName:
          'Товарищество с ограниченной ответственностью «Страховой брокер Дионис»',
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

      // 2) Вебсайт
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Dionis Insurance Broker",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["ru", "kk", "en"],
      },

      // 3) Страховой посредник (технический тип), но по смыслу — брокер
      {
        "@type": "InsuranceAgency", // технический тип (в Schema.org нет InsuranceBroker)
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
      <body className="min-h-screen flex flex-col">
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
