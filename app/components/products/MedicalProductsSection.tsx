// app/components/products/MedicalProductsSection.tsx
import Link from "next/link";
import type { Lang } from "@/dictionaries/header";
import type { ProductsPageUI } from "@/dictionaries/products";
import {
  getMedicalProductsSectionDictionary,
  type MedicalProductsSectionDictionary,
} from "@/dictionaries/products/medicalProductsSection";

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

function SectionHeader({
  title,
  lead,
  anchor,
  ui,
}: {
  title: string;
  lead: string;
  anchor: string;
  ui: ProductsPageUI;
}) {
  return (
    <div className="flex items-end justify-between gap-6 flex-wrap">
      <div className="max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1A3A5F]">
          {title}
        </h2>
        <p className="mt-2 text-gray-700">{lead}</p>
      </div>

      <div className="text-sm text-gray-600">
        <span className="mr-2">{ui.quick}:</span>
        <span className="font-mono">#{anchor}</span>
      </div>
    </div>
  );
}

export default function MedicalProductsSection({ lang, base, ui }: Props) {
  const dict: MedicalProductsSectionDictionary =
    getMedicalProductsSectionDictionary(lang);

  return (
    <section id={dict.anchor} className="py-10 sm:py-14 bg-[#F7F7F7]">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <SectionHeader
          title={dict.top.title}
          lead={dict.top.lead}
          anchor={dict.anchor}
          ui={ui}
        />

        {/* OSMS vs DMS */}
        <div className="mt-6 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-[#1A3A5F] mb-3">
            {dict.top.diffTitle}
          </h3>
          <KeyValueList rows={dict.top.diffRows} />
        </div>

        {/* CARDS */}
        <div className="mt-7 space-y-6">
          {/* DMS */}
          <CardShell
            title={dict.cards.dms.title}
            subtitle={dict.cards.dms.subtitle}
            badges={dict.cards.dms.badges}
            actions={
              <>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "bg-[#23376C] text-white hover:opacity-95 transition",
                    "text-sm font-medium"
                  )}
                >
                  {dict.cards.dms.actions.primary}
                </Link>

                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {dict.cards.dms.actions.secondary}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {dict.cards.dms.clinicsTitle}
                </h4>
                <BulletList items={dict.cards.dms.clinics} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {dict.cards.dms.includedTitle}
                </h4>
                <KeyValueList
                  rows={dict.cards.dms.includedRows}
                  note={dict.cards.dms.includedNote}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                {dict.cards.dms.brokerTitle}
              </h4>
              <BulletList items={dict.cards.dms.brokerBullets} />
            </div>
          </CardShell>

          {/* ACCIDENT */}
          <CardShell
            title={dict.cards.accident.title}
            subtitle={dict.cards.accident.subtitle}
            badges={dict.cards.accident.badges}
            actions={
              <>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "bg-[#23376C] text-white hover:opacity-95 transition",
                    "text-sm font-medium"
                  )}
                >
                  {dict.cards.accident.actions.primary}
                </Link>

                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {dict.cards.accident.actions.secondary}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {dict.cards.accident.whoTitle}
                </h4>
                <BulletList items={dict.cards.accident.whoBullets} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {dict.cards.accident.howTitle}
                </h4>
                <KeyValueList
                  rows={dict.cards.accident.howRows}
                  note={dict.cards.accident.note}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-2">
                {dict.cards.accident.scheduleTitle}
              </h4>
              <p className="text-sm text-gray-700">
                {dict.cards.accident.scheduleText}
              </p>
            </div>
          </CardShell>

          {/* TRAVEL */}
          <CardShell
            title={dict.cards.travel.title}
            subtitle={dict.cards.travel.subtitle}
            badges={dict.cards.travel.badges}
            actions={
              <>
                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "bg-[#23376C] text-white hover:opacity-95 transition",
                    "text-sm font-medium"
                  )}
                >
                  {dict.cards.travel.actions.primary}
                </Link>

                <Link
                  href={`${base}/contacts`}
                  className={cx(
                    "inline-flex items-center justify-center rounded-xl px-4 py-2",
                    "border border-black/10 bg-white hover:bg-white/70 transition",
                    "text-sm font-medium text-[#0f2238]"
                  )}
                >
                  {dict.cards.travel.actions.secondary}
                </Link>
              </>
            }
          >
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {dict.cards.travel.whoTitle}
                </h4>
                <BulletList items={dict.cards.travel.whoBullets} />
              </div>

              <div className="rounded-2xl border border-black/10 p-5">
                <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                  {dict.cards.travel.howTitle}
                </h4>
                <BulletList items={dict.cards.travel.steps} />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 p-5">
              <h4 className="text-base font-semibold text-[#1A3A5F] mb-3">
                {dict.cards.travel.optionsTitle}
              </h4>
              <KeyValueList
                rows={dict.cards.travel.optionsRows}
                note={dict.cards.travel.optionsNote}
              />
            </div>
          </CardShell>
        </div>
      </div>
    </section>
  );
}
