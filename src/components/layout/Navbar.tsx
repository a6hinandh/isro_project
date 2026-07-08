import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const appLinks = [
  { to: "/chat", label: "Chat" },
  { to: "/explorer", label: "Explorer" },
  { to: "/satellites", label: "Satellites" },
  { to: "/search", label: "Search" },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      "rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors",
      isActive
        ? "bg-accent-500/15 text-accent-300"
        : "text-slate-300 hover:bg-white/10 hover:text-white",
    );

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="glass-strong sticky top-0 z-40 border-x-0 border-t-0"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <img src="/logo.jpg" alt="Astra-Q logo" className="h-8 w-8 rounded-lg object-cover" />
          <span className="text-lg font-bold text-white">Astra-Q</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {user &&
            appLinks.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClasses}>
                {link.label}
              </NavLink>
            ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <span className="max-w-44 truncate text-xs text-slate-400">{user.email}</span>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
              <Button size="sm" onClick={() => navigate("/chat")}>
                Launch Astra-Q
              </Button>
            </>
          ) : (
            <>
              <Button variant="secondary" size="sm" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button size="sm" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </div>

        <button
          className="cursor-pointer rounded-lg p-2 text-slate-300 hover:bg-white/10 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="overflow-hidden border-t border-white/10 px-4 pb-4 md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-1 pt-3">
            {user &&
              appLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={navLinkClasses}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            {user ? (
              <Button variant="secondary" size="sm" className="mt-2" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <div className="mt-2 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </motion.nav>
      )}
    </motion.header>
  );
}
