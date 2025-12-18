"use client";

import React, { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  rootMargin?: string;
  minDelayMs?: number; // доп. страховка: не грузить мгновенно
  className?: string;
};

export default function DeferredHydration({
  children,
  rootMargin = "600px",
  minDelayMs = 0,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  const canUseIO = useMemo(
    () => typeof window !== "undefined" && "IntersectionObserver" in window,
    []
  );

  useEffect(() => {
    if (enabled) return;

    const el = ref.current;
    if (!el) return;

    let timeoutId: number | undefined;

    const enable = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (minDelayMs > 0) {
        timeoutId = window.setTimeout(() => setEnabled(true), minDelayMs);
      } else {
        setEnabled(true);
      }
    };

    if (!canUseIO) {
      // старые браузеры — просто включаем
      enable();
      return;
    }

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
  }, [enabled, rootMargin, minDelayMs, canUseIO]);

  /**
   * Важно:
   * Это НЕ “серверный HTML + отложенная гидратация того же HTML”.
   * Это “не рендерим тяжёлые клиентские части, пока не доскроллили”.
   * Для SEO ниже первого экрана — делай секции серверными (без "use client"),
   * а интерактивность выноси в маленькие client-компоненты.
   */
  return (
    <div ref={ref} className={className} suppressHydrationWarning>
      {enabled ? children : null}
    </div>
  );
}
