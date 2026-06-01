import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { defaultEvents, pastEvents } from "@/data/eventsData";
import { openWhatsapp } from "@/lib/whatsapp";

export const Route = createFileRoute("/evenements")({
  head: () => ({
    meta: [
      { title: "Événements — Eden Plage Lomé" },
      { name: "description", content: "Soirées DJ, brunch du dimanche, grillades et live music au bord de la mer à Lomé." },
      { property: "og:title", content: "Événements — Eden Plage" },
      { property: "og:description", content: "Notre agenda d'événements." },
      { property: "og:url", content: "/evenements" },
    ],
    links: [{ rel: "canonical", href: "/evenements" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <div>
      <section className="relative h-[55vh] min-h-[360px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1571266028243-d220c6cbb6c2?auto=format&fit=crop&w=2000&q=80)` }} />
        <div className="absolute inset-0 bg-[var(--ocean)]/70" />
        <div className="relative text-center text-white px-6 pt-20">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--sand)]">Agenda</p>
          <h1 className="mt-3 text-5xl md:text-7xl">Nos Événements</h1>
          <p className="mt-4 max-w-xl mx-auto text-white/85 font-[family-name:var(--font-accent)] italic text-lg">
            Soirées, musique, fêtes — chaque semaine au bord de l'océan.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl text-[var(--ocean)] mb-10">À venir</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultEvents.map((ev, i) => (
            <motion.article key={ev.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={ev.image} alt={ev.title} loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 left-3 bg-[var(--coral)] text-white text-xs uppercase tracking-wider font-bold px-3 py-1.5 rounded-full">
                  {ev.date}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl text-[var(--ocean)]">{ev.title}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-[var(--muted-foreground)]">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {ev.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {ev.time}</span>
                </div>
                <p className="mt-3 text-[var(--muted-foreground)]">{ev.description}</p>
                <button
                  onClick={() => openWhatsapp(`Bonjour Eden Plage, je souhaite m'inscrire à l'événement ${ev.title} du ${ev.date}.\nNom: \nNombre de personnes: \nMerci!`)}
                  className="mt-5 w-full py-3 rounded-full bg-[var(--coral)] text-white font-semibold hover:bg-orange-600 transition-colors">
                  Je participe
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <h2 className="mt-24 text-3xl md:text-4xl text-[var(--ocean)] mb-10">Nos Moments</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {pastEvents.map((ev) => (
            <div key={ev.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={ev.image} alt={ev.title} loading="lazy" className="w-full h-full object-cover opacity-90" />
              </div>
              <div className="p-4">
                <h4 className="text-sm font-semibold text-[var(--ocean)]">{ev.title}</h4>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">{ev.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
