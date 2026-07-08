import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

const faqData = [
  {
    question: "What is Astra-Q?",
    answer:
      "Astra-Q is an AI assistant for ISRO's MOSDAC satellite data portal. It answers natural-language questions about Indian satellites, data products, and retrieval algorithms by combining semantic document search (RAG) with a Neo4j knowledge graph.",
  },
  {
    question: "What kind of questions can I ask?",
    answer:
      "Anything about MOSDAC data: \"Which products does INSAT-3D provide?\", \"Explain how SST is retrieved\", \"Which satellites observe rainfall?\", or definitions like \"What is AMV?\". You can also attach PDF/DOCX/TXT files for extra context.",
  },
  {
    question: "Where do the answers come from?",
    answer:
      "Answers are grounded in scraped MOSDAC documentation (ATBDs, product pages) retrieved via FAISS vector search, plus structured facts from a knowledge graph of satellites, products, parameters, and regions. Each answer shows its sources.",
  },
  {
    question: "Is my chat history private?",
    answer:
      "Yes. Conversations are stored per-account in Firebase and are only visible to you — unless you explicitly create a public share link for a thread, which you can revoke at any time.",
  },
  {
    question: "Why is the first response sometimes slow?",
    answer:
      "Astra-Q runs on free-tier infrastructure that sleeps when idle. The first request after a quiet period wakes the server, which can take up to a minute. Subsequent responses are fast.",
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <GlassPanel className="p-6 sm:p-10">
      <div className="mb-10 text-center">
        <h2 className="mb-3 text-3xl font-bold text-nebula-400">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-300">
          Everything you need to know about Astra-Q and MOSDAC data
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {faqData.map((item, index) => {
          const open = activeIndex === index;
          return (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="glass overflow-hidden rounded-xl"
            >
              <button
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left font-semibold text-white transition-colors hover:bg-nebula-400/10"
                onClick={() => setActiveIndex(open ? null : index)}
                aria-expanded={open}
              >
                <span>{item.question}</span>
                <span
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                    open ? "bg-nebula-400 text-space-950" : "bg-white/15 text-white"
                  }`}
                >
                  {open ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="border-t border-white/10 p-4 text-sm leading-relaxed text-slate-300">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </GlassPanel>
  );
}
