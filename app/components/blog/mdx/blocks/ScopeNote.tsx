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
    <div className="my-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
      <div className="text-sm font-semibold text-amber-900">
        Область применимости
      </div>
      <div className="mt-1 text-sm text-amber-900/80">
        Актуально для: <span className="font-semibold">{region}</span>
      </div>

      {children ? (
        <div className="mt-3 text-sm leading-relaxed text-amber-900/80">
          {children}
        </div>
      ) : null}
    </div>
  );
}
