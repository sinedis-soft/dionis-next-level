// app/[lang]/layout.tsx
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

function normalizeLang(value: unknown): Lang {
  return value === "ru" || value === "kz" || value === "en" ? value : "ru";
}

export default async function LangLayout(props: {
  children: ReactNode;
  params: any;
}) {
  const resolvedParams = await Promise.resolve(props.params);
  const lang = normalizeLang(resolvedParams?.lang);

  return (
    <>
      {/* Если хочешь менять lang атрибут у <html> — делай это в RootLayout через generateMetadata.
          Здесь <html>/<body> использовать нельзя. */}
      <Header />
      <main className="flex-1">{props.children}</main>
      <SiteFooter />
      <CookieConsent lang={lang} />
      <AnalyticsManager />
    </>
  );
}
