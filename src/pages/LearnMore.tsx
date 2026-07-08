import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassPanel } from "@/components/ui/GlassPanel";

export default function LearnMore() {
  return (
    <AppShell>
      <GlassPanel className="mx-auto max-w-4xl p-6 sm:p-10">
        <h1 className="mb-4 text-3xl font-bold text-accent-400">Explore Astra-Q</h1>

        <p className="mb-8 text-lg text-slate-300">
          Astra-Q is an AI assistant tailored for exploring ISRO&apos;s MOSDAC data.
          It offers conversational access to satellite-derived products and remote
          sensing datasets.
        </p>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-accent-300">⚙️ Architecture</h2>
          <img
            src="/architecture.png"
            alt="Astra-Q architecture diagram"
            className="w-full rounded-xl border border-white/10"
            loading="lazy"
          />
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-accent-300">🌟 Features</h2>
          <ul className="mb-4 list-disc space-y-1 pl-6 text-slate-300">
            <li>Semantic search with document-based retrieval</li>
            <li>Knowledge graph-based contextual reasoning</li>
            <li>Handles PDFs, APIs, and dynamic content</li>
          </ul>
          <img
            src="/feature.png"
            alt="Astra-Q features overview"
            className="w-full rounded-xl border border-white/10"
            loading="lazy"
          />
        </section>

        <section className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-accent-300">🔁 Process Flow</h2>
          <p className="mb-3 text-slate-300">
            This is how a query flows from user to response generation:
          </p>
          <img
            src="/process_flow.png"
            alt="Query process flow"
            className="w-full rounded-xl border border-white/10"
            loading="lazy"
          />
        </section>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-accent-300 transition-colors hover:text-accent-400"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </GlassPanel>
    </AppShell>
  );
}
