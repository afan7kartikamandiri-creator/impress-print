import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, ArrowRight, Check,
  Printer, Sparkles, Maximize, CreditCard, Layers, Scissors, Image as ImageIcon, Palette
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { services, contactInfo } from '../mock';

const iconMap = { Printer, Sparkles, Maximize, CreditCard, Layers, Scissors, Image: ImageIcon, Palette };

const handleWhatsApp = (msg) => {
  const text = msg || 'Halo Impress Print, saya ingin konsultasi layanan';
  window.open(`https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
};

const ServicesHero = () => (
  <section className="relative pt-40 pb-24 bg-black overflow-hidden" data-testid="services-hero">
    <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#D4AF37]/5 blur-3xl" />
    <div className="grain absolute inset-0" />
    <div className="container mx-auto px-6 lg:px-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-5xl"
      >
        <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-8">— What We Offer</div>
        <h1 className="font-serif text-white leading-[0.95] mb-8" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', letterSpacing: '-0.04em' }}>
          Layanan
          <br />
          <span className="font-italic-serif italic text-gold-gradient">Premium</span>
        </h1>
        <p className="text-white/70 text-xl md:text-2xl max-w-3xl font-light leading-relaxed">
          Setiap layanan kami dirancang dengan standar premium untuk menghasilkan output
          yang tidak hanya bagus, tapi <em className="font-italic-serif text-[#D4AF37]">memorable</em>.
        </p>
      </motion.div>
    </div>
  </section>
);

const ServicesList = () => (
  <section className="bg-[#F5F1EA]" data-testid="services-list">
    <div className="container mx-auto">
      {services.map((service, i) => {
        const Icon = iconMap[service.icon] || Printer;
        const isEven = i % 2 === 0;
        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9 }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20 items-center py-24 border-b border-black/10 px-6 lg:px-12 ${
              !isEven ? 'lg:flex-row-reverse' : ''
            }`}
            data-testid={`service-item-${service.slug}`}
          >
            <div className={`relative overflow-hidden aspect-[4/5] ${!isEven ? 'lg:order-2' : ''}`}>
              <img src={service.image} alt={service.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" />
              <div className="absolute top-6 left-6 w-14 h-14 rounded-full bg-black/80 backdrop-blur-md flex items-center justify-center">
                <Icon className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </div>
            <div className={!isEven ? 'lg:order-1' : ''}>
              <div className="font-italic-serif italic text-[#B8941F]/60 text-7xl md:text-8xl mb-4">0{i + 1}</div>
              <div className="text-xs tracking-[0.3em] uppercase text-[#B8941F] mb-4">— {service.tagline}</div>
              <h2 className="font-serif text-5xl md:text-6xl mb-6 text-black" style={{ letterSpacing: '-0.02em' }}>
                {service.name}
              </h2>
              <p className="text-black/70 text-lg leading-relaxed mb-8 font-light">
                {service.longDescription}
              </p>

              <div className="mb-8">
                <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">Highlight</div>
                <ul className="space-y-3">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-[#B8941F]" />
                      </div>
                      <span className="text-black/80 font-light">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-10">
                <div className="text-xs tracking-[0.3em] uppercase text-black/40 mb-4">Material Pilihan</div>
                <div className="flex flex-wrap gap-2">
                  {service.materials.map((mat) => (
                    <span key={mat} className="px-4 py-2 border border-[#D4AF37]/40 text-sm text-black/70 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleWhatsApp(`Halo, saya tertarik dengan layanan ${service.name}`)}
                className="magnetic-btn group relative px-8 py-4 bg-black text-white hover:text-[#D4AF37] overflow-hidden"
                data-testid={`service-cta-${service.slug}`}
              >
                <span className="relative z-10 flex items-center gap-3 text-sm tracking-[0.25em] uppercase font-medium">
                  Konsultasi Layanan Ini
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </span>
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  </section>
);

const ProcessSection = () => {
  const steps = [
    { num: '01', title: 'Konsultasi', desc: 'Diskusikan project Anda dengan tim senior kami' },
    { num: '02', title: 'Penawaran', desc: 'Terima penawaran detail dengan harga transparan' },
    { num: '03', title: 'Desain & Mockup', desc: 'Review desain dan approval mockup sebelum produksi' },
    { num: '04', title: 'Produksi', desc: 'Quality control ketat di setiap tahap produksi' },
    { num: '05', title: 'Delivery', desc: 'Pengiriman tepat waktu dengan packaging premium' }
  ];

  return (
    <section className="py-32 bg-black relative overflow-hidden" data-testid="process-section">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">— Our Process</div>
          <h2 className="font-serif text-white text-5xl md:text-7xl" style={{ letterSpacing: '-0.02em' }}>
            Proses <span className="font-italic-serif italic text-gold-gradient">Eksklusif</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative"
            >
              <div className="font-serif text-7xl md:text-8xl text-[#D4AF37]/30 mb-4">{step.num}</div>
              <h3 className="font-serif text-2xl text-white mb-3">{step.title}</h3>
              <p className="text-white/50 font-light text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <PageTransition>
      <main className="page-content overflow-x-hidden">
        <ServicesHero />
        <ServicesList />
        <ProcessSection />
      </main>
    </PageTransition>
  );
};

export default Services;
