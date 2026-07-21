import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";

import { BrokerSection } from "@/components/BrokerSection";
import DeferredHydration from "@/components/DeferredHydration";
import { WhatsAppCall } from "@/components/WhatsAppCall";
import FAQSection from "@/components/osago-rf/FAQSection";
import OsagoRfCalculator from "@/components/osago-rf/OsagoRfCalculator";
import { OsagoOrderForm } from "@/components/osago-rf/OsagoOrderForm";
import OsagoRfQuestionForm from "@/components/osago-rf/OsagoRfQuestionForm";
import { getAgreementDictionary } from "@/dictionaries/agreement";
import type { Lang } from "@/dictionaries/header";
import { getHomeDictionary } from "@/dictionaries/home";
import { getOsagoRfCalculatorDictionary } from "@/dictionaries/osagoRfCalculator";
import { getOsagoRfFormDictionary } from "@/dictionaries/osagoRfForm";
import {
  getOsagoRfPageDictionary,
  type OsagoRfPageDictionary,
} from "@/dictionaries/osagoRfPage";
import { getWhatsAppCallDictionary } from "@/dictionaries/whatsappcall";
import { keepShortWords } from "@/lib/keepShortWords";
import { buildAlternates } from "@/lib/seoAlternates";

export const dynamicParams = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dionis-insurance.kz";

const OSAGO_CHECK_LINK = "https://nsis.ru/";

export function generateStaticParams(): Array<{ lang: Lang }> {
  return [{ lang: "ru" }, { lang: "kz" }, { lang: "en" }];
}

function normalizeLang(value: unknown): Lang {
  return value === "ru" || value === "kz" || value === "en" ? value : "ru";
}

function langToOgLocale(lang: Lang): string {
  return lang === "ru" ? "ru_RU" : lang === "kz" ? "kk_KZ" : "en_US";
}

function langToIana(lang: Lang): string {
  return lang === "ru" ? "ru" : lang === "kz" ? "kk-KZ" : "en";
}

function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}



function AdvantageIcon({ index }: { index: number }) {
  const baseSvgProps = {
    width: 20,
    height: 20,
    className: "gc-adv-icon",
    style: { width: 20, height: 20, display: "block" } as CSSProperties,
    fill: "none" as const,
    "aria-hidden": true as const,
    focusable: "false" as const,
  };

  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 24 24" {...baseSvgProps}>
          <path
            d="M12 8v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 24 24" {...baseSvgProps}>
          <path
            d="M4 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 13h8M8 17h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 24 24" {...baseSvgProps}>
          <path
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M3 12h18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" {...baseSvgProps}>
          <path
            d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

function OsagoCoverageSection({
  dict,
}: {
  dict: Pick<OsagoRfPageDictionary, "benefits">;
}) {
  return (
    <section
      className="gc-coverage gc-no-anchor"
      aria-labelledby="benefits-heading"
    >
      <div className="gc-container">
        <article className="gc-coverage__card">
          <div className="gc-coverage__grid">
            <div className="gc-coverage__left">
              <h2 id="benefits-heading" className="gc-coverage__title">
                {dict.benefits.title}
              </h2>

              <div className="gc-coverage__items">
                {dict.benefits.items.map((item) => (
                  <div key={item.title} className="gc-coverage__item">
                    <div className="gc-coverage__icon" aria-hidden="true">
                      <span className="gc-coverage__dot" />
                    </div>
                    <div>
                      <div className="gc-coverage__itemTitle">{item.title}</div>
                      <p className="gc-coverage__itemText">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="gc-coverage__right">
              <div className="gc-coverage__imgWrap">
                <Image
                  src="/osago-rf/Виды_субъектов_России_на_политической_карте.png"
                  alt={dict.benefits.imageAlt}
                  fill
                  className="gc-coverage__img"
                  sizes="(min-width: 1024px) 520px, 90vw"
                />
                <div className="gc-coverage__imgOverlay" aria-hidden="true" />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

function OsagoHowItWorksSection({
  dict,
}: {
  dict: Pick<OsagoRfPageDictionary, "howItWorks">;
}) {
  return (
    <section
      className="gc-hiw gc-no-anchor"
      aria-labelledby="how-it-works-heading"
    >
      <div className="gc-container">
        <h2 id="how-it-works-heading" className="gc-section-title">
          {dict.howItWorks.title}
        </h2>
        <p className="gc-section-intro">{dict.howItWorks.subtitle}</p>

        <div className="gc-hiw__content">
          <div className="gc-hiw__desktop">
            <div className="gc-hiw__line" aria-hidden="true" />
            <div className="gc-hiw__grid">
              {dict.howItWorks.steps.map((step, index) => (
                <div key={step.title} className="gc-hiw__step">
                  <div className="gc-hiw__num">{index + 1}</div>
                  <div className="gc-hiw__stepTitle">{step.title}</div>
                  <p className="gc-hiw__stepText">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="gc-hiw__mobile">
            {dict.howItWorks.steps.map((step, index) => (
              <article key={step.title} className="card gc-hiw-card">
                <div className="gc-hiw-card__row">
                  <div className="gc-hiw__num gc-hiw__num--mobile">
                    {index + 1}
                  </div>
                  <div className="gc-hiw-card__body">
                    <div className="gc-hiw__stepTitle">{step.title}</div>
                    <p className="gc-hiw__stepText gc-hiw__stepText--mobile">
                      {step.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);
  const dict = getOsagoRfPageDictionary(lang);
  const url = `${SITE_URL}/${lang}/osago-rf`;

  return {
    title: dict.seo.title,
    description: dict.seo.description,
    alternates: buildAlternates(lang, "/osago-rf"),
    openGraph: {
      type: "website",
      url,
      title: dict.seo.title,
      description: dict.seo.description,
      locale: langToOgLocale(lang),
      siteName: "DIONIS",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

function CommercialTransportSection({
  dict,
  /*orderAnchor,*/
}: {
  dict: Pick<OsagoRfPageDictionary, "commercialTransport">;
  /*orderAnchor: string;*/
}) {
  return (
    <section
      className="gc-section gc-section--muted"
      aria-labelledby="commercial-transport-heading"
    >
      <div className="gc-container">
        <article className="gc-info-strip__card">
          <div className="gc-info-strip__header">
            <h2
              id="commercial-transport-heading"
              className="gc-info-strip__title"
            >
              {dict.commercialTransport.title}
            </h2>
          </div>

          <div className="gc-info-strip__body">
            <p>{dict.commercialTransport.intro}</p>
          </div>
        </article>

        <div className="gc-mt-12">
          <h3 className="gc-section-title">
            {dict.commercialTransport.vehicleTypesTitle}
          </h3>

          <div className="gc-advantages__grid">
            {dict.commercialTransport.vehicleTypes.map((item) => (
              <article key={item.title} className="gc-adv-card">
                <div className="gc-adv-card__kicker">{item.title}</div>
                <p className="gc-adv-card__text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="gc-mt-12">
          <article className="legacy-form-scope legacy-form-card">
            <h3 className="gc-h2">
              {dict.commercialTransport.fleetTitle}
            </h3>

            <p className="gc-text-muted">
              {dict.commercialTransport.fleetText}
            </p>

            <ul className="gc-order-prep__list">
              {dict.commercialTransport.fleetItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            {/*<div className="gc-mt-12">
              <a
                href={orderAnchor}
                className="btn btn-secondary btn-wide"
                role="button"
              >
                {dict.commercialTransport.cta}
              </a>
            </div>*/}
          </article>
        </div>
      </div>
    </section>
  );
}

export default async function OsagoRfPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const homeDict = getHomeDictionary(lang);
  const agreement = getAgreementDictionary(lang);
  const osagoFormDict = getOsagoRfFormDictionary(lang);
  const osagoPageDict = getOsagoRfPageDictionary(lang);
  const osagoCalcDict = getOsagoRfCalculatorDictionary(lang);
  const whatsappCallDict = getWhatsAppCallDictionary(lang);

  const pageUrl = `${SITE_URL}/${lang}/osago-rf`;
  const greenCardLink = `/${lang}/green-card`;
  const calculatorAnchor = "#osago-rf-calculator";
  const orderAnchor = "#osago-rf-order";
  const websiteId = `${SITE_URL}/#website`;
  const organizationId = `${SITE_URL}/#insurance-broker`;
  const serviceId = `${pageUrl}#service`;
  const webpageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const faqId = `${pageUrl}#faq`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: osagoPageDict.seo.breadcrumbs.home,
            item: `${SITE_URL}/${lang}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: osagoPageDict.seo.breadcrumbs.current,
            item: pageUrl,
          },
        ],
      },

      {
        "@type": "Service",
        "@id": serviceId,
        url: pageUrl,

        name: osagoPageDict.seo.serviceName,
        description: osagoPageDict.seo.description,
        serviceType: osagoPageDict.seo.serviceType,

        provider: {
          "@id": organizationId,
        },

        areaServed: {
          "@type": "Country",
          name: "Russian Federation",
        },

        audience: {
          "@type": "Audience",
          name: osagoPageDict.seo.audienceName,
          audienceType: osagoPageDict.seo.audienceName,
          geographicArea: {
            "@type": "Country",
            name: "Kazakhstan",
          },
        },

        availableChannel: [
          {
            "@type": "ServiceChannel",
            name: osagoPageDict.seo.channels.website,
            serviceUrl: pageUrl,
            availableLanguage: langToIana(lang),
          },
          {
            "@type": "ServiceChannel",
            name: osagoPageDict.seo.channels.phone,
            servicePhone: {
              "@type": "ContactPoint",
              telephone: "+7 727 357 30 30",
              contactType: "customer service",
              availableLanguage: ["ru", "kk", "en"],
            },
          },
          {
            "@type": "ServiceChannel",
            name: osagoPageDict.seo.channels.whatsapp,
            serviceUrl: "https://wa.me/77765275553",
            availableLanguage: ["ru", "kk", "en"],
          },
          {
            "@type": "ServiceChannel",
            name: osagoPageDict.seo.channels.telegram,
            serviceUrl: "https://t.me/Dionis_insurance_broker_bot",
            availableLanguage: ["ru", "kk", "en"],
          },
        ],
      },

      {
        "@type": "WebPage",
        "@id": webpageId,
        url: pageUrl,

        name: osagoPageDict.seo.title,
        description: osagoPageDict.seo.description,
        inLanguage: langToIana(lang),

        isPartOf: {
          "@id": websiteId,
        },

        publisher: {
          "@id": organizationId,
        },

        about: {
          "@id": serviceId,
        },

        mainEntity: {
          "@id": serviceId,
        },

        breadcrumb: {
          "@id": breadcrumbId,
        },

        hasPart: {
          "@id": faqId,
        },
      },

      {
        "@type": "FAQPage",
        "@id": faqId,
        url: `${pageUrl}#faq`,
        name: osagoPageDict.faq.title,
        description: osagoPageDict.faq.intro,
        inLanguage: langToIana(lang),

        isPartOf: {
          "@id": webpageId,
        },

        mainEntity: osagoPageDict.faq.items.map((item) => ({
          "@type": "Question",
          "@id": `${pageUrl}#faq-${item.id}`,
          url: `${pageUrl}#faq-${item.id}`,
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        id="osago-rf-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(jsonLd),
        }}
      />

      <main className="gc-page">
        <nav
          className="gc-breadcrumbs"
          aria-label={osagoPageDict.seo.breadcrumbs.current}
        >
          <div className="gc-container">
            <div className="row gap-8 wrap gc-text-muted">
              <a href={`/${lang}`}>
                {osagoPageDict.seo.breadcrumbs.home}
              </a>

              <span aria-hidden="true">/</span>

              <span aria-current="page">
                {osagoPageDict.seo.breadcrumbs.current}
              </span>
            </div>
          </div>
        </nav>

        <section className="gc-hero">
          <div className="gc-hero__bg" aria-hidden="true" />
          <div className="gc-container gc-hero__grid">
            <div className="gc-hero__left">
              <h1 className="gc-hero__title">
                {keepShortWords(osagoPageDict.hero.title)}
              </h1>
              <p className="gc-hero__subtitle">
                {keepShortWords(osagoPageDict.hero.subtitle)}
              </p>

              <div
                className="gc-hero__facts"
                aria-label={osagoPageDict.hero.factsLabel}
              >
                {osagoPageDict.hero.facts.map((fact) => (
                  <span key={fact}>{fact}</span>
                ))}
              </div>

              <div className="gc-hero__cta">
                <a href={calculatorAnchor} role="button" className="btn btn-wide">
                  {osagoPageDict.hero.ctaOrder}
                </a>
              </div>
            </div>

            <div className="gc-hero__right">
              <div className="gc-hero__visualWrap">
                <div className="gc-hero-visual gc-hero-visual--single">
                  <Image
                    src="/osago-rf/HiroOsagoRf.webp"
                    alt={osagoPageDict.hero.carAlt}
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
          aria-labelledby="osago-rf-info-heading"
        >
          <div className="gc-container">
            <article className="gc-info-strip__card">
              <div className="gc-info-strip__header">
                <h2 id="osago-rf-info-heading" className="gc-info-strip__title">
                  {osagoPageDict.info.title}
                </h2>
              </div>
              <div className="gc-info-strip__body">
                {osagoPageDict.info.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="gc-section" id="osago-rf-calculator">
          <div className="gc-container">
            <div className="legacy-form-scope legacy-form-card">
              <div className="modern-only">
                <DeferredHydration rootMargin="800px" minDelayMs={150}>
                  <OsagoRfCalculator dict={osagoCalcDict} />
                </DeferredHydration>
              </div>

              <div className="legacy-only">
                <h2 className="gc-h2">{keepShortWords(osagoCalcDict.title)}</h2>
                <p className="gc-text-muted">{osagoCalcDict.subtitle}</p>
                <div className="gc-mt-12">
                  <a
                    href={orderAnchor}
                    className="btn btn-secondary btn-wide"
                    role="button"
                  >
                    {osagoPageDict.hero.ctaOrder}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <OsagoCoverageSection dict={osagoPageDict} />

        <CommercialTransportSection
          dict={osagoPageDict}
          /*orderAnchor={orderAnchor}*/
        />

        <OsagoHowItWorksSection dict={osagoPageDict} />

        <section className="gc-advantages" aria-labelledby="advantages-heading">
          <div className="gc-container">
            <h2 id="advantages-heading" className="gc-advantages__title">
              {keepShortWords(osagoPageDict.advantages.title)}
            </h2>

            <div className="gc-advantages__grid">
              {osagoPageDict.advantages.items.map((item, index) => (
                <article key={item.title} className="gc-adv-card">
                  <div className="gc-adv-card__iconWrap">
                    <AdvantageIcon index={index} />
                  </div>
                  <div className="gc-adv-card__kicker">{item.title}</div>
                  <p className="gc-adv-card__text">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="osago-rf-order" className="gc-section gc-order-section">
          <div className="gc-container gc-order-layout">
            <aside
              className="gc-order-prep"
              aria-labelledby="osago-rf-order-prep-heading"
            >
              <h2 id="osago-rf-order-prep-heading" className="gc-order-prep__title">
                {osagoPageDict.orderPrep.title}
              </h2>
              <p className="gc-order-prep__text">{osagoPageDict.orderPrep.text}</p>
              <ul className="gc-order-prep__list">
                {osagoPageDict.orderPrep.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>

            <div className="legacy-form-scope legacy-form-card gc-order-form-card">
              <OsagoOrderForm dict={osagoFormDict} />
            </div>
          </div>
        </section>

        <section id="write-us" className="gc-section gc-writeus-section">
          <div className="gc-container">
            <article className="writeus-card">
              <div>
                <h3 className="writeus__title">
                  {keepShortWords(osagoPageDict.writeUs.title)}
                </h3>
                <p className="writeus__text">{osagoPageDict.writeUs.text}</p>
              </div>

              <div className="writeus__actions">
                <a
                  href="https://wa.me/77765275553"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                  role="button"
                >
                  {osagoPageDict.writeUs.whatsapp}
                </a>
                <a
                  href="https://t.me/Dionis_insurance_broker_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-telegram"
                  role="button"
                >
                  {osagoPageDict.writeUs.telegram}
                </a>
                <a
                  href="tel:+77273573030"
                  className="btn btn-secondary"
                  role="button"
                >
                  {osagoPageDict.writeUs.phone}
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="gc-section gc-section--muted">
          <div className="gc-container">
            <article className="card gc-upsell">
              <div className="gc-upsell__media">
                <Image
                  src="/services/osago_check.png"
                  alt={osagoPageDict.osagoCheckUpsell.imageAlt}
                  width={400}
                  height={260}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="gc-upsell__img"
                  loading="lazy"
                />
              </div>

              <div className="gc-upsell__body">
                <div>
                  <h3 className="gc-upsell__title">
                    {osagoPageDict.osagoCheckUpsell.title}
                  </h3>
                  <p className="gc-upsell__p">
                    {osagoPageDict.osagoCheckUpsell.text1}
                  </p>
                  <p className="gc-upsell__p gc-text-muted">
                    {osagoPageDict.osagoCheckUpsell.text2}
                  </p>
                </div>
                <div className="gc-upsell__cta">
                  <a
                    href={OSAGO_CHECK_LINK}
                    className="btn btn-secondary"
                    role="button"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {osagoPageDict.osagoCheckUpsell.btn}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="gc-section gc-section--muted">
          <div className="gc-container">
            <article className="card gc-upsell">
              <div className="gc-upsell__media">
                <Image
                  src="/services/zk_photo.webp"
                  alt={osagoPageDict.greenCardUpsell.imageAlt}
                  width={400}
                  height={260}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="gc-upsell__img"
                  loading="lazy"
                />
              </div>

              <div className="gc-upsell__body">
                <div>
                  <h3 className="gc-upsell__title">
                    {osagoPageDict.greenCardUpsell.title}
                  </h3>
                  <p className="gc-upsell__p">{osagoPageDict.greenCardUpsell.text1}</p>
                  <p className="gc-upsell__p gc-text-muted">
                    {osagoPageDict.greenCardUpsell.text2}
                  </p>
                </div>
                <div className="gc-upsell__cta">
                  <a href={greenCardLink} className="btn" role="button">
                    {osagoPageDict.greenCardUpsell.btn}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="gc-section">
          <div className="gc-container">
            <div className="legacy-form-scope legacy-form-card">
              <WhatsAppCall dict={whatsappCallDict} />
            </div>
          </div>
        </section>

        <FAQSection dict={osagoPageDict.faq} />
        <BrokerSection broker={homeDict.broker} />

        <section className="gc-question gc-section--muted">
          <div className="gc-container gc-question__grid">
            <div className="gc-question__media">
              <Image
                src="/osago-rf/policy-large.webp"
                alt={osagoPageDict.hero.policyAlt}
                width={520}
                height={360}
                sizes="(min-width: 1024px) 520px, 90vw"
                className="gc-question__img"
                loading="lazy"
              />
            </div>

            <div className="legacy-form-scope legacy-form-card">
              <OsagoRfQuestionForm
                homeContact={homeDict.contact}
                agreement={agreement}
                dict={osagoPageDict.questionBlock}
                context="osago-rf-question"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}