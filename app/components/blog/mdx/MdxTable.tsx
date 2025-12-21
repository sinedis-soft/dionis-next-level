import type { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react";

export function MdxTable(props: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="not-prose my-8 overflow-x-auto">
      <table
        {...props}
        className={[
          "w-full border-collapse overflow-hidden rounded-xl border",
          props.className ?? "",
        ].join(" ")}
      />
    </div>
  );
}

export function MdxThead(props: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      {...props}
      className={["bg-gray-50", props.className ?? ""].join(" ")}
    />
  );
}

export function MdxTbody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} className={props.className ?? ""} />;
}

export function MdxTr(props: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      {...props}
      className={[
        "odd:bg-white even:bg-gray-50",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export function MdxTh(props: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      className={[
        "border-b px-4 py-3 text-left text-sm font-semibold text-gray-900",
        props.className ?? "",
      ].join(" ")}
    />
  );
}

export function MdxTd(props: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      {...props}
      className={[
        "border-b px-4 py-3 text-sm text-gray-800 align-top",
        props.className ?? "",
      ].join(" ")}
    />
  );
}
