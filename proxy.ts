import { NextRequest, NextResponse } from "next/server";

const LANGUAGE_COOKIE = "dionis_language";
const SUPPORTED_LANGS = ["ru", "kz", "en"] as const;
const LANGUAGE_ROUTE = "/language";
const CANONICAL_HOST = "dionis-insurance.kz";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0"]);

function isSupportedLang(
  value: string | undefined,
): value is (typeof SUPPORTED_LANGS)[number] {
  return SUPPORTED_LANGS.some((lang) => lang === value);
}

function isLocalHost(hostname: string): boolean {
  return LOCAL_HOSTS.has(hostname) || hostname.endsWith(".localhost");
}

function shouldSkip(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.includes(".")
  );
}

function hasSupportedLanguagePrefix(pathname: string) {
  const [, lang] = pathname.split("/");
  return isSupportedLang(lang);
}

function withLanguage(pathname: string, lang: string) {
  const [rawPathname, rawQuery = ""] = pathname.split("?");
  const parts = rawPathname.split("/");

  if (isSupportedLang(parts[1])) {
    parts[1] = lang;
    const nextPathname = parts.join("/") || `/${lang}`;
    return rawQuery ? `${nextPathname}?${rawQuery}` : nextPathname;
  }

  if (rawPathname === "/")
    return rawQuery ? `/${lang}?${rawQuery}` : `/${lang}`;

  const nextPathname = `/${lang}${rawPathname}`;
  return rawQuery ? `${nextPathname}?${rawQuery}` : nextPathname;
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const canonicalUrl = request.nextUrl.clone();
  const hostname = canonicalUrl.hostname.toLowerCase();
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const shouldForceHttps =
    (forwardedProto === "http" || canonicalUrl.protocol === "http:") &&
    !isLocalHost(hostname);
  const shouldDropWww = hostname === `www.${CANONICAL_HOST}`;
  const shouldDropTrailingSlash = pathname.length > 1 && pathname.endsWith("/");

  if (shouldDropWww) canonicalUrl.hostname = CANONICAL_HOST;
  if (shouldForceHttps) canonicalUrl.protocol = "https:";
  if (shouldDropTrailingSlash) {
    canonicalUrl.pathname = pathname.replace(/\/+$/, "");
  }

  if (shouldDropWww || shouldForceHttps || shouldDropTrailingSlash) {
    return NextResponse.redirect(canonicalUrl, 301);
  }

  if (shouldSkip(pathname)) return NextResponse.next();

  const selectedLang = request.cookies.get(LANGUAGE_COOKIE)?.value;

  if (pathname === LANGUAGE_ROUTE) {
    if (isSupportedLang(selectedLang)) {
      const requestedReturnTo =
        request.nextUrl.searchParams.get("returnTo") || "/";
      const destination = request.nextUrl.clone();
      const [nextPathname, nextSearch = ""] = withLanguage(
        requestedReturnTo,
        selectedLang,
      ).split("?");
      destination.pathname = nextPathname;
      destination.search = nextSearch ? `?${nextSearch}` : "";
      return NextResponse.redirect(destination);
    }

    return NextResponse.next();
  }

  if (hasSupportedLanguagePrefix(pathname)) {
    return NextResponse.next();
  }

  if (!isSupportedLang(selectedLang)) {
    const destination = request.nextUrl.clone();

    if (pathname === "/") {
      destination.pathname = "/ru";
      destination.search = "";
      return NextResponse.redirect(destination);
    }

    destination.pathname = LANGUAGE_ROUTE;
    destination.searchParams.set("returnTo", `${pathname}${search}`);
    return NextResponse.redirect(destination);
  }

  if (pathname === "/") {
    const destination = request.nextUrl.clone();
    destination.pathname = `/${selectedLang}`;
    destination.search = "";
    return NextResponse.redirect(destination);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
