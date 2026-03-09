// app/components/products/LiabilityProductsSection.tsx
import Link from "next/link";
import type { Lang } from "@/dictionaries/header";
import type { ProductsPageUI } from "@/dictionaries/products";
import { getLiabilityProductsSectionDictionary } from "@/dictionaries/products/liabilityProductsSection";

function cx(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

type Props = {
  lang: Lang;
  base: string;
  ui: ProductsPageUI; // kept for compatibility; quick label now comes from section dictionary
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
        <h3 className="text-xl sm:text-2xl font-bold text-[#0f2238]">
          {children}
        </h3>
        {sub ? (
          <p className="mt-2 text-sm sm:text-base text-gray-700">{sub}</p>
        ) : null}
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

      {actions ? (
        <div className="mt-6 flex flex-col sm:flex-row gap-3">{actions}</div>
      ) : null}
    </article>
  );
}

function ActionButton({
  href,
  kind,
  children,
}: {
  href: string;
  kind: "primary" | "secondary";
  children: React.ReactNode;
}) {
  const className =
    kind === "primary"
      ? cx(
          "inline-flex items-center justify-center rounded-xl px-4 py-2",
          "bg-[#23376C] text-white hover:opacity-95 transition",
          "text-sm font-medium"
        )
      : cx(
          "inline-flex items-center justify-center rounded-xl px-4 py-2",
          "border border-black/10 bg-white hover:bg-white/70 transition",
          "text-sm font-medium text-[#0f2238]"
        );

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function LiabilityProductsSection({ lang, base }: Props) {
  const d = getLiabilityProductsSectionDictionary(lang);

  return (
    <section id="liability" className="py-10 sm:py-14 bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3A5F]">
              {d.topTitle}
            </h2>
            <p className="mt-2 text-gray-700">{d.topLead}</p>
          </div>

          <div className="text-sm text-gray-600">
            <span className="mr-2">{d.anchorLabel}:</span>
            <span className="font-mono">{d.anchorValue}</span>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-7 space-y-6">
          {d.cards.map((card) => (
            <CardShell
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              badges={card.badges}
              actions={
                <>
                  {card.actions?.[0] ? (
                    <ActionButton href={`${base}/contacts`} kind={card.actions[0].kind}>
                      {card.actions[0].label}
                    </ActionButton>
                  ) : null}
                  {card.actions?.[1] ? (
                    <ActionButton href={`${base}/contacts`} kind={card.actions[1].kind}>
                      {card.actions[1].label}
                    </ActionButton>
                  ) : null}
                </>
              }
            >
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-black/10 p-5">
                  <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                    {card.whoTitle}
                  </h4>
                  <BulletList items={card.whoItems} />
                </div>

                <div className="rounded-2xl border border-black/10 p-5">
                  <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                    {card.qaTitle}
                  </h4>
                  <KeyValueList rows={card.qaRows} note={card.note} />
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {d.brokerTitle}
                </h4>
                <BulletList items={d.brokerItems} />
              </div>
            </CardShell>
          ))}
        </div>
      </div>
    </section>
  );
}
