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
    primaryNavAria: string;
    mobileNavAria: string;
    langSwitcherAria: string;
    openMenuAria: string;
    closeMenuAria: string;
    phoneAria: string;
    contactChannels: string;
  }
> = {
  ru: {
    home: "Главная",
    about: "О нас",
    insurances: "Страховки",
    greenCard: "Зелёная карта в Европу",
    osagoRu: "Зелёная карта в Россию",
    allProducts: "Все продукты",
    blog: "Блог",
    contacts: "Контакты",
    addressLine: "Казахстан, г. Алматы, ул. Ауэзова, дом 14А",
    workTime: "Пн–Пт: 11:00–19:00",
    primaryNavAria: "Основная навигация",
    mobileNavAria: "Мобильная навигация",
    langSwitcherAria: "Переключение языка",
    openMenuAria: "Открыть меню",
    closeMenuAria: "Закрыть меню",
    phoneAria: "Позвонить в Dionis Insurance",
    contactChannels: "Связаться с брокером",
  },

  kz: {
    home: "Басты бет",
    about: "Біз туралы",
    insurances: "Сақтандыру",
    greenCard: "Еуропаға автосақтандыру",
    osagoRu: "Ресейге автосақтандыру",
    allProducts: "Барлық өнімдер",
    blog: "Блог",
    contacts: "Байланыс",
    addressLine: "Қазақстан, Алматы қ., Әуезов к-сі, 14А",
    workTime: "Дс–Жм: 11:00–19:00",
    primaryNavAria: "Негізгі навигация",
    mobileNavAria: "Мобильді навигация",
    langSwitcherAria: "Тілді ауыстыру",
    openMenuAria: "Мәзірді ашу",
    closeMenuAria: "Мәзірді жабу",
    phoneAria: "Dionis Insurance компаниясына қоңырау шалу",
    contactChannels: "Брокермен байланысу",
  },

  en: {
    home: "Home",
    about: "About",
    insurances: "Insurance",
    greenCard: "Green Card",
    osagoRu: "Russia MTPL",
    allProducts: "All products",
    blog: "Blog",
    contacts: "Contacts",
    addressLine: "Kazakhstan, Almaty, Auezov st. 14A",
    workTime: "Mon–Fri: 11:00–19:00",
    primaryNavAria: "Primary navigation",
    mobileNavAria: "Mobile navigation",
    langSwitcherAria: "Language switcher",
    openMenuAria: "Open menu",
    closeMenuAria: "Close menu",
    phoneAria: "Call Dionis Insurance",
    contactChannels: "Contact the broker",
  },
};
