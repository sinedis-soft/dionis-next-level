import type { ReactNode } from "react";

type Kind = "info" | "warn" | "danger" | "success";

const STYLES: Record<Kind, { title: string; border: string; bg: string; text: string }> = {
  info: { title: "Важно", border: "u-border--1a3a5f-20", bg: "u-bg--f4f6fa", text: "u-text--1a3a5f" },
  warn: { title: "Обратите внимание", border: "u-u-border-amber-200", bg: "u-u-bg-amber-50", text: "u-u-text-amber-900" },
  danger: { title: "Риск", border: "u-u-border-red-200", bg: "u-u-bg-red-50", text: "u-u-text-red-900" },
  success: { title: "Хорошая практика", border: "u-u-border-emerald-200", bg: "u-u-bg-emerald-50", text: "u-u-text-emerald-900" },
};

export default function Callout({
  kind = "info",
  title,
  children,
}: {
  kind?: Kind;
  title?: string;
  children: ReactNode;
}) {
  const s = STYLES[kind];

  return (
    <div className={`u-not-prose u-my-6 u-rounded-2xl u-border ${s.border} ${s.bg} u-p-5`}>
      <div className={`u-text-sm u-font-semibold ${s.text}`}>
        {title ?? s.title}
      </div>
      <div className="u-mt-2 u-text-sm u-text-gray-800 u-leading-relaxed">
        {children}
      </div>
    </div>
  );
}
