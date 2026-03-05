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

type WindowCssSupports = {
  CSS?: { supports?: (prop: string, value: string) => boolean };
};

function detectLegacyBrowser(): boolean {
  // вызывать только в браузере
  const w = window as unknown as WindowCssSupports;

  const supportsFn = w.CSS?.supports;
  const hasGrid = typeof supportsFn === "function" && supportsFn("display", "grid");

  const hasFetch = typeof window.fetch === "function";
  const hasURL = typeof window.URL === "function";

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

  // ✅ хуки всегда вызываются, даже если потом вернём null
  const isLegacy = useMemo(() => {
    if (!isBrowser) return false;
    return detectLegacyBrowser();
  }, [isBrowser]);

  const canUseIO = useMemo(() => {
    if (!isBrowser) return false;
    return "IntersectionObserver" in window;
  }, [isBrowser]);

  const shouldHide = disableOnLegacy && (!isBrowser || isLegacy);

  useEffect(() => {
    // если скрываем — ничего не включаем и ничего не наблюдаем
    if (shouldHide) return;

    if (enabled) return;

    // если IO нет — просто включаем (но это уже не legacy, потому что legacy отфильтрован shouldHide)
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
  }, [enabled, canUseIO, rootMargin, minDelayMs, shouldHide]);

  // ✅ условный return только после хуков
  if (shouldHide) return null;

  return (
    <div ref={ref} className={className} suppressHydrationWarning>
      {enabled ? children : null}
    </div>
  );
}