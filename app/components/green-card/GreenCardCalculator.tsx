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
}> = [
  { key: "passenger", labelKey: "passenger" },
  { key: "bus", labelKey: "bus" },
  { key: "truck", labelKey: "truck" },
  { key: "trailer", labelKey: "trailer" },
  { key: "motorcycle", labelKey: "motorcycle" },
  { key: "tractor", labelKey: "tractor" },
];

const PERIOD_ITEMS: Array<{
  key: PeriodKey;
  labelKey: keyof Props["dict"]["periodOptions"];
}> = [
  { key: "12", labelKey: "12" },
  { key: "6", labelKey: "6" },
  { key: "3", labelKey: "3" },
  { key: "1", labelKey: "1" },
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

type SegmentedOption<T extends string> = {
  key: T;
  label: string;
};

function SegmentedButtons<T extends string>({
  legend,
  value,
  onChange,
  options,
  variant = "default",
}: {
  legend: string;
  value: T;
  onChange: (value: T) => void;
  options: Array<SegmentedOption<T>>;
  variant?: "default" | "region" | "vehicle" | "period";
}) {
  return (
    <div className={`field gc-calc__field gc-calc__field--${variant}`}>
      <div className="label">{legend}</div>

      <div
        className={`gc-seg gc-seg--${variant}`}
        role="radiogroup"
        aria-label={legend}
      >
        {options.map((option) => {
          const active = option.key === value;

          return (
            <button
              key={option.key}
              type="button"
              className={`gc-seg__btn ${active ? "gc-seg__btn--active" : ""}`}
              onClick={() => onChange(option.key)}
              role="radio"
              aria-checked={active}
            >
              <span className="gc-seg__text">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
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
  }, [dict.errorInvalidRate, dict.resultApprox, kztRate, markupMode, period, region, vehicle]);

  const statusId = "gc-calc-note";

  return (
    <section className="gc-calc" id="green-card-calculator">
      <div className="gc-container">
        <div className="card card--pad">
          <div className="gc-calc__head">
            <h2 className="gc-calc__title">{dict.title}</h2>
            <p className="gc-calc__subtitle">{dict.subtitle}</p>
          </div>

          <div className="gc-calc__form">
            <SegmentedButtons
              legend={dict.labels.region}
              value={region}
              onChange={setRegion}
              variant="region"
              options={REGION_ITEMS.map((item) => ({
                key: item.key,
                label: dict.regionOptions[item.labelKey],
              }))}
            />

            <SegmentedButtons
              legend={dict.labels.vehicle}
              value={vehicle}
              onChange={setVehicle}
              variant="vehicle"
              options={VEHICLE_ITEMS.map((item) => ({
                key: item.key,
                label: dict.vehicleOptions[item.labelKey],
              }))}
            />

            <SegmentedButtons
              legend={dict.labels.period}
              value={period}
              onChange={setPeriod}
              variant="period"
              options={PERIOD_ITEMS.map((item) => ({
                key: item.key,
                label: dict.periodOptions[item.labelKey],
              }))}
            />

            <div className="field gc-calc__field">
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
                aria-describedby={statusId}
              />
            </div>

            <div id={statusId} aria-live="polite" className="status gc-calc__status">
              {autoRateNote}
            </div>

            <div className="gc-calc__result" role="status" aria-live="polite">
              <div className="gc-calc__resultLabel">{dict.resultPrefix}</div>

              {result.error ? (
                <div className="gc-calc__resultError">{result.error}</div>
              ) : (
                <div className="gc-calc__resultValue">
                  <span className="gc-calc__usd">{result.usd}</span>
                  <span className="gc-calc__approx">{result.approx}</span>
                  <span className="gc-calc__kzt">{result.kzt}</span>
                </div>
              )}
            </div>

            <div className="gc-calc__cta">
              <Link
                href={dict.labels.orderEuropeHref}
                className="btn btn-primary btn-wide"
                aria-label={dict.labels.orderEuropeLabel}
              >
                {dict.labels.orderEuropeLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}