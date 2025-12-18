"use client";

import Image from "next/image";
import { useMemo, useState, useCallback } from "react";

import type { Lang } from "@/dictionaries/header";
import type { HomeDictionary } from "@/dictionaries/home";
import type { AgreementDictionary } from "@/dictionaries/agreement";

import ServicesCarousel from "@/components/ServicesCarousel";
import ContactForm, { type ContactFormResult } from "@/components/ContactForm";
import AgreementModal from "@/components/AgreementModal";
import StatusModal from "@/components/StatusModal";
import { BrokerSection } from "@/components/BrokerSection";

import DeferredHydration from "@/components/DeferredHydration";
import { RecaptchaLazy } from "@/components/RecaptchaLazy";

type Props = {
  lang: Lang;
  t: HomeDictionary;
  agreement: AgreementDictionary;
};

export default function HomeClient({ lang, t, agreement }: Props) {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  // reCAPTCHA НЕ грузим при заходе на страницу
  const [recaptchaEnabled, setRecaptchaEnabled] = useState(false);
  const enableRecaptcha = useCallback(() => setRecaptchaEnabled(true), []);

  const greenCardLink = `/${lang}/green-card`;
  const osagoLink = `/${lang}/osago-rf`;
  const productsLink = `/${lang}/products`;

  const otherServices = useMemo(
    () =>
      t.services.otherServices.map((service) => ({
        ...service,
        link: `/${lang}${service.linkSuffix}`,
      })),
    [t.services.otherServices, lang]
  );

  // Модалки
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  const [statusOpen, setStatusOpen] = useState(false);
  const [statusKind, setStatusKind] = useState<"success" | "error">("success");
  const [statusMessage, setStatusMessage] = useState("");

  function handleFormResult(result: ContactFormResult) {
    setStatusKind(result.kind);
    setStatusMessage(result.message);
    setStatusOpen(true);
  }

  return (
    <>
      {/* reCAPTCHA скрипт появится ТОЛЬКО после взаимодействия с формой */}
      {recaptchaSiteKey ? (
        <RecaptchaLazy siteKey={recaptchaSiteKey} enabled={recaptchaEnabled} />
      ) : null}

      {/*
        ВАЖНО:
        Yandex partner-bundle НЕ грузим на главной вообще.
        Даже после consent. Иначе метрики будут плавать.
        Если нужно — подключай на конкретных страницах.
      */}

      <main className="min-h-screen bg-white">
        {/* HERO (первый экран) — грузится сразу */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#F7F7F7] via-[#ffffff] to-[#e9f0f5]" />

          <div className="max-w-6xl mx-auto px-4 py-10 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F] leading-tight whitespace-pre-line">
                {t.hero.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-xl">
                {t.hero.subtitle}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                <a href={greenCardLink} role="button" className="btn btn-wide">
                  {t.hero.greenCardBtn}
                </a>
                <a href={osagoLink} role="button" className="btn btn-wide">
                  {t.hero.osagoBtn}
                </a>
                <a href={productsLink} role="button" className="btn btn-wide">
                  {t.hero.otherBtn}
                </a>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              {/* LCP-картинка: quality НЕ занижаем */}
              <Image
                src="/dionis-crkl_2_960x960.webp"
                alt={t.hero.heroAlt}
                width={420}
                height={420}
                priority
                fetchPriority="high"
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, (max-width: 1280px) 420px, 480px"
                className="hero-logo w-56 sm:w-72 lg:w-[420px] xl:w-[480px] h-auto drop-shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Всё ниже — откладываем */}
        <DeferredHydration rootMargin="800px" minDelayMs={150}>
          {/* BENEFITS */}
          <section
            className="border-t border-gray-200 bg-[#F7F7F7] py-12 sm:py-16"
            aria-labelledby="benefits-heading"
          >
            <div className="max-w-5xl mx-auto px-4">
              <h2
                id="benefits-heading"
                className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F] text-center"
              >
                {t.benefits.title}
              </h2>

              <p className="mt-3 text-center text-gray-600 max-w-3xl mx-auto">
                {t.benefits.subtitle}
              </p>

              <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
                {t.benefits.cards.map((card, idx) => (
                  <article
                    key={idx}
                    className="card flex flex-col items-center px-5 py-5 sm:py-6"
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                      <span className="text-[#C89F4A] font-bold">{idx + 1}</span>
                    </div>

                    <div className="text-2xl font-extrabold text-[#1A3A5F]">
                      {card.value}
                    </div>
                    <div className="mt-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                      {card.label}
                    </div>
                    <p className="mt-3 text-sm text-gray-600 text-center">
                      {card.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* DIRECTOR */}
          <section
            className="py-12 sm:py-16 bg-[#F4F6FA]"
            aria-labelledby="director-message-heading"
          >
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 items-start relative">
                <div className="hidden lg:block absolute -top-10 right-0">
                  {/* НЕ-LCP → quality=60 + sizes */}
                  <Image
                    src="/dionis-crkl.webp"
                    alt={t.director.logoAlt}
                    width={220}
                    height={220}
                    quality={60}
                    sizes="220px"
                    className="director-logo"
                  />
                </div>

                <article className="relative bg-white rounded-2xl shadow-md px-6 sm:px-8 py-8 sm:py-10">
                  <h2
                    id="director-message-heading"
                    className="text-xl sm:text-2xl font-bold text-[#1A3A5F] mb-4"
                  >
                    {t.director.heading}
                  </h2>

                  <div className="space-y-3 text-sm sm:text-base text-gray-700 max-w-xl">
                    {t.director.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>

                  <div className="mt-6 text-sm text-gray-700">
                    {t.director.signLines.map((line, index) => (
                      <span key={index}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </div>

                  <div className="director-signature-wrap">
                    {/* НЕ-LCP → quality=60 + sizes */}
                    <Image
                      src="/director-signature.webp"
                      alt={t.director.signatureAlt}
                      width={200}
                      height={120}
                      quality={60}
                      loading="lazy"
                      sizes="(max-width: 640px) 140px, 200px"
                      className="director-signature"
                    />
                  </div>
                </article>

                <div className="hidden lg:flex justify-center">
                  {/* НЕ-LCP → quality=60 + sizes */}
                  <Image
                    src="/director-borovoy.webp"
                    alt={t.director.photoAlt}
                    width={360}
                    height={520}
                    quality={60}
                    loading="lazy"
                    sizes="(max-width: 1024px) 0px, 360px"
                    className="director-photo"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* GREEN CARD STEPS */}
          <section
            className="py-12 sm:py-16"
            aria-labelledby="green-card-steps-heading"
          >
            <div className="max-w-5xl mx-auto px-4">
              <h2
                id="green-card-steps-heading"
                className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F] text-center"
              >
                {t.greenCardSteps.title}
              </h2>

              <p className="mt-3 text-center text-gray-600 max-w-3xl mx-auto">
                {t.greenCardSteps.subtitle}
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {t.greenCardSteps.steps.map((step) => (
                  <article key={step.stepLabel} className="card px-5 py-5 sm:py-6">
                    <div className="inline-flex items-center justify-center rounded-full bg-[#F7F7F7] px-3 py-1 text-xs font-semibold text-[#1A3A5F]">
                      {step.stepLabel}
                    </div>
                    <h3 className="mt-3 text-base sm:text-lg font-semibold text-[#1A3A5F]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-600">
                      {step.text}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <a href={greenCardLink} role="button" className="btn">
                  {t.greenCardSteps.cta}
                </a>
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section
            className="py-12 sm:py-16 bg-white"
            aria-labelledby="services-heading"
          >
            <div className="max-w-6xl mx-auto px-4">
              <div className="mb-8">
                <h2
                  id="services-heading"
                  className="text-2xl sm:text-3xl font-bold tracking-tight"
                >
                  <span className="text-[#1A3A5F]">{t.services.titlePart1}</span>
                  <span className="text-[#C89F4A]">{t.services.titlePart2}</span>
                </h2>
                <div className="mt-2 h-1 w-16 bg-[#C89F4A]" />
              </div>

              <div className="grid gap-6 lg:grid-cols-2 mb-10">
                <article className="card overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    {/* НЕ-LCP → quality=60 + sizes */}
                    <Image
                      src="/services/zk_photo.webp"
                      alt={t.services.greenCardCard.imageAlt}
                      width={600}
                      height={400}
                      quality={60}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="h-56 md:h-full w-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 bg-[#052521] text-white px-6 py-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">
                        {t.services.greenCardCard.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-100 mb-3">
                        {t.services.greenCardCard.text1}
                      </p>
                      <p className="text-sm sm:text-base text-gray-300">
                        {t.services.greenCardCard.text2}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-[#FCD671]">
                        {t.services.greenCardCard.price}
                      </span>
                      <span className="text-gray-300">{t.services.greenCardCard.term}</span>
                    </div>
                    <div className="mt-5">
                      <a href={greenCardLink} className="btn w-full" role="button">
                        {t.services.greenCardCard.cta}
                      </a>
                    </div>
                  </div>
                </article>

                <article className="card overflow-hidden flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    {/* НЕ-LCP → quality=60 + sizes */}
                    <Image
                      src="/services/osago_rf_photo.webp"
                      alt={t.services.osagoCard.imageAlt}
                      width={600}
                      height={400}
                      quality={60}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="h-56 md:h-full w-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 bg-[#3A120A] text-white px-6 py-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2">
                        {t.services.osagoCard.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-100 mb-3">
                        {t.services.osagoCard.text1}
                      </p>
                      <p className="text-sm sm:text-base text-gray-300">
                        {t.services.osagoCard.text2}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-semibold text-[#FCD671]">
                        {t.services.osagoCard.price}
                      </span>
                      <span className="text-gray-300">{t.services.osagoCard.term}</span>
                    </div>
                    <div className="mt-5">
                      <a href={osagoLink} className="btn w-full" role="button">
                        {t.services.osagoCard.cta}
                      </a>
                    </div>
                  </div>
                </article>
              </div>

              <ServicesCarousel
                heading={t.services.otherHeading}
                moreBtnText={t.services.moreBtn}
                items={otherServices}
              />
            </div>
          </section>

          {/* BROKER */}
          <section
            className="py-12 sm:py-16 bg-[#F4F6FA]"
            aria-labelledby="about-broker-heading"
          >
            <div className="max-w-6xl mx-auto px-4">
              <BrokerSection broker={t.broker} />
            </div>
          </section>

          {/* CONTACT FORM */}
          <section className="py-12 sm:py-16 bg-[#F4F6FA]">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-start">
                <div className="flex flex-col justify-end items-center lg:items-center h-full">
                  {/* НЕ-LCP → quality=60 + sizes */}
                  <Image
                    src="/director-borovoy.webp"
                    alt={t.contact.photoAlt}
                    width={500}
                    height={900}
                    quality={60}
                    loading="lazy"
                    sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                    className="w-72 sm:w-80 lg:w-96 h-auto object-contain"
                  />
                </div>

                <ContactForm
                  t={t}
                  agreement={agreement}
                  onOpenAgreement={() => setIsAgreementOpen(true)}
                  onResult={handleFormResult}
                  onNeedRecaptcha={enableRecaptcha}
                  recaptchaSiteKey={recaptchaSiteKey}
                />
              </div>
            </div>
          </section>
        </DeferredHydration>
      </main>

      {/* MODAL: STATUS */}
      <StatusModal
        open={statusOpen}
        kind={statusKind}
        titleSuccess={t.contact.modalSuccessTitle}
        titleError={t.contact.modalErrorTitle}
        closeText={t.contact.modalClose}
        message={statusMessage}
        onClose={() => setStatusOpen(false)}
      />

      {/* MODAL: AGREEMENT */}
      <AgreementModal
        open={isAgreementOpen}
        agreement={agreement}
        onClose={() => setIsAgreementOpen(false)}
      />
    </>
  );
}
