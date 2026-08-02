import type { Lang } from "./header";

export type GreenCardPageDictionary = {
  hero: {
    title: string;
    subtitle: string;
    priceFrom: string;
    ctaOrder: string;
    carAlt: string;
    policyAlt: string;
    logoAlt: string;
  };
  questionBlock: {
    title: string;
    text1: string;
    text2: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    steps: Array<{
      title: string;
      text: string;
    }>;
  };
  coverage: {
    title: string;
    items: Array<{
      title: string;
      text: string;
    }>;
    imageAlt: string;
  };
  writeUs: {
    title: string;
    text: string;
    whatsapp: string;
    telegram: string;
    phone: string;
  };
  priceCards: {
    title: string;
    subtitle: string;
    periodLabel: string;
    periodValue: string;
    priceLabel: string;
    approximate: string;
    loading: string;
    rateError: string;
    note: string;
    button: string;
    cards: {
      passengerEurope: {
        vehicle: string;
        territory: string;
      };
      passengerRegional: {
        vehicle: string;
        territory: string;
      };
      truckEurope: {
        vehicle: string;
        territory: string;
      };
      truckRegional: {
        vehicle: string;
        territory: string;
      };
    };
  };
  calculator: {
    title: string;
    subtitle: string;
    labels: {
      region: string;
      vehicle: string;
      period: string;
      rate: string;
      orderEuropeLabel: string;
      orderEuropeHref: string;
    };
    regionOptions: {
      group1: string;
      group2: string;
    };
    vehicleOptions: Record<
      "passenger" | "bus" | "truck" | "trailer" | "motorcycle" | "tractor",
      string
    >;
    periodOptions: Record<"1" | "3" | "6" | "12", string>;
    ratePlaceholder: string;
    autoRateOk: string;
    autoRateError: string;
    calcButton: string;
    errorInvalidRate: string;
    resultPrefix: string;
    resultApprox: string;
  };
  advantages: {
    title: string;
    items: {
      icon: string;
      title: string;
      text: string;
    }[];
  };
  greenCardCheckUpsell: {
    title: string;
    text1: string;
    text2: string;
    btn: string;
    imageAlt: string;
  };
  osagoUpsell: {
    title: string;
    text1: string;
    text2: string;
    btn: string;
    imageAlt: string;
  };
  faq: {
    title: string;
    intro: string;
    items: {
      id: string;
      question: string;
      answer: string;
    }[];
  };
};

const ru: GreenCardPageDictionary = {
  hero: {
    title: "ЗЕЛЕНАЯ КАРТА В ЕВРОПУ И ТУРЦИЮ",
    subtitle:
      "Green Card - Международная страховка ответственности для автомобилей, зарегистрированных в Казахстане. Обязательна при въезде в страны ЕС, Турцию и другие государства.",
    priceFrom: "Цена: от {price}",
    ctaOrder: "Купить Зеленую карту",
    carAlt: "Автомобиль с полисом Зеленой карты",
    policyAlt: "Полис Зеленой карты",
    logoAlt: "Логотип Dionis Insurance Broker",
  },

  questionBlock: {
    title: "Есть вопросы по Зеленой карте?",
    text1:
      "Напишите нам — и мы подберём оптимальный вариант страхования под ваш маршрут.",
    text2: "Для заказа самой Зеленой карты заполните заявку выше.",
  },
  priceCards: {
    title: "Цена на Зелёную карту",
    subtitle:
      "Ориентировочная стоимость полиса сроком на 1 месяц для автомобилей, зарегистрированных в Казахстане.",
    periodLabel: "Срок страхования",
    periodValue: "1 месяц",
    priceLabel: "Стоимость",
    approximate: "≈",
    loading: "Рассчитываем…",
    rateError: "Не удалось загрузить актуальный курс тенге.",
    note:
      "Стоимость рассчитывается по актуальному курсу НБРК и носит справочный характер. Итоговая цена определяется при оформлении полиса.",
    button: "Оформить полис",
    cards: {
      passengerEurope: {
        vehicle: "Легковой автомобиль",
        territory: "Европа + Турция",
      },
      passengerRegional: {
        vehicle: "Легковой автомобиль",
        territory: "Турция + Молдова + Украина",
      },
      truckEurope: {
        vehicle: "Грузовой автомобиль",
        territory: "Европа + Турция",
      },
      truckRegional: {
        vehicle: "Грузовой автомобиль",
        territory: "Турция + Молдова + Украина",
      },
    },
  },

  calculator: {
    title: "Расчёт стоимости Green Card",
    subtitle: "Онлайн расчет за 20 секунд! Не является публичной офертой.",
    labels: {
      region: "Направление",
      vehicle: "Категория ТС",
      period: "Срок действия",
      rate: "Курс тенге за $",
      orderEuropeLabel: "КУПИТЬ ЗЕЛЕНУЮ КАРТУ В ЕВРОПУ И/ИЛИ ТУРЦИЮ",
      orderEuropeHref: "/ru/green-card#green-card-order",
    },
    regionOptions: {
      group1: "Турция + Молдова + Украина",
      group2: "Европа + Турция (за исключением России и Беларуси)",
    },
    vehicleOptions: {
      passenger: "Легковые и на их базе",
      bus: "Автобусы/микроавтобусы",
      truck: "Грузовые и на их базе",
      trailer: "Прицепы и полуприцепы",
      motorcycle: "Мотоциклы и мотороллеры",
      tractor: "Тракторы, дор.-стр., лесн., с.-х. техника",
    },
    periodOptions: {
      "1": "1 месяц",
      "3": "3 месяца",
      "6": "6 месяцев",
      "12": "12 месяцев",
    },
    ratePlaceholder: "Например, 504.49",
    autoRateOk: "Курс подставлен автоматически из НБРК.",
    autoRateError:
      "Не удалось загрузить курс автоматически — введите курс тенге вручную.",
    calcButton: "Рассчитать",
    errorInvalidRate: "⚠️ Введите корректный курс тенге.",
    resultPrefix: "Стоимость полиса (справочно):",
    resultApprox: "≈",
  },

  howItWorks: {
    title: "Как это работает",
    subtitle: "Простой процесс получения полиса онлайн",
    steps: [
      {
        title: "Оставляете заявку",
        text: "Заполняете короткую форму на сайте или пишете менеджеру.",
      },
      {
        title: "Проверяем данные",
        text: "Уточняем детали и подбираем оптимальный тариф под ваш маршрут.",
      },
      {
        title: "Оплачиваете",
        text: "Оплата картой или по счёту — подходит и для физических, и для юридических лиц.",
      },
      {
        title: "Получаете полис",
        text: "Отправляем готовый документ на e-mail. Обычно — в течение 15 минут после оплаты.",
      },
    ],
  },

  coverage: {
    title: "Зона покрытия и условия",
    items: [
      {
        title: "Территория действия",
        text:
          "Полис действует в странах системы «Зелёная карта»:\n\n" +
          "Австрия, Албания, Андорра, Бельгия, Болгария, Босния и Герцеговина, " +
          "Великобритания, Греция, Дания, Эстония, Ирландия, Исландия, Испания, Италия, " +
          "Кипр, Литва, Латвия, Люксембург, Мальта, Марокко, Молдова, Нидерланды, Германия, " +
          "Норвегия, Северная Македония, Польша, Португалия, Румыния, Сербия, Словакия, " +
          "Словения, Тунис, Турция, Венгрия, Украина, Финляндия, Франция, Хорватия, " +
          "Чешская Республика, Черногория, Швейцария, Швеция.\n\n" +
          "ВАЖНО: «Зелёная карта» выдаётся страховой компанией Азербайджана, " +
          "поэтому на территории Азербайджана она НЕ действует.",
      },
      {
        title: "Типы транспортных средств",
        text: "Легковые автомобили, мотоциклы, грузовой транспорт, прицепы, автобусы.",
      },
      {
        title: "Срок действия",
        text: "Минимальный срок — 1 месяц. Максимальный — 1 год.",
      },
    ],
    imageAlt: "Зона покрытия и условия Green Card",
  },

  advantages: {
    title: "«ДИОНИС» ПРЕДЛАГАЕТ СЛЕДУЮЩИЕ ПРЕИМУЩЕСТВА:",
    items: [
      {
        icon: "⏱",
        title: "Быстрая онлайн-выписка",
        text: "Заявление на изготовление Зеленой карты занимает не более 5 минут — вся процедура проходит онлайн, без визитов в офис.",
      },
      {
        icon: "📜",
        title: "Цифровой сертификат",
        text: "Электронная копия полиса приходит на e-mail сразу после оплаты. При необходимости документ можно распечатать.",
      },
      {
        icon: "📦",
        title: "Гибкие тарифы и пакеты",
        text: "Подбираем тариф под маршрут: короткие поездки, длительные туры, коммерческий транспорт и флот.",
      },
      {
        icon: "➕",
        title: "Прозрачный онлайн-калькулятор",
        text: "Вы видите конечную цену и можете менять параметры в режиме реального времени.",
      },
    ],
  },

  writeUs: {
    title: "Быстрое оформление",
    text: "Напишите нам — оформим полис за 20 минут",
    whatsapp: "Написать нам в WhatsApp",
    telegram: "Написать нам в Telegram",
    phone: "Позвонить нам: +7 (727) 357-30-30",
  },

  greenCardCheckUpsell: {
    title: "Проверить полис «Зелёная карта»",
    text1:
      "Если у вас уже есть оформленный полис, вы можете самостоятельно проверить его на сайте Бюро Зеленая карта.",
    text2:
      "Проверка доступна по номеру полиса или регистрационным данным транспортного средства.",
    btn: "Проверить полис",
    imageAlt: "Проверка полиса Зеленая карта",
  },

  osagoUpsell: {
    title: "Российское ОСАГО (Зеленая карта в РФ)",
    text1:
      "Возможно, вам также потребуется российское ОСАГО для въезда на территорию РФ.",
    text2:
      "Мы поможем оформить полис для нерезидентов, согласуем период действия и подберём оптимальный вариант по тарифу.",
    btn: "Подробнее об ОСАГО РФ",
    imageAlt: "Российское ОСАГО для нерезидентов",
  },

  faq: {
    title: "Часто задаваемые вопросы о «Зелёной карте»",
    intro: "Ответы на ключевые вопросы по международному страхованию ответственности.",
    items: [

      {
        id: "border-acceptance",
        question: "Примут ли полис на границе?",
        answer:
          "При действующем и корректно оформленном полисе его обычно принимают в пределах территории действия, указанной в полисе. Перед поездкой важно проверить данные автомобиля, срок действия и перечень стран покрытия.",
      },

      {
        id: "verification",
        question: "Как проверяют полис на границе и полиция?",
        answer:
          "При проверке сверяют реквизиты полиса, данные автомобиля и срок действия. Порядок проверки может различаться в зависимости от страны и ситуации.",
      },

      {
        id: "error-handling",
        question: "Что будет, если возникнут проблемы с полисом?",
        answer:
          "Если проблема связана с нашей ошибкой или техническим сбоем, мы оперативно переоформим полис или вернём деньги — по вашему выбору. Если ошибка в данных, предоставленных клиентом, решение рассматривается индивидуально.",
      },

      {
        id: "what-is",
        question: "Что такое «Зелёная карта»?",
        answer:
          "Это международный полис страхования ответственности. Он покрывает ущерб, который вы можете причинить другим участникам ДТП за границей, по законам страны происшествия.",
      },

      {
        id: "coverage",
        question: "Что покрывает полис?",
        answer:
          "Полис покрывает вашу ответственность перед третьими лицами: ущерб их автомобилю, имуществу, а также вред жизни и здоровью. Ваш собственный автомобиль не покрывается.",
      },

      {
        id: "not-covered",
        question: "Что не покрывается?",
        answer:
          "Полис не покрывает ваш автомобиль и ваши личные убытки. Также не покрываются случаи умышленных действий и грубых нарушений (например, вождение в состоянии опьянения).",
      },

      {
        id: "limits",
        question: "Какие лимиты выплат?",
        answer:
          "Лимиты устанавливаются законодательством страны, где произошло ДТП, и могут значительно отличаться. Обычно это крупные суммы, покрывающие серьёзный ущерб.",
      },

      {
        id: "who-pays",
        question: "Кто выплачивает при ДТП?",
        answer:
          "Урегулирование происходит по правилам страны, где произошло ДТП, с участием страховщика и национальной системы урегулирования, применимой к такому случаю.",
      },

      {
        id: "territory",
        question: "В каких странах действует «Зелёная карта»?",
        answer:
          "Полис действует в странах системы «Зелёная карта» (большинство стран Европы и ряд других государств). Конкретный список всегда указан в вашем полисе — именно он является окончательным.",
      },

      {
        id: "coverage-zones",
        question: "От чего зависит территория действия?",
        answer:
          "При оформлении выбирается зона покрытия. Если страна не включена в полис, страхование там не действует, даже если вы туда поехали.",
      },

      {
        id: "difference-border",
        question: "Чем отличается от пограничного страхования?",
        answer:
          "Пограничное страхование — это локальный временный полис на въезде. «Зелёная карта» — международный полис, который действует сразу в нескольких странах и оформляется заранее.",
      },

      {
        id: "foreign-plates",
        question: "Можно ли оформить на иностранные номера?",
        answer:
          "Нет, полис оформляется только на автомобили, зарегистрированные в Казахстане.",
      },

      {
        id: "how-to-buy",
        question: "Какие данные нужны для оформления?",
        answer:
          "Для оформления потребуется информация об автомобиле (сертификат регистрации ТС) и владельце (паспортные данные, данные о проживании, контактные данные). Точный список данных запрашивается при оформлении или менеджером.",
      },

      {
        id: "processing-time",
        question: "Сколько времени занимает оформление?",
        answer:
          "Обычно оформление занимает до 15 минут после оплаты. В редких случаях может потребоваться дополнительная проверка.",
      },

      {
        id: "start-date",
        question: "С какого момента действует полис?",
        answer:
          "Полис начинает действовать с даты и времени, указанных при оформлении. Оформление задним числом невозможно.",
      },

      {
        id: "same-day",
        question: "Можно ли оформить «сегодня на сегодня»?",
        answer:
          "Да, это возможно. Однако иногда требуется дополнительная проверка, поэтому рекомендуется оформлять заранее.",
      },

      {
        id: "print",
        question: "Нужно ли распечатывать полис?",
        answer:
          "Да, полис необходимо иметь при себе в распечатанном виде. Достаточно чёрно-белой печати.",
      },

      {
        id: "not-owner",
        question: "Можно ли оформить, если я не собственник автомобиля?",
        answer:
          "Да, оформление возможно при наличии корректных данных автомобиля.",
      },

      {
        id: "accident",
        question: "Что делать при ДТП за границей?",
        answer:
          "Нужно зафиксировать ДТП, при необходимости вызвать полицию и уведомить Бюро той страны, где произошло ДТП (контакты найдете на обратной стороне полиса). Дальнейшее урегулирование происходит по правилам страны происшествия.",
      },

      {
        id: "why-us",
        question: "Почему покупать у вас, а не на границе?",
        answer:
          "На границе полис оформляют в спешке и без проверки данных, что увеличивает риск ошибок. Мы оформляем заранее: проверяем данные, контролируем регистрацию в базе и остаёмся на связи, если возникают вопросы.",
      },

    ],
  },
};

const en: GreenCardPageDictionary = {
  hero: {
    title: "GREEN CARD",
    subtitle:
      "Green Card - International motor third-party liability insurance for vehicles registered in Kazakhstan. Required when entering EU countries, Turkey, and other states.",
    priceFrom: "Price: from {price}",
    ctaOrder: "Order a Green Card",
    carAlt: "Car with Green Card insurance",
    policyAlt: "Green Card policy sample",
    logoAlt: "Dionis Insurance Broker logo",
  },

  questionBlock: {
    title: "Questions about the Green Card?",
    text1:
      "Write to us — we will answer and select the optimal insurance solution for your route.",
    text2: "To order the Green Card itself, please fill out the application form above.",
  },
  priceCards: {
    title: "Green Card prices",
    subtitle:
      "Estimated one-month policy prices for vehicles registered in Kazakhstan.",
    periodLabel: "Policy period",
    periodValue: "1 month",
    priceLabel: "Price",
    approximate: "≈",
    loading: "Calculating…",
    rateError: "The current KZT exchange rate could not be loaded.",
    note:
      "The price is calculated using the current NBK exchange rate and is provided for reference only. The final price is confirmed when the policy is issued.",
    button: "Apply for a policy",
    cards: {
      passengerEurope: {
        vehicle: "Passenger car",
        territory: "Europe + Türkiye",
      },
      passengerRegional: {
        vehicle: "Passenger car",
        territory: "Türkiye + Moldova + Ukraine",
      },
      truckEurope: {
        vehicle: "Truck",
        territory: "Europe + Türkiye",
      },
      truckRegional: {
        vehicle: "Truck",
        territory: "Türkiye + Moldova + Ukraine",
      },
    },
  },

  calculator: {
    title: "Green Card price calculator",
    subtitle: "Online quote in 20 seconds!",
    labels: {
      region: "Destination",
      vehicle: "Vehicle category",
      period: "Policy period",
      rate: "KZT per 1 USD",
      orderEuropeLabel: "BUY A GREEN CARD FOR EUROPE OR/AND TURKY",
      orderEuropeHref: "/en/green-card#green-card-order",
    },
    regionOptions: {
      group1: "Turkey + Moldova + Ukraine",
      group2: "Europe + Turkey (excluding Russia and Belarus)",
    },
    vehicleOptions: {
      passenger: "Passenger cars and derivatives",
      bus: "Buses / minibuses",
      truck: "Trucks and derivatives",
      trailer: "Trailers and semi-trailers",
      motorcycle: "Motorcycles and scooters",
      tractor: "Tractors, road-building, forestry and agro machinery",
    },
    periodOptions: {
      "1": "1 month",
      "3": "3 months",
      "6": "6 months",
      "12": "12 months",
    },
    ratePlaceholder: "For example, 504.49",
    autoRateOk: "The rate has been automatically loaded from NBK.",
    autoRateError:
      "Failed to load the rate automatically — please enter the KZT rate manually.",
    calcButton: "Calculate",
    errorInvalidRate: "⚠️ Please enter a valid KZT rate.",
    resultPrefix: "Policy price:",
    resultApprox: "≈",
  },

  writeUs: {
    title: "Quick application",
    text: "Write to us — we will issue the policy in 20 minutes",
    whatsapp: "Message us on WhatsApp",
    telegram: "Message us on Telegram",
    phone: "Call us: +7 (727) 357-30-30",
  },

  howItWorks: {
    title: "How it works",
    subtitle: "A simple process to obtain your policy online",
    steps: [
      {
        title: "Submit a request",
        text: "Fill in a short form on the website or contact our manager.",
      },
      {
        title: "We verify the details",
        text: "We clarify the details and select the most suitable tariff for your route.",
      },
      {
        title: "Make a payment",
        text: "Payment by card or bank transfer — suitable for both individuals and legal entities.",
      },
      {
        title: "Receive your policy",
        text: "We send the completed document by e-mail, usually within 15 minutes after payment.",
      },
    ],
  },

  coverage: {
    title: "Coverage area and terms",
    items: [
      {
        title: "Territorial coverage",
        text:
          "The policy is valid in the countries of the Green Card system:\n\n" +
          "Austria, Albania, Andorra, Belgium, Bulgaria, Bosnia and Herzegovina, " +
          "United Kingdom, Greece, Denmark, Estonia, Ireland, Iceland, Spain, Italy, " +
          "Cyprus, Lithuania, Latvia, Luxembourg, Malta, Morocco, Moldova, Netherlands, Germany, " +
          "Norway, North Macedonia, Poland, Portugal, Romania, Serbia, Slovakia, " +
          "Slovenia, Tunisia, Türkiye, Hungary, Ukraine, Finland, France, Croatia, " +
          "Czech Republic, Montenegro, Switzerland, Sweden.\n\n" +
          "IMPORTANT: The Green Card policy is issued by an insurance company in Azerbaijan; " +
          "therefore, it is NOT valid within the territory of Azerbaijan.",
      },
      {
        title: "Types of vehicles",
        text: "Passenger cars, motorcycles, trucks, trailers, and buses.",
      },
      {
        title: "Policy validity period",
        text: "Minimum period — 1 month. Maximum period — 1 year.",
      },
    ],
    imageAlt: "Green Card coverage area and terms",
  },

  advantages: {
    title: "DIONIS OFFERS THE FOLLOWING BENEFITS:",
    items: [
      {
        icon: "⏱",
        title: "Fast online issuance",
        text: "Filling the application for a Green Card takes no more than 5 minutes — everything is done online, without visiting the office.",
      },
      {
        icon: "📜",
        title: "Digital certificate",
        text: "An electronic copy of the policy is sent to your e-mail immediately after payment. You can print it if needed.",
      },
      {
        icon: "📦",
        title: "Flexible tariffs and packages",
        text: "We adjust the tariff to your route: short trips, long journeys, commercial transport and fleets.",
      },
      {
        icon: "➕",
        title: "Transparent online calculator",
        text: "You see the final price and can change parameters in real time.",
      },
    ],
  },

  greenCardCheckUpsell: {
    title: "Check your Green Card policy",
    text1:
      "If you already have an issued policy, you can verify it yourself on the Green Card Bureau website.",
    text2:
      "The check is available by policy number or vehicle registration details.",
    btn: "Check policy",
    imageAlt: "Green Card policy verification",
  },

  osagoUpsell: {
    title: "Russian MTPL (Green Card in Russia)",
    text1:
      "You may also need Russian MTPL insurance to enter the territory of the Russian Federation.",
    text2:
      "We help arrange a policy for non-residents, align the coverage period and select the best tariff.",
    btn: "More about Russian MTPL",
    imageAlt: "Russian MTPL insurance for non-residents",
  },

  faq: {
    title: "Frequently Asked Questions about the Green Card",
    intro: "Answers to key questions about international motor third-party liability insurance.",
    items: [

      {
        id: "border-acceptance",
        question: "Will the policy be accepted at the border?",
        answer:
          "A valid and properly issued policy is generally accepted within the territory specified in the policy. Before traveling, it is important to check the vehicle details, validity period, and the list of covered countries.",
      },

      {
        id: "verification",
        question: "How is the policy checked at the border and by the police?",
        answer:
          "During checks, the policy details, vehicle information, and validity period are verified. The procedure may vary depending on the country and the situation.",
      },

      {
        id: "error-handling",
        question: "What happens if there is a problem with the policy?",
        answer:
          "If the issue is caused by our error or a technical problem, we will promptly reissue the policy or refund the payment, at your choice. If the error is in the data provided by the client, the case is reviewed individually.",
      },

      {
        id: "what-is",
        question: "What is the Green Card?",
        answer:
          "It is an international motor third-party liability insurance policy. It covers damage you may cause to third parties in a road traffic accident abroad, in accordance with the laws of the country where the accident occurs.",
      },

      {
        id: "coverage",
        question: "What does the policy cover?",
        answer:
          "The policy covers your liability to third parties: damage to their vehicle, property, as well as injury to life and health. Your own vehicle is not covered.",
      },

      {
        id: "not-covered",
        question: "What is not covered?",
        answer:
          "The policy does not cover your own vehicle or your personal losses. It also excludes intentional acts and serious violations, such as driving under the influence.",
      },

      {
        id: "limits",
        question: "What are the coverage limits?",
        answer:
          "Limits are defined by the legislation of the country where the accident occurs and may vary significantly. They are typically set at levels sufficient to cover major damages.",
      },

      {
        id: "who-pays",
        question: "Who pays in case of an accident?",
        answer:
          "Claims are handled in accordance with the rules of the country where the accident occurs, with the involvement of the insurer and the applicable national claims settlement system.",
      },

      {
        id: "territory",
        question: "In which countries is the Green Card valid?",
        answer:
          "The policy is valid in the countries participating in the Green Card system (most European countries and several others). The exact list is always specified in your policy and is final.",
      },

      {
        id: "coverage-zones",
        question: "What determines the coverage territory?",
        answer:
          "The coverage zone is selected during issuance. If a country is not included in the policy, the insurance is not valid there.",
      },

      {
        id: "difference-border",
        question: "How does it differ from border insurance?",
        answer:
          "Border insurance is a local temporary policy issued upon entry. The Green Card is an international policy that covers multiple countries and is arranged in advance.",
      },

      {
        id: "foreign-plates",
        question: "Can it be issued for foreign license plates?",
        answer:
          "No, the policy can only be issued for vehicles registered in Kazakhstan.",
      },

      {
        id: "how-to-buy",
        question: "What information is required for issuance?",
        answer:
          "You will need vehicle information (registration certificate) and owner details (identification data, residence information, and contact details). The exact list is уточняется during the application process or by a manager.",
      },

      {
        id: "processing-time",
        question: "How long does it take to issue the policy?",
        answer:
          "The process usually takes up to 15 minutes after payment. In rare cases, additional verification may be required.",
      },

      {
        id: "start-date",
        question: "When does the policy start?",
        answer:
          "The policy becomes effective from the date and time specified during issuance. Backdating is not possible.",
      },

      {
        id: "same-day",
        question: "Can it be issued on the same day?",
        answer:
          "Yes, this is possible. However, additional verification may sometimes be required, so issuing in advance is recommended.",
      },

      {
        id: "print",
        question: "Do I need to print the policy?",
        answer:
          "Yes, you should carry a printed copy of the policy. A black and white printout is sufficient.",
      },

      {
        id: "not-owner",
        question: "Can I issue it if I am not the vehicle owner?",
        answer:
          "Yes, it can be issued if the vehicle details are correct.",
      },

      {
        id: "accident",
        question: "What should I do in case of an accident abroad?",
        answer:
          "You should document the accident, call the police if necessary, and notify the bureau of the country where the accident occurred (contact details are on the back of the policy). Further handling follows the rules of that country.",
      },

      {
        id: "why-us",
        question: "Why buy from you instead of at the border?",
        answer:
          "At the border, policies are often issued in a hurry without proper data verification, increasing the risk of errors. We arrange the policy in advance, verify the data, monitor registration, and remain available for support if needed.",
      },

    ],
  },
};

const kz: GreenCardPageDictionary = {
  hero: {
    title: "ЕУРОПА МЕН ТҮРКИЯҒА ЖАСЫЛ КАРТА",
    subtitle:
      "Green Card - Қазақстанда тіркелген автокөліктерге арналған азаматтық-құқықтық жауапкершіліктің халықаралық сақтандыруы. Еуропалық Одақ елдеріне, Түркияға және басқа мемлекеттерге кіру кезінде міндетті.",
    priceFrom: "Бағасы: {price}-ден бастап",
    ctaOrder: "ЖАСЫЛ КАРТА рәсімдеу",
    carAlt: "Green Card полисі бар автомобиль",
    policyAlt: "Green Card полисінің үлгісі",
    logoAlt: "Dionis Insurance Broker логотипі",
  },

  questionBlock: {
    title: "Green Card бойынша сұрақтарыңыз бар ма?",
    text1:
      "Бізге жазыңыз — маршрутыңызға сәйкес ең тиімді сақтандыру нұсқасын ұсынамыз.",
    text2:
      "Жасыл картаның өзіне тапсырыс беру үшін жоғарыдағы өтінімді толтырыңыз.",
  },

  priceCards: {
    title: "Green Card бағасы",
    subtitle:
      "Қазақстанда тіркелген көлік құралдары үшін 1 айлық полистің болжамды құны.",
    periodLabel: "Сақтандыру мерзімі",
    periodValue: "1 ай",
    priceLabel: "Құны",
    approximate: "≈",
    loading: "Есептелуде…",
    rateError: "Теңгенің қолданыстағы бағамын жүктеу мүмкін болмады.",
    note:
      "Құны Ұлттық Банктің қолданыстағы бағамы бойынша есептеледі және анықтамалық сипатта беріледі. Нақты баға полисті рәсімдеу кезінде белгіленеді.",
    button: "Полисті рәсімдеу",
    cards: {
      passengerEurope: {
        vehicle: "Жеңіл автомобиль",
        territory: "Еуропа + Түркия",
      },
      passengerRegional: {
        vehicle: "Жеңіл автомобиль",
        territory: "Түркия + Молдова + Украина",
      },
      truckEurope: {
        vehicle: "Жүк автомобилі",
        territory: "Еуропа + Түркия",
      },
      truckRegional: {
        vehicle: "Жүк автомобилі",
        territory: "Түркия + Молдова + Украина",
      },
    },
  },

  calculator: {
    title: "Green Card құнын есептеу",
    subtitle: "Онлайн есептеу – 20 секундта!",
    labels: {
      region: "Бағыт",
      vehicle: "Көлік құралының санаты",
      period: "Полис мерзімі",
      rate: "1 АҚШ долларына теңге курсы",
      orderEuropeLabel: "ЕУРОПАҒА ЖАСЫЛ КАРТА САТЫП АЛУ",
      orderEuropeHref: "/kz/green-card#green-card-order",
    },
    regionOptions: {
      group1: "Түркия + Молдова + Украина",
      group2: "Еуропа + Түркия (Ресей мен Беларусьтен басқа)",
    },
    vehicleOptions: {
      passenger: "Жеңіл автомобильдер және олардың базасында",
      bus: "Автобустар / шағын автобустар",
      truck: "Жүк автомобильдері және олардың базасында",
      trailer: "Тіркемелер және жартылай тіркемелер",
      motorcycle: "Мотоциклдер және мотороллерлер",
      tractor: "Тракторлар, жол-құрылыс, орман және ауыл шаруашылығы техникасы",
    },
    periodOptions: {
      "1": "1 ай",
      "3": "3 ай",
      "6": "6 ай",
      "12": "12 ай",
    },
    ratePlaceholder: "Мысалы, 504.49",
    autoRateOk: "Курс НБК жүйесінен автоматты түрде жүктелді.",
    autoRateError:
      "Курсты автоматты түрде жүктеу мүмкін болмады — теңге курсын қолмен енгізіңіз.",
    calcButton: "Есептеу",
    errorInvalidRate: "⚠️ Дұрыс теңге курсын енгізіңіз.",
    resultPrefix: "Полис құны:",
    resultApprox: "≈",
  },

  writeUs: {
    title: "Жылдам рәсімдеу",
    text: "Бізге жазыңыз — полисті 20 минут ішінде рәсімдейміз",
    whatsapp: "WhatsApp арқылы жазу",
    telegram: "Telegram арқылы жазу",
    phone: "Бізге қоңырау шалу: +7 (727) 357-30-30",
  },

  howItWorks: {
    title: "Бұл қалай жұмыс істейді",
    subtitle: "Полисті онлайн алудың қарапайым процесі",
    steps: [
      {
        title: "Өтінім қалдырасыз",
        text: "Сайтта қысқа форманы толтырасыз немесе менеджерге жазасыз.",
      },
      {
        title: "Деректерді тексереміз",
        text: "Мәліметтерді нақтылап, маршрутыңызға сәйкес оңтайлы тарифті таңдаймыз.",
      },
      {
        title: "Төлем жасайсыз",
        text: "Картамен немесе шот арқылы төлеу мүмкін — жеке және заңды тұлғалар үшін қолайлы.",
      },
      {
        title: "Полисті аласыз",
        text: "Дайын құжатты e-mail арқылы жібереміз. Әдетте төлемнен кейін 15 минут ішінде.",
      },
    ],
  },

  coverage: {
    title: "Қамту аймағы мен шарттары",
    items: [
      {
        title: "Қолданылу аумағы",
        text:
          "Полис «Жасыл карта» жүйесіне кіретін елдерде қолданылады:\n\n" +
          "Австрия, Албания, Андорра, Бельгия, Болгария, Босния және Герцеговина, " +
          "Ұлыбритания, Греция, Дания, Эстония, Ирландия, Исландия, Испания, Италия, " +
          "Кипр, Литва, Латвия, Люксембург, Мальта, Марокко, Молдова, Нидерланды, Германия, " +
          "Норвегия, Солтүстік Македония, Польша, Португалия, Румыния, Сербия, Словакия, " +
          "Словения, Тунис, Түркия, Венгрия, Украина, Финляндия, Франция, Хорватия, " +
          "Чех Республикасы, Черногория, Швейцария, Швеция.\n\n" +
          "МАҢЫЗДЫ: «Жасыл карта» Әзірбайжанның сақтандыру компаниясы арқылы рәсімделеді, " +
          "сондықтан Әзірбайжан аумағында жарамсыз.",
      },
      {
        title: "Көлік құралдарының түрлері",
        text: "Жеңіл автомобильдер, мотоциклдер, жүк көліктері, тіркемелер, автобустар.",
      },
      {
        title: "Жарамдылық мерзімі",
        text: "Ең аз мерзім — 1 ай. Ең көп мерзім — 1 жыл.",
      },
    ],
    imageAlt: "Green Card қамту аймағы мен шарттары",
  },

  advantages: {
    title: "«DIONIS» МЫНАДАЙ АРТЫҚШЫЛЫҚТАР ҰСЫНАДЫ:",
    items: [
      {
        icon: "⏱",
        title: "Жылдам онлайн рәсімдеу",
        text: "Green Card полисіне өтінім толтыру 5 минуттан аспайды — барлығы онлайн, офиске келудің қажеті жоқ.",
      },
      {
        icon: "📜",
        title: "Цифрлық сертификат",
        text: "Полистің электрондық көшірмесі төлемнен кейін бірден e-mail-ға келеді. Қажет болса, басып шығаруға болады.",
      },
      {
        icon: "📦",
        title: "Икемді тарифтер мен пакеттер",
        text: "Маршрутқа қарай тариф таңдаймыз: қысқа сапарлар, ұзақ саяхаттар, коммерциялық көлік және автопарк.",
      },
      {
        icon: "➕",
        title: "Ашық онлайн-калькулятор",
        text: "Сіз соңғы бағаны бірден көресіз және параметрлерді нақты уақыт режимінде өзгерте аласыз.",
      },
    ],
  },

  greenCardCheckUpsell: {
    title: "Green Card полисін тексеру",
    text1:
      "Егер сізде рәсімделген полис бар болса, оны Жасыл карта Бюросының сайтында өзіңіз тексере аласыз.",
    text2:
      "Тексеру полис нөмірі немесе көлік құралының тіркеу деректері арқылы қолжетімді.",
    btn: "Полисті тексеру",
    imageAlt: "Green Card полисін тексеру",
  },

  osagoUpsell: {
    title: "Ресейлік ОСАГО (РФ-тағы Green Card)",
    text1:
      "РФ аумағына кіру үшін сізге ресейлік ОСАГО полисі де қажет болуы мүмкін.",
    text2:
      "Біз резидент еместер үшін полис рәсімдеуге көмектесеміз, мерзімін келістіріп, тиімді тариф таңдаймыз.",
    btn: "Ресейлік ОСАГО туралы толығырақ",
    imageAlt: "Резидент еместерге арналған ресейлік ОСАГО",
  },

  faq: {
    title: "«Жасыл карта» бойынша жиі қойылатын сұрақтар",
    intro: "Халықаралық жауапкершілікті сақтандыру бойынша негізгі сұрақтарға жауаптар.",
    items: [

      {
        id: "border-acceptance",
        question: "Полис шекарада қабылдана ма?",
        answer:
          "Қолданыстағы және дұрыс рәсімделген полис әдетте полисте көрсетілген әрекет ету аумағында қабылданады. Сапар алдында көлік деректерін, қолданылу мерзімін және қамту елдерінің тізімін тексеру маңызды.",
      },

      {
        id: "verification",
        question: "Полисті шекарада және полиция қалай тексереді?",
        answer:
          "Тексеру кезінде полистің деректері, көлік туралы мәліметтер және қолданылу мерзімі салыстырылады. Тексеру тәртібі елге және жағдайға байланысты өзгеруі мүмкін.",
      },

      {
        id: "error-handling",
        question: "Полиске байланысты мәселе туындаса не болады?",
        answer:
          "Егер мәселе біздің қателігімізден немесе техникалық ақаудан туындаса, біз полисті жедел қайта рәсімдейміз немесе таңдауыңыз бойынша қаражатты қайтарамыз. Клиент берген деректердегі қате болса, мәселе жеке тәртіпте қаралады.",
      },

      {
        id: "what-is",
        question: "«Жасыл карта» деген не?",
        answer:
          "Бұл азаматтық-құқықтық жауапкершілікті халықаралық сақтандыру полисі. Ол шетелде жол-көлік оқиғасы кезінде үшінші тұлғаларға келтірілген зиянды сол елдің заңнамасына сәйкес өтейді.",
      },

      {
        id: "coverage",
        question: "Полис нені қамтиды?",
        answer:
          "Полис үшінші тұлғалар алдындағы жауапкершілікті қамтиды: олардың көлігіне, мүлкіне келтірілген зиянды, сондай-ақ өмірі мен денсаулығына келтірілген залалды. Сіздің жеке көлігіңіз қамтылмайды.",
      },

      {
        id: "not-covered",
        question: "Не қамтылмайды?",
        answer:
          "Полис сіздің көлігіңізді және жеке шығындарыңызды қамтымайды. Сондай-ақ қасақана әрекеттер және өрескел бұзушылықтар (мысалы, мас күйінде көлік жүргізу) қамтылмайды.",
      },

      {
        id: "limits",
        question: "Төлем лимиттері қандай?",
        answer:
          "Лимиттер жол-көлік оқиғасы болған елдің заңнамасымен белгіленеді және айтарлықтай айырмашылық болуы мүмкін. Әдетте олар ірі шығындарды жабуға жеткілікті болады.",
      },

      {
        id: "who-pays",
        question: "ЖКО кезінде төлемді кім жүргізеді?",
        answer:
          "Өтемақы төлеу жол-көлік оқиғасы болған елдің ережелеріне сәйкес, сақтандырушының және сол елдің ұлттық реттеу жүйесінің қатысуымен жүзеге асырылады.",
      },

      {
        id: "territory",
        question: "«Жасыл карта» қай елдерде әрекет етеді?",
        answer:
          "Полис «Жасыл карта» жүйесіне кіретін елдерде әрекет етеді (Еуропаның көп бөлігі және басқа да бірқатар мемлекеттер). Нақты тізім әрқашан полисте көрсетіледі және ол түпкілікті болып табылады.",
      },

      {
        id: "coverage-zones",
        question: "Әрекет ету аумағы неге байланысты?",
        answer:
          "Рәсімдеу кезінде қамту аймағы таңдалады. Егер ел полиске енгізілмесе, ол жерде сақтандыру қолданылмайды.",
      },

      {
        id: "difference-border",
        question: "Шекаралық сақтандырудан айырмашылығы қандай?",
        answer:
          "Шекаралық сақтандыру — бұл кіру кезінде рәсімделетін жергілікті уақытша полис. «Жасыл карта» — бірнеше елде бірден әрекет ететін және алдын ала рәсімделетін халықаралық полис.",
      },

      {
        id: "foreign-plates",
        question: "Шетелдік нөмірлерге рәсімдеуге бола ма?",
        answer:
          "Жоқ, полис тек Қазақстанда тіркелген көліктерге рәсімделеді.",
      },

      {
        id: "how-to-buy",
        question: "Рәсімдеу үшін қандай деректер қажет?",
        answer:
          "Рәсімдеу үшін көлік туралы мәліметтер (көлікті тіркеу куәлігі) және иесі туралы деректер (жеке куәлік деректері, тұрғылықты жері, байланыс мәліметтері) қажет. Нақты тізім рәсімдеу кезінде немесе менеджер арқылы нақтыланады.",
      },

      {
        id: "processing-time",
        question: "Рәсімдеу қанша уақыт алады?",
        answer:
          "Әдетте рәсімдеу төлемнен кейін 15 минутқа дейін созылады. Сирек жағдайларда қосымша тексеру қажет болуы мүмкін.",
      },

      {
        id: "start-date",
        question: "Полис қашан күшіне енеді?",
        answer:
          "Полис рәсімдеу кезінде көрсетілген күн мен уақыттан бастап күшіне енеді. Артқа қарай рәсімдеу мүмкін емес.",
      },

      {
        id: "same-day",
        question: "Бүгінге бүгін рәсімдеуге бола ма?",
        answer:
          "Иә, бұл мүмкін. Алайда кейде қосымша тексеру қажет болуы мүмкін, сондықтан алдын ала рәсімдеу ұсынылады.",
      },

      {
        id: "print",
        question: "Полисті басып шығару қажет пе?",
        answer:
          "Иә, полисті басып шығарылған түрде өзіңізбен бірге алып жүру қажет. Қара-ақ баспа жеткілікті.",
      },

      {
        id: "not-owner",
        question: "Мен көліктің иесі болмасам, рәсімдеуге бола ма?",
        answer:
          "Иә, көлік деректері дұрыс болған жағдайда рәсімдеуге болады.",
      },

      {
        id: "accident",
        question: "Шетелде ЖКО болса не істеу керек?",
        answer:
          "ЖКО фактісін тіркеу, қажет болған жағдайда полиция шақыру және оқиға болған елдің бюросына хабарлау қажет (байланыс деректері полистің артқы бетінде көрсетілген). Кейінгі реттеу сол елдің ережелері бойынша жүргізіледі.",
      },

      {
        id: "why-us",
        question: "Неліктен шекарада емес, сізден сатып алу керек?",
        answer:
          "Шекарада полис көбіне асығыс рәсімделеді және деректер толық тексерілмейді, бұл қателер қаупін арттырады. Біз алдын ала рәсімдейміз: деректерді тексереміз, тіркеуді бақылап, сұрақтар туындаса байланыста боламыз.",
      },

    ],
  },
};

export function getGreenCardPageDictionary(lang: Lang): GreenCardPageDictionary {
  if (lang === "en") return en;
  if (lang === "kz") return kz;
  return ru;
}
