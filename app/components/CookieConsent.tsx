"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/dictionaries/header";
import { getCookieDictionary } from "@/dictionaries/cookies";

export type ConsentValue = "accepted" | "rejected";
const COOKIE_NAME = "dionis_cookie_consent_v1";

type Props = {
  lang: Lang;
};

function readConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`${COOKIE_NAME}=(accepted|rejected)`)
  );
  return match ? (match[1] as ConsentValue) : null;
}

function writeConsent(value: ConsentValue) {
  const maxAge = 60 * 60 * 24 * 365; // 1 год
  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export default function CookieConsent({ lang }: Props) {
  const t = getCookieDictionary(lang);

  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const isAccepted = consent === "accepted";
  const isRejected = consent === "rejected";

  useEffect(() => {
    const stored = readConsent();
    if (!stored) {
      setIsOpen(true);
    } else {
      setConsent(stored);
    }
  }, []);

  const handleChoice = (value: ConsentValue) => {
    writeConsent(value);
    setConsent(value);
    setIsOpen(false);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cookie-consent-changed"));
    }
  };

  // мини-статус рядом с кнопкой (чтобы consent реально использовался)
  const statusLabel =
    consent === "accepted" ? "✓" : consent === "rejected" ? "✕" : "";

  return (
    <>
      {/* Кнопка «печенька» доступна всегда */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 rounded-full bg-[#0f2238] text-white text-xs px-4 py-2 shadow-lg hover:bg-[#123056]"
        aria-label={t.manageBtn}
      >
        {t.manageBtn} {statusLabel}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-sm font-semibold text-[#1A3A5F]">
                  {t.modalTitle}
                </div>
                <h2 className="text-2xl font-semibold mt-1">{t.introTitle}</h2>

                {/* Показываем текущий выбор (используем consent) */}
                <div className="mt-2 text-xs text-gray-600">
                  {consent === "accepted"
                    ? "Статус: принято"
                    : consent === "rejected"
                      ? "Статус: отклонено"
                      : "Статус: не выбрано"}
                </div>
              </div>

              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setIsOpen(false)}
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-gray-700 mb-2">{t.introP1}</p>
            <p className="text-sm text-gray-700 mb-6">{t.introP2}</p>

            <h3 className="text-lg font-semibold text-[#1A3A5F] mb-2">
              {t.settingsTitle}
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              {t.settingsDescription}
            </p>

            {/* Аналитика и реклама */}
            <div className="mt-4">
              <h4 className="text-base font-semibold text-[#1A3A5F]">
                {t.analyticsTitle}
              </h4>
              <p className="text-sm text-gray-700 mb-2">
                {t.analyticsDescription}
              </p>

              <ul className="mt-2 space-y-3 text-sm text-gray-700">
                {t.analyticsServices.map((s) => (
                  <li key={s.key}>
                    <span className="font-semibold">{s.name}.</span>{" "}
                    {s.description}{" "}
                    {s.moreHref && s.moreLabel && (
                      <a
                        href={s.moreHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1A3A5F] underline underline-offset-2"
                      >
                        {s.moreLabel}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Технические cookie */}
            <div className="mt-6">
              <h4 className="text-base font-semibold text-[#1A3A5F]">
                {t.technicalTitle}
              </h4>
              <p className="text-sm text-gray-700 mb-2">
                {t.technicalDescription}
              </p>

              <ul className="mt-2 space-y-3 text-sm text-gray-700">
                {t.technicalServices.map((s) => (
                  <li key={s.key}>
                    <span className="font-semibold">{s.name}.</span>{" "}
                    {s.description}
                  </li>
                ))}
              </ul>
            </div>

            {/* Кнопки */}
            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-2">
              <button
                type="button"
                className="px-4 py-2 rounded-md border text-xs sm:text-sm hover:bg-gray-100 disabled:opacity-60 disabled:hover:bg-transparent"
                onClick={() => handleChoice("rejected")}
                disabled={isRejected}
                aria-disabled={isRejected}
              >
                {t.rejectAllBtn}
              </button>

              <button
                type="button"
                className="px-4 py-2 rounded-md bg-[#C89F4A] text-white text-xs sm:text-sm rounded-lg hover:opacity-90 disabled:opacity-60 disabled:hover:opacity-60"
                onClick={() => handleChoice("accepted")}
                disabled={isAccepted}
                aria-disabled={isAccepted}
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
