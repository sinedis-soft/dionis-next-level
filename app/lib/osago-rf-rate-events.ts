export const OSAGO_RF_RUB_RATE_EVENT = "osago-rf-rub-rate-change";

type OsagoRfRubRateDetail = { rate: number };

export function emitOsagoRfRubRate(rate: number) {
  if (typeof window === "undefined" || !Number.isFinite(rate) || rate <= 0) return;
  window.dispatchEvent(
    new CustomEvent<OsagoRfRubRateDetail>(OSAGO_RF_RUB_RATE_EVENT, {
      detail: { rate },
    })
  );
}

export function readOsagoRfRubRateEvent(event: Event): number | null {
  const rate = (event as CustomEvent<OsagoRfRubRateDetail>).detail?.rate;
  return Number.isFinite(rate) && rate > 0 ? rate : null;
}
