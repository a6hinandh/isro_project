import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, MessageCircle, Satellite as SatelliteIcon } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Spinner";
import { apiGet, ApiError } from "@/lib/api";
import type { SatelliteDetail } from "@/lib/types";

export default function SatelliteDetailPage() {
  const { name = "" } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<SatelliteDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDetail(null);
    setError(null);
    apiGet<SatelliteDetail>(`/kg/satellites/${encodeURIComponent(name)}`)
      .then(setDetail)
      .catch((e: unknown) => {
        if (e instanceof ApiError && e.status === 404) {
          setError(`No satellite named “${name}” in the knowledge graph.`);
        } else {
          setError("Could not load satellite details. The knowledge graph may be paused.");
        }
      });
  }, [name]);

  const extraProps = detail
    ? Object.entries(detail).filter(
        ([key, value]) =>
          !["name", "payloads", "products"].includes(key) &&
          (typeof value === "string" || typeof value === "number"),
      )
    : [];

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

          {/* Extra properties */}
          {extraProps.length > 0 && (
            <GlassPanel className="p-6">
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-400 uppercase">
                Details
              </h2>
              <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {extraProps.map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-xs tracking-wide text-slate-500 uppercase">{key}</dt>
                    <dd className="text-sm break-words text-slate-200">{String(value)}</dd>
                  </div>
                ))}
              </dl>
            </GlassPanel>
          )}

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
                  <div key={product.name} className="glass rounded-xl p-4">
                    <h3 className="mb-2 font-semibold text-white">{product.name}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {product.parameters.map((param) => (
                        <Badge key={`param-${param}`} tone="green">
                          {param}
                        </Badge>
                      ))}
                      {product.regions.map((region) => (
                        <Badge key={`region-${region}`} tone="gold">
                          {region}
                        </Badge>
                      ))}
                      {(product.algorithms ?? []).map((algo) => (
                        <Badge key={`algo-${algo}`} tone="neutral">
                          {algo}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassPanel>
        </motion.div>
      )}
    </AppShell>
  );
}
