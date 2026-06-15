// lib/blogContentType.ts
export type BlogContentType = "guide" | "case" | "faq" | "comparison" | "update";

export function isBlogContentType(value: unknown): value is BlogContentType {
  return (
    value === "guide" ||
    value === "case" ||
    value === "faq" ||
    value === "comparison" ||
    value === "update"
  );
}
