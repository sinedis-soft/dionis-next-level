import type { Lang } from "@/dictionaries/header";
import { getBlogPagination, getBlogPagePath } from "@/lib/blogPagination";

const ALLOWED_LANGS: Lang[] = ["ru", "kz", "en"];

function normalizeLang(value: string): Lang {
  return (ALLOWED_LANGS as readonly string[]).includes(value) ? (value as Lang) : "ru";
}

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.kz").replace(/\/$/, "");

export default async function Head({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);
  const { totalPages } = await getBlogPagination(lang);

  return totalPages > 1 ? <link rel="next" href={`${SITE_URL}${getBlogPagePath(lang, 2)}`} /> : null;
}
