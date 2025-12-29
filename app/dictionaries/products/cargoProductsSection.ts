// app/dictionaries/products/cargoProductsSection.ts
import type { Lang } from "@/dictionaries/header";

export type KVRow = { k: string; v: string };

export type CargoProductsSectionDict = {
  topTitle: string;
  topLead: string;

  cardTitle: string;
  cardSubtitle: string;
  badges: string[];

  actions: {
    quoteBtn: string;
    phoneLabel: string; // just label (number in component)
  };

  blocks: {
    object: {
      title: string;
      subtitle: string;
      metaLine: string;
      whoTitle: string;
      whoItems: string[];
      kvTitle: string;
      kvRows: KVRow[];
      note: string;
    };

    risks: {
      title: string;
      subtitle: string;
      leftMeta: string;
      variantsTitle: string;
      variantsItems: string[];
      faqTitle: string;
      faqRows: KVRow[];
      note: string;
    };

    cmrVsCargo: {
      title: string;
      subtitle: string;
      rows: KVRow[];
      note: string;
    };

    territory: {
      title: string;
      items: string[];
    };

    broker: {
      title: string;
      lead: string;
      items: string[];
    };

    price: {
      title: string;
      items: string[];
    };
  };
};

const ru: CargoProductsSectionDict = {
  topTitle: "Страхование грузов",
  topLead:
    "Страхование груза защищает собственника товара в перевозке. Ниже — ответы на ключевые вопросы: что застраховано, ICC A/B/C, разница CMR vs Cargo, территория, роль брокера и из чего складывается цена.",

  cardTitle: "Страхование грузов — ответы на ключевые вопросы",
  cardSubtitle:
    "Одна карточка: объект, риски (ICC), отличие от CMR, территория, роль брокера и ценообразование.",
  badges: ["ICC A/B/C", "CMR vs Cargo", "KZ/INTL"],

  actions: {
    quoteBtn: "Запросить предложение",
    phoneLabel: "Позвонить",
  },

  blocks: {
    object: {
      title: "Что именно застраховано",
      subtitle:
        "Объект — груз (товар) в пути. Полис подбирается под регулярность перевозок, тип товара и документы.",
      metaLine: "Генеральный / разовый • B2B",
      whoTitle: "Кому подходит",
      whoItems: [
        "Грузовладельцам и торговым компаниям (защита стоимости товара)",
        "Импортерам/экспортерам, работающим по контрактам и Инкотермс",
        "Производителям с регулярными отгрузками",
        "Логистам и экспедиторам (когда требуется полис по договору)",
      ],
      kvTitle: "Форматы полиса",
      kvRows: [
        {
          k: "Генеральный полис",
          v: "один договор на год для регулярных перевозок (удобно для постоянных отгрузок)",
        },
        {
          k: "Разовый полис",
          v: "на одну конкретную перевозку (один маршрут / одна партия)",
        },
        {
          k: "Виды грузов",
          v: "FMCG, оборудование, электроника, температурные, негабаритные, ADR — по согласованию условий",
        },
        {
          k: "Кто страхователь",
          v: "обычно грузовладелец, иногда — продавец/покупатель по контракту",
        },
      ],
      note:
        "Ключевое: страхование груза — это защита стоимости товара. Оно не заменяет ответственность перевозчика.",
    },

    risks: {
      title: "От каких рисков защищает полис",
      subtitle:
        "На практике условия описываются через ICC (Institute Cargo Clauses). Мы переводим «страховой язык» на человеческий.",
      leftMeta: "ICC A/B/C • Риски",
      variantsTitle: "Основные варианты",
      variantsItems: [
        "ICC A («все риски»): покрывает всё, что не исключено (ДТП, кража/разбой, намокание, падение, повреждение при перегрузке — если это не исключено условиями).",
        "ICC B/C («частная авария»): покрывает только перечисленные события (пожар, крушение, столкновение и т.д.) — дешевле, но уже по покрытию.",
        "Специфика рынка РК: хищение мошенничеством (когда груз забирает лжеперевозчик) — не всегда включено автоматически; важно прописать как покрываемый риск/оговорку.",
      ],
      faqTitle: "Частые вопросы",
      faqRows: [
        {
          k: "Кража на стоянке",
          v: "зависит от требований к парковке/охране. Мы подбираем условия без «невыполнимых» требований.",
        },
        {
          k: "Намокание/пролив",
          v: "обычно относится к «all risks», но упаковка и крепление критичны.",
        },
        {
          k: "Погрузка/разгрузка",
          v: "часто включается по оговорке. Мы заранее проверяем формулировку.",
        },
        {
          k: "Мошенничество",
          v: "включаем отдельным пунктом, если это критично для вашего бизнеса.",
        },
      ],
      note:
        "Самый частый отказ в выплате — не «плохая компания», а нарушение условий: упаковка, крепление, маршрут, стоянка. Брокер нужен, чтобы это не стало сюрпризом.",
    },

    cmrVsCargo: {
      title: "CMR (ответственность перевозчика) vs страхование груза",
      subtitle:
        "Это ключевое различие. Если вы грузовладелец — вам почти всегда нужно именно страхование груза.",
      rows: [
        {
          k: "CMR / ГПО перевозчика",
          v: "защищает перевозчика, когда он виноват. Имеет лимиты, исключения и франшизы.",
        },
        {
          k: "Страхование груза",
          v: "защищает стоимость груза (собственника) — часто даже когда нет виновника (стихия, молния и т.п., если включено).",
        },
        {
          k: "Типичная ошибка",
          v: "«у перевозчика есть CMR — значит груз защищён». Нет: грузовладелец может остаться без компенсации.",
        },
      ],
      note:
        "Практика: для полноценной защиты часто используют связку — CMR (защита перевозчика) + страхование груза (защита товара).",
    },

    territory: {
      title: "Территория и маршруты",
      items: [
        "Внутриреспубликанские перевозки по Казахстану",
        "Международные перевозки: СНГ, Европа, Китай, Турция",
        "Действует ли страховка на неохраняемых стоянках? Подбираем компанию с адекватными требованиями",
        "Фиксируем маршрут, перегрузки и точки хранения — это влияет на выплату",
      ],
    },

    broker: {
      title: "Почему выгодно оформлять через Dionis",
      lead:
        "Клиент видит полис и цену. Мы — условия, исключения и реальную пригодность договора к вашему маршруту и бизнес-процессу.",
      items: [
        "Сравниваем котировки 5–10 страховых компаний Казахстана и выбираем рациональный тариф под ваш риск-профиль.",
        "Анализируем оговорки: запрет ночного движения, требования к стоянкам, конвой, ограничения по странам/перегрузкам.",
        "Помогаем при убытке: как вызвать комиссара/аджастера и правильно зафиксировать порчу/недостачу для выплаты.",
        "Сопровождаем процесс до результата — чтобы вы не «воевали» с формальностями.",
      ],
    },

    price: {
      title: "Из чего складывается цена",
      items: [
        "Стоимость и тип груза",
        "Протяженность и сложность маршрута",
        "Условия ICC (A/B/C) и дополнительные оговорки",
        "Наличие и размер франшизы",
        "Упаковка, способ погрузки, температурный режим, перегрузки",
      ],
    },
  },
};

const kz: CargoProductsSectionDict = {
  topTitle: "Жүк сақтандыру",
  topLead:
    "Жүк сақтандыру тасымалдау кезінде тауар иесін қорғайды. Төменде негізгі сұрақтарға жауап: нені сақтандырады, ICC A/B/C, CMR vs Cargo, аумақ, брокер рөлі және баға факторлары.",

  cardTitle: "Жүк сақтандыру — негізгі сұрақтарға жауап",
  cardSubtitle:
    "Бір карточка: нысан, тәуекел (ICC), CMR айырмашылығы, аумақ, брокер рөлі және баға.",
  badges: ["ICC A/B/C", "CMR vs Cargo", "KZ/INTL"],

  actions: {
    quoteBtn: "Ұсыныс сұрау",
    phoneLabel: "Қоңырау шалу",
  },

  blocks: {
    object: {
      title: "Нақты не сақтандырылады",
      subtitle:
        "Нысан — жолдағы жүк (тауар). Полис тасымал жиілігіне, тауар түріне және құжаттарға қарай таңдалады.",
      metaLine: "Генералды / бір реттік • B2B",
      whoTitle: "Кімге лайық",
      whoItems: [
        "Жүк иелеріне және сауда компанияларына (тауар құнын қорғау)",
        "Импорт/экспортқа (келісімшарт және Incoterms)",
        "Тұрақты жөнелтімі бар өндірушілерге",
        "Логист/экспедиторларға (шарт талабымен)",
      ],
      kvTitle: "Полис форматтары",
      kvRows: [
        {
          k: "Генералды полис",
          v: "жылдық шарт: тұрақты тасымалға (жиі жөнелтімге ыңғайлы)",
        },
        { k: "Бір реттік полис", v: "бір тасымалға (бір маршрут / бір партия)" },
        {
          k: "Жүк түрлері",
          v: "FMCG, жабдық, электроника, температуралық, габариттен тыс, ADR — шартпен",
        },
        {
          k: "Сақтанушы",
          v: "көбіне жүк иесі, кейде — келісімшарт бойынша сатушы/сатып алушы",
        },
      ],
      note:
        "Негізгі ой: жүк сақтандыру — тауар құнын қорғау. Бұл тасымалдаушы жауапкершілігін алмастырмайды.",
    },

    risks: {
      title: "Қандай тәуекелдерден қорғайды",
      subtitle:
        "Тәжірибеде шарттар ICC (Institute Cargo Clauses) арқылы беріледі. Біз оны түсінікті тілге аударамыз.",
      leftMeta: "ICC A/B/C • Тәуекел",
      variantsTitle: "Негізгі нұсқалар",
      variantsItems: [
        "ICC A («барлық тәуекел»): алып тастауға кірмейтіннің бәрін жабады (ЖКО, ұрлық/тонау, сулану, құлау, қайта тиеудегі зақым — егер шығарылмаса).",
        "ICC B/C («жеке авария»): тек тізімдегі оқиғалар (өрт, апат, соқтығысу және т.б.) — арзанырақ, бірақ қамту тар.",
        "РК нарығының «ауруы»: алаяқтықпен ұрлау (жалған тасымалдаушы) — көбіне бөлек келісуді талап етеді.",
      ],
      faqTitle: "Жиі сұрақтар",
      faqRows: [
        {
          k: "Тұрақта ұрлық",
          v: "тұрақ/күзет талаптарына байланысты. Біз орындалмайтын талапсыз шарт іздейміз.",
        },
        {
          k: "Сулану/төгілу",
          v: "көбіне «all risks»-ке жатады, бірақ қаптама/бекіту маңызды.",
        },
        {
          k: "Тиеу/түсіру",
          v: "кейде арнайы оговорка керек. Біз мәтінді алдын ала тексереміз.",
        },
        { k: "Алаяқтық", v: "маңызды болса — жеке тармақпен енгіземіз." },
      ],
      note:
        "Ең жиі бас тарту себебі — шартты бұзу: қаптама, бекіту, маршрут, тұрақ. Брокер осыны алдын ала «жабады».",
    },

    cmrVsCargo: {
      title: "CMR vs жүк сақтандыру",
      subtitle:
        "Бұл негізгі айырмашылық. Егер сіз жүк иесі болсаңыз — көбіне жүк сақтандыру керек.",
      rows: [
        {
          k: "CMR / тасымалдаушы ГПО",
          v: "кінә болса — тасымалдаушыны қорғайды. Лимит/алып тастау/франшиза бар.",
        },
        {
          k: "Жүк сақтандыру",
          v: "жүктің құнын (иесін) қорғайды — кейде кінәлі жоқ жағдайларда да (егер шартта бар болса).",
        },
        {
          k: "Жиі қате",
          v: "«CMR бар — жүк қорғалған». Жоқ: жүк иесі өтемсіз қалуы мүмкін.",
        },
      ],
      note:
        "Тәжірибе: толық қорғау үшін жиі екі полис бірге қолданылады — CMR + жүк сақтандыру.",
    },

    territory: {
      title: "Аумақ және маршруттар",
      items: [
        "Қазақстан ішіндегі тасымал",
        "Халықаралық маршруттар: ТМД, Еуропа, Қытай, Түркия",
        "Күзетсіз тұрақта әрекет ете ме? Талаптары орындалатын шарт таңдаймыз",
        "Маршрут, қайта тиеу және сақтау нүктелерін бекітеміз — төлемге әсер етеді",
      ],
    },

    broker: {
      title: "Неге Dionis арқылы тиімді",
      lead:
        "Клиент полис пен бағаны көреді. Біз — шарт, алып тастаулар және сіздің маршрутыңызға сай келуін бақылаймыз.",
      items: [
        "Қазақстандағы 5–10 компанияның котировкасын салыстырып, тәуекелге сай тариф таңдаймыз.",
        "Оговорка талдау: түнгі қозғалыс, тұрақ талабы, конвой, ел/қайта тиеу шектеуі.",
        "Залал кезінде: комиссар/аджастер, фото/акт және дұрыс рәсімдеу арқылы төлем алу.",
        "Нәтижеге дейін сүйемелдейміз — формальдылықпен сіз жалғыз қалмайсыз.",
      ],
    },

    price: {
      title: "Баға неден құралады",
      items: [
        "Жүк құны мен түрі",
        "Маршрут ұзақтығы және күрделілігі",
        "ICC (A/B/C) және қосымша оговоркалар",
        "Франшиза бар-жоғы және мөлшері",
        "Қаптама, тиеу тәсілі, температура, қайта тиеу",
      ],
    },
  },
};

const en: CargoProductsSectionDict = {
  topTitle: "Cargo insurance",
  topLead:
    "Cargo insurance protects the cargo owner during transportation. Below are clear answers: what is insured, ICC A/B/C, CMR vs Cargo, territory, broker value, and what drives the price.",

  cardTitle: "Cargo insurance — key questions answered",
  cardSubtitle:
    "Single card: object, risks (ICC), CMR difference, territory, broker value, and pricing.",
  badges: ["ICC A/B/C", "CMR vs Cargo", "KZ/INTL"],

  actions: {
    quoteBtn: "Request a quote",
    phoneLabel: "Call",
  },

  blocks: {
    object: {
      title: "What is insured",
      subtitle:
        "The object is the cargo (goods) in transit. The policy is tailored to shipment frequency, cargo type and documents.",
      metaLine: "Annual / single • B2B",
      whoTitle: "Who it’s for",
      whoItems: [
        "Cargo owners and trading companies (protects the value of goods)",
        "Importers/exporters working under contracts and Incoterms",
        "Manufacturers with regular shipments",
        "Logistics providers/forwarders when required by contract",
      ],
      kvTitle: "Policy formats",
      kvRows: [
        {
          k: "Open (annual) policy",
          v: "one yearly contract for regular shipments (best for recurring loads)",
        },
        { k: "Single-trip policy", v: "for one shipment (one route / one consignment)" },
        {
          k: "Cargo types",
          v: "FMCG, machinery, electronics, temperature-controlled, oversized, ADR — subject to terms",
        },
        { k: "Policyholder", v: "usually the cargo owner; sometimes seller/buyer per contract" },
      ],
      note:
        "Key point: cargo insurance protects the value of goods. It does not replace carrier’s liability.",
    },

    risks: {
      title: "What risks are covered",
      subtitle:
        "In practice, terms are described via ICC (Institute Cargo Clauses). We translate insurance wording into plain language.",
      leftMeta: "ICC A/B/C • Risks",
      variantsTitle: "Core options",
      variantsItems: [
        "ICC A (All Risks): covers everything not excluded (accident, theft/robbery, wet damage, dropping, handling damage — subject to exclusions).",
        "ICC B/C (Named Perils): covers only listed events (fire, crash, collision etc.) — cheaper but narrower.",
        "Kazakhstan market pain point: fraud theft (fake carrier) is not always included by default; it must be negotiated and written in.",
      ],
      faqTitle: "Common questions",
      faqRows: [
        { k: "Theft on parking", v: "depends on parking/guarding requirements. We choose realistic terms." },
        { k: "Wet damage/spillage", v: "often falls under all risks, but packing and securing matter." },
        { k: "Loading/unloading", v: "may require an endorsement. We verify the exact wording." },
        { k: "Fraud theft", v: "we negotiate and add it explicitly if crucial for you." },
      ],
      note:
        "The most common claim issue is not ‘bad insurer’ but breached conditions: packing, securing, route, parking. A broker prevents surprises.",
    },

    cmrVsCargo: {
      title: "CMR liability vs cargo insurance",
      subtitle:
        "This is the key difference. If you own the goods, you usually need cargo insurance.",
      rows: [
        {
          k: "CMR / carrier liability",
          v: "protects the carrier when they are liable. Has limits, exclusions and deductibles.",
        },
        {
          k: "Cargo insurance",
          v: "protects the value of goods (the owner) — often even with no liable party if included.",
        },
        { k: "Typical mistake", v: "“Carrier has CMR, so my cargo is protected.” Not necessarily." },
      ],
      note:
        "In practice, full protection often uses both: CMR (carrier) + cargo insurance (goods).",
    },

    territory: {
      title: "Territory and routes",
      items: [
        "Domestic transportation within Kazakhstan",
        "International routes: CIS, Europe, China, Türkiye",
        "Does it work on unguarded parking? We choose realistic insurer requirements",
        "We document route, transshipment and storage points — affects claims",
      ],
    },

    broker: {
      title: "Why Dionis as a broker",
      lead:
        "Clients see a policy and a price. We control clauses, exclusions and whether the contract truly fits your route and operations.",
      items: [
        "We compare 5–10 Kazakhstan insurers’ quotations and choose a rational rate for your risk profile.",
        "We audit clauses: night driving bans, parking rules, convoy requirements, country/transshipment limits.",
        "We support claims: surveyor/adjuster, evidence, acts and correct reporting to secure payment.",
        "We manage the process to outcome — so you don’t fight bureaucracy alone.",
      ],
    },

    price: {
      title: "What affects the price",
      items: [
        "Cargo value and type",
        "Route length and complexity",
        "ICC (A/B/C) choice and endorsements",
        "Deductible presence and size",
        "Packing, loading method, temperature regime, transshipments",
      ],
    },
  },
};

export const CARGO_PRODUCTS_SECTION_DICTIONARY: Record<Lang, CargoProductsSectionDict> = {
  ru,
  kz,
  en,
};

export function getCargoProductsSectionDictionary(lang: Lang): CargoProductsSectionDict {
  return CARGO_PRODUCTS_SECTION_DICTIONARY[lang] ?? ru;
}
