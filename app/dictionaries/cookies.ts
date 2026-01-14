import type { Lang } from "@/dictionaries/header";

export type CookieCategoryKey = "necessary" | "functional" | "marketing";

export type CookieCategory = {
  key: CookieCategoryKey;
  title: string;
  description: string;
  locked?: boolean; // для необходимых
  moreLabel?: string;
  moreHref?: string;
};

export type CookieDictionary = {
  bannerTitle: string;
  bannerText: string;

  manageBtn: string;

  modalTitle: string;
  modalText: string;

  categoriesTitle: string;
  categories: CookieCategory[];

  policyText: string;
  policyLabel: string;
  policyHref: string;

  backBtn: string;
  saveBtn: string;
  acceptAllBtn: string;
  rejectAllBtn: string;
};

export const COOKIE_DICTIONARY: Record<Lang, CookieDictionary> = {
  ru: {
    bannerTitle: "Cookies",
    bannerText:
      "Мы используем cookie для работы сайта, улучшения сервиса и рекламы. Настройте согласие в один клик.",

    manageBtn: "Cookie",

    modalTitle: "Настройки cookie",
    modalText:
      "Выберите, какие cookie можно использовать. Необходимые — всегда включены.",

    categoriesTitle: "Категории",
    categories: [
      {
        key: "necessary",
        title: "Необходимые",
        description: "Нужны для работы сайта и безопасности. Отключить нельзя.",
        locked: true,
      },
      {
        key: "functional",
        title: "Функциональные",
        description:
          "Запоминают настройки интерфейса и помогают корректной работе отдельных функций.",
      },
      {
        key: "marketing",
        title: "Аналитические",
        description:
          "Помогают через ананимную статистику улучшать удобство использования сайта, совершенствовать продукты и услуги, предоставлять более релевантную информацию для пользователей.",
      },
    ],

    policyText: "Подробнее — в",
    policyLabel: "политике cookie",
    policyHref: "/privacy/cookies", // поставь свой роут

    backBtn: "Назад",
    saveBtn: "Сохранить",
    acceptAllBtn: "Принять",
    rejectAllBtn: "Отклонить",
  },

  kz: {
    bannerTitle: "Cookies",
    bannerText:
      "Біз cookie файлдарын сайт жұмысы, сервисті жақсарту және жарнама үшін қолданамыз. Бір рет басып баптаңыз.",

    manageBtn: "Cookie",

    modalTitle: "Cookie баптаулары",
    modalText:
      "Қандай cookie қолдануға болатынын таңдаңыз. Міндетті cookie әрқашан қосулы.",

    categoriesTitle: "Санаттар",
    categories: [
      {
        key: "necessary",
        title: "Міндетті",
        description:
          "Сайттың жұмысы мен қауіпсіздігі үшін қажет. Өшіруге болмайды.",
        locked: true,
      },
      {
        key: "functional",
        title: "Функционалдық",
        description:
          "Интерфейс параметрлерін сақтайды және кейбір функциялардың дұрыс жұмысын қамтамасыз етеді.",
      },
      {
        key: "marketing",
        title: "Аналитикалық",
        description:
          "Анонимді статистика арқылы сайтты пайдаланудың ыңғайлылығын жақсартуға, өнімдер мен қызметтерді жетілдіруге және пайдаланушыларға неғұрлым өзекті ақпарат ұсынуға көмектеседі.",
      },
    ],

    policyText: "Толығырақ —",
    policyLabel: "cookie саясаты",
    policyHref: "/privacy/cookies",

    backBtn: "Артқа",
    saveBtn: "Сақтау",
    acceptAllBtn: "Қабылдау",
    rejectAllBtn: "Бас тарту",
  },

  en: {
    bannerTitle: "Cookies",
    bannerText:
      "We use cookies to run the site, improve the service and support advertising. Set your preferences in one click.",

    manageBtn: "Cookies",

    modalTitle: "Cookie settings",
    modalText:
      "Choose which cookies we may use. Necessary cookies are always enabled.",

    categoriesTitle: "Categories",
    categories: [
      {
        key: "necessary",
        title: "Necessary",
        description: "Required for the website and security. Cannot be disabled.",
        locked: true,
      },
      {
        key: "functional",
        title: "Functional",
        description: "Remember preferences and support key site features.",
      },
      {
        key: "marketing",
        title: "Analytics",
        description:
          "Help improve website usability through anonymous statistics, enhance products and services, and provide more relevant information to users.",
      },

    ],

    policyText: "More details in our",
    policyLabel: "cookie policy",
    policyHref: "/privacy/cookies",

    backBtn: "Back",
    saveBtn: "Save",
    acceptAllBtn: "Accept",
    rejectAllBtn: "Decline",
  },
};

export function getCookieDictionary(lang: Lang): CookieDictionary {
  return COOKIE_DICTIONARY[lang] ?? COOKIE_DICTIONARY.ru;
}
