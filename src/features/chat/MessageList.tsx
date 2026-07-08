import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { TypingDots } from "@/components/ui/Spinner";
import { MessageBubble } from "@/features/chat/MessageBubble";
import type { UIMessage } from "@/lib/types";

const starterPrompts = [
  "Which products does INSAT-3D provide?",
  "Explain how SST is retrieved",
  "Which satellites observe rainfall?",
  "What is AMV?",
];

interface MessageListProps {
  messages: UIMessage[];
  loading: boolean;
  onStarterClick: (prompt: string) => void;
}

export function MessageList({ messages, loading, onStarterClick }: MessageListProps) {
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
          transition={{ duration: 0.4 }}
          className="mx-auto mt-16 max-w-lg text-center"
        >
          <div className="glass mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl">
            <Sparkles size={28} className="text-accent-400" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-white">Welcome to Astra-Q</h1>
          <p className="mb-8 text-slate-400">
            Your intelligent space mission assistant. Ask me anything about
            satellites, missions, or ISRO data!
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => onStarterClick(prompt)}
                className="glass cursor-pointer rounded-xl px-4 py-3 text-left text-sm text-slate-300 transition-colors hover:border-accent-400/40 hover:text-white"
              >
                {prompt}
              </button>
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
              <div className="glass rounded-2xl rounded-bl-md px-4 py-3.5">
                <TypingDots />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
