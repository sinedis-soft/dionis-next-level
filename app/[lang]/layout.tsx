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
        <Header />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieConsent lang={lang} /> {/* тут оставьте как есть пока */}
        <AnalyticsManager />
      </body>
    </html>
  );
}

