// app/[lang]/layout.tsx
import type { ReactNode } from "react";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsManager from "@/components/AnalyticsManager";
import type { Lang } from "@/dictionaries/header";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { lang: "ru" },
    { lang: "kz" },
    { lang: "en" },
  ];
}

function normalizeLang(value: string): Lang {
  if (value === "ru" || value === "kz" || value === "en") return value;
  return "ru";
}

// Не мучаемся с типами LayoutProps – берём any для params
export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: any;
}) {
  const lang = normalizeLang(params?.lang ?? "ru");

  return (
    <html lang={lang}>
      <body className="min-h-screen flex flex-col">
        <Header lang={lang} />
        <main className="flex-1">{children}</main>
        <SiteFooter lang={lang} />
        <CookieConsent lang={lang} />
        <AnalyticsManager />
      </body>
    </html>
  );
}
