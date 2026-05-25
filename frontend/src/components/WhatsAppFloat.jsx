import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Phone } from 'lucide-react';
import { contactInfo } from '../mock';

const WhatsAppFloat = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChat = (message) => {
    const msg = message || 'Halo Impress Print, saya ingin konsultasi mengenai layanan cetak premium';
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" data-testid="whatsapp-float">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.165, 0.84, 0.44, 1] }}
            className="glass-dark rounded-2xl p-6 w-80 shadow-2xl border border-[#D4AF37]/30"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-serif text-white text-lg">Konsultasi Premium</h4>
                <p className="text-white/60 text-xs">Respon cepat dalam 5 menit</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-subtle-pulse" />
            </div>

            <div className="space-y-2 mb-4">
              <button
                onClick={() => handleChat('Halo, saya ingin konsultasi untuk project printing premium')}
                className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-[#D4AF37]/10 text-white/80 hover:text-[#D4AF37] text-sm transition-all duration-300"
                data-testid="quick-chat-consult"
              >
                💎 Konsultasi project premium
              </button>
              <button
                onClick={() => handleChat('Halo, saya ingin minta penawaran harga')}
                className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-[#D4AF37]/10 text-white/80 hover:text-[#D4AF37] text-sm transition-all duration-300"
                data-testid="quick-chat-quote"
              >
                ✨ Minta penawaran harga
              </button>
              <button
                onClick={() => handleChat('Halo, saya ingin tahu tentang layanan UV printing')}
                className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-[#D4AF37]/10 text-white/80 hover:text-[#D4AF37] text-sm transition-all duration-300"
                data-testid="quick-chat-services"
              >
                🎨 Tanya layanan & material
              </button>
            </div>

            <button
              onClick={() => handleChat()}
              className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-black font-medium text-sm tracking-wider uppercase rounded-lg hover:shadow-lg hover:shadow-[#D4AF37]/30 transition-all"
              data-testid="open-whatsapp-chat"
            >
              Buka Chat WhatsApp
            </button>

            <div className="mt-4 pt-4 border-t border-white/10 text-center">
              <p className="text-white/50 text-xs">atau telepon langsung</p>
              <a href={`tel:${contactInfo.phone}`} className="text-[#D4AF37] font-medium text-sm mt-1 inline-flex items-center gap-2">
                <Phone size={14} /> {contactInfo.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-black rounded-full shadow-2xl flex items-center justify-center hover:shadow-[#D4AF37]/50 transition-all duration-500"
        data-testid="whatsapp-toggle"
        aria-label="WhatsApp Chat"
      >
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {expanded ? <X size={26} /> : <MessageCircle size={26} />}
        </motion.div>
        {!expanded && (
          <span className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/50 animate-ping" />
        )}
      </motion.button>
    </div>
  );
};

export default WhatsAppFloat;
