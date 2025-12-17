"use client";

import Script from "next/script";
import { useState, type ChangeEvent, type FormEvent } from "react";

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

type HomeContactDict = {
  fields: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    comment: string;
  };
  requiredMark: string;
  agreePrefix: string;
  agreeLink: string;
  agreeSuffix: string;
  statusSuccess: string;
  statusError: string;
  submitDefault: string;
  submitLoading: string;
  modalSuccessTitle: string;
  modalErrorTitle: string;
  modalClose: string;
  honeypotLabel: string;
};

type AgreementDict = {
  title: string;
  intro1: string;
  personalDataDefinition: string;
  dataList: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    comment: string;
  };
  processingIntro: string;
  purposesIntro: string;
  purposesList: string[];
  consentText: string;
  contactsTitle: string;
  contactsList: string[];
  closeBtn: string;
  acceptBtn: string;
};

type QuestionBlockDict = {
  title: string;
  text1: string;
  text2: string;
};

type Props = {
  homeContact: HomeContactDict;
  agreement: AgreementDict;
  dict: QuestionBlockDict;
};

const initialData: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  comment: "",
  agree: false,
  website: "",
};

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  return digits ? `+${digits}` : "";
}

function formatEmail(raw: string): string {
  return raw.replace(/\s/g, "").replace(/[^a-zA-Z0-9@._\-+]/g, "");
}

type ContactApiResponse = { ok: boolean; message?: string };

export default function GreenCardQuestionForm({ homeContact, agreement, dict }: Props) {
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target;
    const name = target.name as keyof ContactFormData;

    let value: ContactFormData[keyof ContactFormData];

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    } else {
      value = target.value;
    }

    if (name === "phone") value = formatPhone(String(value));
    if (name === "email") value = formatEmail(String(value));

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setFormStatus("loading");
    setFormMessage("");
    setIsModalOpen(false);

    try {
      // honeypot
      if (formData.website.trim() !== "") {
        setFormStatus("success");
        setFormMessage(homeContact.statusSuccess);
        setFormData(initialData);
        setIsModalOpen(true);
        return;
      }

      let recaptchaToken: string | undefined;
      const isProd = process.env.NODE_ENV === "production";

      if (isProd && recaptchaSiteKey) {
        const grecaptcha = window.grecaptcha;
        if (grecaptcha?.execute && grecaptcha?.ready) {
          recaptchaToken = await new Promise<string>((resolve, reject) => {
            grecaptcha.ready(() => {
              grecaptcha.execute(recaptchaSiteKey, { action: "contact" }).then(resolve).catch(reject);
            });
          });
        }
      }

      let utm: Record<string, string> = {};
      let pageUrl: string | undefined;

      try {
        const raw = localStorage.getItem("utm_data");
        const parsed = raw ? (JSON.parse(raw) as unknown) : {};
        if (parsed && typeof parsed === "object") utm = parsed as Record<string, string>;
      } catch {
        utm = {};
      }

      pageUrl = window.location.href;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
          context: "green-card-question",
          utm,
          pageUrl,
        }),
      });

      const data = (await res.json().catch(() => null)) as ContactApiResponse | null;

      if (!res.ok || !data?.ok) {
        setFormStatus("error");
        setFormMessage(data?.message || homeContact.statusError);
        setIsModalOpen(true);
        return;
      }

      setFormStatus("success");
      setFormMessage(homeContact.statusSuccess);
      setFormData(initialData);
      setIsModalOpen(true);
    } catch (err) {
      console.error("GreenCardQuestionForm submit error:", err);
      setFormStatus("error");
      setFormMessage(homeContact.statusError);
      setIsModalOpen(true);
    }
  }

  return (
    <>
      {recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      )}

      <div className="card w-full bg-white rounded-2xl px-6 sm:px-8 py-6 sm:py-8">
        <div className="mb-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1A3A5F]">{dict.title}</h2>
          <p className="mt-1 text-sm text-gray-600">{dict.text1}</p>
          <p className="mt-3 text-xs text-gray-500">{dict.text2}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="hidden">
            <label>
              {homeContact.honeypotLabel}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                autoComplete="off"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {homeContact.fields.firstName}{" "}
                <span className="text-red-500">{homeContact.requiredMark}</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {homeContact.fields.lastName}{" "}
                <span className="text-red-500">{homeContact.requiredMark}</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {homeContact.fields.email}{" "}
              <span className="text-red-500">{homeContact.requiredMark}</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              inputMode="email"
              autoComplete="email"
              pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {homeContact.fields.phone}{" "}
              <span className="text-red-500">{homeContact.requiredMark}</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 777 1234567"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {homeContact.fields.comment}{" "}
              <span className="text-red-500">{homeContact.requiredMark}</span>
            </label>
            <textarea
              name="comment"
              rows={4}
              value={formData.comment}
              onChange={handleChange}
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
              onChange={handleChange}
              className="mt-0.5"
              required
            />
            <label htmlFor="agree">
              {homeContact.agreePrefix}{" "}
              <button
                type="button"
                onClick={() => setIsAgreementOpen(true)}
                className="text-[#C89F4A] underline underline-offset-2 hover:opacity-80"
              >
                {homeContact.agreeLink}
              </button>
              {homeContact.agreeSuffix}
              <span className="text-red-500"> {homeContact.requiredMark}</span>
            </label>
          </div>

          {formStatus !== "idle" && (
            <div className={formStatus === "success" ? "text-sm text-green-700" : "text-sm text-red-600"}>
              {formMessage}
            </div>
          )}

          <div className="pt-2">
            <button type="submit" className="btn w-full" disabled={formStatus === "loading"}>
              {formStatus === "loading" ? homeContact.submitLoading : homeContact.submitDefault}
            </button>
          </div>
        </form>
      </div>

      {/* STATUS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center">
            <h3 className="text-lg font-semibold text-[#1A3A5F] mb-3">
              {formStatus === "success" ? homeContact.modalSuccessTitle : homeContact.modalErrorTitle}
            </h3>
            <p className="text-sm text-gray-700 mb-5">{formMessage}</p>
            <button type="button" className="btn w-full" onClick={() => setIsModalOpen(false)}>
              {homeContact.modalClose}
            </button>
          </div>
        </div>
      )}

      {/* AGREEMENT MODAL */}
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
