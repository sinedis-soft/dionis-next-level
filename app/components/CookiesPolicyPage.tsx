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

function getPolicyUi(lang: Lang) {
  if (lang === "en") {
    return {
      eyebrow: "Privacy center",
      navigation: "Document sections",
      updatedFallback: "Reviewed regularly",
      tableScrollHint: "Scroll the table horizontally if needed.",
    };
  }

  if (lang === "kz") {
    return {
      eyebrow: "Құпиялылық орталығы",
      navigation: "Құжат бөлімдері",
      updatedFallback: "Тұрақты түрде қайта қаралады",
      tableScrollHint: "Қажет болса, кестені көлденең жылжытыңыз.",
    };
  }

  return {
    eyebrow: "Центр конфиденциальности",
    navigation: "Разделы документа",
    updatedFallback: "Регулярно пересматривается",
    tableScrollHint: "При необходимости прокрутите таблицу по горизонтали.",
  };
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="cp-h2">{children}</h2>;
}

function PolicyTableView({ table, hint }: { table: PolicyTable; hint: string }) {
  return (
    <div className="cp-tableBlock">
      <p className="cp-tableHint">{hint}</p>
      <div className="cp-tableWrap" tabIndex={0}>
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

export default function CookiesPolicyPage({ lang, t }: Props) {
  const ui = getPolicyUi(lang);
  const lead = t.sections[0]?.paragraphs?.[0];

  return (
    <section className="cp-page">
      <div className="cp-container">
        <header className="cp-hero">
          <p className="cp-eyebrow">{ui.eyebrow}</p>
          <h1 className="cp-h1">{t.pageTitle}</h1>
          {lead ? <p className="cp-lead">{lead}</p> : null}
          <p className="cp-updated">
            {t.updatedAt
              ? `${t.updatedLabel}: ${t.updatedAt}`
              : `${t.updatedLabel}: ${ui.updatedFallback}`}
          </p>
        </header>

        <div className="cp-layout">
          <aside className="cp-toc" aria-label={ui.navigation}>
            <p className="cp-tocTitle">{ui.navigation}</p>
            <nav className="cp-tocNav">
              {t.sections.map((section, idx) => (
                <a key={idx} className="cp-tocLink" href={`#policy-section-${idx + 1}`}>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="cp-card">
            {t.sections.map((s, idx) => (
              <section id={`policy-section-${idx + 1}`} key={idx} className="cp-section">
                <SectionTitle>{s.title}</SectionTitle>

                {s.paragraphs?.length ? <Paragraphs items={s.paragraphs} /> : null}

                {s.tables?.map((table, tIdx) => (
                  <PolicyTableView key={tIdx} table={table} hint={ui.tableScrollHint} />
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
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
