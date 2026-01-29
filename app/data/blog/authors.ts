// data/blog/authors.ts
import type { Lang } from "@/dictionaries/header";

export type LocalizedAuthorFields = {
  name: string;
  title?: string;

  // ✅ коротко для статьи
  shortBio?: string;

  // ✅ подробно для страницы автора
  bio?: string;
};

export type AuthorRecord = {
  slug: string;
  photo?: string;
  linkedin?: string;
  i18n: Record<Lang, LocalizedAuthorFields>;
};

export const AUTHORS: AuthorRecord[] = [
  {
    slug: "denis-borovoy",
    photo: "/Фон.png",
    i18n: {
      ru: {
        name: "Денис Боровой",
        title: "Директор, страховой брокер",
        shortBio:
          "Практика в страховании и урегулировании убытков. Специализация — автострахование, ответственность, логистика.",
        bio:
          "Практика в страховании и урегулировании убытков. Ведёт подбор программ для корпоративных клиентов, сопровождает сложные кейсы по автострахованию и ответственности перевозчиков. Фокус: прозрачные условия, исключения, франшизы, качество ремонта и защита интересов клиента при урегулировании.",
      },
      en: {
        name: "Denis Borovoy",
        title: "Director, Insurance Broker",
        shortBio:
          "Insurance & claims handling practice. Focus — motor, liability, logistics.",
        bio:
          "Insurance and claims handling practice. Leads insurance program selection for corporate clients and supports complex cases in motor and carrier liability. Focus: clear terms, exclusions, deductibles, repair quality, and protecting client interests in claims.",
      },
      kz: {
        name: "Денис Боровой",
        title: "Директор, сақтандыру брокері",
        shortBio:
          "Сақтандыру және залалдарды реттеу тәжірибесі. Мамандану — автосақтандыру, жауапкершілік, логистика.",
        bio:
          "Сақтандыру және залалдарды реттеу тәжірибесі. Корпоративтік клиенттер үшін бағдарламаларды іріктейді және автосақтандыру мен тасымалдаушы жауапкершілігі бойынша күрделі істерді сүйемелдейді. Фокус: шарттардың айқындығы, алып тастаулар, франшиза, жөндеу сапасы және шығындарды реттеу кезінде клиент мүддесін қорғау.",
      },
    },
  },
  {
    slug: "sergey-anatska",
    photo: "/sergey-anatska.png",
    i18n: {
      ru: {
        name: "Сергей Анацко",
        title: "Заместитель директора · COO / CCO · технический специалист",
        shortBio:
          "Руководитель с 12+ летним опытом в продажах, страховании и автоматизации бизнес-процессов. Специализация — корпоративное страхование, ответственность перевозчиков, международные рынки и цифровизация.",
        bio:
          "Заместитель директора с опытом управления продажами, операционной деятельностью и развитием бизнеса в Беларуси, Польше, России, Казахстане и Грузии. Руководит коммерческими и операционными процессами, разрабатывает стратегии продаж, выстраивает и оптимизирует бизнес-процессы, внедряет CRM и IT-решения (Bitrix24, API-интеграции).\n\n"
          + "Практикующий специалист в корпоративном страховании: СГО грузоперевозчиков, пограничное страхование, ДМС, перестрахование. Работает с экспедиторами и транспортными компаниями, сопровождает сложные кейсы, включая урегулирование убытков, анализ исключений, франшиз и страховых рисков.\n\n"
          + "Имеет опыт управления международной партнерской сетью, лицензирования страховой деятельности, соблюдения требований по защите персональных данных. Объединяет управленческую, коммерческую и техническую экспертизу с фокусом на эффективность, прозрачность условий и защиту интересов клиента."
      },

      kz: {
        name: "Сергей Анацко",
        title: "Директордың орынбасары · COO / CCO · техникалық маман",
        shortBio:
          "Сатулар, сақтандыру және бизнес-процестерді автоматтандыру саласында 12+ жылдық тәжірибесі бар басшы. Мамандануы — корпоративтік сақтандыру, тасымалдаушылардың жауапкершілігі, халықаралық нарықтар және цифрландыру.",
        bio:
          "Беларусь, Польша, Ресей, Қазақстан және Грузияда сату, операциялық қызмет және бизнесті дамыту саласында басқару тәжірибесі бар директордың орынбасары. Коммерциялық және операциялық процестерді басқарады, сату стратегияларын әзірлейді, бизнес-процестерді құрады және оңтайландырады, CRM және IT-шешімдерді (Bitrix24, API-интеграциялар) енгізеді.\n\n"
          + "Корпоративтік сақтандыру саласындағы практик маман: жүк тасымалдаушылардың азаматтық-құқықтық жауапкершілігін сақтандыру (СГО), шекаралық сақтандыру, ерікті медициналық сақтандыру (ДМС), қайта сақтандыру. Экспедиторлармен және көлік компанияларымен жұмыс істейді, сақтандыру жағдайларын реттеу, ерекшеліктерді, франшизаларды және сақтандыру тәуекелдерін талдау сияқты күрделі кейстерді сүйемелдейді.\n\n"
          + "Халықаралық серіктестік желіні басқару, сақтандыру қызметін лицензиялау және дербес деректерді қорғау талаптарын сақтау бойынша тәжірибесі бар. Басқарушылық, коммерциялық және техникалық құзыреттерді біріктіре отырып, тиімділікке, шарттардың ашықтығына және клиент мүдделерін қорғауға басымдық береді."
      },

      en: {
        name: "Sergey Anatska",
        title: "Deputy Director · COO / CCO · Technical Specialist",
        shortBio:
          "Executive with 12+ years of experience in sales, insurance, and business process automation. Specialization includes corporate insurance, carrier liability, international markets, and digital transformation.",
        bio:
          "Deputy Director with experience in managing sales, operations, and business development across Belarus, Poland, Russia, Kazakhstan, and Georgia. Oversees commercial and operational processes, develops sales strategies, designs and optimizes business processes, and implements CRM and IT solutions (Bitrix24, API integrations).\n\n"
          + "Practicing specialist in corporate insurance, including carrier liability insurance, border insurance, voluntary health insurance (VHI), and reinsurance. Works with freight forwarders and transport companies, supporting complex cases involving claims handling, analysis of exclusions, deductibles, and insurance risks.\n\n"
          + "Has experience in managing an international partner network, insurance licensing, and compliance with personal data protection requirements. Combines managerial, commercial, and technical expertise with a focus on efficiency, transparency of terms, and protection of client interests."
      },
    },
  },
];
