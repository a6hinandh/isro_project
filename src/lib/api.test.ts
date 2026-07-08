import { afterEach, describe, expect, it, vi } from "vitest";
import { apiGet, apiPost, ApiError, setTokenProvider } from "@/lib/api";

function mockFetch(response: Partial<Response> & { jsonBody?: unknown }) {
  const { jsonBody, ...rest } = response;
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    statusText: "OK",
    headers: new Headers(),
    json: () => Promise.resolve(jsonBody ?? {}),
    ...rest,
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
  setTokenProvider(null);
});

describe("api client", () => {
  it("injects the Authorization header when a token provider is set", async () => {
    const fetchMock = mockFetch({ jsonBody: [] });
    setTokenProvider(() => Promise.resolve("test-token-123"));

    await apiGet("/threads");

    const headers = fetchMock.mock.calls[0]?.[1]?.headers as Headers;
    expect(headers.get("Authorization")).toBe("Bearer test-token-123");
  });

  it("omits the Authorization header without a provider", async () => {
    const fetchMock = mockFetch({ jsonBody: [] });

    await apiGet("/threads");

    const headers = fetchMock.mock.calls[0]?.[1]?.headers as Headers;
    expect(headers.get("Authorization")).toBeNull();
  });

  it("prefixes paths with the API base", async () => {
    const fetchMock = mockFetch({ jsonBody: {} });

    await apiGet("/kg/satellites");

    expect(String(fetchMock.mock.calls[0]?.[0])).toMatch(/\/api\/kg\/satellites$/);
  });

  it("serializes JSON bodies on POST", async () => {
    const fetchMock = mockFetch({ jsonBody: {} });

    await apiPost("/chat", { message: "hi", thread_id: null });

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ message: "hi", thread_id: null });
  });

  it("throws ApiError with status and Retry-After on failure", async () => {
    mockFetch({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
      headers: new Headers({ "Retry-After": "60" }),
      jsonBody: { detail: "Rate limit exceeded" },
    });

    const error = await apiGet("/chat").catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ApiError);
    expect((error as ApiError).status).toBe(429);
    expect((error as ApiError).retryAfter).toBe(60);
    expect((error as ApiError).message).toBe("Rate limit exceeded");
  });
});
