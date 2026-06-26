// app/components/ContactForm.tsx
"use client";

import React, { useState, type ChangeEvent, type FormEvent } from "react";
import type { AgreementDictionary } from "@/dictionaries/agreement";
import type { HomeDictionary } from "@/dictionaries/home";

export type ContactFormResult = {
  kind: "success" | "error";
  message: string;
};

// ✅ Тип контактного блока (вырезка из HomeDictionary)
export type ContactBlock = HomeDictionary["contact"];

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  comment: string;
  agree: boolean;
  website: string; // honeypot
};

type Props = {
  t: ContactBlock;

  agreement: AgreementDictionary;
  onOpenAgreement: () => void;
  onResult: (result: ContactFormResult) => void;

  context?: string;
  submitUrl?: string;
  recaptchaAction?: string;
};

const initialData: FormData = {
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

function safeReadUtmFromLocalStorage(): Record<string, string> {
  try {
    const raw = localStorage.getItem("utm_data");
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    return parsed as Record<string, string>;
  } catch {
    return {};
  }
}

type ContactApiResponse = { ok: boolean; message?: string };

export default function ContactForm({
  t,
  agreement,
  onOpenAgreement,
  onResult,
  context = "site-contact",
  submitUrl = "/api/contact",
  recaptchaAction = "contact",
}: Props) {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target;
    const name = target.name as keyof FormData;

    let value: FormData[keyof FormData];

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
    if (formStatus === "loading") return;

    setFormStatus("loading");
    setFormMessage("");

    try {
      // honeypot → бот, делаем вид, что всё ок
      if (formData.website.trim() !== "") {
        setFormStatus("success");
        setFormMessage(t.statusSuccess);
        setFormData(initialData);
        onResult({ kind: "success", message: t.statusSuccess });
        return;
      }

      // reCAPTCHA v3 (как в образце OsagoRfQuestionForm)
      let recaptchaToken: string | undefined;
      const isProd = process.env.NODE_ENV === "production";

      if (isProd && recaptchaSiteKey && typeof window !== "undefined") {
        const grecaptcha = window.grecaptcha;
        if (grecaptcha?.ready && grecaptcha?.execute) {
          recaptchaToken = await new Promise<string>((resolve, reject) => {
            grecaptcha.ready(() => {
              grecaptcha
                .execute(recaptchaSiteKey, { action: recaptchaAction })
                .then(resolve)
                .catch(reject);
            });
          });
        }
      }

      // UTM + URL страницы
      const utm = typeof window !== "undefined" ? safeReadUtmFromLocalStorage() : {};
      const pageUrl = typeof window !== "undefined" ? window.location.href : undefined;

      const res = await fetch(submitUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
          context,
          utm,
          pageUrl,
        }),
      });

      const data = (await res.json().catch(() => null)) as ContactApiResponse | null;

      if (!res.ok || !data?.ok) {
        const msg = data?.message || t.statusError;
        setFormStatus("error");
        setFormMessage(msg);
        onResult({ kind: "error", message: msg });
        return;
      }

      setFormStatus("success");
      setFormMessage(t.statusSuccess);
      setFormData(initialData);
      onResult({ kind: "success", message: t.statusSuccess });
    } catch (err) {
      console.error("ContactForm submit error:", err);
      setFormStatus("error");
      setFormMessage(t.statusError);
      onResult({ kind: "error", message: t.statusError });
    }
  }

  return (
    <div className="qf-card">
      <div className="qf-head">
        <h2 className="qf-title">{t.sectionTitle}</h2>
        <p className="qf-p">{t.sectionSubtitle}</p>
      </div>

      <form className="qf-form" onSubmit={handleSubmit} noValidate>
        {/* honeypot */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label>
            {t.honeypotLabel}
            <input
              type="text"
              name="website"
              aria-label={t.honeypotLabel}
              value={formData.website}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
            />
          </label>
        </div>

        <div className="qf-grid2">
          <div>
            <label className="qf-label">
              {t.fields.firstName} <span className="req">{t.requiredMark}</span>
            </label>
            <input
              type="text"
              name="firstName"
              aria-label={t.fields.firstName}
              value={formData.firstName}
              onChange={handleChange}
              className="field"
              autoComplete="given-name"
              required
            />
          </div>

          <div>
            <label className="qf-label">
              {t.fields.lastName} <span className="req">{t.requiredMark}</span>
            </label>
            <input
              type="text"
              name="lastName"
              aria-label={t.fields.lastName}
              value={formData.lastName}
              onChange={handleChange}
              className="field"
              autoComplete="family-name"
              required
            />
          </div>
        </div>

        <div>
          <label className="qf-label">
            {t.fields.email} <span className="req">{t.requiredMark}</span>
          </label>
          <input
            type="email"
            name="email"
            aria-label={t.fields.email}
            value={formData.email}
            onChange={handleChange}
            inputMode="email"
            autoComplete="email"
            pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
            className="field"
            required
          />
        </div>

        <div>
          <label className="qf-label">
            {t.fields.phone} <span className="req">{t.requiredMark}</span>
          </label>
          <input
            type="tel"
            name="phone"
            aria-label={t.fields.phone}
            value={formData.phone}
            onChange={handleChange}
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 777 1234567"
            className="field"
            required
          />
        </div>

        <div>
          <label className="qf-label">
            {t.fields.comment} <span className="req">{t.requiredMark}</span>
          </label>
          <textarea
            name="comment"
            aria-label={t.fields.comment}
            rows={4}
            value={formData.comment}
            onChange={handleChange}
            className="field"
            style={{ resize: "vertical" }}
            required
          />
        </div>

        <div className="qf-agree">
          <input
            id="agree"
            type="checkbox"
            name="agree"
            aria-label={`${t.agreePrefix} ${t.agreeLink} ${t.agreeSuffix}`}
            checked={formData.agree}
            onChange={handleChange}
            required
          />
          <label htmlFor="agree">
            {t.agreePrefix}{" "}
            <button
              type="button"
              onClick={onOpenAgreement}
              className="qf-link"
              aria-haspopup="dialog"
              aria-label={`${t.agreeLink} — ${agreement.title}`}
            >
              {t.agreeLink}
            </button>
            {t.agreeSuffix} <span className="req">{t.requiredMark}</span>
          </label>
        </div>

        {formStatus !== "idle" ? (
          <div className={formStatus === "success" ? "qf-status-ok" : "qf-status-err"}>{formMessage}</div>
        ) : null}

        <div style={{ paddingTop: 6 }}>
          <button type="submit" className="btn btn-secondary" style={{ width: "100%" }} disabled={formStatus === "loading"}>
            {formStatus === "loading" ? t.submitLoading : t.submitDefault}
          </button>
        </div>
      </form>
    </div>
  );
}