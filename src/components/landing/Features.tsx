import { motion } from "framer-motion";
import { BrainCircuit, Database, Lock, Mic } from "lucide-react";

export function Features() {
  return (
    <section id="features" className="relative py-12 scroll-mt-28">
      <div className="mb-10 text-center md:text-left">
        <h2 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
          Core Capabilities
        </h2>
        <p className="mt-2 max-w-2xl text-slate-400">
          AstraQ is built on a precise pipeline combining vector databases, graph databases, and secure user management.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Card 1: RAG Document Search (Col-span 2) */}
        <motion.div
          whileHover={{ y: -6, boxShadow: "0px 12px 30px rgba(0,0,0,0.4)" }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="glass-strong rounded-3xl p-6 md:col-span-2 border border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="glass inline-flex size-12 items-center justify-center rounded-2xl mb-5 text-accent-400">
              <BrainCircuit size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Semantic Document Retrieval (RAG)
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Answers are directly grounded in scraped MOSDAC documentation, scientific reports, 
              and ATBDs. Using sentence-transformers, AstraQ matches the semantic meaning of your questions 
              against our localized FAISS vector database to retrieve the most contextually relevant documentation.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-wider text-accent-400">
            <span className="rounded-md border border-accent-400/20 bg-accent-400/5 px-2 py-1">FAISS Index</span>
            <span className="rounded-md border border-accent-400/20 bg-accent-400/5 px-2 py-1">Sentence-Transformers</span>
            <span className="rounded-md border border-accent-400/20 bg-accent-400/5 px-2 py-1">Grounded Citations</span>
          </div>
        </motion.div>

        {/* Card 2: Neo4j Graph Database (Col-span 1) */}
        <motion.div
          whileHover={{ y: -6, boxShadow: "0px 12px 30px rgba(0,0,0,0.4)" }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="glass-strong rounded-3xl p-6 border border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="glass inline-flex size-12 items-center justify-center rounded-2xl mb-5 text-nebula-400">
              <Database size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Structured Knowledge Graph
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Maintains facts about satellites, payloads, and parameter relationships 
              in Neo4j. Quickly answers query types like &quot;Which satellites observe sea surface temperature?&quot;
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-wider text-nebula-400">
            <span className="rounded-md border border-nebula-400/20 bg-nebula-400/5 px-2 py-1">Neo4j</span>
            <span className="rounded-md border border-nebula-400/20 bg-nebula-400/5 px-2 py-1">Metadata Relationships</span>
          </div>
        </motion.div>

        {/* Card 3: Firebase Auth & Firestore Sessions (Col-span 1) */}
        <motion.div
          whileHover={{ y: -6, boxShadow: "0px 12px 30px rgba(0,0,0,0.4)" }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="glass-strong rounded-3xl p-6 border border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="glass inline-flex size-12 items-center justify-center rounded-2xl mb-5 text-green-400">
              <Lock size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Secure Session Persistence
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Users sign up and log in securely via Firebase Authentication. 
              All chat threads, message history, feedback, and user configurations are encrypted 
              and persisted per-user in Google Cloud Firestore.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-wider text-green-400">
            <span className="rounded-md border border-green-400/20 bg-green-400/5 px-2 py-1">Firebase Auth</span>
            <span className="rounded-md border border-green-400/20 bg-green-400/5 px-2 py-1">Firestore Database</span>
          </div>
        </motion.div>

        {/* Card 4: Multi-modal Inputs & Voice (Col-span 2) */}
        <motion.div
          whileHover={{ y: -6, boxShadow: "0px 12px 30px rgba(0,0,0,0.4)" }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="glass-strong rounded-3xl p-6 md:col-span-2 border border-white/5 flex flex-col justify-between"
        >
          <div>
            <div className="glass inline-flex size-12 items-center justify-center rounded-2xl mb-5 text-star">
              <Mic size={24} className="text-star" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Flexible Input Modalities
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Interact on your own terms. Dictate queries hands-free using the built-in Web Speech API 
              voice input. You can also upload PDF, DOCX, or TXT documents to extract extra context and ground 
              your conversation on custom local reference material.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-wider text-star">
            <span className="rounded-md border border-star/20 bg-star/5 px-2 py-1">Speech Recognition</span>
            <span className="rounded-md border border-star/20 bg-star/5 px-2 py-1">Context Uploads</span>
            <span className="rounded-md border border-star/20 bg-star/5 px-2 py-1">Document Parsing</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
