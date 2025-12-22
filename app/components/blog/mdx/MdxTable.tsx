// components/blog/mdx/MdxTable.tsx
import React from "react";

/**
 * Обёртка таблицы:
 * - горизонтальный скролл на мобильных
 * - аккуратная рамка
 */
export function MdxTable(
  props: React.TableHTMLAttributes<HTMLTableElement>
) {
  return (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-gray-200">
      <table
        {...props}
        className={`min-w-max w-full border-collapse text-sm ${props.className ?? ""}`.trim()}
      />
    </div>
  );
}

export function MdxThead(
  props: React.HTMLAttributes<HTMLTableSectionElement>
) {
  return <thead {...props} />;
}

export function MdxTbody(
  props: React.HTMLAttributes<HTMLTableSectionElement>
) {
  return <tbody {...props} />;
}

export function MdxTr(
  props: React.HTMLAttributes<HTMLTableRowElement>
) {
  return (
    <tr
      {...props}
      className={`border-b border-gray-200 ${props.className ?? ""}`.trim()}
    />
  );
}

export function MdxTh(
  props: React.ThHTMLAttributes<HTMLTableCellElement>
) {
  return (
    <th
      {...props}
      className={`bg-gray-50 px-3 py-2 text-left font-semibold text-gray-900 ${props.className ?? ""}`.trim()}
    />
  );
}

export function MdxTd(
  props: React.TdHTMLAttributes<HTMLTableCellElement>
) {
  return (
    <td
      {...props}
      className={`px-3 py-2 align-top text-gray-800 ${props.className ?? ""}`.trim()}
    />
  );
}
