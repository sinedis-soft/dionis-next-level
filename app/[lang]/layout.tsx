// app/[lang]/layout.tsx
import type { ReactNode } from "react";

import Header from "@/components/Header";
import SiteFooter from "@/components/SiteFooter";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsManager from "@/components/AnalyticsManager";
import type { Lang } from "@/dictionaries/header";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ lang: Lang }> {
  return [{ lang: "ru" }, { lang: "kz" }, { lang: "en" }];
}

function normalizeLang(value: unknown): Lang {
  return value === "ru" || value === "kz" || value === "en" ? value : "ru";
}

type LangParams = { lang?: string };
type MaybePromise<T> = T | Promise<T>;

export default async function LangLayout(props: {
  children: ReactNode;
  params: MaybePromise<LangParams>;
}) {
  const resolvedParams = await props.params;
  const lang = normalizeLang(resolvedParams?.lang);

  return (
    <>
      <Header />
      <main className="flex-1">{props.children}</main>
      <SiteFooter />
      <CookieConsent lang={lang} />
      <AnalyticsManager />
    </>
  );
}
