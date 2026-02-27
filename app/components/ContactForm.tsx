// app/components/ContactForm.tsx
"use client";

import React, { useId, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import type { AgreementDictionary } from "@/dictionaries/agreement";
import type { HomeDictionary } from "@/dictionaries/home";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};



export type ContactBlock = HomeDictionary["contact"];

export type ContactFormResult = { ok: true } | { ok: false; message?: string };

type ContactFormData = {
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

  context?: string;
  submitUrl?: string;
  recaptchaAction?: string;

  // ✅ управляет внешняя секция (ContactSection)
  recaptchaSiteKey?: string;
  onNeedRecaptcha?: () => void;

  // ✅ если хочешь — хук под аналитику
  onResult?: (r: ContactFormResult) => void;

  // ✅ если AgreementModal вынесен наружу — можно использовать это
  onOpenAgreement?: () => void;
};

type ContactApiResponse = { ok: boolean; message?: string };

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

function safeReadUtm(): Record<string, string> {
  try {
    const raw = localStorage.getItem("utm_data");
    const parsed = raw ? (JSON.parse(raw) as unknown) : {};
    if (parsed && typeof parsed === "object") return parsed as Record<string, string>;
    return {};
  } catch {
    return {};
  }
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function isGrecaptcha(x: unknown): x is Grecaptcha {
  const g = x as any;
  return !!g && typeof g.ready === "function" && typeof g.execute === "function";
}

// ждём появление grecaptcha + успешный ready()
async function waitForGrecaptchaReady(timeoutMs = 6000): Promise<Grecaptcha | null> {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    const candidate = typeof window !== "undefined" ? window.grecaptcha : undefined;

    if (isGrecaptcha(candidate)) {
      let ok = false;

      await new Promise<void>((resolve) => {
        try {
          candidate.ready(() => {
            ok = true;
            resolve();
          });
        } catch {
          resolve();
        }
      });

      if (ok) return candidate;
    }

    await sleep(120);
  }

  return null;
}

export default function ContactForm({
  t,
  agreement,
  context = "site-contact",
  submitUrl = "/api/contact",
  recaptchaAction = "contact",

  recaptchaSiteKey,
  onNeedRecaptcha,
  onResult,
  onOpenAgreement,
}: Props) {
  const uid = useId();

  const ids = useMemo(
    () => ({
      firstName: `${uid}-firstName`,
      lastName: `${uid}-lastName`,
      email: `${uid}-email`,
      phone: `${uid}-phone`,
      comment: `${uid}-comment`,
      agree: `${uid}-agree`,
      website: `${uid}-website`,
    }),
    [uid]
  );

  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  const isBusy = formStatus === "loading";

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

  async function getRecaptchaToken(): Promise<string | undefined> {
    const isProd = process.env.NODE_ENV === "production";
    if (!isProd) return undefined;
    if (!recaptchaSiteKey) return undefined;

    // попросим секцию подгрузить скрипт, если ещё не подгружен
    if (typeof window !== "undefined" && !window.grecaptcha) {
      onNeedRecaptcha?.();
    }

    const g = await waitForGrecaptchaReady(7000);
    if (!g) return undefined;

    try {
      return await g.execute(recaptchaSiteKey, { action: recaptchaAction });
    } catch {
      return undefined;
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isBusy) return;

    setFormStatus("loading");
    setFormMessage("");
    setIsStatusModalOpen(false);

    try {
      // honeypot: бот — делаем вид, что всё ок
      if (formData.website.trim() !== "") {
        setFormStatus("success");
        setFormMessage(t.statusSuccess);
        setFormData(initialData);
        setIsStatusModalOpen(true);
        onResult?.({ ok: true });
        return;
      }

      const recaptchaToken = await getRecaptchaToken();
      const utm = typeof window !== "undefined" ? safeReadUtm() : {};
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
        setFormStatus("error");
        const msg = data?.message || t.statusError;
        setFormMessage(msg);
        setIsStatusModalOpen(true);
        onResult?.({ ok: false, message: msg });
        return;
      }

      setFormStatus("success");
      setFormMessage(t.statusSuccess);
      setFormData(initialData);
      setIsStatusModalOpen(true);
      onResult?.({ ok: true });
    } catch (err) {
      console.error("ContactForm submit error:", err);
      setFormStatus("error");
      setFormMessage(t.statusError);
      setIsStatusModalOpen(true);
      onResult?.({ ok: false, message: t.statusError });
    }
  }

  return (
    <>
      <div className="qf-card">
        <div className="qf-head">
          <h2 className="qf-title">{t.sectionTitle}</h2>
          <p className="qf-p">{t.sectionSubtitle}</p>
        </div>

        <form className="qf-form" onSubmit={handleSubmit} noValidate>
          {/* honeypot */}
          <div className="qf-hidden" aria-hidden="true">
            <label htmlFor={ids.website}>{t.honeypotLabel}</label>
            <input
              id={ids.website}
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
              className="control"
            />
          </div>

          <div className="qf-grid2">
            <div className="field">
              <label className="label" htmlFor={ids.firstName}>
                {t.fields.firstName} <span className="req">{t.requiredMark}</span>
              </label>
              <input
                id={ids.firstName}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="control"
                autoComplete="given-name"
                required
                disabled={isBusy}
              />
            </div>

            <div className="field">
              <label className="label" htmlFor={ids.lastName}>
                {t.fields.lastName} <span className="req">{t.requiredMark}</span>
              </label>
              <input
                id={ids.lastName}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="control"
                autoComplete="family-name"
                required
                disabled={isBusy}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor={ids.email}>
              {t.fields.email} <span className="req">{t.requiredMark}</span>
            </label>
            <input
              id={ids.email}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              inputMode="email"
              autoComplete="email"
              pattern="^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
              className="control"
              required
              disabled={isBusy}
            />
          </div>

          <div className="field">
            <label className="label" htmlFor={ids.phone}>
              {t.fields.phone} <span className="req">{t.requiredMark}</span>
            </label>
            <input
              id={ids.phone}
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 777 1234567"
              className="control"
              required
              disabled={isBusy}
            />
          </div>

          <div className="field">
            <label className="label" htmlFor={ids.comment}>
              {t.fields.comment} <span className="req">{t.requiredMark}</span>
            </label>
            <textarea
              id={ids.comment}
              name="comment"
              rows={4}
              value={formData.comment}
              onChange={handleChange}
              className="control control--textarea"
              required
              disabled={isBusy}
            />
          </div>

          <div className="qf-agree">
            <input
              id={ids.agree}
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
              disabled={isBusy}
            />
            <label htmlFor={ids.agree}>
              {t.agreePrefix}{" "}
              <button
                type="button"
                onClick={() => (onOpenAgreement ? onOpenAgreement() : setIsAgreementOpen(true))}
                className="link"
                disabled={isBusy}
              >
                {t.agreeLink}
              </button>
              {t.agreeSuffix} <span className="req">{t.requiredMark}</span>
            </label>
          </div>

          {formStatus !== "idle" ? (
            <div className={formStatus === "success" ? "qf-status-ok" : "qf-status-err"} role="status" aria-live="polite">
              {formMessage}
            </div>
          ) : null}

          <div className="qf-actions">
            <button type="submit" className="btn btn-secondary btn-block" disabled={isBusy}>
              {isBusy ? t.submitLoading : t.submitDefault}
            </button>
          </div>
        </form>
      </div>

      {/* STATUS MODAL */}
      {isStatusModalOpen ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal modal--sm">
            <h3 className="modal-title">{formStatus === "success" ? t.modalSuccessTitle : t.modalErrorTitle}</h3>
            <p className="modal-text">{formMessage}</p>
            <div className="modal-actions modal-actions--center">
              <button type="button" className="btn btn-block" onClick={() => setIsStatusModalOpen(false)}>
                {t.modalClose}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* AGREEMENT MODAL (используется только если AgreementModal НЕ вынесен наружу) */}
      {!onOpenAgreement && isAgreementOpen ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal modal--lg modal-scroll">
            <h3 className="modal-title">{agreement.title}</h3>

            <div className="qf-agreementText">
              <p style={{ marginTop: 0 }}>{agreement.intro1}</p>
              <p>{agreement.personalDataDefinition}</p>

              <ul className="list">
                <li>{agreement.dataList.firstName}</li>
                <li>{agreement.dataList.lastName}</li>
                <li>{agreement.dataList.email}</li>
                <li>{agreement.dataList.phone}</li>
                <li>{agreement.dataList.comment}</li>
              </ul>

              <p>{agreement.processingIntro}</p>
              <p>{agreement.purposesIntro}</p>

              <ul className="list">
                {agreement.purposesList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p>{agreement.consentText}</p>

              <h4 className="qf-agreementTitle">{agreement.contactsTitle}</h4>

              <ul className="list">
                {agreement.contactsList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-ghost" onClick={() => setIsAgreementOpen(false)}>
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
      ) : null}
    </>
  );
}