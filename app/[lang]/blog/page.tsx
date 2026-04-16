// app/[lang]/blog/page.tsx
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

import { getAllArticles } from "@/lib/blog";
import BlogGrid from "@/components/blog/BlogGrid";
import { getBlogDictionary } from "@/dictionaries/blog";

const ALLOWED_LANGS: Lang[] = ["ru", "kz", "en"];
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dionis-insurance.kz";

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
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog`,
      languages: {
        ru: `${SITE_URL}/ru/blog`,
        "kk-KZ": `${SITE_URL}/kz/blog`,
        en: `${SITE_URL}/en/blog`,
        "x-default": `${SITE_URL}/ru/blog`,
      },
    },
    openGraph: {
      title: dict.title,
      description: dict.description,
      url: `${SITE_URL}/${lang}/blog`,
      siteName: "Dionis Insurance Broker",
      type: "website",
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const [articles, dict] = await Promise.all([
    getAllArticles(lang),
    Promise.resolve(getBlogDictionary(lang)),
  ]);

  return (
    <main className="bi-page">
      <div className="gc-container">
        <section className="bi-section">
          <header className="bi-head">
            <h1 className="bi-title">{dict.title}</h1>
            <p className="bi-desc">{dict.description}</p>
          </header>

          <div className="bi-grid">
            <BlogGrid
              lang={lang}
              articles={articles}
              ui={{
                searchPlaceholder: dict.searchPlaceholder,
                allTag: dict.allTag,
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
