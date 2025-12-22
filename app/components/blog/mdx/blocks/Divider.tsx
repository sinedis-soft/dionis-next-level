import React from "react";

type Props = {
  label?: string;
};

export default function Divider({ label }: Props) {
  if (!label) {
    return <hr className="my-10 border-gray-200" />;
  }

  return (
    <div className="my-10 flex items-center gap-4">
      <div className="h-px flex-1 bg-gray-200" />
      <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
        {label}
      </span>
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}
