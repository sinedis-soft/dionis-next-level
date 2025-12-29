// app/components/products/CargoProductsSection.tsx
import Link from "next/link";
import type { Lang } from "@/dictionaries/header";
import type { ProductsPageUI } from "@/dictionaries/products";
import { getCargoProductsSectionDictionary } from "@/dictionaries/products/cargoProductsSection";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

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
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="max-w-4xl">
        <h3 className="text-xl sm:text-2xl font-bold text-[#0f2238]">{children}</h3>
        {sub ? <p className="mt-2 text-sm sm:text-base text-gray-700">{sub}</p> : null}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm text-gray-700">
      {items.map((x) => (
        <li key={x} className="flex gap-2">
          <span aria-hidden className="mt-[2px]">
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
      <div className="space-y-3 text-sm">
        {rows.map((row) => (
          <div
            key={row.k}
            className="flex items-start justify-between gap-4 border-b border-black/5 pb-3 last:border-b-0 last:pb-0"
          >
            <div className="font-medium text-[#0f2238]">{row.k}</div>
            <div className="text-gray-700 text-right max-w-[70%]">{row.v}</div>
          </div>
        ))}
      </div>
      {note ? <p className="mt-4 text-xs text-gray-500">{note}</p> : null}
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
    <article className="rounded-2xl border border-black/10 bg-white shadow-sm p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <SectionTitle sub={subtitle}>{title}</SectionTitle>

        {badges?.length ? (
          <div className="flex gap-2 flex-wrap">
            {badges.map((b) => (
              <span
                key={b}
                className="text-xs px-2 py-1 rounded-full bg-[#F4F6FA] text-[#1A3A5F] border border-black/5"
              >
                {b}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-6 space-y-6">{children}</div>

      {actions ? <div className="mt-7 flex flex-col sm:flex-row gap-3">{actions}</div> : null}
    </article>
  );
}

function SubBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-black/10 p-5 sm:p-6 bg-white">
      <h4 className="text-base sm:text-lg font-semibold text-[#1A3A5F] mb-3">{title}</h4>
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
    <section id="cargo" className="py-10 sm:py-14 bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3A5F]">{d.topTitle}</h2>
            <p className="mt-2 text-gray-700">{d.topLead}</p>
          </div>

          <div className="text-sm text-gray-600">
            <span className="mr-2">{ui.quick}:</span>
            <span className="font-mono">#cargo</span>
          </div>
        </div>

        <div className="mt-7">
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
              <p className="text-sm text-gray-700 mb-4">{bObj.subtitle}</p>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="text-xs text-gray-600 mb-2">{bObj.metaLine}</div>

                  <h5 className="text-sm font-semibold text-[#1A3A5F] mb-3">{bObj.whoTitle}</h5>
                  <BulletList items={bObj.whoItems} />
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-[#1A3A5F] mb-3">{bObj.kvTitle}</h5>
                  <KeyValueList rows={bObj.kvRows} note={bObj.note} />
                </div>
              </div>
            </SubBlock>

            {/* 2) ICC */}
            <SubBlock title={bRisks.title}>
              <p className="text-sm text-gray-700 mb-4">{bRisks.subtitle}</p>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="text-xs text-gray-600 mb-2">{bRisks.leftMeta}</div>
                  <h5 className="text-sm font-semibold text-[#1A3A5F] mb-3">
                    {bRisks.variantsTitle}
                  </h5>
                  <BulletList items={bRisks.variantsItems} />
                </div>

                <div>
                  <h5 className="text-sm font-semibold text-[#1A3A5F] mb-3">{bRisks.faqTitle}</h5>
                  <KeyValueList rows={bRisks.faqRows} note={bRisks.note} />
                </div>
              </div>
            </SubBlock>

            {/* 3) CMR vs Cargo */}
            <SubBlock title={bDiff.title}>
              <p className="text-sm text-gray-700 mb-4">{bDiff.subtitle}</p>
              <KeyValueList rows={bDiff.rows} note={bDiff.note} />
            </SubBlock>

            {/* 4) Territory */}
            <SubBlock title={bTerr.title}>
              <BulletList items={bTerr.items} />
            </SubBlock>

            {/* 5) Broker */}
            <SubBlock title={bBroker.title}>
              <p className="text-sm text-gray-700 mb-4">{bBroker.lead}</p>
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
