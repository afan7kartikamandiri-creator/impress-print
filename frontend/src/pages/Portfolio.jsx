import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import PageTransition from '../components/PageTransition';
import { portfolioItems, contactInfo } from '../mock';

const handleWhatsApp = (msg) => {
  const text = msg || 'Halo Impress Print, saya tertarik dengan portfolio Anda';
  window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
};

const PortfolioHero = () => (
  <section className="relative pt-40 pb-24 bg-black overflow-hidden" data-testid="portfolio-hero">
    <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-3xl" />
    <div className="grain absolute inset-0" />
    <div className="container mx-auto px-6 lg:px-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-5xl"
      >
        <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-8">— Our Showcase</div>
        <h1 className="font-serif text-white leading-[0.95] mb-8" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', letterSpacing: '-0.04em' }}>
          Portfolio
          <br />
          <span className="font-italic-serif italic text-gold-gradient">Eksklusif</span>
        </h1>
        <p className="text-white/70 text-xl md:text-2xl max-w-3xl font-light leading-relaxed">
          Setiap project adalah kolaborasi yang menghasilkan karya bermakna. Lihat bagaimana kami
          membantu brand premium mewujudkan visi mereka.
        </p>
      </motion.div>
    </div>
  </section>
);

const PortfolioGrid = () => {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const categories = useMemo(() => {
    return ['All', ...new Set(portfolioItems.map((i) => i.category))];
  }, []);

  const filtered = filter === 'All' ? portfolioItems : portfolioItems.filter((i) => i.category === filter);

  return (
    <section className="py-24 bg-[#F5F1EA]" data-testid="portfolio-grid-section">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-16 justify-center" data-testid="portfolio-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              data-testid={`filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              className={`px-6 py-3 text-xs tracking-[0.25em] uppercase font-medium transition-all duration-500 border ${
                filter === cat
                  ? 'bg-black text-[#D4AF37] border-black'
                  : 'border-black/20 text-black/70 hover:border-[#D4AF37] hover:text-[#B8941F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <PhotoProvider
          maskOpacity={0.95}
          bannerVisible={false}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, delay: (i % 6) * 0.06 }}
                  className="group relative overflow-hidden bg-black cursor-pointer"
                  onClick={() => setSelected(item)}
                  data-testid={`portfolio-item-${item.id}`}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] mb-2">{item.category}</span>
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <span>{item.client}</span>
                      <span className="w-1 h-1 rounded-full bg-white/40" />
                      <span>{item.year}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#D4AF37]/0 group-hover:bg-[#D4AF37] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5 text-black" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </PhotoProvider>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl overflow-y-auto"
            onClick={() => setSelected(null)}
            data-testid="case-study-modal"
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
              className="min-h-screen flex items-start py-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
                <button
                  onClick={() => setSelected(null)}
                  className="fixed top-6 right-6 w-12 h-12 rounded-full bg-[#D4AF37] text-black flex items-center justify-center hover:scale-110 transition-transform z-10"
                  data-testid="close-case-study"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>

                <div className="aspect-[16/10] overflow-hidden mb-12">
                  <PhotoProvider>
                    <PhotoView src={selected.image}>
                      <img
                        src={selected.image}
                        alt={selected.title}
                        className="w-full h-full object-cover cursor-zoom-in"
                      />
                    </PhotoView>
                  </PhotoProvider>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4 block">{selected.category}</span>
                    <h2 className="font-serif text-5xl md:text-6xl text-white leading-[1] mb-8" style={{ letterSpacing: '-0.02em' }}>
                      {selected.title}
                    </h2>
                    <p className="text-white/70 text-lg leading-relaxed font-light mb-8">
                      {selected.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selected.tags.map((tag) => (
                        <span key={tag} className="px-4 py-2 border border-[#D4AF37]/40 text-[#D4AF37] text-xs tracking-[0.2em] uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t lg:border-t-0 lg:border-l border-[#D4AF37]/20 pt-8 lg:pt-0 lg:pl-12">
                    <div className="space-y-8">
                      <div>
                        <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-2">Client</div>
                        <div className="text-white text-xl font-serif">{selected.client}</div>
                      </div>
                      <div>
                        <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-2">Year</div>
                        <div className="text-white text-xl font-serif">{selected.year}</div>
                      </div>
                      <div>
                        <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-2">Category</div>
                        <div className="text-white text-xl font-serif">{selected.category}</div>
                      </div>
                      <button
                        onClick={() => handleWhatsApp(`Halo, saya tertarik dengan project mirip ${selected.title}`)}
                        data-testid="case-study-cta"
                        className="w-full mt-4 px-6 py-4 bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-colors text-xs tracking-[0.25em] uppercase font-medium flex items-center justify-center gap-2"
                      >
                        Project Serupa? Konsultasi
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const PortfolioCTA = () => (
  <section className="py-24 bg-black" data-testid="portfolio-cta">
    <div className="container mx-auto px-6 lg:px-12 text-center">
      <h2 className="font-serif text-5xl md:text-7xl text-white mb-8 leading-[1]" style={{ letterSpacing: '-0.02em' }}>
        Project Anda <span className="font-italic-serif italic text-gold-gradient">Berikutnya?</span>
      </h2>
      <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto font-light">
        Mari diskusikan visi Anda dan wujudkan menjadi karya yang memorable.
      </p>
      <button
        onClick={() => handleWhatsApp()}
        data-testid="portfolio-cta-button"
        className="magnetic-btn group relative px-12 py-6 bg-[#D4AF37] text-black overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-3 text-sm tracking-[0.25em] uppercase font-medium">
          Mulai Project Bersama
          <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
        </span>
      </button>
    </div>
  </section>
);

const Portfolio = () => {
  return (
    <PageTransition>
      <main className="page-content overflow-x-hidden">
        <PortfolioHero />
        <PortfolioGrid />
        <PortfolioCTA />
      </main>
    </PageTransition>
  );
};

export default Portfolio;
