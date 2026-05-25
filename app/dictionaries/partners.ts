import type { Lang } from "./header";

export type PartnerItem = {
  logo: string;
  url: string;
  alt: string;
};

export const PARTNERS_DICTIONARY: Record<Lang, PartnerItem[]> = {
  ru: [
    { logo: "/partners/pasha_sigorta.svg", url: "https://pasha-insurance.az/ru", alt: "Логотип страховой компании ПАША (Азербайджан)" },
    { logo: "/partners/21vek.svg", url: "https://21-vek.spb.ru/", alt: "Логотип страховой компании 21 век (Россия)" },
    { logo: "/partners/zetta_group.png", url: "https://zettains.ru/", alt: "Логотип страховой компании Зетта страхование (Россия)" },
    { logo: "/partners/aik.png", url: "https://aik.kz/", alt: "Логотип Ассоциации страховщиков Казахстана" },
    { logo: "/partners/bcc.svg", url: "https://www.bcc.kz/", alt: "Логотип Банк ЦентрКредит" },
  ],
  kz: [
    { logo: "/partners/pasha_sigorta.svg", url: "https://pasha-insurance.az/ru", alt: "ПАША сақтандыру компаниясының логотипі (Әзірбайжан)" },
    { logo: "/partners/21vek.svg", url: "https://21-vek.spb.ru/", alt: "21 Век сақтандыру компаниясының логотипі (Ресей)" },
    { logo: "/partners/zetta_group.png", url: "https://zettains.ru/", alt: "Зетта сақтандыру компаниясының логотипі (Ресей)" },
    { logo: "/partners/aik.png", url: "https://aik.kz/", alt: "Қазақстан сақтандырушылар қауымдастығының логотипі" },
    { logo: "/partners/bcc.svg", url: "https://www.bcc.kz/kz/", alt: "ЦентрКредит Банкі логотипі" },
  ],
  en: [
    { logo: "/partners/pasha_sigorta.svg", url: "https://pasha-insurance.az/en", alt: "PASHA Insurance company logo (Azerbaijan)" },
    { logo: "/partners/21vek.svg", url: "https://21-vek.spb.ru/", alt: "21 Vek insurance company logo (Russia)" },
    { logo: "/partners/zetta_group.png", url: "https://zettains.ru/", alt: "Zetta Insurance company logo (Russia)" },
    { logo: "/partners/aik.png", url: "https://aik.kz/", alt: "Association of Insurers of Kazakhstan logo" },
    { logo: "/partners/bcc.svg", url: "https://www.bcc.kz/en/", alt: "Bank CenterCredit logo" },
  ],
};

export function getPartnersDictionary(lang: Lang): PartnerItem[] {
  return PARTNERS_DICTIONARY[lang] ?? PARTNERS_DICTIONARY.ru;
}
