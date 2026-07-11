import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Satellite as SatelliteIcon, Search } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { Badge } from "@/components/ui/Badge";
import { apiGet } from "@/lib/api";
import type { Satellite } from "@/lib/types";

export default function SatellitesPage() {
  const [satellites, setSatellites] = useState<Satellite[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    apiGet<Satellite[]>("/kg/satellites")
      .then(setSatellites)
      .catch((e: Error) => setError(e.message));
  }, []);

  const filtered = useMemo(() => {
    if (!satellites) return [];
    const q = filter.trim().toLowerCase();
    if (!q) return satellites;
    return satellites.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.products.some((p) => p?.toLowerCase().includes(q)),
    );
  }, [satellites, filter]);

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white">Satellite Catalog</h1>
          <p className="text-sm text-slate-400">
            Indian Earth-observation satellites and their MOSDAC data products.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by name or product…"
            className="pl-9"
          />
        </div>
      </div>

      {error ? (
        <GlassPanel className="p-8 text-center">
          <p className="mb-2 font-semibold text-red-300">Could not load satellites</p>
          <p className="text-sm text-slate-400">
            {error}. The knowledge graph may be paused — try again in a minute.
          </p>
        </GlassPanel>
      ) : satellites === null ? (
        <GlassPanel className="flex items-center justify-center gap-3 p-16">
          <Spinner /> <span className="text-slate-400">Loading satellites…</span>
        </GlassPanel>
      ) : filtered.length === 0 ? (
        <GlassPanel className="p-8 text-center text-slate-400">
          {filter
            ? `No satellites match "${filter}".`
            : "The knowledge graph has no satellites yet. Populate it with the KG pipeline."}
        </GlassPanel>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((sat, i) => (
            <motion.div
              key={sat.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.4) }}
            >
              <Link to={`/satellites/${encodeURIComponent(sat.name)}`}>
                <GlassPanel className="group h-full p-5 transition-colors hover:border-accent-400/40">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="glass flex size-10 items-center justify-center rounded-xl">
                      <SatelliteIcon size={20} className="text-kg-satellite" />
                    </div>
                    <h2 className="text-lg font-bold text-white transition-colors group-hover:text-accent-300">
                      {sat.name}
                    </h2>
                  </div>
                  <Badge tone="accent" className="mb-3">
                    {sat.products.length} data product{sat.products.length !== 1 ? "s" : ""}
                  </Badge>
                </GlassPanel>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </AppShell>
  );
}
