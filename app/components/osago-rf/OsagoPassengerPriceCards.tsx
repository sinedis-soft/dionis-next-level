"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { Lang } from "@/dictionaries/header";
import type { OsagoRfPassengerPricesDictionary } from "@/dictionaries/osagoRfPassengerPrices";
import { calculateOsagoRfPremium, convertRubToKzt, formatKzt, formatRub } from "@/lib/osago-rf-calculation";

import { emitOsagoRfRubRate, OSAGO_RF_RUB_RATE_EVENT, readOsagoRfRubRateEvent } from "@/lib/osago-rf-rate-events";


type Props = { lang: Lang; dict: OsagoRfPassengerPricesDictionary; variant?: "cards" | "table" };
type NbkRateResponse = { ok: boolean; rate?: number | string; message?: string };

const ranges = [
  { key: "hp70_99", hp: 90 },
  { key: "hp100_119", hp: 110 },
  { key: "hp120_150", hp: 130 },
  { key: "hp150plus", hp: 160 },
] as const;
const featuredTerms = [
  { key: "d15", months: 0.5, query: "15d" },
  { key: "m1", months: 1, query: "1m" },
  { key: "m12", months: 12, query: "12m" },
] as const;

const tableTerms = [
  { key: "d15", months: 0.5 },
  { key: "m1", months: 1 },
  { key: "m2", months: 2 },
  { key: "m3", months: 3 },
  { key: "m4", months: 4 },
  { key: "m5", months: 5 },
  { key: "m6", months: 6 },
  { key: "m7", months: 7 },
  { key: "m8", months: 8 },
  { key: "m9", months: 9 },
  { key: "m10", months: 10 },
  { key: "m11", months: 11 },
  { key: "m12", months: 12 },
] as const;

export default function OsagoPassengerPriceCards({ lang, dict, variant = "cards" }: Props) {
  const [rate, setRate] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    fetch("/api/nbk-rate-rub", { cache: "no-store" })
      .then((resp) => resp.json() as Promise<NbkRateResponse>)
      .then((data) => {
        const next = Number(data.rate);
        if (active && data.ok && Number.isFinite(next) && next > 0) {
          setRate(next);
          emitOsagoRfRubRate(next);
        }

      })
      .catch(() => {
        if (active) setRate(null);
      });

    const handleSharedRate = (event: Event) => {
      const next = readOsagoRfRubRateEvent(event);
      if (next !== null) setRate(next);
    };

    window.addEventListener(OSAGO_RF_RUB_RATE_EVENT, handleSharedRate);

    return () => {
      active = false;
      window.removeEventListener(OSAGO_RF_RUB_RATE_EVENT, handleSharedRate);
    };

  }, []);

  const rows = useMemo(() => ranges.map((range) => ({
    ...range,
    prices: featuredTerms.map((term) => ({
      ...term,
      price: calculateOsagoRfPremium({ policyholderType: "individual", vehicleKind: "passenger", mode: "multi", hp: range.hp, term: term.months }),
    })),
  })), []);

  return (
    <section className="gc-section osago-price" aria-labelledby="osago-passenger-prices-heading">
      <div className="gc-container">
        <div className="gc-section-head">
          <h2 id="osago-passenger-prices-heading" className="gc-h2">{variant === "table" ? dict.table.title : dict.cards.title}</h2>
          <p className="gc-text-muted">{variant === "table" ? dict.table.subtitle : dict.cards.subtitle}</p>
          {rate ? <p className="osago-price__rate">{dict.cards.rateUsed}: {rate.toFixed(4)} KZT/RUB</p> : null}

        </div>

        {variant === "cards" ? <div className="osago-price__groups">
          {rows.map((range) => (
            <section key={range.key} className="osago-price__group" aria-labelledby={`${range.key}-heading`}>
              <h3 id={`${range.key}-heading`} className="osago-price__range">{dict.cards.ranges[range.key]}</h3>
              <div className="osago-price__cards">
                {range.prices.map((term) => {
                  const kzt = rate ? convertRubToKzt(term.price.bufferedRub, rate) : null;
                  const href = `/${lang}/osago-rf/passenger-car-prices?vehicle=passenger&policyholderType=individual&mode=multi&term=${term.query}&hp=${range.hp}&powerRange=${range.key}#osago-rf-order`;
                  return (
                    <article key={term.key} className="card osago-price-card">
                      <div className="osago-price-card__term">{dict.cards.terms[term.key]}</div>
                      <div className="osago-price-card__range">{dict.cards.ranges[range.key]}</div>
                      <div className="osago-price-card__price">{kzt === null ? dict.cards.kztPending : `${formatKzt(kzt)} ₸`}</div>
                      <div className="osago-price-card__rub">{dict.cards.rubApprox}: {formatRub(term.price.bufferedRub)} RUB</div>
                      <ul className="osago-price-card__tags">
                        <li>{dict.cards.individual}</li>
                        <li>{dict.cards.multidrive}</li>
                      </ul>
                      <p className="osago-price-card__note">{dict.cards.electronicPolicy}</p>
                      <Link href={href} className="btn btn-secondary btn-wide">{dict.cards.cta}</Link>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div> : null}

        {variant === "table" ? <div className="osago-price-table" aria-labelledby="osago-passenger-prices-heading">
          <div className="osago-price-table__scroll">
            <table>
              <thead><tr><th>{dict.table.termHeader}</th>{ranges.map((r) => <th key={r.key}>{dict.cards.ranges[r.key]}</th>)}</tr></thead>
              <tbody>{tableTerms.map((term) => <tr key={term.key}><th>{dict.cards.terms[term.key]}</th>{ranges.map((range) => { const price = calculateOsagoRfPremium({ policyholderType: "individual", vehicleKind: "passenger", mode: "multi", hp: range.hp, term: term.months }); const kzt = rate ? convertRubToKzt(price.bufferedRub, rate) : null; return <td key={range.key}>{kzt === null ? dict.table.pending : `${formatKzt(kzt)} ₸`}</td>; })}</tr>)}</tbody>
            </table>
          </div>
        </div> : null}
      </div>
    </section>
  );
}
