"use client";

import { getRecaptchaSiteKey } from "@/lib/recaptcha";
import Script from "next/script";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

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

async function getRecaptchaToken(siteKey: string): Promise<string | undefined> {
  if (typeof window === "undefined") return undefined;

  const grecaptcha = window.grecaptcha;
  if (!grecaptcha?.ready || !grecaptcha?.execute) return undefined;

  try {
    const token = await new Promise<string>((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute(siteKey, { action: "contact" }).then(resolve).catch(reject);
      });
    });
    return token;
  } catch {
    return undefined;
  }
}

function safeParseUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("utm_data");
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") return parsed as Record<string, string>;
    return {};
  } catch {
    return {};
  }
}

export default function GreenCardQuestionForm({ homeContact, agreement, dict }: Props) {
  const [formData, setFormData] = useState<ContactFormData>(initialData);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  const closeModalBtnRef = useRef<HTMLButtonElement | null>(null);
  const closeAgreementBtnRef = useRef<HTMLButtonElement | null>(null);

  const rid = useId();
  const ids = {
    firstName: `gcq-firstName-${rid}`,
    lastName: `gcq-lastName-${rid}`,
    email: `gcq-email-${rid}`,
    phone: `gcq-phone-${rid}`,
    comment: `gcq-comment-${rid}`,
    agree: `gcq-agree-${rid}`,
    modalTitle: `gcq-modal-title-${rid}`,
    agreementTitle: `gcq-agreement-title-${rid}`,
    honeypot: `gcq-website-${rid}`,
  };

  const recaptchaSiteKey = getRecaptchaSiteKey();
  const isProd = process.env.NODE_ENV === "production";
  const shouldLoadRecaptcha = Boolean(isProd && recaptchaSiteKey);
  const isBusy = formStatus === "loading";

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target;
    const name = target.name as keyof ContactFormData;

    let value: ContactFormData[keyof ContactFormData];
    if (target instanceof HTMLInputElement && target.type === "checkbox") value = target.checked;
    else value = target.value;

    if (name === "phone") value = formatPhone(String(value));
    if (name === "email") value = formatEmail(String(value));

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isBusy) return;

    setFormStatus("loading");
    setFormMessage("");
    setIsModalOpen(false);

    try {
      // honeypot: молча считаем успехом
      if (formData.website.trim() !== "") {
        setFormStatus("success");
        setFormMessage(homeContact.statusSuccess);
        setFormData(initialData);
        setIsModalOpen(true);
        return;
      }

      const utm = safeParseUtm();
      const pageUrl = typeof window !== "undefined" ? window.location.href : undefined;

      let recaptchaToken: string | undefined;
      if (shouldLoadRecaptcha && recaptchaSiteKey) {
        recaptchaToken = await getRecaptchaToken(recaptchaSiteKey);
      }

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

  useEffect(() => {
    if (isModalOpen) setTimeout(() => closeModalBtnRef.current?.focus(), 0);
  }, [isModalOpen]);

  useEffect(() => {
    if (isAgreementOpen) setTimeout(() => closeAgreementBtnRef.current?.focus(), 0);
  }, [isAgreementOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (isAgreementOpen) setIsAgreementOpen(false);
      else if (isModalOpen) setIsModalOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isAgreementOpen, isModalOpen]);

  return (
    <>
      {shouldLoadRecaptcha && recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      )}

      <div className="card card--pad">
        <div className="stack u-gap-10">
          <h2 className="h2">{dict.title}</h2>
          <p className="muted">{dict.text1}</p>
          <p className="muted">{dict.text2}</p>
        </div>

        <form className="stack u-gap-14 u-mt-4" onSubmit={handleSubmit}>
          {/* honeypot: скрываем корректно */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor={ids.honeypot}>
              {homeContact.honeypotLabel}
              <input
                id={ids.honeypot}
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                autoComplete="off"
                tabIndex={-1}
              />
            </label>
          </div>

          <div className="u-grid grid-2">
            <div className="field">
              <label className="lbl" htmlFor={ids.firstName}>
                {homeContact.fields.firstName} <span className="req">{homeContact.requiredMark}</span>
              </label>
              <input
                id={ids.firstName}
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="control"
                required
                autoComplete="given-name"
                disabled={isBusy}
              />
            </div>

            <div className="field">
              <label className="lbl" htmlFor={ids.lastName}>
                {homeContact.fields.lastName} <span className="req">{homeContact.requiredMark}</span>
              </label>
              <input
                id={ids.lastName}
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="control"
                required
                autoComplete="family-name"
                disabled={isBusy}
              />
            </div>
          </div>

          <div className="field">
            <label className="lbl" htmlFor={ids.email}>
              {homeContact.fields.email} <span className="req">{homeContact.requiredMark}</span>
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
            <label className="lbl" htmlFor={ids.phone}>
              {homeContact.fields.phone} <span className="req">{homeContact.requiredMark}</span>
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
            <label className="lbl" htmlFor={ids.comment}>
              {homeContact.fields.comment} <span className="req">{homeContact.requiredMark}</span>
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

          <div className="gcq-agree">
            <input
              id={ids.agree}
              type="checkbox"
              name="agree"
              aria-label={`${homeContact.agreePrefix} ${homeContact.agreeLink} ${homeContact.agreeSuffix}`}
              checked={formData.agree}
              onChange={handleChange}
              required
              disabled={isBusy}
            />
            <div>
              <span>{homeContact.agreePrefix} </span>
              <button type="button" onClick={() => setIsAgreementOpen(true)} className="link">
                {homeContact.agreeLink}
              </button>
              <span>{homeContact.agreeSuffix}</span>
              <span className="req"> {homeContact.requiredMark}</span>
            </div>
          </div>

          {formStatus !== "idle" && (
            <div className={formStatus === "success" ? "status status--ok" : "status status--err"} role="status">
              {formMessage}
            </div>
          )}

          <div className="row-between u-mt-3">
            <span />
            <button type="submit" className="btn btn-secondary" disabled={isBusy}>
              {isBusy ? homeContact.submitLoading : homeContact.submitDefault}
            </button>
          </div>
        </form>
      </div>

      {/* STATUS MODAL */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className="modal modal--sm" role="dialog" aria-modal="true" aria-labelledby={ids.modalTitle}>
            <h3 id={ids.modalTitle} className="modal-title">
              {formStatus === "success" ? homeContact.modalSuccessTitle : homeContact.modalErrorTitle}
            </h3>

            <p className="modal-text">{formMessage}</p>

            <button
              ref={closeModalBtnRef}
              type="button"
              className="btn btn-secondary"
              onClick={() => setIsModalOpen(false)}
            >
              {homeContact.modalClose}
            </button>
          </div>
        </div>
      )}

      {/* AGREEMENT MODAL */}
      {isAgreementOpen && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsAgreementOpen(false);
          }}
        >
          <div className="modal modal--lg modal-scroll" role="dialog" aria-modal="true" aria-labelledby={ids.agreementTitle}>
            <h3 id={ids.agreementTitle} className="modal-title">
              {agreement.title}
            </h3>

            <div>
              <p>{agreement.intro1}</p>
              <p>{agreement.personalDataDefinition}</p>

              <ul>
                <li>{agreement.dataList.firstName}</li>
                <li>{agreement.dataList.lastName}</li>
                <li>{agreement.dataList.email}</li>
                <li>{agreement.dataList.phone}</li>
                <li>{agreement.dataList.comment}</li>
              </ul>

              <p>{agreement.processingIntro}</p>
              <p>{agreement.purposesIntro}</p>

              <ul>
                {agreement.purposesList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <p>{agreement.consentText}</p>

              <h4 className="modal-title" style={{ fontSize: 16, marginTop: 14 }}>
                {agreement.contactsTitle}
              </h4>
              <ul>
                {agreement.contactsList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="modal-actions">
              <button
                ref={closeAgreementBtnRef}
                type="button"
                className="btn btn-ghost"
                onClick={() => setIsAgreementOpen(false)}
              >
                {agreement.closeBtn}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
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
