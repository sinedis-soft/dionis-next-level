import type { Metadata } from "next";

import type { Lang } from "@/dictionaries/header";
import { getHomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary } from "@/dictionaries/agreement";
import ContactSection from "@/components/ContactSection";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dionis-insurance.kz";

const ALLOWED_LANGS: Lang[] = ["ru", "kz", "en"];

function normalizeLang(value: string): Lang {
  return (ALLOWED_LANGS as readonly string[]).includes(value)
    ? (value as Lang)
    : "ru";
}

const titles: Record<Lang, string> = {
  ru: "Контакты",
  kz: "Байланыс",
  en: "Contacts",
};

const descriptions: Record<Lang, string> = {
  ru: "Свяжитесь с Dionis Insurance: телефон, email, мессенджеры и форма обратной связи.",
  kz: "Dionis Insurance-пен байланыс: телефон, email, мессенджерлер және кері байланыс формасы.",
  en: "Contact Dionis Insurance via phone, email, messengers, or the contact form.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: `${SITE_URL}/${lang}/contacts`,
      languages: {
        ru: `${SITE_URL}/ru/contacts`,
        "kk-KZ": `${SITE_URL}/kz/contacts`,
        en: `${SITE_URL}/en/contacts`,
        "x-default": `${SITE_URL}/ru/contacts`,
      },
    },
  };
}

export default async function ContactAliasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const home = getHomeDictionary(lang);
  const agreement = getAgreementDictionary(lang);
  const contact = home.contact;

  return (
    <main className="cp-page">
      <ContactSection
        contact={contact}
        agreement={agreement}
        imageSrc="/laiter(1).png"
        context={`contact-${lang}`}
      />
    </main>
  );
}
