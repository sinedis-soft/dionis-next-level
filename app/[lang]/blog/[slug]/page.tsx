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
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dionis-insurance.kz";

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
  const canonical = `${SITE_URL}/blog/${slug}`;
  const localizedCandidates = await Promise.all(
    (["ru", "kz", "en"] as const).map(async (l) => ({
      lang: l,
      exists: Boolean(await getArticleBySlug(l, slug)),
    }))
  );

  const languages: Record<string, string> = {};
  for (const candidate of localizedCandidates) {
    if (!candidate.exists) continue;
    if (candidate.lang === "ru") {
      languages.ru = canonical;
      continue;
    }
    languages[candidate.lang === "kz" ? "kk-KZ" : candidate.lang] =
      `${SITE_URL}/${candidate.lang}/blog/${slug}`;
  }

  languages["x-default"] =
    canonical ??
    languages.ru ??
    Object.values(languages)[0] ??
    canonical;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
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

  const author = await getAuthorBySlug(article.authorSlug, lang);

  const requiredReading = article.requiredReading ?? [];
  const nextSteps = article.nextSteps ?? [];

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
    <main className="bp-page">
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

      <div className="gc-container">
        {/* Breadcrumbs */}
        <nav className="bp-bc" aria-label="Breadcrumb">
          <a className="bp-bc__link" href={`/${lang}`}>
            Главная
          </a>
          <span className="bp-bc__sep" aria-hidden="true">
            →
          </span>
          <a className="bp-bc__link" href={`/${lang}/blog`}>
            Блог
          </a>
          <span className="bp-bc__sep" aria-hidden="true">
            →
          </span>
          <span className="bp-bc__current">{article.title}</span>
        </nav>

        {/* Header */}
        <header className="bp-head">
          <h1 className="bp-title">{article.title}</h1>

          <div className="bp-subrow">
            <ContentTypeBadge type={article.contentType} size="sm" />

            <ArticleMeta
              locale={locale}
              publishedAt={article.publishedAt}
              updatedAt={article.modifiedAt}
            />

            <span className="bp-dot" aria-hidden="true">
              •
            </span>

            <span className="bp-reading">{article.readingTime}</span>
          </div>

          {author ? (
            <div className="bp-author">
              <AuthorBox author={author} lang={lang} />
            </div>
          ) : null}
        </header>

        {/* Content + TOC */}
        <section className="bp-body">
          <div className="bp-grid">
            {/* Desktop TOC */}
            <aside className="bp-toc bp-toc--desktop">
              <div className="bp-sticky">
                <TableOfContents toc={article.toc} />
              </div>
            </aside>

            {/* Article */}
            <div className="bp-article">
              {/* Mobile TOC */}
              <div className="bp-toc bp-toc--mobile">
                <TableOfContents toc={article.toc} className="bp-toc__mobileBox" />
              </div>

              <ArticleBody lang={lang}>
                {article.content}

                <RequiredReading items={requiredReading} />
                <NextStep items={nextSteps} />

                <Changelog version={article.version} changes={article.changes} />
              </ArticleBody>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {article.faq?.length ? (
          <section className="bp-faq">
            <h2 className="bp-h2">Вопросы и ответы</h2>

            <div className="bp-faq__list">
              {article.faq.map((item, idx) => (
                <details key={`${idx}-${item.q}`} className="bp-faq__item">
                  <summary className="bp-faq__q">{item.q}</summary>
                  <div className="bp-faq__a">{item.a}</div>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {/* Related */}
        {related.length ? (
          <section className="bp-related">
            <h2 className="bp-h2">Похожие статьи</h2>

            <div className="bp-related__grid">
              {related.map((x: BlogArticleCard) => (
                <a
                  key={x.slug}
                  href={`/${lang}/blog/${x.slug}`}
                  className="bp-relcard"
                >
                  <div className="bp-relcard__top">
                    {"contentType" in x && x.contentType ? (
                      <ContentTypeBadge type={x.contentType} size="sm" />
                    ) : (
                      <span />
                    )}

                    <div className="bp-relcard__rt">{x.readingTime}</div>
                  </div>

                  <div className="bp-relcard__title">{x.title}</div>
                  <div className="bp-relcard__text">{x.excerpt}</div>
                </a>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
