// lib/slugifyHeading.ts
export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "") // кириллица + латиница
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function normalizeHeadingText(text: string): string {
  return (
    text
      // markdown links: [text](url) -> text
      .replace(/\[(.*?)\]\(.*?\)/g, "$1")
      // убрать markdown “украшательства”
      .replace(/[`*_~]/g, "")
      // лишние пробелы
      .replace(/\s+/g, " ")
      .trim()
  );
}
