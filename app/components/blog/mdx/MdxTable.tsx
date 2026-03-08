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
    <div className="u-my-6 u-w-full u-overflow-x-auto u-rounded-xl u-border u-border-gray-200">
      <table
        {...props}
        className={`u-min-w-max u-w-full u-border-collapse u-text-sm ${props.className ?? ""}`.trim()}
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
      className={`u-border-b u-border-gray-200 ${props.className ?? ""}`.trim()}
    />
  );
}

export function MdxTh(
  props: React.ThHTMLAttributes<HTMLTableCellElement>
) {
  return (
    <th
      {...props}
      className={`u-bg-gray-50 u-px-3 u-py-2 u-text-left u-font-semibold u-text-gray-900 ${props.className ?? ""}`.trim()}
    />
  );
}

export function MdxTd(
  props: React.TdHTMLAttributes<HTMLTableCellElement>
) {
  return (
    <td
      {...props}
      className={`u-px-3 u-py-2 u-align-top u-text-gray-800 ${props.className ?? ""}`.trim()}
    />
  );
}
