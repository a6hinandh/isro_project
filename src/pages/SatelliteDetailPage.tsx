import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Cpu,
  MessageCircle,
  Satellite as SatelliteIcon,
  FileText,
  ExternalLink,
  X,
  Eye,
  Globe,
  Activity,
  Code2,
  Database,
  AlertTriangle,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { useLanguage } from "@/context/LanguageContext";
import { apiGet, ApiError } from "@/lib/api";
import type { SatelliteDetail, SatelliteProduct, DocPage } from "@/lib/types";
import { cn } from "@/lib/utils";

function InlineDocViewer({ filename, onClose }: { filename: string; onClose: () => void }) {
  const [doc, setDoc] = useState<DocPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiGet<DocPage>(`/kg/doc/${encodeURIComponent(filename)}`)
      .then(setDoc)
      .catch(() => setError("Could not load document content."))
      .finally(() => setLoading(false));
  }, [filename]);

  const headings = (doc?.headings ?? []).filter(
    (h) => !["User-Login-Menu", "Breadcrumb", "Follow Us"].includes(h),
  );
  const paragraphs = (doc?.paragraphs ?? []).filter(
    (p) => p !== "Skip to main Content" && !p.startsWith("Website owned and maintained"),
  );

  const displayTitle = doc?.title?.split("|")[0]?.trim() || filename.replace(/\.json$/, "").replace(/_/g, " ");

  return (
    <GlassPanel className="relative flex flex-col h-[450px] sm:h-[550px] lg:h-[650px] shadow-2xl border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 p-5 shrink-0">
        <div className="flex items-center gap-2 text-accent-400">
          <FileText size={18} />
          <span className="text-[10px] font-bold tracking-widest uppercase">Telemetry Dataset Viewer</span>
        </div>
        <button
          onClick={onClose}
          title="Show specifications"
          className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-all hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 h-full">
            <Spinner />
            <span className="text-slate-400 text-sm">Retrieving document contents…</span>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-20 h-full text-center">
            <p className="text-sm text-red-300 font-medium mb-1">Failed to Load Content</p>
            <p className="text-xs text-slate-500">{error}</p>
          </div>
        )}

        {doc && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-extrabold text-white leading-snug">{displayTitle}</h2>
                {doc.url && (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-accent-400 hover:text-accent-300 transition-colors"
                  >
                    <ExternalLink size={12} /> View original website
                  </a>
                )}
              </div>
              <button
                onClick={() =>
                  navigate("/chat", {
                    state: { prefill: `Tell me about the document: ${filename}` },
                  })
                }
                className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-accent-500/10 px-3 py-1.5 text-xs font-semibold text-accent-300 border border-accent-500/20 transition-all hover:bg-accent-500 hover:text-white hover:border-accent-500"
              >
                <MessageCircle size={13} /> Ask AstraQ
              </button>
            </div>

            {headings.length > 0 && (
              <div className="flex flex-wrap gap-1.5 border-y border-white/5 py-3">
                {headings.map((h, i) => (
                  <Badge key={i} tone="accent">{h}</Badge>
                ))}
              </div>
            )}

            {paragraphs.length > 0 && (
              <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-normal">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {(doc.pdf_links ?? []).length > 0 && (
              <div className="border-t border-white/5 pt-4">
                <h4 className="mb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  Related PDFs
                </h4>
                <div className="grid gap-1">
                  {doc.pdf_links!.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-accent-400 transition-colors hover:bg-white/10 hover:text-accent-300"
                    >
                      <FileText size={12} />
                      <span className="truncate">{link.split("/").pop()}</span>
                      <ExternalLink size={10} className="ml-auto text-slate-500" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {doc.metadata && Object.values(doc.metadata).some(Boolean) && (
              <div className="rounded-xl bg-white/5 border border-white/5 p-4 mt-6">
                <h4 className="mb-3 text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  Document Metadata
                </h4>
                <dl className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
                  {Object.entries(doc.metadata)
                    .filter(([, v]) => v != null && v !== "")
                    .map(([k, v]) => (
                      <div key={k} className="border-l-2 border-accent-500/25 pl-2.5">
                        <dt className="text-[9px] font-bold tracking-wider text-slate-500 uppercase">{k.replace(/_/g, " ")}</dt>
                        <dd className="text-xs text-slate-300 font-medium mt-0.5">{String(v)}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </GlassPanel>
  );
}

function ProductCard({
  product,
  onViewDoc,
  isSelected,
}: {
  product: SatelliteProduct;
  onViewDoc: (name: string) => void;
  isSelected?: boolean;
}) {
  const hiddenKeys = new Set(["name", "parameters", "regions", "algorithms", "id", "display_name"]);
  const extraEntries = Object.entries(product).filter(
    ([k, v]) => !hiddenKeys.has(k) && v != null && v !== "",
  );

  const title = (product as Record<string, unknown>).display_name
    ? String((product as Record<string, unknown>).display_name)
    : product.name.replace(/\.json$/, "").replace(/_/g, " ");

  return (
    <motion.div
      whileHover={{ y: -1 }}
      className={cn(
        "glass-strong group rounded-xl border p-4 transition-all duration-300",
        isSelected
          ? "border-accent-500 bg-accent-500/5 shadow-lg shadow-accent-500/10"
          : "border-white/5 hover:border-accent-500/25 hover:shadow-lg hover:shadow-accent-500/5",
      )}
    >
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
        <div className="flex gap-3 min-w-0">
          <div className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors",
            isSelected
              ? "bg-accent-500/20 text-accent-300"
              : "bg-accent-500/10 text-accent-400 group-hover:bg-accent-500/20 group-hover:text-accent-300",
          )}>
            <FileText size={18} />
          </div>
          <div className="min-w-0">
            <h3 className={cn(
              "text-sm font-bold leading-snug transition-colors truncate",
              isSelected ? "text-accent-300" : "text-white group-hover:text-accent-300",
            )} title={title}>
              {title}
            </h3>
            {/* Tags row */}
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.regions.map((region) => (
                <div key={`region-${region}`} className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-300 border border-amber-500/20">
                  <Globe size={10} />
                  {region}
                </div>
              ))}
              {product.parameters.map((param) => (
                <div key={`param-${param}`} className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-300 border border-emerald-500/20">
                  <Activity size={10} />
                  {param}
                </div>
              ))}
              {(product.algorithms ?? []).map((algo) => (
                <div key={`algo-${algo}`} className="inline-flex items-center gap-1 rounded-md bg-purple-500/10 px-2 py-0.5 text-[11px] font-medium text-purple-300 border border-purple-500/20">
                  <Code2 size={10} />
                  {algo}
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => onViewDoc(product.name)}
          className={cn(
            "flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all hover:scale-105",
            isSelected
              ? "bg-accent-500 text-white border-accent-500"
              : "bg-accent-500/10 text-accent-300 border-accent-500/20 hover:bg-accent-500 hover:text-white hover:border-accent-500",
          )}
        >
          <Eye size={13} /> {isSelected ? "Viewing" : "View"}
        </button>
      </div>

      {/* Extra properties */}
      {extraEntries.length > 0 && (
        <div className="mt-4 grid gap-x-6 gap-y-2 border-t border-white/5 pt-3 sm:grid-cols-2">
          {extraEntries.map(([key, value]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">{key.replace(/_/g, " ")}:</span>
              <span className="truncate text-slate-300 font-medium">
                {Array.isArray(value) ? value.join(", ") : String(value)}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function SatelliteDetailPage() {
  const { locale } = useLanguage();
  const { name = "" } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<SatelliteDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewingDoc, setViewingDoc] = useState<string | null>(null);

  useEffect(() => {
    setDetail(null);
    setError(null);
    apiGet<SatelliteDetail>(`/kg/satellites/${encodeURIComponent(name)}`)
      .then(setDetail)
      .catch((e: unknown) => {
        if (e instanceof ApiError && e.status === 404) {
          setError(`No satellite named "${name}" in the knowledge graph.`);
        } else {
          setError("Could not load satellite details. The knowledge graph may be paused.");
        }
      });
  }, [name]);

  const handleViewDoc = useCallback((productName: string) => {
    setViewingDoc(productName);
  }, []);

  const hiddenKeys = new Set(["name", "products", "payloads", "id"]);
  const satelliteMeta = detail
    ? Object.entries(detail).filter(
        ([k, v]) => !hiddenKeys.has(k) && v != null && v !== "",
      )
    : [];

  return (
    <AppShell>
      {locale === "hi" && (
        <div className="mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 p-3 text-center text-xs flex items-center justify-center gap-2">
          <AlertTriangle size={14} className="shrink-0" />
          <span>यह पृष्ठ हिन्दी में उपलब्ध नहीं है। (This page is not available in Hindi)</span>
        </div>
      )}
      <Link
        to="/satellites"
        className="group mb-5 inline-flex items-center gap-1.5 text-sm text-accent-300 transition-colors hover:text-accent-400"
      >
        <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-1" />
        All satellites
      </Link>

      {error ? (
        <GlassPanel className="p-8 text-center">
          <p className="text-slate-300">{error}</p>
        </GlassPanel>
      ) : detail === null ? (
        <GlassPanel className="flex items-center justify-center gap-3 p-16">
          <Spinner /> <span className="text-slate-400">Loading {name}…</span>
        </GlassPanel>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Header */}
          <GlassPanel className="relative overflow-hidden p-6 shadow-xl border-white/10">
            {/* Tech grid/background glow */}
            <div className="absolute -top-12 -left-12 size-40 rounded-full bg-accent-500/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 size-40 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

            <div className="relative flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-4 sm:gap-5">
                {/* Radial Telemetry Animation enclosing SatelliteIcon */}
                <div className="relative flex size-14 sm:size-20 shrink-0 items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-accent-500/20 bg-accent-500/5"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-2 rounded-full border border-dashed border-indigo-400/40"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-4 rounded-full border border-dashed border-accent-400/30"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="glass flex size-12 items-center justify-center rounded-full shadow-inner shadow-accent-500/10">
                    <SatelliteIcon size={24} className="text-kg-satellite drop-shadow-[0_0_8px_rgba(255,107,107,0.5)]" />
                  </div>
                </div>

                <div>
                  <h1 className="bg-gradient-to-r from-accent-300 via-indigo-200 to-white bg-clip-text text-2xl sm:text-3xl font-black tracking-tight text-transparent">
                    {detail.name}
                  </h1>
                  <p className="mt-1 text-sm text-slate-400 font-medium">
                    Telemetry status: <span className="text-emerald-400 font-semibold">Online</span> · {detail.products.length} data product{detail.products.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  navigate("/chat", {
                    state: { prefill: `Tell me about ${detail.name} and its data products` },
                  })
                }
                className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-accent-500/25 transition-all hover:from-accent-400 hover:to-indigo-500 hover:shadow-accent-500/40"
              >
                <MessageCircle size={16} /> Ask Astra-Q about this
              </motion.button>
            </div>
          </GlassPanel>

          {/* 2-Column Side-by-Side Split Dashboard Layout */}
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Products catalog (Left column - 5 cols) */}
            <div className="lg:col-span-5">
              <GlassPanel className="p-4 sm:p-6 h-[400px] sm:h-[550px] lg:h-[650px] flex flex-col">
                <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3 shrink-0">
                  <h2 className="flex items-center gap-2 text-sm font-bold tracking-wider text-slate-400 uppercase">
                    <Database size={15} className="text-accent-400" /> Data Catalog
                  </h2>
                  <span className="rounded-md bg-white/5 px-2.5 py-0.5 text-xs font-semibold text-slate-400">
                    {detail.products.length} cataloged
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                  {detail.products.length === 0 ? (
                    <p className="py-8 text-center text-sm text-slate-500">
                      No products recorded for this satellite in the knowledge graph.
                    </p>
                  ) : (
                    detail.products.map((product) => (
                      <ProductCard
                        key={product.name}
                        product={product}
                        onViewDoc={handleViewDoc}
                        isSelected={viewingDoc === product.name}
                      />
                    ))
                  )}
                </div>
              </GlassPanel>
            </div>

            {/* Document Viewer / Specifications & Payloads (Right column - 7 cols) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {!viewingDoc ? (
                  <motion.div
                    key="specs-payloads"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Telemetry metadata */}
                    {satelliteMeta.length > 0 && (
                      <GlassPanel className="p-6">
                        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-slate-400 uppercase border-b border-white/5 pb-3">
                          <Cpu size={15} className="text-indigo-400" /> Spacecraft Specs
                        </h2>
                        <div className="space-y-3">
                          {satelliteMeta.map(([key, value]) => {
                            const formattedKey = key
                              .replace(/_/g, " ")
                              .replace(/\b\w/g, (char) => char.toUpperCase());
                            const displayVal = Array.isArray(value) ? value.join(", ") : String(value);

                            return (
                              <div key={key} className="flex flex-col gap-0.5 border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{formattedKey}</span>
                                <span className="text-sm font-semibold text-white truncate" title={displayVal}>{displayVal}</span>
                              </div>
                            );
                          })}
                        </div>
                      </GlassPanel>
                    )}

                    {/* Payloads */}
                    {detail.payloads.length > 0 && (
                      <GlassPanel className="p-6">
                        <h2 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-slate-400 uppercase border-b border-white/5 pb-3">
                          <Cpu size={15} className="text-kg-payload" /> Payloads ({detail.payloads.length})
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {detail.payloads.map((p, i) => {
                            const pName = String(p.name ?? p.display_name ?? `Payload ${i + 1}`);
                            return (
                              <div key={i} className="flex items-center gap-2.5 rounded-lg bg-white/5 border border-white/5 p-3 hover:border-purple-500/20 transition-all hover:bg-white/10">
                                <div className="flex size-7 items-center justify-center rounded-md bg-purple-500/10 text-purple-400">
                                  <Cpu size={14} />
                                </div>
                                <span className="text-xs font-bold text-slate-200 truncate" title={pName}>
                                  {pName}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </GlassPanel>
                    )}

                    {/* Info placeholder */}
                    <GlassPanel className="p-5 flex items-center gap-3 border-dashed border-white/10 text-slate-400">
                      <FileText size={18} className="text-accent-400 shrink-0" />
                      <p className="text-xs leading-relaxed">
                        Select any data product from the catalog on the left and click **View** to load its parsed document directly into this right-side telemetry panel.
                      </p>
                    </GlassPanel>
                  </motion.div>
                ) : (
                  <motion.div
                    key="doc-viewer"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <InlineDocViewer filename={viewingDoc} onClose={() => setViewingDoc(null)} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AppShell>
  );
}
