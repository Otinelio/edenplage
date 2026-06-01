import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/menu", label: "Menu" },
  { to: "/galerie", label: "Galerie" },
  { to: "/evenements", label: "Événements" },
  { to: "/reserver", label: "Réserver" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const isHome = loc.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc.pathname]);

  const solid = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid ? "bg-[var(--ocean)] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-none text-white">
          <span className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold tracking-wide">
            EDEN PLAGE
          </span>
          <svg width="80" height="6" viewBox="0 0 80 6" className="-mt-1">
            <path d="M0,3 Q20,0 40,3 T80,3" stroke="#E8652A" strokeWidth="1.5" fill="none" />
          </svg>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = loc.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative px-4 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors ${
                  active ? "text-white" : ""
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 rounded-full bg-[var(--coral)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/reserver"
            className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-[var(--coral)] text-white text-sm font-semibold hover:scale-105 active:scale-95 transition-transform shadow-md"
          >
            Réserver une table
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 text-white"
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[var(--ocean)] overflow-hidden border-t border-white/10"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="px-3 py-3 rounded-lg text-white hover:bg-white/10"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/reserver"
                className="mt-2 px-4 py-3 rounded-full bg-[var(--coral)] text-white text-center font-semibold"
              >
                Réserver une table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
