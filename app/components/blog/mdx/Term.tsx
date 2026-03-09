// components/blog/mdx/Term.tsx
import React from "react";
import { getGlossaryTerm } from "@/lib/glossary";

type Props = React.PropsWithChildren<{
  id: string;
  className?: string;
}>;

export default function Term({ id, children, className }: Props) {
  const term = getGlossaryTerm(id);

  // Если термина нет — просто рендерим текст без тултипа (чтобы MDX не падал)
  if (!term) {
    return (
      <span className={className}>
        {children ?? id}
      </span>
    );
  }

  return (
    <span
      className={[
        "relative inline-flex align-baseline group cursor-help",
        className ?? "",
      ].join(" ")}
    >
      {/* подчёркнутый термин */}
      <span className="underline decoration-dotted underline-offset-4">
        {children ?? term.title}
      </span>

      {/* tooltip по hover */}
      <span
        className={[
          "pointer-events-none absolute left-0 top-full z-50 mt-2 w-[18rem]",
          "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
          "transition duration-150",
        ].join(" ")}
      >
        <span className="block rounded-xl border border-gray-200 bg-white shadow-lg p-3">
          <span className="block text-sm font-semibold text-[#1A3A5F]">
            {term.title}
          </span>
          <span className="mt-1 block text-sm text-gray-700 leading-snug">
            {term.text}
          </span>
        </span>
      </span>
    </span>
  );
}
