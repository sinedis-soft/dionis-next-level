import React from "react";

type Props = {
  title?: string;
  children?: React.ReactNode;
};

export default function KeyTakeaway({ title = "Ключевая мысль", children }: Props) {
  if (!children) return null;

  return (
    <aside className="my-6 rounded-2xl border border-[#1A3A5F]/15 bg-[#1A3A5F]/[0.04] p-5">
      <div className="text-sm font-semibold text-[#1A3A5F]">{title}</div>
      <div className="mt-2 text-base leading-relaxed text-gray-700">{children}</div>
    </aside>
  );
}
