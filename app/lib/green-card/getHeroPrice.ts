import "server-only";

import {
  calculateGreenCardPrice,
  formatGreenCardKzt,
} from "@/lib/green-card/calculateGreenCardPrice";
import {
  getNbkUsdRate,
  GREEN_CARD_FALLBACK_KZT_RATE,
} from "@/lib/green-card/getNbkUsdRate";

export async function getGreenCardHeroPrice(revalidate: number): Promise<string> {
  let kztRate = GREEN_CARD_FALLBACK_KZT_RATE;

  try {
    kztRate = await getNbkUsdRate(revalidate);
  } catch (error) {
    console.error(
      "Green Card hero rate loading failed; using the fallback rate",
      error,
    );
  }

  const { kzt } = calculateGreenCardPrice({
    region: "group1",
    vehicle: "passenger",
    period: "1",
    kztRate,
    markupMode: "weekday",
  });

  return `${formatGreenCardKzt(kzt, "ru-RU", 0)}\u00A0₸`;
}
