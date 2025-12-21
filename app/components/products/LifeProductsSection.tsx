// app/components/products/LifeProductsSection.tsx
import Link from "next/link";
import type { Lang } from "@/dictionaries/header";
import type { ProductsPageUI } from "@/dictionaries/products";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

type Props = {
  lang: Lang;
  base: string;
  ui: ProductsPageUI;
};

function tByLang<T>(lang: Lang, ru: T, kz: T, en: T): T {
  if (lang === "kz") return kz;
  if (lang === "en") return en;
  return ru;
}

function SectionTitle({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="max-w-4xl">
        <h3 className="text-xl sm:text-2xl font-bold text-[#0f2238]">
          {children}
        </h3>
        {sub ? (
          <p className="mt-2 text-sm sm:text-base text-gray-700">{sub}</p>
        ) : null}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-gray-700">
      {items.map((x) => (
        <li key={x} className="flex gap-2">
          <span aria-hidden className="mt-[2px]">
            •
          </span>
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

function KeyValueList({
  rows,
  note,
}: {
  rows: Array<{ k: string; v: string }>;
  note?: string;
}) {
  return (
    <div>
      <div className="space-y-3 text-sm">
        {rows.map((row) => (
          <div
            key={row.k}
            className="flex items-start justify-between gap-4 border-b border-black/5 pb-3 last:border-b-0 last:pb-0"
          >
            <div className="font-medium text-[#0f2238]">{row.k}</div>
            <div className="text-gray-700 text-right max-w-[70%]">{row.v}</div>
          </div>
        ))}
      </div>
      {note ? <p className="mt-4 text-xs text-gray-500">{note}</p> : null}
    </div>
  );
}

function CardShell({
  title,
  subtitle,
  badges,
  children,
  actions,
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  badges?: string[];
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white shadow-sm p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <SectionTitle sub={subtitle}>{title}</SectionTitle>

        {badges?.length ? (
          <div className="flex gap-2 flex-wrap">
            {badges.map((b) => (
              <span
                key={b}
                className="text-xs px-2 py-1 rounded-full bg-[#F4F6FA] text-[#1A3A5F] border border-black/5"
              >
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-6 space-y-6">{children}</div>

      {actions ? (
        <div className="mt-6 flex flex-col sm:flex-row gap-3">{actions}</div>
      ) : null}
    </article>
  );
}

export default function LifeProductsSection({ lang, base, ui }: Props) {
  const topTitle = tByLang(
    lang,
    "Страхование жизни",
    "Өмірді сақтандыру",
    "Life insurance"
  );

  const topLead = tByLang(
    lang,
    "Два ключевых продукта: рисковое (срочное) страхование жизни — чтобы защитить семью и кредиты, и накопительное страхование — чтобы копить на образование/пенсию с защитой. Ниже — ответы на вопросы, которые реально волнуют.",
    "Екі негізгі өнім: тәуекелдік (мерзімді) өмір сақтандыруы — отбасы мен несиені қорғау үшін, және жинақтаушы сақтандыру — білім/зейнетақы үшін қорғаумен бірге жинау. Төменде — маңызды сұрақтарға нақты жауаптар.",
    "Two key products: term (risk) life insurance to protect family and loans, and savings life insurance to build education/retirement funds with protection. Below are practical answers to common questions."
  );

  // ---------- 1) TERM / RISK LIFE ----------
  const rTitle = tByLang(
    lang,
    "Страхование жизни (рисковое / срочное)",
    "Өмірді сақтандыру (тәуекелдік / мерзімді)",
    "Life insurance (term / risk)"
  );

  const rSubtitle = tByLang(
    lang,
    "Финансовая защита семьи и обязательств на срок: выплата при уходе из жизни, а в расширенных программах — при критических заболеваниях и инвалидности.",
    "Белгілі мерзімге отбасы мен міндеттемені қаржылай қорғау: қайтыс болғанда төлем, ал кеңейтілген бағдарламаларда — критикалық ауру/мүгедектік кезінде төлем.",
    "Time-limited financial protection: payout on death, and in extended plans — critical illness and disability benefits."
  );

  const whoTitle = tByLang(lang, "Кому это нужно", "Кімге керек", "Who it’s for");
  const rWho = tByLang(
    lang,
    [
      "Кормильцам семьи и тем, у кого есть иждивенцы",
      "Заемщикам банков (ипотека/кредит)",
      "Людям с повышенными рисками: опасные профессии, частые командировки",
      "Тем, кто хочет защитить уровень жизни семьи на 3–20 лет",
    ],
    [
      "Отбасының асыраушысына және асырауындағы адамдары барларға",
      "Банк заемшыларына (ипотека/несие)",
      "Тәуекелі жоғары адамдарға: қауіпті кәсіп, жиі іссапар",
      "Отбасының өмір деңгейін 3–20 жылға қорғағысы келетіндерге",
    ],
    [
      "Family breadwinners and dependents",
      "Bank borrowers (mortgage/loans)",
      "Higher-risk occupations and frequent travelers",
      "Anyone wanting 3–20 years of family income protection",
    ]
  );

  const rQA = tByLang(
    lang,
    [
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
    [
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
    [
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
    ]
  );

  const rNote = tByLang(
    lang,
    "Самый частый риск отказа — не «событие», а формулировки: исключения, мед.анкета, сроки уведомления. Мы проверяем это до покупки.",
    "Ең жиі бас тарту себебі — оқиға емес, шарт мәтіні: алып тастаулар, мед.сауалнама, хабарлау мерзімі. Біз мұны сатып алмас бұрын тексереміз.",
    "The most common denial risk is not the event itself but policy wording: exclusions, medical questionnaire, notification deadlines. We check it before purchase."
  );

  // ---------- 2) SAVINGS LIFE (ENDOWMENT) ----------
  const sTitle = tByLang(
    lang,
    "Накопительное страхование жизни (НСЖ / образовательное / пенсионное)",
    "Жинақтаушы өмірді сақтандыру (ЖӨС / білім / зейнетақы)",
    "Savings life insurance (endowment / education / retirement)"
  );

  const sSubtitle = tByLang(
    lang,
    "Накопления + страховая защита. Вы копите на цель, а при неблагоприятном событии страховая обеспечивает достижение цели по условиям договора.",
    "Жинақ + сақтандыру қорғанысы. Мақсатқа жинайсыз, ал қолайсыз жағдай болса — шарт бойынша сақтандыру мақсатқа жетуге көмектеседі.",
    "Savings + protection. You build funds for a goal, while protection helps secure the goal if something happens."
  );

  const sWho = tByLang(
    lang,
    [
      "Родителям: накопить на обучение ребёнка",
      "Тем, кто хочет сформировать пенсионный капитал",
      "Тем, кому важна защита цели с первого дня",
      "Тем, кто хочет дисциплинированно копить по графику",
    ],
    [
      "Ата-аналарға: баланың оқуына жинау",
      "Зейнетақы капиталы керек адамдарға",
      "Мақсатты бірінші күннен қорғағысы келетіндерге",
      "Кесте бойынша тәртіпті жинағысы келетіндерге",
    ],
    [
      "Parents saving for children’s education",
      "People building retirement capital",
      "Those who want goal protection from day one",
      "Anyone who prefers disciplined scheduled saving",
    ]
  );

  const sQA = tByLang(
    lang,
    [
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
    [
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
    [
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
    ]
  );

  const sNote = tByLang(
    lang,
    "НСЖ бывает разным. Если нужен «максимум защиты» — выбираем одно. Если приоритет «накопить» — другое. Нельзя покупать по рекламе: важны условия выплат, досрочного расторжения и комиссии.",
    "ЖӨС әртүрлі болады. «Максимум қорғаныс» керек болса — бір шешім, «жинақ» басым болса — басқа. Жарнамаға қарап алмау керек: төлем, мерзімінен бұрын тоқтату, комиссия шарттары маңызды.",
    "Savings-life products differ a lot. Don’t buy by advertisement: surrender terms, fees, and payout conditions matter."
  );

  const brokerTitle = tByLang(
    lang,
    "Почему брокер",
    "Неге брокер",
    "Why a broker"
  );

  const brokerBullets = tByLang(
    lang,
    [
      "Сравним страховые и подберём условия под цель: «кредит», «семья», «образование», «пенсия».",
      "Проверим «мелкий шрифт»: исключения, мед.анкета, территория 24/7, сроки выплат.",
      "Соберём правильный пакет документов и ускорим урегулирование при страховом событии.",
    ],
    [
      "Мақсатқа сай салыстырамыз: «несие», «отбасы», «оқу», «зейнетақы».",
      "«Ұсақ мәтінді» тексереміз: алып тастаулар, мед.сауалнама, 24/7 аумақ, төлем мерзімі.",
      "Құжат пакетін дұрыс жинап, сақтандыру жағдайында сүйемелдейміз.",
    ],
    [
      "We compare insurers and match the product to your goal: loan, family, education, retirement.",
      "We validate the fine print: exclusions, medical questionnaire, 24/7 territory, payout timelines.",
      "We support claims and help avoid delays caused by incorrect documents.",
    ]
  );

  return (
    <section id="life" className="py-10 sm:py-14 bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок блока */}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3A5F]">
              {topTitle}
            </h2>
            <p className="mt-2 text-gray-700">{topLead}</p>
          </div>

          {/* Якорь */}
          <div className="text-sm text-gray-600">
            <span className="mr-2">{ui.quick}:</span>
            <span className="font-mono">#life</span>
          </div>
        </div>

        {/* 2 большие карточки */}
        <div className="mt-7 space-y-6">
          {/* 1) Term / Risk */}
          <CardShell
            title={rTitle}
            subtitle={rSubtitle}
            badges={tByLang(
              lang,
              ["Семья", "Кредиты", "24/7"],
              ["Отбасы", "Несие", "24/7"],
              ["Family", "Loans", "24/7"]
            )}
            actions={
              <>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "bg-[#23376C] text-white hover:opacity-95 transition",
                    "text-sm font-medium"
                  )}
                >
                  {tByLang(lang, "Подобрать сумму и срок", "Сома/мерзім таңдау", "Pick sum & term")}
                </Link>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {tByLang(lang, "Полис для банка", "Банкқа полис", "Policy for bank")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{whoTitle}</h4>
                <BulletList items={rWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {tByLang(lang, "Ключевые вопросы", "Негізгі сұрақтар", "Key questions")}
                </h4>
                <KeyValueList rows={rQA} note={rNote} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{brokerTitle}</h4>
              <BulletList items={brokerBullets} />
            </div>
          </CardShell>

          {/* 2) Savings / Endowment */}
          <CardShell
            title={sTitle}
            subtitle={sSubtitle}
            badges={tByLang(
              lang,
              ["Образование", "Пенсия", "Налог"],
              ["Білім", "Зейнетақы", "Салық"],
              ["Education", "Retirement", "Tax"]
            )}
            actions={
              <>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "bg-[#23376C] text-white hover:opacity-95 transition",
                    "text-sm font-medium"
                  )}
                >
                  {tByLang(lang, "Рассчитать взнос", "Жарнаны есептеу", "Calculate contribution")}
                </Link>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {tByLang(lang, "Проверить льготы", "Жеңілдікті тексеру", "Check tax benefit")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{whoTitle}</h4>
                <BulletList items={sWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {tByLang(lang, "Ключевые вопросы", "Негізгі сұрақтар", "Key questions")}
                </h4>
                <KeyValueList rows={sQA} note={sNote} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{brokerTitle}</h4>
              <BulletList items={brokerBullets} />
            </div>
          </CardShell>
        </div>
      </div>
    </section>
  );
}
