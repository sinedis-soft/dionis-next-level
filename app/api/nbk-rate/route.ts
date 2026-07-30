// app/api/nbk-rate/route.ts
import { NextResponse } from "next/server";
import { getNbkUsdRate } from "@/lib/green-card/getNbkUsdRate";

export async function GET() {
  try {
    const rate = await getNbkUsdRate(3600);

    return NextResponse.json(
      { ok: true, rate },
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
