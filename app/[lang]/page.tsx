// app/[lang]/page.tsx
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";
import { getHomeDictionary, type HomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary, type AgreementDictionary } from "@/dictionaries/agreement";
import HomeClient from "@/components/HomeClient";

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

  // можно взять тексты из словаря, если там есть SEO поля
  const title =
    lang === "ru"
      ? "Dionis Insurance — Зеленая карта и ОСАГО онлайн"
      : lang === "kz"
        ? "Dionis Insurance — Green Card және ОСАГО онлайн"
        : "Dionis Insurance — Green Card & OSAGO online";

  const description =
    lang === "ru"
      ? "Оформите Зеленую карту и ОСАГО онлайн. Быстрая заявка, поддержка и консультации."
      : lang === "kz"
        ? "Green Card және ОСАГО онлайн рәсімдеу. Жылдам өтінім және қолдау."
        : "Get Green Card and OSAGO online. Fast request and support.";

  return { title, description };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const t: HomeDictionary = getHomeDictionary(lang);
  const agreement: AgreementDictionary = getAgreementDictionary(lang);

  return <HomeClient lang={lang} t={t} agreement={agreement} />;
}
