"use client";

import { useEffect, useState } from "react";
import type { GreenCardPageDictionary } from "@/dictionaries/greenCardPage";

type RegionKey = "group1" | "group2";
type VehicleKey = "passenger" | "bus" | "truck" | "trailer" | "motorcycle" | "tractor";
type PeriodKey = "1" | "3" | "6" | "12";

const RATES_USD: Record<RegionKey, Record<VehicleKey, Record<PeriodKey, number>>> = {
  group1: {
    passenger: { 1: 16, 3: 39, 6: 78, 12: 141 },
    bus: { 1: 146, 3: 372, 6: 556, 12: 1055 },
    truck: { 1: 65, 3: 87, 6: 194, 12: 362 },
    trailer: { 1: 6, 3: 10, 6: 39, 12: 65 },
    motorcycle: { 1: 13, 3: 32, 6: 52, 12: 78 },
    tractor: { 1: 23, 3: 49, 6: 74, 12: 97 },
  },
  group2: {
    passenger: { 1: 55, 3: 126, 6: 239, 12: 453 },
    bus: { 1: 237, 3: 495, 6: 855, 12: 1546 },
    truck: { 1: 116, 3: 343, 6: 647, 12: 971 },
    trailer: { 1: 16, 3: 42, 6: 72, 12: 91 },
    motorcycle: { 1: 42, 3: 92, 6: 132, 12: 173 },
    tractor: { 1: 45, 3: 102, 6: 146, 12: 190 },
  },
};

type Props = { dict: GreenCardPageDictionary["calculator"] };

type NbkRateResponse = { ok: boolean; rate?: number | string; message?: string };

function formatKzt(value: number): string {
  try {
    return Number(value).toLocaleString("ru-RU");
  } catch {
    return String(Math.round(value));
  }
}

export default function GreenCardCalculator({ dict }: Props) {
  const [region, setRegion] = useState<RegionKey>("group1");
  const [vehicle, setVehicle] = useState<VehicleKey>("passenger");
  const [period, setPeriod] = useState<PeriodKey>("12");
  const [rate, setRate] = useState<string>("");
  const [autoRateNote, setAutoRateNote] = useState<string>("");
  const [result, setResult] = useState<string>("");

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
    const kztRate = Number(rate.replace(",", "."));

    if (!Number.isFinite(kztRate) || kztRate <= 0) {
      setResult(dict.errorInvalidRate);
      return;
    }

    const priceKzt = priceUsd * kztRate;
    setResult(`${dict.resultPrefix} ${priceUsd}$ ${dict.resultApprox} ${formatKzt(priceKzt)}₸`);
  }

  return (
    <section className="py-12 sm:py-16 bg-[#F4F6FA]">
      <div className="gc-calculator" id="green-card-calculator">
        <h3 className="text-2xl sm:text-3xl">{dict.title}</h3>
        <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">{dict.subtitle}</p>

        <div className="gc-row">
          <label htmlFor="gc-region">{dict.labels.region}</label>
          <select id="gc-region" value={region} onChange={(e) => setRegion(e.target.value as RegionKey)}>
            <option value="group1">{dict.regionOptions.group1}</option>
            <option value="group2">{dict.regionOptions.group2}</option>
          </select>
        </div>

        <div className="gc-row">
          <label htmlFor="gc-vehicle">{dict.labels.vehicle}</label>
          <select id="gc-vehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value as VehicleKey)}>
            <option value="passenger">{dict.vehicleOptions.passenger}</option>
            <option value="bus">{dict.vehicleOptions.bus}</option>
            <option value="truck">{dict.vehicleOptions.truck}</option>
            <option value="trailer">{dict.vehicleOptions.trailer}</option>
            <option value="motorcycle">{dict.vehicleOptions.motorcycle}</option>
            <option value="tractor">{dict.vehicleOptions.tractor}</option>
          </select>
        </div>

        <div className="gc-row">
          <label htmlFor="gc-period">{dict.labels.period}</label>
          <select id="gc-period" value={period} onChange={(e) => setPeriod(e.target.value as PeriodKey)}>
            <option value="12">{dict.periodOptions["12"]}</option>
            <option value="6">{dict.periodOptions["6"]}</option>
            <option value="3">{dict.periodOptions["3"]}</option>
            <option value="1">{dict.periodOptions["1"]}</option>
          </select>
        </div>

        <div className="gc-row">
          <label htmlFor="gc-exchangeRate">{dict.labels.rate}</label>
          <input
            id="gc-exchangeRate"
            type="number"
            min={1}
            step="0.01"
            inputMode="decimal"
            placeholder={dict.ratePlaceholder}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className="gc-note" aria-live="polite">{autoRateNote}</div>

        <button type="button" className="gc-btn" onClick={handleCalculate}>
          {dict.calcButton}
        </button>

        <div className="gc-result" id="gc-result">
          <h3 className="mt-2 text-2xl sm:text-3xl">{result}</h3>
        </div>
      </div>
    </section>
  );
}
