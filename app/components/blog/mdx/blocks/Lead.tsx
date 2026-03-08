import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function Lead({ children }: Props) {
  if (!children) return null;

  return (
    <p className="u-mt-2 u-text-lg u-sm-text-xl u-leading-relaxed u-text-gray-700">
      {children}
    </p>
  );
}
