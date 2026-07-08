import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";

/** Standard page frame: sticky navbar + animated content area. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6"
      >
        {children}
      </motion.main>
    </div>
  );
}
