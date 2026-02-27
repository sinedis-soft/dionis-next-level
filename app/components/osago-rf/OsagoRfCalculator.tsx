"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

    useExp: string;
    driverAge: string;
    driverExp: string;

    rateRub: string;

    paramsTitle: string;
    calcMode: string;
  };

  hints: {
    hp: string;
    carAge: string;
    term: string;
    termLimited: string;

    useExp: string;
    kvsUsed: string;

    cheaperOn: string;
    moreExpensiveOn: string;
    equal: string;
    modeMulti: string;
    modeLimited: string;

    multiShort: string;
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

  cta: {
    orderGreenCardToRussia: string;
    orderHref: string;
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

const KT = 1.7;
const KBM = 1.17;

const KO_MULTIDRIVE_INDIVIDUAL = 3.16;
const KO_MULTIDRIVE_LEGAL = 1.97;

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
  return new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(rounded);
}
function formatRub(value: number): string {
  const rounded = round2(value);
  return new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(rounded);
}

function kmByHpPassenger(hp: number): number {
  if (hp >= 70 && hp < 100) return 1.1;
  if (hp >= 100 && hp < 120) return 1.2;
  if (hp >= 120 && hp <= 150) return 1.4;
  return 1.6;
}

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
  return policyholderType === "legal" ? KO_MULTIDRIVE_LEGAL : KO_MULTIDRIVE_INDIVIDUAL;
}

function bstByRules(args: { policyholderType: PolicyholderType; vehicleKind: VehicleKind; term: number; useExp: boolean }): number {
  const isLegal = args.policyholderType === "legal";
  const isTruck = args.vehicleKind === "truck";
  const isShort = args.term <= 3;

  if (isLegal && !args.useExp) return isShort ? 3300 : 3800;

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

  if (args.useExp) return isShort ? 4400 : 5500;
  return isShort ? 2700 : 2900;
}

function replaceTokensCompat(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (_m, k: string) => (vars[k] ?? ""));
}

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
    <div className="os-calc__num">
      <label className="label" aria-label={props.label}>
        {props.label}
      </label>

      <div className="os-calc__numRow">
        <button
          type="button"
          className="btn-square"
          onClick={() => props.onChange(clamp(props.value - step, props.min, props.max))}
          aria-label={`${props.label}: меньше`}
        >
          −
        </button>

        <input
          className="control"
          inputMode="numeric"
          value={String(props.value)}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (Number.isFinite(n)) props.onChange(clamp(Math.round(n), props.min, props.max));
          }}
        />

        {props.suffix ? <div className="os-calc__suffix">{props.suffix}</div> : null}

        <button
          type="button"
          className="btn-square"
          onClick={() => props.onChange(clamp(props.value + step, props.min, props.max))}
          aria-label={`${props.label}: больше`}
        >
          +
        </button>
      </div>

      {props.showSlider ? (
        <input
          className="range"
          type="range"
          min={props.min}
          max={props.max}
          step={props.sliderStep ?? step}
          value={props.value}
          onChange={(e) => props.onChange(Number(e.currentTarget.value))}
        />
      ) : null}

      {props.hint ? <div className="hint">{props.hint}</div> : null}
    </div>
  );
}

export default function OsagoRfCalculator({ dict }: Props) {
  const [policyholderType, setPolicyholderType] = useState<PolicyholderType>("individual");
  const [vehicleKind, setVehicleKind] = useState<VehicleKind>("passenger");
  const [mode, setMode] = useState<Mode>("multi");

  const [hp, setHp] = useState<number>(120);
  const [carAge, setCarAge] = useState<number>(5);
  const [term, setTerm] = useState<number>(1);

  const [driverAge, setDriverAge] = useState<number>(22);
  const [driverExp, setDriverExp] = useState<number>(0);

  const [rubRate, setRubRate] = useState<string>("");
  const [autoRateNote, setAutoRateNote] = useState<string>("");
  const [showRateInput, setShowRateInput] = useState<boolean>(false);

  const termMax = carAge > 20 ? 3 : 12;
  const isTruck = vehicleKind === "truck";
  const isLimited = mode === "limited";

  useEffect(() => {
    const normalized = normalizeTerm(term, termMax);
    if (normalized !== term) setTerm(normalized);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [termMax]);

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

  const KM = useMemo(() => (isTruck ? 1 : kmByHpPassenger(hp)), [isTruck, hp]);
  const KP = useMemo(() => kpByMonths(term), [term]);
  const kvs = useMemo(() => kvsByAgeExp(driverAge, driverExp), [driverAge, driverExp]);

  const bstLimited = useMemo(
    () => bstByRules({ policyholderType, vehicleKind, term, useExp: true }),
    [policyholderType, vehicleKind, term]
  );
  const bstMulti = useMemo(
    () => bstByRules({ policyholderType, vehicleKind, term, useExp: false }),
    [policyholderType, vehicleKind, term]
  );

  const premiumLimitedRub = useMemo(() => round2(bstLimited * KT * KBM * KM * kvs * KP), [bstLimited, KM, kvs, KP]);
  const premiumMultiRub = useMemo(() => {
    const KO = koMultidriveByPolicyholder(policyholderType);
    return round2(bstMulti * KT * KBM * KM * KO * KP);
  }, [bstMulti, KM, policyholderType, KP]);

  const activePremiumRub = isLimited ? premiumLimitedRub : premiumMultiRub;

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

  const betterHint = useMemo(() => {
    if (!isLimited) return "";
    if (!premiumsKzt) return dict.errors.invalidRate;

    const { limitedKzt, multiKzt } = premiumsKzt;
    const diff = round2(limitedKzt - multiKzt);

    if (Math.abs(diff) < 0.01) return dict.hints.equal;

    if (diff < 0) {
      return replaceTokensCompat(dict.hints.cheaperOn, {
        mode: dict.hints.modeLimited,
        diff: `${formatKzt(Math.abs(diff))}\u00A0₸`,
      });
    }

    return replaceTokensCompat(dict.hints.moreExpensiveOn, {
      mode: dict.hints.modeLimited,
      diff: `${formatKzt(diff)}\u00A0₸`,
    });
  }, [isLimited, premiumsKzt, dict]);

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

  const summary = useMemo(() => {
    const p = policyholderType === "legal" ? dict.labels.legal : dict.labels.individual;
    const v = vehicleKind === "truck" ? dict.labels.truck : dict.labels.passenger;
    const m = isLimited ? dict.hints.modeLimited : dict.hints.modeMulti;
    return `${p} • ${v} • ${termLabel(term)} • ${m}`;
  }, [policyholderType, vehicleKind, term, isLimited, dict]);

  const modeHintText = isLimited ? dict.hints.useExp : dict.hints.multiShort;

  const statusId = "osago-rf-rate-note";

  return (
    <section className="os-calc" id="osago-rf-calculator">
      <div className="gc-container">
        <div className="card card--pad">
          <div className="os-calc__head">
            <h2 className="os-calc__title">{dict.title}</h2>
            <p className="os-calc__subtitle">{dict.subtitle}</p>
            <div className="os-calc__summary">
              <b>Выбрано:</b> {summary}
            </div>
          </div>

          <div className="os-calc__form">
            {/* Сегменты */}
            <div className="os-calc__row2">
              <div className="field">
                <div className="label">{dict.labels.policyholderType}</div>
                <div className="seg" role="radiogroup" aria-label={dict.labels.policyholderType}>
                  <button
                    type="button"
                    className={`seg__btn ${policyholderType === "legal" ? "seg__btn--active" : ""}`}
                    onClick={() => setPolicyholderType("legal")}
                    role="radio"
                    aria-checked={policyholderType === "legal"}
                  >
                    {dict.labels.legal}
                  </button>
                  <button
                    type="button"
                    className={`seg__btn ${policyholderType === "individual" ? "seg__btn--active" : ""}`}
                    onClick={() => setPolicyholderType("individual")}
                    role="radio"
                    aria-checked={policyholderType === "individual"}
                  >
                    {dict.labels.individual}
                  </button>
                </div>
              </div>

              <div className="field">
                <div className="label">{dict.labels.vehicleKind}</div>
                <div className="seg" role="radiogroup" aria-label={dict.labels.vehicleKind}>
                  <button
                    type="button"
                    className={`seg__btn ${vehicleKind === "passenger" ? "seg__btn--active" : ""}`}
                    onClick={() => setVehicleKind("passenger")}
                    role="radio"
                    aria-checked={vehicleKind === "passenger"}
                  >
                    {dict.labels.passenger}
                  </button>
                  <button
                    type="button"
                    className={`seg__btn ${vehicleKind === "truck" ? "seg__btn--active" : ""}`}
                    onClick={() => setVehicleKind("truck")}
                    role="radio"
                    aria-checked={vehicleKind === "truck"}
                  >
                    {dict.labels.truck}
                  </button>
                </div>
              </div>
            </div>

            {/* Режим */}
            <div className="field">
              <div className="os-calc__mode">
                <div className="label">{dict.labels.calcMode}</div>
                <div className="tabs" role="tablist" aria-label={dict.labels.calcMode}>
                  <button
                    type="button"
                    className={`tabs__btn ${mode === "multi" ? "tabs__btn--active" : ""}`}
                    onClick={() => setMode("multi")}
                    role="tab"
                    aria-selected={mode === "multi"}
                  >
                    {dict.hints.modeMulti}
                  </button>
                  <button
                    type="button"
                    className={`tabs__btn ${mode === "limited" ? "tabs__btn--active" : ""}`}
                    onClick={() => setMode("limited")}
                    role="tab"
                    aria-selected={mode === "limited"}
                  >
                    {dict.hints.modeLimited}
                  </button>
                </div>
              </div>

              <div className="hint">{modeHintText}</div>
            </div>

            {/* Параметры */}
            <div className="os-calc__blockTitle">{dict.labels.paramsTitle}</div>

            <div className="os-calc__grid3">
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
                  <div className="hint os-calc__note">
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

              <div className="field">
                <label className="label">{dict.labels.term}</label>

                <div className="os-calc__termRow">
                  <button
                    type="button"
                    className="btn-square"
                    onClick={() => setTerm((v) => normalizeTerm(v === 0.5 ? 0.5 : v - 1, termMax))}
                    aria-label={`${dict.labels.term}: меньше`}
                  >
                    −
                  </button>

                  <input className="control" value={termLabel(term)} readOnly />

                  <button
                    type="button"
                    className="btn-square"
                    onClick={() => setTerm((v) => normalizeTerm(v === 0.5 ? 1 : v + 1, termMax))}
                    aria-label={`${dict.labels.term}: больше`}
                  >
                    +
                  </button>
                </div>

                <input
                  className="range"
                  type="range"
                  min={0.5}
                  max={termMax}
                  step={0.5}
                  value={term}
                  onChange={(e) => setTerm(normalizeTerm(Number(e.currentTarget.value), termMax))}
                />

                <div className="hint">{dict.hints.term}</div>
                {carAge > 20 ? <div className="hint hint--ok">{dict.hints.termLimited}</div> : null}
              </div>
            </div>

            {/* Блок водителей (только limited) */}
            <div className={`panel-muted os-calc__drivers ${isLimited ? "" : "os-calc__drivers--hidden"}`} aria-hidden={!isLimited}>
              <div className="os-calc__driversTitle">{dict.hints.modeLimited}</div>
              <div className="hint">{dict.hints.useExp}</div>

              <div className="os-calc__grid2">
                <div className="field">
                  <div className="label">{dict.labels.driverAge}</div>
                  <div className="os-calc__termRow">
                    <button type="button" className="btn-square" onClick={() => setDriverAge((v) => clamp(v - 1, 18, 80))}>
                      −
                    </button>
                    <input
                      className="control"
                      inputMode="numeric"
                      value={String(driverAge)}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        if (Number.isFinite(n)) setDriverAge(clamp(Math.round(n), 18, 80));
                      }}
                    />
                    <button type="button" className="btn-square" onClick={() => setDriverAge((v) => clamp(v + 1, 18, 80))}>
                      +
                    </button>
                  </div>
                  <input className="range" type="range" min={18} max={80} step={1} value={driverAge} onChange={(e) => setDriverAge(Number(e.currentTarget.value))} />
                </div>

                <div className="field">
                  <div className="label">{dict.labels.driverExp}</div>
                  <div className="os-calc__termRow">
                    <button type="button" className="btn-square" onClick={() => setDriverExp((v) => clamp(v - 1, 0, 60))}>
                      −
                    </button>
                    <input
                      className="control"
                      inputMode="numeric"
                      value={String(driverExp)}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        if (Number.isFinite(n)) setDriverExp(clamp(Math.round(n), 0, 60));
                      }}
                    />
                    <button type="button" className="btn-square" onClick={() => setDriverExp((v) => clamp(v + 1, 0, 60))}>
                      +
                    </button>
                  </div>
                  <input className="range" type="range" min={0} max={60} step={1} value={driverExp} onChange={(e) => setDriverExp(Number(e.currentTarget.value))} />
                </div>
              </div>

              <div className="hint os-calc__kvsNote">
                {replaceTokensCompat(dict.hints.kvsUsed, { age: String(driverAge), exp: String(driverExp) })}
              </div>

              {betterHint ? <div className="hint hint--danger">{betterHint}</div> : null}
            </div>

            {/* Курс */}
            <div className="os-calc__rateBox">
              <div className="os-calc__rateTop">
                <div>
                  <div className="label">{dict.labels.rateRub}</div>
                  <div className="os-calc__rateValue">{rubRate ? rubRate : "—"}</div>
                  <div className="status" id={statusId} aria-live="polite">
                    {autoRateNote}
                  </div>
                </div>

                <button type="button" className="link" onClick={() => setShowRateInput((v) => !v)} aria-controls={statusId}>
                  {showRateInput ? "Скрыть" : "Изменить"}
                </button>
              </div>

              {showRateInput ? (
                <div className="os-calc__rateEdit">
                  <input
                    className="control"
                    type="text"
                    inputMode="decimal"
                    placeholder={dict.ratePlaceholder}
                    value={rubRate}
                    onChange={(e) => setRubRate(e.target.value)}
                    aria-describedby={statusId}
                  />
                </div>
              ) : null}
            </div>

            {/* Итог + CTA (как в образце) */}
            <div className="os-calc__result" role="status" aria-live="polite">
              <div className="os-calc__resultLabel">{dict.result.title}</div>

              <div className="os-calc__resultValue">
                <span className="os-calc__kzt">{resultText.kzt}</span>
                <span className="os-calc__rub">{resultText.rub}</span>
              </div>

              <div className="os-calc__resultNote">
                <div>{dict.result.volatilityNote}</div>
                <div>{dict.result.disclaimer}</div>
              </div>
            </div>

            <div className="gc-calc__cta">
              <Link
                href={dict.cta.orderHref}
                className="btn btn-secondary btn-wide"
                aria-label={dict.cta.orderGreenCardToRussia}
              >
                {dict.cta.orderGreenCardToRussia}
              </Link>
            </div>

            {carAge > 20 ? <div className="hint hint--ok">{dict.hints.termLimited}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}