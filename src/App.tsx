/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, Facebook, MapPin, Clock, Sparkles, Menu, X, 
  Calendar, Scissors, Award, MessageSquare 
} from 'lucide-react';

import { Service, Therapist, Package } from './types';
import HomeSection from './components/HomeSection';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import TherapistsSection from './components/TherapistsSection';
import PricingSection from './components/PricingSection';
import BookingSection from './components/BookingSection';

type TabType = 'home' | 'services' | 'gallery' | 'therapists' | 'pricing' | 'book';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // States to pass down to Booking Wizard
  const [preselectedService, setPreselectedService] = useState<Service | null>(null);
  const [preselectedTherapist, setPreselectedTherapist] = useState<Therapist | null>(null);
  const [preselectedPackage, setPreselectedPackage] = useState<Package | null>(null);

  // Filter bypass communication state
  const [servicesCategoryFilter, setServicesCategoryFilter] = useState<'HAIR' | 'COLOR' | 'MAKEUP' | 'SKINCARE' | 'SPA' | 'NAILS' | 'ALL'>('ALL');

  const navLinks = [
    { id: 'home' as const, label: 'Home' },
    { id: 'services' as const, label: 'Services' },
    { id: 'gallery' as const, label: 'Gallery' },
    { id: 'therapists' as const, label: 'Artisans' },
    { id: 'pricing' as const, label: 'Pricing' }
  ];

  const handleNavigate = (tab: TabType) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const clearBookingPreselections = () => {
    setPreselectedService(null);
    setPreselectedTherapist(null);
    setPreselectedPackage(null);
  };

  const handleBookService = (service: Service) => {
    setPreselectedService(service);
    setPreselectedPackage(null);
    handleNavigate('book');
  };

  const handleSelectTherapist = (therapist: Therapist) => {
    setPreselectedTherapist(therapist);
    setPreselectedService(null);
    setPreselectedPackage(null);
    handleNavigate('book');
  };

  const handleSelectPackage = (pkg: Package) => {
    setPreselectedPackage(pkg);
    setPreselectedService(null);
    handleNavigate('book');
  };

  const handleSelectCategoryFromHome = (cat: 'HAIR' | 'COLOR' | 'MAKEUP' | 'SKINCARE' | 'SPA' | 'NAILS') => {
    setServicesCategoryFilter(cat);
  };

  return (
    <div id="app" className="min-h-screen bg-surface-dim text-on-surface flex flex-col font-sans selection:bg-primary/20 selection:text-primary relative overflow-hidden">
      
      {/* Decorative Grid Overlay from Bold Typography */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.7] grid-overlay z-0" />
      
      {/* Left Vertical Rail (Hidden on mobile, pristine on desktop) */}
      <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[60px] border-r border-white/10 flex-col items-center justify-between py-10 z-50 bg-[#0A0A0A]">
        <div className="rotate-180 text-[8px] font-black uppercase tracking-[0.4em] [writing-mode:vertical-lr] opacity-40 text-white select-none">ESTABLISHED 2026</div>
        <div className="w-1 h-12 bg-primary"></div>
        <div className="rotate-180 text-[8px] font-black uppercase tracking-[0.4em] [writing-mode:vertical-lr] opacity-50 text-primary select-none">LUXE_SYSTEM_v1.0</div>
      </div>

      {/* Dynamic Ribbon Alert */}
      <div className="relative z-10 bg-primary text-black text-center py-2.5 px-4 text-[9px] tracking-[0.25em] font-sans font-black uppercase flex items-center justify-center gap-2 select-none lg:pl-[60px]">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        Unveiling The Luxe Wash Suite Session / Complimentary Champagne on Arrival
      </div>

      {/* Elegant Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-white/5 lg:pl-[60px]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo Name */}
          <button 
            onClick={() => handleNavigate('home')} 
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-none bg-primary text-black flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="font-serif text-black font-black text-sm">L</span>
            </div>
            <div className="text-left select-none">
              <span className="text-lg md:text-xl font-serif tracking-[-0.03em] text-white uppercase font-black italic">
                LUXE_S<span className="text-primary">.</span>
              </span>
              <p className="text-[7.5px] tracking-[0.4em] uppercase text-on-surface-variant font-bold leading-none mt-0.5">EST. 2026 / ARTISANAL</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans font-semibold tracking-widest uppercase">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  if (link.id === 'services') {
                    setServicesCategoryFilter('ALL'); // Reset filter
                  }
                  handleNavigate(link.id);
                }}
                className={`transition-colors py-1 hover:text-white cursor-pointer relative ${
                  activeTab === link.id ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <motion.span 
                    layoutId="desktop-nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" 
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop CTA Booking triggers */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => {
                clearBookingPreselections();
                handleNavigate('book');
              }}
              className="px-6 py-2.5 btn-primary font-sans text-[11px] tracking-widest uppercase rounded-lg font-bold shadow-md gold-glow cursor-pointer"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Actions toggler */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 border-b border-zinc-900 overflow-hidden text-xs font-sans tracking-widest uppercase"
          >
            <div className="px-6 py-8 space-y-6 flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.id === 'services') {
                      setServicesCategoryFilter('ALL');
                    }
                    handleNavigate(link.id);
                  }}
                  className={`text-left py-2 hover:text-white transition-colors cursor-pointer ${
                    activeTab === link.id ? 'text-primary font-bold border-l-2 border-primary pl-3' : 'text-on-surface-variant'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 border-t border-zinc-900">
                <button
                  onClick={() => {
                    clearBookingPreselections();
                    handleNavigate('book');
                  }}
                  className="w-full py-3 btn-primary text-center font-bold font-sans tracking-widest uppercase rounded-lg cursor-pointer"
                >
                  Book Session
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 md:py-16 relative z-10 lg:pl-[60px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {activeTab === 'home' && (
              <HomeSection 
                onNavigate={handleNavigate} 
                onSelectCategory={handleSelectCategoryFromHome}
              />
            )}
            
            {activeTab === 'services' && (
              <ServicesSection 
                initialCategory={servicesCategoryFilter}
                onBookService={handleBookService} 
              />
            )}

            {activeTab === 'gallery' && (
              <GallerySection onNavigate={handleNavigate} />
            )}

            {activeTab === 'therapists' && (
              <TherapistsSection onSelectTherapist={handleSelectTherapist} />
            )}

            {activeTab === 'pricing' && (
              <PricingSection onSelectPackage={handleSelectPackage} />
            )}

            {activeTab === 'book' && (
              <BookingSection 
                preselectedService={preselectedService} 
                preselectedTherapist={preselectedTherapist}
                preselectedPackage={preselectedPackage}
                clearPreselections={clearBookingPreselections}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Elegant Immersive Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 text-on-surface-variant py-16 text-center md:text-left mt-auto relative z-10 lg:pl-[60px]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Col 1 - Logo & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <div className="w-6 h-6 rounded-none bg-primary text-black flex items-center justify-center">
                <span className="font-serif text-black font-black text-xs">L</span>
              </div>
              <span className="text-sm font-serif tracking-[-0.03em] text-white uppercase font-black italic">LUXE_S<span className="text-primary">.</span></span>
            </div>
            <p className="text-xs font-light leading-relaxed max-w-xs mx-auto md:mx-0">
              A private digital sanctuary for bespoke cosmetic arts, physical retreats, skin renewals, and master artisan therapy.
            </p>
            <div className="flex justify-center md:justify-start gap-4 text-white">
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-primary hover:text-zinc-950 transition-colors flex items-center justify-center">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-primary hover:text-zinc-950 transition-colors flex items-center justify-center">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2 - Address / Placement */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] tracking-widest text-white uppercase font-bold">The Heights Sanctuary</h4>
            <div className="space-y-3.5 text-xs font-light">
              <p className="flex items-center justify-center md:justify-start gap-2 max-w-xs mx-auto md:mx-0">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>124 Sanctuary Way, Opulent Heights, NY</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2 max-w-xs mx-auto md:mx-0">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Tue - Sat: 9:00 AM - 6:00 PM<br />Sun - Mon: Closed</span>
              </p>
            </div>
          </div>

          {/* Col 3 - Fast Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] tracking-widest text-white uppercase font-bold">Fast Services</h4>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <button onClick={() => { setServicesCategoryFilter('HAIR'); handleNavigate('services'); }} className="hover:text-primary transition-colors cursor-pointer">
                  Precision Hair Cut
                </button>
              </li>
              <li>
                <button onClick={() => { setServicesCategoryFilter('COLOR'); handleNavigate('services'); }} className="hover:text-primary transition-colors cursor-pointer">
                  Dimensional Coloring
                </button>
              </li>
              <li>
                <button onClick={() => { setServicesCategoryFilter('SPA'); handleNavigate('services'); }} className="hover:text-primary transition-colors cursor-pointer">
                  Therapeutic Massages
                </button>
              </li>
              <li>
                <button onClick={() => { setServicesCategoryFilter('SKINCARE'); handleNavigate('services'); }} className="hover:text-primary transition-colors cursor-pointer">
                  Botanical Facials
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 - Direct contact */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] tracking-widest text-white uppercase font-bold">Inquiries</h4>
            <ul className="space-y-2 text-xs font-light">
              <li className="text-white font-medium">dark2078@gmail.com</li>
              <li>Admin Line: +1 (555) 725-6677</li>
              <li className="pt-2 text-[10px] text-primary font-bold uppercase tracking-wider flex items-center gap-1.5 justify-center md:justify-start">
                <Scissors className="w-3.5 h-3.5" /> Licensed Salon #402394
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-zinc-900 mt-12 pt-6 flex flex-col md:flex-row justify-between text-[11px] font-light gap-4">
          <p>© 2026 Luxe Salon. All rights reserved. Managed with pure organic standards.</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Client Guidelines</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
