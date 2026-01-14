"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/dictionaries/header";
import {
  getCookieDictionary,
  type CookieCategoryKey,
} from "@/dictionaries/cookies";

type ConsentState = Record<CookieCategoryKey, boolean>;

const COOKIE_NAME = "dionis_cookie_consent_v2";
const ONE_YEAR_SEC = 60 * 60 * 24 * 365;

type Props = { lang: Lang };

const DEFAULT_STATE: ConsentState = {
  necessary: true,
  functional: false,
  marketing: false,
};

function safeParseConsent(raw: string | null): ConsentState | null {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    const obj = JSON.parse(decoded) as Partial<ConsentState>;
    return {
      necessary: true,
      functional: Boolean(obj.functional),
      marketing: Boolean(obj.marketing),
    };
  } catch {
    return null;
  }
}

function readCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? m[1] : null;
}

function writeConsent(state: ConsentState) {
  if (typeof document === "undefined") return;
  const value = encodeURIComponent(JSON.stringify(state));
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${ONE_YEAR_SEC}; SameSite=Lax`;
}

export default function CookieConsent({ lang }: Props) {
  const t = useMemo(() => getCookieDictionary(lang), [lang]);

  const [isOpen, setIsOpen] = useState(false);
  const [saved, setSaved] = useState<ConsentState | null>(null);
  const [draft, setDraft] = useState<ConsentState>(DEFAULT_STATE);

  useEffect(() => {
    const stored = safeParseConsent(readCookieValue(COOKIE_NAME));
    if (stored) {
      setSaved(stored);
      setDraft(stored);
      setIsOpen(false);
    } else {
      setSaved(null);
      setDraft(DEFAULT_STATE);
      setIsOpen(true);
    }
  }, []);

  function emitConsentChanged(next: ConsentState) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("cookie-consent-changed", { detail: next })
    );
  }

  function save(next: ConsentState) {
    const normalized: ConsentState = { ...next, necessary: true };
    writeConsent(normalized);
    setSaved(normalized);
    setDraft(normalized);
    setIsOpen(false);
    emitConsentChanged(normalized);
  }

  function acceptAll() {
    save({ necessary: true, functional: true, marketing: true });
  }

  function rejectAll() {
    save({ necessary: true, functional: false, marketing: false });
  }

  const status = saved ? (saved.functional || saved.marketing ? "✓" : "✕") : "";

  // ✅ главное исправление: добавляем lang к пути политики
  const policyPath = t.policyHref.startsWith("/")
    ? t.policyHref
    : `/${t.policyHref}`;
  const policyUrl = `/${lang}${policyPath}`;

  return (
    <>
      {/* Кнопка управления */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 rounded-full bg-[#0f2238] text-white text-xs px-4 py-2 shadow-lg hover:bg-[#123056]"
        aria-label={t.manageBtn}
      >
        {t.manageBtn} {status}
      </button>

      {/* Модалка */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-3 sm:p-6">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-[#1A3A5F]">
                    {t.modalTitle}
                  </div>
                  <p className="mt-2 text-sm text-gray-700">{t.modalText}</p>
                </div>

                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5">
                <div className="text-sm font-semibold text-[#1A3A5F]">
                  {t.categoriesTitle}
                </div>

                <div className="mt-3 space-y-3">
                  {t.categories.map((c) => {
                    const checked = draft[c.key];
                    const locked = Boolean(c.locked);

                    return (
                      <div
                        key={c.key}
                        className="flex items-start justify-between gap-4 rounded-xl border p-4"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-gray-900">
                            {c.title}
                          </div>
                          <div className="mt-1 text-xs text-gray-600">
                            {c.description}
                          </div>
                        </div>

                        {/* Toggle */}
                        <label className="relative inline-flex items-center cursor-pointer select-none">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={checked}
                            disabled={locked}
                            onChange={(e) =>
                              setDraft((prev) => ({
                                ...prev,
                                [c.key]: e.target.checked,
                                necessary: true,
                              }))
                            }
                          />
                          <span
                            className={[
                              "w-11 h-6 rounded-full transition-colors",
                              locked
                                ? "bg-gray-200"
                                : checked
                                ? "bg-[#1A3A5F]"
                                : "bg-gray-300",
                            ].join(" ")}
                          />
                          <span
                            className={[
                              "absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform",
                              checked ? "translate-x-5" : "translate-x-0",
                            ].join(" ")}
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 text-xs text-gray-600">
                  {t.policyText}{" "}
                  <Link
                    href={policyUrl}
                    className="text-[#1A3A5F] underline underline-offset-2"
                  >
                    {t.policyLabel}
                  </Link>
                  .
                </div>
              </div>
            </div>

            {/* Кнопки */}
            <div className="p-4 sm:p-5 bg-gray-50 flex flex-col sm:flex-row gap-2 sm:justify-end">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border text-sm hover:bg-white"
                onClick={rejectAll}
              >
                {t.rejectAllBtn}
              </button>

              <button
                type="button"
                className="px-4 py-2 rounded-lg border text-sm hover:bg-white"
                onClick={() => save(draft)}
              >
                {t.saveBtn}
              </button>

              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-[#C89F4A] text-white text-sm hover:opacity-90"
                onClick={acceptAll}
              >
                {t.acceptAllBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
