// app/[lang]/authors/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";

import type { Lang } from "@/dictionaries/header";

import AuthorBox from "@/components/blog/AuthorBox";
import AuthorArticles from "@/components/blog/AuthorArticles";

import { getAuthorBySlug, getArticlesByAuthor } from "@/lib/blog";

export const dynamicParams = false;

function localeByLang(lang: Lang) {
  if (lang === "kz") return "kk-KZ";
  if (lang === "en") return "en-US";
  return "ru-RU";
}

function formatDateSafe(locale: string) {
  const d = new Date();
  try {
    // на старых браузерах Intl может отсутствовать/работать криво
    // поэтому пробуем и делаем fallback
    return d.toLocaleDateString(locale);
  } catch {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = String(d.getFullYear());
    return `${dd}.${mm}.${yyyy}`;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  const author = await getAuthorBySlug(slug);
  if (!author) return {};

  const title = `${author.name} — автор блога`;
  const description =
    author.bio ?? `Публикации и экспертные материалы автора ${author.name}`;

  return {
    title,
    description,
    alternates: { canonical: `/${lang}/authors/${author.slug}` },
    openGraph: { title, description, type: "profile" },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ lang: Lang; slug: string }>;
}) {
  const { lang, slug } = await params;

  const author = await getAuthorBySlug(slug);
  if (!author) return notFound();

  const items = await getArticlesByAuthor(lang, author.slug);

  const personLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.title,
    description: author.bio,
    url: `/${lang}/authors/${author.slug}`,
    image: author.photo ? author.photo : "/authors/default.webp",
  };

  if (author.linkedin) {
    personLd.sameAs = [author.linkedin];
  }

  const locale = localeByLang(lang);
  const dateStr = formatDateSafe(locale);

  return (
    <main className="ap-page">
      <Script
        id="ld-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      <div className="gc-container">
        {/* Breadcrumbs */}
        <nav className="ap-bc" aria-label="Breadcrumb">
          <a className="ap-bc__link" href={`/${lang}`}>
            Главная
          </a>
          <span className="ap-bc__sep" aria-hidden="true">
            →
          </span>
          <a className="ap-bc__link" href={`/${lang}/blog`}>
            Блог
          </a>
          <span className="ap-bc__sep" aria-hidden="true">
            →
          </span>
          <span className="ap-bc__current">{author.name}</span>
        </nav>

        <section className="ap-section">
          <h1 className="ap-title">{author.name}</h1>

          <div className="ap-box">
            <AuthorBox
              author={author}
              lang={lang}
              variant="profile"
              showProfileLink={false}
            />
          </div>

          <div className="ap-meta">
            <span className="ap-meta__item">
              Публикации: <span className="ap-meta__strong">{items.length}</span>
            </span>
            <span className="ap-meta__dot" aria-hidden="true">
              ·
            </span>
            <span className="ap-meta__item">
              Язык:{" "}
              <span className="ap-meta__strong">{String(lang).toUpperCase()}</span>
            </span>
            <span className="ap-meta__dot" aria-hidden="true">
              ·
            </span>
            <span className="ap-meta__item">
              Актуально на <span className="ap-meta__strong">{dateStr}</span>
            </span>
          </div>

          <AuthorArticles lang={lang} items={items} />
        </section>
      </div>
    </main>
  );
}