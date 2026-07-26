export type GreenCardRegionKey = "group1" | "group2";

export type GreenCardVehicleKey =
  | "passenger"
  | "bus"
  | "truck"
  | "trailer"
  | "motorcycle"
  | "tractor";

export type GreenCardPeriodKey = "1" | "3" | "6" | "12";

export type GreenCardMarkupMode = "weekday" | "holiday";

const RATES_USD: Record<
  GreenCardRegionKey,
  Record<
    GreenCardVehicleKey,
    Record<GreenCardPeriodKey, number>
  >
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

const MARKUP: Record<GreenCardMarkupMode, number> = {
  weekday: 1.015,
  holiday: 1.02,
};

export function calculateGreenCardPrice({
  region,
  vehicle,
  period,
  kztRate,
  markupMode = "weekday",
}: {
  region: GreenCardRegionKey;
  vehicle: GreenCardVehicleKey;
  period: GreenCardPeriodKey;
  kztRate: number;
  markupMode?: GreenCardMarkupMode;
}): {
  usd: number;
  kzt: number;
} {
  const baseUsd = RATES_USD[region][vehicle][period];

  const priceUsd =
    Math.round(baseUsd * MARKUP[markupMode] * 100) / 100;

  const priceKzt =
    Math.round(priceUsd * kztRate * 100) / 100;

  return {
    usd: priceUsd,
    kzt: priceKzt,
  };
}

export function formatGreenCardKzt(
  value: number,
  locale = "ru-RU",
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}