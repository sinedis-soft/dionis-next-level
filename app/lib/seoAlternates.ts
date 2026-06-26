// lib/seoAlternates.ts

import type { Lang } from "@/dictionaries/header";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.kz"
).replace(/\/$/, "");

const LANGS: Lang[] = ["ru", "kz", "en"];

const HREFLANG_MAP: Record<Lang, string> = {
  ru: "ru-RU",
  kz: "kk-KZ",
  en: "en-US",
};

export function buildAlternates(lang: Lang, path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const languages: Record<string, string> = {};

  for (const l of LANGS) {
    languages[HREFLANG_MAP[l]] = `${SITE_URL}/${l}${cleanPath}`;
  }

  // x-default points to the English version as a default international target.
  languages["x-default"] = `${SITE_URL}/en${cleanPath}`;

  return {
    canonical: `${SITE_URL}/${lang}${cleanPath}`,
    languages,
  };
}
