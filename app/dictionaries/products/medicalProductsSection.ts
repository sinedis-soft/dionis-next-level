// app/dictionaries/products/medicalProductsSection.ts
import type { Lang } from "@/dictionaries/header";

export type MedicalProductsSectionDictionary = {
  anchor: string;

  top: {
    title: string;
    lead: string;
    diffTitle: string;
    diffRows: Array<{ k: string; v: string }>;
  };

  cards: {
    dms: {
      title: string;
      subtitle: string;
      badges: string[];
      actions: {
        primary: string;
        secondary: string;
      };
      clinicsTitle: string;
      clinics: string[];
      includedTitle: string;
      includedRows: Array<{ k: string; v: string }>;
      includedNote: string;
      brokerTitle: string;
      brokerBullets: string[];
    };

    accident: {
      title: string;
      subtitle: string;
      badges: string[];
      actions: {
        primary: string;
        secondary: string;
      };
      whoTitle: string;
      whoBullets: string[];
      howTitle: string;
      howRows: Array<{ k: string; v: string }>;
      note: string;
      scheduleTitle: string;
      scheduleText: string;
    };

    travel: {
      title: string;
      subtitle: string;
      badges: string[];
      actions: {
        primary: string;
        secondary: string;
      };
      whoTitle: string;
      whoBullets: string[];
      howTitle: string;
      steps: string[];
      optionsTitle: string;
      optionsRows: Array<{ k: string; v: string }>;
      optionsNote: string;
    };
  };
};

function byLang(lang: Lang, ru: string, kz: string, en: string) {
  if (lang === "kz") return kz;
  if (lang === "en") return en;
  return ru;
}

export function getMedicalProductsSectionDictionary(
  lang: Lang
): MedicalProductsSectionDictionary {
  return {
    anchor: "medical",

    top: {
      title: byLang(lang, "Медицинское страхование", "Медициналық сақтандыру", "Medical insurance"),
      lead: byLang(
        lang,
        "В Казахстане важно различать ОСМС и ДМС. ОСМС — базовая (гос.) медицина по перечню услуг и правилам системы. ДМС — доступ к частным клиникам по договору, с ассистансом 24/7 и понятным маршрутом пациента. Мы выступаем «проводником»: подбираем программу, сеть клиник и проверяем исключения.",
        "Қазақстанда ОСМС пен ДМС-тің айырмасы маңызды. ОСМС — мемлекеттік жүйе аясындағы базалық қызметтер. ДМС — келісім бойынша жеке клиникаларға қолжетімділік, 24/7 ассистанс және нақты пациент маршруты. Біз «бағыттаушы» ретінде бағдарлама, клиникалар желісі мен алып тастауларды дұрыс таңдаймыз.",
        "In Kazakhstan it’s crucial to separate OSMS and DMS. OSMS is the baseline state system with defined services and rules. DMS is access to private clinics under a contract, with 24/7 assistance and a clear care pathway. We act as a guide: selecting a plan, clinic network and verifying exclusions."
      ),
      diffTitle: byLang(lang, "ОСМС vs ДМС — коротко", "ОСМС vs ДМС — қысқаша", "OSMS vs DMS — in brief"),
      diffRows:
        lang === "kz"
          ? [
              { k: "ОСМС", v: "мемлекеттік жүйе, қызметтер тізімі және маршрутизация" },
              { k: "ДМС", v: "келісім бойынша жеке клиникалар + ассистанс + сервис/жылдамдық" },
              { k: "Брокердің рөлі", v: "клиника желісін, қамтуды, лимиттерді таңдау және алып тастауларды тексеру" },
            ]
          : lang === "en"
            ? [
                { k: "OSMS", v: "state system, defined list of services and routing rules" },
                { k: "DMS", v: "private clinics under contract + assistance + speed/service" },
                { k: "Broker’s role", v: "select clinic network, coverage, limits, and verify exclusions" },
              ]
            : [
                { k: "ОСМС", v: "гос. система, фиксированный перечень услуг и маршрутизация" },
                { k: "ДМС", v: "частные клиники по договору + ассистанс + сервис и скорость" },
                { k: "Роль брокера", v: "подбор сети клиник, покрытия, лимитов и честная проверка исключений" },
              ],
    },

    cards: {
      dms: {
        title: byLang(lang, "Добровольное медстрахование (ДМС)", "Ерікті медициналық сақтандыру (ДМС)", "Voluntary Medical Insurance (DMS)"),
        subtitle: byLang(
          lang,
          "Доступ к частной медицине для сотрудников компаний и частных клиентов: клиники, диагностика и понятная логистика через ассистанс.",
          "Компания қызметкерлері мен жеке клиенттер үшін жеке медицинаға қолжетімділік: клиникалар, диагностика және ассистанс арқылы басқарылатын процесс.",
          "Access to private healthcare for corporate staff and individual clients: clinics, diagnostics, and a clear assistance-driven process."
        ),
        badges:
          lang === "kz"
            ? ["Корпоратив", "Отбасы", "Ассистанс 24/7"]
            : lang === "en"
              ? ["Corporate", "Family", "24/7 Assistance"]
              : ["Корпоративным", "Семьям", "Ассистанс 24/7"],
        actions: {
          primary: byLang(lang, "Запросить КП по ДМС", "ДМС бойынша ұсыныс сұрау", "Request a DMS quote"),
          secondary: byLang(lang, "Уточнить клиники и лимиты", "Клиника/лимит нақтылау", "Clarify clinics & limits"),
        },
        clinicsTitle: byLang(lang, "В какие клиники можно ходить", "Қай клиникаларға баруға болады", "Which clinics you can visit"),
        clinics:
          lang === "kz"
            ? [
                "Алматы: Mediker, Interteach, SEMA Hospital, Rahat Medical Center, International Medical Center (IMC) және т.б.",
                "Астана: Interteach, Mediker, Green Clinic, Premier Med Clinic және т.б.",
                "РК басқа қалалары: желілік клиникалар және серіктес орталықтар (локацияға сай таңдаймыз).",
                "Маңызды: нақты тізім сақтандырушыға және пакетке байланысты — төлемге дейін КП-да бекітеміз.",
              ]
            : lang === "en"
              ? [
                  "Almaty: Mediker, Interteach, SEMA Hospital, Rahat Medical Center, International Medical Center (IMC) and others.",
                  "Astana: Interteach, Mediker, Green Clinic, Premier Med Clinic and others.",
                  "Other Kazakhstan cities: network clinics and partner centers (we tailor to staff/family location).",
                  "Important: the exact list depends on insurer and package — we confirm it in the proposal before payment.",
                ]
              : [
                  "Алматы: Mediker, Interteach, SEMA Hospital, Rahat Medical Center, International Medical Center (IMC) и др.",
                  "Астана: Interteach, Mediker, Green Clinic, Premier Med Clinic и др.",
                  "Другие города РК: сетевые клиники и партнерские центры (подбираем под локацию сотрудников/семьи).",
                  "Важно: конкретный список зависит от выбранной страховой и пакета — мы фиксируем его в КП до оплаты.",
                ],
        includedTitle: byLang(lang, "Что входит в пакет", "Пакетке не кіреді", "What’s included"),
        includedRows:
          lang === "kz"
            ? [
                { k: "Емхана", v: "терапевт және тар бейінді мамандар" },
                { k: "Диагностика", v: "талдаулар, УДЗ, рентген, МРТ/КТ — бағдарламаға сай" },
                { k: "Жедел жәрдем", v: "шақыру және госпитализация — шартқа сай" },
                { k: "Стоматология", v: "көбіне бөлек лимит/опция" },
                { k: "Дәрілер", v: "кейде кіреді, жиі — тағайындау/лимит бойынша" },
              ]
            : lang === "en"
              ? [
                  { k: "Outpatient care", v: "GP and specialists by appointment" },
                  { k: "Diagnostics", v: "tests, ultrasound, X-ray, MRI/CT — per plan" },
                  { k: "Emergency", v: "ambulance/hospitalization — per insurer terms" },
                  { k: "Dental", v: "often as an option or separate limit" },
                  { k: "Medicines", v: "sometimes included, often limited/by prescription" },
                ]
              : [
                  { k: "Поликлиника", v: "терапевт и узкие специалисты по записи" },
                  { k: "Диагностика", v: "анализы, УЗИ, рентген, МРТ/КТ — по программе" },
                  { k: "Скорая/неотложка", v: "вызов и госпитализация — по условиям страховщика" },
                  { k: "Стоматология", v: "часто отдельным лимитом или опцией" },
                  { k: "Медикаменты", v: "иногда включаются, чаще — по назначению/лимитам" },
                ],
        includedNote: byLang(
          lang,
          "Состав пакета всегда зависит от программы и лимитов. Мы показываем 2–3 уровня пакетов (эконом/стандарт/премиум) и объясняем, где «подводные камни».",
          "Пакет құрамы бағдарлама мен лимитке байланысты. Біз 2–3 деңгей ұсынамыз (эконом/стандарт/премиум) және тәуекелдерді түсіндіреміз.",
          "Package scope depends on plan and limits. We provide 2–3 tiers (economy/standard/premium) and explain pitfalls upfront."
        ),
        brokerTitle: byLang(lang, "Ключевые вопросы — честно", "Негізгі сұрақтар — ашық", "Key questions — honestly"),
        brokerBullets:
          lang === "kz"
            ? [
                "Созылмалы аурулар: көбіне бірінші жылы жабылмайды, бірақ ерекшеліктер болады — біз табамыз және жазбаша бекітеміз.",
                "Дәрігерге жазылу: әдетте ассистанс арқылы (24/7 диспетчер).",
                "Жеке тұлғаға ДМС: кейде компанияға қарағанда қиын — бірақ бізде дайын отбасы/жеке пакеттер бар.",
              ]
            : lang === "en"
              ? [
                  "Chronic conditions: often NOT covered in the first year, but exceptions exist — we find and confirm them in writing.",
                  "Appointments: usually via 24/7 assistance, so you don’t fight registries yourself.",
                  "DMS for individuals: sometimes harder than corporate — we have ready family/individual packages not obvious on insurer websites.",
                ]
              : [
                  "Хроника: чаще всего НЕ покрывается в первый год, но иногда есть исключения — мы их ищем и фиксируем письменно.",
                  "Запись к врачу: обычно через ассистанс (24/7 диспетчер), чтобы вы не «бегали по регистратурам».",
                  "ДМС физлицам: да, иногда сложнее, чем компании — зато у нас есть готовые семейные/индивидуальные пакеты, которые неочевидны на сайтах СК.",
                ],
      },

      accident: {
        title: byLang(lang, "Страхование от несчастных случаев (НС)", "Жазатайым оқиғалардан сақтандыру (НС)", "Personal Accident Insurance"),
        subtitle: byLang(
          lang,
          "Это не «лечение», а денежная выплата при травме/переломе/инвалидности. Подходит для спорта, производства и быта.",
          "Бұл «емдеу» емес — жарақат/сыну/мүгедектік кезінде ақшалай төлем. Спортқа, өндіріс пен тұрмысқа сай.",
          "Not “treatment” — a cash benefit for injury/fracture/disability. Works for sports, hazardous jobs and everyday life."
        ),
        badges:
          lang === "kz"
            ? ["Ақшалай", "Спорт/жұмыс", "24/7 немесе жұмыс"]
            : lang === "en"
              ? ["Cash benefit", "Sport/work", "24/7 or work-only"]
              : ["Деньгами", "Спорт/работа", "24/7 или работа"],
        actions: {
          primary: byLang(lang, "Подобрать НС", "НС таңдау", "Get an accident quote"),
          secondary: byLang(lang, "Для спорта/детей", "Спорт/балалар үшін", "For sports/kids"),
        },
        whoTitle: byLang(lang, "Кому подходит", "Кімге сай", "Who it’s for"),
        whoBullets:
          lang === "kz"
            ? [
                "Спортшыларға және балалар секцияларына",
                "Қауіпті мамандықтар мен өндіріс тәуекелдері",
                "Отбасыларға: тұрмыстық жарақаттар (мұз, күйік, ЖКО)",
                "Жұмыс берушіге әлеуметтік пакет ретінде",
              ]
            : lang === "en"
              ? [
                  "Athletes and kids in sports clubs/competitions",
                  "Hazardous occupations and industrial risks",
                  "Families: everyday injuries (ice, burns, road accidents)",
                  "Employers as part of benefits package",
                ]
              : [
                  "Спортсменам и детям на секциях/соревнованиях",
                  "Опасные профессии и производственные риски",
                  "Семьям: бытовые травмы (гололед, ожоги, ДТП)",
                  "Работодателям как часть соцпакета",
                ],
        howTitle: byLang(lang, "Как это работает", "Қалай жұмыс істейді", "How it works"),
        howRows:
          lang === "kz"
            ? [
                { k: "Төлем", v: "төлем кестесі бойынша сақтандыру сомасының % мөлшері" },
                { k: "Қашан", v: "жарақат/сыну/мүгедектік/қайтыс болу — шарт бойынша" },
                { k: "Аумақ/уақыт", v: "тек жұмыс кезінде ме, әлде 24/7 — таңдауға болады" },
                { k: "Спорт", v: "секция/жарыс үшін дұрыс опциялар керек (біз тексереміз)" },
              ]
            : lang === "en"
              ? [
                  { k: "Benefit", v: "a fixed % of the insured sum per benefit schedule" },
                  { k: "Triggers", v: "injury/fracture/disability/death — per terms" },
                  { k: "Coverage mode", v: "work-only or 24/7 — chosen at issuance" },
                  { k: "Sports", v: "sports activities require correct options (we verify)" },
                ]
              : [
                  { k: "Что платят", v: "фиксированный % от страховой суммы по таблице выплат" },
                  { k: "Когда платят", v: "травма/перелом/инвалидность/смерть — по условиям" },
                  { k: "Где действует", v: "только работа или 24/7 — выбирается при оформлении" },
                  { k: "Спорт", v: "для секций/соревнований нужны корректные опции (мы проверяем)" },
                ],
        note: byLang(
          lang,
          "Важно: НС не заменяет ДМС. ДМС организует лечение, НС дает деньги на реабилитацию, расходы и потерю дохода.",
          "Маңызды: НС ДМС-ті алмастырмайды. ДМС емдеуді ұйымдастырады, НС — ақша төлемі.",
          "Important: Accident insurance doesn’t replace DMS. DMS organizes care; accident pays cash for rehab/costs/lost income."
        ),
        scheduleTitle: byLang(lang, "Про «таблицу выплат»", "«Төлем кестесі» туралы", "About the benefit schedule"),
        scheduleText: byLang(
          lang,
          "В НС ключевое — не «красивый тариф», а таблица выплат и определения травм. Мы сравниваем формулировки, чтобы за типовую травму выплата была ожидаемой, а не «по усмотрению».",
          "НС бойынша ең маңыздысы — тариф емес, төлем кестесі мен анықтамалар. Біз мәтінді салыстырамыз, сонда төлем болжамды болады.",
          "In accident insurance the core is the benefit schedule and definitions. We compare wording so typical injuries pay as expected, not “at discretion”."
        ),
      },

      travel: {
        title: byLang(lang, "Страхование выезжающих за рубеж (ВЗР / Travel)", "Шетелге шығушыларды сақтандыру (ВЗР / Travel)", "Travel Insurance (VZR)"),
        subtitle: byLang(
          lang,
          "Для визы и поездок: медицинские расходы за границей + ассистанс, а также опции под активный отдых и риски в пути.",
          "Виза және сапар үшін: шетелде мед. шығындар + ассистанс, сондай-ақ белсенді демалыс опциялары.",
          "For visa and trips: overseas medical expenses + assistance, with options for active sports and travel risks."
        ),
        badges:
          lang === "kz"
            ? ["Виза", "Ассистанс", "Опциялар"]
            : lang === "en"
              ? ["Visa", "Assistance", "Options"]
              : ["Виза", "Ассистанс", "Опции"],
        actions: {
          primary: byLang(lang, "Оформить Travel", "Travel рәсімдеу", "Get travel insurance"),
          secondary: byLang(lang, "Проверить под визу", "Визаға тексеру", "Check visa compliance"),
        },
        whoTitle: byLang(lang, "Кому нужно", "Кімге керек", "Who needs it"),
        whoBullets:
          lang === "kz"
            ? [
                "Туристерге және отбасыларға",
                "Іссапар және бизнес сапарларға",
                "Шетелде оқитын студенттерге",
                "Полистің «қабылдануы» маңызды адамдарға (консульство/жұмыс беруші)",
              ]
            : lang === "en"
              ? [
                  "Tourists and families",
                  "Business trips and assignments",
                  "Students studying abroad",
                  "Anyone who needs the policy to be accepted (consulate/employer)",
                ]
              : [
                  "Туристам и семьям в отпуске",
                  "Командировочным и бизнес-поездкам",
                  "Студентам и тем, кто учится за границей",
                  "Тем, кому важно, чтобы полис «приняли» (консульство/работодатель)",
                ],
        howTitle: byLang(lang, "Если за границей стало плохо", "Шетелде ауырып қалсаңыз", "If you get sick abroad"),
        steps:
          lang === "kz"
            ? [
                "1) Ассистанске қоңырау шалу (полистегі номер) — басты ереже.",
                "2) Ассистанс бағыттаған клиника/дәрігер бойынша әрекет ету.",
                "3) Келісімсіз өзіңіз төлемеу (өтемақы мәселесі болуы мүмкін).",
                "4) Құжаттарды сақтау: шоттар, эпикриз, тағайындаулар.",
              ]
            : lang === "en"
              ? [
                  "1) Call the assistance number in the policy — the key rule.",
                  "2) Follow the route: clinic/doctor/hospital as directed by assistance.",
                  "3) Don’t pay out of pocket without approval (may affect reimbursement).",
                  "4) Keep documents: invoices, medical notes, prescriptions.",
                ]
              : [
                  "1) Позвонить в ассистанс (номер в полисе) — это ключевое правило.",
                  "2) Следовать маршруту: клиника/врач/госпиталь — по направлению ассистанса.",
                  "3) Не оплачивать самостоятельно без согласования (иначе возможны проблемы с возмещением).",
                  "4) Сохранить документы: счета, выписки, назначения.",
                ],
        optionsTitle: byLang(lang, "Частые доп. опции", "Жиі қосылатын опциялар", "Common add-ons"),
        optionsRows:
          lang === "kz"
            ? [
                { k: "Виза", v: "Шенген/АҚШ/Қытай талаптарына сай полисті дұрыс таңдаймыз" },
                { k: "COVID-19", v: "опция бағдарлама/елге байланысты — алдын ала тексереміз" },
                { k: "Белсенді демалыс", v: "шаңғы/дайвинг/мопед — қосымша қамтуды талап етеді" },
                { k: "Багаж/рейс", v: "рейс кешігуі, багаж жоғалуы — сервис тәуекелдері" },
                { k: "Стоматология", v: "көбіне жедел және лимитпен" },
              ]
            : lang === "en"
              ? [
                  { k: "Visa", v: "Schengen/US/China compliant plans — we select correctly" },
                  { k: "COVID-19", v: "depends on plan/country — we verify before purchase" },
                  { k: "Active sports", v: "ski/diving/scooter often requires extra cover" },
                  { k: "Baggage/flight", v: "delay/loss options as service risks" },
                  { k: "Dental", v: "usually emergency-only with a limit" },
                ]
              : [
                  { k: "Виза", v: "полисы под требования Шенгена/США/Китая — подбираем корректно" },
                  { k: "COVID-19", v: "опция зависит от программы/страны — проверяем перед оплатой" },
                  { k: "Активный отдых", v: "лыжи/дайвинг/мопед — часто требует доп. покрытия" },
                  { k: "Багаж/рейс", v: "задержка рейса, потеря багажа — как сервисные риски" },
                  { k: "Стоматология", v: "обычно экстренно и с лимитом (объясняем заранее)" },
                ],
        optionsNote: byLang(
          lang,
          "Мы заранее уточняем страну, даты, тип визы и активность — иначе полис может быть формально «есть», но практически бесполезен.",
          "Ел, күндер, виза түрі және белсенділікті алдын ала нақтылаймыз — әйтпесе полис формалды болып қалуы мүмкін.",
          "We confirm country, dates, visa type and activities upfront — otherwise a policy may be formally valid but practically useless."
        ),
      },
    },
  };
}
