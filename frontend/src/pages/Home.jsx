import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  ArrowUpRight, ArrowRight, Star, Quote, Sparkles,
  Printer, Maximize, CreditCard, Layers, Scissors, Image as ImageIcon, Palette
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import AnimatedCounter from '../components/AnimatedCounter';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import { services, stats, testimonials, portfolioItems, contactInfo, beforeAfterShowcase } from '../mock';

const iconMap = {
  Printer, Sparkles, Maximize, CreditCard, Layers, Scissors, Image: ImageIcon, Palette
};

const handleWhatsApp = (msg) => {
  const text = msg || 'Halo Impress Print, saya ingin konsultasi premium printing';
  window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
};

// ============ HERO SECTION ============
const HeroSection = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={heroRef} className="relative h-screen overflow-hidden bg-black grain" data-testid="hero-section">
      {/* Animated Background Image with Ken Burns */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=2000&q=90"
          alt="Premium Printing"
          className="w-full h-full object-cover animate-ken-burns"
        />
      </motion.div>

      {/* Floating Gold Accents */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-[#D4AF37]/10 blur-3xl z-10" />
      <div className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-3xl z-10" />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-8 px-5 py-2 border border-[#D4AF37]/40 rounded-full glass"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-subtle-pulse" />
              <span className="text-xs tracking-[0.3em] uppercase text-white/90">Premium Printing Atelier</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="font-serif text-white leading-[0.95] mb-8"
              style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', letterSpacing: '-0.04em' }}
            >
              Print Smart
              <br />
              <span className="font-italic-serif italic text-gold-gradient">& Look Better</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="text-white/70 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed"
            >
              Studio percetakan premium yang menghadirkan kualitas eksibisi untuk setiap detail.
              Dari kartu nama eksekutif hingga merchandise corporate berskala besar.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => handleWhatsApp()}
                data-testid="hero-cta-konsultasi"
                className="magnetic-btn group relative px-10 py-5 bg-[#D4AF37] text-black overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 text-sm tracking-[0.25em] uppercase font-medium">
                  Mulai Konsultasi
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
                </span>
              </button>
              <Link
                to="/portfolio"
                data-testid="hero-cta-portfolio"
                className="group relative px-10 py-5 border border-white/30 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-500"
              >
                <span className="flex items-center gap-3 text-sm tracking-[0.25em] uppercase font-medium">
                  Lihat Portfolio
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </motion.div>
    </section>
  );
};

// ============ MARQUEE BANNER ============
const MarqueeBanner = () => {
  const words = ['Premium Quality', 'Bold Design', 'Precision Craft', 'Eksklusif', 'Luxury Print', 'Memorable'];
  return (
    <section className="py-12 bg-black border-y border-[#D4AF37]/20 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="flex items-center gap-16 mx-8">
            {words.map((word, i) => (
              <div key={`${idx}-${i}`} className="flex items-center gap-16">
                <span className="font-italic-serif italic text-3xl md:text-5xl text-white/90">{word}</span>
                <span className="text-[#D4AF37] text-2xl">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

// ============ STATS SECTION ============
const StatsSection = () => {
  return (
    <section className="relative py-32 bg-black overflow-hidden" data-testid="stats-section">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-3xl" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">— By The Numbers</div>
            <h2 className="font-serif text-white text-5xl md:text-7xl leading-[1] mb-6" style={{ letterSpacing: '-0.02em' }}>
              Bukan Sekedar
              <br />
              <span className="font-italic-serif italic text-gold-gradient">Angka Biasa</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-white/70 text-lg leading-relaxed font-light"
          >
            Lebih dari satu dekade perjalanan, ribuan brand, dan komitmen yang tidak pernah berubah:
            menghadirkan standar tertinggi dalam dunia percetakan premium di Indonesia.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="border-l border-[#D4AF37]/30 pl-6"
            >
              <AnimatedCounter {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ SERVICES PREVIEW ============
const ServicesPreview = () => {
  const featured = services.slice(0, 4);

  return (
    <section className="py-32 bg-[#F5F1EA] relative overflow-hidden" data-testid="services-preview-section">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div>
            <div className="text-xs tracking-[0.3em] uppercase text-[#B8941F] mb-6">— Our Services</div>
            <h2 className="font-serif text-5xl md:text-7xl leading-[1] text-black" style={{ letterSpacing: '-0.02em' }}>
              Layanan
              <br />
              <span className="font-italic-serif italic text-gold-gradient">Eksklusif</span>
            </h2>
          </div>
          <Link
            to="/services"
            className="group inline-flex items-center gap-3 text-black hover:text-[#B8941F] transition-colors"
            data-testid="view-all-services-link"
          >
            <span className="text-sm tracking-[0.25em] uppercase font-medium">Lihat Semua</span>
            <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
          {featured.map((service, i) => {
            const Icon = iconMap[service.icon] || Printer;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="bg-[#F5F1EA] p-12 group cursor-pointer relative overflow-hidden"
                onClick={() => handleWhatsApp(`Halo, saya tertarik dengan layanan ${service.name}`)}
                data-testid={`service-card-${service.slug}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 rounded-full blur-3xl transition-all duration-700" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 border border-[#D4AF37]/40 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-500">
                      <Icon className="w-6 h-6 text-[#B8941F] group-hover:text-black transition-colors" />
                    </div>
                    <span className="font-italic-serif italic text-[#B8941F]/50 text-5xl">0{i + 1}</span>
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl mb-3 text-black">{service.name}</h3>
                  <p className="font-italic-serif italic text-[#B8941F] text-lg mb-5">{service.tagline}</p>
                  <p className="text-black/60 leading-relaxed mb-8 font-light">{service.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase font-medium text-black group-hover:text-[#B8941F] transition-colors">
                    Selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============ FEATURED WORK ============
const FeaturedWork = () => {
  const featured = portfolioItems.slice(0, 3);

  return (
    <section className="py-32 bg-black relative overflow-hidden" data-testid="featured-work-section">
      <div className="grain absolute inset-0" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">— Featured Work</div>
          <h2 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl leading-[1]" style={{ letterSpacing: '-0.02em' }}>
            Karya
            <br />
            <span className="font-italic-serif italic text-gold-gradient">Pilihan Kami</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {featured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15 }}
              className={`relative group cursor-pointer overflow-hidden ${
                i === 0 ? 'lg:col-span-7 lg:row-span-2 aspect-[4/5]' : 'lg:col-span-5 aspect-[16/10]'
              }`}
              data-testid={`featured-work-${item.id}`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-500" />
              <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end">
                <span className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3">{item.category}</span>
                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-3 max-w-lg">{item.title}</h3>
                <p className="text-white/60 max-w-md font-light line-clamp-2">{item.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-white text-sm tracking-[0.2em] uppercase">
                  <span className="opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">View Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-3 px-10 py-5 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
            data-testid="explore-portfolio-link"
          >
            <span className="text-sm tracking-[0.25em] uppercase font-medium">Explore Full Portfolio</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ============ BEFORE / AFTER SHOWCASE ============
const BeforeAfterSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const item = beforeAfterShowcase[activeIndex];

  return (
    <section className="py-32 bg-black relative overflow-hidden" data-testid="before-after-section">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-3xl" />
      <div className="grain absolute inset-0" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">— The Transformation</div>
          <h2 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl leading-[1] mb-6" style={{ letterSpacing: '-0.02em' }}>
            Lihat <span className="font-italic-serif italic text-gold-gradient">Bedanya</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
            Geser slider untuk melihat bagaimana kami mentransformasi konsep biasa menjadi karya luar biasa.
          </p>
        </div>

        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <BeforeAfterSlider before={item.before} after={item.after} />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3">{item.category}</div>
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-3" style={{ letterSpacing: '-0.02em' }}>{item.title}</h3>
              <p className="text-white/60 leading-relaxed font-light">{item.description}</p>
            </div>
            <button
              onClick={() => handleWhatsApp(`Halo, saya tertarik dengan ${item.title}, ingin konsultasi.`)}
              className="magnetic-btn group relative px-8 py-4 border border-[#D4AF37] text-[#D4AF37] hover:text-black overflow-hidden"
              data-testid={`before-after-cta-${item.id}`}
            >
              <span className="relative z-10 flex items-center gap-3 text-xs tracking-[0.25em] uppercase font-medium">
                Mau Hasil Begini?
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>

        {/* Thumbnail navigation */}
        <div className="flex justify-center gap-3 mt-12 flex-wrap">
          {beforeAfterShowcase.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setActiveIndex(i)}
              data-testid={`before-after-nav-${i}`}
              className={`px-5 py-2.5 text-xs tracking-[0.25em] uppercase border transition-all duration-500 ${
                activeIndex === i
                  ? 'bg-[#D4AF37] border-[#D4AF37] text-black'
                  : 'border-white/20 text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              {b.category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ TESTIMONIALS ============
const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-[#F5F1EA] relative overflow-hidden" data-testid="testimonials-section">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="text-xs tracking-[0.3em] uppercase text-[#B8941F] mb-6">— Client Stories</div>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1] text-black mb-8" style={{ letterSpacing: '-0.02em' }}>
              Suara Para
              <br />
              <span className="font-italic-serif italic text-gold-gradient">Klien Premium</span>
            </h2>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  data-testid={`testimonial-dot-${i}`}
                  className={`h-1 transition-all duration-500 ${
                    active === i ? 'w-12 bg-[#D4AF37]' : 'w-6 bg-black/20'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 relative min-h-[400px]">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  x: active === i ? 0 : 40,
                  pointerEvents: active === i ? 'auto' : 'none'
                }}
                transition={{ duration: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
                className="absolute inset-0"
              >
                <Quote className="w-16 h-16 text-[#D4AF37]/30 mb-6" strokeWidth={1} />
                <p className="font-serif italic text-2xl md:text-3xl text-black leading-relaxed mb-10" style={{ letterSpacing: '-0.01em' }}>
                  "{t.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37]" />
                  <div>
                    <div className="font-serif text-xl text-black">{t.name}</div>
                    <div className="text-black/50 text-sm">{t.role}</div>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(t.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============ CTA SECTION ============
const CTASection = () => {
  return (
    <section className="relative py-32 bg-black overflow-hidden" data-testid="cta-section">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1568303479875-b96a014a9bcd?w=2000&q=90"
          alt="Premium printing"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-8">— Let's Create Together</div>
            <h2 className="font-serif text-white text-5xl md:text-7xl lg:text-8xl leading-[1] mb-10" style={{ letterSpacing: '-0.02em' }}>
              Wujudkan
              <br />
              <span className="font-italic-serif italic text-gold-gradient">Visi Premium</span>
              <br />
              Anda
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Konsultasikan project printing Anda dengan tim senior kami. Gratis tanpa biaya, dengan hasil yang memorable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleWhatsApp()}
                data-testid="cta-konsultasi-button"
                className="magnetic-btn group relative px-12 py-6 bg-[#D4AF37] text-black overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 text-sm tracking-[0.25em] uppercase font-medium">
                  Mulai Konsultasi Premium
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </span>
              </button>
              <a
                href={`tel:${contactInfo.phone}`}
                data-testid="cta-call-button"
                className="group px-12 py-6 border border-white/30 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-500 flex items-center justify-center gap-3"
              >
                <span className="text-sm tracking-[0.25em] uppercase font-medium">{contactInfo.phone}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============ MAIN HOME ============
const Home = () => {
  return (
    <PageTransition>
      <main className="page-content overflow-x-hidden">
        <HeroSection />
        <MarqueeBanner />
        <StatsSection />
        <ServicesPreview />
        <FeaturedWork />
        <BeforeAfterSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </PageTransition>
  );
};

export default Home;
