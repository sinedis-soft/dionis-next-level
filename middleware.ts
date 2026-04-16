import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const DEFAULT_LANG = "ru";

const DEFAULT_CANONICAL_PREFIXES = [
  "/about",
  "/green-card",
  "/osago-rf",
  "/contacts",
  "/contact",
  "/insurance-comparison",
  "/blog",
] as const;

function isDefaultCanonicalPath(pathname: string): boolean {
  if (pathname === "/blog" || pathname.startsWith("/blog/")) return true;
  return DEFAULT_CANONICAL_PREFIXES.some((p) => pathname === p);
}

function isDefaultLangVariant(pathname: string): boolean {
  if (pathname === `/${DEFAULT_LANG}/blog`) return true;
  if (pathname.startsWith(`/${DEFAULT_LANG}/blog/`)) return true;
  return DEFAULT_CANONICAL_PREFIXES.some(
    (p) => pathname === `/${DEFAULT_LANG}${p}`
  );
}

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const host = req.headers.get("host") ?? url.host;
  let needsDomainRedirect = false;

  if (forwardedProto === "http") {
    url.protocol = "https:";
    needsDomainRedirect = true;
  }

  if (host.startsWith("www.")) {
    url.host = host.slice(4);
    needsDomainRedirect = true;
  }

  // /ru/<page> -> /<page> for canonical default-language URLs
  if (isDefaultLangVariant(url.pathname)) {
    url.pathname = url.pathname.replace(/^\/ru(?=\/|$)/, "") || "/";
    return NextResponse.redirect(url, 301);
  }

  if (needsDomainRedirect) {
    return NextResponse.redirect(url, 301);
  }

  // Serve canonical no-prefix URLs from RU routes without changing browser URL
  if (isDefaultCanonicalPath(url.pathname)) {
    const rewriteUrl = req.nextUrl.clone();
    rewriteUrl.pathname = `/${DEFAULT_LANG}${url.pathname}`;
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api).*)",
  ],
};

