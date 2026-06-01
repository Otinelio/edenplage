import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, CheckCircle, X } from "lucide-react";
import { defaultMenu, CATEGORIES, type MenuItem } from "@/data/menuData";
import { lsGet, lsSet, LS_KEYS } from "@/lib/storage";

export const Route = createFileRoute("/spot/$spotId")({
  head: () => ({ meta: [{ title: "Commander — Eden Plage" }, { name: "robots", content: "noindex" }] }),
  component: SpotPage,
});

type CartLine = { id: string; qty: number };

function SpotPage() {
  const { spotId } = Route.useParams();
  const [items] = useState<MenuItem[]>(() => defaultMenu);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [activeCat, setActiveCat] = useState<string>(CATEGORIES[0]);
  const [sent, setSent] = useState(false);

  const lineMap = useMemo(() => new Map(cart.map((c) => [c.id, c.qty])), [cart]);
  const totalQty = cart.reduce((s, c) => s + c.qty, 0);
  const total = cart.reduce((s, c) => {
    const it = items.find((i) => i.id === c.id);
    return s + (it ? it.price * c.qty : 0);
  }, 0);

  const setQty = (id: string, qty: number) => {
    setCart((prev) => {
      const next = prev.filter((p) => p.id !== id);
      if (qty > 0) next.push({ id, qty });
      return next;
    });
  };

  const sendOrder = () => {
    if (!guestName.trim() || cart.length === 0) return;
    const orders = lsGet<any[]>(LS_KEYS.ORDERS, []);
    orders.push({
      id: `o_${Date.now()}`,
      spotId,
      guestName: guestName.trim(),
      items: cart.map((c) => {
        const it = items.find((i) => i.id === c.id)!;
        return { id: it.id, name: it.name, price: it.price, qty: c.qty };
      }),
      total,
      status: "pending",
      time: new Date().toISOString(),
    });
    lsSet(LS_KEYS.ORDERS, orders);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--sand)] via-[var(--seafoam)] to-[var(--turquoise)]/30 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md">
          <div className="inline-flex p-5 rounded-full bg-[var(--turquoise)]/15 text-[var(--turquoise)] mb-4">
            <CheckCircle size={56} />
          </div>
          <h1 className="text-3xl text-[var(--ocean)]">Commande envoyée !</h1>
          <p className="mt-3 text-[var(--muted-foreground)]">Notre équipe arrive bientôt à votre spot {spotId}.</p>
          <svg viewBox="0 0 200 30" className="mt-6 w-full">
            <path d="M0,15 Q25,0 50,15 T100,15 T150,15 T200,15" stroke="#0E9F8E" strokeWidth="2" fill="none">
              <animate attributeName="d"
                values="M0,15 Q25,0 50,15 T100,15 T150,15 T200,15; M0,15 Q25,30 50,15 T100,15 T150,15 T200,15; M0,15 Q25,0 50,15 T100,15 T150,15 T200,15"
                dur="2s" repeatCount="indefinite" />
            </path>
          </svg>
          <button onClick={() => { setSent(false); setCart([]); }} className="mt-6 px-6 py-2.5 rounded-full bg-[var(--coral)] text-white font-semibold">
            Nouvelle commande
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--sand)]/60 via-[var(--seafoam)] to-[var(--seafoam)] pb-32">
      <header className="bg-[var(--ocean)] text-white px-6 py-6 sticky top-0 z-30 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl">EDEN PLAGE</h1>
            <p className="text-xs uppercase tracking-widest text-[var(--sand)]">Spot {spotId}</p>
          </div>
          <button onClick={() => setDrawer(true)} className="relative p-3 rounded-full bg-[var(--coral)]">
            <ShoppingCart size={22} />
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-[var(--coral)] text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="sticky top-[88px] z-20 bg-[var(--seafoam)]/95 backdrop-blur border-b px-3 overflow-x-auto">
        <div className="flex gap-2 py-3 whitespace-nowrap">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => {
              setActiveCat(c);
              document.getElementById(`s-${c}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full ${activeCat === c ? "bg-[var(--ocean)] text-white" : "bg-white text-[var(--ocean)]"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {CATEGORIES.map((cat) => (
          <section key={cat} id={`s-${cat}`} className="scroll-mt-44">
            <h2 className="text-2xl text-[var(--ocean)] mb-3">{cat}</h2>
            <div className="space-y-3">
              {items.filter((i) => i.category === cat && i.available).map((it) => {
                const qty = lineMap.get(it.id) ?? 0;
                return (
                  <div key={it.id} className="flex gap-3 p-3 bg-white rounded-xl shadow-sm">
                    {it.image && (
                      <img src={it.image} alt="" loading="lazy" className="w-20 h-20 object-cover rounded-lg shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--ocean)]">{it.name}</h3>
                      <p className="text-xs text-[var(--muted-foreground)] line-clamp-2">{it.description}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-[family-name:var(--font-accent)] italic text-[var(--coral)]">
                          {it.price.toLocaleString("fr-FR")} FCFA
                        </span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => setQty(it.id, Math.max(0, qty - 1))}
                            className="w-8 h-8 rounded-full bg-[var(--sand)] text-[var(--ocean)] disabled:opacity-40"
                            disabled={qty === 0}>
                            <Minus size={14} className="mx-auto" />
                          </button>
                          <span className="w-6 text-center font-semibold">{qty}</span>
                          <button onClick={() => setQty(it.id, qty + 1)}
                            className="w-8 h-8 rounded-full bg-[var(--coral)] text-white">
                            <Plus size={14} className="mx-auto" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)} className="fixed inset-0 bg-black/50 z-40" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl text-[var(--ocean)]">Votre commande</h2>
                <button onClick={() => setDrawer(false)} className="p-2"><X /></button>
              </div>
              {cart.length === 0 ? (
                <p className="text-center py-12 text-[var(--muted-foreground)]">Votre panier est vide</p>
              ) : (
                <>
                  <div className="space-y-3">
                    {cart.map((c) => {
                      const it = items.find((i) => i.id === c.id)!;
                      return (
                        <div key={c.id} className="flex justify-between items-center py-2 border-b">
                          <div className="flex-1">
                            <p className="font-semibold text-[var(--ocean)]">{it.name}</p>
                            <p className="text-xs text-[var(--muted-foreground)]">× {c.qty}</p>
                          </div>
                          <span className="font-[family-name:var(--font-accent)] italic text-[var(--coral)]">
                            {(it.price * c.qty).toLocaleString("fr-FR")} FCFA
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex justify-between text-lg font-bold text-[var(--ocean)]">
                    <span>Total</span>
                    <span>{total.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                  <input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Votre prénom"
                    className="mt-5 w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--coral)]" />
                  <button onClick={sendOrder} disabled={!guestName.trim()}
                    className="mt-3 w-full py-3.5 rounded-full bg-[var(--coral)] text-white font-semibold disabled:opacity-50">
                    Envoyer ma commande
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
