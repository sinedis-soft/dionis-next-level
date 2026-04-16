const SEO_LASTMOD_TIMEOUT_MS = 3000;

function toIsoDate(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const ms = Date.parse(value);
  if (!Number.isFinite(ms)) return null;
  return new Date(ms).toISOString();
}

function normalizePath(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed.startsWith("/")) return null;
  return trimmed;
}

function parseLastmodPayload(payload: unknown): Record<string, string> {
  const out: Record<string, string> = {};

  if (Array.isArray(payload)) {
    for (const row of payload) {
      if (!row || typeof row !== "object") continue;
      const rec = row as Record<string, unknown>;
      const path = normalizePath(rec.path ?? rec.url ?? rec.loc);
      const lastmod = toIsoDate(rec.lastmod ?? rec.lastModified ?? rec.updated_at);
      if (path && lastmod) out[path] = lastmod;
    }
    return out;
  }

  if (!payload || typeof payload !== "object") return out;
  const rec = payload as Record<string, unknown>;

  for (const key of ["lastmod", "pages", "data", "items"] as const) {
    const nested = rec[key];
    if (nested && typeof nested === "object" && !Array.isArray(nested)) {
      const nestedRec = nested as Record<string, unknown>;
      for (const [pathRaw, lastmodRaw] of Object.entries(nestedRec)) {
        const path = normalizePath(pathRaw);
        const lastmod = toIsoDate(lastmodRaw);
        if (path && lastmod) out[path] = lastmod;
      }
    }

    if (Array.isArray(nested)) {
      for (const [path, lastmod] of Object.entries(parseLastmodPayload(nested))) {
        out[path] = lastmod;
      }
    }
  }

  // формат: {"/ru/blog": "2026-01-01T00:00:00Z"}
  for (const [pathRaw, lastmodRaw] of Object.entries(rec)) {
    const path = normalizePath(pathRaw);
    const lastmod = toIsoDate(lastmodRaw);
    if (path && lastmod) out[path] = lastmod;
  }

  return out;
}

async function requestLastmod(
  endpoint: string,
  paths: string[]
): Promise<Record<string, string>> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), SEO_LASTMOD_TIMEOUT_MS);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths }),
      signal: ctrl.signal,
      cache: "no-store",
    });

    if (!res.ok) return {};

    const json = (await res.json()) as unknown;
    return parseLastmodPayload(json);
  } catch {
    return {};
  } finally {
    clearTimeout(timer);
  }
}

export async function getFastApiLastmodMap(
  paths: string[]
): Promise<Record<string, string>> {
  const endpoint = process.env.SEO_LASTMOD_API_URL?.trim();
  if (!endpoint) return {};

  const uniquePaths = [...new Set(paths)].filter((p) => p.startsWith("/"));
  if (!uniquePaths.length) return {};

  return requestLastmod(endpoint, uniquePaths);
}
