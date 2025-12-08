// app/[lang]/page.tsx
"use client";

import { useParams } from "next/navigation";
import type { Lang } from "@/dictionaries/header";
import Image from "next/image";
import Script from "next/script";
import { useRef, useState } from "react";

import { getHomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary } from "@/dictionaries/agreement";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  comment: "",
  agree: false,
  website: "", // honeypot
};

function normalizeLang(value: string): Lang {
  if (value === "ru" || value === "kz" || value === "en") return value;
  return "ru";
}

// Маска телефона
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return "+" + digits;
}

// Фильтр e-mail
function formatEmail(raw: string): string {
  return raw.replace(/\s/g, "").replace(/[^a-zA-Z0-9@._\-+]/g, "");
}

export default function HomePage() {
  const { lang: rawLang } = useParams<{ lang: string }>();
  const lang = normalizeLang(rawLang);
  const t = getHomeDictionary(lang);
  const agreement = getAgreementDictionary(lang);

  const servicesScrollRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState(initialFormData);

  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [formMessage, setFormMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const scrollServices = (direction: "left" | "right") => {
    if (!servicesScrollRef.current) return;

    const firstCard = servicesScrollRef.current.querySelector<HTMLDivElement>(
      "[data-service-card]"
    );

    const cardWidth = firstCard?.clientWidth ?? 320;

    servicesScrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value } = target;

    let newValue: string | boolean = value;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      newValue = target.checked;
    }

    if (name === "phone") newValue = formatPhone(String(value));
    if (name === "email") newValue = formatEmail(String(value));

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleContactSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setFormStatus("loading");
    setFormMessage("");
    setIsModalOpen(false);

    try {
      if (formData.website && formData.website.trim() !== "") {
        setFormStatus("success");
        setFormMessage(t.contact.statusSuccess);
        setFormData(initialFormData);
        setIsModalOpen(true);
        return;
      }

      let recaptchaToken: string | undefined = undefined;
      const isProd = process.env.NODE_ENV === "production";

      if (isProd && recaptchaSiteKey && typeof window !== "undefined") {
        const grecaptcha = (window as any).grecaptcha;
        if (grecaptcha?.execute) {
          await grecaptcha.ready();
          recaptchaToken = await grecaptcha.execute(recaptchaSiteKey, {
            action: "contact",
          });
        }
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await res.json().catch(() => null);
      console.log("CONTACT RESPONSE:", res.status, data);

      if (!res.ok || !data?.ok) {
        setFormStatus("error");
        setFormMessage(
          data?.message || t.contact.statusError
        );
        setIsModalOpen(true);
        return;
      }

      setFormStatus("success");
      setFormMessage(t.contact.statusSuccess);
      setFormData(initialFormData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("SUBMIT ERROR:", error);
      setFormStatus("error");
      setFormMessage(t.contact.statusError);
      setIsModalOpen(true);
    }
  };

  const otherServices = t.services.otherServices.map((service) => ({
    ...service,
    link: `/${lang}${service.linkSuffix}`,
  }));

  const greenCardLink = `/${lang}/green-card`;
  const osagoLink = `/${lang}/osago-rf`;
  const productsLink = `/${lang}/products`;
  const blogLink = `/${lang}/blog`;
  const homeLink = `/${lang}`;

  return (
    <>
      {recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      )}

      <main className="min-h-screen bg-white">
        {/* HERO */}
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
              <Image
                src="/dionis-crkl.webp"
                alt={t.hero.heroAlt}
                width={420}
                height={420}
                priority
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 420px" /*Здесь*/
                className="hero-logo w-56 sm:w-72 lg:w-[420px] xl:w-[480px] h-auto drop-shadow-xl"
              />

            </div>
          </div>
        </section>

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
              {/* 4 карточки — иконки оставил такие же */}
              <article className="card flex flex-col items-center px-5 py-5 sm:py-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F7F7]">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="none"
                    stroke="#C89F4A"
                    strokeWidth="1.8"
                  >
                    <path d="M12 3.1 5 5.4v6.1c0 4 2.8 7.3 7 8.4 4.2-1.1 7-4.4 7-8.4V5.4L12 3.1z" />
                    <path d="M9.5 12.5 11 14l3.5-3.5" />
                  </svg>
                </div>
                <div className="text-2xl font-extrabold text-[#1A3A5F]">
                  {t.benefits.cards[0].value}
                </div>
                <div className="mt-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  {t.benefits.cards[0].label}
                </div>
                <p className="mt-3 text-sm text-gray-600 text-center">
                  {t.benefits.cards[0].text}
                </p>
              </article>

              <article className="card flex flex-col items-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="none"
                    stroke="#C89F4A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2 L14 6 L10 6 Z" />
                    <path d="M10 6 L10 14 L14 14 L14 6 Z" />
                    <path d="M8 8 L8 14 L10 14" />
                    <path d="M16 8 L16 14 L14 14" />
                    <path d="M10 14 C10 17, 14 17, 14 14" />
                    <path d="M11 17 L12 20 L13 17" />
                  </svg>
                </div>
                <div className="text-2xl font-extrabold text-[#1A3A5F]">
                  {t.benefits.cards[1].value}
                </div>
                <div className="mt-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  {t.benefits.cards[1].label}
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {t.benefits.cards[1].text}
                </p>
              </article>

              <article className="card flex flex-col items-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="none"
                    stroke="#C89F4A"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="8" />
                    <ellipse cx="12" cy="12" rx="3.5" ry="8" />
                    <path d="M4 12h16M6 8h12M6 16h12" />
                  </svg>
                </div>
                <div className="text-2xl font-extrabold text-[#1A3A5F]">
                  {t.benefits.cards[2].value}
                </div>
                <div className="mt-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  {t.benefits.cards[2].label}
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {t.benefits.cards[2].text}
                </p>
              </article>

              <article className="card flex flex-col items-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-7 w-7"
                    fill="none"
                    stroke="#C89F4A"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 3L3 10.53l5.5 2.13L9 21l4-4 4.5 3.5L21 3z" />
                  </svg>
                </div>
                <div className="text-2xl font-extrabold text-[#1A3A5F]">
                  {t.benefits.cards[3].value}
                </div>
                <div className="mt-1 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                  {t.benefits.cards[3].label}
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {t.benefits.cards[3].text}
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* DIRECTOR BLOCK */}
        <section
          className="py-12 sm:py-16 bg-[#F4F6FA]"
          aria-labelledby="director-message-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 items-start relative">
              <div className="hidden lg:block absolute -top-10 right-0">
                <Image
                  src="/dionis-crkl.webp"
                  alt={t.director.logoAlt}
                  width={220}
                  height={220}
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
                  <Image
                    src="/director-signature.webp"
                    alt={t.director.signatureAlt}
                    width={200}
                    height={120}
                    className="director-signature"
                  />
                </div>
              </article>

              <div className="hidden lg:flex justify-center">
                <Image
                  src="/director-borovoy.webp"
                  alt={t.director.photoAlt}
                  width={360}
                  height={520}
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
                <article
                  key={step.stepLabel}
                  className="card px-5 py-5 sm:py-6"
                >
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
              <a
                href={greenCardLink}
                role="button"
                aria-label={t.greenCardSteps.cta}
                className="btn"
              >
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
                <span className="text-[#1A3A5F]">
                  {t.services.titlePart1}
                </span>
                <span className="text-[#C89F4A]">
                  {t.services.titlePart2}
                </span>
              </h2>
              <div className="mt-2 h-1 w-16 bg-[#C89F4A]" />
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-10">
              {/* Green Card card */}
              <article className="card overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <Image
                    src="/services/zk_photo.webp"
                    alt={t.services.greenCardCard.imageAlt}
                    width={600}
                    height={400}
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
                    <span className="text-gray-300">
                      {t.services.greenCardCard.term}
                    </span>
                  </div>
                  <div className="mt-5">
                    <a href={greenCardLink} className="btn w-full" role="button">
                      {t.services.greenCardCard.cta}
                    </a>
                  </div>
                </div>
              </article>

              {/* OSAGO card */}
              <article className="card overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <Image
                    src="/services/osago_rf_photo.webp"
                    alt={t.services.osagoCard.imageAlt}
                    width={600}
                    height={400}
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
                    <span className="text-gray-300">
                      {t.services.osagoCard.term}
                    </span>
                  </div>
                  <div className="mt-5">
                    <a href={osagoLink} className="btn w-full" role="button">
                      {t.services.osagoCard.cta}
                    </a>
                  </div>
                </div>
              </article>
            </div>

            {/* Other services header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-[#1A3A5F]">
                {t.services.otherHeading}
              </h3>
              <div className="hidden lg:flex gap-2">
                <button
                  type="button"
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[#1A3A5F] hover:bg-gray-100 transition"
                  onClick={() => scrollServices("left")}
                  aria-label="Прокрутить услуги влево"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-[#1A3A5F] hover:bg-gray-100 transition"
                  onClick={() => scrollServices("right")}
                  aria-label="Прокрутить услуги вправо"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Desktop carousel */}
            <div
              ref={servicesScrollRef}
              className="hidden lg:flex gap-6 overflow-x-auto scrollbar-hide pb-2"
            >
              {otherServices.map((service) => (
                <article
                  key={service.key}
                  data-service-card
                  className="card min-w-[260px] max-w-[260px] flex-shrink-0 flex flex-col"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="px-5 py-4 flex flex-col flex-1">
                    <h4 className="text-sm font-semibold text-[#1A3A5F] mb-2">
                      {service.title}
                    </h4>
                    <ul className="text-sm text-gray-700 mb-4 list-disc pl-4 space-y-1">
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <a href={service.link} className="btn w-full text-center">
                        {t.services.moreBtn}
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile list */}
            <div className="grid gap-6 mt-4 lg:hidden">
              {otherServices.map((service) => (
                <article
                  key={service.key}
                  className="card flex flex-col overflow-hidden"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-lg">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="px-5 py-4 flex flex-col">
                    <h4 className="text-sm font-semibold text-[#1A3A5F] mb-2">
                      {service.title}
                    </h4>
                    <ul className="text-sm text-gray-700 mb-4 list-disc pl-4 space-y-1">
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <a href={service.link} className="btn w-full text-center">
                      {t.services.moreBtn}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* BROKER BLOCK */}
        <section
          className="py-12 sm:py-16 bg-[#F4F6FA]"
          aria-labelledby="about-broker-heading"
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 items-center">
              <div>
                <h2
                  id="about-broker-heading"
                  className="text-2xl sm:text-3xl font-bold leading-snug text-[#1A3A5F]"
                >
                  {t.broker.titlePrefix}
                  <span className="text-[#C89F4A]">
                    {t.broker.titleHighlight}
                  </span>
                  <br />
                  {t.broker.titleSuffix}
                </h2>

                <p className="mt-4 text-base sm:text-lg font-semibold text-[#1A3A5F]">
                  {t.broker.lead}
                </p>

                <p className="mt-4 text-sm sm:text-base text-gray-700">
                  {t.broker.paragraph1}
                </p>

                <ul className="mt-4 space-y-2 text-sm sm:text-base text-gray-700 list-disc pl-5">
                  {t.broker.bulletPoints.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="mt-4 text-sm sm:text-base text-gray-700">
                  {t.broker.paragraph2}
                </p>
              </div>

              <div className="flex justify-center lg:justify-end">
                <Image
                  src="/dionis-crkl.webp"
                  alt={t.broker.logoAlt}
                  width={340}
                  height={340}
                  className="w-48 sm:w-64 lg:w-[340px] h-auto drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section className="py-12 sm:py-16 bg-[#F4F6FA]">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-start">
              <div className="flex flex-col justify-end items-center lg:items-center h-full">
                <Image
                  src="/director-borovoy.webp"
                  alt={t.contact.photoAlt}
                  width={500}
                  height={900}
                  className="w-72 sm:w-80 lg:w-96 h-auto object-contain"
                />
              </div>

              <div className="card w-full bg-white shadow-md rounded-2xl px-6 sm:px-8 py-6 sm:py-8">
                <div className="mb-6 text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#1A3A5F]">
                    {t.contact.sectionTitle}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {t.contact.sectionSubtitle}
                  </p>
                </div>

                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div className="hidden">
                    <label>
                      {t.contact.honeypotLabel}
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleInputChange}
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.contact.fields.firstName}{" "}
                        <span className="text-red-500">
                          {t.contact.requiredMark}
                        </span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t.contact.fields.lastName}{" "}
                        <span className="text-red-500">
                          {t.contact.requiredMark}
                        </span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.contact.fields.email}{" "}
                      <span className="text-red-500">
                        {t.contact.requiredMark}
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      inputMode="email"
                      autoComplete="email"
                      pattern="^[^@\s]+@[^@\s]+\.[^@\s]+$"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.contact.fields.phone}{" "}
                      <span className="text-red-500">
                        {t.contact.requiredMark}
                      </span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+7 777 1234567"
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.contact.fields.comment}{" "}
                      <span className="text-red-500">
                        {t.contact.requiredMark}
                      </span>
                    </label>
                    <textarea
                      name="comment"
                      rows={4}
                      value={formData.comment}
                      onChange={handleInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A] resize-y"
                      required
                    />
                  </div>

                  <div className="flex items-start gap-2 text-xs text-gray-600">
                    <input
                      id="agree"
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleInputChange}
                      className="mt-0.5"
                      required
                    />
                    <label htmlFor="agree">
                      {t.contact.agreePrefix}{" "}
                      <button
                        type="button"
                        onClick={() => setIsAgreementOpen(true)}
                        className="text-[#C89F4A] underline underline-offset-2 hover:opacity-80"
                      >
                        {t.contact.agreeLink}
                      </button>
                      {t.contact.agreeSuffix}
                      <span className="text-red-500">
                        {" "}
                        {t.contact.requiredMark}
                      </span>
                    </label>
                  </div>

                  {formStatus !== "idle" && (
                    <div
                      className={
                        formStatus === "success"
                          ? "text-sm text-green-700"
                          : "text-sm text-red-600"
                      }
                    >
                      {formMessage}
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="btn w-full"
                      disabled={formStatus === "loading"}
                    >
                      {formStatus === "loading"
                        ? t.contact.submitLoading
                        : t.contact.submitDefault}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* MODAL STATUS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
            <h3 className="text-lg font-semibold text-[#1A3A5F] mb-3">
              {formStatus === "success"
                ? t.contact.modalSuccessTitle
                : t.contact.modalErrorTitle}
            </h3>
            <p className="text-sm text-gray-700 mb-5">{formMessage}</p>
            <button
              type="button"
              className="btn w-full"
              onClick={() => setIsModalOpen(false)}
            >
              {t.contact.modalClose}
            </button>
          </div>
        </div>
      )}

      {isAgreementOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#1A3A5F] mb-4">
              {agreement.title}
            </h3>

            <div className="text-sm text-gray-700 space-y-4">
              <p>{agreement.intro1}</p>

              <p>
                {agreement.personalDataDefinition}
              </p>

              <ul className="list-disc pl-6 space-y-1">
                <li>{agreement.dataList.firstName}</li>
                <li>{agreement.dataList.lastName}</li>
                <li>{agreement.dataList.email}</li>
                <li>{agreement.dataList.phone}</li>
                <li>{agreement.dataList.comment}</li>
              </ul>

              <p>{agreement.processingIntro}</p>
              <p>{agreement.purposesIntro}</p>

              <ul className="list-disc pl-6 space-y-1">
                {agreement.purposesList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p>{agreement.consentText}</p>

              <h4 className="font-semibold text-[#1A3A5F] mt-4">
                {agreement.contactsTitle}
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                {agreement.contactsList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-md border text-sm hover:bg-gray-100"
                onClick={() => setIsAgreementOpen(false)}
              >
                {agreement.closeBtn}
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, agree: true }));
                  setIsAgreementOpen(false);
                }}
              >
                {agreement.acceptBtn}
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
}
