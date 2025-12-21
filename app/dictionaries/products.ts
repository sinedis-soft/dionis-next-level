// app/dictionaries/products.ts
import type { Lang } from "@/dictionaries/header";

export type CategoryKey =
  | "auto"
  | "property"
  | "cargo"
  | "liability"
  | "life"
  | "vhi";

export type ProductsSectionKey = CategoryKey;

export type ProductsPageUI = {
  h1: string;
  sub: string;
  quick: string;
  requestTitle: string;
  requestText: string;
  btnRequest: string;
  btnToSection: string;
  btnGreenCard: string;
  btnOsago: string;

  // поддержка FeaturedProducts.tsx
  featured: string;
  onlineNote: string;
  featuredGreenCardDesc: string;
  featuredOsagoDesc: string;
};

export type Category = {
  key: CategoryKey;
  sectionKey: ProductsSectionKey;
  title: Record<Lang, string>;
  lead: Record<Lang, string>;
  bullets: Record<Lang, string[]>;
  image: string;
};

export const PRODUCTS_CATEGORIES: Category[] = [
  {
    key: "auto",
    sectionKey: "auto",
    title: { ru: "Автострахование", kz: "Автосақтандыру", en: "Motor insurance" },
    lead: {
      ru: "Ключевые решения для поездок и международных маршрутов. Часть продуктов оформляется онлайн, остальное — по запросу.",
      kz: "Сапарлар мен халықаралық маршруттарға арналған негізгі шешімдер. Бір бөлігі онлайн рәсімделеді, қалғаны — сұраныс бойынша.",
      en: "Core solutions for trips and international routes. Some products are available online, others on request.",
    },
    bullets: {
      ru: ["Зелёная карта (онлайн)", "ОСАГО РФ (онлайн)", "КАСКО (по запросу)"],
      kz: ["Green Card (онлайн)", "РФ ОСАГО (онлайн)", "КАСКО (сұраныс бойынша)"],
      en: ["Green Card (online)", "OSAGO Russia (online)", "CASCO (on request)"],
    },
    image: "/services/autoinsur.png",
  },
  {
    key: "property",
    sectionKey: "property",
    title: {
      ru: "Имущественное страхование",
      kz: "Мүлікті сақтандыру",
      en: "Property insurance",
    },
    lead: {
      ru: "Защита недвижимости и имущества — подбираем условия и страховщика под задачу.",
      kz: "Жылжымайтын мүлік пен мүлікті қорғау — міндетке сай шарт пен сақтандырушыны таңдаймыз.",
      en: "Protection for real estate and assets — we select terms and insurer for your case.",
    },
    bullets: {
      ru: ["Квартиры и дома", "Бизнес-объекты", "Оборудование и техника"],
      kz: ["Пәтерлер мен үйлер", "Бизнес нысандары", "Жабдықтар мен техника"],
      en: ["Apartments & houses", "Business objects", "Equipment & machinery"],
    },
    image: "/services/engininsur.png",
  },
  {
    key: "cargo",
    sectionKey: "cargo",
    title: { ru: "Страхование грузов", kz: "Жүк сақтандыру", en: "Cargo insurance" },
    lead: {
      ru: "Решения для перевозчиков и логистики: страхование грузов и ответственности — с фокусом на международные перевозки.",
      kz: "Тасымалдаушылар мен логистикаға арналған шешімдер: жүк пен жауапкершілікті сақтандыру — халықаралық тасымалға басымдықпен.",
      en: "Solutions for carriers and logistics: cargo and liability cover with focus on international transportation.",
    },
    bullets: {
      ru: ["Ответственность экспедитора", "Страхование грузов", "Международные перевозки"],
      kz: ["Экспедитор жауапкершілігі", "Жүк сақтандыру", "Халықаралық тасымал"],
      en: ["Freight forwarder liability", "Cargo cover", "International transportation"],
    },
    image: "/services/cargo.png",
  },
  {
    key: "liability",
    sectionKey: "liability",
    title: {
      ru: "Страхование ответственности",
      kz: "Жауапкершілікті сақтандыру",
      en: "Liability insurance",
    },
    lead: {
      ru: "Покрытие рисков ответственности для бизнеса и специалистов — подбираем под отрасль и контракты.",
      kz: "Бизнес пен мамандарға жауапкершілік тәуекелдерін жабу — салаға және келісімшарттарға сай таңдаймыз.",
      en: "Coverage of liability risks for businesses and professionals — tailored to your industry and contracts.",
    },
    bullets: {
      ru: ["Профессиональная ответственность", "Ответственность предприятий", "Иные виды ответственности"],
      kz: ["Кәсіби жауапкершілік", "Кәсіпорын жауапкершілігі", "Басқа жауапкершілік түрлері"],
      en: ["Professional liability", "Corporate liability", "Other liability types"],
    },
    image: "/services/liability.png",
  },
  {
    key: "life",
    sectionKey: "life",
    title: { ru: "Страхование жизни", kz: "Өмірді сақтандыру", en: "Life insurance" },
    lead: {
      ru: "Накопительные и защитные программы — помогаем подобрать понятную модель без лишней сложности.",
      kz: "Жинақтаушы және қорғаныс бағдарламалары — артық күрделіліксіз түсінікті модель таңдауға көмектесеміз.",
      en: "Savings and protection programs — we help choose a clear model without unnecessary complexity.",
    },
    bullets: {
      ru: ["Страхование жизни", "Накопительное страхование"],
      kz: ["Өмірді сақтандыру", "Жинақтаушы сақтандыру"],
      en: ["Life cover", "Endowment / savings programs"],
    },
    image: "/services/live.png",
  },
  {
    key: "vhi",
    sectionKey: "vhi",
    title: { ru: "Медицинское страхование", kz: "Медициналық сақтандыру", en: "Medical insurance" },
    lead: {
      ru: "ДМС и страхование путешественников — подбираем программу под бюджет и требования.",
      kz: "ДМС және сапарға сақтандыру — бюджет пен талапқа сай бағдарлама таңдаймыз.",
      en: "VHI and travel insurance — we tailor a program to your budget and requirements.",
    },
    bullets: {
      ru: ["ДМС", "Несчастные случаи", "Выезжающие за рубеж"],
      kz: ["ДМС", "Жазатайым оқиға", "Шетелге шығатындар"],
      en: ["VHI", "Accident cover", "Travel insurance"],
    },
    image: "/services/vhi.png",
  },
];

export const PRODUCTS_UI: Record<Lang, ProductsPageUI> = {
  ru: {
    h1: "Все страховые продукты",
    sub: "Выберите раздел и получите краткое описание + подробный блок ниже. Авто оформляется онлайн (Green Card, ОСАГО РФ). Остальное — через брокера под задачу.",
    quick: "Разделы",

    requestTitle: "Нужно подобрать условия?",
    requestText: "Оставьте заявку — уточним задачу и предложим варианты от страховщиков.",
    btnRequest: "Оставить заявку",
    btnToSection: "Открыть раздел",
    btnGreenCard: "Зелёная карта",
    btnOsago: "ОСАГО РФ",

    featured: "Быстрое оформление онлайн",
    onlineNote: "Оформление доступно онлайн на сайте. Если кейс нестандартный — напишите, подберём решение.",
    featuredGreenCardDesc: "Международная ответственность для авто из Казахстана.",
    featuredOsagoDesc: "ОСАГО РФ для поездок и маршрутов.",
  },

  kz: {
    h1: "Барлық сақтандыру өнімдері",
    sub: "Бөлімді таңдаңыз: қысқаша сипаттама + төменде толық блок. Авто онлайн (Green Card, РФ ОСАГО). Қалғаны — брокер арқылы.",
    quick: "Бөлімдер",

    requestTitle: "Шарттарды таңдап береміз бе?",
    requestText: "Өтінім қалдырыңыз — міндетті нақтылап, нұсқалар ұсынамыз.",
    btnRequest: "Өтінім қалдыру",
    btnToSection: "Бөлімді ашу",
    btnGreenCard: "Green Card",
    btnOsago: "РФ ОСАГО",

    featured: "Онлайн рәсімдеу",
    onlineNote: "Онлайн рәсімдеу сайтта қолжетімді. Ерекше жағдай болса — жазыңыз, шешім ұсынамыз.",
    featuredGreenCardDesc: "Қазақстанда тіркелген көліктерге халықаралық жауапкершілік.",
    featuredOsagoDesc: "Сапарлар мен маршруттарға РФ ОСАГО.",
  },

  en: {
    h1: "All insurance products",
    sub: "Pick a section to see a short summary + full block below. Motor is online (Green Card, OSAGO Russia). Others are broker-assisted.",
    quick: "Sections",

    requestTitle: "Need a tailored offer?",
    requestText: "Send a request — we’ll clarify the case and propose options.",
    btnRequest: "Send a request",
    btnToSection: "Open section",
    btnGreenCard: "Green Card",
    btnOsago: "OSAGO Russia",

    featured: "Online purchase",
    onlineNote: "Online purchase is available on the website. For non-standard cases — message us and we’ll propose options.",
    featuredGreenCardDesc: "International third-party liability for vehicles registered in Kazakhstan.",
    featuredOsagoDesc: "OSAGO Russia for trips and routes.",
  },
};
