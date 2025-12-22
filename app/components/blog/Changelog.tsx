type Props = {
  version?: string;
  changes?: string[];
};

export default function Changelog({ version, changes }: Props) {
  if (!version && (!changes || changes.length === 0)) return null;

  return (
    <section className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <div className="mb-3 text-sm font-semibold text-slate-700">
        История обновлений
        {version && (
          <span className="ml-2 rounded bg-slate-200 px-2 py-0.5 text-xs">
            v{version}
          </span>
        )}
      </div>

      {changes && changes.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
          {changes.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
