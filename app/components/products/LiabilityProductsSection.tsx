// app/components/products/LiabilityProductsSection.tsx
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

export default function LiabilityProductsSection({ lang, base, ui }: Props) {
  const topTitle = tByLang(
    lang,
    "Страхование ответственности",
    "Жауапкершілікті сақтандыру",
    "Liability insurance"
  );

  const topLead = tByLang(
    lang,
    "Четыре ключевых продукта для бизнеса и частных лиц: перевозчик, экспедитор, профессиональная ответственность и ответственность владельцев квартир. Мы объясняем «зачем», «что покрывает» и где чаще всего скрыт риск отказа.",
    "Бизнес пен жеке тұлғаларға арналған 4 негізгі өнім: тасымалдаушы, экспедитор, кәсіби жауапкершілік және пәтер иесінің жауапкершілігі. «Неге керек», «нені жабады» және қай жерде бас тарту тәуекелі жиі жасырылатынын қысқа түсіндіреміз.",
    "Four key products for businesses and individuals: carrier liability, freight forwarder liability, professional indemnity, and homeowners’ liability. We explain the ‘why’, the coverage, and where denial risks usually hide."
  );

  // ---------- 1) CARRIER LIABILITY ----------
  const cTitle = tByLang(
    lang,
    "Ответственность автоперевозчика (ОГПО ВТС / CMR)",
    "Автотасымалдаушының жауапкершілігі (ОГПО ВТС / CMR)",
    "Carrier liability (OGPO VTS / CMR)"
  );

  const cSubtitle = tByLang(
    lang,
    "Защита перевозчика от претензий владельца груза и третьих лиц. Это не «страховка груза», а покрытие вашей ответственности как перевозчика по договору/закону.",
    "Тасымалдаушыны жүк иесінің және үшінші тұлғалардың талаптарынан қорғау. Бұл «жүк сақтандыруы» емес — тасымалдаушы ретіндегі жауапкершілігіңізді жабу.",
    "Protects the carrier from claims by cargo owners and third parties. This is not cargo insurance — it covers your liability as a carrier under contract/law."
  );

  const cWhoTitle = tByLang(lang, "Кому это нужно", "Кімге керек", "Who it’s for");
  const cWho = tByLang(
    lang,
    [
      "Владельцам фур и автопарков",
      "Транспортным компаниям с регулярными рейсами",
      "Тем, кто возит дорогие/дефицитные грузы (высокий риск претензий)",
      "Перевозчикам с международными маршрутами (CMR)",
    ],
    [
      "Фура/автопарк иелеріне",
      "Тұрақты рейсі бар тасымалдау компанияларына",
      "Қымбат/тапшы жүкті таситындарға (талап тәуекелі жоғары)",
      "Халықаралық бағыттағы тасымалдаушыларға (CMR)",
    ],
    [
      "Truck owners and fleets",
      "Transport companies with recurring trips",
      "Those carrying expensive/high-risk cargo",
      "International routes (CMR)",
    ]
  );

  const cQA = tByLang(
    lang,
    [
      { k: "Зачем, если груз застрахован?", v: "Грузовой полис защищает владельца груза. Вам нужен полис, который защищает перевозчика от его претензий." },
      { k: "Кража вместе с машиной?", v: "Иногда покрывается при выполнении условий (охраняемая стоянка/пломбы/сигнализация). Мы проверяем эти условия до покупки." },
      { k: "Действует за пределами РК?", v: "CMR — для международных перевозок (РФ/Европа/Турция и др.), но территория и условия зависят от программы." },
      { k: "Перегруз и ДТП — будет страховой?", v: "Может быть причиной отказа, если перегруз прямо запрещён условиями. Мы заранее сверяем «мелкий шрифт»." },
      { k: "Лимит: 20 или 50 млн ₸?", v: "Лимит выбирают под стоимость груза и возможный максимум претензии. Для дорогого товара 20 млн может быть недостаточно." },
    ],
    [
      { k: "Жүк сақтандырылған болса, неге керек?", v: "Жүк полисі жүк иесін қорғайды. Бұл полис — тасымалдаушының жауапкершілігін жабады." },
      { k: "Көлікпен бірге ұрлау?", v: "Кейде шарт орындалса жабылады (күзетілетін тұрақ/пломба/сигнализация). Біз шарттарды алдын ала тексереміз." },
      { k: "РК-дан тыс жарамды ма?", v: "CMR — халықаралық тасымалға. Бірақ аумақ және шарттар бағдарламаға байланысты." },
      { k: "Артық жүк және ЖКО?", v: "Егер шартта тыйым болса — бас тарту тәуекелі бар. Біз алдын ала «ұсақ мәтінді» тексереміз." },
      { k: "Лимит: 20 немесе 50 млн ₸?", v: "Лимитті жүктің құны және мүмкін талап көлемі бойынша таңдайды. Қымбат жүкке 20 млн аз болуы мүмкін." },
    ],
    [
      { k: "Why if cargo is insured?", v: "Cargo insurance protects the cargo owner. You need a policy that protects the carrier against their claims." },
      { k: "Theft with the truck?", v: "Sometimes covered if conditions are met (guarded parking/seals/alarm). We verify these conditions before purchase." },
      { k: "Valid outside KZ?", v: "CMR is for international carriage, but territory and terms depend on the program." },
      { k: "Overload causing an accident?", v: "Can trigger denial if prohibited by wording. We check the fine print upfront." },
      { k: "Limit: 20 or 50 mln KZT?", v: "Pick based on cargo value and maximum plausible claim. 20 mln may be insufficient for expensive cargo." },
    ]
  );

  const cNote = tByLang(
    lang,
    "Критично: условия по стоянкам/охране, пломбам и соблюдению режима часто влияют на выплату сильнее, чем сам тариф.",
    "Маңызды: тұрақ/күзет, пломба және режим талаптары төлемге тарифтен де қатты әсер етуі мүмкін.",
    "Critical: parking/security, seals and compliance conditions often affect payouts more than price."
  );

  // ---------- 2) FORWARDER LIABILITY ----------
  const fTitle = tByLang(
    lang,
    "Ответственность экспедитора",
    "Экспедитордың жауапкершілігі",
    "Freight forwarder liability"
  );

  const fSubtitle = tByLang(
    lang,
    "Для компаний, которые организуют перевозку и документы, но не всегда сами везут. Закрывает риски выбора субподрядчика и ошибок в логистике/бумагах.",
    "Тасымалды және құжаттарды ұйымдастыратын, бірақ өзі тасымалдамайтын компанияларға. Субподрядшыны таңдау және құжат/логистика қателері тәуекелдерін жабады.",
    "For companies that organize transport and paperwork (often using subcontractors). Covers subcontractor selection and logistics/document errors."
  );

  const fWhoTitle = cWhoTitle;
  const fWho = tByLang(
    lang,
    [
      "Экспедиторам и 3PL-операторам",
      "Логистическим компаниям, работающим через субперевозчиков",
      "Импортерам/экспортерам с регулярными отправками",
      "Компаниям, где много «бумаги»: декларации, инвойсы, поручения",
    ],
    [
      "Экспедиторлар мен 3PL операторларға",
      "Субтасымалдаушылар арқылы жұмыс істейтін логистикалық компанияларға",
      "Тұрақты жөнелтімі бар импорт/экспортқа",
      "Декларация/инвойс/тапсырма көп компанияларға",
    ],
    [
      "Freight forwarders and 3PLs",
      "Logistics companies using subcontracted carriers",
      "Regular import/export shippers",
      "Paperwork-heavy operations",
    ]
  );

  const fQA = tByLang(
    lang,
    [
      { k: "Если вез нанятый водитель — за что отвечаю?", v: "Часто — за выбор субподрядчика, документы и организационные решения (где ошиблись — там и риск)." },
      { k: "Ошибки в декларациях: покроет штрафы?", v: "Иногда можно включить расширения, но часто штрафы/пени исключаются. Мы заранее проверяем, что реально покрывается." },
      { k: "Переадресовка/задержка: кто платит?", v: "Если ошибка экспедитора привела к убытку клиента — может возникнуть претензия. Важно наличие покрытия на такие сценарии." },
      { k: "Косвенные убытки клиента?", v: "Зависит от условий: «упущенная выгода» и простой производства часто исключаются или требуют спец. оговорок." },
      { k: "В чём «фишка» брокера?", v: "Подбираем полис, который закрывает разрыв ответственности между отправителем, экспедитором и фактическим перевозчиком." },
    ],
    [
      { k: "Жалданған жүргізуші тасымалдаса — мен не үшін жауаптымын?", v: "Көбіне — субподрядшыны таңдау, құжаттар және ұйымдық шешімдер үшін." },
      { k: "Декларация қателігі: айыппұл жабыла ма?", v: "Көп жағдайда айыппұл/өспұл алып тастауға түседі. Кейде кеңейту бар — біз нақтысын алдын ала қараймыз." },
      { k: "Қайта бағыттау/кешігу: кім төлейді?", v: "Экспедитор қатесі клиент шығынына әкелсе — талап туындауы мүмкін. Мұндай сценарийдің жабылуы маңызды." },
      { k: "Клиенттің жанама шығыны?", v: "Шартқа байланысты: «упущенная выгода», өндіріс тоқтауы жиі алып тасталады немесе арнайы келісімді қажет етеді." },
      { k: "Брокердің артықшылығы?", v: "Жөнелтуші–экспедитор–нақты тасымалдаушы арасындағы жауапкершілік «саңылауын» жапқан бағдарламаны таңдаймыз." },
    ],
    [
      { k: "If a hired driver carries the cargo, what am I liable for?", v: "Often for subcontractor selection, documents and operational decisions." },
      { k: "Document mistakes: are customs fines covered?", v: "Often excluded, sometimes available via extensions. We verify what is truly covered." },
      { k: "Misrouting / delay: who pays?", v: "If your error causes client losses, a claim may arise. Coverage wording matters." },
      { k: "Consequential losses?", v: "Depends: lost profit and business interruption are commonly excluded or need special clauses." },
      { k: "Broker advantage?", v: "We close the liability gap between shipper, forwarder and the actual carrier." },
    ]
  );

  const fNote = tByLang(
    lang,
    "Самая частая проблема: клиент ожидает «всё покрыто», а в договоре исключены штрафы, пени и косвенные убытки. Мы это вскрываем до подписания.",
    "Ең жиі мәселе: клиент «бәрі жабылады» деп ойлайды, ал шартта айыппұл/өспұл және жанама шығындар алынып тасталған. Біз оны алдын ала көрсетеміз.",
    "Common pitfall: clients expect ‘everything is covered’ while fines and consequential losses are excluded. We surface this before signing."
  );

  // ---------- 3) PROFESSIONAL LIABILITY ----------
  const pTitle = tByLang(
    lang,
    "Профессиональная ответственность (PI)",
    "Кәсіби жауапкершілік (PI)",
    "Professional indemnity (PI)"
  );

  const pSubtitle = tByLang(
    lang,
    "Защита специалиста/компании от претензий из-за профессиональной ошибки: от консультаций до проектов и ИТ-услуг. Часто включает оплату юридической защиты.",
    "Кәсіби қателікке байланысты талаптардан маман/компанияны қорғау: кеңес, жоба, IT қызметтері. Жиі заңгерлік қорғау шығындарын қамтиды.",
    "Protects professionals from claims due to errors/omissions. Often includes legal defense costs."
  );

  const pWhoTitle = cWhoTitle;
  const pWho = tByLang(
    lang,
    [
      "Врачи и медицинские центры",
      "Юристы, бухгалтеры, аудиторы",
      "Архитекторы, инженеры, проектировщики",
      "IT-специалисты и компании (разработка/внедрение/аутсорс)",
    ],
    [
      "Дәрігерлер және медициналық орталықтар",
      "Заңгер, бухгалтер, аудитор",
      "Сәулетші, инженер, жобалаушы",
      "IT мамандар және компаниялар",
    ],
    [
      "Doctors and medical centers",
      "Lawyers, accountants, auditors",
      "Architects, engineers, designers",
      "IT specialists and companies",
    ]
  );

  const pQA = tByLang(
    lang,
    [
      { k: "Что является страховым случаем?", v: "Неумышленная ошибка, халатность или упущение в рамках профессиональной деятельности (по условиям полиса)." },
      { k: "Судебные расходы входят?", v: "Часто да: оплата адвокатов/экспертиз — ключевая ценность таких полисов." },
      { k: "Ретроактивный период?", v: "Если включён, полис может защитить от старой ошибки, по которой претензия пришла позже." },
      { k: "Помощь до суда?", v: "В сильных программах есть сопровождение и попытка урегулировать спор до судебной стадии." },
      { k: "Почему брокер?", v: "Для каждой профессии — свои условия. Мы знаем, где лучше для IT, где сильнее для медицины и как избежать «дыр» в покрытии." },
    ],
    [
      { k: "Сақтандыру жағдайы не?", v: "Кәсіби қызмет аясындағы қасақана емес қате/салғырттық/өткізіп алу (шартқа байланысты)." },
      { k: "Сот шығындары бар ма?", v: "Жиі бар: адвокат/сараптама — негізгі артықшылық." },
      { k: "Ретроактивті кезең?", v: "Қосылса — бұрынғы қате бойынша кейін келген талаптан қорғай алады." },
      { k: "Сотқа дейін көмектесе ме?", v: "Кей бағдарламаларда сотқа дейін реттеу және сүйемелдеу бар." },
      { k: "Неге брокер?", v: "Әр мамандықта шарт әртүрлі. IT үшін біреуі мықты, медицина үшін басқасы — біз сәйкестендіреміз." },
    ],
    [
      { k: "What is a claim event?", v: "Unintentional error/omission/negligence in your professional services (per wording)." },
      { k: "Are legal costs covered?", v: "Often yes: lawyers/experts are the core value." },
      { k: "Retroactive cover?", v: "If included, it can respond to past work where the claim arrives later." },
      { k: "Pre-court support?", v: "Stronger programs include dispute handling before litigation." },
      { k: "Why a broker?", v: "Each profession has different best-in-class wording. We match the right insurer and avoid gaps." },
    ]
  );

  const pNote = tByLang(
    lang,
    "Если вы работаете по контрактам с крупными клиентами, они часто требуют PI с конкретным лимитом и ретро-периодом. Мы подстроим полис под требования договора.",
    "Ірі клиенттермен келісімшарт болса, олар көбіне нақты лимит және ретро-кезең талап етеді. Біз полисті шартқа сай қыламыз.",
    "Enterprise contracts often require specific PI limits and retro terms. We align the policy to your contract."
  );

  // ---------- 4) HOMEOWNERS LIABILITY ----------
  const hTitle = tByLang(
    lang,
    "Ответственность владельцев квартир (перед соседями)",
    "Пәтер иесінің жауапкершілігі (көршілер алдында)",
    "Homeowners’ liability (to neighbors)"
  );

  const hSubtitle = tByLang(
    lang,
    "Защита от расходов, если вы случайно причинили ущерб соседям: залив, пожар, взрыв газа, повреждение общедомового имущества.",
    "Көршілерге кездейсоқ зиян келтірсеңіз шығынды жабу: су басу, өрт, газ жарылысы, ортақ мүлікке зиян.",
    "Covers costs if you accidentally damage neighbors’ property: water leaks, fire, gas explosion, common property damage."
  );

  const hWhoTitle = tByLang(lang, "Кому подходит", "Кімге сәйкес", "Who it’s for");
  const hWho = tByLang(
    lang,
    [
      "Собственникам квартир",
      "Арендодателям (квартира сдаётся)",
      "Семьям с ремонтом и дорогой отделкой",
      "Тем, кто хочет закрыть риск «одним полисом на год»",
    ],
    [
      "Пәтер иелеріне",
      "Жалға берушілерге",
      "Жөндеуі қымбат пәтерлерге",
      "«Жылдық бір полис» қалайтындарға",
    ],
    [
      "Apartment owners",
      "Landlords renting out property",
      "Homes with expensive renovations",
      "Those who prefer a simple yearly safety net",
    ]
  );

  const hQA = tByLang(
    lang,
    [
      { k: "«Залил соседей»: что делать?", v: "Сделайте фото/видео, вызовите КСК/ОСИ для акта, зафиксируйте контакты, сразу звоните брокеру — дальше ведём по шагам." },
      { k: "Ущерб от арендаторов покрывается?", v: "Зависит от программы: иногда требуется отдельное условие/оговорка. Мы подберём вариант под сдачу." },
      { k: "Пожар/взрыв газа: подъезд тоже?", v: "Может покрываться как ущерб третьим лицам и общему имуществу — но условия различаются." },
      { k: "Лимит на «евроремонт» соседа?", v: "Стандартный лимит не всегда достаточен. Подбираем лимит под реальный уровень отделки в доме." },
      { k: "Цена — почему это выгодно?", v: "Годовой полис часто стоит дешевле одной аварийной услуги. Это дешёвая защита от дорогой проблемы." },
    ],
    [
      { k: "«Көршіні су бастырдым»: не істеу керек?", v: "Фото/видео, КСК/ОСИ акт, байланыстарды тіркеу, бірден брокерге қоңырау — әрі қарай қадамдап жүргіземіз." },
      { k: "Жалға алушы келтірген зиян жабыла ма?", v: "Бағдарламаға байланысты: кейде қосымша шарт керек. Біз жалға беруге лайық нұсқаны таңдаймыз." },
      { k: "Өрт/газ жарылысы: подъезд те?", v: "Кей шарттарда ортақ мүлік пен үшінші тұлғаларға зиян ретінде жабылады — нақтысын тексереміз." },
      { k: "Көршінің «еврожөндеу» лимиті?", v: "Стандарт лимит жеткіліксіз болуы мүмкін. Үйдегі нақты жөндеу деңгейіне сай лимит қоямыз." },
      { k: "Баға — неге тиімді?", v: "Жылдық полис бір қызмет шақыруынан да арзан болуы мүмкін. Қымбат тәуекелге арзан қорғаныс." },
    ],
    [
      { k: "‘I flooded my neighbors’: what now?", v: "Take photos/video, get an official report (management/HOA), capture contacts, call us — we guide you step-by-step." },
      { k: "Damage caused by tenants?", v: "Depends on wording; sometimes requires a specific clause. We select the right option for landlords." },
      { k: "Fire / gas explosion: common areas too?", v: "Can be covered as third-party/common property damage, but conditions vary." },
      { k: "Limit for expensive renovations?", v: "Standard limits may be too low. We set limits based on real renovation levels in the building." },
      { k: "Why it’s worth it?", v: "A yearly policy can cost less than one emergency repair call — cheap protection from expensive losses." },
    ]
  );

  const hNote = tByLang(
    lang,
    "Важно: при убытке решает фиксация фактов (акт, фото, даты) и скорость уведомления. Это зона, где брокер реально экономит время и нервы.",
    "Маңызды: оқиғада дәлел (акт, фото, күн) және уақытылы хабарлау шешеді. Бұл жерде брокер уақыт пен жүйкені үнемдейді.",
    "Important: documentation and quick notification are key. This is where a broker truly saves time and stress."
  );

  const commonBrokerTitle = tByLang(
    lang,
    "Роль брокера",
    "Брокердің рөлі",
    "Broker’s role"
  );

  const commonBroker = tByLang(
    lang,
    [
      "Сверяем исключения и условия отказа (охраняемые стоянки, документы, сроки уведомления).",
      "Подбираем лимит под реальный риск (а не «как у всех»).",
      "Помогаем с урегулированием: что собрать и как общаться со страховщиком.",
    ],
    [
      "Алып тастаулар мен бас тарту шарттарын тексереміз (күзетілетін тұрақ, құжат, хабарлау мерзімі).",
      "Лимитті нақты тәуекелге сай қоямыз (жай ғана «барлығындай» емес).",
      "Өтемде көмектесеміз: не жинау керек және сақтандырумен қалай сөйлесу керек.",
    ],
    [
      "We validate exclusions/denial triggers (guarded parking, documents, notification terms).",
      "We set limits based on real risk, not ‘default’ numbers.",
      "We support claims handling: what to collect and how to communicate with the insurer.",
    ]
  );

  return (
    <section id="liability" className="py-10 sm:py-14 bg-[#F7F7F7]">
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
            <span className="font-mono">#liability</span>
          </div>
        </div>

        {/* 4 карточки */}
        <div className="mt-7 space-y-6">
          {/* 1) Carrier */}
          <CardShell
            title={cTitle}
            subtitle={cSubtitle}
            badges={tByLang(
              lang,
              ["B2B", "Перевозки", "CMR"],
              ["B2B", "Тасымал", "CMR"],
              ["B2B", "Transport", "CMR"]
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
                  {tByLang(lang, "Запросить условия/лимит", "Шарт/лимит сұрау", "Request terms/limit")}
                </Link>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {tByLang(lang, "Проверить маршрут", "Маршрутты тексеру", "Validate route")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{cWhoTitle}</h4>
                <BulletList items={cWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {tByLang(lang, "Ключевые вопросы", "Негізгі сұрақтар", "Key questions")}
                </h4>
                <KeyValueList rows={cQA} note={cNote} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{commonBrokerTitle}</h4>
              <BulletList items={commonBroker} />
            </div>
          </CardShell>

          {/* 2) Forwarder */}
          <CardShell
            title={fTitle}
            subtitle={fSubtitle}
            badges={tByLang(
              lang,
              ["B2B", "Логистика", "3PL"],
              ["B2B", "Логистика", "3PL"],
              ["B2B", "Logistics", "3PL"]
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
                  {tByLang(lang, "Запросить программу", "Бағдарлама сұрау", "Request a program")}
                </Link>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {tByLang(lang, "Проверить исключения", "Алып тастауды тексеру", "Check exclusions")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{fWhoTitle}</h4>
                <BulletList items={fWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {tByLang(lang, "Ключевые вопросы", "Негізгі сұрақтар", "Key questions")}
                </h4>
                <KeyValueList rows={fQA} note={fNote} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{commonBrokerTitle}</h4>
              <BulletList items={commonBroker} />
            </div>
          </CardShell>

          {/* 3) Professional */}
          <CardShell
            title={pTitle}
            subtitle={pSubtitle}
            badges={tByLang(
              lang,
              ["B2B/B2C", "Юр.защита", "Ретро"],
              ["B2B/B2C", "Құқықтық қорғау", "Ретро"],
              ["B2B/B2C", "Legal costs", "Retro"]
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
                  {tByLang(lang, "Подобрать под профессию", "Мамандыққа сай таңдау", "Match to profession")}
                </Link>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {tByLang(lang, "Проверить ретро-период", "Ретро-кезеңді тексеру", "Check retro period")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{pWhoTitle}</h4>
                <BulletList items={pWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {tByLang(lang, "Ключевые вопросы", "Негізгі сұрақтар", "Key questions")}
                </h4>
                <KeyValueList rows={pQA} note={pNote} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{commonBrokerTitle}</h4>
              <BulletList items={commonBroker} />
            </div>
          </CardShell>

          {/* 4) Homeowners */}
          <CardShell
            title={hTitle}
            subtitle={hSubtitle}
            badges={tByLang(
              lang,
              ["Физлица", "Аренда", "Соседи"],
              ["Жеке тұлға", "Жалға беру", "Көршілер"],
              ["Individuals", "Rentals", "Neighbors"]
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
                  {tByLang(lang, "Оформить на год", "1 жылға рәсімдеу", "Get annual cover")}
                </Link>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {tByLang(lang, "Уточнить лимит", "Лимитті нақтылау", "Clarify limit")}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{hWhoTitle}</h4>
                <BulletList items={hWho} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {tByLang(lang, "Ключевые вопросы", "Негізгі сұрақтар", "Key questions")}
                </h4>
                <KeyValueList rows={hQA} note={hNote} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">{commonBrokerTitle}</h4>
              <BulletList items={commonBroker} />
            </div>
          </CardShell>
        </div>
      </div>
    </section>
  );
}
