// app/[lang]/osago-rf/passenger-car-prices/page.tsx

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import DeferredHydration from "@/components/DeferredHydration";
import OsagoPassengerPriceCards from "@/components/osago-rf/OsagoPassengerPriceCards";
import OsagoRfCalculator from "@/components/osago-rf/OsagoRfCalculator";
import { OsagoOrderForm } from "@/components/osago-rf/OsagoOrderForm";

import type { Lang } from "@/dictionaries/header";
import { getOsagoRfCalculatorDictionary } from "@/dictionaries/osagoRfCalculator";
import { getOsagoRfFormDictionary } from "@/dictionaries/osagoRfForm";
import { getOsagoRfPassengerPricesDictionary } from "@/dictionaries/osagoRfPassengerPrices";

import { keepShortWords } from "@/lib/keepShortWords";
import {
  bufferedRub,
  calculateOsagoRfPremium,
} from "@/lib/osago-rf-calculation";
import { buildAlternates } from "@/lib/seoAlternates";

export const dynamicParams = false;

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://dionis-insurance.kz"
).replace(/\/$/, "");

const PATH = "/osago-rf/passenger-car-prices";
const HERO_IMAGE_URL = `${SITE_URL}/osago-rf/HiroOsagoRf.webp`;

const PASSENGER_POWER_RANGES = [
  {
    id: "hp70_99",
    representativeHp: 90,
  },
  {
    id: "hp100_119",
    representativeHp: 110,
  },
  {
    id: "hp120_150",
    representativeHp: 130,
  },
  {
    id: "hp150plus",
    representativeHp: 160,
  },
] as const;

const PASSENGER_TERMS = [
  {
    value: 0.5,
    dictionaryKey: "d15",
  },
  {
    value: 1,
    dictionaryKey: "m1",
  },
  {
    value: 12,
    dictionaryKey: "m12",
  },
] as const;

/* ---------- Helpers ---------- */

function normalizeLang(value: unknown): Lang {
  return value === "ru" || value === "kz" || value === "en"
    ? value
    : "ru";
}

function langToIana(lang: Lang): string {
  if (lang === "kz") return "kk-KZ";
  if (lang === "en") return "en-KZ";
  return "ru-RU";
}

function langToOgLocale(lang: Lang): string {
  if (lang === "kz") return "kk_KZ";
  if (lang === "en") return "en_US";
  return "ru_RU";
}

function schemaPrice(value: number): string {
  return value.toFixed(2);
}

function countryName(lang: Lang): string {
  if (lang === "kz") return "Ресей";
  if (lang === "en") return "Russia";
  return "Россия";
}

/* ---------- Static routes ---------- */

export function generateStaticParams(): Array<{ lang: Lang }> {
  return [{ lang: "ru" }, { lang: "kz" }, { lang: "en" }];
}

/* ---------- Metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;

  const lang = normalizeLang(rawLang);
  const dict = getOsagoRfPassengerPricesDictionary(lang);
  const pageUrl = `${SITE_URL}/${lang}${PATH}`;

  return {
    title: dict.seo.title,
    description: dict.seo.description,

    alternates: buildAlternates(lang, PATH),

    openGraph: {
      type: "website",
      url: pageUrl,
      title: dict.seo.title,
      description: dict.seo.description,
      locale: langToOgLocale(lang),
      siteName: "DIONIS",
      images: [
        {
          url: HERO_IMAGE_URL,
          width: 1672,
          height: 941,
          alt: dict.hero.alt,
        },
      ],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* ---------- Page ---------- */

export default async function OsagoRfPassengerPricesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;

  const lang = normalizeLang(rawLang);

  const dict = getOsagoRfPassengerPricesDictionary(lang);
  const calcDict = getOsagoRfCalculatorDictionary(lang);
  const formDict = getOsagoRfFormDictionary(lang);

  const pageUrl = `${SITE_URL}/${lang}${PATH}`;
  const pageLanguage = langToIana(lang);

  /*
   * JSON-LD содержит 12 основных ценовых вариантов:
   *
   * 4 диапазона мощности × 3 срока:
   * - 15 дней;
   * - 1 месяц;
   * - 12 месяцев.
   *
   * Параметры расчёта:
   * - физическое лицо;
   * - легковой автомобиль;
   * - мультидрайв.
   */
  const priceOffers = PASSENGER_POWER_RANGES.flatMap((powerRange) =>
    PASSENGER_TERMS.map((term) => {
      const { baseRub } = calculateOsagoRfPremium({
        policyholderType: "individual",
        vehicleKind: "passenger",
        mode: "multi",
        hp: powerRange.representativeHp,
        term: term.value,
      });

      /*
       * Используем ту же надбавку, которая применяется
       * в клиентском калькуляторе и ценовых карточках.
       */
      const finalRubPrice = bufferedRub(baseRub);

      const powerRangeName = dict.cards.ranges[powerRange.id];
      const termName = dict.cards.terms[term.dictionaryKey];

      return {
        "@type": "Offer",
        "@id": `${pageUrl}#offer-${powerRange.id}-${term.dictionaryKey}`,

        name: `${termName} — ${powerRangeName}`,

        description: [
          dict.cards.individual,
          dict.cards.multidrive,
          powerRangeName,
          termName,
        ].join(". "),

        /*
         * Не создаём фиктивные query-параметры, если форма
         * фактически не считывает их при открытии страницы.
         */
        url: `${pageUrl}#osago-rf-order`,

        price: schemaPrice(finalRubPrice),
        priceCurrency: "RUB",

        seller: {
          "@id": `${SITE_URL}/#organization`,
        },

        itemOffered: {
          "@id": `${pageUrl}#service`,
        },
      };
    }),
  );

  const numericPrices = priceOffers.map((offer) =>
    Number(offer.price),
  );

  const lowPrice = Math.min(...numericPrices);
  const highPrice = Math.max(...numericPrices);

  const jsonLd = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: dict.seo.breadcrumbs.home,
            item: `${SITE_URL}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: dict.seo.breadcrumbs.osago,
            item: `${SITE_URL}/${lang}/osago-rf`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: dict.seo.breadcrumbs.current,
            item: pageUrl,
          },
        ],
      },

      {
        "@type": "ImageObject",
        "@id": `${pageUrl}#primaryimage`,

        url: HERO_IMAGE_URL,
        contentUrl: HERO_IMAGE_URL,

        caption: dict.hero.alt,
        inLanguage: pageLanguage,

        width: 1672,
        height: 941,
      },

      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,

        url: pageUrl,
        name: dict.seo.title,
        description: dict.seo.description,
        inLanguage: pageLanguage,

        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },

        breadcrumb: {
          "@id": `${pageUrl}#breadcrumb`,
        },

        primaryImageOfPage: {
          "@id": `${pageUrl}#primaryimage`,
        },

        mainEntity: {
          "@id": `${pageUrl}#service`,
        },

        potentialAction: {
          "@type": "ReadAction",
          target: [pageUrl],
        },
      },

      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,

        name: dict.hero.title,
        description: dict.seo.description,
        url: pageUrl,

        image: {
          "@id": `${pageUrl}#primaryimage`,
        },

        serviceType: dict.hero.title,

        provider: {
          "@id": `${SITE_URL}/#insurance-broker`,
        },

        areaServed: {
          "@type": "Country",
          name: countryName(lang),
        },

        audience: {
          "@type": "Audience",
          audienceType: dict.cards.individual,
        },

        offers: {
          "@type": "AggregateOffer",
          "@id": `${pageUrl}#offers`,

          priceCurrency: "RUB",
          lowPrice: schemaPrice(lowPrice),
          highPrice: schemaPrice(highPrice),
          offerCount: priceOffers.length,

          offers: priceOffers,
        },
      },
    ],
  };

  return (
    <main className="gc-page">
      <script
        id={`osago-rf-passenger-prices-jsonld-${lang}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <nav
        className="gc-breadcrumbs"
        aria-label={dict.seo.breadcrumbs.current}
      >
        <div className="gc-container">
          <div className="row gap-8 wrap gc-text-muted">
            <Link href={`/${lang}`}>
              {dict.seo.breadcrumbs.home}
            </Link>

            <span aria-hidden="true">/</span>

            <Link href={`/${lang}/osago-rf`}>
              {dict.seo.breadcrumbs.osago}
            </Link>

            <span aria-hidden="true">/</span>

            <span aria-current="page">
              {dict.seo.breadcrumbs.current}
            </span>
          </div>
        </div>
      </nav>

      <section className="gc-hero">
        <div
          className="gc-hero__bg"
          aria-hidden="true"
        />

        <div className="gc-container gc-hero__grid">
          <div className="gc-hero__left">
            <h1 className="gc-hero__title">
              {keepShortWords(dict.hero.title)}
            </h1>

            <p className="gc-hero__subtitle">
              {keepShortWords(dict.hero.subtitle)}
            </p>

            <div
              className="gc-hero__facts"
              aria-label={dict.hero.title}
            >
              {dict.hero.facts.map((fact) => (
                <span key={fact}>{fact}</span>
              ))}
            </div>

            <div className="gc-hero__cta">
              <a
                href="#osago-rf-order"
                className="btn btn-wide"
              >
                {dict.hero.cta}
              </a>
            </div>
          </div>

          <div className="gc-hero__right">
            <div className="gc-hero__visualWrap">
              <div className="gc-hero-visual gc-hero-visual--single">
                <Image
                  src="/osago-rf/HiroOsagoRf.webp"
                  alt={dict.hero.alt}
                  width={1672}
                  height={941}
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 0px"
                  className="gc-hero__image"
                  style={{ height: "auto" }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="gc-section gc-info-strip"
        aria-labelledby="osago-passenger-price-terms"
      >
        <div className="gc-container">
          <article className="gc-info-strip__card">
            <div className="gc-info-strip__header">
              <h2
                id="osago-passenger-price-terms"
                className="gc-info-strip__title"
              >
                {dict.intro.title}
              </h2>
            </div>

            <div className="gc-info-strip__body">
              {dict.intro.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <p>
                <strong>{dict.intro.note}</strong>
              </p>
            </div>
          </article>
        </div>
      </section>

      <OsagoPassengerPriceCards
        lang={lang}
        dict={dict}
      />

      <section
        className="gc-section"
        aria-labelledby="osago-rf-exact-calculator"
      >
        <div className="gc-container">
          <div className="gc-section-head">
            <h2
              id="osago-rf-exact-calculator"
              className="gc-h2"
            >
              {dict.calculator.title}
            </h2>

            <p className="gc-text-muted">
              {dict.calculator.subtitle}
            </p>
          </div>

          <div className="legacy-form-scope legacy-form-card">
            <DeferredHydration
              rootMargin="800px"
              minDelayMs={150}
            >
              <OsagoRfCalculator dict={calcDict} />
            </DeferredHydration>
          </div>
        </div>
      </section>

      <section
        id="osago-rf-order"
        className="gc-section gc-order-section"
      >
        <div className="gc-container gc-order-layout">
          <aside className="gc-order-prep">
            <h2 className="gc-order-prep__title">
              {dict.form.title}
            </h2>

            <p className="gc-order-prep__text">
              {dict.form.subtitle}
            </p>
          </aside>

          <div className="legacy-form-scope legacy-form-card gc-order-form-card">
            <OsagoOrderForm dict={formDict} />
          </div>
        </div>
      </section>

      <OsagoPassengerPriceCards
        lang={lang}
        dict={dict}
        variant="table"
      />
    </main>
  );
}