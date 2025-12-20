// app/[lang]/green-card/page.tsx
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";
import Image from "next/image";
import GreenCardInfoBlocks from "@/components/green-card/GreenCardInfoBlocks";

import { getHomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary } from "@/dictionaries/agreement";
import { getGreenCardFormDictionary } from "@/dictionaries/greenCardForm";
import {
  getGreenCardPageDictionary,
  type GreenCardPageDictionary,
} from "@/dictionaries/greenCardPage";

import { GreenCardOrderForm } from "@/components/green-card/GreenCardOrderForm";
import { BrokerSection } from "@/components/BrokerSection";
import GreenCardCalculator from "@/components/green-card/GreenCardCalculator";
import FAQSection from "@/components/green-card/FAQSection";
import GreenCardQuestionForm from "@/components/green-card/GreenCardQuestionForm";
import DeferredHydration from "@/components/DeferredHydration"; // ✅ ВАЖНО: ты используешь, но не импортировал

export const dynamicParams = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dionis-insurance.kz";

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

/* ---- local helper ---- */
function AdvantageIcon({ index }: { index: number }) {
  const common = "h-5 w-5 text-[#C89F4A]";
  switch (index) {
    case 0:
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
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
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
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
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
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
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
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
    robots: {
      index: true,
      follow: true,
    },
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
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#ffffff] via-white to-[#e9f0f5]" />

          <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F] leading-tight">
                {gcPageDict.hero.title}
              </h1>
              <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-xl">
                {gcPageDict.hero.subtitle}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href={orderAnchor} role="button" className="btn btn-wide">
                  {gcPageDict.hero.ctaOrder}
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="hidden lg:block">
                <div className="gc-hero-visual w-[520px] h-[280px] xl:w-[620px] xl:h-[320px] relative">
                  <Image
                    src="/green-card/car-removebg-preview.png"
                    alt={gcPageDict.hero.carAlt}
                    width={620}
                    height={320}
                    sizes="(min-width: 1280px) 620px, (min-width: 1024px) 520px, 0px"
                    className="absolute bottom-0 left-0 w-full h-auto z-10 gc-anim-car"
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
            </div>
          </div>
        </section>

        <GreenCardInfoBlocks dict={gcPageDict} coverageImageSrc="/green-card/coverage.webp" />


        

        {/* ADVANTAGES */}
        <DeferredHydration rootMargin="800px" minDelayMs={150}>
          <section
            className="border-t border-gray-200 bg-[#FFFFFF] py-12 sm:py-16"
            aria-labelledby="advantages-heading"
          >
            <div className="max-w-6xl mx-auto px-4">
              <h2
                id="advantages-heading"
                className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F] text-center"
              >
                {gcPageDict.advantages.title}
              </h2>

              <div className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {gcPageDict.advantages.items.map((item, idx) => (
                  <article
                    key={`${item.title}-${idx}`}
                    className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 sm:p-5 text-left"
                  >
                    {/* icon */}
                    <div className="mb-3">
                      <div className="h-9 w-9 rounded-lg bg-[#EBCA45]/15 flex items-center justify-center">
                        {/* Вариант A: emoji */}
                        {/* <span className="text-lg leading-none" aria-hidden="true">
                          {item.icon}
                        </span> */}

                        {/* Вариант B: SVG (единый стиль) */}
                        <AdvantageIcon index={idx} />
                      </div>
                    </div>

                    <div className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                      {item.title}
                    </div>

                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </DeferredHydration>

        <GreenCardCalculator dict={gcPageDict.calculator} />
        <GreenCardOrderForm dict={gcFormDict} />

        <section className="py-10 sm:py-12 bg-[#F5F7FA]">
          <div className="max-w-6xl mx-auto px-4">
            <article className="card overflow-hidden flex flex-col md:flex-row items-stretch">
              <div className="md:w-1/3">
                <Image
                  src="/services/osago_rf_photo.webp"
                  alt={gcPageDict.osagoUpsell.imageAlt}
                  width={400}
                  height={260}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="h-40 md:h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="md:w-2/3 px-6 py-6 flex flex-col justify-between bg-[#F5F7FA]">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1A3A5F] mb-2">
                    {gcPageDict.osagoUpsell.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-2">
                    {gcPageDict.osagoUpsell.text1}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    {gcPageDict.osagoUpsell.text2}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <a href={osagoLink} className="btn w-full sm:w-auto" role="button">
                    {gcPageDict.osagoUpsell.btn}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>
        <section className="py-12 sm:py-16 bg-[#F4F6FA]">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-start">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/green-card/policy-large.webp"
                alt={gcPageDict.hero.policyAlt}
                width={520}
                height={360}
                sizes="(min-width: 1024px) 520px, 90vw"
                className="w-full max-w-md lg:max-w-lg h-auto rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>

            <GreenCardQuestionForm
              homeContact={homeDict.contact}
              agreement={agreement}
              dict={gcPageDict.questionBlock}
            />
          </div>
        </section>

        <FAQSection dict={gcPageDict.faq} />
        <BrokerSection broker={homeDict.broker} />
      </main>
    </>
  );
}
