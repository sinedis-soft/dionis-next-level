import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";
import Image from "next/image";
import type { CSSProperties } from "react";

import { getHomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary } from "@/dictionaries/agreement";
import { getOsagoRfFormDictionary } from "@/dictionaries/osagoRfForm";
import {
  getOsagoRfPageDictionary,
  type OsagoRfPageDictionary,
} from "@/dictionaries/osagoRfPage";
import { getOsagoRfCalculatorDictionary } from "@/dictionaries/osagoRfCalculator";
import { getWhatsAppCallDictionary } from "@/dictionaries/whatsappcall";
import { WhatsAppCall } from "@/components/WhatsAppCall";

import { BrokerSection } from "@/components/BrokerSection";
import OsagoRfCalculator from "@/components/osago-rf/OsagoRfCalculator";
import FAQSection from "@/components/osago-rf/FAQSection";
import OsagoRfQuestionForm from "@/components/osago-rf/OsagoRfQuestionForm";
import DeferredHydration from "@/components/DeferredHydration";
import { OsagoOrderForm } from "@/components/osago-rf/OsagoOrderForm";

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

function OsagoInfoBlocks({
  dict,
}: {
  dict: Pick<OsagoRfPageDictionary, "howItWorks" | "benefits">;
}) {
  return (
    <>
      <DeferredHydration rootMargin="800px" minDelayMs={150}>
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
                  {dict.howItWorks.steps.map((s, idx) => (
                    <div key={idx} className="gc-hiw__step">
                      <div className="gc-hiw__num">{idx + 1}</div>
                      <div className="gc-hiw__stepTitle">{s.title}</div>
                      <p className="gc-hiw__stepText">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="gc-hiw__mobile">
                {dict.howItWorks.steps.map((s, idx) => (
                  <article key={idx} className="card gc-hiw-card">
                    <div className="gc-hiw-card__row">
                      <div className="gc-hiw__num gc-hiw__num--mobile">
                        {idx + 1}
                      </div>
                      <div className="gc-hiw-card__body">
                        <div className="gc-hiw__stepTitle">{s.title}</div>
                        <p className="gc-hiw__stepText gc-hiw__stepText--mobile">
                          {s.text}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </DeferredHydration>

      <DeferredHydration rootMargin="800px" minDelayMs={150}>
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
                    {dict.benefits.items.map((it, idx) => (
                      <div key={idx} className="gc-coverage__item">
                        <div className="gc-coverage__icon" aria-hidden="true">
                          <span className="gc-coverage__dot" />
                        </div>

                        <div>
                          <div className="gc-coverage__itemTitle">{it.title}</div>
                          <p className="gc-coverage__itemText">{it.text}</p>
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
                      priority={false}
                    />
                    <div className="gc-coverage__imgOverlay" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </DeferredHydration>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const url = `${SITE_URL}/${lang}/osago-rf`;

  const titles: Record<Lang, string> = {
    ru: "ОСАГО РФ для нерезидентов — оформить онлайн | Dionis Insurance Broker",
    kz: "РФ ОСАҒО — резидент еместерге онлайн рәсімдеу | Dionis Insurance Broker",
    en: "Russian MTPL (OSAGO RF) for non-residents — online | Dionis Insurance Broker",
  };

  const descriptions: Record<Lang, string> = {
    ru: "Оформление ОСАГО РФ для авто с иностранными номерами. Онлайн-заявка, консультация, электронный полис.",
    kz: "Шетел нөмірлі көліктерге РФ ОСАҒО. Онлайн өтінім, кеңес, электронды полис.",
    en: "OSAGO RF (Russian MTPL) for vehicles with foreign plates. Online application and consultation.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/osago-rf`,
        "kk-KZ": `${SITE_URL}/kz/osago-rf`,
        en: `${SITE_URL}/en/osago-rf`,
        "x-default": `${SITE_URL}/ru/osago-rf`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title: titles[lang],
      description: descriptions[lang],
      locale: langToOgLocale(lang),
      siteName: "Dionis Insurance Broker",
    },
    robots: { index: true, follow: true },
  };
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
  const osagoPageDict: OsagoRfPageDictionary = getOsagoRfPageDictionary(lang);
  const osagoCalcDict = getOsagoRfCalculatorDictionary(lang);
  const whatsappCallDict = getWhatsAppCallDictionary(lang);

  const pageUrl = `${SITE_URL}/${lang}/osago-rf`;

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name:
      lang === "ru"
        ? "ОСАГО РФ для нерезидентов"
        : lang === "kz"
          ? "РФ ОСАҒО резидент еместерге"
          : "OSAGO RF for non-residents",
    description:
      lang === "ru"
        ? "Оформление ОСАГО для въезда и поездок по РФ на автомобиле с иностранными номерами."
        : lang === "kz"
          ? "Шетел нөмірлі көлікпен РФ аумағында жүруге арналған ОСАҒО рәсімдеу."
          : "Russian MTPL (OSAGO RF) for trips in Russia with foreign plates.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#insurance-broker` },
    inLanguage: langToIana(lang),
  };

  const greenCardLink = `/${lang}/green-card`;
  const orderAnchor = "#osago-rf-order";

  return (
    <>
      <script
        id="webpage-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <main className="gc-page">
        <section className="gc-hero">
          <div className="gc-hero__bg" aria-hidden="true" />
          <div className="gc-container gc-hero__grid">
            <div className="gc-hero__left">
              <h1 className="gc-hero__title">{osagoPageDict.hero.title}</h1>
              <p className="gc-hero__subtitle">{osagoPageDict.hero.subtitle}</p>

              <div className="gc-hero__cta">
                <a href={orderAnchor} role="button" className="btn btn-wide">
                  {osagoPageDict.hero.ctaOrder}
                </a>
              </div>
            </div>

            <div className="gc-hero__right">
              <DeferredHydration disableOnLegacy rootMargin="1200px" minDelayMs={0}>
                <div className="gc-hero__visualWrap">
                  <div className="gc-hero-visual">
                    <Image
                      src="/osago-rf/car-osago.png"
                      alt={osagoPageDict.hero.carAlt}
                      width={620}
                      height={320}
                      sizes="(min-width: 1280px) 620px, (min-width: 1024px) 520px, 0px"
                      className="gc-hero__car gc-anim-car"
                      style={{ height: "auto" }}
                      priority
                    />

                    <Image
                      src="/osago-rf/policy-large.webp"
                      alt={osagoPageDict.hero.policyAlt}
                      width={160}
                      height={160}
                      sizes="160px"
                      className="gc-hero-policy gc-anim-policy"
                      loading="lazy"
                    />

                    <Image
                      src="/dionis-crkl.webp"
                      alt={osagoPageDict.hero.logoAlt}
                      width={110}
                      height={110}
                      sizes="110px"
                      className="gc-hero-logo-small gc-anim-logo"
                      loading="lazy"
                    />
                  </div>
                </div>
              </DeferredHydration>
            </div>
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
                <h2 className="gc-h2">{osagoCalcDict.title}</h2>
                <p className="gc-text-muted">{osagoCalcDict.subtitle}</p>

                <div className="gc-legacy-note">
                  <p className="gc-text-muted">
                    Ваш браузер устарел. Калькулятор может работать медленно или не
                    работать.
                  </p>
                  <p className="gc-text-muted">
                    Оформите заявку — мы рассчитаем стоимость и пришлём предложение.
                  </p>

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

                <noscript>
                  <div className="gc-mt-12 gc-text-muted">
                    JavaScript отключён. Оформите заявку ниже — мы рассчитаем стоимость
                    вручную.
                  </div>
                </noscript>
              </div>
            </div>
          </div>
        </section>

        <section id="write-us" className="gc-section">
          <div className="gc-container">
            <h3 className="writeus__title">{osagoPageDict.writeUs.title}</h3>

            <p className="writeus__text">{osagoPageDict.writeUs.text}</p>

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
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                role="button"
              >
                {osagoPageDict.writeUs.phone}
              </a>
            </div>
          </div>
        </section>

        <OsagoInfoBlocks dict={osagoPageDict} />

        <section className="gc-section gc-section--muted">
          <div className="gc-container">
            <article className="card gc-upsell">
              <div className="gc-upsell__media">
                <DeferredHydration disableOnLegacy rootMargin="1200px" minDelayMs={0}>
                  <Image
                    src="/services/osago_check.png"
                    alt={osagoPageDict.osagoCheckUpsell.imageAlt}
                    width={400}
                    height={260}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="gc-upsell__img"
                    loading="lazy"
                  />
                </DeferredHydration>
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
                    rel="noopener noreferrer nofollow"
                  >
                    {osagoPageDict.osagoCheckUpsell.btn}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <DeferredHydration rootMargin="800px" minDelayMs={150}>
          <section className="gc-advantages" aria-labelledby="advantages-heading">
            <div className="gc-container">
              <h2 id="advantages-heading" className="gc-advantages__title">
                {osagoPageDict.advantages.title}
              </h2>

              <div className="gc-advantages__grid">
                {osagoPageDict.advantages.items.map((item, idx) => (
                  <article key={`${item.title}-${idx}`} className="gc-adv-card">
                    <div className="gc-adv-card__iconWrap">
                      <DeferredHydration
                        disableOnLegacy
                        rootMargin="1200px"
                        minDelayMs={0}
                      >
                        <AdvantageIcon index={idx} />
                      </DeferredHydration>
                    </div>

                    <div className="gc-adv-card__kicker">{item.title}</div>
                    <p className="gc-adv-card__text">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </DeferredHydration>

        <section id="osago-rf-order" className="gc-section">
          <div className="gc-container">
            <div className="legacy-form-scope legacy-form-card">
              <OsagoOrderForm dict={osagoFormDict} />
            </div>
          </div>
        </section>

        <section className="gc-section gc-section--muted">
          <div className="gc-container">
            <article className="card gc-upsell">
              <div className="gc-upsell__media">
                <DeferredHydration disableOnLegacy rootMargin="1200px" minDelayMs={0}>
                  <Image
                    src="/services/zk_photo.webp"
                    alt={osagoPageDict.greenCardUpsell.imageAlt}
                    width={400}
                    height={260}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="gc-upsell__img"
                    loading="lazy"
                  />
                </DeferredHydration>
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
              <DeferredHydration disableOnLegacy rootMargin="1200px" minDelayMs={0}>
                <Image
                  src="/osago-rf/policy-large.webp"
                  alt={osagoPageDict.hero.policyAlt}
                  width={520}
                  height={360}
                  sizes="(min-width: 1024px) 520px, 90vw"
                  className="gc-question__img"
                  loading="lazy"
                />
              </DeferredHydration>
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