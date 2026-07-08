import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, MessagesSquare, Search as SearchIcon } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { apiGet } from "@/lib/api";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { DocSearchResult, SearchResult } from "@/lib/types";

type Tab = "docs" | "messages";

export default function SearchPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("docs");
  const [query, setQuery] = useState("");
  const [docResults, setDocResults] = useState<DocSearchResult[] | null>(null);
  const [msgResults, setMsgResults] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(
    async (q: string, activeTab: Tab) => {
      if (!q.trim()) {
        setDocResults(null);
        setMsgResults(null);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        if (activeTab === "docs") {
          setDocResults(await apiGet<DocSearchResult[]>(`/search/docs?q=${encodeURIComponent(q)}`));
        } else {
          setMsgResults(await apiGet<SearchResult[]>(`/search?q=${encodeURIComponent(q)}`));
        }
      } catch {
        setError(
          activeTab === "docs"
            ? "Document search is unavailable right now. The server may still be warming up."
            : "Message search failed. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Debounced search-as-you-type
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => void runSearch(query, tab), 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, tab, runSearch]);

  const results = tab === "docs" ? docResults : msgResults;

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center">
          <h1 className="mb-1 text-2xl font-bold text-white">Global Search</h1>
          <p className="text-sm text-slate-400">
            Semantic search across the MOSDAC document corpus, or find your own past messages.
          </p>
        </div>

        <div className="relative mb-4">
          <SearchIcon size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              tab === "docs"
                ? "Search documents — e.g. sea surface temperature algorithm…"
                : "Search your messages…"
            }
            className="py-3.5 pl-11 text-base"
            aria-label="Search query"
          />
        </div>

        <div className="mb-6 flex gap-2" role="tablist">
          {(
            [
              { id: "docs", label: "Documents", icon: FileText },
              { id: "messages", label: "My messages", icon: MessagesSquare },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                tab === t.id
                  ? "bg-accent-500/15 text-accent-300"
                  : "text-slate-400 hover:bg-white/10 hover:text-white",
              )}
            >
              <t.icon size={15} /> {t.label}
            </button>
          ))}
        </div>

        {loading && (
          <GlassPanel className="flex items-center justify-center gap-3 p-10">
            <Spinner /> <span className="text-slate-400">Searching…</span>
          </GlassPanel>
        )}

        {!loading && error && (
          <GlassPanel className="p-8 text-center text-sm text-red-300">{error}</GlassPanel>
        )}

        {!loading && !error && results === null && (
          <GlassPanel className="p-10 text-center text-sm text-slate-500">
            Start typing to search{tab === "docs" ? " the corpus" : " your history"}.
          </GlassPanel>
        )}

        {!loading && !error && results !== null && results.length === 0 && (
          <GlassPanel className="p-10 text-center text-sm text-slate-400">
            No results for “{query}”.
          </GlassPanel>
        )}

        {/* Document results */}
        {!loading && !error && tab === "docs" && docResults && docResults.length > 0 && (
          <div className="space-y-3">
            {docResults.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.3) }}
              >
                <GlassPanel className="p-4">
                  <div className="mb-1.5 flex items-center justify-between gap-3">
                    <span className="truncate text-sm font-semibold text-accent-300">
                      {r.source}
                    </span>
                    {r.score != null && (
                      <span className="flex shrink-0 items-center gap-2">
                        <span
                          className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10"
                          aria-hidden
                        >
                          <span
                            className="block h-full rounded-full bg-accent-400"
                            style={{ width: `${Math.round(r.score * 100)}%` }}
                          />
                        </span>
                        <span className="text-xs text-slate-500">
                          {(r.score * 100).toFixed(0)}%
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="line-clamp-3 text-sm text-slate-300">{r.content_preview}</p>
                </GlassPanel>
              </motion.div>
            ))}
          </div>
        )}

        {/* Message results */}
        {!loading && !error && tab === "messages" && msgResults && msgResults.length > 0 && (
          <div className="space-y-3">
            {msgResults.map((r, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(i * 0.04, 0.3) }}
                onClick={() => navigate(`/chat/${r.thread_id}`)}
                className="block w-full cursor-pointer text-left"
              >
                <GlassPanel className="p-4 transition-colors hover:border-accent-400/40">
                  <p className="mb-1 text-sm text-slate-200">
                    <span className="text-slate-500">{r.role === "user" ? "You: " : "Astra-Q: "}</span>
                    {r.content.slice(0, 160)}
                    {r.content.length > 160 && "…"}
                  </p>
                  <p className="text-xs text-slate-500">
                    {r.thread_title}
                    {formatRelativeTime(r.timestamp) && ` · ${formatRelativeTime(r.timestamp)}`}
                  </p>
                </GlassPanel>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
