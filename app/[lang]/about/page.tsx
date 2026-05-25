// app/[lang]/about/page.tsx
export const dynamic = "force-static";
export const dynamicParams = false;

import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

import { getAboutDictionary, type AboutDictionary } from "@/dictionaries/about";
import { getHomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary } from "@/dictionaries/agreement";
import { buildAlternates } from "@/lib/seoAlternates";

import AboutPage from "@/components/AboutPage";
import Breadcrumbs from "@/components/Breadcrumbs";

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
  const { lang: rawLang } = await params; // ✅ обязательно await
  const lang = normalizeLang(rawLang);

  const t = getAboutDictionary(lang);
  return {
    title: t.seo.title,
    description: t.seo.description,
    alternates: buildAlternates(lang, "/about"),
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
    <main>
      <div className="gc-container" style={{ paddingTop: "16px" }}>
        <Breadcrumbs
          lang={lang}
          items={[
            { label: lang === "ru" ? "Главная" : lang === "kz" ? "Басты бет" : "Home", href: `/${lang}` },
            { label: t.pageTitle },
          ]}
        />
      </div>
      <AboutPage
      lang={lang}
      t={t}
      contact={home.contact}
      agreement={agreement}
    />
    </main>
  );
}