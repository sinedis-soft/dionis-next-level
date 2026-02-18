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

export function getOsagoRfCalculatorDictionary(
  lang: Lang
): OsagoRfCalculatorDictionary {
  // пока только RU
  return ru;
}