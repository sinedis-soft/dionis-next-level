type Props = {
  version?: string;
  changes?: string[];
};

export default function Changelog({ version, changes }: Props) {
  if (!version && (!changes || changes.length === 0)) return null;

  return (
    <section className="u-mt-16 u-rounded-2xl u-border u-border-slate-200 u-bg-slate-50 u-p-6">
      <div className="u-mb-3 u-text-sm u-font-semibold u-text-slate-700">
        История обновлений
        {version && (
          <span className="u-ml-2 u-rounded u-bg-slate-200 u-px-2 u-py-0-5 u-text-xs">
            v{version}
          </span>
        )}
      </div>

      {changes && changes.length > 0 && (
        <ul className="u-list-disc u-space-y-1 u-pl-5 u-text-sm u-text-slate-700">
          {changes.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
