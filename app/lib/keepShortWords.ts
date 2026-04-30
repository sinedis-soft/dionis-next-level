export function keepShortWords(text: string): string {
  return text.replace(/(^|\s)(\S{1,2})\s+/g, "$1$2\u00A0");
}
