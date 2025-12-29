// app/dictionaries/products/liabilityProductsSection.ts
import type { Lang } from "@/dictionaries/header";

export type KVRow = { k: string; v: string };

export type LiabilityCardDict = {
  id: "carrier" | "forwarder" | "professional" | "homeowners";
  title: string;
  subtitle: string;
  badges: string[];
  actions: { kind: "primary" | "secondary"; label: string }[];
  whoTitle: string;
  whoItems: string[];
  qaTitle: string;
  qaRows: KVRow[];
  note: string;
};

export type LiabilityProductsSectionDict = {
  topTitle: string;
  topLead: string;
  anchorLabel: string;
  anchorValue: string;

  brokerTitle: string;
  brokerItems: string[];

  cards: LiabilityCardDict[];
};

const ru: LiabilityProductsSectionDict = {
  topTitle: "Страхование ответственности",
  topLead:
    "Четыре ключевых продукта для бизнеса и частных лиц: перевозчик, экспедитор, профессиональная ответственность и ответственность владельцев квартир. Коротко объясняем «зачем», «что покрывает» и где чаще всего скрыт риск отказа.",
  anchorLabel: "Быстро",
  anchorValue: "#liability",

  brokerTitle: "Роль брокера",
  brokerItems: [
    "Сверяем исключения и условия отказа (охраняемые стоянки, документы, сроки уведомления).",
    "Подбираем лимит под реальный риск (а не «как у всех»).",
    "Помогаем с урегулированием: что собрать и как общаться со страховщиком.",
  ],

  cards: [
    {
      id: "carrier",
      title: "Ответственность автоперевозчика (ОГПО ВТС / CMR)",
      subtitle:
        "Защита перевозчика от претензий владельца груза и третьих лиц. Это не «страховка груза», а покрытие вашей ответственности как перевозчика по договору/закону.",
      badges: ["B2B", "Перевозки", "CMR"],
      actions: [
        { kind: "primary", label: "Запросить условия/лимит" },
        { kind: "secondary", label: "Проверить маршрут" },
      ],
      whoTitle: "Кому это нужно",
      whoItems: [
        "Владельцам фур и автопарков",
        "Транспортным компаниям с регулярными рейсами",
        "Тем, кто возит дорогие/дефицитные грузы (высокий риск претензий)",
        "Перевозчикам с международными маршрутами (CMR)",
      ],
      qaTitle: "Ключевые вопросы",
      qaRows: [
        {
          k: "Зачем, если груз застрахован?",
          v: "Грузовой полис защищает владельца груза. Вам нужен полис, который защищает перевозчика от его претензий.",
        },
        {
          k: "Кража вместе с машиной?",
          v: "Иногда покрывается при выполнении условий (охраняемая стоянка/пломбы/сигнализация). Мы проверяем эти условия до покупки.",
        },
        {
          k: "Действует за пределами РК?",
          v: "CMR — для международных перевозок (РФ/Европа/Турция и др.), но территория и условия зависят от программы.",
        },
        {
          k: "Перегруз и ДТП — будет страховой?",
          v: "Может быть причиной отказа, если перегруз прямо запрещён условиями. Мы заранее сверяем «мелкий шрифт».",
        },
        {
          k: "Лимит: 20 или 50 млн ₸?",
          v: "Лимит выбирают под стоимость груза и возможный максимум претензии. Для дорогого товара 20 млн может быть недостаточно.",
        },
      ],
      note:
        "Критично: условия по стоянкам/охране, пломбам и соблюдению режима часто влияют на выплату сильнее, чем сам тариф.",
    },

    {
      id: "forwarder",
      title: "Ответственность экспедитора",
      subtitle:
        "Для компаний, которые организуют перевозку и документы, но не всегда сами везут. Закрывает риски выбора субподрядчика и ошибок в логистике/бумагах.",
      badges: ["B2B", "Логистика", "3PL"],
      actions: [
        { kind: "primary", label: "Запросить программу" },
        { kind: "secondary", label: "Проверить исключения" },
      ],
      whoTitle: "Кому это нужно",
      whoItems: [
        "Экспедиторам и 3PL-операторам",
        "Логистическим компаниям, работающим через субперевозчиков",
        "Импортерам/экспортерам с регулярными отправками",
        "Компаниям, где много «бумаги»: декларации, инвойсы, поручения",
      ],
      qaTitle: "Ключевые вопросы",
      qaRows: [
        {
          k: "Если вез нанятый водитель — за что отвечаю?",
          v: "Часто — за выбор субподрядчика, документы и организационные решения (где ошиблись — там и риск).",
        },
        {
          k: "Ошибки в декларациях: покроет штрафы?",
          v: "Иногда можно включить расширения, но часто штрафы/пени исключаются. Мы заранее проверяем, что реально покрывается.",
        },
        {
          k: "Переадресовка/задержка: кто платит?",
          v: "Если ошибка экспедитора привела к убытку клиента — может возникнуть претензия. Важно наличие покрытия на такие сценарии.",
        },
        {
          k: "Косвенные убытки клиента?",
          v: "Зависит от условий: «упущенная выгода» и простой производства часто исключаются или требуют спец. оговорок.",
        },
        {
          k: "В чём «фишка» брокера?",
          v: "Подбираем полис, который закрывает разрыв ответственности между отправителем, экспедитором и фактическим перевозчиком.",
        },
      ],
      note:
        "Самая частая проблема: клиент ожидает «всё покрыто», а в договоре исключены штрафы, пени и косвенные убытки. Мы это вскрываем до подписания.",
    },

    {
      id: "professional",
      title: "Профессиональная ответственность (PI)",
      subtitle:
        "Защита специалиста/компании от претензий из-за профессиональной ошибки: от консультаций до проектов и ИТ-услуг. Часто включает оплату юридической защиты.",
      badges: ["B2B/B2C", "Юр.защита", "Ретро"],
      actions: [
        { kind: "primary", label: "Подобрать под профессию" },
        { kind: "secondary", label: "Проверить ретро-период" },
      ],
      whoTitle: "Кому это нужно",
      whoItems: [
        "Врачи и медицинские центры",
        "Юристы, бухгалтеры, аудиторы",
        "Архитекторы, инженеры, проектировщики",
        "IT-специалисты и компании (разработка/внедрение/аутсорс)",
      ],
      qaTitle: "Ключевые вопросы",
      qaRows: [
        {
          k: "Что является страховым случаем?",
          v: "Неумышленная ошибка, халатность или упущение в рамках профессиональной деятельности (по условиям полиса).",
        },
        {
          k: "Судебные расходы входят?",
          v: "Часто да: оплата адвокатов/экспертиз — ключевая ценность таких полисов.",
        },
        {
          k: "Ретроактивный период?",
          v: "Если включён, полис может защитить от старой ошибки, по которой претензия пришла позже.",
        },
        {
          k: "Помощь до суда?",
          v: "В сильных программах есть сопровождение и попытка урегулировать спор до судебной стадии.",
        },
        {
          k: "Почему брокер?",
          v: "Для каждой профессии — свои условия. Мы знаем, где лучше для IT, где сильнее для медицины и как избежать «дыр» в покрытии.",
        },
      ],
      note:
        "Если вы работаете по контрактам с крупными клиентами, они часто требуют PI с конкретным лимитом и ретро-периодом. Мы подстроим полис под требования договора.",
    },

    {
      id: "homeowners",
      title: "Ответственность владельцев квартир (перед соседями)",
      subtitle:
        "Защита от расходов, если вы случайно причинили ущерб соседям: залив, пожар, взрыв газа, повреждение общедомового имущества.",
      badges: ["Физлица", "Аренда", "Соседи"],
      actions: [
        { kind: "primary", label: "Оформить на год" },
        { kind: "secondary", label: "Уточнить лимит" },
      ],
      whoTitle: "Кому подходит",
      whoItems: [
        "Собственникам квартир",
        "Арендодателям (квартира сдаётся)",
        "Семьям с ремонтом и дорогой отделкой",
        "Тем, кто хочет закрыть риск «одним полисом на год»",
      ],
      qaTitle: "Ключевые вопросы",
      qaRows: [
        {
          k: "«Залил соседей»: что делать?",
          v: "Сделайте фото/видео, вызовите КСК/ОСИ для акта, зафиксируйте контакты, сразу звоните брокеру — дальше ведём по шагам.",
        },
        {
          k: "Ущерб от арендаторов покрывается?",
          v: "Зависит от программы: иногда требуется отдельное условие/оговорка. Мы подберём вариант под сдачу.",
        },
        {
          k: "Пожар/взрыв газа: подъезд тоже?",
          v: "Может покрываться как ущерб третьим лицам и общему имуществу — но условия различаются.",
        },
        {
          k: "Лимит на «евроремонт» соседа?",
          v: "Стандартный лимит не всегда достаточен. Подбираем лимит под реальный уровень отделки в доме.",
        },
        {
          k: "Цена — почему это выгодно?",
          v: "Годовой полис часто стоит дешевле одной аварийной услуги. Это дешёвая защита от дорогой проблемы.",
        },
      ],
      note:
        "Важно: при убытке решает фиксация фактов (акт, фото, даты) и скорость уведомления. Это зона, где брокер реально экономит время и нервы.",
    },
  ],
};

const kz: LiabilityProductsSectionDict = {
  topTitle: "Жауапкершілікті сақтандыру",
  topLead:
    "Бизнес пен жеке тұлғаларға арналған 4 негізгі өнім: тасымалдаушы, экспедитор, кәсіби жауапкершілік және пәтер иесінің жауапкершілігі. «Неге керек», «нені жабады» және қай жерде бас тарту тәуекелі жиі жасырылатынын қысқа түсіндіреміз.",
  anchorLabel: "Жылдам",
  anchorValue: "#liability",

  brokerTitle: "Брокердің рөлі",
  brokerItems: [
    "Алып тастаулар мен бас тарту шарттарын тексереміз (күзетілетін тұрақ, құжат, хабарлау мерзімі).",
    "Лимитті нақты тәуекелге сай қоямыз (жай ғана «барлығындай» емес).",
    "Өтемде көмектесеміз: не жинау керек және сақтандырумен қалай сөйлесу керек.",
  ],

  cards: [
    {
      id: "carrier",
      title: "Автотасымалдаушының жауапкершілігі (ОГПО ВТС / CMR)",
      subtitle:
        "Тасымалдаушыны жүк иесінің және үшінші тұлғалардың талаптарынан қорғау. Бұл «жүк сақтандыруы» емес — тасымалдаушы ретіндегі жауапкершілігіңізді жабу.",
      badges: ["B2B", "Тасымал", "CMR"],
      actions: [
        { kind: "primary", label: "Шарт/лимит сұрау" },
        { kind: "secondary", label: "Маршрутты тексеру" },
      ],
      whoTitle: "Кімге керек",
      whoItems: [
        "Фура/автопарк иелеріне",
        "Тұрақты рейсі бар тасымалдау компанияларына",
        "Қымбат/тапшы жүкті таситындарға (талап тәуекелі жоғары)",
        "Халықаралық бағыттағы тасымалдаушыларға (CMR)",
      ],
      qaTitle: "Негізгі сұрақтар",
      qaRows: [
        {
          k: "Жүк сақтандырылған болса, неге керек?",
          v: "Жүк полисі жүк иесін қорғайды. Бұл полис — тасымалдаушының жауапкершілігін жабады.",
        },
        {
          k: "Көлікпен бірге ұрлау?",
          v: "Кейде шарт орындалса жабылады (күзетілетін тұрақ/пломба/сигнализация). Біз шарттарды алдын ала тексереміз.",
        },
        {
          k: "РК-дан тыс жарамды ма?",
          v: "CMR — халықаралық тасымалға. Бірақ аумақ және шарттар бағдарламаға байланысты.",
        },
        {
          k: "Артық жүк және ЖКО?",
          v: "Егер шартта тыйым болса — бас тарту тәуекелі бар. Біз алдын ала «ұсақ мәтінді» тексереміз.",
        },
        {
          k: "Лимит: 20 немесе 50 млн ₸?",
          v: "Лимитті жүктің құны және мүмкін талап көлемі бойынша таңдайды. Қымбат жүкке 20 млн аз болуы мүмкін.",
        },
      ],
      note:
        "Маңызды: тұрақ/күзет, пломба және режим талаптары төлемге тарифтен де қатты әсер етуі мүмкін.",
    },

    {
      id: "forwarder",
      title: "Экспедитордың жауапкершілігі",
      subtitle:
        "Тасымалды және құжаттарды ұйымдастыратын, бірақ өзі тасымалдамайтын компанияларға. Субподрядшыны таңдау және құжат/логистика қателері тәуекелдерін жабады.",
      badges: ["B2B", "Логистика", "3PL"],
      actions: [
        { kind: "primary", label: "Бағдарлама сұрау" },
        { kind: "secondary", label: "Алып тастауды тексеру" },
      ],
      whoTitle: "Кімге керек",
      whoItems: [
        "Экспедиторлар мен 3PL операторларға",
        "Субтасымалдаушылар арқылы жұмыс істейтін логистикалық компанияларға",
        "Тұрақты жөнелтімі бар импорт/экспортқа",
        "Декларация/инвойс/тапсырма көп компанияларға",
      ],
      qaTitle: "Негізгі сұрақтар",
      qaRows: [
        {
          k: "Жалданған жүргізуші тасымалдаса — мен не үшін жауаптымын?",
          v: "Көбіне — субподрядшыны таңдау, құжаттар және ұйымдық шешімдер үшін.",
        },
        {
          k: "Декларация қателігі: айыппұл жабыла ма?",
          v: "Көп жағдайда айыппұл/өспұл алып тастауға түседі. Кейде кеңейту бар — біз нақтысын алдын ала қараймыз.",
        },
        {
          k: "Қайта бағыттау/кешігу: кім төлейді?",
          v: "Экспедитор қатесі клиент шығынына әкелсе — талап туындауы мүмкін. Мұндай сценарийдің жабылуы маңызды.",
        },
        {
          k: "Клиенттің жанама шығыны?",
          v: "Шартқа байланысты: «упущенная выгода», өндіріс тоқтауы жиі алып тасталады немесе арнайы келісімді қажет етеді.",
        },
        {
          k: "Брокердің артықшылығы?",
          v: "Жөнелтуші–экспедитор–нақты тасымалдаушы арасындағы жауапкершілік «саңылауын» жапқан бағдарламаны таңдаймыз.",
        },
      ],
      note:
        "Ең жиі мәселе: клиент «бәрі жабылады» деп ойлайды, ал шартта айыппұл/өспұл және жанама шығындар алынып тасталған. Біз оны алдын ала көрсетеміз.",
    },

    {
      id: "professional",
      title: "Кәсіби жауапкершілік (PI)",
      subtitle:
        "Кәсіби қателікке байланысты талаптардан маман/компанияны қорғау: кеңес, жоба, IT қызметтері. Жиі заңгерлік қорғау шығындарын қамтиды.",
      badges: ["B2B/B2C", "Құқықтық қорғау", "Ретро"],
      actions: [
        { kind: "primary", label: "Мамандыққа сай таңдау" },
        { kind: "secondary", label: "Ретро-кезеңді тексеру" },
      ],
      whoTitle: "Кімге керек",
      whoItems: [
        "Дәрігерлер және медициналық орталықтар",
        "Заңгер, бухгалтер, аудитор",
        "Сәулетші, инженер, жобалаушы",
        "IT мамандар және компаниялар",
      ],
      qaTitle: "Негізгі сұрақтар",
      qaRows: [
        {
          k: "Сақтандыру жағдайы не?",
          v: "Кәсіби қызмет аясындағы қасақана емес қате/салғырттық/өткізіп алу (шартқа байланысты).",
        },
        {
          k: "Сот шығындары бар ма?",
          v: "Жиі бар: адвокат/сараптама — негізгі артықшылық.",
        },
        {
          k: "Ретроактивті кезең?",
          v: "Қосылса — бұрынғы қате бойынша кейін келген талаптан қорғай алады.",
        },
        {
          k: "Сотқа дейін көмектесе ме?",
          v: "Кей бағдарламаларда сотқа дейін реттеу және сүйемелдеу бар.",
        },
        {
          k: "Неге брокер?",
          v: "Әр мамандықта шарт әртүрлі. IT үшін біреуі мықты, медицина үшін басқасы — біз сәйкестендіреміз.",
        },
      ],
      note:
        "Ірі клиенттермен келісімшарт болса, олар көбіне нақты лимит және ретро-кезең талап етеді. Біз полисті шартқа сай қыламыз.",
    },

    {
      id: "homeowners",
      title: "Пәтер иесінің жауапкершілігі (көршілер алдында)",
      subtitle:
        "Көршілерге кездейсоқ зиян келтірсеңіз шығынды жабу: су басу, өрт, газ жарылысы, ортақ мүлікке зиян.",
      badges: ["Жеке тұлға", "Жалға беру", "Көршілер"],
      actions: [
        { kind: "primary", label: "1 жылға рәсімдеу" },
        { kind: "secondary", label: "Лимитті нақтылау" },
      ],
      whoTitle: "Кімге сәйкес",
      whoItems: [
        "Пәтер иелеріне",
        "Жалға берушілерге",
        "Жөндеуі қымбат пәтерлерге",
        "«Жылдық бір полис» қалайтындарға",
      ],
      qaTitle: "Негізгі сұрақтар",
      qaRows: [
        {
          k: "«Көршіні су бастырдым»: не істеу керек?",
          v: "Фото/видео, КСК/ОСИ акт, байланыстарды тіркеу, бірден брокерге қоңырау — әрі қарай қадамдап жүргіземіз.",
        },
        {
          k: "Жалға алушы келтірген зиян жабыла ма?",
          v: "Бағдарламаға байланысты: кейде қосымша шарт керек. Біз жалға беруге лайық нұсқаны таңдаймыз.",
        },
        {
          k: "Өрт/газ жарылысы: подъезд те?",
          v: "Кей шарттарда ортақ мүлік пен үшінші тұлғаларға зиян ретінде жабылады — нақтысын тексереміз.",
        },
        {
          k: "Көршінің «еврожөндеу» лимиті?",
          v: "Стандарт лимит жеткіліксіз болуы мүмкін. Үйдегі нақты жөндеу деңгейіне сай лимит қоямыз.",
        },
        {
          k: "Баға — неге тиімді?",
          v: "Жылдық полис бір қызмет шақыруынан да арзан болуы мүмкін. Қымбат тәуекелге арзан қорғаныс.",
        },
      ],
      note:
        "Маңызды: оқиғада дәлел (акт, фото, күн) және уақытылы хабарлау шешеді. Бұл жерде брокер уақыт пен жүйкені үнемдейді.",
    },
  ],
};

const en: LiabilityProductsSectionDict = {
  topTitle: "Liability insurance",
  topLead:
    "Four key products for businesses and individuals: carrier liability, freight forwarder liability, professional indemnity, and homeowners’ liability. We explain the why, the coverage, and where denial risks usually hide.",
  anchorLabel: "Quick",
  anchorValue: "#liability",

  brokerTitle: "Broker’s role",
  brokerItems: [
    "We validate exclusions and denial triggers (guarded parking, documents, notification terms).",
    "We set limits based on real risk, not default numbers.",
    "We support claims handling: what to collect and how to communicate with the insurer.",
  ],

  cards: [
    {
      id: "carrier",
      title: "Carrier liability (OGPO VTS / CMR)",
      subtitle:
        "Protects the carrier from claims by cargo owners and third parties. This is not cargo insurance — it covers your liability as a carrier under contract/law.",
      badges: ["B2B", "Transport", "CMR"],
      actions: [
        { kind: "primary", label: "Request terms/limit" },
        { kind: "secondary", label: "Validate route" },
      ],
      whoTitle: "Who it’s for",
      whoItems: [
        "Truck owners and fleets",
        "Transport companies with recurring trips",
        "Those carrying expensive/high-risk cargo",
        "International routes (CMR)",
      ],
      qaTitle: "Key questions",
      qaRows: [
        {
          k: "Why if cargo is insured?",
          v: "Cargo insurance protects the cargo owner. You need a policy that protects the carrier against their claims.",
        },
        {
          k: "Theft with the truck?",
          v: "Sometimes covered if conditions are met (guarded parking/seals/alarm). We verify these conditions before purchase.",
        },
        {
          k: "Valid outside KZ?",
          v: "CMR is for international carriage, but territory and terms depend on the program.",
        },
        {
          k: "Overload causing an accident?",
          v: "Can trigger denial if prohibited by wording. We check the fine print upfront.",
        },
        {
          k: "Limit: 20 or 50 mln KZT?",
          v: "Pick based on cargo value and maximum plausible claim. 20 mln may be insufficient for expensive cargo.",
        },
      ],
      note:
        "Critical: parking/security, seals and compliance conditions often affect payouts more than price.",
    },

    {
      id: "forwarder",
      title: "Freight forwarder liability",
      subtitle:
        "For companies that organize transport and paperwork (often using subcontractors). Covers subcontractor selection and logistics/document errors.",
      badges: ["B2B", "Logistics", "3PL"],
      actions: [
        { kind: "primary", label: "Request a program" },
        { kind: "secondary", label: "Check exclusions" },
      ],
      whoTitle: "Who it’s for",
      whoItems: [
        "Freight forwarders and 3PLs",
        "Logistics companies using subcontracted carriers",
        "Regular import/export shippers",
        "Paperwork-heavy operations",
      ],
      qaTitle: "Key questions",
      qaRows: [
        {
          k: "If a hired driver carries the cargo, what am I liable for?",
          v: "Often for subcontractor selection, documents and operational decisions.",
        },
        {
          k: "Document mistakes: are customs fines covered?",
          v: "Often excluded, sometimes available via extensions. We verify what is truly covered.",
        },
        {
          k: "Misrouting / delay: who pays?",
          v: "If your error causes client losses, a claim may arise. Coverage wording matters.",
        },
        {
          k: "Consequential losses?",
          v: "Depends: lost profit and business interruption are commonly excluded or need special clauses.",
        },
        {
          k: "Broker advantage?",
          v: "We close the liability gap between shipper, forwarder and the actual carrier.",
        },
      ],
      note:
        "Common pitfall: clients expect ‘everything is covered’ while fines and consequential losses are excluded. We surface this before signing.",
    },

    {
      id: "professional",
      title: "Professional indemnity (PI)",
      subtitle:
        "Protects professionals from claims due to errors/omissions — from consulting to projects and IT services. Often includes legal defense costs.",
      badges: ["B2B/B2C", "Legal costs", "Retro"],
      actions: [
        { kind: "primary", label: "Match to profession" },
        { kind: "secondary", label: "Check retro period" },
      ],
      whoTitle: "Who it’s for",
      whoItems: [
        "Doctors and medical centers",
        "Lawyers, accountants, auditors",
        "Architects, engineers, designers",
        "IT specialists and companies",
      ],
      qaTitle: "Key questions",
      qaRows: [
        {
          k: "What is a claim event?",
          v: "Unintentional error/omission/negligence in your professional services (per wording).",
        },
        {
          k: "Are legal costs covered?",
          v: "Often yes: lawyers/experts are the core value.",
        },
        {
          k: "Retroactive cover?",
          v: "If included, it can respond to past work where the claim arrives later.",
        },
        {
          k: "Pre-court support?",
          v: "Stronger programs include dispute handling before litigation.",
        },
        {
          k: "Why a broker?",
          v: "Each profession has different best-in-class wording. We match the right insurer and avoid gaps.",
        },
      ],
      note:
        "Enterprise contracts often require specific PI limits and retro terms. We align the policy to your contract.",
    },

    {
      id: "homeowners",
      title: "Homeowners’ liability (to neighbors)",
      subtitle:
        "Covers costs if you accidentally damage neighbors’ property: water leaks, fire, gas explosion, common property damage.",
      badges: ["Individuals", "Rentals", "Neighbors"],
      actions: [
        { kind: "primary", label: "Get annual cover" },
        { kind: "secondary", label: "Clarify limit" },
      ],
      whoTitle: "Who it’s for",
      whoItems: [
        "Apartment owners",
        "Landlords renting out property",
        "Homes with expensive renovations",
        "Those who prefer a simple yearly safety net",
      ],
      qaTitle: "Key questions",
      qaRows: [
        {
          k: "‘I flooded my neighbors’: what now?",
          v: "Take photos/video, get an official report (management/HOA), capture contacts, call us — we guide you step-by-step.",
        },
        {
          k: "Damage caused by tenants?",
          v: "Depends on wording; sometimes requires a specific clause. We select the right option for landlords.",
        },
        {
          k: "Fire / gas explosion: common areas too?",
          v: "Can be covered as third-party/common property damage, but conditions vary.",
        },
        {
          k: "Limit for expensive renovations?",
          v: "Standard limits may be too low. We set limits based on real renovation levels in the building.",
        },
        {
          k: "Why it’s worth it?",
          v: "A yearly policy can cost less than one emergency repair call — cheap protection from expensive losses.",
        },
      ],
      note:
        "Important: documentation and quick notification are key. This is where a broker truly saves time and stress.",
    },
  ],
};

export const LIABILITY_PRODUCTS_SECTION_DICTIONARY: Record<
  Lang,
  LiabilityProductsSectionDict
> = {
  ru,
  kz,
  en,
};

export function getLiabilityProductsSectionDictionary(
  lang: Lang
): LiabilityProductsSectionDict {
  return LIABILITY_PRODUCTS_SECTION_DICTIONARY[lang] ?? ru;
}
