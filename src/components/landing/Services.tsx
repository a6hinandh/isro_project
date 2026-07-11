import { motion } from "framer-motion";
import { MessageSquareCode, Shuffle, Search, Cpu, CheckCircle } from "lucide-react";

const flowSteps = [
  {
    num: "01",
    icon: MessageSquareCode,
    title: "User Query Input",
    desc: "A researcher enters a query like \"Show SST retrieved from INSAT-3D Imager channels\" via text, voice, or custom document uploads.",
    color: "#ff6b6b",
  },
  {
    num: "02",
    icon: Shuffle,
    title: "Intent Router",
    desc: "Our FastAPI backend runs intent classification. It decides whether the query requires RAG documentation, structured Knowledge Graph facts, or hybrid routing.",
    color: "#4dabf7",
  },
  {
    num: "03",
    icon: Search,
    title: "Parallel Search",
    desc: "Retrieves matches from FAISS vector databases (unstructured ATBDs/docs) and queries Neo4j (structured satellite-product connections) in parallel.",
    color: "#51cf66",
  },
  {
    num: "04",
    icon: Cpu,
    title: "Gemini Synthesis",
    desc: "Google Gemini receives the query along with the exact retrieved context, synthesizing a scientifically grounded answer.",
    color: "#e599f7",
  },
  {
    num: "05",
    icon: CheckCircle,
    title: "Grounded Answer",
    desc: "Outputs the response to the user with interactive metadata, exact citations, and document source previews to ensure absolute factuality.",
    color: "#ffd43b",
  },
];

export function Services() {
  return (
    <section id="query-lifecycle" className="relative py-12 scroll-mt-28">
      <div className="mb-10 text-center">
        <h2 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
          The Query Lifecycle
        </h2>
        <p className="mt-2 text-slate-400">
          How AstraQ processes natural language requests into mathematically and scientifically verified answers.
        </p>
      </div>

      <div className="relative flex flex-col gap-8 lg:flex-row lg:justify-between">
        
        {/* Horizontal connector line on desktop */}
        <div className="absolute left-6 right-6 top-1/2 -z-10 hidden h-[2px] -translate-y-1/2 bg-gradient-to-r from-red-500/20 via-blue-500/20 to-yellow-500/20 lg:block" />

        {flowSteps.map((step, idx) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="relative flex flex-1 flex-col justify-between rounded-3xl border border-white/5 bg-space-900/40 p-6 shadow-lg backdrop-blur-sm"
          >
            <div>
              {/* Header: step number & icon */}
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-bold font-mono tracking-widest"
                  style={{ color: step.color }}
                >
                  STEP {step.num}
                </span>
                <div
                  className="glass flex size-10 items-center justify-center rounded-xl"
                  style={{ color: step.color, border: `1px solid ${step.color}20`, backgroundColor: `${step.color}05` }}
                >
                  <step.icon size={20} />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="mt-6 text-base font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {step.desc}
              </p>
            </div>
            
            {/* Step visual anchor dot */}
            <div
              className="mt-6 hidden size-3 self-center rounded-full border border-white/20 lg:block"
              style={{ backgroundColor: step.color }}
            />
          </motion.div>
        ))}

      </div>
    </section>
  );
}
