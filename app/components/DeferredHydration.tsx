// app/components/DeferredHydration.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  rootMargin?: string;
  minDelayMs?: number;
  className?: string;

  // ✅ если true — в legacy (без IntersectionObserver) вообще не рендерим children
  disableOnLegacy?: boolean;
};

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

  const canUseIO = useMemo(() => {
    if (!isBrowser) return false;
    return "IntersectionObserver" in window;
  }, [isBrowser]);

  // ✅ Важно: если это legacy и мы попросили "не показывать" — возвращаем null
  if (!canUseIO && disableOnLegacy) {
    return null;
  }

  useEffect(() => {
    if (enabled) return;

    // Если IO нет, но disableOnLegacy=false — просто включаем (как раньше)
    if (!canUseIO) {
      setEnabled(true);
      return;
    }

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

  return (
    <div ref={ref} className={className} suppressHydrationWarning>
      {enabled ? children : null}
    </div>
  );
}