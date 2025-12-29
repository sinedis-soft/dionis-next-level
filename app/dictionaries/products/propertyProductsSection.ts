// app/dictionaries/products/propertyProductsSection.ts
import type { Lang } from "@/dictionaries/header";

export type PropertyProductsSectionDictionary = {
  top: {
    title: string;
    lead: string;
  };
  common: {
    whoTitle: string;
    whatTitle: string;
  };
  actions: {
    requestQuote: string;
    requestTerms: string;
    requestAuditOffers: string;
  };
  home: {
    title: string;
    subtitle: string;
    badges: string[];
    who: string[];
    what: Array<{ k: string; v: string }>;
    questionsTitle: string;
    questions: string[];
    mortgageTitle: string;
    mortgageText: string;
  };
  movable: {
    title: string;
    subtitle: string;
    badges: string[];
    who: string[];
    paramsTitle: string;
    params: Array<{ k: string; v: string }>;
    brokerTitle: string;
    broker: string[];
  };
  business: {
    title: string;
    subtitle: string;
    badges: string[];
    who: string[];
    includeTitle: string;
    include: Array<{ k: string; v: string }>;
    brokerTitle: string;
    broker: string[];
  };
};

function pickByLang<T>(lang: Lang, ru: T, kz: T, en: T): T {
  if (lang === "kz") return kz;
  if (lang === "en") return en;
  return ru;
}

export function getPropertyProductsSectionDictionary(
  lang: Lang
): PropertyProductsSectionDictionary {
  return {
    top: {
      title: pickByLang(
        lang,
        "Имущественное страхование",
        "Мүлікті сақтандыру",
        "Property insurance"
      ),
      lead: pickByLang(
        lang,
        "Три направления: жильё (квартира/дом), движимое имущество (техника/оборудование) и имущество бизнеса (офисы/склады/ТРЦ). Ниже — коротко, что страхуем и где брокер реально выгоднее.",
        "3 бағыт: тұрғын үй (пәтер/үй), жылжымалы мүлік (техника/жабдық) және бизнес мүлкі (кеңсе/қойма/ТРЦ). Төменде — нені сақтандырамыз және брокер қашан тиімді.",
        "Three tracks: home (apartment/house), movable property (equipment/tech), and business property (offices/warehouses). Below is a practical overview and where a broker is truly advantageous."
      ),
    },

    common: {
      whoTitle: pickByLang(lang, "Кому это нужно", "Кімге керек", "Who it’s for"),
      whatTitle: pickByLang(lang, "Что именно страхуем", "Нені сақтандырамыз", "What is insured"),
    },

    actions: {
      requestQuote: pickByLang(lang, "Запросить расчёт", "Есеп сұрау", "Request a quote"),
      requestTerms: pickByLang(lang, "Запросить условия", "Шарт сұрау", "Request terms"),
      requestAuditOffers: pickByLang(
        lang,
        "Запросить аудит/оферты",
        "Аудит/ұсыныс сұрау",
        "Request audit/offers"
      ),
    },

    home: {
      title: pickByLang(
        lang,
        "Квартиры и дома",
        "Пәтерлер мен үйлер",
        "Apartments & houses"
      ),
      subtitle: pickByLang(
        lang,
        "Защита стен/отделки/имущества и ответственности перед соседями. Подходит для владельцев жилья, арендодателей и ипотечных клиентов.",
        "Қабырға/әрлеу/мүлік және көршілер алдындағы жауапкершілікті қорғау. Үй иелері, жалға берушілер және ипотека клиенттеріне лайық.",
        "Protection for structures/renovation/contents plus liability to neighbors. Suitable for homeowners, landlords and mortgage borrowers."
      ),
      badges: pickByLang(lang, ["Жильё", "Ипотека"], ["Тұрғын үй", "Ипотека"], ["Home", "Mortgage"]),
      who: pickByLang(
        lang,
        [
          "Владельцы жилья",
          "Арендодатели",
          "Ипотечники (часто требуется банком)",
          "Тем, кто хочет закрыть риски ремонта и соседей",
        ],
        [
          "Үй иелері",
          "Жалға берушілер",
          "Ипотека клиенттері (банк талап етуі мүмкін)",
          "Жөндеу/көрші тәуекелдерін жабғысы келетіндер",
        ],
        [
          "Homeowners",
          "Landlords",
          "Mortgage borrowers (often required)",
          "Anyone who wants to cover repair + neighbor liability risks",
        ]
      ),
      what: pickByLang(
        lang,
        [
          { k: "Конструкция", v: "стены, перекрытия (по выбранной программе)" },
          { k: "Отделка", v: "ремонт, инженерия, встроенные элементы" },
          { k: "Имущество", v: "мебель и техника (если включено)" },
          { k: "Соседи", v: "ответственность — если, например, зальёте" },
        ],
        [
          { k: "Құрылым", v: "қабырға, жабын (бағдарламаға қарай)" },
          { k: "Әрлеу", v: "жөндеу, инженерия, кіріктірілген элементтер" },
          { k: "Мүлік", v: "жиһаз және техника (қосылса)" },
          { k: "Көршілер", v: "жауапкершілік — мысалы, су кетсе" },
        ],
        [
          { k: "Structure", v: "walls, floors/ceilings (by program)" },
          { k: "Renovation", v: "finishing, utilities, built-ins" },
          { k: "Contents", v: "furniture & appliances (if included)" },
          { k: "Neighbor liability", v: "e.g., water damage to neighbors" },
        ]
      ),
      questionsTitle: pickByLang(lang, "Ключевые вопросы", "Негізгі сұрақтар", "Key questions"),
      questions: pickByLang(
        lang,
        [
          "Покрывает ли землетрясение (актуально для Алматы) — зависит от программы и страховщика.",
          "Покрывает ли прорыв труб, пожар, кражу — уточняем набор рисков заранее.",
          "Нужен ли осмотр: для квартиры часто достаточно фото в WhatsApp, для домов возможен выезд.",
          "«Цена спокойствия»: часто стоимость в день сопоставима с чашкой кофе — зависит от суммы и рисков.",
        ],
        [
          "Жер сілкінісі қамтыла ма (Алматы үшін маңызды) — бағдарлама/сақтандырушыға байланысты.",
          "Құбыр жарылуы, өрт, ұрлық қамтыла ма — тәуекелдерді алдын ала нақтылаймыз.",
          "Қарау керек пе: пәтерге көбіне WhatsApp фото жеткілікті, үйге кейде шығу қажет.",
          "«Тыныштық бағасы»: күніне бір кофе шамасында болуы мүмкін — сома/тәуекелге байланысты.",
        ],
        [
          "Earthquake coverage (relevant for Almaty) depends on the program/insurer.",
          "Burst pipes, fire, theft — we confirm covered risks upfront.",
          "Inspection: apartments often need only WhatsApp photos; houses may require a visit.",
          "‘Cost per day’ can be comparable to a cup of coffee, depending on sums/risks.",
        ]
      ),
      mortgageTitle: pickByLang(lang, "Ипотека: брокер vs банк", "Ипотека: брокер vs банк", "Mortgage: broker vs bank"),
      mortgageText: pickByLang(
        lang,
        "Да, можно страховаться через брокера, а не в банке. Часто это дешевле в 1.5–2 раза, а Dionis подготовит пакет документов под требования любого банка Казахстана.",
        "Иә, банк арқылы емес, брокер арқылы сақтандыруға болады. Көбіне 1.5–2 есе арзан, ал Dionis кез келген ҚР банкіне қажетті құжаттарды дайындайды.",
        "Yes, you can insure via a broker, not the bank. It’s often 1.5–2x cheaper, and Dionis prepares the documents for any Kazakhstan bank requirements."
      ),
    },

    movable: {
      title: pickByLang(
        lang,
        "Оборудование и техника (движимое имущество)",
        "Жабдық пен техника (жылжымалы мүлік)",
        "Equipment & movable property"
      ),
      subtitle: pickByLang(
        lang,
        "Для дорогой техники, спецтехники, оборудования, предметов искусства — когда важно сохранить стоимость актива.",
        "Қымбат техника, арнайы техника, жабдық, өнер бұйымдары үшін — актив құнын сақтау маңызды болғанда.",
        "For high-value tech, machinery, specialized equipment and art — when preserving asset value matters."
      ),
      badges: pickByLang(lang, ["Оборудование", "Техника"], ["Жабдық", "Техника"], ["Equipment", "Assets"]),
      who: pickByLang(
        lang,
        [
          "Владельцы дорогостоящего оборудования",
          "Компании с техникой/серверами",
          "Складские запасы и товары в обороте",
          "Спецтехника и передвижное оборудование",
        ],
        [
          "Қымбат жабдық иелері",
          "Техника/сервері бар компаниялар",
          "Қоймадағы тауарлар/айналымдағы қор",
          "Арнайы техника және көшпелі жабдық",
        ],
        [
          "Owners of expensive equipment",
          "Companies with IT/servers",
          "Stock/inventory in storage or circulation",
          "Special machinery and mobile equipment",
        ]
      ),
      paramsTitle: pickByLang(lang, "Ключевые параметры", "Негізгі параметр", "Key parameters"),
      params: pickByLang(
        lang,
        [
          {
            k: "Что считается",
            v: "оргтехника/серверы, станки, мобильное оборудование, товар на складе",
          },
          { k: "Территория", v: "только на объекте или также при перевозке — зависит от условий" },
          {
            k: "Риски",
            v: "кража, повреждение при погрузке, стихийные бедствия, скачок напряжения (если включено)",
          },
          { k: "Оценка", v: "чеки/инвойсы/оценка — согласуем способ подтверждения стоимости" },
        ],
        [
          { k: "Неге жатады", v: "оргтехника/сервер, станок, көшпелі жабдық, қоймадағы тауар" },
          { k: "Аумақ", v: "тек объектте ме, әлде тасымалдауда да ма — шартқа байланысты" },
          { k: "Тәуекел", v: "ұрлық, тиеу кезінде зақым, апат, кернеу секіруі (қосылса)" },
          { k: "Бағалау", v: "чек/инвойс/бағалау — құнын растауды келісеміз" },
        ],
        [
          { k: "What counts", v: "IT/servers, machines, mobile equipment, stock in warehouse" },
          { k: "Territory", v: "on premises only or also in transit — per terms" },
          { k: "Risks", v: "theft, loading damage, natural events, power surge (if included)" },
          { k: "Valuation", v: "invoices/receipts/appraisal — we agree evidence of value" },
        ]
      ),
      brokerTitle: pickByLang(lang, "Специфика брокера", "Брокер ерекшелігі", "Broker advantage"),
      broker: pickByLang(
        lang,
        [
          "Находим страховщика под специфическое оборудование, от которого другие отказываются.",
          "Сверяем территорию и режим эксплуатации (объект/перевозка/выезды).",
          "Проверяем исключения — они решают судьбу выплаты.",
        ],
        [
          "Басқалар бас тартатын арнайы жабдыққа да сақтандырушы табамыз.",
          "Аумақ пен пайдалану режимін нақтылаймыз (объект/тасымал/шығу).",
          "Алып тастауларды тексереміз — төлемді сол шешеді.",
        ],
        [
          "We can place even niche equipment that others refuse.",
          "We validate territory and usage mode (site/transit/off-site).",
          "We check exclusions — they determine claim outcome.",
        ]
      ),
    },

    business: {
      title: pickByLang(
        lang,
        "Имущество для бизнеса (офисы, склады, ТРЦ)",
        "Бизнес мүлкі (кеңсе, қойма, ТРЦ)",
        "Business property (offices, warehouses)"
      ),
      subtitle: pickByLang(
        lang,
        "Для собственников и арендаторов, промышленных предприятий и логистики. Можно собрать комплекс: здание + имущество + ответственность + BI (перерыв в деятельности).",
        "Иелері мен жалға алушыларға, өндіріс пен логистикаға. Кешенді жинауға болады: ғимарат + мүлік + жауапкершілік + BI (тоқтап қалу).",
        "For owners/tenants, industrial and logistics companies. Can be structured as a package: building + contents + liability + BI (business interruption)."
      ),
      badges: pickByLang(lang, ["Бизнес", "Комплекс"], ["Бизнес", "Кешен"], ["Business", "Package"]),
      who: pickByLang(
        lang,
        [
          "Собственники коммерческой недвижимости",
          "Арендаторы (требование договора)",
          "Склады и логистические центры",
          "Промышленные объекты",
        ],
        [
          "Коммерциялық жылжымайтын мүлік иелері",
          "Жалға алушылар (шарт талабы)",
          "Қойма және логистика",
          "Өндірістік объектілер",
        ],
        [
          "Commercial property owners",
          "Tenants (lease requirement)",
          "Warehouses & logistics centers",
          "Industrial sites",
        ]
      ),
      includeTitle: pickByLang(lang, "Что включаем", "Нені қосамыз", "What we include"),
      include: pickByLang(
        lang,
        [
          { k: "Типы объектов", v: "склады, офисы/БЦ, цеха, ангары, инженерные сооружения" },
          { k: "Комплекс", v: "можно добавить BI (перерыв в производстве/торговле) — если актуально" },
          { k: "Скидки", v: "охрана, пожарная сигнализация, регламенты — снижают тариф" },
          { k: "Скорость", v: "делаем полис под договор аренды/контракты в короткие сроки" },
        ],
        [
          { k: "Объект түрі", v: "қойма, кеңсе/БЦ, цех, ангар, инженерлік құрылыс" },
          { k: "Кешен", v: "BI қосуға болады (тоқтап қалу) — қажет болса" },
          { k: "Жеңілдік", v: "күзет, өрт дабылы, регламент — тарифті төмендетеді" },
          { k: "Жылдамдық", v: "жалға алу шартына/контрактқа тез дайындаймыз" },
        ],
        [
          { k: "Objects", v: "warehouses, offices, production, hangars, engineering structures" },
          { k: "Package", v: "BI can be added (business interruption) if relevant" },
          { k: "Discounts", v: "security, fire systems, procedures — reduce tariff" },
          { k: "Speed", v: "fast issuance for leases and contracts" },
        ]
      ),
      brokerTitle: pickByLang(lang, "Помощь брокера", "Брокер көмегі", "Broker support"),
      broker: pickByLang(
        lang,
        [
          "Анализ 5–7 программ страховых компаний РК под ваш объект.",
          "Проверка исключений и юридических ловушек (чтобы не остаться без выплаты).",
          "Сопровождение крупных убытков: оценка, аджастеры, коммуникации.",
        ],
        [
          "Объектіңізге сай ҚР сақтандырушыларының 5–7 бағдарламасын салыстыру.",
          "Алып тастауларды және шарттағы «қақпандарды» тексеру.",
          "Ірі шығындарды сүйемелдеу: бағалау, аджастер, байланыс.",
        ],
        [
          "We compare 5–7 Kazakhstan insurers’ programs for your object.",
          "We check exclusions and legal traps (to avoid claim denial).",
          "We support major claims: assessment, adjusters, communication.",
        ]
      ),
    },
  };
}
