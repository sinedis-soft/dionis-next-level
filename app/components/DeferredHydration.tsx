// app/components/DeferredHydration.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;

  // Когда блок должен "включиться" при наличии IntersectionObserver
  rootMargin?: string;

  // Доп. задержка перед включением (мс)
  minDelayMs?: number;

  className?: string;

  /**
   * Если true: в старых браузерах (где нет IntersectionObserver) children НЕ рендерим.
   * Полезно, чтобы не показывать картинки/иконки/тяжёлые блоки в legacy.
   */
  disableOnLegacy?: boolean;

  /**
   * Что показать вместо children:
   * - в legacy при disableOnLegacy=true
   * - или пока блок ещё не "включился" (если wantFallbackWhileWaiting=true)
   */
  fallback?: ReactNode;

  /**
   * Если true — показывать fallback, пока не включили children (до пересечения/таймера).
   * По умолчанию false: до включения показываем null (как у вас было).
   */
  showFallbackWhileWaiting?: boolean;
};

export default function DeferredHydration({
  children,
  rootMargin = "600px",
  minDelayMs = 0,
  className,
  disableOnLegacy = false,
  fallback = null,
  showFallbackWhileWaiting = false,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  // enabled=true => рендерим children
  const [enabled, setEnabled] = useState(false);

  // Чтобы не дёргать setState после размонтирования
  const unmountedRef = useRef(false);

  const canUseIO = useMemo(() => {
    // вычисляем один раз на клиенте
    return typeof window !== "undefined" && "IntersectionObserver" in window;
  }, []);

  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);

  useEffect(() => {
    if (enabled) return;

    const el = ref.current;
    if (!el) return;

    let timeoutId: number | undefined;

    const safeSetEnabled = () => {
      if (!unmountedRef.current) setEnabled(true);
    };

    const enable = () => {
      if (timeoutId) window.clearTimeout(timeoutId);

      if (minDelayMs > 0) {
        timeoutId = window.setTimeout(() => {
          safeSetEnabled();
        }, minDelayMs);
      } else {
        safeSetEnabled();
      }
    };

    // Legacy браузер (нет IO)
    if (!canUseIO) {
      // Если нужно отключать в legacy — просто ничего не включаем
      if (disableOnLegacy) return;

      // Иначе ведём себя как раньше: включаем сразу (или с minDelayMs)
      enable();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
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
  }, [enabled, rootMargin, minDelayMs, canUseIO, disableOnLegacy]);

  // Логика отображения:
  // 1) enabled => children
  // 2) legacy + disableOnLegacy => fallback
  // 3) иначе пока ждём => fallback (если showFallbackWhileWaiting), либо null
  const shouldShowChildren = enabled;

  const isLegacyAndDisabled = !canUseIO && disableOnLegacy;

  if (shouldShowChildren) {
    return (
      <div ref={ref} className={className} suppressHydrationWarning>
        {children}
      </div>
    );
  }

  const shouldShowFallback = isLegacyAndDisabled || showFallbackWhileWaiting;

  return (
    <div ref={ref} className={className} suppressHydrationWarning>
      {shouldShowFallback ? fallback : null}
    </div>
  );
}