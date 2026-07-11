import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronRight, ArrowRight, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const appLinks = [
  { to: "/chat", label: "Chat" },
  { to: "/explorer", label: "Explorer" },
  { to: "/satellites", label: "Satellites" },
  { to: "/search", label: "Search" },
];

const publicLinks = [
  { id: "features", label: "Features" },
  { id: "query-lifecycle", label: "Query Lifecycle" },
  { to: "/learn-more", label: "Architecture" },
  { id: "faq", label: "FAQ" },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleScrollTo = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // If we are not on the landing page, navigate home first then scroll
      navigate(`/#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full px-4 pt-4 sm:px-6 md:px-8"
    >
      <div className="glass-strong mx-auto flex max-w-[85rem] items-center justify-between gap-4 rounded-2xl px-5 py-2.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] md:px-6 md:py-3">
        {/* Brand Logo & Heading */}
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-accent-400 to-nebula-400 opacity-20 blur-sm transition duration-300 group-hover:opacity-75" />
            <img
              src="/logo.png"
              alt="AstraQ logo"
              className="relative h-8 w-8 rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="bg-gradient-to-r from-white via-slate-100 to-accent-300 bg-clip-text text-xl font-bold tracking-tight text-transparent transition-all duration-300 group-hover:to-nebula-300">
            AstraQ
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1.5 md:flex" aria-label="Main">
          {user ? (
            appLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/5",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavbarIndicator"
                        className="absolute inset-0 -z-10 rounded-lg bg-accent-500/10 border border-accent-500/20"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </>
                )}
              </NavLink>
            ))
          ) : (
            publicLinks.map((link) =>
              link.to ? (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.id}
                  onClick={() => handleScrollTo(link.id!)}
                  className="cursor-pointer rounded-lg px-3.5 py-2 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-100"
                >
                  {link.label}
                </button>
              )
            )
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-1 pl-3">
              <span className="max-w-40 truncate text-xs font-medium text-slate-400">
                {user.email}
              </span>
              <div className="h-4 w-px bg-white/10" />
              <Button
                variant="ghost"
                size="sm"
                className="text-slate-400 hover:text-red-400 hover:bg-red-500/10"
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Button
                variant="nebula"
                size="sm"
                className="relative overflow-hidden group animate-none"
                onClick={() => navigate("/chat")}
              >
                <span className="relative z-10 flex items-center gap-1">
                  Launch AstraQ
                  <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Button>
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-accent-300"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="relative overflow-hidden group font-semibold"
                onClick={() => navigate("/signup")}
              >
                <span className="relative z-10 flex items-center gap-1">
                  Sign Up
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="cursor-pointer rounded-lg p-2 text-slate-300 hover:bg-white/10 md:hidden transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 mt-2 rounded-2xl glass-strong border border-white/10 p-5 shadow-2xl backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              {user && (
                <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500/10 text-accent-400">
                    <User size={16} />
                  </div>
                  <span className="max-w-56 truncate text-sm font-medium text-slate-200">
                    {user.email}
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-1">
                {user ? (
                  appLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        cn(
                          "rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                          isActive
                            ? "bg-accent-500/10 text-accent-300"
                            : "text-slate-300 hover:bg-white/5 hover:text-white",
                        )
                      }
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  ))
                ) : (
                  publicLinks.map((link) =>
                    link.to ? (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="rounded-lg px-3 py-2.5 text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                        onClick={() => setMobileOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <button
                        key={link.id}
                        onClick={() => handleScrollTo(link.id!)}
                        className="text-left rounded-lg px-3 py-2.5 text-base font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        {link.label}
                      </button>
                    )
                  )
                )}
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                {user ? (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="nebula"
                      size="md"
                      className="w-full justify-between"
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/chat");
                      }}
                    >
                      Launch AstraQ
                      <ChevronRight size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="md"
                      className="w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 justify-center"
                      onClick={() => {
                        setMobileOpen(false);
                        handleLogout();
                      }}
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/login");
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="primary"
                      className="w-full"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
