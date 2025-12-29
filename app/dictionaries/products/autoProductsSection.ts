// app/dictionaries/products/autoProductsSection.ts
import type { Lang } from "@/dictionaries/header";

export type KVRow = { k: string; v: string };

export type AutoProductsSectionDictionary = {
  top: {
    title: string;
    lead: string;
    // "Ask a question", "Clarify term/route" и т.п.
    askQuestion: string;
    clarifyTermRoute: string;
    routeBundleTitle: string;
    routeBundleText: string;

    cascoCta: string;

    badges: {
      online: string;
      international: string;
      russiaEntry: string;
      kazakhstan: string;
      onRequest: string;
    };
  };

  greenCard: {
    title: string;
    subtitle: string;

    whoTitle: string;
    whoItems: string[];

    includedTitle: string;
    includedRows: KVRow[];
    note: string;

    brokerTitle: string;
    brokerItems: string[];
  };

  osago: {
    title: string;
    subtitle: string;

    whoTitle: string;
    whoItems: string[];

    includedTitle: string;
    includedRows: KVRow[];
    note: string;

    brokerTitle: string;
    brokerItems: string[];
  };

  casco: {
    title: string;
    subtitle: string;

    whoTitle: string;
    whoItems: string[];

    includedTitle: string;
    includedRows: KVRow[];
    note: string;

    brokerTitle: string;
    brokerItems: string[];

    franchiseTitle: string;
    franchiseText: string;
  };
};

const ru: AutoProductsSectionDictionary = {
  top: {
    title: "Автострахование",
    lead:
      "Три ключевых продукта для поездок и маршрутов: Green Card, ОСАГО РФ и КАСКО. Ниже — коротко и по делу: что покрывает каждый продукт и кому он нужен.",
    askQuestion: "Задать вопрос",
    clarifyTermRoute: "Уточнить срок/маршрут",
    routeBundleTitle: "Связка РФ + ЕС",
    routeBundleText:
      "Если маршрут включает и РФ, и страны Green Card — чаще всего нужны оба полиса: ОСАГО РФ для РФ и Green Card для других стран.",
    cascoCta: "Запросить расчёт КАСКО",
    badges: {
      online: "Онлайн",
      international: "Международно",
      russiaEntry: "Въезд в РФ",
      kazakhstan: "Казахстан",
      onRequest: "По запросу",
    },
  },

  greenCard: {
    title: "Зелёная карта (Green Card)",
    subtitle:
      "Международное страхование ответственности (аналог ОСАГО) за рубежом. Покрывает ущерб третьим лицам, если вы стали виновником ДТП в стране действия полиса.",

    whoTitle: "Кому это нужно",
    whoItems: [
      "Владельцам авто на номерах Казахстана при выезде в ЕС/Турцию и другие страны системы",
      "Путешествия на личном авто и автотуризм",
      "Коммерческие поездки (если категория ТС допускается условиями)",
      "Тем, кто хочет оформить заранее и не тратить время на границе",
    ],

    includedTitle: "Что покрывает",
    includedRows: [
      {
        k: "Ответственность",
        v: "вред имуществу и здоровью третьих лиц (по лимитам страны ДТП)",
      },
      {
        k: "Территория",
        v: "страны системы Green Card (смотрите перечень и ограничения)",
      },
      { k: "Формат", v: "электронный полис (PDF, но рекомендуется распечатать черным по белому)" },
      { k: "Срок", v: "1, 3, 6 или 12 месяцев" },
    ],
    note:
      "Важно: Green Card НЕ ремонтирует ваш автомобиль. Это ответственность перед третьими лицами.",

    brokerTitle: "Брокер vs страховая",
    brokerItems: [
      "Проверяем маршрут и подбираем правильную зону покрытия (чтобы не было «страна не входит»).",
      "Сверяем сроки и дату начала действия, чтобы полис «накрывал» весь маршрут.",
      "Убираем риск ошибок в данных (ТС/категория/владелец) — это критично на границе и при ДТП.",
    ],
  },

  osago: {
    title: "ОСАГО РФ для нерезидентов",
    subtitle:
      "Обязательное страхование ответственности для движения по дорогам РФ на авто с иностранными номерами. Покрывает ущерб третьим лицам при ДТП в РФ.",

    whoTitle: "Кому это нужно",
    whoItems: [
      "Тем, кто въезжает в РФ на автомобиле с иностранными номерами",
      "Для поездок, транзита и регулярных маршрутов в РФ",
      "Чтобы избежать штрафов и проблем при проверках",
      "Кому важна электронная выдача без посещения офиса",
    ],

    includedTitle: "Что входит",
    includedRows: [
      {
        k: "Ответственность",
        v: "вред имуществу и здоровью третьих лиц (по лимитам РФ)",
      },
      { k: "Территория", v: "вся территория РФ" },
      { k: "Формат", v: "электронный полис (как правило, достаточно PDF)" },
      { k: "Срок", v: "подбирается под поездку (важно покрыть весь период)" },
    ],
    note:
      "Важно: ОСАГО РФ — это ответственность. Оно не покрывает ремонт вашего автомобиля.",

    brokerTitle: "Брокер vs страховая",
    brokerItems: [
      "Подбираем срок так, чтобы не было «разрыва» покрытия на маршруте.",
      "Проверяем корректность данных (ТС/водитель/период) — ошибки = риск отказа/штрафов.",
      "Помогаем с форматом получения и хранением документа (e-mail/мессенджер).",
    ],
  },

  casco: {
    title: "КАСКО в Казахстане",
    subtitle:
      "Добровольная защита вашего автомобиля. Покрывает ущерб/утрату авто по выбранной программе (включая крупные риски).",

    whoTitle: "Кому это нужно",
    whoItems: [
      "Новый автомобиль (дорогой кузовной ремонт/оптика/датчики)",
      "Авто в кредите / залоге (часто требуется банком)",
      "Городская эксплуатация и плотный трафик",
      "Для спокойствия: страхуем крупные риски вместо непредвиденных затрат",
    ],

    includedTitle: "Что обычно входит",
    includedRows: [
      {
        k: "ДТП",
        v: "повреждения по условиям программы (в т.ч. если виноваты вы — если предусмотрено)",
      },
      { k: "Угон/хищение", v: "по условиям и исключениям страховщика" },
      { k: "Природа", v: "град/буря/затопление и т.п. — если включено" },
      { k: "Вандалы", v: "умышленные повреждения третьими лицами" },
    ],
    note:
      "Важно: у разных страховщиков отличаются исключения, формат ремонта (дилер/СТО), лимиты и условия по стеклам/фарам — перед оформлением сверяем конкретную программу.",

    brokerTitle: "Брокер vs страховая",
    brokerItems: [
      "Сравниваем программы: исключения, лимиты, франшизы, ремонт у дилера/СТО.",
      "Подбираем под задачу: «под банк», «максимум защиты», «дешевле с франшизой».",
      "Снижаем риск «купили не то»: в КАСКО формулировки важнее рекламных обещаний.",
    ],

    franchiseTitle: "Франшиза: короткий ликбез",
    franchiseText:
      "Франшиза — часть убытка, которую вы оплачиваете сами. Чем выше франшиза, тем дешевле полис. Это рационально, если вы готовы закрывать мелкие повреждения самостоятельно и страховать только крупные риски. Главное — заранее понимать, какую сумму вы готовы брать на себя при каждом страховом случае.",
  },
};

const kz: AutoProductsSectionDictionary = {
  top: {
    title: "Автосақтандыру",
    lead:
      "Сапарлар мен маршруттарға арналған 3 негізгі өнім: Green Card, РФ ОСАГО және КАСКО. Төменде — әр өнім нені жабады және кімге керек екенін қысқа әрі нақты түсіндіреміз.",
    askQuestion: "Сұрақ қою",
    clarifyTermRoute: "Мерзім/маршрут нақтылау",
    routeBundleTitle: "РФ + ЕО бағыты",
    routeBundleText:
      "Маршрутта РФ та, Green Card елдері де болса — әдетте екі полис керек: РФ үшін ОСАГО, басқа елдер үшін Green Card.",
    cascoCta: "КАСКО есептеу сұрау",
    badges: {
      online: "Онлайн",
      international: "Халықаралық",
      russiaEntry: "РФ",
      kazakhstan: "Қазақстан",
      onRequest: "Сұраныс бойынша",
    },
  },

  greenCard: {
    title: "Green Card (Жасыл карта)",
    subtitle:
      "Шетелдегі азаматтық жауапкершілікті сақтандыру (ОСАГО аналогы). Полис қолданылатын елде сіз кінәлі болған ЖКО кезінде үшінші тұлғаларға келтірілген залалды өтейді.",

    whoTitle: "Кімге керек",
    whoItems: [
      "Қазақстан нөміріндегі көлікпен ЕО/Түркия және басқа елдерге шығатындарға",
      "Жеке автосаяхат пен туризмге",
      "Коммерциялық сапарларға (ТС санаты шартқа сай болса)",
      "Шекарада уақыт жоғалтпай, алдын ала рәсімдегісі келетіндерге",
    ],

    includedTitle: "Нені жабады",
        includedRows: [
        {
            k: "Жауапкершілік",
            v: "жол-көлік оқиғасы болған елдің лимиттері бойынша үшінші тұлғалардың мүлкі мен денсаулығына келтірілген зиян",
        },
        {
            k: "Аумақ",
            v: "Green Card жүйесіндегі елдер (тізім мен шектеулерді қараңыз)",
        },
        {
        k: "Формат",
        v: "электронды полис (PDF, алайда ақ-қара түсте басып шығару ұсынылады)"
        },

        { 
            k: "Мерзім", 
            v: "1, 3, 6 немесе 12 ай" 
        },
        ],
        note:
        "Маңызды: Green Card сіздің көлігіңізді жөндемейді. Бұл — үшінші тұлғалар алдындағы жауапкершілік.",

        brokerTitle: "Брокер vs сақтандыру компаниясы",
        brokerItems: [
        "Маршрутты тексеріп, қамту аймағын дұрыс таңдаймыз («ел қамтуға кірмейді» деген жағдай болмауы үшін).",
        "Полистің басталу күнін және мерзімін нақтылаймыз — бүкіл маршрут толық қамтылуы керек.",
        "Деректердегі қате тәуекелін азайтамыз (көлік/санат/иесі) — бұл шекарада да, ЖКО кезінде де өте маңызды.",
        ],

  },

  osago: {
    title: "РФ ОСАГО (резидент еместерге)",
    subtitle:
      "РФ жолдарында шетелдік нөмірмен жүруге міндетті жауапкершілік сақтандыруы. РФ аумағындағы ЖКО кезінде үшінші тұлғаларға келтірілген залалды өтейді.",

    whoTitle: "Кімге керек",
    whoItems: [
      "Шетелдік нөмірмен РФ-қа кіретіндерге",
      "РФ-та сапар/транзит/тұрақты маршруттарға",
      "Айыппұл және тексерістегі мәселелерден сақтану үшін",
      "Офиссіз электронды рәсімдеуді қалайтындарға",
    ],

    includedTitle: "Не кіреді",
    includedRows: [
      {
        k: "Жауапкершілік",
        v: "үшінші тұлғалардың мүлкі/денсаулығы (РФ лимиттері бойынша)",
      },
      { k: "Аумақ", v: "РФ аумағы түгел" },
      { k: "Формат", v: "электронды полис (әдетте PDF жеткілікті)" },
      { k: "Мерзім", v: "сапарға сай таңдалады (бүкіл кезең жабылсын)" },
    ],
    note:
      "Маңызды: РФ ОСАГО — жауапкершілік. Өз көлігіңізді жөндеуді өтемейді.",

    brokerTitle: "Брокер vs сақтандыру компаниясы",
    brokerItems: [
      "Маршрутта қамту «үзіліп қалмас» үшін мерзімді дұрыс таңдаймыз.",
      "Деректердің дұрыстығын тексереміз (ТС/жүргізуші/мерзім) — қате қауіпті.",
      "Құжатты алу және сақтау форматын реттейміз (e-mail/мессенджер).",
    ],
  },

  casco: {
    title: "Қазақстандағы КАСКО",
    subtitle:
      "Көлігіңізді ерікті қорғау. Бағдарламаға қарай көліктің зақымдануын/жоғалуын өтейді (ірі тәуекелдерді қоса).",

    whoTitle: "Кімге керек",
    whoItems: [
      "Жаңа автомобиль (жөндеу қымбат)",
      "Несие/кепілдегі авто (банк талап етуі мүмкін)",
      "Қалада жиі жүру және тығыз трафик",
      "Тыныштық үшін: ірі тәуекелдерді жабу",
    ],

    includedTitle: "Әдетте не кіреді",
    includedRows: [
      { k: "ЖКО", v: "бағдарлама шартына қарай (кейде өз кінәңіз болса да)" },
      { k: "Ұрлық", v: "сақтандырушының шарттары/ерекшеліктеріне қарай" },
      { k: "Табиғат", v: "бұршақ/дауыл/су басу — егер қосылған болса" },
      { k: "Вандалдар", v: "үшінші тұлғалардың қасақана зияны" },
    ],
    note:
      "Маңызды: сақтандырушылар арасында алып тастаулар, жөндеу форматы (дилер/СТО), лимиттер және әйнек/шам шарттары өзгеше — рәсімдер алдында нақты бағдарламаны тексереміз.",

    brokerTitle: "Брокер vs сақтандыру компаниясы",
    brokerItems: [
      "Бағдарламаларды салыстырамыз: алып тастаулар, лимиттер, франшиза, жөндеу форматы.",
      "Мақсатқа сай таңдаймыз: «банк үшін», «максимум қорғау», «франшизамен арзанырақ».",
      "«Дұрыс емес полис» тәуекелін азайтамыз: мәтін шешеді.",
    ],

    franchiseTitle: "Франшиза: қысқаша түсінік",
    franchiseText:
      "Франшиза — шығынның бір бөлігін өзіңіз төлейсіз. Франшиза жоғары болған сайын полис арзандайды. Ұсақ зақымдарды өзіңіз жабуға дайын болсаңыз, тек ірі тәуекелдерді сақтандыру тиімді. Маңыздысы — әр жағдай бойынша өз үлесіңізді алдын ала түсіну.",
  },
};

const en: AutoProductsSectionDictionary = {
  top: {
    title: "Motor insurance",
    lead:
      "Three key products for trips and routes: Green Card, OSAGO Russia and CASCO. Below is a practical overview: what each covers and who needs it.",
    askQuestion: "Ask a question",
    clarifyTermRoute: "Clarify term/route",
    routeBundleTitle: "Russia + EU route",
    routeBundleText:
      "If your route includes both Russia and Green Card countries, you typically need both policies: OSAGO for Russia and Green Card for other countries.",
    cascoCta: "Request a CASCO quote",
    badges: {
      online: "Online",
      international: "International",
      russiaEntry: "Russia",
      kazakhstan: "Kazakhstan",
      onRequest: "On request",
    },
  },

  greenCard: {
    title: "Green Card",
    subtitle:
      "International third-party liability insurance abroad (similar to MTPL). Covers damage to third parties if you cause an accident in a covered country.",

    whoTitle: "Who it’s for",
    whoItems: [
      "Kazakhstan-registered vehicles entering EU/Türkiye and other system countries",
      "Personal trips and road tourism",
      "Commercial trips (if vehicle category is allowed by terms)",
      "Those who prefer arranging in advance (no border queues)",
    ],

    includedTitle: "What it covers",
        includedRows: [
        {
            k: "Liability",
            v: "damage to third-party property and bodily injury (subject to the limits of the country where the accident occurred)",
        },
        {
            k: "Territory",
            v: "Green Card system countries (see the list and applicable restrictions)",
        },
        {
            k: "Format",
            v: "electronic policy (PDF; however, printing a black-and-white copy is recommended)"
        },
        { 
            k: "Term", 
            v: "1, 3, 6, or 12 months" 
        },
        ],
        note:
        "Important: Green Card does NOT cover repairs to your own vehicle. It provides third-party liability coverage.",

        brokerTitle: "Broker vs insurer",
        brokerItems: [
        "We review your route and select the correct coverage area (to avoid issues such as a country not being covered).",
        "We verify the policy term and start date to ensure coverage applies to the entire route.",
        "We reduce the risk of data errors (vehicle/category/owner), which is critical at the border and in the event of an accident.",
        ],

  },

  osago: {
    title: "OSAGO Russia (non-residents)",
    subtitle:
      "Mandatory third-party liability insurance for driving in Russia with foreign plates. Covers damage to third parties in Russia.",

    whoTitle: "Who it’s for",
    whoItems: [
      "Anyone entering Russia with foreign plates",
      "Trips, transit, and recurring routes in Russia",
      "To avoid fines and issues at checks",
      "Those who prefer e-policy issuance without office visits",
    ],

    includedTitle: "What it includes",
    includedRows: [
      { k: "Liability", v: "property and bodily injury to third parties (per RF limits)" },
      { k: "Territory", v: "entire Russian Federation" },
      { k: "Format", v: "electronic policy (PDF is typically sufficient)" },
      { k: "Term", v: "chosen to match your trip (must cover the full period)" },
    ],
    note:
      "Important: OSAGO is liability insurance. It does not cover repairs for your own vehicle.",

    brokerTitle: "Broker vs insurer",
    brokerItems: [
      "We choose the term to avoid coverage gaps on the route.",
      "We verify all details (vehicle/driver/period) — errors can cause issues.",
      "We help with delivery and storing the document (email/messenger).",
    ],
  },

  casco: {
    title: "CASCO in Kazakhstan",
    subtitle:
      "Voluntary protection for your own vehicle. Covers damage/loss depending on the chosen program (including major risks).",

    whoTitle: "Who it’s for",
    whoItems: [
      "New vehicle (repairs are expensive: bodywork, lights, sensors)",
      "Loan/pledged vehicle (often required by the bank)",
      "Dense city traffic and daily usage",
      "Peace of mind: cover major risks instead of unexpected costs",
    ],

    includedTitle: "What is typically covered",
    includedRows: [
      { k: "Accident damage", v: "per program terms (sometimes even if you’re at fault)" },
      { k: "Theft", v: "subject to insurer terms/exclusions" },
      { k: "Natural hazards", v: "hail/storm/flood etc. — if included" },
      { k: "Vandalism", v: "intentional third-party damage" },
    ],
    note:
      "Important: exclusions, repair model (dealer/repair shop), limits, and glass/lamps conditions vary by insurer — we validate the exact program before issuance.",

    brokerTitle: "Broker vs insurer",
    brokerItems: [
      "We compare programs: exclusions, limits, deductibles, dealer/repair options.",
      "We tailor it: bank requirement, maximum protection, or cheaper with deductible.",
      "We reduce the risk of buying the wrong product: wording matters in CASCO.",
    ],

    franchiseTitle: "Deductible: quick guide",
    franchiseText:
      "A deductible is the part of the loss you pay yourself. Higher deductible → cheaper policy. It makes sense if you can self-fund minor damage and insure only major risks. The key is to choose an amount you are comfortable paying per claim.",
  },
};

export const AUTO_PRODUCTS_SECTION_DICTIONARY: Record<Lang, AutoProductsSectionDictionary> = {
  ru,
  kz,
  en,
};

export function getAutoProductsSectionDictionary(lang: Lang): AutoProductsSectionDictionary {
  return AUTO_PRODUCTS_SECTION_DICTIONARY[lang] ?? ru;
}
