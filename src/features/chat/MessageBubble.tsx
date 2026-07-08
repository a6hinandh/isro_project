import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";
import { ModeBadge } from "@/components/ui/Badge";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { UIMessage } from "@/lib/types";

function SourcesPanel({ message }: { message: UIMessage }) {
  const [open, setOpen] = useState(false);
  const sources = message.sources ?? [];
  if (sources.length === 0) return null;

  return (
    <div className="mt-3 border-t border-white/10 pt-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-slate-200"
        aria-expanded={open}
      >
        {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        <FileText size={13} />
        {sources.length} source{sources.length !== 1 ? "s" : ""}
        <ModeBadge mode={message.mode} />
      </button>

      {open && (
        <ul className="mt-2 space-y-2">
          {sources.map((s, i) => (
            <li key={i} className="rounded-lg bg-black/20 p-2.5 text-xs">
              <div className="mb-1 font-semibold text-accent-300">
                {s.source}
                {s.page != null && <span className="text-slate-400"> · p. {s.page}</span>}
              </div>
              {s.content_preview && (
                <p className="line-clamp-3 text-slate-400">{s.content_preview}</p>
              )}
              {s.cypher && (
                <pre className="mt-1.5 overflow-x-auto rounded bg-black/40 p-2 text-[11px] text-nebula-300">
                  <code>{s.cypher}</code>
                </pre>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.type === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%]",
          isUser
            ? "rounded-br-md bg-accent-500/90 text-white"
            : "glass rounded-bl-md text-slate-100",
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.text}</p>
        ) : (
          <div className="prose prose-sm prose-invert max-w-none [&_a]:text-accent-300 [&_code]:rounded [&_code]:bg-black/30 [&_code]:px-1 [&_code]:py-0.5 [&_li]:my-0.5 [&_ol]:my-2 [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-black/40 [&_pre]:p-3 [&_ul]:my-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.text}</ReactMarkdown>
          </div>
        )}

        {!isUser && <SourcesPanel message={message} />}

        {message.timestamp && (
          <div className={cn("mt-1.5 text-[11px]", isUser ? "text-white/70" : "text-slate-500")}>
            {formatRelativeTime(message.timestamp)}
          </div>
        )}
      </div>
    </motion.div>
  );
}
