// app/[lang]/page.tsx
import type { Lang } from "@/dictionaries/header";
import { getHomeDictionary, type HomeDictionary } from "@/dictionaries/home";
import {
  getAgreementDictionary,
  type AgreementDictionary,
} from "@/dictionaries/agreement";

import HomeClient from "@/components/HomeClient";

function normalizeLang(value: string): Lang {
  return value === "ru" || value === "kz" || value === "en" ? value : "ru";
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const t: HomeDictionary = getHomeDictionary(lang);
  const agreement: AgreementDictionary = getAgreementDictionary(lang);

  return <HomeClient lang={lang} t={t} agreement={agreement} />;
}
