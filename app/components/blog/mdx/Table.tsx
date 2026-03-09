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
    <div className="not-prose my-8 overflow-x-auto">
      <table className="w-full border-collapse rounded-xl overflow-hidden border">
        {caption ? (
          <caption className="text-left text-sm text-gray-600 mb-2">
            {caption}
          </caption>
        ) : null}

        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th
                key={c}
                className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-900"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="odd:bg-white even:bg-gray-50">
              {r.map((cell, j) => (
                <td key={j} className="border-b px-4 py-3 text-sm text-gray-800">
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
