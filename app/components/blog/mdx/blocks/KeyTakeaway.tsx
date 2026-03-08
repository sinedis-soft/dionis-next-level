import React from "react";

type Props = {
  title?: string;
  children?: React.ReactNode;
};

export default function KeyTakeaway({ title = "Ключевая мысль", children }: Props) {
  if (!children) return null;

  return (
    <aside className="u-my-6 u-rounded-2xl u-border u-border--1a3a5f-15 u-bg--1a3a5f-0-04 u-p-5">
      <div className="u-text-sm u-font-semibold u-text--1a3a5f">{title}</div>
      <div className="u-mt-2 u-text-base u-leading-relaxed u-text-gray-700">{children}</div>
    </aside>
  );
}
