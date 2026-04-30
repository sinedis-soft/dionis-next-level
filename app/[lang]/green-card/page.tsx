import type { Metadata } from "next";
import { keepShortWords } from "@/lib/keepShortWords";
import type { Lang } from "@/dictionaries/header";
import Image from "next/image";
import type { CSSProperties } from "react";

import { getHomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary } from "@/dictionaries/agreement";
import { getGreenCardFormDictionary } from "@/dictionaries/greenCardForm";
import {
  getGreenCardPageDictionary,
  type GreenCardPageDictionary,
} from "@/dictionaries/greenCardPage";
import { getWhatsAppCallDictionary } from "@/dictionaries/whatsappcall";
import { WhatsAppCall } from "@/components/WhatsAppCall";

import GreenCardInfoBlocks from "@/components/green-card/GreenCardInfoBlocks";
import { GreenCardOrderForm } from "@/components/green-card/GreenCardOrderForm";
import { BrokerSection } from "@/components/BrokerSection";
import GreenCardCalculator from "@/components/green-card/GreenCardCalculator";
import FAQSection from "@/components/green-card/FAQSection";
import GreenCardQuestionForm from "@/components/green-card/GreenCardQuestionForm";
import DeferredHydration from "@/components/DeferredHydration";

export const dynamicParams = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dionis-insurance.kz";

const GREEN_CARD_CHECK_LINK = "https://isb.az/en/greencard/check/serial/no";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);
  const url = `${SITE_URL}/${lang}/green-card`;

  const titles: Record<Lang, string> = {
    ru: "Зелёная карта для авто из Казахстана — оформить онлайн | Dionis Insurance Broker",
    kz: "Қазақстаннан автокөлікке Green Card — онлайн рәсімдеу | Dionis Insurance Broker",
    en: "Green Card insurance for vehicles from Kazakhstan | Dionis Insurance Broker",
  };

  const descriptions: Record<Lang, string> = {
    ru: "Оформление полиса «Зелёная карта» для поездок в ЕС, Турцию и другие страны. Онлайн-заявка, калькулятор, консультация. Казахстан.",
    kz: "ЕО, Түркия және басқа елдерге сапарлар үшін Green Card сақтандыруын онлайн рәсімдеу. Есептеу және кеңес.",
    en: "Online Green Card liability insurance for trips to the EU, Türkiye and other countries. Calculator and consultation.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      canonical: url,
      languages: {
        ru: `${SITE_URL}/ru/green-card`,
        "kk-KZ": `${SITE_URL}/kz/green-card`,
        en: `${SITE_URL}/en/green-card`,
        "x-default": `${SITE_URL}/ru/green-card`,
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

export default async function GreenCardPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const homeDict = getHomeDictionary(lang);
  const agreement = getAgreementDictionary(lang);
  const gcFormDict = getGreenCardFormDictionary(lang);
  const gcPageDict: GreenCardPageDictionary = getGreenCardPageDictionary(lang);
  const whatsappCallDict = getWhatsAppCallDictionary(lang);

  const pageUrl = `${SITE_URL}/${lang}/green-card`;

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name:
      lang === "ru"
        ? "Зелёная карта для авто из Казахстана"
        : lang === "kz"
          ? "Қазақстаннан автокөлікке Green Card"
          : "Green Card insurance for vehicles from Kazakhstan",
    description:
      lang === "ru"
        ? "Оформление международного полиса «Зелёная карта» для поездок за границу на автомобиле из Казахстана."
        : lang === "kz"
          ? "Қазақстаннан шетелге сапарлар үшін халықаралық Green Card полисін рәсімдеу."
          : "International Green Card liability insurance for trips abroad with a vehicle from Kazakhstan.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#insurance-broker` },
    inLanguage: langToIana(lang),
  };

  const osagoLink = `/${lang}/osago-rf`;
  const orderAnchor = "#green-card-order";

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
              <h1 className="gc-hero__title">{keepShortWords(gcPageDict.hero.title)}</h1>
              <p className="gc-hero__subtitle">{keepShortWords(gcPageDict.hero.subtitle)}</p>

              <div className="gc-hero__cta">
                <a
                  href={orderAnchor}
                  role="button"
                  className="btn btn-primary btn-wide"
                >
                  {gcPageDict.hero.ctaOrder}
                </a>
              </div>
            </div>

            <div className="gc-hero__right">
              <DeferredHydration disableOnLegacy rootMargin="1200px" minDelayMs={0}>
                <div className="gc-hero__visualWrap">
                  <div className="gc-hero-visual">
                    <Image
                      src="/green-card/car-removebg-preview.png"
                      alt={gcPageDict.hero.carAlt}
                      width={620}
                      height={320}
                      sizes="(min-width: 1280px) 620px, (min-width: 1024px) 520px, 0px"
                      className="gc-hero__car gc-anim-car"
                      style={{ height: "auto" }}
                      priority
                    />

                    <Image
                      src="/green-card/policy-large_1.webp"
                      alt={gcPageDict.hero.policyAlt}
                      width={160}
                      height={160}
                      sizes="160px"
                      className="gc-hero-policy gc-anim-policy"
                      loading="lazy"
                    />

                    <Image
                      src="/dionis-crkl.webp"
                      alt={gcPageDict.hero.logoAlt}
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

        <section className="gc-section" id="green-card-calculator">
          <div className="gc-container">
            <div className="legacy-form-scope legacy-form-card">
              <div className="modern-only">
                <DeferredHydration rootMargin="800px" minDelayMs={150}>
                  <GreenCardCalculator dict={gcPageDict.calculator} />
                </DeferredHydration>
              </div>

              <div className="legacy-only">
                <h2 className="gc-h2">{keepShortWords(gcPageDict.calculator.title)}</h2>
                <p className="gc-text-muted">{gcPageDict.calculator.subtitle}</p>

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
                      {gcPageDict.hero.ctaOrder}
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
            <h3 className="writeus__title">{keepShortWords(gcPageDict.writeUs.title)}</h3>

            <p className="writeus__text">{gcPageDict.writeUs.text}</p>

            <div className="writeus__actions">
              <a
                href="https://wa.me/77765275553"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                role="button"
              >
                {gcPageDict.writeUs.whatsapp}
              </a>

              <a
                href="https://t.me/Dionis_insurance_broker_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-telegram"
                role="button"
              >
                {gcPageDict.writeUs.telegram}
              </a>

              <a
                href="tel:+77273573030"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                role="button"
              >
                {gcPageDict.writeUs.phone}
              </a>
            </div>
          </div>
        </section>

        <GreenCardInfoBlocks dict={gcPageDict} />

        <section className="gc-section gc-section--muted">
          <div className="gc-container">
            <article className="card gc-upsell">
              <div className="gc-upsell__media">
                <DeferredHydration disableOnLegacy rootMargin="1200px" minDelayMs={0}>
                  <Image
                    src="/services/green_card_check.svg"
                    alt={gcPageDict.greenCardCheckUpsell.imageAlt}
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
                    {gcPageDict.greenCardCheckUpsell.title}
                  </h3>
                  <p className="gc-upsell__p">
                    {gcPageDict.greenCardCheckUpsell.text1}
                  </p>
                  <p className="gc-upsell__p gc-text-muted">
                    {gcPageDict.greenCardCheckUpsell.text2}
                  </p>
                </div>

                <div className="gc-upsell__cta">
                  <a
                    href={GREEN_CARD_CHECK_LINK}
                    className="btn btn-secondary"
                    role="button"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {gcPageDict.greenCardCheckUpsell.btn}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="green-card-order" className="gc-section">
          <div className="gc-container">
            <div className="legacy-form-scope legacy-form-card">
              <GreenCardOrderForm dict={gcFormDict} />
            </div>
          </div>
        </section>

        <DeferredHydration rootMargin="800px" minDelayMs={150}>
          <section className="gc-advantages" aria-labelledby="advantages-heading">
            <div className="gc-container">
              <h2 id="advantages-heading" className="gc-advantages__title">
                {keepShortWords(gcPageDict.advantages.title)}
              </h2>

              <div className="gc-advantages__grid">
                {gcPageDict.advantages.items.map((item, idx) => (
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

        <section className="gc-section">
          <div className="gc-container">
            <div className="legacy-form-scope legacy-form-card">
              <WhatsAppCall dict={whatsappCallDict} />
            </div>
          </div>
        </section>

        <section className="gc-section gc-section--muted">
          <div className="gc-container">
            <article className="card gc-upsell">
              <div className="gc-upsell__media">
                <DeferredHydration disableOnLegacy rootMargin="1200px" minDelayMs={0}>
                  <Image
                    src="/services/osago_rf_photo.webp"
                    alt={gcPageDict.osagoUpsell.imageAlt}
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
                  <h3 className="gc-upsell__title">{gcPageDict.osagoUpsell.title}</h3>
                  <p className="gc-upsell__p">{gcPageDict.osagoUpsell.text1}</p>
                  <p className="gc-upsell__p gc-text-muted">
                    {gcPageDict.osagoUpsell.text2}
                  </p>
                </div>

                <div className="gc-upsell__cta">
                  <a href={osagoLink} className="btn btn-secondary" role="button">
                    {gcPageDict.osagoUpsell.btn}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <FAQSection dict={gcPageDict.faq} />
        <BrokerSection broker={homeDict.broker} />

        <section className="gc-question gc-section--muted">
          <div className="gc-container gc-question__grid">
            <div className="gc-question__media">
              <DeferredHydration disableOnLegacy rootMargin="1200px" minDelayMs={0}>
                <Image
                  src="/green-card/policy-large.webp"
                  alt={gcPageDict.hero.policyAlt}
                  width={520}
                  height={360}
                  sizes="(min-width: 1024px) 520px, 90vw"
                  className="gc-question__img"
                  loading="lazy"
                />
              </DeferredHydration>
            </div>

            <div className="legacy-form-scope legacy-form-card">
              <GreenCardQuestionForm
                homeContact={homeDict.contact}
                agreement={agreement}
                dict={gcPageDict.questionBlock}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
