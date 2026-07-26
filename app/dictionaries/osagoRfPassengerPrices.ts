import type { Lang } from "./header";

export type OsagoRfPassengerPricesDictionary = {
  seo: { title: string; description: string; breadcrumbs: { home: string; osago: string; current: string } };
  hero: { title: string; subtitle: string; cta: string; alt: string; facts: string[] };
  intro: { title: string; paragraphs: string[]; note: string };
  cards: {

    title: string; subtitle: string; individual: string; multidrive: string; electronicPolicy: string; cta: string; rubApprox: string; kztPending: string; rateUsed: string;

    terms: Record<"d15" | "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7" | "m8" | "m9" | "m10" | "m11" | "m12", string>;
    ranges: Record<"hp70_99" | "hp100_119" | "hp120_150" | "hp150plus", string>;
  };
  calculator: { title: string; subtitle: string };
  form: { title: string; subtitle: string };
  table: { title: string; subtitle: string; termHeader: string; pending: string };
};

const ru: OsagoRfPassengerPricesDictionary = {
  seo: {
    title:
      "Страховка в Россию на легковой автомобиль — цены ОСАГО РФ | DIONIS",
    description:
      "Стоимость страховки для въезда в Россию на автомобиле из Казахстана. Цены ОСАГО РФ на сроки от 15 дней до 1 года, расчёт в тенге и онлайн-заявка.",
    breadcrumbs: {
      home: "Главная",
      osago: "Страховка в Россию",
      current: "Цены для легковых автомобилей",
    },
  },

  hero: {
    title:
      "Стоимость страховки в Россию на легковой автомобиль",
    subtitle:
      "Ориентировочные цены на российское ОСАГО для автомобиля из Казахстана. В прайс-листе указана стоимость полиса без ограничения количества водителей. При включении в полис конкретных опытных водителей цена может быть значительно ниже.",
    cta: "Рассчитать стоимость страховки",
    alt:
      "Стоимость страховки для поездки в Россию на автомобиле из Казахстана",
    facts: [
      "Для поездки в Россию",
      "Легковые автомобили",
      "Срок от 15 дней",
      "Оформление онлайн",
    ],
  },

  intro: {
    title: "Как рассчитывается страховка для въезда в Россию",
    paragraphs: [
      "Для поездки в Россию на автомобиле с казахстанскими номерами требуется российский полис обязательного страхования автогражданской ответственности — ОСАГО РФ.",
      "Цены в карточках и таблице рассчитаны для легкового автомобиля физического лица при оформлении страховки без ограничения количества допущенных водителей.",
      "Стоимость зависит от мощности автомобиля, срока страхования и режима допуска водителей. Полис можно оформить на срок от 15 дней до 12 месяцев.",
    ],
    note:
      "При оформлении страховки с ограниченным списком водителей стоимость может быть более чем в два раза ниже. На цену влияют возраст, водительский стаж и страховая история каждого водителя. Указанные суммы являются ориентировочными.",
  },

  cards: {
    title: "Цены на страховку в Россию",
    subtitle:
      "В карточках указана ориентировочная стоимость российского ОСАГО на популярные сроки: 15 дней, 1 месяц и 12 месяцев. Полная таблица ниже содержит цены на все доступные сроки.",
    individual: "Автомобиль физического лица",
    multidrive: "Без ограничения водителей",
    electronicPolicy:
      "Электронный полис ОСАГО РФ направляется после проверки документов и подтверждения оплаты.",
    cta: "Оформить страховку",
    rubApprox: "Ориентировочная цена в рублях",
    kztPending: "Цена в тенге рассчитывается",
    rateUsed: "Используемый курс RUB/KZT",

    terms: {
      d15: "15 дней",
      m1: "1 месяц",
      m2: "2 месяца",
      m3: "3 месяца",
      m4: "4 месяца",
      m5: "5 месяцев",
      m6: "6 месяцев",
      m7: "7 месяцев",
      m8: "8 месяцев",
      m9: "9 месяцев",
      m10: "10 месяцев",
      m11: "11 месяцев",
      m12: "12 месяцев",
    },

    ranges: {
      hp70_99: "От 70 до 99 л. с.",
      hp100_119: "От 100 до 119 л. с.",
      hp120_150: "От 120 до 150 л. с.",
      hp150plus: "Более 150 л. с.",
    },
  },

  calculator: {
    title: "Рассчитайте точную стоимость страховки в Россию",
    subtitle:
      "Укажите мощность автомобиля, срок поездки и данные водителей. Калькулятор рассчитает стоимость российского полиса ОСАГО с учётом выбранных параметров.",
  },

  form: {
    title: "Оформить страховку для поездки в Россию",
    subtitle:
      "Заполните заявку и приложите документы. После проверки данных мы подтвердим стоимость и возможность оформления электронного полиса ОСАГО РФ.",
  },

  table: {
    title: "Полная таблица цен на страховку в Россию",
    subtitle:
      "Ориентировочная стоимость ОСАГО РФ для легковых автомобилей из Казахстана на сроки от 15 дней до 12 месяцев.",
    termHeader: "Срок страхования",
    pending: "Рассчитывается",
  },
};
const kz: OsagoRfPassengerPricesDictionary = {
  seo: {
    title:
      "Жеңіл автокөлікпен Ресейге баруға арналған сақтандыру — РФ ОСАГО бағалары | DIONIS",
    description:
      "Қазақстаннан автокөлікпен Ресейге кіруге арналған сақтандыру құны. РФ ОСАГО полисінің 15 күннен 1 жылға дейінгі бағалары, теңгемен есептеу және онлайн өтінім беру.",
    breadcrumbs: {
      home: "Басты бет",
      osago: "Ресейге баруға арналған сақтандыру",
      current: "Жеңіл автокөліктерге арналған бағалар",
    },
  },

  hero: {
    title:
      "Жеңіл автокөлікпен Ресейге баруға арналған сақтандыру құны",
    subtitle:
      "Қазақстаннан Ресейге баратын автокөлікке арналған ресейлік ОСАГО полисінің болжамды бағалары. Прайс-парақта жүргізушілер саны шектелмеген полистің құны көрсетілген. Полиске тәжірибелі жүргізушілердің нақты тізімі енгізілсе, сақтандыру бағасы едәуір төмен болуы мүмкін.",
    cta: "Сақтандыру құнын есептеу",
    alt:
      "Қазақстаннан автокөлікпен Ресейге баруға арналған сақтандыру құны",
    facts: [
      "Ресейге бару үшін",
      "Жеңіл автокөліктер",
      "15 күннен бастап",
      "Онлайн рәсімдеу",
    ],
  },

  intro: {
    title: "Ресейге кіруге арналған сақтандыру құны қалай есептеледі",
    paragraphs: [
      "Қазақстандық нөмірі бар автокөлікпен Ресейге бару үшін автокөлік иесінің азаматтық-құқықтық жауапкершілігін міндетті сақтандырудың ресейлік полисі — РФ ОСАГО қажет.",
      "Карточкалар мен кестеде көрсетілген бағалар жеке тұлғаға тиесілі жеңіл автокөлікке жүргізушілер саны шектелмейтін сақтандыру рәсімделген жағдайда есептелген.",
      "Сақтандыру құны автокөліктің қозғалтқыш қуатына, сақтандыру мерзіміне және жүргізушілерді полиске енгізу тәртібіне байланысты. Полисті 15 күннен 12 айға дейінгі мерзімге рәсімдеуге болады.",
    ],
    note:
      "Жүргізушілердің шектеулі тізімімен сақтандыру рәсімделсе, оның құны екі еседен де төмен болуы мүмкін. Бағаға әр жүргізушінің жасы, жүргізушілік өтілі және сақтандыру тарихы әсер етеді. Көрсетілген сомалар болжамды болып табылады.",
  },

  cards: {
    title: "Ресейге баруға арналған сақтандыру бағалары",
    subtitle:
      "Карточкаларда ресейлік ОСАГО полисінің кең таралған мерзімдерге арналған болжамды құны көрсетілген: 15 күн, 1 ай және 12 ай. Төмендегі толық кестеде барлық қолжетімді мерзімдердің бағалары берілген.",
    individual: "Жеке тұлғаның автокөлігі",
    multidrive: "Жүргізушілер саны шектелмейді",
    electronicPolicy:
      "РФ ОСАГО электрондық полисі құжаттар тексеріліп, төлем расталғаннан кейін жіберіледі.",
    cta: "Сақтандыруды рәсімдеу",
    rubApprox: "Рубльдегі болжамды баға",
    kztPending: "Теңгедегі баға есептелуде",
    rateUsed: "Қолданылатын RUB/KZT бағамы",

    terms: {
      d15: "15 күн",
      m1: "1 ай",
      m2: "2 ай",
      m3: "3 ай",
      m4: "4 ай",
      m5: "5 ай",
      m6: "6 ай",
      m7: "7 ай",
      m8: "8 ай",
      m9: "9 ай",
      m10: "10 ай",
      m11: "11 ай",
      m12: "12 ай",
    },

    ranges: {
      hp70_99: "70-тен 99 а. к.-ке дейін",
      hp100_119: "100-ден 119 а. к.-ке дейін",
      hp120_150: "120-дан 150 а. к.-ке дейін",
      hp150plus: "150 а. к.-тен жоғары",
    },
  },

  calculator: {
    title: "Ресейге баруға арналған сақтандырудың нақты құнын есептеңіз",
    subtitle:
      "Автокөліктің қуатын, сапар мерзімін және жүргізушілердің деректерін көрсетіңіз. Калькулятор таңдалған параметрлерді ескере отырып, ресейлік ОСАГО полисінің құнын есептейді.",
  },

  form: {
    title: "Ресейге баруға арналған сақтандыруды рәсімдеу",
    subtitle:
      "Өтінімді толтырып, құжаттарды тіркеңіз. Деректерді тексергеннен кейін біз сақтандыру құнын және РФ ОСАГО электрондық полисін рәсімдеу мүмкіндігін растаймыз.",
  },

  table: {
    title: "Ресейге баруға арналған сақтандыру бағаларының толық кестесі",
    subtitle:
      "Қазақстаннан баратын жеңіл автокөліктерге арналған РФ ОСАГО полисінің 15 күннен 12 айға дейінгі болжамды құны.",
    termHeader: "Сақтандыру мерзімі",
    pending: "Есептелуде",
  },
};
const en: OsagoRfPassengerPricesDictionary = {
  seo: {
    title:
      "Car Insurance for Travel to Russia — Russian MTPL Prices | DIONIS",
    description:
      "The cost of insurance for driving from Kazakhstan into Russia. Russian MTPL prices for periods from 15 days to 1 year, calculation in tenge, and an online application.",
    breadcrumbs: {
      home: "Home",
      osago: "Insurance for Travel to Russia",
      current: "Passenger Car Prices",
    },
  },

  hero: {
    title:
      "Cost of Car Insurance for Travel to Russia",
    subtitle:
      "Estimated prices for Russian MTPL insurance for vehicles from Kazakhstan. The price list shows the cost of a policy with no restriction on the number of drivers. The price may be significantly lower when specific experienced drivers are named in the policy.",
    cta: "Calculate the Insurance Cost",
    alt:
      "Cost of insurance for travelling from Kazakhstan to Russia by car",
    facts: [
      "For Travel to Russia",
      "Passenger Cars",
      "Coverage from 15 Days",
      "Online Application",
    ],
  },

  intro: {
    title: "How Insurance for Driving into Russia Is Calculated",
    paragraphs: [
      "To travel to Russia in a vehicle with Kazakhstan registration plates, you must have a Russian compulsory motor third-party liability insurance policy — Russian MTPL.",
      "The prices shown in the cards and table are calculated for a privately owned passenger car with no restriction on the number of authorised drivers.",
      "The cost depends on the vehicle’s engine power, the insurance period, and whether the policy has a restricted or unrestricted list of drivers. Coverage is available for periods from 15 days to 12 months.",
    ],
    note:
      "A policy with a restricted list of named drivers may cost less than half the price of an unrestricted policy. The price is affected by each driver’s age, driving experience, and insurance history. The amounts shown are estimates.",
  },

  cards: {
    title: "Insurance Prices for Travel to Russia",
    subtitle:
      "The cards show the estimated cost of Russian MTPL insurance for the most popular periods: 15 days, 1 month, and 12 months. The full table below contains prices for all available coverage periods.",
    individual: "Privately Owned Vehicle",
    multidrive: "No Driver Restrictions",
    electronicPolicy:
      "The electronic Russian MTPL policy is sent after the documents have been checked and payment has been confirmed.",
    cta: "Apply for Insurance",
    rubApprox: "Estimated Price in Rubles",
    kztPending: "Price in Tenge Is Being Calculated",
    rateUsed: "RUB/KZT Exchange Rate Used",

    terms: {
      d15: "15 Days",
      m1: "1 Month",
      m2: "2 Months",
      m3: "3 Months",
      m4: "4 Months",
      m5: "5 Months",
      m6: "6 Months",
      m7: "7 Months",
      m8: "8 Months",
      m9: "9 Months",
      m10: "10 Months",
      m11: "11 Months",
      m12: "12 Months",
    },

    ranges: {
      hp70_99: "70 to 99 hp",
      hp100_119: "100 to 119 hp",
      hp120_150: "120 to 150 hp",
      hp150plus: "Over 150 hp",
    },
  },

  calculator: {
    title: "Calculate the Exact Cost of Insurance for Travel to Russia",
    subtitle:
      "Enter the vehicle’s engine power, the duration of your trip, and the drivers’ details. The calculator will determine the cost of Russian MTPL insurance based on the selected parameters.",
  },

  form: {
    title: "Apply for Insurance for Travel to Russia",
    subtitle:
      "Complete the application and attach the required documents. After checking the information, we will confirm the price and whether an electronic Russian MTPL policy can be issued.",
  },

  table: {
    title: "Complete Price Table for Insurance for Travel to Russia",
    subtitle:
      "Estimated Russian MTPL insurance prices for passenger cars from Kazakhstan for periods ranging from 15 days to 12 months.",
    termHeader: "Insurance Period",
    pending: "Being Calculated",
  },
};

export function getOsagoRfPassengerPricesDictionary(lang: Lang): OsagoRfPassengerPricesDictionary { return lang === "en" ? en : lang === "kz" ? kz : ru; }
