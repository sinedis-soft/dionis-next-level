import React from "react";

type Props = {
  date: string; // "2025-12-21" или "21.12.2025"
  note?: string;
};

export default function UpdateNotice({ date, note }: Props) {
  return (
    <div className="my-6 rounded-2xl border border-sky-200 bg-sky-50 p-5">
      <div className="text-sm font-semibold text-sky-900">
        Дата актуальности: <span className="font-bold">{date}</span>
      </div>
      {note ? (
        <div className="mt-2 text-sm leading-relaxed text-sky-900/80">
          {note}
        </div>
      ) : null}
    </div>
  );
}
