import { useState } from "react";
import { Check, Copy, Link2, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { apiDelete, apiPost } from "@/lib/api";
import type { ShareResponse } from "@/lib/types";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  threadId: string | null;
}

export function ShareDialog({ isOpen, onClose, threadId }: ShareDialogProps) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const createLink = async () => {
    if (!threadId) return;
    setBusy(true);
    setError("");
    try {
      const { share_token } = await apiPost<ShareResponse>(`/threads/${threadId}/share`);
      setShareUrl(`${window.location.origin}/share/${share_token}`);
    } catch {
      setError("Could not create a share link. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const copyLink = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const revokeLink = async () => {
    if (!threadId) return;
    setBusy(true);
    try {
      await apiDelete(`/threads/${threadId}/share`);
      setShareUrl(null);
    } catch {
      setError("Could not revoke the link.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share this conversation" className="max-w-lg">
      <p className="mb-4 text-sm text-slate-400">
        Anyone with the link can read this conversation (no login required).
        Revoke the link at any time to make it private again.
      </p>

      {error && (
        <div role="alert" className="mb-3 rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">
          {error}
        </div>
      )}

      {shareUrl ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input readOnly value={shareUrl} onFocus={(e) => e.target.select()} />
            <Button variant="secondary" onClick={copyLink} aria-label="Copy link">
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </Button>
          </div>
          <Button variant="danger" size="sm" onClick={revokeLink} disabled={busy}>
            <Trash2 size={14} /> Revoke link
          </Button>
        </div>
      ) : (
        <Button onClick={createLink} disabled={busy || !threadId}>
          <Link2 size={16} /> {busy ? "Creating…" : "Create share link"}
        </Button>
      )}
    </Modal>
  );
}
