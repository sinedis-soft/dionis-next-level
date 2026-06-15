import type { Lang } from "@/dictionaries/header";

export const BREADCRUMB_LABELS: Record<
  Lang,
  { ariaLabel: string; home: string; blog: string }
> = {
  ru: {
    ariaLabel: "Навигационная цепочка",
    home: "Главная",
    blog: "Блог",
  },
  en: {
    ariaLabel: "Breadcrumb",
    home: "Home",
    blog: "Blog",
  },
  kz: {
    ariaLabel: "Навигациялық жол",
    home: "Басты бет",
    blog: "Блог",
  },
};
