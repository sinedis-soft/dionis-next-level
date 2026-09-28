import "server-only";

import {
  calculateOsagoRfPremium,
  convertRubToKzt,
} from "@/lib/osago-rf-calculation";

const NBK_RATES_URL = "https://nationalbank.kz/rss/rates_all.xml";

export async function getNbkRubRate(revalidate: number): Promise<number> {
  const response = await fetch(NBK_RATES_URL, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`NBK rates request failed with status ${response.status}`);
  }

  const xml = await response.text();
  const item = xml.match(/<item>\s*<title>\s*RUB\s*<\/title>[\s\S]*?<\/item>/i)?.[0];
  const rawRate = item?.match(/<description>\s*([^<]+)\s*<\/description>/i)?.[1];
  const rawQuant = item?.match(/<quant>\s*([^<]+)\s*<\/quant>/i)?.[1] ?? "1";

  if (!rawRate) {
    throw new Error("RUB rate was not found in the NBK feed");
  }

  const rate = Number(rawRate.trim().replace(",", "."));
  const quant = Number(rawQuant.trim().replace(",", "."));

  if (!Number.isFinite(rate) || rate <= 0 || !Number.isFinite(quant) || quant <= 0) {
    throw new Error("NBK returned an invalid RUB rate or quantity");
  }

  return rate / quant;
}

export async function getOsagoHeroPriceKzt(revalidate: number): Promise<number> {
  const rate = await getNbkRubRate(revalidate);
  const { bufferedRub } = calculateOsagoRfPremium({
    policyholderType: "individual",
    vehicleKind: "passenger",
    mode: "limited",
    hp: 70,
    term: 0.5,
    driverAge: 60,
    driverExp: 40,
  });
  const price = convertRubToKzt(bufferedRub, rate);

  if (price === null) {
    throw new Error("Could not convert the OSAGO premium to KZT");
  }

  return price;
}

export function formatOsagoHeroPriceKzt(price: number, lang: "ru" | "kz" | "en"): string {
  const locale = lang === "en" ? "en-KZ" : "ru-KZ";
  return `${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)}\u00A0₸`;
}
