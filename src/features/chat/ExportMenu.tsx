import { Download } from "lucide-react";
import type { UIMessage } from "@/lib/types";

function buildMarkdown(messages: UIMessage[], title: string): string {
  const lines: string[] = [`# ${title}`, "", `_Exported from Astra-Q on ${new Date().toLocaleString()}_`, ""];
  for (const msg of messages) {
    lines.push(msg.type === "user" ? "## 🧑 You" : "## 🛰️ Astra-Q");
    lines.push("");
    lines.push(msg.text);
    if (msg.sources && msg.sources.length > 0) {
      lines.push("");
      lines.push("**Sources:**");
      for (const s of msg.sources) {
        lines.push(`- ${s.source}${s.page != null ? ` (p. ${s.page})` : ""}`);
      }
    }
    lines.push("");
  }
  return lines.join("\n");
}

interface ExportMenuProps {
  messages: UIMessage[];
  threadTitle: string;
  disabled?: boolean;
}

export function ExportMenu({ messages, threadTitle, disabled }: ExportMenuProps) {
  const handleExport = () => {
    const markdown = buildMarkdown(messages, threadTitle || "Astra-Q conversation");
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(threadTitle || "astraq-chat").replace(/[^a-z0-9-_ ]/gi, "").trim() || "astraq-chat"}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      disabled={disabled || messages.length === 0}
      title="Export chat as Markdown"
      aria-label="Export chat as Markdown"
      className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-40"
    >
      <Download size={18} />
    </button>
  );
}
