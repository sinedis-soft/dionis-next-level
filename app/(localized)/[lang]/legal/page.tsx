// app/[lang]/legal/page.tsx
export const dynamic = "force-static";
export const dynamicParams = false;

import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";

import {
  getLegalDictionary,
  type LegalDictionary,
} from "@/dictionaries/legal";
import { buildAlternates } from "@/lib/seoAlternates";

import LegalPage from "@/components/LegalPage";
import Breadcrumbs from "@/components/Breadcrumbs";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.kz"
).replace(/\/$/, "");

const ALLOWED_LANGS: Lang[] = ["ru", "kz", "en"];

function normalizeLang(value: string): Lang {
  return (ALLOWED_LANGS as readonly string[]).includes(value)
    ? (value as Lang)
    : "ru";
}

export function generateStaticParams(): Array<{ lang: Lang }> {
  return ALLOWED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const dictionary = getLegalDictionary(lang);
  const pagePath = `/${dictionary.route.slug}`;
  const pageUrl = `${SITE_URL}/${lang}${pagePath}`;

  return {
    title: dictionary.seo.title,
    description: dictionary.seo.description,
    alternates: buildAlternates(lang, pagePath),
    openGraph: {
      type: "website",
      url: pageUrl,
      title: dictionary.seo.title,
      description: dictionary.seo.description,
      locale: dictionary.seo.openGraphLocale,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const dictionary: LegalDictionary = getLegalDictionary(lang);
  const pageUrl = `${SITE_URL}/${lang}/${dictionary.route.slug}`;
  const quoteHref =
    `/${lang}/contacts?subject=${dictionary.route.quoteSubject}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: dictionary.schema.serviceName,
        provider: {
          "@id": `${SITE_URL}/#insurance-broker`,
        },
        areaServed: {
          "@type": "Country",
          name: dictionary.schema.countryName,
        },
        url: pageUrl,
        description: dictionary.seo.description,
      },
      {
        "@type": "FAQPage",
        mainEntity: dictionary.faq.items.map(
          ({ question, answer }) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: {
              "@type": "Answer",
              text: answer,
            },
          })
        ),
      },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="gc-container legal-breadcrumbs">
        <Breadcrumbs
          lang={lang}
          items={[
            {
              label: dictionary.breadcrumbs.home,
              href: `/${lang}`,
            },
            {
              label: dictionary.breadcrumbs.current,
            },
          ]}
        />
      </div>

      <LegalPage
        lang={lang}
        dictionary={dictionary}
        quoteHref={quoteHref}
      />
    </main>
  );
}
