// app/[lang]/blog/page.tsx
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

import { getBlogPagination, getBlogPagePath } from "@/lib/blogPagination";
import Link from "next/link";
import BlogGrid from "@/components/blog/BlogGrid";
import { getBlogDictionary } from "@/dictionaries/blog";
import { buildAlternates } from "@/lib/seoAlternates";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BREADCRUMB_LABELS } from "@/dictionaries/breadcrumbs";

const ALLOWED_LANGS: Lang[] = ["ru", "kz", "en"];

function normalizeLang(value: string): Lang {
  return (ALLOWED_LANGS as readonly string[]).includes(value)
    ? (value as Lang)
    : "ru";
}

export const dynamicParams = false;

export function generateStaticParams() {
  return ALLOWED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);
  const dict = getBlogDictionary(lang);

  return {
    title: dict.title,
    description: dict.description,
    alternates: buildAlternates(lang, "/blog"),
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);
  const breadcrumbLabels = BREADCRUMB_LABELS[lang];

  const [{ articles, totalPages }, dict] = await Promise.all([
    getBlogPagination(lang),
    Promise.resolve(getBlogDictionary(lang)),
  ]);

  const pageArticles = articles.slice(0, 12);

  return (
    <main className="bi-page">
      <div className="gc-container">
        <section className="bi-section">
          <Breadcrumbs
            lang={lang}
            items={[
              { label: breadcrumbLabels.home, href: `/${lang}` },
              { label: dict.title },
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

          {totalPages > 1 ? (
            <nav className="bi-pagination" aria-label={dict.paginationLabel}>
              <Link href={getBlogPagePath(lang, 2)} rel="next">
                {dict.nextPage}
              </Link>
            </nav>
          ) : null}
        </section>
      </div>
    </main>
  );
}