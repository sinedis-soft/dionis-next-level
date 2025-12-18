// app/[lang]/green-card/page.tsx
import type { Metadata } from "next";
import type { Lang } from "@/dictionaries/header";
import Image from "next/image";

import { getHomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary } from "@/dictionaries/agreement";
import { getGreenCardFormDictionary } from "@/dictionaries/greenCardForm";
import {
  getGreenCardPageDictionary,
  type GreenCardPageDictionary,
} from "@/dictionaries/greenCardPage";

import { GreenCardOrderForm } from "@/components/GreenCardOrderForm";
import { BrokerSection } from "@/components/BrokerSection";
import GreenCardCalculator from "@/components/green-card/GreenCardCalculator";
import FAQSection from "@/components/green-card/FAQSection";
import GreenCardQuestionForm from "@/components/green-card/GreenCardQuestionForm";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ lang: Lang }> {
  return [{ lang: "ru" }, { lang: "kz" }, { lang: "en" }];
}

function normalizeLang(value: unknown): Lang {
  return value === "ru" || value === "kz" || value === "en" ? value : "ru";
}

export async function generateMetadata({
  params,
}: {
  params: { lang?: string };
}): Promise<Metadata> {
  const lang = normalizeLang(params.lang);

  const baseUrl = "https://dionis-insurance.kz";
  const url = `${baseUrl}/${lang}/green-card`;

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
        ru: `${baseUrl}/ru/green-card`,
        "kk-KZ": `${baseUrl}/kz/green-card`,
        en: `${baseUrl}/en/green-card`,
        "x-default": `${baseUrl}/ru/green-card`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title: titles[lang],
      description: descriptions[lang],
      locale: lang === "ru" ? "ru_RU" : lang === "kz" ? "kk_KZ" : "en_US",
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
  params: { lang?: string };
}) {
  const lang = normalizeLang(params.lang);

  const homeDict = getHomeDictionary(lang);
  const agreement = getAgreementDictionary(lang);
  const gcFormDict = getGreenCardFormDictionary(lang);
  const gcPageDict: GreenCardPageDictionary = getGreenCardPageDictionary(lang);

  const baseUrl = "https://dionis-insurance.kz";
  const pageUrl = `${baseUrl}/${lang}/green-card`;

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
    isPartOf: { "@id": `${baseUrl}/#website` },
    about: { "@id": `${baseUrl}/#insurance-broker` },
    inLanguage: lang === "ru" ? "ru" : lang === "kz" ? "kk-KZ" : "en",
  };

  const osagoLink = `/${lang}/osago-rf`;
  const orderAnchor = "#green-card-order";

  return (
    <>
      <div
        dangerouslySetInnerHTML={{
          __html: `<script type="application/ld+json">${JSON.stringify(
            webPageJsonLd
          )}</script>`,
        }}
      />

      <main className="min-h-screen bg-white">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F7F7F7] via-white to-[#e9f0f5]" />
          <div className="max-w-6xl mx-auto px-4 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F]">
                {gcPageDict.hero.title}
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                {gcPageDict.hero.subtitle}
              </p>
              <div className="mt-10">
                <a href={orderAnchor} className="btn btn-wide">
                  {gcPageDict.hero.ctaOrder}
                </a>
              </div>
            </div>

            <div className="hidden lg:block relative w-[620px] h-[320px]">
              <Image
                src="/green-card/hero-car.webp"
                alt={gcPageDict.hero.carAlt}
                width={620}
                height={320}
                className="absolute bottom-0 left-0 w-full h-auto"
              />
              <Image
                src="/green-card/policy-large_1.webp"
                alt={gcPageDict.hero.policyAlt}
                width={160}
                height={160}
                className="gc-hero-policy"
              />
              <Image
                src="/dionis-crkl.webp"
                alt={gcPageDict.hero.logoAlt}
                width={110}
                height={110}
                className="gc-hero-logo-small"
              />
            </div>
          </div>
        </section>

        <section className="py-12 bg-[#F4F6FA]">
          <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-[2fr_3fr] gap-10">
            <Image
              src="/green-card/policy-large.webp"
              alt={gcPageDict.hero.policyAlt}
              width={520}
              height={360}
              className="rounded-2xl shadow-lg"
            />
            <GreenCardQuestionForm
              homeContact={homeDict.contact}
              agreement={agreement}
              dict={gcPageDict.questionBlock}
            />
          </div>
        </section>

        <GreenCardCalculator dict={gcPageDict.calculator} />
        <GreenCardOrderForm dict={gcFormDict} />

        <section className="py-12 bg-[#F5F7FA]">
          <div className="max-w-5xl mx-auto px-4">
            <article className="card flex flex-col md:flex-row overflow-hidden">
              <Image
                src="/services/osago_rf_photo.webp"
                alt={gcPageDict.osagoUpsell.imageAlt}
                width={400}
                height={260}
                className="md:w-1/3 object-cover"
              />
              <div className="md:w-2/3 p-6">
                <h3 className="text-xl font-bold text-[#1A3A5F]">
                  {gcPageDict.osagoUpsell.title}
                </h3>
                <p className="mt-2 text-gray-700">
                  {gcPageDict.osagoUpsell.text1}
                </p>
                <p className="mt-1 text-gray-600">
                  {gcPageDict.osagoUpsell.text2}
                </p>
                <div className="mt-4 text-right">
                  <a href={osagoLink} className="btn">
                    {gcPageDict.osagoUpsell.btn}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <FAQSection dict={gcPageDict.faq} />
        <BrokerSection broker={homeDict.broker} />
      </main>
    </>
  );
}
