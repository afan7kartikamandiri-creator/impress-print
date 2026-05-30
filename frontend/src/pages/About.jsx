import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Gem, Lightbulb, Handshake, Award } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { teamMembers, milestones, values, contactInfo } from '../mock';
import { openWhatsApp } from '../utils/whatsapp';

const iconMap = { Gem, Lightbulb, Handshake, Award };

const handleWhatsApp = (msg) => {
  openWhatsApp(msg);
};

const AboutHero = () => (
  <section className="relative pt-40 pb-24 bg-black overflow-hidden" data-testid="about-hero">
    <div className="absolute top-20 right-10 w-[700px] h-[700px] rounded-full bg-[#D4AF37]/5 blur-3xl" />
    <div className="grain absolute inset-0" />
    <div className="container mx-auto px-6 lg:px-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-5xl"
      >
        <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-8">— Our Story</div>
        <h1 className="font-serif text-white leading-[0.95] mb-8" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', letterSpacing: '-0.04em' }}>
          Beyond
          <br />
          <span className="font-italic-serif italic text-gold-gradient">Printing</span>
        </h1>
        <p className="text-white/70 text-xl md:text-2xl max-w-3xl font-light leading-relaxed">
          Kami bukan sekedar percetakan. Kami adalah <em className="font-italic-serif text-[#D4AF37]">printing atelier</em> —
          tempat dimana craftsmanship bertemu teknologi modern untuk menghasilkan karya yang tidak terlupakan.
        </p>
      </motion.div>
    </div>
  </section>
);

const StorySection = () => (
  <section className="py-32 bg-[#F5F1EA] relative overflow-hidden" data-testid="story-section">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-5"
        >
          <div className="text-xs tracking-[0.3em] uppercase text-[#B8941F] mb-6">— Our Philosophy</div>
          <h2 className="font-serif text-5xl md:text-6xl leading-[1] mb-8" style={{ letterSpacing: '-0.02em' }}>
            Print Smart
            <br />
            <span className="font-italic-serif italic text-gold-gradient">& Look Better</span>
          </h2>
          <p className="text-black/70 text-lg leading-relaxed mb-6 font-light">
            Di Impress Print, kami percaya bahwa setiap hasil cetak adalah representasi dari sebuah brand.
            Setiap kartu nama menceritakan profesionalisme. Setiap merchandise membawa nilai. Setiap banner
            menjadi statement.
          </p>
          <p className="text-black/70 text-lg leading-relaxed font-light">
            Itulah mengapa kami berinvestasi pada teknologi premium, designer expert, dan proses quality control
            yang ketat. Karena <em className="font-italic-serif text-[#B8941F]">kesan pertama hanya terjadi sekali</em>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-7 relative"
        >
          <div className="aspect-[4/5] overflow-hidden max-w-xl mx-auto">
            <img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=85" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#D4AF37] flex items-center justify-center">
            <div className="text-center text-black">
              <div className="font-serif text-3xl">12+</div>
              <div className="text-[10px] tracking-[0.2em] uppercase">Years</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const ValuesSection = () => (
  <section className="py-32 bg-black relative" data-testid="values-section">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="text-center mb-20">
        <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">— Our Values</div>
        <h2 className="font-serif text-white text-5xl md:text-7xl" style={{ letterSpacing: '-0.02em' }}>
          Nilai-Nilai <span className="font-italic-serif italic text-gold-gradient">Inti Kami</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D4AF37]/10">
        {values.map((value, i) => {
          const Icon = iconMap[value.icon];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="bg-black p-10 group hover:bg-[#D4AF37]/5 transition-all duration-700"
              data-testid={`value-card-${i}`}
            >
              <div className="w-14 h-14 border border-[#D4AF37]/40 rounded-full flex items-center justify-center mb-8 group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-500">
                {Icon && <Icon className="w-6 h-6 text-[#D4AF37] group-hover:text-black transition-colors" />}
              </div>
              <h3 className="font-serif text-3xl text-white mb-4">{value.title}</h3>
              <p className="text-white/60 leading-relaxed font-light">{value.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

const TimelineSection = () => (
  <section className="py-32 bg-[#F5F1EA] relative overflow-hidden" data-testid="timeline-section">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="text-center mb-20">
        <div className="text-xs tracking-[0.3em] uppercase text-[#B8941F] mb-6">— Our Journey</div>
        <h2 className="font-serif text-5xl md:text-7xl text-black" style={{ letterSpacing: '-0.02em' }}>
          Perjalanan <span className="font-italic-serif italic text-gold-gradient">Kami</span>
        </h2>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
        {milestones.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className={`relative mb-16 pl-20 md:pl-0 md:flex md:items-center md:gap-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            data-testid={`milestone-${m.year}`}
          >
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D4AF37] ring-4 ring-[#F5F1EA]" />
            <div className="md:flex-1">
              <div className="font-serif text-6xl md:text-7xl text-gold-gradient mb-3">{m.year}</div>
            </div>
            <div className="md:flex-1 md:px-8">
              <h3 className="font-serif text-2xl md:text-3xl mb-3 text-black">{m.title}</h3>
              <p className="text-black/60 leading-relaxed font-light">{m.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const TeamSection = () => (
  <section className="py-32 bg-black relative" data-testid="team-section">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="text-center mb-20">
        <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">— Meet The Team</div>
        <h2 className="font-serif text-white text-5xl md:text-7xl" style={{ letterSpacing: '-0.02em' }}>
          Tim <span className="font-italic-serif italic text-gold-gradient">Visioner</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="group"
            data-testid={`team-member-${member.id}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden mb-8 bg-[#D4AF37]/10">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute top-6 left-6 w-12 h-px bg-[#D4AF37]" />
            </div>
            <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-3">— 0{i + 1}</div>
            <h3 className="font-serif text-white text-3xl lg:text-4xl mb-2" style={{ letterSpacing: '-0.01em' }}>{member.name}</h3>
            <p className="text-[#D4AF37] text-sm tracking-[0.2em] uppercase mb-4">{member.role}</p>
            <p className="text-white/60 text-base font-light leading-relaxed max-w-md">{member.bio}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const AboutCTA = () => (
  <section className="py-24 bg-[#F5F1EA]" data-testid="about-cta">
    <div className="container mx-auto px-6 lg:px-12 text-center">
      <h2 className="font-serif text-5xl md:text-6xl text-black mb-8 leading-[1]" style={{ letterSpacing: '-0.02em' }}>
        Jadi Bagian dari <span className="font-italic-serif italic text-gold-gradient">Cerita Kami</span>
      </h2>
      <p className="text-black/60 text-xl mb-12 max-w-2xl mx-auto font-light">
        Berkolaborasi dengan kami untuk hasil cetak yang akan memberikan kesan tak terlupakan.
      </p>
      <button
        onClick={() => handleWhatsApp()}
        data-testid="about-cta-button"
        className="magnetic-btn group relative px-12 py-6 bg-black text-white hover:text-[#D4AF37] overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-3 text-sm tracking-[0.25em] uppercase font-medium">
          Hubungi Tim Kami
          <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
        </span>
      </button>
    </div>
  </section>
);

const About = () => {
  return (
    <PageTransition>
      <main className="page-content overflow-x-hidden">
        <AboutHero />
        <StorySection />
        <ValuesSection />
        <TimelineSection />
        <TeamSection />
        <AboutCTA />
      </main>
    </PageTransition>
  );
};

export default About;
