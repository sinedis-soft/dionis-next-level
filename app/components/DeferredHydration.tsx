// app/components/DeferredHydration.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  rootMargin?: string;
  minDelayMs?: number;
  className?: string;

  // ✅ если true — в legacy (по feature-detect) вообще не рендерим children
  disableOnLegacy?: boolean;
};

function detectLegacyBrowser(): boolean {
  if (typeof window === "undefined") return false;

  // Базовая проверка CSS.supports + grid — надёжнее, чем IO.
  const css: any = (window as any).CSS;
  const supports = typeof css?.supports === "function";
  const hasGrid = supports && css.supports("display", "grid");

  // Доп. страховки (по желанию можно расширять):
  const hasFetch = typeof (window as any).fetch === "function";
  const hasURL = typeof (window as any).URL === "function";

  return !hasGrid || !hasFetch || !hasURL;
}

export default function DeferredHydration({
  children,
  rootMargin = "600px",
  minDelayMs = 0,
  className,
  disableOnLegacy = false,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  const isBrowser = typeof window !== "undefined";

  const isLegacy = useMemo(() => (isBrowser ? detectLegacyBrowser() : false), [isBrowser]);

  // ✅ если просим не показывать в legacy — возвращаем null (и на сервере тоже, чтобы не мигало)
  if (disableOnLegacy && (!isBrowser || isLegacy)) {
    return null;
  }

  const canUseIO = useMemo(() => {
    if (!isBrowser) return false;
    return "IntersectionObserver" in window;
  }, [isBrowser]);

  useEffect(() => {
    if (enabled) return;

    // если IO нет — просто включаем (но это уже не legacy, потому что legacy мы отфильтровали выше)
    if (!canUseIO) {
      setEnabled(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    let timeoutId: number | undefined;

    const enable = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (minDelayMs > 0) timeoutId = window.setTimeout(() => setEnabled(true), minDelayMs);
      else setEnabled(true);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          enable();
          io.disconnect();
        }
      },
      { rootMargin }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [enabled, canUseIO, rootMargin, minDelayMs]);

  return (
    <div ref={ref} className={className} suppressHydrationWarning>
      {enabled ? children : null}
    </div>
  );
}