import React from "react";

type Status = "actual" | "needs-check" | "archived";

type Props = {
  status: Status;
  reason?: string;
};

function statusUi(status: Status) {
  switch (status) {
    case "actual":
      return {
        label: "Актуально",
        classes:
          "border-emerald-200 bg-emerald-50 text-emerald-900",
      };
    case "needs-check":
      return {
        label: "Требует проверки",
        classes:
          "border-amber-200 bg-amber-50 text-amber-900",
      };
    case "archived":
      return {
        label: "Архив",
        classes: "border-gray-200 bg-gray-50 text-gray-800",
      };
  }
}

export default function ContentStatus({ status, reason }: Props) {
  const ui = statusUi(status);

  return (
    <div className={`my-6 rounded-2xl border p-5 ${ui.classes}`}>
      <div className="text-sm font-semibold">
        Статус материала: <span className="font-bold">{ui.label}</span>
      </div>
      {reason ? (
        <div className="mt-2 text-sm leading-relaxed opacity-80">{reason}</div>
      ) : null}
    </div>
  );
}
