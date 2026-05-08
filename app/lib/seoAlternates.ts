// lib/seoAlternates.ts

import type { Lang } from "@/dictionaries/header";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.kz"
).replace(/\/$/, "");

const LANGS: Lang[] = ["ru", "kz", "en"];

const HREFLANG_MAP: Record<Lang, string> = {
  ru: "ru",
  kz: "kk-KZ",
  en: "en",
};

export function buildAlternates(lang: Lang, path = "") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const languages: Record<string, string> = {};

  for (const l of LANGS) {
    languages[HREFLANG_MAP[l]] = `${SITE_URL}/${l}${cleanPath}`;
  }

  languages["x-default"] = `${SITE_URL}/ru${cleanPath}`;

  return {
    canonical: `${SITE_URL}/${lang}${cleanPath}`,
    languages,
  };
}