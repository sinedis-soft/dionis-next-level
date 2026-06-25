// app/[lang]/blog/[slug]/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";

import { buildAlternates } from "@/lib/seoAlternates";

import type { Lang } from "@/dictionaries/header";
import { BREADCRUMB_LABELS } from "@/dictionaries/breadcrumbs";
import { getBlogDictionary } from "@/dictionaries/blog";

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

function absoluteUrl(path?: string): string {
  if (!path) return `${SITE_URL}/logo_1.webp`;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }
  return `${SITE_URL}${
    path.startsWith("/") ? path : `/${path}`
  }`;
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

    robots: {
      index: true,
      follow: true,
    },

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
  const breadcrumbLabels =
    BREADCRUMB_LABELS[lang];
  const blogDict = getBlogDictionary(lang);

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
      url: absoluteUrl(article.image),
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
        jobTitle: author.title,
        description: author.bio,
        url:
          `${SITE_URL}/${lang}/authors/${author.slug}`,
        image: absoluteUrl(author.photo),
        sameAs: author.sameAs ?? [],
        worksFor: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "Dionis Insurance Broker",
        },
        knowsAbout: [
          "Green Card insurance",
          "Motor third party liability insurance",
          "International transport insurance",
          "Border insurance",
        ],
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
        name: breadcrumbLabels.home,

        item: `${SITE_URL}/${lang}`,
      },

      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbLabels.blog,

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
          aria-label={breadcrumbLabels.ariaLabel}
        >
          <a
            className="bp-bc__link"
            href={`/${lang}`}
          >
            {breadcrumbLabels.home}
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
            {breadcrumbLabels.blog}
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
          <div className="bp-head__grid">
            <div className="bp-head__copy">
              <ContentTypeBadge
                type={article.contentType}
                lang={lang}
                size="sm"
              />

              <h1 className="bp-title">
                {article.title}
              </h1>

              {article.seoDescription ? (
                <p className="bp-lead">
                  {article.seoDescription}
                </p>
              ) : null}

              <div className="bp-subrow">
                <ArticleMeta
                  locale={locale}
                  publishedAt={
                    article.publishedAt
                  }
                  updatedAt={
                    article.modifiedAt
                  }
                  labels={{
                    published: blogDict.publishedLabel,
                    updated: blogDict.updatedLabel,
                    actual: blogDict.actualLabel,
                  }}
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
                    labels={{
                      authorAriaLabel: blogDict.authorAriaLabel,
                      authorProfile: blogDict.authorProfile,
                    }}
                  />
                </div>
              ) : null}
            </div>

            <div className="bp-head__media">
              <Image
                src={article.image}
                alt={article.imageAlt || article.title}
                fill
                sizes="(min-width: 1024px) 420px, 100vw"
                className="bp-head__img"
                priority
              />
            </div>
          </div>
        </header>

        {/* Content + TOC */}

        <section className="bp-body">
          <div className="bp-grid">
            <aside className="bp-toc bp-toc--desktop">
              <div className="bp-sticky">
                <TableOfContents
                  toc={article.toc}
                  title={blogDict.tocTitle}
                  navLabel={blogDict.tocNavLabel}
                />
              </div>
            </aside>

            <div className="bp-article">
              <div className="bp-toc bp-toc--mobile">
                <TableOfContents
                  toc={article.toc}
                  title={blogDict.tocTitle}
                  navLabel={blogDict.tocNavLabel}
                  className="bp-toc__mobileBox"
                />
              </div>

              <ArticleBody lang={lang}>
                {article.content}

                <RequiredReading
                  title={blogDict.requiredReadingTitle}
                  items={requiredReading}
                />

                <NextStep
                  title={blogDict.nextStepTitle}
                  items={nextSteps}
                />

                <Changelog
                  title={blogDict.changelogTitle}
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
              {blogDict.faqTitle}
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
              {blogDict.relatedTitle}
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
                          lang={lang}
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
