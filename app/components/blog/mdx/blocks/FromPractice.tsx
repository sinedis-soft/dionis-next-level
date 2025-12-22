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
    <section className="my-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-gray-700">{children}</div>
    </section>
  );
}
