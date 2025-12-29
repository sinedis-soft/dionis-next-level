// app/dictionaries/products/lifeProductsSection.ts
import type { Lang } from "@/dictionaries/header";

export type KeyValueRow = { k: string; v: string };

export type LifeProductsSectionDictionary = {
  topTitle: string;
  topLead: string;
  quickLabel: string; // рядом с #life

  whoTitle: string;
  keyQuestionsTitle: string;

  brokerTitle: string;
  brokerBullets: string[];

  term: {
    title: string;
    subtitle: string;
    badges: string[];
    actions: {
      pickSumTerm: string;
      policyForBank: string;
    };
    who: string[];
    qa: KeyValueRow[];
    note: string;
  };

  savings: {
    title: string;
    subtitle: string;
    badges: string[];
    actions: {
      calcContribution: string;
      checkTaxBenefit: string;
    };
    who: string[];
    qa: KeyValueRow[];
    note: string;
  };
};

const ru: LifeProductsSectionDictionary = {
  topTitle: "Страхование жизни",
  topLead:
    "Два ключевых продукта: рисковое (срочное) страхование жизни — чтобы защитить семью и кредиты, и накопительное страхование — чтобы копить на образование/пенсию с защитой. Ниже — ответы на вопросы, которые реально волнуют.",
  quickLabel: "Быстрый переход",

  whoTitle: "Кому это нужно",
  keyQuestionsTitle: "Ключевые вопросы",

  brokerTitle: "Почему брокер",
  brokerBullets: [
    "Сравним страховые и подберём условия под цель: «кредит», «семья», «образование», «пенсия».",
    "Проверим «мелкий шрифт»: исключения, мед.анкета, территория 24/7, сроки выплат.",
    "Соберём правильный пакет документов и ускорим урегулирование при страховом событии.",
  ],

  term: {
    title: "Страхование жизни (рисковое / срочное)",
    subtitle:
      "Финансовая защита семьи и обязательств на срок: выплата при уходе из жизни, а в расширенных программах — при критических заболеваниях и инвалидности.",
    badges: ["Семья", "Кредиты", "24/7"],
    actions: {
      pickSumTerm: "Подобрать сумму и срок",
      policyForBank: "Полис для банка",
    },
    who: [
      "Кормильцам семьи и тем, у кого есть иждивенцы",
      "Заемщикам банков (ипотека/кредит)",
      "Людям с повышенными рисками: опасные профессии, частые командировки",
      "Тем, кто хочет защитить уровень жизни семьи на 3–20 лет",
    ],
    qa: [
      {
        k: "Что будет с близкими, если меня не станет?",
        v: "Страховая выплата может закрыть кредиты и дать семье финансовую «подушку» на переходный период.",
      },
      {
        k: "Покрывает ли критические заболевания?",
        v: "Во многих программах в РК есть выплаты при онкологии, инфаркте или инсульте — но перечень диагнозов и стадии важно проверить в условиях.",
      },
      {
        k: "Банк навязывает страховку. Могу ли я прийти к вам?",
        v: "Да. Мы подбираем полис, который банк примет, но обычно он выгоднее по цене/покрытию, чем «по умолчанию» в отделении.",
      },
      {
        k: "Действует ли 24/7 по всему миру?",
        v: "Часто да, но территория и исключения зависят от программы (например, отдельные условия для спорта/экстрима).",
      },
      {
        k: "Как быстро семья получит деньги?",
        v: "После подачи документов страховая рассматривает заявление и принимает решение. Мы заранее даём список документов и сопровождаем процесс, чтобы не было задержек из-за «не того» пакета.",
      },
    ],
    note:
      "Самый частый риск отказа — не «событие», а формулировки: исключения, мед.анкета, сроки уведомления. Мы проверяем это до покупки.",
  },

  savings: {
    title:
      "Накопительное страхование жизни (НСЖ / образовательное / пенсионное)",
    subtitle:
      "Накопления + страховая защита. Вы копите на цель, а при неблагоприятном событии страховая обеспечивает достижение цели по условиям договора.",
    badges: ["Образование", "Пенсия", "Налог"],
    actions: {
      calcContribution: "Рассчитать взнос",
      checkTaxBenefit: "Проверить льготы",
    },
    who: [
      "Родителям: накопить на обучение ребёнка",
      "Тем, кто хочет сформировать пенсионный капитал",
      "Тем, кому важна защита цели с первого дня",
      "Тем, кто хочет дисциплинированно копить по графику",
    ],
    qa: [
      {
        k: "Чем отличается от депозита?",
        v: "В НСЖ цель может быть защищена с первого дня: при страховом событии страховая по условиям договора обеспечивает выплату (в т.ч. может «дотянуть» цель). Депозит такой защиты не даёт.",
      },
      {
        k: "Какая доходность?",
        v: "Обычно есть гарантированная часть + возможный доп.доход (участие в прибыли/инвест.доход) — конкретика зависит от продукта и условий.",
      },
      {
        k: "Налоговые льготы в РК (ИПН): это правда?",
        v: "По отдельным договорам НСЖ длительностью от 3 лет может применяться налоговый вычет — мы проверим актуальные требования и подскажем, как оформить корректно.",
      },
      {
        k: "Защита от взысканий: могут арестовать?",
        v: "По ряду программ средства до момента выплаты защищены от взысканий/раздела — но это зависит от правового режима продукта. Мы подбираем вариант под задачу.",
      },
      {
        k: "Можно копить в долларах?",
        v: "Есть решения с валютной привязкой или инвестиционные программы (например, unit-linked). Важно понимать риски и механизм расчёта.",
      },
    ],
    note:
      "НСЖ бывает разным. Если нужен «максимум защиты» — выбираем одно. Если приоритет «накопить» — другое. Нельзя покупать по рекламе: важны условия выплат, досрочного расторжения и комиссии.",
  },
};

const kz: LifeProductsSectionDictionary = {
  topTitle: "Өмірді сақтандыру",
  topLead:
    "Екі негізгі өнім: тәуекелдік (мерзімді) өмір сақтандыруы — отбасы мен несиені қорғау үшін, және жинақтаушы сақтандыру — білім/зейнетақы үшін қорғаумен бірге жинау. Төменде — маңызды сұрақтарға нақты жауаптар.",
  quickLabel: "Жылдам өту",

  whoTitle: "Кімге керек",
  keyQuestionsTitle: "Негізгі сұрақтар",

  brokerTitle: "Неге брокер",
  brokerBullets: [
    "Мақсатқа сай салыстырамыз: «несие», «отбасы», «оқу», «зейнетақы».",
    "«Ұсақ мәтінді» тексереміз: алып тастаулар, мед.сауалнама, 24/7 аумақ, төлем мерзімі.",
    "Құжат пакетін дұрыс жинап, сақтандыру жағдайында сүйемелдейміз.",
  ],

  term: {
    title: "Өмірді сақтандыру (тәуекелдік / мерзімді)",
    subtitle:
      "Белгілі мерзімге отбасы мен міндеттемені қаржылай қорғау: қайтыс болғанда төлем, ал кеңейтілген бағдарламаларда — критикалық ауру/мүгедектік кезінде төлем.",
    badges: ["Отбасы", "Несие", "24/7"],
    actions: {
      pickSumTerm: "Сома/мерзім таңдау",
      policyForBank: "Банкқа полис",
    },
    who: [
      "Отбасының асыраушысына және асырауындағы адамдары барларға",
      "Банк заемшыларына (ипотека/несие)",
      "Тәуекелі жоғары адамдарға: қауіпті кәсіп, жиі іссапар",
      "Отбасының өмір деңгейін 3–20 жылға қорғағысы келетіндерге",
    ],
    qa: [
      {
        k: "Егер мен болмасам, жақындарыма не болады?",
        v: "Төлем несие/ипотеканы жабуға және отбасыға өтпелі кезеңге қаржылай қорғаныс беруге көмектеседі.",
      },
      {
        k: "Критикалық аурулар жабыла ма?",
        v: "РК-та көптеген бағдарламаларда онкология, инфаркт, инсульт бойынша төлем бар — бірақ диагноз тізімі мен шарттарын нақты тексеру керек.",
      },
      {
        k: "Банк өз сақтандыруын ұсынады. Сізге келе аламын ба?",
        v: "Иә. Банк қабылдайтын полисті таңдаймыз, бірақ көбіне баға/қамту жағынан тиімдірек болады.",
      },
      {
        k: "24/7 әлем бойынша жүре ме?",
        v: "Көп жағдайда иә, бірақ аумақ пен алып тастаулар бағдарламаға байланысты (спорт/экстримге бөлек шарт болуы мүмкін).",
      },
      {
        k: "Отбасы ақшаны қаншалықты тез алады?",
        v: "Құжат тапсырылғаннан кейін сақтандырушы өтінішті қарайды. Біз құжат тізімін алдын ала береміз және процессті сүйемелдейміз.",
      },
    ],
    note:
      "Ең жиі бас тарту себебі — оқиға емес, шарт мәтіні: алып тастаулар, мед.сауалнама, хабарлау мерзімі. Біз мұны сатып алмас бұрын тексереміз.",
  },

  savings: {
    title: "Жинақтаушы өмірді сақтандыру (ЖӨС / білім / зейнетақы)",
    subtitle:
      "Жинақ + сақтандыру қорғанысы. Мақсатқа жинайсыз, ал қолайсыз жағдай болса — шарт бойынша сақтандыру мақсатқа жетуге көмектеседі.",
    badges: ["Білім", "Зейнетақы", "Салық"],
    actions: {
      calcContribution: "Жарнаны есептеу",
      checkTaxBenefit: "Жеңілдікті тексеру",
    },
    who: [
      "Ата-аналарға: баланың оқуына жинау",
      "Зейнетақы капиталы керек адамдарға",
      "Мақсатты бірінші күннен қорғағысы келетіндерге",
      "Кесте бойынша тәртіпті жинағысы келетіндерге",
    ],
    qa: [
      {
        k: "Депозиттен айырмашылығы неде?",
        v: "ЖӨС-та мақсат бірінші күннен қорғалуы мүмкін: сақтандыру жағдайы болса, шарт бойынша төлем қамтамасыз етіледі. Депозитте мұндай қорғаныс жоқ.",
      },
      {
        k: "Табыстылық қандай?",
        v: "Әдетте кепілдендірілген бөлік + қосымша табыс мүмкін (пайдаға қатысу/инвест.табыс). Нақтысы өнім шарттарына байланысты.",
      },
      {
        k: "РК-та салық жеңілдігі (ИПН) бар ма?",
        v: "3 жылдан ұзақ кейбір ЖӨС шарттарына салықтық шегерім қолданылуы мүмкін — біз талаптарды тексеріп, дұрыс рәсімдеуге көмектесеміз.",
      },
      {
        k: "Өндіріп алу: арест салуға бола ма?",
        v: "Кей өнімдерде төлемге дейін қаражат қорғалған болуы мүмкін, бірақ нақтысы өнімнің құқықтық режиміне байланысты. Біз мақсатқа сай таңдаймыз.",
      },
      {
        k: "Долларда жинауға бола ма?",
        v: "Валюталық привязкасы бар немесе unit-linked сияқты инвестициялық бағдарламалар бар. Механизм мен тәуекелді түсіну маңызды.",
      },
    ],
    note:
      "ЖӨС әртүрлі болады. «Максимум қорғаныс» керек болса — бір шешім, «жинақ» басым болса — басқа. Жарнамаға қарап алмау керек: төлем, мерзімінен бұрын тоқтату, комиссия шарттары маңызды.",
  },
};

const en: LifeProductsSectionDictionary = {
  topTitle: "Life insurance",
  topLead:
    "Two key products: term (risk) life insurance to protect family and loans, and savings life insurance to build education/retirement funds with protection. Below are practical answers to common questions.",
  quickLabel: "Quick jump",

  whoTitle: "Who it’s for",
  keyQuestionsTitle: "Key questions",

  brokerTitle: "Why a broker",
  brokerBullets: [
    "We compare insurers and match the product to your goal: loan, family, education, retirement.",
    "We validate the fine print: exclusions, medical questionnaire, 24/7 territory, payout timelines.",
    "We support claims and help avoid delays caused by incorrect documents.",
  ],

  term: {
    title: "Life insurance (term / risk)",
    subtitle:
      "Time-limited financial protection: payout on death, and in extended plans — critical illness and disability benefits.",
    badges: ["Family", "Loans", "24/7"],
    actions: {
      pickSumTerm: "Pick sum & term",
      policyForBank: "Policy for bank",
    },
    who: [
      "Family breadwinners and dependents",
      "Bank borrowers (mortgage/loans)",
      "Higher-risk occupations and frequent travelers",
      "Anyone wanting 3–20 years of family income protection",
    ],
    qa: [
      {
        k: "What happens to my family if I’m gone?",
        v: "The payout can cover loans and provide a financial buffer for your family during a difficult transition.",
      },
      {
        k: "Does it cover critical illness?",
        v: "Many KZ plans include benefits for cancer, heart attack or stroke — but the exact definitions/stages must be checked in the wording.",
      },
      {
        k: "My bank pushes their own policy. Can I come to you?",
        v: "Yes. We select a bank-accepted policy that is often better value than the default branch offer.",
      },
      {
        k: "Is it 24/7 worldwide?",
        v: "Often yes, but territory and exclusions vary (e.g., sports/extreme activities may have special rules).",
      },
      {
        k: "How fast will my family get the money?",
        v: "After documents are submitted, the insurer reviews and makes a decision. We pre-check the document package and support the claim to avoid delays.",
      },
    ],
    note:
      "The most common denial risk is not the event itself but policy wording: exclusions, medical questionnaire, notification deadlines. We check it before purchase.",
  },

  savings: {
    title: "Savings life insurance (endowment / education / retirement)",
    subtitle:
      "Savings + protection. You build funds for a goal, while protection helps secure the goal if something happens.",
    badges: ["Education", "Retirement", "Tax"],
    actions: {
      calcContribution: "Calculate contribution",
      checkTaxBenefit: "Check tax benefit",
    },
    who: [
      "Parents saving for children’s education",
      "People building retirement capital",
      "Those who want goal protection from day one",
      "Anyone who prefers disciplined scheduled saving",
    ],
    qa: [
      {
        k: "How is it different from a bank deposit?",
        v: "Savings life can protect the goal from day one: under policy terms, if an insured event happens, the insurer supports the payout. A deposit does not provide that protection.",
      },
      {
        k: "What return can I expect?",
        v: "Typically a guaranteed component plus potential additional income (profit participation / investment return). Exact terms depend on the product.",
      },
      {
        k: "Tax benefits in Kazakhstan: is it true?",
        v: "Some savings-life contracts (e.g., 3+ years) may qualify for tax deductions. We verify current rules and guide the correct setup.",
      },
      {
        k: "Protection from enforcement: can it be seized?",
        v: "Some products have legal protection until payout, but it depends on the product’s legal regime. We match the right structure to your goal.",
      },
      {
        k: "Can I save in USD?",
        v: "There are solutions with FX linkage or investment formats (e.g., unit-linked). It’s important to understand the mechanism and risks.",
      },
    ],
    note:
      "Savings-life products differ a lot. Don’t buy by advertisement: surrender terms, fees, and payout conditions matter.",
  },
};

export function getLifeProductsSectionDictionary(
  lang: Lang
): LifeProductsSectionDictionary {
  if (lang === "kz") return kz;
  if (lang === "en") return en;
  return ru;
}
