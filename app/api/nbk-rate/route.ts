// app/api/nbk-rate/route.ts
import { NextResponse } from "next/server";

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

    const match = xmlText.match(
      /<item>\s*<title>\s*USD\s*<\/title>[\s\S]*?<description>\s*([^<]+)\s*<\/description>/i
    );

    if (!match) {
      return NextResponse.json(
        { ok: false, message: "USD item not found in NBK feed" },
        { status: 500 }
      );
    }

    const raw = match[1].trim();
    const parsed = parseFloat(raw.replace(",", "."));

    if (!parsed || Number.isNaN(parsed) || parsed <= 0) {
      return NextResponse.json(
        { ok: false, message: `Invalid USD rate value: ${raw}` },
        { status: 500 }
      );
    }

    
    return NextResponse.json(
      { ok: true, rate: parsed },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
        },
      }
    );
  } catch (e) {
    console.error("NBK RATE ERROR:", e);
    return NextResponse.json(
      { ok: false, message: "NBK rate fetch failed" },
      { status: 500 }
    );
  }
}
