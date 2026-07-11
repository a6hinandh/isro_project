import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BrainCircuit, Database, Workflow, Rocket, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

const sections = [
  {
    id: "architecture",
    icon: Workflow,
    label: "SYSTEM DESIGN",
    title: "Architecture",
    desc: "AstraQ is an AI assistant tailored for exploring ISRO’s MOSDAC data. It combines a FastAPI backend, FAISS vector search, Neo4j knowledge graph, and Google Gemini into a unified conversational interface.",
    image: "/Architecture.png",
    imageAlt: "Astra-Q architecture diagram",
    color: "text-accent-400",
    border: "border-accent-400/20",
    bg: "bg-accent-400/5",
    tags: ["FastAPI", "React", "Firebase", "Neo4j"],
    tagColor: "text-accent-400",
    tagBorder: "border-accent-400/20",
    tagBg: "bg-accent-400/5",
  },
  {
    id: "features",
    icon: BrainCircuit,
    label: "CAPABILITIES",
    title: "Features",
    desc: "Semantic search with document-based retrieval, knowledge graph contextual reasoning, and support for PDFs, APIs, and dynamic content — all grounded in real MOSDAC documentation.",
    image: "/feature.png",
    imageAlt: "Astra-Q features overview",
    color: "text-nebula-400",
    border: "border-nebula-400/20",
    bg: "bg-nebula-400/5",
    tags: ["RAG Pipeline", "Knowledge Graph", "Multi-modal Input"],
    tagColor: "text-nebula-400",
    tagBorder: "border-nebula-400/20",
    tagBg: "bg-nebula-400/5",
    bullets: [
      "Semantic search with document-based retrieval",
      "Knowledge graph-based contextual reasoning",
      "Handles PDFs, APIs, and dynamic content",
    ],
  },
  {
    id: "process",
    icon: Database,
    label: "DATA FLOW",
    title: "Process Flow",
    desc: "From user query to grounded response: intent classification routes to FAISS vector search and Neo4j graph queries in parallel, then Gemini synthesizes a cited answer.",
    image: "/process_flow.jpeg",
    imageAlt: "Query process flow",
    color: "text-green-400",
    border: "border-green-400/20",
    bg: "bg-green-400/5",
    tags: ["Intent Router", "FAISS", "Gemini Synthesis"],
    tagColor: "text-green-400",
    tagBorder: "border-green-400/20",
    tagBg: "bg-green-400/5",
  },
];

export default function LearnMore() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pt-2 pb-12 text-center md:text-left"
        >
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-accent-300"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <h1 className="bg-gradient-to-r from-white via-slate-100 to-accent-300 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl">
            Inside AstraQ
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Explore the architecture, features, and data pipeline that power
            AI-driven access to ISRO&apos;s MOSDAC satellite datasets.
          </p>
        </motion.section>

        {/* Content Sections */}
        <div className="space-y-10 pb-12">
          {sections.map((section, idx) => (
            <motion.section
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-strong rounded-3xl border border-white/5 p-6 shadow-lg md:p-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                {/* Text content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`glass flex size-10 items-center justify-center rounded-xl ${section.color}`} style={{ border: `1px solid ${section.border.replace('border-', '').replace('/20', '')}` }}>
                      <section.icon size={20} />
                    </div>
                    <span className={`text-xs font-bold font-mono tracking-widest ${section.color}`}>
                      {section.label}
                    </span>
                  </div>

                  <h2 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300 max-w-xl">
                    {section.desc}
                  </p>

                  {section.bullets && (
                    <ul className="mt-4 space-y-2">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-slate-400">
                          <ChevronRight size={14} className={`mt-0.5 shrink-0 ${section.color}`} />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-wider">
                    {section.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-md border px-2 py-1 ${section.tagColor} ${section.tagBorder} ${section.tagBg}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className="relative w-full lg:w-[55%] shrink-0">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-accent-500/10 to-nebula-500/10 opacity-30 blur-sm" />
                    <img
                      src={section.image}
                      alt={section.imageAlt}
                      className="relative w-full rounded-2xl bg-black object-cover transition-transform duration-500 hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-strong rounded-3xl border border-white/5 p-8 text-center shadow-lg mb-10"
        >
          <h2 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
            Ready to Explore?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
            Start querying satellite data, exploring knowledge graphs, and
            getting grounded AI answers in seconds.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="relative overflow-hidden group font-semibold"
              onClick={() => window.location.href = user ? "/chat" : "/signup"}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Rocket size={18} />
                Try AstraQ
                <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Button>
            <Button variant="secondary" size="lg" onClick={() => window.location.href = "/"}>
              <ArrowLeft size={18} /> Back to Home
            </Button>
          </div>
        </motion.div>

      </main>
      <Footer />
    </div>
  );
}
