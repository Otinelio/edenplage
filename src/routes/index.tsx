import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Waves, UtensilsCrossed, Music2, ChevronDown, Star, MapPin, Clock,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { WaveDivider } from "@/components/WaveDivider";
import { defaultMenu, FEATURED_IDS } from "@/data/menuData";
import { defaultEvents } from "@/data/eventsData";
import { openWhatsapp } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Eden Plage — Le paradis au bord de la mer · Lomé" },
      { name: "description", content: "Restaurant-bar de bord de mer à Lomé. Grillades, cocktails, soirées face à l'océan." },
      { property: "og:title", content: "Eden Plage — Lomé" },
      { property: "og:description", content: "Restaurant-bar de bord de mer à Lomé." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const HERO_IMG = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80";
const RESERVE_BG = "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=80";

const STRIP_IMAGES = [
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1535850579364-b58275fe2c45?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1515669097368-22e68427d265?auto=format&fit=crop&w=600&q=70",
  "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?auto=format&fit=crop&w=600&q=70",
];

const TESTIMONIALS = [
  { name: "Aminata K.", text: "Meilleure adresse de bord de mer à Lomé!" },
  { name: "Jean-Marc D.", text: "Ambiance incroyable, les grillades sont top!" },
  { name: "Sarah & Tom", text: "Un cadre magique pour un dîner en amoureux." },
];

function HomePage() {
  const featured = defaultMenu.filter((m) => FEATURED_IDS.includes(m.id));
  return (
    <div>
      <Hero />
      <AboutStrip />
      <MenuPreview featured={featured} />
      <AmbianceStrip />
      <EventsTeaser />
      <ReservationBanner />
      <Testimonials />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-[family-name:var(--font-heading)] text-white text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-balance"
        >
          EDEN PLAGE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-white/90 text-lg md:text-2xl font-light max-w-2xl mx-auto font-[family-name:var(--font-accent)] italic"
        >
          Le paradis au bord de la mer — Boulevard du Mono, Lomé
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Link to="/menu" className="px-7 py-3.5 rounded-full bg-white text-[var(--ocean)] font-semibold hover:scale-105 active:scale-95 transition-transform shadow-xl">
            Voir le Menu
          </Link>
          <Link to="/reserver" className="px-7 py-3.5 rounded-full bg-[var(--coral)] text-white font-semibold hover:scale-105 active:scale-95 transition-transform shadow-xl">
            Réserver une Table
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 text-white/80 animate-bounce-slow">
        <ChevronDown size={32} />
      </div>

      <div className="absolute bottom-0 inset-x-0 z-10">
        <WaveDivider color="#F2E0B6" />
      </div>
    </section>
  );
}

function AboutStrip() {
  const items = [
    { icon: Waves, title: "Bord de Mer", text: "Vue imprenable sur l'océan Atlantique" },
    { icon: UtensilsCrossed, title: "Cuisine & Bar", text: "Plats frais, grillades, cocktails maison" },
    { icon: Music2, title: "Ambiance Cosi", text: "Cadre détendu, musique, soirées animées" },
  ];
  return (
    <section className="py-20 px-6 bg-[var(--sand)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="glass p-8 rounded-2xl text-center hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div className="inline-flex p-4 rounded-full bg-[var(--coral)]/10 text-[var(--coral)] mb-4">
              <it.icon size={32} />
            </div>
            <h3 className="text-2xl text-[var(--ocean)]">{it.title}</h3>
            <p className="mt-2 text-[var(--muted-foreground)]">{it.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function MenuPreview({ featured }: { featured: typeof defaultMenu }) {
  return (
    <section className="py-24 px-6 bg-[var(--seafoam)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--turquoise)] font-semibold">Nos saveurs</p>
          <h2 className="mt-3 text-4xl md:text-5xl text-[var(--ocean)]">Nos Incontournables</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all group"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={item.image} alt={item.name} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl text-[var(--ocean)]">{item.name}</h3>
                  <span className="font-[family-name:var(--font-accent)] italic text-[var(--coral)] text-lg whitespace-nowrap">
                    {item.price.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--muted-foreground)]">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/menu" className="inline-flex px-7 py-3.5 rounded-full bg-[var(--ocean)] text-white font-semibold hover:bg-[var(--turquoise)] hover:scale-105 active:scale-95 transition-all">
            Voir le Menu Complet
          </Link>
        </div>
      </div>
    </section>
  );
}

function AmbianceStrip() {
  const imgs = [...STRIP_IMAGES, ...STRIP_IMAGES];
  return (
    <section className="py-16 bg-[var(--ocean)] overflow-hidden">
      <p className="text-center text-xs uppercase tracking-[0.4em] text-white/60 mb-8">L'ambiance Eden</p>
      <div className="relative">
        <div className="flex gap-4 animate-marquee w-max">
          {imgs.map((src, i) => (
            <div key={i} className="w-72 h-48 rounded-2xl overflow-hidden shrink-0">
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventsTeaser() {
  const evs = defaultEvents.slice(0, 3);
  return (
    <section className="py-24 px-6 bg-[var(--seafoam)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--turquoise)] font-semibold">Agenda</p>
            <h2 className="mt-3 text-4xl text-[var(--ocean)]">Événements prochains</h2>
          </div>
          <Link to="/evenements" className="text-[var(--coral)] font-semibold hover:underline">
            Voir tous →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {evs.map((ev, i) => (
            <motion.div key={ev.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all">
              <div className="relative aspect-[16/10]">
                <img src={ev.image} alt={ev.title} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-[var(--coral)] text-white text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-full">
                  {ev.date}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xl text-[var(--ocean)]">{ev.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] mt-2">{ev.description}</p>
                <button
                  onClick={() => openWhatsapp(`Bonjour Eden Plage, je souhaite m'inscrire à l'événement ${ev.title} du ${ev.date}.`)}
                  className="mt-4 w-full py-2.5 rounded-full bg-[var(--turquoise)] text-white font-semibold hover:bg-[var(--ocean)] transition-colors"
                >
                  RSVP via WhatsApp
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReservationBanner() {
  const [form, setForm] = useState({ name: "", date: "", time: "19h", guests: "2" });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Bonjour Eden Plage, je souhaite réserver une table.\nNom: ${form.name}\nDate: ${form.date}\nHeure: ${form.time}\nNombre de personnes: ${form.guests}\nMerci!`;
    openWhatsapp(msg);
  };
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${RESERVE_BG})` }} />
      <div className="absolute inset-0 bg-[var(--ocean)]/75" />
      <div className="relative max-w-3xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl">Réservez votre table dès maintenant</h2>
        <p className="mt-3 text-white/80 font-[family-name:var(--font-accent)] italic text-lg">
          Les pieds dans le sable, l'âme en paix
        </p>
        <form onSubmit={submit} className="mt-10 glass-dark p-6 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Votre nom" className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-[var(--coral)]" />
          <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-[var(--coral)]" />
          <select value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-[var(--coral)]">
            {["12h","13h","14h","18h","19h","20h","21h","22h"].map(t => <option key={t} className="text-black">{t}</option>)}
          </select>
          <input type="number" min={1} max={30} value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}
            placeholder="Nombre de personnes" className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:border-[var(--coral)]" />
          <button type="submit" className="md:col-span-2 py-3.5 rounded-full bg-[var(--coral)] hover:bg-orange-600 font-semibold transition-colors">
            Envoyer ma réservation
          </button>
        </form>
        <div className="mt-6 flex justify-center gap-6 text-sm text-white/70">
          <span className="flex items-center gap-2"><MapPin size={16} /> Boulevard du Mono</span>
          <span className="flex items-center gap-2"><Clock size={16} /> 10h – 23h</span>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 px-6 bg-[var(--sand)]/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--turquoise)] font-semibold">Ils nous adorent</p>
          <h2 className="mt-3 text-4xl text-[var(--ocean)]">Témoignages</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex gap-1 text-[var(--coral)]">
                {Array.from({ length: 5 }).map((_, j) => <Star key={j} size={18} fill="currentColor" />)}
              </div>
              <p className="mt-4 font-[family-name:var(--font-accent)] italic text-xl text-[var(--ocean)] leading-relaxed">
                « {t.text} »
              </p>
              <footer className="mt-4 text-sm font-semibold text-[var(--muted-foreground)]">— {t.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
