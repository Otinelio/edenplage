export const LS_KEYS = {
  ORDERS: "orders",
  RESERVATIONS: "reservations",
  MENU: "menu_items",
  EVENTS: "events_items",
  RECEPTION_PIN: "reception_pin",
  ADMIN_PIN: "admin_pin",
  WHATSAPP: "whatsapp_number",
  HOURS: "restaurant_hours",
};

export function lsGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function lsSet<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}
