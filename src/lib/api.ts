export const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

type TokenProvider = () => Promise<string | null>;

let _getToken: TokenProvider | null = null;

export function setTokenProvider(fn: TokenProvider | null): void {
  _getToken = fn;
}

export class ApiError extends Error {
  readonly status: number;
  readonly retryAfter: number | null;

  constructor(status: number, message: string, retryAfter: number | null = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.retryAfter = retryAfter;
  }
}

async function authHeaders(extra: HeadersInit = {}): Promise<Headers> {
  const headers = new Headers(extra);
  if (_getToken) {
    try {
      const token = await _getToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
    } catch {
      // token unavailable — proceed without auth
    }
  }
  return headers;
}

export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const headers = await authHeaders(options.headers ?? {});
  return fetch(`${API_BASE}${path}`, { ...options, headers });
}

async function toError(res: Response): Promise<ApiError> {
  let detail = res.statusText;
  try {
    const body = (await res.json()) as { detail?: string };
    if (body.detail) detail = body.detail;
  } catch {
    // non-JSON error body
  }
  const retryAfter = res.headers.get("Retry-After");
  return new ApiError(res.status, detail, retryAfter ? Number(retryAfter) : null);
}

/** Fetch JSON with typed response; throws ApiError on non-2xx. */
export async function apiJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await apiFetch(path, options);
  if (!res.ok) throw await toError(res);
  return (await res.json()) as T;
}

export function apiGet<T>(path: string): Promise<T> {
  return apiJson<T>(path);
}

export function apiPost<T>(path: string, body?: unknown): Promise<T> {
  return apiJson<T>(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export function apiPatch<T>(path: string, body: unknown): Promise<T> {
  return apiJson<T>(path, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

export function apiDelete<T>(path: string): Promise<T> {
  return apiJson<T>(path, { method: "DELETE" });
}

/** Multipart upload (no Content-Type header — browser sets the boundary). */
export function apiUpload<T>(path: string, formData: FormData): Promise<T> {
  return apiJson<T>(path, { method: "POST", body: formData });
}
