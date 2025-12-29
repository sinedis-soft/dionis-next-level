// app/dictionaries/home.ts
import type { Lang } from "./header";

export type ServiceConfig = {
  key: string;
  image: string;
  linkSuffix: string;
  title: string;
  items: string[];
};

export type BenefitIcon = "shield" | "time" | "experience" | "support";

export type BenefitCard = {
  icon: BenefitIcon;
  value: string;
  label: string;
  text: string;
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
    cards: BenefitCard[];
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
    title: "Страховой брокер в Казахстане\nдля частных лиц и бизнеса",
    subtitle:
      "Подбор страховых программ, консультации и сопровождение. Работаем официально, по лицензии. Алматы, связь по телефону и в мессенджерах.",
    greenCardBtn: "Зелёная карта",
    osagoBtn: "ОСАГО РФ",
    otherBtn: "Все услуги",
    heroAlt: "Dionis Insurance Broker — страховой брокер в Казахстане",
  },

  benefits: {
    title: "Почему с Dionis удобно работать",
    subtitle:
      "Официальный страховой брокер: подбираем решения и сопровождаем клиентов",
    cards: [
      {
        icon: "shield",
        value: "100%",
        label: "Надёжность",
        text:
          "Все полисы оформляются через лицензированных страховщиков.",
      },
      {
        icon: "time",
        value: "15 минут",
        label: "Скорость",
        text:
          "Онлайн-заявка занимает несколько минут. В рабочее время полис обычно готов в течение одного часа.",
      },
      {
        icon: "experience",
        value: "20+ лет",
        label: "Опыт",
        text:
          "Более 20 лет в международных перевозках. Понимаем требования по страхованию на коридорах ЕС, ЕАЭС, Кавказ, Турция, Китай.",
      },
      {
        icon: "support",
        value: "24/7",
        label: "На связи",
        text:
          "Принимаем заявки онлайн, через WhatsApp и Telegram. Реагируем на срочные запросы и оперативно помогаем решить все вопросы.",
      },
    ],
  },

  director: {
    heading: "Дорогие друзья, партнёры и клиенты!",
    paragraphs: [
      "Меня зовут Денис Боровой, я — директор и учредитель страхового брокера Dionis.",
      "Моя история — это история человека, который с юности работал в сфере транспорта: я прошёл путь от диспетчера до директора транспортной компании, чтобы понимать каждый этап перевозок и все сложности на этом пути.",
      "Позже я изучал страховой рынок с разных сторон: был клиентом, агентом, брокером, предпринимателем. И теперь я точно знаю, что важно для каждого, кто выходит на дорогу — будь то личная поездка или международная грузоперевозка.",
      "Мы создали Dionis, чтобы дать вам не просто страховой полис, а надёжную защиту и простую, понятную поддержку в любой ситуации. Мы выбираем проверенных партнёров, следим за актуальностью тарифов, помогаем экономить время и деньги.",
      "Мы ценим время клиента и строим работу на компетентности, ответственности и уважении.",
      "Если вам нужен страховой брокер для личных задач или бизнеса — мы рядом.",
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
        image: "/services/autoinsur.png",
        linkSuffix: "/products?section=auto",
        items: [
          "Зелёная карта",
          "ОСАГО нерезидентов",
          "КАСКО",
        ],
      },
      {
        key: "property",
        title: "Имущественное страхование",
        image: "/services/engininsur.png",
        linkSuffix: "/products?section=property",
        items: [
          "Движимое имущество",
          "Недвижимость",
          "Инженерные сооружения",
        ],
      },
      {
        key: "cargo",
        title: "Страхование грузов",
        image: "/services/cargo.png",
        linkSuffix: "/products?section=cargo",
        items: [
          "Ответственность экспедитора",
          "Грузы",
          "Международные перевозки",
        ],
      },
      {
        key: "liability",
        title: "Страхование ответственности",
        image: "/services/liability.png",
        linkSuffix: "/products?section=liability",
        items: [
          "Профессиональная ответственность",
          "Ответственность предприятий",
          "Иные виды ответственности",
        ],
      },
      {
        key: "live",
        title: "Страхование жизни",
        image: "/services/live.png",
        linkSuffix: "/products?section=life",
        items: ["Страхование жизни", "Накопительное страхование"],
      },
      {
        key: "vhi",
        title: "Медицинское страхование",
        image: "/services/vhi.png",
        linkSuffix: "/products?section=vhi",
        items: ["Добровольное Медицинское Страхование", 
          "Страхование от несчастных случаев",
          "Страхование выезжающих за рубеж"
        ],
      },
    ],
    moreBtn: "Подробнее",
  },

  broker: {
    titlePrefix: "МЫ ",
    titleHighlight: "СТРАХОВОЙ БРОКЕР В КАЗАХСТАНЕ",
    titleSuffix: " НОВОГО ПОКОЛЕНИЯ ",
    lead: "Работаем официально, по лицензии. Консультируем, подбираем и сопровождаем страховые решения.",
    paragraph1:
      "Dionis Insurance Broker — страховой брокер в Казахстане. Мы подбираем страховые программы под задачу клиента, объясняем условия простым языком и сопровождаем на всех этапах — от заявки до получения документов.",
    bulletPoints: [
      "Подбор страховых программ",
      "Работаем официально, по лицензии",
      "Консультации и сопровождение",
      "Русский, казахский и английский",
    ],
    paragraph2:
      "На сайте вы найдёте отдельные страницы по продуктам. Если вы не уверены, что именно нужно — напишите нам: уточним задачу и предложим оптимальный вариант.",
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
    title: "Қазақстандағы жеке тұлғалар мен бизнеске\nарналған сақтандыру брокері",
    subtitle:
      "Сақтандыру бағдарламаларын іріктеу, кеңес беру және толық сүйемелдеу. Лицензия негізінде ресми жұмыс істейміз. Алматы, телефон және мессенджерлер арқылы байланыс.",
    greenCardBtn: "Green Card",
    osagoBtn: "РФ ОСАГО",
    otherBtn: "Барлық қызметтер",
    heroAlt:
      "Dionis Insurance Broker — Қазақстандағы сақтандыру брокері",
  },

  benefits: {
  title: "Неліктен Dionis-пен жұмыс істеу ыңғайлы",
  subtitle:
    "Ресми сақтандыру брокері: шешімдерді таңдап, клиенттерді толық сүйемелдейміз",
  cards: [
    {
      icon: "shield",
      value: "100%",
      label: "Сенімділік",
      text:
        "Барлық полистер лицензияланған сақтандыру компаниялары арқылы рәсімделеді.",
    },
    {
      icon: "time",
      value: "15 минут",
      label: "Жылдамдық",
      text:
        "Онлайн өтінім бірнеше минутта толтырылады. Жұмыс уақытында полис әдетте бір сағат ішінде дайын болады.",
    },
    {
      icon: "experience",
      value: "20+ жыл",
      label: "Тәжірибе",
      text:
        "Халықаралық тасымалдауда 20 жылдан астам тәжірибе. ЕО, ЕАЭО, Кавказ, Түркия және Қытай бағыттарындағы сақтандыру талаптарын жақсы білеміз.",
    },
    {
      icon: "support",
      value: "24/7",
      label: "Әрқашан байланыстамыз",
      text:
        "Өтінімдерді онлайн, WhatsApp және Telegram арқылы қабылдаймыз. Шұғыл сұраныстарға жедел жауап беріп, барлық мәселелерді тез шешуге көмектесеміз.",
    },
  ],
},

director: {
  heading: "Құрметті достар, серіктестер және клиенттер!",
  paragraphs: [
    "Менің атым Денис Боровой, мен Dionis сақтандыру брокерінің директоры және құрылтайшысымын.",
    "Менің кәсіби жолым көлік саласында басталды: тасымалдаудың әр кезеңін және осы саладағы барлық күрделілікті түсіну үшін диспетчерден бастап көлік компаниясының директорына дейінгі жолдан өттім.",
    "Кейінірек сақтандыру нарығын әр қырынан зерттедім — клиент, агент, брокер және кәсіпкер ретінде. Бүгінде жолға шығатын әр адам үшін не маңызды екенін нақты білемін — ол жеке сапар болсын немесе халықаралық жүк тасымалы болсын.",
    "Біз Dionis компаниясын сізге жай ғана сақтандыру полисін емес, сенімді қорғаныс пен кез келген жағдайда түсінікті әрі қолжетімді қолдау көрсету үшін құрдық. Біз тексерілген серіктестерді таңдаймыз, тарифтердің өзектілігін қадағалаймыз және клиенттеріміздің уақытын әрі қаражатын үнемдеуге көмектесеміз.",
    "Біз клиенттің уақытын бағалаймыз және жұмысымызды құзыреттілікке, жауапкершілікке және құрметке негіздейміз.",
    "Егер сізге жеке мәселелер немесе бизнес үшін сақтандыру брокері қажет болса — біз әрқашан жаныңыздамыз.",
    "Сеніміңіз үшін рахмет. Dionis — арқа сүйеуге болатын сақтандыру.",
  ],
  signLines: [
    "Құрметпен,",
    "Боровой Денис Фёдорович",
    "Директор және құрылтайшы",
  ],
  logoAlt: "Dionis Insurance Broker",
  signatureAlt: "Денис Боровойдың қолтаңбасы",
  photoAlt: "Денис Боровой, Dionis сақтандыру брокерінің директоры",
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
        image: "/services/autoinsur.png",
        linkSuffix: "/products?section=auto",
        items: ["Жасыл карта", "ОСАГО (резидент еместер)", "КАСКО"],
      },
      {
        key: "property",
        title: "Мүлікті сақтандыру",
        image: "/services/engininsur.png",
        linkSuffix: "/products?section=property",
        items: ["Жылжымалы мүлік", "Жылжымайтын мүлік", "Инженерлік объектілер"],
      },
      {
        key: "cargo",
        title: "Жүкті сақтандыру",
        image: "/services/cargo.png",
        linkSuffix: "/products?section=cargo",
        items: ["Экспедитор жауапкершілігі", "Жүктер", "Халықаралық тасымал"],
      },
      {
        key: "liability",
        title: "Жауапкершілікті сақтандыру",
        image: "/services/liability.png",
        linkSuffix: "/products?section=liability",
        items: [
          "Кәсіби жауапкершілік",
          "Кәсіпорын жауапкершілігі",
          "Басқа жауапкершілік түрлері",
        ],
      },
      {
        key: "live",
        title: "Өмірді сақтандыру",
        image: "/services/live.png",
        linkSuffix: "/products?section=life",
        items: ["Өмірді сақтандыру", "Жинақтаушы сақтандыру"],
      },
      {
        key: "vhi",
        title: "Медициналық сақтандыру",
        image: "/services/vhi.png",
        linkSuffix: "/products?section=vhi",
        items: [
          "Ерікті медициналық сақтандыру", 
          "Жазатайым оқиғалардан сақтандыру",
          "Шетелге шығатындарды сақтандыру"
        ],
      },
    ],
    moreBtn: "Толығырақ",
  },

  broker: {
    titlePrefix: "БІЗ — ",
    titleHighlight: "ҚАЗАҚСТАНДАҒЫ САҚТАНДЫРУ БРОКЕРІ",
    titleSuffix: " ЖАҢА БУЫН ",
    lead:
      "Лицензия негізінде ресми жұмыс істейміз. Кеңес береміз, іріктейміз және сақтандыру шешімдерін толық сүйемелдейміз.",
    paragraph1:
      "Dionis Insurance Broker — Қазақстандағы сақтандыру брокері. Біз клиенттің міндетіне сәйкес сақтандыру бағдарламаларын таңдаймыз, шарттарды қарапайым тілмен түсіндіреміз және өтінімнен бастап құжаттарды алғанға дейін барлық кезеңде сүйемелдейміз.",
    bulletPoints: [
      "Сақтандыру бағдарламаларын іріктеу",
      "Ресми жұмыс, лицензия негізінде",
      "Кеңес беру және толық сүйемелдеу",
      "Орыс, қазақ және ағылшын тілдері",
    ],
    paragraph2:
      "Сайтта әрбір сақтандыру өнімі бойынша жеке беттер бар. Егер қай шешім қажет екенін білмесеңіз — бізге жазыңыз: міндетті нақтылап, оңтайлы нұсқаны ұсынамыз.",
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
    title: "Insurance broker in Kazakhstan\nfor individuals and businesses",
    subtitle:
      "Licensed insurance broker: we select insurance solutions and provide full client support.",
    greenCardBtn: "Green Card",
    osagoBtn: "OSAGO (Russia)",
    otherBtn: "All services",
    heroAlt:
      "Dionis Insurance Broker — insurance broker in Kazakhstan",
  },


  benefits: {
  title: "Why working with Dionis is convenient",
  subtitle:
    "A licensed insurance broker: we select solutions and support our clients",
  cards: [
    {
      icon: "shield",
      value: "100%",
      label: "Reliability",
      text:
        "All policies are issued through licensed insurance companies.",
    },
    {
      icon: "time",
      value: "15 minutes",
      label: "Speed",
      text:
        "The online application takes just a few minutes. During business hours, the policy is usually issued within one hour.",
    },
    {
      icon: "experience",
      value: "20+ years",
      label: "Experience",
      text:
        "Over 20 years in international transport. We understand insurance requirements across EU, EAEU, Caucasus, Türkiye, and China corridors.",
    },
    {
      icon: "support",
      value: "24/7",
      label: "Availability",
      text:
        "We accept requests online, via WhatsApp and Telegram. We respond promptly to urgent inquiries and help resolve issues efficiently.",
    },
  ],
},

director: {
  heading: "Dear friends, partners, and clients!",
  paragraphs: [
    "My name is Denis Borovoy. I am the Director and Founder of the insurance broker Dionis.",
    "My professional journey began in the transport industry at a young age: I progressed from dispatcher to director of a transport company, which allowed me to understand every stage of transportation and the challenges involved.",
    "Later, I explored the insurance market from multiple perspectives — as a client, agent, broker, and entrepreneur. Today, I clearly understand what matters to everyone who takes to the road, whether for a personal trip or international freight transportation.",
    "We created Dionis to offer more than just an insurance policy — we provide reliable protection and clear, practical support in any situation. We work with trusted partners, keep tariffs up to date, and help our clients save time and money.",
    "We value our clients’ time and build our work on competence, responsibility, and respect.",
    "If you need an insurance broker for personal matters or business needs — we are always here for you.",
    "Thank you for your trust. Dionis — insurance you can rely on.",
  ],
  signLines: [
    "Sincerely,",
    "Denis Borovoy",
    "Director & Founder",
  ],
  logoAlt: "Dionis Insurance Broker",
  signatureAlt: "Denis Borovoy’s signature",
  photoAlt: "Denis Borovoy, Director of Dionis Insurance Broker",
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
        image: "/services/autoinsur.png",
        linkSuffix: "/products?section=auto",
        items: ["Green Card", "OSAGO for non-residents", "CASCO"],
      },
      {
        key: "property",
        title: "Property Insurance",
        image: "/services/engininsur.png",
        linkSuffix: "/products?section=property",
        items: ["Movable property", "Real estate", "Engineering structures"],
      },
      {
        key: "cargo",
        title: "Cargo Insurance",
        image: "/services/cargo.png",
        linkSuffix: "/products?section=cargo",
        items: [
          "Forwarder's liability",
          "Cargo",
          "International transportation",
        ],
      },
      {
        key: "liability",
        title: "Liability Insurance",
        image: "/services/liability.png",
        linkSuffix: "/products?section=liability",
        items: [
          "Professional liability",
          "Corporate liability",
          "Other types of liability",
        ],
      },
      {
        key: "live",
        title: "Life Insurance",
        image: "/services/live.png",
        linkSuffix: "/products?section=life",
        items: ["Life insurance", "Savings insurance"],
      },
      {
        key: "vhi",
        title: "Health Insurance",
        image: "/services/vhi.png",
        linkSuffix: "/products?section=vhi",
        items: [
          "Voluntary Health Insurance", 
          "Accident Insurance",
          "Travel Insurance"
        ],
      },
    ],
    moreBtn: "More details",
  },

  broker: {
    titlePrefix: "WE ARE A ",
    titleHighlight: "NEXT-GENERATION INSURANCE BROKER IN KAZAKHSTAN",
    titleSuffix: "",
    lead:
      "Licensed and operating officially. We consult, select, and provide full support for insurance solutions.",
    paragraph1:
      "Dionis Insurance Broker is an insurance broker in Kazakhstan. We select insurance programs based on the client’s specific needs, explain policy terms in clear language, and support clients at every stage — from application to receipt of documents.",
    bulletPoints: [
      "Selection of insurance programs",
      "Licensed and operating officially",
      "Consulting and full client support",
      "Russian, Kazakh, and English languages",
    ],
    paragraph2:
      "The website contains dedicated pages for each insurance product. If you are unsure which solution you need, contact us — we will clarify your requirements and propose the optimal option.",
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
