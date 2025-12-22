// components/blog/ContentTypeBadge.tsx
import React from "react";
import type { BlogContentType } from "@/lib/blogContentType";
import { CONTENT_TYPE_LABEL } from "@/lib/blogContentType";

type Props = {
  type: BlogContentType;
  size?: "sm" | "md";
  className?: string;
};

export default function ContentTypeBadge({ type, size = "md", className }: Props) {
  const base =
    "inline-flex items-center rounded-full border border-gray-200 bg-white/70 text-gray-800 backdrop-blur";
  const paddings = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-3 py-1 text-xs";
  return (
    <span className={[base, paddings, className].filter(Boolean).join(" ")}>
      {CONTENT_TYPE_LABEL[type]}
    </span>
  );
}
