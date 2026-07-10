import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, MessagesSquare, Search as SearchIcon, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
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

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => void runSearch(query, tab), 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, tab, runSearch]);

  const results = tab === "docs" ? docResults : msgResults;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">

        {/* Hero header + search bar */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pt-2 pb-6"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="shrink-0">
              <h1 className="mb-2 bg-gradient-to-r from-white via-slate-100 to-accent-300 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl">
                Global Search
              </h1>
            </div>
            {/* Search bar */}
            <div className="relative group w-full lg:max-w-xl">
              <SearchIcon
                size={20}
                className="absolute top-1/2 left-4.5 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-accent-400"
              />
              <Input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  tab === "docs"
                    ? "Search documents — e.g. sea surface temperature algorithm…"
                    : "Search your messages…"
                }
                className="glass-strong py-4 pl-12 pr-4 text-base rounded-2xl border-white/5 focus:border-accent-500/40 transition-all shadow-lg shadow-black/20 placeholder-slate-500"
                aria-label="Search query"
              />
            </div>
          </div>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-400">
            Semantic search across the MOSDAC document corpus, or retrieve
            conversations from your chat history.
          </p>

          {/* Tab pills */}
          <div
            className="mt-5 flex gap-1.5 glass-strong p-1.5 rounded-2xl w-fit border border-white/5"
            role="tablist"
          >
            {(
              [
                { id: "docs", label: "Documents", icon: FileText, color: "text-accent-400" },
                { id: "messages", label: "My Messages", icon: MessagesSquare, color: "text-nebula-400" },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "relative flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all",
                  tab === t.id ? "text-white" : "text-slate-400 hover:text-white"
                )}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="activeTabSearch"
                    className="absolute inset-0 bg-accent-500/20 border border-accent-500/30 rounded-xl"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <t.icon size={15} className="relative z-10" />
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Results area */}
        <div className="mx-auto max-w-5xl">
          {/* Loading */}
          {loading && (
            <div className="glass-strong flex items-center justify-center gap-3 rounded-3xl border border-white/5 p-14 shadow-lg">
              <Spinner /> <span className="text-slate-400">Searching corpus…</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="glass-strong rounded-3xl border border-red-500/20 bg-red-500/5 p-10 text-center text-sm text-red-300 shadow-lg">
              {error}
            </div>
          )}

          {/* Initial empty state */}
          {!loading && !error && results === null && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="glass-strong rounded-3xl border border-white/5 p-14 text-center shadow-lg"
            >
              <h2 className="mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-xl font-extrabold text-transparent">
                Start your search
              </h2>
              <p className="mx-auto max-w-sm text-sm text-slate-400 leading-relaxed">
                {tab === "docs"
                  ? "Explore technical specs, ATBD guides, and product definitions from ISRO's MOSDAC documentation corpus."
                  : "Search your private conversation history to locate past queries and detailed responses."}
              </p>
            </motion.div>
          )}

          {/* No results */}
          {!loading && !error && results !== null && results.length === 0 && (
            <div className="glass-strong rounded-3xl border border-white/5 p-14 text-center shadow-lg">
              <h2 className="mb-2 text-base font-bold text-white">No results found</h2>
              <p className="mx-auto max-w-sm text-sm text-slate-400">
                We couldn&rsquo;t find any matches for &ldquo;{query}&rdquo; in our{" "}
                {tab === "docs" ? "documentation database" : "chat threads"}. Try rephrasing or broadening terms.
              </p>
            </div>
          )}

          {/* Document results */}
          {!loading && !error && tab === "docs" && docResults && docResults.length > 0 && (
            <div className="space-y-4">
              {docResults.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                >
                  <div className="glass-strong group rounded-2xl border border-white/5 p-5 shadow-lg transition-all duration-300 hover:border-accent-500/25 hover:-translate-y-0.5">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2.5 text-sm font-bold text-accent-300 transition-colors group-hover:text-accent-200">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-accent-400">
                          <FileText size={14} />
                        </div>
                        {r.source.split("/").pop()?.split("\\").pop() || r.source}
                      </span>
                      {r.score != null && (
                        <span className="flex shrink-0 items-center gap-2.5">
                          <span className="h-1.5 w-16 overflow-hidden rounded-full bg-white/5" aria-hidden>
                            <span
                              className="block h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-300"
                              style={{ width: `${Math.round(r.score * 100)}%` }}
                            />
                          </span>
                          <span className="text-[10px] font-bold font-mono tracking-wider text-slate-500">
                            {(r.score * 100).toFixed(0)}%
                          </span>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">{r.content_preview}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Message results */}
          {!loading && !error && tab === "messages" && msgResults && msgResults.length > 0 && (
            <div className="space-y-4">
              {msgResults.map((r, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                  onClick={() => navigate(`/chat/${r.thread_id}`)}
                  className="block w-full cursor-pointer text-left focus:outline-none"
                >
                  <div className="glass-strong group rounded-2xl border border-white/5 p-5 shadow-lg transition-all duration-300 hover:border-nebula-400/25 hover:-translate-y-0.5">
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className={cn(
                        "text-[10px] font-bold font-mono tracking-widest uppercase px-2.5 py-1 rounded-md border",
                        r.role === "user"
                          ? "bg-white/5 border-white/10 text-slate-400"
                          : "bg-accent-500/10 border-accent-500/20 text-accent-300"
                      )}>
                        {r.role === "user" ? "You" : "AstraQ"}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono tracking-wider">
                        {formatRelativeTime(r.timestamp)}
                      </span>
                    </div>
                    <p className="mb-3 text-sm text-slate-300 leading-relaxed">
                      {r.content.slice(0, 220)}
                      {r.content.length > 220 && "…"}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-medium text-nebula-400 transition-colors group-hover:text-nebula-300">
                      <MessagesSquare size={13} />
                      <span className="truncate">{r.thread_title || "Untitled Conversation"}</span>
                      <ArrowRight size={12} className="ml-auto shrink-0 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
