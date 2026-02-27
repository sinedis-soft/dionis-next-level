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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="cp-h2">{children}</h2>;
}

function PolicyTableView({ table }: { table: PolicyTable }) {
  return (
    <div className="cp-tableWrap">
      <table className="cp-table">
        <thead>
          <tr>
            {table.headers.map((h, idx) => (
              <th key={idx} className="cp-th">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {table.rows.map((row, rIdx) => (
            <tr key={rIdx} className="cp-tr">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="cp-td">
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
  const blocks: Array<
    | { type: "spacer"; key: string }
    | { type: "p"; key: string; text: string }
    | { type: "ul"; key: string; items: string[] }
  > = [];

  let buf: string[] = [];

  const flush = (key: string) => {
    if (!buf.length) return;
    blocks.push({ type: "ul", key, items: buf });
    buf = [];
  };

  items.forEach((line, i) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flush(`ul-${i}`);
      blocks.push({ type: "spacer", key: `sp-${i}` });
      return;
    }

    const isBullet = /^•\s+/.test(trimmed);
    if (isBullet) {
      buf.push(trimmed.replace(/^•\s+/, ""));
      return;
    }

    flush(`ul-${i}`);
    blocks.push({ type: "p", key: `p-${i}`, text: line });
  });

  flush("ul-end");

  return (
    <div className="cp-text">
      {blocks.map((b) => {
        if (b.type === "spacer") return <div key={b.key} className="cp-spacer" />;

        if (b.type === "ul") {
          return (
            <ul key={b.key} className="cp-ul">
              {b.items.map((it, idx) => (
                <li key={`${b.key}-${idx}`} className="cp-li">
                  {it}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={b.key} className="cp-p">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}

export default function CookiesPolicyPage({ t }: Props) {
  return (
    <section className="cp-page">
      <div className="cp-container">
        <h1 className="cp-h1">{t.pageTitle}</h1>

        {t.updatedAt ? (
          <p className="cp-updated">
            {t.updatedLabel}: {t.updatedAt}
          </p>
        ) : null}

        <div className="cp-card">
          {t.sections.map((s, idx) => (
            <div key={idx} className="cp-section">
              <SectionTitle>{s.title}</SectionTitle>

              {s.paragraphs?.length ? <Paragraphs items={s.paragraphs} /> : null}

              {s.tables?.map((table, tIdx) => (
                <PolicyTableView key={tIdx} table={table} />
              ))}

              {s.links?.length ? (
                <div className="cp-links">
                  {s.links.map((l, i) => (
                    <p key={i} className="cp-linkRow">
                      <span className="cp-linkLabel">{l.label} </span>
                      <a
                        href={l.href}
                        className="cp-link"
                        target="_blank"
                        rel="noopener noreferrer"
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