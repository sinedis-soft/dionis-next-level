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
];
