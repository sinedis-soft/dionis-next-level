// app/[lang]/privacy/regulation/page.tsx
export const dynamic = "force-static";
export const dynamicParams = false;

import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

import {
  getRegulationDictionary,
  type RegulationDictionary,
} from "@/dictionaries/privacyRegulation";

import RegulationPage from "@/components/RegulationPage";

const ALLOWED_LANGS: Lang[] = ["ru", "kz", "en"];

function normalizeLang(value: string): Lang {
  return (ALLOWED_LANGS as readonly string[]).includes(value)
    ? (value as Lang)
    : "ru";
}

export function generateStaticParams() {
  return ALLOWED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const t = getRegulationDictionary(lang);

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

  const t: RegulationDictionary = getRegulationDictionary(lang);

  return <RegulationPage lang={lang} t={t} />;
}