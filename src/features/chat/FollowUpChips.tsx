import { AnimatePresence, motion } from "framer-motion";

interface FollowUpChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
  disabled?: boolean;
}

export function FollowUpChips({ suggestions, onSelect, disabled }: FollowUpChipsProps) {
  return (
    <AnimatePresence>
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="flex flex-wrap gap-2 px-4 pb-2 sm:px-6"
        >
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onSelect(s)}
              disabled={disabled}
              className="glass cursor-pointer rounded-full px-3 py-1.5 text-xs text-accent-300 transition-colors hover:border-accent-400/40 hover:text-accent-200 disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
