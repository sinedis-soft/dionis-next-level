// app/dictionaries/osagoRfCalculator.ts
import type { Lang } from "@/dictionaries/header";
import type { OsagoRfCalculatorDictionary } from "@/components/osago-rf/OsagoRfCalculator";

const ru: OsagoRfCalculatorDictionary = {
  title: "Расчёт стоимости ОСАГО РФ (нерезиденты)",
  subtitle: "Только для авто зарегистрированных в РК",

  labels: {
    policyholderType: "Страхователь",
    legal: "Юридическое лицо",
    individual: "Физическое лицо",

    vehicleKind: "Тип транспортного средства",
    passenger: "Легковое АВТО",
    truck: "Грузовое АВТО",

    hp: "Мощность авто (л.с.)",
    carAge: "Возраст авто (лет)",
    term: "Срок страхования",

    useExp: "Ограничение по водителям (учёт возраста и стажа самого малоопытного).",
    driverAge: "Возраст самого малоопытного водителя (лет)",
    driverExp: "Стаж самого малоопытного водителя (лет)",

    rateRub: "Курс тенге за 1 RUB",
  },

  hints: {
    hp: "Коэффициент мощности выбирается автоматически по диапазонам.",
    carAge:
      "Если авто старше 20 лет, максимальный срок страхования ограничивается 3 месяцами.",
    term:
      "Можно выбрать 15 дней или целое число месяцев. Доступный срок зависит от возраста авто.",
    termLimited: "Применено ограничение: авто старше 20 лет — максимум 3 месяца.",

    useExp:
      "Если включить ограничение по водителям, стоимость рассчитывается по возрасту и стажу самого малоопытного. Управление запрещено для водителей, не включённых в полис.",
    kvsUsed: "КВС по таблице: возраст {age} лет, стаж {exp} лет.",

    // ✅ новые строки для подсказки (KZT) — соответствуют обновлённому компоненту
    cheaperOn: "{mode} дешевле на {diff}.",
    moreExpensiveOn: "{mode} дороже на {diff}.",
    equal: "Подсказка: оба варианта дают одинаковую стоимость.",
    modeMulti: "Мультидрайв",
    modeLimited: "Ограничение по водителям",
  },

  ratePlaceholder: "Например, 5.20",
  autoRateOk: "Курс RUB подставлен автоматически из НБРК.",
  autoRateError:
    "Не удалось загрузить курс RUB автоматически — введите курс вручную.",

  result: {
    title: "Итоговая стоимость:",
    rubLinePrefix: "≈",
    kztLinePrefix: "≈",
    volatilityNote:
      "Стоимость указана справочно. Не является публичной офертой.",
    disclaimer:
      "При заявке полиса для въезда в Российскую Федерацию счёт актуален 1 день.",
  },

  errors: {
    invalidRate: "⚠️ Введите корректный курс RUB.",
  },
};

const en: OsagoRfCalculatorDictionary = {
  title: "MTPL Russia Cost Calculator (Non-Residents)",
  subtitle: "Only for vehicles registered in Kazakhstan",

  labels: {
    policyholderType: "Policyholder",
    legal: "Legal entity",
    individual: "Individual",

    vehicleKind: "Vehicle type",
    passenger: "Passenger car",
    truck: "Truck",

    hp: "Engine power (HP)",
    carAge: "Vehicle age (years)",
    term: "Insurance period",

    useExp: "Driver restriction (age and experience of the least experienced driver).",
    driverAge: "Age of the least experienced driver (years)",
    driverExp: "Driving experience of the least experienced driver (years)",

    rateRub: "KZT per 1 RUB exchange rate",
  },

  hints: {
    hp: "Power coefficient is selected automatically based on power ranges.",
    carAge:
      "If the vehicle is older than 20 years, the maximum insurance period is limited to 3 months.",
    term:
      "You may select 15 days or a whole number of months. Available duration depends on vehicle age.",
    termLimited: "Limitation applied: vehicle older than 20 years — maximum 3 months.",

    useExp:
      "If enabled, premium is calculated based on the age and driving experience of the least experienced driver. Driving by persons not included in the policy is not allowed.",
    kvsUsed: "Age/experience coefficient applied: age {age}, experience {exp}.",

    cheaperOn: "{mode} is cheaper by {diff}.",
    moreExpensiveOn: "{mode} is more expensive by {diff}.",
    equal: "Both options result in the same premium.",
    modeMulti: "Unlimited drivers",
    modeLimited: "Driver restriction",
  },

  ratePlaceholder: "e.g. 5.20",
  autoRateOk: "RUB exchange rate loaded automatically from the National Bank of Kazakhstan.",
  autoRateError:
    "Unable to load RUB exchange rate automatically — please enter manually.",

  result: {
    title: "Total premium:",
    rubLinePrefix: "≈",
    kztLinePrefix: "≈",
    volatilityNote:
      "The amount is indicative and does not constitute a public offer.",
    disclaimer:
      "For entry to the Russian Federation, the invoice remains valid for 1 day.",
  },

  errors: {
    invalidRate: "⚠️ Please enter a valid RUB exchange rate.",
  },
};

const kz: OsagoRfCalculatorDictionary = {
  title: "РФ үшін МІАЖ құнын есептеу (резидент еместер)",
  subtitle: "Тек ҚР-да тіркелген автокөліктер үшін",

  labels: {
    policyholderType: "Сақтанушы",
    legal: "Заңды тұлға",
    individual: "Жеке тұлға",

    vehicleKind: "Көлік түрі",
    passenger: "Жеңіл автокөлік",
    truck: "Жүк автокөлігі",

    hp: "Қозғалтқыш қуаты (а.к.)",
    carAge: "Көліктің жасы (жыл)",
    term: "Сақтандыру мерзімі",

    useExp: "Жүргізушілерге шектеу (ең тәжірибесі аз жүргізушінің жасы мен өтілі).",
    driverAge: "Ең тәжірибесі аз жүргізушінің жасы (жыл)",
    driverExp: "Ең тәжірибесі аз жүргізушінің жүргізушілік өтілі (жыл)",

    rateRub: "1 RUB үшін KZT бағамы",
  },

  hints: {
    hp: "Қуат коэффициенті диапазон бойынша автоматты түрде таңдалады.",
    carAge:
      "Егер көлік 20 жылдан асқан болса, сақтандыру мерзімі ең көбі 3 аймен шектеледі.",
    term:
      "15 күн немесе толық ай санын таңдауға болады. Қолжетімді мерзім көлік жасына байланысты.",
    termLimited:
      "Шектеу қолданылды: 20 жылдан асқан көлік — ең көбі 3 ай.",

    useExp:
      "Қосылған жағдайда сыйақы ең тәжірибесі аз жүргізушінің жасы мен өтілі бойынша есептеледі. Полиске енгізілмеген тұлғаларға көлікті басқаруға болмайды.",
    kvsUsed: "Жас/өтіл коэффициенті: жас {age}, өтіл {exp}.",

    cheaperOn: "{mode} нұсқасы {diff} арзан.",
    moreExpensiveOn: "{mode} нұсқасы {diff} қымбат.",
    equal: "Екі нұсқа бойынша құн бірдей.",
    modeMulti: "Шектеусіз жүргізушілер",
    modeLimited: "Жүргізушілерге шектеу",
  },

  ratePlaceholder: "Мысалы, 5.20",
  autoRateOk: "RUB бағамы ҚР Ұлттық Банкінің деректері бойынша автоматты түрде қойылды.",
  autoRateError:
    "RUB бағамын автоматты түрде жүктеу мүмкін болмады — қолмен енгізіңіз.",

  result: {
    title: "Қорытынды құны:",
    rubLinePrefix: "≈",
    kztLinePrefix: "≈",
    volatilityNote:
      "Құны анықтамалық сипатта. Жария оферта болып табылмайды.",
    disclaimer:
      "РФ аумағына кіру үшін рәсімделген полис бойынша шот 1 күн ішінде жарамды.",
  },

  errors: {
    invalidRate: "⚠️ RUB бағамын дұрыс енгізіңіз.",
  },
};

export function getOsagoRfCalculatorDictionary(
  lang: Lang
): OsagoRfCalculatorDictionary {
  if (lang === "en") return en;
  if (lang === "kz") return kz;
  return ru;
}