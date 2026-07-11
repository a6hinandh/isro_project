import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Cpu, MessageCircle, Satellite as SatelliteIcon, FileText, ExternalLink, X, Eye } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { apiGet, ApiError } from "@/lib/api";
import type { SatelliteDetail, SatelliteProduct, DocPage } from "@/lib/types";

function DocViewer({ filename, onClose }: { filename: string; onClose: () => void }) {
  const [doc, setDoc] = useState<DocPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="glass-strong relative w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-2xl border border-white/10 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        {loading && (
          <div className="flex items-center justify-center gap-3 py-16">
            <Spinner /> <span className="text-slate-400">Loading document…</span>
          </div>
        )}

        {error && (
          <div className="py-12 text-center text-sm text-red-300">{error}</div>
        )}

        {doc && !loading && (
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 text-accent-400 mb-2">
                <FileText size={18} />
                <span className="text-[10px] font-bold tracking-widest uppercase">MOSDAC Document</span>
              </div>
              <h2 className="text-xl font-bold text-white leading-snug">{displayTitle}</h2>
            </div>

            {doc.url && (
              <a
                href={doc.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-accent-400 transition-colors hover:text-accent-300"
              >
                <ExternalLink size={12} /> View on MOSDAC
              </a>
            )}

            {headings.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {headings.map((h, i) => (
                  <Badge key={i} tone="accent">{h}</Badge>
                ))}
              </div>
            )}

            {paragraphs.length > 0 && (
              <div className="space-y-3">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-sm text-slate-300 leading-relaxed">{p}</p>
                ))}
              </div>
            )}

            {(doc.pdf_links ?? []).length > 0 && (
              <div>
                <h4 className="mb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  Related PDFs
                </h4>
                <div className="space-y-1">
                  {doc.pdf_links!.map((link, i) => (
                    <a
                      key={i}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-accent-400 transition-colors hover:bg-white/5 hover:text-accent-300"
                    >
                      <FileText size={14} />
                      {link.split("/").pop()}
                      <ExternalLink size={11} className="ml-auto text-slate-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {doc.metadata && Object.values(doc.metadata).some(Boolean) && (
              <div className="rounded-lg bg-white/5 p-3">
                <h4 className="mb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  Metadata
                </h4>
                <dl className="grid gap-2 sm:grid-cols-3">
                  {Object.entries(doc.metadata)
                    .filter(([, v]) => v != null)
                    .map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">{k}</dt>
                        <dd className="text-sm text-slate-300">{String(v)}</dd>
                      </div>
                    ))}
                </dl>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function ProductCard({ product, onViewDoc }: { product: SatelliteProduct; onViewDoc: (name: string) => void }) {
  const hiddenKeys = new Set(["name", "parameters", "regions", "algorithms", "id", "display_name"]);
  const extraEntries = Object.entries(product).filter(
    ([k, v]) => !hiddenKeys.has(k) && v != null && v !== "",
  );

  const title = (product as Record<string, unknown>).display_name
    ? String((product as Record<string, unknown>).display_name)
    : product.name.replace(/\.json$/, "").replace(/_/g, " ");

  const hasTags = product.parameters.length > 0 || product.regions.length > 0 || (product.algorithms ?? []).length > 0;

  return (
    <div className="glass group rounded-xl transition-all duration-200 hover:border-accent-500/20">
      {/* Top bar: title + action */}
      <div className="flex items-center gap-3 p-4 pb-0">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-accent-400">
          <FileText size={16} />
        </div>
        <h3 className="min-w-0 flex-1 text-sm font-semibold text-white leading-snug truncate" title={title}>
          {title}
        </h3>
        <button
          onClick={() => onViewDoc(product.name)}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-accent-500/10 px-3 py-1.5 text-xs font-medium text-accent-400 transition-colors hover:bg-accent-500/20 hover:text-accent-300"
        >
          <Eye size={13} /> View
        </button>
      </div>

      {/* Tags row */}
      {hasTags && (
        <div className="flex flex-wrap gap-1.5 px-4 pt-3">
          {product.regions.map((region) => (
            <Badge key={`region-${region}`} tone="gold">{region}</Badge>
          ))}
          {product.parameters.map((param) => (
            <Badge key={`param-${param}`} tone="green">{param}</Badge>
          ))}
          {(product.algorithms ?? []).map((algo) => (
            <Badge key={`algo-${algo}`} tone="neutral">{algo}</Badge>
          ))}
        </div>
      )}

      {/* Extra properties */}
      {extraEntries.length > 0 && (
        <div className="mx-4 mt-3 grid gap-x-6 gap-y-1.5 border-t border-white/5 pt-3 sm:grid-cols-2">
          {extraEntries.map(([key, value]) => (
            <div key={key} className="flex items-baseline gap-2 text-xs">
              <span className="shrink-0 font-medium text-slate-500">{key.replace(/_/g, " ")}</span>
              <span className="truncate text-slate-300">
                {Array.isArray(value) ? value.join(", ") : String(value)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="h-4" />
    </div>
  );
}

export default function SatelliteDetailPage() {
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

  return (
    <AppShell>
      <Link
        to="/satellites"
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-accent-300 transition-colors hover:text-accent-400"
      >
        <ArrowLeft size={15} /> All satellites
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
          <GlassPanel className="flex flex-wrap items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4">
              <div className="glass flex size-14 items-center justify-center rounded-2xl">
                <SatelliteIcon size={28} className="text-kg-satellite" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{detail.name}</h1>
                <p className="text-sm text-slate-400">
                  {detail.products.length} data product
                  {detail.products.length !== 1 ? "s" : ""}
                  {detail.payloads.length > 0 &&
                    ` · ${detail.payloads.length} payload${detail.payloads.length !== 1 ? "s" : ""}`}
                </p>
              </div>
            </div>
            <Button
              onClick={() =>
                navigate("/chat", {
                  state: { prefill: `Tell me about ${detail.name} and its data products` },
                })
              }
            >
              <MessageCircle size={16} /> Ask Astra-Q about this
            </Button>
          </GlassPanel>

          {/* Payloads */}
          {detail.payloads.length > 0 && (
            <GlassPanel className="p-6">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-400 uppercase">
                <Cpu size={15} className="text-kg-payload" /> Payloads
              </h2>
              <div className="flex flex-wrap gap-2">
                {detail.payloads.map((p, i) => (
                  <Badge key={i} tone="nebula">
                    {String(p.name ?? p.display_name ?? `Payload ${i + 1}`)}
                  </Badge>
                ))}
              </div>
            </GlassPanel>
          )}

          {/* Products */}
          <GlassPanel className="p-6">
            <h2 className="mb-4 text-sm font-semibold tracking-wide text-slate-400 uppercase">
              Data Products
            </h2>
            {detail.products.length === 0 ? (
              <p className="text-sm text-slate-400">
                No products recorded for this satellite in the knowledge graph.
              </p>
            ) : (
              <div className="space-y-3">
                {detail.products.map((product) => (
                  <ProductCard key={product.name} product={product} onViewDoc={handleViewDoc} />
                ))}
              </div>
            )}
          </GlassPanel>
        </motion.div>
      )}

      <AnimatePresence>
        {viewingDoc && (
          <DocViewer filename={viewingDoc} onClose={() => setViewingDoc(null)} />
        )}
      </AnimatePresence>
    </AppShell>
  );
}
