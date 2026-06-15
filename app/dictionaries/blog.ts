import type { Lang } from "@/dictionaries/header";
import type { BlogContentType } from "@/lib/blogContentType";

export type BlogDictionary = {
  title: string;
  description: string;
  searchPlaceholder: string;
  allTag: string;
  heroFacts: string[];
  paginationLabel: string;
  previousPage: string;
  nextPage: string;
  pageLabel: string;
  tocTitle: string;
  tocNavLabel: string;
  publishedLabel: string;
  updatedLabel: string;
  actualLabel: string;
  authorAriaLabel: string;
  authorProfile: string;
  faqTitle: string;
  relatedTitle: string;
  requiredReadingTitle: string;
  nextStepTitle: string;
  changelogTitle: string;
  authorArticlesTitle: string;
  noAuthorArticles: string;
  contentType: Record<BlogContentType, string>;
};

const BLOG_DICTIONARY: Record<Lang, BlogDictionary> = {
  ru: {
    title: "Блог",
    description:
      "Разбор страховых ситуаций, практические советы, изменения правил и кейсы из реальной работы брокера.",
    searchPlaceholder: "Поиск по блогу…",
    allTag: "Все",
    heroFacts: [
      "Практические разборы",
      "Авто, грузы, ответственность",
      "Обновления правил и документов",
    ],
    paginationLabel: "Навигация по страницам блога",
    previousPage: "Предыдущая страница",
    nextPage: "Следующая страница",
    pageLabel: "Страница",
    tocTitle: "Содержание",
    tocNavLabel: "Навигация по статье",
    publishedLabel: "Опубликовано",
    updatedLabel: "Обновлено",
    actualLabel: "Актуально на",
    authorAriaLabel: "Об авторе",
    authorProfile: "Профиль автора",
    faqTitle: "Вопросы и ответы",
    relatedTitle: "Похожие статьи",
    requiredReadingTitle: "Обязательное чтение",
    nextStepTitle: "Что читать дальше",
    changelogTitle: "История обновлений",
    authorArticlesTitle: "Статьи автора",
    noAuthorArticles: "Пока нет опубликованных статей этого автора.",
    contentType: {
      guide: "Гайд",
      case: "Кейс",
      faq: "FAQ",
      comparison: "Сравнение",
      update: "Обновление",
    },
  },
  kz: {
    title: "Блог",
    description:
      "Сақтандыру жағдайларын талдау, практикалық кеңестер, ережелердегі өзгерістер және брокер жұмысындағы нақты кейстер.",
    searchPlaceholder: "Блогтан іздеу…",
    allTag: "Барлығы",
    heroFacts: [
      "Практикалық талдаулар",
      "Авто, жүк, жауапкершілік",
      "Ережелер мен құжаттар жаңартулары",
    ],
    paginationLabel: "Блог беттері бойынша навигация",
    previousPage: "Алдыңғы бет",
    nextPage: "Келесі бет",
    pageLabel: "Бет",
    tocTitle: "Мазмұны",
    tocNavLabel: "Мақала бойынша навигация",
    publishedLabel: "Жарияланды",
    updatedLabel: "Жаңартылды",
    actualLabel: "Өзекті күні",
    authorAriaLabel: "Автор туралы",
    authorProfile: "Автор профилі",
    faqTitle: "Сұрақтар мен жауаптар",
    relatedTitle: "Ұқсас мақалалар",
    requiredReadingTitle: "Оқу ұсынылады",
    nextStepTitle: "Әрі қарай не оқу керек",
    changelogTitle: "Жаңартулар тарихы",
    authorArticlesTitle: "Автор мақалалары",
    noAuthorArticles: "Бұл автордың жарияланған мақалалары әзірге жоқ.",
    contentType: {
      guide: "Нұсқаулық",
      case: "Кейс",
      faq: "FAQ",
      comparison: "Салыстыру",
      update: "Жаңарту",
    },
  },
  en: {
    title: "Blog",
    description:
      "Insurance case breakdowns, practical guidance, rule changes, and real broker-work examples.",
    searchPlaceholder: "Search the blog…",
    allTag: "All",
    heroFacts: [
      "Practical explainers",
      "Motor, cargo, liability",
      "Rule and document updates",
    ],
    paginationLabel: "Blog page navigation",
    previousPage: "Previous page",
    nextPage: "Next page",
    pageLabel: "Page",
    tocTitle: "Contents",
    tocNavLabel: "Article navigation",
    publishedLabel: "Published",
    updatedLabel: "Updated",
    actualLabel: "Current as of",
    authorAriaLabel: "About the author",
    authorProfile: "Author profile",
    faqTitle: "Questions and answers",
    relatedTitle: "Related articles",
    requiredReadingTitle: "Required reading",
    nextStepTitle: "Read next",
    changelogTitle: "Update history",
    authorArticlesTitle: "Author articles",
    noAuthorArticles: "This author has no published articles yet.",
    contentType: {
      guide: "Guide",
      case: "Case",
      faq: "FAQ",
      comparison: "Comparison",
      update: "Update",
    },
  },
};

export function getBlogDictionary(lang: Lang): BlogDictionary {
  return BLOG_DICTIONARY[lang] ?? BLOG_DICTIONARY.ru;
}
