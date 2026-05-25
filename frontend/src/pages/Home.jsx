import React, { useState } from 'react';
import { 
  Printer, CreditCard, Badge, Coffee, Frame, Contact, 
  FileText, Scissors, Palette, Image, ShoppingBag, Calendar,
  Award, Tag, Zap, Clock, ShieldCheck, Phone, Mail, MapPin,
  ChevronRight, Star, MessageCircle, ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge as BadgeUI } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  services, 
  popularProducts, 
  portfolioItems, 
  whyChooseUs, 
  testimonials,
  contactInfo 
} from '../mock';

const iconMap = {
  'printer': Printer,
  'credit-card': CreditCard,
  'badge': Badge,
  'coffee': Coffee,
  'frame': Frame,
  'contact': Contact,
  'file-text': FileText,
  'scissors': Scissors,
  'palette': Palette,
  'image': Image,
  'shopping-bag': ShoppingBag,
  'calendar': Calendar,
  'award': Award,
  'tag': Tag,
  'zap': Zap,
  'clock': Clock,
  'shield-check': ShieldCheck
};

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAllServices, setShowAllServices] = useState(false);

  const categories = ['all', ...new Set(portfolioItems.map(item => item.category))];
  const filteredPortfolio = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const displayedServices = showAllServices ? services : services.slice(0, 6);

  const handleWhatsAppClick = (message = '') => {
    const defaultMessage = message || 'Halo, saya ingin konsultasi tentang layanan Impress Print';
    const url = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, '_blank');
  };

  const IconComponent = ({ iconName, ...props }) => {
    const Icon = iconMap[iconName] || Printer;
    return <Icon {...props} />;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Floating WhatsApp Button */}
      <button
        onClick={() => handleWhatsAppClick()}
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap">
          Konsultasi
        </span>
      </button>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://customer-assets.emergentagent.com/job_5ced007f-7aeb-4b78-90f4-b067c2c93029/artifacts/40mm9xuj_WhatsApp%20Image%202026-05-23%20at%2022.24.23.jpeg" 
                alt="Impress Print Logo" 
                className="h-12 w-auto"
              />
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">Layanan</a>
              <a href="#products" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">Produk</a>
              <a href="#portfolio" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">Portfolio</a>
              <a href="#contact" className="text-gray-700 hover:text-[#FF6B35] transition-colors font-medium">Kontak</a>
            </nav>
            <Button 
              onClick={() => handleWhatsAppClick()}
              className="bg-[#FF6B35] hover:bg-[#e55a24] text-white hidden md:flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Hubungi Kami
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-cyan-50 py-20 md:py-32">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00B4D8]/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <BadgeUI className="mb-6 bg-[#FF6B35]/10 text-[#FF6B35] border-[#FF6B35]/20 hover:bg-[#FF6B35]/20">
              Premium Printing Services
            </BadgeUI>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#FF6B35] via-[#00B4D8] to-[#E63946] bg-clip-text text-transparent leading-tight">
              Print Smart & Look Better
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Solusi cetak berkualitas tinggi untuk semua kebutuhan personal, bisnis, komunitas, dan event Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg"
                onClick={() => handleWhatsAppClick('Halo, saya ingin konsultasi tentang layanan printing')}
                className="bg-[#FF6B35] hover:bg-[#e55a24] text-white text-lg px-8 py-6 group"
              >
                Konsultasi Gratis
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8] hover:text-white text-lg px-8 py-6"
              >
                Lihat Harga
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Layanan Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Berbagai layanan cetak profesional untuk memenuhi kebutuhan Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedServices.map((service) => (
              <Card 
                key={service.id} 
                className="group hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#FF6B35]/20 cursor-pointer"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-[#FF6B35]/10 to-[#00B4D8]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent iconName={service.icon} className="w-7 h-7 text-[#FF6B35]" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-[#FF6B35] transition-colors">{service.name}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="text-[#00B4D8] hover:text-[#FF6B35] p-0 h-auto font-semibold group/btn"
                    onClick={() => handleWhatsAppClick(`Halo, saya tertarik dengan layanan ${service.name}`)}
                  >
                    Konsultasi
                    <ChevronRight className="ml-1 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {!showAllServices && services.length > 6 && (
            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAllServices(true)}
                className="border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white"
              >
                Lihat Semua Layanan ({services.length - 6} lainnya)
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Popular Products Section */}
      <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Produk Populer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Produk pilihan dengan harga terbaik dan kualitas premium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <BadgeUI className="bg-[#FF6B35] text-white border-0">{product.category}</BadgeUI>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#FF6B35]">{product.price}</span>
                    <span className="text-sm text-gray-500">{product.unit}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-[#00B4D8] hover:bg-[#0096b8] text-white group/btn"
                    onClick={() => handleWhatsAppClick(`Halo, saya ingin order ${product.name}`)}
                  >
                    Order Sekarang
                    <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Portfolio Kami</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Lihat hasil karya kami untuk berbagai klien dan project
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                  className="data-[state=active]:bg-[#FF6B35] data-[state=active]:text-white px-6 py-2 rounded-full border-2 border-gray-200 data-[state=active]:border-[#FF6B35] transition-all"
                >
                  {category === 'all' ? 'Semua' : category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPortfolio.map((item) => (
                  <div 
                    key={item.id} 
                    className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <BadgeUI className="mb-2 w-fit bg-[#00B4D8] text-white border-0">{item.category}</BadgeUI>
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-200">{item.client}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-[#2B2D42] to-[#1a1b2e] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B35]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00B4D8]/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Kenapa Pilih Impress Print?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Kami berkomitmen memberikan layanan terbaik dengan standar kualitas tinggi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item) => (
              <div 
                key={item.id} 
                className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10 hover:bg-white/10 hover:border-[#FF6B35]/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#00B4D8] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent iconName={item.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#FF6B35] transition-colors">{item.title}</h3>
                <p className="text-gray-300 text-lg">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Kata Mereka</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Testimoni dari pelanggan yang puas dengan layanan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-2 hover:border-[#00B4D8] transition-all duration-300">
                <CardHeader>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FF6B35] text-[#FF6B35]" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[#FF6B35] to-[#e55a24] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Siap Mewujudkan Ide Cetak Anda?</h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Konsultasikan kebutuhan cetak Anda dengan tim profesional kami sekarang juga!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg"
                onClick={() => handleWhatsAppClick()}
                className="bg-white text-[#FF6B35] hover:bg-gray-100 text-lg px-8 py-6 group"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Chat via WhatsApp
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => window.location.href = `tel:${contactInfo.phone}`}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#FF6B35] text-lg px-8 py-6"
              >
                <Phone className="mr-2 w-5 h-5" />
                {contactInfo.phone}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <Phone className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Telepon</h3>
                <p className="text-white/80">{contactInfo.phone}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <Mail className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-white/80">{contactInfo.email}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20">
                <Clock className="w-8 h-8 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Jam Operasional</h3>
                <p className="text-white/80">{contactInfo.hours}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2B2D42] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <img 
                src="https://customer-assets.emergentagent.com/job_5ced007f-7aeb-4b78-90f4-b067c2c93029/artifacts/40mm9xuj_WhatsApp%20Image%202026-05-23%20at%2022.24.23.jpeg" 
                alt="Impress Print Logo" 
                className="h-16 w-auto mb-4"
              />
              <p className="text-gray-400 mb-4 max-w-md">
                Solusi cetak profesional untuk semua kebutuhan Anda. Print Smart & Look Better dengan Impress Print.
              </p>
              <div className="flex gap-4">
                <Button 
                  size="sm"
                  onClick={() => handleWhatsAppClick()}
                  className="bg-[#FF6B35] hover:bg-[#e55a24] text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Layanan</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#services" className="hover:text-[#FF6B35] transition-colors">Semua Layanan</a></li>
                <li><a href="#products" className="hover:text-[#FF6B35] transition-colors">Produk Populer</a></li>
                <li><a href="#portfolio" className="hover:text-[#FF6B35] transition-colors">Portfolio</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Kontak</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <Phone className="w-5 h-5 mt-1 flex-shrink-0 text-[#00B4D8]" />
                  <span>{contactInfo.phone}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="w-5 h-5 mt-1 flex-shrink-0 text-[#00B4D8]" />
                  <span>{contactInfo.email}</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-[#00B4D8]" />
                  <span>{contactInfo.address}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Impress Print. All rights reserved. Print Smart & Look Better.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;