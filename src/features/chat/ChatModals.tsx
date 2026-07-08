import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { apiGet, apiPatch, apiPost } from "@/lib/api";
import { formatRelativeTime } from "@/lib/utils";
import type { Preferences, ThreadItem } from "@/lib/types";

/* ---------------- Settings ---------------- */

export function SettingsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [prefs, setPrefs] = useState<Preferences>({ theme: "dark", language: "en", display_name: "" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    apiGet<Preferences>("/user/me").then(setPrefs).catch(() => {});
  }, [isOpen]);

  const handleSave = async () => {
    try {
      const updated = await apiPatch<Preferences>("/user/me", prefs);
      setPrefs(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {
      // keep local edits on failure
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Settings" className="max-w-md">
      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">Display name</span>
          <Input
            value={prefs.display_name}
            onChange={(e) => setPrefs({ ...prefs, display_name: e.target.value })}
            placeholder="Your name"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">Theme</span>
          <Select
            value={prefs.theme}
            onChange={(e) => setPrefs({ ...prefs, theme: e.target.value })}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </Select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-300">Language</span>
          <Select
            value={prefs.language}
            onChange={(e) => setPrefs({ ...prefs, language: e.target.value })}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </Select>
        </label>
        <Button className="w-full" onClick={handleSave}>
          {saved ? "Saved ✓" : "Save Changes"}
        </Button>
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

  const handleSubmit = async () => {
    if (rating < 1) return;
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
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Feedback" className="max-w-md">
      {sent ? (
        <p className="py-4 text-center text-green-400">Thank you for your feedback!</p>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center gap-2" role="radiogroup" aria-label="Rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setRating(n)}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                className="cursor-pointer p-1 transition-transform hover:scale-110"
              >
                <Star
                  size={28}
                  className={n <= rating ? "fill-star text-star" : "text-slate-600"}
                />
              </button>
            ))}
          </div>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Tell us what you think…"
            rows={4}
          />
          <Button className="w-full" onClick={handleSubmit} disabled={rating < 1}>
            Submit Feedback
          </Button>
        </div>
      )}
    </Modal>
  );
}

/* ---------------- Help ---------------- */

export function HelpModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Help & Support">
      <div className="space-y-4 text-sm leading-relaxed text-slate-300">
        <section>
          <h4 className="mb-1 font-semibold text-accent-400">What is Astra-Q?</h4>
          <p>
            Astra-Q is an AI assistant for querying ISRO&apos;s MOSDAC satellite data
            using natural language. It combines semantic search (RAG) with a knowledge
            graph (Neo4j) for accurate answers.
          </p>
        </section>
        <section>
          <h4 className="mb-1 font-semibold text-accent-400">What can I ask?</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li>Satellite info: &quot;What products does INSAT-3D have?&quot;</li>
            <li>Data queries: &quot;Explain SST data from MOSDAC&quot;</li>
            <li>Comparisons: &quot;Compare INSAT-3D and Oceansat-3&quot;</li>
            <li>General: &quot;What is AMV?&quot;, &quot;How does rainfall estimation work?&quot;</li>
          </ul>
        </section>
        <section>
          <h4 className="mb-1 font-semibold text-accent-400">Features</h4>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong>Voice input</strong> — click the mic button to speak your question</li>
            <li><strong>File upload</strong> — attach PDF/DOCX/TXT files for context</li>
            <li><strong>Sources</strong> — expand the sources panel under any answer</li>
            <li><strong>Share</strong> — publish a read-only link to any conversation</li>
            <li><strong>Export</strong> — download a conversation as Markdown</li>
            <li><strong>KG Explorer</strong> — browse the satellite knowledge graph visually</li>
          </ul>
        </section>
        <section>
          <h4 className="mb-1 font-semibold text-accent-400">Keyboard shortcuts</h4>
          <p>
            <code className="rounded bg-black/30 px-1.5 py-0.5">Enter</code> — send message
          </p>
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
    <Modal isOpen={isOpen} onClose={onClose} title="Favorites" className="max-w-md">
      {favorites.length === 0 ? (
        <p className="py-2 text-sm text-slate-400">
          No favorite chats saved. Star a conversation to add it here.
        </p>
      ) : (
        <ul className="max-h-96 space-y-1 overflow-y-auto">
          {favorites.map((t) => (
            <li key={t.thread_id}>
              <button
                onClick={() => {
                  onOpenThread(t.thread_id);
                  onClose();
                }}
                className="w-full cursor-pointer rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-white/10"
              >
                <span className="flex items-center gap-2 text-sm text-white">
                  <Star size={13} className="shrink-0 fill-star text-star" />
                  <span className="truncate">{t.title || "Untitled"}</span>
                </span>
                <span className="mt-0.5 block text-xs text-slate-500">
                  {t.message_count} message{t.message_count !== 1 ? "s" : ""}
                  {formatRelativeTime(t.updated_at) && ` · ${formatRelativeTime(t.updated_at)}`}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}
