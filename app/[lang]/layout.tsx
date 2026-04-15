// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { Suspense } from "react";
import type { Lang } from "@/dictionaries/header";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;

  const lang = (rawLang === "ru" || rawLang === "kz" || rawLang === "en"
    ? rawLang
    : "ru") as Lang;

  return (
    <>
      {/* legacy.css остаётся — он безопасен, так как не влияет на DOM */}
      <link rel="stylesheet" href="/legacy.css" />

      <Suspense fallback={<div className="u-h-16 u-xl-h-20" />}>
        <Header lang={lang} />
      </Suspense>

      <main className="u-flex-1">
        {children}
      </main>

      <SiteFooter lang={lang} />
      <CookieConsent lang={lang} />
    </>
  );
}