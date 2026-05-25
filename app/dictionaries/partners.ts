import type { Lang } from "./header";

export type PartnerItem = {
  logo: string;
  url: string;
  alt: string;
};

export const PARTNERS_DICTIONARY: Record<Lang, PartnerItem[]> = {
  ru: [
    { logo: "/free-icon-whatsapp-1419525.png", url: "https://www.whatsapp.com/", alt: "Логотип WhatsApp" },
    { logo: "/free-icon-telegram-1946547.png", url: "https://telegram.org/", alt: "Логотип Telegram" },
    { logo: "/vercel.svg", url: "https://vercel.com/", alt: "Логотип Vercel" },
  ],
  kz: [
    { logo: "/free-icon-whatsapp-1419525.png", url: "https://www.whatsapp.com/", alt: "WhatsApp логотипі" },
    { logo: "/free-icon-telegram-1946547.png", url: "https://telegram.org/", alt: "Telegram логотипі" },
    { logo: "/vercel.svg", url: "https://vercel.com/", alt: "Vercel логотипі" },
  ],
  en: [
    { logo: "/free-icon-whatsapp-1419525.png", url: "https://www.whatsapp.com/", alt: "WhatsApp logo" },
    { logo: "/free-icon-telegram-1946547.png", url: "https://telegram.org/", alt: "Telegram logo" },
    { logo: "/vercel.svg", url: "https://vercel.com/", alt: "Vercel logo" },
  ],
};

export function getPartnersDictionary(lang: Lang): PartnerItem[] {
  return PARTNERS_DICTIONARY[lang] ?? PARTNERS_DICTIONARY.ru;
}
