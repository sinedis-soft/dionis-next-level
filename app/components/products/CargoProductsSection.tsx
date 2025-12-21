// app/components/products/CargoProductsSection.tsx
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
        <div className="mt-7 flex flex-col sm:flex-row gap-3">{actions}</div>
      ) : null}
    </article>
  );
}

function SubBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-black/10 p-5 sm:p-6 bg-white">
      <h4 className="text-base sm:text-lg font-semibold text-[#1A3A5F] mb-3">
        {title}
      </h4>
      {children}
    </div>
  );
}

export default function CargoProductsSection({ lang, base, ui }: Props) {
  const topTitle = tByLang(lang, "Страхование грузов", "Жүк сақтандыру", "Cargo insurance");
  const topLead = tByLang(
    lang,
    "Страхование груза защищает собственника товара в перевозке. Ниже — ответы на ключевые вопросы: что застраховано, ICC A/B/C, разница CMR vs Cargo, территория, роль брокера и из чего складывается цена.",
    "Жүк сақтандыру тасымалдау кезінде тауар иесін қорғайды. Төменде негізгі сұрақтарға жауап: нені сақтандырады, ICC A/B/C, CMR vs Cargo, аумақ, брокер рөлі және баға факторлары.",
    "Cargo insurance protects the cargo owner during transportation. Below are clear answers: what is insured, ICC A/B/C, CMR vs Cargo, territory, broker value, and what drives the price."
  );

  // 1) Object
  const objTitle = tByLang(lang, "Что именно застраховано", "Нақты не сақтандырылады", "What is insured");
  const objSubtitle = tByLang(
    lang,
    "Объект — груз (товар) в пути. Полис подбирается под регулярность перевозок, тип товара и документы.",
    "Нысан — жолдағы жүк (тауар). Полис тасымал жиілігіне, тауар түріне және құжаттарға қарай таңдалады.",
    "The object is the cargo (goods) in transit. The policy is tailored to shipment frequency, cargo type and documents."
  );

  const objWhoTitle = tByLang(lang, "Кому подходит", "Кімге лайық", "Who it’s for");
  const objWho = tByLang(
    lang,
    [
      "Грузовладельцам и торговым компаниям (защита стоимости товара)",
      "Импортерам/экспортерам, работающим по контрактам и Инкотермс",
      "Производителям с регулярными отгрузками",
      "Логистам и экспедиторам (когда требуется полис по договору)",
    ],
    [
      "Жүк иелеріне және сауда компанияларына (тауар құнын қорғау)",
      "Импорт/экспортқа (келісімшарт және Incoterms)",
      "Тұрақты жөнелтімі бар өндірушілерге",
      "Логист/экспедиторларға (шарт талабымен)",
    ],
    [
      "Cargo owners and trading companies (protects the value of goods)",
      "Importers/exporters working under contracts and Incoterms",
      "Manufacturers with regular shipments",
      "Logistics providers/forwarders when required by contract",
    ]
  );

  const objKVTitle = tByLang(lang, "Форматы полиса", "Полис форматтары", "Policy formats");
  const objKV = tByLang(
    lang,
    [
      { k: "Генеральный полис", v: "один договор на год для регулярных перевозок (удобно для постоянных отгрузок)" },
      { k: "Разовый полис", v: "на одну конкретную перевозку (один маршрут / одна партия)" },
      { k: "Виды грузов", v: "FMCG, оборудование, электроника, температурные, негабаритные, ADR — по согласованию условий" },
      { k: "Кто страхователь", v: "обычно грузовладелец, иногда — продавец/покупатель по контракту" },
    ],
    [
      { k: "Генералды полис", v: "жылдық шарт: тұрақты тасымалға (жиі жөнелтімге ыңғайлы)" },
      { k: "Бір реттік полис", v: "бір тасымалға (бір маршрут / бір партия)" },
      { k: "Жүк түрлері", v: "FMCG, жабдық, электроника, температуралық, габариттен тыс, ADR — шартпен" },
      { k: "Сақтанушы", v: "көбіне жүк иесі, кейде — келісімшарт бойынша сатушы/сатып алушы" },
    ],
    [
      { k: "Open (annual) policy", v: "one yearly contract for regular shipments (best for recurring loads)" },
      { k: "Single-trip policy", v: "for one shipment (one route / one consignment)" },
      { k: "Cargo types", v: "FMCG, machinery, electronics, temperature-controlled, oversized, ADR — subject to terms" },
      { k: "Policyholder", v: "usually the cargo owner; sometimes seller/buyer per contract" },
    ]
  );

  const objNote = tByLang(
    lang,
    "Ключевое: страхование груза — это защита стоимости товара. Оно не заменяет ответственность перевозчика.",
    "Негізгі ой: жүк сақтандыру — тауар құнын қорғау. Бұл тасымалдаушы жауапкершілігін алмастырмайды.",
    "Key point: cargo insurance protects the value of goods. It does not replace carrier’s liability."
  );

  // 2) ICC
  const iccTitle = tByLang(lang, "От каких рисков защищает полис", "Қандай тәуекелдерден қорғайды", "What risks are covered");
  const iccSubtitle = tByLang(
    lang,
    "На практике условия описываются через ICC (Institute Cargo Clauses). Мы переводим «страховой язык» на человеческий.",
    "Тәжірибеде шарттар ICC (Institute Cargo Clauses) арқылы беріледі. Біз оны түсінікті тілге аударамыз.",
    "In practice, terms are described via ICC (Institute Cargo Clauses). We translate insurance wording into plain language."
  );

  const iccVariantsTitle = tByLang(lang, "Основные варианты", "Негізгі нұсқалар", "Core options");
  const iccVariants = tByLang(
    lang,
    [
      "ICC A («все риски»): покрывает всё, что не исключено (ДТП, кража/разбой, намокание, падение, повреждение при перегрузке — если это не исключено условиями).",
      "ICC B/C («частная авария»): покрывает только перечисленные события (пожар, крушение, столкновение и т.д.) — дешевле, но уже по покрытию.",
      "Специфика рынка РК: хищение мошенничеством (когда груз забирает лжеперевозчик) — не всегда включено автоматически; важно прописать как покрываемый риск/оговорку.",
    ],
    [
      "ICC A («барлық тәуекел»): алып тастауға кірмейтіннің бәрін жабады (ЖКО, ұрлық/тонау, сулау, құлау, қайта тиеудегі зақым — егер шығарылмаса).",
      "ICC B/C («жеке авария»): тек тізімдегі оқиғалар (өрт, апат, соқтығысу және т.б.) — арзанырақ, бірақ қамту тар.",
      "РК нарығының «ауруы»: алаяқтықпен ұрлау (жалған тасымалдаушы) — көбіне бөлек келісуді талап етеді.",
    ],
    [
      "ICC A (All Risks): covers everything not excluded (accident, theft/robbery, wet damage, dropping, handling damage — subject to exclusions).",
      "ICC B/C (Named Perils): covers only listed events (fire, crash, collision etc.) — cheaper but narrower.",
      "Kazakhstan market pain point: fraud theft (fake carrier) is not always included by default; it must be negotiated and written in.",
    ]
  );

  const iccFaqTitle = tByLang(lang, "Частые вопросы", "Жиі сұрақтар", "Common questions");
  const iccFaq = tByLang(
    lang,
    [
      { k: "Кража на стоянке", v: "зависит от требований к парковке/охране. Мы подбираем условия без «невыполнимых» требований." },
      { k: "Намокание/пролив", v: "обычно относится к «all risks», но упаковка и крепление критичны." },
      { k: "Погрузка/разгрузка", v: "часто включается по оговорке. Мы заранее проверяем формулировку." },
      { k: "Мошенничество", v: "включаем отдельным пунктом, если это критично для вашего бизнеса." },
    ],
    [
      { k: "Тұрақта ұрлық", v: "тұрақ/күзет талаптарына байланысты. Біз орындалмайтын талапсыз шарт іздейміз." },
      { k: "Сулану/төгілу", v: "көбіне «all risks»-ке жатады, бірақ қаптама/бекіту маңызды." },
      { k: "Тиеу/түсіру", v: "кейде арнайы оговорка керек. Біз мәтінді алдын ала тексереміз." },
      { k: "Алаяқтық", v: "маңызды болса — жеке тармақпен енгіземіз." },
    ],
    [
      { k: "Theft on parking", v: "depends on parking/guarding requirements. We choose realistic terms." },
      { k: "Wet damage/spillage", v: "often falls under all risks, but packing and securing matter." },
      { k: "Loading/unloading", v: "may require an endorsement. We verify the exact wording." },
      { k: "Fraud theft", v: "we negotiate and add it explicitly if crucial for you." },
    ]
  );

  const iccNote = tByLang(
    lang,
    "Самый частый отказ в выплате — не «плохая компания», а нарушение условий: упаковка, крепление, маршрут, стоянка. Брокер нужен, чтобы это не стало сюрпризом.",
    "Ең жиі бас тарту себебі — шартты бұзу: қаптама, бекіту, маршрут, тұрақ. Брокер осыны алдын ала «жабады».",
    "The most common claim issue is not ‘bad insurer’ but breached conditions: packing, securing, route, parking. A broker prevents surprises."
  );

  // 3) CMR vs Cargo
  const diffTitle = tByLang(lang, "CMR (ответственность перевозчика) vs страхование груза", "CMR vs жүк сақтандыру", "CMR liability vs cargo insurance");
  const diffSubtitle = tByLang(
    lang,
    "Это ключевое различие. Если вы грузовладелец — вам почти всегда нужно именно страхование груза.",
    "Бұл негізгі айырмашылық. Егер сіз жүк иесі болсаңыз — көбіне жүк сақтандыру керек.",
    "This is the key difference. If you own the goods, you usually need cargo insurance."
  );

  const diffKV = tByLang(
    lang,
    [
      { k: "CMR / ГПО перевозчика", v: "защищает перевозчика, когда он виноват. Имеет лимиты, исключения и франшизы." },
      { k: "Страхование груза", v: "защищает стоимость груза (собственника) — часто даже когда нет виновника (стихия, молния и т.п., если включено)." },
      { k: "Типичная ошибка", v: "«у перевозчика есть CMR — значит груз защищён». Нет: грузовладелец может остаться без компенсации." },
    ],
    [
      { k: "CMR / тасымалдаушы ГПО", v: "кінә болса — тасымалдаушыны қорғайды. Лимит/алып тастау/франшиза бар." },
      { k: "Жүк сақтандыру", v: "жүктің құнын (иесін) қорғайды — кейде кінәлі жоқ жағдайларда да (егер шартта бар болса)." },
      { k: "Жиі қате", v: "«CMR бар — жүк қорғалған». Жоқ: жүк иесі өтемсіз қалуы мүмкін." },
    ],
    [
      { k: "CMR / carrier liability", v: "protects the carrier when they are liable. Has limits, exclusions and deductibles." },
      { k: "Cargo insurance", v: "protects the value of goods (the owner) — often even with no liable party if included." },
      { k: "Typical mistake", v: "“Carrier has CMR, so my cargo is protected.” Not necessarily." },
    ]
  );

  const diffNote = tByLang(
    lang,
    "Практика: для полноценной защиты часто используют связку — CMR (защита перевозчика) + страхование груза (защита товара).",
    "Тәжірибе: толық қорғау үшін жиі екі полис бірге қолданылады — CMR + жүк сақтандыру.",
    "In practice, full protection often uses both: CMR (carrier) + cargo insurance (goods)."
  );

  // 4) Territory
  const routeTitle = tByLang(lang, "Территория и маршруты", "Аумақ және маршруттар", "Territory and routes");
  const routeList = tByLang(
    lang,
    [
      "Внутриреспубликанские перевозки по Казахстану",
      "Международные перевозки: СНГ, Европа, Китай, Турция",
      "Действует ли страховка на неохраняемых стоянках? Подбираем компанию с адекватными требованиями",
      "Фиксируем маршрут, перегрузки и точки хранения — это влияет на выплату",
    ],
    [
      "Қазақстан ішіндегі тасымал",
      "Халықаралық маршруттар: ТМД, Еуропа, Қытай, Түркия",
      "Күзетсіз тұрақта әрекет ете ме? Талаптары орындалатын шарт таңдаймыз",
      "Маршрут, қайта тиеу және сақтау нүктелерін бекітеміз — төлемге әсер етеді",
    ],
    [
      "Domestic transportation within Kazakhstan",
      "International routes: CIS, Europe, China, Türkiye",
      "Does it work on unguarded parking? We choose realistic insurer requirements",
      "We document route, transshipment and storage points — affects claims",
    ]
  );

  // 5) Broker value
  const brokerTitle = tByLang(lang, "Почему выгодно оформлять через Dionis", "Неге Dionis арқылы тиімді", "Why Dionis as a broker");
  const brokerLead = tByLang(
    lang,
    "Клиент видит полис и цену. Мы — условия, исключения и реальную пригодность договора к вашему маршруту и бизнес-процессу.",
    "Клиент полис пен бағаны көреді. Біз — шарт, алып тастаулар және сіздің маршрутыңызға сай келуін бақылаймыз.",
    "Clients see a policy and a price. We control clauses, exclusions and whether the contract truly fits your route and operations."
  );

  const brokerList = tByLang(
    lang,
    [
      "Сравниваем котировки 5–10 страховых компаний Казахстана и выбираем рациональный тариф под ваш риск-профиль.",
      "Анализируем оговорки: запрет ночного движения, требования к стоянкам, конвой, ограничения по странам/перегрузкам.",
      "Помогаем при убытке: как вызвать комиссара/аджастера и правильно зафиксировать порчу/недостачу для выплаты.",
      "Сопровождаем процесс до результата — чтобы вы не «воевали» с формальностями.",
    ],
    [
      "Қазақстандағы 5–10 компанияның котировкасын салыстырып, тәуекелге сай тариф таңдаймыз.",
      "Оговорка талдау: түнгі қозғалыс, тұрақ талабы, конвой, ел/қайта тиеу шектеуі.",
      "Залал кезінде: комиссар/аджастер, фото/акт және дұрыс рәсімдеу арқылы төлем алу.",
      "Нәтижеге дейін сүйемелдейміз — формальдылықпен сіз жалғыз қалмайсыз.",
    ],
    [
      "We compare 5–10 Kazakhstan insurers’ quotations and choose a rational rate for your risk profile.",
      "We audit clauses: night driving bans, parking rules, convoy requirements, country/transshipment limits.",
      "We support claims: surveyor/adjuster, evidence, acts and correct reporting to secure payment.",
      "We manage the process to outcome — so you don’t fight bureaucracy alone.",
    ]
  );

  // 6) Price
  const priceTitle = tByLang(lang, "Из чего складывается цена", "Баға неден құралады", "What affects the price");
  const priceList = tByLang(
    lang,
    [
      "Стоимость и тип груза",
      "Протяженность и сложность маршрута",
      "Условия ICC (A/B/C) и дополнительные оговорки",
      "Наличие и размер франшизы",
      "Упаковка, способ погрузки, температурный режим, перегрузки",
    ],
    [
      "Жүк құны мен түрі",
      "Маршрут ұзақтығы және күрделілігі",
      "ICC (A/B/C) және қосымша оговоркалар",
      "Франшиза бар-жоғы және мөлшері",
      "Қаптама, тиеу тәсілі, температура, қайта тиеу",
    ],
    [
      "Cargo value and type",
      "Route length and complexity",
      "ICC (A/B/C) choice and endorsements",
      "Deductible presence and size",
      "Packing, loading method, temperature regime, transshipments",
    ]
  );

  return (
    <section id="cargo" className="py-10 sm:py-14 bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3A5F]">
              {topTitle}
            </h2>
            <p className="mt-2 text-gray-700">{topLead}</p>
          </div>

          <div className="text-sm text-gray-600">
            <span className="mr-2">{ui.quick}:</span>
            <span className="font-mono">#cargo</span>
          </div>
        </div>

        <div className="mt-7">
          <CardShell
            title={tByLang(lang, "Страхование грузов — ответы на ключевые вопросы", "Жүк сақтандыру — негізгі сұрақтарға жауап", "Cargo insurance — key questions answered")}
            subtitle={tByLang(
              lang,
              "Одна карточка: объект, риски (ICC), отличие от CMR, территория, роль брокера и ценообразование.",
              "Бір карточка: нысан, тәуекел (ICC), CMR айырмашылығы, аумақ, брокер рөлі және баға.",
              "Single card: object, risks (ICC), CMR difference, territory, broker value, and pricing."
            )}
            badges={tByLang(lang, ["ICC A/B/C", "CMR vs Cargo", "KZ/INTL"], ["ICC A/B/C", "CMR vs Cargo", "KZ/INTL"], ["ICC A/B/C", "CMR vs Cargo", "KZ/INTL"])}
            actions={
              <>
                <Link
                  href={`${base}/contacts`}
                  className="btn btn-secondary"
                  role="button"
                >
                  {tByLang(lang, "Запросить предложение", "Ұсыныс сұрау", "Request a quote")}
                </Link>
                <a href="tel:+77273573030" className="btn" role="button">
                  +7 (727) 357-30-30
                </a>
              </>
            }
          >
            {/* 1 */}
            <SubBlock title={objTitle}>
              <p className="text-sm text-gray-700 mb-4">{objSubtitle}</p>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="text-xs text-gray-600 mb-2">
                    {tByLang(lang, "Генеральный / разовый", "Генералды / бір реттік", "Annual / single")}
                    {" • "}
                    {tByLang(lang, "B2B", "B2B", "B2B")}
                  </div>

                  <h5 className="text-sm font-semibold text-[#1A3A5F] mb-3">{objWhoTitle}</h5>
                  <BulletList items={objWho} />
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-[#1A3A5F] mb-3">{objKVTitle}</h5>
                  <KeyValueList rows={objKV} note={objNote} />
                </div>
              </div>
            </SubBlock>

            {/* 2 */}
            <SubBlock title={iccTitle}>
              <p className="text-sm text-gray-700 mb-4">{iccSubtitle}</p>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="text-xs text-gray-600 mb-2">ICC A/B/C • {tByLang(lang, "Риски", "Тәуекел", "Risks")}</div>
                  <h5 className="text-sm font-semibold text-[#1A3A5F] mb-3">{iccVariantsTitle}</h5>
                  <BulletList items={iccVariants} />
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-[#1A3A5F] mb-3">{iccFaqTitle}</h5>
                  <KeyValueList rows={iccFaq} note={iccNote} />
                </div>
              </div>
            </SubBlock>

            {/* 3 */}
            <SubBlock title={diffTitle}>
              <p className="text-sm text-gray-700 mb-4">{diffSubtitle}</p>
              <KeyValueList rows={diffKV} note={diffNote} />
            </SubBlock>

            {/* 4 */}
            <SubBlock title={routeTitle}>
              <BulletList items={routeList} />
            </SubBlock>

            {/* 5 */}
            <SubBlock title={brokerTitle}>
              <p className="text-sm text-gray-700 mb-4">{brokerLead}</p>
              <BulletList items={brokerList} />
            </SubBlock>

            {/* 6 */}
            <SubBlock title={priceTitle}>
              <BulletList items={priceList} />
            </SubBlock>
          </CardShell>
        </div>
      </div>
    </section>
  );
}
