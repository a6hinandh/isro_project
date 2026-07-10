import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FirebaseError } from "firebase/app";
import { LockKeyhole, Mail, Rocket, Sparkles, Satellite, ShieldCheck, MessageSquare } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { WakeBanner } from "@/components/ui/WakeBanner";
import { useWakeBackend } from "@/hooks/useWakeBackend";
import { mapAuthError } from "@/lib/authErrors";

const highlights = [
  {
    icon: Satellite,
    title: "MOSDAC Data Access",
    desc: "Query ISRO satellite datasets with natural language.",
    color: "text-accent-400",
    border: "border-accent-400/20",
    bg: "bg-accent-400/5",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    desc: "Firebase-authenticated sessions, encrypted per-user.",
    color: "text-green-400",
    border: "border-green-400/20",
    bg: "bg-green-400/5",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    desc: "Grounded answers with citations from real documentation.",
    color: "text-nebula-400",
    border: "border-nebula-400/20",
    bg: "bg-nebula-400/5",
  },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { backendWaking } = useWakeBackend();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/chat");
    } catch (err) {
      setError(mapAuthError(err instanceof FirebaseError ? err.code : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-4 py-12 sm:px-6">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* Left Column: Branding & highlights */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <h1 className="bg-gradient-to-r from-white via-slate-100 to-accent-300 bg-clip-text text-4xl font-extrabold leading-tight tracking-tight text-transparent sm:text-5xl">
              Welcome Back to
              <br />
              <span className="bg-gradient-to-r from-accent-400 to-nebula-400 bg-clip-text">
                AstraQ.
              </span>
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
              Sign in to continue exploring ISRO&apos;s satellite data with
              AI-powered conversational search.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              {highlights.map((h) => (
                <motion.div
                  key={h.title}
                  whileHover={{ x: 4 }}
                  className={`flex items-start gap-4 rounded-2xl border ${h.border} ${h.bg} p-4`}
                >
                  <div className={`glass flex size-10 shrink-0 items-center justify-center rounded-xl ${h.color}`}>
                    <h.icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{h.title}</h3>
                    <p className="text-xs text-slate-400">{h.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full"
          >
            <WakeBanner visible={backendWaking} />
            <div className="glass-strong rounded-3xl border border-white/5 p-8 shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
              <div className="mb-8 text-center">
                <div className="glass mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl">
                  <LockKeyhole size={24} className="text-accent-400" />
                </div>
                <h2 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-2xl font-extrabold text-transparent">
                  Secure Login
                </h2>
                <p className="mt-1 text-sm text-slate-500">Enter your credentials to continue</p>
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
                <div className="relative">
                  <LockKeyhole size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500" />
                  <Input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="pl-10"
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="w-full relative overflow-hidden group font-semibold" disabled={loading}>
                  <span className="relative z-10 flex items-center gap-2">
                    <Rocket size={18} />
                    {loading ? "Signing in…" : "Access Granted"}
                  </span>
                </Button>
              </form>

              <div className="mt-6 text-center text-sm">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1.5 text-accent-300 transition-colors hover:text-accent-400"
                >
                  <Sparkles size={14} /> Create an account
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
