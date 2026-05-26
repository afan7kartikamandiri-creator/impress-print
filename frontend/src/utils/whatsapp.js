// WhatsApp helper - smart routing yang skip api.whatsapp.com (sering diblokir)
import { contactInfo } from '../mock';

const DEFAULT_MSG = 'Halo Impress Print, saya ingin konsultasi mengenai layanan cetak premium';

const isMobile = () => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const openWhatsApp = (message) => {
  const text = message || DEFAULT_MSG;
  const phone = contactInfo.whatsapp;
  const encoded = encodeURIComponent(text);

  // Mobile -> langsung buka WhatsApp app via wa.me (di mobile ini langsung trigger app, tidak lewat api.whatsapp.com)
  // Desktop -> langsung ke web.whatsapp.com untuk skip api.whatsapp.com yang sering di-block
  const url = isMobile()
    ? `https://wa.me/${phone}?text=${encoded}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`;

  // Buka di tab baru. noopener untuk security.
  const win = window.open(url, '_blank', 'noopener,noreferrer');

  // Fallback: kalau popup ke-block, langsung redirect window saat ini
  if (!win || win.closed || typeof win.closed === 'undefined') {
    window.location.href = url;
  }
};

export const whatsappUrl = (message) => {
  const text = message || DEFAULT_MSG;
  const phone = contactInfo.whatsapp;
  const encoded = encodeURIComponent(text);
  return isMobile()
    ? `https://wa.me/${phone}?text=${encoded}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${encoded}`;
};
