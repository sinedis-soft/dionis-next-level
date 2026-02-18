// app/api/nbk-rate-rub/route.ts
import { NextResponse } from "next/server";

function safeParseNumber(raw: string): number {
  const n = Number(String(raw).replace(",", ".").trim());
  return n;
}

export async function GET() {
  try {
    const resp = await fetch("https://nationalbank.kz/rss/rates_all.xml", {
      next: { revalidate: 3600 }, // 1 час кэш
    });

    if (!resp.ok) {
      return NextResponse.json(
        { ok: false, message: `NBK RSS status ${resp.status}` },
        { status: 502 }
      );
    }

    const xmlText = await resp.text();

    // Ищем item по RUB и вытаскиваем description (курс) и quant (номинал), если есть
    const itemMatch = xmlText.match(
      /<item>\s*<title>\s*RUB\s*<\/title>[\s\S]*?<\/item>/i
    );

    if (!itemMatch) {
      return NextResponse.json(
        { ok: false, message: "RUB item not found in NBK feed" },
        { status: 500 }
      );
    }

    const itemXml = itemMatch[0];

    const descMatch = itemXml.match(/<description>\s*([^<]+)\s*<\/description>/i);
    if (!descMatch) {
      return NextResponse.json(
        { ok: false, message: "RUB description not found in NBK item" },
        { status: 500 }
      );
    }

    // quant может отсутствовать — тогда считаем 1
    const quantMatch = itemXml.match(/<quant>\s*([^<]+)\s*<\/quant>/i);

    const rawRate = descMatch[1].trim();
    const rawQuant = quantMatch ? quantMatch[1].trim() : "1";

    const parsedRate = safeParseNumber(rawRate);
    const parsedQuant = safeParseNumber(rawQuant);

    if (!Number.isFinite(parsedRate) || parsedRate <= 0) {
      return NextResponse.json(
        { ok: false, message: `Invalid RUB rate value: ${rawRate}` },
        { status: 500 }
      );
    }

    const quant = Number.isFinite(parsedQuant) && parsedQuant > 0 ? parsedQuant : 1;

    // NBK обычно даёт "KZT за quant единиц валюты"
    const ratePer1 = parsedRate / quant;

    if (!Number.isFinite(ratePer1) || ratePer1 <= 0) {
      return NextResponse.json(
        { ok: false, message: `Invalid RUB rate/quant: rate=${rawRate}, quant=${rawQuant}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: true, rate: ratePer1 },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
        },
      }
    );
  } catch (e) {
    console.error("NBK RUB RATE ERROR:", e);
    return NextResponse.json(
      { ok: false, message: "NBK RUB rate fetch failed" },
      { status: 500 }
    );
  }
}