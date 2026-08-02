export type Lang = "ru" | "kz" | "en";

export const HEADER_DICTIONARY: Record<
  Lang,
  {
    home: string;
    about: string;
    insurances: string;
    greenCard: string;
    osagoRu: string;
    forlegal: string;
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
    about: "О компании",
    insurances: "Страхование",
    greenCard: "Зелёная карта",
    osagoRu: "ОСАГО для поездки в Россию",
    forlegal:"Страхование для грузоперевозчиков",
    allProducts: "Все страховые продукты",
    blog: "Блог",
    contacts: "Контакты",
    addressLine: "Казахстан, г. Алматы, ул. Ауэзова, 14А",
    workTime: "Пн–Пт: 11:00–19:00",
    primaryNavAria: "Основная навигация",
    mobileNavAria: "Мобильная навигация",
    langSwitcherAria: "Выбор языка",
    openMenuAria: "Открыть меню",
    closeMenuAria: "Закрыть меню",
    phoneAria: "Позвонить страховому брокеру DIONIS",
    contactChannels: "Связаться со страховым брокером",
  },

  kz: {
    home: "Басты бет",
    about: "Компания туралы",
    insurances: "Сақтандыру",
    greenCard: "Жасыл карта",
    osagoRu: "Ресейге баруға арналған ОСАГО",
    forlegal: "Жүк тасымалдаушыларға арналған сақтандыру",
    allProducts: "Барлық сақтандыру өнімдері",
    blog: "Блог",
    contacts: "Байланыс",
    addressLine: "Қазақстан, Алматы қ., Әуезов көш., 14А",
    workTime: "Дс–Жм: 11:00–19:00",
    primaryNavAria: "Негізгі навигация",
    mobileNavAria: "Мобильді навигация",
    langSwitcherAria: "Тілді таңдау",
    openMenuAria: "Мәзірді ашу",
    closeMenuAria: "Мәзірді жабу",
    phoneAria: "DIONIS сақтандыру брокеріне қоңырау шалу",
    contactChannels: "Сақтандыру брокерімен байланысу",
  },

  en: {
    home: "Home",
    about: "About us",
    insurances: "Insurance",
    greenCard: "Green Card",
    osagoRu: "OSAGO for travel to Russia",
    forlegal: "Insurance for Freight Carriers",
    allProducts: "All insurance products",
    blog: "Blog",
    contacts: "Contacts",
    addressLine: "14A Auezov Street, Almaty, Kazakhstan",
    workTime: "Mon–Fri: 11:00–19:00",
    primaryNavAria: "Primary navigation",
    mobileNavAria: "Mobile navigation",
    langSwitcherAria: "Select language",
    openMenuAria: "Open menu",
    closeMenuAria: "Close menu",
    phoneAria: "Call DIONIS Insurance Broker",
    contactChannels: "Contact the insurance broker",
  },
};