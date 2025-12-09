// app/[lang]/green-card/page.tsx
"use client";

import { useParams } from "next/navigation";
import type { Lang } from "@/dictionaries/header";
import Image from "next/image";
import Script from "next/script";
import {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";

import { getHomeDictionary } from "@/dictionaries/home";
import { getAgreementDictionary } from "@/dictionaries/agreement";
import { GreenCardOrderForm } from "@/components/GreenCardOrderForm";
import { getGreenCardFormDictionary } from "@/dictionaries/greenCardForm";
import {
  getGreenCardPageDictionary,
  type GreenCardPageDictionary,
} from "@/dictionaries/greenCardPage";
import { BrokerSection } from "@/components/BrokerSection";

// ----- Контактная форма (как на главной) -----

const initialContactFormData = {
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

// ----- Калькулятор Green Card -----

type RegionKey = "group1" | "group2";
type VehicleKey =
  | "passenger"
  | "bus"
  | "truck"
  | "trailer"
  | "motorcycle"
  | "tractor";

const RATES_USD: Record<
  RegionKey,
  Record<VehicleKey, Record<"1" | "3" | "6" | "12", number>>
> = {
  group1: {
    passenger: { 1: 16, 3: 39, 6: 78, 12: 141 },
    bus: { 1: 146, 3: 372, 6: 556, 12: 1055 },
    truck: { 1: 65, 3: 87, 6: 194, 12: 362 },
    trailer: { 1: 6, 3: 10, 6: 39, 12: 65 },
    motorcycle: { 1: 13, 3: 32, 6: 52, 12: 78 },
    tractor: { 1: 23, 3: 49, 6: 74, 12: 97 },
  },
  group2: {
    passenger: { 1: 55, 3: 126, 6: 239, 12: 453 },
    bus: { 1: 237, 3: 495, 6: 855, 12: 1546 },
    truck: { 1: 116, 3: 343, 6: 647, 12: 971 },
    trailer: { 1: 16, 3: 42, 6: 72, 12: 91 },
    motorcycle: { 1: 42, 3: 92, 6: 132, 12: 173 },
    tractor: { 1: 45, 3: 102, 6: 146, 12: 190 },
  },
};

function formatKzt(value: number): string {
  try {
    return Number(value).toLocaleString("ru-RU");
  } catch {
    return String(Math.round(value));
  }
}

type GreenCardCalculatorProps = {
  dict: GreenCardPageDictionary["calculator"];
};

function GreenCardCalculator({ dict }: GreenCardCalculatorProps) {
  const [region, setRegion] = useState<RegionKey>("group1");
  const [vehicle, setVehicle] = useState<VehicleKey>("passenger");
  const [period, setPeriod] = useState<"1" | "3" | "6" | "12">("12");
  const [rate, setRate] = useState<string>("");
  const [autoRateNote, setAutoRateNote] = useState<string>("");
  const [result, setResult] = useState<string>("");

  // авто-подстановка курса из НБРК
  useEffect(() => {
    async function autoFillKztRate() {
      try {
        const resp = await fetch("/api/nbk-rate", { cache: "no-store" });
        const data = await resp.json();

        if (!resp.ok || !data?.ok || !data?.rate) {
          throw new Error(data?.message || "NBK API returned error");
        }

        const parsed = Number(data.rate);
        if (!parsed || Number.isNaN(parsed) || parsed <= 0) {
          throw new Error(`Invalid rate: ${data.rate}`);
        }

        setRate(parsed.toFixed(2));
        setAutoRateNote(dict.autoRateOk);
      } catch (e) {
        console.warn("NBK rate auto-fill failed:", e);
        setAutoRateNote(dict.autoRateError);
      }
    }

    autoFillKztRate();
  }, [dict.autoRateOk, dict.autoRateError]);

  function handleCalculate() {
    const priceUsd = RATES_USD[region][vehicle][period];
    const kztRate = parseFloat(rate.replace(",", "."));

    if (!kztRate || isNaN(kztRate) || kztRate <= 0) {
      setResult(dict.errorInvalidRate);
      return;
    }

    const priceKzt = priceUsd * kztRate;
    setResult(
      `${dict.resultPrefix} ${priceUsd}$ ${dict.resultApprox} ${formatKzt(
        priceKzt
      )}₸`
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-[#F4F6FA]">
      <div className="gc-calculator" id="green-card-calculator">
        <h3>{dict.title}</h3>

        <div className="gc-row">
          <label htmlFor="gc-region">{dict.labels.region}</label>
          <select
            id="gc-region"
            value={region}
            onChange={(e) => setRegion(e.target.value as RegionKey)}
          >
            <option value="group1">{dict.regionOptions.group1}</option>
            <option value="group2">{dict.regionOptions.group2}</option>
          </select>
        </div>

        <div className="gc-row">
          <label htmlFor="gc-vehicle">{dict.labels.vehicle}</label>
          <select
            id="gc-vehicle"
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value as VehicleKey)}
          >
            <option value="passenger">{dict.vehicleOptions.passenger}</option>
            <option value="bus">{dict.vehicleOptions.bus}</option>
            <option value="truck">{dict.vehicleOptions.truck}</option>
            <option value="trailer">{dict.vehicleOptions.trailer}</option>
            <option value="motorcycle">
              {dict.vehicleOptions.motorcycle}
            </option>
            <option value="tractor">{dict.vehicleOptions.tractor}</option>
          </select>
        </div>

        <div className="gc-row">
          <label htmlFor="gc-period">{dict.labels.period}</label>
          <select
            id="gc-period"
            value={period}
            onChange={(e) =>
              setPeriod(e.target.value as "1" | "3" | "6" | "12")
            }
          >
            <option value="12">{dict.periodOptions["12"]}</option>
            <option value="6">{dict.periodOptions["6"]}</option>
            <option value="3">{dict.periodOptions["3"]}</option>
            <option value="1">{dict.periodOptions["1"]}</option>
          </select>
        </div>

        <div className="gc-row">
          <label htmlFor="gc-exchangeRate">{dict.labels.rate}</label>
          <input
            id="gc-exchangeRate"
            type="number"
            min={1}
            step="0.01"
            inputMode="decimal"
            placeholder={dict.ratePlaceholder}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className="gc-note" aria-live="polite">
          {autoRateNote}
        </div>

        <button type="button" className="gc-btn" onClick={handleCalculate}>
          {dict.calcButton}
        </button>

        <div className="gc-result" id="gc-result">
          {result}
        </div>
      </div>
    </section>
  );
}

// ----- FAQ -----

type FAQSectionProps = {
  dict: GreenCardPageDictionary["faq"];
};

function FAQSection({ dict }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(
    dict.items[0]?.id ?? null
  );

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
                  onClick={() =>
                    setOpenId((prev) => (prev === item.id ? null : item.id))
                  }
                >
                  <span className="font-semibold text-sm sm:text-base text-[#1A3A5F]">
                    {item.question}
                  </span>
                  <span className="ml-4 text-xl text-gray-400">
                    {isOpen ? "−" : "+"}
                  </span>
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

// ----- Страница Green Card -----

export default function GreenCardPage() {
  const { lang: rawLang } = useParams<{ lang: string }>();
  const lang = normalizeLang(rawLang);
  const t = getHomeDictionary(lang) as any;
  const agreement = getAgreementDictionary(lang);
  const gcFormDict = getGreenCardFormDictionary(lang);
  const gcPageDict = getGreenCardPageDictionary(lang);

  // контактная форма (вопросы по ЗК)
  const [contactFormData, setContactFormData] = useState(
    initialContactFormData
  );
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formMessage, setFormMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  function handleContactInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const target = e.target;
    const { name, value } = target;

    let newValue: string | boolean = value;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      newValue = target.checked;
    }

    if (name === "phone") newValue = formatPhone(String(value));
    if (name === "email") newValue = formatEmail(String(value));

    setContactFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  }

  async function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setFormStatus("loading");
    setFormMessage("");
    setIsModalOpen(false);

    try {
      // honeypot → бот, просто считаем всё ок
      if (contactFormData.website && contactFormData.website.trim() !== "") {
        setFormStatus("success");
        setFormMessage(t.contact.statusSuccess);
        setContactFormData(initialContactFormData);
        setIsModalOpen(true);
        return;
      }

      let recaptchaToken: string | undefined = undefined;
      const isProd = process.env.NODE_ENV === "production";

      if (isProd && recaptchaSiteKey && typeof window !== "undefined") {
        const grecaptcha = (window as any).grecaptcha;

        if (grecaptcha?.execute && grecaptcha?.ready) {
          recaptchaToken = await new Promise<string>((resolve, reject) => {
            grecaptcha.ready(() => {
              grecaptcha
                .execute(recaptchaSiteKey, { action: "contact" })
                .then((token: string) => resolve(token))
                .catch(reject);
            });
          });
        }
      }

      // 🔹 Читаем UTM и текущий URL
      let utm: Record<string, string> = {};
      let pageUrl: string | undefined = undefined;

      if (typeof window !== "undefined") {
        try {
          utm = JSON.parse(localStorage.getItem("utm_data") || "{}");
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
          context: "green-card-question",
          utm,       // 🔹 UTM-метки
          pageUrl,   // 🔹 адрес страницы
        }),
      });

      const data = await res.json().catch(() => null);
      console.log("GC CONTACT RESPONSE:", res.status, data);

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
      console.error("GC SUBMIT ERROR:", error);
      setFormStatus("error");
      setFormMessage(t.contact.statusError);
      setIsModalOpen(true);
    }
  }



  const osagoLink = `/${lang}/osago-rf`;
  const orderAnchor = "#green-card-order";

  return (
    <>
      {recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      )}

      <main className="min-h-screen bg-white">
        {/* HERO GREEN CARD */}
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
              {/* Мобильная версия — можно добавить картинку позже */}
              <div className="w-full max-w-xs sm:max-w-sm lg:hidden" />

              {/* Десктоп — авто + полис + маленькое лого */}
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

        {/* БЛОК: Крупная картинка + форма вопросов */}
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

            <div className="card w-full bg-white rounded-2xl px-6 sm:px-8 py-6 sm:py-8">
              <div className="mb-4 text-center">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1A3A5F]">
                  {gcPageDict.questionBlock.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  {gcPageDict.questionBlock.text1}
                </p>
                <p className="mt-3 text-xs text-gray-500">
                  {gcPageDict.questionBlock.text2}
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
                      <span className="text-red-500">
                        {t.contact.requiredMark}
                      </span>
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
                      <span className="text-red-500">
                        {t.contact.requiredMark}
                      </span>
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
                    <span className="text-red-500">
                      {t.contact.requiredMark}
                    </span>
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
                    <span className="text-red-500">
                      {t.contact.requiredMark}
                    </span>
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
                    <span className="text-red-500">
                      {t.contact.requiredMark}
                    </span>
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
        </section>

        {/* ПРЕИМУЩЕСТВА (4 карточки) */}
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

        {/* КАЛЬКУЛЯТОР GREEN CARD */}
        <GreenCardCalculator dict={gcPageDict.calculator} />

        {/* Форма заявки на полис */}
        <GreenCardOrderForm dict={gcFormDict} />

        {/* ДОПРОДАЖА ОСАГО РФ */}
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
                  <a
                    href={osagoLink}
                    className="btn w-full sm:w-auto"
                    role="button"
                  >
                    {gcPageDict.osagoUpsell.btn}
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection dict={gcPageDict.faq} />

        {/* BROKER BLOCK */}
        <BrokerSection broker={t.broker} />
      </main>

      {/* MODAL STATUS для контактной формы */}
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
                {agreement.purposesList.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p>{agreement.consentText}</p>

              <h4 className="font-semibold text-[#1A3A5F] mt-4">
                {agreement.contactsTitle}
              </h4>
              <ul className="list-disc pl-6 space-y-1">
                {agreement.contactsList.map((item: string) => (
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
