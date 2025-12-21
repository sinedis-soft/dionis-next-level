import type { ReactNode } from "react";

type Kind = "info" | "warn" | "danger" | "success";

const STYLES: Record<Kind, { title: string; border: string; bg: string; text: string }> = {
  info: { title: "Важно", border: "border-[#1A3A5F]/20", bg: "bg-[#F4F6FA]", text: "text-[#1A3A5F]" },
  warn: { title: "Обратите внимание", border: "border-amber-200", bg: "bg-amber-50", text: "text-amber-900" },
  danger: { title: "Риск", border: "border-red-200", bg: "bg-red-50", text: "text-red-900" },
  success: { title: "Хорошая практика", border: "border-emerald-200", bg: "bg-emerald-50", text: "text-emerald-900" },
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
    <div className={`not-prose my-6 rounded-2xl border ${s.border} ${s.bg} p-5`}>
      <div className={`text-sm font-semibold ${s.text}`}>
        {title ?? s.title}
      </div>
      <div className="mt-2 text-sm text-gray-800 leading-relaxed">
        {children}
      </div>
    </div>
  );
}
