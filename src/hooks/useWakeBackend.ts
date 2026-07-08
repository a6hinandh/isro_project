import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";

/**
 * Ping the backend health endpoint on mount to wake a sleeping free-tier
 * instance. Exposes `backendWaking` so pages can show a warm-up banner.
 */
export function useWakeBackend(): { backendWaking: boolean } {
  const [backendWaking, setBackendWaking] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    // If the ping hasn't answered within 3s, assume a cold start is underway.
    const slowTimer = setTimeout(() => setBackendWaking(true), 3000);

    const base = API_BASE.replace(/\/api\/?$/, "");
    fetch(`${base}/health/ready`, { signal: controller.signal })
      .then(() => setBackendWaking(false))
      .catch(() => {
        // Network error also means it's still waking (or down) — keep banner.
      })
      .finally(() => clearTimeout(slowTimer));

    return () => {
      controller.abort();
      clearTimeout(slowTimer);
    };
  }, []);

  return { backendWaking };
}
