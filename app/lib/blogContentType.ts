// lib/blogContentType.ts
export type BlogContentType = "guide" | "case" | "faq" | "comparison" | "update";

export const CONTENT_TYPE_LABEL: Record<BlogContentType, string> = {
  guide: "Гайд",
  case: "Кейс",
  faq: "FAQ",
  comparison: "Сравнение",
  update: "Обновление",
};

export function isBlogContentType(value: unknown): value is BlogContentType {
  return (
    value === "guide" ||
    value === "case" ||
    value === "faq" ||
    value === "comparison" ||
    value === "update"
  );
}
