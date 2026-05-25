// app/[lang]/blog/[slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import { buildAlternates } from "@/lib/seoAlternates";

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

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://dionis-insurance.kz"
).replace(/\/$/, "");

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

    alternates: buildAlternates(
      lang,
      `/blog/${slug}`
    ),

    openGraph: {
      title,
      description,
      images: [
        {
          url: a.image,
          alt: a.imageAlt,
        },
      ],
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

  const author = await getAuthorBySlug(
    article.authorSlug,
    lang
  );

  const requiredReading =
    article.requiredReading ?? [];

  const nextSteps =
    article.nextSteps ?? [];

  const related =
    await getRelatedArticles(article, 6);

  const articleUrl =
    `${SITE_URL}/${lang}/blog/${article.slug}`;

  const jsonLdBase: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    headline: article.title,

    description:
      article.seoDescription,

    datePublished:
      article.publishedAt,

    dateModified:
      article.modifiedAt ??
      article.publishedAt,

    inLanguage: localeByLang(lang),

    image: {
      "@type": "ImageObject",
      url: article.image,
      width: 1200,
      height: 630,
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },

    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  jsonLdBase.author = author
    ? {
        "@type": "Person",
        "@id": `${SITE_URL}/${lang}/authors/${author.slug}#person`,
        name: author.name,
        url:
          `${SITE_URL}/${lang}/authors/${author.slug}`,
      }
    : {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Dionis Insurance Broker, LLP",
        url: SITE_URL,
      };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,

        name:
          lang === "ru"
            ? "Главная"
            : lang === "kz"
            ? "Басты бет"
            : "Home",

        item: `${SITE_URL}/${lang}`,
      },

      {
        "@type": "ListItem",
        position: 2,

        name:
          lang === "ru"
            ? "Блог"
            : lang === "kz"
            ? "Блог"
            : "Blog",

        item:
          `${SITE_URL}/${lang}/blog`,
      },

      {
        "@type": "ListItem",
        position: 3,

        name: article.title,

        item: articleUrl,
      },
    ],
  };

  const faqLd =
    article.faq?.length
      ? {
          "@context":
            "https://schema.org",

          "@type": "FAQPage",

          mainEntity:
            article.faq.map((x) => ({
              "@type": "Question",

              name: x.q,

              acceptedAnswer: {
                "@type": "Answer",
                text: x.a,
              },
            })),
        }
      : null;

  const locale = localeByLang(lang);

  return (
    <main className="bp-page">
      <Script
        id="ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            jsonLdBase
          ),
        }}
      />

      <Script
        id="ld-breadcrumbs"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd
          ),
        }}
      />

      {faqLd ? (
        <Script
          id="ld-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              faqLd
            ),
          }}
        />
      ) : null}

      <div className="gc-container">
        {/* Breadcrumbs */}

        <nav
          className="bp-bc"
          aria-label="Breadcrumb"
        >
          <a
            className="bp-bc__link"
            href={`/${lang}`}
          >
            Главная
          </a>

          <span
            className="bp-bc__sep"
            aria-hidden="true"
          >
            →
          </span>

          <a
            className="bp-bc__link"
            href={`/${lang}/blog`}
          >
            Блог
          </a>

          <span
            className="bp-bc__sep"
            aria-hidden="true"
          >
            →
          </span>

          <span className="bp-bc__current">
            {article.title}
          </span>
        </nav>

        {/* Header */}

        <header className="bp-head">
          <h1 className="bp-title">
            {article.title}
          </h1>

          <div className="bp-subrow">
            <ContentTypeBadge
              type={article.contentType}
              size="sm"
            />

            <ArticleMeta
              locale={locale}
              publishedAt={
                article.publishedAt
              }
              updatedAt={
                article.modifiedAt
              }
            />

            <span
              className="bp-dot"
              aria-hidden="true"
            >
              •
            </span>

            <span className="bp-reading">
              {article.readingTime}
            </span>
          </div>

          {author ? (
            <div className="bp-author">
              <AuthorBox
                author={author}
                lang={lang}
              />
            </div>
          ) : null}
        </header>

        {/* Content + TOC */}

        <section className="bp-body">
          <div className="bp-grid">
            <aside className="bp-toc bp-toc--desktop">
              <div className="bp-sticky">
                <TableOfContents
                  toc={article.toc}
                />
              </div>
            </aside>

            <div className="bp-article">
              <div className="bp-toc bp-toc--mobile">
                <TableOfContents
                  toc={article.toc}
                  className="bp-toc__mobileBox"
                />
              </div>

              <ArticleBody lang={lang}>
                {article.content}

                <RequiredReading
                  items={requiredReading}
                />

                <NextStep
                  items={nextSteps}
                />

                <Changelog
                  version={article.version}
                  changes={article.changes}
                />
              </ArticleBody>
            </div>
          </div>
        </section>

        {/* FAQ */}

        {article.faq?.length ? (
          <section className="bp-faq">
            <h2 className="bp-h2">
              Вопросы и ответы
            </h2>

            <div className="bp-faq__list">
              {article.faq.map(
                (item, idx) => (
                  <details
                    key={`${idx}-${item.q}`}
                    className="bp-faq__item"
                  >
                    <summary className="bp-faq__q">
                      {item.q}
                    </summary>

                    <div className="bp-faq__a">
                      {item.a}
                    </div>
                  </details>
                )
              )}
            </div>
          </section>
        ) : null}

        {/* Related */}

        {related.length ? (
          <section className="bp-related">
            <h2 className="bp-h2">
              Похожие статьи
            </h2>

            <div className="bp-related__grid">
              {related.map(
                (x: BlogArticleCard) => (
                  <a
                    key={x.slug}
                    href={`/${lang}/blog/${x.slug}`}
                    className="bp-relcard"
                  >
                    <div className="bp-relcard__top">
                      {"contentType" in x &&
                      x.contentType ? (
                        <ContentTypeBadge
                          type={x.contentType}
                          size="sm"
                        />
                      ) : (
                        <span />
                      )}

                      <div className="bp-relcard__rt">
                        {x.readingTime}
                      </div>
                    </div>

                    <div className="bp-relcard__title">
                      {x.title}
                    </div>

                    <div className="bp-relcard__text">
                      {x.excerpt}
                    </div>
                  </a>
                )
              )}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}