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
    <div className="u-flex u-items-start u-justify-between u-gap-4 u-flex-wrap">
      <div className="u-max-w-4xl">
        <h3 className="u-text-xl u-sm-text-2xl u-font-bold u-text--0f2238">
          {children}
        </h3>
        {sub ? (
          <p className="u-mt-2 u-text-sm u-sm-text-base u-text-gray-700">{sub}</p>
        ) : null}
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

      {actions ? (
        <div className="u-mt-6 u-flex u-flex-col u-sm-flex-row u-gap-3">{actions}</div>
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
          "u-inline-flex u-items-center u-justify-center u-rounded-xl u-px-4 u-py-2",
          "u-bg--23376c u-text-white u-hover-opacity-95 u-transition",
          "u-text-sm u-font-medium"
        )
      : cx(
          "u-inline-flex u-items-center u-justify-center u-rounded-xl u-px-4 u-py-2",
          "u-border u-border-black-10 u-bg-white u-hover-bg-white-70 u-transition",
          "u-text-sm u-font-medium u-text--0f2238"
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
    <section id="liability" className="u-py-10 u-sm-py-14 u-bg--f7f7f7">
      <div className="u-max-w-6xl u-mx-auto u-px-4">
        {/* Header */}
        <div className="u-flex u-items-end u-justify-between u-gap-6 u-flex-wrap">
          <div className="u-max-w-4xl">
            <h2 className="u-text-2xl u-sm-text-3xl u-font-bold u-text--1a3a5f">
              {d.topTitle}
            </h2>
            <p className="u-mt-2 u-text-gray-700">{d.topLead}</p>
          </div>

          <div className="u-text-sm u-text-gray-600">
            <span className="u-mr-2">{d.anchorLabel}:</span>
            <span className="u-font-mono">{d.anchorValue}</span>
          </div>
        </div>

        {/* Cards */}
        <div className="u-mt-7 u-space-y-6">
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
              <div className="u-grid u-gap-6 u-lg-grid-cols-2">
                <div className="u-rounded-2xl u-border u-border-black-10 u-p-5">
                  <h4 className="u-text-base u-font-semibold u-text--1a3a5f u-mb-3">
                    {card.whoTitle}
                  </h4>
                  <BulletList items={card.whoItems} />
                </div>

                <div className="u-rounded-2xl u-border u-border-black-10 u-p-5">
                  <h4 className="u-text-base u-font-semibold u-text--1a3a5f u-mb-3">
                    {card.qaTitle}
                  </h4>
                  <KeyValueList rows={card.qaRows} note={card.note} />
                </div>
              </div>

              <div className="u-rounded-2xl u-border u-border-black-10 u-p-5">
                <h4 className="u-text-base u-font-semibold u-text--1a3a5f u-mb-3">
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
