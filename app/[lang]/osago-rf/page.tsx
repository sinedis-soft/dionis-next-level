// app/[lang]/osago-rf/page.tsx
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";
import Image from "next/image";
import Script from "next/script";

import { getHomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary } from "@/dictionaries/agreement";
import { getOsagoRfFormDictionary } from "@/dictionaries/osagoRfForm";
import {
  getOsagoRfPageDictionary,
  type OsagoRfPageDictionary,
} from "@/dictionaries/osagoRfPage";

import { BrokerSection } from "@/components/BrokerSection";
import { OsagoOrderForm } from "@/components/osago-rf/OsagoOrderForm";
import FAQSection from "@/components/osago-rf/FAQSection";
import OsagoRfQuestionForm from "@/components/osago-rf/OsagoRfQuestionForm";
import DeferredHydration from "@/components/DeferredHydration";
import ContactSection from "@/components/ContactSection";

export const dynamicParams = false;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dionis-insurance.com";

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

function OsagoInfoBlocks({
  dict,
}: {
  dict: Pick<OsagoRfPageDictionary, "howItWorks" | "benefits">;
}) {
  return (
    <>
      {/* HOW IT WORKS */}
      <DeferredHydration rootMargin="800px" minDelayMs={150}>
        <section
          className="py-12 sm:py-16 bg-white [overflow-anchor:none]"
          aria-labelledby="how-it-works-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2
              id="how-it-works-heading"
              className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F] text-center"
            >
              {dict.howItWorks.title}
            </h2>

            <p className="mt-2 text-center text-gray-600">
              {dict.howItWorks.subtitle}
            </p>

            <div className="mt-10">
              <div className="hidden md:block relative">
                <div className="absolute left-0 right-0 top-[18px] h-px bg-gray-200" />
                <div className="grid grid-cols-4 gap-6">
                  {dict.howItWorks.steps.map((s, idx) => (
                    <div key={idx} className="text-center">
                      <div className="mx-auto h-9 w-9 rounded-full bg-[#0F2742] text-white flex items-center justify-center text-sm font-semibold">
                        {idx + 1}
                      </div>
                      <div className="mt-3 text-sm font-extrabold text-[#1A3A5F]">
                        {s.title}
                      </div>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        {s.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:hidden grid gap-4">
                {dict.howItWorks.steps.map((s, idx) => (
                  <article
                    key={idx}
                    className="card bg-white border border-gray-200 shadow-sm p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 h-9 w-9 rounded-full bg-[#0F2742] text-white flex items-center justify-center text-sm font-semibold">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-[#1A3A5F]">
                          {s.title}
                        </div>
                        <p className="mt-1 text-sm text-gray-600 leading-relaxed">
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

      {/* BENEFITS (COVERAGE) */}
      <DeferredHydration rootMargin="800px" minDelayMs={150}>
        <section
          className="py-12 sm:py-16 bg-white [overflow-anchor:none]"
          aria-labelledby="benefits-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <article className="rounded-2xl bg-[#0f2238] text-white overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">
                <div className="p-6 sm:p-10">
                  <h2
                    id="benefits-heading"
                    className="text-2xl sm:text-3xl font-semibold"
                  >
                    {dict.benefits.title}
                  </h2>

                  <div className="mt-8 space-y-6">
                    {dict.benefits.items.map((it, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="mt-1 h-8 w-8 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                          <span className="block h-2 w-2 rounded-full bg-[#EBCA45]" />
                        </div>
                        <div>
                          <div className="text-sm font-extrabold">{it.title}</div>
                          <p className="mt-1 text-sm text-white/80 leading-relaxed">
                            {it.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 sm:p-10 flex items-center justify-center">
                  <div className="w-full max-w-md aspect-[4/3] bg-white/5 flex items-center justify-center relative overflow-hidden rounded-xl">
                    <Image
                      src="/osago-rf/Виды_субъектов_России_на_политической_карте.png"
                      alt={dict.benefits.imageAlt}
                      fill
                      className="object-cover opacity-90"
                      sizes="(min-width: 1024px) 520px, 90vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-black/10" />
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
      <Script
        id="webpage-jsonld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <main className="min-h-screen bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F7F7F7] via-[#ffffff] to-[#e9f0f5]" />

          <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F] leading-tight">
                {osagoPageDict.hero.title}
              </h1>

              <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-xl">
                {osagoPageDict.hero.subtitle}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href={orderAnchor} role="button" className="btn btn-wide">
                  {osagoPageDict.hero.ctaOrder}
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="hidden lg:block">
                <div className="gc-hero-visual w-[520px] h-[280px] xl:w-[620px] xl:h-[320px] relative">
                  <Image
                    src="/osago-rf/car-osago.png"
                    alt={osagoPageDict.hero.carAlt}
                    width={620}
                    height={320}
                    sizes="(min-width: 1280px) 620px, (min-width: 1024px) 520px, 0px"
                    className="absolute bottom-[-120px] left-0 w-full h-auto gc-anim-car"
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
            </div>
          </div>
        </section>

        <OsagoInfoBlocks dict={osagoPageDict} />

        

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
                {osagoPageDict.advantages.title}
              </h2>

              <div className="mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {osagoPageDict.advantages.items.map((item, idx) => (
                  <article
                    key={`${item.title}-${idx}`}
                    className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 sm:p-5 text-left"
                  >
                    <div className="mb-3">
                      <div className="h-9 w-9 rounded-lg bg-[#EBCA45]/15 flex items-center justify-center">
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

        {/* ORDER FORM */}
        <OsagoOrderForm dict={osagoFormDict} />

        {/* UPSALE GREEN CARD */}
        <section className="py-10 sm:py-12 bg-[#F5F7FA]">
          <div className="max-w-5xl mx-auto px-4">
            <article className="card overflow-hidden flex flex-col md:flex-row items-stretch">
              <div className="md:w-1/3">
                <Image
                  src="/services/zk_photo.webp"
                  alt={osagoPageDict.greenCardUpsell.imageAlt}
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
                    {osagoPageDict.greenCardUpsell.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 mb-2">
                    {osagoPageDict.greenCardUpsell.text1}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    {osagoPageDict.greenCardUpsell.text2}
                  </p>
                </div>
                <div className="mt-4 flex justify-end">
                  <a href={greenCardLink} className="btn w-full sm:w-auto" role="button">
                    {osagoPageDict.greenCardUpsell.btn}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection dict={osagoPageDict.faq} />

        {/* BROKER */}
        <BrokerSection broker={homeDict.broker} />

        {/* QUESTION BLOCK */}
        <section className="py-12 sm:py-16 bg-[#F4F6FA]">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-start">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/osago-rf/policy-large.webp"
                alt={osagoPageDict.hero.policyAlt}
                width={520}
                height={360}
                sizes="(min-width: 1024px) 520px, 90vw"
                className="w-full max-w-md lg:max-w-lg h-auto rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>

            <OsagoRfQuestionForm
              homeContact={homeDict.contact}
              agreement={agreement}
              dict={osagoPageDict.questionBlock}
              context="osago-rf-question"
            />
          </div>
        </section>
      </main>
    </>
  );
}
