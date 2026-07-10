import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  LogOut,
  MessageCirclePlus,
  Network,
  Satellite,
  Search,
  Settings,
  Star,
  Trash2,
  MessageSquareHeart,
  CircleHelp,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ThreadItem } from "@/lib/types";

export type ChatModalName = "settings" | "help" | "feedback" | "favorites";

interface ChatSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  threads: ThreadItem[];
  threadsLoading: boolean;
  currentThreadId: string | null;
  onNewChat: () => void;
  onOpenThread: (threadId: string) => void;
  onDeleteThread: (threadId: string) => void;
  onOpenModal: (name: ChatModalName) => void;
  userEmail: string | null;
  displayName?: string | null;
  onLogout: () => void;
}

const pageLinks = [
  { icon: Search, label: "Global Search", to: "/search" },
  { icon: Satellite, label: "Satellites", to: "/satellites" },
  { icon: Network, label: "KG Explorer", to: "/explorer" },
];

const modalLinks: { icon: typeof Star; label: string; name: ChatModalName }[] = [
  { icon: Star, label: "Favorites", name: "favorites" },
  { icon: Settings, label: "Settings", name: "settings" },
  { icon: CircleHelp, label: "Help", name: "help" },
  { icon: MessageSquareHeart, label: "Feedback", name: "feedback" },
];

export function ChatSidebar({
  collapsed,
  onToggleCollapse,
  threads,
  threadsLoading,
  currentThreadId,
  onNewChat,
  onOpenThread,
  onDeleteThread,
  onOpenModal,
  userEmail,
  displayName,
  onLogout,
}: ChatSidebarProps) {
  const navigate = useNavigate();

  return (
    <motion.aside
      animate={{ width: collapsed ? 56 : 280 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="glass-strong flex h-full shrink-0 flex-col overflow-hidden rounded-none border-y-0 border-l-0"
    >
      {/* Top bar */}
      <div className={cn("flex items-center gap-1 p-2.5", collapsed ? "flex-col" : "justify-between")}>
        {!collapsed && (
          <button
            onClick={onNewChat}
            className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-accent-500/20 to-accent-500/10 px-3.5 py-2.5 text-sm font-bold text-accent-300 transition-all hover:from-accent-500/30 hover:to-accent-500/15 hover:shadow-lg hover:shadow-accent-500/10"
          >
            <MessageCirclePlus size={16} /> New Chat
          </button>
        )}
        <button
          onClick={onToggleCollapse}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="cursor-pointer rounded-xl p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        {collapsed && (
          <button
            onClick={onNewChat}
            aria-label="New chat"
            className="cursor-pointer rounded-xl p-2 text-accent-300 transition-colors hover:bg-accent-500/15"
          >
            <MessageCirclePlus size={16} />
          </button>
        )}
      </div>

      {!collapsed && (
        <>
          {/* Thread list */}
          <div className="min-h-0 flex-1 overflow-y-auto px-2.5">
            {threadsLoading ? (
              <p className="py-4 text-center text-xs text-slate-500">Loading…</p>
            ) : threads.length === 0 ? (
              <p className="py-4 text-center text-xs text-slate-500">No conversations yet</p>
            ) : (
              <ul className="space-y-0.5">
                {threads.map((thread) => (
                  <li key={thread.thread_id} className="group flex items-center gap-1">
                    <button
                      onClick={() => onOpenThread(thread.thread_id)}
                      className={cn(
                        "flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 rounded-xl px-3 py-2 text-left text-[13px] transition-all",
                        currentThreadId === thread.thread_id
                          ? "bg-accent-500/15 text-white border border-accent-500/20 shadow-sm"
                          : "text-slate-300 hover:bg-white/8 border border-transparent",
                      )}
                    >
                      {thread.is_favorite && (
                        <Star size={12} className="shrink-0 fill-star text-star" />
                      )}
                      <span className="truncate">
                        {thread.title || thread.last_message || "Untitled"}
                      </span>
                    </button>
                    <button
                      onClick={() => onDeleteThread(thread.thread_id)}
                      aria-label={`Delete thread ${thread.title || "Untitled"}`}
                      className="cursor-pointer rounded-lg p-1.5 text-slate-500 opacity-0 transition-all group-hover:opacity-100 hover:bg-white/10 hover:text-red-400"
                    >
                      <Trash2 size={13} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Explore + modal menu */}
          <div className="border-t border-white/10 p-2.5">
            <p className="px-3 pt-1 pb-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              Explore
            </p>
            {pageLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.to)}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] text-slate-300 transition-all hover:bg-white/8 hover:text-white"
              >
                <item.icon size={15} /> {item.label}
              </button>
            ))}

            <div className="my-2 border-t border-white/5" />

            {modalLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => onOpenModal(item.name)}
                className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] text-slate-300 transition-all hover:bg-white/8 hover:text-white"
              >
                <item.icon size={15} /> {item.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* User section */}
      <div className={cn("border-t border-white/10 p-2.5", collapsed && "flex flex-col items-center gap-1")}>
        <button
          onClick={() => navigate("/")}
          title="Home"
          className={cn(
            "flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] text-slate-300 transition-all hover:bg-white/8 hover:text-white",
            collapsed ? "justify-center" : "w-full",
          )}
        >
          <Home size={15} /> {!collapsed && "Home"}
        </button>
        <div
          className={cn(
            "flex items-center gap-2 rounded-xl",
            collapsed ? "justify-center" : "mt-1 bg-white/5 px-3 py-2",
          )}
        >
          {!collapsed && (
            <>
              <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-500/15 text-accent-400">
                <User size={12} />
              </div>
              <span className="min-w-0 flex-1 truncate text-xs text-slate-400">{displayName || userEmail}</span>
            </>
          )}
          <button
            onClick={onLogout}
            title="Logout"
            aria-label="Logout"
            className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-red-400"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
