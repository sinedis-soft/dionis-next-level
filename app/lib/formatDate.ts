// lib/formatDate.ts
export function formatDateISO(dateISO: string, locale: string) {
  const d = new Date(dateISO);
  if (Number.isNaN(d.getTime())) return dateISO;

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(d);
}
