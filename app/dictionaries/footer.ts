// app/dictionaries/footer.ts
import type { Lang } from "@/dictionaries/header";

export const FOOTER_DICTIONARY: Record<
  Lang,
  {
    contactsTitle: string;
    categoriesTitle: string;
    supportTitle: string;
    lawTitle: string;

    addressLine1: string;
    addressLine2: string;
    emailLabel: string;
    phoneLabel: string;

    telegramLabel: string;
    lawInsurance: string;
    copyright: string;

    homeLabel: string;
    aboutLabel: string;
    greenCardLabel: string;
    osagoLabel: string;
    blogLabel: string;
  }
> = {
  ru: {
    contactsTitle: "Наши контакты",
    categoriesTitle: "Категории",
    supportTitle: "Поддержка клиентов",
    lawTitle: "Ссылки на законодательство",

    addressLine1: "Адрес: Казахстан, г. Алматы,",
    addressLine2: "ул. Ауэзова, дом 14А.",
    emailLabel: "Email: info@dionis-insurance.kz",
    phoneLabel: "Телефон: +7-727-357-30-30",

    telegramLabel: "Наш телеграм",
    lawInsurance: "Закон о страховании",
    copyright: "© 2025 DIONIS Insurance. Все права защищены.",

    homeLabel: "Главная страница",
    aboutLabel: "О нас",
    greenCardLabel: "Зелёная карта",
    osagoLabel: "ОСАГО РФ",
    blogLabel: "Блог",
  },
  kz: {
    contactsTitle: "Біздің байланыстар",
    categoriesTitle: "Санаттар",
    supportTitle: "Клиенттерді қолдау",
    lawTitle: "Заңнамаға сілтемелер",

    addressLine1: "Мекенжайы: Қазақстан, Алматы қ.,",
    addressLine2: "Әуезов к-сі, 14А үй.",
    emailLabel: "Email: info@dionis-insurance.kz",
    phoneLabel: "Телефон: +7-727-357-30-30",

    telegramLabel: "Біздің Telegram",
    lawInsurance: "Сақтандыру туралы заң",
    copyright: "© 2025 DIONIS Insurance. Барлық құқықтар қорғалған.",

    homeLabel: "Басты бет",
    aboutLabel: "Біз туралы",
    greenCardLabel: "Green Card",
    osagoLabel: "РФ ОСАГО",
    blogLabel: "Блог",
  },
  en: {
    contactsTitle: "Our contacts",
    categoriesTitle: "Categories",
    supportTitle: "Customer support",
    lawTitle: "Legal references",

    addressLine1: "Address: Kazakhstan, Almaty,",
    addressLine2: "Auezov str., 14A.",
    emailLabel: "Email: info@dionis-insurance.kz",
    phoneLabel: "Phone: +7-727-357-30-30",

    telegramLabel: "Our Telegram",
    lawInsurance: "Insurance law",
    copyright: "© 2025 DIONIS Insurance. All rights reserved.",

    homeLabel: "Home",
    aboutLabel: "About us",
    greenCardLabel: "Green Card",
    osagoLabel: "OSAGO Russia",
    blogLabel: "Blog",
  },
};

export function getFooterDictionary(lang: Lang) {
  return FOOTER_DICTIONARY[lang] ?? FOOTER_DICTIONARY.ru;
}
