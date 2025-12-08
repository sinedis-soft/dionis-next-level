export type Lang = "ru" | "kz" | "en";

export const HEADER_DICTIONARY: Record<
  Lang,
  {
    home: string;
    about: string;
    insurances: string;
    greenCard: string;
    osagoRu: string;
    allProducts: string;
    blog: string;
    contacts: string;
    addressLine: string;
    workTime: string;
  }
> = {
  ru: {
    home: "Главная",
    about: "О нас",
    insurances: "Страховки",
    greenCard: "Зелёная карта",
    osagoRu: "ОСАГО РФ",
    allProducts: "Все продукты",
    blog: "Блог",
    contacts: "Контакты",
    addressLine: "Казахстан, г. Алматы, ул. Ауэзова, дом 14А",
    workTime: "Пн–Пт: 11:00–19:00",
  },

  kz: {
    home: "Басты бет",
    about: "Біз туралы",
    insurances: "Сақтандыру",
    greenCard: "Green Card",
    osagoRu: "РФ ОСАГО",
    allProducts: "Барлық өнімдер",
    blog: "Блог",
    contacts: "Байланыс",
    addressLine: "Қазақстан, Алматы қ., Әуезов к-сі, 14А",
    workTime: "Дс–Жм: 11:00–19:00",
  },

  en: {
    home: "Home",
    about: "About",
    insurances: "Insurance",
    greenCard: "Green Card",
    osagoRu: "OSAGO Russia",
    allProducts: "All products",
    blog: "Blog",
    contacts: "Contacts",
    addressLine: "Kazakhstan, Almaty, Auezov st. 14A",
    workTime: "Mon–Fri: 11:00–19:00",
  },
};
