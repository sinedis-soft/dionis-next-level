// app/[lang]/about/page.tsx
export const dynamic = "force-static";
export const dynamicParams = false;

import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

import { getAboutDictionary, type AboutDictionary } from "@/dictionaries/about";
import { getHomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary } from "@/dictionaries/agreement";

import AboutPage from "@/components/AboutPage";

const ALLOWED_LANGS: Lang[] = ["ru", "kz", "en"];
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dionis-insurance.kz";

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
  const { lang: rawLang } = await params; // ✅ обязательно await
  const lang = normalizeLang(rawLang);

  const t = getAboutDictionary(lang);
  const canonical = `${SITE_URL}/about`;
  return {
    title: t.seo.title,
    description: t.seo.description,
    alternates: {
      canonical,
      languages: {
        ru: canonical,
        "kk-KZ": `${SITE_URL}/kz/about`,
        en: `${SITE_URL}/en/about`,
        "x-default": canonical,
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params; // ✅ обязательно await
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
