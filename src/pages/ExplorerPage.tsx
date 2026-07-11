import { lazy, Suspense } from "react";
import { AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Spinner } from "@/components/ui/Spinner";
import { useLanguage } from "@/context/LanguageContext";

// Heavy canvas/d3 dependency — keep it in its own lazy chunk.
const GraphExplorer = lazy(() => import("@/features/kg/GraphExplorer"));

export default function ExplorerPage() {
  const { locale, t } = useLanguage();

  return (
    <AppShell>
      {locale === "hi" && (
        <div className="mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 p-3 text-center text-xs flex items-center justify-center gap-2">
          <AlertTriangle size={14} className="shrink-0" />
          <span>यह पृष्ठ हिन्दी में उपलब्ध नहीं है। (This page is not available in Hindi)</span>
        </div>
      )}
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-bold text-white">{t.explorer.title}</h1>
        <p className="text-sm text-slate-400">
          {t.explorer.subtitle}
        </p>
      </div>
      <Suspense
        fallback={
          <GlassPanel className="flex items-center justify-center gap-3 p-16">
            <Spinner /> <span className="text-slate-400">{t.explorer.loading}</span>
          </GlassPanel>
        }
      >
        <GraphExplorer />
      </Suspense>
    </AppShell>
  );
}
