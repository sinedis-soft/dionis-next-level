// app/[lang]/layout.tsx
import type { ReactNode } from "react";
import { Suspense } from "react";
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";
import Script from "next/script";

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
      {/* legacy.css подключаем ВСЕГДА, он сам "молчит" в modern через @supports */}
      <link rel="stylesheet" href="/legacy.css" />

      {/* детектор ставит только класс html.is-legacy */}
      <Script id="legacy-detector" strategy="beforeInteractive">
        {`
(function () {
  try {
    var isLegacy = false;
    if (!window.CSS || !CSS.supports) {
      isLegacy = true;
    } else {
      isLegacy = !CSS.supports('display', 'grid');
    }
    if (isLegacy) {
      document.documentElement.classList.add('is-legacy');
    }
  } catch (e) {}
})();
        `}
      </Script>

      <Suspense fallback={<div className="h-16 xl:h-20" />}>
        <Header lang={lang} />
      </Suspense>

      <main className="flex-1">{children}</main>
      <SiteFooter lang={lang} />
      <CookieConsent lang={lang} />
    </>
  );
}