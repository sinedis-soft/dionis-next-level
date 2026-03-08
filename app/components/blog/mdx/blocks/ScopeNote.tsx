import React from "react";

type Props = {
  region?: string; // например: "РК", "PL", "EU"
  children?: React.ReactNode;
};

export default function ScopeNote({
  region = "РК",
  children,
}: Props) {
  return (
    <div className="u-my-6 u-rounded-2xl u-border u-border-amber-200 u-bg-amber-50 u-p-5">
      <div className="u-text-sm u-font-semibold u-text-amber-900">
        Область применимости
      </div>
      <div className="u-mt-1 u-text-sm u-text-amber-900-80">
        Актуально для: <span className="u-font-semibold">{region}</span>
      </div>

      {children ? (
        <div className="u-mt-3 u-text-sm u-leading-relaxed u-text-amber-900-80">
          {children}
        </div>
      ) : null}
    </div>
  );
}
