import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, Share2, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/features/chat/useChat";
import { useThreads } from "@/features/chat/useThreads";
import { ChatSidebar, type ChatModalName } from "@/features/chat/ChatSidebar";
import { MessageList } from "@/features/chat/MessageList";
import { ChatInput } from "@/features/chat/ChatInput";
import { FollowUpChips } from "@/features/chat/FollowUpChips";
import { ExportMenu } from "@/features/chat/ExportMenu";
import { ShareDialog } from "@/features/chat/ShareDialog";
import { apiGet } from "@/lib/api";
import type { Preferences } from "@/lib/types";
import {
  FavoritesModal,
  FeedbackModal,
  HelpModal,
  SettingsModal,
} from "@/features/chat/ChatModals";

export default function ChatPage() {
  const navigate = useNavigate();
  const params = useParams<{ threadId?: string }>();
  const location = useLocation();
  const prefill = (location.state as { prefill?: string } | null)?.prefill ?? "";
  const { user, logout } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openModal, setOpenModal] = useState<ChatModalName | "share" | null>(null);
  const [displayName, setDisplayName] = useState("");

  const chat = useChat(null);
  const { threads, favorites, loading: threadsLoading, refresh, remove, toggleFavorite } =
    useThreads();

  useEffect(() => {
    apiGet<Preferences>("/user/me")
      .then((prefs) => {
        if (prefs?.display_name) {
          setDisplayName(prefs.display_name);
        } else {
          setDisplayName("");
        }
      })
      .catch(() => {});
  }, [openModal]);

  useEffect(() => {
    if (params.threadId && params.threadId !== chat.currentThreadId) {
      void chat.openThread(params.threadId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.threadId]);

  const handleSend = async (text: string, file: File | null) => {
    await chat.send(text, file);
    void refresh();
  };

  const handleOpenThread = (threadId: string) => {
    void chat.openThread(threadId);
    navigate(`/chat/${threadId}`, { replace: true });
  };

  const handleNewChat = () => {
    chat.newChat();
    navigate("/chat", { replace: true });
  };

  const handleDeleteThread = (threadId: string) => {
    void remove(threadId);
    if (chat.currentThreadId === threadId) handleNewChat();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const currentThread = threads.find((t) => t.thread_id === chat.currentThreadId);
  const isFavorite = currentThread?.is_favorite ?? false;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - hidden on mobile unless mobileOpen */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 md:relative md:z-auto transition-transform duration-200 ease-out",
        mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      )}>
        <ChatSidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((v) => !v)}
          threads={threads}
          threadsLoading={threadsLoading}
          currentThreadId={chat.currentThreadId}
          onNewChat={() => { handleNewChat(); setMobileOpen(false); }}
          onOpenThread={(id) => { handleOpenThread(id); setMobileOpen(false); }}
          onDeleteThread={handleDeleteThread}
          onOpenModal={(name) => { setOpenModal(name); setMobileOpen(false); }}
          userEmail={user?.email ?? null}
          displayName={displayName}
          onLogout={handleLogout}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-strong flex items-center justify-between rounded-none border-x-0 border-t-0 px-3 py-3 sm:px-5 sm:py-3.5"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="cursor-pointer rounded-lg p-2 text-slate-300 hover:bg-white/10 md:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <img
              src="/logo.png"
              alt="AstraQ logo"
              className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg object-cover"
            />
            <h1 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-base sm:text-lg font-extrabold tracking-tight text-transparent truncate max-w-[150px] sm:max-w-none">
              {currentThread?.title || "AstraQ"}
            </h1>
          </div>
          <div className="flex items-center gap-1">
            {chat.currentThreadId && (
              <>
                <button
                  onClick={() => void toggleFavorite(chat.currentThreadId!)}
                  title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  className="cursor-pointer rounded-xl p-2 text-slate-400 transition-all hover:bg-white/10 hover:scale-105"
                >
                  <Star size={18} className={isFavorite ? "fill-star text-star" : ""} />
                </button>
                <button
                  onClick={() => setOpenModal("share")}
                  title="Share conversation"
                  aria-label="Share conversation"
                  className="cursor-pointer rounded-xl p-2 text-slate-400 transition-all hover:bg-white/10 hover:text-white hover:scale-105 hidden sm:block"
                >
                  <Share2 size={18} />
                </button>
              </>
            )}
            <ExportMenu
              messages={chat.messages}
              threadTitle={currentThread?.title ?? "AstraQ conversation"}
            />
          </div>
        </motion.header>

        <MessageList
          messages={chat.messages}
          loading={chat.loading}
          onStarterClick={(prompt) => void handleSend(prompt, null)}
          displayName={displayName}
        />

        <FollowUpChips
          suggestions={chat.suggestions}
          onSelect={(s) => void handleSend(s, null)}
          disabled={chat.loading}
        />

        <ChatInput
          key={prefill || "default"}
          initialValue={prefill}
          onSend={(text, file) => void handleSend(text, file)}
          loading={chat.loading}
          maxLength={chat.MAX_MESSAGE_LENGTH}
          isSpeaking={chat.isSpeaking}
          onStopSpeaking={chat.stopSpeaking}
        />
      </div>

      {/* Modals */}
      <SettingsModal isOpen={openModal === "settings"} onClose={() => setOpenModal(null)} />
      <HelpModal isOpen={openModal === "help"} onClose={() => setOpenModal(null)} />
      <FeedbackModal
        isOpen={openModal === "feedback"}
        onClose={() => setOpenModal(null)}
        threadId={chat.currentThreadId}
      />
      <FavoritesModal
        isOpen={openModal === "favorites"}
        onClose={() => setOpenModal(null)}
        favorites={favorites}
        onOpenThread={handleOpenThread}
      />
      <ShareDialog
        isOpen={openModal === "share"}
        onClose={() => setOpenModal(null)}
        threadId={chat.currentThreadId}
      />
    </div>
  );
}
