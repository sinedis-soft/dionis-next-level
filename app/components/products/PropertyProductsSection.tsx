// components/products/PropertyProductsSection.tsx
import Link from "next/link";
import type { Lang } from "@/dictionaries/header";
import type { ProductsPageUI } from "@/dictionaries/products";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

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

export default function PropertyProductsSection({
  lang,
  base,
  ui,
}: {
  lang: Lang;
  base: string;
  ui: ProductsPageUI;
}) {
  const topTitle = tByLang(
    lang,
    "Имущественное страхование",
    "Мүлікті сақтандыру",
    "Property insurance"
  );

  const topLead = tByLang(
    lang,
    "Три направления: жильё (квартира/дом), движимое имущество (техника/оборудование) и имущество бизнеса (офисы/склады/ТРЦ). Ниже — коротко, что страхуем и где брокер реально выгоднее.",
    "3 бағыт: тұрғын үй (пәтер/үй), жылжымалы мүлік (техника/жабдық) және бизнес мүлкі (кеңсе/қойма/ТРЦ). Төменде — нені сақтандырамыз және брокер қашан тиімді.",
    "Three tracks: home (apartment/house), movable property (equipment/tech), and business property (offices/warehouses). Below is a practical overview and where a broker is truly advantageous."
  );

  // 1) HOME
  const hTitle = tByLang(
    lang,
    "Квартиры и дома",
    "Пәтерлер мен үйлер",
    "Apartments & houses"
  );
  const hSubtitle = tByLang(
    lang,
    "Защита стен/отделки/имущества и ответственности перед соседями. Подходит для владельцев жилья, арендодателей и ипотечных клиентов.",
    "Қабырға/әрлеу/мүлік және көршілер алдындағы жауапкершілікті қорғау. Үй иелері, жалға берушілер және ипотека клиенттеріне лайық.",
    "Protection for structures/renovation/contents plus liability to neighbors. Suitable for homeowners, landlords and mortgage borrowers."
  );

  const hWhoTitle = tByLang(lang, "Кому это нужно", "Кімге керек", "Who it’s for");
  const hWho = tByLang(
    lang,
    ["Владельцы жилья", "Арендодатели", "Ипотечники (часто требуется банком)", "Тем, кто хочет закрыть риски ремонта и соседей"],
    ["Үй иелері", "Жалға берушілер", "Ипотека клиенттері (банк талап етуі мүмкін)", "Жөндеу/көрші тәуекелдерін жабғысы келетіндер"],
    ["Homeowners", "Landlords", "Mortgage borrowers (often required)", "Anyone who wants to cover repair + neighbor liability risks"]
  );

  const hWhatTitle = tByLang(lang, "Что именно страхуем", "Нені сақтандырамыз", "What is insured");
  const hWhat = tByLang(
    lang,
    [
      { k: "Конструкция", v: "стены, перекрытия (по выбранной программе)" },
      { k: "Отделка", v: "ремонт, инженерия, встроенные элементы" },
      { k: "Имущество", v: "мебель и техника (если включено)" },
      { k: "Соседи", v: "ответственность — если, например, зальёте" },
    ],
    [
      { k: "Құрылым", v: "қабырға, жабын (бағдарламаға қарай)" },
      { k: "Әрлеу", v: "жөндеу, инженерия, кіріктірілген элементтер" },
      { k: "Мүлік", v: "жиһаз және техника (қосылса)" },
      { k: "Көршілер", v: "жауапкершілік — мысалы, су кетсе" },
    ],
    [
      { k: "Structure", v: "walls, floors/ceilings (by program)" },
      { k: "Renovation", v: "finishing, utilities, built-ins" },
      { k: "Contents", v: "furniture & appliances (if included)" },
      { k: "Neighbor liability", v: "e.g., water damage to neighbors" },
    ]
  );

  const hQTitle = tByLang(lang, "Ключевые вопросы", "Негізгі сұрақтар", "Key questions");
  const hQ = tByLang(
    lang,
    [
      "Покрывает ли землетрясение (актуально для Алматы) — зависит от программы и страховщика.",
      "Покрывает ли прорыв труб, пожар, кражу — уточняем набор рисков заранее.",
      "Нужен ли осмотр: для квартиры часто достаточно фото в WhatsApp, для домов возможен выезд.",
      "«Цена спокойствия»: часто стоимость в день сопоставима с чашкой кофе — зависит от суммы и рисков.",
    ],
    [
      "Жер сілкінісі қамтыла ма (Алматы үшін маңызды) — бағдарлама/сақтандырушыға байланысты.",
      "Құбыр жарылуы, өрт, ұрлық қамтыла ма — тәуекелдерді алдын ала нақтылаймыз.",
      "Қарау керек пе: пәтерге көбіне WhatsApp фото жеткілікті, үйге кейде шығу қажет.",
      "«Тыныштық бағасы»: күніне бір кофе шамасында болуы мүмкін — сома/тәуекелге байланысты.",
    ],
    [
      "Earthquake coverage (relevant for Almaty) depends on the program/insurer.",
      "Burst pipes, fire, theft — we confirm covered risks upfront.",
      "Inspection: apartments often need only WhatsApp photos; houses may require a visit.",
      "‘Cost per day’ can be comparable to a cup of coffee, depending on sums/risks.",
    ]
  );

  const hMortgageTitle = tByLang(
    lang,
    "Ипотека: брокер vs банк",
    "Ипотека: брокер vs банк",
    "Mortgage: broker vs bank"
  );
  const hMortgageText = tByLang(
    lang,
    "Да, можно страховаться через брокера, а не в банке. Часто это дешевле в 1.5–2 раза, а Dionis подготовит пакет документов под требования любого банка Казахстана.",
    "Иә, банк арқылы емес, брокер арқылы сақтандыруға болады. Көбіне 1.5–2 есе арзан, ал Dionis кез келген ҚР банкіне қажетті құжаттарды дайындайды.",
    "Yes, you can insure via a broker, not the bank. It’s often 1.5–2x cheaper, and Dionis prepares the documents for any Kazakhstan bank requirements."
  );

  // 2) MOVABLE PROPERTY
  const mTitle = tByLang(
    lang,
    "Оборудование и техника (движимое имущество)",
    "Жабдық пен техника (жылжымалы мүлік)",
    "Equipment & movable property"
  );
  const mSubtitle = tByLang(
    lang,
    "Для дорогой техники, спецтехники, оборудования, предметов искусства — когда важно сохранить стоимость актива.",
    "Қымбат техника, арнайы техника, жабдық, өнер бұйымдары үшін — актив құнын сақтау маңызды болғанда.",
    "For high-value tech, machinery, specialized equipment and art — when preserving asset value matters."
  );

  const mWho = tByLang(
    lang,
    ["Владельцы дорогостоящего оборудования", "Компании с техникой/серверами", "Складские запасы и товары в обороте", "Спецтехника и передвижное оборудование"],
    ["Қымбат жабдық иелері", "Техника/сервері бар компаниялар", "Қоймадағы тауарлар/айналымдағы қор", "Арнайы техника және көшпелі жабдық"],
    ["Owners of expensive equipment", "Companies with IT/servers", "Stock/inventory in storage or circulation", "Special machinery and mobile equipment"]
  );

  const mWhat = tByLang(
    lang,
    [
      { k: "Что считается", v: "оргтехника/серверы, станки, мобильное оборудование, товар на складе" },
      { k: "Территория", v: "только на объекте или также при перевозке — зависит от условий" },
      { k: "Риски", v: "кража, повреждение при погрузке, стихийные бедствия, скачок напряжения (если включено)" },
      { k: "Оценка", v: "чеки/инвойсы/оценка — согласуем способ подтверждения стоимости" },
    ],
    [
      { k: "Неге жатады", v: "оргтехника/сервер, станок, көшпелі жабдық, қоймадағы тауар" },
      { k: "Аумақ", v: "тек объектте ме, әлде тасымалдауда да ма — шартқа байланысты" },
      { k: "Тәуекел", v: "ұрлық, тиеу кезінде зақым, апат, кернеу секіруі (қосылса)" },
      { k: "Бағалау", v: "чек/инвойс/бағалау — құнын растауды келісеміз" },
    ],
    [
      { k: "What counts", v: "IT/servers, machines, mobile equipment, stock in warehouse" },
      { k: "Territory", v: "on premises only or also in transit — per terms" },
      { k: "Risks", v: "theft, loading damage, natural events, power surge (if included)" },
      { k: "Valuation", v: "invoices/receipts/appraisal — we agree evidence of value" },
    ]
  );

  const mBroker = tByLang(
    lang,
    [
      "Находим страховщика под специфическое оборудование, от которого другие отказываются.",
      "Сверяем территорию и режим эксплуатации (объект/перевозка/выезды).",
      "Проверяем исключения — они решают судьбу выплаты.",
    ],
    [
      "Басқалар бас тартатын арнайы жабдыққа да сақтандырушы табамыз.",
      "Аумақ пен пайдалану режимін нақтылаймыз (объект/тасымал/шығу).",
      "Алып тастауларды тексереміз — төлемді сол шешеді.",
    ],
    [
      "We can place even niche equipment that others refuse.",
      "We validate territory and usage mode (site/transit/off-site).",
      "We check exclusions — they determine claim outcome.",
    ]
  );

  // 3) BUSINESS PROPERTY
  const bTitle = tByLang(
    lang,
    "Имущество для бизнеса (офисы, склады, ТРЦ)",
    "Бизнес мүлкі (кеңсе, қойма, ТРЦ)",
    "Business property (offices, warehouses)"
  );
  const bSubtitle = tByLang(
    lang,
    "Для собственников и арендаторов, промышленных предприятий и логистики. Можно собрать комплекс: здание + имущество + ответственность + BI (перерыв в деятельности).",
    "Иелері мен жалға алушыларға, өндіріс пен логистикаға. Кешенді жинауға болады: ғимарат + мүлік + жауапкершілік + BI (тоқтап қалу).",
    "For owners/tenants, industrial and logistics companies. Can be structured as a package: building + contents + liability + BI (business interruption)."
  );

  const bWho = tByLang(
    lang,
    ["Собственники коммерческой недвижимости", "Арендаторы (требование договора)", "Склады и логистические центры", "Промышленные объекты"],
    ["Коммерциялық жылжымайтын мүлік иелері", "Жалға алушылар (шарт талабы)", "Қойма және логистика", "Өндірістік объектілер"],
    ["Commercial property owners", "Tenants (lease requirement)", "Warehouses & logistics centers", "Industrial sites"]
  );

  const bWhat = tByLang(
    lang,
    [
      { k: "Типы объектов", v: "склады, офисы/БЦ, цеха, ангары, инженерные сооружения" },
      { k: "Комплекс", v: "можно добавить BI (перерыв в производстве/торговле) — если актуально" },
      { k: "Скидки", v: "охрана, пожарная сигнализация, регламенты — снижают тариф" },
      { k: "Скорость", v: "делаем полис под договор аренды/контракты в короткие сроки" },
    ],
    [
      { k: "Объект түрі", v: "қойма, кеңсе/БЦ, цех, ангар, инженерлік құрылыс" },
      { k: "Кешен", v: "BI қосуға болады (тоқтап қалу) — қажет болса" },
      { k: "Жеңілдік", v: "күзет, өрт дабылы, регламент — тарифті төмендетеді" },
      { k: "Жылдамдық", v: "жалға алу шартына/контрактқа тез дайындаймыз" },
    ],
    [
      { k: "Objects", v: "warehouses, offices, production, hangars, engineering structures" },
      { k: "Package", v: "BI can be added (business interruption) if relevant" },
      { k: "Discounts", v: "security, fire systems, procedures — reduce tariff" },
      { k: "Speed", v: "fast issuance for leases and contracts" },
    ]
  );

  const bHelpTitle = tByLang(lang, "Помощь брокера", "Брокер көмегі", "Broker support");
  const bHelp = tByLang(
    lang,
    [
      "Анализ 5–7 программ страховых компаний РК под ваш объект.",
      "Проверка исключений и юридических ловушек (чтобы не остаться без выплаты).",
      "Сопровождение крупных убытков: оценка, аджастеры, коммуникации.",
    ],
    [
      "Объектіңізге сай ҚР сақтандырушыларының 5–7 бағдарламасын салыстыру.",
      "Алып тастауларды және шарттағы «қақпандарды» тексеру.",
      "Ірі шығындарды сүйемелдеу: бағалау, аджастер, байланыс.",
    ],
    [
      "We compare 5–7 Kazakhstan insurers’ programs for your object.",
      "We check exclusions and legal traps (to avoid claim denial).",
      "We support major claims: assessment, adjusters, communication.",
    ]
  );

  return (
    <section id="property" className="py-10 sm:py-14 bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок */}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3A5F]">
              {topTitle}
            </h2>
            <p className="mt-2 text-gray-700">{topLead}</p>
          </div>

          <div className="text-sm text-gray-600">
            <span className="mr-2">{ui.quick}:</span>
            <span className="font-mono">property</span>
          </div>
        </div>

        {/* 3 большие карточки */}
        <div className="mt-7 space-y-6">
          {/* HOME */}
          <CardShell
            title={hTitle}
            subtitle={hSubtitle}
            badges={tByLang(lang, ["Жильё", "Ипотека"], ["Тұрғын үй", "Ипотека"], ["Home", "Mortgage"])}
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
                  {tByLang(lang, "Запросить расчёт", "Есеп сұрау", "Request a quote")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {hWhoTitle}
                </h4>
                <BulletList items={hWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {hWhatTitle}
                </h4>
                <KeyValueList rows={hWhat} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                {hQTitle}
              </h4>
              <BulletList items={hQ} />
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-2">
                {hMortgageTitle}
              </h4>
              <p className="text-sm text-gray-700">{hMortgageText}</p>
            </div>
          </CardShell>

          {/* MOVABLE */}
          <CardShell
            title={mTitle}
            subtitle={mSubtitle}
            badges={tByLang(lang, ["Оборудование", "Техника"], ["Жабдық", "Техника"], ["Equipment", "Assets"])}
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
                  {tByLang(lang, "Запросить условия", "Шарт сұрау", "Request terms")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {hWhoTitle}
                </h4>
                <BulletList items={mWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {tByLang(lang, "Ключевые параметры", "Негізгі параметр", "Key parameters")}
                </h4>
                <KeyValueList rows={mWhat} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                {tByLang(lang, "Специфика брокера", "Брокер ерекшелігі", "Broker advantage")}
              </h4>
              <BulletList items={mBroker} />
            </div>
          </CardShell>

          {/* BUSINESS */}
          <CardShell
            title={bTitle}
            subtitle={bSubtitle}
            badges={tByLang(lang, ["Бизнес", "Комплекс"], ["Бизнес", "Кешен"], ["Business", "Package"])}
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
                  {tByLang(lang, "Запросить аудит/оферты", "Аудит/ұсыныс сұрау", "Request audit/offers")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {hWhoTitle}
                </h4>
                <BulletList items={bWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {tByLang(lang, "Что включаем", "Нені қосамыз", "What we include")}
                </h4>
                <KeyValueList rows={bWhat} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                {bHelpTitle}
              </h4>
              <BulletList items={bHelp} />
            </div>
          </CardShell>
        </div>
      </div>
    </section>
  );
}
