"use client";

import Script from "next/script";

let scriptInserted = false;

export function RecaptchaLazy({
  siteKey,
  enabled,
  onReady,
}: {
  siteKey: string;
  enabled: boolean;
  onReady?: () => void;
}) {
  if (!enabled || !siteKey) return null;

  // Защита от повторной вставки Script (на случай повторных ререндеров/страниц)
  if (scriptInserted) return null;
  scriptInserted = true;

  return (
    <Script
      id="recaptcha-v3"
      src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`}
      strategy="lazyOnload"
      onLoad={() => {
        // Дожидаемся готовности API (если уже есть)
        const api = window.grecaptcha;
        if (api) api.ready(() => onReady?.());
        else onReady?.();
      }}
    />
  );
}
