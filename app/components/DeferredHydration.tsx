"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  rootMargin?: string;
  minDelayMs?: number;
  className?: string;
  disableOnLegacy?: boolean;
};

type WindowCssSupports = {
  CSS?: { supports?: (prop: string, value: string) => boolean };
};

function detectLegacyBrowser(): boolean {
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

  // Сервер и первый клиентский рендер должны быть одинаковыми.
  const [enabled, setEnabled] = useState(false);
  const [blockedByLegacy, setBlockedByLegacy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | null = null;
    let timeoutId: number | undefined;

    const cleanup = () => {
      if (observer) observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };

    if (disableOnLegacy) {
      const isLegacy = detectLegacyBrowser();
      if (isLegacy) {
        setBlockedByLegacy(true);
        return cleanup;
      }
    }

    if (typeof window === "undefined") {
      return cleanup;
    }

    const enable = () => {
      if (cancelled) return;

      if (minDelayMs > 0) {
        timeoutId = window.setTimeout(() => {
          if (!cancelled) setEnabled(true);
        }, minDelayMs);
      } else {
        setEnabled(true);
      }
    };

    if (!("IntersectionObserver" in window)) {
      enable();
      return () => {
        cancelled = true;
        cleanup();
      };
    }

    const el = ref.current;
    if (!el) {
      enable();
      return () => {
        cancelled = true;
        cleanup();
      };
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer?.disconnect();
          enable();
        }
      },
      { rootMargin }
    );

    observer.observe(el);

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [disableOnLegacy, rootMargin, minDelayMs]);

  // Не возвращаем null на сервере.
  // Изначально и сервер, и клиент отдают одинаковый контейнер.
  if (blockedByLegacy) return null;

  return <div ref={ref} className={className}>{enabled ? children : null}</div>;
}