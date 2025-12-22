// app/[lang]/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import type { Lang } from "@/dictionaries/header";
import TableOfContents from "@/components/blog/TableOfContents";
import ArticleBody from "@/components/blog/ArticleBody";
import ContentTypeBadge from "@/components/blog/ContentTypeBadge";

import NextStep from "@/components/blog/NextStep";
import RequiredReading from "@/components/blog/RequiredReading";

import AuthorBox from "@/components/blog/AuthorBox";
import ArticleMeta from "@/components/blog/ArticleMeta";
import Changelog from "@/components/blog/Changelog";

import { getRelatedArticles } from "@/lib/blog";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getAuthorBySlug,
  type BlogArticleCard,
} from "@/lib/blog";

export const dynamicParams = false;

function localeByLang(lang: Lang) {
  if (lang === "kz") return "kk-KZ";
  if (lang === "en") return "en-US";
  return "ru-RU";
}

export async function generateStaticParams(): Promise<
  Array<{ lang: Lang; slug: string }>
> {
  return await getAllArticleSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  const a = await getArticleBySlug(lang, slug);
  if (!a) return {};

  const title = a.seoTitle || a.title;
  const description = a.seoDescription;

  return {
    title,
    description,
    alternates: { canonical: `/${lang}/blog/${slug}` },
    openGraph: {
      title,
      description,
      images: [{ url: a.image, alt: a.imageAlt }],
      type: "article",
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}) {
  const { lang, slug } = await params;

  const article = await getArticleBySlug(lang, slug);
  if (!article) return notFound();

  // ✅ важно: локализуем автора
  const author = await getAuthorBySlug(article.authorSlug, lang);

  // ✅ explicit links (из frontmatter nextSlugs/requiredSlugs)
  const requiredReading = article.requiredReading ?? [];
  const nextSteps = article.nextSteps ?? [];

  // ✅ похожие статьи (fallback/доп. блок)
  const related = await getRelatedArticles(article, 6);

  const jsonLdBase: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt ?? article.publishedAt,
    inLanguage: lang,
    image: article.image,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/${lang}/blog/${article.slug}`,
    },
  };

  if (author) {
    jsonLdBase.author = {
      "@type": "Person",
      name: author.name,
      url: `/${lang}/authors/${author.slug}`,
    };
  }

  const faqLd =
    article.faq?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((x) => ({
            "@type": "Question",
            name: x.q,
            acceptedAnswer: { "@type": "Answer", text: x.a },
          })),
        }
      : null;

  const locale = localeByLang(lang);

  return (
    <main className="bg-white">
      <Script
        id="ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBase) }}
      />
      {faqLd ? (
        <Script
          id="ld-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      ) : null}

      {/* Breadcrumbs */}
      <nav className="max-w-6xl mx-auto px-4 pt-6 text-sm text-gray-600">
        <a className="hover:underline" href={`/${lang}`}>
          Главная
        </a>
        <span className="mx-2">→</span>
        <a className="hover:underline" href={`/${lang}/blog`}>
          Блог
        </a>
        <span className="mx-2">→</span>
        <span className="text-gray-900">{article.title}</span>
      </nav>

      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 pt-4 pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F]">
          {article.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
          <ContentTypeBadge type={article.contentType} size="sm" />

          {/* ✅ PublishedAt / UpdatedAt / “Актуально на …” */}
          <ArticleMeta
            locale={locale}
            publishedAt={article.publishedAt}
            updatedAt={article.modifiedAt}
          />

          <span className="hidden sm:inline">•</span>
          <span>{article.readingTime}</span>
        </div>

        {/* ✅ AuthorBox */}
        {author ? (
          <div className="mt-6">
            <AuthorBox author={author} lang={lang} />
          </div>
        ) : null}
      </header>

      {/* Content + TOC */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
          {/* Sticky TOC (desktop) */}
          <aside className="hidden lg:block">
            <TableOfContents toc={article.toc} className="sticky top-24" />
          </aside>

          {/* Article */}
          <div className="min-w-0">
            {/* TOC on mobile/tablet */}
            <div className="lg:hidden">
              <TableOfContents toc={article.toc} className="mb-8" />
            </div>

            <ArticleBody>
              {article.content}

              {/* ✅ “система обучения”: required + next */}
              <RequiredReading items={requiredReading} />
              <NextStep items={nextSteps} />

              {/* ✅ Changelog должен быть внутри контейнера статьи */}
              <Changelog version={article.version} changes={article.changes} />
            </ArticleBody>
          </div>
        </div>
      </section>

      {/* FAQ (визуально на странице) */}
      {article.faq?.length ? (
        <section className="max-w-6xl mx-auto px-4 pb-14">
          <h2 className="text-xl font-semibold text-[#1A3A5F]">
            Вопросы и ответы
          </h2>

          <div className="mt-4 space-y-3">
            {article.faq.map((item, idx) => (
              <details
                key={`${idx}-${item.q}`}
                className="rounded-2xl border bg-white p-4"
              >
                <summary className="cursor-pointer font-semibold text-[#1A3A5F]">
                  {item.q}
                </summary>
                <div className="mt-2 text-sm text-gray-700 leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      {/* Related */}
      {related.length ? (
        <section className="max-w-6xl mx-auto px-4 pb-14">
          <h2 className="text-xl font-semibold text-[#1A3A5F]">Похожие статьи</h2>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((x: BlogArticleCard) => (
              <a
                key={x.slug}
                href={`/${lang}/blog/${x.slug}`}
                className="rounded-2xl border p-4 hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  {"contentType" in x && x.contentType ? (
                    <ContentTypeBadge type={x.contentType} size="sm" />
                  ) : (
                    <span />
                  )}

                  <div className="text-xs text-gray-500">{x.readingTime}</div>
                </div>

                <div className="mt-2 font-semibold text-[#1A3A5F]">{x.title}</div>
                <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                  {x.excerpt}
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
