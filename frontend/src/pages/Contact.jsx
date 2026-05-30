import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Phone, Mail, MapPin, Clock, Instagram, Facebook, MessageCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { contactInfo } from '../mock';
import { openWhatsApp } from '../utils/whatsapp';

const handleWhatsApp = (msg) => {
  openWhatsApp(msg);
};

const ContactHero = () => (
  <section className="relative pt-40 pb-24 bg-black overflow-hidden" data-testid="contact-hero">
    <div className="absolute top-20 right-10 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-3xl" />
    <div className="grain absolute inset-0" />
    <div className="container mx-auto px-6 lg:px-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-5xl"
      >
        <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-8">— Let's Talk</div>
        <h1 className="font-serif text-white leading-[0.95] mb-8" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)', letterSpacing: '-0.04em' }}>
          Mari
          <br />
          <span className="font-italic-serif italic text-gold-gradient">Berkolaborasi</span>
        </h1>
        <p className="text-white/70 text-xl md:text-2xl max-w-3xl font-light leading-relaxed">
          Setiap project luar biasa dimulai dari satu percakapan. Kami siap mendengar visi Anda
          dan membantu mewujudkannya menjadi karya yang impressive.
        </p>
      </motion.div>
    </div>
  </section>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Halo Impress Print!

Nama: ${formData.name}
Email: ${formData.email}
Telepon: ${formData.phone}
Layanan: ${formData.service || 'Konsultasi Umum'}

Pesan:
${formData.message}`;
    handleWhatsApp(message);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-24 bg-[#F5F1EA]" data-testid="contact-form-section">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-7"
          >
            <div className="text-xs tracking-[0.3em] uppercase text-[#B8941F] mb-6">— Kirim Pesan</div>
            <h2 className="font-serif text-4xl md:text-5xl text-black mb-12 leading-[1]" style={{ letterSpacing: '-0.02em' }}>
              Ceritakan <span className="font-italic-serif italic text-gold-gradient">Project Anda</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8" data-testid="contact-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs tracking-[0.25em] uppercase text-black/60 mb-3 block">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    data-testid="form-name"
                    className="w-full bg-transparent border-b border-black/20 focus:border-[#D4AF37] py-3 text-black text-lg outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-[0.25em] uppercase text-black/60 mb-3 block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    data-testid="form-email"
                    className="w-full bg-transparent border-b border-black/20 focus:border-[#D4AF37] py-3 text-black text-lg outline-none transition-colors"
                    placeholder="hello@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs tracking-[0.25em] uppercase text-black/60 mb-3 block">No. Telepon *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    data-testid="form-phone"
                    className="w-full bg-transparent border-b border-black/20 focus:border-[#D4AF37] py-3 text-black text-lg outline-none transition-colors"
                    placeholder="0812 3456 7890"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-[0.25em] uppercase text-black/60 mb-3 block">Layanan</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    data-testid="form-service"
                    className="w-full bg-transparent border-b border-black/20 focus:border-[#D4AF37] py-3 text-black text-lg outline-none transition-colors"
                  >
                    <option value="">Pilih layanan</option>
                    <option value="UV Printing">UV Printing</option>
                    <option value="Luxury Gift Hamper">Luxury Gift Hamper</option>
                    <option value="Large Format">Large Format Printing</option>
                    <option value="Premium Cards">Premium Cards</option>
                    <option value="Akrilik">Akrilik & Display</option>
                    <option value="Cutting Sticker">Cutting Sticker</option>
                    <option value="Design">Creative Design</option>
                    <option value="E-Money">Custom E-Money Card</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs tracking-[0.25em] uppercase text-black/60 mb-3 block">Pesan *</label>
                <textarea
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  data-testid="form-message"
                  className="w-full bg-transparent border-b border-black/20 focus:border-[#D4AF37] py-3 text-black text-lg outline-none transition-colors resize-none"
                  placeholder="Ceritakan kebutuhan project Anda..."
                />
              </div>

              <button
                type="submit"
                data-testid="form-submit"
                className="magnetic-btn group relative px-12 py-5 bg-black text-white hover:text-[#D4AF37] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 text-sm tracking-[0.25em] uppercase font-medium">
                  {submitted ? 'Terkirim!' : 'Kirim via WhatsApp'}
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </span>
              </button>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5"
          >
            <div className="bg-black text-white p-10 lg:p-12 sticky top-32">
              <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">— Get in Touch</div>
              <h3 className="font-serif text-4xl mb-10" style={{ letterSpacing: '-0.02em' }}>
                Hubungi <span className="font-italic-serif italic text-gold-gradient">Langsung</span>
              </h3>

              <div className="space-y-7">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-white/40 mb-1">WhatsApp & Telepon</div>
                    <a href={`tel:${contactInfo.phone}`} className="text-xl font-serif hover:text-[#D4AF37] transition-colors" data-testid="contact-phone">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-white/40 mb-1">Email</div>
                    <a href={`mailto:${contactInfo.email}`} className="text-xl font-serif hover:text-[#D4AF37] transition-colors" data-testid="contact-email">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-white/40 mb-1">Studio</div>
                    <p className="text-lg font-serif">{contactInfo.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-xs tracking-[0.2em] uppercase text-white/40 mb-1">Jam Operasional</div>
                    <p className="text-sm font-light text-white/80">{contactInfo.hours.weekday}</p>
                    <p className="text-sm font-light text-white/80">{contactInfo.hours.saturday}</p>
                    <p className="text-sm font-light text-white/80">{contactInfo.hours.sunday}</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-white/10">
                <div className="text-xs tracking-[0.2em] uppercase text-white/40 mb-4">Follow Us</div>
                <div className="flex gap-3">
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 border border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-full flex items-center justify-center transition-all" data-testid="social-instagram-contact">
                    <Instagram size={16} />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-11 h-11 border border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-full flex items-center justify-center transition-all" data-testid="social-facebook-contact">
                    <Facebook size={16} />
                  </a>
                  <a href={contactInfo.social.tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-11 h-11 border border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-full flex items-center justify-center transition-all" data-testid="social-tiktok-contact" aria-label="TikTok">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleWhatsApp('Halo Impress Print, saya ingin konsultasi')}
                data-testid="direct-whatsapp-button"
                className="mt-10 w-full px-6 py-4 bg-[#D4AF37] text-black hover:bg-[#B8941F] transition-colors text-xs tracking-[0.25em] uppercase font-medium flex items-center justify-center gap-2"
              >
                <MessageCircle size={16} /> Chat WhatsApp Sekarang
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MapSection = () => (
  <section className="bg-black py-24 relative overflow-hidden" data-testid="map-section">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="text-center mb-12">
        <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">— Visit Our Studio</div>
        <h2 className="font-serif text-white text-5xl md:text-6xl leading-[1] mb-4" style={{ letterSpacing: '-0.02em' }}>
          Kunjungi <span className="font-italic-serif italic text-gold-gradient">Studio Kami</span>
        </h2>
        <p className="text-white/60 text-lg font-light max-w-xl mx-auto">
          Jl. Penganten Ali No. 63, Ciracas, Jakarta Timur
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden border-2 border-[#D4AF37]/30"
      >
        <iframe
          src="https://www.google.com/maps?q=Jl.+Penganten+Ali+No.+63,+Ciracas,+Jakarta+Timur&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.3) contrast(1.1)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Impress Print Location"
          data-testid="google-maps-embed"
        />
      </motion.div>
      <div className="text-center mt-8">
        <a
          href={contactInfo.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="open-google-maps-link"
          className="magnetic-btn group relative inline-flex items-center gap-3 px-10 py-5 border border-[#D4AF37] text-[#D4AF37] hover:text-black overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3 text-sm tracking-[0.25em] uppercase font-medium">
            Buka di Google Maps
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </span>
        </a>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const faqs = [
    { q: 'Berapa lama proses pengerjaan?', a: 'Tergantung jenis project, dari 1-7 hari kerja. Untuk produk express tersedia layanan 1 hari jadi.' },
    { q: 'Apakah ada minimum order?', a: 'Beberapa produk premium memiliki minimum order. Untuk produk standar, kami melayani dari 1 pcs.' },
    { q: 'Bagaimana proses revisi desain?', a: 'Kami menyediakan unlimited revisi desain hingga klien puas, dengan timeline yang disepakati bersama.' },
    { q: 'Apakah bisa kirim ke luar kota?', a: 'Tentu! Kami melayani pengiriman ke seluruh Indonesia dengan packaging premium yang aman.' }
  ];

  const [open, setOpen] = useState(0);

  return (
    <section className="py-32 bg-black" data-testid="faq-section">
      <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">— FAQ</div>
          <h2 className="font-serif text-white text-5xl md:text-6xl" style={{ letterSpacing: '-0.02em' }}>
            Pertanyaan <span className="font-italic-serif italic text-gold-gradient">Umum</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="border-b border-white/10"
              data-testid={`faq-${i}`}
            >
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full py-6 flex items-center justify-between text-left group"
              >
                <h3 className="font-serif text-xl md:text-2xl text-white group-hover:text-[#D4AF37] transition-colors pr-4">
                  {faq.q}
                </h3>
                <div className={`w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${open === i ? 'bg-[#D4AF37] rotate-45' : ''}`}>
                  <span className={`text-2xl ${open === i ? 'text-black' : 'text-[#D4AF37]'}`}>+</span>
                </div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <p className="pb-6 text-white/60 text-lg font-light leading-relaxed">{faq.a}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <PageTransition>
      <main className="page-content overflow-x-hidden">
        <ContactHero />
        <ContactForm />
        <MapSection />
        <FAQSection />
      </main>
    </PageTransition>
  );
};

export default Contact;
