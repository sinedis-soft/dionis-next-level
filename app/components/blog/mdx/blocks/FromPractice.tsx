import React from "react";

type Props = {
  title?: string;
  children?: React.ReactNode;
};

export default function FromPractice({
  title = "Из практики",
  children,
}: Props) {
  if (!children) return null;

  return (
    <section className="u-my-6 u-rounded-2xl u-border u-border-gray-200 u-bg-gray-50 u-p-5">
      <div className="u-text-sm u-font-semibold u-text-gray-900">{title}</div>
      <div className="u-mt-2 u-text-sm u-leading-relaxed u-text-gray-700">{children}</div>
    </section>
  );
}
