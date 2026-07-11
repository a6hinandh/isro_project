import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import isroRegistered from "@/assets/isro-registered.jpg";

export function Hero() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-2 pb-10 md:pt-4 md:pb-14 lg:pt-6 lg:pb-16">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
        
        {/* Left Column: Headline and Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="bg-gradient-to-r from-white via-slate-100 to-accent-300 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl md:text-6xl">
            {t.hero.headline1}
            <br />
            <span className="bg-gradient-to-r from-accent-400 to-nebula-400 bg-clip-text">
              {t.hero.headline2}
            </span>
          </h1>

          <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg max-w-2xl">
            {t.hero.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button
              size="lg"
              className="relative overflow-hidden group font-semibold"
              onClick={() => navigate(user ? "/chat" : "/signup")}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Rocket size={18} />
                {t.hero.tryAstraQ}
                <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </span>
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/learn-more")}
            >
              <BookOpen size={18} /> {t.hero.learnMore}
            </Button>
          </div>
        </motion.div>

        {/* Right Column: Visual Preview Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative flex w-full max-w-[500px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-space-900/40 p-4 shadow-[0_24px_50px_rgba(0,0,0,0.5)] backdrop-blur-md"
        >
          {/* Subtle glow layer behind image */}
          <div className="absolute inset-0 -z-10 rounded-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-500/10 via-transparent to-transparent opacity-50" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-accent-500/20 to-nebula-500/20 opacity-30 blur-sm" />
            <img
              src={isroRegistered}
              alt="AstraQ satellite visualization"
              width={700}
              height={500}
              loading="lazy"
              className="relative w-full rounded-2xl bg-black object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
