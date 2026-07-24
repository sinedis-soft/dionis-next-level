export type OsagoRfPolicyholderType = "legal" | "individual";
export type OsagoRfVehicleKind = "passenger" | "truck";
export type OsagoRfMode = "multi" | "limited";

const KT = 1.7;
const KBM = 1.17;
const KO_MULTIDRIVE_INDIVIDUAL = 3.16;
const KO_MULTIDRIVE_LEGAL = 1.97;
const RUB_BUFFER = 1.05;

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

export function round2(n: number): number { return Math.round(n * 100) / 100; }
export function clamp(n: number, min: number, max: number): number { return Math.min(max, Math.max(min, n)); }
export function parseRubRate(raw: string): number { return Number(raw.replace(",", ".").trim()); }

export function formatKzt(value: number): string {
  return new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(round2(value));
}
export function formatRub(value: number): string {
  return new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(round2(value));
}
export function kmByHpPassenger(hp: number): number {
  if (hp >= 70 && hp < 100) return 1.1;
  if (hp >= 100 && hp < 120) return 1.2;
  if (hp >= 120 && hp <= 150) return 1.4;
  return 1.6;
}
export function kpByMonths(months: number): number {
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
  if (expYears < 1) return 0; if (expYears < 2) return 1; if (expYears < 3) return 2; if (expYears < 5) return 3;
  if (expYears < 7) return 4; if (expYears < 10) return 5; if (expYears < 15) return 6; return 7;
}
export function kvsByAgeExp(driverAge: number, expYears: number): number {
  const row = KVS_TABLE[ageGroupIndex(driverAge)]; const c = expBandIndex(expYears); const v = row[c];
  if (typeof v === "number") return v;
  for (let i = c; i >= 0; i--) { const fallback = row[i]; if (typeof fallback === "number") return fallback; }
  return 1.0;
}
export function koMultidriveByPolicyholder(policyholderType: OsagoRfPolicyholderType): number {
  return policyholderType === "legal" ? KO_MULTIDRIVE_LEGAL : KO_MULTIDRIVE_INDIVIDUAL;
}
export function bstByRules(args: { policyholderType: OsagoRfPolicyholderType; vehicleKind: OsagoRfVehicleKind; term: number; useExp: boolean; }): number {
  const isLegal = args.policyholderType === "legal"; const isTruck = args.vehicleKind === "truck"; const isShort = args.term <= 3;
  if (isLegal && !args.useExp) return isShort ? 3300 : 3800;
  if (isLegal && !isTruck && args.useExp) return 6580;
  if (isLegal && isTruck && args.useExp) return 17201;
  if (!isLegal && !isTruck) { if (args.useExp) return isShort ? 4400 : 5500; return isShort ? 2400 : 2500; }
  if (args.useExp) return isShort ? 4400 : 5500;
  return isShort ? 2700 : 2900;
}
export function bufferedRub(value: number): number { return round2(value * RUB_BUFFER); }
export function calculateOsagoRfPremium(args: { policyholderType: OsagoRfPolicyholderType; vehicleKind: OsagoRfVehicleKind; mode: OsagoRfMode; hp: number; term: number; driverAge?: number; driverExp?: number; }): { baseRub: number; bufferedRub: number; km: number; kp: number; ko?: number; kvs?: number; bst: number } {
  const km = args.vehicleKind === "truck" ? 1 : kmByHpPassenger(args.hp);
  const kp = kpByMonths(args.term);
  if (args.mode === "limited") {
    const kvs = kvsByAgeExp(args.driverAge ?? 22, args.driverExp ?? 0);
    const bst = bstByRules({ policyholderType: args.policyholderType, vehicleKind: args.vehicleKind, term: args.term, useExp: true });
    const baseRub = round2(bst * KT * KBM * km * kvs * kp);
    return { baseRub, bufferedRub: bufferedRub(baseRub), km, kp, kvs, bst };
  }
  const ko = koMultidriveByPolicyholder(args.policyholderType);
  const bst = bstByRules({ policyholderType: args.policyholderType, vehicleKind: args.vehicleKind, term: args.term, useExp: false });
  const baseRub = round2(bst * KT * KBM * km * ko * kp);
  return { baseRub, bufferedRub: bufferedRub(baseRub), km, kp, ko, bst };
}
export function convertRubToKzt(rub: number, rate: number): number | null {
  if (!Number.isFinite(rate) || rate <= 0) return null;
  return round2(rub * rate);
}
