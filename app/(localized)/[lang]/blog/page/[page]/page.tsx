import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Lang } from "@/dictionaries/header";

import BlogGrid from "@/components/blog/BlogGrid";
import { getBlogDictionary } from "@/dictionaries/blog";
import { buildAlternates } from "@/lib/seoAlternates";
import { BLOG_PAGE_SIZE, getBlogPagination, getBlogPagePath } from "@/lib/blogPagination";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BREADCRUMB_LABELS } from "@/dictionaries/breadcrumbs";

const ALLOWED_LANGS: Lang[] = ["ru", "kz", "en"];

function normalizeLang(value: string): Lang {
  return (ALLOWED_LANGS as readonly string[]).includes(value) ? (value as Lang) : "ru";
}

function normalizePage(value: string): number {
  const num = Number(value);
  if (!Number.isInteger(num) || num < 2) return 2;
  return num;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; page: string }>;
}): Promise<Metadata> {
  const { lang: rawLang, page: rawPage } = await params;
  const lang = normalizeLang(rawLang);
  const page = normalizePage(rawPage);
  const dict = getBlogDictionary(lang);

  return {
    title: `${dict.title} — ${dict.pageLabel} ${page}`,
    description: dict.description,
    alternates: buildAlternates(lang, `/blog/page/${page}`),
  };
}

export default async function BlogPaginatedPage({
  params,
}: {
  params: Promise<{ lang: string; page: string }>;
}) {
  const { lang: rawLang, page: rawPage } = await params;
  const lang = normalizeLang(rawLang);
  const breadcrumbLabels = BREADCRUMB_LABELS[lang];
  const page = normalizePage(rawPage);

  const [{ articles, totalPages }, dict] = await Promise.all([
    getBlogPagination(lang),
    Promise.resolve(getBlogDictionary(lang)),
  ]);

  if (page > totalPages) return notFound();

  const start = (page - 1) * BLOG_PAGE_SIZE;
  const end = start + BLOG_PAGE_SIZE;
  const pageArticles = articles.slice(start, end);

  return (
    <main className="bi-page">
      <div className="gc-container">
        <section className="bi-section">
          <Breadcrumbs
            lang={lang}
            items={[
              { label: breadcrumbLabels.home, href: `/${lang}` },
              { label: dict.title, href: `/${lang}/blog` },
              { label: `${dict.pageLabel} ${page}` },
            ]}
          />
          <header className="bi-head">
            <h1 className="bi-title">{dict.title}</h1>
            <p className="bi-desc">{dict.description}</p>
            <div className="bi-facts" aria-label={dict.title}>
              {dict.heroFacts.map((fact) => (
                <span key={fact}>{fact}</span>
              ))}
            </div>
          </header>

          <div className="bi-grid">
            <BlogGrid
              lang={lang}
              articles={pageArticles}
              ui={{
                searchPlaceholder: dict.searchPlaceholder,
                allTag: dict.allTag,
              }}
            />
          </div>

          <nav className="bi-pagination" aria-label={dict.paginationLabel}>
            {page > 1 ? (
              <Link href={getBlogPagePath(lang, page - 1)} rel="prev">
                {dict.previousPage}
              </Link>
            ) : null}
            {page < totalPages ? (
              <Link href={getBlogPagePath(lang, page + 1)} rel="next">
                {dict.nextPage}
              </Link>
            ) : null}
          </nav>
        </section>
      </div>
    </main>
  );
}
