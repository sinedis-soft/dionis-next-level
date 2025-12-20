// app/[lang]/about/page.tsx
export const dynamic = "force-static";

import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

import { getAboutDictionary, type AboutDictionary } from "@/dictionaries/about";
import { getHomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary } from "@/dictionaries/agreement";

import AboutPage from "@/components/AboutPage";

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

  const t = getAboutDictionary(lang);
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

  const t: AboutDictionary = getAboutDictionary(lang);
  const home = getHomeDictionary(lang);
  const agreement = getAgreementDictionary(lang);

  return (
    <AboutPage
      lang={lang}
      t={t}

      contact={home.contact}
      agreement={agreement}
    />
  );
}
