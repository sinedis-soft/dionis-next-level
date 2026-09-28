import { NextResponse } from "next/server";
import { getNbkRubRate } from "@/lib/osago-rf/getHeroPrice";

export async function GET() {
  try {
    const rate = await getNbkRubRate(3600);

    return NextResponse.json(
      { ok: true, rate },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
        },
      },
    );
  } catch (error) {
    console.error("NBK RUB RATE ERROR:", error);
    return NextResponse.json(
      { ok: false, message: "NBK RUB rate fetch failed" },
      { status: 502 },
    );
  }
}
