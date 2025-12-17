// app/[lang]/osago-rf/page.tsx
"use client";

import { useParams } from "next/navigation";
import type { Lang } from "@/dictionaries/header";
import Image from "next/image";
import Script from "next/script";
import { useState, type ChangeEvent, type FormEvent } from "react";

import { getHomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary } from "@/dictionaries/agreement";

import { OsagoOrderForm } from "@/components/OsagoRfOrderForm";
import { getOsagoRfFormDictionary } from "@/dictionaries/osagoRfForm";
import {
  getOsagoRfPageDictionary,
  type OsagoRfPageDictionary,
} from "@/dictionaries/osagoRfPage";

import { BrokerSection } from "@/components/BrokerSection";

// -------------------- Типы --------------------

type HomeDictionary = ReturnType<typeof getHomeDictionary>;

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comment: string;
  agree: boolean;
  website: string; // honeypot
};

const initialContactFormData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  comment: "",
  agree: false,
  website: "",
};

type ContactApiResponse = {
  ok: boolean;
  message?: string;
};

// -------------------- Helpers --------------------

function normalizeLang(value: string): Lang {
  return value === "ru" || value === "kz" || value === "en" ? value : "ru";
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return `+${digits}`;
}

function formatEmail(raw: string): string {
  return raw.replace(/\s/g, "").replace(/[^a-zA-Z0-9@._\-+]/g, "");
}

// -------------------- FAQ --------------------

type FAQSectionProps = {
  dict: OsagoRfPageDictionary["faq"];
};

function FAQSection({ dict }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(dict.items[0]?.id ?? null);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F] text-center">
          {dict.title}
        </h2>
        <p className="mt-3 text-center text-gray-600">{dict.intro}</p>

        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-200">
          {dict.items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="gc-faq-item">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                >
                  <span className="font-semibold text-sm sm:text-base text-[#1A3A5F]">
                    {item.question}
                  </span>
                  <span className="ml-4 text-xl text-gray-400">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-sm sm:text-base text-gray-700">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -------------------- Page --------------------

export default function OsagoRfPage() {
  const { lang: rawLang } = useParams<{ lang: string }>();
  const lang = normalizeLang(rawLang);

  // ✅ убрали any
  const t: HomeDictionary = getHomeDictionary(lang);

  const agreement = getAgreementDictionary(lang);
  const osagoFormDict = getOsagoRfFormDictionary(lang);
  const osagoPageDict = getOsagoRfPageDictionary(lang);

  const [contactFormData, setContactFormData] =
    useState<ContactFormData>(initialContactFormData);

  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [formMessage, setFormMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  function handleContactInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const target = e.target;
    const name = target.name as keyof ContactFormData;

    let newValue: ContactFormData[keyof ContactFormData];

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      newValue = target.checked;
    } else {
      newValue = target.value;
    }

    if (name === "phone") newValue = formatPhone(String(newValue));
    if (name === "email") newValue = formatEmail(String(newValue));

    setContactFormData((prev) => ({ ...prev, [name]: newValue }));
  }

  async function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setFormStatus("loading");
    setFormMessage("");
    setIsModalOpen(false);

    try {
      // honeypot → бот, делаем вид, что всё ОК
      if (contactFormData.website.trim() !== "") {
        setFormStatus("success");
        setFormMessage(t.contact.statusSuccess);
        setContactFormData(initialContactFormData);
        setIsModalOpen(true);
        return;
      }

      let recaptchaToken: string | undefined;
      const isProd = process.env.NODE_ENV === "production";

      if (isProd && recaptchaSiteKey && typeof window !== "undefined") {
        const grecaptcha = window.grecaptcha;

        if (grecaptcha?.execute && grecaptcha?.ready) {
          recaptchaToken = await new Promise<string>((resolve, reject) => {
            grecaptcha.ready(() => {
              grecaptcha
                .execute(recaptchaSiteKey, { action: "contact" })
                .then(resolve)
                .catch(reject);
            });
          });
        }
      }

      // UTM + адрес страницы
      let utm: Record<string, string> = {};
      let pageUrl: string | undefined;

      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("utm_data");
          const parsed = raw ? (JSON.parse(raw) as unknown) : {};
          if (parsed && typeof parsed === "object") {
            utm = parsed as Record<string, string>;
          }
        } catch {
          utm = {};
        }

        pageUrl = window.location.href;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactFormData,
          recaptchaToken,
          context: "osago-rf-question",
          utm,
          pageUrl,
        }),
      });

      const data = (await res.json().catch(() => null)) as ContactApiResponse | null;

      if (!res.ok || !data?.ok) {
        setFormStatus("error");
        setFormMessage(data?.message || t.contact.statusError);
        setIsModalOpen(true);
        return;
      }

      setFormStatus("success");
      setFormMessage(t.contact.statusSuccess);
      setContactFormData(initialContactFormData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("OSAGO SUBMIT ERROR:", error);
      setFormStatus("error");
      setFormMessage(t.contact.statusError);
      setIsModalOpen(true);
    }
  }

  const greenCardLink = `/${lang}/green-card`;
  const orderAnchor = "#osago-rf-order";

  return (
    <>
      {recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      )}

      <main className="min-h-screen bg-white">
        {/* HERO ОСАГО РФ */}
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
                    src="/osago-rf/hero-car_1.webp"
                    alt={osagoPageDict.hero.carAlt}
                    width={620}
                    height={320}
                    className="absolute bottom-[-120px] left-0 w-full h-auto"
                  />
                  <Image
                    src="/osago-rf/policy-large.webp"
                    alt={osagoPageDict.hero.policyAlt}
                    width={160}
                    height={160}
                    className="gc-hero-policy"
                  />
                  <Image
                    src="/dionis-crkl.webp"
                    alt={osagoPageDict.hero.logoAlt}
                    width={110}
                    height={110}
                    className="gc-hero-logo-small"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* БЛОК: Крупная картинка + форма вопросов */}
        <section className="py-12 sm:py-16 bg-[#F4F6FA]">
          <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-10 items-start">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/osago-rf/policy-large.webp"
                alt={osagoPageDict.hero.policyAlt}
                width={520}
                height={360}
                className="w-full max-w-md lg:max-w-lg h-auto rounded-2xl shadow-lg"
              />
            </div>

            <div className="card w-full bg-white rounded-2xl px-6 sm:px-8 py-6 sm:py-8">
              <div className="mb-4 text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A3A5F]">
                  {osagoPageDict.questionBlock.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  {osagoPageDict.questionBlock.text1}
                </p>
                <p className="mt-3 text-xs text-gray-500">
                  {osagoPageDict.questionBlock.text2}
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <div className="hidden">
                  <label>
                    {t.contact.honeypotLabel}
                    <input
                      type="text"
                      name="website"
                      value={contactFormData.website}
                      onChange={handleContactInputChange}
                      autoComplete="off"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.contact.fields.firstName}{" "}
                      <span className="text-red-500">{t.contact.requiredMark}</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={contactFormData.firstName}
                      onChange={handleContactInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.contact.fields.lastName}{" "}
                      <span className="text-red-500">{t.contact.requiredMark}</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={contactFormData.lastName}
                      onChange={handleContactInputChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.contact.fields.email}{" "}
                    <span className="text-red-500">{t.contact.requiredMark}</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={contactFormData.email}
                    onChange={handleContactInputChange}
                    inputMode="email"
                    autoComplete="email"
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.contact.fields.phone}{" "}
                    <span className="text-red-500">{t.contact.requiredMark}</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactFormData.phone}
                    onChange={handleContactInputChange}
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
                    <span className="text-red-500">{t.contact.requiredMark}</span>
                  </label>
                  <textarea
                    name="comment"
                    rows={4}
                    value={contactFormData.comment}
                    onChange={handleContactInputChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A] resize-y"
                    required
                  />
                </div>

                <div className="flex items-start gap-2 text-xs text-gray-600">
                  <input
                    id="agree"
                    type="checkbox"
                    name="agree"
                    checked={contactFormData.agree}
                    onChange={handleContactInputChange}
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
                    <span className="text-red-500"> {t.contact.requiredMark}</span>
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
                  <button type="submit" className="btn w-full" disabled={formStatus === "loading"}>
                    {formStatus === "loading" ? t.contact.submitLoading : t.contact.submitDefault}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ПРЕИМУЩЕСТВА */}
        <section className="border-t border-gray-200 bg-[#F7F7F7] py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F] text-center">
              {osagoPageDict.advantages.title}
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
              {osagoPageDict.advantages.items.map((item) => (
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
                  <p className="mt-3 text-sm text-gray-600 text-center">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INFO */}
        <section className="py-10 sm:py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 space-y-4 text-sm sm:text-base text-gray-700">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F] text-center mb-4">
              {osagoPageDict.info.title}
            </h2>
            {osagoPageDict.info.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </section>

        {/* BENEFITS */}
        <section className="py-10 sm:py-12 bg-[#F5F7FA]">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F] text-center mb-4">
              {osagoPageDict.benefits.title}
            </h2>
            <ul className="list-disc pl-6 space-y-3 text-sm sm:text-base text-gray-700">
              {osagoPageDict.benefits.items.map((item) => (
                <li key={item.title}>
                  <strong className="block text-[#1A3A5F]">{item.title}</strong>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

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
                  className="h-40 md:h-full w-full object-cover"
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

        {/* Форма заявки */}
        <OsagoOrderForm dict={osagoFormDict} />

        {/* BROKER */}
        <BrokerSection broker={t.broker} />
      </main>

      {/* MODAL STATUS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
            <h3 className="text-lg font-semibold text-[#1A3A5F] mb-3">
              {formStatus === "success" ? t.contact.modalSuccessTitle : t.contact.modalErrorTitle}
            </h3>
            <p className="text-sm text-gray-700 mb-5">{formMessage}</p>
            <button type="button" className="btn w-full" onClick={() => setIsModalOpen(false)}>
              {t.contact.modalClose}
            </button>
          </div>
        </div>
      )}

      {isAgreementOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-[#1A3A5F] mb-4">{agreement.title}</h3>

            <div className="text-sm text-gray-700 space-y-4">
              <p>{agreement.intro1}</p>

              <p>{agreement.personalDataDefinition}</p>

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

              <h4 className="font-semibold text-[#1A3A5F] mt-4">{agreement.contactsTitle}</h4>
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
                  setContactFormData((prev) => ({ ...prev, agree: true }));
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
