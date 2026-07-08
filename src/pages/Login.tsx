import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FirebaseError } from "firebase/app";
import { LockKeyhole, Mail, Rocket, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { WakeBanner } from "@/components/ui/WakeBanner";
import { useWakeBackend } from "@/hooks/useWakeBackend";
import { mapAuthError } from "@/lib/authErrors";

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
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden lg:block"
        >
          <h1 className="mb-4 text-4xl leading-tight font-bold text-white">
            Welcome Back
            <br />
            <span className="text-accent-400">Sign in to your account</span>
          </h1>
          <p className="max-w-md text-slate-300">
            Enter your email and password to access Astra-Q. Don&apos;t have an
            account yet? Create one — it takes less than a minute.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <WakeBanner visible={backendWaking} />
          <GlassPanel className="p-8">
            <div className="mb-6 text-center">
              <div className="glass mx-auto mb-4 flex size-14 items-center justify-center rounded-full">
                <LockKeyhole size={24} className="text-accent-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Secure Login</h2>
              <p className="text-sm text-slate-400">Enter your credentials to continue</p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 px-3.5 py-2.5 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="pl-9"
                  required
                />
              </div>
              <div className="relative">
                <LockKeyhole size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500" />
                <Input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="pl-9"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                <Rocket size={18} />
                {loading ? "Signing in…" : "Access Granted"}
              </Button>
            </form>

            <div className="mt-5 text-center text-sm">
              <Link
                to="/signup"
                className="inline-flex items-center gap-1 text-accent-300 transition-colors hover:text-accent-400"
              >
                <Sparkles size={14} /> Create an account
              </Link>
            </div>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
}
