import type { ReactNode } from "react";

export default function FeatureCard({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {icon ? <div className="mb-3">{icon}</div> : null}
      <h3 className="text-sm sm:text-base font-extrabold text-gray-900">
        {title}
      </h3>
      <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-600">
        {text}
      </p>
    </div>
  );
}
