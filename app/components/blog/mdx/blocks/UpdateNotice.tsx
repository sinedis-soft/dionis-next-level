import React from "react";

type Props = {
  date: string; // "2025-12-21" или "21.12.2025"
  note?: string;
};

export default function UpdateNotice({ date, note }: Props) {
  return (
    <div className="u-my-6 u-rounded-2xl u-border u-border-sky-200 u-bg-sky-50 u-p-5">
      <div className="u-text-sm u-font-semibold u-text-sky-900">
        Дата актуальности: <span className="u-font-bold">{date}</span>
      </div>
      {note ? (
        <div className="u-mt-2 u-text-sm u-leading-relaxed u-text-sky-900-80">
          {note}
        </div>
      ) : null}
    </div>
  );
}
