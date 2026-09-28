// app/[lang]/page.tsx
export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = 60;

import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";
import { getHomeDictionary, type HomeDictionary } from "@/dictionaries/home";
import {
  getAgreementDictionary,
  type AgreementDictionary,
} from "@/dictionaries/agreement";
import HomeClient from "@/components/HomeClient";
import { buildAlternates } from "@/lib/seoAlternates";
import {
  formatOsagoHeroPriceKzt,
  getOsagoHeroPriceKzt,
} from "@/lib/osago-rf/getHeroPrice";
import { getGreenCardHeroPrice } from "@/lib/green-card/getHeroPrice";

export function generateStaticParams(): Array<{ lang: Lang }> {
  return [{ lang: "ru" }, { lang: "kz" }, { lang: "en" }];
}

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
      ? "Страховой брокер в Казахстане (Алматы) | Официально"
      : lang === "kz"
        ? "Қазақстандағы сақтандыру брокері (Алматы) | Ресми"
        : "Insurance broker in Kazakhstan (Almaty) | Official";

  const description =
    lang === "ru"
      ? "Страховой брокер в Казахстане: подбор страховых программ, консультации и сопровождение. Официально по лицензии. Алматы, связь по телефону и в мессенджерах."
      : lang === "kz"
        ? "Қазақстандағы сақтандыру брокері: бағдарламаларды таңдау, кеңес беру және сүйемелдеу. Лицензия бойынша ресми жұмыс. Алматы, байланыс телефоны және мессенджерлер."
        : "Insurance broker in Kazakhstan: program selection, consulting and support. Officially licensed. Almaty, phone and messengers.";

  return {
    title,
    description,
    alternates: buildAlternates(lang),
  };
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
  const [osagoResult, greenCardResult] = await Promise.allSettled([
    getOsagoHeroPriceKzt(3600),
    getGreenCardHeroPrice(28800),
  ]);

  const osagoPrice = osagoResult.status === "fulfilled"
    ? formatOsagoHeroPriceKzt(osagoResult.value, lang)
    : null;
  const greenCardPrice = greenCardResult.status === "fulfilled"
    ? greenCardResult.value
    : null;

  if (osagoResult.status === "rejected") {
    console.error("OSAGO home price calculation failed", osagoResult.reason);
  }
  if (greenCardResult.status === "rejected") {
    console.error("Green Card home price calculation failed", greenCardResult.reason);
  }

  return (
    <HomeClient
      lang={lang}
      t={t}
      agreement={agreement}
      osagoPrice={osagoPrice}
      greenCardPrice={greenCardPrice}
    />
  );
}
