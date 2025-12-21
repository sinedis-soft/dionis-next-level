// data/blog/posts.ts
export type BlogTag =
  | "Автострахование"
  | "Для бизнеса"
  | "Грузы"
  | "Лайфхаки"
  | "Законодательство РК"
  | "Медицина"
  | "Жизнь";

export type BlogPost = {
  slug: string;               // "kak-vybrat-kasko-v-kazahstane"
  lang: "ru" | "kz" | "en";
  title: string;
  excerpt: string;            // 1–2 строки
  category: BlogTag;          // главный тег/категория
  tags: BlogTag[];            // дополнительные
  cover: { src: string; alt: string };
  dateISO: string;            // "2025-12-21"
  minutes: number;            // 5
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "kak-vybrat-kasko-v-kazahstane",
    lang: "ru",
    title: "Как выбрать КАСКО в Казахстане и не купить «не то»?",
    excerpt: "На что смотреть в условиях: франшиза, ремонт, исключения и типовые ловушки формулировок.",
    category: "Автострахование",
    tags: ["Автострахование", "Лайфхаки"],
    cover: { src: "/blog/covers/kasko-kz.webp", alt: "КАСКО в Казахстане — как выбрать полис" },
    dateISO: "2025-12-15",
    minutes: 6,
  },
  // добавляйте дальше
];
