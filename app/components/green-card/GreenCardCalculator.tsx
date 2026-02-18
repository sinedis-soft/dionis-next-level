"use client";

import { useEffect, useMemo, useState } from "react";
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
      passenger:{1:14.12, 3:35.29, 6:70.59, 12:128.24},
      bus:{1:132.35, 3:338.24, 6:505.88, 12:958.82},
      truck:{1:58.82, 3:79.41, 6:176.47, 12:329.41},  
      trailer:{1:5.88, 3:8.82, 6:35.29, 12:58.82},
      motorcycle:{1:11.76, 3:29.41, 6:47.06, 12:70.59},
      tractor:{1:20.59, 3:44.12, 6:67.65, 12:88.24}
  },

  group2: {
      passenger:{1:50.00, 3:114.71, 6:217.65, 12:411.76},
      bus:{1:215.88, 3:450.00, 6:777.06, 12:1405.29},
      truck:{1:105.88, 3:311.76, 6:588.24, 12:882.35},
      trailer:{1:14.71, 3:38.24, 6:65.88, 12:82.35},
      motorcycle:{1:38.24, 3:83.53, 6:120.00, 12:157.06},
      tractor:{1:40.59, 3:92.35, 6:132.35, 12:172.35}
  },
};

type Props = { dict: GreenCardPageDictionary["calculator"] };

type NbkRateResponse = { ok: boolean; rate?: number | string; message?: string };

function formatKzt(value: number): string {
  const rounded = Math.round(value * 100) / 100;

  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
}

type MarkupMode = "weekday" | "holiday";

const MARKUP: Record<MarkupMode, number> = {
  weekday: 1.015, // +1.5%
  holiday: 1.02,  // +2%
};

function applyNewMarkup(legacyPrice: number, mode: MarkupMode): number {
  const base = legacyPrice   
  const updated = base * MARKUP[mode];           // добавили нужную наценку
  return Math.round(updated * 100) / 100;         // 2 знака
}

function parseRate(raw: string): number {
  const normalized = raw.replace(",", ".").trim();
  const n = Number(normalized);
  return n;
}

export default function GreenCardCalculator({ dict }: Props) {
  const [region, setRegion] = useState<RegionKey>("group1");
  const [vehicle, setVehicle] = useState<VehicleKey>("passenger");
  const [period, setPeriod] = useState<PeriodKey>("12");
  const [rate, setRate] = useState<string>("");
  const [autoRateNote, setAutoRateNote] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [markupMode, setMarkupMode] = useState<MarkupMode>("weekday");

  // общий класс для инпутов/селектов — как в ContactForm
  const fieldClass = useMemo(
    () =>
      "w-full rounded-md border border-gray-300 px-3 py-2 text-sm " +
      "focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A] bg-white",
    []
  );

  useEffect(() => {
    async function autoFillKztRate() {
      try {
        const resp = await fetch("/api/nbk-rate");
        const data = (await resp.json()) as NbkRateResponse;

        if (!resp.ok || !data?.ok || !data.rate) {
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

  function handleCalculate() {
  const legacyUsd = RATES_USD[region][vehicle][period];     // с +15%
  const priceUsd = applyNewMarkup(legacyUsd, markupMode);   // с 1.5%/2%
  const kztRate = parseRate(rate);

  if (!Number.isFinite(kztRate) || kztRate <= 0) {
      setResult(dict.errorInvalidRate);
      return;
    }

    const priceKztRaw = priceUsd * kztRate;
    const priceKzt = Math.round(priceKztRaw * 100) / 100;

    setResult(
      `${dict.resultPrefix} ${priceUsd}$ ${dict.resultApprox} ${formatKzt(priceKzt)}\u00A0₸`
    );
  }


  const statusId = "gc-calc-note";

  return (
    <section className="py-12 sm:py-16 bg-[#F4F6FA]" id="green-card-calculator">
      <div className="max-w-6xl mx-auto px-4">
        <div className="card p-6 sm:p-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F]">
              {dict.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              {dict.subtitle}
            </p>
          </div>

          {/* form */}
          <div className="mt-8 space-y-4">
            {/* ROW: region */}
            <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-4 items-start sm:items-center">
              <label
                htmlFor="gc-region"
                className="text-sm font-medium text-gray-700 sm:text-right"
              >
                {dict.labels.region}
              </label>

              <select
                id="gc-region"
                className={fieldClass}
                value={region}
                onChange={(e) => setRegion(e.target.value as RegionKey)}
              >
                <option value="group1">{dict.regionOptions.group1}</option>
                <option value="group2">{dict.regionOptions.group2}</option>
              </select>
            </div>

            {/* ROW: vehicle */}
            <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-4 items-start sm:items-center">
              <label
                htmlFor="gc-vehicle"
                className="text-sm font-medium text-gray-700 sm:text-right"
              >
                {dict.labels.vehicle}
              </label>

              <select
                id="gc-vehicle"
                className={fieldClass}
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value as VehicleKey)}
              >
                <option value="passenger">{dict.vehicleOptions.passenger}</option>
                <option value="bus">{dict.vehicleOptions.bus}</option>
                <option value="truck">{dict.vehicleOptions.truck}</option>
                <option value="trailer">{dict.vehicleOptions.trailer}</option>
                <option value="motorcycle">{dict.vehicleOptions.motorcycle}</option>
                <option value="tractor">{dict.vehicleOptions.tractor}</option>
              </select>
            </div>

            {/* ROW: period */}
            <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-4 items-start sm:items-center">
              <label
                htmlFor="gc-period"
                className="text-sm font-medium text-gray-700 sm:text-right"
              >
                {dict.labels.period}
              </label>

              <select
                id="gc-period"
                className={fieldClass}
                value={period}
                onChange={(e) => setPeriod(e.target.value as PeriodKey)}
              >
                <option value="12">{dict.periodOptions["12"]}</option>
                <option value="6">{dict.periodOptions["6"]}</option>
                <option value="3">{dict.periodOptions["3"]}</option>
                <option value="1">{dict.periodOptions["1"]}</option>
              </select>
            </div>

            {/* ROW: rate */}
            <div className="grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-2 sm:gap-4 items-start sm:items-center">
              <label
                htmlFor="gc-exchangeRate"
                className="text-sm font-medium text-gray-700 sm:text-right"
              >
                {dict.labels.rate}
              </label>

              <input
                id="gc-exchangeRate"
                className={fieldClass}
                type="text"
                inputMode="decimal"
                placeholder={dict.ratePlaceholder}
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                aria-describedby={statusId}
              />
            </div>

            {/* note */}
            <div
              id={statusId}
              aria-live="polite"
              className="text-xs sm:text-sm text-gray-600"
            >
              {autoRateNote}
            </div>

            {/* button */}
            <div className="pt-2">
              <button
                type="button"
                className="btn btn-secondary w-full"
                onClick={handleCalculate}
              >
                {dict.calcButton}
              </button>
            </div>

            {/* result */}
            <div
              className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5"
              role="status"
              aria-live="polite"
            >
              <div className="text-sm text-gray-600">{dict.resultPrefix}</div>
              <div className="mt-1 text-xl sm:text-2xl font-extrabold text-[#1A3A5F]">
                {result || "\u00A0"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
