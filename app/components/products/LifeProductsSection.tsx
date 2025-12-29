// app/components/products/LifeProductsSection.tsx
import Link from "next/link";
import type { Lang } from "@/dictionaries/header";
import type { ProductsPageUI } from "@/dictionaries/products";
import {
  getLifeProductsSectionDictionary,
  type LifeProductsSectionDictionary,
} from "@/dictionaries/products/lifeProductsSection";

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

function Actions({
  base,
  primaryLabel,
  secondaryLabel,
}: {
  base: string;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <>
      <Link
        href={`${base}/contacts`}
        className={cx(
          "inline-flex items-center justify-center rounded-xl px-4 py-2",
          "bg-[#23376C] text-white hover:opacity-95 transition",
          "text-sm font-medium"
        )}
      >
        {primaryLabel}
      </Link>
      <Link
        href={`${base}/contacts`}
        className={cx(
          "inline-flex items-center justify-center rounded-xl px-4 py-2",
          "border border-black/10 bg-white hover:bg-white/70 transition",
          "text-sm font-medium text-[#0f2238]"
        )}
      >
        {secondaryLabel}
      </Link>
    </>
  );
}

export default function LifeProductsSection({ lang, base, ui }: Props) {
  const dict: LifeProductsSectionDictionary =
    getLifeProductsSectionDictionary(lang);

  return (
    <section id="life" className="py-10 sm:py-14 bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Заголовок блока */}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3A5F]">
              {dict.topTitle}
            </h2>
            <p className="mt-2 text-gray-700">{dict.topLead}</p>
          </div>

          {/* Якорь */}
          <div className="text-sm text-gray-600">
            <span className="mr-2">{ui.quick ?? dict.quickLabel}:</span>
            <span className="font-mono">#life</span>
          </div>
        </div>

        {/* 2 большие карточки */}
        <div className="mt-7 space-y-6">
          {/* 1) Term / Risk */}
          <CardShell
            title={dict.term.title}
            subtitle={dict.term.subtitle}
            badges={dict.term.badges}
            actions={
              <Actions
                base={base}
                primaryLabel={dict.term.actions.pickSumTerm}
                secondaryLabel={dict.term.actions.policyForBank}
              />
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {dict.whoTitle}
                </h4>
                <BulletList items={dict.term.who} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {dict.keyQuestionsTitle}
                </h4>
                <KeyValueList rows={dict.term.qa} note={dict.term.note} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                {dict.brokerTitle}
              </h4>
              <BulletList items={dict.brokerBullets} />
            </div>
          </CardShell>

          {/* 2) Savings / Endowment */}
          <CardShell
            title={dict.savings.title}
            subtitle={dict.savings.subtitle}
            badges={dict.savings.badges}
            actions={
              <Actions
                base={base}
                primaryLabel={dict.savings.actions.calcContribution}
                secondaryLabel={dict.savings.actions.checkTaxBenefit}
              />
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {dict.whoTitle}
                </h4>
                <BulletList items={dict.savings.who} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {dict.keyQuestionsTitle}
                </h4>
                <KeyValueList rows={dict.savings.qa} note={dict.savings.note} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                {dict.brokerTitle}
              </h4>
              <BulletList items={dict.brokerBullets} />
            </div>
          </CardShell>
        </div>
      </div>
    </section>
  );
}
