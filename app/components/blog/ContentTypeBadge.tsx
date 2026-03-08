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
    "u-inline-flex u-items-center u-rounded-full u-border u-border-gray-200 u-bg-white-70 u-text-gray-800 u-backdrop-blur-md";
  const paddings = size === "sm" ? "u-px-2 u-py-0-5 u-text--11px" : "u-px-3 u-py-1 u-text-xs";
  return (
    <span className={[base, paddings, className].filter(Boolean).join(" ")}>
      {CONTENT_TYPE_LABEL[type]}
    </span>
  );
}
