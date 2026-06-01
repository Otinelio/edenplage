import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock, Bell, Trash2 } from "lucide-react";
import { lsGet, lsSet, LS_KEYS } from "@/lib/storage";

export const Route = createFileRoute("/reception")({
  head: () => ({ meta: [{ title: "Réception — Eden Plage" }, { name: "robots", content: "noindex" }] }),
  component: ReceptionPage,
});

type OrderItem = { id: string; name: string; price: number; qty: number };
type Order = {
  id: string; spotId: string; guestName: string; items: OrderItem[];
  total: number; status: "pending" | "confirmed" | "served"; time: string;
};

function ReceptionPage() {
  const [authed, setAuthed] = useState(false);
  if (!authed) return <PinGate keyName={LS_KEYS.RECEPTION_PIN} defaultPin="1234" onOk={() => setAuthed(true)} label="Réception" />;
  return <ReceptionDashboard />;
}

function PinGate({ keyName, defaultPin, onOk, label }: { keyName: string; defaultPin: string; onOk: () => void; label: string }) {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const submit = () => {
    const stored = lsGet<string>(keyName, defaultPin);
    if (pin === stored) onOk();
    else setErr("Code incorrect");
  };
  return (
    <div className="min-h-screen bg-[#0F2236] flex items-center justify-center px-6">
      <div className="bg-white/5 backdrop-blur border border-white/10 p-10 rounded-3xl text-center max-w-sm w-full">
        <h1 className="text-3xl text-white font-[family-name:var(--font-heading)]">Eden Plage</h1>
        <p className="text-[var(--turquoise)] text-sm uppercase tracking-widest mt-1">{label}</p>
        <input type="password" inputMode="numeric" value={pin}
          onChange={(e) => { setPin(e.target.value); setErr(""); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="••••"
          className="mt-8 w-full text-center text-2xl tracking-[0.5em] py-4 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:border-[var(--turquoise)]" />
        {err && <p className="text-red-400 text-sm mt-2">{err}</p>}
        <button onClick={submit} className="mt-4 w-full py-3 rounded-full bg-[var(--turquoise)] text-white font-semibold">
          Entrer
        </button>
      </div>
    </div>
  );
}

function ReceptionDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [highlight, setHighlight] = useState<Set<string>>(new Set());
  const prevIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const tick = () => {
      const all = lsGet<Order[]>(LS_KEYS.ORDERS, []);
      setOrders(all.slice().reverse());
      const ids = new Set(all.map((o) => o.id));
      const newOnes = [...ids].filter((id) => !prevIdsRef.current.has(id));
      if (prevIdsRef.current.size > 0 && newOnes.length > 0) {
        playChime();
        setHighlight((h) => {
          const next = new Set(h);
          newOnes.forEach((id) => next.add(id));
          return next;
        });
        setTimeout(() => {
          setHighlight((h) => {
            const next = new Set(h);
            newOnes.forEach((id) => next.delete(id));
            return next;
          });
        }, 1500);
      }
      prevIdsRef.current = ids;
    };
    tick();
    const iv = setInterval(tick, 3000);
    return () => clearInterval(iv);
  }, []);

  const updateStatus = (id: string, status: Order["status"]) => {
    const all = lsGet<Order[]>(LS_KEYS.ORDERS, []);
    const next = all.map((o) => (o.id === id ? { ...o, status } : o));
    lsSet(LS_KEYS.ORDERS, next);
    setOrders(next.slice().reverse());
  };

  const clearServed = () => {
    const all = lsGet<Order[]>(LS_KEYS.ORDERS, []);
    const next = all.filter((o) => o.status !== "served");
    lsSet(LS_KEYS.ORDERS, next);
    setOrders(next.slice().reverse());
  };

  const today = new Date().toDateString();
  const todayOrders = orders.filter((o) => new Date(o.time).toDateString() === today);
  const totalRevenue = todayOrders.reduce((s, o) => s + o.total, 0);
  const itemCounts = new Map<string, number>();
  todayOrders.forEach((o) => o.items.forEach((it) => itemCounts.set(it.name, (itemCounts.get(it.name) ?? 0) + it.qty)));
  const top = [...itemCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  const activeSpots = new Set(orders.filter((o) => o.status !== "served").map((o) => o.spotId));

  return (
    <div className="min-h-screen bg-[#0F2236] text-white">
      <header className="px-6 md:px-10 py-5 border-b border-white/10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-heading)]">Eden Plage</h1>
          <p className="text-xs uppercase tracking-widest text-[var(--turquoise)]">Réception · Live</p>
        </div>
        <span className="flex items-center gap-2 text-sm text-white/70">
          <Bell size={16} /> {todayOrders.filter(o => o.status === "pending").length} en attente
        </span>
      </header>

      <div className="grid lg:grid-cols-5 gap-6 p-6 md:p-10">
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-semibold text-white/80">Commandes</h2>
          {orders.length === 0 && (
            <p className="text-white/50 text-sm py-12 text-center bg-white/5 rounded-2xl">Aucune commande pour le moment.</p>
          )}
          {orders.map((o) => (
            <div key={o.id}
              className={`rounded-2xl p-5 border ${highlight.has(o.id) ? "animate-coral-flash border-[var(--coral)]" : "border-white/10"} bg-white/[0.04]`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${o.status === "pending" ? "bg-orange-400" : o.status === "confirmed" ? "bg-blue-400" : "bg-green-400"}`} />
                    <p className="font-semibold">Spot {o.spotId} · {o.guestName}</p>
                  </div>
                  <p className="text-xs text-white/50 mt-1 flex items-center gap-1">
                    <Clock size={12} /> {timeAgo(o.time)}
                  </p>
                </div>
                <span className="text-[var(--coral)] font-[family-name:var(--font-accent)] italic text-lg">
                  {o.total.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
              <ul className="mt-3 text-sm text-white/80 space-y-1">
                {o.items.map((it) => (
                  <li key={it.id}>× {it.qty} {it.name}</li>
                ))}
              </ul>
              <div className="mt-4 flex gap-2 flex-wrap">
                {o.status === "pending" && (
                  <button onClick={() => updateStatus(o.id, "confirmed")}
                    className="px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold hover:bg-blue-500/30">
                    Confirmer
                  </button>
                )}
                {o.status !== "served" && (
                  <button onClick={() => updateStatus(o.id, "served")}
                    className="px-3 py-1.5 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold hover:bg-green-500/30 flex items-center gap-1">
                    <CheckCircle2 size={14} /> Marquer servi
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-white/80">Aujourd'hui</h2>
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Commandes" value={todayOrders.length.toString()} />
            <Stat label="Revenu" value={`${totalRevenue.toLocaleString("fr-FR")} F`} />
          </div>
          <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/10">
            <p className="text-xs uppercase tracking-widest text-white/50">Plat le plus commandé</p>
            <p className="mt-2 font-[family-name:var(--font-heading)] text-2xl text-[var(--turquoise)]">
              {top ? `${top[0]}` : "—"}
            </p>
            {top && <p className="text-xs text-white/50">× {top[1]} aujourd'hui</p>}
          </div>
          <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/10">
            <p className="text-xs uppercase tracking-widest text-white/50 mb-3">Spots actifs</p>
            <div className="flex flex-wrap gap-2">
              {activeSpots.size === 0 && <span className="text-white/40 text-sm">Aucun</span>}
              {[...activeSpots].map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-[var(--turquoise)]/20 text-[var(--turquoise)] text-xs font-bold">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <button onClick={clearServed}
            className="w-full py-3 rounded-full bg-white/10 text-white/80 hover:bg-white/15 flex items-center justify-center gap-2 text-sm">
            <Trash2 size={16} /> Effacer les commandes livrées
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/[0.04] rounded-2xl p-5 border border-white/10">
      <p className="text-xs uppercase tracking-widest text-white/50">{label}</p>
      <p className="mt-1 font-[family-name:var(--font-heading)] text-3xl">{value}</p>
    </div>
  );
}

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "à l'instant";
  if (diff < 3600) return `il y a ${Math.floor(diff / 60)} min`;
  return `il y a ${Math.floor(diff / 3600)} h`;
}

function playChime() {
  try {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.frequency.value = 880;
    o.type = "sine";
    g.gain.setValueAtTime(0.001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.5);
    o.start();
    o.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.2);
    o.stop(ctx.currentTime + 0.55);
  } catch {}
}
