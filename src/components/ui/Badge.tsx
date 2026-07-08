import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Tone = "accent" | "nebula" | "green" | "gold" | "neutral" | "red";

const tones: Record<Tone, string> = {
  accent: "bg-accent-400/15 text-accent-300 border-accent-400/30",
  nebula: "bg-nebula-400/15 text-nebula-300 border-nebula-400/30",
  green: "bg-green-400/15 text-green-300 border-green-400/30",
  gold: "bg-star/15 text-star border-star/30",
  neutral: "bg-white/10 text-slate-300 border-white/15",
  red: "bg-red-400/15 text-red-300 border-red-400/30",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

/** Mode badge for chat answers (kg / rag / both / chat). */
export function ModeBadge({ mode }: { mode?: string }) {
  if (!mode || mode === "chat" || mode === "unknown") return null;
  const label =
    mode === "kg" ? "Knowledge Graph" : mode === "rag" ? "Documents" : "KG + Documents";
  const tone: Tone = mode === "kg" ? "nebula" : mode === "rag" ? "accent" : "green";
  return <Badge tone={tone}>{label}</Badge>;
}
