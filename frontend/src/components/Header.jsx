import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { logoUrl, contactInfo } from '../mock';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent('Halo Impress Print, saya ingin konsultasi')}`, '_blank');
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'py-3 glass-dark' : 'py-6 bg-transparent'
        }`}
        data-testid="main-header"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group" data-testid="nav-logo">
              <div className={`relative overflow-hidden rounded-full transition-all duration-700 ${scrolled ? 'w-11 h-11' : 'w-14 h-14'}`}>
                <img src={logoUrl} alt="Impress Print" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block">
                <div className={`font-serif font-bold tracking-tight transition-all duration-700 ${scrolled ? 'text-lg text-white' : 'text-xl text-white'}`}>
                  IMPRESS <span className="text-gold-gradient">PRINT</span>
                </div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-white/60 -mt-1">
                  Print Smart & Look Better
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-${link.name.toLowerCase()}`}
                  className={({ isActive }) =>
                    `text-sm tracking-[0.2em] uppercase font-medium underline-anim transition-colors ${
                      isActive ? 'text-[#D4AF37]' : 'text-white/85 hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <div className="hidden lg:block">
              <button
                onClick={handleWhatsApp}
                data-testid="header-cta-button"
                className="magnetic-btn relative px-7 py-3 border border-[#D4AF37] text-[#D4AF37] hover:text-black hover:bg-[#D4AF37] text-xs tracking-[0.25em] uppercase font-medium transition-all duration-500 group"
              >
                <span className="relative z-10">Konsultasi</span>
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-white p-2"
              data-testid="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `font-serif text-4xl ${isActive ? 'text-[#D4AF37]' : 'text-white'}`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleWhatsApp}
                className="mt-6 px-8 py-3 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-[0.25em] uppercase"
              >
                Konsultasi WhatsApp
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
