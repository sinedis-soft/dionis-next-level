import type { Lang } from "./header";

export type OsagoRfPageDictionary = {
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

  advantages: {
    title: string;
    items: {
      icon: string;
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

  greenCardUpsell: {
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

const ru: OsagoRfPageDictionary = {
  hero: {
    title: "ЗЕЛЕНАЯ КАРТА В РОССИЮ",
    subtitle:
      "Обязательный страховой полис для въезда и передвижения по территории России на автомобиле с иностранными номерами.",
    ctaOrder: "Оформить ОГПО в РФ",
    carAlt: "Автомобиль с иностранными номерами и полисом ОСАГО РФ",
    policyAlt: "Электронный полис ОСАГО РФ для нерезидентов",
    logoAlt: "Dionis Insurance Broker",
  },

  questionBlock: {
    title: "Нужна консультация по ОГПО в РФ?",
    text1:
      "Подскажем по срокам действия, стоимости и требованиям для нерезидентов.",
    text2:
      "Для оформления полиса заполните заявку выше — это займёт несколько минут.",
  },

  advantages: {
    title: "Почему оформляют ОГПО в РФ через «Дионис»",
    items: [
      {
        icon: "⏱",
        title: "Быстрое оформление онлайн",
        text:
          "Оформление полиса без визита в офис. Все данные передаются дистанционно.",
      },
      {
        icon: "📄",
        title: "Электронный полис",
        text:
          "Полис приходит на e-mail в формате PDF и признаётся на всей территории РФ.",
      },
      {
        icon: "🛂",
        title: "Подходит для нерезидентов",
        text:
          "Оформляем ОСАГО для автомобилей с иностранной регистрацией.",
      },
      {
        icon: "💳",
        title: "Прозрачная оплата",
        text:
          "Оплата картой или банковским переводом без скрытых комиссий.",
      },
    ],
  },

  howItWorks: {
    title: "Как оформить ОГПО в РФ (ОСАГО РФ)",
    subtitle: "Пошаговый процесс без лишних действий",
    steps: [
      {
        title: "Оставляете заявку",
        text:
          "Заполняете форму с данными автомобиля и планируемым сроком поездки.",
      },
      {
        title: "Проверяем и уточняем данные",
        text:
          "Менеджер проверяет корректность информации и подтверждает условия.",
      },
      {
        title: "Оплачиваете полис",
        text:
          "Оплата онлайн — картой или по счёту. Подходит для физических и юридических лиц.",
      },
      {
        title: "Получаете ОСАГО",
        text:
          "Готовый электронный полис отправляем на e-mail. Обычно в течение 15–20 минут.",
      },
    ],
  },

  writeUs: {
    title: "Быстрое оформление",
    text: "Напишите нам — оформим полис за 20 минут",
    whatsapp: "Написать нам в WhatsApp",
    telegram: "Написать нам в Telegram",
  },

  info: {
    title: "Что такое ОСАГО РФ для нерезидентов",
    
    paragraphs: [
      "ОСАГО — обязательное страхование гражданской ответственности владельцев транспортных средств. Для автомобилей с иностранной регистрацией наличие полиса ОСАГО обязательно при въезде и передвижении по территории Российской Федерации.",
      "Полис покрывает ответственность водителя за вред, причинённый жизни, здоровью или имуществу третьих лиц в результате ДТП на территории РФ.",
      "Электронный полис ОСАГО официально признаётся сотрудниками ГИБДД, пограничной службой и другими контролирующими органами.",
    ],
  },

  benefits: {
    title: "Преимущества ОСАГО РФ для нерезидентов",
    imageAlt: "ОСАГО РФ для нерезидентов — оформление онлайн",
    items: [
      {
        title: "Законный въезд и передвижение",
        text:
          "Наличие полиса ОГПО в РФ обязательно для легального передвижения по дорогам РФ на автомобиле с иностранными номерами.",
      },
      {
        title: "Финансовая защита при ДТП",
        text:
          "В случае аварии страховая компания возмещает ущерб пострадавшим в рамках установленных лимитов.",
      },
      {
        title: "Признание по всей территории РФ",
        text:
          "Полис действует во всех регионах России без ограничений.",
      },
      {
        title: "Гибкий срок страхования",
        text:
          "Можно оформить ОСАГО на период поездки — без переплаты за лишние месяцы.",
      },
    ],
  },

  greenCardUpsell: {
    title: "Планируете поездки в Турцию или ЕС?",
    text1:
      "Для поездок в страны ЕС и другие государства может потребоваться полис «Зелёная карта».",
    text2:
      "Мы поможем подобрать оптимальное покрытие и объединить маршруты в одной страховой программе.",
    btn: "Узнать о Зеленой карте",
    imageAlt: "Полис Зеленая карта для международных поездок",
  },

  faq: {
  title: "Вопросы по ОСАГО РФ для нерезидентов",
  intro: "Ответы на самые частые вопросы перед оформлением полиса.",
  items: [
    // --- старые вопросы ---
    {
      id: "mandatory",
      question: "Обязательно ли ОСАГО для иностранного автомобиля?",
      answer:
        "Да. При въезде и эксплуатации автомобиля с иностранной регистрацией на территории РФ наличие полиса ОСАГО обязательно.",
    },
    {
      id: "electronic-policy",
      question: "Можно ли использовать электронный полис?",
      answer:
        "Да. Электронный полис ОГПО в РФ официально признаётся и не требует бумажного оригинала.",
    },
    {
      id: "term",
      question: "На какой срок лучше оформлять ОСАГО?",
      answer:
        "Полис должен покрывать весь период нахождения автомобиля в РФ. Обычно оформляют с небольшим запасом по датам.",
    },
    {
      id: "check",
      question: "Кто может проверить наличие ОСАГО?",
      answer:
        "Сотрудники ГИБДД, пограничные службы, а также при оформлении ДТП.",
    },

    // --- НОВОЕ: из INFO ---
    {
      id: "what-is-osago",
      question: "Что такое ОСАГО РФ для нерезидентов?",
      answer:
        "ОСАГО — обязательное страхование гражданской ответственности владельцев транспортных средств. Для автомобилей с иностранной регистрацией полис обязателен при въезде и передвижении по территории РФ.",
    },
    {
      id: "what-covers",
      question: "Что покрывает ОГПО в РФ при ДТП?",
      answer:
        "Полис покрывает ответственность водителя за вред, причинённый жизни, здоровью или имуществу третьих лиц в результате ДТП на территории РФ — в пределах установленных лимитов.",
    },
    {
      id: "is-eosago-valid",
      question: "Признают ли электронный ОСАГО сотрудники ГИБДД и на границе?",
      answer:
        "Да. Электронный полис официально признаётся сотрудниками ГИБДД, пограничной службой и другими контролирующими органами.",
    },

    // --- НОВОЕ: из BENEFITS ---
    {
      id: "legal-driving",
      question: "Зачем ОСАГО нужно нерезиденту на авто с иностранными номерами?",
      answer:
        "Полис ОСАГО обязателен для легального передвижения по дорогам РФ на автомобиле с иностранной регистрацией.",
    },
    {
      id: "financial-protection",
      question: "Какая финансовая защита даёт ОСАГО?",
      answer:
        "При ДТП страховая компания возмещает ущерб пострадавшим в рамках установленных лимитов — это снижает риск крупных личных расходов.",
    },
    {
      id: "valid-all-rf",
      question: "Действует ли ОСАГО по всей территории России?",
      answer:
        "Да. Полис действует во всех регионах РФ без территориальных ограничений (при соблюдении условий договора).",
    },
    {
      id: "flex-term",
      question: "Можно ли оформить ОГПО в РФ только на срок поездки?",
      answer:
        "Да. Обычно можно подобрать срок так, чтобы он покрывал период пребывания в РФ и не переплачивать за лишние месяцы.",
    },
  ],
  },
}

const en: OsagoRfPageDictionary = {
  hero: {
    title: "MTPL in Russia for Kazakh-registered vehicles",
    subtitle:
      "Mandatory motor third-party liability insurance required to enter and drive within the Russian Federation with foreign license plates.",
    ctaOrder: "Get MTPL for Russia",
    carAlt: "Vehicle with foreign plates and Russian MTPL policy",
    policyAlt: "Electronic MTPL policy for non-residents",
    logoAlt: "Dionis Insurance Broker",
  },

  questionBlock: {
    title: "Need консультаtion on MTPL for Russia?",
    text1:
      "We clarify validity period, pricing and requirements for non-residents.",
    text2:
      "To issue a policy, complete the application form above. It takes only a few minutes.",
  },

  advantages: {
    title: "Why clients arrange MTPL in Russia via Dionis",
    items: [
      {
        icon: "⏱",
        title: "Fast online issuance",
        text:
          "No office visit required. All data is submitted remotely.",
      },
      {
        icon: "📄",
        title: "Electronic policy (PDF)",
        text:
          "The policy is sent by email in PDF format and is valid throughout the Russian Federation.",
      },
      {
        icon: "🛂",
        title: "Suitable for non-residents",
        text:
          "We arrange MTPL for vehicles with foreign registration.",
      },
      {
        icon: "💳",
        title: "Transparent payment",
        text:
          "Card payment or bank transfer without hidden fees.",
      },
    ],
  },

  howItWorks: {
    title: "How to obtain MTPL in Russia",
    subtitle: "Clear step-by-step process",
    steps: [
      {
        title: "Submit an application",
        text:
          "Provide vehicle details and planned travel period.",
      },
      {
        title: "Data verification",
        text:
          "We check information accuracy and confirm conditions.",
      },
      {
        title: "Payment",
        text:
          "Online card payment or bank transfer. Available for individuals and companies.",
      },
      {
        title: "Receive the policy",
        text:
          "Electronic MTPL is sent by email, usually within 15–20 minutes.",
      },
    ],
  },

  info: {
    title: "What is MTPL in Russia for non-residents",
    paragraphs: [
      "MTPL is mandatory motor third-party liability insurance. For vehicles registered abroad, a valid MTPL policy is required when entering and operating within the Russian Federation.",
      "The policy covers the driver’s liability for damage caused to third parties’ life, health or property as a result of a traffic accident in Russia.",
      "Electronic MTPL policies are officially recognized by traffic police and other supervisory authorities.",
    ],
  },

  writeUs: {
    title: "Quick application",
    text: "Write to us — we will issue the policy in 20 minutes",
    whatsapp: "Message us on WhatsApp",
    telegram: "Message us on Telegram",
  },

  benefits: {
    title: "Key benefits of MTPL in Russia",
    imageAlt: "Online MTPL for foreign vehicles in Russia",
    items: [
      {
        title: "Legal driving in Russia",
        text:
          "MTPL is mandatory for lawful operation of a foreign-registered vehicle on Russian roads.",
      },
      {
        title: "Financial protection",
        text:
          "In case of an accident, the insurer compensates third parties within statutory limits.",
      },
      {
        title: "Valid across Russia",
        text:
          "The policy applies in all regions of the Russian Federation.",
      },
      {
        title: "Flexible duration",
        text:
          "You may choose the period corresponding to your stay in Russia.",
      },
    ],
  },

  greenCardUpsell: {
    title: "Planning trips to the EU or Turkey?",
    text1:
      "For travel to EU countries and certain other states, a Green Card policy may be required.",
    text2:
      "We help structure coverage for multi-country routes.",
    btn: "Learn about Green Card",
    imageAlt: "Green Card motor insurance for international travel",
  },

  faq: {
    title: "FAQ on MTPL in Russia for non-residents",
    intro: "Answers to common questions before issuing a policy.",
    items: [
      {
        id: "mandatory",
        question: "Is MTPL mandatory for foreign vehicles?",
        answer:
          "Yes. A valid MTPL policy is required when entering and using a foreign-registered vehicle in Russia.",
      },
      {
        id: "electronic-policy",
        question: "Is an electronic policy sufficient?",
        answer:
          "Yes. Electronic MTPL policies are legally recognized.",
      },
      {
        id: "term",
        question: "What duration should be selected?",
        answer:
          "The policy must cover the entire period of stay in Russia.",
      },
      {
        id: "check",
        question: "Who may verify MTPL validity?",
        answer:
          "Traffic police, border authorities and in case of an accident.",
      },
      {
        id: "what-is-osago",
        question: "What does MTPL cover?",
        answer:
          "Liability for damage to third parties’ life, health or property resulting from a traffic accident in Russia.",
      },
    ],
  },
};

const kz: OsagoRfPageDictionary = {
  hero: {
    title: "Ресейге жасыл карта",
    subtitle:
      "Шетелдік тіркеудегі автокөлікпен Ресей Федерациясына кіру және қозғалу үшін міндетті азаматтық-құқықтық жауапкершілік сақтандыруы. РФ аумағында қазақстандық көлікке арналған МІАЖ (ОСАГО)",
    ctaOrder: "РФ үшін МІАЖ рәсімдеу",
    carAlt: "Шетелдік нөмірлі автокөлік және РФ МІАЖ полисі",
    policyAlt: "Резидент емес тұлғаларға арналған электрондық ОСАГО",
    logoAlt: "Dionis Insurance Broker",
  },

  questionBlock: {
    title: "РФ бойынша МІАЖ туралы кеңес керек пе?",
    text1:
      "Қолданылу мерзімі, құны және резидент емес тұлғаларға қойылатын талаптар бойынша түсіндіреміз.",
    text2:
      "Полис рәсімдеу үшін жоғарыдағы өтінімді толтырыңыз.",
  },

  advantages: {
    title: "Неліктен МІАЖ-ды «Дионис» арқылы рәсімдейді",
    items: [
      {
        icon: "⏱",
        title: "Онлайн рәсімдеу",
        text:
          "Кеңсеге барудың қажеті жоқ. Барлық деректер қашықтан беріледі.",
      },
      {
        icon: "📄",
        title: "Электрондық полис",
        text:
          "Полис e-mail арқылы PDF форматында жіберіледі және РФ аумағында жарамды.",
      },
      {
        icon: "🛂",
        title: "Резидент еместерге арналған",
        text:
          "Шетелдік тіркеудегі автокөліктер үшін рәсімдейміз.",
      },
      {
        icon: "💳",
        title: "Айқын төлем",
        text:
          "Банк картасы немесе аударым арқылы төлем.",
      },
    ],
  },

  howItWorks: {
    title: "РФ үшін МІАЖ қалай рәсімделеді",
    subtitle: "Қарапайым кезеңдер",
    steps: [
      {
        title: "Өтінім беру",
        text:
          "Көлік деректерін және сапар мерзімін көрсетесіз.",
      },
      {
        title: "Деректерді тексеру",
        text:
          "Ақпараттың дұрыстығын тексеріп, шарттарды нақтылаймыз.",
      },
      {
        title: "Төлем жасау",
        text:
          "Онлайн төлем немесе банк аударымы.",
      },
      {
        title: "Полисті алу",
        text:
          "Электрондық полис e-mail арқылы жіберіледі.",
      },
    ],
  },

  info: {
    title: "РФ үшін ОСАГО дегеніміз не",
    paragraphs: [
      "ОСАГО — көлік иелерінің азаматтық-құқықтық жауапкершілігін міндетті сақтандыру.",
      "Шетелдік тіркеудегі автокөлікпен РФ аумағында жүру үшін жарамды полис міндетті.",
      "Электрондық полис РФ бақылаушы органдарымен ресми түрде танылады.",
    ],
  },

  writeUs: {
    title: "Жылдам рәсімдеу",
    text: "Бізге жазыңыз — полисті 20 минут ішінде рәсімдейміз",
    whatsapp: "WhatsApp арқылы жазу",
    telegram: "Telegram арқылы жазу",
  },

  benefits: {
    title: "РФ үшін МІАЖ артықшылықтары",
    imageAlt: "РФ аумағында онлайн МІАЖ рәсімдеу",
    items: [
      {
        title: "Заңды қозғалыс",
        text:
          "Полис РФ аумағында заңды түрде жүруге мүмкіндік береді.",
      },
      {
        title: "Қаржылық қорғау",
        text:
          "ЖКО кезінде үшінші тұлғаларға келтірілген залал сақтандыру лимиттері шегінде өтеледі.",
      },
      {
        title: "РФ бойынша жарамды",
        text:
          "Барлық аймақтарда қолданылады.",
      },
      {
        title: "Икемді мерзім",
        text:
          "Сапар мерзіміне сәйкес рәсімдеуге болады.",
      },
    ],
  },

  greenCardUpsell: {
    title: "ЕО немесе Түркияға сапар жоспарлап отырсыз ба?",
    text1:
      "Кейбір елдерге бару үшін «Жасыл карта» полисі қажет болуы мүмкін.",
    text2:
      "Маршрутыңызға сәйкес сақтандыру шешімін ұсынамыз.",
    btn: "Жасыл карта туралы білу",
    imageAlt: "Халықаралық сапарға арналған Жасыл карта",
  },

  faq: {
    title: "РФ үшін МІАЖ бойынша сұрақтар",
    intro: "Полис рәсімдеу алдындағы негізгі сұрақтар.",
    items: [
      {
        id: "mandatory",
        question: "Шетелдік көлік үшін ОСАГО міндетті ме?",
        answer:
          "Иә. РФ аумағында жүру үшін жарамды полис болуы қажет.",
      },
      {
        id: "electronic-policy",
        question: "Электрондық полис жарамды ма?",
        answer:
          "Иә. Электрондық полис ресми түрде танылады.",
      },
      {
        id: "term",
        question: "Қандай мерзімге рәсімдеген дұрыс?",
        answer:
          "Полис РФ аумағында болу мерзімін толық қамтуы тиіс.",
      },
      {
        id: "check",
        question: "Полисті кім тексере алады?",
        answer:
          "Жол полициясы және шекара қызметі.",
      },
    ],
  },
};

export function getOsagoRfPageDictionary(lang: Lang): OsagoRfPageDictionary {
  if (lang === "en") return en;
  if (lang === "kz") return kz;
  return ru;
}