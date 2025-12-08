// app/[lang]/layout.tsx
import { use } from "react";
import type { ReactNode } from "react";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsManager from "@/components/AnalyticsManager";
import type { Lang } from "@/dictionaries/header";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "ru" }, { lang: "kz" }, { lang: "en" }];
}

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: Lang }>;
}) {
  const { lang } = use(params);

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <SiteFooter lang={lang} />
      <CookieConsent lang={lang} />
      <AnalyticsManager />
    </div>
  );
}
