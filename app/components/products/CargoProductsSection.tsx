// app/components/products/CargoProductsSection.tsx
import Link from "next/link";
import type { Lang } from "@/dictionaries/header";
import type { ProductsPageUI } from "@/dictionaries/products";
import { getCargoProductsSectionDictionary } from "@/dictionaries/products/cargoProductsSection";

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
    <div className="u-flex u-items-start u-justify-between u-gap-4 u-flex-wrap">
      <div className="u-max-w-4xl">
        <h3 className="u-text-xl u-sm-text-2xl u-font-bold u-text--0f2238">{children}</h3>
        {sub ? <p className="u-mt-2 u-text-sm u-sm-text-base u-text-gray-700">{sub}</p> : null}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="u-space-y-2 u-text-sm u-text-gray-700">
      {items.map((x) => (
        <li key={x} className="u-flex u-gap-2">
          <span aria-hidden className="u-mt--2px">
            •
          </span>
          <span>{x}</span>
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
      <div className="u-space-y-3 u-text-sm">
        {rows.map((row) => (
          <div
            key={row.k}
            className="u-flex u-items-start u-justify-between u-gap-4 u-border-b u-border-black-5 u-pb-3 u-last-border-b-0 u-last-pb-0"
          >
            <div className="u-font-medium u-text--0f2238">{row.k}</div>
            <div className="u-text-gray-700 u-text-right u-max-w--70">{row.v}</div>
          </div>
        ))}
      </div>
      {note ? <p className="u-mt-4 u-text-xs u-text-gray-500">{note}</p> : null}
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
    <article className="u-rounded-2xl u-border u-border-black-10 u-bg-white u-shadow-sm u-p-6 u-sm-p-8">
      <div className="u-flex u-items-start u-justify-between u-gap-4 u-flex-wrap">
        <SectionTitle sub={subtitle}>{title}</SectionTitle>

        {badges?.length ? (
          <div className="u-flex u-gap-2 u-flex-wrap">
            {badges.map((b) => (
              <span
                key={b}
                className="u-text-xs u-px-2 u-py-1 u-rounded-full u-bg--f4f6fa u-text--1a3a5f u-border u-border-black-5"
              >
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="u-mt-6 u-space-y-6">{children}</div>

      {actions ? <div className="u-mt-7 u-flex u-flex-col u-sm-flex-row u-gap-3">{actions}</div> : null}
    </article>
  );
}

function SubBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="u-rounded-2xl u-border u-border-black-10 u-p-5 u-sm-p-6 u-bg-white">
      <h4 className="u-text-base u-sm-text-lg u-font-semibold u-text--1a3a5f u-mb-3">{title}</h4>
      {children}
    </div>
  );
}

export default function CargoProductsSection({ lang, base, ui }: Props) {
  const d = getCargoProductsSectionDictionary(lang);

  const bObj = d.blocks.object;
  const bRisks = d.blocks.risks;
  const bDiff = d.blocks.cmrVsCargo;
  const bTerr = d.blocks.territory;
  const bBroker = d.blocks.broker;
  const bPrice = d.blocks.price;

  return (
    <section id="cargo" className="u-py-10 u-sm-py-14 u-bg--f7f7f7">
      <div className="u-max-w-6xl u-mx-auto u-px-4">
        <div className="u-flex u-items-end u-justify-between u-gap-6 u-flex-wrap">
          <div className="u-max-w-4xl">
            <h2 className="u-text-2xl u-sm-text-3xl u-font-bold u-text--1a3a5f">{d.topTitle}</h2>
            <p className="u-mt-2 u-text-gray-700">{d.topLead}</p>
          </div>

          <div className="u-text-sm u-text-gray-600">
            <span className="u-mr-2">{ui.quick}:</span>
            <span className="u-font-mono">#cargo</span>
          </div>
        </div>

        <div className="u-mt-7">
          <CardShell
            title={d.cardTitle}
            subtitle={d.cardSubtitle}
            badges={d.badges}
            actions={
              <>
                <Link href={`${base}/contacts`} className="btn btn-secondary" role="button">
                  {d.actions.quoteBtn}
                </Link>
                <a href="tel:+77273573030" className="btn" role="button">
                  +7 (727) 357-30-30
                </a>
              </>
            }
          >
            {/* 1) Object */}
            <SubBlock title={bObj.title}>
              <p className="u-text-sm u-text-gray-700 u-mb-4">{bObj.subtitle}</p>

              <div className="u-grid u-gap-6 u-lg-grid-cols-2">
                <div>
                  <div className="u-text-xs u-text-gray-600 u-mb-2">{bObj.metaLine}</div>

                  <h5 className="u-text-sm u-font-semibold u-text--1a3a5f u-mb-3">{bObj.whoTitle}</h5>
                  <BulletList items={bObj.whoItems} />
                </div>

                <div>
                  <h5 className="u-text-sm u-font-semibold u-text--1a3a5f u-mb-3">{bObj.kvTitle}</h5>
                  <KeyValueList rows={bObj.kvRows} note={bObj.note} />
                </div>
              </div>
            </SubBlock>

            {/* 2) ICC */}
            <SubBlock title={bRisks.title}>
              <p className="u-text-sm u-text-gray-700 u-mb-4">{bRisks.subtitle}</p>

              <div className="u-grid u-gap-6 u-lg-grid-cols-2">
                <div>
                  <div className="u-text-xs u-text-gray-600 u-mb-2">{bRisks.leftMeta}</div>
                  <h5 className="u-text-sm u-font-semibold u-text--1a3a5f u-mb-3">
                    {bRisks.variantsTitle}
                  </h5>
                  <BulletList items={bRisks.variantsItems} />
                </div>

                <div>
                  <h5 className="u-text-sm u-font-semibold u-text--1a3a5f u-mb-3">{bRisks.faqTitle}</h5>
                  <KeyValueList rows={bRisks.faqRows} note={bRisks.note} />
                </div>
              </div>
            </SubBlock>

            {/* 3) CMR vs Cargo */}
            <SubBlock title={bDiff.title}>
              <p className="u-text-sm u-text-gray-700 u-mb-4">{bDiff.subtitle}</p>
              <KeyValueList rows={bDiff.rows} note={bDiff.note} />
            </SubBlock>

            {/* 4) Territory */}
            <SubBlock title={bTerr.title}>
              <BulletList items={bTerr.items} />
            </SubBlock>

            {/* 5) Broker */}
            <SubBlock title={bBroker.title}>
              <p className="u-text-sm u-text-gray-700 u-mb-4">{bBroker.lead}</p>
              <BulletList items={bBroker.items} />
            </SubBlock>

            {/* 6) Price */}
            <SubBlock title={bPrice.title}>
              <BulletList items={bPrice.items} />
            </SubBlock>
          </CardShell>
        </div>
      </div>
    </section>
  );
}
