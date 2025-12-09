export function collectUTM(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);

  const utm: Record<string, string> = {};

  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "fbclid",
    "yclid",
  ];

  keys.forEach((key) => {
    const value = params.get(key);
    if (value) utm[key] = value;
  });

  return utm;
}
