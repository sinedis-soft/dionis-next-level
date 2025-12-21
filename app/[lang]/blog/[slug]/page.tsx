import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { Lang } from "@/dictionaries/header";
import TableOfContents from "@/components/blog/TableOfContents";

import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
  getAuthorBySlug,
  type BlogFAQItem,
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
  const { lang, slug } = await params; // ✅ важно для твоей сборки

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
  const { lang, slug } = await params; // ✅ важно для твоей сборки

  const article = await getArticleBySlug(lang, slug);
  if (!article) return notFound();

  const author = await getAuthorBySlug(article.authorSlug);
  const related = await getRelatedArticles(article, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt ?? article.publishedAt,
    image: article.image,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          url: `/${lang}/blog/author/${author.slug}`,
        }
      : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `/${lang}/blog/${article.slug}`,
    },
  };

  const faqLd =
    article.faq?.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faq.map((x: BlogFAQItem) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
          <span>{new Date(article.publishedAt).toLocaleDateString(locale)}</span>
          <span>•</span>
          <span>{article.readingTime}</span>
          {author ? (
            <>
              <span>•</span>
              <a
                className="hover:underline"
                href={`/${lang}/blog/author/${author.slug}`}
              >
                {author.name}
              </a>
            </>
          ) : null}
        </div>
      </header>

      {/* Content + TOC */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8 items-start">
          {/* Sticky TOC (desktop) */}
          <aside className="hidden lg:block">
            <TableOfContents toc={article.toc} className="sticky top-24" />
          </aside>

          {/* Article */}
          <article className="prose prose-slate max-w-none">
            {/* TOC on mobile/tablet */}
            <div className="lg:hidden">
              <TableOfContents toc={article.toc} className="mb-8" />
            </div>

            {article.content}
          </article>
        </div>
      </section>

      {/* Inline CTA (если оставляешь — будет 2 CTA, если есть <Cta/> в MDX) */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="rounded-2xl border bg-[#F4F6FA] p-6">
          <div className="text-lg font-semibold text-[#1A3A5F]">
            Нужен расчет КАСКО?
          </div>
          <div className="mt-1 text-sm text-gray-700">
            Напишите нам — подскажем условия, франшизы и исключения, чтобы не было
            неприятных сюрпризов.
          </div>
          <div className="mt-4">
            <a className="btn" href={`/${lang}/contacts`}>
              Связаться
            </a>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <h2 className="text-xl font-semibold text-[#1A3A5F]">Похожие статьи</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((x: BlogArticleCard) => (
            <a
              key={x.slug}
              href={`/${lang}/blog/${x.slug}`}
              className="rounded-2xl border p-4 hover:shadow-sm"
            >
              <div className="text-xs text-gray-500">{x.readingTime}</div>
              <div className="mt-1 font-semibold text-[#1A3A5F]">{x.title}</div>
              <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                {x.excerpt}
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
