import { motion } from "framer-motion";
import { MessagesSquare, Search, Network } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";

const services = [
  {
    icon: MessagesSquare,
    title: "Conversational Access to ISRO's Satellite Knowledge",
    body: "A natural language interface for researchers, students, and professionals to interact with complex satellite data and scientific content through simple, intuitive conversations.",
  },
  {
    icon: Search,
    title: "On-Demand Scientific Information Retrieval",
    body: "Instantly retrieve targeted insights from a wide range of ISRO documents, datasets, FAQs, and satellite product archives — all without manual searching.",
  },
  {
    icon: Network,
    title: "Knowledge Graph Exploration of Satellite Products",
    body: "Browse satellites, products, parameters, and coverage regions as an interactive graph — and jump from any node straight into a conversation.",
  },
];

export function Services() {
  return (
    <GlassPanel className="p-6 sm:p-10">
      <div className="grid gap-10 text-center lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.12 }}
          >
            <div className="glass mx-auto mb-5 flex size-28 items-center justify-center rounded-full">
              <s.icon size={48} className="text-nebula-400" />
            </div>
            <h2 className="mb-3 text-xl font-semibold text-nebula-400">{s.title}</h2>
            <p className="text-sm leading-relaxed text-slate-300">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </GlassPanel>
  );
}
