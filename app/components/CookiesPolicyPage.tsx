// components/CookiesPolicyPage.tsx
import type { Lang } from "@/dictionaries/header";
import type {
  CookiesPolicyDictionary,
  PolicyTable,
} from "@/dictionaries/privacyCookies";

type Props = {
  lang: Lang;
  t: CookiesPolicyDictionary;
};

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-10">
      {children}
    </h2>
  );
}

function PolicyTableView({ table }: { table: PolicyTable }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-gray-50">
          <tr>
            {table.headers.map((h, idx) => (
              <th
                key={idx}
                className="px-4 py-3 font-semibold text-gray-900"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rIdx) => (
            <tr key={rIdx} className="border-t border-gray-200">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="px-4 py-3 text-gray-700 align-top">
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
    <div className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
      {items.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-3" />;

        const isBullet = trimmed.startsWith("• ");
        if (isBullet) {
          return (
            <ul key={i} className="list-disc pl-5 text-gray-700 my-2">
              <li className="text-left">{trimmed.replace(/^•\s*/, "")}</li>
            </ul>
          );
        }

        return (
          <p
            key={i}
            className="my-2 text-justify [hyphens:auto]"
            style={{ textAlign: "justify", textJustify: "inter-word" }}
          >
            {line}
          </p>
        );
      })}
    </div>
  );
}

export default function CookiesPolicyPage({ t }: Props) {
  return (
    <section className="py-10 sm:py-14 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1A3A5F]">
          {t.pageTitle}
        </h1>

        {t.updatedAt ? (
          <p className="mt-3 text-xs sm:text-sm text-gray-500">
            {t.updatedLabel}: {t.updatedAt}
          </p>
        ) : null}

        <div className="mt-6 rounded-2xl bg-white border border-gray-100 shadow-sm p-6 sm:p-8">
          {t.sections.map((s, idx) => (
            <div key={idx}>
              <SectionTitle>{s.title}</SectionTitle>

              {s.paragraphs?.length ? <Paragraphs items={s.paragraphs} /> : null}

              {s.tables?.map((table, tIdx) => (
                <PolicyTableView key={tIdx} table={table} />
              ))}

              {s.links?.length ? (
                <div className="mt-4 text-sm text-gray-700">
                  {s.links.map((l, i) => (
                    <p key={i} className="my-1">
                      {l.label}{" "}
                      <a
                        href={l.href}
                        className="text-[#1A3A5F] underline underline-offset-2"
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
