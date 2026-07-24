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
  seo: { title: "Стоимость ОСАГО России для легкового авто из Казахстана | DIONIS", description: "Стоимость ОСАГО РФ для легковых автомобилей физических лиц. Цены на сроки от 15 дней до 1 года, точный расчёт и онлайн-заявка.", breadcrumbs: { home: "Главная", osago: "ОСАГО РФ", current: "Стоимость для легковых авто" } },
  hero: { title: "Стоимость ОСАГО России для легковых автомобилей", subtitle: "Стоимость ОСАГО для въезда в Россию для легкового автомобиля физического лица без ограничения количества водителей. В калькуляторе можно сделать расчёт по вашим данным и получить точную стоимость.", cta: "Оформить заявку", alt: "Легковой автомобиль для расчёта стоимости ОСАГО России", facts: ["Легковые автомобили", "Физические лица", "Мультидрайв", "Точный расчёт"] },
  intro: { title: "Условия расчёта", paragraphs: ["Карточки рассчитаны для частного владельца легкового автомобиля в режиме мультидрайв, когда к управлению допускается неограниченное количество водителей.", "Стоимость меняется по диапазону мощности автомобиля и сроку страхования: от 15 дней до 12 месяцев."], note: "Если вы опытный водитель со стражем, то вы можете снизить стоимость БОЛЕЕ ЧЕМ В 2 РАЗА используя режим ограничения по водителям! Стоимость является ориентировочной. Окончательная цена подтверждается после проверки данных и документов." },

  cards: { title: "Краткий прайс-лист", subtitle: "В карточках показаны основные сроки: 15 дней, 1 месяц и 12 месяцев. Полная таблица ниже содержит все сроки от 15 дней до 1 года. Цена в тенге рассчитывается по курсу RUB/KZT из НБРК.", individual: "Физическое лицо", multidrive: "Без ограничения водителей", electronicPolicy: "Электронный полис предоставляется после проверки документов.", cta: "Оформить", rubApprox: "Ориентир в RUB", kztPending: "Стоимость в тенге уточняется", rateUsed: "Используемый курс", terms: { d15: "15 дней", m1: "1 месяц", m2: "2 месяца", m3: "3 месяца", m4: "4 месяца", m5: "5 месяцев", m6: "6 месяцев", m7: "7 месяцев", m8: "8 месяцев", m9: "9 месяцев", m10: "10 месяцев", m11: "11 месяцев", m12: "12 месяцев" }, ranges: { hp70_99: "От 70 до 99 л.с.", hp100_119: "От 100 до 119 л.с.", hp120_150: "От 120 до 150 л.с.", hp150plus: "Свыше 150 л.с." } },

  calculator: { title: "Рассчитайте точную стоимость ОСАГО", subtitle: "Стоимость зависит от параметров автомобиля, срока страхования и данных водителей. Укажите сведения, чтобы получить более точный расчёт." },
  form: { title: "Подать заявку на ОСАГО РФ", subtitle: "Заполните форму и приложите документы. После проверки данных мы подтвердим возможность оформления и окончательную стоимость." },
  table: { title: "Таблица цен в тенге", subtitle: "Сводная таблица по всем срокам от 15 дней до 1 года и текущему загруженному курсу RUB/KZT.", termHeader: "Срок покрытия", pending: "Уточняется" },
};
const kz: OsagoRfPassengerPricesDictionary = {
  seo: { title: "Қазақстаннан жеңіл автоға Ресей ОСАҒО құны | DIONIS", description: "Жеке тұлғалардың жеңіл автомобильдері үшін РФ ОСАҒО-ның бағдарлы құны. 15 күннен 1 жылға дейінгі мерзімдер бағалары, дәл есептеу және онлайн өтінім.", breadcrumbs: { home: "Басты бет", osago: "РФ ОСАҒО", current: "Жеңіл авто бағасы" } },
  hero: { title: "Жеңіл автомобильдер үшін Ресей ОСАҒО құны", subtitle: "Жеке тұлғаның жеңіл автомобиліне, жүргізушілер саны шектелмейтін режимге арналған Ресей ОСАҒО-ның бағдарлы құны. Төменде қуат бойынша есепті қарап, калькулятордан нақтырақ құн алуға болады.", cta: "Өтінімге өту", alt: "Ресей ОСАҒО құнын есептеуге арналған жеңіл автомобиль", facts: ["Жеңіл автомобильдер", "Жеке тұлғалар", "Мультидрайв", "Нақты есеп төменде"] },
  intro: { title: "Бағдарлы есептеу шарттары", paragraphs: ["Карточкалар жеке меншік жеңіл автомобильге және жүргізушілер саны шектелмейтін мультидрайв режиміне есептелген.", "Құн автомобиль қуатының диапазонына және сақтандыру мерзіміне байланысты өзгереді: 15 күннен 12 айға дейін."], note: "Құн бағдарлы болып табылады. Соңғы баға деректер мен құжаттар тексерілгеннен кейін расталады." },

  cards: { title: "Қуат бойынша бағдарлы бағалар", subtitle: "Карточкаларда негізгі мерзімдер көрсетілген: 15 күн, 1 ай және 12 ай. Төмендегі толық кестеде 15 күннен 1 жылға дейінгі барлық мерзімдер бар. Теңгедегі баға ҰБ RUB/KZT курсы бойынша есептеледі.", individual: "Жеке тұлға", multidrive: "Жүргізушілерге шектеусіз", electronicPolicy: "Электрондық полис құжаттар тексерілгеннен кейін беріледі.", cta: "Рәсімдеу", rubApprox: "RUB бағдары", kztPending: "Теңгедегі құн нақтылануда", rateUsed: "Қолданылған курс", terms: { d15: "15 күн", m1: "1 ай", m2: "2 ай", m3: "3 ай", m4: "4 ай", m5: "5 ай", m6: "6 ай", m7: "7 ай", m8: "8 ай", m9: "9 ай", m10: "10 ай", m11: "11 ай", m12: "12 ай" }, ranges: { hp70_99: "70-тен 99 а.к. дейін", hp100_119: "100-ден 119 а.к. дейін", hp120_150: "120-дан 150 а.к. дейін", hp150plus: "150 а.к.-тен жоғары" } },

  calculator: { title: "ОСАҒО-ның нақты құнын есептеңіз", subtitle: "Құн автомобиль параметрлеріне, сақтандыру мерзіміне және жүргізушілер деректеріне байланысты. Нақтырақ есеп алу үшін мәліметтерді көрсетіңіз." },
  form: { title: "РФ ОСАҒО-ға өтінім беру", subtitle: "Нысанды толтырып, құжаттарды тіркеңіз. Деректерді тексергеннен кейін рәсімдеу мүмкіндігін және соңғы құнын растаймыз." },
  table: { title: "Теңгедегі бағалар кестесі", subtitle: "15 күннен 1 жылға дейінгі барлық мерзімдер және жүктелген RUB/KZT курсы бойынша жиынтық кесте.", termHeader: "Қамту мерзімі", pending: "Нақтылануда" },
};
const en: OsagoRfPassengerPricesDictionary = {
  seo: { title: "Russia OSAGO price for passenger cars from Kazakhstan | DIONIS", description: "Estimated Russian OSAGO cost for passenger cars owned by individuals. Prices for terms from 15 days to 1 year by engine power, exact calculator and online application.", breadcrumbs: { home: "Home", osago: "OSAGO RF", current: "Passenger car prices" } },
  hero: { title: "Russian OSAGO cost for passenger cars", subtitle: "Estimated Russian OSAGO cost for an individual passenger car with no driver limit. Review prices by engine power below and use the calculator for a more exact quote.", cta: "Go to application", alt: "Passenger car for Russian OSAGO price calculation", facts: ["Passenger cars", "Individuals", "Unlimited drivers", "Exact calculator below"] },
  intro: { title: "Estimated calculation terms", paragraphs: ["The cards are calculated for a privately owned passenger car in multidrive mode, with an unlimited number of permitted drivers.", "The cost varies by engine-power range and policy term: from 15 days to 12 months."], note: "The cost is estimated. The final price is confirmed after checking the data and documents." },

  cards: { title: "Estimated prices by engine power", subtitle: "The cards show key terms: 15 days, 1 month and 12 months. The full table below includes every term from 15 days to 1 year. The KZT price is calculated using the NBK RUB/KZT rate.", individual: "Individual", multidrive: "No driver limit", electronicPolicy: "The electronic policy is provided after document verification.", cta: "Apply", rubApprox: "RUB estimate", kztPending: "KZT cost is being confirmed", rateUsed: "Rate used", terms: { d15: "15 days", m1: "1 month", m2: "2 months", m3: "3 months", m4: "4 months", m5: "5 months", m6: "6 months", m7: "7 months", m8: "8 months", m9: "9 months", m10: "10 months", m11: "11 months", m12: "12 months" }, ranges: { hp70_99: "70 to 99 HP", hp100_119: "100 to 119 HP", hp120_150: "120 to 150 HP", hp150plus: "Over 150 HP" } },

  calculator: { title: "Calculate the exact OSAGO cost", subtitle: "The cost depends on vehicle parameters, policy term and driver details. Enter the data to get a more accurate calculation." },
  form: { title: "Apply for Russian OSAGO", subtitle: "Fill in the form and attach documents. After checking the data, we will confirm whether issuance is possible and the final cost." },
  table: { title: "Price table in KZT", subtitle: "A summary table for every term from 15 days to 1 year using the loaded RUB/KZT rate.", termHeader: "Coverage term", pending: "Pending" },
};

export function getOsagoRfPassengerPricesDictionary(lang: Lang): OsagoRfPassengerPricesDictionary { return lang === "en" ? en : lang === "kz" ? kz : ru; }
