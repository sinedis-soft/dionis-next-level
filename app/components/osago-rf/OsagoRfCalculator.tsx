// components/osago-rf/OsagoRfCalculator.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

export type OsagoRfCalculatorDictionary = {
  title: string;
  subtitle: string;

  labels: {
    policyholderType: string;
    legal: string;
    individual: string;

    vehicleKind: string;
    passenger: string;
    truck: string;

    hp: string;
    carAge: string;
    term: string;

    useExp: string; // оставляем для совместимости, но UI будет табами
    driverAge: string;
    driverExp: string;

    rateRub: string;
  };

  hints: {
    hp: string;
    carAge: string;
    term: string;
    termLimited: string;

    useExp: string;
    kvsUsed: string;

    cheaperOn: string; // "{mode} дешевле на {diff}"
    moreExpensiveOn: string; // "{mode} дороже на {diff}"
    equal: string;
    modeMulti: string;
    modeLimited: string;
  };

  ratePlaceholder: string;
  autoRateOk: string;
  autoRateError: string;

  result: {
    title: string;
    rubLinePrefix: string;
    kztLinePrefix: string;
    volatilityNote: string;
    disclaimer: string;
  };

  errors: {
    invalidRate: string;
  };
};

type Props = { dict: OsagoRfCalculatorDictionary };
type NbkRateResponse = { ok: boolean; rate?: number | string; message?: string };

type PolicyholderType = "legal" | "individual";
type VehicleKind = "passenger" | "truck";
type Mode = "multi" | "limited";

// фиксированные коэффициенты
const KT = 1.7;
const KBM = 1.17;

// мультидрайв КО
const KO_MULTIDRIVE_INDIVIDUAL = 3.16;
const KO_MULTIDRIVE_LEGAL = 1.97;

// КВС таблица
const KVS_TABLE: Array<Array<number | null>> = [
  [2.27, 1.92, 1.84, 1.65, 1.62, null, null, null],
  [1.88, 1.72, 1.71, 1.13, 1.1, 1.09, null, null],
  [1.72, 1.6, 1.54, 1.09, 1.08, 1.07, 1.02, null],
  [1.56, 1.5, 1.48, 1.05, 1.04, 1.01, 0.97, 0.95],
  [1.54, 1.47, 1.46, 1.0, 0.97, 0.95, 0.94, 0.93],
  [1.5, 1.44, 1.43, 0.96, 0.95, 0.94, 0.93, 0.91],
  [1.46, 1.4, 1.39, 0.93, 0.92, 0.91, 0.9, 0.86],
  [1.43, 1.36, 1.35, 0.91, 0.9, 0.89, 0.88, 0.83],
];

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
function parseRate(raw: string): number {
  const normalized = raw.replace(",", ".").trim();
  return Number(normalized);
}
function formatKzt(value: number): string {
  const rounded = round2(value);
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
}
function formatRub(value: number): string {
  const rounded = round2(value);
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rounded);
}

function kmByHpPassenger(hp: number): number {
  if (hp >= 70 && hp < 100) return 1.1;
  if (hp >= 100 && hp < 120) return 1.2;
  if (hp >= 120 && hp <= 150) return 1.4;
  return 1.6;
}

// 0.5 = 15 дней
function kpByMonths(months: number): number {
  if (months === 0.5) return 0.2;
  if (months === 1) return 0.3;
  if (months === 2) return 0.4;
  if (months === 3) return 0.5;
  if (months === 4) return 0.6;
  if (months === 5) return 0.65;
  if (months === 6) return 0.7;
  if (months === 7) return 0.8;
  if (months === 8) return 0.9;
  if (months === 9) return 0.95;
  return 1.0;
}

function ageGroupIndex(driverAge: number): number {
  if (driverAge >= 18 && driverAge <= 21) return 0;
  if (driverAge >= 22 && driverAge <= 24) return 1;
  if (driverAge >= 25 && driverAge <= 29) return 2;
  if (driverAge >= 30 && driverAge <= 34) return 3;
  if (driverAge >= 35 && driverAge <= 39) return 4;
  if (driverAge >= 40 && driverAge <= 49) return 5;
  if (driverAge >= 50 && driverAge <= 59) return 6;
  return 7;
}

function expBandIndex(expYears: number): number {
  if (expYears < 1) return 0;
  if (expYears < 2) return 1;
  if (expYears < 3) return 2;
  if (expYears < 5) return 3;
  if (expYears < 7) return 4;
  if (expYears < 10) return 5;
  if (expYears < 15) return 6;
  return 7;
}

function kvsByAgeExp(driverAge: number, expYears: number): number {
  const r = ageGroupIndex(driverAge);
  const c = expBandIndex(expYears);
  const row = KVS_TABLE[r];
  const v = row[c];
  if (typeof v === "number") return v;

  for (let i = c; i >= 0; i--) {
    const vv = row[i];
    if (typeof vv === "number") return vv;
  }
  return 1.0;
}

function koMultidriveByPolicyholder(policyholderType: PolicyholderType): number {
  return policyholderType === "legal"
    ? KO_MULTIDRIVE_LEGAL
    : KO_MULTIDRIVE_INDIVIDUAL;
}

// БСТ по вашим правилам
function bstByRules(args: {
  policyholderType: PolicyholderType;
  vehicleKind: VehicleKind;
  term: number; // 0.5..12
  useExp: boolean; // true => ограничение (КВС), false => мульти
}): number {
  const isLegal = args.policyholderType === "legal";
  const isTruck = args.vehicleKind === "truck";
  const isShort = args.term <= 3;

  // Юрлица: мульти — 3300 (<=3м), 3800 (>=4м), независимо от типа ТС
  if (isLegal && !args.useExp) {
    return isShort ? 3300 : 3800;
  }

  // Остальное — как было
  if (isLegal && !isTruck) {
    if (args.useExp) return 6580;
  }
  if (isLegal && isTruck) {
    if (args.useExp) return 17201;
  }

  if (!isLegal && !isTruck) {
    if (args.useExp) return isShort ? 4400 : 5500;
    return isShort ? 2400 : 2500;
  }

  // Физлицо + грузовое
  if (args.useExp) return isShort ? 4400 : 5500;
  return isShort ? 2700 : 2900;
}

function replaceTokens(tpl: string, vars: Record<string, string>): string {
  return Object.keys(vars).reduce(
    (acc, k) => acc.replaceAll(`{${k}}`, vars[k]),
    tpl
  );
}

// Нормализация срока: 0.5 или целые, с учетом termMax
function normalizeTerm(raw: number, termMax: number): number {
  if (!Number.isFinite(raw)) return 1;

  let v = raw;
  if (v < 0.5) v = 0.5;
  if (v > termMax) v = termMax;

  if (v <= 0.75) return 0.5;
  return Math.round(v);
}

function termLabel(term: number): string {
  return term === 0.5 ? "15 дней" : `${term} мес.`;
}

export default function OsagoRfCalculator({ dict }: Props) {
  const [policyholderType, setPolicyholderType] =
    useState<PolicyholderType>("individual");
  const [vehicleKind, setVehicleKind] = useState<VehicleKind>("passenger");
  const [mode, setMode] = useState<Mode>("multi");

  // параметры
  const [hp, setHp] = useState<number>(120);
  const [carAge, setCarAge] = useState<number>(5);
  const [term, setTerm] = useState<number>(1);

  const [driverAge, setDriverAge] = useState<number>(22);
  const [driverExp, setDriverExp] = useState<number>(0);

  // курс KZT за 1 RUB
  const [rubRate, setRubRate] = useState<string>("");
  const [autoRateNote, setAutoRateNote] = useState<string>("");
  const [showRateInput, setShowRateInput] = useState<boolean>(false);

  const termMax = carAge > 20 ? 3 : 12;
  const isTruck = vehicleKind === "truck";
  const isLimited = mode === "limited";

  // нормализация срока при смене возраста авто
  useEffect(() => {
    const normalized = normalizeTerm(term, termMax);
    if (normalized !== term) setTerm(normalized);
  }, [term, termMax]);

  // автоподстановка курса
  useEffect(() => {
    async function autoFillRubRate() {
      try {
        const resp = await fetch("/api/nbk-rate-rub");
        const data = (await resp.json()) as NbkRateResponse;

        if (!resp.ok || !data?.ok || !data.rate) {
          throw new Error(data?.message || "NBK API returned error");
        }

        const parsed = Number(data.rate);
        if (!Number.isFinite(parsed) || parsed <= 0) {
          throw new Error(`Invalid rate: ${String(data.rate)}`);
        }

        setRubRate(parsed.toFixed(4));
        setAutoRateNote(dict.autoRateOk);
      } catch (e) {
        console.warn("NBK RUB rate auto-fill failed:", e);
        setAutoRateNote(dict.autoRateError);
      }
    }

    autoFillRubRate();
  }, [dict.autoRateOk, dict.autoRateError]);

  // коэффициенты
  const KM = useMemo(() => (isTruck ? 1 : kmByHpPassenger(hp)), [isTruck, hp]);
  const KP = useMemo(() => kpByMonths(term), [term]);

  const kvs = useMemo(
    () => kvsByAgeExp(driverAge, driverExp),
    [driverAge, driverExp]
  );

  const bstLimited = useMemo(
    () => bstByRules({ policyholderType, vehicleKind, term, useExp: true }),
    [policyholderType, vehicleKind, term]
  );

  const bstMulti = useMemo(
    () => bstByRules({ policyholderType, vehicleKind, term, useExp: false }),
    [policyholderType, vehicleKind, term]
  );

  const premiumLimitedRub = useMemo(() => {
    const premium = bstLimited * KT * KBM * KM * kvs * KP;
    return round2(premium);
  }, [bstLimited, KM, kvs, KP]);

  const premiumMultiRub = useMemo(() => {
    const KO = koMultidriveByPolicyholder(policyholderType);
    const premium = bstMulti * KT * KBM * KM * KO * KP;
    return round2(premium);
  }, [bstMulti, KM, policyholderType, KP]);

  const activePremiumRub = isLimited ? premiumLimitedRub : premiumMultiRub;

  // обе премии в KZT для подсказки/сравнения (+5% буфер)
  const premiumsKzt = useMemo(() => {
    const kztPerRub = parseRate(rubRate);
    if (!Number.isFinite(kztPerRub) || kztPerRub <= 0) return null;

    const limitedBufferedRub = premiumLimitedRub * 1.05;
    const multiBufferedRub = premiumMultiRub * 1.05;

    return {
      limitedKzt: round2(limitedBufferedRub * kztPerRub),
      multiKzt: round2(multiBufferedRub * kztPerRub),
    };
  }, [rubRate, premiumLimitedRub, premiumMultiRub]);

  // подсказка: только в режиме "ограничение"
  const betterHint = useMemo(() => {
    if (!isLimited) return "";
    if (!premiumsKzt) return dict.errors.invalidRate;

    const { limitedKzt, multiKzt } = premiumsKzt;
    const diff = round2(limitedKzt - multiKzt);

    if (Math.abs(diff) < 0.01) return dict.hints.equal;

    if (diff < 0) {
      return replaceTokens(dict.hints.cheaperOn, {
        mode: dict.hints.modeLimited,
        diff: `${formatKzt(Math.abs(diff))}\u00A0₸`,
      });
    }

    return replaceTokens(dict.hints.moreExpensiveOn, {
      mode: dict.hints.modeLimited,
      diff: `${formatKzt(diff)}\u00A0₸`,
    });
  }, [isLimited, premiumsKzt, dict]);

  // итог (RUB + KZT) по активному режиму
  const resultText = useMemo(() => {
    const kztPerRub = parseRate(rubRate);
    const bufferedRub = round2(activePremiumRub * 1.05);

    if (!Number.isFinite(kztPerRub) || kztPerRub <= 0) {
      return {
        rub: `${dict.result.rubLinePrefix} ${formatRub(bufferedRub)} RUB`,
        kzt: dict.errors.invalidRate,
      };
    }

    const kztRounded = round2(bufferedRub * kztPerRub);

    return {
      rub: `${dict.result.rubLinePrefix} ${formatRub(bufferedRub)} RUB`,
      kzt: `${dict.result.kztLinePrefix} ${formatKzt(kztRounded)}\u00A0₸`,
    };
  }, [rubRate, activePremiumRub, dict]);

  const card = "rounded-xl border border-gray-200 bg-white";

  // Контрастные сегменты (активное состояние очевидное)
  const segWrap =
    "inline-flex rounded-lg border border-gray-300 bg-white p-1 gap-1";
  const segBtn = (active: boolean) =>
    "px-3 py-2 text-sm font-semibold rounded-md transition border " +
    (active
      ? "bg-[#1A3A5F] text-white border-[#1A3A5F] shadow-sm"
      : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50");

  const tabWrap =
    "inline-flex rounded-lg border border-gray-300 bg-white p-1 gap-1";
  const tabBtn = (active: boolean) =>
    "px-3 py-2 text-sm font-bold rounded-md transition border " +
    (active
      ? "bg-[#C89F4A] text-white border-[#C89F4A] shadow-sm"
      : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50");

  const inputBase =
    "w-full rounded-md border border-gray-300 px-2 py-2 text-sm bg-white " +
    "focus:outline-none focus:ring-2 focus:ring-[#C89F4A] focus:border-[#C89F4A]";
  const slider = "w-full accent-[#C89F4A] cursor-pointer";

  function NumField(props: {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    suffix?: string;
    hint?: string;
    onChange: (v: number) => void;
    showSlider?: boolean;
    sliderStep?: number;
  }) {
    const step = props.step ?? 1;

    return (
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-800">{props.label}</div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-10 w-10 rounded-md border border-gray-300 bg-white font-bold text-gray-800 hover:bg-gray-50"
            onClick={() => props.onChange(clamp(props.value - step, props.min, props.max))}
            aria-label={`${props.label}: меньше`}
          >
            −
          </button>

          <div className="flex-1">
            <input
              className={inputBase}
              inputMode="numeric"
              value={String(props.value)}
              onChange={(e) => {
                const n = Number(e.target.value);
                if (Number.isFinite(n)) props.onChange(clamp(Math.round(n), props.min, props.max));
              }}
            />
          </div>

          <div className="min-w-[64px] text-right text-sm font-semibold text-gray-900">
            {props.suffix ?? ""}
          </div>

          <button
            type="button"
            className="h-10 w-10 rounded-md border border-gray-300 bg-white font-bold text-gray-800 hover:bg-gray-50"
            onClick={() => props.onChange(clamp(props.value + step, props.min, props.max))}
            aria-label={`${props.label}: больше`}
          >
            +
          </button>
        </div>

        {props.showSlider ? (
          <input
            className={slider}
            type="range"
            min={props.min}
            max={props.max}
            step={props.sliderStep ?? step}
            value={props.value}
            onChange={(e) => props.onChange(Number(e.currentTarget.value))}
          />
        ) : null}

        {props.hint ? <div className="text-xs text-gray-600">{props.hint}</div> : null}
      </div>
    );
  }

  function TermField() {
    // срок: НЕ редактируемый input, управление только −/+ и ползунком
    return (
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-800">{dict.labels.term}</div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-10 w-10 rounded-md border border-gray-300 bg-white font-bold text-gray-800 hover:bg-gray-50"
            onClick={() =>
              setTerm((v) => normalizeTerm(v === 0.5 ? 0.5 : v - 1, termMax))
            }
            aria-label={`${dict.labels.term}: меньше`}
          >
            −
          </button>

          <div className="flex-1">
            <input className={inputBase} value={termLabel(term)} readOnly />
          </div>

          <button
            type="button"
            className="h-10 w-10 rounded-md border border-gray-300 bg-white font-bold text-gray-800 hover:bg-gray-50"
            onClick={() =>
              setTerm((v) => normalizeTerm(v === 0.5 ? 1 : v + 1, termMax))
            }
            aria-label={`${dict.labels.term}: больше`}
          >
            +
          </button>
        </div>

        <input
          className={slider}
          type="range"
          min={0.5}
          max={termMax}
          step={0.5}
          value={term}
          onChange={(e) => setTerm(normalizeTerm(Number(e.currentTarget.value), termMax))}
        />

        <div className="text-xs text-gray-600">{dict.hints.term}</div>

        {carAge > 20 ? (
          <div className="text-xs font-semibold text-[#1f5d2b]">
            {dict.hints.termLimited}
          </div>
        ) : null}
      </div>
    );
  }

  const summary = useMemo(() => {
    const p =
      policyholderType === "legal" ? dict.labels.legal : dict.labels.individual;
    const v =
      vehicleKind === "truck" ? dict.labels.truck : dict.labels.passenger;
    const m = isLimited ? dict.hints.modeLimited : dict.hints.modeMulti;
    return `${p} • ${v} • ${termLabel(term)} • ${m}`;
  }, [policyholderType, vehicleKind, term, isLimited, dict]);

  return (
    <section className="bg-[#F4F6FA]" id="osago-rf-calculator">
      <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
        <div className="card p-5 sm:p-7">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1A3A5F]">
              {dict.title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              {dict.subtitle}
            </p>
            <div className="mt-3 text-xs sm:text-sm text-gray-700">
              <span className="font-semibold">Выбрано:</span> {summary}
            </div>
          </div>

          {/* 1) Сегменты + табы (контрастные) */}
          <div className="mt-6 flex flex-col gap-3">
            <div className={`${card} p-3 sm:p-4`}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="text-xs font-semibold text-gray-500">
                    {dict.labels.policyholderType}
                  </div>
                  <div
                    className={segWrap}
                    role="radiogroup"
                    aria-label={dict.labels.policyholderType}
                  >
                    <button
                      type="button"
                      className={segBtn(policyholderType === "legal")}
                      onClick={() => setPolicyholderType("legal")}
                      role="radio"
                      aria-checked={policyholderType === "legal"}
                    >
                      {dict.labels.legal}
                    </button>
                    <button
                      type="button"
                      className={segBtn(policyholderType === "individual")}
                      onClick={() => setPolicyholderType("individual")}
                      role="radio"
                      aria-checked={policyholderType === "individual"}
                    >
                      {dict.labels.individual}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="text-xs font-semibold text-gray-500">
                    {dict.labels.vehicleKind}
                  </div>
                  <div
                    className={segWrap}
                    role="radiogroup"
                    aria-label={dict.labels.vehicleKind}
                  >
                    <button
                      type="button"
                      className={segBtn(vehicleKind === "passenger")}
                      onClick={() => setVehicleKind("passenger")}
                      role="radio"
                      aria-checked={vehicleKind === "passenger"}
                    >
                      {dict.labels.passenger}
                    </button>
                    <button
                      type="button"
                      className={segBtn(vehicleKind === "truck")}
                      onClick={() => setVehicleKind("truck")}
                      role="radio"
                      aria-checked={vehicleKind === "truck"}
                    >
                      {dict.labels.truck}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="text-xs font-semibold text-gray-500">
                  Режим расчёта
                </div>
                <div className={tabWrap} role="tablist" aria-label="Режим расчёта">
                  <button
                    type="button"
                    className={tabBtn(mode === "multi")}
                    onClick={() => setMode("multi")}
                    role="tab"
                    aria-selected={mode === "multi"}
                  >
                    {dict.hints.modeMulti}
                  </button>
                  <button
                    type="button"
                    className={tabBtn(mode === "limited")}
                    onClick={() => setMode("limited")}
                    role="tab"
                    aria-selected={mode === "limited"}
                  >
                    {dict.hints.modeLimited}
                  </button>
                </div>

                <div className="text-xs text-gray-600">
                  {isLimited ? dict.hints.useExp : "Мультидрайв: управлять может любой водитель."}
                </div>
              </div>
            </div>

            {/* 2) Параметры авто: 3 колонки */}
            <div className={`${card} p-3 sm:p-4`}>
              <div className="text-sm font-bold text-gray-900">Параметры</div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Мощность: только для легковых */}
                <div>
                  {!isTruck ? (
                    <NumField
                      label={dict.labels.hp}
                      value={hp}
                      min={70}
                      max={250}
                      step={1}
                      suffix="л.с."
                      hint={dict.hints.hp}
                      onChange={(v) => setHp(v)}
                      showSlider={true}
                      sliderStep={1}
                    />
                  ) : (
                    <div className="text-xs text-gray-600 pt-2">
                      Для грузовых авто коэффициент мощности (КМ) не применяется.
                    </div>
                  )}
                </div>

                <div>
                  <NumField
                    label={dict.labels.carAge}
                    value={carAge}
                    min={0}
                    max={40}
                    step={1}
                    suffix="лет"
                    hint={dict.hints.carAge}
                    onChange={(v) => setCarAge(v)}
                    showSlider={true}
                    sliderStep={1}
                  />
                </div>

                <div>
                  <TermField />
                </div>
              </div>

              {/* Водители: только в режиме ограничений */}
              {isLimited ? (
                <div className="mt-5 rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="text-sm font-semibold text-gray-900">
                    {dict.hints.modeLimited}
                  </div>
                  <div className="mt-1 text-xs text-gray-600">{dict.hints.useExp}</div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {dict.labels.driverAge}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="h-10 w-10 rounded-md border border-gray-300 bg-white font-bold text-gray-800 hover:bg-gray-50"
                          onClick={() => setDriverAge((v) => clamp(v - 1, 18, 80))}
                        >
                          −
                        </button>
                        <input
                          className={inputBase}
                          inputMode="numeric"
                          value={String(driverAge)}
                          onChange={(e) => {
                            const n = Number(e.target.value);
                            if (Number.isFinite(n)) setDriverAge(clamp(Math.round(n), 18, 80));
                          }}
                        />
                        <button
                          type="button"
                          className="h-10 w-10 rounded-md border border-gray-300 bg-white font-bold text-gray-800 hover:bg-gray-50"
                          onClick={() => setDriverAge((v) => clamp(v + 1, 18, 80))}
                        >
                          +
                        </button>
                      </div>
                      <input
                        className={`${slider} mt-2`}
                        type="range"
                        min={18}
                        max={80}
                        step={1}
                        value={driverAge}
                        onChange={(e) => setDriverAge(Number(e.currentTarget.value))}
                      />
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-gray-600 mb-1">
                        {dict.labels.driverExp}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="h-10 w-10 rounded-md border border-gray-300 bg-white font-bold text-gray-800 hover:bg-gray-50"
                          onClick={() => setDriverExp((v) => clamp(v - 1, 0, 60))}
                        >
                          −
                        </button>
                        <input
                          className={inputBase}
                          inputMode="numeric"
                          value={String(driverExp)}
                          onChange={(e) => {
                            const n = Number(e.target.value);
                            if (Number.isFinite(n)) setDriverExp(clamp(Math.round(n), 0, 60));
                          }}
                        />
                        <button
                          type="button"
                          className="h-10 w-10 rounded-md border border-gray-300 bg-white font-bold text-gray-800 hover:bg-gray-50"
                          onClick={() => setDriverExp((v) => clamp(v + 1, 0, 60))}
                        >
                          +
                        </button>
                      </div>
                      <input
                        className={`${slider} mt-2`}
                        type="range"
                        min={0}
                        max={60}
                        step={1}
                        value={driverExp}
                        onChange={(e) => setDriverExp(Number(e.currentTarget.value))}
                      />
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-gray-600">
                    {dict.hints.kvsUsed
                      .replace("{age}", String(driverAge))
                      .replace("{exp}", String(driverExp))}
                  </div>

                  {betterHint ? (
                    <div className="mt-2 text-sm font-semibold text-[#1f5d2b]">
                      {betterHint}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* Курс: оставил как было (по клику), это не мешает UX */}
              <div className="mt-5 rounded-lg border border-gray-200 bg-white p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-semibold text-gray-600">
                      {dict.labels.rateRub}
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      {rubRate ? rubRate : "—"}
                    </div>
                    <div className="mt-1 text-xs text-gray-600">{autoRateNote}</div>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-semibold text-[#1A3A5F] underline underline-offset-2"
                    onClick={() => setShowRateInput((v) => !v)}
                  >
                    {showRateInput ? "Скрыть" : "Изменить"}
                  </button>
                </div>

                {showRateInput ? (
                  <div className="mt-3">
                    <input
                      className={inputBase}
                      type="text"
                      inputMode="decimal"
                      placeholder={dict.ratePlaceholder}
                      value={rubRate}
                      onChange={(e) => setRubRate(e.target.value)}
                      aria-describedby="osago-rf-rate-note"
                    />
                    <div
                      id="osago-rf-rate-note"
                      aria-live="polite"
                      className="mt-2 text-xs text-gray-600"
                    >
                      {autoRateNote}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* 3) Sticky итог */}
          <div className="mt-6">
            <div className="sticky bottom-3">
              <div className={`${card} shadow-sm p-4 sm:p-5`}>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      {dict.result.title}
                    </div>
                    <div className="mt-1 text-xl sm:text-2xl font-extrabold text-[#1A3A5F]">
                      {resultText.kzt}
                    </div>
                    <div className="mt-1 text-sm sm:text-base font-bold text-gray-800">
                      {resultText.rub}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-gray-600 max-w-xl">
                    <div>{dict.result.volatilityNote}</div>
                    <div className="mt-1">{dict.result.disclaimer}</div>
                  </div>
                </div>
              </div>
            </div>

            {carAge > 20 ? (
              <div className="mt-3 text-xs sm:text-sm font-semibold text-[#1f5d2b]">
                {dict.hints.termLimited}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}