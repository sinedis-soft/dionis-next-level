import type { Lang } from "./header";

export type OsagoRfPageDictionary = {
  hero: {
    title: string;
    subtitle: string;
    ctaOrder: string;
    factsLabel: string;
    facts: string[];
    carAlt: string;
    policyAlt: string;
    logoAlt: string;
  };

  passengerPricesLink: {
    title: string;
    text: string;
    cta: string;
  };

  questionBlock: {
    title: string;
    text1: string;
    text2: string;
  };

  advantages: {
    title: string;
    items: {
      title: string;
      text: string;
    }[];
  };

  howItWorks: {
    title: string;
    subtitle: string;
    steps: {
      title: string;
      text: string;
    }[];
  };

  writeUs: {
    title: string;
    text: string;
    whatsapp: string;
    telegram: string;
    phone: string;
  };

  info: {
    title: string;
    paragraphs: string[];
  };

  benefits: {
    title: string;
    imageAlt: string;
    items: {
      title: string;
      text: string;
    }[];
  };

  osagoCheckUpsell: {
    title: string;
    text1: string;
    text2: string;
    btn: string;
    imageAlt: string;
  };

  greenCardUpsell: {
    title: string;
    text1: string;
    text2: string;
    btn: string;
    imageAlt: string;
  };

  orderPrep: {
    title: string;
    text: string;
    items: string[];
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
  commercialTransport: {
    title: string;
    intro: string;
    vehicleTypesTitle: string;
    vehicleTypes: {
      title: string;
      text: string;
    }[];
    fleetTitle: string;
    fleetText: string;
    fleetItems: string[];
    cta: string;
  };
  seo: {
    title: string;
    description: string;
    serviceName: string;
    serviceType: string;
    audienceName: string;
    breadcrumbs: {
      home: string;
      services: string;
      current: string;
    };
    channels: {
      website: string;
      phone: string;
      whatsapp: string;
      telegram: string;
    };
  };
};

const ru: OsagoRfPageDictionary = {
  hero: {
    title: "Страховка в Россию на автомобиль из Казахстана",
    subtitle:
      "Электронный полис ОСАГО РФ для въезда и поездок по России на автомобиле с казахстанскими номерами. Проверим документы, рассчитаем стоимость и отправим готовую страховку в PDF.",
    ctaOrder: "Рассчитать стоимость страховки",
    factsLabel: "Основные условия",
    facts: [
      "Для легковых и грузовых автомобилей",
      "Для физических и юридических лиц",
      "Срок страхования от 15 дней",
      "Электронный полис ОСАГО в PDF",
    ],
    carAlt:
      "Автомобиль с казахстанскими номерами для поездки в Россию",
    policyAlt:
      "Электронная страховка ОСАГО РФ для автомобиля из Казахстана",
    logoAlt: "Страховой брокер DIONIS",
  },

  passengerPricesLink: {
    title: "Цены на страховку в Россию для легковых автомобилей",
    text:
      "Посмотрите ориентировочную стоимость ОСАГО РФ для легковых автомобилей физических лиц. Цены указаны по срокам страхования и мощности автомобиля для полиса без ограничения количества водителей.",
    cta: "Посмотреть цены",
  },

  questionBlock: {
    title: "Остались вопросы о страховке для поездки в Россию?",
    text1:
      "Уточним доступный срок страхования, порядок расчёта стоимости, необходимые документы и возможность оформления ОСАГО РФ для вашего автомобиля.",
    text2:
      "Отправьте вопрос — менеджер проверит данные автомобиля и поможет оформить страховку для въезда в Россию.",
  },

  advantages: {
    title: "Почему обращаются в DIONIS",
    items: [
      {
        title: "Оформление дистанционно",
        text:
          "Заявку и документы можно передать онлайн без посещения офиса. Готовый полис направляется в электронном виде.",
      },
      {
        title: "Проверка до оплаты",
        text:
          "Сначала проверяем документы, данные автомобиля, водителей и доступный срок, затем подтверждаем стоимость и порядок оплаты.",
      },
      {
        title: "Разные категории транспорта",
        text:
          "Принимаем заявки на легковые и грузовые автомобили, а также проверяем возможность оформления для автобусов и коммерческого транспорта.",
      },
      {
        title: "Физические и юридические лица",
        text:
          "Помогаем подготовить данные для автомобилей, принадлежащих частным владельцам и организациям.",
      },
    ],
  },

  howItWorks: {
    title: "Как оформить электронное ОСАГО России",
    subtitle: "Порядок расчёта и получения полиса",
    steps: [
      {
        title: "Заполняете заявку",
        text:
          "Указываете данные страхователя, автомобиля, водителей, дату начала и предполагаемый срок поездки по России.",
      },
      {
        title: "Передаёте документы",
        text:
          "Направляете регистрационный документ автомобиля, документ страхователя и водительские удостоверения допущенных водителей.",
      },
      {
        title: "Получаете расчёт",
        text:
          "Мы проверяем данные, подтверждаем доступный срок и окончательную стоимость. Перед оплатой вы проверяете сведения для полиса.",
      },
      {
        title: "Получаете и проверяете полис",
        text:
          "После оплаты отправляем электронный полис в PDF. Проверьте регистрационный номер, VIN, водителей и срок действия в документе и НСИС.",
      },
    ],
  },

  writeUs: {
    title: "Поможем рассчитать и оформить ОСАГО",
    text:
      "Напишите нам, если нужно проверить документы, срок страхования или возможность оформления для конкретного автомобиля",
    whatsapp: "Написать в WhatsApp",
    telegram: "Написать в Telegram",
    phone: "Позвонить: +7 (727) 357-30-30",
  },

  info: {
    title: "Какая страховка нужна для въезда в Россию из Казахстана",
    paragraphs: [
      "Для движения по территории России автомобилю с казахстанскими регистрационными номерами требуется страхование гражданской ответственности, действующее в Российской Федерации. Если у автомобиля нет другого признанного в России покрытия, необходимо оформить российский полис ОСАГО.",
      "ОСАГО возмещает вред, причинённый другим людям, автомобилям и имуществу при ДТП, в пределах установленных условий и лимитов. Полис не компенсирует повреждение, угон, поломку или износ собственного автомобиля.",
      "Электронный полис имеет юридическую силу и действует в течение указанного в нём периода. Даты страхования должны покрывать весь срок использования автомобиля в России.",
      "Российское ОСАГО и Green Card — разные страховые продукты. Для поездки через несколько стран страховое покрытие необходимо проверять отдельно для каждой территории.",
    ],
  },

  benefits: {
    title: "Стоимость, срок и условия ОСАГО РФ",
    imageAlt:
      "Территория действия ОСАГО России для автомобиля с казахстанскими номерами",
    items: [
      {
        title: "Цена рассчитывается индивидуально",
        text:
          "Стоимость зависит от категории и мощности автомобиля, типа страхователя, срока страхования, количества водителей, их возраста и стажа, а также применяемых тарифных коэффициентов.",
      },
      {
        title: "Возможен срок от 15 дней",
        text:
          "Для временного использования иностранного автомобиля может быть доступно оформление на ограниченный срок. Точный период подтверждается после проверки данных и действующих правил.",
      },
      {
        title: "Легковые и грузовые автомобили",
        text:
          "При расчёте учитываются категория транспортного средства, мощность двигателя, разрешённая масса и характер использования автомобиля.",
      },
      {
        title: "Оформление на юридическое лицо",
        text:
          "Для автомобиля организации дополнительно потребуются реквизиты юридического лица и сведения о представителе. Окончательный перечень подтверждается при проверке заявки.",
      },
    ],
  },

  osagoCheckUpsell: {
    title: "Как проверить электронный полис ОСАГО",
    text1:
      "После получения полиса проверьте его регистрацию в Российской Национальной Страховой Информационной Системе.",
    text2:
      "Сверьте регистрационный номер, VIN, страхователя, список водителей и срок действия. При обнаружении ошибки сообщите об этом до начала поездки.",
    btn: "Проверить полис в НСИС",
    imageAlt: "Проверка электронного полиса ОСАГО России в НСИС",
  },

  greenCardUpsell: {
    title: "ОСАГО России и Green Card — не одно и то же",
    text1:
      "Российское ОСАГО предназначено для эксплуатации автомобиля на территории Российской Федерации. Green Card действует только в странах и территориях, указанных в соответствующем международном полисе.",
    text2:
      "Если маршрут проходит через несколько государств, сообщите нам полный маршрут. Мы проверим, какое страхование требуется для каждой части поездки.",
    btn: "Проверить страховку по маршруту",
    imageAlt:
      "Сравнение ОСАГО России и международной страховки Green Card",
  },

  orderPrep: {
    title: "Какие данные нужны для оформления ОСАГО",
    text:
      "Подготовьте читаемые документы и проверьте правильность данных. Для юридического лица дополнительно потребуются сведения об организации и её представителе.",
    items: [
      "Свидетельство о регистрации или технический паспорт автомобиля",
      "Паспорт или удостоверение личности страхователя",
      "Водительские удостоверения всех допущенных водителей",
      "Регистрационный номер, VIN, марка, модель и год выпуска",
      "Мощность двигателя и категория транспортного средства",
      "Дата начала и предполагаемый срок страхования",
      "Для организации — наименование, регистрационные данные и сведения о представителе",
      "Контактный телефон и e-mail для связи и получения полиса",
    ],
  },

  faq: {
    title: "Вопросы об ОСАГО для автомобиля из Казахстана",
    intro:
      "Ответы о стоимости, сроках, документах и оформлении электронной страховки для поездки в Россию.",
    items: [
      {
        id: "mandatory",
        question:
          "Какая страховка нужна для въезда в Россию из Казахстана?",
        answer:
          "Для эксплуатации автомобиля с казахстанскими регистрационными номерами на территории России необходимо действующее страхование гражданской ответственности, признаваемое в Российской Федерации. В стандартной ситуации оформляется российский полис ОСАГО. Он покрывает ответственность водителя за вред, причинённый другим людям, автомобилям или имуществу при ДТП, но не страхует собственный автомобиль от повреждения, угона или поломки.",
      },
      {
        id: "kazakhstan-plates",
        question:
          "Нужно ли ОСАГО на автомобиль с казахстанскими номерами?",
        answer:
          "Да, если автомобиль используется в России и не имеет другого страхового покрытия, признаваемого на территории РФ. Полис должен действовать в течение всего периода эксплуатации автомобиля в России.",
      },
      {
        id: "green-card",
        question: "Нужна ли Green Card для поездки в Россию?",
        answer:
          "Для поездки на автомобиле из Казахстана необходимо страхование гражданской ответственности, действующее именно на территории России. Green Card не следует считать заменой российского ОСАГО: Россия с 2023 года не участвует в системе «Зелёная карта». Для въезда и поездок по России обычно оформляется российский полис ОСАГО.",
      },
      {
        id: "remote-application",
        question:
          "Можно ли оформить ОСАГО РФ, находясь в Казахстане?",
        answer:
          "Да. Заявку, документы и данные водителей можно передать дистанционно. После проверки сведений, расчёта стоимости и оплаты электронный полис направляется на указанный e-mail в формате PDF.",
      },
      {
        id: "online-policy",
        question: "Можно ли оформить ОСАГО России онлайн?",
        answer:
          "Да. Заявка и документы передаются онлайн, после чего менеджер проверяет возможность оформления и рассчитывает стоимость. Готовый электронный полис отправляется на указанный e-mail.",
      },
      {
        id: "minimum-term",
        question: "На какой минимальный срок можно оформить полис?",
        answer:
          "Для иностранного автомобиля, временно используемого в России, может быть доступно краткосрочное ОСАГО. Минимальный срок зависит от действующих правил, страховой компании, категории транспортного средства и параметров заявки. Доступный период подтверждается после проверки документов.",
      },
      {
        id: "term-15-days",
        question: "Можно ли оформить ОСАГО РФ на 15 дней?",
        answer:
          "Для временного использования иностранного автомобиля может быть доступно оформление на 15 дней. Возможность оформления и точный срок подтверждаются после проверки данных автомобиля, страхователя и действующих правил страховой компании.",
      },
      {
        id: "price",
        question:
          "Сколько стоит ОСАГО для казахстанского автомобиля?",
        answer:
          "Единой фиксированной цены нет. Стоимость зависит от категории и мощности автомобиля, типа страхователя, срока страхования, списка водителей, их возраста и стажа, а также применяемых тарифных коэффициентов.",
      },
      {
        id: "price-15-days",
        question: "Сколько стоит ОСАГО на 15 дней?",
        answer:
          "Стоимость полиса на 15 дней рассчитывается индивидуально. На цену влияют тип автомобиля, мощность двигателя, данные собственника и водителей, категория страхователя и тарифы страховой компании. Точная сумма определяется после получения документов и параметров автомобиля.",
      },
      {
        id: "documents",
        question: "Какие документы нужны для оформления ОСАГО?",
        answer:
          "Обычно требуются регистрационный документ или технический паспорт автомобиля, паспорт либо удостоверение личности страхователя, водительские удостоверения допущенных водителей, регистрационный номер, VIN и предполагаемый срок поездки. Для юридического лица дополнительно запрашиваются регистрационные данные организации и сведения о её представителе.",
      },
      {
        id: "truck",
        question: "Можно ли оформить ОСАГО на грузовой автомобиль?",
        answer:
          "Да, заявки на грузовые автомобили с казахстанскими регистрационными номерами принимаются. Для расчёта потребуются категория транспортного средства, мощность двигателя, разрешённая максимальная масса, характер использования и регистрационные документы.",
      },
      {
        id: "legal-entity",
        question: "Можно ли оформить ОСАГО на юридическое лицо?",
        answer:
          "Да, возможность оформления проверяется для автомобиля, принадлежащего организации. Дополнительно потребуются полное наименование и регистрационные данные компании, сведения о представителе и документы, подтверждающие данные автомобиля.",
      },
      {
        id: "what-covers",
        question: "Что покрывает российское ОСАГО?",
        answer:
          "ОСАГО покрывает ответственность водителя за вред, причинённый жизни, здоровью или имуществу третьих лиц при ДТП, в пределах условий договора и установленных законом лимитов.",
      },
      {
        id: "own-car-damage",
        question:
          "Покрывает ли ОСАГО повреждение собственного автомобиля?",
        answer:
          "Нет. ОСАГО не покрывает повреждение автомобиля виновника, угон, поломку, естественный износ, перевозимый груз или личные вещи. Для защиты собственного автомобиля требуется отдельное страхование каско.",
      },
      {
        id: "start-date",
        question: "Когда начинает действовать полис?",
        answer:
          "Полис начинает действовать с даты и времени, указанных в страховом документе. До поездки необходимо проверить, что начало действия полиса наступает не позднее момента эксплуатации автомобиля на территории России.",
      },
      {
        id: "same-day",
        question: "Можно ли оформить полис в день въезда?",
        answer:
          "Это зависит от времени подачи заявки, скорости проверки документов и правил страховой компании. Чтобы избежать поездки без действующего страхования, рекомендуется подавать документы заранее.",
      },
      {
        id: "electronic-policy",
        question: "Действителен ли электронный полис ОСАГО?",
        answer:
          "Да. Электронный полис ОСАГО имеет юридическую силу. После получения необходимо проверить указанные в нём данные и сохранить PDF на телефоне.",
      },
      {
        id: "print-policy",
        question: "Нужно ли распечатывать электронный полис?",
        answer:
          "Обязательная бумажная копия электронного полиса обычно не требуется. Однако рекомендуется сохранить PDF на телефоне и дополнительно иметь распечатанный экземпляр на случай отсутствия интернета, разрядки устройства или технических проблем при проверке.",
      },
      {
        id: "check",
        question: "Как проверить действительность полиса?",
        answer:
          "Полис можно проверить в Национальной страховой информационной системе. Необходимо убедиться, что в системе и в электронном документе правильно указаны регистрационный номер, VIN, страхователь, водители и срок действия.",
      },
      {
        id: "valid-all-rf",
        question: "Действует ли ОСАГО по всей территории России?",
        answer:
          "Российский полис ОСАГО действует на территории Российской Федерации в течение указанного срока при соблюдении условий договора страхования.",
      },
      {
        id: "outside-russia",
        question:
          "Действует ли российское ОСАГО за пределами России?",
        answer:
          "Нет. Российское ОСАГО предназначено для эксплуатации автомобиля на территории Российской Федерации. Для поездки в Грузию, Турцию, страны Европейского союза и другие государства необходимо отдельно проверять требования каждой страны и оформлять соответствующее страхование.",
      },
      {
        id: "multiple-drivers",
        question: "Можно ли указать нескольких водителей?",
        answer:
          "Да. В полис можно включить нескольких водителей, допущенных к управлению автомобилем. Для каждого потребуются данные водительского удостоверения. В некоторых случаях может быть доступен полис без ограничения перечня водителей, но такой вариант влияет на стоимость.",
      },
      {
        id: "accident-russia",
        question: "Что делать при ДТП в России?",
        answer:
          "Необходимо остановить автомобиль, включить аварийную сигнализацию и выставить знак аварийной остановки. Если есть пострадавшие, следует немедленно вызвать экстренные службы. Зафиксируйте положение автомобилей, повреждения, регистрационные номера и обстоятельства ДТП, обменяйтесь данными с другим участником и сообщите о происшествии страховой компании. При споре, наличии пострадавших, повреждении другого имущества или сомнениях в порядке оформления следует вызвать сотрудников полиции.",
      },
      {
        id: "policy-error",
        question:
          "Что делать, если в данных полиса допущена ошибка?",
        answer:
          "После получения полиса необходимо сразу проверить регистрационный номер, VIN, данные собственника, водителей и срок действия. Если обнаружена ошибка, нельзя самостоятельно редактировать PDF. Следует немедленно обратиться к менеджеру или страховщику, указать неверное поле и направить подтверждающий документ. Порядок исправления зависит от характера ошибки и стадии оформления.",
      },
    ],
  },
  commercialTransport: {
  title: "ОСАГО РФ для грузовых автомобилей из Казахстана",
  intro:
    "Для тягачей, грузовых автомобилей, автобусов и другого коммерческого транспорта расчёт выполняется отдельно от легковых автомобилей. Учитываются категория транспортного средства, разрешённая максимальная масса, мощность, характер использования, срок поездок и данные собственника.",

  vehicleTypesTitle: "Какой коммерческий транспорт можно заявить",
  vehicleTypes: [
    {
      title: "Тягачи и грузовые автомобили",
      text:
        "При расчёте учитываются категория транспортного средства, разрешённая максимальная масса, мощность двигателя и характер перевозок.",
    },
    {
      title: "Автобусы и микроавтобусы",
      text:
        "Возможность оформления проверяется с учётом категории, количества пассажирских мест и целей использования транспорта.",
    },
    {
      title: "Коммерческий транспорт",
      text:
        "Принимаются заявки на транспорт, используемый для перевозки грузов, пассажиров, служебных и иных коммерческих задач.",
    },
    {
      title: "Транспорт юридических лиц",
      text:
        "Для автомобиля организации дополнительно потребуются реквизиты компании и данные представителя, который подаёт заявку.",
    },
    {
      title: "Автопарки",
      text:
        "Для нескольких автомобилей можно направить одну заявку и приложить список транспортных средств для общего расчёта.",
    },
    {
      title: "Международные рейсы",
      text:
        "Для транспорта, регулярно выполняющего рейсы между Казахстаном и Россией, срок страхования следует выбирать с учётом всего периода эксплуатации в России.",
    },
  ],

  fleetTitle: "Оформление ОСАГО на несколько автомобилей",
  fleetText:
    "Если необходимо застраховать несколько автомобилей, укажите количество транспортных средств и загрузите список автопарка. После проверки мы подготовим расчёт по каждому автомобилю и сообщим, какие дополнительные документы потребуются.",
  fleetItems: [
      "Количество автомобилей в заявке",
      "Типы и категории транспортных средств",
      "Регистрационные номера и VIN",
      "Мощность или разрешённая максимальная масса",
      "Данные собственника — юридического лица",
      "Планируемые сроки эксплуатации в России",
      "Список транспортных средств в XLSX, XLS, CSV или PDF",
    ],
    cta: "Оставить заявку на коммерческий транспорт",
  },
  seo: {
    title:
      "Страховка в Россию для авто из Казахстана онлайн",
    description:
      "Электронное ОСАГО России для автомобиля с казахстанскими номерами. Расчёт стоимости, проверка документов и получение полиса онлайн.",
    serviceName:
      "Оформление ОСАГО России для автомобилей из Казахстана",
    serviceType:
      "Обязательное страхование гражданской ответственности владельцев транспортных средств",
    audienceName:
      "Физические лица, юридические лица и владельцы коммерческого транспорта из Казахстана",
    breadcrumbs: {
      home: "Главная",
      services: "Страховые продукты",
      current: "ОСАГО России",
    },
    channels: {
      website: "Онлайн-заявка на сайте",
      phone: "Консультация по телефону",
      whatsapp: "Консультация в WhatsApp",
      telegram: "Консультация в Telegram",
    },
  },
};

const en: OsagoRfPageDictionary = {
  hero: {
    title: "Car Insurance for Travel from Kazakhstan to Russia",
    subtitle:
      "Electronic Russian MTPL insurance for entering and travelling within Russia in a vehicle with Kazakhstan registration plates. We will check your documents, calculate the price, and send the completed policy as a PDF.",
    ctaOrder: "Calculate the Insurance Cost",
    factsLabel: "Key Conditions",
    facts: [
      "For Passenger Cars and Commercial Vehicles",
      "For Individuals and Legal Entities",
      "Coverage from 15 Days",
      "Electronic Russian MTPL Policy in PDF",
    ],
    carAlt:
      "Vehicle with Kazakhstan registration plates travelling to Russia",
    policyAlt:
      "Electronic Russian MTPL insurance for a vehicle from Kazakhstan",
    logoAlt: "DIONIS Insurance Broker",
  },

  passengerPricesLink: {
    title: "Car Insurance Prices for Travel to Russia",
    text:
      "View the estimated cost of Russian MTPL insurance for privately owned passenger cars. Prices are shown by insurance period and engine power for policies with no restriction on the number of drivers.",
    cta: "View Prices",
  },

  questionBlock: {
    title: "Still Have Questions About Insurance for Travel to Russia?",
    text1:
      "We will explain the available insurance periods, how the price is calculated, which documents are required, and whether Russian MTPL insurance can be issued for your vehicle.",
    text2:
      "Send us your question — a manager will check the vehicle details and help you arrange insurance for entering Russia.",
  },

  advantages: {
    title: "Why customers contact DIONIS",
    items: [
      {
        title: "Remote application",
        text:
          "The application and documents can be submitted online without visiting an office. The completed policy is delivered electronically.",
      },
      {
        title: "Verification before payment",
        text:
          "We first check the documents, vehicle and driver details, and available period, then confirm the final price and payment procedure.",
      },
      {
        title: "Different vehicle categories",
        text:
          "We accept applications for passenger cars and trucks and verify availability for buses and other commercial vehicles.",
      },
      {
        title: "Individuals and legal entities",
        text:
          "We help prepare applications for vehicles owned by private individuals and organisations.",
      },
    ],
  },

  howItWorks: {
    title: "How to arrange electronic Russian OSAGO",
    subtitle: "The quotation and policy issuance process",
    steps: [
      {
        title: "Submit the application",
        text:
          "Provide the policyholder, vehicle and driver details, the required start date, and the expected period of use in Russia.",
      },
      {
        title: "Send the documents",
        text:
          "Provide the vehicle registration document, the policyholder's identity document, and the driving licences of all listed drivers.",
      },
      {
        title: "Receive the confirmed quotation",
        text:
          "We verify the information, confirm the available period and final price, and ask you to check the policy details before payment.",
      },
      {
        title: "Receive and verify the policy",
        text:
          "After payment, we send the electronic PDF policy. Check the registration number, VIN, drivers and validity period in the document and the insurance database.",
      },
    ],
  },

  writeUs: {
    title: "We will help calculate and arrange OSAGO",
    text:
      "Contact us if you need to verify the documents, insurance period, or eligibility of a particular vehicle",
    whatsapp: "Message us on WhatsApp",
    telegram: "Message us on Telegram",
    phone: "Call us: +7 (727) 357-30-30",
  },

  info: {
    title: "Which insurance is required to enter Russia from Kazakhstan",
    paragraphs: [
      "A vehicle with Kazakhstan registration plates must have motor third-party liability insurance valid in the Russian Federation when it is used in Russia. If the vehicle has no other coverage recognised in Russia, a Russian OSAGO policy must be arranged.",
      "OSAGO compensates third parties for bodily injury and property damage caused in a road traffic accident, subject to the applicable terms and limits. It does not cover damage to, theft of, mechanical failure of, or wear and tear to the policyholder's own vehicle.",
      "An electronic policy has legal validity and applies during the period stated in the document. The insurance dates must cover the entire period during which the vehicle will be used in Russia.",
      "Russian OSAGO and Green Card are different insurance products. For a multi-country journey, coverage must be checked separately for each territory.",
    ],
  },

  benefits: {
    title: "Russian OSAGO price, period and conditions",
    imageAlt:
      "Territorial validity of Russian OSAGO for a vehicle with Kazakhstan plates",
    items: [
      {
        title: "The price is calculated individually",
        text:
          "The premium depends on the vehicle category and engine power, policyholder type, insurance period, listed drivers, their age and driving experience, and the applicable tariff factors.",
      },
      {
        title: "Coverage from 15 days may be available",
        text:
          "A limited insurance period may be available for temporary use of a foreign vehicle. The exact period is confirmed after the documents and current rules are checked.",
      },
      {
        title: "Passenger cars and trucks",
        text:
          "The calculation takes account of the vehicle category, engine power, permitted weight, and the way the vehicle is used.",
      },
      {
        title: "Policies for legal entities",
        text:
          "For a company-owned vehicle, company registration details and representative information are also required. The final document list is confirmed during the application review.",
      },
    ],
  },

  osagoCheckUpsell: {
    title: "How to verify an electronic OSAGO policy",
    text1:
      "After receiving the policy, verify its registration in the Russian National Insurance Information System.",
    text2:
      "Check the registration number, VIN, policyholder, listed drivers and validity period. Report any discrepancy before the journey begins.",
    btn: "Check the policy in the system",
    imageAlt: "Verification of an electronic Russian OSAGO policy",
  },

  greenCardUpsell: {
    title: "Russian OSAGO and Green Card are not the same",
    text1:
      "Russian OSAGO is intended for the use of a vehicle in the Russian Federation. Green Card applies only in the countries and territories shown as covered by the relevant international policy.",
    text2:
      "For a journey through several countries, send us the complete route. We will check which insurance is required for each part of the trip.",
    btn: "Check insurance for the route",
    imageAlt: "Comparison of Russian OSAGO and Green Card insurance",
  },

  orderPrep: {
    title: "Documents and details required for OSAGO",
    text:
      "Prepare clear copies and verify the information. For a legal entity, company and representative details will also be required.",
    items: [
      "Vehicle registration certificate or technical passport",
      "Passport or identity document of the policyholder",
      "Driving licences of all listed drivers",
      "Registration number, VIN, make, model and year of manufacture",
      "Engine power and vehicle category",
      "Required start date and expected insurance period",
      "For an organisation: company name, registration details and representative information",
      "Contact phone number and email address for communication and policy delivery",
    ],
  },

  faq: {
    title: "Questions About Russian OSAGO for a Vehicle from Kazakhstan",
    intro:
      "Answers about pricing, policy periods, required documents, and arranging electronic insurance for travel to Russia.",
    items: [
      {
        id: "mandatory",
        question:
          "Which insurance is required to enter Russia from Kazakhstan?",
        answer:
          "To use a vehicle with Kazakhstan registration plates in Russia, valid motor third-party liability insurance recognised in the Russian Federation is required. In standard cases, a Russian OSAGO policy is arranged. It covers the driver's liability for damage caused to other people, vehicles, or property in a road traffic accident, but it does not insure the policyholder's own vehicle against damage, theft, or mechanical failure.",
      },
      {
        id: "kazakhstan-plates",
        question:
          "Is OSAGO required for a vehicle with Kazakhstan registration plates?",
        answer:
          "Yes, if the vehicle is used in Russia and does not have other insurance coverage recognised in the Russian Federation. The policy must remain valid for the entire period during which the vehicle is used in Russia.",
      },
      {
        id: "green-card",
        question: "Is a Green Card required for travel to Russia?",
        answer:
          "A vehicle travelling from Kazakhstan must have motor liability insurance that is valid specifically in Russia. A Green Card should not be treated as a replacement for Russian OSAGO, because Russia has not participated in the Green Card system since 2023. A Russian OSAGO policy is normally arranged for entry into and travel within Russia.",
      },
      {
        id: "remote-application",
        question:
          "Can Russian OSAGO be arranged while the applicant is in Kazakhstan?",
        answer:
          "Yes. The application, documents, and driver details can be submitted remotely. After the information is checked, the premium is calculated, and payment is made, the electronic policy is sent to the specified email address as a PDF.",
      },
      {
        id: "online-policy",
        question: "Can Russian OSAGO be arranged online?",
        answer:
          "Yes. The application and documents are submitted online, after which a manager checks whether the policy can be issued and calculates the price. The completed electronic policy is sent to the specified email address.",
      },
      {
        id: "minimum-term",
        question: "What is the minimum policy period?",
        answer:
          "Short-term OSAGO may be available for a foreign vehicle temporarily used in Russia. The minimum period depends on the current rules, the insurance company, the vehicle category, and the application details. The available period is confirmed after the documents have been reviewed.",
      },
      {
        id: "term-15-days",
        question: "Can Russian OSAGO be arranged for 15 days?",
        answer:
          "A 15-day policy may be available for the temporary use of a foreign vehicle. Eligibility and the exact period are confirmed after the vehicle details, policyholder information, and current insurer rules have been checked.",
      },
      {
        id: "price",
        question:
          "How much does OSAGO cost for a vehicle from Kazakhstan?",
        answer:
          "There is no single fixed price. The premium depends on the vehicle category and engine power, the policyholder type, the insurance period, the list of drivers, their age and driving experience, and the applicable tariff coefficients.",
      },
      {
        id: "price-15-days",
        question: "How much does OSAGO cost for 15 days?",
        answer:
          "The price of a 15-day policy is calculated individually. It depends on the vehicle type, engine power, owner and driver details, policyholder category, and the insurance company's tariffs. The exact amount is determined after the documents and vehicle details have been received.",
      },
      {
        id: "documents",
        question: "Which documents are required to arrange OSAGO?",
        answer:
          "The usual requirements include the vehicle registration document or technical passport, the policyholder's passport or identity document, the driving licences of all listed drivers, the registration number, VIN, and expected travel period. For a legal entity, company registration details and information about its representative are also required.",
      },
      {
        id: "truck",
        question: "Can OSAGO be arranged for a truck?",
        answer:
          "Yes, applications are accepted for trucks with Kazakhstan registration plates. The calculation requires the vehicle category, engine power, permitted maximum weight, type of use, and registration documents.",
      },
      {
        id: "legal-entity",
        question: "Can OSAGO be arranged for a legal entity?",
        answer:
          "Yes, eligibility can be checked for a vehicle owned by an organisation. The company's full name and registration details, information about its representative, and documents confirming the vehicle details will also be required.",
      },
      {
        id: "what-covers",
        question: "What does Russian OSAGO cover?",
        answer:
          "OSAGO covers the driver's liability for bodily injury, death, or property damage caused to third parties in a road traffic accident, subject to the policy terms and statutory compensation limits.",
      },
      {
        id: "own-car-damage",
        question:
          "Does OSAGO cover damage to the policyholder's own vehicle?",
        answer:
          "No. OSAGO does not cover damage to the at-fault driver's vehicle, theft, mechanical failure, normal wear and tear, transported cargo, or personal belongings. Separate comprehensive motor insurance is required to protect the vehicle itself.",
      },
      {
        id: "start-date",
        question: "When does the policy become effective?",
        answer:
          "The policy becomes effective on the date and at the time stated in the insurance document. Before travelling, confirm that coverage begins no later than the moment the vehicle starts being used in Russia.",
      },
      {
        id: "same-day",
        question: "Can the policy be arranged on the day of entry?",
        answer:
          "This depends on the time the application is submitted, the document review process, and the insurance company's issuance rules. To avoid driving without valid coverage, the documents should be submitted in advance.",
      },
      {
        id: "electronic-policy",
        question: "Is an electronic OSAGO policy legally valid?",
        answer:
          "Yes. An electronic OSAGO policy has legal validity. After receiving it, check all the details and save the PDF on your phone.",
      },
      {
        id: "print-policy",
        question: "Does the electronic policy need to be printed?",
        answer:
          "A printed copy of an electronic policy is generally not mandatory. However, it is advisable to save the PDF on your phone and also carry a printed copy in case there is no internet connection, the device runs out of power, or a technical issue occurs during verification.",
      },
      {
        id: "check",
        question: "How can the policy's validity be checked?",
        answer:
          "The policy can be checked in the National Insurance Information System. Make sure that the registration number, VIN, policyholder, listed drivers, and validity period are shown correctly both in the system and in the electronic document.",
      },
      {
        id: "valid-all-rf",
        question: "Is OSAGO valid throughout Russia?",
        answer:
          "A Russian OSAGO policy is valid throughout the Russian Federation during the stated policy period, provided that the policy terms are complied with.",
      },
      {
        id: "outside-russia",
        question:
          "Is Russian OSAGO valid outside Russia?",
        answer:
          "No. Russian OSAGO is intended for the use of a vehicle within the Russian Federation. For travel to Georgia, Turkey, European Union countries, or other states, the insurance requirements of each country must be checked separately and the appropriate insurance must be arranged.",
      },
      {
        id: "multiple-drivers",
        question: "Can several drivers be listed in the policy?",
        answer:
          "Yes. Several drivers authorised to use the vehicle can be included in the policy. Driving licence details are required for each driver. In some cases, an unrestricted-driver policy may also be available, but this option affects the premium.",
      },
      {
        id: "accident-russia",
        question: "What should be done after a road accident in Russia?",
        answer:
          "Stop the vehicle, switch on the hazard warning lights, and place the warning triangle. If anyone is injured, call the emergency services immediately. Record the positions of the vehicles, the damage, registration numbers, and the circumstances of the accident, exchange details with the other party, and notify the insurance company. If there is a dispute, anyone is injured, other property is damaged, or there is uncertainty about the correct procedure, the police should be called.",
      },
      {
        id: "policy-error",
        question:
          "What should be done if the policy contains an error?",
        answer:
          "After receiving the policy, immediately check the registration number, VIN, owner details, driver details, and validity period. If an error is found, do not edit the PDF yourself. Contact the manager or insurer immediately, identify the incorrect field, and provide a supporting document. The correction procedure depends on the type of error and the stage of policy issuance.",
      },
    ],
  },
  commercialTransport: {
  title: "Russian OSAGO for Commercial Vehicles from Kazakhstan",
  intro:
    "Tractor units, trucks, buses, and other commercial vehicles are calculated separately from passenger cars. The vehicle category, permitted maximum weight, engine power, type of use, travel period, and owner details are taken into account.",

  vehicleTypesTitle: "Which commercial vehicles can be submitted",
  vehicleTypes: [
    {
      title: "Tractor units and trucks",
      text:
        "The calculation takes into account the vehicle category, permitted maximum weight, engine power, and type of transport operations.",
    },
    {
      title: "Buses and minibuses",
      text:
        "Eligibility is checked based on the vehicle category, number of passenger seats, and intended use.",
    },
    {
      title: "Commercial vehicles",
      text:
        "Applications are accepted for vehicles used for freight transport, passenger transport, company operations, and other commercial purposes.",
    },
    {
      title: "Vehicles owned by legal entities",
      text:
        "For a company-owned vehicle, the company details and information about the representative submitting the application will also be required.",
    },
    {
      title: "Vehicle fleets",
      text:
        "For several vehicles, one application may be submitted together with a vehicle list for a combined quotation.",
    },
    {
      title: "International routes",
      text:
        "For vehicles regularly operating between Kazakhstan and Russia, the insurance period should cover the entire period during which the vehicles will be used in Russia.",
    },
  ],

    fleetTitle: "Arranging OSAGO for Multiple Vehicles",
    fleetText:
      "If several vehicles need to be insured, specify the number of vehicles and upload the fleet list. After reviewing the information, we will prepare a quotation for each vehicle and confirm which additional documents are required.",
    fleetItems: [
      "Number of vehicles included in the application",
      "Vehicle types and categories",
      "Registration numbers and VINs",
      "Engine power or permitted maximum weight",
      "Details of the owner — legal entity",
      "Planned periods of use in Russia",
      "Vehicle list in XLSX, XLS, CSV, or PDF format",
    ],
    cta: "Submit a Commercial Vehicle Application",
  },
  seo: {
    title:
      "Car Insurance for Travel to Russia from Kazakhstan Online",
    description:
      "Electronic Russian OSAGO for vehicles with Kazakhstan registration plates. Price calculation, document verification, and online policy issuance.",
    serviceName:
      "Russian OSAGO Insurance for Vehicles from Kazakhstan",
    serviceType:
      "Compulsory Motor Third-Party Liability Insurance",
    audienceName:
      "Individuals, legal entities, and commercial vehicle owners from Kazakhstan",
    breadcrumbs: {
      home: "Home",
      services: "Insurance Products",
      current: "Russian OSAGO",
    },
    channels: {
      website: "Online Application",
      phone: "Telephone Consultation",
      whatsapp: "WhatsApp Consultation",
      telegram: "Telegram Consultation",
    },
  },
};

const kz: OsagoRfPageDictionary = {
  hero: {
    title: "Қазақстаннан автокөлікпен Ресейге баруға арналған сақтандыру",
    subtitle:
      "Қазақстандық нөмірі бар автокөлікпен Ресейге кіруге және ел аумағында жүруге арналған РФ ОСАГО электрондық полисі. Құжаттарды тексеріп, құнын есептейміз және дайын сақтандыру полисін PDF форматында жібереміз.",
    ctaOrder: "Сақтандыру құнын есептеу",
    factsLabel: "Негізгі шарттар",
    facts: [
      "Жеңіл және жүк автокөліктеріне арналған",
      "Жеке және заңды тұлғалар үшін",
      "Сақтандыру мерзімі 15 күннен басталады",
      "PDF форматындағы ОСАГО электрондық полисі",
    ],
    carAlt:
      "Ресейге баруға арналған қазақстандық нөмірі бар автокөлік",
    policyAlt:
      "Қазақстаннан баратын автокөлікке арналған РФ ОСАГО электрондық сақтандыру полисі",
    logoAlt: "DIONIS сақтандыру брокері",
  },

  passengerPricesLink: {
    title: "Жеңіл автокөліктермен Ресейге баруға арналған сақтандыру бағалары",
    text:
      "Жеке тұлғалардың жеңіл автокөліктеріне арналған РФ ОСАГО полисінің болжамды құнын қараңыз. Бағалар жүргізушілер саны шектелмейтін полис үшін сақтандыру мерзімі мен автокөлік қуатына қарай көрсетілген.",
    cta: "Бағаларды қарау",
  },

  questionBlock: {
    title: "Ресейге баруға арналған сақтандыру бойынша сұрақтарыңыз қалды ма?",
    text1:
      "Қолжетімді сақтандыру мерзімін, құнын есептеу тәртібін, қажетті құжаттарды және автокөлігіңізге РФ ОСАГО полисін рәсімдеу мүмкіндігін нақтылап береміз.",
    text2:
      "Сұрағыңызды жіберіңіз — менеджер автокөлік деректерін тексеріп, Ресейге кіруге арналған сақтандыруды рәсімдеуге көмектеседі.",
  },

  advantages: {
    title: "Неліктен DIONIS-ке жүгінеді",
    items: [
      {
        title: "Қашықтан рәсімдеу",
        text:
          "Өтінім мен құжаттарды кеңсеге бармай-ақ онлайн жіберуге болады. Дайын полис электрондық түрде беріледі.",
      },
      {
        title: "Төлемге дейін тексеру",
        text:
          "Алдымен құжаттарды, автокөлік пен жүргізушілер туралы деректерді және қолжетімді мерзімді тексеріп, содан кейін құны мен төлем тәртібін растаймыз.",
      },
      {
        title: "Көліктің әртүрлі санаттары",
        text:
          "Жеңіл және жүк автокөліктеріне өтінім қабылдаймыз, сондай-ақ автобустар мен коммерциялық көлікке рәсімдеу мүмкіндігін тексереміз.",
      },
      {
        title: "Жеке және заңды тұлғалар",
        text:
          "Жеке меншік иелеріне және ұйымдарға тиесілі автокөліктер бойынша деректерді дайындауға көмектесеміз.",
      },
    ],
  },

  howItWorks: {
    title: "Электрондық Ресей ОСАГО полисін қалай рәсімдеуге болады",
    subtitle: "Құнын есептеу және полисті алу тәртібі",
    steps: [
      {
        title: "Өтінім бересіз",
        text:
          "Сақтанушы, автокөлік, жүргізушілер, басталу күні және Ресейде жоспарланған пайдалану мерзімі туралы деректерді көрсетесіз.",
      },
      {
        title: "Құжаттарды жібересіз",
        text:
          "Автокөліктің тіркеу құжатын, сақтанушының жеке басын куәландыратын құжатты және барлық жүргізушінің куәліктерін бересіз.",
      },
      {
        title: "Расталған есепті аласыз",
        text:
          "Біз деректерді тексеріп, қолжетімді мерзім мен соңғы құнын растаймыз. Төлемге дейін полиске енгізілетін мәліметтерді тексересіз.",
      },
      {
        title: "Полисті алып, тексересіз",
        text:
          "Төлемнен кейін электрондық полисті PDF форматында жібереміз. Тіркеу нөмірін, VIN-ді, жүргізушілерді және қолданылу мерзімін құжатта және ақпараттық жүйеде тексеріңіз.",
      },
    ],
  },

  writeUs: {
    title: "ОСАГО құнын есептеп, рәсімдеуге көмектесеміз",
    text:
      "Құжаттарды, сақтандыру мерзімін немесе нақты автокөлікке рәсімдеу мүмкіндігін тексеру қажет болса, бізге жазыңыз",
    whatsapp: "WhatsApp арқылы жазу",
    telegram: "Telegram арқылы жазу",
    phone: "Қоңырау шалу: +7 (727) 357-30-30",
  },

  info: {
    title: "Қазақстаннан Ресейге кіру үшін қандай сақтандыру қажет",
    paragraphs: [
      "Қазақстандық тіркеу нөмірі бар автокөлікті Ресей аумағында пайдалану үшін Ресей Федерациясында жарамды азаматтық жауапкершілік сақтандыруы қажет. Егер автокөлікте Ресейде танылатын басқа сақтандыру болмаса, ресейлік ОСАГО полисін рәсімдеу керек.",
      "ОСАГО жол-көлік оқиғасы кезінде үшінші тұлғалардың өміріне, денсаулығына, автокөлігіне немесе өзге мүлкіне келтірілген зиянды шарттар мен белгіленген лимиттер шегінде өтейді. Полис иесінің өз автокөлігінің зақымдануын, ұрлануын, бұзылуын немесе тозуын өтемейді.",
      "Электрондық полистің заңды күші бар және онда көрсетілген мерзім ішінде қолданылады. Сақтандыру мерзімі автокөліктің Ресейде пайдаланылатын бүкіл кезеңін қамтуы тиіс.",
      "Ресей ОСАГО полисі мен Green Card — әртүрлі сақтандыру өнімдері. Бірнеше ел арқылы өтетін сапарда әр аумаққа арналған сақтандыруды бөлек тексеру қажет.",
    ],
  },

  benefits: {
    title: "Ресей ОСАГО полисінің құны, мерзімі және шарттары",
    imageAlt:
      "Қазақстандық нөмірі бар автокөлікке арналған Ресей ОСАГО полисінің қолданылу аумағы",
    items: [
      {
        title: "Құны жеке есептеледі",
        text:
          "Баға автокөлік санатына және қозғалтқыш қуатына, сақтанушы түріне, мерзімге, жүргізушілер тізіміне, олардың жасына және жүргізушілік өтіліне, сондай-ақ қолданылатын тарифтік коэффициенттерге байланысты.",
      },
      {
        title: "15 күннен бастап мерзім қолжетімді болуы мүмкін",
        text:
          "Шетелдік автокөлікті уақытша пайдалану үшін шектеулі мерзімге сақтандыру мүмкін болуы ықтимал. Нақты мерзім құжаттар мен қолданыстағы ережелер тексерілгеннен кейін расталады.",
      },
      {
        title: "Жеңіл және жүк автокөліктері",
        text:
          "Есептеу кезінде көлік санаты, қозғалтқыш қуаты, рұқсат етілген массасы және пайдалану сипаты ескеріледі.",
      },
      {
        title: "Заңды тұлғаға рәсімдеу",
        text:
          "Ұйымға тиесілі автокөлік үшін компанияның тіркеу деректері мен өкіл туралы мәліметтер қосымша қажет. Соңғы құжаттар тізімі өтінімді тексеру кезінде расталады.",
      },
    ],
  },

  osagoCheckUpsell: {
    title: "Электрондық ОСАГО полисін қалай тексеруге болады",
    text1:
      "Полисті алғаннан кейін оның Ресейдің Ұлттық сақтандыру ақпараттық жүйесінде тіркелгенін тексеріңіз.",
    text2:
      "Тіркеу нөмірін, VIN-ді, сақтанушыны, жүргізушілер тізімін және қолданылу мерзімін салыстырыңыз. Қате анықталса, сапар басталғанға дейін хабарлаңыз.",
    btn: "Полисті ақпараттық жүйеде тексеру",
    imageAlt: "Электрондық Ресей ОСАГО полисін тексеру",
  },

  greenCardUpsell: {
    title: "Ресей ОСАГО полисі мен Green Card бірдей емес",
    text1:
      "Ресей ОСАГО полисі автокөлікті Ресей Федерациясының аумағында пайдалануға арналған. Green Card тиісті халықаралық полисте қамтылған деп көрсетілген елдер мен аумақтарда ғана қолданылады.",
    text2:
      "Сапар бірнеше ел арқылы өтсе, толық бағытты жіберіңіз. Әр бөлікке қандай сақтандыру қажет екенін тексереміз.",
    btn: "Бағыт бойынша сақтандыруды тексеру",
    imageAlt: "Ресей ОСАГО полисі мен Green Card сақтандыруын салыстыру",
  },

  orderPrep: {
    title: "ОСАГО рәсімдеу үшін қандай деректер қажет",
    text:
      "Құжаттардың анық көшірмелерін дайындап, деректердің дұрыстығын тексеріңіз. Заңды тұлға үшін ұйым мен оның өкілі туралы мәліметтер де қажет.",
    items: [
      "Автокөліктің тіркеу куәлігі немесе техникалық паспорты",
      "Сақтанушының паспорты немесе жеке куәлігі",
      "Көлікті басқаруға жіберілетін барлық жүргізушінің куәлігі",
      "Тіркеу нөмірі, VIN, маркасы, моделі және шығарылған жылы",
      "Қозғалтқыш қуаты және көлік құралының санаты",
      "Сақтандырудың басталу күні және жоспарланған мерзімі",
      "Ұйым үшін — атауы, тіркеу деректері және өкілі туралы мәліметтер",
      "Байланыс телефоны және полисті алу үшін e-mail",
    ],
  },

  faq: {
    title: "Қазақстаннан келген автокөлікке арналған ОСАГО туралы сұрақтар",
    intro:
      "Ресейге сапарға арналған электрондық сақтандырудың құны, мерзімі, құжаттары және рәсімделуі туралы жауаптар.",
    items: [
      {
        id: "mandatory",
        question:
          "Қазақстаннан Ресейге кіру үшін қандай сақтандыру қажет?",
        answer:
          "Қазақстандық тіркеу нөмірі бар автокөлікті Ресей аумағында пайдалану үшін Ресей Федерациясында танылатын қолданыстағы азаматтық жауапкершілік сақтандыруы қажет. Әдетте ресейлік ОСАГО полисі рәсімделеді. Ол жол-көлік оқиғасы кезінде жүргізушінің басқа адамдарға, автокөліктерге немесе мүлікке келтірген зияны үшін жауапкершілігін өтейді, бірақ меншік иесінің өз автокөлігін зақымданудан, ұрланудан немесе бұзылудан сақтандырмайды.",
      },
      {
        id: "kazakhstan-plates",
        question:
          "Қазақстандық тіркеу нөмірі бар автокөлікке ОСАГО қажет пе?",
        answer:
          "Иә, егер автокөлік Ресейде пайдаланылса және Ресей Федерациясының аумағында танылатын басқа сақтандыруы болмаса. Полис автокөліктің Ресейде пайдаланылатын бүкіл кезеңінде жарамды болуы тиіс.",
      },
      {
        id: "green-card",
        question: "Ресейге сапар үшін Green Card қажет пе?",
        answer:
          "Қазақстаннан автокөлікпен Ресейге бару үшін дәл Ресей аумағында жарамды азаматтық жауапкершілік сақтандыруы қажет. Green Card полисін ресейлік ОСАГО-ның орнына қолдануға болмайды, өйткені Ресей 2023 жылдан бері «Жасыл карта» жүйесіне қатыспайды. Ресейге кіру және оның аумағында жүру үшін әдетте ресейлік ОСАГО полисі рәсімделеді.",
      },
      {
        id: "remote-application",
        question:
          "Қазақстанда жүріп Ресей ОСАГО полисін рәсімдеуге бола ма?",
        answer:
          "Иә. Өтінімді, құжаттарды және жүргізушілер туралы деректерді қашықтан жіберуге болады. Мәліметтер тексеріліп, құны есептеліп, төлем жасалғаннан кейін электрондық полис көрсетілген e-mail мекенжайына PDF форматында жіберіледі.",
      },
      {
        id: "online-policy",
        question: "Ресей ОСАГО полисін онлайн рәсімдеуге бола ма?",
        answer:
          "Иә. Өтінім мен құжаттар онлайн жіберіледі, содан кейін менеджер рәсімдеу мүмкіндігін тексеріп, құнын есептейді. Дайын электрондық полис көрсетілген e-mail мекенжайына жіберіледі.",
      },
      {
        id: "minimum-term",
        question: "Полисті ең қысқа қандай мерзімге рәсімдеуге болады?",
        answer:
          "Ресейде уақытша пайдаланылатын шетелдік автокөлік үшін қысқа мерзімді ОСАГО қолжетімді болуы мүмкін. Ең төменгі мерзім қолданыстағы ережелерге, сақтандыру компаниясына, көлік құралының санатына және өтінім параметрлеріне байланысты. Қолжетімді мерзім құжаттар тексерілгеннен кейін расталады.",
      },
      {
        id: "term-15-days",
        question: "Ресей ОСАГО полисін 15 күнге рәсімдеуге бола ма?",
        answer:
          "Шетелдік автокөлікті уақытша пайдалану үшін полисті 15 күнге рәсімдеу мүмкін болуы ықтимал. Рәсімдеу мүмкіндігі мен нақты мерзім автокөлік, сақтанушы деректері және сақтандыру компаниясының қолданыстағы ережелері тексерілгеннен кейін расталады.",
      },
      {
        id: "price",
        question:
          "Қазақстандық автокөлікке арналған ОСАГО қанша тұрады?",
        answer:
          "Бірыңғай белгіленген баға жоқ. Құны автокөліктің санаты мен қозғалтқыш қуатына, сақтанушының түріне, сақтандыру мерзіміне, жүргізушілер тізіміне, олардың жасы мен жүргізушілік өтіліне, сондай-ақ қолданылатын тарифтік коэффициенттерге байланысты.",
      },
      {
        id: "price-15-days",
        question: "15 күндік ОСАГО қанша тұрады?",
        answer:
          "15 күндік полистің құны жеке есептеледі. Бағаға автокөлік түрі, қозғалтқыш қуаты, меншік иесі мен жүргізушілер туралы деректер, сақтанушының санаты және сақтандыру компаниясының тарифтері әсер етеді. Нақты сома құжаттар мен автокөлік параметрлері алынғаннан кейін анықталады.",
      },
      {
        id: "documents",
        question: "ОСАГО рәсімдеу үшін қандай құжаттар қажет?",
        answer:
          "Әдетте автокөліктің тіркеу құжаты немесе техникалық паспорты, сақтанушының паспорты не жеке куәлігі, басқаруға жіберілген жүргізушілердің куәліктері, тіркеу нөмірі, VIN және жоспарланған сапар мерзімі қажет. Заңды тұлға үшін ұйымның тіркеу деректері мен оның өкілі туралы мәліметтер қосымша сұратылады.",
      },
      {
        id: "truck",
        question: "Жүк автокөлігіне ОСАГО рәсімдеуге бола ма?",
        answer:
          "Иә, қазақстандық тіркеу нөмірі бар жүк автокөліктеріне өтінімдер қабылданады. Есептеу үшін көлік құралының санаты, қозғалтқыш қуаты, рұқсат етілген ең жоғары массасы, пайдалану сипаты және тіркеу құжаттары қажет.",
      },
      {
        id: "legal-entity",
        question: "ОСАГО полисін заңды тұлғаға рәсімдеуге бола ма?",
        answer:
          "Иә, ұйымға тиесілі автокөлік үшін рәсімдеу мүмкіндігі тексеріледі. Компанияның толық атауы мен тіркеу деректері, өкілі туралы мәліметтер және автокөлік деректерін растайтын құжаттар қосымша қажет болады.",
      },
      {
        id: "what-covers",
        question: "Ресей ОСАГО полисі нені өтейді?",
        answer:
          "ОСАГО жол-көлік оқиғасы кезінде жүргізушінің үшінші тұлғалардың өміріне, денсаулығына немесе мүлкіне келтірген зияны үшін жауапкершілігін шарт талаптары мен заңда белгіленген лимиттер шегінде өтейді.",
      },
      {
        id: "own-car-damage",
        question:
          "ОСАГО өз автокөлігінің зақымдануын өтей ме?",
        answer:
          "Жоқ. ОСАГО кінәлі жүргізушінің автокөлігінің зақымдануын, ұрлануын, бұзылуын, табиғи тозуын, тасымалданатын жүкті немесе жеке заттарды өтемейді. Өз автокөлігін қорғау үшін бөлек каско сақтандыруы қажет.",
      },
      {
        id: "start-date",
        question: "Полис қашан күшіне енеді?",
        answer:
          "Полис сақтандыру құжатында көрсетілген күн мен уақыттан бастап күшіне енеді. Сапарға дейін оның Ресей аумағында автокөлікті пайдалану басталған сәттен кеш емес әрекет ететінін тексеру қажет.",
      },
      {
        id: "same-day",
        question: "Полисті Ресейге кіретін күні рәсімдеуге бола ма?",
        answer:
          "Бұл өтінім берілген уақытқа, құжаттарды тексеру жылдамдығына және сақтандыру компаниясының рәсімдеу ережелеріне байланысты. Жарамды сақтандырусыз көлік жүргізбеу үшін құжаттарды алдын ала жіберу ұсынылады.",
      },
      {
        id: "electronic-policy",
        question: "Электрондық ОСАГО полисінің заңды күші бар ма?",
        answer:
          "Иә. Электрондық ОСАГО полисінің заңды күші бар. Полисті алғаннан кейін ондағы барлық деректерді тексеріп, PDF файлын телефонда сақтау қажет.",
      },
      {
        id: "print-policy",
        question: "Электрондық полисті басып шығару қажет пе?",
        answer:
          "Электрондық полистің қағаз көшірмесі әдетте міндетті емес. Дегенмен интернет болмаған, құрылғының қуаты таусылған немесе тексеру кезінде техникалық мәселе туындаған жағдайда PDF файлын телефонда сақтап, қосымша басып шығарылған көшірмені алып жүрген дұрыс.",
      },
      {
        id: "check",
        question: "Полистің жарамдылығын қалай тексеруге болады?",
        answer:
          "Полисті Ұлттық сақтандыру ақпараттық жүйесінде тексеруге болады. Жүйеде және электрондық құжатта тіркеу нөмірі, VIN, сақтанушы, жүргізушілер және қолданылу мерзімі дұрыс көрсетілгеніне көз жеткізу қажет.",
      },
      {
        id: "valid-all-rf",
        question: "ОСАГО Ресейдің бүкіл аумағында жарамды ма?",
        answer:
          "Ресей ОСАГО полисі шарт талаптары сақталған жағдайда көрсетілген мерзім ішінде Ресей Федерациясының бүкіл аумағында қолданылады.",
      },
      {
        id: "outside-russia",
        question:
          "Ресей ОСАГО полисі Ресейден тыс жерде жарамды ма?",
        answer:
          "Жоқ. Ресей ОСАГО полисі автокөлікті Ресей Федерациясының аумағында пайдалануға арналған. Грузияға, Түркияға, Еуропалық одақ елдеріне немесе басқа мемлекеттерге бару үшін әр елдің сақтандыру талаптарын бөлек тексеріп, тиісті сақтандыруды рәсімдеу қажет.",
      },
      {
        id: "multiple-drivers",
        question: "Полиске бірнеше жүргізушіні енгізуге бола ма?",
        answer:
          "Иә. Полиске автокөлікті басқаруға жіберілген бірнеше жүргізушіні енгізуге болады. Әр жүргізушінің куәлік деректері қажет. Кейбір жағдайларда жүргізушілер тізімі шектелмеген полис қолжетімді болуы мүмкін, бірақ бұл нұсқа полис құнына әсер етеді.",
      },
      {
        id: "accident-russia",
        question: "Ресейде жол-көлік оқиғасы болғанда не істеу керек?",
        answer:
          "Автокөлікті тоқтатып, авариялық жарық сигналын қосып, авариялық тоқтау белгісін қою қажет. Зардап шеккендер болса, дереу төтенше жағдайлар қызметін шақырыңыз. Автокөліктердің орналасуын, зақымдарды, тіркеу нөмірлерін және оқиғаның мән-жайын тіркеп, екінші қатысушымен деректер алмасып, сақтандыру компаниясына хабарлаңыз. Дау туындаса, зардап шеккендер болса, өзге мүлік зақымдалса немесе рәсімдеу тәртібіне күмән болса, полиция қызметкерлерін шақыру қажет.",
      },
      {
        id: "policy-error",
        question:
          "Полис деректерінде қате болса не істеу керек?",
        answer:
          "Полисті алғаннан кейін тіркеу нөмірін, VIN-ді, меншік иесі мен жүргізушілер туралы деректерді және қолданылу мерзімін дереу тексеру қажет. Қате анықталса, PDF файлын өз бетіңізше өзгертуге болмайды. Менеджерге немесе сақтандыру компаниясына дереу хабарласып, қате жолды көрсетіп, растайтын құжатты жіберіңіз. Түзету тәртібі қатенің сипаты мен полисті рәсімдеу кезеңіне байланысты.",
      },
    ],
  },
  commercialTransport: {
  title: "Қазақстаннан келген жүк автокөліктеріне арналған Ресей ОСАГО полисі",
  intro:
    "Тартқыштар, жүк автокөліктері, автобустар және басқа да коммерциялық көлік үшін есептеу жеңіл автокөліктерден бөлек жүргізіледі. Көлік құралының санаты, рұқсат етілген ең жоғары массасы, қозғалтқыш қуаты, пайдалану сипаты, сапар мерзімі және меншік иесі туралы деректер ескеріледі.",

  vehicleTypesTitle: "Қандай коммерциялық көліктерге өтінім беруге болады",
  vehicleTypes: [
    {
      title: "Тартқыштар мен жүк автокөліктері",
      text:
        "Есептеу кезінде көлік құралының санаты, рұқсат етілген ең жоғары массасы, қозғалтқыш қуаты және тасымалдау сипаты ескеріледі.",
    },
    {
      title: "Автобустар мен шағын автобустар",
      text:
        "Рәсімдеу мүмкіндігі көлік санаты, жолаушылар орындарының саны және көлікті пайдалану мақсаты ескеріле отырып тексеріледі.",
    },
    {
      title: "Коммерциялық көлік",
      text:
        "Жүк және жолаушылар тасымалына, қызметтік және өзге де коммерциялық мақсаттарға пайдаланылатын көлікке өтінімдер қабылданады.",
    },
    {
      title: "Заңды тұлғалардың көлігі",
      text:
        "Ұйымға тиесілі автокөлік үшін компанияның деректемелері және өтінім беретін өкіл туралы мәліметтер қосымша қажет болады.",
    },
    {
      title: "Автопарктер",
      text:
        "Бірнеше автокөлік үшін бір өтінім беріп, жалпы есептеу үшін көлік құралдарының тізімін қоса беруге болады.",
    },
    {
      title: "Халықаралық рейстер",
      text:
        "Қазақстан мен Ресей арасында тұрақты рейстер орындайтын көлік үшін сақтандыру мерзімі Ресей аумағында пайдаланылатын бүкіл кезеңді қамтуы тиіс.",
    },
  ],

    fleetTitle: "Бірнеше автокөлікке ОСАГО рәсімдеу",
    fleetText:
      "Егер бірнеше автокөлікті сақтандыру қажет болса, көлік құралдарының санын көрсетіп, автопарк тізімін жүктеңіз. Тексеруден кейін әрбір автокөлік бойынша есеп дайындап, қандай қосымша құжаттар қажет екенін хабарлаймыз.",
    fleetItems: [
      "Өтінімдегі автокөліктер саны",
      "Көлік құралдарының түрлері мен санаттары",
      "Тіркеу нөмірлері және VIN",
      "Қозғалтқыш қуаты немесе рұқсат етілген ең жоғары масса",
      "Меншік иесі — заңды тұлға туралы деректер",
      "Ресей аумағында жоспарланған пайдалану мерзімдері",
      "XLSX, XLS, CSV немесе PDF форматындағы көлік құралдарының тізімі",
    ],
    cta: "Коммерциялық көлікке өтінім беру",
  },
  seo: {
    title:
      "Қазақстаннан Ресейге баратын автокөлікке сақтандыру",
    description:
      "Қазақстандық тіркеу нөмірі бар автокөлікке арналған электрондық Ресей ОСАГО полисі. Құнын есептеу, құжаттарды тексеру және полисті онлайн рәсімдеу.",
    serviceName:
      "Қазақстаннан келген автокөліктерге Ресей ОСАГО полисін рәсімдеу",
    serviceType:
      "Көлік құралдары иелерінің азаматтық-құқықтық жауапкершілігін міндетті сақтандыру",
    audienceName:
      "Қазақстаннан келген жеке тұлғалар, заңды тұлғалар және коммерциялық көлік иелері",
    breadcrumbs: {
      home: "Басты бет",
      services: "Сақтандыру өнімдері",
      current: "Ресей ОСАГО полисі",
    },
    channels: {
      website: "Сайттағы онлайн-өтінім",
      phone: "Телефон арқылы кеңес беру",
      whatsapp: "WhatsApp арқылы кеңес беру",
      telegram: "Telegram арқылы кеңес беру",
    },
  },
};

export function getOsagoRfPageDictionary(lang: Lang): OsagoRfPageDictionary {
  if (lang === "en") return en;
  if (lang === "kz") return kz;
  return ru;
}