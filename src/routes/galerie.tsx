import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Eden Plage Lomé" },
      { name: "description", content: "Plongez dans l'univers d'Eden Plage : océan, plats, ambiance et soirées au Boulevard du Mono." },
      { property: "og:title", content: "Galerie — Eden Plage" },
      { property: "og:description", content: "L'univers visuel d'Eden Plage." },
      { property: "og:url", content: "/galerie" },
    ],
    links: [{ rel: "canonical", href: "/galerie" }],
  }),
  component: GalleryPage,
});

type Cat = "Tous" | "Plats & Boissons" | "Vue Mer" | "Ambiance & Soirées" | "Équipe";
const CATS: Cat[] = ["Tous", "Plats & Boissons", "Vue Mer", "Ambiance & Soirées", "Équipe"];

type Photo = { src: string; cat: Exclude<Cat, "Tous">; alt: string };

const PHOTOS: Photo[] = [
  { src: "https://images.unsplash.com/photo-1535850579364-b58275fe2c45?auto=format&fit=crop&w=900&q=70", cat: "Plats & Boissons", alt: "Fruits de mer" },
  { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=70", cat: "Vue Mer", alt: "Plage" },
  { src: "https://images.unsplash.com/photo-1571266028243-d220c6cbb6c2?auto=format&fit=crop&w=900&q=70", cat: "Ambiance & Soirées", alt: "Soirée" },
  { src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=70", cat: "Plats & Boissons", alt: "Dessert" },
  { src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=70", cat: "Vue Mer", alt: "Sunset" },
  { src: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?auto=format&fit=crop&w=900&q=70", cat: "Ambiance & Soirées", alt: "DJ Set" },
  { src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=70", cat: "Plats & Boissons", alt: "Grillades" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=70", cat: "Plats & Boissons", alt: "Table" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=70", cat: "Plats & Boissons", alt: "Cocktails" },
  { src: "https://images.unsplash.com/photo-1530021232320-687d8e3dba54?auto=format&fit=crop&w=900&q=70", cat: "Ambiance & Soirées", alt: "Feu" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=70", cat: "Plats & Boissons", alt: "Burger" },
  { src: "https://images.unsplash.com/photo-1499363536502-87642509e31b?auto=format&fit=crop&w=900&q=70", cat: "Vue Mer", alt: "Vagues" },
  { src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=70", cat: "Équipe", alt: "Équipe" },
  { src: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?auto=format&fit=crop&w=900&q=70", cat: "Équipe", alt: "Barman" },
  { src: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?auto=format&fit=crop&w=900&q=70", cat: "Ambiance & Soirées", alt: "Fête" },
  { src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=70", cat: "Plats & Boissons", alt: "Dessert 2" },
];

function GalleryPage() {
  const [active, setActive] = useState<Cat>("Tous");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = active === "Tous" ? PHOTOS : PHOTOS.filter((p) => p.cat === active);

  const next = () => setLightbox((i) => (i === null ? 0 : (i + 1) % filtered.length));
  const prev = () => setLightbox((i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length));

  return (
    <div>
      <section className="relative h-[55vh] min-h-[360px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80)` }} />
        <div className="absolute inset-0 bg-[var(--ocean)]/65" />
        <div className="relative text-center text-white px-6 pt-20">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--sand)]">Galerie</p>
          <h1 className="mt-3 text-5xl md:text-7xl">Notre Univers</h1>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATS.map((c) => (
            <button key={c} onClick={() => setActive(c)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                active === c ? "bg-[var(--coral)] text-white" : "bg-white text-[var(--ocean)] hover:bg-[var(--sand)]/50"
              }`}>
              {c}
            </button>
          ))}
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {filtered.map((p, i) => (
            <motion.button
              key={p.src + i}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % 8) * 0.04 }}
              onClick={() => setLightbox(i)}
              className="mb-4 w-full block break-inside-avoid overflow-hidden rounded-xl group relative">
              <img src={p.src} alt={p.alt} loading="lazy"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--ocean)]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10">
              <ChevronLeft size={28} />
            </button>
            <img src={filtered[lightbox].src} alt="" onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] object-contain rounded-xl" />
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-white/80 hover:text-white p-3 rounded-full bg-white/10">
              <ChevronRight size={28} />
            </button>
            <button onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2">
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
