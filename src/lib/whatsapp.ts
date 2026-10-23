export const WHATSAPP_NUMBER = "48575656702";

export function whatsappHref(prefill: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefill)}`;
}
