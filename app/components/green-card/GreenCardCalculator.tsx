"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { GreenCardPageDictionary } from "@/dictionaries/greenCardPage";

type RegionKey = "group1" | "group2";
type VehicleKey =
  | "passenger"
  | "bus"
  | "truck"
  | "trailer"
  | "motorcycle"
  | "tractor";
type PeriodKey = "1" | "3" | "6" | "12";

const RATES_USD: Record<
  RegionKey,
  Record<VehicleKey, Record<PeriodKey, number>>
> = {
  group1: {
    passenger: { 1: 14.12, 3: 35.29, 6: 70.59, 12: 128.24 },
    bus: { 1: 132.35, 3: 338.24, 6: 505.88, 12: 958.82 },
    truck: { 1: 58.82, 3: 79.41, 6: 176.47, 12: 329.41 },
    trailer: { 1: 5.88, 3: 8.82, 6: 35.29, 12: 58.82 },
    motorcycle: { 1: 11.76, 3: 29.41, 6: 47.06, 12: 70.59 },
    tractor: { 1: 20.59, 3: 44.12, 6: 67.65, 12: 88.24 },
  },
  group2: {
    passenger: { 1: 50.0, 3: 114.71, 6: 217.65, 12: 411.76 },
    bus: { 1: 215.88, 3: 450.0, 6: 777.06, 12: 1405.29 },
    truck: { 1: 105.88, 3: 311.76, 6: 588.24, 12: 882.35 },
    trailer: { 1: 14.71, 3: 38.24, 6: 65.88, 12: 82.35 },
    motorcycle: { 1: 38.24, 3: 83.53, 6: 120.0, 12: 157.06 },
    tractor: { 1: 40.59, 3: 92.35, 6: 132.35, 12: 172.35 },
  },
};

type Props = { dict: GreenCardPageDictionary["calculator"] };
type NbkRateResponse = { ok: boolean; rate?: number | string; message?: string };

type MarkupMode = "weekday" | "holiday";
const MARKUP: Record<MarkupMode, number> = { weekday: 1.015, holiday: 1.02 };

const REGION_ITEMS: Array<{
  key: RegionKey;
  labelKey: keyof Props["dict"]["regionOptions"];
}> = [
  { key: "group1", labelKey: "group1" },
  { key: "group2", labelKey: "group2" },
];

const VEHICLE_ITEMS: Array<{
  key: VehicleKey;
  labelKey: keyof Props["dict"]["vehicleOptions"];
  iconSrc: string;
}> = [
  { key: "motorcycle", labelKey: "motorcycle", iconSrc: "/green-card/moto.png" },
  { key: "passenger", labelKey: "passenger", iconSrc: "/green-card/passenger.png" },
  { key: "bus", labelKey: "bus", iconSrc: "/green-card/bus.png" },
  { key: "truck", labelKey: "truck", iconSrc: "/green-card/truck.png" },
  { key: "trailer", labelKey: "trailer", iconSrc: "/green-card/trailer.png" },
  { key: "tractor", labelKey: "tractor", iconSrc: "/green-card/tractor.png" },
];

const PERIOD_ITEMS: Array<{
  key: PeriodKey;
  labelKey: keyof Props["dict"]["periodOptions"];
}> = [
  { key: "1", labelKey: "1" },
  { key: "3", labelKey: "3" },
  { key: "6", labelKey: "6" },
  { key: "12", labelKey: "12" },
];

function formatKzt(value: number): string {
  const rounded = Math.round(value * 100) / 100;
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
}

function applyNewMarkup(legacyPrice: number, mode: MarkupMode): number {
  const updated = legacyPrice * MARKUP[mode];
  return Math.round(updated * 100) / 100;
}

function parseRateSafe(raw: string): number {
  const cleaned = raw.replace(/\s/g, "").replace(/[^0-9.,]/g, "");
  if (!cleaned) return NaN;
  const normalized = cleaned.replace(",", ".");
  return Number(normalized);
}

export default function GreenCardCalculator({ dict }: Props) {
  const [region, setRegion] = useState<RegionKey>("group2");
  const [vehicle, setVehicle] = useState<VehicleKey>("passenger");
  const [period, setPeriod] = useState<PeriodKey>("1");

  const [rate, setRate] = useState<string>("");
  const [autoRateNote, setAutoRateNote] = useState<string>("");

  const markupMode: MarkupMode = "weekday";

  useEffect(() => {
    async function autoFillKztRate() {
      try {
        const resp = await fetch("/api/nbk-rate", { cache: "no-store" });
        const data = (await resp.json()) as NbkRateResponse;

        if (!resp.ok || !data?.ok || data.rate == null) {
          throw new Error(data?.message || "NBK API returned error");
        }

        const parsed = Number(data.rate);
        if (!Number.isFinite(parsed) || parsed <= 0) {
          throw new Error(`Invalid rate: ${String(data.rate)}`);
        }

        setRate(parsed.toFixed(2));
        setAutoRateNote(dict.autoRateOk);
      } catch (e) {
        console.warn("NBK rate auto-fill failed:", e);
        setAutoRateNote(dict.autoRateError);
      }
    }

    autoFillKztRate();
  }, [dict.autoRateOk, dict.autoRateError]);

  const kztRate = useMemo(() => parseRateSafe(rate), [rate]);

  const result = useMemo(() => {
    if (!Number.isFinite(kztRate) || kztRate <= 0) {
      return { error: dict.errorInvalidRate };
    }

    const legacyUsd = RATES_USD[region][vehicle][period];
    const priceUsd = applyNewMarkup(legacyUsd, markupMode);
    const priceKzt = Math.round(priceUsd * kztRate * 100) / 100;

    return {
      usd: `${priceUsd.toFixed(2)}$`,
      kzt: `${formatKzt(priceKzt)}\u00A0₸`,
      approx: dict.resultApprox,
    };
  }, [
    dict.errorInvalidRate,
    dict.resultApprox,
    kztRate,
    markupMode,
    period,
    region,
    vehicle,
  ]);

  const selectedVehicleLabel =
    dict.vehicleOptions[
      VEHICLE_ITEMS.find((item) => item.key === vehicle)!.labelKey
    ];

  const selectedPeriodLabel =
    dict.periodOptions[
      PERIOD_ITEMS.find((item) => item.key === period)!.labelKey
    ];

  const selectedVehicleIcon =
    VEHICLE_ITEMS.find((item) => item.key === vehicle)?.iconSrc ??
    "/green-card/moto.png";

  const statusClassName =
    autoRateNote === dict.autoRateOk
      ? "status status--ok gc-calc-v3__status"
      : "status status--err gc-calc-v3__status";

  return (
    <section className="gc-calc gc-calc-v3" id="green-card-calculator">
      <div className="gc-container">
        <div className="card gc-calc-v3__card">
          <div className="gc-calc-v3__head">
            <h2 className="gc-h2">{dict.title}</h2>
            <p className="gc-text-muted gc-mt-12">{dict.subtitle}</p>
          </div>

          <div className="gc-calc-v3__desktop">
            <div className="gc-calc-v3__main">
              <div className="gc-calc-v3__region field">
                <div className="label">{dict.labels.region}</div>
                <div
                  className="gc-seg gc-seg--region"
                  role="radiogroup"
                  aria-label={dict.labels.region}
                >
                  {REGION_ITEMS.map((item) => {
                    const label = dict.regionOptions[item.labelKey];
                    const active = region === item.key;

                    return (
                      <button
                        key={item.key}
                        type="button"
                        className={`gc-seg__btn ${active ? "gc-seg__btn--active" : ""}`}
                        onClick={() => setRegion(item.key)}
                        role="radio"
                        aria-checked={active}
                      >
                        <span className="gc-seg__text">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                className="gc-calc-v3__vehicleTabs"
                role="radiogroup"
                aria-label={dict.labels.vehicle}
              >
                {VEHICLE_ITEMS.map((item) => {
                  const label = dict.vehicleOptions[item.labelKey];
                  const active = vehicle === item.key;

                  return (
                    <button
                      key={item.key}
                      type="button"
                      className={`gc-calc-v3__vehicleTab ${active ? "is-active" : ""}`}
                      onClick={() => setVehicle(item.key)}
                      role="radio"
                      aria-checked={active}
                    >
                      <span className="gc-calc-v3__vehicleIcon" aria-hidden="true">
                        <img
                          src={item.iconSrc}
                          alt=""
                          className="gc-calc-v3__vehicleIconImg"
                        />
                      </span>
                      <span className="gc-calc-v3__vehicleText">{label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="gc-calc-v3__periodRow field">
                <div className="label">{dict.labels.period}</div>
                <div
                  className="gc-seg gc-seg--period"
                  role="radiogroup"
                  aria-label={dict.labels.period}
                >
                  {PERIOD_ITEMS.map((item) => {
                    const label = dict.periodOptions[item.labelKey];
                    const active = period === item.key;

                    return (
                      <button
                        key={item.key}
                        type="button"
                        className={`gc-seg__btn ${active ? "gc-seg__btn--active" : ""}`}
                        onClick={() => setPeriod(item.key)}
                        role="radio"
                        aria-checked={active}
                      >
                        <span className="gc-seg__text">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="gc-calc-v3__rateBlock field">
                <label htmlFor="gc-exchangeRate" className="label">
                  {dict.labels.rate}
                </label>
                <input
                  id="gc-exchangeRate"
                  className="control"
                  type="text"
                  inputMode="decimal"
                  placeholder={dict.ratePlaceholder}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
                <div aria-live="polite" className={statusClassName}>
                  {autoRateNote}
                </div>
              </div>
            </div>

            <aside className="gc-calc-v3__summary">
              <div className="gc-calc-v3__summaryInner">
                <div className="gc-calc-v3__summaryIcon" aria-hidden="true">
                  <img
                    src={selectedVehicleIcon}
                    alt=""
                    className="gc-calc-v3__summaryIconImg"
                  />
                </div>

                {result.error ? (
                  <div className="gc-calc__result">
                    <div className="gc-calc__resultError">{result.error}</div>
                  </div>
                ) : (
                  <>
                    <div className="gc-calc-v3__summaryPrice">{result.usd}</div>
                    <div className="gc-calc-v3__summaryTitle">{selectedVehicleLabel}</div>
                    <div className="gc-calc-v3__summaryMeta">{selectedPeriodLabel}</div>

                    <div className="gc-calc__result gc-calc-v3__summaryResult">
                      <div className="gc-calc__resultLabel">{dict.resultPrefix}</div>
                      <div className="gc-calc__resultValue">
                        <span className="gc-calc__approx">{result.approx}</span>
                        <span className="gc-calc__kzt">{result.kzt}</span>
                      </div>
                    </div>
                  </>
                )}

                <div className="gc-calc-v3__summaryCta">
                  <Link
                    href={dict.labels.orderEuropeHref}
                    className="btn btn-primary gc-calc-v3__buyBtn"
                    aria-label={dict.labels.orderEuropeLabel}
                  >
                    {dict.labels.orderEuropeLabel}
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="gc-calc-v3__mobile">
            <div className="gc-calc-v3__mobileTop">
              <div className="field">
                <label className="label" htmlFor="gc-mobile-region">
                  {dict.labels.region}
                </label>
                <select
                  id="gc-mobile-region"
                  className="control"
                  value={region}
                  onChange={(e) => setRegion(e.target.value as RegionKey)}
                >
                  {REGION_ITEMS.map((item) => (
                    <option key={item.key} value={item.key}>
                      {dict.regionOptions[item.labelKey]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label" htmlFor="gc-mobile-vehicle">
                  {dict.labels.vehicle}
                </label>
                <select
                  id="gc-mobile-vehicle"
                  className="control"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value as VehicleKey)}
                >
                  {VEHICLE_ITEMS.map((item) => (
                    <option key={item.key} value={item.key}>
                      {dict.vehicleOptions[item.labelKey]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label" htmlFor="gc-mobile-period">
                  {dict.labels.period}
                </label>
                <select
                  id="gc-mobile-period"
                  className="control"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value as PeriodKey)}
                >
                  {PERIOD_ITEMS.map((item) => (
                    <option key={item.key} value={item.key}>
                      {dict.periodOptions[item.labelKey]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="label" htmlFor="gc-mobile-rate">
                  {dict.labels.rate}
                </label>
                <input
                  id="gc-mobile-rate"
                  className="control"
                  type="text"
                  inputMode="decimal"
                  placeholder={dict.ratePlaceholder}
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>

              <div aria-live="polite" className={statusClassName}>
                {autoRateNote}
              </div>
            </div>

            <div className="gc-calc-v3__mobileBottom">
              <div className="gc-calc-v3__summaryIcon" aria-hidden="true">
                <img
                  src={selectedVehicleIcon}
                  alt=""
                  className="gc-calc-v3__summaryIconImg"
                />
              </div>

              {result.error ? (
                <div className="gc-calc__result">
                  <div className="gc-calc__resultError">{result.error}</div>
                </div>
              ) : (
                <>
                  <div className="gc-calc-v3__summaryPrice">{result.usd}</div>
                  <div className="gc-calc-v3__summaryTitle">{selectedVehicleLabel}</div>
                  <div className="gc-calc-v3__summaryMeta">{selectedPeriodLabel}</div>

                  <div className="gc-calc__result">
                    <div className="gc-calc__resultLabel">{dict.resultPrefix}</div>
                    <div className="gc-calc__resultValue">
                      <span className="gc-calc__approx">{result.approx}</span>
                      <span className="gc-calc__kzt">{result.kzt}</span>
                    </div>
                  </div>
                </>
              )}

              <div className="gc-calc-v3__summaryCta">
                <Link
                  href={dict.labels.orderEuropeHref}
                  className="btn btn-primary gc-calc-v3__buyBtn"
                  aria-label={dict.labels.orderEuropeLabel}
                >
                  {dict.labels.orderEuropeLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}