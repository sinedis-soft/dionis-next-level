import "server-only";

const NBK_RATES_URL = "https://nationalbank.kz/rss/rates_all.xml";

// Used only when NBK is temporarily unavailable so server-rendered price content
// remains useful. The next ISR pass retries the authoritative rate.
export const GREEN_CARD_FALLBACK_KZT_RATE = 500;

export async function getNbkUsdRate(revalidate: number): Promise<number> {
  const response = await fetch(NBK_RATES_URL, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`NBK rates request failed with status ${response.status}`);
  }

  const xml = await response.text();
  const match = xml.match(
    /<item>\s*<title>\s*USD\s*<\/title>[\s\S]*?<description>\s*([^<]+)\s*<\/description>/i,
  );

  if (!match) {
    throw new Error("USD rate was not found in the NBK feed");
  }

  const rate = Number.parseFloat(match[1].trim().replace(",", "."));

  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error("NBK returned an invalid USD rate");
  }

  return rate;
}
