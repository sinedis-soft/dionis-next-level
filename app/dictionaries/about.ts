// dictionaries/about.ts
import type { Lang } from "@/dictionaries/header";

export type AboutFeature = {
  title: string;
  text: string;
};

export type AboutLegal = {
  orgTitle: string;
  headerLines: string[];
  body: string[]; // строки, включая пустые и "• ..." для списков
};

export type AboutDictionary = {
  seo: { title: string; description: string };
  pageTitle: string; // H1
  about: {
    leadTitle: string;
    features: AboutFeature[];
    cta: string;
  };
  legal: AboutLegal;
};

const ru: AboutDictionary = {
  seo: {
    title: "Dionis — лицензированный страховой брокер",
    description:
      "О компании Dionis: статус страхового брокера, специализация, принципы работы и официальное раскрытие информации.",
  },

  // H1
  pageTitle: "Dionis - лицензированный страховой брокер",

  about: {
    leadTitle: "Кто мы и чем полезны",

    features: [
      {
        title: "СТАТУС И ПРАВОВАЯ ОСНОВА",
        text:
          "Dionis работает как страховой брокер. Мы действуем в рамках законодательства, раскрываем обязательную информацию о компании, лицензии и видах деятельности. Наша задача — организовать страхование корректно: по правилам страховщика и с учётом требований маршрута/рисков клиента.",
      },
      {
        title: "СПЕЦИАЛИЗАЦИЯ: МЕЖДУНАРОДНЫЕ ПОЕЗДКИ И ПЕРЕВОЗКИ",
        text:
          "Основные направления: оформление международной «Зелёной карты», ОСАГО РФ для нерезидентов, страхование грузов и ответственности. Мы ориентируемся на практические задачи клиентов: въезд/транзит, требования границы, сроки, территория действия, документы.",
      },
      {
        title: "ПРОЗРАЧНЫЕ УСЛОВИЯ И ДОКУМЕНТЫ",
        text:
          "Мы не продаём «красивые обещания». До оформления фиксируем ключевые параметры: объект страхования, период, территорию, лимиты и исключения. Это снижает риск ошибок и недопонимания и делает результат проверяемым — по договору и правилам страхования.",
      },
      {
        title: "ПРОЦЕСС: ОТ ЗАЯВКИ ДО ПОЛИСА",
        text:
          "Работаем через понятный процесс: получение данных → проверка и уточнение → подбор решения → согласование условий → оплата → выдача полиса и инструкции. Если нужно, подскажем, какие документы подготовить для границы и какие нюансы важны по конкретной стране/маршруту.",
      },
    ],

    cta:
      "Если вам нужно оформить страховку для международной поездки или перевозки — отправьте запрос. Мы подтвердим возможность оформления, перечень документов и условия по вашему маршруту.",
  },
  legal: {
    orgTitle: "Товарищество с ограниченной ответственностью «Страховой брокер Дионис»",
    headerLines: [
      "050009 (A05B4Y6), Республика Казахстан, город Алматы,",
      "Алматинский район, улица Ауэзова, дом 14А",
      "БИН 230440027776,",
      "ИИК KZ098562203129699871",
      "в АО «Банк ЦентрКредит», БИК KCJBKZKX,",
      "+375 44 703 03 03",
      "dionis-insurance.kz",
      "info@dionis-insurance.kz",
    ],
    body: [
      "Информация, указанная в подпунктах 1), 3), 4), 5), 6), 7), 8), 9), 10 пункта статьи 16 Закона РК “О страховой деятельности”:",
      "Полное наименование: Товарищество с ограниченной ответственностью “Страховой брокер Дионис”.",
      "Место нахождение: 050009 (A05B4Y6), Республика Казахстан, город Алматы, Алматинский район, улица Ауэзова, дом 14А.",
      "Контактный номер: +7(727) 357-30-30, +375 44 703 03 03, +375 44 531 52 82.",
      "Режим работы: с 9.00 по 18.00.",
      "Филиалы и представительства у Страхового брокера не имются.",
      "",
      "Сведения о руководящих работниках:",
      "Директор – Боровой Денис Федорович.",
      "Главный бухгалтер – Кислая Анастасия Валерьевна.",
      "",
      "Сведения о государственном регистрационном номере: 24270.",
      "БИН 230440027776.",
      "",
      "Лицензия на право осуществления деятельности страхового брокера № 2.3.2 от 05.09.2023.",
      "",
      "Сведения об осуществляемых видах деятельности Страхового брокера:",
      "• посредническая деятельность по заключению договоров страхования от своего имени и по поручению страхователя;",
      "• консультационная деятельность по вопросам страхования;",
      "• поиск и привлечение физических и юридических лиц к страхованию;",
      "• проведение сравнительного анализа услуг и финансового состояния страховых организаций;",
      "• сбор информации об объектах страхования в целях проведения сравнительного анализа услуг, предоставляемых страховыми организациями;",
      "• разработка по поручению клиентов условий страхования, критериев выбора страховщиков, оказание экспертных услуг по выявлению страховых рисков;",
      "• подготовка и (или) оформление по поручению страхователя необходимых для заключения договора страхования документов, сбор информации по вопросам страхования;",
      "• оформление по поручению страхователя договора страхования;",
      "• сбор страховых премий от страхователей по договорам страхования для их последующего перевода страховым организациям при наличии соответствующего соглашения со страхователем;",
      "• размещение страховых рисков по договорам страхования или сострахования по поручению клиентов;",
      "• обеспечение правильного и своевременного оформления документов при заключении договора страхования, осуществлении страховой выплаты, рассмотрении претензий при наступлении страхового случая, а также других документов, связанных с заключенными договорами страхования;",
      "• проведение консультаций и оказание содействия в получении страхователем, выгодоприобретателем страховой выплаты при наступлении страхового случая;",
      "• оформление в соответствии с предоставленными полномочиями необходимых документов для получения страховой выплаты;",
      "• сбор по поручению страхователя страховых выплат от страховых организаций для их последующей передачи страхователю, выгодоприобретателю;",
      "• подготовка документов по рассмотрению и урегулированию убытков при наступлении страхового случая по поручению заинтересованных лиц;",
      "• организация услуг экспертов по оценке ущерба и определению размера страховой выплаты;",
      "• посредническая деятельность по заключению на территории Республики Казахстан от имени страховой организации - нерезидента Республики Казахстан договоров страхования гражданско-правовой ответственности владельцев автотранспортных средств, выезжающих за пределы Республики Казахстан;",
      "• управление деятельностью страхового пула на основании соглашения с его участниками.",
      "",
      "Годовая финансовая отчетность, подтвержденная аудиторской организацией, за три предыдущих отчетных года у Страхового брокера отсутствует в связи с тем, что Страховой брокер получил лицензию на право осуществления деятельности страхового брокера 05.09.2023.",
      "",
      "Годовая консолидированная финансовая отчетность, подтвержденная аудиторской организацией, за три предыдущих отчетных года у Страхового брокера отсутствует в связи с тем, что Страховой брокер получил лицензию на право осуществления деятельности страхового брокера 05.09.2023.",
      "",
      "Отчеты об итогах деятельности за три предыдущих отчетных года у Страхового брокера отсутствуют в связи с тем, что Страховой брокер получил лицензию на право осуществления деятельности страхового брокера 05.09.2023.",
      "",
      "Страховой брокер является действительным членом объеденения юридических лиц «АССОЦИАЦИЯ СТРАХОВЩИКОВ КАЗАХСТАНА»",
      "",
      "Сведения об акционерах (участниках): единственным участником Страхового брокера является гражданин Республики Беларусь Боровой Денис Фёдорович – 100 % (Сто процентов) доли в Уставном капитале ТОО «Страховой брокер Дионис».",
      "",
      "Договор добровольного страхования профессиональной ответственности Товарищество с ограниченной ответственностью “Страховой брокер Дионис” №444-26-987-0000026 от 12.01.2026.",
      "Страховщик: Акционерное общество «Страховая компания «Amanat»;",
      "",
      "Объект страхования: не противоречащие действующему законодательству Республики Казахстан, имущественные интересы Страхователя, связанные с его обязанностью возместить ущерб, причиненный жизни, здоровью и/или имуществу третьих лиц, вследствие ошибочных действий (бездействия) и (или) упущений в процессе или в результате осуществления Страхователем Профессиональной деятельности",
      "",
      "Перечень рисков:",
      "1) нанесение имущественного ущерба;",
      "2) нанесение физического вреда.",
      "",
      "Период действия страхового полиса: с «16» января 2026 года по «15» января 2027 года.",
      "Страховая сумма: 500 000 (Пятьсот тысяч) тенге.",
    ],
  },
};

const kz: AboutDictionary = {
  seo: {
    title: "Dionis — лицензияланған сақтандыру брокері",
    description:
      "Dionis туралы: сақтандыру брокерінің мәртебесі, мамандануы және ресми ашып көрсету деректері.",
  },

  pageTitle: "Dionis - лицензияланған сақтандыру брокері",

  about: {
    leadTitle: "Біз кімбіз және қалай көмектесеміз",

    features: [
      {
        title: "МӘРТЕБЕ ЖӘНЕ ҚҰҚЫҚТЫҚ НЕГІЗ",
        text:
          "Dionis сақтандыру брокері ретінде жұмыс істейді. Біз заң талаптарына сәйкес әрекет етеміз және компания, лицензия және қызмет түрлері бойынша міндетті ақпаратты ашып көрсетеміз. Мақсатымыз — сақтандыруды ережелерге сай және клиенттің маршруты/тәуекеліне сәйкес дұрыс ұйымдастыру.",
      },
      {
        title: "МАМАНДАНУ: ХАЛЫҚАРАЛЫҚ САПАРЛАР ЖӘНЕ ТАСЫМАЛ",
        text:
          "Негізгі бағыттар: халықаралық «Жасыл карта», резидент еместер үшін РФ ОСАГО, жүкті және жауапкершілікті сақтандыру. Біз практикалық мәселелерге назар аударамыз: кіру/транзит, шекара талаптары, мерзім, аумақ, құжаттар.",
      },
      {
        title: "АШЫҚ ШАРТТАР ЖӘНЕ ҚҰЖАТТАР",
        text:
          "Біз уәде сатпаймыз. Рәсімдеуге дейін негізгі параметрлерді нақтылаймыз: сақтандыру объектісі, мерзімі, аумағы, лимиттері мен ерекшеліктері. Бұл қателерді азайтады және нәтижені келісімшарт пен ережелер бойынша тексеруге мүмкіндік береді.",
      },
      {
        title: "ҮРДІС: ӨТІНІМНЕН ПОЛИСКЕ ДЕЙІН",
        text:
          "Түсінікті үрдіспен жұмыс істейміз: деректерді алу → тексеру және нақтылау → шешімді таңдау → шарттарды келісу → төлем → полис және нұсқаулықты беру. Қажет болса, шекара үшін қандай құжаттар керек екенін және маршрут бойынша маңызды нюанстарды айтамыз.",
      },
    ],

    cta:
      "Халықаралық сапар немесе тасымал үшін сақтандыру қажет болса — сұрау жіберіңіз. Біз рәсімдеу мүмкіндігін, құжаттар тізімін және шарттарды нақтылап береміз.",
  },

  legal: {
    orgTitle:
      "«Дионис сақтандыру брокері» жауапкершілігі шектеулі серіктестігі",
    headerLines: [
      "050009 (A05B4Y6), Қазақстан Республикасы, Алматы қаласы,",
      "Алматы ауданы, Әуезов көшесі, 14А үй",
      "БСН 230440027776,",
      "ИИК KZ098562203129699871",
      "«Банк ЦентрКредит» АҚ, БИК KCJBKZKX,",
      "+375 44 703 03 03",
      "dionis-insurance.kz",
      "info@dionis-insurance.kz",
    ],
    body: [
      "Қазақстан Республикасының «Сақтандыру қызметі туралы» Заңының 16-бабының 1), 3), 4), 5), 6), 7), 8), 9), 10) тармақшаларында көрсетілген ақпарат:",
      "Толық атауы: «Дионис сақтандыру брокері» жауапкершілігі шектеулі серіктестігі.",
      "Орналасқан жері: 050009 (A05B4Y6), Қазақстан Республикасы, Алматы қаласы, Алматы ауданы, Әуезов көшесі, 14А үй.",
      "Байланыс телефондары: +7(727) 357-30-30, +375 44 703 03 03, +375 44 531 52 82.",
      "Жұмыс уақыты: 9.00-ден 18.00-ге дейін.",
      "Сақтандыру брокерінің филиалдары мен өкілдіктері жоқ.",
      "",
      "Басшы қызметкерлер туралы мәліметтер:",
      "Директор – Боровой Денис Федорович.",
      "Бас бухгалтер – Кислая Анастасия Валерьевна.",
      "",
      "Мемлекеттік тіркеу нөмірі туралы мәліметтер: 24270.",
      "БСН 230440027776.",
      "",
      "Сақтандыру брокері қызметін жүзеге асыру құқығына 05.09.2023 жылғы № 2.3.2 лицензия.",
      "",
      "Сақтандыру брокері жүзеге асыратын қызмет түрлері туралы мәліметтер:",
      "• сақтанушының тапсырмасы бойынша және өз атынан сақтандыру шарттарын жасасу жөніндегі делдалдық қызмет;",
      "• сақтандыру мәселелері бойынша консультациялық қызмет;",
      "• жеке және заңды тұлғаларды іздеу және сақтандыруға тарту;",
      "• сақтандыру ұйымдарының қызметтері мен қаржылық жағдайына салыстырмалы талдау жүргізу;",
      "• сақтандыру ұйымдары көрсететін қызметтерге салыстырмалы талдау жүргізу мақсатында сақтандыру объектілері туралы ақпарат жинау;",
      "• клиенттердің тапсырмасы бойынша сақтандыру талаптарын, сақтандырушыларды таңдау критерийлерін әзірлеу, сақтандыру тәуекелдерін анықтау бойынша сараптамалық қызметтер көрсету;",
      "• сақтанушының тапсырмасы бойынша сақтандыру шартын жасасу үшін қажетті құжаттарды дайындау және (немесе) рәсімдеу, сақтандыру мәселелері бойынша ақпарат жинау;",
      "• сақтанушының тапсырмасы бойынша сақтандыру шартын рәсімдеу;",
      "• сақтанушымен тиісті келісім болған жағдайда, сақтандыру шарттары бойынша сақтанушылардан сақтандыру сыйлықақыларын кейіннен сақтандыру ұйымдарына аудару үшін жинау;",
      "• клиенттердің тапсырмасы бойынша сақтандыру немесе бірлесіп сақтандыру шарттары бойынша сақтандыру тәуекелдерін орналастыру;",
      "• сақтандыру шартын жасасу, сақтандыру төлемін жүзеге асыру, сақтандыру жағдайы басталған кезде талаптарды қарау кезінде, сондай-ақ жасалған сақтандыру шарттарына байланысты басқа да құжаттарды дұрыс және уақтылы рәсімдеуді қамтамасыз ету;",
      "• консультациялар өткізу және сақтандыру жағдайы басталған кезде сақтанушыға, пайда алушыға сақтандыру төлемін алуға жәрдем көрсету;",
      "• берілген өкілеттіктерге сәйкес сақтандыру төлемін алу үшін қажетті құжаттарды рәсімдеу;",
      "• сақтанушының тапсырмасы бойынша сақтандыру ұйымдарынан сақтандыру төлемдерін кейіннен сақтанушыға, пайда алушыға беру үшін жинау;",
      "• мүдделі тұлғалардың тапсырмасы бойынша сақтандыру жағдайы басталған кезде залалдарды қарау және реттеу жөніндегі құжаттарды дайындау;",
      "• залалды бағалау және сақтандыру төлемінің мөлшерін айқындау жөніндегі сарапшылардың қызметтерін ұйымдастыру;",
      "• Қазақстан Республикасынан тыс жерлерге шығатын автокөлік құралдары иелерінің азаматтық-құқықтық жауапкершілігін сақтандыру шарттарын Қазақстан Республикасының аумағында Қазақстан Республикасының резиденті емес сақтандыру ұйымының атынан жасасу жөніндегі делдалдық қызмет;",
      "• сақтандыру пулының қызметін оның қатысушыларымен жасалған келісім негізінде басқару.",
      "",
      "Сақтандыру брокерінде аудиторлық ұйым растаған алдыңғы үш есепті жылдағы жылдық қаржылық есептілік жоқ, себебі Сақтандыру брокері сақтандыру брокері қызметін жүзеге асыру құқығына лицензияны 05.09.2023 жылы алған.",
      "",
      "Сақтандыру брокерінде аудиторлық ұйым растаған алдыңғы үш есепті жылдағы жылдық шоғырландырылған қаржылық есептілік жоқ, себебі Сақтандыру брокері сақтандыру брокері қызметін жүзеге асыру құқығына лицензияны 05.09.2023 жылы алған.",
      "",
      "Сақтандыру брокерінде алдыңғы үш есепті жылдағы қызмет қорытындылары туралы есептер жоқ, себебі Сақтандыру брокері сақтандыру брокері қызметін жүзеге асыру құқығына лицензияны 05.09.2023 жылы алған.",
      "",
      "Сақтандыру брокері «ҚАЗАҚСТАН САҚТАНДЫРУШЫЛАР ҚАУЫМДАСТЫҒЫ» заңды тұлғалар бірлестігінің мүшесі болып табылады.",
      "",
      "Акционерлер (қатысушылар) туралы мәліметтер: Сақтандыру брокерінің жалғыз қатысушысы Беларусь Республикасының азаматы Боровой Денис Фёдорович болып табылады – «Дионис сақтандыру брокері» ЖШС Жарғылық капиталындағы үлестің 100%-ы (Жүз пайызы).",
      "",
      "«Дионис сақтандыру брокері» жауапкершілігі шектеулі серіктестігінің кәсіби жауапкершілігін ерікті сақтандыру шарты №444-26-987-0000026, 12.01.2026 ж.",
      "Сақтандырушы: «Amanat» сақтандыру компаниясы» акционерлік қоғамы;",
      "",
      "Сақтандыру объектісі: Қазақстан Республикасының қолданыстағы заңнамасына қайшы келмейтін, Сақтанушының кәсіби қызметті жүзеге асыру барысында немесе соның нәтижесінде қате әрекеттері (әрекетсіздігі) және (немесе) олқылықтары салдарынан үшінші тұлғалардың өміріне, денсаулығына және/немесе мүлкіне келтірілген залалды өтеу міндетіне байланысты мүліктік мүдделері.",
      "",
      "Тәуекелдер тізбесі:",
      "1) мүліктік залал келтіру;",
      "2) дене жарақатын келтіру.",
      "",
      "Сақтандыру полисінің қолданылу мерзімі: 2026 жылғы «16» қаңтардан 2027 жылғы «15» қаңтарға дейін.",
      "Сақтандыру сомасы: 500 000 (Бес жүз мың) теңге.",
    ],
  },
};


const en: AboutDictionary = {
  seo: {
    title: "Dionis — a licensed insurance broker",
    description:
      "About Dionis: broker status, specialization, operating principles, and official disclosures.",
  },

  pageTitle: "Dionis - a licensed insurance broker",

  about: {
    leadTitle: "Who we are and how we help",

    features: [
      {
        title: "STATUS AND LEGAL BASIS",
        text:
          "Dionis operates as an insurance broker. We act within the applicable legal framework and publish mandatory disclosures about the company, license and scope of activities. Our role is to arrange insurance correctly — in line with the insurer’s rules and the client’s route/risk requirements.",
      },
      {
        title: "FOCUS: INTERNATIONAL TRAVEL AND TRANSPORT",
        text:
          "Key areas include Green Card insurance, Russian OSAGO for non-residents, and cargo/liability insurance. We focus on practical requirements: entry/transit, border compliance, policy term, coverage territory, and documents.",
      },
      {
        title: "CLEAR TERMS AND DOCUMENTATION",
        text:
          "We do not sell slogans. Before issuing a policy we confirm the essentials: insured object, period, territory, limits and exclusions. This reduces errors and makes the outcome verifiable — by the contract and policy wording.",
      },
      {
        title: "PROCESS: FROM REQUEST TO POLICY",
        text:
          "Our process is straightforward: collect data → verify and уточнить details → select an option → agree terms → payment → deliver the policy and instructions. If needed, we explain what documents may be required at the border and what matters for your specific route.",
      },
    ],

    cta:
      "If you need insurance for an international trip or transportation — send a request. We will confirm availability, required documents and terms for your route.",
  },

  legal: {
    orgTitle:
      "Limited Liability Partnership “Insurance Broker Dionis”",
    headerLines: [
      "050009 (A05B4Y6), Republic of Kazakhstan, Almaty city,",
      "Almaty district, Auezov Street, building 14A",
      "BIN 230440027776,",
      "IBAN KZ098562203129699871",
      "Bank CenterCredit JSC, BIC KCJBKZKX,",
      "+375 44 703 03 03",
      "dionis-insurance.kz",
      "info@dionis-insurance.kz",
    ],
    body: [
      "Information specified in subparagraphs 1), 3), 4), 5), 6), 7), 8), 9), 10) of Article 16 of the Law of the Republic of Kazakhstan “On Insurance Activities”:",
      "Full name: Limited Liability Partnership “Dionis Insurance Broker”.",
      "Location: 050009 (A05B4Y6), Republic of Kazakhstan, Almaty city, Almaty District, 14A Auezov Street.",
      "Contact numbers: +7(727) 357-30-30, +375 44 703 03 03, +375 44 531 52 82.",
      "Business hours: from 9:00 to 18:00.",
      "The Insurance Broker has no branches or representative offices.",
      "",
      "Information on executive officers:",
      "Director – Denis Fedorovich Borovoy.",
      "Chief Accountant – Anastasia Valeryevna Kislaya.",
      "",
      "State registration number: 24270.",
      "BIN 230440027776.",
      "",
      "License No. 2.3.2 dated 05.09.2023 granting the right to carry out insurance brokerage activities.",
      "",
      "Information on the types of activities carried out by the Insurance Broker:",
      "• intermediary activities related to the conclusion of insurance contracts in its own name and on behalf of the policyholder;",
      "• consulting activities on insurance matters;",
      "• searching for and attracting individuals and legal entities for insurance;",
      "• conducting comparative analysis of the services and financial condition of insurance organizations;",
      "• collecting information on insurance objects for the purpose of conducting comparative analysis of services provided by insurance organizations;",
      "• developing insurance terms and insurer selection criteria on behalf of clients, and providing expert services for identifying insurance risks;",
      "• preparing and/or processing, on behalf of the policyholder, documents required for concluding an insurance contract, and collecting information on insurance matters;",
      "• arranging an insurance contract on behalf of the policyholder;",
      "• collecting insurance premiums from policyholders under insurance contracts for their subsequent transfer to insurance organizations, subject to an appropriate agreement with the policyholder;",
      "• placing insurance risks under insurance or co-insurance contracts on behalf of clients;",
      "• ensuring the proper and timely preparation of documents when concluding an insurance contract, making insurance payments, reviewing claims upon the occurrence of an insured event, as well as other documents related to concluded insurance contracts;",
      "• providing consultations and assistance to the policyholder or beneficiary in obtaining an insurance payment upon the occurrence of an insured event;",
      "• preparing, within the scope of the powers granted, the documents required to receive an insurance payment;",
      "• collecting, on behalf of the policyholder, insurance payments from insurance organizations for their subsequent transfer to the policyholder or beneficiary;",
      "• preparing documents for the consideration and settlement of losses upon the occurrence of an insured event on behalf of interested parties;",
      "• arranging the services of experts for loss assessment and determination of the amount of insurance payment;",
      "• intermediary activities involving the conclusion, within the territory of the Republic of Kazakhstan and on behalf of an insurance organization that is a non-resident of the Republic of Kazakhstan, of motor third-party liability insurance contracts for owners of motor vehicles travelling outside the Republic of Kazakhstan;",
      "• managing the activities of an insurance pool on the basis of an agreement with its participants.",
      "",
      "The Insurance Broker does not have annual financial statements for the previous three reporting years confirmed by an audit organization, because the Insurance Broker obtained its license to carry out insurance brokerage activities on 05.09.2023.",
      "",
      "The Insurance Broker does not have annual consolidated financial statements for the previous three reporting years confirmed by an audit organization, because the Insurance Broker obtained its license to carry out insurance brokerage activities on 05.09.2023.",
      "",
      "The Insurance Broker does not have reports on the results of its activities for the previous three reporting years, because the Insurance Broker obtained its license to carry out insurance brokerage activities on 05.09.2023.",
      "",
      "The Insurance Broker is a full member of the association of legal entities “ASSOCIATION OF INSURERS OF KAZAKHSTAN”.",
      "",
      "Information on shareholders (participants): the sole participant of the Insurance Broker is Denis Fedorovich Borovoy, a citizen of the Republic of Belarus, holding 100% (One hundred percent) of the interest in the authorized capital of LLP “Dionis Insurance Broker”.",
      "",
      "Voluntary professional liability insurance contract of Limited Liability Partnership “Dionis Insurance Broker” No. 444-26-987-0000026 dated 12.01.2026.",
      "Insurer: Joint Stock Company “Amanat Insurance Company”;",
      "",
      "Subject of insurance: the property interests of the Policyholder, not contrary to the current legislation of the Republic of Kazakhstan, associated with its obligation to compensate for damage caused to the life, health and/or property of third parties as a result of erroneous actions (inaction) and/or omissions in the course of or as a result of the Policyholder’s professional activities.",
      "",
      "List of risks:",
      "1) property damage;",
      "2) bodily injury.",
      "",
      "Insurance policy period: from 16 January 2026 to 15 January 2027.",
      "Sum insured: 500,000 (Five hundred thousand) tenge.",
    ],
  },
};


export function getAboutDictionary(lang: Lang): AboutDictionary {
  if (lang === "kz") return kz;
  if (lang === "en") return en;
  return ru;
}
