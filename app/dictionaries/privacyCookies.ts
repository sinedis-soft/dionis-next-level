// dictionaries/privacyCookies.ts
import type { Lang } from "@/dictionaries/header";

export type PolicyLink = {
  label: string;
  text: string;
  href: string;
};

export type PolicyTable = {
  headers: string[];
  rows: string[][];
};

export type PolicySection = {
  title: string;
  paragraphs?: string[];
  tables?: PolicyTable[];
  links?: PolicyLink[];
};

export type CookiesPolicyDictionary = {
  seo: { title: string; description: string };
  pageTitle: string;

  updatedLabel: string;
  updatedAt?: string;

  sections: PolicySection[];
};

export const PRIVACY_COOKIES_DICTIONARY: Record<Lang, CookiesPolicyDictionary> =
  {
    ru: {
      seo: {
        title: "Политика использования cookie — Dionis Insurance Broker",
        description:
          "Политика использования cookie-файлов на сайте Dionis Insurance Broker: категории cookie, управление, правовые основания.",
      },
      pageTitle:
        "Политика использования cookie-файлов для сайта Dionis Insurance Broker",

      updatedLabel: "Дата обновления",
      updatedAt: "",

      sections: [
        {
          title: "1. Определение cookie-файлов и назначение",
          paragraphs: [
            "Cookie-файлы (куки) — это небольшие текстовые файлы, которые веб-сайты посылают в браузер пользователя, где они сохраняются в его каталоге. При повторном посещении dionis-insurance.kz куки позволяют запомнить выбранный язык, параметры отображения и собирать обезличенную статистику использования сайта.",
            "Пользователь может согласиться на использование куки при первом посещении, а затем в любой момент изменить или отозвать своё согласие, нажав на кнопку «Настройки cookie» в нижней части страницы.",
          ],
        },
        {
          title: "2. Категории куки",
          paragraphs: [],
        },
        {
          title: "2.1 Технические (строго необходимые)",
          paragraphs: [
            "Технические куки требуются для корректной работы сайта. Они обычно устанавливаются в ответ на действия пользователя (выбор языка, заполнение форм, настройка согласия) и не могут быть отключены в наших системах.",
          ],
          tables: [
            {
              headers: ["Название", "Срок хранения", "Тип", "Назначение"],
              rows: [
                [
                  "dionis_cookie_consent_v2 (или актуальная версия)",
                  "1 год",
                  "Cookie согласия",
                  "Запоминает выбор пользователя относительно категорий cookie. Создаётся с параметрами path=/; max-age=60*60*24*365; SameSite=Lax, чтобы баннер не показывался при каждом визите.",
                ],
                [
                  "lang (например, NEXT_LOCALE или аналогичная)",
                  "до 1 года",
                  "Языковые настройки",
                  "Сохраняет выбранный язык сайта и параметры интерфейса, чтобы при следующем визите не приходилось выбирать их заново.",
                ],
                [
                  "security",
                  "до 1 года",
                  "Безопасность",
                  "Технические файлы, связанные с защитой форм и стабильной работой сайта.",
                ],
              ],
            },
          ],
        },
        {
          title: "2.2 Аналитические и рекламные куки (загружаются только после согласия)",
          paragraphs: [
            "Эти файлы помогают понять, как используется сайт, улучшать его работу и оценивать эффективность рекламных кампаний. Данные носят обезличенный характер и не используются для прямой идентификации личности.",
            "После отказа от аналитических и рекламных куки сайт продолжит работу, но возможности анализа и персонализации могут быть ограничены.",
          ],
        },
        {
          title: "Google Analytics 4",
          paragraphs: [
            "Google Analytics 4 использует first-party cookie для различения уникальных пользователей и поддержания состояния сеанса. Основными являются _ga и _ga_<container-id>; по умолчанию они сохраняются в браузере в течение двух лет и используются для различения пользователей и поддержания состояния сеанса.",
          ],
        },
        {
          title: "Yandex Metrica",
          paragraphs: [
            "Yandex Metrica устанавливает несколько временных файлов на домене сайта. Ниже приведены примеры:",
          ],
          tables: [
            {
              headers: ["Название", "Срок хранения", "Тип", "Назначение"],
              rows: [
                [
                  "_ym_metrika_enabled",
                  "60 минут",
                  "Аналитический",
                  "Проверяет, корректно ли установлены другие cookie Yandex Metrica.",
                ],
                [
                  "_ym_isad",
                  "2 дня",
                  "Аналитический",
                  "Определяет, установлен ли у посетителя блокировщик рекламы.",
                ],
                [
                  "_ym_uid",
                  "1 год",
                  "Аналитический",
                  "Используется для идентификации посетителей (анонимный идентификатор).",
                ],
                [
                  "_ym_d",
                  "1 год",
                  "Аналитический",
                  "Сохраняет дату первой сессии пользователя.",
                ],
                [
                  "_ym_visorc_*",
                  "30 минут",
                  "Аналитический",
                  "Обеспечивает корректную работу функции Session Replay.",
                ],
                [
                  "Другие файлы (_ym_hostIndex, _ym_sup_debug, gdpr, is_gdpr, yandexuid, ymex, uss и др.)",
                  "1 день — 2 года",
                  "Аналитические/технические",
                  "Используются для ограничения числа запросов, отладки, определения соблюдения GDPR и синхронизации идентификаторов между доменами.",
                  "Полный перечень файлов Yandex Metrica опубликован в справке сервиса.",
                ],
              ],
            },
          ],
          
        },
        {
          title: "Яндекс Реклама",
          paragraphs: [
            "В рамках рекламных кампаний используются технологии Яндекс Рекламы. Они применяют cookie для показа более релевантной рекламы и оценки эффективности рекламных кампаний Dionis.",
            "Эти файлы позволяют видеть, какие рекламные объявления привели пользователей на сайт и какие действия они совершили. Срок их хранения определяется политикой Яндекса; информация о целях обработки и возможностях управления рекламными cookie содержится в политике конфиденциальности Яндекса.",
          ],
        },
        {
          title: "2.3 Статистические/функциональные",
          paragraphs: [
            "Кроме перечисленных файлов, браузер может сохранять статистические и функциональные cookie, которые позволяют распознавать пользователей, подсчитывать количество посещений, тестировать новые функции и хранить предпочтения (например, язык и местоположение).",
            "Наш сайт использует категории, описанные выше: необходимые и аналитические/рекламные (только после согласия).",
          ],
        },
        {
          title: "3. Ваш выбор и управление куки",
          paragraphs: [
            "При первом посещении сайта отображается баннер с кратким описанием целей использования cookie и возможностью принять или отклонить аналитические/рекламные cookie.",
            "При согласии сохраняются cookie согласия и могут загружаться скрипты аналитики. При отказе аналитические теги не загружаются. Управление доступно через кнопку «Настройки cookie» в левом нижнем углу страницы — вы можете изменить выбор в любой момент.",
            "Вы также можете настроить браузер так, чтобы он блокировал cookie или удалял их. Обратите внимание, что отказ от cookie может привести к ограничению функциональности сайта.",
          ],
          links: [
            {
              label: "Настройки персонализированной рекламы Яндекса:",
              text: "yandex.ru/tune/adv",
              href: "https://yandex.ru/tune/adv",
            },
          ],
        },
        {
          title: "4. Правовые основания и обработка данных",
          paragraphs: [
            "Использование технических cookie основано на необходимости обеспечить работу сайта. Аналитические и рекламные cookie обрабатываются на основании вашего согласия; оно может быть дано через баннер и отозвано в любой момент.",
            "Мы не используем cookie для прямой идентификации личности; собранные данные обезличены и предназначены для статистических и маркетинговых целей.",
            "Доступ к информации, собранной с помощью cookie, могут получать наши партнёры (например, Google и Яндекс) в рамках собственных политик конфиденциальности.",
          ],
        },
        {
          title: "5. Обновления политики",
          paragraphs: [
            "Мы можем периодически вносить изменения в эту политику cookie в связи с развитием сайта, изменением используемых технологий или требований законодательства. Обновлённая версия будет опубликована на этой странице.",
            "По вопросам обработки данных вы можете связаться с нами по указанным на сайте контактам. Также вы имеете право подать жалобу в надзорный орган по защите данных в вашей стране.",
          ],
        },
      ],
    },

    kz: {
      seo: {
        title: "Cookie саясаты — Dionis Insurance Broker",
        description:
          "Dionis Insurance Broker сайтындағы cookie файлдарын пайдалану саясаты: санаттар, басқару, құқықтық негіздер.",
      },
      pageTitle:
        "Dionis Insurance Broker сайты үшін cookie файлдарын пайдалану саясаты",

      updatedLabel: "Жаңарту күні",
      updatedAt: "",

      sections: [
        {
          title: "1. Cookie файлдарының анықтамасы және мақсаты",
          paragraphs: [
            "Cookie файлдары — веб-сайттар пайдаланушының браузеріне жіберетін және оның ішінде сақталатын шағын мәтіндік файлдар. dionis-insurance.kz сайтына қайта кіргенде cookie таңдалған тілді, интерфейс параметрлерін есте сақтауға және сайтты пайдалану туралы анонимді статистиканы жинауға көмектеседі.",
            "Пайдаланушы cookie қолдануға алғашқы кіру кезінде келісім бере алады және кейін кез келген уақытта «Cookie баптаулары» батырмасы арқылы келісімін өзгерте немесе кері қайтара алады.",
          ],
        },
        {
          title: "2. Cookie санаттары",
          paragraphs: [],
        },
        {
          title: "2.1 Техникалық (қатаң қажет)",
          paragraphs: [
            "Техникалық cookie сайттың дұрыс жұмыс істеуі үшін қажет. Әдетте олар пайдаланушы әрекеттеріне жауап ретінде орнатылады (тіл таңдау, формаларды толтыру, келісімді баптау) және біздің жүйелерде өшірілмейді.",
          ],
          tables: [
            {
              headers: ["Атауы", "Сақтау мерзімі", "Түрі", "Мақсаты"],
              rows: [
                [
                  "dionis_cookie_consent_v2 (немесе ағымдағы нұсқа)",
                  "1 жыл",
                  "Келісім cookie",
                  "Cookie санаттарына қатысты таңдауды сақтайды. path=/; max-age=60*60*24*365; SameSite=Lax параметрлерімен жасалады, баннер әр кірген сайын көрсетілмейді.",
                ],
                [
                  "lang (мысалы, NEXT_LOCALE немесе ұқсас)",
                  "1 жылға дейін",
                  "Тіл баптаулары",
                  "Таңдалған тілді және интерфейс параметрлерін сақтайды.",
                ],
                [
                  "security",
                  "1 жылға дейін",
                  "Қауіпсіздік",
                  "Формаларды қорғау және сайттың тұрақты жұмысына қатысты техникалық cookie.",
                ],
              ],
            },
          ],
        },
        {
          title: "2.2 Аналитикалық және жарнамалық cookie (тек келісімнен кейін жүктеледі)",
          paragraphs: [
            "Бұл cookie сайттың қалай қолданылатынын түсінуге, сервисті жақсартуға және жарнамалық кампаниялардың тиімділігін бағалауға көмектеседі. Деректер анонимдендірілген және тікелей тұлғаны анықтауға қолданылмайды.",
            "Бас тартқан жағдайда сайт жұмысын жалғастырады, бірақ талдау және жекелендіру мүмкіндіктері шектелуі мүмкін.",
          ],
        },
        {
          title: "Google Analytics 4",
          paragraphs: [
            "Google Analytics 4 бірегей пайдаланушыларды ажырату және сессия күйін сақтау үшін first-party cookie қолданады. Негізгілері: _ga және _ga_<container-id>; әдетте 2 жыл сақталады.",
          ],
        },
        {
          title: "Yandex Metrica",
          paragraphs: ["Yandex Metrica сайт доменінде бірнеше уақытша cookie орнатады. Мысалдар:"],
          tables: [
            {
              headers: ["Атауы", "Сақтау мерзімі", "Түрі", "Мақсаты"],
              rows: [
                ["_ym_metrika_enabled", "60 минут", "Аналитикалық", "Басқа cookie дұрыс орнатылғанын тексереді."],
                ["_ym_isad", "2 күн", "Аналитикалық", "Жарнама бұғаттағыштың бар-жоғын анықтайды."],
                ["_ym_uid", "1 жыл", "Аналитикалық", "Келушілерді анонимді идентификатормен ажырату үшін."],
                ["_ym_d", "1 жыл", "Аналитикалық", "Пайдаланушының бірінші сессия күнін сақтайды."],
                ["_ym_visorc_*", "30 минут", "Аналитикалық", "Session Replay функциясының дұрыс жұмысын қамтамасыз етеді."],
                [
                  "Басқа файлдар (_ym_hostIndex, _ym_sup_debug, gdpr, is_gdpr, yandexuid, ymex, uss және т.б.)",
                  "1 күн — 2 жыл",
                  "Аналитикалық/техникалық",
                  "Сұрауларды шектеу, қателерді түзету, GDPR параметрлері және идентификатор синхрондау үшін қолданылуы мүмкін.",
                  "Yandex Metrica cookie толық тізімі сервис анықтамасында берілген.",
                ],
              ],
            },
          ],
        },
        {
          title: "Яндекс Жарнама",
          paragraphs: [
            "Жарнамалық кампанияларда Яндекс Жарнама технологиялары қолданылуы мүмкін. Олар релевантты жарнама көрсетуге және тиімділігін өлшеуге көмектеседі.",
            "Сақтау мерзімі Яндекс саясатына байланысты; өңдеу мақсаттары мен басқару тәсілдері Яндекс құпиялық саясатында көрсетілген.",
          ],
        },
        {
          title: "2.3 Статистикалық/функционалдық",
          paragraphs: [
            "Кей жағдайларда браузер статистикалық және функционалдық cookie сақтауы мүмкін: келушілер санын есептеу, жаңа функцияларды тестілеу, қалауларды (тіл, интерфейс) сақтау.",
            "Біздің сайт жоғарыда сипатталған санаттарды қолданады: қажет және (келісім болғанда) аналитикалық/жарнамалық.",
          ],
        },
        {
          title: "3. Таңдау және cookie басқару",
          paragraphs: [
            "Алғашқы кіргенде баннер көрсетіледі: cookie мақсаттары қысқаша түсіндіріліп, аналитикалық/жарнамалық cookie қабылдау немесе бас тарту ұсынылады.",
            "Келісім берілгенде келісім cookie сақталады және аналитика скрипттері жүктелуі мүмкін. Бас тартқанда аналитикалық тегтер жүктелмейді. «Cookie баптаулары» арқылы таңдауды кез келген уақытта өзгертуге болады.",
            "Браузер баптауларында cookie бұғаттауға немесе жоюға болады. Cookie-ден бас тарту кейбір функцияларға әсер етуі мүмкін.",
          ],
          links: [
            {
              label: "Яндекстегі жекелендірілген жарнама баптауы:",
              text: "yandex.ru/tune/adv",
              href: "https://yandex.ru/tune/adv",
            },
          ],
        },
        {
          title: "4. Құқықтық негіздер және деректерді өңдеу",
          paragraphs: [
            "Техникалық cookie сайттың жұмысын қамтамасыз ету үшін қажет. Аналитикалық және жарнамалық cookie сіздің келісіміңіз негізінде өңделеді; келісімді баннер арқылы беруге және кез келген уақытта кері қайтаруға болады.",
            "Cookie тікелей тұлғаны анықтау үшін қолданылмайды; деректер анонимдендірілген және статистика/маркетинг мақсаттарына арналған.",
            "Cookie арқылы жиналған ақпаратқа Google және Яндекс сияқты серіктестер өз құпиялық саясаттары шеңберінде қол жеткізе алады.",
          ],
        },
        {
          title: "5. Саясат жаңартулары",
          paragraphs: [
            "Сайттың дамуына, технологиялар мен заң талаптарының өзгеруіне байланысты бұл cookie саясаты жаңартылуы мүмкін. Жаңартылған нұсқа осы бетте жарияланады.",
            "Деректерді өңдеу бойынша сұрақтар үшін сайттағы байланыс арналары арқылы хабарласа аласыз. Сондай-ақ өз еліңіздегі деректерді қорғау жөніндегі қадағалау органына шағым беру құқығыңыз бар.",
          ],
        },
      ],
    },

    en: {
      seo: {
        title: "Cookie Policy — Dionis Insurance Broker",
        description:
          "Cookie policy for Dionis Insurance Broker: cookie categories, controls, and legal basis.",
      },
      pageTitle: "Cookie Policy for the Dionis Insurance Broker website",

      updatedLabel: "Last updated",
      updatedAt: "",

      sections: [
        {
          title: "1. What cookies are and why we use them",
          paragraphs: [
            "Cookies are small text files that websites send to your browser and store on your device. When you revisit dionis-insurance.kz, cookies can remember your language and display preferences and help collect anonymised usage statistics.",
            "You can give consent on your first visit and later change or withdraw it at any time using the “Cookie settings” button at the bottom of the page.",
          ],
        },
        { title: "2. Cookie categories", paragraphs: [] },
        {
          title: "2.1 Technical (strictly necessary)",
          paragraphs: [
            "Necessary cookies are required for the proper operation of the website. They are usually set in response to your actions (language selection, form submissions, consent settings) and cannot be disabled in our systems.",
          ],
          tables: [
            {
              headers: ["Name", "Retention", "Type", "Purpose"],
              rows: [
                [
                  "dionis_cookie_consent_v2 (or current version)",
                  "1 year",
                  "Consent cookie",
                  "Stores your cookie category choices. Created with path=/; max-age=60*60*24*365; SameSite=Lax so the banner is not shown on every visit.",
                ],
                [
                  "lang (e.g., NEXT_LOCALE or similar)",
                  "up to 1 year",
                  "Language settings",
                  "Stores your language choice and interface preferences.",
                ],
                [
                  "security",
                  "up to 1 year",
                  "Security",
                  "Technical cookies related to form protection and stable website operation.",
                ],
              ],
            },
          ],
        },
        {
          title: "2.2 Analytics and advertising cookies (loaded only after consent)",
          paragraphs: [
            "These cookies help us understand how the website is used, improve it, and measure the effectiveness of advertising campaigns. The data is anonymised and is not used to directly identify you.",
            "If you refuse analytics/advertising cookies, the website will still work, but analytics and personalisation capabilities may be limited.",
          ],
        },
        {
          title: "Google Analytics 4",
          paragraphs: [
            "Google Analytics 4 uses first-party cookies to distinguish unique users and maintain session state. Key cookies include _ga and _ga_<container-id>; by default they may be stored for up to two years.",
          ],
        },
        {
          title: "Yandex Metrica",
          paragraphs: [
            "Yandex Metrica may set several temporary cookies on the website domain. Examples include:",
          ],
          tables: [
            {
              headers: ["Name", "Retention", "Type", "Purpose"],
              rows: [
                [
                  "_ym_metrika_enabled",
                  "60 minutes",
                  "Analytics",
                  "Checks whether other Yandex Metrica cookies are set correctly.",
                ],
                [
                  "_ym_isad",
                  "2 days",
                  "Analytics",
                  "Detects whether an ad blocker is installed.",
                ],
                [
                  "_ym_uid",
                  "1 year",
                  "Analytics",
                  "Used to recognise visitors (anonymous identifier).",
                ],
                [
                  "_ym_d",
                  "1 year",
                  "Analytics",
                  "Stores the date of the user’s first session.",
                ],
                [
                  "_ym_visorc_*",
                  "30 minutes",
                  "Analytics",
                  "Supports correct operation of Session Replay.",
                ],
                [
                  "Other cookies (_ym_hostIndex, _ym_sup_debug, gdpr, is_gdpr, yandexuid, ymex, uss, etc.)",
                  "1 day — 2 years",
                  "Analytics/technical",
                  "May be used for request limiting, debugging, GDPR checks, and ID synchronisation.",
                  "A full list of Yandex Metrica cookies is available in the service documentation.",
                ],
              ],
            },
          ],
        },
        {
          title: "Yandex Ads",
          paragraphs: [
            "We may use Yandex Ads technologies as part of advertising campaigns. They use cookies to show more relevant ads and measure campaign performance.",
            "Retention periods are defined by Yandex policies; details are available in Yandex privacy documentation.",
          ],
        },
        {
          title: "2.3 Statistical/functional",
          paragraphs: [
            "In addition to the cookies listed above, browsers may store statistical and functional cookies used to count visits, test new features, and remember preferences (e.g., language).",
            "Our website uses the categories described above: necessary and (with consent) analytics/advertising.",
          ],
        },
        {
          title: "3. Your choices and how to manage cookies",
          paragraphs: [
            "On your first visit, a banner explains cookie purposes and allows you to accept or decline analytics/advertising cookies.",
            "If you accept, consent cookies are saved and analytics scripts may be loaded. If you decline, analytics tags are not loaded. You can change your preferences at any time via “Cookie settings”.",
            "You can also manage cookies in your browser settings. Please note that blocking cookies may limit website functionality.",
          ],
          links: [
            {
              label: "Yandex personalised ads settings:",
              text: "yandex.ru/tune/adv",
              href: "https://yandex.ru/tune/adv",
            },
          ],
        },
        {
          title: "4. Legal basis and data processing",
          paragraphs: [
            "Necessary cookies are used to ensure the website works properly. Analytics and advertising cookies are processed based on your consent; you can withdraw consent at any time.",
            "We do not use cookies to directly identify you. Data is anonymised and used for statistical and marketing purposes.",
            "Our partners (e.g., Google and Yandex) may access cookie-based information under their own privacy policies.",
          ],
        },
        {
          title: "5. Policy updates",
          paragraphs: [
            "We may update this cookie policy as the website evolves, technologies change, or legal requirements are updated. The latest version will be published on this page.",
            "If you have questions, contact us using the details on the website. You may also lodge a complaint with your local data protection authority.",
          ],
        },
      ],
    },
  };

export function getCookiesPolicyDictionary(lang: Lang): CookiesPolicyDictionary {
  return PRIVACY_COOKIES_DICTIONARY[lang] ?? PRIVACY_COOKIES_DICTIONARY.ru;
}
