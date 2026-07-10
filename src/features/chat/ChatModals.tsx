import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Volume2, Cpu, Sliders, Sparkles, BookOpen, User, ChevronRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { apiGet, apiPatch, apiPost } from "@/lib/api";
import { formatRelativeTime } from "@/lib/utils";
import type { Preferences, ThreadItem } from "@/lib/types";

/* ---------------- Settings ---------------- */

export function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [prefs, setPrefs] = useState<Preferences>({
    display_name: "",
    voice_responses: false,
    system_persona: "standard",
    llm_temperature: 0.2,
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    apiGet<Preferences>("/user/me").then(setPrefs).catch(() => {});
  }, [isOpen]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await apiPatch<Preferences>("/user/me", prefs);
      setPrefs(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {
      // keep local edits on failure
    } finally {
      setSaving(false);
    }
  };

  const tempPercent = Math.round(prefs.llm_temperature * 100);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Preferences" className="max-w-3xl">
      <div className="grid gap-5 md:grid-cols-2">

        {/* Left Column */}
        <div className="space-y-5">
          {/* Account Details */}
          <section className="glass-strong rounded-2xl border border-white/5 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-xl bg-accent-500/10 text-accent-400">
                <User size={16} />
              </div>
              <h3 className="text-xs font-bold font-mono tracking-widest text-accent-400 uppercase">
                Account
              </h3>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-200">Display Name</span>
              <Input
                value={prefs.display_name}
                onChange={(e) => setPrefs({ ...prefs, display_name: e.target.value })}
                placeholder="Enter your name"
              />
              <span className="mt-1.5 block text-xs text-slate-500">How AstraQ greets you in the chat panel.</span>
            </label>
          </section>

          {/* AI Persona */}
          <section className="glass-strong rounded-2xl border border-white/5 p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-xl bg-nebula-400/10 text-nebula-400">
                <Cpu size={16} />
              </div>
              <h3 className="text-xs font-bold font-mono tracking-widest text-nebula-400 uppercase">
                Response Style
              </h3>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold text-slate-200">AI Persona</span>
              <Select
                value={prefs.system_persona}
                onChange={(e) => setPrefs({ ...prefs, system_persona: e.target.value })}
              >
                <option value="standard">Standard (Grounded & Helpful)</option>
                <option value="expert">Expert (Rigorous Academic Scientist)</option>
                <option value="friendly">Friendly (Welcoming Space Guide)</option>
              </Select>
              <span className="mt-1.5 block text-xs text-slate-500">Adapts the system prompt for different tones.</span>
            </label>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Temperature */}
          <section className="glass-strong rounded-2xl border border-white/5 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-xl bg-accent-500/10 text-accent-400">
                  <Sliders size={16} />
                </div>
                <h3 className="text-xs font-bold font-mono tracking-widest text-accent-400 uppercase">
                  Temperature
                </h3>
              </div>
              <span className="rounded-lg border border-accent-400/20 bg-accent-400/10 px-2.5 py-1 text-xs font-bold font-mono text-accent-300">
                {prefs.llm_temperature.toFixed(1)}
              </span>
            </div>
            <div className="relative h-2 w-full rounded-full bg-white/5 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent-500 to-accent-400"
                style={{ width: `${tempPercent}%` }}
              />
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.1"
              value={prefs.llm_temperature}
              onChange={(e) => setPrefs({ ...prefs, llm_temperature: parseFloat(e.target.value) })}
              className="mt-[-8px] relative z-10 w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-400 [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-accent-500/30 [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-space-900"
            />
            <div className="flex justify-between text-[10px] font-mono tracking-wider text-slate-500 mt-1">
              <span>STRICT / FACTUAL</span>
              <span>CREATIVE / FLUID</span>
            </div>
          </section>

          {/* Voice Toggle */}
          <section className="glass-strong rounded-2xl border border-white/5 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-xl bg-green-400/10 text-green-400">
                  <Volume2 size={16} />
                </div>
                <div>
                  <h3 className="text-xs font-bold font-mono tracking-widest text-green-400 uppercase">
                    Voice
                  </h3>
                  <span className="text-[11px] text-slate-500">Auto-play synthesized replies.</span>
                </div>
              </div>
              <button
                onClick={() => setPrefs({ ...prefs, voice_responses: !prefs.voice_responses })}
                className={`relative h-6 w-11 rounded-full transition-colors cursor-pointer ${prefs.voice_responses ? "bg-accent-500" : "bg-white/10"}`}
                role="switch"
                aria-checked={prefs.voice_responses}
              >
                <span
                  className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform ${prefs.voice_responses ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>
          </section>
        </div>

        {/* Full-width save button */}
        <div className="md:col-span-2">
          <Button
            className="w-full py-2.5 font-semibold relative overflow-hidden group"
            onClick={handleSave}
            disabled={saving}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {saved ? "Preferences Saved" : saving ? "Saving..." : "Save Preferences"}
              {saved && <span className="text-green-300">&#10003;</span>}
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

/* ---------------- Feedback ---------------- */

export function FeedbackModal({
  isOpen,
  onClose,
  threadId,
}: {
  isOpen: boolean;
  onClose: () => void;
  threadId: string | null;
}) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating < 1) return;
    setSubmitting(true);
    try {
      await apiPost("/feedback", { rating, text, thread_id: threadId });
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setRating(0);
        setText("");
        onClose();
      }, 1500);
    } catch {
      // swallow; user can retry
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Feedback" className="max-w-md">
      {sent ? (
        <div className="py-8 text-center space-y-3">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-green-400/10">
            <span className="text-2xl">&#10003;</span>
          </div>
          <p className="text-lg font-bold text-green-400">Feedback Submitted!</p>
          <p className="text-sm text-slate-400">Thank you for helping us improve AstraQ.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass-strong rounded-2xl border border-white/5 p-5 text-center">
            <span className="block text-sm font-semibold text-slate-200 mb-4">Rate your experience</span>
            <div className="flex justify-center gap-3" role="radiogroup" aria-label="Rating">
              {[1, 2, 3, 4, 5].map((n) => (
                <motion.button
                  key={n}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRating(n)}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  className="cursor-pointer p-1"
                >
                  <Star
                    size={32}
                    className={`transition-colors ${n <= rating ? "fill-star text-star" : "text-slate-700 hover:text-slate-400"}`}
                  />
                </motion.button>
              ))}
            </div>
            {rating > 0 && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 block text-xs font-mono tracking-wider text-star/60"
              >
                {rating}/5 STARS
              </motion.span>
            )}
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-slate-200">Tell us what you think</span>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What could be improved? Found any issues?"
              rows={4}
            />
          </label>
          <Button className="w-full py-2.5 font-semibold" onClick={handleSubmit} disabled={rating < 1 || submitting}>
            {submitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </div>
      )}
    </Modal>
  );
}

/* ---------------- Help ---------------- */

export function HelpModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Help & Support" className="max-w-xl">
      <div className="space-y-5 text-sm leading-relaxed text-slate-300">

        {/* Core Description */}
        <section className="glass-strong rounded-2xl border border-white/5 p-5 flex gap-4 items-start">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-500/10 text-accent-400">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="font-bold text-white mb-1">Intelligent Orbit Assistant</h4>
            <p className="text-xs text-slate-400">
              AstraQ is an open-source assistant for exploring ISRO&apos;s MOSDAC satellite documentation
              and metadata using RAG (retrieval-augmented generation) and knowledge-graph routing.
            </p>
          </div>
        </section>

        {/* Example Queries */}
        <section className="space-y-3">
          <h4 className="text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase flex items-center gap-2">
            <BookOpen size={12} /> Example Queries
          </h4>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              { label: "Satellite Payload", query: '"What products does INSAT-3D have?"', color: "text-accent-400", border: "border-accent-400/15" },
              { label: "Retrieval Logic", query: '"Explain SST data from MOSDAC"', color: "text-nebula-400", border: "border-nebula-400/15" },
              { label: "Comparisons", query: '"Compare INSAT-3D and Oceansat-3"', color: "text-green-400", border: "border-green-400/15" },
              { label: "Terms", query: '"What is AMV?"', color: "text-star", border: "border-star/15" },
            ].map((item) => (
              <div key={item.label} className={`rounded-xl border ${item.border} bg-white/[0.02] p-3.5 text-xs`}>
                <span className={`font-bold ${item.color} block mb-1`}>{item.label}</span>
                <span className="text-slate-400">{item.query}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Feature List */}
        <section className="space-y-3">
          <h4 className="text-[10px] font-bold font-mono tracking-widest text-slate-500 uppercase">System Features</h4>
          <div className="grid gap-2 sm:grid-cols-3">
            {[
              { title: "Voice Input", desc: "Speak queries hands-free." },
              { title: "File Upload", desc: "Ground on custom PDF context." },
              { title: "KG Explorer", desc: "Browse data relations visually." },
            ].map((f) => (
              <div key={f.title} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs">
                <span className="font-bold text-white block mb-0.5">{f.title}</span>
                <span className="text-slate-500">{f.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Keyboard Shortcuts */}
        <section className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-slate-500 font-mono">
          <span className="tracking-wider">KEYBOARD SHORTCUTS</span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-slate-300">Enter</kbd>
            <span>Send Message</span>
          </span>
        </section>
      </div>
    </Modal>
  );
}

/* ---------------- Favorites ---------------- */

export function FavoritesModal({
  isOpen,
  onClose,
  favorites,
  onOpenThread,
}: {
  isOpen: boolean;
  onClose: () => void;
  favorites: ThreadItem[];
  onOpenThread: (threadId: string) => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Starred Conversations" className="max-w-md">
      {favorites.length === 0 ? (
        <div className="py-8 text-center space-y-3">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white/5">
            <Star size={24} className="text-slate-600" />
          </div>
          <p className="text-sm font-semibold text-slate-300">No starred conversations yet.</p>
          <p className="text-xs text-slate-500">Star chat threads in the main header to save them here.</p>
        </div>
      ) : (
        <ul className="max-h-96 space-y-2 overflow-y-auto pr-1">
          {favorites.map((t) => (
            <li key={t.thread_id}>
              <button
                onClick={() => {
                  onOpenThread(t.thread_id);
                  onClose();
                }}
                className="group w-full cursor-pointer rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3.5 text-left transition-all hover:bg-white/5 hover:border-accent-500/20"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2.5 text-sm font-semibold text-white truncate">
                    <Star size={14} className="shrink-0 fill-star text-star" />
                    <span className="truncate">{t.title || "Untitled Chat"}</span>
                  </span>
                  <ChevronRight size={14} className="shrink-0 text-slate-600 transition-all group-hover:text-slate-300 group-hover:translate-x-0.5" />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500 font-mono tracking-wider">
                  <span>{t.message_count} MESSAGES</span>
                  <span>{formatRelativeTime(t.updated_at)}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
