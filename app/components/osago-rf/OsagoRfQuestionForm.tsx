// components/osago-rf/OsagoRfQuestionForm.tsx
"use client";
import { getRecaptchaSiteKey } from "@/lib/recaptcha";

import Script from "next/script";
import React, { useState, type ChangeEvent, type FormEvent } from "react";

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
  context?: string;
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

export default function OsagoRfQuestionForm({
  homeContact,
  agreement,
  dict,
  context = "osago-rf-question",
}: Props) {
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  const recaptchaSiteKey = getRecaptchaSiteKey();

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
    if (formStatus === "loading") return;

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

      if (isProd && recaptchaSiteKey && typeof window !== "undefined") {
        const grecaptcha = window.grecaptcha;
        if (grecaptcha?.execute && grecaptcha?.ready) {
          recaptchaToken = await new Promise<string>((resolve, reject) => {
            grecaptcha.ready(() => {
              grecaptcha.execute(recaptchaSiteKey, { action: "contact" }).then(resolve).catch(reject);
            });
          });
        }
      }

      // UTM + URL страницы
      let utm: Record<string, string> = {};
      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("utm_data");
          const parsed = raw ? (JSON.parse(raw) as unknown) : {};
          if (parsed && typeof parsed === "object") utm = parsed as Record<string, string>;
        } catch {
          utm = {};
        }
      }

      const pageUrl = typeof window !== "undefined" ? window.location.href : undefined;

      const res = await fetch("/api/contact", {
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
        setFormMessage(data?.message || homeContact.statusError);
        setIsModalOpen(true);
        return;
      }

      setFormStatus("success");
      setFormMessage(homeContact.statusSuccess);
      setFormData(initialData);
      setIsModalOpen(true);
    } catch (err) {
      console.error("OsagoRfQuestionForm submit error:", err);
      setFormStatus("error");
      setFormMessage(homeContact.statusError);
      setIsModalOpen(true);
    }
  }

  return (
    <>
      {recaptchaSiteKey ? (
        <Script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`} strategy="afterInteractive" />
      ) : null}

      <div className="qf-card">
        <div className="qf-head">
          <h2 className="qf-title">{dict.title}</h2>
          <p className="qf-p">{dict.text1}</p>
          <p className="qf-p2">{dict.text2}</p>
        </div>

        <form className="qf-form" onSubmit={handleSubmit} noValidate>
          {/* honeypot */}
          <div style={{ display: "none" }}>
            <label>
              {homeContact.honeypotLabel}
              <input type="text" name="website" aria-label={homeContact.honeypotLabel} value={formData.website} onChange={handleChange} autoComplete="off" />
            </label>
          </div>

          <div className="qf-grid2">
            <div>
              <label className="qf-label">
                {homeContact.fields.firstName} <span className="req">{homeContact.requiredMark}</span>
              </label>
              <input
                type="text"
                name="firstName"
                aria-label={homeContact.fields.firstName}
                value={formData.firstName}
                onChange={handleChange}
                className="field"
                required
              />
            </div>

            <div>
              <label className="qf-label">
                {homeContact.fields.lastName} <span className="req">{homeContact.requiredMark}</span>
              </label>
              <input
                type="text"
                name="lastName"
                aria-label={homeContact.fields.lastName}
                value={formData.lastName}
                onChange={handleChange}
                className="field"
                required
              />
            </div>
          </div>

          <div>
            <label className="qf-label">
              {homeContact.fields.email} <span className="req">{homeContact.requiredMark}</span>
            </label>
            <input
              type="email"
              name="email"
              aria-label={homeContact.fields.email}
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
              {homeContact.fields.phone} <span className="req">{homeContact.requiredMark}</span>
            </label>
            <input
              type="tel"
              name="phone"
              aria-label={homeContact.fields.phone}
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
              {homeContact.fields.comment} <span className="req">{homeContact.requiredMark}</span>
            </label>
            <textarea
              name="comment"
              aria-label={homeContact.fields.comment}
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
              aria-label={`${homeContact.agreePrefix} ${homeContact.agreeLink} ${homeContact.agreeSuffix}`}
              checked={formData.agree}
              onChange={handleChange}
              required
            />
            <label htmlFor="agree">
              {homeContact.agreePrefix}{" "}
              <button type="button" onClick={() => setIsAgreementOpen(true)} className="qf-link">
                {homeContact.agreeLink}
              </button>
              {homeContact.agreeSuffix} <span className="req">{homeContact.requiredMark}</span>
            </label>
          </div>

          {formStatus !== "idle" ? (
            <div className={formStatus === "success" ? "qf-status-ok" : "qf-status-err"}>{formMessage}</div>
          ) : null}

          <div style={{ paddingTop: 6 }}>
            <button type="submit" className="btn btn-secondary" style={{ width: "100%" }} disabled={formStatus === "loading"}>
              {formStatus === "loading" ? homeContact.submitLoading : homeContact.submitDefault}
            </button>
          </div>
        </form>
      </div>

      {/* STATUS MODAL */}
      {isModalOpen ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal modal--sm">
            <h3 className="modal-title">
              {formStatus === "success" ? homeContact.modalSuccessTitle : homeContact.modalErrorTitle}
            </h3>
            <p className="modal-text">{formMessage}</p>
            <div className="modal-actions modal-actions--center">
              <button type="button" className="btn" style={{ width: "100%" }} onClick={() => setIsModalOpen(false)}>
                {homeContact.modalClose}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* AGREEMENT MODAL */}
      {isAgreementOpen ? (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal modal--lg modal-scroll">
            <h3 className="modal-title">{agreement.title}</h3>

            <div style={{ fontSize: 14, color: "#374151" }}>
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

              <h4 style={{ margin: "14px 0 8px", fontSize: 14, fontWeight: 900, color: "#1A3A5F" }}>
                {agreement.contactsTitle}
              </h4>

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
