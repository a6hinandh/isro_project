import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, { type ForceGraphMethods } from "react-force-graph-2d";
import { Search, ExternalLink, Info, Network, Layers } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Spinner";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { apiGet } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { KGGraph, KGNode } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { NODE_COLORS } from "@/features/kg/nodeColors";

interface GraphNode extends KGNode {
  x?: number;
  y?: number;
}

interface GraphLink {
  source: number | GraphNode;
  target: number | GraphNode;
  label: string;
}

function EmptyPanel({ data }: { data: KGGraph }) {
  const typeCounts: Record<string, number> = {};
  for (const n of data.nodes) {
    typeCounts[n.type] = (typeCounts[n.type] || 0) + 1;
  }
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="mb-4 flex items-center gap-2 text-slate-400">
          <Info size={16} />
          <span className="text-sm font-semibold">Graph Overview</span>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-white/5 p-3 text-center">
            <p className="text-lg font-bold text-white">{data.nodes.length}</p>
            <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Nodes</p>
          </div>
          <div className="rounded-lg bg-white/5 p-3 text-center">
            <p className="text-lg font-bold text-white">{data.edges.length}</p>
            <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Edges</p>
          </div>
        </div>

        <h4 className="mb-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
          By type
        </h4>
        <div className="space-y-1.5">
          {Object.entries(typeCounts)
            .sort(([, a], [, b]) => b - a)
            .map(([type, count]) => (
              <div key={type} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full" style={{ background: NODE_COLORS[type] ?? "#888" }} />
                  <span className="text-slate-300">{type}</span>
                </span>
                <span className="text-xs font-mono text-slate-500">{count}</span>
              </div>
            ))}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        Click a node to inspect it. Scroll to zoom, drag to pan.
      </p>
    </div>
  );
}

function SelectedNodePanel({
  selected,
  neighbors,
  onClickNode,
  onNavigate,
}: {
  selected: GraphNode;
  neighbors: { node: KGNode; relation: string }[];
  onClickNode: (node: KGNode) => void;
  onNavigate: (path: string, state?: { state: { prefill: string } }) => void;
}) {
  const props = Object.entries(selected.properties).filter(([k]) => k !== "name");
  const grouped = new Map<string, { node: KGNode; relation: string }[]>();
  for (const n of neighbors) {
    const key = n.node.type;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(n);
  }

  return (
    <>
      <div className="mb-4 flex items-start gap-3">
        <div
          className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-xl border"
          style={{
            borderColor: `${NODE_COLORS[selected.type] ?? "#888"}40`,
            backgroundColor: `${NODE_COLORS[selected.type] ?? "#888"}10`,
            color: NODE_COLORS[selected.type] ?? "#888",
          }}
        >
          <Layers size={20} />
        </div>
        <div className="min-w-0">
          <Badge
            tone="neutral"
            className="mb-1"
            style={{ color: NODE_COLORS[selected.type] ?? "#ccc" }}
          >
            {selected.type}
          </Badge>
          <h3 className="text-base font-bold break-words text-white leading-snug">
            {selected.label}
          </h3>
        </div>
      </div>

      {props.length > 0 && (
        <div className="mb-4 rounded-lg bg-white/5 p-3">
          <h4 className="mb-2 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            <Info size={11} /> Properties
          </h4>
          <dl className="space-y-1.5 text-sm">
            {props.map(([key, value]) => (
              <div key={key}>
                <dt className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  {key.replace(/_/g, " ")}
                </dt>
                <dd className="break-words text-slate-300">
                  {Array.isArray(value) ? value.join(", ") : String(value)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {neighbors.length > 0 && (
        <div className="mb-4">
          <h4 className="mb-2 flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            <Network size={11} /> Connections ({neighbors.length})
          </h4>
          <div className="space-y-3">
            {[...grouped.entries()].map(([type, items]) => (
              <div key={type}>
                <div className="mb-1 flex items-center gap-1.5">
                  <span className="size-2 rounded-full" style={{ background: NODE_COLORS[type] ?? "#888" }} />
                  <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">{type}</span>
                  <span className="text-[10px] text-slate-600">{items.length}</span>
                </div>
                <ul className="space-y-0.5">
                  {items.slice(0, 8).map((n, i) => (
                    <li key={i}>
                      <button
                        onClick={() => onClickNode(n.node)}
                        className="flex w-full cursor-pointer items-baseline gap-1.5 rounded-md px-2 py-1 text-left text-sm transition-colors hover:bg-white/5"
                      >
                        <span className="shrink-0 text-[9px] font-mono text-slate-600 uppercase">
                          {n.relation.replace("← ", "")}
                        </span>
                        <span className="truncate" style={{ color: NODE_COLORS[n.node.type] ?? "#ccc" }}>
                          {n.node.label}
                        </span>
                      </button>
                    </li>
                  ))}
                  {items.length > 8 && (
                    <li className="px-2 text-[10px] text-slate-600">
                      +{items.length - 8} more
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 border-t border-white/5 pt-3">
        {selected.type === "Satellite" && (
          <Button
            size="sm"
            variant="secondary"
            className="justify-center"
            onClick={() => onNavigate(`/satellites/${encodeURIComponent(selected.label)}`)}
          >
            <ExternalLink size={14} /> View satellite page
          </Button>
        )}
        <Button
          size="sm"
          className="justify-center"
          onClick={() =>
            onNavigate("/chat", {
              state: { prefill: `Tell me about ${selected.label}` },
            })
          }
        >
          Ask Astra-Q about this
        </Button>
      </div>
    </>
  );
}

export default function GraphExplorer() {
  const navigate = useNavigate();
  const graphRef = useRef<ForceGraphMethods<GraphNode, GraphLink> | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<KGGraph | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTypes, setActiveTypes] = useState<Set<string>>(new Set(Object.keys(NODE_COLORS)));
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [query, setQuery] = useState("");
  const [size, setSize] = useState({ width: 800, height: 560 });

  useEffect(() => {
    apiGet<KGGraph>("/kg/graph")
      .then((graph) => {
        if (graph.error && graph.nodes.length === 0) setError(graph.error);
        else setData(graph);
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  // Track container size for canvas dimensions
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSize({ width: entry.contentRect.width, height: Math.max(480, entry.contentRect.height) });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [data]);

  const { graphData, neighborsOf } = useMemo(() => {
    const empty = {
      graphData: { nodes: [] as GraphNode[], links: [] as GraphLink[] },
      neighborsOf: new Map<number, { node: KGNode; relation: string }[]>(),
    };
    if (!data) return empty;

    const visibleNodes = data.nodes.filter((n) => activeTypes.has(n.type));
    const visibleIds = new Set(visibleNodes.map((n) => n.id));
    const links = data.edges
      .filter((e) => visibleIds.has(e.source) && visibleIds.has(e.target))
      .map((e) => ({ source: e.source, target: e.target, label: e.label }));

    const nodeById = new Map(data.nodes.map((n) => [n.id, n]));
    const neighbors = new Map<number, { node: KGNode; relation: string }[]>();
    for (const e of data.edges) {
      const s = nodeById.get(e.source);
      const t = nodeById.get(e.target);
      if (!s || !t) continue;
      if (!neighbors.has(e.source)) neighbors.set(e.source, []);
      if (!neighbors.has(e.target)) neighbors.set(e.target, []);
      neighbors.get(e.source)!.push({ node: t, relation: e.label });
      neighbors.get(e.target)!.push({ node: s, relation: `← ${e.label}` });
    }

    return {
      // structuredClone: force-graph mutates node objects with x/y positions
      graphData: { nodes: structuredClone(visibleNodes) as GraphNode[], links },
      neighborsOf: neighbors,
    };
  }, [data, activeTypes]);

  const toggleType = (type: string) => {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const focusSearch = useCallback(() => {
    if (!query.trim()) return;
    const q = query.trim().toLowerCase();
    const match = graphData.nodes.find((n) => n.label.toLowerCase().includes(q));
    if (match && match.x != null && match.y != null && graphRef.current) {
      graphRef.current.centerAt(match.x, match.y, 600);
      graphRef.current.zoom(4, 600);
      setSelected(match);
    }
  }, [query, graphData.nodes]);

  const drawNode = useCallback(
    (node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const color = NODE_COLORS[node.type] ?? "#888";
      const isSelected = selected?.id === node.id;
      const r = isSelected ? 7 : 5;

      ctx.beginPath();
      ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      if (isSelected) {
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      if (globalScale > 1.8 || isSelected) {
        const label =
          node.label.length > 22 ? `${node.label.slice(0, 22)}…` : node.label;
        ctx.font = `${Math.max(10 / globalScale, 2.5)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(226, 232, 240, 0.9)";
        ctx.fillText(label, node.x ?? 0, (node.y ?? 0) - r - 2);
      }
    },
    [selected],
  );

  if (error) {
    return (
      <GlassPanel className="p-8 text-center">
        <p className="mb-2 font-semibold text-red-300">Knowledge graph unavailable</p>
        <p className="text-sm text-slate-400">
          {error}. The Neo4j database may be paused — try again in a minute.
        </p>
      </GlassPanel>
    );
  }

  if (!data) {
    return (
      <GlassPanel className="flex items-center justify-center gap-3 p-16">
        <Spinner /> <span className="text-slate-400">Loading knowledge graph…</span>
      </GlassPanel>
    );
  }

  const selectedNeighbors = selected ? (neighborsOf.get(selected.id) ?? []) : [];

  return (
    <div className="space-y-4">
      {/* Controls */}
      <GlassPanel className="flex flex-wrap items-center gap-3 p-4">
        <div className="relative min-w-56 flex-1">
          <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && focusSearch()}
            placeholder="Find a node (e.g. INSAT-3D)…"
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(NODE_COLORS).map(([type, color]) => (
            <button
              key={type}
              onClick={() => toggleType(type)}
              className={cn(
                "flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all",
                activeTypes.has(type)
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-white/10 text-slate-500 opacity-50",
              )}
              aria-pressed={activeTypes.has(type)}
            >
              <span className="size-2 rounded-full" style={{ background: color }} />
              {type}
            </button>
          ))}
        </div>
      </GlassPanel>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        {/* Graph canvas */}
        <GlassPanel className="overflow-hidden">
          <div ref={containerRef} className="h-[560px]">
            <ForceGraph2D
              ref={graphRef}
              width={size.width}
              height={size.height}
              graphData={graphData}
              backgroundColor="rgba(0,0,0,0)"
              nodeCanvasObject={drawNode}
              nodePointerAreaPaint={(node, color, ctx) => {
                ctx.beginPath();
                ctx.arc(node.x ?? 0, node.y ?? 0, 8, 0, 2 * Math.PI);
                ctx.fillStyle = color;
                ctx.fill();
              }}
              linkColor={() => "rgba(255,255,255,0.15)"}
              linkWidth={1}
              onNodeClick={(node) => setSelected(node)}
              onBackgroundClick={() => setSelected(null)}
              cooldownTicks={120}
            />
          </div>
        </GlassPanel>

        {/* Detail side panel */}
        <GlassPanel className="max-h-[560px] overflow-y-auto p-5">
          {selected ? (
            <SelectedNodePanel
              selected={selected}
              neighbors={selectedNeighbors}
              onClickNode={(node) => {
                const match = graphData.nodes.find((n) => n.id === node.id);
                if (match) {
                  setSelected(match);
                  if (match.x != null && match.y != null && graphRef.current) {
                    graphRef.current.centerAt(match.x, match.y, 400);
                  }
                }
              }}
              onNavigate={(path, state) => navigate(path, state)}
            />
          ) : (
            <EmptyPanel data={data} />
          )}
        </GlassPanel>
      </div>
    </div>
  );
}
