// app/[lang]/green-card/page.tsx
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

export default async function GreenCardPage(props: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await props.params;
  const lang = normalizeLang(rawLang);

  const homeDict = getHomeDictionary(lang);
  const agreement = getAgreementDictionary(lang);
  const gcFormDict = getGreenCardFormDictionary(lang);
  const gcPageDict: GreenCardPageDictionary = getGreenCardPageDictionary(lang);

  const osagoLink = `/${lang}/osago-rf`;
  const orderAnchor = "#green-card-order";

  return (
    <main className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F7F7F7] via-[#ffffff] to-[#e9f0f5]" />

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
          </div>
        </div>
      </section>

      {/* Блок: картинка + форма вопросов (КЛИЕНТСКИЙ) */}
      <section className="py-12 sm:py-16 bg-[#F4F6FA]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-start">
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/green-card/policy-large.webp"
              alt={gcPageDict.hero.policyAlt}
              width={520}
              height={360}
              className="w-full max-w-md lg:max-w-lg h-auto rounded-2xl shadow-lg"
            />
          </div>

          <GreenCardQuestionForm
            homeContact={homeDict.contact}
            agreement={agreement}
            dict={gcPageDict.questionBlock}
          />
        </div>
      </section>

      {/* Преимущества (серверное, без интерактива) */}
      <section className="border-t border-gray-200 bg-[#F7F7F7] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F] text-center">
            {gcPageDict.advantages.title}
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            {gcPageDict.advantages.items.map((item) => (
              <article
                key={item.title}
                className="card flex flex-col items-center px-5 py-5 sm:py-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F7F7]">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <div className="text-sm font-extrabold text-[#1A3A5F] uppercase">
                  {item.title}
                </div>
                <p className="mt-3 text-sm text-gray-600 text-center">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Калькулятор (КЛИЕНТСКИЙ) */}
      <GreenCardCalculator dict={gcPageDict.calculator} />

      {/* Форма заказа (как у тебя) */}
      <GreenCardOrderForm dict={gcFormDict} />

      {/* Доп. продажа ОСАГО (сервер) */}
      <section className="py-10 sm:py-12 bg-[#F5F7FA]">
        <div className="max-w-5xl mx-auto px-4">
          <article className="card overflow-hidden flex flex-col md:flex-row items-stretch">
            <div className="md:w-1/3">
              <Image
                src="/services/osago_rf_photo.webp"
                alt={gcPageDict.osagoUpsell.imageAlt}
                width={400}
                height={260}
                className="h-40 md:h-full w-full object-cover"
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

      {/* FAQ (КЛИЕНТСКИЙ) */}
      <FAQSection dict={gcPageDict.faq} />

      {/* Broker (как у тебя) */}
      <BrokerSection broker={homeDict.broker} />
    </main>
  );
}
