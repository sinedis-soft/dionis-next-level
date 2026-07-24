"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  bufferedRub,
  calculateOsagoRfPremium,
  clamp,
  convertRubToKzt,
  formatKzt,
  formatRub,
  parseRubRate,
  round2,
  type OsagoRfMode as Mode,
  type OsagoRfPolicyholderType as PolicyholderType,
  type OsagoRfVehicleKind as VehicleKind,
} from "@/lib/osago-rf-calculation";
import { emitOsagoRfRubRate } from "@/lib/osago-rf-rate-events";

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

function replaceTokensCompat(tpl: string, vars: Record<string, string>): string {
  return tpl.replace(/\{(\w+)\}/g, (_m, k: string) => vars[k] ?? "");
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
  const [inputValue, setInputValue] = useState<string>(String(props.value));

  useEffect(() => {
    setInputValue(String(props.value));
  }, [props.value]);

  const applyInputValue = (raw: string) => {
    const normalized = raw.trim().replace(",", ".");
    const parsed = Number(normalized);

    if (!Number.isFinite(parsed)) {
      setInputValue(String(props.value));
      return;
    }

    const next = clamp(Math.round(parsed), props.min, props.max);
    props.onChange(next);
    setInputValue(String(next));
  };

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
          aria-label={props.label}
          value={inputValue}
          onChange={(e) => {
            const raw = e.target.value;

            if (raw === "") {
              setInputValue("");
              return;
            }

            if (!/^\d+$/.test(raw)) return;

            setInputValue(raw);

            const parsed = Number(raw);
            if (Number.isFinite(parsed)) {
              props.onChange(clamp(Math.round(parsed), props.min, props.max));
            }
          }}
          onBlur={() => {
            if (inputValue === "") {
              setInputValue(String(props.value));
              return;
            }
            applyInputValue(inputValue);
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
          aria-label={props.label}
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
    const parsed = parseRubRate(rubRate);
    if (Number.isFinite(parsed) && parsed > 0) emitOsagoRfRubRate(parsed);
  }, [rubRate]);

  useEffect(() => {
    const normalized = normalizeTerm(term, termMax);
    if (normalized !== term) setTerm(normalized);
  }, [term, termMax]);

  useEffect(() => {
    async function autoFillRubRate() {
      try {
        const resp = await fetch("/api/nbk-rate-rub", { cache: "no-store" });
        const data = (await resp.json()) as NbkRateResponse;

        if (!resp.ok || !data?.ok || !data.rate) {
          throw new Error(data?.message || "NBK API returned error");
        }

        const parsed = Number(data.rate);
        if (!Number.isFinite(parsed) || parsed <= 0) {
          throw new Error(`Invalid rate: ${String(data.rate)}`);
        }

        setRubRate(parsed.toFixed(4));
        emitOsagoRfRubRate(parsed);
        setAutoRateNote(dict.autoRateOk);
      } catch (e) {
        console.warn("NBK RUB rate auto-fill failed:", e);
        setAutoRateNote(dict.autoRateError);
      }
    }

    autoFillRubRate();
  }, [dict.autoRateOk, dict.autoRateError]);

  const premiumLimitedRub = useMemo(
    () => calculateOsagoRfPremium({ policyholderType, vehicleKind, mode: "limited", hp, term, driverAge, driverExp }).baseRub,
    [policyholderType, vehicleKind, hp, term, driverAge, driverExp]
  );

  const premiumMultiRub = useMemo(
    () => calculateOsagoRfPremium({ policyholderType, vehicleKind, mode: "multi", hp, term }).baseRub,
    [policyholderType, vehicleKind, hp, term]
  );

  const activePremiumRub = isLimited ? premiumLimitedRub : premiumMultiRub;

  const premiumsKzt = useMemo(() => {
    const kztPerRub = parseRubRate(rubRate);
    if (!Number.isFinite(kztPerRub) || kztPerRub <= 0) return null;

    const limitedKzt = convertRubToKzt(bufferedRub(premiumLimitedRub), kztPerRub);
    const multiKzt = convertRubToKzt(bufferedRub(premiumMultiRub), kztPerRub);

    if (limitedKzt === null || multiKzt === null) return null;

    return { limitedKzt, multiKzt };
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
    const kztPerRub = parseRubRate(rubRate);
    const rubWithBuffer = bufferedRub(activePremiumRub);

    if (!Number.isFinite(kztPerRub) || kztPerRub <= 0) {
      return {
        rub: `${dict.result.rubLinePrefix} ${formatRub(rubWithBuffer)} RUB`,
        kzt: dict.errors.invalidRate,
      };
    }

    const kztRounded = convertRubToKzt(rubWithBuffer, kztPerRub) ?? 0;

    return {
      rub: `${dict.result.rubLinePrefix} ${formatRub(rubWithBuffer)} RUB`,
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

  const statusClassName =
    autoRateNote === dict.autoRateOk
      ? "status status--ok os-calc-v2__status"
      : "status status--err os-calc-v2__status";

  return (
    <section className="os-calc os-calc-v2" id="osago-rf-calculator">
      <div className="gc-container">
        <div className="card os-calc-v2__card">
          <div className="os-calc-v2__head">
            <h2 className="os-calc__title">{dict.title}</h2>
            <p className="os-calc__subtitle">{dict.subtitle}</p>
            <div className="os-calc__summary">
              <b>Выбрано:</b> {summary}
            </div>
          </div>

          <div className="os-calc-v2__desktop">
            <div className="os-calc-v2__main">
              <div className="os-calc-v2__topGrid">
                <div className="field">
                  <div className="label">{dict.labels.policyholderType}</div>
                  <div className="seg" role="radiogroup" aria-label={dict.labels.policyholderType}>
                    <button
                      type="button"
                      className={`seg__btn ${policyholderType === "legal" ? "seg__btn--active" : ""}`}
                      onClick={() => setPolicyholderType("legal")}
                    >
                      {dict.labels.legal}
                    </button>
                    <button
                      type="button"
                      className={`seg__btn ${policyholderType === "individual" ? "seg__btn--active" : ""}`}
                      onClick={() => setPolicyholderType("individual")}
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
                    >
                      {dict.labels.passenger}
                    </button>
                    <button
                      type="button"
                      className={`seg__btn ${vehicleKind === "truck" ? "seg__btn--active" : ""}`}
                      onClick={() => setVehicleKind("truck")}
                    >
                      {dict.labels.truck}
                    </button>
                  </div>
                </div>
              </div>

              <div className="field os-calc-v2__modeBlock">
                <div className="os-calc__mode">
                  <div className="label">{dict.labels.calcMode}</div>
                  <div className="tabs" role="tablist" aria-label={dict.labels.calcMode}>
                    <button
                      type="button"
                      className={`tabs__btn ${mode === "multi" ? "tabs__btn--active" : ""}`}
                      onClick={() => setMode("multi")}
                    >
                      {dict.hints.modeMulti}
                    </button>
                    <button
                      type="button"
                      className={`tabs__btn ${mode === "limited" ? "tabs__btn--active" : ""}`}
                      onClick={() => setMode("limited")}
                    >
                      {dict.hints.modeLimited}
                    </button>
                  </div>
                </div>
                <div className="hint">{modeHintText}</div>
              </div>

              <div className="os-calc-v2__paramsTitle">{dict.labels.paramsTitle}</div>

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
                      onChange={setHp}
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
                    onChange={setCarAge}
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
                      aria-label={`${dict.labels.term}: меньше`}
                      onClick={() => setTerm((v) => normalizeTerm(v === 0.5 ? 0.5 : v - 1, termMax))}
                    >
                      −
                    </button>

                    <input className="control" aria-label={dict.labels.term} value={termLabel(term)} readOnly />

                    <button
                      type="button"
                      className="btn-square"
                      aria-label={`${dict.labels.term}: больше`}
                      onClick={() => setTerm((v) => normalizeTerm(v === 0.5 ? 1 : v + 1, termMax))}
                    >
                      +
                    </button>
                  </div>

                  <input
                    className="range"
                    type="range"
                    aria-label={dict.labels.term}
                    min={0.5}
                    max={termMax}
                    step={0.5}
                    value={term}
                    onChange={(e) => setTerm(normalizeTerm(Number(e.currentTarget.value), termMax))}
                  />

                  <div className="hint">{dict.hints.term}</div>
                  {carAge > 20 ? <div className="hint hint--danger">{dict.hints.termLimited}</div> : null}
                </div>
              </div>

              <div
                className={`panel-muted os-calc__drivers ${isLimited ? "" : "os-calc__drivers--hidden"}`}
                aria-hidden={!isLimited}
              >
                <div className="os-calc__driversTitle">{dict.hints.modeLimited}</div>
                <div className="hint">{dict.hints.useExp}</div>

                <div className="os-calc__grid2">
                  <div>
                    <NumField
                      label={dict.labels.driverAge}
                      value={driverAge}
                      min={18}
                      max={80}
                      step={1}
                      onChange={setDriverAge}
                      showSlider={true}
                      sliderStep={1}
                    />
                  </div>

                  <div>
                    <NumField
                      label={dict.labels.driverExp}
                      value={driverExp}
                      min={0}
                      max={60}
                      step={1}
                      onChange={setDriverExp}
                      showSlider={true}
                      sliderStep={1}
                    />
                  </div>
                </div>

                <div className="hint os-calc__kvsNote">
                  {replaceTokensCompat(dict.hints.kvsUsed, {
                    age: String(driverAge),
                    exp: String(driverExp),
                  })}
                </div>

                {betterHint ? <div className="hint hint--danger">{betterHint}</div> : null}
              </div>

              <div className="os-calc-v2__rateBlock">
                <div className="os-calc__rateBox">
                  <div className="os-calc__rateTop">
                    <div>
                      <div className="label">{dict.labels.rateRub}</div>
                      <div className="os-calc__rateValue">{rubRate ? rubRate : "—"}</div>
                      <div className={statusClassName}>{autoRateNote}</div>
                    </div>

                    <button
                      type="button"
                      className="link"
                      onClick={() => setShowRateInput((v) => !v)}
                    >
                      {showRateInput ? "Скрыть" : "Изменить"}
                    </button>
                  </div>

                  {showRateInput ? (
                    <div className="os-calc__rateEdit">
                      <input
                        className="control"
                        type="text"
                        inputMode="decimal"
                        aria-label={dict.labels.rateRub}
                        placeholder={dict.ratePlaceholder}
                        value={rubRate}
                        onChange={(e) => setRubRate(e.target.value)}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <aside className="os-calc-v2__summary">
              <div className="os-calc-v2__summaryInner">
                <div className="os-calc-v2__summaryPrice">
                  {resultText.kzt}
                </div>

                <div className="os-calc-v2__summaryTitle">
                  {vehicleKind === "truck" ? dict.labels.truck : dict.labels.passenger}
                </div>

                <div className="os-calc-v2__summaryMeta">
                  {policyholderType === "legal" ? dict.labels.legal : dict.labels.individual}
                </div>

                <div className="gc-calc__result os-calc-v2__summaryResult">
                  <div className="gc-calc__resultLabel">{dict.result.title}</div>
                  <div className="gc-calc__resultValue">
                    <span className="gc-calc__approx">{dict.result.rubLinePrefix}</span>
                    <span className="gc-calc__kzt">{formatRub(bufferedRub(activePremiumRub))} RUB</span>
                  </div>
                </div>

                <div className="hint os-calc-v2__summaryHint">{dict.result.volatilityNote}</div>
                <div className="hint os-calc-v2__summaryHint">{dict.result.disclaimer}</div>

                <div className="gc-calc__cta os-calc-v2__summaryCta">
                  <Link
                    href={dict.cta.orderHref}
                    className="btn btn-secondary btn-wide"
                    aria-label={dict.cta.orderGreenCardToRussia}
                  >
                    {dict.cta.orderGreenCardToRussia}
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <div className="os-calc-v2__mobile">
            <div className="os-calc-v2__mobileTop">
              <div className="field">
                <label className="label">{dict.labels.policyholderType}</label>
                <select
                  className="control"
                  aria-label={dict.labels.policyholderType}
                  value={policyholderType}
                  onChange={(e) => setPolicyholderType(e.target.value as PolicyholderType)}
                >
                  <option value="individual">{dict.labels.individual}</option>
                  <option value="legal">{dict.labels.legal}</option>
                </select>
              </div>

              <div className="field">
                <label className="label">{dict.labels.vehicleKind}</label>
                <select
                  className="control"
                  aria-label={dict.labels.vehicleKind}
                  value={vehicleKind}
                  onChange={(e) => setVehicleKind(e.target.value as VehicleKind)}
                >
                  <option value="passenger">{dict.labels.passenger}</option>
                  <option value="truck">{dict.labels.truck}</option>
                </select>
              </div>

              <div className="field">
                <label className="label">{dict.labels.calcMode}</label>
                <select
                  className="control"
                  aria-label={dict.labels.calcMode}
                  value={mode}
                  onChange={(e) => setMode(e.target.value as Mode)}
                >
                  <option value="multi">{dict.hints.modeMulti}</option>
                  <option value="limited">{dict.hints.modeLimited}</option>
                </select>
              </div>

              {!isTruck ? (
                <div className="field">
                  <label className="label">{dict.labels.hp}</label>
                  <input
                    className="control"
                    type="number"
                    aria-label={dict.labels.hp}
                    value={hp}
                    min={70}
                    max={250}
                    onChange={(e) => setHp(clamp(Number(e.target.value || 70), 70, 250))}
                  />
                  <div className="hint">{dict.hints.hp}</div>
                </div>
              ) : null}

              <div className="field">
                <label className="label">{dict.labels.carAge}</label>
                <input
                  className="control"
                  type="number"
                  aria-label={dict.labels.carAge}
                  value={carAge}
                  min={0}
                  max={40}
                  onChange={(e) => setCarAge(clamp(Number(e.target.value || 0), 0, 40))}
                />
                <div className="hint">{dict.hints.carAge}</div>
              </div>

              <div className="field">
                <label className="label">{dict.labels.term}</label>
                <select
                  className="control"
                  aria-label={dict.labels.term}
                  value={String(term)}
                  onChange={(e) => setTerm(normalizeTerm(Number(e.target.value), termMax))}
                >
                  {termMax >= 0.5 ? <option value="0.5">15 дней</option> : null}
                  <option value="1">1 мес.</option>
                  <option value="2">2 мес.</option>
                  <option value="3">3 мес.</option>
                  {termMax >= 4 ? <option value="4">4 мес.</option> : null}
                  {termMax >= 5 ? <option value="5">5 мес.</option> : null}
                  {termMax >= 6 ? <option value="6">6 мес.</option> : null}
                  {termMax >= 7 ? <option value="7">7 мес.</option> : null}
                  {termMax >= 8 ? <option value="8">8 мес.</option> : null}
                  {termMax >= 9 ? <option value="9">9 мес.</option> : null}
                  {termMax >= 10 ? <option value="10">10 мес.</option> : null}
                  {termMax >= 11 ? <option value="11">11 мес.</option> : null}
                  {termMax >= 12 ? <option value="12">12 мес.</option> : null}
                </select>
                <div className="hint">{dict.hints.term}</div>
              </div>

              {isLimited ? (
                <>
                  <div className="field">
                    <label className="label">{dict.labels.driverAge}</label>
                    <input
                      className="control"
                      type="number"
                      aria-label={dict.labels.driverAge}
                      value={driverAge}
                      min={18}
                      max={80}
                      onChange={(e) => setDriverAge(clamp(Number(e.target.value || 18), 18, 80))}
                    />
                  </div>

                  <div className="field">
                    <label className="label">{dict.labels.driverExp}</label>
                    <input
                      className="control"
                      type="number"
                      aria-label={dict.labels.driverExp}
                      value={driverExp}
                      min={0}
                      max={60}
                      onChange={(e) => setDriverExp(clamp(Number(e.target.value || 0), 0, 60))}
                    />
                  </div>

                  <div className="hint">
                    {replaceTokensCompat(dict.hints.kvsUsed, {
                      age: String(driverAge),
                      exp: String(driverExp),
                    })}
                  </div>

                  {betterHint ? <div className="hint hint--danger">{betterHint}</div> : null}
                </>
              ) : null}

              <div className="field">
                <label className="label">{dict.labels.rateRub}</label>
                <input
                  className="control"
                  type="text"
                  inputMode="decimal"
                  aria-label={dict.labels.rateRub}
                  placeholder={dict.ratePlaceholder}
                  value={rubRate}
                  onChange={(e) => setRubRate(e.target.value)}
                />
                <div className={statusClassName}>{autoRateNote}</div>
              </div>
            </div>

            <div className="os-calc-v2__mobileBottom">
              <div className="os-calc-v2__summaryPrice">{resultText.kzt}</div>
              <div className="os-calc-v2__summaryTitle">
                {vehicleKind === "truck" ? dict.labels.truck : dict.labels.passenger}
              </div>
              <div className="os-calc-v2__summaryMeta">
                {policyholderType === "legal" ? dict.labels.legal : dict.labels.individual}
              </div>

              <div className="gc-calc__result">
                <div className="gc-calc__resultLabel">{dict.result.title}</div>
                <div className="gc-calc__resultValue">
                  <span className="gc-calc__approx">{dict.result.rubLinePrefix}</span>
                  <span className="gc-calc__kzt">{formatRub(bufferedRub(activePremiumRub))} RUB</span>
                </div>
              </div>

              <div className="hint">{dict.result.volatilityNote}</div>
              <div className="hint">{dict.result.disclaimer}</div>

              <div className="gc-calc__cta">
                <Link
                  href={dict.cta.orderHref}
                  className="btn btn-secondary btn-wide"
                  aria-label={dict.cta.orderGreenCardToRussia}
                >
                  {dict.cta.orderGreenCardToRussia}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}