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
    <div className="u-rounded-2xl u-border u-border-gray-100 u-bg-white u-p-6 u-shadow-sm">
      {icon ? <div className="u-mb-3">{icon}</div> : null}
      <h3 className="u-text-sm u-sm-text-base u-font-extrabold u-text-gray-900">
        {title}
      </h3>
      <p className="u-mt-3 u-text-sm u-sm-text-base u-leading-relaxed u-text-gray-600">
        {text}
      </p>
    </div>
  );
}
