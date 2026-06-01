export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image?: string;
};

export const CATEGORIES = [
  "Entrées",
  "Plats Principaux",
  "Grillades",
  "Sandwichs & Burgers",
  "Desserts",
  "Cocktails",
  "Boissons",
] as const;

export const defaultMenu: MenuItem[] = [
  // Entrées
  { id: "e1", category: "Entrées", name: "Salade Fraîcheur", description: "Tomates, concombres, feta", price: 2500, available: true,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=70" },
  { id: "e2", category: "Entrées", name: "Crudités Maison", description: "Légumes de saison, vinaigrette citron", price: 2000, available: true,
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=70" },
  { id: "e3", category: "Entrées", name: "Soupe du Jour", description: "Selon arrivage", price: 2500, available: true,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=70" },
  // Plats
  { id: "p1", category: "Plats Principaux", name: "Poisson Grillé du Jour", description: "Servi avec riz et légumes", price: 6500, available: true,
    image: "https://images.unsplash.com/photo-1535400875775-0218889e5d6e?auto=format&fit=crop&w=800&q=70" },
  { id: "p2", category: "Plats Principaux", name: "Poulet Braisé", description: "Marinade maison, frites ou riz", price: 5500, available: true,
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=70" },
  { id: "p3", category: "Plats Principaux", name: "Crevettes Sautées", description: "Ail, beurre, herbes fraîches", price: 8000, available: true,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=70" },
  { id: "p4", category: "Plats Principaux", name: "Plateau de Fruits de Mer", description: "Poisson, crevettes, calamars grillés", price: 12000, available: true,
    image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=800&q=70" },
  { id: "p5", category: "Plats Principaux", name: "Riz Sauté aux Légumes", description: "Option végétarienne", price: 3500, available: true,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=70" },
  // Grillades
  { id: "g1", category: "Grillades", name: "Brochettes de Boeuf (x4)", description: "Marinade épicée", price: 4500, available: true,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=70" },
  { id: "g2", category: "Grillades", name: "Brochettes de Poulet (x4)", description: "Citron et herbes", price: 3500, available: true,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=70" },
  { id: "g3", category: "Grillades", name: "Côtes d'Agneau Grillées", description: "Servies avec accompagnement", price: 7000, available: true,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=70" },
  { id: "g4", category: "Grillades", name: "Grillade Mixte", description: "Boeuf, poulet et saucisse", price: 8500, available: true,
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=70" },
  // Burgers
  { id: "b1", category: "Sandwichs & Burgers", name: "Burger Eden", description: "Steak, cheddar, salade, tomate, sauce maison", price: 4500, available: true,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=70" },
  { id: "b2", category: "Sandwichs & Burgers", name: "Burger Poulet Croustillant", description: "Filet croustillant, sauce maison", price: 4000, available: true,
    image: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?auto=format&fit=crop&w=800&q=70" },
  { id: "b3", category: "Sandwichs & Burgers", name: "Club Sandwich", description: "Poulet, jambon, oeuf, légumes", price: 3500, available: true,
    image: "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=800&q=70" },
  // Desserts
  { id: "d1", category: "Desserts", name: "Glace Maison (3 boules)", description: "Vanille, chocolat, fraise", price: 2000, available: true,
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?auto=format&fit=crop&w=800&q=70" },
  { id: "d2", category: "Desserts", name: "Crêpe Sucre Citron", description: "Tradition française", price: 1500, available: true,
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=70" },
  { id: "d3", category: "Desserts", name: "Tarte du Jour", description: "Selon arrivage", price: 2500, available: true,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=70" },
  // Cocktails
  { id: "c1", category: "Cocktails", name: "Mojito Classique", description: "Rhum, menthe fraîche, citron vert", price: 3500, available: true,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=800&q=70" },
  { id: "c2", category: "Cocktails", name: "Piña Colada", description: "Rhum, coco, ananas", price: 3500, available: true,
    image: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?auto=format&fit=crop&w=800&q=70" },
  { id: "c3", category: "Cocktails", name: "Daiquiri Fraise", description: "Frais et fruité", price: 3500, available: true,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=70" },
  { id: "c4", category: "Cocktails", name: "Cocktail Eden", description: "Signature maison", price: 4000, available: true,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=70" },
  { id: "c5", category: "Cocktails", name: "Spritz", description: "Apérol, prosecco, soda", price: 3500, available: true,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=70" },
  { id: "c6", category: "Cocktails", name: "Virgin Mojito", description: "Sans alcool, ultra rafraîchissant", price: 2500, available: true,
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=800&q=70" },
  // Boissons
  { id: "bo1", category: "Boissons", name: "Eau Minérale", description: "50cl", price: 500, available: true },
  { id: "bo2", category: "Boissons", name: "Jus de Fruits Frais", description: "Mangue, ananas, orange", price: 1500, available: true },
  { id: "bo3", category: "Boissons", name: "Milkshake", description: "Vanille, fraise ou chocolat", price: 2500, available: true },
  { id: "bo4", category: "Boissons", name: "Bière Locale", description: "Flag ou Awooyo", price: 1500, available: true },
  { id: "bo5", category: "Boissons", name: "Bière Pression", description: "Servie fraîche", price: 2000, available: true },
  { id: "bo6", category: "Boissons", name: "Sodas", description: "Au choix", price: 500, available: true },
  { id: "bo7", category: "Boissons", name: "Café / Thé", description: "Expresso, allongé, thé noir", price: 1000, available: true },
];

export const FEATURED_IDS = ["p1", "b1", "g1", "p4", "c4", "bo3"];
