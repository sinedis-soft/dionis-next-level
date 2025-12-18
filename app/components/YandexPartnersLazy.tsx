// app/components/YandexPartnersLazy.tsx
"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type Props = {
  enabled: boolean;          // включаем только после consent
  afterIdle?: boolean;       // дополнительно ждать idle
};

type IdleHandle = number;

function runWhenIdle(cb: () => void, timeoutMs = 2000): () => void {
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

function hasScript(id: string): boolean {
  if (typeof document === "undefined") return false;
  return document.getElementById(id) !== null;
}

export default function YandexPartnersLazy({ enabled, afterIdle = true }: Props) {
  const [renderScripts, setRenderScripts] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // уже вставляли — не дублируем
    if (hasScript("yandex-partners")) {
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
    <>
      {/* Пример: основной партнёрский бандл / загрузчик */}
      <Script
        id="yandex-partners"
        src="https://yastatic.net/partner-code-bundles/partner-code-bundles.js"
        strategy="lazyOnload"
      />

      {/* Если у тебя несколько скриптов — добавляй их сюда отдельными Script с уникальными id */}
      {/* <Script id="yandex-ads-2" src="..." strategy="lazyOnload" /> */}
    </>
  );
}
