"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/dictionaries/header";
import { getCookieDictionary, type CookieCategoryKey } from "@/dictionaries/cookies";

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

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const re = new RegExp(`(?:^|;\\s*)${escapeRegExp(name)}=([^;]*)`);
  const m = document.cookie.match(re);
  return m ? m[1] : null;
}

function writeConsent(state: ConsentState) {
  if (typeof document === "undefined") return;

  const normalized: ConsentState = { ...state, necessary: true };
  const value = encodeURIComponent(JSON.stringify(normalized));
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";

  document.cookie = `${COOKIE_NAME}=${value}; Path=/; Max-Age=${ONE_YEAR_SEC}; SameSite=Lax${secure}`;
}

export default function CookieConsent({ lang }: Props) {
  const t = useMemo(() => getCookieDictionary(lang), [lang]);

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [saved, setSaved] = useState<ConsentState | null>(null);
  const [draft, setDraft] = useState<ConsentState>(DEFAULT_STATE);

  useEffect(() => {
    setMounted(true);

    const stored = safeParseConsent(readCookieValue(COOKIE_NAME));
    if (stored) {
      setSaved(stored);
      setDraft(stored);
      setIsOpen(false);
    } else {
      setSaved(null);
      setDraft(DEFAULT_STATE);
      setIsOpen(true); // <-- первый визит: показываем окно
    }
  }, []);

  function emitConsentChanged(next: ConsentState) {
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: next }));
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

  // кнопка “настройки cookies” (можно оставить всегда)
  const status = saved ? (saved.functional || saved.marketing ? "✓" : "✕") : "";

  const policyUrl = useMemo(() => {
    const href = (t.policyHref || "").trim();
    if (/^https?:\/\//i.test(href)) return href;
    const path = href.startsWith("/") ? href : `/${href}`;
    return `/${lang}${path}`;
  }, [lang, t.policyHref]);

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="cc-manage"
        aria-label={t.manageBtn}
      >
        {t.manageBtn} {status}
      </button>

      {isOpen ? (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={t.modalTitle}>
          <div className="modal modal--sm">
            <div className="cc-head">
              <div>
                <div className="cc-title">{t.modalTitle}</div>
                <p className="cc-text">{t.modalText}</p>
              </div>

              <button type="button" className="cc-close" onClick={() => setIsOpen(false)} aria-label="Close">
                ✕
              </button>
            </div>

            <div className="cc-cats">
              <div className="cc-cats__title">{t.categoriesTitle}</div>

              <div className="cc-cats__list">
                {t.categories.map((c) => {
                  const checked = Boolean(draft[c.key]);
                  const locked = Boolean(c.locked);

                  return (
                    <div key={c.key} className="cc-cat">
                      <div className="cc-cat__text">
                        <div className="cc-cat__name">{c.title}</div>
                        <div className="cc-cat__desc">{c.description}</div>
                      </div>

                      <label className="cc-toggle">
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
                        <span className={["cc-toggle__track", locked ? "is-locked" : checked ? "is-on" : "is-off"].join(" ")} />
                        <span className={["cc-toggle__thumb", checked ? "is-on" : "is-off"].join(" ")} />
                      </label>
                    </div>
                  );
                })}
              </div>

              <div className="cc-policy">
                {t.policyText}{" "}
                {/^https?:\/\//i.test(policyUrl) ? (
                  <a href={policyUrl} className="link" target="_blank" rel="noopener noreferrer">
                    {t.policyLabel}
                  </a>
                ) : (
                  <Link href={policyUrl} className="link" onClick={() => setIsOpen(false)}>
                    {t.policyLabel}
                  </Link>
                )}
                .
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="btn btn-ghost" onClick={rejectAll}>
                {t.rejectAllBtn}
              </button>

              <button type="button" className="btn btn-secondary" onClick={() => save(draft)}>
                {t.saveBtn}
              </button>

              <button type="button" className="btn btn-primary" onClick={acceptAll}>
                {t.acceptAllBtn}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}