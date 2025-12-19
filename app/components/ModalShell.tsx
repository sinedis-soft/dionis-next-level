"use client";

import { useEffect, useId, useRef } from "react";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

type Props = {
  open: boolean;
  onClose: () => void;

  /** Заголовок для aria (можно не передавать, если используешь ariaLabel) */
  title?: string;
  /** Если нет title — можно задать aria-label */
  ariaLabel?: string;

  children: React.ReactNode;

  /** Классы панели (внутреннего блока) */
  panelClassName?: string;
  /** Классы оверлея */
  overlayClassName?: string;

  /** Показывать крестик в шапке */
  showClose?: boolean;
};

export default function ModalShell({
  open,
  onClose,
  title,
  ariaLabel,
  children,
  panelClassName,
  overlayClassName,
  showClose = true,
}: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  // ESC + блокировка скролла + возврат фокуса
  useEffect(() => {
    if (!open) return;

    lastActiveRef.current = document.activeElement as HTMLElement | null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    // фокус на панель
    setTimeout(() => {
      panelRef.current?.focus();
    }, 0);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastActiveRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={cx(
        "fixed inset-0 z-[999] flex items-center justify-center p-4",
        overlayClassName
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-label={!title ? ariaLabel : undefined}
      onMouseDown={onClose} // клик по фону закрывает
    >
      {/* подложка */}
      <div className="absolute inset-0 bg-black/20" />

      {/* панель */}
      <div
        ref={panelRef}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()} // чтобы клик внутри не закрывал
        className={cx(
          "relative w-full max-w-2xl",
          "bg-white/85 backdrop-blur-md border border-black/10 shadow-2xl",
          "rounded-2xl",
          "max-h-[85vh] overflow-y-auto overscroll-contain",
          panelClassName
        )}
      >
        {(title || showClose) && (
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 px-5 py-4 border-b border-black/10 bg-white/70 backdrop-blur-md">
            {title ? (
              <h3 id={titleId} className="text-lg font-extrabold text-[#1A3A5F]">
                {title}
              </h3>
            ) : (
              <div />
            )}

            {showClose && (
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="h-10 w-10 rounded-xl border border-black/10 bg-white/40 hover:bg-white/70"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
