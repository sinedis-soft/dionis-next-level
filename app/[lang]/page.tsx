// app/[lang]/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 60;

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

  const title =
    lang === "ru"
      ? "Dionis Insurance Broker — страховой брокер в Казахстане (Алматы) | Официально"
      : lang === "kz"
        ? "Dionis Insurance Broker — Қазақстандағы сақтандыру брокері (Алматы) | Ресми"
        : "Dionis Insurance Broker — insurance broker in Kazakhstan (Almaty) | Official";

  const description =
    lang === "ru"
      ? "Страховой брокер в Казахстане: подбор страховых программ, консультации и сопровождение. Официально по лицензии. Алматы, связь по телефону и в мессенджерах."
      : lang === "kz"
        ? "Қазақстандағы сақтандыру брокері: бағдарламаларды таңдау, кеңес беру және сүйемелдеу. Лицензия бойынша ресми жұмыс. Алматы, байланыс телефоны және мессенджерлер."
        : "Insurance broker in Kazakhstan: program selection, consulting and support. Officially licensed. Almaty, phone and messengers.";

  return { title, description };
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
