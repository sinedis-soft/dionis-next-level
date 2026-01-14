// app/[lang]/privacy/cookies/page.tsx
export const dynamic = "force-static";

import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

import {
  getCookiesPolicyDictionary,
  type CookiesPolicyDictionary,
} from "@/dictionaries/privacyCookies";

import CookiesPolicyPage from "@/components/CookiesPolicyPage";

function normalizeLang(value: string): Lang {
  return value === "ru" || value === "kz" || value === "en" ? value : "ru";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const t = getCookiesPolicyDictionary(lang);
  return {
    title: t.seo.title,
    description: t.seo.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const t: CookiesPolicyDictionary = getCookiesPolicyDictionary(lang);

  return <CookiesPolicyPage lang={lang} t={t} />;
}
