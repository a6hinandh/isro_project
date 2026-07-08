import { motion } from "framer-motion";
import { Rocket, BrainCircuit, Layers } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

const features = [
  {
    icon: Rocket,
    title: "Natural Language Access to Satellite Data",
    body: "Ask complex scientific questions in plain English — get accurate answers from ISRO's satellite datasets and documents.",
  },
  {
    icon: BrainCircuit,
    title: "Semantic Search with Knowledge Graph Reasoning",
    body: "Goes beyond keyword matching by understanding the meaning behind queries and retrieving contextually relevant information.",
  },
  {
    icon: Layers,
    title: "Unified Access to Structured & Unstructured Data",
    body: "Retrieves information from PDFs, APIs, graphs, and metadata — all through a single conversational interface.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export function Features() {
  return (
    <GlassPanel className="p-6 sm:p-10">
      <h2 className="mb-8 border-b border-white/10 pb-3 text-2xl font-bold text-white">
        Features
      </h2>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-8 lg:grid-cols-3"
      >
        {features.map((f) => (
          <motion.div key={f.title} variants={item} className="flex items-start gap-4">
            <div className="glass flex size-12 shrink-0 items-center justify-center rounded-full">
              <f.icon size={24} className="text-accent-400" />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-accent-400">{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{f.body}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </GlassPanel>
  );
}
