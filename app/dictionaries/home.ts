// app/dictionaries/home.ts
import type { Lang } from "./header";

export type ServiceConfig = {
  key: string;
  image: string;
  linkSuffix: string;
  title: string;
  items: string[];
};

export type HomeDictionary = {
  hero: {
    title: string;
    subtitle: string;
    greenCardBtn: string;
    osagoBtn: string;
    otherBtn: string;
    heroAlt: string;
  };

  benefits: {
    title: string;
    subtitle: string;
    cards: {
      value: string;
      label: string;
      text: string;
    }[];
  };

  director: {
    heading: string;
    paragraphs: string[];
    signLines: string[];
    logoAlt: string;
    signatureAlt: string;
    photoAlt: string;
  };

  greenCardSteps: {
    title: string;
    subtitle: string;
    cta: string;
    steps: {
      stepLabel: string;
      title: string;
      text: string;
    }[];
  };

  services: {
    titlePart1: string;
    titlePart2: string;
    underlineLabel: string;
    otherHeading: string;

    greenCardCard: {
      title: string;
      text1: string;
      text2: string;
      price: string;
      term: string;
      cta: string;
      imageAlt: string;
    };

    osagoCard: {
      title: string;
      text1: string;
      text2: string;
      price: string;
      term: string;
      cta: string;
      imageAlt: string;
    };

    otherServices: ServiceConfig[];
    moreBtn: string;
  };

  broker: {
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    lead: string;
    paragraph1: string;
    bulletPoints: string[];
    paragraph2: string;
    logoAlt: string;
  };

  contact: {
    sectionTitle: string;
    sectionSubtitle: string;
    photoAlt: string;

    fields: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      comment: string;
    };

    requiredMark: string;
    agreePrefix: string;
    agreeLink: string;
    agreeSuffix: string;

    statusSuccess: string;
    statusError: string;
    submitDefault: string;
    submitLoading: string;

    modalSuccessTitle: string;
    modalErrorTitle: string;
    modalClose: string;
    honeypotLabel: string;
  };
};

const ru: HomeDictionary = {
  hero: {
    title: "Страхование для международных поездок\nи грузоперевозчиков",
    subtitle:
      "Зелёная карта, ОСАГО РФ для нерезидентов, автоКаско, грузы и ответственность.",
    greenCardBtn: "Заказать Зелёную карту",
    osagoBtn: "Заказать ОСАГО РФ",
    otherBtn: "Прочие страховки",
    heroAlt:
      "Dionis Insurance — страхование для международных перевозчиков",
  },

  benefits: {
    title: "Почему с Dionis удобно работать",
    subtitle: "Оформляем страховки для въезда в Россию и Европу",
    cards: [
      {
        value: "100%",
        label: "Надёжность",
        text: "Все полисы оформляются через лицензированных страховщиков. Никаких «серых» схем — только легальные программы страхования.",
      },
      {
        value: "15 минут",
        label: "Скорость",
        text: "Онлайн-заявка занимает несколько минут. В рабочее время полис обычно готов в течение одного часа.",
      },
      {
        value: "12+ лет",
        label: "Опыт",
        text: "Более 12 лет в международных перевозках. Понимаем требования по страхованию на коридорах ЕС, ЕАЭС, Кавказ, Турция, Китай.",
      },
      {
        value: "24/7",
        label: "На связи",
        text: "Принимаем заявки онлайн, через WhatsApp и Telegram. Реагируем на срочные запросы и помогаем, когда у клиента вопрос «здесь и сейчас».",
      },
    ],
  },

  director: {
    heading: "Дорогие друзья, партнёры и клиенты!",
    paragraphs: [
      "Меня зовут Денис Боровой, я — директор и учредитель страхового брокера Dionis.",
      "Моя история — это история человека, который с юности работал в сфере транспорта: я прошёл путь от диспетчера до заместителя директора транспортной компании, чтобы понимать каждый этап перевозок и все сложности на этом пути.",
      "Позже я изучал страховой рынок с разных сторон: был клиентом, агентом, брокером, предпринимателем. И теперь я точно знаю, что важно для каждого, кто выходит на дорогу — будь то личная поездка или международная грузоперевозка.",
      "Мы создали Dionis, чтобы дать вам не просто страховой полис, а надёжную защиту и простую, понятную поддержку в любой ситуации. Мы выбираем проверенных партнёров, следим за актуальностью тарифов, помогаем экономить время и деньги.",
      "У нас нет лишней бюрократии. Есть уважение к клиенту, компетентность и ответственность.",
      "Если вы ищете страховку для выезда за границу, полис для бизнеса или партнёра в сфере логистики — мы рядом.",
      "Спасибо за ваше доверие. Dionis — страхование, на которое можно опереться.",
    ],
    signLines: [
      "С уважением,",
      "Боровой Денис Фёдорович",
      "Директор и учредитель",
    ],
    logoAlt: "Dionis Insurance Broker",
    signatureAlt: "Подпись Дениса Борового",
    photoAlt: "Денис Боровой, директор страхового брокера Dionis",
  },

  greenCardSteps: {
    title: "Зелёная карта за несколько простых шагов",
    subtitle:
      "Мы стараемся, чтобы оформление полиса не занимало у вас много времени. Всё можно сделать дистанционно — без визита в офис.",
    cta: "Перейти к оформлению Зелёной карты",
    steps: [
      {
        stepLabel: "Шаг 1",
        title: "Оставляете заявку",
        text: "Заполняете короткую форму на сайте или пишете нам в WhatsApp / Telegram. Достаточно базовых данных по авто и маршруту.",
      },
      {
        stepLabel: "Шаг 2",
        title: "Подбираем вариант и уточняем детали",
        text: "Проверяем данные, согласуем срок страхования, территорию действия и стоимость. При необходимости подскажем, что лучше для вашего маршрута.",
      },
      {
        stepLabel: "Шаг 3",
        title: "Вы оплачиваете удобным способом",
        text: "Отправляем счёт или ссылку на оплату. Можно оплатить картой, по реквизитам или иным согласованным способом.",
      },
      {
        stepLabel: "Шаг 4",
        title: "Получаете полис и инструкцию",
        text: "Отправляем полис в электронном виде, а при необходимости — в печатном. Прикладываем краткую инструкцию по предъявлению на границе.",
      },
    ],
  },

  services: {
    titlePart1: "Наши ",
    titlePart2: "услуги",
    underlineLabel: "",
    otherHeading: "Другие виды страхования",

    greenCardCard: {
      title: "Зелёная карта",
      text1:
        "Полис международного автострахования для выезда за границу. Работаем с перевозчиками и частными лицами.",
      text2:
        "Для казахстанских авто. Подберём срок и территорию действия под ваш маршрут.",
      price: "от $74",
      term: "от 30 дней",
      cta: "Подробнее о Зелёной карте",
      imageAlt: "Зелёная карта для выезда за границу",
    },

    osagoCard: {
      title: "ОСАГО РФ для нерезидентов",
      text1:
        "Обязательное страхование гражданской ответственности для въезда в Россию на иностранном транспорте.",
      text2:
        "Работаем с юридическими лицами и перевозчиками. Помогаем оформить без лишней бюрократии.",
      price: "от $38",
      term: "от 15 дней",
      cta: "Подробнее об ОСАГО РФ",
      imageAlt: "ОСАГО РФ для въезда в Россию",
    },

    otherServices: [
      {
        key: "auto",
        title: "Автострахование",
        image: "/services/auto1.webp",
        linkSuffix: "/products#auto",
        items: [
          "Зелёная карта",
          "ОСАГО нерезидентов",
          "КАСКО",
          "Ассистанc",
        ],
      },
      {
        key: "property",
        title: "Имущественное страхование",
        image: "/services/property.webp",
        linkSuffix: "/products#property",
        items: [
          "Движимое имущество",
          "Недвижимость",
          "Инженерные сооружения",
        ],
      },
      {
        key: "cargo",
        title: "Страхование грузов",
        image: "/services/cargo1.webp",
        linkSuffix: "/products#cargo",
        items: [
          "Ответственность экспедитора",
          "Грузы",
          "Международные перевозки",
        ],
      },
      {
        key: "liability",
        title: "Страхование ответственности",
        image: "/services/liability.webp",
        linkSuffix: "/products#liability",
        items: [
          "Профессиональная ответственность",
          "Ответственность предприятий",
          "Иные виды ответственности",
        ],
      },
      {
        key: "live",
        title: "Страхование жизни",
        image: "/services/live.webp",
        linkSuffix: "/products#live",
        items: ["Страхование жизни", "Накопительное страхование"],
      },
    ],
    moreBtn: "Подробнее",
  },

  broker: {
    titlePrefix: "МЫ ",
    titleHighlight: "СТРАХОВОЙ БРОКЕР",
    titleSuffix: " НОВОГО ПОКОЛЕНИЯ",
    lead: "Имеем лицензирование в Казахстане и работаем по международным стандартам.",
    paragraph1:
      "Мы специализируемся на Зелёных картах для выезда за границу, страховании транзитного транспорта, туристов и релокантов. Наши клиенты — частные водители, логистические компании, перевозчики и путешественники, которым важны скорость, прозрачность и надёжность.",
    bulletPoints: [
      "Страховка онлайн",
      "Работаем официально, по лицензии",
      "Полисы действуют в ЕС, Турции, Иране, Сербии и других странах",
      "Говорим на русском, казахском и английском",
    ],
    paragraph2:
      "Мы не просто оформляем полисы — мы берём на себя ответственность, чтобы ваша поездка прошла спокойно. Вся страховка — легальная, проверенная и признанная за границей. Если вам нужна реальная защита без очередей и бюрократии — вы по адресу.",
    logoAlt: "Dionis Insurance Broker — Казахстан",
  },

  contact: {
    sectionTitle: "Напишите нам сообщение",
    sectionSubtitle: "Нам важно ваше мнение",
    photoAlt: "Денис Боровой, директор Dionis Insurance",

    fields: {
      firstName: "Имя",
      lastName: "Фамилия",
      email: "E-mail",
      phone: "Телефон",
      comment: "Комментарий",
    },

    requiredMark: "*",
    agreePrefix: "Нажимая на кнопку, я принимаю условия",
    agreeLink: "соглашения",
    agreeSuffix: ".",
    statusSuccess: "Сообщение отправлено. Мы свяжемся с вами.",
    statusError: "Не удалось отправить сообщение. Попробуйте позже.",
    submitDefault: "Отправить",
    submitLoading: "Отправка...",

    modalSuccessTitle: "Сообщение отправлено",
    modalErrorTitle: "Ошибка отправки",
    modalClose: "Закрыть",
    honeypotLabel: "Если вы человек, оставьте поле пустым",
  },
};

const kz: HomeDictionary = {
  hero: {
    title: "Халықаралық сапарлар мен\nжүк тасымалдаушыларына арналған сақтандыру",
    subtitle:
      "Жасыл карта, РФ ОСАГО (резидент еместер үшін), автоКАСКО, жүктер және жауапкершілік.",
    greenCardBtn: "Жасыл картаны рәсімдеу",
    osagoBtn: "РФ ОСАГО рәсімдеу",
    otherBtn: "Басқа сақтандырулар",
    heroAlt:
      "Dionis Insurance — халықаралық тасымалдаушыларға арналған сақтандыру",
  },

  benefits: {
    title: "Dionis-пен жұмыс істеудің артықшылықтары",
    subtitle: "Ресейге және Еуропаға кіруге арналған сақтандыруды рәсімдейміз",
    cards: [
      {
        value: "100%",
        label: "Сенімділік",
        text: "Барлық полистер лицензияланған сақтандыру компаниялары арқылы рәсімделеді. Ешқандай “көлеңкелі” схемалар жоқ — тек заңды бағдарламалар.",
      },
      {
        value: "15 минут",
        label: "Жылдамдық",
        text: "Онлайн өтінім бірнеше минут алады. Жұмыс уақытында полис әдетте 1 сағат ішінде дайын болады.",
      },
      {
        value: "12+ жыл",
        label: "Тәжірибе",
        text: "12 жылдан астам халықаралық тасымалдау саласында. ЕО, ЕАЭО, Кавказ, Түркия, Қытай бағыттарындағы сақтандыру талаптарын жақсы білеміз.",
      },
      {
        value: "24/7",
        label: "Қол жетімділік",
        text: "Өтінімдерді онлайн, WhatsApp және Telegram арқылы қабылдаймыз. Шұғыл сұрақтарға жедел жауап береміз.",
      },
    ],
  },

  director: {
    heading: "Құрметті достар, серіктестер және клиенттер!",
    paragraphs: [
      "Менің атым — Денис Боровой, мен Dionis сақтандыру брокерінің директоры және негізін қалаушысымын.",
      "Менің жолым — жастайымнан көлік саласында жұмыс істеген адам жолы: диспетчерден бастап көлік компаниясы директорына дейінгі жолды жүріп өттім. Осы саладағы барлық қиындықтарды өз көзіммен көрдім.",
      "Кейін сақтандыру нарығын әртүрлі қырынан зерттедім: клиент те болдым, агент те, брокер де, кәсіпкер де. Сондықтан сапарға шығатын әр адамға не маңызды екенін жақсы білемін.",
      "Біз Dionis-ті сізге тек сақтандыру полисін емес, кез келген жағдайда нақты қорғаныс пен түсінікті қолдау көрсету үшін құрдық. Біз тексерілген серіктестермен жұмыс істейміз, тарифтердің өзектілігін қадағалаймыз, уақытыңыз бен қаражатыңызды үнемдеуге көмектесеміз.",
      "Бізде артық бюрократия жоқ. Клиентке құрмет, кәсібилік және жауапкершілік бар.",
      "Егер сіз шетелге шығуға сақтандыру, бизнеске арналған полис немесе логистика саласында серіктес іздесеңіз — біз әрдайым қасыңыздамыз.",
      "Сенім білдіргеніңіз үшін рақмет. Dionis — сүйенуге болатын сақтандыру.",
    ],
    signLines: [
      "Құрметпен,",
      "Боровой Денис Федорович",
      "Директор және негізін қалаушы",
    ],
    logoAlt: "Dionis Insurance Broker",
    signatureAlt: "Денис Боровойдың қолтаңбасы",
    photoAlt: "Dionis сақтандыру брокерінің директоры Денис Боровой",
  },

  greenCardSteps: {
    title: "Жасыл картаны бірнеше қарапайым қадаммен рәсімдеңіз",
    subtitle:
      "Полисті рәсімдеу сіздің уақытыңызды көп алмауы үшін жұмыс істейміз. Барлығын қашықтан — офистке бармай-ақ жасауға болады.",
    cta: "Жасыл картаны рәсімдеуге өту",
    steps: [
      {
        stepLabel: "1-қадам",
        title: "Өтінім қалдырасыз",
        text: "Сайттағы қысқа форманы толтырасыз немесе WhatsApp / Telegram арқылы жазасыз. Көлік және маршрут туралы қысқа ақпарат жеткілікті.",
      },
      {
        stepLabel: "2-қадам",
        title: "Нұсқаны таңдап, мәліметтерді нақтылаймыз",
        text: "Деректерді тексереміз, мерзімді, аумақты және құнын келісеміз. Қажет болса, маршрутыңызға ең тиімді шешімді ұсынамыз.",
      },
      {
        stepLabel: "3-қадам",
        title: "Қолайлы әдіспен төлейсіз",
        text: "Шот немесе төлем сілтемесін жібереміз. Картамен, банк деректемелері арқылы немесе басқа тәсілмен төлеуге болады.",
      },
      {
        stepLabel: "4-қадам",
        title: "Полис пен нұсқаулықты аласыз",
        text: "Полисті электронды түрде жібереміз, қажет болса — қағаз нұсқада. Шекарада көрсетуге арналған қысқа нұсқаулықты қоса жібереміз.",
      },
    ],
  },

  services: {
    titlePart1: "Біздің ",
    titlePart2: "қызметтер",
    underlineLabel: "",
    otherHeading: "Басқа сақтандыру түрлері",

    greenCardCard: {
      title: "Жасыл карта",
      text1:
        "Шетелге шығуға арналған халықаралық автосақтандыру полисі. Жеке тұлғалармен және тасымалдаушылармен жұмыс істейміз.",
      text2:
        "Қазақстандық көліктер үшін. Маршрутыңызға сәйкес мерзім мен аумақты таңдап береміз.",
      price: "74$ бастап",
      term: "30 күннен бастап",
      cta: "Жасыл карта туралы толығырақ",
      imageAlt: "Шетелге шығуға арналған Жасыл карта",
    },

    osagoCard: {
      title: "РФ ОСАГО (резидент еместерге)",
      text1:
        "Ресейге шетелдік нөмірмен кіруге арналған міндетті азаматтық жауапкершілік сақтандыруы.",
      text2:
        "Заңды тұлғалармен және тасымалдаушылармен жұмыс істейміз. Артық бюрократиясыз рәсімдеуге көмектесеміз.",
      price: "38$ бастап",
      term: "15 күннен бастап",
      cta: "РФ ОСАГО туралы толығырақ",
      imageAlt: "Ресейге кіруге арналған ОСАГО полисі",
    },

    otherServices: [
      {
        key: "auto",
        title: "Автосақтандыру",
        image: "/services/auto1.webp",
        linkSuffix: "/products#auto",
        items: ["Жасыл карта", "ОСАГО (резидент еместер)", "КАСКО", "Ассистанс"],
      },
      {
        key: "property",
        title: "Мүлікті сақтандыру",
        image: "/services/property.webp",
        linkSuffix: "/products#property",
        items: ["Жылжымалы мүлік", "Жылжымайтын мүлік", "Инженерлік объектілер"],
      },
      {
        key: "cargo",
        title: "Жүкті сақтандыру",
        image: "/services/cargo1.webp",
        linkSuffix: "/products#cargo",
        items: ["Экспедитор жауапкершілігі", "Жүктер", "Халықаралық тасымал"],
      },
      {
        key: "liability",
        title: "Жауапкершілікті сақтандыру",
        image: "/services/liability.webp",
        linkSuffix: "/products#liability",
        items: [
          "Кәсіби жауапкершілік",
          "Кәсіпорын жауапкершілігі",
          "Басқа жауапкершілік түрлері",
        ],
      },
      {
        key: "live",
        title: "Өмірді сақтандыру",
        image: "/services/live.webp",
        linkSuffix: "/products#live",
        items: ["Өмірді сақтандыру", "Жинақтаушы сақтандыру"],
      },
    ],
    moreBtn: "Толығырақ",
  },

  broker: {
    titlePrefix: "БІЗ — ",
    titleHighlight: "ЖАҢА БУЫН САҚТАНДЫРУ БРОКЕРІ",
    titleSuffix: "",
    lead: "Қазақстанда лицензияланған және халықаралық стандарттарға сай жұмыс істейміз.",
    paragraph1:
      "Біз Жасыл карталарға, транзиттік көлік сақтандыруына, туристер мен релоканттарға арналған сақтандыруға маманданамыз. Біздің клиенттер — жылдамдықты, ашықтықты және сенімділікті бағалайтын жеке жүргізушілер, логистикалық компаниялар және тасымалдаушылар.",
    bulletPoints: [
      "Онлайн сақтандыру",
      "Ресми, лицензиямен жұмыс істейміз",
      "Полистер ЕО, Түркия, Иран, Сербия және басқа елдерде жарамды",
      "Орыс, қазақ және ағылшын тілдерінде сөйлейміз",
    ],
    paragraph2:
      "Біз тек полис рәсімдемейміз — сіздің сапарыңыздың қауіпсіз өтуіне жауапкершілік аламыз. Барлық сақтандыру заңды, тексерілген және шетелде мойындалған. Егер сізге шынайы қорғаныс қажет болса — дұрыс жердесіз.",
    logoAlt: "Dionis Insurance Broker — Қазақстан",
  },

  contact: {
    sectionTitle: "Бізге хабарлама жазыңыз",
    sectionSubtitle: "Сіздің пікіріңіз біз үшін маңызды",
    photoAlt: "Dionis Insurance директоры Денис Боровой",

    fields: {
      firstName: "Аты",
      lastName: "Тегі",
      email: "E-mail",
      phone: "Телефон",
      comment: "Пікір",
    },

    requiredMark: "*",
    agreePrefix: "Түймені баса отырып, мен келісім шарттарын қабылдаймын",
    agreeLink: "келісім",
    agreeSuffix: ".",
    statusSuccess: "Хабарлама жіберілді. Біз сізбен жақын арада хабарласамыз.",
    statusError: "Хабарлама жіберілмеді. Кейінірек қайталап көріңіз.",
    submitDefault: "Жіберу",
    submitLoading: "Жіберілуде...",

    modalSuccessTitle: "Хабарлама жіберілді",
    modalErrorTitle: "Жіберу кезінде қате",
    modalClose: "Жабу",
    honeypotLabel: "Егер сіз адам болсаңыз, бұл өрісті бос қалдырыңыз",
  },
};

const en: HomeDictionary = {
  hero: {
    title: "Insurance for international trips\nand freight carriers",
    subtitle:
      "Green Card, Russian OSAGO for non-residents, AutoCASCO, cargo and liability insurance.",
    greenCardBtn: "Order a Green Card",
    osagoBtn: "Order Russian OSAGO",
    otherBtn: "Other insurance",
    heroAlt:
      "Dionis Insurance — insurance for international transportation",
  },

  benefits: {
    title: "Why working with Dionis is convenient",
    subtitle: "We issue insurance for entry into Russia and Europe",
    cards: [
      {
        value: "100%",
        label: "Reliability",
        text: "All policies are issued through licensed insurers. No 'grey' schemes — only legitimate insurance programs.",
      },
      {
        value: "15 minutes",
        label: "Speed",
        text: "The online application takes only a few minutes. During working hours, a policy is usually ready within one hour.",
      },
      {
        value: "12+ years",
        label: "Experience",
        text: "More than 12 years in international transportation. We understand insurance requirements along EU, EAEU, Caucasus, Turkey, and China corridors.",
      },
      {
        value: "24/7",
        label: "Always in touch",
        text: "We accept requests online, via WhatsApp and Telegram. We respond to urgent inquiries and help when the client needs answers immediately.",
      },
    ],
  },

  director: {
    heading: "Dear friends, partners and clients!",
    paragraphs: [
      "My name is Denis Borovoy, I am the director and founder of Dionis Insurance Broker.",
      "My story is the story of a person who has worked in transportation since youth: I went from dispatcher to deputy director of a transport company, learning every stage of logistics and all the challenges along the way.",
      "Later I studied the insurance market from different sides: I was a client, an agent, a broker, an entrepreneur. Now I clearly understand what matters to everyone who goes on the road — whether it’s a personal trip or international freight transportation.",
      "We created Dionis to give you not just an insurance policy, but reliable protection and simple, clear support in any situation. We choose verified partners, keep tariffs up to date, and help you save time and money.",
      "We have no unnecessary bureaucracy. What we do have is respect for the client, competence, and responsibility.",
      "If you are looking for travel insurance, a business policy, or a partner in the field of logistics — we are here for you.",
      "Thank you for your trust. Dionis — insurance you can rely on.",
    ],
    signLines: [
      "With respect,",
      "Denis Borovoy",
      "Director and Founder",
    ],
    logoAlt: "Dionis Insurance Broker",
    signatureAlt: "Signature of Denis Borovoy",
    photoAlt: "Denis Borovoy, director of Dionis Insurance Broker",
  },

  greenCardSteps: {
    title: "A Green Card in just a few simple steps",
    subtitle:
      "We work so that issuing a policy doesn’t take much of your time. Everything can be done remotely — no office visit required.",
    cta: "Proceed to Green Card issuing",
    steps: [
      {
        stepLabel: "Step 1",
        title: "Submit an application",
        text: "Fill out a short form on the website or message us via WhatsApp / Telegram. Only basic car and route data is required.",
      },
      {
        stepLabel: "Step 2",
        title: "We select the option and clarify details",
        text: "We verify your data, agree on insurance duration, coverage territory and cost. If needed, we advise the best option for your route.",
      },
      {
        stepLabel: "Step 3",
        title: "You pay in a convenient way",
        text: "We send an invoice or payment link. You can pay by card, via bank details, or another agreed method.",
      },
      {
        stepLabel: "Step 4",
        title: "You receive the policy and instructions",
        text: "We send the policy electronically, and if required, in printed form. We attach brief instructions for presenting it at the border.",
      },
    ],
  },

  services: {
    titlePart1: "Our ",
    titlePart2: "Services",
    underlineLabel: "",
    otherHeading: "Other types of insurance",

    greenCardCard: {
      title: "Green Card",
      text1:
        "International motor third-party liability insurance for travelling abroad. We work with carriers and individuals.",
      text2:
        "For Kazakh vehicles. We will select coverage period and territory to match your route.",
      price: "from $74",
      term: "from 30 days",
      cta: "Learn more about Green Card",
      imageAlt: "Green Card insurance for travelling abroad",
    },

    osagoCard: {
      title: "Russian OSAGO for non-residents",
      text1:
        "Mandatory third-party liability insurance for entering Russia on foreign vehicles.",
      text2:
        "We work with legal entities and carriers. We help issue the policy without unnecessary bureaucracy.",
      price: "from $38",
      term: "from 15 days",
      cta: "Learn more about Russian OSAGO",
      imageAlt: "OSAGO policy for entering Russia",
    },

    otherServices: [
      {
        key: "auto",
        title: "Motor Insurance",
        image: "/services/auto1.webp",
        linkSuffix: "/products#auto",
        items: ["Green Card", "OSAGO for non-residents", "CASCO", "Assistance"],
      },
      {
        key: "property",
        title: "Property Insurance",
        image: "/services/property.webp",
        linkSuffix: "/products#property",
        items: ["Movable property", "Real estate", "Engineering structures"],
      },
      {
        key: "cargo",
        title: "Cargo Insurance",
        image: "/services/cargo1.webp",
        linkSuffix: "/products#cargo",
        items: [
          "Forwarder's liability",
          "Cargo",
          "International transportation",
        ],
      },
      {
        key: "liability",
        title: "Liability Insurance",
        image: "/services/liability.webp",
        linkSuffix: "/products#liability",
        items: [
          "Professional liability",
          "Corporate liability",
          "Other types of liability",
        ],
      },
      {
        key: "live",
        title: "Life Insurance",
        image: "/services/live.webp",
        linkSuffix: "/products#live",
        items: ["Life insurance", "Savings insurance"],
      },
    ],
    moreBtn: "More details",
  },

  broker: {
    titlePrefix: "WE ARE A ",
    titleHighlight: "NEXT-GEN INSURANCE BROKER",
    titleSuffix: "",
    lead: "Licensed in Kazakhstan and operating to international standards.",
    paragraph1:
      "We specialize in Green Cards for international travel, transit vehicle insurance, tourists, and relocants. Our clients are private drivers, logistics companies, carriers and travelers who value speed, transparency and reliability.",
    bulletPoints: [
      "Online insurance",
      "Licensed and official work",
      "Policies valid in the EU, Turkey, Iran, Serbia and other countries",
      "We speak Russian, Kazakh and English",
    ],
    paragraph2:
      "We don't just issue policies — we take responsibility to make your trip safe. All insurance is legal, verified, and recognized abroad. If you need real protection without queues and bureaucracy — you are in the right place.",
    logoAlt: "Dionis Insurance Broker — Kazakhstan",
  },

  contact: {
    sectionTitle: "Send us a message",
    sectionSubtitle: "Your opinion matters to us",
    photoAlt: "Denis Borovoy, director of Dionis Insurance",

    fields: {
      firstName: "First name",
      lastName: "Last name",
      email: "E-mail",
      phone: "Phone",
      comment: "Comment",
    },

    requiredMark: "*",
    agreePrefix: "By clicking the button, I accept the terms of the",
    agreeLink: "agreement",
    agreeSuffix: ".",
    statusSuccess: "Message sent. We will contact you shortly.",
    statusError: "Failed to send the message. Please try again later.",
    submitDefault: "Send",
    submitLoading: "Sending...",

    modalSuccessTitle: "Message sent",
    modalErrorTitle: "Sending error",
    modalClose: "Close",
    honeypotLabel: "If you are human, leave this field empty",
  },
};


export const HOME_DICTIONARY: Record<Lang, HomeDictionary> = {
  ru,
  kz,
  en,
};

export function getHomeDictionary(lang: Lang): HomeDictionary {
  return HOME_DICTIONARY[lang] ?? ru;
}
