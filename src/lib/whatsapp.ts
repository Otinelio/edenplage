// WhatsApp number — replace with real Eden Plage number
export const WHATSAPP_NUMBER = "+22890000000";

export function whatsappLink(message: string): string {
  const digits = WHATSAPP_NUMBER.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function openWhatsapp(message: string) {
  if (typeof window === "undefined") return;
  window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
}
