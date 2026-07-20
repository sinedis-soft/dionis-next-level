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
};

const ru: OsagoRfPageDictionary = {
  hero: {
    title: "Автостраховка для выезда в Россию из Казахстана",
    subtitle:
      "Российский полис ОСАГО для автомобиля с казахстанскими регистрационными номерами. Проверка документов, расчёт стоимости и получение электронного полиса онлайн.",
    ctaOrder: "Рассчитать ОСАГО",
    factsLabel: "Основные условия",
    facts: [
      "Для автомобилей с номерами Казахстана",
      "Электронный полис ОСАГО",
      "Проверка документов до оплаты",
    ],
    carAlt:
      "Автомобиль с казахстанскими номерами для поездки в Россию",
    policyAlt:
      "Электронный полис российского ОСАГО для автомобиля из Казахстана",
    logoAlt: "Страховой брокер DIONIS",
  },

  questionBlock: {
    title: "Нужна консультация по страховке для поездки в Россию?",
    text1:
      "Расскажем о доступных сроках страхования, порядке расчёта стоимости и документах, необходимых для оформления ОСАГО.",
    text2:
      "Заполните заявку — менеджер проверит данные автомобиля и подтвердит возможность оформления.",
  },

  advantages: {
    title: "Почему ОСАГО оформляют через DIONIS",
    items: [
      {
        icon: "⏱",
        title: "Оформление дистанционно",
        text:
          "Заявку и документы можно передать онлайн без посещения офиса.",
      },
      {
        icon: "📄",
        title: "Электронный полис",
        text:
          "После оформления полис отправляется на e-mail в формате PDF.",
      },
      {
        icon: "🛂",
        title: "Для автомобилей из Казахстана",
        text:
          "Помогаем оформить российское ОСАГО на автомобиль с казахстанскими регистрационными номерами.",
      },
      {
        icon: "💳",
        title: "Проверка до оплаты",
        text:
          "Сначала проверяем документы и параметры автомобиля, затем подтверждаем стоимость и порядок оплаты.",
      },
    ],
  },

  howItWorks: {
    title: "Как оформить российское ОСАГО онлайн",
    subtitle: "Последовательный процесс оформления полиса",
    steps: [
      {
        title: "Оставляете заявку",
        text:
          "Указываете данные автомобиля, водителей и планируемые даты поездки в Россию.",
      },
      {
        title: "Мы проверяем документы",
        text:
          "Менеджер проверяет полученные данные, возможность оформления и доступный срок страхования.",
      },
      {
        title: "Получаете расчёт",
        text:
          "После проверки сообщаем стоимость полиса и направляем реквизиты или ссылку для оплаты.",
      },
      {
        title: "Получаете полис",
        text:
          "После оплаты и завершения оформления отправляем электронный полис ОСАГО на указанный e-mail.",
      },
    ],
  },

  writeUs: {
    title: "Поможем оформить ОСАГО",
    text:
      "Напишите нам — проверим документы, рассчитаем стоимость и подтвердим возможность оформления полиса",
    whatsapp: "Написать в WhatsApp",
    telegram: "Написать в Telegram",
    phone: "Позвонить: +7 (727) 357-30-30",
  },

  info: {
    title: "Что такое российское ОСАГО для автомобиля из Казахстана",
    paragraphs: [
      "ОСАГО — обязательное страхование гражданской ответственности владельца транспортного средства. Полис предназначен для возмещения вреда, который водитель может причинить другим людям или их имуществу в результате ДТП.",
      "Для эксплуатации автомобиля с казахстанскими регистрационными номерами в России необходимо действующее страхование гражданской ответственности, признаваемое на территории РФ. При отсутствии другого подходящего страхового покрытия оформляется российский полис ОСАГО.",
      "ОСАГО не страхует сам автомобиль владельца от повреждения, угона, пожара, стихийных явлений и других рисков. Для защиты собственного автомобиля требуется отдельный договор каско.",
      "Электронный полис имеет юридическую силу. Его данные можно проверить в российской страховой информационной системе.",
    ],
  },

  benefits: {
    title: "Что даёт российский полис ОСАГО",
    imageAlt:
      "Российское ОСАГО для автомобиля с казахстанскими номерами",
    items: [
      {
        title: "Страховое покрытие в России",
        text:
          "Полис подтверждает наличие страхования гражданской ответственности на территории Российской Федерации в течение указанного срока.",
      },
      {
        title: "Возмещение вреда пострадавшим",
        text:
          "Если водитель станет виновником ДТП, страховая компания возмещает вред жизни, здоровью или имуществу третьих лиц в пределах установленных лимитов.",
      },
      {
        title: "Действие во всех регионах РФ",
        text:
          "Полис действует на территории России при соблюдении срока и других условий договора страхования.",
      },
      {
        title: "Срок с учётом поездки",
        text:
          "Период страхования подбирается с учётом планируемых дат поездки и доступных по правилам ОСАГО сроков.",
      },
    ],
  },

  osagoCheckUpsell: {
    title: "Проверить полис ОСАГО",
    text1:
      "Если полис уже оформлен, проверьте его данные в Российской Национальной Страховой Информационной Системе.",
    text2:
      "Проверка позволяет убедиться, что полис зарегистрирован в системе, а сведения об автомобиле, страхователе и сроке действия указаны правильно.",
    btn: "Проверить полис",
    imageAlt: "Проверка российского полиса ОСАГО",
  },

  greenCardUpsell: {
    title: "Планируете поездку в другие страны?",
    text1:
      "Российское ОСАГО предназначено для поездок по территории России. Для въезда в Турцию, страны ЕС и другие государства может потребоваться отдельное международное или пограничное страхование.",
    text2:
      "Сообщите полный маршрут поездки — мы проверим, какое страховое покрытие потребуется для каждой страны.",
    btn: "Проверить маршрут",
    imageAlt:
      "Страхование автомобиля для международной поездки",
  },

  orderPrep: {
    title: "Подготовьте данные для расчёта",
    text:
      "Полный комплект информации позволит быстрее проверить возможность оформления и рассчитать стоимость полиса.",
    items: [
      "СТС или технический паспорт автомобиля",
      "Паспорт или удостоверение личности страхователя",
      "Водительские удостоверения допущенных водителей",
      "Планируемые даты поездки в Россию",
      "Контактный телефон и e-mail для получения полиса",
    ],
  },

  faq: {
    title: "Вопросы об ОСАГО для поездки в Россию",
    intro:
      "Основная информация для владельцев автомобилей с казахстанскими регистрационными номерами.",
    items: [
      {
        id: "mandatory",
        question:
          "Нужна ли страховка для поездки в Россию на автомобиле из Казахстана?",
        answer:
          "Для эксплуатации автомобиля в России необходимо действующее страхование гражданской ответственности, признаваемое на территории РФ. При отсутствии другого подходящего покрытия необходимо оформить российский полис ОСАГО.",
      },
      {
        id: "what-covers",
        question: "Что покрывает российское ОСАГО?",
        answer:
          "Полис покрывает ответственность водителя за вред, причинённый жизни, здоровью или имуществу третьих лиц в результате ДТП, в пределах установленных законодательством и договором лимитов.",
      },
      {
        id: "own-car-damage",
        question:
          "Покрывает ли ОСАГО повреждение автомобиля владельца?",
        answer:
          "Нет. ОСАГО покрывает ответственность перед третьими лицами. Повреждение, угон, пожар и другие риски самого автомобиля страхуются отдельно по договору каско.",
      },
      {
        id: "documents",
        question: "Какие документы нужны для оформления ОСАГО?",
        answer:
          "Обычно требуются регистрационные документы автомобиля, документ страхователя, водительские удостоверения допущенных водителей и планируемые даты поездки. Точный перечень подтверждается после проверки заявки.",
      },
      {
        id: "term",
        question: "На какой срок можно оформить ОСАГО?",
        answer:
          "Доступный срок зависит от действующих правил страхования и параметров автомобиля. Полис должен покрывать весь период эксплуатации автомобиля в России.",
      },
      {
        id: "electronic-policy",
        question: "Действителен ли электронный полис ОСАГО?",
        answer:
          "Да. Электронный полис имеет юридическую силу. Рекомендуем сохранить PDF на телефоне и дополнительно иметь распечатанную копию на случай отсутствия доступа к интернету.",
      },
      {
        id: "check",
        question: "Как проверить оформленный полис?",
        answer:
          "Данные полиса можно проверить в Российской Национальной Страховой Информационной Системе. Сведения об автомобиле и сроке действия должны совпадать с указанными в электронном документе.",
      },
      {
        id: "valid-all-rf",
        question: "Действует ли ОСАГО по всей территории России?",
        answer:
          "Да. Российский полис ОСАГО действует во всех регионах Российской Федерации в течение указанного срока при соблюдении условий договора.",
      },
      {
        id: "start-date",
        question: "Можно ли оформить полис в день въезда?",
        answer:
          "Возможность начала действия полиса в нужную дату зависит от правил оформления и времени проверки документов. Рекомендуем подавать заявку заранее, до начала поездки.",
      },
    ],
  },
};

const en: OsagoRfPageDictionary = {
  hero: {
    title: "Car insurance for travel from Kazakhstan to Russia",
    subtitle:
      "Russian OSAGO motor liability insurance for vehicles with Kazakhstan registration plates. Document verification, price calculation, and electronic policy delivery online.",
    ctaOrder: "Calculate OSAGO price",
    factsLabel: "Key conditions",
    facts: [
      "For vehicles registered in Kazakhstan",
      "Electronic Russian OSAGO policy",
      "Document verification before payment",
    ],
    carAlt:
      "Vehicle with Kazakhstan registration plates travelling to Russia",
    policyAlt:
      "Electronic Russian OSAGO policy for a vehicle registered in Kazakhstan",
    logoAlt: "DIONIS Insurance Broker",
  },

  questionBlock: {
    title: "Need advice on car insurance for travel to Russia?",
    text1:
      "We explain the available insurance periods, pricing procedure, and documents required to arrange Russian OSAGO.",
    text2:
      "Complete the application form, and our manager will verify the vehicle details and confirm whether the policy can be issued.",
  },

  advantages: {
    title: "Why arrange Russian OSAGO through DIONIS",
    items: [
      {
        icon: "⏱",
        title: "Remote application",
        text:
          "You can submit the application and documents online without visiting an office.",
      },
      {
        icon: "📄",
        title: "Electronic policy",
        text:
          "Once issued, the policy is sent to your email address as a PDF file.",
      },
      {
        icon: "🛂",
        title: "For vehicles from Kazakhstan",
        text:
          "We assist with arranging Russian OSAGO for vehicles with Kazakhstan registration plates.",
      },
      {
        icon: "💳",
        title: "Verification before payment",
        text:
          "We first check the documents and vehicle details, then confirm the price and payment procedure.",
      },
    ],
  },

  howItWorks: {
    title: "How to arrange Russian OSAGO online",
    subtitle: "A clear step-by-step policy issuance process",
    steps: [
      {
        title: "Submit an application",
        text:
          "Provide the vehicle details, driver information, and planned travel dates in Russia.",
      },
      {
        title: "We verify the documents",
        text:
          "Our manager checks the submitted information, confirms whether the policy can be issued, and verifies the available insurance period.",
      },
      {
        title: "Receive the quotation",
        text:
          "After verification, we confirm the policy price and send payment details or a payment link.",
      },
      {
        title: "Receive the policy",
        text:
          "Once payment and issuance are complete, we send the electronic OSAGO policy to the specified email address.",
      },
    ],
  },

  writeUs: {
    title: "We will help you arrange Russian OSAGO",
    text:
      "Contact us to have your documents checked, receive a price calculation, and confirm whether the policy can be issued",
    whatsapp: "Message us on WhatsApp",
    telegram: "Message us on Telegram",
    phone: "Call us: +7 (727) 357-30-30",
  },

  info: {
    title: "What Russian OSAGO is for vehicles from Kazakhstan",
    paragraphs: [
      "OSAGO is compulsory motor third-party liability insurance. It is intended to compensate for injury or property damage caused to other people as a result of a road traffic accident.",
      "To operate a vehicle with Kazakhstan registration plates in Russia, the vehicle must have valid motor liability insurance recognized in the Russian Federation. If no other recognized coverage is available, a Russian OSAGO policy must be arranged.",
      "OSAGO does not cover damage to, theft of, fire involving, or other risks affecting the policyholder’s own vehicle. Separate comprehensive motor insurance is required to protect the vehicle itself.",
      "An electronic OSAGO policy has legal validity. Its details can be checked in the Russian insurance information system.",
    ],
  },

  benefits: {
    title: "What Russian OSAGO covers",
    imageAlt:
      "Russian OSAGO insurance for a vehicle with Kazakhstan registration plates",
    items: [
      {
        title: "Liability coverage in Russia",
        text:
          "The policy confirms motor third-party liability coverage in the Russian Federation for the stated insurance period.",
      },
      {
        title: "Compensation for injured third parties",
        text:
          "If the driver is responsible for an accident, the insurer compensates third parties for bodily injury or property damage within the applicable limits.",
      },
      {
        title: "Valid throughout Russia",
        text:
          "The policy applies throughout the Russian Federation, subject to its validity period and other policy conditions.",
      },
      {
        title: "Insurance period based on the trip",
        text:
          "The insurance period is selected according to the planned travel dates and the periods available under Russian OSAGO rules.",
      },
    ],
  },

  osagoCheckUpsell: {
    title: "Check your Russian OSAGO policy",
    text1:
      "If your policy has already been issued, you can verify its details in the Russian National Insurance Information System.",
    text2:
      "The check helps confirm that the policy is registered and that the vehicle, policyholder, and validity-period details are correct.",
    btn: "Check the policy",
    imageAlt: "Verification of a Russian OSAGO policy",
  },

  greenCardUpsell: {
    title: "Planning to travel to other countries?",
    text1:
      "Russian OSAGO is intended for driving in Russia. Separate international or border insurance may be required for travel to Turkey, EU countries, and other states.",
    text2:
      "Send us your full route, and we will check what insurance coverage may be required for each country.",
    btn: "Check your route",
    imageAlt:
      "Motor insurance for an international road trip",
  },

  orderPrep: {
    title: "Prepare the details required for a quotation",
    text:
      "Complete information allows us to verify whether the policy can be issued and calculate the price more quickly.",
    items: [
      "Vehicle registration certificate or technical passport",
      "Passport or identity document of the policyholder",
      "Driving licences of all drivers to be included",
      "Planned travel dates in Russia",
      "Contact phone number and email address for policy delivery",
    ],
  },

  faq: {
    title: "Questions about OSAGO for travel to Russia",
    intro:
      "Key information for owners of vehicles with Kazakhstan registration plates.",
    items: [
      {
        id: "mandatory",
        question:
          "Is insurance required to travel to Russia in a vehicle registered in Kazakhstan?",
        answer:
          "To operate a vehicle in Russia, it must have valid motor liability insurance recognized in the Russian Federation. If no other recognized coverage is available, a Russian OSAGO policy must be arranged.",
      },
      {
        id: "what-covers",
        question: "What does Russian OSAGO cover?",
        answer:
          "The policy covers the driver’s liability for bodily injury or property damage caused to third parties in a road traffic accident, within the limits established by law and the insurance contract.",
      },
      {
        id: "own-car-damage",
        question:
          "Does OSAGO cover damage to the policyholder’s own vehicle?",
        answer:
          "No. OSAGO covers liability to third parties. Damage to, theft of, fire involving, and other risks affecting the insured vehicle require separate comprehensive motor insurance.",
      },
      {
        id: "documents",
        question: "Which documents are required to arrange OSAGO?",
        answer:
          "The required documents usually include the vehicle registration document, the policyholder’s identity document, the driving licences of the listed drivers, and the planned travel dates. The final list is confirmed after the application is reviewed.",
      },
      {
        id: "term",
        question: "For how long can Russian OSAGO be arranged?",
        answer:
          "The available period depends on the applicable insurance rules and the vehicle details. The policy must cover the entire period during which the vehicle will be used in Russia.",
      },
      {
        id: "electronic-policy",
        question: "Is an electronic OSAGO policy valid?",
        answer:
          "Yes. An electronic OSAGO policy has legal validity. We recommend saving the PDF on your phone and carrying a printed copy in case internet access is unavailable.",
      },
      {
        id: "check",
        question: "How can I verify an issued policy?",
        answer:
          "The policy details can be checked in the Russian National Insurance Information System. The vehicle details and validity period should match the information shown in the electronic policy.",
      },
      {
        id: "valid-all-rf",
        question: "Is Russian OSAGO valid throughout Russia?",
        answer:
          "Yes. A Russian OSAGO policy applies in all regions of the Russian Federation during its stated validity period, subject to the policy conditions.",
      },
      {
        id: "start-date",
        question: "Can the policy be arranged on the day of entry?",
        answer:
          "Whether the policy can start on the required date depends on the issuance rules and the time needed to verify the documents. We recommend applying before the trip begins.",
      },
    ],
  },
};

const kz: OsagoRfPageDictionary = {
  hero: {
    title: "Қазақстаннан Ресейге баруға арналған автосақтандыру",
    subtitle:
      "Қазақстандық тіркеу нөмірі бар автокөлікке арналған ресейлік ОСАГО полисі. Құжаттарды тексеру, құнын есептеу және электрондық полисті онлайн алу.",
    ctaOrder: "ОСАГО құнын есептеу",
    factsLabel: "Негізгі шарттар",
    facts: [
      "Қазақстандық нөмірі бар автокөліктерге",
      "Электрондық ОСАГО полисі",
      "Төлемге дейін құжаттарды тексеру",
    ],
    carAlt:
      "Ресейге баруға арналған қазақстандық нөмірі бар автокөлік",
    policyAlt:
      "Қазақстандық автокөлікке арналған электрондық ресейлік ОСАГО полисі",
    logoAlt: "DIONIS сақтандыру брокері",
  },

  questionBlock: {
    title: "Ресейге баруға арналған сақтандыру бойынша кеңес керек пе?",
    text1:
      "Сақтандырудың қолжетімді мерзімдері, құнын есептеу тәртібі және ОСАГО рәсімдеуге қажетті құжаттар туралы түсіндіреміз.",
    text2:
      "Өтінімді толтырыңыз — менеджер автокөлік деректерін тексеріп, полисті рәсімдеу мүмкіндігін растайды.",
  },

  advantages: {
    title: "ОСАГО полисін DIONIS арқылы рәсімдеудің артықшылықтары",
    items: [
      {
        icon: "⏱",
        title: "Қашықтан рәсімдеу",
        text:
          "Өтінім мен құжаттарды кеңсеге бармай-ақ онлайн жіберуге болады.",
      },
      {
        icon: "📄",
        title: "Электрондық полис",
        text:
          "Рәсімделгеннен кейін полис PDF форматында e-mail арқылы жіберіледі.",
      },
      {
        icon: "🛂",
        title: "Қазақстандық автокөліктерге",
        text:
          "Қазақстандық тіркеу нөмірі бар автокөлікке ресейлік ОСАГО рәсімдеуге көмектесеміз.",
      },
      {
        icon: "💳",
        title: "Төлемге дейін тексеру",
        text:
          "Алдымен құжаттар мен автокөлік деректерін тексереміз, содан кейін құны мен төлем тәртібін растаймыз.",
      },
    ],
  },

  howItWorks: {
    title: "Ресейлік ОСАГО полисін онлайн қалай рәсімдеуге болады",
    subtitle: "Полисті рәсімдеудің кезең-кезеңімен жүргізілетін тәртібі",
    steps: [
      {
        title: "Өтінім бересіз",
        text:
          "Автокөлік, жүргізушілер және Ресейге жоспарланған сапар мерзімі туралы деректерді көрсетесіз.",
      },
      {
        title: "Құжаттарды тексереміз",
        text:
          "Менеджер берілген ақпаратты, полисті рәсімдеу мүмкіндігін және қолжетімді сақтандыру мерзімін тексереді.",
      },
      {
        title: "Есептеуді аласыз",
        text:
          "Тексеруден кейін полистің құнын хабарлап, төлем деректемелерін немесе төлем сілтемесін жібереміз.",
      },
      {
        title: "Полисті аласыз",
        text:
          "Төлем жасалып, рәсімдеу аяқталғаннан кейін электрондық ОСАГО полисін көрсетілген e-mail мекенжайына жібереміз.",
      },
    ],
  },

  writeUs: {
    title: "ОСАГО рәсімдеуге көмектесеміз",
    text:
      "Бізге жазыңыз — құжаттарды тексеріп, құнын есептеп, полисті рәсімдеу мүмкіндігін растаймыз",
    whatsapp: "WhatsApp арқылы жазу",
    telegram: "Telegram арқылы жазу",
    phone: "Қоңырау шалу: +7 (727) 357-30-30",
  },

  info: {
    title: "Қазақстандық автокөлікке арналған ресейлік ОСАГО дегеніміз не",
    paragraphs: [
      "ОСАГО — көлік иесінің азаматтық-құқықтық жауапкершілігін міндетті сақтандыру. Полис жол-көлік оқиғасы салдарынан басқа адамдардың өміріне, денсаулығына немесе мүлкіне келтірілген зиянды өтеуге арналған.",
      "Қазақстандық тіркеу нөмірі бар автокөлікті Ресей аумағында пайдалану үшін РФ аумағында танылатын азаматтық жауапкершілік сақтандыруы болуы қажет. Егер басқа жарамды сақтандыру өтемі болмаса, ресейлік ОСАГО полисі рәсімделеді.",
      "ОСАГО автокөлік иесінің өз көлігін зақымданудан, ұрланудан, өрттен, табиғи апаттардан және басқа тәуекелдерден қорғамайды. Өз автокөлігіңізді қорғау үшін каско шарты қажет.",
      "Электрондық полистің заңды күші бар. Оның деректерін Ресейдің сақтандыру ақпараттық жүйесінде тексеруге болады.",
    ],
  },

  benefits: {
    title: "Ресейлік ОСАГО полисі қандай қорғау береді",
    imageAlt:
      "Қазақстандық тіркеу нөмірі бар автокөлікке арналған ресейлік ОСАГО",
    items: [
      {
        title: "Ресей аумағындағы сақтандыру өтемі",
        text:
          "Полис көрсетілген мерзім ішінде Ресей Федерациясының аумағында азаматтық жауапкершіліктің сақтандырылғанын растайды.",
      },
      {
        title: "Зардап шеккендерге зиянды өтеу",
        text:
          "Егер жүргізуші жол-көлік оқиғасына кінәлі болса, сақтандыру компаниясы үшінші тұлғалардың өміріне, денсаулығына немесе мүлкіне келтірілген зиянды белгіленген лимиттер шегінде өтейді.",
      },
      {
        title: "Ресейдің барлық өңірінде жарамды",
        text:
          "Полис сақтандыру шартының мерзімі мен өзге де талаптары сақталған жағдайда Ресей аумағында қолданылады.",
      },
      {
        title: "Сапар мерзіміне сәйкес кезең",
        text:
          "Сақтандыру кезеңі жоспарланған сапар күндері мен ОСАГО ережелерінде қолжетімді мерзімдер ескеріле отырып таңдалады.",
      },
    ],
  },

  osagoCheckUpsell: {
    title: "ОСАГО полисін тексеру",
    text1:
      "Егер полис рәсімделген болса, оның деректерін Ресейдің Ұлттық сақтандыру ақпараттық жүйесінде тексеруге болады.",
    text2:
      "Тексеру полистің жүйеде тіркелгенін және автокөлік, сақтанушы мен қолданылу мерзімі туралы деректердің дұрыс көрсетілгенін растауға мүмкіндік береді.",
    btn: "Полисті тексеру",
    imageAlt: "Ресейлік ОСАГО полисін тексеру",
  },

  greenCardUpsell: {
    title: "Басқа елдерге сапар жоспарлап отырсыз ба?",
    text1:
      "Ресейлік ОСАГО тек Ресей аумағында жүруге арналған. Түркияға, ЕО елдеріне және басқа мемлекеттерге кіру үшін бөлек халықаралық немесе шекаралық сақтандыру қажет болуы мүмкін.",
    text2:
      "Сапардың толық бағытын хабарлаңыз — әр ел үшін қандай сақтандыру қажет екенін тексереміз.",
    btn: "Бағытты тексеру",
    imageAlt:
      "Халықаралық автосапарға арналған сақтандыру",
  },

  orderPrep: {
    title: "Есептеу үшін қажетті деректерді дайындаңыз",
    text:
      "Толық ақпарат полисті рәсімдеу мүмкіндігін жылдам тексеруге және оның құнын есептеуге көмектеседі.",
    items: [
      "Автокөліктің тіркеу куәлігі немесе техникалық паспорты",
      "Сақтанушының паспорты немесе жеке куәлігі",
      "Көлікті басқаруға жіберілетін жүргізушілердің жүргізуші куәліктері",
      "Ресейге жоспарланған сапар күндері",
      "Полисті алу үшін байланыс телефоны және e-mail",
    ],
  },

  faq: {
    title: "Ресейге баруға арналған ОСАГО туралы сұрақтар",
    intro:
      "Қазақстандық тіркеу нөмірі бар автокөлік иелеріне арналған негізгі ақпарат.",
    items: [
      {
        id: "mandatory",
        question:
          "Қазақстандық автокөлікпен Ресейге бару үшін сақтандыру қажет пе?",
        answer:
          "Ресей аумағында автокөлікті пайдалану үшін РФ-та танылатын азаматтық жауапкершілік сақтандыруы қажет. Егер басқа жарамды сақтандыру өтемі болмаса, ресейлік ОСАГО полисін рәсімдеу керек.",
      },
      {
        id: "what-covers",
        question: "Ресейлік ОСАГО нені өтейді?",
        answer:
          "Полис жол-көлік оқиғасы салдарынан жүргізушінің үшінші тұлғалардың өміріне, денсаулығына немесе мүлкіне келтірген зияны үшін жауапкершілігін заңнамада және шартта белгіленген лимиттер шегінде өтейді.",
      },
      {
        id: "own-car-damage",
        question:
          "ОСАГО автокөлік иесінің өз көлігінің зақымдануын өтей ме?",
        answer:
          "Жоқ. ОСАГО үшінші тұлғалар алдындағы жауапкершілікті өтейді. Автокөліктің зақымдануы, ұрлануы, өртенуі және басқа тәуекелдер каско шарты бойынша бөлек сақтандырылады.",
      },
      {
        id: "documents",
        question: "ОСАГО рәсімдеу үшін қандай құжаттар қажет?",
        answer:
          "Әдетте автокөліктің тіркеу құжаттары, сақтанушының жеке басын куәландыратын құжат, жүргізушілердің жүргізуші куәліктері және жоспарланған сапар күндері қажет. Нақты тізім өтінім тексерілгеннен кейін расталады.",
      },
      {
        id: "term",
        question: "ОСАГО полисін қандай мерзімге рәсімдеуге болады?",
        answer:
          "Қолжетімді мерзім қолданыстағы сақтандыру ережелеріне және автокөлік параметрлеріне байланысты. Полис автокөліктің Ресей аумағында пайдаланылатын бүкіл кезеңін қамтуы тиіс.",
      },
      {
        id: "electronic-policy",
        question: "Электрондық ОСАГО полисі жарамды ма?",
        answer:
          "Иә. Электрондық полистің заңды күші бар. PDF файлын телефонда сақтап, интернет болмаған жағдайға қағаз көшірмесін бірге алып жүруді ұсынамыз.",
      },
      {
        id: "check",
        question: "Рәсімделген полисті қалай тексеруге болады?",
        answer:
          "Полис деректерін Ресейдің Ұлттық сақтандыру ақпараттық жүйесінде тексеруге болады. Автокөлік туралы мәліметтер мен қолданылу мерзімі электрондық құжаттағы деректермен сәйкес келуі тиіс.",
      },
      {
        id: "valid-all-rf",
        question: "ОСАГО Ресейдің барлық аумағында жарамды ма?",
        answer:
          "Иә. Ресейлік ОСАГО полисі шарт талаптары сақталған жағдайда көрсетілген мерзім ішінде Ресей Федерациясының барлық өңірінде қолданылады.",
      },
      {
        id: "start-date",
        question: "Полисті Ресейге кіретін күні рәсімдеуге бола ма?",
        answer:
          "Полистің қажетті күні күшіне ену мүмкіндігі рәсімдеу ережелері мен құжаттарды тексеру уақытына байланысты. Өтінімді сапар басталғанға дейін алдын ала беруді ұсынамыз.",
      },
    ],
  },
};

export function getOsagoRfPageDictionary(lang: Lang): OsagoRfPageDictionary {
  if (lang === "en") return en;
  if (lang === "kz") return kz;
  return ru;
}
