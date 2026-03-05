// app/components/RecaptchaLazy.tsx
"use client";

import Script from "next/script";
import { useEffect, useState, useCallback } from "react";

type Props = {
  siteKey: string;
  enabled: boolean;
  onReady?: () => void;
};

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
};

function getGrecaptcha(): Grecaptcha | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { grecaptcha?: Grecaptcha };
  return w.grecaptcha ?? null;
}

function hasRecaptchaScript(): boolean {
  if (typeof document === "undefined") return false;
  return document.getElementById("recaptcha-v3") !== null;
}

async function waitForGrecaptcha(timeoutMs = 8000): Promise<Grecaptcha | null> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    const api = getGrecaptcha();
    if (api) return api;
    await new Promise((r) => setTimeout(r, 100));
  }
  return null;
}

export function RecaptchaLazy({ siteKey, enabled, onReady }: Props) {
  const [shouldRender, setShouldRender] = useState(false);

  const notifyReadyIfPossible = useCallback(async () => {
    if (!enabled || !siteKey) return;
    const api = await waitForGrecaptcha(8000);
    if (!api) return; // НЕ сигналим "ready", пока реально не поднялось
    api.ready(() => onReady?.());
  }, [enabled, siteKey, onReady]);

  useEffect(() => {
    if (!enabled || !siteKey) return;

    // Скрипт уже есть — просто ждём появления grecaptcha
    if (hasRecaptchaScript()) {
      void notifyReadyIfPossible();
      return;
    }

    // Скрипта ещё нет — рендерим Script
    setShouldRender(true);
  }, [enabled, siteKey, notifyReadyIfPossible]);

  if (!enabled || !siteKey) return null;
  if (!shouldRender) return null;

  return (
    <Script
      id="recaptcha-v3"
      src={`https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`}
      strategy="lazyOnload"
      onLoad={() => {
        void notifyReadyIfPossible();
      }}
    />
  );
}