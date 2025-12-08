import type { Lang } from "@/dictionaries/header";

export type CookieService = {
  key: string;
  name: string;
  description: string;
  moreLabel?: string;
  moreHref?: string;
};

export type CookieDictionary = {
  // Баннер / кнопка
  bannerTitle: string;
  bannerText: string;

  manageBtn: string;
  acceptAllBtn: string;
  rejectAllBtn: string;

  // Модалка
  modalTitle: string;
  introTitle: string;
  introP1: string;
  introP2: string;

  settingsTitle: string;
  settingsDescription: string;

  analyticsTitle: string;
  analyticsDescription: string;
  analyticsServices: CookieService[];

  technicalTitle: string;
  technicalDescription: string;
  technicalServices: CookieService[];
};

export const COOKIE_DICTIONARY: Record<Lang, CookieDictionary> = {
  ru: {
    bannerTitle: "Cookie-файлы",
    bannerText:
      "Мы используем cookie-файлы для работы сайта, аналитики и измерения эффективности рекламы. Вы можете принять или отклонить использование аналитических и маркетинговых cookie в любой момент.",

    manageBtn: "Настройки cookie",
    acceptAllBtn: "Принять все",
    rejectAllBtn: "Отказаться от всех",

    modalTitle: "Cookie-файлы",
    introTitle: "Cookies",
    introP1:
      "Cookie-файлы — это небольшие текстовые файлы, которые веб-сайты отправляют в ваш браузер и которые сохраняются в его каталоге. Когда вы посещаете сайт dionis-insurance.kz, мы можем использовать cookie для запоминания выбранного языка, параметров отображения, а также для сбора статистики использования сайта.",
    introP2:
      "Вы можете согласиться на использование cookie при первом посещении сайта. В любой момент вы можете изменить или отозвать своё согласие, нажав на кнопку «Настройки cookie» внизу страницы. Если вы откажетесь от cookie или отзовёте согласие позже, некоторые функции и разделы сайта могут работать ограниченно.",

    settingsTitle: "Настройка cookie-файлов",
    settingsDescription:
      "Ниже приведена информация о целях обработки данных и поставщиках, чьи инструменты мы используем на сайте Dionis Insurance Broker.",

    analyticsTitle: "Аналитические и рекламные cookie-файлы",
    analyticsDescription:
      "Эти файлы помогают нам понимать, как используется сайт, улучшать его работу и оценивать эффективность рекламных кампаний. Данные носят обезличенный характер, мы не используем cookie для прямой идентификации личности.",

    analyticsServices: [
      {
        key: "ga4",
        name: "Google Analytics 4",
        description:
          "Позволяет собирать и анализировать обезличенную статистику о том, как вы взаимодействуете с нашим сайтом: посещаемые страницы, время на сайте, источники трафика.",
        moreLabel: "Подробнее о cookie Google",
        moreHref: "https://policies.google.com/technologies/cookies",
      },
      {
        key: "ym",
        name: "Яндекс Метрика",
        description:
          "Сервис веб-аналитики Яндекса, который помогает нам анализировать посещаемость, поведение пользователей и выявлять ошибки в работе сайта.",
        moreLabel: "Подробнее о Яндекс Метрике",
        moreHref: "https://yandex.ru/legal/metrica_termsofuse",
      },
      {
        key: "yaads",
        name: "Реклама Яндекса (Яндекс Реклама)",
        description:
          "Рекламные технологии Яндекса, которые используют cookie для показа более релевантной рекламы и оценки эффективности рекламных кампаний Dionis.",
        moreLabel: "Подробнее о cookie Яндекс Рекламы",
        moreHref: "https://yandex.ru/legal/confidential/",
      },
    ],

    technicalTitle: "Технические cookie-файлы",
    technicalDescription:
      "Эти cookie необходимы для корректной работы сайта и не могут быть отключены в наших системах. Обычно они устанавливаются только в ответ на ваши действия, например выбор языка интерфейса, заполнение форм или настройка согласия на cookie.",

    technicalServices: [
      {
        key: "lang",
        name: "Языковые и интерфейсные настройки",
        description:
          "Запоминают выбранный язык сайта и базовые параметры отображения, чтобы при следующем визите не приходилось выбирать их заново.",
      },
      {
        key: "consent",
        name: "Cookie согласия",
        description:
          "Сохраняют вашу выбранную настройку согласия на использование cookie, чтобы баннер не показывался каждый раз.",
      },
      {
        key: "security",
        name: "Безопасность и защита от спама",
        description:
          "Технические файлы, связанные с защитой форм и стабильной работой сайта.",
      },
    ],
  },

  kz: {
    // заглушки — переведёшь позже
    bannerTitle: "Cookie файлдары",
    bannerText:
      "Біз сайттың жұмысын қамтамасыз ету, талдау және жарнаманың тиімділігін өлшеу үшін cookie файлдарын пайдаланамыз.",

    manageBtn: "Cookie баптаулары",
    acceptAllBtn: "Барлығына келісу",
    rejectAllBtn: "Барлығынан бас тарту",

    modalTitle: "Cookie файлдары",
    introTitle: "Cookies",
    introP1:
      "Cookie файлдары — сайт сіздің браузеріңізге жіберетін және онда сақталатын шағын мәтіндік файлдар.",
    introP2:
      "Сіз cookie файлдарын пайдалануға алғашқы кіру кезінде келісім бере аласыз немесе кез келген уақытта келісімді кері қайтара аласыз.",

    settingsTitle: "Cookie файлдарын баптау",
    settingsDescription:
      "Төменде Dionis Insurance Broker сайтында қолданылатын деректерді өңдеу мақсаттары мен провайдерлер туралы ақпарат берілген.",

    analyticsTitle: "Аналитикалық және жарнамалық cookie файлдары",
    analyticsDescription:
      "Бұл файлдар сайтты қалай пайдаланатыныңызды түсінуге және жарнаманың тиімділігін бағалауға көмектеседі.",

    analyticsServices: [
      {
        key: "ga4",
        name: "Google Analytics 4",
        description: "Сайтты пайдалану статистикасын жинайды.",
      },
      {
        key: "ym",
        name: "Yandex Metrica",
        description: "Қатысу мен мінез-құлықты талдауға көмектеседі.",
      },
      {
        key: "yaads",
        name: "Yandex Reklama",
        description: "Яндекс жарнамасын көрсету және өлшеу үшін cookie файлдары.",
      },
    ],

    technicalTitle: "Техникалық cookie файлдары",
    technicalDescription:
      "Сайттың дұрыс жұмыс істеуі үшін қажет cookie файлдары.",
    technicalServices: [
      {
        key: "lang",
        name: "Тіл параметрлері",
        description: "Таңдалған тілді есте сақтайды.",
      },
      {
        key: "consent",
        name: "Келісім cookie",
        description: "Cookie келісім параметрлерін сақтайды.",
      },
      {
        key: "security",
        name: "Қауіпсіздік",
        description: "Формаларды қорғауға және тұрақты жұмысқа арналған.",
      },
    ],
  } as CookieDictionary,

  en: {
    bannerTitle: "Cookies",
    bannerText:
      "We use cookies to operate this website, analyse traffic and measure advertising performance. You can accept or reject analytics and marketing cookies at any time.",

    manageBtn: "Cookie settings",
    acceptAllBtn: "Accept all",
    rejectAllBtn: "Reject all",

    modalTitle: "Cookie files",
    introTitle: "Cookies",
    introP1:
      "Cookies are small text files that websites send to your browser and that are stored in its directory. When you visit dionis-insurance.kz, we may use cookies to remember your language, display preferences and collect usage statistics.",
    introP2:
      "You can consent to the use of cookies on your first visit. You may change or withdraw your consent at any time by clicking the “Cookie settings” button at the bottom of the page. If you refuse cookies, some parts of the site may not function properly.",

    settingsTitle: "Cookie settings",
    settingsDescription:
      "Below you can find information about the purposes of data processing and the providers whose tools we use on the Dionis Insurance Broker website.",

    analyticsTitle: "Analytics and advertising cookies",
    analyticsDescription:
      "These cookies help us understand how the site is used and to measure the effectiveness of advertising campaigns. The data is anonymised and is not used to directly identify you.",

    analyticsServices: [
      {
        key: "ga4",
        name: "Google Analytics 4",
        description:
          "Collects anonymised statistics about your interaction with the website.",
        moreLabel: "More about Google cookies",
        moreHref: "https://policies.google.com/technologies/cookies",
      },
      {
        key: "ym",
        name: "Yandex Metrica",
        description:
          "A web analytics service that helps us analyse traffic and user behaviour.",
        moreLabel: "More about Yandex Metrica",
        moreHref: "https://yandex.com/legal/metrica_termsofuse",
      },
      {
        key: "yaads",
        name: "Yandex Ads",
        description:
          "Advertising technologies that use cookies to show more relevant ads and measure their effectiveness.",
        moreLabel: "More about Yandex cookies",
        moreHref: "https://yandex.com/legal/confidential/",
      },
    ],

    technicalTitle: "Technical cookies",
    technicalDescription:
      "These cookies are necessary for the proper functioning of the website and cannot be switched off in our systems.",
    technicalServices: [
      {
        key: "lang",
        name: "Language and interface",
        description: "Stores your language choice and display preferences.",
      },
      {
        key: "consent",
        name: "Consent cookies",
        description: "Stores your cookie consent settings.",
      },
      {
        key: "security",
        name: "Security",
        description:
          "Technical cookies related to forms protection and stable operation.",
      },
    ],
  },
};

export function getCookieDictionary(lang: Lang): CookieDictionary {
  return COOKIE_DICTIONARY[lang] ?? COOKIE_DICTIONARY.ru;
}
