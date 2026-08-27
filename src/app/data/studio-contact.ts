/** Replace with the studio's real WhatsApp Business number, digits only, country code first. */
export const STUDIO_WHATSAPP_NUMBER = '10000000000';

export function whatsappLink(message: string): string {
  return `https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
