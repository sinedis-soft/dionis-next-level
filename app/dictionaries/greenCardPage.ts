import type { Lang } from "./header";

export type GreenCardPageDictionary = {
  hero: {
    title: string;
    subtitle: string;
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
      "Международная страховка ответственности для автомобилей, зарегистрированных в Казахстане. Обязательна при въезде в страны ЕС, Турцию и другие государства.",
    ctaOrder: "Заказать Зеленую карту",
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

  calculator: {
    title: "Расчёт стоимости Green Card",
    subtitle: "Онлайн расчет за 20 секунд! Не является публичной офертой.",
    labels: {
      region: "Направление",
      vehicle: "Категория ТС",
      period: "Срок действия",
      rate: "Курс тенге за $",
      orderEuropeLabel: "ЗАКАЗАТЬ ЗЕЛЕНУЮ КАРТУ В ЕВРОПУ",
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
    intro:
      "Ответы на ключевые вопросы по международному страхованию ответственности.",
    items: [
      {
        id: "what-is",
        question: "Что такое «Зелёная карта»?",
        answer:
          "Зелёная карта — это международный страховой документ, который обеспечивает страхование ответственности владельца автомобиля за причинение вреда третьим лицам при ДТП за пределами страны регистрации. Документ обязателен при въезде в страны — участницы системы международного автострахования и гарантирует, что пострадавшие получат компенсацию по законам страны происшествия.",
      },
      {
        id: "vs-border",
        question: "Чем «Зелёная карта» отличается от пограничного страхования?",
        answer:
          "Во-первых, это единый международный стандарт, признаваемый в десятках стран. Во-вторых, «Зелёная карта» даёт более широкое и надёжное покрытие: материальный ущерб, вред жизни и здоровью третьих лиц. В-третьих, полис оформляется заранее у брокера, без очередей на границе — это быстрее и удобнее, чем пограничное страхование при въезде.",
      },
      {
        id: "bureaux",
        question: "Кто такие Бюро Зеленой карты?",
        answer:
          "В каждой стране системы «Зелёная карта» действует своё Бюро. Оно гарантирует выплаты пострадавшим на территории своей страны по ДТП, совершённым иностранными транспортными средствами, а затем регрессом взыскивает суммы с Бюро страны, где застрахован виновник. Бюро объединяют страховщиков по автострахованию и работают по единым внутренним правилам.",
      },
      {
        id: "territory",
        question: "В каких странах действует «Зелёная карта»?",
        answer:
          "Полис покрывает большинство стран Европы, а также ряд государств Северной Африки и Ближнего Востока. Конкретный список стран и ограничения указаны на самом бланке и зависят от страны выдачи полиса. Страны, коды которых вычеркнуты, в покрытие не входят.",
      },
      {
        id: "covers",
        question: "Что покрывает «Зелёная карта»?",
        answer:
          "Полис покрывает ущерб жизни и здоровью третьих лиц, а также ущерб их имуществу, причинённый в результате эксплуатации застрахованного транспортного средства за границей, в пределах установленных лимитов ответственности страны пребывания.",
      },
      {
        id: "not-cover",
        question: "Что «Зелёная карта» не покрывает?",
        answer:
          "Страхование не покрывает ущерб собственному автомобилю страхователя, медицинские расходы самого водителя и его пассажиров, умышленные действия, ущерб при участии в соревнованиях и учебных заездах, а также убытки при управлении в состоянии алкогольного или наркотического опьянения.",
      },
      {
        id: "limits",
        question: "Каковы лимиты ответственности по полису?",
        answer:
          "Лимиты устанавливаются законодательством страны, в которую вы въезжаете. Например, в Польше лимит по вреду жизни и здоровью достигает 5 000 000 евро, по имуществу — до 1 000 000 евро. В других странах размеры лимитов отличаются, поэтому перед поездкой рекомендуется проверить действующие суммы для выбранных направлений.",
      },
      {
        id: "why-use",
        question: "Почему стоит оформить «Зелёную карту» заранее?",
        answer:
          "Полис выдаётся полностью онлайн, действителен в странах — участницах системы, не требует переоформления в течение срока действия, подходит для разных категорий транспорта и не требует, чтобы вы были собственником ТС. Урегулирование убытков производится по закону страны ДТП, что даёт понятные правила и защищает ваши интересы.",
      },
    ],
  },
};

const en: GreenCardPageDictionary = {
  hero: {
    title: "GREEN CARD",
    subtitle:
      "International motor third-party liability insurance for vehicles registered in Kazakhstan. Required when entering EU countries, Turkey, and other states.",
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

  calculator: {
    title: "Green Card price calculator",
    subtitle: "Online quote in 20 seconds!",
    labels: {
      region: "Destination",
      vehicle: "Vehicle category",
      period: "Policy period",
      rate: "KZT per 1 USD",
      orderEuropeLabel: "ORDER A GREEN CARD FOR EUROPE",
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
    title: "Frequently Asked Questions About the Green Card",
    intro:
      "Answers to key questions about international motor third-party liability insurance.",
    items: [
      {
        id: "what-is",
        question: "What is a Green Card?",
        answer:
          "A Green Card is an international insurance document that provides third-party liability coverage for vehicle owners when they cause damage to others in a road accident outside the country of registration. It is mandatory when entering countries participating in the international motor insurance system and guarantees that victims receive compensation according to the laws of the country where the accident occurred.",
      },
      {
        id: "vs-border",
        question: "How is a Green Card different from border insurance?",
        answer:
          "First, it is a unified international standard recognized in dozens of countries. Second, the Green Card provides broader and more reliable coverage: property damage, bodily injury, and death of third parties. Third, the policy is issued in advance by a broker, avoiding queues at the border—faster and more convenient than purchasing border insurance upon entry.",
      },
      {
        id: "bureaux",
        question: "What are Green Card Bureaux?",
        answer:
          "Each country in the Green Card system has its own National Bureau. It guarantees payments to victims of accidents caused by foreign vehicles on its territory and later recovers these amounts from the Bureau of the country where the liable driver was insured. The Bureaux unite motor insurers and operate under harmonized internal regulations.",
      },
      {
        id: "territory",
        question: "In which countries is the Green Card valid?",
        answer:
          "The policy covers most European countries, as well as several states in North Africa and the Middle East. The exact list of countries and exclusions is printed on the policy form and depends on the issuing country. Countries whose codes are crossed out are not included in the coverage.",
      },
      {
        id: "covers",
        question: "What does the Green Card cover?",
        answer:
          "The policy covers bodily injury and death of third parties, as well as damage to their property caused during the operation of the insured vehicle abroad, within the liability limits of the destination country.",
      },
      {
        id: "not-cover",
        question: "What does the Green Card not cover?",
        answer:
          "It does not cover damage to the policyholder’s own vehicle, medical expenses of the driver or passengers, intentional acts, damage during competitions or training runs, nor losses incurred while driving under the influence of alcohol or drugs.",
      },
      {
        id: "limits",
        question: "What are the liability limits under the policy?",
        answer:
          "The limits are defined by the legislation of the country you enter. For example, in Poland, the limit for bodily injury reaches EUR 5,000,000, while the property damage limit is up to EUR 1,000,000. Other countries have different limits, so it is recommended to check the current amounts before your trip.",
      },
      {
        id: "why-use",
        question: "Why should I obtain a Green Card in advance?",
        answer:
          "The policy is issued fully online, valid across all participating countries, does not require re-issuance during its validity period, suits various vehicle categories, and does not require you to be the vehicle owner. Claims are settled under the laws of the country where the accident occurs, providing clear rules and protecting your interests.",
      },
    ],
  },
};

const kz: GreenCardPageDictionary = {
  hero: {
    title: "ЕУРОПА МЕН ТҮРКИЯҒА ЖАСЫЛ КАРТА",
    subtitle:
      "Қазақстанда тіркелген автокөліктерге арналған азаматтық-құқықтық жауапкершіліктің халықаралық сақтандыруы. Еуропалық Одақ елдеріне, Түркияға және басқа мемлекеттерге кіру кезінде міндетті.",
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

  calculator: {
    title: "Green Card құнын есептеу",
    subtitle: "Онлайн есептеу – 20 секундта!",
    labels: {
      region: "Бағыт",
      vehicle: "Көлік құралының санаты",
      period: "Полис мерзімі",
      rate: "1 АҚШ долларына теңге курсы",
      orderEuropeLabel: "ЕУРОПАҒА ЖАСЫЛ КАРТА ТАПСЫРЫС БЕРУ",
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
    title: "«Жасыл карта» туралы жиі қойылатын сұрақтар",
    intro:
      "Халықаралық азаматтық жауапкершілікті сақтандыру жөніндегі негізгі сұрақтарға жауаптар.",
    items: [
      {
        id: "what-is",
        question: "«Жасыл карта» деген не?",
        answer:
          "«Жасыл карта» — бұл көлік иесінің өз елінен тыс жерде жол-көлік оқиғасы кезінде үшінші тұлғаларға келтірген залалы үшін жауапкершілігін сақтандыратын халықаралық сақтандыру құжаты. Құжат халықаралық автомобиль сақтандыру жүйесіне қатысушы елдерге кірген кезде міндетті болып табылады және зардап шеккендерге оқиға болған елдің заңнамасы бойынша өтемақы төленуін қамтамасыз етеді.",
      },
      {
        id: "vs-border",
        question: "«Жасыл карта» шекаралық сақтандырудан несімен ерекшеленеді?",
        answer:
          "Біріншіден, бұл ондаған елдер мойындаған бірыңғай халықаралық стандарт. Екіншіден, «Жасыл карта» кең әрі сенімді қамту ұсынады: мүліктік зиян, үшінші тұлғалардың өмірі мен денсаулығына келтірілген зиян. Үшіншіден, полис брокер арқылы алдын ала рәсімделеді, шекарада кезек күтуді қажет етпейді — бұл шекаралық сақтандыруды оқиға орнында рәсімдеуге қарағанда жылдам әрі ыңғайлы.",
      },
      {
        id: "bureaux",
        question: "Жасыл карталар бюролары деген кімдер?",
        answer:
          "«Жасыл карта» жүйесіне кіретін әр елде өзінің ұлттық Бюросы жұмыс істейді. Ол шетелдік көлік құралдарының қатысуымен болған ЖКО салдарынан өз еліндегі зардап шеккендерге өтемақы төлеуге кепілдік береді, кейін бұл соманы кінәлі жүргізуші сақтандырылған елдің Бюросынан регресс тәртібімен өндіріп алады. Бюролар автокөлік сақтандырушыларын біріктіреді және бірыңғай ішкі ережелер бойынша жұмыс істейді.",
      },
      {
        id: "territory",
        question: "«Жасыл карта» қай елдерде жарамды?",
        answer:
          "Полис Еуропаның көптеген елдерін, сондай-ақ Солтүстік Африка мен Таяу Шығыстың бірқатар мемлекеттерін қамтиды. Елдердің нақты тізімі мен шектеулер полис бланкісінде көрсетіледі және полис берілген елге байланысты. Коды сызылған елдер қамту аймағына кірмейді.",
      },
      {
        id: "covers",
        question: "«Жасыл карта» нені сақтандырады?",
        answer:
          "Полис үшінші тұлғалардың өмірі мен денсаулығына келтірілген зиянды, сондай-ақ шетелде сақтандырылған көлік құралын пайдалану нәтижесінде олардың мүлкіне келтірілген зиянды, бару елі белгілеген жауапкершілік лимиттері шегінде өтейді.",
      },
      {
        id: "not-cover",
        question: "«Жасыл карта» нені сақтандырмайды?",
        answer:
          "Сақтандыру сақтанушының өз көлігіне келтірілген зиянды, жүргізушінің және жолаушылардың медициналық шығындарын, қасақана жасалған әрекеттерді, жарыстар мен оқу-жаттығу заездтері кезіндегі зиянды, сондай-ақ алкогольдік немесе есірткілік мас күйінде басқару кезіндегі шығындарды өтемейді.",
      },
      {
        id: "limits",
        question: "Полис бойынша жауапкершілік лимиттері қандай?",
        answer:
          "Лимиттер сіз кіретін елдің заңнамасымен белгіленеді. Мысалы, Польшада өмірі мен денсаулығына келтірілген зиян бойынша лимит 5 000 000 еуроға дейін, мүлікке келтірілген зиян бойынша — 1 000 000 еуроға дейін жетеді. Басқа елдерде лимиттер әртүрлі, сондықтан сапар алдында қажетті бағыттар бойынша қолданыстағы сомаларды тексеру ұсынылады.",
      },
      {
        id: "why-use",
        question: "Неліктен «Жасыл картаны» алдын ала рәсімдеген дұрыс?",
        answer:
          "Полис толық онлайн рәсімделеді, жүйеге қатысушы елдерде жарамды, қолданылу кезеңінде қайта рәсімдеуді қажет етпейді, көліктің түрлі санаттарына жарамды және көлік сіздің атыңызда болуын талап етпейді. Залалды реттеу жол-көлік оқиғасы орын алған елдің заңнамасына сәйкес жүргізіледі, бұл айқын ережелерді және құқықтарыңыздың қорғалуын қамтамасыз етеді.",
      },
    ],
  },
};

export function getGreenCardPageDictionary(lang: Lang): GreenCardPageDictionary {
  if (lang === "en") return en;
  if (lang === "kz") return kz;
  return ru;
}