import { useCallback, useEffect, useState } from "react";
import { apiDelete, apiGet, apiPost } from "@/lib/api";
import type { ThreadItem } from "@/lib/types";

export function useThreads() {
  const [threads, setThreads] = useState<ThreadItem[]>([]);
  const [favorites, setFavorites] = useState<ThreadItem[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [threadList, favoriteList] = await Promise.all([
        apiGet<ThreadItem[]>("/threads"),
        apiGet<ThreadItem[]>("/threads/favorites"),
      ]);
      setThreads(threadList);
      setFavorites(favoriteList);
    } catch {
      // keep stale lists on transient errors
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const remove = useCallback(
    async (threadId: string) => {
      try {
        await apiDelete(`/threads/${threadId}`);
      } finally {
        void refresh();
      }
    },
    [refresh],
  );

  const toggleFavorite = useCallback(
    async (threadId: string) => {
      try {
        await apiPost<{ is_favorite: boolean }>(`/threads/${threadId}/favorite`);
      } finally {
        void refresh();
      }
    },
    [refresh],
  );

  return { threads, favorites, loading, refresh, remove, toggleFavorite };
}
