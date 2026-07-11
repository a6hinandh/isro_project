import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Rocket, Satellite, BrainCircuit, Database, ChevronRight } from "lucide-react";
import { TypingDots } from "@/components/ui/Spinner";
import { MessageBubble } from "@/features/chat/MessageBubble";
import type { UIMessage } from "@/lib/types";
import { cn } from "@/lib/utils";

const starterPrompts = [
  {
    text: "Which products does INSAT-3D provide?",
    icon: Satellite,
    color: "text-accent-400",
    borderColor: "border-accent-400/20",
    hoverClass: "hover:border-accent-500/40 hover:shadow-accent-500/5 hover:bg-accent-500/5",
    tagBg: "bg-accent-400/5",
    tag: "Satellite Payload",
  },
  {
    text: "Explain how SST is retrieved",
    icon: BrainCircuit,
    color: "text-nebula-400",
    borderColor: "border-nebula-400/20",
    hoverClass: "hover:border-nebula-500/40 hover:shadow-nebula-500/5 hover:bg-nebula-500/5",
    tagBg: "bg-nebula-400/5",
    tag: "Retrieval Logic",
  },
  {
    text: "Which satellites observe rainfall?",
    icon: Database,
    color: "text-green-400",
    borderColor: "border-green-400/20",
    hoverClass: "hover:border-emerald-500/40 hover:shadow-emerald-500/5 hover:bg-emerald-500/5",
    tagBg: "bg-green-400/5",
    tag: "Data Products",
  },
  {
    text: "What is AMV?",
    icon: Rocket,
    color: "text-star",
    borderColor: "border-star/20",
    hoverClass: "hover:border-amber-500/40 hover:shadow-amber-500/5 hover:bg-amber-500/5",
    tagBg: "bg-star/5",
    tag: "Definitions",
  },
];

interface MessageListProps {
  messages: UIMessage[];
  loading: boolean;
  onStarterClick: (prompt: string) => void;
  displayName?: string;
}

export function MessageList({ messages, loading, onStarterClick, displayName }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  return (
    <div ref={containerRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-8 max-w-2xl text-center sm:mt-12"
        >
          {/* Logo with futuristic spinning orbits */}
          <div className="relative mx-auto mb-6 flex size-24 items-center justify-center">
            <motion.div
              className="absolute inset-0 rounded-full border border-accent-500/10 bg-accent-500/[0.02]"
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border border-dashed border-indigo-400/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border border-dashed border-accent-400/15"
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <img
              src="/logo.png"
              alt="AstraQ logo"
              className="relative size-14 rounded-2xl object-cover shadow-xl shadow-accent-500/20"
            />
          </div>

          {/* Active Status Indicator */}
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            ASTRA-Q SYSTEM ACTIVE
          </div>

          <h1 className="mb-3 bg-gradient-to-r from-white via-slate-100 to-accent-300 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl">
            {displayName ? (
              <>
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-accent-400 to-nebula-400 bg-clip-text drop-shadow-[0_0_12px_rgba(56,189,248,0.25)]">
                  {displayName}
                </span>
              </>
            ) : (
              "Welcome to AstraQ"
            )}
          </h1>
          <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
            Your intelligent space mission assistant. Ask anything about
            satellites, payloads, or ISRO science datasets.
          </p>

          {/* Starter prompt cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {starterPrompts.map((prompt, idx) => (
              <motion.button
                key={prompt.text}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + idx * 0.07 }}
                whileHover={{ y: -3 }}
                onClick={() => onStarterClick(prompt.text)}
                className={cn(
                  "group glass-strong cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300",
                  prompt.borderColor,
                  prompt.hoverClass,
                )}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className={cn("flex size-9 items-center justify-center rounded-xl transition-colors", prompt.tagBg, prompt.color)}>
                    <prompt.icon size={18} />
                  </div>
                  <span className={cn("text-[10px] font-bold font-mono uppercase tracking-widest", prompt.color)}>
                    {prompt.tag}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                    {prompt.text}
                  </span>
                  <ChevronRight size={14} className="shrink-0 text-slate-600 transition-all group-hover:text-slate-300 group-hover:translate-x-0.5" />
                </div>
              </motion.button>
            ))}
          </div>

        </motion.div>
      ) : (
        <>
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="glass-strong rounded-2xl rounded-bl-md px-4 py-3.5 border border-white/5">
                <TypingDots />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
