export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  image: string;
  past?: boolean;
};

export const defaultEvents: EventItem[] = [
  { id: "ev1", title: "Soirée DJ Sunset", date: "Vendredi prochain", time: "20h00",
    description: "DJ live au bord de la mer, ambiance house et afrobeats jusqu'à minuit.",
    image: "https://images.unsplash.com/photo-1571266028243-d220c6cbb6c2?auto=format&fit=crop&w=900&q=70" },
  { id: "ev2", title: "Brunch du Dimanche", date: "Dimanche", time: "11h00 – 15h00",
    description: "Buffet brunch face à l'océan : viennoiseries, fruits frais, plats chauds et cocktails.",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=70" },
  { id: "ev3", title: "Soirée Grillades", date: "Mercredi", time: "19h00",
    description: "Toutes les grillades à volonté, ambiance feu de bois et musique acoustique.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=70" },
  { id: "ev4", title: "Live Music", date: "Dernier samedi du mois", time: "21h00",
    description: "Concert acoustique d'un artiste togolais, les pieds dans le sable.",
    image: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?auto=format&fit=crop&w=900&q=70" },
];

export const pastEvents: EventItem[] = [
  { id: "p1", title: "Nouvel An Eden Plage", date: "31 Déc 2024", time: "21h00",
    description: "Le réveillon sur le sable, feux d'artifice et DJ jusqu'à l'aube.",
    image: "https://images.unsplash.com/photo-1530021232320-687d8e3dba54?auto=format&fit=crop&w=900&q=70", past: true },
  { id: "p2", title: "Festival Afrobeats", date: "15 Sept 2024", time: "19h00",
    description: "Une nuit afro-rythmée avec les meilleurs DJs de Lomé.",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=900&q=70", past: true },
  { id: "p3", title: "Anniversaire Eden 3 ans", date: "12 Mai 2024", time: "18h00",
    description: "Une soirée mémorable pour célébrer 3 ans d'amour avec nos clients.",
    image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?auto=format&fit=crop&w=900&q=70", past: true },
];
