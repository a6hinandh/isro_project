import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Rocket, Satellite, BrainCircuit, Database, ChevronRight } from "lucide-react";
import { TypingDots } from "@/components/ui/Spinner";
import { MessageBubble } from "@/features/chat/MessageBubble";
import type { UIMessage } from "@/lib/types";

const starterPrompts = [
  {
    text: "Which products does INSAT-3D provide?",
    icon: Satellite,
    color: "text-accent-400",
    borderColor: "border-accent-400/20",
    tagBg: "bg-accent-400/5",
    tag: "Satellite Payload",
  },
  {
    text: "Explain how SST is retrieved",
    icon: BrainCircuit,
    color: "text-nebula-400",
    borderColor: "border-nebula-400/20",
    tagBg: "bg-nebula-400/5",
    tag: "Retrieval Logic",
  },
  {
    text: "Which satellites observe rainfall?",
    icon: Database,
    color: "text-green-400",
    borderColor: "border-green-400/20",
    tagBg: "bg-green-400/5",
    tag: "Data Products",
  },
  {
    text: "What is AMV?",
    icon: Rocket,
    color: "text-star",
    borderColor: "border-star/20",
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
          {/* Logo with glow */}
          <div className="relative mx-auto mb-6 w-fit">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-accent-400/15 to-nebula-400/15 blur-xl" />
            <img
              src="/logo.png"
              alt="AstraQ logo"
              className="relative h-18 w-18 rounded-2xl object-cover shadow-lg shadow-accent-500/10"
            />
          </div>

          <h1 className="mb-3 bg-gradient-to-r from-white via-slate-100 to-accent-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
            {displayName ? (
              <>Welcome back, <span className="bg-gradient-to-r from-accent-400 to-nebula-400 bg-clip-text">{displayName}</span></>
            ) : (
              "Welcome to AstraQ"
            )}
          </h1>
          <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
            Your intelligent space mission assistant. Ask anything about
            satellites, missions, or ISRO data.
          </p>

          {/* Starter prompt cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            {starterPrompts.map((prompt, idx) => (
              <motion.button
                key={prompt.text}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + idx * 0.07 }}
                whileHover={{ y: -4, boxShadow: "0px 12px 30px rgba(0,0,0,0.4)" }}
                onClick={() => onStarterClick(prompt.text)}
                className={`group glass-strong cursor-pointer rounded-2xl border ${prompt.borderColor} p-5 text-left transition-all hover:border-opacity-50`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className={`flex size-9 items-center justify-center rounded-xl ${prompt.tagBg} ${prompt.color}`}>
                    <prompt.icon size={18} />
                  </div>
                  <span className={`text-[10px] font-bold font-mono uppercase tracking-widest ${prompt.color}`}>
                    {prompt.tag}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
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
