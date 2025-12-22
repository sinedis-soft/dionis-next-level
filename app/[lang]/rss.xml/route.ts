// app/[lang]/rss.xml/route.ts
import type { Lang } from "@/dictionaries/header";
import { getAllArticles } from "@/lib/blog";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://dionis-insurance.com";

function normalizeLang(value: string): Lang {
  return value === "ru" || value === "kz" || value === "en" ? value : "ru";
}

function escapeXml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang: rawLang } = await params;
  const lang = normalizeLang(rawLang);

  const items = await getAllArticles(lang);

  const channelTitle =
    lang === "ru"
      ? "Dionis — Блог"
      : lang === "kz"
      ? "Dionis — Blog (KZ)"
      : "Dionis — Blog (EN)";

  const channelLink = `${SITE_URL}/${lang}/blog`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${escapeXml(channelLink)}</link>
    <description>${escapeXml(
      "Статьи о страховании: авто, грузы, кейсы и практические разборы."
    )}</description>
    <language>${escapeXml(lang)}</language>
    ${items
      .slice(0, 50)
      .map((a) => {
        const link = `${SITE_URL}/${lang}/blog/${a.slug}`;
        return `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${escapeXml(new Date(a.publishedAt).toUTCString())}</pubDate>
      <description>${escapeXml(a.excerpt)}</description>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
