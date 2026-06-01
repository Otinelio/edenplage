import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Clock } from "lucide-react";
import { WaveDivider } from "./WaveDivider";

export function Footer() {
  return (
    <footer className="relative bg-[var(--ocean)] text-white mt-24">
      <div className="absolute -top-[1px] inset-x-0 -translate-y-full">
        <WaveDivider color="#1A3A5C" />
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-[family-name:var(--font-heading)] text-3xl">EDEN PLAGE</h3>
          <p className="mt-3 text-white/70 font-[family-name:var(--font-accent)] italic text-lg">
            Le paradis au bord de la mer
          </p>
          <svg width="120" height="8" viewBox="0 0 120 8" className="mt-2">
            <path d="M0,4 Q30,0 60,4 T120,4" stroke="#E8652A" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-white/60 mb-4">Navigation</h4>
          <ul className="space-y-2 text-white/85">
            <li><Link to="/" className="hover:text-[var(--coral)]">Accueil</Link></li>
            <li><Link to="/menu" className="hover:text-[var(--coral)]">Menu</Link></li>
            <li><Link to="/galerie" className="hover:text-[var(--coral)]">Galerie</Link></li>
            <li><Link to="/evenements" className="hover:text-[var(--coral)]">Événements</Link></li>
            <li><Link to="/reserver" className="hover:text-[var(--coral)]">Réserver</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--coral)]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-widest text-white/60 mb-4">Nous trouver</h4>
          <p className="flex items-start gap-2 text-white/85">
            <MapPin className="w-4 h-4 mt-1 shrink-0 text-[var(--coral)]" />
            Boulevard du Mono, Lomé, Togo
          </p>
          <p className="mt-3 flex items-start gap-2 text-white/85">
            <Clock className="w-4 h-4 mt-1 shrink-0 text-[var(--coral)]" />
            Tous les jours 10h00 – 23h00
          </p>
          <div className="flex gap-3 mt-5">
            <a href="https://instagram.com/edenplagelome2021" target="_blank" rel="noreferrer"
               className="p-2 rounded-full bg-white/10 hover:bg-[var(--coral)] transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"
               className="p-2 rounded-full bg-white/10 hover:bg-[var(--coral)] transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 text-xs text-white/50 text-center">
          © {new Date().getFullYear()} Eden Plage — Boulevard du Mono, Lomé. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
