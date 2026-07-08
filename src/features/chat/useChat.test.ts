import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useChat } from "@/features/chat/useChat";

function jsonResponse(body: unknown, init: Partial<Response> = {}) {
  return {
    ok: true,
    status: 200,
    statusText: "OK",
    headers: new Headers(),
    json: () => Promise.resolve(body),
    ...init,
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("useChat", () => {
  it("captures thread_id from the chat response (new-thread bug fix)", async () => {
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      if (String(url).endsWith("/chat")) {
        return Promise.resolve(
          jsonResponse({
            answer: "INSAT-3D provides SST products.",
            sources: [],
            mode: "kg",
            thread_id: "thread_from_backend",
            gemini_used: false,
            cache_hit: false,
          }),
        );
      }
      // /suggestions fire-and-forget
      return Promise.resolve(jsonResponse({ suggestions: ["Follow up?"] }));
    });
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useChat());
    expect(result.current.currentThreadId).toBeNull();

    await act(async () => {
      await result.current.send("which products does INSAT-3D provide?");
    });

    expect(result.current.currentThreadId).toBe("thread_from_backend");
    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[1]?.type).toBe("bot");

    // Subsequent sends reuse the captured thread id
    await act(async () => {
      await result.current.send("and rainfall?");
    });
    const chatCalls = fetchMock.mock.calls.filter(([u]) => String(u).endsWith("/chat"));
    const secondBody = JSON.parse((chatCalls[1]?.[1] as RequestInit).body as string) as {
      thread_id: string | null;
    };
    expect(secondBody.thread_id).toBe("thread_from_backend");
  });

  it("populates follow-up suggestions after an answer", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((url: string) => {
        if (String(url).endsWith("/chat")) {
          return Promise.resolve(
            jsonResponse({
              answer: "answer",
              sources: [],
              mode: "rag",
              thread_id: "t1",
              gemini_used: true,
              cache_hit: false,
            }),
          );
        }
        return Promise.resolve(
          jsonResponse({ suggestions: ["What is SST?", "Which satellites observe rain?"] }),
        );
      }),
    );

    const { result } = renderHook(() => useChat());
    await act(async () => {
      await result.current.send("explain sst");
    });

    await waitFor(() => {
      expect(result.current.suggestions).toEqual([
        "What is SST?",
        "Which satellites observe rain?",
      ]);
    });
  });

  it("shows a friendly rate-limit message on 429", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 429,
        statusText: "Too Many Requests",
        headers: new Headers({ "Retry-After": "60" }),
        json: () => Promise.resolve({ detail: "Rate limit exceeded" }),
      }),
    );

    const { result } = renderHook(() => useChat());
    await act(async () => {
      await result.current.send("hello");
    });

    expect(result.current.messages[1]?.text).toMatch(/too quickly/i);
  });

  it("ignores empty and whitespace-only messages", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { result } = renderHook(() => useChat());
    await act(async () => {
      await result.current.send("   ");
    });

    expect(result.current.messages).toHaveLength(0);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
