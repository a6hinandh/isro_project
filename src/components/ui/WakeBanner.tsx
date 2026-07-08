import { AnimatePresence, motion } from "framer-motion";
import { Rocket } from "lucide-react";

/** Cold-start banner shown while the free-tier backend spins up. */
export function WakeBanner({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="glass mx-auto mb-4 flex max-w-xl items-center gap-3 rounded-xl border-accent-400/30 px-4 py-3 text-sm text-accent-300"
          role="status"
        >
          <Rocket size={16} className="animate-pulse" />
          Warming up the engines… the server was asleep and may take up to a
          minute to respond.
        </motion.div>
      )}
    </AnimatePresence>
  );
}
