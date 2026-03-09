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
        "u-relative u-inline-flex u-align-baseline u-group u-cursor-help",
        className ?? "",
      ].join(" ")}
    >
      {/* подчёркнутый термин */}
      <span className="u-underline u-decoration-dotted u-underline-offset-4">
        {children ?? term.title}
      </span>

      {/* tooltip по hover */}
      <span
        className={[
          "u-pointer-events-none u-absolute u-left-0 u-top-full u-z-50 u-mt-2 u-w--18rem",
          "u-opacity-0 u-translate-y-1 u-group-hover-opacity-100 u-group-hover-translate-y-0",
          "u-transition u-duration-150",
        ].join(" ")}
      >
        <span className="u-block u-rounded-xl u-border u-border-gray-200 u-bg-white u-shadow-lg u-p-3">
          <span className="u-block u-text-sm u-font-semibold u-text--1a3a5f">
            {term.title}
          </span>
          <span className="u-mt-1 u-block u-text-sm u-text-gray-700 u-leading-snug">
            {term.text}
          </span>
        </span>
      </span>
    </span>
  );
}
