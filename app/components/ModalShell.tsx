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
        "u-fixed u-inset-0 u-z--999 u-flex u-items-center u-justify-center u-p-4",
        overlayClassName
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-label={!title ? ariaLabel : undefined}
      onMouseDown={onClose} // клик по фону закрывает
    >
      {/* подложка */}
      <div className="u-absolute u-inset-0 u-bg-black-20" />

      {/* панель */}
      <div
        ref={panelRef}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()} // чтобы клик внутри не закрывал
        className={cx(
          "u-relative u-w-full u-max-w-2xl",
          "u-bg-white-85 u-backdrop-blur-md u-border u-border-black-10 u-shadow-2xl",
          "u-rounded-2xl",
          "u-max-h--85vh u-overflow-y-auto overscroll-contain",
          panelClassName
        )}
      >
        {(title || showClose) && (
          <div className="u-sticky u-top-0 u-z-10 u-flex u-items-center u-justify-between u-gap-3 u-px-5 u-py-4 u-border-b u-border-black-10 u-bg-white-70 u-backdrop-blur-md">
            {title ? (
              <h3 id={titleId} className="u-text-lg u-font-extrabold u-text--1a3a5f">
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
                className="u-h-10 u-w-10 u-rounded-xl u-border u-border-black-10 u-bg-white-40 u-hover-bg-white-70"
              >
                ✕
              </button>
            )}
          </div>
        )}

        <div className="u-px-5 u-py-5">{children}</div>
      </div>
    </div>
  );
}
