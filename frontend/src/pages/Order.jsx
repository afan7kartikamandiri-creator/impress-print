import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Check, Sparkles, Zap, Clock,
  Printer, CreditCard, Coffee, Layers, Scissors, Image as ImageIcon, Palette, Maximize
} from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { contactInfo } from '../mock';
import { openWhatsApp } from '../utils/whatsapp';

const productOptions = [
  { id: 'uv-printing', name: 'UV Printing', icon: Printer, desc: 'Multi-material premium' },
  { id: 'tumbler', name: 'Tumbler Custom', icon: Coffee, desc: 'Mug, tumbler, botol minum' },
  { id: 'lanyard', name: 'Lanyard Custom', icon: Sparkles, desc: 'ID card holder & talinya' },
  { id: 'cards', name: 'Kartu Premium', icon: CreditCard, desc: 'Kartu nama, undangan' },
  { id: 'akrilik', name: 'Akrilik & Display', icon: Layers, desc: 'Plakat, signage, display' },
  { id: 'large-format', name: 'Banner & Poster', icon: Maximize, desc: 'A3, A2, banner besar' },
  { id: 'sticker', name: 'Cutting Stiker', icon: Scissors, desc: 'Stiker custom presisi' },
  { id: 'photo', name: 'Cetak Foto', icon: ImageIcon, desc: 'Foto fine art' },
  { id: 'merch', name: 'Merchandise', icon: Sparkles, desc: 'Tote bag, t-shirt, dll' },
  { id: 'design', name: 'Jasa Desain', icon: Palette, desc: 'Desain custom oleh expert' },
  { id: 'lainnya', name: 'Lainnya', icon: Sparkles, desc: 'Konsultasi produk lain' }
];

const keperluanOptions = [
  { value: 'Pribadi', emoji: '👤' },
  { value: 'Hadiah / Souvenir', emoji: '🎁' },
  { value: 'Komunitas', emoji: '👥' },
  { value: 'Bisnis / Corporate', emoji: '💼' },
  { value: 'Event / Acara', emoji: '🎪' },
  { value: 'Sekolah / Kampus', emoji: '🎓' }
];

const finishingOptions = [
  '— Tidak ada / Standard —',
  'Glossy (Mengkilap)',
  'Matte (Doff)',
  'Laminasi Glossy',
  'Laminasi Doff',
  'Hot Stamping Gold/Silver',
  'Spot UV',
  'Embossing / Debossing',
  'Cutting / Pond',
  'Lainnya (tulis di catatan)'
];

const deadlineOptions = [
  { value: '1 Hari (Express)', icon: '⚡' },
  { value: '2-3 Hari', icon: '🚀' },
  { value: '1 Minggu', icon: '📅' },
  { value: 'Fleksibel', icon: '🕐' }
];

const StepIndicator = ({ current }) => {
  const steps = [
    { num: 1, label: 'Data Diri' },
    { num: 2, label: 'Detail Produk' },
    { num: 3, label: 'Konfirmasi' }
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-12">
      {steps.map((step, i) => (
        <React.Fragment key={step.num}>
          <div className="flex items-center gap-3" data-testid={`step-indicator-${step.num}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-semibold transition-all duration-500 ${
              current === step.num
                ? 'bg-[#D4AF37] text-black ring-4 ring-[#D4AF37]/20'
                : current > step.num
                ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]'
                : 'border border-white/20 text-white/40'
            }`}>
              {current > step.num ? <Check size={18} /> : step.num}
            </div>
            <span className={`hidden sm:block text-xs tracking-[0.2em] uppercase transition-colors ${
              current === step.num ? 'text-[#D4AF37]' : current > step.num ? 'text-white/70' : 'text-white/30'
            }`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-px w-8 sm:w-16 transition-colors duration-500 ${
              current > step.num ? 'bg-[#D4AF37]' : 'bg-white/15'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const Order = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    nama: '',
    whatsapp: '',
    email: '',
    keperluan: '',
    alamat: '',
    produk: '',
    jumlah: '',
    ukuran: '',
    finishing: '',
    deadline: '',
    catatan: '',
    pengambilan: ''
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const step1Valid = form.nama.trim() && form.whatsapp.trim() && form.keperluan;
  const step2Valid = form.produk && form.jumlah;

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const selectedProduct = productOptions.find((p) => p.id === form.produk);

  const submit = () => {
    const message = `📋 *ORDER REQUEST — IMPRESS PRINT*

━━━━━━━━━━━━━━━━━
👤 *DATA PEMESAN*
━━━━━━━━━━━━━━━━━
Nama: ${form.nama}
WhatsApp: ${form.whatsapp}
${form.email ? `Email: ${form.email}\n` : ''}Keperluan: ${form.keperluan}

━━━━━━━━━━━━━━━━━
🎯 *DETAIL PRODUK*
━━━━━━━━━━━━━━━━━
Produk: ${selectedProduct?.name || form.produk}
Jumlah: ${form.jumlah} pcs
${form.ukuran ? `Ukuran/Tipe: ${form.ukuran}\n` : ''}${form.finishing ? `Finishing: ${form.finishing}\n` : ''}Deadline: ${form.deadline || 'Fleksibel'}

━━━━━━━━━━━━━━━━━
📦 *PENGAMBILAN*
━━━━━━━━━━━━━━━━━
Metode: ${form.pengambilan || 'Pickup langsung'}
${form.alamat ? `Alamat: ${form.alamat}\n` : ''}
${form.catatan ? `\n📝 *Catatan:*\n${form.catatan}\n` : ''}
━━━━━━━━━━━━━━━━━
Mohon dibantu untuk penawaran harga dan info lebih lanjut. Terima kasih! 🙏`;

    openWhatsApp(message);
  };

  return (
    <PageTransition>
      <main className="page-content overflow-x-hidden bg-black min-h-screen">
        {/* Hero */}
        <section className="relative pt-40 pb-12 bg-black overflow-hidden">
          <div className="absolute top-20 right-10 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-3xl" />
          <div className="grain absolute inset-0" />
          <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
            <div className="text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-6">— Pesan Sekarang</div>
            <h1 className="font-serif text-white leading-[1] mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>
              Mulai <span className="font-italic-serif italic text-gold-gradient">Project</span> Anda
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto font-light">
              Isi form di bawah, kami akan respon cepat via WhatsApp dengan penawaran harga terbaik.
            </p>
          </div>
        </section>

        {/* Wizard */}
        <section className="relative bg-black pb-32">
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <StepIndicator current={step} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto">
              {/* Main Form */}
              <div className="lg:col-span-8">
                <div className="bg-white/[0.02] border border-[#D4AF37]/20 p-8 md:p-12">
                  <AnimatePresence mode="wait">
                    {/* STEP 1: DATA DIRI */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}
                        data-testid="step-1-content"
                      >
                        <h2 className="font-serif text-3xl md:text-4xl text-white mb-2" style={{ letterSpacing: '-0.02em' }}>Data Diri</h2>
                        <p className="text-white/50 mb-10 font-light">Masukkan informasi kontak agar kami bisa menghubungi Anda.</p>

                        <div className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <label className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3 block">Nama Lengkap *</label>
                              <input
                                type="text"
                                value={form.nama}
                                onChange={(e) => update('nama', e.target.value)}
                                data-testid="input-nama"
                                className="w-full bg-transparent border-b border-white/15 focus:border-[#D4AF37] py-3 text-white text-lg outline-none transition-colors"
                                placeholder="John Doe"
                              />
                            </div>
                            <div>
                              <label className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3 block">No. WhatsApp *</label>
                              <input
                                type="tel"
                                value={form.whatsapp}
                                onChange={(e) => update('whatsapp', e.target.value)}
                                data-testid="input-whatsapp"
                                className="w-full bg-transparent border-b border-white/15 focus:border-[#D4AF37] py-3 text-white text-lg outline-none transition-colors"
                                placeholder="0812 3456 7890"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3 block">
                              Email <span className="text-white/30 normal-case tracking-normal">(opsional)</span>
                            </label>
                            <input
                              type="email"
                              value={form.email}
                              onChange={(e) => update('email', e.target.value)}
                              data-testid="input-email"
                              className="w-full bg-transparent border-b border-white/15 focus:border-[#D4AF37] py-3 text-white text-lg outline-none transition-colors"
                              placeholder="hello@example.com"
                            />
                          </div>

                          <div>
                            <label className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3 block">Keperluan *</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {keperluanOptions.map((opt) => (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => update('keperluan', opt.value)}
                                  data-testid={`keperluan-${opt.value.replace(/\s+/g, '-').toLowerCase()}`}
                                  className={`px-4 py-3 text-sm border transition-all duration-300 text-left ${
                                    form.keperluan === opt.value
                                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white'
                                      : 'border-white/15 text-white/70 hover:border-[#D4AF37]/50 hover:text-white'
                                  }`}
                                >
                                  <span className="text-lg mr-2">{opt.emoji}</span>{opt.value}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3 block">
                              Alamat Pengiriman <span className="text-white/30 normal-case tracking-normal">(opsional, kosongkan jika pickup)</span>
                            </label>
                            <textarea
                              value={form.alamat}
                              onChange={(e) => update('alamat', e.target.value)}
                              rows="2"
                              data-testid="input-alamat"
                              className="w-full bg-transparent border border-white/15 focus:border-[#D4AF37] p-3 text-white outline-none transition-colors resize-none"
                              placeholder="Isi jika ingin dikirim. Kosongkan jika mau pickup langsung."
                            />
                          </div>
                        </div>

                        <div className="flex justify-end mt-12">
                          <button
                            onClick={next}
                            disabled={!step1Valid}
                            data-testid="next-step-1"
                            className={`magnetic-btn group relative px-10 py-4 overflow-hidden transition-all ${
                              step1Valid
                                ? 'bg-[#D4AF37] text-black hover:shadow-lg hover:shadow-[#D4AF37]/30'
                                : 'bg-white/5 text-white/30 cursor-not-allowed'
                            }`}
                          >
                            <span className="relative z-10 flex items-center gap-3 text-sm tracking-[0.25em] uppercase font-medium">
                              Lanjut ke Detail Produk
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: DETAIL PRODUK */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}
                        data-testid="step-2-content"
                      >
                        <h2 className="font-serif text-3xl md:text-4xl text-white mb-2" style={{ letterSpacing: '-0.02em' }}>Detail Produk</h2>
                        <p className="text-white/50 mb-10 font-light">Pilih produk yang Anda inginkan dan spesifikasinya.</p>

                        {/* Product Grid */}
                        <div className="mb-10">
                          <label className="text-xs tracking-[0.25em] uppercase text-white/60 mb-4 block">Pilih Produk *</label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {productOptions.map((p) => {
                              const Icon = p.icon;
                              const active = form.produk === p.id;
                              return (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() => update('produk', p.id)}
                                  data-testid={`product-${p.id}`}
                                  className={`p-5 border text-left transition-all duration-300 group ${
                                    active
                                      ? 'bg-[#D4AF37]/10 border-[#D4AF37]'
                                      : 'border-white/15 hover:border-[#D4AF37]/50 hover:bg-white/[0.02]'
                                  }`}
                                >
                                  <Icon className={`w-7 h-7 mb-3 ${active ? 'text-[#D4AF37]' : 'text-white/60 group-hover:text-[#D4AF37]'} transition-colors`} />
                                  <div className={`font-serif text-base mb-1 ${active ? 'text-white' : 'text-white/90'}`}>{p.name}</div>
                                  <div className="text-xs text-white/40 font-light">{p.desc}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div>
                            <label className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3 block">Jumlah *</label>
                            <input
                              type="number"
                              min="1"
                              value={form.jumlah}
                              onChange={(e) => update('jumlah', e.target.value)}
                              data-testid="input-jumlah"
                              className="w-full bg-transparent border-b border-white/15 focus:border-[#D4AF37] py-3 text-white text-lg outline-none transition-colors"
                              placeholder="10"
                            />
                            <p className="text-xs text-white/30 mt-2">Semakin banyak, semakin hemat ✨</p>
                          </div>
                          <div>
                            <label className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3 block">
                              Ukuran / Tipe <span className="text-white/30 normal-case tracking-normal">(opsional)</span>
                            </label>
                            <input
                              type="text"
                              value={form.ukuran}
                              onChange={(e) => update('ukuran', e.target.value)}
                              data-testid="input-ukuran"
                              className="w-full bg-transparent border-b border-white/15 focus:border-[#D4AF37] py-3 text-white text-lg outline-none transition-colors"
                              placeholder="Contoh: A3, 9x5.5cm, 500ml"
                            />
                          </div>
                        </div>

                        <div className="mb-8">
                          <label className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3 block">
                            Finishing <span className="text-white/30 normal-case tracking-normal">(opsional)</span>
                          </label>
                          <select
                            value={form.finishing}
                            onChange={(e) => update('finishing', e.target.value)}
                            data-testid="input-finishing"
                            className="w-full bg-black border border-white/15 focus:border-[#D4AF37] p-3 text-white outline-none transition-colors"
                          >
                            <option value="">Pilih finishing (jika ada)...</option>
                            {finishingOptions.map((f, i) => (
                              <option key={i} value={f === '— Tidak ada / Standard —' ? '' : f}>{f}</option>
                            ))}
                          </select>
                        </div>

                        <div className="mb-8">
                          <label className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3 block">Deadline / Kapan Butuh</label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {deadlineOptions.map((d) => (
                              <button
                                key={d.value}
                                type="button"
                                onClick={() => update('deadline', d.value)}
                                data-testid={`deadline-${d.value.replace(/\s+/g, '-').toLowerCase()}`}
                                className={`px-4 py-3 text-sm border transition-all duration-300 ${
                                  form.deadline === d.value
                                    ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white'
                                    : 'border-white/15 text-white/70 hover:border-[#D4AF37]/50'
                                }`}
                              >
                                <span className="text-lg mr-2">{d.icon}</span>{d.value}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mb-8">
                          <label className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3 block">
                            Catatan Tambahan <span className="text-white/30 normal-case tracking-normal">(opsional)</span>
                          </label>
                          <textarea
                            value={form.catatan}
                            onChange={(e) => update('catatan', e.target.value)}
                            rows="3"
                            data-testid="input-catatan"
                            className="w-full bg-transparent border border-white/15 focus:border-[#D4AF37] p-3 text-white outline-none transition-colors resize-none"
                            placeholder="Ceritakan detail tambahan: warna, referensi desain, dll."
                          />
                        </div>

                        <div className="p-4 bg-[#D4AF37]/5 border border-[#D4AF37]/20 mb-8">
                          <p className="text-sm text-white/70 font-light leading-relaxed">
                            💡 <span className="text-[#D4AF37] font-medium">File desain</span> bisa langsung dikirim ke kami via WhatsApp setelah Anda submit form ini. Format: CDR, AI, PDF, PNG, JPG.
                          </p>
                        </div>

                        <div className="flex justify-between gap-4">
                          <button
                            onClick={prev}
                            data-testid="prev-step-2"
                            className="px-8 py-4 border border-white/20 text-white/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center gap-3 text-sm tracking-[0.25em] uppercase font-medium"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                          </button>
                          <button
                            onClick={next}
                            disabled={!step2Valid}
                            data-testid="next-step-2"
                            className={`magnetic-btn group relative px-10 py-4 overflow-hidden transition-all ${
                              step2Valid
                                ? 'bg-[#D4AF37] text-black hover:shadow-lg hover:shadow-[#D4AF37]/30'
                                : 'bg-white/5 text-white/30 cursor-not-allowed'
                            }`}
                          >
                            <span className="relative z-10 flex items-center gap-3 text-sm tracking-[0.25em] uppercase font-medium">
                              Lanjut ke Konfirmasi
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: KONFIRMASI */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.4 }}
                        data-testid="step-3-content"
                      >
                        <h2 className="font-serif text-3xl md:text-4xl text-white mb-2" style={{ letterSpacing: '-0.02em' }}>Konfirmasi Order</h2>
                        <p className="text-white/50 mb-10 font-light">Cek kembali detail order Anda sebelum dikirim.</p>

                        <div className="space-y-1 border border-white/10 divide-y divide-white/10">
                          {[
                            ['Nama', form.nama],
                            ['WhatsApp', form.whatsapp],
                            ['Email', form.email || '—'],
                            ['Keperluan', form.keperluan],
                            ['Produk', selectedProduct?.name || '—'],
                            ['Jumlah', form.jumlah ? `${form.jumlah} pcs` : '—'],
                            ['Ukuran / Tipe', form.ukuran || '—'],
                            ['Finishing', form.finishing || 'Standard'],
                            ['Deadline', form.deadline || 'Fleksibel'],
                            ['Catatan', form.catatan || '—']
                          ].map(([label, value]) => (
                            <div key={label} className="flex justify-between items-start p-4 gap-4">
                              <span className="text-white/50 text-sm tracking-wider uppercase">{label}</span>
                              <span className="text-white text-right font-light max-w-[60%] break-words">{value}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-8 mb-8">
                          <label className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3 block">Metode Pengambilan *</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {['Pickup Langsung (Ciracas)', 'Kirim ke Alamat (Ongkir Terpisah)'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => update('pengambilan', opt)}
                                data-testid={`pengambilan-${opt.includes('Pickup') ? 'pickup' : 'kirim'}`}
                                className={`p-4 border text-left transition-all duration-300 ${
                                  form.pengambilan === opt
                                    ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-white'
                                    : 'border-white/15 text-white/70 hover:border-[#D4AF37]/50'
                                }`}
                              >
                                <div className="font-medium">{opt}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between gap-4 flex-col-reverse sm:flex-row">
                          <button
                            onClick={prev}
                            data-testid="prev-step-3"
                            className="px-8 py-4 border border-white/20 text-white/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center gap-3 text-sm tracking-[0.25em] uppercase font-medium"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            Kembali
                          </button>
                          <button
                            onClick={submit}
                            data-testid="submit-order"
                            className="magnetic-btn group relative px-10 py-4 bg-gradient-to-r from-[#D4AF37] to-[#E8C766] text-black overflow-hidden hover:shadow-2xl hover:shadow-[#D4AF37]/40 transition-all"
                          >
                            <span className="relative z-10 flex items-center justify-center gap-3 text-sm tracking-[0.25em] uppercase font-semibold">
                              Kirim Order via WhatsApp
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Sidebar Ringkasan */}
              <div className="lg:col-span-4">
                <div className="sticky top-32 bg-white/[0.02] border border-[#D4AF37]/20 p-8" data-testid="order-summary">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="font-serif text-xl text-white">Ringkasan Order</h3>
                  </div>

                  <div className="space-y-4 mb-8">
                    <SummaryRow label="Nama" value={form.nama} />
                    <SummaryRow label="WhatsApp" value={form.whatsapp} />
                    <SummaryRow label="Keperluan" value={form.keperluan} />
                    <div className="h-px bg-[#D4AF37]/20 my-3" />
                    <SummaryRow label="Produk" value={selectedProduct?.name} />
                    <SummaryRow label="Jumlah" value={form.jumlah ? `${form.jumlah} pcs` : ''} />
                    <SummaryRow label="Ukuran" value={form.ukuran} />
                    <SummaryRow label="Finishing" value={form.finishing} />
                    <SummaryRow label="Deadline" value={form.deadline} />
                    <SummaryRow label="Pengambilan" value={form.pengambilan} />
                  </div>

                  <div className="p-4 bg-[#D4AF37]/8 border border-[#D4AF37]/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-[#D4AF37]" />
                      <span className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-medium">Estimasi Pengerjaan</span>
                    </div>
                    <p className="text-white font-serif text-lg">{form.deadline || 'Akan dikonfirmasi'}</p>
                    <p className="text-white/50 text-xs mt-2 leading-relaxed font-light">
                      Setelah desain dikonfirmasi & pembayaran diterima, produk akan dikerjakan sesuai timeline.
                    </p>
                  </div>

                  {step === 3 && form.pengambilan && (
                    <button
                      onClick={submit}
                      data-testid="sidebar-submit"
                      className="mt-6 w-full py-4 bg-[#D4AF37] text-black hover:bg-[#E8C766] transition-colors text-xs tracking-[0.25em] uppercase font-semibold flex items-center justify-center gap-2"
                    >
                      <Check size={16} /> Kirim ke WhatsApp
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  );
};

const SummaryRow = ({ label, value }) => (
  <div className="flex justify-between items-start gap-3">
    <span className="text-white/40 text-xs tracking-wider uppercase">{label}</span>
    <span className={`text-right text-sm font-light max-w-[60%] break-words ${value ? 'text-white' : 'text-white/20'}`}>
      {value || '—'}
    </span>
  </div>
);

export default Order;
