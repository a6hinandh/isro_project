import { useRef, useState, type KeyboardEvent } from "react";
import { Mic, MicOff, Paperclip, SendHorizonal, X } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (text: string, file: File | null) => void;
  loading: boolean;
  maxLength: number;
  initialValue?: string;
}

export function ChatInput({ onSend, loading, maxLength, initialValue = "" }: ChatInputProps) {
  const [value, setValue] = useState(initialValue);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isListening, toggle: toggleVoice, supported: speechSupported } = useSpeech(
    (transcript) => setValue((prev) => prev + (prev ? " " : "") + transcript),
  );

  const handleSend = () => {
    if (!value.trim() || loading) return;
    onSend(value, attachedFile);
    setValue("");
    setAttachedFile(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-white/10 p-3 sm:p-4">
      {attachedFile && (
        <div className="mb-2 flex items-center gap-2 rounded-lg bg-accent-500/10 border border-accent-500/20 px-3 py-1.5 text-xs text-accent-300">
          <Paperclip size={12} />
          <span className="max-w-52 truncate">{attachedFile.name}</span>
          <button
            onClick={() => setAttachedFile(null)}
            aria-label="Remove attachment"
            className="cursor-pointer rounded p-0.5 hover:bg-white/10"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <div className="glass-strong flex items-center gap-2 rounded-2xl border border-white/5 p-2 shadow-lg">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".txt,.pdf,.docx"
          onChange={(e) => setAttachedFile(e.target.files?.[0] ?? null)}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          aria-label="Attach file"
          title="Attach a .txt, .pdf or .docx file"
          className={cn(
            "cursor-pointer rounded-xl p-2 transition-all hover:bg-white/10 hover:scale-105",
            attachedFile ? "text-accent-400" : "text-slate-400",
          )}
        >
          <Paperclip size={18} />
        </button>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about satellites, products, or MOSDAC data…"
          maxLength={maxLength}
          className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
          aria-label="Message"
        />

        {speechSupported && (
          <button
            onClick={toggleVoice}
            aria-label={isListening ? "Stop voice input" : "Start voice input"}
            className={cn(
              "cursor-pointer rounded-xl p-2 transition-all hover:bg-white/10 hover:scale-105",
              isListening ? "text-red-400" : "text-slate-400",
            )}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        )}

        <button
          onClick={handleSend}
          disabled={loading || !value.trim()}
          aria-label="Send message"
          className="cursor-pointer rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 p-2 text-white shadow-md shadow-accent-500/20 transition-all hover:shadow-lg hover:shadow-accent-500/30 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          <SendHorizonal size={18} />
        </button>
      </div>
    </div>
  );
}
