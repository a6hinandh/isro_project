import { lazy, Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Spinner } from "@/components/ui/Spinner";

// Heavy canvas/d3 dependency — keep it in its own lazy chunk.
const GraphExplorer = lazy(() => import("@/features/kg/GraphExplorer"));

export default function ExplorerPage() {
  return (
    <AppShell>
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-bold text-white">Knowledge Graph Explorer</h1>
        <p className="text-sm text-slate-400">
          The MOSDAC satellite knowledge graph — satellites, products, parameters,
          regions, payloads, and algorithms, connected.
        </p>
      </div>
      <Suspense
        fallback={
          <GlassPanel className="flex items-center justify-center gap-3 p-16">
            <Spinner /> <span className="text-slate-400">Loading explorer…</span>
          </GlassPanel>
        }
      >
        <GraphExplorer />
      </Suspense>
    </AppShell>
  );
}
