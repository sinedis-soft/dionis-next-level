import type { Lang } from "@/dictionaries/header";

export type BlogDictionary = {
  title: string;
  description: string;
  searchPlaceholder: string;
  allTag: string; // надпись на кнопке “#Все”
};

const BLOG_DICTIONARY: Record<Lang, BlogDictionary> = {
  ru: {
    title: "Блог",
    description:
      "Разбор страховых ситуаций, лайфхаки, изменения правил и практические кейсы.",
    searchPlaceholder: "Поиск по блогу…",
    allTag: "#Все",
  },
  kz: {
    title: "Блог",
    description:
      "Сақтандыру жағдайларын талдау, лайфхактар, ережелердегі өзгерістер және практикалық кейстер.",
    searchPlaceholder: "Блогтан іздеу…",
    allTag: "#Барлығы",
  },
  en: {
    title: "Blog",
    description:
      "Insurance cases breakdown, practical tips, rule changes, and real-world examples.",
    searchPlaceholder: "Search the blog…",
    allTag: "#All",
  },
};

export function getBlogDictionary(lang: Lang): BlogDictionary {
  return BLOG_DICTIONARY[lang] ?? BLOG_DICTIONARY.ru;
}
