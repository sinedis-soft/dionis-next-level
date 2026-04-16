import type { Metadata } from "next";
import Link from "next/link";

import type { Lang } from "@/dictionaries/header";
import { AUTHORS } from "@/data/blog/authors";

const ALLOWED_LANGS: Lang[] = ["ru", "kz", "en"];

function normalizeLang(value: string): Lang {
  return (ALLOWED_LANGS as readonly string[]).includes(value)
    ? (value as Lang)
    : "ru";
}

const UI = {
  ru: {
    title: "Авторы блога",
    description: "Эксперты Dionis: публикации и профильные материалы.",
    pageTitle: "Авторы",
    pageSubtitle: "Выберите автора, чтобы посмотреть все статьи.",
    openProfile: "Открыть профиль",
  },
  kz: {
    title: "Блог авторлары",
    description: "Dionis сарапшылары: жарияланымдар және бейінді материалдар.",
    pageTitle: "Авторлар",
    pageSubtitle: "Барлық мақалаларды көру үшін авторды таңдаңыз.",
    openProfile: "Профильді ашу",
  },
  en: {
    title: "Blog Authors",
    description: "Dionis experts: publications and domain-focused materials.",
    pageTitle: "Authors",
    pageSubtitle: "Choose an author to view all articles.",
    openProfile: "Open profile",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  return {
    title: UI[lang].title,
    description: UI[lang].description,
    alternates: { canonical: `/${lang}/authors` },
  };
}

export default async function AuthorsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);
  const ui = UI[lang];

  return (
    <main className="gc-container" style={{ paddingBlock: "48px" }}>
      <section>
        <h1>{ui.pageTitle}</h1>
        <p>{ui.pageSubtitle}</p>

        <ul style={{ marginTop: "24px", display: "grid", gap: "12px" }}>
          {AUTHORS.map((author) => {
            const loc = author.i18n[lang] ?? author.i18n.ru;

            return (
              <li key={author.slug}>
                <article className="card" style={{ padding: "16px" }}>
                  <h2 style={{ margin: 0 }}>{loc.name}</h2>
                  {loc.title ? <p style={{ margin: "8px 0" }}>{loc.title}</p> : null}
                  {loc.shortBio ? <p style={{ margin: "8px 0" }}>{loc.shortBio}</p> : null}
                  <Link href={`/${lang}/authors/${author.slug}`}>{ui.openProfile}</Link>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
