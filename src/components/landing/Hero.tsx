import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useAuth } from "@/context/AuthContext";
import isroRegistered from "@/assets/isro-registered.jpg";

export function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <GlassPanel className="overflow-hidden p-6 sm:p-10">
      <div className="flex flex-col-reverse items-center gap-10 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex-1"
        >
          <h1 className="mb-4 text-4xl leading-tight font-bold text-accent-400 sm:text-5xl">
            Intelligence from Orbit,
            <br />
            Delivered by AI
          </h1>
          <p className="mb-8 max-w-xl text-lg text-slate-300">
            Astra-Q simplifies access to ISRO&apos;s remote sensing datasets and
            satellite-derived products through natural, conversational queries —
            powered by hybrid RAG and knowledge-graph reasoning.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={() => navigate(user ? "/chat" : "/signup")}>
              <Rocket size={18} /> Try Astra-Q
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate("/learn-more")}>
              <BookOpen size={18} /> Learn more
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md flex-1 lg:max-w-none"
        >
          <img
            src={isroRegistered}
            alt="ISRO satellite imagery"
            width={700}
            height={500}
            loading="lazy"
            className="w-full rounded-2xl border border-white/10 bg-black mix-blend-lighten shadow-2xl"
          />
        </motion.div>
      </div>
    </GlassPanel>
  );
}
