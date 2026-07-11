import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { apiGet, apiPost, apiUpload, ApiError } from "@/lib/api";
import type {
  ChatResponse,
  HistoryItem,
  Source,
  SuggestionsResponse,
  UIMessage,
  UploadResponse,
  Preferences,
} from "@/lib/types";

const MAX_MESSAGE_LENGTH = 4000;

function parseSources(sourcesJson: string): Source[] {
  try {
    const parsed = JSON.parse(sourcesJson) as unknown;
    return Array.isArray(parsed) ? (parsed as Source[]) : [];
  } catch {
    return [];
  }
}

export function useChat(initialThreadId: string | null = null) {
  const langCtx = useContext(LanguageContext);
  const locale = langCtx?.locale ?? "en";

  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(initialThreadId);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const fetchSuggestions = useCallback((question: string, answer: string) => {
    // Fire-and-forget; chips simply don't render if this fails.
    apiPost<SuggestionsResponse>("/suggestions", { question, answer })
      .then((data) => setSuggestions(data.suggestions ?? []))
      .catch(() => setSuggestions([]));
  }, []);

  const send = useCallback(
    async (text: string, attachedFile?: File | null): Promise<void> => {
      const trimmed = text.trim();
      if (!trimmed || loading || trimmed.length > MAX_MESSAGE_LENGTH) return;

      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        utteranceRef.current = null;
      }

      setSuggestions([]);
      const userMsg: UIMessage = {
        type: "user",
        text: trimmed,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      let extraContext = "";
      if (attachedFile) {
        try {
          const formData = new FormData();
          formData.append("file", attachedFile);
          const upload = await apiUpload<UploadResponse>("/upload", formData);
          if (upload.extracted_text) {
            extraContext = `\n\n[Attached file: ${upload.filename}]\n${upload.extracted_text.slice(0, 2000)}`;
          }
        } catch {
          // continue without the attachment context
        }
      }

      try {
        const data = await apiPost<ChatResponse>("/chat", {
          thread_id: currentThreadId,
          message: trimmed + extraContext,
          locale: locale,
        });
        if (data.thread_id) setCurrentThreadId(data.thread_id);

        const botMsg: UIMessage = {
          type: "bot",
          text: data.answer || "No answer returned.",
          timestamp: new Date().toISOString(),
          sources: data.sources ?? [],
          mode: data.mode ?? "unknown",
        };
        setMessages((prev) => [...prev, botMsg]);
        fetchSuggestions(trimmed, botMsg.text);

        // Web Speech Synthesis playback if enabled in preferences
        apiGet<Preferences>("/user/me")
          .then((prefs) => {
            if (prefs && prefs.voice_responses) {
              const cleanText = (data.answer || "")
                .replace(/[*#`_-]/g, "")
                .replace(/\[Attached file:[^\]]+\]/g, "")
                .slice(0, 1000);
              
              if (typeof window !== "undefined" && window.speechSynthesis) {
                const utterance = new SpeechSynthesisUtterance(cleanText);
                utteranceRef.current = utterance;

                utterance.onstart = () => {
                  setIsSpeaking(true);
                };
                utterance.onend = () => {
                  setIsSpeaking(false);
                  utteranceRef.current = null;
                };
                utterance.onerror = () => {
                  setIsSpeaking(false);
                  utteranceRef.current = null;
                };

                window.speechSynthesis.cancel();
                window.speechSynthesis.speak(utterance);
              }
            }
          })
          .catch(() => {});
      } catch (err) {
        const text =
          err instanceof ApiError && err.status === 429
            ? "You're sending messages too quickly. Please wait a minute and try again."
            : "Backend error. Please try again.";
        setMessages((prev) => [
          ...prev,
          { type: "bot", text, timestamp: new Date().toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [currentThreadId, loading, fetchSuggestions],
  );

  const openThread = useCallback(async (threadId: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      utteranceRef.current = null;
    }
    setCurrentThreadId(threadId);
    setSuggestions([]);
    try {
      const history = await apiGet<HistoryItem[]>(`/thread/${threadId}`);
      setMessages(
        history.map((m) => ({
          type: m.role === "user" ? "user" : "bot",
          text: m.content,
          timestamp: String(m.timestamp ?? ""),
          sources: m.role === "assistant" ? parseSources(m.sources_json) : undefined,
          mode: m.mode || undefined,
        })),
      );
    } catch {
      setMessages([]);
    }
  }, []);

  const newChat = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      utteranceRef.current = null;
    }
    setCurrentThreadId(null);
    setMessages([]);
    setSuggestions([]);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    utteranceRef.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    messages,
    loading,
    currentThreadId,
    suggestions,
    isSpeaking,
    send,
    openThread,
    newChat,
    stopSpeaking,
    MAX_MESSAGE_LENGTH,
  };
}
