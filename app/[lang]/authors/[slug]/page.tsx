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

  return (
    <main className="bg-white">
      <Script
        id="ld-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

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
        <span className="text-gray-900">{author.name}</span>
      </nav>

      <section className="max-w-6xl mx-auto px-4 pt-6 pb-14">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F]">
          {author.name}
        </h1>

        <div className="mt-6 max-w-xl">
          <AuthorBox author={author} lang={lang} variant="profile" showProfileLink={false} />
        </div>

        <div className="mt-6 text-sm text-gray-600">
          Публикации:{" "}
          <span className="font-semibold text-gray-900">{items.length}</span>
          {" · "}
          Язык:{" "}
          <span className="font-semibold text-gray-900">
            {lang.toUpperCase()}
          </span>
          {" · "}
          Актуально на{" "}
          <span className="font-semibold text-gray-900">
            {new Date().toLocaleDateString(locale)}
          </span>
        </div>

        <AuthorArticles lang={lang} items={items} />
      </section>
    </main>
  );
}
