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
      passenger:{1:16.24, 3:40.59, 6:81.18, 12:147.47},
      bus:{1:152.21, 3:388.97, 6:581.76, 12:1102.65},
      truck:{1:67.65, 3:91.32, 6:202.94, 12:1102.65},  
      trailer:{1:6.76, 3:10.15, 6:40.59, 12:67.65},
      motorcycle:{1:13.53, 3:33.82, 6:54.12, 12:81.18},
      tractor:{1:23.68, 3:50.74, 6:77.79, 12:101.47}
  },

  group2: {
      passenger:{1:57.5, 3:131.91, 6:250.29, 12:473.53},
      bus:{1:248.26, 3:517.5, 6:893.62, 12:1616.09},
      truck:{1:121.76, 3:358.53, 6:676.47, 12:1014.71},
      trailer:{1:16.91, 3:43.97, 6:75.76, 12:94.71},
      motorcycle:{1:43.97, 3:96.06, 6:138.0, 12:180.62},
      tractor:{1:46.97, 3:106.21, 6:152.21, 12:198.21}
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
    const priceUsd = RATES_USD[region][vehicle][period];
    const kztRate = parseRate(rate);

    if (!Number.isFinite(kztRate) || kztRate <= 0) {
      setResult(dict.errorInvalidRate);
      return;
    }

    // ▶ расчёт
    const priceKztRaw = priceUsd * kztRate;

    // ▶ округление до 2 знаков
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
