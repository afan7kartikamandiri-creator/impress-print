import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { logoUrl, contactInfo } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white overflow-hidden" data-testid="main-footer">
      <div className="grain absolute inset-0" />

      {/* Top Big Marquee */}
      <div className="border-y border-white/10 py-8 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center mx-12">
              <span className="marquee-text text-gold-gradient" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
                IMPRESS PRINT
              </span>
              <span className="mx-12 text-[#D4AF37] text-6xl font-serif">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link to="/" className="inline-flex items-center gap-4 mb-6">
                <img src={logoUrl} alt="Impress Print" className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <div className="font-serif text-2xl font-bold">IMPRESS <span className="text-gold-gradient">PRINT</span></div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-white/60 -mt-1">Print Smart & Look Better</div>
                </div>
              </Link>
              <p className="text-white/60 leading-relaxed text-lg max-w-md font-light">
                Membentuk masa depan percetakan Indonesia dengan standar premium, teknologi terdepan, dan dedikasi pada kualitas yang tidak bisa dikompromi.
              </p>
              <div className="mt-8 flex gap-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 border border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-full flex items-center justify-center transition-all duration-500" data-testid="footer-instagram" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 border border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-full flex items-center justify-center transition-all duration-500" data-testid="footer-facebook" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href={contactInfo.social.tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 border border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-full flex items-center justify-center transition-all duration-500" data-testid="footer-tiktok" aria-label="TikTok">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
                  </svg>
                </a>
                <a href={`mailto:${contactInfo.email}`} className="w-11 h-11 border border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-full flex items-center justify-center transition-all duration-500" data-testid="footer-email-icon" aria-label="Email">
                  <Mail size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">Navigation</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-white/70 hover:text-[#D4AF37] font-light text-base transition-colors duration-300 flex items-center gap-2 group"
                  >
                    {item}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h4 className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">Get in Touch</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{contactInfo.phone}</div>
                  <div className="text-white/50 text-sm">WhatsApp & Telepon</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{contactInfo.email}</div>
                  <div className="text-white/50 text-sm">Email kami</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">{contactInfo.address}</div>
                  <div className="text-white/50 text-sm">Studio kami</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm font-light">
            © {currentYear} Impress Print. Crafted with precision.
          </p>
          <p className="text-white/40 text-sm font-italic-serif italic">
            "Print Smart & Look Better"
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
