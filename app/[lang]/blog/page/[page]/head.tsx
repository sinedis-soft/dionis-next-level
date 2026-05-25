import type { Lang } from "@/dictionaries/header";
import { getBlogPagination, getBlogPagePath } from "@/lib/blogPagination";

const ALLOWED_LANGS: Lang[] = ["ru", "kz", "en"];

function normalizeLang(value: string): Lang {
  return (ALLOWED_LANGS as readonly string[]).includes(value) ? (value as Lang) : "ru";
}

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.kz").replace(/\/$/, "");

export default async function Head({ params }: { params: Promise<{ lang: string; page: string }> }) {
  const { lang: rawLang, page: rawPage } = await params;
  const lang = normalizeLang(rawLang);
  const page = Number(rawPage);
  const { totalPages } = await getBlogPagination(lang);

  if (!Number.isInteger(page) || page < 2 || page > totalPages) return null;

  return (
    <>
      <link rel="prev" href={`${SITE_URL}${getBlogPagePath(lang, page - 1)}`} />
      {page < totalPages ? <link rel="next" href={`${SITE_URL}${getBlogPagePath(lang, page + 1)}`} /> : null}
    </>
  );
}
