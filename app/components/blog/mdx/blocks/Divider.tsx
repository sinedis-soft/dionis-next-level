import React from "react";

type Props = {
  label?: string;
};

export default function Divider({ label }: Props) {
  if (!label) {
    return <hr className="u-my-10 u-border-gray-200" />;
  }

  return (
    <div className="u-my-10 u-flex u-items-center u-gap-4">
      <div className="u-h-px u-flex-1 u-bg-gray-200" />
      <span className="u-text-xs u-font-medium u-uppercase u-tracking-wider u-text-gray-400">
        {label}
      </span>
      <div className="u-h-px u-flex-1 u-bg-gray-200" />
    </div>
  );
}
