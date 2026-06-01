import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { defaultMenu, CATEGORIES } from "@/data/menuData";
import { openWhatsapp } from "@/lib/whatsapp";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Eden Plage Lomé" },
      { name: "description", content: "Découvrez notre carte : entrées, grillades, fruits de mer, burgers, cocktails maison et desserts au bord de la mer." },
      { property: "og:title", content: "Menu — Eden Plage" },
      { property: "og:description", content: "Notre carte complète au bord de l'océan." },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuPage,
});

const HERO = "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=80";

function MenuPage() {
  const [active, setActive] = useState<string>(CATEGORIES[0]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof defaultMenu> = {};
    for (const c of CATEGORIES) map[c] = [];
    defaultMenu.forEach((m) => { if (map[m.category]) map[m.category].push(m); });
    return map;
  }, []);

  const scrollTo = (cat: string) => {
    setActive(cat);
    const el = document.getElementById(`cat-${cat}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO})` }} />
        <div className="absolute inset-0 bg-[var(--ocean)]/70" />
        <div className="relative text-center text-white px-6 pt-20">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--sand)]">La carte</p>
          <h1 className="mt-3 text-5xl md:text-7xl">Notre Menu</h1>
          <p className="mt-4 max-w-xl mx-auto text-white/85 font-[family-name:var(--font-accent)] italic text-lg">
            Saveurs du bord de mer, fraîcheur du marché, ambiance de paradis.
          </p>
        </div>
      </section>

      <div className="sticky top-16 md:top-20 z-30 bg-[var(--seafoam)]/95 backdrop-blur border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-3 overflow-x-auto">
          <nav className="flex gap-1 py-3 whitespace-nowrap">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => scrollTo(c)}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                  active === c ? "bg-[var(--ocean)] text-white" : "text-[var(--ocean)] hover:bg-[var(--sand)]/50"
                }`}
              >
                {c}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {CATEGORIES.map((cat) => (
          <section key={cat} id={`cat-${cat}`} className="scroll-mt-40">
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-5xl text-[var(--ocean)]">{cat}</h2>
              <svg width="120" height="10" viewBox="0 0 120 10" className="mx-auto mt-3">
                <path d="M0,5 Q30,0 60,5 T120,5" stroke="#E8652A" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {grouped[cat].map((item, i) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: (i % 4) * 0.05, duration: 0.4 }}
                  className="flex gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-lg transition-all"
                >
                  {item.image && (
                    <img src={item.image} alt={item.name} loading="lazy"
                      className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-[var(--ocean)]">{item.name}</h3>
                      <span className="font-[family-name:var(--font-accent)] italic text-[var(--coral)] text-lg whitespace-nowrap">
                        {item.price.toLocaleString("fr-FR")} FCFA
                      </span>
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <button
        onClick={() => openWhatsapp("Bonjour Eden Plage, je voudrais passer une commande à emporter / livraison : ")}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3.5 rounded-full bg-[var(--coral)] text-white font-semibold shadow-2xl hover:scale-105 active:scale-95 transition-transform"
      >
        <MessageCircle size={20} />
        Commander via WhatsApp
      </button>
    </div>
  );
}
