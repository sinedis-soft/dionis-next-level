"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

type Props = {
  enabled: boolean;    // только после consent === accepted
  afterIdle?: boolean; // дополнительно ждать idle
};

type IdleHandle = number;

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

const SCRIPT_ID = "yandex-partners";
const SCRIPT_SRC = "https://yastatic.net/partner-code-bundles/partner-code-bundles.js";

export default function YandexPartnersLazy({ enabled, afterIdle = true }: Props) {
  const [shouldRender, setShouldRender] = useState(false);

  // чтобы не планировать idle дважды
  const scheduledRef = useRef(false);

  useEffect(() => {
    // consent не принят → ничего не грузим и сбрасываем локальное состояние
    if (!enabled) {
      scheduledRef.current = false;
      setShouldRender(false);
      return;
    }

    // если скрипт уже в DOM — мы НЕ рендерим <Script> повторно
    if (hasScript(SCRIPT_ID)) {
      scheduledRef.current = true; // считаем “уже сделано”
      setShouldRender(false);
      return;
    }

    // не ждать idle
    if (!afterIdle) {
      setShouldRender(true);
      return;
    }

    // ждать idle (и не ставить повторно)
    if (scheduledRef.current) return;
    scheduledRef.current = true;

    const cancel = runWhenIdle(() => setShouldRender(true), 2500);
    return cancel;
  }, [enabled, afterIdle]);

  if (!enabled) return null;
  if (!shouldRender) return null;

  return (
    <>
      <Script id={SCRIPT_ID} src={SCRIPT_SRC} strategy="lazyOnload" />
      {/* добавляй остальные скрипты сюда, если нужно */}
    </>
  );
}
