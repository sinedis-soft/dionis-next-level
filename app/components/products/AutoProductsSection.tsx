// app/components/products/AutoProductsSection.tsx
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
        {sub ? <p className="mt-2 text-sm sm:text-base text-gray-700">{sub}</p> : null}
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

      {actions ? <div className="mt-6 flex flex-col sm:flex-row gap-3">{actions}</div> : null}
    </article>
  );
}

export default function AutoProductsSection({ lang, base, ui }: Props) {
  const topTitle = tByLang(lang, "Автострахование", "Автосақтандыру", "Motor insurance");
  const topLead = tByLang(
    lang,
    "Три ключевых продукта для поездок и маршрутов: Green Card, ОСАГО РФ и КАСКО. Ниже — коротко и по делу: что покрывает каждый продукт и кому он нужен.",
    "Сапарлар мен маршруттарға арналған 3 негізгі өнім: Green Card, РФ ОСАГО және КАСКО. Төменде — әр өнім нені жабады және кімге керек екенін қысқа әрі нақты түсіндіреміз.",
    "Three key products for trips and routes: Green Card, OSAGO Russia and CASCO. Below is a practical overview: what each covers and who needs it."
  );

  // ---------- GREEN CARD ----------
  const gcTitle = tByLang(lang, "Зелёная карта (Green Card)", "Green Card (Жасыл карта)", "Green Card");
  const gcSubtitle = tByLang(
    lang,
    "Международное страхование ответственности (аналог ОСАГО) за рубежом. Покрывает ущерб третьим лицам, если вы стали виновником ДТП в стране действия полиса.",
    "Шетелдегі азаматтық жауапкершілікті сақтандыру (ОСАГО аналогы). Полис қолданылатын елде сіз кінәлі болған ЖКО кезінде үшінші тұлғаларға келтірілген залалды өтейді.",
    "International third-party liability insurance abroad (similar to MTPL). Covers damage to third parties if you cause an accident in a covered country."
  );

  const gcWhoTitle = tByLang(lang, "Кому это нужно", "Кімге керек", "Who it’s for");
  const gcWho = tByLang(
    lang,
    [
      "Владельцам авто на номерах Казахстана при выезде в ЕС/Турцию и другие страны системы",
      "Путешествия на личном авто и автотуризм",
      "Коммерческие поездки (если категория ТС допускается условиями)",
      "Тем, кто хочет оформить заранее и не тратить время на границе",
    ],
    [
      "Қазақстан нөміріндегі көлікпен ЕО/Түркия және басқа елдерге шығатындарға",
      "Жеке автосаяхат пен туризмге",
      "Коммерциялық сапарларға (ТС санаты шартқа сай болса)",
      "Шекарада уақыт жоғалтпай, алдын ала рәсімдегісі келетіндерге",
    ],
    [
      "Kazakhstan-registered vehicles entering EU/Türkiye and other system countries",
      "Personal trips and road tourism",
      "Commercial trips (if vehicle category is allowed by terms)",
      "Those who prefer arranging in advance (no border queues)",
    ]
  );

  const gcIncludedTitle = tByLang(lang, "Что покрывает", "Нені жабады", "What it covers");
  const gcIncluded = tByLang(
    lang,
    [
      { k: "Вред имуществу", v: "ущерб чужому авто/имуществу — по лимитам страны ДТП" },
      { k: "Вред здоровью", v: "лечение/компенсации пострадавшим — по правилам страны ДТП" },
      { k: "Территория", v: "страны системы Green Card (смотрите перечень и ограничения)" },
      { k: "Срок", v: "обычно 1–12 месяцев (в зависимости от тарифа)" },
    ],
    [
      { k: "Мүлікке зиян", v: "басқа авто/мүлік — ЖКО болған ел лимиттері бойынша" },
      { k: "Денсаулыққа зиян", v: "зардап шеккендерге өтем — ЖКО болған ел ережесімен" },
      { k: "Аумақ", v: "Green Card жүйесіндегі елдер (тізім/шектеуді қараңыз)" },
      { k: "Мерзім", v: "әдетте 1–12 ай (тарифке байланысты)" },
    ],
    [
      { k: "Property damage", v: "damage to third-party property/vehicles — per local limits" },
      { k: "Bodily injury", v: "compensation/medical costs for victims — per local rules" },
      { k: "Territory", v: "Green Card system countries (check list/exclusions)" },
      { k: "Term", v: "typically 1–12 months (depends on tariff)" },
    ]
  );

  const gcNote = tByLang(
    lang,
    "Важно: Green Card НЕ ремонтирует ваш автомобиль. Это ответственность перед третьими лицами.",
    "Маңызды: Green Card өз көлігіңізді жөндемейді. Бұл — үшінші тұлғалар алдындағы жауапкершілік.",
    "Important: Green Card does NOT repair your own car. It is third-party liability cover."
  );

  const gcBrokerTitle = tByLang(
    lang,
    "Брокер vs страховая",
    "Брокер vs сақтандыру компаниясы",
    "Broker vs insurer"
  );
  const gcBroker = tByLang(
    lang,
    [
      "Проверяем маршрут и подбираем правильную зону покрытия (чтобы не было «страна не входит»).",
      "Сверяем сроки и дату начала действия, чтобы полис «накрывал» весь маршрут.",
      "Убираем риск ошибок в данных (ТС/категория/владелец) — это критично на границе и при ДТП.",
    ],
    [
      "Маршрутқа сай қамту аймағын дұрыс таңдаймыз (ел кірмей қалмасын).",
      "Басталу күні мен мерзімді нақтылаймыз — бүкіл сапар жабылуы керек.",
      "Деректердегі қателер тәуекелін азайтамыз (ТС/санат/иесі) — шекарада маңызды.",
    ],
    [
      "We validate your route and choose the right territory (avoid ‘country not covered’ issues).",
      "We align start date and term to cover the whole trip.",
      "We reduce data-entry risks (vehicle/category/owner) — critical at the border and in claims.",
    ]
  );

  // ---------- OSAGO RF ----------
  const osTitle = tByLang(lang, "ОСАГО РФ для нерезидентов", "РФ ОСАГО (резидент еместерге)", "OSAGO Russia (non-residents)");
  const osSubtitle = tByLang(
    lang,
    "Обязательное страхование ответственности для движения по дорогам РФ на авто с иностранными номерами. Покрывает ущерб третьим лицам при ДТП в РФ.",
    "РФ жолдарында шетелдік нөмірмен жүруге міндетті жауапкершілік сақтандыруы. РФ аумағындағы ЖКО кезінде үшінші тұлғаларға келтірілген залалды өтейді.",
    "Mandatory third-party liability insurance for driving in Russia with foreign plates. Covers damage to third parties in Russia."
  );

  const osWhoTitle = gcWhoTitle;
  const osWho = tByLang(
    lang,
    [
      "Тем, кто въезжает в РФ на автомобиле с иностранными номерами",
      "Для поездок, транзита и регулярных маршрутов в РФ",
      "Чтобы избежать штрафов и проблем при проверках",
      "Кому важна электронная выдача без посещения офиса",
    ],
    [
      "Шетелдік нөмірмен РФ-қа кіретіндерге",
      "РФ-та сапар/транзит/тұрақты маршруттарға",
      "Айыппұл және тексерістегі мәселелерден сақтану үшін",
      "Офиссіз электронды рәсімдеуді қалайтындарға",
    ],
    [
      "Anyone entering Russia with foreign plates",
      "Trips, transit, and recurring routes in Russia",
      "To avoid fines and issues at checks",
      "Those who prefer e-policy issuance without office visits",
    ]
  );

  const osIncludedTitle = tByLang(lang, "Что входит", "Не кіреді", "What it includes");
  const osIncluded = tByLang(
    lang,
    [
      { k: "Ответственность", v: "вред имуществу и здоровью третьих лиц (по лимитам РФ)" },
      { k: "Территория", v: "вся территория РФ" },
      { k: "Формат", v: "электронный полис (как правило, достаточно PDF)" },
      { k: "Срок", v: "подбирается под поездку (важно покрыть весь период)" },
    ],
    [
      { k: "Жауапкершілік", v: "үшінші тұлғалардың мүлкі/денсаулығы (РФ лимиттері бойынша)" },
      { k: "Аумақ", v: "РФ аумағы түгел" },
      { k: "Формат", v: "электронды полис (әдетте PDF жеткілікті)" },
      { k: "Мерзім", v: "сапарға сай таңдалады (бүкіл кезең жабылсын)" },
    ],
    [
      { k: "Liability", v: "property and bodily injury to third parties (per RF limits)" },
      { k: "Territory", v: "entire Russian Federation" },
      { k: "Format", v: "electronic policy (PDF is typically sufficient)" },
      { k: "Term", v: "chosen to match your trip (must cover the full period)" },
    ]
  );

  const osNote = tByLang(
    lang,
    "Важно: ОСАГО РФ — это ответственность. Оно не покрывает ремонт вашего автомобиля.",
    "Маңызды: РФ ОСАГО — жауапкершілік. Өз көлігіңізді жөндеуді өтемейді.",
    "Important: OSAGO is liability insurance. It does not cover repairs for your own vehicle."
  );

  const osBrokerTitle = gcBrokerTitle;
  const osBroker = tByLang(
    lang,
    [
      "Подбираем срок так, чтобы не было «разрыва» покрытия на маршруте.",
      "Проверяем корректность данных (ТС/водитель/период) — ошибки = риск отказа/штрафов.",
      "Помогаем с форматом получения и хранением документа (e-mail/мессенджер).",
    ],
    [
      "Маршрутта қамту «үзіліп қалмас» үшін мерзімді дұрыс таңдаймыз.",
      "Деректердің дұрыстығын тексереміз (ТС/жүргізуші/мерзім) — қате қауіпті.",
      "Құжатты алу және сақтау форматын реттейміз (e-mail/мессенджер).",
    ],
    [
      "We choose the term to avoid coverage gaps on the route.",
      "We verify all details (vehicle/driver/period) — errors can cause issues.",
      "We help with delivery and storing the document (email/messenger).",
    ]
  );

  // ---------- CASCO KZ ----------
  const caTitle = tByLang(lang, "КАСКО в Казахстане", "Қазақстандағы КАСКО", "CASCO in Kazakhstan");
  const caSubtitle = tByLang(
    lang,
    "Добровольная защита вашего автомобиля. Покрывает ущерб/утрату авто по выбранной программе (включая крупные риски).",
    "Көлігіңізді ерікті қорғау. Бағдарламаға қарай көліктің зақымдануын/жоғалуын өтейді (ірі тәуекелдерді қоса).",
    "Voluntary protection for your own vehicle. Covers damage/loss depending on the chosen program (including major risks)."
  );

  const caWhoTitle = gcWhoTitle;
  const caWho = tByLang(
    lang,
    [
      "Новый автомобиль (дорогой кузовной ремонт/оптика/датчики)",
      "Авто в кредите / залоге (часто требуется банком)",
      "Городская эксплуатация и плотный трафик",
      "Для спокойствия: страхуем крупные риски вместо непредвиденных затрат",
    ],
    [
      "Жаңа автомобиль (жөндеу қымбат)",
      "Несие/кепілдегі авто (банк талап етуі мүмкін)",
      "Қалада жиі жүру және тығыз трафик",
      "Тыныштық үшін: ірі тәуекелдерді жабу",
    ],
    [
      "New vehicle (repairs are expensive: bodywork, lights, sensors)",
      "Loan/pledged vehicle (often required by the bank)",
      "Dense city traffic and daily usage",
      "Peace of mind: cover major risks instead of unexpected costs",
    ]
  );

  const caIncludedTitle = tByLang(lang, "Что обычно входит", "Әдетте не кіреді", "What is typically covered");
  const caIncluded = tByLang(
    lang,
    [
      { k: "ДТП", v: "повреждения по условиям программы (в т.ч. если виноваты вы — если предусмотрено)" },
      { k: "Угон/хищение", v: "по условиям и исключениям страховщика" },
      { k: "Природа", v: "град/буря/затопление и т.п. — если включено" },
      { k: "Вандалы", v: "умышленные повреждения третьими лицами" },
    ],
    [
      { k: "ЖКО", v: "бағдарлама шартына қарай (кейде өз кінәңіз болса да)" },
      { k: "Ұрлық", v: "сақтандырушының шарттары/ерекшеліктеріне қарай" },
      { k: "Табиғат", v: "бұршақ/дауыл/су басу — егер қосылған болса" },
      { k: "Вандалдар", v: "үшінші тұлғалардың қасақана зияны" },
    ],
    [
      { k: "Accident damage", v: "per program terms (sometimes even if you’re at fault)" },
      { k: "Theft", v: "subject to insurer terms/exclusions" },
      { k: "Natural hazards", v: "hail/storm/flood etc. — if included" },
      { k: "Vandalism", v: "intentional third-party damage" },
    ]
  );

  const caBrokerTitle = gcBrokerTitle;
  const caBroker = tByLang(
    lang,
    [
      "Сравниваем программы: исключения, лимиты, франшизы, ремонт у дилера/СТО.",
      "Подбираем под задачу: «под банк», «максимум защиты», «дешевле с франшизой».",
      "Снижаем риск «купили не то»: в КАСКО формулировки важнее рекламных обещаний.",
    ],
    [
      "Бағдарламаларды салыстырамыз: алып тастаулар, лимиттер, франшиза, жөндеу форматы.",
      "Мақсатқа сай таңдаймыз: «банк үшін», «максимум қорғау», «франшизамен арзанырақ».",
      "«Дұрыс емес полис» тәуекелін азайтамыз: мәтін шешеді.",
    ],
    [
      "We compare programs: exclusions, limits, deductibles, dealer/repair options.",
      "We tailor it: bank requirement, maximum protection, or cheaper with deductible.",
      "We reduce the risk of buying the wrong product: wording matters in CASCO.",
    ]
  );

  const franchiseTitle = tByLang(lang, "Франшиза: короткий ликбез", "Франшиза: қысқаша түсінік", "Deductible: quick guide");
  const franchiseText = tByLang(
    lang,
    "Франшиза — часть убытка, которую вы оплачиваете сами. Чем выше франшиза, тем дешевле полис. Это рационально, если вы готовы закрывать мелкие повреждения самостоятельно и страховать только крупные риски. Главное — заранее понимать, какую сумму вы готовы брать на себя при каждом страховом случае.",
    "Франшиза — шығынның бір бөлігін өзіңіз төлейсіз. Франшиза жоғары болған сайын полис арзандайды. Ұсақ зақымдарды өзіңіз жабуға дайын болсаңыз, тек ірі тәуекелдерді сақтандыру тиімді. Маңыздысы — әр жағдай бойынша өз үлесіңізді алдын ала түсіну.",
    "A deductible is the part of the loss you pay yourself. Higher deductible → cheaper policy. It makes sense if you can self-fund minor damage and insure only major risks. The key is to choose an amount you are comfortable paying per claim."
  );

  return (
    <section id="auto" className="py-10 sm:py-14 bg-[#F7F7F7]">
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
            <span className="font-mono">#auto</span>
          </div>
        </div>

        {/* 3 большие карточки */}
        <div className="mt-7 space-y-6">
          {/* GREEN CARD */}
          <CardShell
            title={gcTitle}
            subtitle={gcSubtitle}
            badges={tByLang(lang, ["Онлайн", "Международно"], ["Онлайн", "Халықаралық"], ["Online", "International"])}
            actions={
              <>
                <Link
                  href={`${base}/green-card`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "bg-[#23376C] text-white hover:opacity-95 transition",
                    "text-sm font-medium"
                  )}
                >
                  {ui.btnGreenCard}
                </Link>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {tByLang(lang, "Задать вопрос", "Сұрақ қою", "Ask a question")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{gcWhoTitle}</h4>
                <BulletList items={gcWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{gcIncludedTitle}</h4>
                <KeyValueList rows={gcIncluded} note={gcNote} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{gcBrokerTitle}</h4>
              <BulletList items={gcBroker} />
            </div>
          </CardShell>

          {/* OSAGO RF */}
          <CardShell
            title={osTitle}
            subtitle={osSubtitle}
            badges={tByLang(lang, ["Онлайн", "Въезд в РФ"], ["Онлайн", "РФ"], ["Online", "Russia"])}
            actions={
              <>
                <Link
                  href={`${base}/osago-rf`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "bg-[#23376C] text-white hover:opacity-95 transition",
                    "text-sm font-medium"
                  )}
                >
                  {ui.btnOsago}
                </Link>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {tByLang(lang, "Уточнить срок/маршрут", "Мерзім/маршрут нақтылау", "Clarify term/route")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{osWhoTitle}</h4>
                <BulletList items={osWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{osIncludedTitle}</h4>
                <KeyValueList rows={osIncluded} note={osNote} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{osBrokerTitle}</h4>
              <BulletList items={osBroker} />
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                {tByLang(lang, "Связка РФ + ЕС", "РФ + ЕО бағыты", "Russia + EU route")}
              </h4>
              <p className="text-sm text-gray-700">
                {tByLang(
                  lang,
                  "Если маршрут включает и РФ, и страны Green Card — чаще всего нужны оба полиса: ОСАГО РФ для РФ и Green Card для других стран.",
                  "Маршрутта РФ та, Green Card елдері де болса — әдетте екі полис керек: РФ үшін ОСАГО, басқа елдер үшін Green Card.",
                  "If your route includes both Russia and Green Card countries, you typically need both policies: OSAGO for Russia and Green Card for other countries."
                )}
              </p>
            </div>
          </CardShell>

          {/* CASCO KZ */}
          <CardShell
            title={caTitle}
            subtitle={caSubtitle}
            badges={tByLang(lang, ["По запросу", "Казахстан"], ["Сұраныс бойынша", "Қазақстан"], ["On request", "Kazakhstan"])}
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
                  {tByLang(lang, "Запросить расчёт КАСКО", "КАСКО есептеу сұрау", "Request a CASCO quote")}
                </Link>
                <a
                  href="tel:+77273573030"
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  +7 (727) 357-30-30
                </a>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{caWhoTitle}</h4>
                <BulletList items={caWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{caIncludedTitle}</h4>
                <KeyValueList
                  rows={caIncluded}
                  note={tByLang(
                    lang,
                    "Важно: у разных страховщиков отличаются исключения, формат ремонта (дилер/СТО), лимиты и условия по стеклам/фарам — перед оформлением сверяем конкретную программу.",
                    "Маңызды: сақтандырушылар арасында алып тастаулар, жөндеу форматы, лимиттер және әйнек/шам шарттары өзгеше — рәсімдер алдында нақты бағдарламаны тексереміз.",
                    "Important: exclusions, repair model, limits and glass/lamps conditions vary by insurer — we validate the exact program before issuance."
                  )}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{caBrokerTitle}</h4>
              <BulletList items={caBroker} />
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-2">{franchiseTitle}</h4>
              <p className="text-sm text-gray-700">{franchiseText}</p>
            </div>
          </CardShell>
        </div>
      </div>
    </section>
  );
}
