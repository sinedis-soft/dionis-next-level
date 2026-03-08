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
          "u-inline-flex u-items-center u-justify-center u-rounded-xl u-px-4 u-py-2",
          "u-bg--23376c u-text-white u-hover-opacity-95 u-transition",
          "u-text-sm u-font-medium"
        )}
      >
        {primaryLabel}
      </Link>
      <Link
        href={`${base}/contacts`}
        className={cx(
          "u-inline-flex u-items-center u-justify-center u-rounded-xl u-px-4 u-py-2",
          "u-border u-border-black-10 u-bg-white u-hover-bg-white-70 u-transition",
          "u-text-sm u-font-medium u-text--0f2238"
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
    <section id="life" className="u-py-10 u-sm-py-14 u-bg--f7f7f7">
      <div className="u-max-w-6xl u-mx-auto u-px-4">
        {/* Заголовок блока */}
        <div className="u-flex u-items-end u-justify-between u-gap-6 u-flex-wrap">
          <div className="u-max-w-4xl">
            <h2 className="u-text-2xl u-sm-text-3xl u-font-bold u-text--1a3a5f">
              {dict.topTitle}
            </h2>
            <p className="u-mt-2 u-text-gray-700">{dict.topLead}</p>
          </div>

          {/* Якорь */}
          <div className="u-text-sm u-text-gray-600">
            <span className="u-mr-2">{ui.quick ?? dict.quickLabel}:</span>
            <span className="u-font-mono">#life</span>
          </div>
        </div>

        {/* 2 большие карточки */}
        <div className="u-mt-7 u-space-y-6">
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
            <div className="u-grid u-gap-6 u-lg-grid-cols-2">
              <div className="u-rounded-2xl u-border u-border-black-10 u-p-5">
                <h4 className="u-text-base u-font-semibold u-text--1a3a5f u-mb-3">
                  {dict.whoTitle}
                </h4>
                <BulletList items={dict.term.who} />
              </div>

              <div className="u-rounded-2xl u-border u-border-black-10 u-p-5">
                <h4 className="u-text-base u-font-semibold u-text--1a3a5f u-mb-3">
                  {dict.keyQuestionsTitle}
                </h4>
                <KeyValueList rows={dict.term.qa} note={dict.term.note} />
              </div>
            </div>

            <div className="u-rounded-2xl u-border u-border-black-10 u-p-5">
              <h4 className="u-text-base u-font-semibold u-text--1a3a5f u-mb-3">
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
            <div className="u-grid u-gap-6 u-lg-grid-cols-2">
              <div className="u-rounded-2xl u-border u-border-black-10 u-p-5">
                <h4 className="u-text-base u-font-semibold u-text--1a3a5f u-mb-3">
                  {dict.whoTitle}
                </h4>
                <BulletList items={dict.savings.who} />
              </div>

              <div className="u-rounded-2xl u-border u-border-black-10 u-p-5">
                <h4 className="u-text-base u-font-semibold u-text--1a3a5f u-mb-3">
                  {dict.keyQuestionsTitle}
                </h4>
                <KeyValueList rows={dict.savings.qa} note={dict.savings.note} />
              </div>
            </div>

            <div className="u-rounded-2xl u-border u-border-black-10 u-p-5">
              <h4 className="u-text-base u-font-semibold u-text--1a3a5f u-mb-3">
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
