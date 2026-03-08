// components/RegulationPage.tsx
import type { Lang } from "@/dictionaries/header";
import type {
  RegulationDictionary,
  RegulationTable,
} from "@/dictionaries/privacyRegulation";

type Props = {
  lang: Lang;
  t: RegulationDictionary;
};

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="u-text-xl u-sm-text-2xl u-font-extrabold u-text-gray-900 u-mt-10">
      {children}
    </h2>
  );
}

function RegulationTableView({ table }: { table: RegulationTable }) {
  return (
    <div className="u-mt-4 u-overflow-x-auto u-rounded-2xl u-border u-border-gray-200 u-bg-white">
      <table className="u-min-w-full u-text-left u-text-sm">
        <thead className="u-bg-gray-50">
          <tr>
            {table.headers.map((h, idx) => (
              <th key={idx} className="u-px-4 u-py-3 u-font-semibold u-text-gray-900">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rIdx) => (
            <tr key={rIdx} className="u-border-t u-border-gray-200">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="u-px-4 u-py-3 u-text-gray-700 u-align-top">
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

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="u-mt-4 u-text-sm u-sm-text-base u-text-gray-700 u-leading-relaxed">
      {items.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="u-h-3" />;

        const isBullet = trimmed.startsWith("• ");
        if (isBullet) {
          return (
            <ul key={i} className="u-list-disc u-pl-5 u-text-gray-700 u-my-2">
              <li className="u-text-left">{trimmed.replace(/^•\s*/, "")}</li>
            </ul>
          );
        }

        return (
          <p
            key={i}
            className="u-my-2 u-text-justify u-hyphens-auto"
            style={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

export default function RegulationPage({ t }: Props) {
  return (
    <section className="u-py-10 u-sm-py-14 u-bg-gray-50">
      <div className="u-max-w-6xl u-mx-auto u-px-4">
        <h1 className="u-text-3xl u-sm-text-4xl u-font-bold u-text--1a3a5f">
          {t.pageTitle}
        </h1>

        {t.updatedAt ? (
          <p className="u-mt-3 u-text-xs u-sm-text-sm u-text-gray-500">
            {t.updatedLabel}: {t.updatedAt}
          </p>
        ) : null}

        <div className="u-mt-6 u-rounded-2xl u-bg-white u-border u-border-gray-100 u-shadow-sm u-p-6 u-sm-p-8">
          {t.sections.map((s, idx) => (
            <div key={idx}>
              <SectionTitle>{s.title}</SectionTitle>

              {s.paragraphs?.length ? <Paragraphs items={s.paragraphs} /> : null}

              {s.tables?.map((table, tIdx) => (
                <RegulationTableView key={tIdx} table={table} />
              ))}

              {s.links?.length ? (
                <div className="u-mt-4 u-text-sm u-text-gray-700">
                  {s.links.map((l, i) => (
                    <p key={i} className="u-my-1">
                      {l.label}{" "}
                      <a
                        href={l.href}
                        className="u-text--1a3a5f u-underline u-underline-offset-2"
                      >
                        {l.text}
                      </a>
                    </p>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
