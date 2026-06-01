import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Trash2, Plus, Save } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import { defaultMenu, CATEGORIES, type MenuItem } from "@/data/menuData";
import { defaultEvents, type EventItem } from "@/data/eventsData";
import { lsGet, lsSet, LS_KEYS } from "@/lib/storage";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Eden Plage" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  if (!authed) return <PinGate onOk={() => setAuthed(true)} />;
  return <Dashboard />;
}

function PinGate({ onOk }: { onOk: () => void }) {
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const submit = () => {
    const stored = lsGet<string>(LS_KEYS.ADMIN_PIN, "9999");
    if (pin === stored) onOk();
    else setErr("Code incorrect");
  };
  return (
    <div className="min-h-screen bg-[#0F2236] flex items-center justify-center px-6">
      <div className="bg-white/5 backdrop-blur border border-white/10 p-10 rounded-3xl text-center max-w-sm w-full">
        <h1 className="text-3xl text-white font-[family-name:var(--font-heading)]">Eden Plage</h1>
        <p className="text-[var(--coral)] text-sm uppercase tracking-widest mt-1">Administration</p>
        <input type="password" inputMode="numeric" value={pin}
          onChange={(e) => { setPin(e.target.value); setErr(""); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          placeholder="••••"
          className="mt-8 w-full text-center text-2xl tracking-[0.5em] py-4 rounded-xl bg-white/10 text-white border border-white/20 focus:outline-none focus:border-[var(--coral)]" />
        {err && <p className="text-red-400 text-sm mt-2">{err}</p>}
        <button onClick={submit} className="mt-4 w-full py-3 rounded-full bg-[var(--coral)] text-white font-semibold">
          Entrer
        </button>
      </div>
    </div>
  );
}

type Tab = "menu" | "events" | "reservations" | "stats" | "settings";

function Dashboard() {
  const [tab, setTab] = useState<Tab>("menu");
  return (
    <div className="min-h-screen bg-[#0F2236] text-white">
      <header className="px-6 md:px-10 py-5 border-b border-white/10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-[family-name:var(--font-heading)]">Eden Plage</h1>
          <p className="text-xs uppercase tracking-widest text-[var(--coral)]">Administration</p>
        </div>
      </header>
      <nav className="px-6 md:px-10 border-b border-white/10 flex gap-1 overflow-x-auto">
        {([
          ["menu", "Menu"], ["events", "Événements"], ["reservations", "Réservations"],
          ["stats", "Statistiques"], ["settings", "Paramètres"],
        ] as [Tab, string][]).map(([k, lbl]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap ${tab === k ? "text-[var(--coral)] border-b-2 border-[var(--coral)]" : "text-white/60"}`}>
            {lbl}
          </button>
        ))}
      </nav>
      <div className="p-6 md:p-10">
        {tab === "menu" && <MenuTab />}
        {tab === "events" && <EventsTab />}
        {tab === "reservations" && <ReservationsTab />}
        {tab === "stats" && <StatsTab />}
        {tab === "settings" && <SettingsTab />}
      </div>
    </div>
  );
}

// ----- Menu Tab -----
function MenuTab() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [adding, setAdding] = useState(false);

  useEffect(() => { setMenu(lsGet<MenuItem[]>(LS_KEYS.MENU, defaultMenu)); }, []);
  const save = (next: MenuItem[]) => { setMenu(next); lsSet(LS_KEYS.MENU, next); };

  const update = (id: string, patch: Partial<MenuItem>) => {
    save(menu.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  };
  const remove = (id: string) => {
    if (!confirm("Supprimer cet article ?")) return;
    save(menu.filter((m) => m.id !== id));
  };
  const add = (item: MenuItem) => save([...menu, item]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Gestion du menu ({menu.length} articles)</h2>
        <button onClick={() => setAdding(true)} className="px-4 py-2 rounded-full bg-[var(--coral)] text-white text-sm font-semibold flex items-center gap-2">
          <Plus size={16} /> Nouvel article
        </button>
      </div>
      {adding && <AddItemForm onAdd={(it) => { add(it); setAdding(false); }} onCancel={() => setAdding(false)} />}
      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-white/60 uppercase text-xs">
            <tr>
              <th className="text-left p-3">Catégorie</th>
              <th className="text-left p-3">Article</th>
              <th className="text-left p-3">Prix</th>
              <th className="text-left p-3">Dispo</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {menu.map((m) => (
              <tr key={m.id} className="border-t border-white/5">
                <td className="p-3 text-white/70">{m.category}</td>
                <td className="p-3">
                  <input value={m.name} onChange={(e) => update(m.id, { name: e.target.value })}
                    className="w-full bg-transparent font-semibold focus:outline-none border-b border-transparent focus:border-[var(--coral)]" />
                  <input value={m.description} onChange={(e) => update(m.id, { description: e.target.value })}
                    className="w-full bg-transparent text-xs text-white/50 focus:outline-none" />
                </td>
                <td className="p-3">
                  <input type="number" value={m.price} onChange={(e) => update(m.id, { price: parseInt(e.target.value) || 0 })}
                    className="w-24 bg-transparent focus:outline-none border-b border-transparent focus:border-[var(--coral)]" />
                </td>
                <td className="p-3">
                  <button onClick={() => update(m.id, { available: !m.available })}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${m.available ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"}`}>
                    {m.available ? "Disponible" : "Rupture"}
                  </button>
                </td>
                <td className="p-3 text-right">
                  <button onClick={() => remove(m.id)} className="text-white/40 hover:text-red-400">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddItemForm({ onAdd, onCancel }: { onAdd: (it: MenuItem) => void; onCancel: () => void }) {
  const [f, setF] = useState({ name: "", description: "", price: 0, category: CATEGORIES[0] as string });
  return (
    <div className="bg-white/5 rounded-2xl p-5 border border-white/10 grid md:grid-cols-5 gap-3">
      <select value={f.category} onChange={(e) => setF({ ...f, category: e.target.value })}
        className="bg-white/10 rounded-lg px-3 py-2 border border-white/20">
        {CATEGORIES.map((c) => <option key={c} className="text-black">{c}</option>)}
      </select>
      <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Nom"
        className="bg-white/10 rounded-lg px-3 py-2 border border-white/20" />
      <input value={f.description} onChange={(e) => setF({ ...f, description: e.target.value })} placeholder="Description"
        className="bg-white/10 rounded-lg px-3 py-2 border border-white/20 md:col-span-2" />
      <input type="number" value={f.price} onChange={(e) => setF({ ...f, price: parseInt(e.target.value) || 0 })} placeholder="Prix"
        className="bg-white/10 rounded-lg px-3 py-2 border border-white/20" />
      <div className="md:col-span-5 flex gap-2 justify-end">
        <button onClick={onCancel} className="px-4 py-2 rounded-full bg-white/10">Annuler</button>
        <button onClick={() => { if (f.name) onAdd({ id: `n_${Date.now()}`, available: true, ...f }); }}
          className="px-4 py-2 rounded-full bg-[var(--coral)] font-semibold">Ajouter</button>
      </div>
    </div>
  );
}

// ----- Events Tab -----
function EventsTab() {
  const [events, setEvents] = useState<EventItem[]>([]);
  useEffect(() => { setEvents(lsGet<EventItem[]>(LS_KEYS.EVENTS, defaultEvents)); }, []);
  const save = (next: EventItem[]) => { setEvents(next); lsSet(LS_KEYS.EVENTS, next); };
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Événements ({events.length})</h2>
        <button onClick={() => save([{ id: `ev_${Date.now()}`, title: "Nouvel événement", date: "", time: "", description: "", image: "" }, ...events])}
          className="px-4 py-2 rounded-full bg-[var(--coral)] text-sm font-semibold flex items-center gap-2">
          <Plus size={16} /> Ajouter
        </button>
      </div>
      <div className="space-y-3">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white/5 rounded-2xl p-4 border border-white/10 grid md:grid-cols-5 gap-2 items-start">
            <input value={ev.title} onChange={(e) => save(events.map((x) => x.id === ev.id ? { ...x, title: e.target.value } : x))}
              className="bg-white/10 rounded-lg px-3 py-2 border border-white/20" placeholder="Titre" />
            <input value={ev.date} onChange={(e) => save(events.map((x) => x.id === ev.id ? { ...x, date: e.target.value } : x))}
              className="bg-white/10 rounded-lg px-3 py-2 border border-white/20" placeholder="Date" />
            <input value={ev.time} onChange={(e) => save(events.map((x) => x.id === ev.id ? { ...x, time: e.target.value } : x))}
              className="bg-white/10 rounded-lg px-3 py-2 border border-white/20" placeholder="Heure" />
            <input value={ev.description} onChange={(e) => save(events.map((x) => x.id === ev.id ? { ...x, description: e.target.value } : x))}
              className="bg-white/10 rounded-lg px-3 py-2 border border-white/20 md:col-span-1" placeholder="Description" />
            <div className="flex gap-2">
              <input value={ev.image} onChange={(e) => save(events.map((x) => x.id === ev.id ? { ...x, image: e.target.value } : x))}
                className="bg-white/10 rounded-lg px-3 py-2 border border-white/20 flex-1" placeholder="URL image" />
              <button onClick={() => save(events.filter((x) => x.id !== ev.id))}
                className="text-white/40 hover:text-red-400 px-2"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----- Reservations Tab -----
function ReservationsTab() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { setItems(lsGet<any[]>(LS_KEYS.RESERVATIONS, []).slice().reverse()); }, []);
  const updateStatus = (i: number, status: string) => {
    const all = lsGet<any[]>(LS_KEYS.RESERVATIONS, []);
    const idx = all.length - 1 - i;
    all[idx] = { ...all[idx], status };
    lsSet(LS_KEYS.RESERVATIONS, all);
    setItems(all.slice().reverse());
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Réservations ({items.length})</h2>
      {items.length === 0 ? (
        <p className="text-white/50 text-center py-12 bg-white/5 rounded-2xl">Aucune réservation pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {items.map((r, i) => (
            <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/10 flex flex-wrap justify-between gap-3">
              <div>
                <p className="font-semibold">{r.name} · {r.guests} pers.</p>
                <p className="text-sm text-white/60">{r.date} à {r.time} — {r.phone}</p>
                {r.message && <p className="text-xs text-white/40 italic mt-1">« {r.message} »</p>}
              </div>
              <div className="flex gap-2 items-center">
                {["En attente", "Confirmée", "Annulée"].map((s) => (
                  <button key={s} onClick={() => updateStatus(i, s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${r.status === s ? "bg-[var(--coral)] text-white" : "bg-white/10 text-white/70"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ----- Stats Tab -----
function StatsTab() {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => { setOrders(lsGet<any[]>(LS_KEYS.ORDERS, [])); }, []);

  const today = new Date();
  const weekData = useMemo(() => {
    const days: { day: string; orders: number; revenue: number }[] = [];
    const labels = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const ds = d.toDateString();
      const dayOrders = orders.filter((o) => new Date(o.time).toDateString() === ds);
      days.push({
        day: labels[d.getDay()],
        orders: dayOrders.length,
        revenue: dayOrders.reduce((s, o) => s + (o.total || 0), 0),
      });
    }
    return days;
  }, [orders]);

  const todayOrders = orders.filter((o) => new Date(o.time).toDateString() === today.toDateString());
  const weekRevenue = weekData.reduce((s, d) => s + d.revenue, 0);

  const itemCounts = new Map<string, number>();
  orders.forEach((o) => o.items?.forEach((it: any) => itemCounts.set(it.name, (itemCounts.get(it.name) ?? 0) + it.qty)));
  const top = [...itemCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Statistiques</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard label="Commandes aujourd'hui" value={todayOrders.length.toString()} />
        <StatCard label="Revenu cette semaine" value={`${weekRevenue.toLocaleString("fr-FR")} F`} />
        <StatCard label="Plat le plus commandé" value={top[0]?.[0] ?? "—"} />
      </div>
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="font-semibold mb-4">Commandes – 7 derniers jours</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip contentStyle={{ background: "#0F2236", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12 }} />
              <Bar dataKey="orders" fill="#E8652A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <h3 className="font-semibold mb-4">Top 5 articles</h3>
        {top.length === 0 ? <p className="text-white/50 text-sm">Pas encore de données.</p> : (
          <ul className="space-y-2">
            {top.map(([name, count]) => (
              <li key={name} className="flex justify-between"><span>{name}</span><span className="text-[var(--turquoise)] font-semibold">× {count}</span></li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
      <p className="text-xs uppercase tracking-widest text-white/50">{label}</p>
      <p className="mt-2 font-[family-name:var(--font-heading)] text-3xl text-[var(--coral)]">{value}</p>
    </div>
  );
}

// ----- Settings Tab -----
function SettingsTab() {
  const [recPin, setRecPin] = useState("");
  const [admPin, setAdmPin] = useState("");
  const [wa, setWa] = useState("");
  const [saved, setSaved] = useState("");

  useEffect(() => {
    setRecPin(lsGet<string>(LS_KEYS.RECEPTION_PIN, "1234"));
    setAdmPin(lsGet<string>(LS_KEYS.ADMIN_PIN, "9999"));
    setWa(lsGet<string>(LS_KEYS.WHATSAPP, WHATSAPP_NUMBER));
  }, []);

  const save = () => {
    lsSet(LS_KEYS.RECEPTION_PIN, recPin);
    lsSet(LS_KEYS.ADMIN_PIN, admPin);
    lsSet(LS_KEYS.WHATSAPP, wa);
    setSaved("Paramètres enregistrés ✓");
    setTimeout(() => setSaved(""), 2000);
  };

  return (
    <div className="max-w-xl space-y-4">
      <h2 className="text-xl font-semibold">Paramètres</h2>
      <Field label="Code PIN Réception" value={recPin} onChange={setRecPin} type="password" />
      <Field label="Code PIN Admin" value={admPin} onChange={setAdmPin} type="password" />
      <Field label="Numéro WhatsApp" value={wa} onChange={setWa} placeholder="+228..." />
      <button onClick={save} className="px-5 py-2.5 rounded-full bg-[var(--coral)] font-semibold flex items-center gap-2">
        <Save size={16} /> Enregistrer
      </button>
      {saved && <p className="text-[var(--turquoise)] text-sm">{saved}</p>}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm text-white/70 mb-1.5">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-[var(--coral)]" />
    </div>
  );
}
