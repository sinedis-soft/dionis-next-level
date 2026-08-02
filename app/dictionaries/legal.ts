// dictionaries/legal.ts
import type { Lang } from "@/dictionaries/header";

export type LegalFaqItem = {
  question: string;
  answer: string;
};

export type LegalCard = {
  title: string;
  text?: string;
  paragraphs?: string[];
  items?: string[];
  note?: string;
};

export type LegalBenefit = {
  title: string;
  text: string;
};

export type LegalDictionary = {
  seo: {
    title: string;
    description: string;
    openGraphLocale: string;
  };

  route: {
    slug: string;
    quoteSubject: string;
  };

  schema: {
    serviceName: string;
    countryName: string;
  };

  breadcrumbs: {
    home: string;
    current: string;
  };

  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    promise: string;
    primaryCta: string;
    secondaryCta: string;
    benefitsAriaLabel: string;
    benefitsTitle: string;
    benefits: string[];
  };

  osago: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: {
      vehicles: LegalCard;
      payment: LegalCard;
      accounting: LegalCard;
      calculation: LegalCard;
    };
    note: string;
    stepsTitle: string;
    steps: string[];
    cta: string;
  };

  additional: {
    title: string;
    intro: string;
    greenCard: LegalCard;
    cargo: LegalCard;
    cmr: LegalCard;
    forwarder: LegalCard;
  };

  benefits: {
    title: string;
    items: LegalBenefit[];
  };

  quote: {
    title: string;
    text: string;
    cta: string;
  };

  faq: {
    title: string;
    items: LegalFaqItem[];
  };

  disclaimer: {
    title: string;
    paragraphs: string[];
    companyName: string;
    companyDescription: string;
  };
};

const ru: LegalDictionary = {
  seo: {
    title:
      "Страхование для грузоперевозчиков и юридических лиц в Казахстане | Дионис",
    description:
      "Российское ОСАГО для автомобилей юридических лиц и нерезидентов, оплата в тенге и документы для бухгалтерии. Страхование грузов, CMR и ответственности экспедитора.",
    openGraphLocale: "ru_RU",
  },

  route: {
    slug: "legal",
    quoteSubject: "business-transport-insurance",
  },

  schema: {
    serviceName: "Страхование для юридических лиц и грузоперевозчиков",
    countryName: "Kazakhstan",
  },

  breadcrumbs: {
    home: "Главная",
    current: "Страхование для бизнеса",
  },

  hero: {
    eyebrow: "Страховые решения для транспортного бизнеса",
    title: "Страхование для юридических лиц и грузоперевозчиков",
    lead:
      "Оформляем полисы для транспортных, логистических и экспедиторских компаний Казахстана: для автомобилей, грузов и ответственности на маршрутах по Казахстану, России, СНГ и другим странам.",
    promise:
      "Оплата в тенге. Без передачи наличных водителю. С документами для бухгалтерского учёта.",
    primaryCta: "Рассчитать страховку для компании",
    secondaryCta: "Связаться со страховым брокером",
    benefitsAriaLabel: "Основные преимущества",
    benefitsTitle: "Компания получает",
    benefits: [
      "предварительную проверку маршрута и документов",
      "счёт и безналичную оплату в тенге",
      "электронный полис и согласованный комплект документов",
    ],
  },

  osago: {
    eyebrow: "Основной продукт",
    title: "Российское ОСАГО для автомобилей юридических лиц",
    intro:
      "Перед въездом или началом работы автомобиля в России нужно проверить наличие действующего российского ОСАГО: казахстанский полис обязательного автострахования на территории РФ не действует. По данному виду страхования не взимаем брокерскую комиссию.",
    cards: {
      vehicles: {
        title: "Для каких автомобилей",
        text:
          "Оформляем российское ОСАГО для автомобилей с казахстанскими регистрационными номерами, принадлежащих юридическим лицам и ИП.",
        items: [
          "грузовые автомобили и тягачи",
          "прицепы и полуприцепы",
          "автобусы",
          "легковые служебные автомобили",
          "автомобили транспортных и логистических компаний",
          "транспорт в аренде или лизинге",
        ],
      },
      payment: {
        title: "Оплата непосредственно компанией",
        paragraphs: [
          "Страховку можно оплатить от имени юридического лица в тенге. Не потребуется искать российскую карту, использовать неофициальные обменные схемы, переводить деньги водителю или самостоятельно искать страховщика в России.",
          "Мы организуем оформление и предоставим документы для бухгалтерии.",
        ],
      },
      accounting: {
        title: "Документы для бухгалтерского учёта",
        items: [
          "страховой полис",
          "счёт на оплату",
          "договор или заявление, если предусмотрено процедурой",
          "акт оказанных услуг или иной закрывающий документ",
          "электронные копии документов",
        ],
      },
      calculation: {
        title: "Данные для предварительного расчёта",
        items: [
          "свидетельство о регистрации и БИН компании",
          "адрес и банковские реквизиты",
          "свидетельство о регистрации и сведения о собственнике автомобиля",
          "госномер, марка, модель, год выпуска и мощность",
          "период страхования",
        ],
      },
    },
    note:
      "Состав документов зависит от продукта, страховой компании и схемы оформления. До оплаты мы согласуем перечень с вашей бухгалтерией. Точный набор данных зависит от категории автомобиля и условий страховщика.",
    stepsTitle: "Как оформить российское ОСАГО",
    steps: [
      "Направить документы на автомобиль и данные страхователя.",
      "Получить расчёт стоимости.",
      "Получить счёт в тенге.",
      "Оплатить счёт безналично.",
      "Получить электронный полис и документы.",
    ],
    cta: "Рассчитать ОСАГО для компании",
  },

  additional: {
    title: "Дополнительные решения для транспортного бизнеса",
    intro:
      "Подбираем отдельный полис под автомобиль, груз или ответственность. Один вид страхования не заменяет другой.",
    greenCard: {
      title: "Зелёная карта для международных поездок",
      text:
        "Международный полис гражданской ответственности может потребоваться в странах системы Green Card — с учётом маршрута, регистрации автомобиля и действующих правил въезда.",
      items: [
        "проверим необходимость полиса по маршруту",
        "уточним территорию и срок действия",
        "подготовим документы юридического лица",
        "организуем оплату в тенге",
        "не взимаем брокерскую комиссию по данному виду страхования",
      ],
      note:
        "До оформления отдельно проверяется каждая страна маршрута: один полис может действовать не на всём пути.",
    },
    cargo: {
      title: "Страхование грузов",
      text:
        "Защищает имущественные интересы владельца товара при повреждении, гибели или утрате груза. Возможно страхование одной или нескольких перевозок либо генеральный договор.",
      items: [
        "перевозки по Казахстану, импорт и экспорт",
        "автомобильные, железнодорожные, морские, авиационные и мультимодальные маршруты",
        "оборудование, материалы, продукты, электроника, техника, сырьё, контейнерные и сборные грузы",
      ],
      note:
        "Для расчёта нужны стоимость и характеристики груза, маршрут, перевозчик, транспорт и условия перевозки. Для подбора лучшего страхового решения заключается договор на оказание брокерских услуг с последующей оплатой.",
    },
    cmr: {
      title: "Ответственность перевозчика по CMR",
      text:
        "Полис может защищать перевозчика при требованиях из-за утраты, недостачи или повреждения груза в международной автоперевозке — в пределах Конвенции CMR, договора и применимого права.",
      items: [
        "география и направления",
        "автопарк и виды грузов",
        "оборот и максимальная стоимость груза в машине",
        "субподрядчики и история убытков",
        "лимит ответственности и специальные грузы",
      ],
      note:
        "Ответственность перевозчика и сам груз — разные объекты страхования. CMR не заменяет страхование груза. Для подбора лучшего страхового решения заключается договор на оказание брокерских услуг с последующей оплатой.",
    },
    forwarder: {
      title: "Ответственность экспедитора",
      text:
        "Для компаний, которые организуют перевозки, выбирают перевозчиков, оформляют документы и координируют доставку.",
      items: [
        "утрата или повреждение груза",
        "ошибка при выборе перевозчика или оформлении документов",
        "нарушение инструкции клиента или просрочка",
        "ошибка маршрута или выдача ненадлежащему получателю",
        "действия субподрядчиков и связанные расходы",
      ],
      note:
        "Не все риски входят в каждый полис. Объём покрытия определяется правилами страховщика. Для расчёта нужны оборот, география, виды грузов, договоры и история претензий. Для подбора лучшего страхового решения заключается договор на оказание брокерских услуг с последующей оплатой.",
    },
  },

  benefits: {
    title: "Почему компании обращаются в «Дионис»",
    items: [
      {
        title: "Работа с юрлицами",
        text:
          "Учитываем требования транспортной компании, бухгалтерии и руководителя.",
      },
      {
        title: "Оплата в тенге",
        text: "Без иностранной карты и передачи наличных водителю.",
      },
      {
        title: "Бухгалтерские документы",
        text: "Согласуем состав документов до оплаты.",
      },
      {
        title: "Комплексное страхование",
        text: "Авто, грузы и ответственность через одного брокера.",
      },
      {
        title: "Предварительная проверка",
        text: "Проверяем маршрут, документы и категорию транспорта.",
      },
      {
        title: "Сопровождение",
        text:
          "Объясняем условия и порядок действий при страховом событии.",
      },
    ],
  },

  quote: {
    title: "Получить предложение для компании",
    text:
      "Для первого расчёта достаточно сообщить название и БИН компании, контактное лицо, вид страхования, количество автомобилей, страны перевозок, типы грузов и желаемый период. Мы уточним недостающие данные и подготовим предложение.",
    cta: "Получить расчёт",
  },

  faq: {
    title: "Частые вопросы",
    items: [
      {
        question: "Можно ли оплатить российское ОСАГО в тенге?",
        answer:
          "Да. Казахстанское юридическое лицо может получить счёт и произвести оплату в тенге по согласованной схеме оформления.",
      },
      {
        question: "Нужно ли передавать водителю наличные?",
        answer:
          "Нет. Компания может самостоятельно оплатить страховку безналичным способом. Водителю не потребуется искать страховой офис в России или оплачивать полис собственными деньгами.",
      },
      {
        question: "Получит ли компания документы для бухгалтерии?",
        answer:
          "Да. Перечень документов согласовывается до оплаты и зависит от выбранного страхового продукта и схемы оформления.",
      },
      {
        question: "Можно ли оформить ОСАГО сразу на несколько автомобилей?",
        answer:
          "Да. Для автопарка можно направить единый список транспортных средств. Каждый автомобиль и прицеп при необходимости страхуются отдельным полисом.",
      },
      {
        question: "Российское ОСАГО покрывает перевозимый груз?",
        answer:
          "Нет. ОСАГО покрывает гражданскую ответственность владельца транспортного средства перед третьими лицами. Для защиты груза оформляется отдельный договор страхования груза.",
      },
      {
        question:
          "Чем отличается страхование груза от страхования ответственности перевозчика?",
        answer:
          "Страхование груза защищает имущественные интересы владельца груза. Страхование CMR защищает ответственность перевозчика при предъявлении к нему обоснованных требований.",
      },
      {
        question:
          "Может ли экспедитор оформить полис ответственности без собственных автомобилей?",
        answer:
          "Да. Ответственность экспедитора может страховаться отдельно от ответственности фактического перевозчика.",
      },
    ],
  },

  disclaimer: {
    title: "Важная информация",
    paragraphs: [
      "Условия, территория действия, страховые риски, исключения, лимиты ответственности и перечень документов определяются договором и правилами конкретной страховой компании.",
      "Информация на странице не является страховым полисом, гарантией страхового покрытия или окончательным коммерческим предложением. Для некоторых видов страхования необходимо заключить брокерский договор на оказание услуг с последующей оплатой.",
    ],
    companyName: "ТОО «Страховой брокер Дионис»",
    companyDescription:
      "Страховые решения для перевозчиков, экспедиторов и юридических лиц Казахстана.",
  },
};

const kz: LegalDictionary = {
  seo: {
    title:
      "Қазақстандағы жүк тасымалдаушылар мен заңды тұлғаларға арналған сақтандыру | Дионис",
    description:
      "Заңды тұлғалар мен бейрезиденттердің көлік құралдарына арналған Ресей ОСАГО полисі, теңгемен төлем және бухгалтерияға арналған құжаттар. Жүктерді, CMR жауапкершілігін және экспедитор жауапкершілігін сақтандыру.",
    openGraphLocale: "kk_KZ",
  },

  route: {
    slug: "legal",
    quoteSubject: "business-transport-insurance",
  },

  schema: {
    serviceName: "Заңды тұлғалар мен жүк тасымалдаушыларға арналған сақтандыру",
    countryName: "Kazakhstan",
  },

  breadcrumbs: {
    home: "Басты бет",
    current: "Бизнеске арналған сақтандыру",
  },

  hero: {
    eyebrow: "Көлік бизнесіне арналған сақтандыру шешімдері",
    title: "Заңды тұлғалар мен жүк тасымалдаушыларға арналған сақтандыру",
    lead:
      "Қазақстанның көлік, логистика және экспедиторлық компаниялары үшін автокөліктерді, жүктерді және жауапкершілікті Қазақстан, Ресей, ТМД және басқа елдер бағыттарында сақтандыру полистерін рәсімдейміз.",
    promise:
      "Төлем теңгемен. Жүргізушіге қолма-қол ақша берудің қажеті жоқ. Бухгалтерлік есепке арналған құжаттар ұсынылады.",
    primaryCta: "Компания үшін сақтандыруды есептеу",
    secondaryCta: "Сақтандыру брокерімен байланысу",
    benefitsAriaLabel: "Негізгі артықшылықтар",
    benefitsTitle: "Компания мыналарды алады",
    benefits: [
      "маршрут пен құжаттарды алдын ала тексеру",
      "шот және теңгемен қолма-қол ақшасыз төлем жасау мүмкіндігі",
      "электрондық полис және келісілген құжаттар топтамасы",
    ],
  },

  osago: {
    eyebrow: "Негізгі өнім",
    title: "Заңды тұлғалардың автокөліктеріне арналған Ресей ОСАГО полисі",
    intro:
      "Автокөлік Ресей аумағына кірмес бұрын немесе сол елде жұмысын бастамас бұрын қолданыстағы Ресей ОСАГО полисінің бар-жоғын тексеру қажет: Қазақстанда рәсімделген міндетті автосақтандыру полисі Ресей Федерациясының аумағында қолданылмайды. Сақтандырудың осы түрі бойынша брокерлік комиссия алмаймыз.",
    cards: {
      vehicles: {
        title: "Қандай көлік құралдары үшін",
        text:
          "Қазақстандық мемлекеттік тіркеу нөмірлері бар, заңды тұлғалар мен жеке кәсіпкерлерге тиесілі автокөліктер үшін Ресей ОСАГО полисін рәсімдейміз.",
        items: [
          "жүк автокөліктері мен тартқыштар",
          "тіркемелер мен жартылай тіркемелер",
          "автобустар",
          "қызметтік жеңіл автокөліктер",
          "көлік және логистика компанияларының автокөліктері",
          "жалға немесе лизингке алынған көлік құралдары",
        ],
      },
      payment: {
        title: "Компанияның тікелей төлем жасауы",
        paragraphs: [
          "Сақтандыруды заңды тұлғаның атынан теңгемен төлеуге болады. Ресейлік банк картасын іздеудің, бейресми айырбастау тәсілдерін пайдаланудың, жүргізушіге ақша аударудың немесе Ресейден сақтандыру компаниясын өз бетінше іздеудің қажеті жоқ.",
          "Біз полисті рәсімдеуді ұйымдастырып, бухгалтерияға қажетті құжаттарды ұсынамыз.",
        ],
      },
      accounting: {
        title: "Бухгалтерлік есепке арналған құжаттар",
        items: [
          "сақтандыру полисі",
          "төлем шоты",
          "егер рәсімдеу тәртібінде көзделсе, шарт немесе өтініш",
          "көрсетілген қызметтер актісі немесе басқа жабу құжаты",
          "құжаттардың электрондық көшірмелері",
        ],
      },
      calculation: {
        title: "Алдын ала есептеу үшін қажетті деректер",
        items: [
          "компанияның тіркеу куәлігі және БСН",
          "мекенжайы және банктік деректемелері",
          "көлік құралын тіркеу туралы куәлік және оның меншік иесі туралы мәліметтер",
          "мемлекеттік нөмірі, маркасы, моделі, шығарылған жылы және қозғалтқыш қуаты",
          "сақтандыру мерзімі",
        ],
      },
    },
    note:
      "Құжаттардың құрамы сақтандыру өніміне, сақтандыру компаниясына және рәсімдеу тәртібіне байланысты. Төлем жасалғанға дейін құжаттар тізімін компанияңыздың бухгалтериясымен келісеміз. Қажетті деректердің нақты тізімі көлік құралының санатына және сақтандырушының талаптарына байланысты.",
    stepsTitle: "Ресей ОСАГО полисін қалай рәсімдеуге болады",
    steps: [
      "Көлік құралының құжаттары мен сақтанушының деректерін жіберу.",
      "Сақтандыру құнының есебін алу.",
      "Теңгемен төлеуге арналған шотты алу.",
      "Шотты қолма-қол ақшасыз тәсілмен төлеу.",
      "Электрондық полис пен құжаттарды алу.",
    ],
    cta: "Компания үшін ОСАГО құнын есептеу",
  },

  additional: {
    title: "Көлік бизнесіне арналған қосымша шешімдер",
    intro:
      "Автокөлікке, жүкке немесе жауапкершілікке жеке сақтандыру полисін таңдаймыз. Сақтандырудың бір түрі екіншісін алмастырмайды.",
    greenCard: {
      title: "Халықаралық сапарларға арналған «Жасыл карта»",
      text:
        "Азаматтық жауапкершіліктің халықаралық сақтандыру полисі Green Card жүйесіне кіретін елдерде қажет болуы мүмкін. Бұл бағытқа, автокөліктің тіркелген еліне және қолданыстағы кіру ережелеріне байланысты.",
      items: [
        "маршрут бойынша полистің қажеттілігін тексереміз",
        "қолданылу аумағы мен мерзімін нақтылаймыз",
        "заңды тұлғаның құжаттарын дайындаймыз",
        "төлемді теңгемен ұйымдастырамыз",
        "сақтандырудың осы түрі бойынша брокерлік комиссия алмаймыз",
      ],
      note:
        "Рәсімдеу алдында маршруттағы әрбір ел жеке тексеріледі: бір полис бүкіл бағыт бойынша қолданылмауы мүмкін.",
    },
    cargo: {
      title: "Жүктерді сақтандыру",
      text:
        "Жүк зақымданған, жойылған немесе жоғалған жағдайда тауар иесінің мүліктік мүдделерін қорғайды. Бір немесе бірнеше тасымалды сақтандыруға, сондай-ақ бас сақтандыру шартын жасауға болады.",
      items: [
        "Қазақстан ішіндегі тасымалдар, импорт және экспорт",
        "автомобиль, теміржол, теңіз, әуе және мультимодальды бағыттар",
        "жабдықтар, материалдар, азық-түлік, электроника, техника, шикізат, контейнерлік және құрама жүктер",
      ],
      note:
        "Есептеу үшін жүктің құны мен сипаттамалары, маршрут, тасымалдаушы, көлік құралы және тасымалдау шарттары қажет. Оңтайлы сақтандыру шешімін таңдау үшін кейіннен ақы төленетін брокерлік қызмет көрсету шарты жасалады.",
    },
    cmr: {
      title: "CMR бойынша тасымалдаушының жауапкершілігі",
      text:
        "Полис халықаралық автомобиль тасымалы кезінде жүктің жоғалуына, жетіспеуіне немесе зақымдануына байланысты тасымалдаушыға қойылатын талаптардан қорғай алады. Қорғау CMR конвенциясының, шарттың және қолданылатын заңнаманың шектерінде жүзеге асырылады.",
      items: [
        "тасымалдау географиясы мен бағыттары",
        "автопарк және тасымалданатын жүк түрлері",
        "айналым және бір автокөліктегі жүктің ең жоғары құны",
        "қосалқы мердігерлер және сақтандыру жағдайларының тарихы",
        "жауапкершілік лимиті және арнайы жүктер",
      ],
      note:
        "Тасымалдаушының жауапкершілігі мен жүктің өзі — сақтандырудың әртүрлі объектілері. CMR жүктің сақтандырылуын алмастырмайды. Оңтайлы сақтандыру шешімін таңдау үшін кейіннен ақы төленетін брокерлік қызмет көрсету шарты жасалады.",
    },
    forwarder: {
      title: "Экспедитордың жауапкершілігі",
      text:
        "Тасымалдауды ұйымдастыратын, тасымалдаушыларды таңдайтын, құжаттарды рәсімдейтін және жеткізуді үйлестіретін компанияларға арналған.",
      items: [
        "жүктің жоғалуы немесе зақымдануы",
        "тасымалдаушыны таңдау немесе құжаттарды рәсімдеу кезінде жіберілген қате",
        "клиент нұсқаулығын бұзу немесе жеткізуді кешіктіру",
        "маршрутты қате таңдау немесе жүкті тиісті емес алушыға беру",
        "қосалқы мердігерлердің әрекеттері және соған байланысты шығындар",
      ],
      note:
        "Әрбір полис барлық тәуекелдерді қамтымайды. Сақтандыру көлемі сақтандырушының ережелерімен белгіленеді. Есептеу үшін айналым, география, жүк түрлері, шарттар және шағымдар тарихы қажет. Оңтайлы сақтандыру шешімін таңдау үшін кейіннен ақы төленетін брокерлік қызмет көрсету шарты жасалады.",
    },
  },

  benefits: {
    title: "Компаниялар неліктен «Диониске» жүгінеді",
    items: [
      {
        title: "Заңды тұлғалармен жұмыс",
        text:
          "Көлік компаниясының, бухгалтерияның және басшылықтың талаптарын ескереміз.",
      },
      {
        title: "Теңгемен төлем",
        text:
          "Шетелдік банк картасын пайдаланбай және жүргізушіге қолма-қол ақша бермей төлеу.",
      },
      {
        title: "Бухгалтерлік құжаттар",
        text: "Құжаттардың құрамын төлемге дейін келісеміз.",
      },
      {
        title: "Кешенді сақтандыру",
        text:
          "Автокөліктерді, жүктерді және жауапкершілікті бір брокер арқылы сақтандыру.",
      },
      {
        title: "Алдын ала тексеру",
        text: "Маршрутты, құжаттарды және көлік санатын тексереміз.",
      },
      {
        title: "Сүйемелдеу",
        text:
          "Сақтандыру талаптары мен сақтандыру жағдайы кезіндегі әрекет тәртібін түсіндіреміз.",
      },
    ],
  },

  quote: {
    title: "Компания үшін ұсыныс алу",
    text:
      "Алғашқы есептеу үшін компанияның атауы мен БСН-ын, байланыс тұлғасын, сақтандыру түрін, автокөліктер санын, тасымалдау елдерін, жүк түрлерін және қажетті мерзімді көрсету жеткілікті. Біз жетіспейтін деректерді нақтылап, ұсыныс дайындаймыз.",
    cta: "Есеп алу",
  },

  faq: {
    title: "Жиі қойылатын сұрақтар",
    items: [
      {
        question: "Ресей ОСАГО полисін теңгемен төлеуге бола ма?",
        answer:
          "Иә. Қазақстандық заңды тұлға шот алып, келісілген рәсімдеу тәртібі бойынша төлемді теңгемен жүргізе алады.",
      },
      {
        question: "Жүргізушіге қолма-қол ақша беру қажет пе?",
        answer:
          "Жоқ. Компания сақтандыруды қолма-қол ақшасыз тәсілмен өзі төлей алады. Жүргізушіге Ресейден сақтандыру кеңсесін іздеудің немесе полисті өз қаражаты есебінен төлеудің қажеті болмайды.",
      },
      {
        question: "Компания бухгалтерияға арналған құжаттарды ала ма?",
        answer:
          "Иә. Құжаттар тізімі төлемге дейін келісіледі және таңдалған сақтандыру өнімі мен рәсімдеу тәртібіне байланысты болады.",
      },
      {
        question: "ОСАГО полисін бірнеше автокөлікке бірден рәсімдеуге бола ма?",
        answer:
          "Иә. Автопарк үшін көлік құралдарының бірыңғай тізімін жіберуге болады. Қажет болған жағдайда әрбір автокөлік пен тіркеме жеке полиспен сақтандырылады.",
      },
      {
        question: "Ресей ОСАГО полисі тасымалданатын жүкті өтей ме?",
        answer:
          "Жоқ. ОСАГО көлік құралы иесінің үшінші тұлғалар алдындағы азаматтық жауапкершілігін өтейді. Жүкті қорғау үшін жеке жүк сақтандыру шарты рәсімделеді.",
      },
      {
        question:
          "Жүкті сақтандыру мен тасымалдаушының жауапкершілігін сақтандырудың айырмашылығы неде?",
        answer:
          "Жүкті сақтандыру жүк иесінің мүліктік мүдделерін қорғайды. CMR сақтандыруы тасымалдаушыға негізделген талаптар қойылған жағдайда оның жауапкершілігін қорғайды.",
      },
      {
        question:
          "Экспедитордың жеке автокөлігі болмаса да, жауапкершілік полисін рәсімдей ала ма?",
        answer:
          "Иә. Экспедитордың жауапкершілігі нақты тасымалдаушының жауапкершілігінен бөлек сақтандырылуы мүмкін.",
      },
    ],
  },

  disclaimer: {
    title: "Маңызды ақпарат",
    paragraphs: [
      "Қолданылу талаптары, аумағы, сақтандыру тәуекелдері, ерекшеліктер, жауапкершілік лимиттері және құжаттар тізімі нақты сақтандыру компаниясының шартымен және ережелерімен белгіленеді.",
      "Бұл беттегі ақпарат сақтандыру полисі, сақтандыру өтемінің кепілдігі немесе түпкілікті коммерциялық ұсыныс болып табылмайды. Сақтандырудың кейбір түрлері бойынша кейіннен ақы төленетін брокерлік қызмет көрсету шартын жасау қажет.",
    ],
    companyName: "«Дионис сақтандыру брокері» ЖШС",
    companyDescription:
      "Қазақстанның тасымалдаушыларына, экспедиторларына және заңды тұлғаларына арналған сақтандыру шешімдері.",
  },
};

const en: LegalDictionary = {
  seo: {
    title:
      "Insurance for Freight Carriers and Legal Entities in Kazakhstan | Dionis",
    description:
      "Russian OSAGO insurance for vehicles owned by legal entities and non-residents, payment in tenge, and accounting documents. Cargo, CMR carrier liability, and freight forwarder liability insurance.",
    openGraphLocale: "en_US",
  },

  route: {
    slug: "legal",
    quoteSubject: "business-transport-insurance",
  },

  schema: {
    serviceName: "Insurance for Legal Entities and Freight Carriers",
    countryName: "Kazakhstan",
  },

  breadcrumbs: {
    home: "Home",
    current: "Business Insurance",
  },

  hero: {
    eyebrow: "Insurance Solutions for Transport Businesses",
    title: "Insurance for Legal Entities and Freight Carriers",
    lead:
      "We arrange insurance policies for transport, logistics, and freight forwarding companies in Kazakhstan, covering vehicles, cargo, and liability on routes across Kazakhstan, Russia, the CIS, and other countries.",
    promise:
      "Payment in tenge. No need to give cash to the driver. Accounting documents included.",
    primaryCta: "Calculate Business Insurance",
    secondaryCta: "Contact an Insurance Broker",
    benefitsAriaLabel: "Key benefits",
    benefitsTitle: "Your company receives",
    benefits: [
      "a preliminary review of the route and documents",
      "an invoice and cashless payment in tenge",
      "an electronic policy and an agreed set of documents",
    ],
  },

  osago: {
    eyebrow: "Main Product",
    title: "Russian OSAGO Insurance for Vehicles Owned by Legal Entities",
    intro:
      "Before a vehicle enters or begins operating in Russia, it is necessary to confirm that valid Russian OSAGO insurance is in place. A Kazakhstan compulsory motor insurance policy is not valid in the Russian Federation. We do not charge a brokerage fee for this type of insurance.",
    cards: {
      vehicles: {
        title: "Eligible Vehicles",
        text:
          "We arrange Russian OSAGO insurance for vehicles with Kazakhstan registration plates owned by legal entities and individual entrepreneurs.",
        items: [
          "trucks and tractor units",
          "trailers and semi-trailers",
          "buses",
          "company passenger cars",
          "vehicles owned by transport and logistics companies",
          "leased or rented vehicles",
        ],
      },
      payment: {
        title: "Payment Directly by the Company",
        paragraphs: [
          "The insurance can be paid for in tenge on behalf of the legal entity. There is no need to find a Russian bank card, use unofficial currency exchange arrangements, transfer money to the driver, or search for an insurer in Russia independently.",
          "We organise the insurance process and provide the documents required by your accounting department.",
        ],
      },
      accounting: {
        title: "Accounting Documents",
        items: [
          "insurance policy",
          "invoice",
          "agreement or application, where required by the procedure",
          "certificate of services rendered or another closing document",
          "electronic copies of documents",
        ],
      },
      calculation: {
        title: "Information Required for a Preliminary Calculation",
        items: [
          "company registration certificate and Business Identification Number",
          "address and bank details",
          "vehicle registration certificate and information about the vehicle owner",
          "registration plate, make, model, year of manufacture, and engine power",
          "requested insurance period",
        ],
      },
    },
    note:
      "The required documents depend on the insurance product, insurer, and arrangement procedure. Before payment, we will agree on the document list with your accounting department. The exact information required depends on the vehicle category and the insurer’s terms.",
    stepsTitle: "How to Arrange Russian OSAGO Insurance",
    steps: [
      "Submit the vehicle documents and policyholder details.",
      "Receive the premium calculation.",
      "Receive an invoice in tenge.",
      "Pay the invoice by bank transfer.",
      "Receive the electronic policy and supporting documents.",
    ],
    cta: "Calculate OSAGO for Your Company",
  },

  additional: {
    title: "Additional Solutions for Transport Businesses",
    intro:
      "We arrange separate insurance for the vehicle, cargo, or liability. One type of insurance does not replace another.",
    greenCard: {
      title: "Green Card Insurance for International Travel",
      text:
        "International third-party liability insurance may be required in countries participating in the Green Card system, depending on the route, the vehicle’s country of registration, and the applicable entry rules.",
      items: [
        "we will check whether the policy is required for the planned route",
        "we will confirm the territorial coverage and insurance period",
        "we will prepare the legal entity’s documents",
        "we will organise payment in tenge",
        "we do not charge a brokerage fee for this type of insurance",
      ],
      note:
        "Each country on the route is checked separately before the policy is issued. A single policy may not cover the entire journey.",
    },
    cargo: {
      title: "Cargo Insurance",
      text:
        "Protects the cargo owner’s financial interests if the goods are damaged, destroyed, or lost. Insurance may cover a single shipment, multiple shipments, or be arranged under an open cover agreement.",
      items: [
        "domestic transport within Kazakhstan, imports, and exports",
        "road, rail, sea, air, and multimodal routes",
        "equipment, materials, food products, electronics, machinery, raw materials, containerised cargo, and consolidated shipments",
      ],
      note:
        "The calculation requires the cargo value and characteristics, route, carrier, means of transport, and carriage conditions. A paid brokerage services agreement is concluded to select the most suitable insurance solution.",
    },
    cmr: {
      title: "CMR Carrier Liability Insurance",
      text:
        "The policy may protect the carrier against claims arising from the loss, shortage, or damage of cargo during international road transport, within the limits of the CMR Convention, the insurance contract, and the applicable law.",
      items: [
        "geographical scope and routes",
        "vehicle fleet and types of cargo",
        "turnover and the maximum cargo value carried in one vehicle",
        "subcontractors and claims history",
        "liability limit and special cargo",
      ],
      note:
        "Carrier liability and the cargo itself are separate insurance interests. CMR liability insurance does not replace cargo insurance. A paid brokerage services agreement is concluded to select the most suitable insurance solution.",
    },
    forwarder: {
      title: "Freight Forwarder Liability Insurance",
      text:
        "For companies that organise transportation, select carriers, prepare documents, and coordinate deliveries.",
      items: [
        "loss of or damage to cargo",
        "errors when selecting a carrier or preparing documents",
        "failure to follow the client’s instructions or delays",
        "routing errors or delivery to an unauthorised recipient",
        "actions of subcontractors and related expenses",
      ],
      note:
        "Not every policy covers every risk. The scope of coverage is determined by the insurer’s terms and conditions. The calculation requires information about turnover, geography, cargo types, contracts, and claims history. A paid brokerage services agreement is concluded to select the most suitable insurance solution.",
    },
  },

  benefits: {
    title: "Why Companies Choose Dionis",
    items: [
      {
        title: "Experience with Legal Entities",
        text:
          "We take into account the requirements of the transport company, accounting department, and management.",
      },
      {
        title: "Payment in Tenge",
        text:
          "No foreign bank card or cash payment through the driver is required.",
      },
      {
        title: "Accounting Documents",
        text: "We agree on the required documents before payment.",
      },
      {
        title: "Comprehensive Insurance",
        text:
          "Vehicles, cargo, and liability arranged through a single broker.",
      },
      {
        title: "Preliminary Review",
        text: "We review the route, documents, and vehicle category.",
      },
      {
        title: "Ongoing Support",
        text:
          "We explain the insurance terms and the procedure to follow in the event of a claim.",
      },
    ],
  },

  quote: {
    title: "Request a Business Insurance Proposal",
    text:
      "For an initial calculation, it is sufficient to provide the company name and Business Identification Number, contact person, required type of insurance, number of vehicles, countries of operation, cargo types, and requested insurance period. We will clarify any missing information and prepare a proposal.",
    cta: "Request a Calculation",
  },

  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "Can Russian OSAGO insurance be paid for in tenge?",
        answer:
          "Yes. A Kazakhstan legal entity can receive an invoice and make payment in tenge under the agreed arrangement procedure.",
      },
      {
        question: "Does the driver need to be given cash?",
        answer:
          "No. The company can pay for the insurance directly by bank transfer. The driver will not need to find an insurance office in Russia or pay for the policy using personal funds.",
      },
      {
        question: "Will the company receive accounting documents?",
        answer:
          "Yes. The document list is agreed before payment and depends on the selected insurance product and arrangement procedure.",
      },
      {
        question: "Can OSAGO insurance be arranged for several vehicles at once?",
        answer:
          "Yes. A single list of vehicles may be submitted for the entire fleet. Where required, each vehicle and trailer is insured under a separate policy.",
      },
      {
        question: "Does Russian OSAGO insurance cover the transported cargo?",
        answer:
          "No. OSAGO covers the vehicle owner’s third-party liability. A separate cargo insurance contract is required to protect the cargo.",
      },
      {
        question:
          "What is the difference between cargo insurance and carrier liability insurance?",
        answer:
          "Cargo insurance protects the cargo owner’s financial interests. CMR insurance protects the carrier’s liability when justified claims are made against the carrier.",
      },
      {
        question:
          "Can a freight forwarder obtain liability insurance without owning any vehicles?",
        answer:
          "Yes. Freight forwarder liability may be insured separately from the liability of the actual carrier.",
      },
    ],
  },

  disclaimer: {
    title: "Important Information",
    paragraphs: [
      "The terms, territorial scope, insured risks, exclusions, liability limits, and document requirements are determined by the insurance contract and the rules of the relevant insurance company.",
      "The information on this page does not constitute an insurance policy, a guarantee of insurance coverage, or a final commercial offer. Certain types of insurance require a paid brokerage services agreement.",
    ],
    companyName: "Dionis Insurance Broker LLP",
    companyDescription:
      "Insurance solutions for carriers, freight forwarders, and legal entities in Kazakhstan.",
  },
};

export function getLegalDictionary(lang: Lang): LegalDictionary {
    if (lang === "kz") return kz;
    if (lang === "en") return en;
  return ru;
}