import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function Lead({ children }: Props) {
  if (!children) return null;

  return (
    <p className="mt-2 text-lg sm:text-xl leading-relaxed text-gray-700">
      {children}
    </p>
  );
}
