import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Satellite as SatelliteIcon,
  Search,
  Database,
  Compass,
  Radio,
  LayoutGrid,
  Server,
  AlertTriangle,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { useLanguage } from "@/context/LanguageContext";
import { apiGet } from "@/lib/api";
import type { Satellite } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function SatellitesPage() {
  const { locale } = useLanguage();
  const [satellites, setSatellites] = useState<Satellite[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "insat" | "oceansat" | "others">("all");

  useEffect(() => {
    apiGet<Satellite[]>("/kg/satellites")
      .then(setSatellites)
      .catch((e: Error) => setError(e.message));
  }, []);

  const stats = useMemo(() => {
    if (!satellites) return { satellites: 0, products: 0 };
    const totalSats = satellites.length;
    const totalProducts = satellites.reduce((acc, s) => acc + s.products.length, 0);
    return { satellites: totalSats, products: totalProducts };
  }, [satellites]);

  const filtered = useMemo(() => {
    if (!satellites) return [];
    let list = satellites;

    // 1. Filter by search text
    const q = filter.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.products.some((p) => p?.toLowerCase().includes(q)),
      );
    }

    // 2. Filter by Series Tab
    if (activeTab === "insat") {
      list = list.filter((s) => s.name.toLowerCase().includes("insat") || s.name.toLowerCase().includes("kalpana"));
    } else if (activeTab === "oceansat") {
      list = list.filter((s) => s.name.toLowerCase().includes("ocean"));
    } else if (activeTab === "others") {
      list = list.filter(
        (s) =>
          !s.name.toLowerCase().includes("insat") &&
          !s.name.toLowerCase().includes("kalpana") &&
          !s.name.toLowerCase().includes("ocean"),
      );
    }
    return list;
  }, [satellites, filter, activeTab]);

  return (
    <AppShell>
      {locale === "hi" && (
        <div className="mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 p-3 text-center text-xs flex items-center justify-center gap-2">
          <AlertTriangle size={14} className="shrink-0" />
          <span>यह पृष्ठ हिन्दी में उपलब्ध नहीं है। (This page is not available in Hindi)</span>
        </div>
      )}
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-white">Satellite Database</h1>
          <p className="text-sm text-slate-400">
            Indian Earth-observation satellites and their MOSDAC data products catalog.
          </p>
        </div>
      </div>

      {/* Stats Dashboard */}
      {satellites && !error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 grid gap-4 grid-cols-2 md:grid-cols-4"
        >
          <GlassPanel className="p-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-400">
              <SatelliteIcon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Missions</p>
              <h3 className="text-xl font-extrabold text-white">{stats.satellites}</h3>
            </div>
          </GlassPanel>
          <GlassPanel className="p-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <Database size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Datasets</p>
              <h3 className="text-xl font-extrabold text-white">{stats.products}</h3>
            </div>
          </GlassPanel>
          <GlassPanel className="p-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Radio size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Status</p>
              <h3 className="text-xl font-extrabold text-emerald-400">Nominal</h3>
            </div>
          </GlassPanel>
          <GlassPanel className="p-4 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
              <Compass size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Agency</p>
              <h3 className="text-xl font-extrabold text-amber-400">ISRO</h3>
            </div>
          </GlassPanel>
        </motion.div>
      )}

      {/* Category Tabs & Search */}
      {satellites && !error && (
        <div className="mb-6 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
          <div className="flex w-full sm:w-auto overflow-x-auto gap-1.5 pb-1 sm:pb-0 sm:flex-wrap">
            {[
              { id: "all", label: "All", labelFull: "All Missions", icon: LayoutGrid },
              { id: "insat", label: "INSAT", labelFull: "INSAT Series", icon: SatelliteIcon },
              { id: "oceansat", label: "Oceansat", labelFull: "Oceansat Series", icon: Compass },
              { id: "others", label: "Others", labelFull: "Other Science", icon: Server },
            ].map((tabInfo) => (
              <button
                key={tabInfo.id}
                onClick={() => setActiveTab(tabInfo.id as "all" | "insat" | "oceansat" | "others")}
                className={cn(
                  "flex shrink-0 cursor-pointer items-center gap-2 rounded-xl px-3 sm:px-4 py-2 text-xs font-semibold border transition-all",
                  activeTab === tabInfo.id
                    ? "bg-accent-500 text-white border-accent-500 shadow-md shadow-accent-500/25"
                    : "border-white/5 text-slate-400 hover:bg-white/5 hover:text-white",
                )}
              >
                <tabInfo.icon size={13} />
                <span className="sm:hidden">{tabInfo.label}</span>
                <span className="hidden sm:inline">{tabInfo.labelFull}</span>
              </button>
            ))}
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
      )}

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
            : "No satellites in this series cataloged yet."}
        </GlassPanel>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((sat, i) => {
            const hasMany = sat.products.length > 3;
            const displayedProducts = sat.products.filter(Boolean).slice(0, 3);

            return (
              <motion.div
                key={sat.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.4) }}
                whileHover={{ y: -4 }}
              >
                <Link to={`/satellites/${encodeURIComponent(sat.name)}`}>
                  <GlassPanel className="group relative h-full p-5 overflow-hidden transition-all duration-300 border-white/5 hover:border-accent-500/30 hover:shadow-xl hover:shadow-accent-500/5">
                    {/* Corner decorative bracket */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/5 group-hover:border-accent-500/20 transition-colors pointer-events-none" />

                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Glowing backdrop circular icon container */}
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 border border-white/5 group-hover:border-accent-500/20 transition-all">
                          <SatelliteIcon size={20} className="text-kg-satellite transition-transform group-hover:scale-110" />
                        </div>
                        <h2 className="text-lg font-black text-white transition-colors group-hover:text-accent-300 truncate">
                          {sat.name}
                        </h2>
                      </div>

                      {/* Operational Status Dot */}
                      <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        ACTIVE
                      </span>
                    </div>

                    <div className="space-y-4">
                      {/* Metrics bar */}
                      <div className="flex justify-between items-center text-xs border-y border-white/5 py-2.5">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Datasets</span>
                          <span className="font-semibold text-white">{sat.products.length} Available</span>
                        </div>
                        <div className="flex flex-col gap-0.5 items-end">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Mission Class</span>
                          <span className="font-semibold text-accent-300">
                            {sat.name.toLowerCase().includes("insat")
                              ? "Meteorological"
                              : sat.name.toLowerCase().includes("ocean")
                                ? "Oceanographic"
                                : "Scientific"}
                          </span>
                        </div>
                      </div>

                      {/* Preview data products */}
                      {displayedProducts.length > 0 && (
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Primary Sensors & Datasets</p>
                          <div className="flex flex-wrap gap-1.5">
                            {displayedProducts.map((p, idx) => (
                              <span key={idx} className="rounded-md bg-white/5 border border-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300 group-hover:bg-white/10 transition-colors">
                                {p.replace(/_/g, " ").replace(/\.json$/, "").split(" ").slice(0, 3).join(" ")}
                              </span>
                            ))}
                            {hasMany && (
                              <span className="rounded-md bg-accent-500/10 border border-accent-500/20 px-2 py-0.5 text-[10px] font-bold text-accent-300">
                                +{sat.products.length - displayedProducts.length} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </GlassPanel>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
