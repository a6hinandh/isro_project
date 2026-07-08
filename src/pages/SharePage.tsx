import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { MessageBubble } from "@/features/chat/MessageBubble";
import { API_BASE } from "@/lib/api";
import type { SharedThread, Source, UIMessage } from "@/lib/types";

function parseSources(sourcesJson: string): Source[] {
  try {
    const parsed = JSON.parse(sourcesJson) as unknown;
    return Array.isArray(parsed) ? (parsed as Source[]) : [];
  } catch {
    return [];
  }
}

/** Public read-only view of a shared conversation — no auth required. */
export default function SharePage() {
  const { token = "" } = useParams<{ token: string }>();
  const [thread, setThread] = useState<SharedThread | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Deliberately unauthenticated fetch — this page must work logged out.
    fetch(`${API_BASE}/share/${encodeURIComponent(token)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(res.status === 404 ? "notfound" : "error");
        setThread((await res.json()) as SharedThread);
      })
      .catch((e: Error) => setError(e.message));
  }, [token]);

  const messages: UIMessage[] = (thread?.messages ?? []).map((m) => ({
    type: m.role === "user" ? "user" : "bot",
    text: m.content,
    timestamp: "",
    sources: m.role === "assistant" ? parseSources(m.sources_json) : undefined,
    mode: m.mode || undefined,
  }));

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      {error ? (
        <GlassPanel className="p-10 text-center">
          <h1 className="mb-2 text-xl font-bold text-white">
            {error === "notfound" ? "This shared link doesn't exist" : "Something went wrong"}
          </h1>
          <p className="mb-6 text-sm text-slate-400">
            {error === "notfound"
              ? "The link may have been revoked by its owner."
              : "Please try again in a moment."}
          </p>
          <Link to="/">
            <Button>
              <Rocket size={16} /> Try Astra-Q
            </Button>
          </Link>
        </GlassPanel>
      ) : thread === null ? (
        <GlassPanel className="flex items-center justify-center gap-3 p-16">
          <Spinner /> <span className="text-slate-400">Loading shared conversation…</span>
        </GlassPanel>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6 text-center">
            <p className="mb-1 text-xs tracking-wider text-slate-500 uppercase">
              Shared conversation
            </p>
            <h1 className="text-2xl font-bold text-white">{thread.title}</h1>
          </div>

          <div className="space-y-4">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}
          </div>

          <GlassPanel className="mt-10 flex flex-col items-center gap-3 p-6 text-center">
            <p className="text-sm text-slate-300">
              Powered by <strong className="text-white">Astra-Q</strong> — AI answers
              for ISRO&apos;s MOSDAC satellite data.
            </p>
            <Link to="/">
              <Button size="sm">
                <Rocket size={15} /> Start your own conversation
              </Button>
            </Link>
          </GlassPanel>
        </motion.div>
      )}
    </div>
  );
}
