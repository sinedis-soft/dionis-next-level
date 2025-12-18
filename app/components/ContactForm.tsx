// app/components/ContactForm.tsx
"use client";

import type { HomeDictionary } from "@/dictionaries/home";
import type { AgreementDictionary } from "@/dictionaries/agreement";
import { useCallback, useMemo, useState } from "react";
import { getRecaptchaToken } from "@/lib/recaptcha";

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

type Props = {
  t: HomeDictionary;
  agreement: AgreementDictionary;
  onOpenAgreement: () => void;
  onResult: (result: ContactFormResult) => void;

  /**
   * ВАЖНО ДЛЯ PERFORMANCE:
   * Родитель (HomeClient) должен включать загрузку reCAPTCHA скрипта
   * только после взаимодействия (focus/submit).
   */
  onNeedRecaptcha?: () => void;

  /**
   * Можно не передавать — тогда возьмём из env.
   * Но лучше передавать сверху (чтобы было явно и тестируемо).
   */
  recaptchaSiteKey?: string;
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

function isCheckbox(
  el: EventTarget
): el is HTMLInputElement & { type: "checkbox" } {
  return el instanceof HTMLInputElement && el.type === "checkbox";
}

function safeReadUtmFromLocalStorage(): Record<string, string> {
  try {
    const raw = localStorage.getItem("utm_data");
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};

    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === "string") out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

export default function ContactForm({
  t,
  agreement,
  onOpenAgreement,
  onResult,
  onNeedRecaptcha,
  recaptchaSiteKey: recaptchaSiteKeyProp,
}: Props) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formMessage, setFormMessage] = useState<string>("");

  const recaptchaSiteKey = useMemo(
    () => recaptchaSiteKeyProp ?? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "",
    [recaptchaSiteKeyProp]
  );

  const markNeedRecaptcha = useCallback(() => {
    onNeedRecaptcha?.();
  }, [onNeedRecaptcha]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;

      let nextValue: string | boolean;

      if (isCheckbox(e.target)) {
        nextValue = e.target.checked;
      } else {
        nextValue = e.target.value;
      }

      if (typeof nextValue === "string") {
        if (name === "phone") nextValue = formatPhone(nextValue);
        if (name === "email") nextValue = formatEmail(nextValue);
      }

      setFormData((prev) => ({ ...prev, [name]: nextValue } as FormData));
    },
    []
  );

  const handleContactSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setFormStatus("loading");
      setFormMessage("");

      try {
        // honeypot → бот, делаем вид, что всё ОК
        if (formData.website.trim() !== "") {
          setFormStatus("success");
          setFormMessage(t.contact.statusSuccess);
          setFormData(initialFormData);
          onResult({ kind: "success", message: t.contact.statusSuccess });
          return;
        }

        // Включаем загрузку reCAPTCHA (если она сделана лениво в родителе)
        markNeedRecaptcha();

        let recaptchaToken: string | undefined;

        if (recaptchaSiteKey) {
          // Если скрипт ещё не успел загрузиться — getRecaptchaToken бросит ошибку.
          // Решение UX: либо показывать "секунду..." и ждать, либо разрешить отправку без токена.
          // Для безопасности лучше НЕ отправлять без токена.
          try {
            recaptchaToken = await getRecaptchaToken(recaptchaSiteKey, "contact");
          } catch {
            const msg = t.contact.statusError;
            setFormStatus("error");
            setFormMessage(msg);
            onResult({ kind: "error", message: msg });
            return;
          }
        }

        // UTM + адрес страницы
        let utm: Record<string, string> = {};
        let pageUrl: string | undefined;

        if (typeof window !== "undefined") {
          utm = safeReadUtmFromLocalStorage();
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
    },
    [formData, markNeedRecaptcha, onResult, recaptchaSiteKey, t.contact.statusError, t.contact.statusSuccess]
  );

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
              onFocus={markNeedRecaptcha}
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
              onFocus={markNeedRecaptcha}
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
              onFocus={markNeedRecaptcha}
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
            onFocus={markNeedRecaptcha}
            inputMode="email"
            autoComplete="email"
            pattern="^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"
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
            onFocus={markNeedRecaptcha}
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
            onFocus={markNeedRecaptcha}
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

        {/* agreement используется в отдельной модалке, тут он не нужен напрямую,
            но параметр оставляем, чтобы было видно, что словарь реально приходит */}
        <input type="hidden" value={agreement.title} readOnly />
      </form>
    </div>
  );
}
