// app/components/products/AutoProductsSection.tsx
import Link from "next/link";
import type { Lang } from "@/dictionaries/header";
import type { ProductsPageUI } from "@/dictionaries/products";
import { getAutoProductsSectionDictionary } from "@/dictionaries/products/autoProductsSection";

type Props = {
  lang: Lang;
  base: string;
  ui: ProductsPageUI;
};

function SectionTitle({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: React.ReactNode;
}) {
  return (
    <div className="aps-titleRow">
      <div className="aps-titleCol">
        <h3 className="aps-cardTitle">{children}</h3>
        {sub ? <p className="aps-cardSub">{sub}</p> : null}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="aps-bullets">
      {items.map((x) => (
        <li key={x} className="aps-bullets__item">
          <span aria-hidden className="aps-bullets__dot">
            •
          </span>
          <span className="aps-bullets__text">{x}</span>
        </li>
      ))}
    </ul>
  );
}

function KeyValueList({
  rows,
  note,
}: {
  rows: Array<{ k: string; v: string }>;
  note?: string;
}) {
  return (
    <div>
      <div className="aps-kv">
        {rows.map((row) => (
          <div key={row.k} className="aps-kv__row">
            <div className="aps-kv__k">{row.k}</div>
            <div className="aps-kv__v">{row.v}</div>
          </div>
        ))}
      </div>
      {note ? <p className="aps-note">{note}</p> : null}
    </div>
  );
}

function CardShell({
  title,
  subtitle,
  badges,
  children,
  actions,
}: {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  badges?: string[];
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <article className="aps-card">
      <div className="aps-cardHead">
        <SectionTitle sub={subtitle}>{title}</SectionTitle>

        {badges?.length ? (
          <div className="aps-badges">
            {badges.map((b) => (
              <span key={b} className="aps-badge">
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="aps-cardBody">{children}</div>

      {actions ? <div className="aps-actions">{actions}</div> : null}
    </article>
  );
}

export default function AutoProductsSection({ lang, base, ui }: Props) {
  const dict = getAutoProductsSectionDictionary(lang);

  return (
    <section id="auto" className="aps-section">
      <div className="gc-container">
        {/* Заголовок блока */}
        <div className="aps-top">
          <div className="aps-top__copy">
            <h2 className="aps-h2">{dict.top.title}</h2>
            <p className="aps-lead">{dict.top.lead}</p>
          </div>

          {/* Якорь */}
          <div className="aps-anchor">
            <span className="aps-anchor__label">{ui.quick}:</span>
            <span className="aps-anchor__hash">#auto</span>
          </div>
        </div>

        {/* 3 большие карточки */}
        <div className="aps-stack">
          {/* GREEN CARD */}
          <CardShell
            title={dict.greenCard.title}
            subtitle={dict.greenCard.subtitle}
            badges={[dict.top.badges.online, dict.top.badges.international]}
            actions={
              <>
                <Link href={`${base}/green-card`} className="aps-btn aps-btn--primary">
                  {ui.btnGreenCard}
                </Link>

                <Link href={`${base}/contacts`} className="aps-btn aps-btn--ghost">
                  {dict.top.askQuestion}
                </Link>
              </>
            }
          >
            <div className="aps-grid2">
              <div className="aps-box">
                <h4 className="aps-h4">{dict.greenCard.whoTitle}</h4>
                <BulletList items={dict.greenCard.whoItems} />
              </div>

              <div className="aps-box">
                <h4 className="aps-h4">{dict.greenCard.includedTitle}</h4>
                <KeyValueList
                  rows={dict.greenCard.includedRows}
                  note={dict.greenCard.note}
                />
              </div>
            </div>

            <div className="aps-box">
              <h4 className="aps-h4">{dict.greenCard.brokerTitle}</h4>
              <BulletList items={dict.greenCard.brokerItems} />
            </div>
          </CardShell>

          {/* OSAGO RF */}
          <CardShell
            title={dict.osago.title}
            subtitle={dict.osago.subtitle}
            badges={[dict.top.badges.online, dict.top.badges.russiaEntry]}
            actions={
              <>
                <Link href={`${base}/osago-rf`} className="aps-btn aps-btn--primary">
                  {ui.btnOsago}
                </Link>

                <Link href={`${base}/contacts`} className="aps-btn aps-btn--ghost">
                  {dict.top.clarifyTermRoute}
                </Link>
              </>
            }
          >
            <div className="aps-grid2">
              <div className="aps-box">
                <h4 className="aps-h4">{dict.osago.whoTitle}</h4>
                <BulletList items={dict.osago.whoItems} />
              </div>

              <div className="aps-box">
                <h4 className="aps-h4">{dict.osago.includedTitle}</h4>
                <KeyValueList rows={dict.osago.includedRows} note={dict.osago.note} />
              </div>
            </div>

            <div className="aps-box">
              <h4 className="aps-h4">{dict.osago.brokerTitle}</h4>
              <BulletList items={dict.osago.brokerItems} />
            </div>

            <div className="aps-box">
              <h4 className="aps-h4">{dict.top.routeBundleTitle}</h4>
              <p className="aps-p">{dict.top.routeBundleText}</p>
            </div>
          </CardShell>

          {/* CASCO KZ */}
          <CardShell
            title={dict.casco.title}
            subtitle={dict.casco.subtitle}
            badges={[dict.top.badges.onRequest, dict.top.badges.kazakhstan]}
            actions={
              <>
                <Link href={`${base}/contacts`} className="aps-btn aps-btn--primary">
                  {dict.top.cascoCta}
                </Link>

                <a href="tel:+77273573030" className="aps-btn aps-btn--ghost">
                  +7 (727) 357-30-30
                </a>
              </>
            }
          >
            <div className="aps-grid2">
              <div className="aps-box">
                <h4 className="aps-h4">{dict.casco.whoTitle}</h4>
                <BulletList items={dict.casco.whoItems} />
              </div>

              <div className="aps-box">
                <h4 className="aps-h4">{dict.casco.includedTitle}</h4>
                <KeyValueList rows={dict.casco.includedRows} note={dict.casco.note} />
              </div>
            </div>

            <div className="aps-box">
              <h4 className="aps-h4">{dict.casco.brokerTitle}</h4>
              <BulletList items={dict.casco.brokerItems} />
            </div>

            <div className="aps-box">
              <h4 className="aps-h4 aps-h4--tight">{dict.casco.franchiseTitle}</h4>
              <p className="aps-p">{dict.casco.franchiseText}</p>
            </div>
          </CardShell>
        </div>
      </div>
    </section>
  );
}