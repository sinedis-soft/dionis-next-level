// app/components/products/MedicalProductsSection.tsx
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

export default function MedicalProductsSection({ lang, base, ui }: Props) {
  const topTitle = tByLang(
    lang,
    "Медицинское страхование",
    "Медициналық сақтандыру",
    "Medical insurance"
  );

  const topLead = tByLang(
    lang,
    "В Казахстане важно различать ОСМС и ДМС. ОСМС — базовая (гос.) медицина по перечню услуг и правилам системы. ДМС — доступ к частным клиникам по договору, с ассистансом 24/7 и понятным маршрутом пациента. Мы выступаем «проводником»: подбираем программу, сеть клиник и проверяем исключения.",
    "Қазақстанда ОСМС пен ДМС-тің айырмасы маңызды. ОСМС — мемлекеттік жүйе аясындағы базалық қызметтер. ДМС — келісім бойынша жеке клиникаларға қолжетімділік, 24/7 ассистанс және нақты пациент маршруты. Біз «бағыттаушы» ретінде бағдарлама, клиникалар желісі мен алып тастауларды дұрыс таңдаймыз.",
    "In Kazakhstan it’s crucial to separate OSMS and DMS. OSMS is the baseline state system with defined services and rules. DMS is access to private clinics under a contract, with 24/7 assistance and a clear care pathway. We act as a guide: selecting a plan, clinic network and verifying exclusions."
  );

  const diffTitle = tByLang(lang, "ОСМС vs ДМС — коротко", "ОСМС vs ДМС — қысқаша", "OSMS vs DMS — in brief");
  const diffRows = tByLang(
    lang,
    [
      { k: "ОСМС", v: "гос. система, фиксированный перечень услуг и маршрутизация" },
      { k: "ДМС", v: "частные клиники по договору + ассистанс + сервис и скорость" },
      { k: "Роль брокера", v: "подбор сети клиник, покрытия, лимитов и честная проверка исключений" },
    ],
    [
      { k: "ОСМС", v: "мемлекеттік жүйе, қызметтер тізімі және маршрутизация" },
      { k: "ДМС", v: "келісім бойынша жеке клиникалар + ассистанс + сервис/жылдамдық" },
      { k: "Брокердің рөлі", v: "клиника желісін, қамтуды, лимиттерді таңдау және алып тастауларды тексеру" },
    ],
    [
      { k: "OSMS", v: "state system, defined list of services and routing rules" },
      { k: "DMS", v: "private clinics under contract + assistance + speed/service" },
      { k: "Broker’s role", v: "select clinic network, coverage, limits, and verify exclusions" },
    ]
  );

  // -------------------- DMS --------------------
  const dmsTitle = tByLang(lang, "Добровольное медстрахование (ДМС)", "Ерікті медициналық сақтандыру (ДМС)", "Voluntary Medical Insurance (DMS)");
  const dmsSubtitle = tByLang(
    lang,
    "Доступ к частной медицине для сотрудников компаний и частных клиентов: клиники, диагностика и понятная логистика через ассистанс.",
    "Компания қызметкерлері мен жеке клиенттер үшін жеке медицинаға қолжетімділік: клиникалар, диагностика және ассистанс арқылы басқарылатын процесс.",
    "Access to private healthcare for corporate staff and individual clients: clinics, diagnostics, and a clear assistance-driven process."
  );

  const clinicsTitle = tByLang(lang, "В какие клиники можно ходить", "Қай клиникаларға баруға болады", "Which clinics you can visit");
  const clinics = tByLang(
    lang,
    [
      "Алматы: Mediker, Interteach, SEMA Hospital, Rahat Medical Center, International Medical Center (IMC) и др.",
      "Астана: Interteach, Mediker, Green Clinic, Premier Med Clinic и др.",
      "Другие города РК: сетевые клиники и партнерские центры (подбираем под локацию сотрудников/семьи).",
      "Важно: конкретный список зависит от выбранной страховой и пакета — мы фиксируем его в КП до оплаты.",
    ],
    [
      "Алматы: Mediker, Interteach, SEMA Hospital, Rahat Medical Center, International Medical Center (IMC) және т.б.",
      "Астана: Interteach, Mediker, Green Clinic, Premier Med Clinic және т.б.",
      "РК басқа қалалары: желілік клиникалар және серіктес орталықтар (локацияға сай таңдаймыз).",
      "Маңызды: нақты тізім сақтандырушыға және пакетке байланысты — төлемге дейін КП-да бекітеміз.",
    ],
    [
      "Almaty: Mediker, Interteach, SEMA Hospital, Rahat Medical Center, International Medical Center (IMC) and others.",
      "Astana: Interteach, Mediker, Green Clinic, Premier Med Clinic and others.",
      "Other Kazakhstan cities: network clinics and partner centers (we tailor to staff/family location).",
      "Important: the exact list depends on insurer and package — we confirm it in the proposal before payment.",
    ]
  );

  const dmsIncludedTitle = tByLang(lang, "Что входит в пакет", "Пакетке не кіреді", "What’s included");
  const dmsIncluded = tByLang(
    lang,
    [
      { k: "Поликлиника", v: "терапевт и узкие специалисты по записи" },
      { k: "Диагностика", v: "анализы, УЗИ, рентген, МРТ/КТ — по программе" },
      { k: "Скорая/неотложка", v: "вызов и госпитализация — по условиям страховщика" },
      { k: "Стоматология", v: "часто отдельным лимитом или опцией" },
      { k: "Медикаменты", v: "иногда включаются, чаще — по назначению/лимитам" },
    ],
    [
      { k: "Емхана", v: "терапевт және тар бейінді мамандар" },
      { k: "Диагностика", v: "талдаулар, УДЗ, рентген, МРТ/КТ — бағдарламаға сай" },
      { k: "Жедел жәрдем", v: "шақыру және госпитализация — шартқа сай" },
      { k: "Стоматология", v: "көбіне бөлек лимит/опция" },
      { k: "Дәрілер", v: "кейде кіреді, жиі — тағайындау/лимит бойынша" },
    ],
    [
      { k: "Outpatient care", v: "GP and specialists by appointment" },
      { k: "Diagnostics", v: "tests, ultrasound, X-ray, MRI/CT — per plan" },
      { k: "Emergency", v: "ambulance/hospitalization — per insurer terms" },
      { k: "Dental", v: "often as an option or separate limit" },
      { k: "Medicines", v: "sometimes included, often limited/by prescription" },
    ]
  );

  const dmsBrokerTitle = tByLang(lang, "Ключевые вопросы — честно", "Негізгі сұрақтар — ашық", "Key questions — honestly");
  const dmsBroker = tByLang(
    lang,
    [
      "Хроника: чаще всего НЕ покрывается в первый год, но иногда есть исключения — мы их ищем и фиксируем письменно.",
      "Запись к врачу: обычно через ассистанс (24/7 диспетчер), чтобы вы не «бегали по регистратурам».",
      "ДМС физлицам: да, иногда сложнее, чем компании — зато у нас есть готовые семейные/индивидуальные пакеты, которые неочевидны на сайтах СК.",
    ],
    [
      "Созылмалы аурулар: көбіне бірінші жылы жабылмайды, бірақ ерекшеліктер болады — біз табамыз және жазбаша бекітеміз.",
      "Дәрігерге жазылу: әдетте ассистанс арқылы (24/7 диспетчер).",
      "Жеке тұлғаға ДМС: кейде компанияға қарағанда қиын — бірақ бізде дайын отбасы/жеке пакеттер бар.",
    ],
    [
      "Chronic conditions: often NOT covered in the first year, but exceptions exist — we find and confirm them in writing.",
      "Appointments: usually via 24/7 assistance, so you don’t fight registries yourself.",
      "DMS for individuals: sometimes harder than corporate — we have ready family/individual packages not obvious on insurer websites.",
    ]
  );

  // -------------------- ACCIDENT --------------------
  const acTitle = tByLang(lang, "Страхование от несчастных случаев (НС)", "Жазатайым оқиғалардан сақтандыру (НС)", "Personal Accident Insurance");
  const acSubtitle = tByLang(
    lang,
    "Это не «лечение», а денежная выплата при травме/переломе/инвалидности. Подходит для спорта, производства и быта.",
    "Бұл «емдеу» емес — жарақат/сыну/мүгедектік кезінде ақшалай төлем. Спортқа, өндіріс пен тұрмысқа сай.",
    "Not “treatment” — a cash benefit for injury/fracture/disability. Works for sports, hazardous jobs and everyday life."
  );

  const acWhoTitle = tByLang(lang, "Кому подходит", "Кімге сай", "Who it’s for");
  const acWho = tByLang(
    lang,
    [
      "Спортсменам и детям на секциях/соревнованиях",
      "Опасные профессии и производственные риски",
      "Семьям: бытовые травмы (гололед, ожоги, ДТП)",
      "Работодателям как часть соцпакета",
    ],
    [
      "Спортшыларға және балалар секцияларына",
      "Қауіпті мамандықтар мен өндіріс тәуекелдері",
      "Отбасыларға: тұрмыстық жарақаттар (мұз, күйік, ЖКО)",
      "Жұмыс берушіге әлеуметтік пакет ретінде",
    ],
    [
      "Athletes and kids in sports clubs/competitions",
      "Hazardous occupations and industrial risks",
      "Families: everyday injuries (ice, burns, road accidents)",
      "Employers as part of benefits package",
    ]
  );

  const acHowTitle = tByLang(lang, "Как это работает", "Қалай жұмыс істейді", "How it works");
  const acHow = tByLang(
    lang,
    [
      { k: "Что платят", v: "фиксированный % от страховой суммы по таблице выплат" },
      { k: "Когда платят", v: "травма/перелом/инвалидность/смерть — по условиям" },
      { k: "Где действует", v: "только работа или 24/7 — выбирается при оформлении" },
      { k: "Спорт", v: "для секций/соревнований нужны корректные опции (мы проверяем)" },
    ],
    [
      { k: "Төлем", v: "төлем кестесі бойынша сақтандыру сомасының % мөлшері" },
      { k: "Қашан", v: "жарақат/сыну/мүгедектік/қайтыс болу — шарт бойынша" },
      { k: "Аумақ/уақыт", v: "тек жұмыс кезінде ме, әлде 24/7 — таңдауға болады" },
      { k: "Спорт", v: "секция/жарыс үшін дұрыс опциялар керек (біз тексереміз)" },
    ],
    [
      { k: "Benefit", v: "a fixed % of the insured sum per benefit schedule" },
      { k: "Triggers", v: "injury/fracture/disability/death — per terms" },
      { k: "Coverage mode", v: "work-only or 24/7 — chosen at issuance" },
      { k: "Sports", v: "sports activities require correct options (we verify)" },
    ]
  );

  const acNote = tByLang(
    lang,
    "Важно: НС не заменяет ДМС. ДМС организует лечение, НС дает деньги на реабилитацию, расходы и потерю дохода.",
    "Маңызды: НС ДМС-ті алмастырмайды. ДМС емдеуді ұйымдастырады, НС — ақша төлемі.",
    "Important: Accident insurance doesn’t replace DMS. DMS organizes care; accident pays cash for rehab/costs/lost income."
  );

  // -------------------- TRAVEL --------------------
  const trTitle = tByLang(lang, "Страхование выезжающих за рубеж (ВЗР / Travel)", "Шетелге шығушыларды сақтандыру (ВЗР / Travel)", "Travel Insurance (VZR)");
  const trSubtitle = tByLang(
    lang,
    "Для визы и поездок: медицинские расходы за границей + ассистанс, а также опции под активный отдых и риски в пути.",
    "Виза және сапар үшін: шетелде мед. шығындар + ассистанс, сондай-ақ белсенді демалыс опциялары.",
    "For visa and trips: overseas medical expenses + assistance, with options for active sports and travel risks."
  );

  const trWhoTitle = tByLang(lang, "Кому нужно", "Кімге керек", "Who needs it");
  const trWho = tByLang(
    lang,
    [
      "Туристам и семьям в отпуске",
      "Командировочным и бизнес-поездкам",
      "Студентам и тем, кто учится за границей",
      "Тем, кому важно, чтобы полис «приняли» (консульство/работодатель)",
    ],
    [
      "Туристерге және отбасыларға",
      "Іссапар және бизнес сапарларға",
      "Шетелде оқитын студенттерге",
      "Полистің «қабылдануы» маңызды адамдарға (консульство/жұмыс беруші)",
    ],
    [
      "Tourists and families",
      "Business trips and assignments",
      "Students studying abroad",
      "Anyone who needs the policy to be accepted (consulate/employer)",
    ]
  );

  const trHowTitle = tByLang(lang, "Если за границей стало плохо", "Шетелде ауырып қалсаңыз", "If you get sick abroad");
  const trSteps = tByLang(
    lang,
    [
      "1) Позвонить в ассистанс (номер в полисе) — это ключевое правило.",
      "2) Следовать маршруту: клиника/врач/госпиталь — по направлению ассистанса.",
      "3) Не оплачивать самостоятельно без согласования (иначе возможны проблемы с возмещением).",
      "4) Сохранить документы: счета, выписки, назначения.",
    ],
    [
      "1) Ассистанске қоңырау шалу (полистегі номер) — басты ереже.",
      "2) Ассистанс бағыттаған клиника/дәрігер бойынша әрекет ету.",
      "3) Келісімсіз өзіңіз төлемеу (өтемақы мәселесі болуы мүмкін).",
      "4) Құжаттарды сақтау: шоттар, эпикриз, тағайындаулар.",
    ],
    [
      "1) Call the assistance number in the policy — the key rule.",
      "2) Follow the route: clinic/doctor/hospital as directed by assistance.",
      "3) Don’t pay out of pocket without approval (may affect reimbursement).",
      "4) Keep documents: invoices, medical notes, prescriptions.",
    ]
  );

  const trOptionsTitle = tByLang(lang, "Частые доп. опции", "Жиі қосылатын опциялар", "Common add-ons");
  const trOptions = tByLang(
    lang,
    [
      { k: "Виза", v: "полисы под требования Шенгена/США/Китая — подбираем корректно" },
      { k: "COVID-19", v: "опция зависит от программы/страны — проверяем перед оплатой" },
      { k: "Активный отдых", v: "лыжи/дайвинг/мопед — часто требует доп. покрытия" },
      { k: "Багаж/рейс", v: "задержка рейса, потеря багажа — как сервисные риски" },
      { k: "Стоматология", v: "обычно экстренно и с лимитом (объясняем заранее)" },
    ],
    [
      { k: "Виза", v: "Шенген/АҚШ/Қытай талаптарына сай полисті дұрыс таңдаймыз" },
      { k: "COVID-19", v: "опция бағдарлама/елге байланысты — алдын ала тексереміз" },
      { k: "Белсенді демалыс", v: "шаңғы/дайвинг/мопед — қосымша қамтуды талап етеді" },
      { k: "Багаж/рейс", v: "рейс кешігуі, багаж жоғалуы — сервис тәуекелдері" },
      { k: "Стоматология", v: "көбіне жедел және лимитпен" },
    ],
    [
      { k: "Visa", v: "Schengen/US/China compliant plans — we select correctly" },
      { k: "COVID-19", v: "depends on plan/country — we verify before purchase" },
      { k: "Active sports", v: "ski/diving/scooter often requires extra cover" },
      { k: "Baggage/flight", v: "delay/loss options as service risks" },
      { k: "Dental", v: "usually emergency-only with a limit" },
    ]
  );

  return (
    <section id="medical" className="py-10 sm:py-14 bg-[#F7F7F7]">
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
            <span className="font-mono">#medical</span>
          </div>
        </div>

        {/* ОСМС vs ДМС */}
        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-[#1A3A5F] mb-3">
            {diffTitle}
          </h3>
          <KeyValueList rows={diffRows} />
        </div>

        {/* 3 большие карточки */}
        <div className="mt-7 space-y-6">
          {/* DMS */}
          <CardShell
            title={dmsTitle}
            subtitle={dmsSubtitle}
            badges={tByLang(
              lang,
              ["Корпоративным", "Семьям", "Ассистанс 24/7"],
              ["Корпоратив", "Отбасы", "Ассистанс 24/7"],
              ["Corporate", "Family", "24/7 Assistance"]
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
                  {tByLang(lang, "Запросить КП по ДМС", "ДМС бойынша ұсыныс сұрау", "Request a DMS quote")}
                </Link>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {tByLang(lang, "Уточнить клиники и лимиты", "Клиника/лимит нақтылау", "Clarify clinics & limits")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {clinicsTitle}
                </h4>
                <BulletList items={clinics} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {dmsIncludedTitle}
                </h4>
                <KeyValueList
                  rows={dmsIncluded}
                  note={tByLang(
                    lang,
                    "Состав пакета всегда зависит от программы и лимитов. Мы показываем 2–3 уровня пакетов (эконом/стандарт/премиум) и объясняем, где «подводные камни».",
                    "Пакет құрамы бағдарлама мен лимитке байланысты. Біз 2–3 деңгей ұсынамыз (эконом/стандарт/премиум) және тәуекелдерді түсіндіреміз.",
                    "Package scope depends on plan and limits. We provide 2–3 tiers (economy/standard/premium) and explain pitfalls upfront."
                  )}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                {dmsBrokerTitle}
              </h4>
              <BulletList items={dmsBroker} />
            </div>
          </CardShell>

          {/* ACCIDENT */}
          <CardShell
            title={acTitle}
            subtitle={acSubtitle}
            badges={tByLang(
              lang,
              ["Деньгами", "Спорт/работа", "24/7 или работа"],
              ["Ақшалай", "Спорт/жұмыс", "24/7 немесе жұмыс"],
              ["Cash benefit", "Sport/work", "24/7 or work-only"]
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
                  {tByLang(lang, "Подобрать НС", "НС таңдау", "Get an accident quote")}
                </Link>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {tByLang(lang, "Для спорта/детей", "Спорт/балалар үшін", "For sports/kids")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {acWhoTitle}
                </h4>
                <BulletList items={acWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {acHowTitle}
                </h4>
                <KeyValueList rows={acHow} note={acNote} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-2">
                {tByLang(lang, "Про «таблицу выплат»", "«Төлем кестесі» туралы", "About the benefit schedule")}
              </h4>
              <p className="text-sm text-gray-700">
                {tByLang(
                  lang,
                  "В НС ключевое — не «красивый тариф», а таблица выплат и определения травм. Мы сравниваем формулировки, чтобы за типовую травму выплата была ожидаемой, а не «по усмотрению».",
                  "НС бойынша ең маңыздысы — тариф емес, төлем кестесі мен анықтамалар. Біз мәтінді салыстырамыз, сонда төлем болжамды болады.",
                  "In accident insurance the core is the benefit schedule and definitions. We compare wording so typical injuries pay as expected, not “at discretion”."
                )}
              </p>
            </div>
          </CardShell>

          {/* TRAVEL */}
          <CardShell
            title={trTitle}
            subtitle={trSubtitle}
            badges={tByLang(
              lang,
              ["Виза", "Ассистанс", "Опции"],
              ["Виза", "Ассистанс", "Опциялар"],
              ["Visa", "Assistance", "Options"]
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
                  {tByLang(lang, "Оформить Travel", "Travel рәсімдеу", "Get travel insurance")}
                </Link>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {tByLang(lang, "Проверить под визу", "Визаға тексеру", "Check visa compliance")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {trWhoTitle}
                </h4>
                <BulletList items={trWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {trHowTitle}
                </h4>
                <BulletList items={trSteps} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                {trOptionsTitle}
              </h4>
              <KeyValueList
                rows={trOptions}
                note={tByLang(
                  lang,
                  "Мы заранее уточняем страну, даты, тип визы и активность — иначе полис может быть формально «есть», но практически бесполезен.",
                  "Ел, күндер, виза түрі және белсенділікті алдын ала нақтылаймыз — әйтпесе полис формалды болып қалуы мүмкін.",
                  "We confirm country, dates, visa type and activities upfront — otherwise a policy may be formally valid but practically useless."
                )}
              />
            </div>
          </CardShell>
        </div>
      </div>
    </section>
  );
}
