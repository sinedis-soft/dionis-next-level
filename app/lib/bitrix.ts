// lib/bitrix.ts
import { Buffer } from "buffer";

export type BitrixPayload = Record<string, unknown>;

type BitrixRawResponse<T> = {
  result?: T;
  error?: string;
  error_description?: string;
};

export type BitrixFileTuple = [string, string];
export type BitrixFileValueItem = { fileData: BitrixFileTuple };

export type BitrixClientOptions = {
  baseUrl: string;
  minIntervalMs?: number;
  timeoutMs?: number;
  maxAttempts?: number;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

function createDeferred(): {
  promise: Promise<void>;
  resolve: () => void;
} {
  let resolve = () => {};
  const promise = new Promise<void>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}

export class BitrixApiError extends Error {
  public readonly method: string;
  public readonly status?: number;
  public readonly code?: string;
  public readonly description?: string;
  public readonly retryable: boolean;

  constructor(args: {
    method: string;
    message: string;
    status?: number;
    code?: string;
    description?: string;
    retryable?: boolean;
  }) {
    super(args.message);
    this.name = "BitrixApiError";
    this.method = args.method;
    this.status = args.status;
    this.code = args.code;
    this.description = args.description;
    this.retryable = Boolean(args.retryable);
  }
}

function isRetryableStatus(status?: number): boolean {
  return [408, 429, 500, 502, 503, 504].includes(Number(status));
}

function isRetryableBitrixCode(code?: string): boolean {
  if (!code) return false;
  const normalized = code.toUpperCase();
  return (
    normalized.includes("QUERY_LIMIT_EXCEEDED") ||
    normalized.includes("TOO_MANY_REQUESTS")
  );
}

function isRetryableUnknownError(message: string): boolean {
  const m = message.toLowerCase();
  return (
    m.includes("aborted") ||
    m.includes("timeout") ||
    m.includes("network") ||
    m.includes("fetch failed") ||
    m.includes("socket hang up") ||
    m.includes("econnreset") ||
    m.includes("etimedout")
  );
}

export class BitrixClient {
  private readonly baseUrl: string;
  private readonly minIntervalMs: number;
  private readonly timeoutMs: number;
  private readonly maxAttempts: number;

  private lastRequestAt = 0;
  private queue: Promise<void> = Promise.resolve();

  constructor(options: BitrixClientOptions) {
    this.baseUrl = normalizeBaseUrl(options.baseUrl);
    this.minIntervalMs = options.minIntervalMs ?? 700;
    this.timeoutMs = options.timeoutMs ?? 15000;
    this.maxAttempts = options.maxAttempts ?? 4;
  }

  private async acquireSlot(): Promise<void> {
    const previous = this.queue;
    const deferred = createDeferred();

    this.queue = previous.then(
      () => deferred.promise,
      () => deferred.promise
    );

    await previous.catch(() => undefined);

    try {
      const now = Date.now();
      const diff = now - this.lastRequestAt;

      if (diff < this.minIntervalMs) {
        await sleep(this.minIntervalMs - diff);
      }

      this.lastRequestAt = Date.now();
    } finally {
      deferred.resolve();
    }
  }

  private async doFetch<T>(method: string, payload: BitrixPayload): Promise<T> {
    await this.acquireSlot();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.baseUrl}/${method}.json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data: BitrixRawResponse<T>;
      try {
        data = (await response.json()) as BitrixRawResponse<T>;
      } catch {
        throw new BitrixApiError({
          method,
          status: response.status,
          retryable: isRetryableStatus(response.status),
          message: `Bitrix returned invalid JSON. HTTP ${response.status}`,
        });
      }

      if (!response.ok || data.error) {
        const code = data.error;
        const description = data.error_description;
        const status = response.status;

        throw new BitrixApiError({
          method,
          status,
          code,
          description,
          retryable: isRetryableStatus(status) || isRetryableBitrixCode(code),
          message: `Bitrix error: ${description || code || `HTTP ${status}`}`,
        });
      }

      return data.result as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof BitrixApiError) {
        throw error;
      }

      const message = getErrorMessage(error);
      throw new BitrixApiError({
        method,
        retryable: isRetryableUnknownError(message),
        message: `Bitrix request failed: ${message}`,
      });
    }
  }

  async call<T = unknown>(method: string, payload: BitrixPayload): Promise<T> {
    let lastError: unknown;

    for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
      try {
        return await this.doFetch<T>(method, payload);
      } catch (error) {
        lastError = error;

        const retryable =
          error instanceof BitrixApiError ? error.retryable : false;

        if (!retryable || attempt >= this.maxAttempts) {
          console.error(`Bitrix ${method} failed`, error);
          throw error;
        }

        const backoffMs = Math.min(1200 * attempt, 5000);
        const jitterMs = Math.floor(Math.random() * 250);

        console.warn(
          `Bitrix ${method} failed on attempt ${attempt}, retrying in ${
            backoffMs + jitterMs
          } ms`,
          error
        );

        await sleep(backoffMs + jitterMs);
      }
    }

    throw lastError instanceof Error ? lastError : new Error(String(lastError));
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __bitrixClientSingleton: BitrixClient | undefined;
}

export function getBitrixClient(): BitrixClient {
  if (global.__bitrixClientSingleton) {
    return global.__bitrixClientSingleton;
  }

  const baseUrl = process.env.BITRIX_WEBHOOK_URL;
  if (!baseUrl) {
    throw new Error("BITRIX_WEBHOOK_URL is not set");
  }

  global.__bitrixClientSingleton = new BitrixClient({
    baseUrl,
    minIntervalMs: Number(process.env.BITRIX_MIN_INTERVAL_MS || "700"),
    timeoutMs: Number(process.env.BITRIX_TIMEOUT_MS || "15000"),
    maxAttempts: Number(process.env.BITRIX_MAX_ATTEMPTS || "4"),
  });

  return global.__bitrixClientSingleton;
}

export function normalizeBitrixId(
  value: string | number | null | undefined
): number | null {
  if (value === null || value === undefined) return null;
  const id = Number(value);
  return Number.isFinite(id) && id > 0 ? id : null;
}

export async function fileToBitrixFileTuple(file: File): Promise<BitrixFileTuple> {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return [file.name, base64];
}

export async function filesToBitrixFileField(
  files: File[]
): Promise<BitrixFileValueItem[]> {
  const prepared = await Promise.all(files.map((file) => fileToBitrixFileTuple(file)));
  return prepared.map((fileData) => ({ fileData }));
}