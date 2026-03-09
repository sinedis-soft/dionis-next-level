// components/blog/mdx/mdxHeadingComponents.tsx
import React from "react";
import type {
  HTMLAttributes,
  OlHTMLAttributes,
  LiHTMLAttributes,
  InputHTMLAttributes,
} from "react";

import { slugifyHeading, normalizeHeadingText } from "@/lib/slugifyHeading";
import Term from "@/components/blog/mdx/Term"; // ✅ ДОБАВЛЕНО

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;
type ElementWithChildrenProps = { children?: React.ReactNode };

function getText(children: React.ReactNode): string {
  if (children == null) return "";

  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getText).join("");
  }

  if (React.isValidElement<ElementWithChildrenProps>(children)) {
    return getText(children.props.children);
  }

  return "";
}

function headingClass(level: "h2" | "h3", className?: string) {
  const base = "scroll-mt-24";
  const spacing = level === "h2" ? "mt-10 mb-4" : "mt-8 mb-3";
  return [base, spacing, className].filter(Boolean).join(" ");
}

export const mdxHeadingComponents = {
  /* ---------------- headings ---------------- */

  h2: (props: HeadingProps) => {
    const text = normalizeHeadingText(getText(props.children));
    const id = props.id ?? slugifyHeading(text);
    return (
      <h2 {...props} id={id} className={headingClass("h2", props.className)} />
    );
  },

  h3: (props: HeadingProps) => {
    const text = normalizeHeadingText(getText(props.children));
    const id = props.id ?? slugifyHeading(text);
    return (
      <h3 {...props} id={id} className={headingClass("h3", props.className)} />
    );
  },

  /* ---------------- lists ---------------- */

  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul
      {...props}
      className={`my-4 ml-6 list-disc space-y-2 ${props.className ?? ""}`.trim()}
    />
  ),

  ol: (props: OlHTMLAttributes<HTMLOListElement>) => (
    <ol
      {...props}
      className={`my-4 ml-6 list-decimal space-y-2 ${props.className ?? ""}`.trim()}
    />
  ),

  li: (props: LiHTMLAttributes<HTMLLIElement>) => (
    <li
      {...props}
      className={`leading-relaxed ${props.className ?? ""}`.trim()}
    />
  ),

  /* ---------------- checkboxes ---------------- */

  input: (props: InputHTMLAttributes<HTMLInputElement>) => {
    if (props.type === "checkbox") {
      return (
        <input
          {...props}
          className={`mr-2 h-4 w-4 align-middle accent-[#1A3A5F] ${props.className ?? ""}`.trim()}
        />
      );
    }
    return <input {...props} />;
  },

  /* ---------------- glossary ---------------- */

  Term, // ✅ ДОБАВЛЕНО
} as const;
