import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER, openWhatsapp } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Plan d'accès — Eden Plage Lomé" },
      { name: "description", content: "Adresse, horaires et contact d'Eden Plage, restaurant-bar au Boulevard du Mono, Lomé, Togo." },
      { property: "og:title", content: "Contact — Eden Plage" },
      { property: "og:description", content: "Nous contacter et nous trouver." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [msg, setMsg] = useState("");
  return (
    <div>
      <section className="relative h-[45vh] min-h-[320px] flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1499363536502-87642509e31b?auto=format&fit=crop&w=2000&q=80)` }} />
        <div className="absolute inset-0 bg-[var(--ocean)]/65" />
        <div className="relative text-center text-white px-6 pt-20">
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--sand)]">Contact</p>
          <h1 className="mt-3 text-5xl md:text-7xl">Venez nous voir</h1>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
          <iframe
            title="Eden Plage Lomé"
            src="https://www.google.com/maps?q=Boulevard+du+Mono,+Lom%C3%A9,+Togo&output=embed"
            className="w-full h-[420px] border-0"
            loading="lazy"
          />
          <div className="p-5 flex justify-between items-center">
            <p className="text-sm text-[var(--muted-foreground)]">Boulevard du Mono, Lomé, Togo</p>
            <a target="_blank" rel="noreferrer"
              href="https://www.google.com/maps/dir/?api=1&destination=Boulevard+du+Mono,+Lom%C3%A9,+Togo"
              className="px-4 py-2 rounded-full bg-[var(--ocean)] text-white text-sm font-semibold hover:bg-[var(--turquoise)] transition-colors">
              Itinéraire
            </a>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl text-[var(--ocean)]">Nous écrire</h2>
          <p className="text-[var(--muted-foreground)] mt-1">Une question, un événement privé ? Envoyez-nous un message.</p>

          <div className="mt-6 space-y-4">
            <InfoRow icon={MapPin} title="Adresse" value="Boulevard du Mono, Lomé, Togo" />
            <InfoRow icon={Phone} title="Téléphone / WhatsApp" value={WHATSAPP_NUMBER} />
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[var(--turquoise)]/10 text-[var(--turquoise)]"><Clock size={20} /></div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">Horaires</p>
                <p className="text-[var(--ocean)] font-semibold">Lun – Ven : 10h00 – 23h00</p>
                <p className="text-[var(--ocean)] font-semibold">Sam – Dim : 10h00 – 00h00</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="https://instagram.com/edenplagelome2021" target="_blank" rel="noreferrer"
                className="p-3 rounded-full bg-[var(--sand)] text-[var(--ocean)] hover:bg-[var(--coral)] hover:text-white transition-colors"><Instagram size={18} /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="p-3 rounded-full bg-[var(--sand)] text-[var(--ocean)] hover:bg-[var(--coral)] hover:text-white transition-colors"><Facebook size={18} /></a>
            </div>
          </div>

          <div className="mt-6">
            <textarea rows={4} value={msg} onChange={(e) => setMsg(e.target.value)}
              placeholder="Votre message..."
              className="w-full px-4 py-3 rounded-lg border border-[var(--border)] focus:outline-none focus:border-[var(--coral)]" />
            <button
              onClick={() => openWhatsapp(`Bonjour Eden Plage,\n${msg || "J'aurais une question."}`)}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[var(--coral)] text-white font-semibold hover:bg-orange-600">
              <MessageCircle size={18} /> Envoyer via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, title, value }: { icon: typeof MapPin; title: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 rounded-lg bg-[var(--turquoise)]/10 text-[var(--turquoise)]"><Icon size={20} /></div>
      <div>
        <p className="text-xs uppercase tracking-wider text-[var(--muted-foreground)]">{title}</p>
        <p className="text-[var(--ocean)] font-semibold">{value}</p>
      </div>
    </div>
  );
}
