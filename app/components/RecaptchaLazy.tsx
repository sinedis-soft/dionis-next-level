"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type Props = {
  siteKey: string;
  enabled: boolean;
  onReady?: () => void;
};

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

function hasRecaptchaScript(): boolean {
  if (typeof document === "undefined") return false;
  return document.getElementById("recaptcha-v3") !== null;
}

function getGrecaptcha(): Grecaptcha | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { grecaptcha?: Grecaptcha };
  return w.grecaptcha ?? null;
}

export function RecaptchaLazy({ siteKey, enabled, onReady }: Props) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!enabled || !siteKey) return;

    // 1) Скрипт уже есть → НЕ рендерим Script второй раз, но ждём готовность API
    if (hasRecaptchaScript()) {
      const api = getGrecaptcha();
      if (api) api.ready(() => onReady?.());
      else onReady?.(); // если API ещё не поднялось, всё равно сигналим
      return;
    }

    // 2) Скрипта ещё нет → разрешаем рендер Script
    setShouldRender(true);
  }, [enabled, siteKey, onReady]);

  if (!enabled || !siteKey) return null;
  if (!shouldRender) return null;

  return (
    <Script
      id="recaptcha-v3"
      src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`}
      strategy="lazyOnload"
      onLoad={() => {
        const api = getGrecaptcha();
        if (api) api.ready(() => onReady?.());
        else onReady?.();
      }}
    />
  );
}
