// app/components/ContactForm.tsx
"use client";

import type { HomeDictionary } from "@/dictionaries/home";
import type { AgreementDictionary } from "@/dictionaries/agreement";
import { useState } from "react";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

export type ContactFormResult = {
  kind: "success" | "error";
  message: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comment: string;
  agree: boolean;
  website: string; // honeypot
};

const initialFormData: FormData = {
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
  if (!digits) return "";
  return "+" + digits;
}

function formatEmail(raw: string): string {
  return raw.replace(/\s/g, "").replace(/[^a-zA-Z0-9@._\-+]/g, "");
}

export default function ContactForm({
  t,
  agreement,
  onOpenAgreement,
  onResult,
}: {
  t: HomeDictionary;
  agreement: AgreementDictionary;
  onOpenAgreement: () => void;
  onResult: (result: ContactFormResult) => void;
}) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const target = e.target;
    const { name, value } = target;

    let newValue: string | boolean = value;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      newValue = target.checked;
    }

    if (name === "phone") newValue = formatPhone(String(value));
    if (name === "email") newValue = formatEmail(String(value));

    setFormData((prev) => ({ ...prev, [name]: newValue as never }));
  }

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setFormStatus("loading");
    setFormMessage("");

    try {
      // honeypot → бот, делаем вид, что всё ОК
      if (formData.website && formData.website.trim() !== "") {
        setFormStatus("success");
        setFormMessage(t.contact.statusSuccess);
        setFormData(initialFormData);
        onResult({ kind: "success", message: t.contact.statusSuccess });
        return;
      }

      let recaptchaToken: string | undefined;

      if (recaptchaSiteKey && typeof window !== "undefined") {
        const grecaptcha = (window as Window & { grecaptcha?: Grecaptcha }).grecaptcha;

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
          ...formData,
          recaptchaToken,
          context: "site-contact",
          utm,
          pageUrl,
        }),
      });

      const data: unknown = await res.json().catch(() => null);

      const ok = Boolean((data as { ok?: boolean } | null)?.ok);
      const message = (data as { message?: string } | null)?.message;

      if (!res.ok || !ok) {
        const msg = message || t.contact.statusError;
        setFormStatus("error");
        setFormMessage(msg);
        onResult({ kind: "error", message: msg });
        return;
      }

      setFormStatus("success");
      setFormMessage(t.contact.statusSuccess);
      setFormData(initialFormData);
      onResult({ kind: "success", message: t.contact.statusSuccess });
    } catch {
      setFormStatus("error");
      setFormMessage(t.contact.statusError);
      onResult({ kind: "error", message: t.contact.statusError });
    }
  }

  return (
    <div className="card w-full bg-white shadow-md rounded-2xl px-6 sm:px-8 py-6 sm:py-8">
      <div className="mb-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1A3A5F]">
          {t.contact.sectionTitle}
        </h2>
        <p className="mt-1 text-sm text-gray-600">{t.contact.sectionSubtitle}</p>
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
              <span className="text-red-500">{t.contact.requiredMark}</span>
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
              <span className="text-red-500">{t.contact.requiredMark}</span>
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
            <span className="text-red-500">{t.contact.requiredMark}</span>
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
            <span className="text-red-500">{t.contact.requiredMark}</span>
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
            <span className="text-red-500">{t.contact.requiredMark}</span>
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
              onClick={onOpenAgreement}
              className="text-[#C89F4A] underline underline-offset-2 hover:opacity-80"
            >
              {t.contact.agreeLink}
            </button>
            {t.contact.agreeSuffix}
            <span className="text-red-500"> {t.contact.requiredMark}</span>
          </label>
        </div>

        {formStatus !== "idle" && (
          <div className={formStatus === "success" ? "text-sm text-green-700" : "text-sm text-red-600"}>
            {formMessage}
          </div>
        )}

        <div className="pt-2">
          <button type="submit" className="btn w-full" disabled={formStatus === "loading"}>
            {formStatus === "loading" ? t.contact.submitLoading : t.contact.submitDefault}
          </button>
        </div>

        {/* agreement используется в отдельной модалке, тут он не нужен напрямую,
            но параметр я оставил, чтобы было очевидно откуда берется текст */}
        <input type="hidden" value={agreement.title} readOnly />
      </form>
    </div>
  );
}
