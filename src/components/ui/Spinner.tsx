import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block size-5 animate-spin rounded-full border-2 border-white/20 border-t-accent-400",
        className,
      )}
    />
  );
}

/** Three-dot typing indicator for chat. */
export function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1" role="status" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 animate-bounce rounded-full bg-slate-400"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </span>
  );
}
