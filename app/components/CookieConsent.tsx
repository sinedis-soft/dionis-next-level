"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type ConsentValue = "accepted" | "rejected";
const COOKIE_NAME = "dionis_cookie_consent_v1";

type Props = {
  afterIdle?: boolean;
};

type IdleHandle = number;

function readConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`${COOKIE_NAME}=(accepted|rejected)`)
  );
  return match ? (match[1] as ConsentValue) : null;
}

function hasScript(id: string): boolean {
  if (typeof document === "undefined") return false;
  return document.getElementById(id) !== null;
}

function runWhenIdle(cb: () => void, timeoutMs = 2500): () => void {
  if (typeof window === "undefined") return () => {};

  const w = window as Window & {
    requestIdleCallback?: (
      callback: () => void,
      options?: { timeout: number }
    ) => IdleHandle;
    cancelIdleCallback?: (handle: IdleHandle) => void;
  };

  if (typeof w.requestIdleCallback === "function") {
    const handle = w.requestIdleCallback(cb, { timeout: timeoutMs });
    return () => {
      if (typeof w.cancelIdleCallback === "function") w.cancelIdleCallback(handle);
    };
  }

  const t = window.setTimeout(cb, Math.min(timeoutMs, 1500));
  return () => window.clearTimeout(t);
}

const YANDEX_BUNDLE_SRC = "PUT_REAL_YANDEX_URL_HERE";

export default function YandexPartnersLazy({ afterIdle = true }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [renderScripts, setRenderScripts] = useState(false);

  // 1) читаем consent на старте + слушаем изменения
  useEffect(() => {
    const sync = () => setEnabled(readConsent() === "accepted");
    sync();

    const onChange = () => sync();
    window.addEventListener("cookie-consent-changed", onChange);
    return () => window.removeEventListener("cookie-consent-changed", onChange);
  }, []);

  // 2) после consent → ждём idle → только потом вставляем скрипт
  useEffect(() => {
    if (!enabled) {
      setRenderScripts(false);
      return;
    }

    // уже вставляли — не дублируем
    if (hasScript("yandex-partners-bundle")) {
      setRenderScripts(false);
      return;
    }

    if (!afterIdle) {
      setRenderScripts(true);
      return;
    }

    const cancel = runWhenIdle(() => setRenderScripts(true), 2500);
    return cancel;
  }, [enabled, afterIdle]);

  if (!enabled) return null;
  if (!renderScripts) return null;

  return (
    <Script
      id="yandex-partners-bundle"
      src={YANDEX_BUNDLE_SRC}
      strategy="lazyOnload"
    />
  );
}
