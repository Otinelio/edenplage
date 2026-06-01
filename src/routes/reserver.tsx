import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, MapPin, Phone } from "lucide-react";
import { openWhatsapp, WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { lsGet, lsSet, LS_KEYS } from "@/lib/storage";

export const Route = createFileRoute("/reserver")({
  head: () => ({
    meta: [
      { title: "Réserver une table — Eden Plage Lomé" },
      { name: "description", content: "Réservez votre table à Eden Plage, restaurant-bar de bord de mer à Lomé, Boulevard du Mono." },
      { property: "og:title", content: "Réserver — Eden Plage" },
      { property: "og:description", content: "Réservez votre table face à l'océan." },
      { property: "og:url", content: "/reserver" },
    ],
    links: [{ rel: "canonical", href: "/reserver" }],
  }),
  component: ReservePage,
});

function ReservePage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "19h", guests: 2, message: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = `Réservation Eden Plage\nNom: ${form.name}\nTél: ${form.phone}\nDate: ${form.date}\nHeure: ${form.time}\nPersonnes: ${form.guests}\nMessage: ${form.message || "-"}`;
    const all = lsGet<any[]>(LS_KEYS.RESERVATIONS, []);
    all.push({ ...form, createdAt: new Date().toISOString(), status: "En attente" });
    lsSet(LS_KEYS.RESERVATIONS, all);
    openWhatsapp(text);
    setSent(true);
  };

  return (
    <div>
      <section className="relative h-[50vh] min-h-[340px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80)` }} />
        <div className="absolute inset-0 bg-[var(--ocean)]/70" />
        <div className="relative text-center text-white px-6 pt-20">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--sand)]">Réservation</p>
          <h1 className="mt-3 text-5xl md:text-6xl">Réservez Votre Table</h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-2xl text-center shadow-lg">
            <div className="inline-flex p-4 rounded-full bg-[var(--turquoise)]/15 text-[var(--turquoise)] mb-4">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl text-[var(--ocean)]">Votre demande a été envoyée !</h2>
            <p className="mt-3 text-[var(--muted-foreground)]">
              Nous vous confirmerons votre réservation dans les plus brefs délais via WhatsApp.
            </p>
            <button onClick={() => setSent(false)} className="mt-6 px-6 py-2.5 rounded-full bg-[var(--coral)] text-white font-semibold">
              Nouvelle réservation
            </button>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="bg-white p-8 md:p-10 rounded-2xl shadow-lg space-y-4">
            <h2 className="text-2xl text-[var(--ocean)] mb-2">Vos informations</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Nom complet" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Input label="Téléphone" required type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
              <Input label="Date souhaitée" required type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
              <Select label="Heure" value={form.time} onChange={(v) => setForm({ ...form, time: v })}
                options={["12h","13h","14h","18h","19h","20h","21h","22h"]} />
              <div>
                <label className="block text-sm font-semibold text-[var(--ocean)] mb-1.5">Nombre de personnes</label>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                    className="w-10 h-10 rounded-full bg-[var(--sand)] text-[var(--ocean)] font-bold">−</button>
                  <span className="font-semibold text-[var(--ocean)] w-12 text-center text-lg">{form.guests}</span>
                  <button type="button" onClick={() => setForm({ ...form, guests: Math.min(30, form.guests + 1) })}
                    className="w-10 h-10 rounded-full bg-[var(--sand)] text-[var(--ocean)] font-bold">+</button>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[var(--ocean)] mb-1.5">Message (optionnel)</label>
              <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Demande spéciale, allergie, occasion..."
                className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--coral)]" />
            </div>
            <button type="submit" className="w-full py-3.5 rounded-full bg-[var(--coral)] text-white font-semibold text-lg hover:bg-orange-600 transition-colors">
              Réserver maintenant
            </button>
          </form>
        )}

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {[
            { icon: Clock, title: "Horaires", text: "Tous les jours 10h–23h" },
            { icon: MapPin, title: "Adresse", text: "Boulevard du Mono, Lomé" },
            { icon: Phone, title: "Téléphone", text: WHATSAPP_NUMBER },
          ].map((it) => (
            <div key={it.title} className="bg-white p-5 rounded-xl shadow-sm flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[var(--turquoise)]/10 text-[var(--turquoise)]">
                <it.icon size={20} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">{it.title}</p>
                <p className="text-[var(--ocean)] font-semibold">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Input(props: { label: string; required?: boolean; type?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--ocean)] mb-1.5">{props.label}</label>
      <input required={props.required} type={props.type ?? "text"} value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--coral)]" />
    </div>
  );
}

function Select(props: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[var(--ocean)] mb-1.5">{props.label}</label>
      <select value={props.value} onChange={(e) => props.onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white focus:outline-none focus:border-[var(--coral)]">
        {props.options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}
