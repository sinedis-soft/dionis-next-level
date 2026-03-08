type Cell = string | number;

export default function Table({
  columns,
  rows,
  caption,
}: {
  columns: string[];
  rows: Cell[][];
  caption?: string;
}) {
  return (
    <div className="u-not-prose u-my-8 u-overflow-x-auto">
      <table className="u-w-full u-border-collapse u-rounded-xl u-overflow-hidden u-border">
        {caption ? (
          <caption className="u-text-left u-text-sm u-text-gray-600 u-mb-2">
            {caption}
          </caption>
        ) : null}

        <thead className="u-bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                className="u-border-b u-px-4 u-py-3 u-text-left u-text-sm u-font-semibold u-text-gray-900"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="u-odd-bg-white u-even-bg-gray-50">
              {r.map((cell, j) => (
                <td key={j} className="u-border-b u-px-4 u-py-3 u-text-sm u-text-gray-800">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
