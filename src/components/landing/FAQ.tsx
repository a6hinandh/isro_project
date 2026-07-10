import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const faqData = [
  {
    question: "What is AstraQ?",
    answer:
      "AstraQ is a conversational assistant for ISRO's MOSDAC satellite data. It answers natural-language questions about satellites, data products, parameters, and retrieval algorithms by combining semantic document search (RAG) with a Neo4j knowledge graph.",
  },
  {
    question: "What kind of questions can I ask?",
    answer:
      "You can ask about MOSDAC data products, instruments, and parameters: \"Which products does INSAT-3D provide?\", \"Explain how SST is retrieved\", or definitions like \"What is AMV?\". You can also upload text/PDF/DOCX documents to ground your query on custom context.",
  },
  {
    question: "Where do the answers come from?",
    answer:
      "Answers are synthesized by Google Gemini, grounded in context retrieved from scraped MOSDAC documentation (product specifications and user guides) via FAISS vector search, and structured facts from a Neo4j knowledge graph. Source citations are always provided.",
  },
  {
    question: "Is my chat history private?",
    answer:
      "Yes. Your chat threads are authenticated via Firebase Auth and stored securely in Firestore. Only you can view them. You can, however, generate public read-only links to share specific threads, and revoke access at any time.",
  },
  {
    question: "Why is the first response sometimes slow?",
    answer:
      "AstraQ runs on a server host that sleeps during periods of inactivity. The first query after a quiet period wakes the server, which can take up to a minute. Subsequent responses are processed instantly.",
  },
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFAQ = faqData[activeIndex] || faqData[0];

  return (
    <section id="faq" className="relative py-16 scroll-mt-28">
      <div className="mb-12 text-center md:text-left">
        <h2 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-slate-400">
          Everything you need to know about AstraQ and MOSDAC data access.
        </p>
      </div>

      {/* Two-Column Split Layout for Desktop, Stack for Mobile */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        
        {/* Left Pane: Question Tabs List */}
        <div className="flex flex-col gap-2.5 w-full md:w-[45%] shrink-0">
          {faqData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <button
                key={item.question}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "group relative w-full cursor-pointer rounded-2xl p-4 text-left transition-all duration-300 border",
                  isActive
                    ? "glass-strong border-accent-500/30 text-white shadow-lg"
                    : "border-transparent bg-white/0 hover:bg-white/5 text-slate-400 hover:text-slate-200"
                )}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="activeFaqLine"
                    className="absolute left-0 top-3 bottom-3 w-1.5 rounded-r-md bg-accent-500"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                
                <div className="flex items-center justify-between gap-3 pl-3">
                  <span className="text-sm font-semibold">{item.question}</span>
                  <ChevronRight
                    size={16}
                    className={cn(
                      "transition-transform duration-300",
                      isActive ? "text-accent-400 translate-x-0.5" : "opacity-0 group-hover:opacity-100 text-slate-500"
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Pane: Selected Answer Details Card */}
        <div className="flex-1 w-full md:min-h-[280px]">
          <div className="glass-strong h-full rounded-3xl border border-white/5 p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Watermark Icon */}
            <div className="absolute -right-8 -bottom-8 -z-10 opacity-[0.03] text-white">
              <HelpCircle size={180} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-400">
                    <HelpCircle size={14} />
                    <span>Answer Grounding</span>
                  </div>
                  
                  <h3 className="mt-4 text-xl font-bold text-white border-b border-white/5 pb-3">
                    {activeFAQ?.question}
                  </h3>
                  
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {activeFAQ?.answer}
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-medium text-slate-500 font-mono">
                  <span>ASTRAQ SYSTEM RESPONSE</span>
                  <span>100% GROUNDED</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
