import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FirebaseError } from "firebase/app";
import { LockKeyhole, Mail, UserRoundPlus, ChevronRight, BrainCircuit, Database, Mic } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { mapSignupError } from "@/lib/authErrors";

const perks = [
  { icon: BrainCircuit, label: "RAG-powered document search", color: "text-accent-400" },
  { icon: Database, label: "Knowledge graph exploration", color: "text-nebula-400" },
  { icon: Mic, label: "Voice & document uploads", color: "text-star" },
];

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password);
      navigate("/chat");
    } catch (err) {
      setError(mapSignupError(err instanceof FirebaseError ? err.code : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-12 sm:px-6">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Branding */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <h1 className="bg-gradient-to-r from-white via-slate-100 to-accent-300 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl">
              Start Exploring
              <br />
              <span className="bg-gradient-to-r from-accent-400 to-nebula-400 bg-clip-text">
                with AstraQ.
              </span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
              Create your free account and get instant access to AI-powered
              satellite data exploration.
            </p>

            <div className="mt-8 space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                What you get
              </p>
              {perks.map((perk) => (
                <motion.div
                  key={perk.label}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-3"
                >
                  <div className={`glass flex size-9 shrink-0 items-center justify-center rounded-xl ${perk.color}`}>
                    <perk.icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-slate-300">{perk.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-wider text-accent-400">
              <span className="rounded-md border border-accent-400/20 bg-accent-400/5 px-2 py-1">Free Forever</span>
              <span className="rounded-md border border-accent-400/20 bg-accent-400/5 px-2 py-1">No Credit Card</span>
              <span className="rounded-md border border-accent-400/20 bg-accent-400/5 px-2 py-1">Instant Access</span>
            </div>
          </motion.div>

          {/* Right Column: Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full"
          >
            <div className="glass-strong rounded-3xl border border-white/5 p-8 shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
              <div className="mb-8 text-center">
                <div className="glass mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl">
                  <UserRoundPlus size={24} className="text-accent-400" />
                </div>
                <h2 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-2xl font-extrabold text-transparent">
                  Create Account
                </h2>
                <p className="mt-1 text-sm text-slate-500">Join AstraQ in under a minute</p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mb-4 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <Mail size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="pl-10"
                    required
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="relative">
                    <LockKeyhole size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500" />
                    <Input
                      type="password"
                      name="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="pl-10"
                      required
                    />
                  </div>
                  <Input
                    type="password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full relative overflow-hidden group font-semibold" disabled={loading}>
                  <span className="relative z-10 flex items-center gap-2">
                    <UserRoundPlus size={18} />
                    {loading ? "Creating account…" : "Create Account"}
                    {!loading && <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />}
                  </span>
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <Link to="/login" className="text-accent-300 transition-colors hover:text-accent-400 font-medium">
                  Sign in
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
