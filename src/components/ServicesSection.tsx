import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../data';
import { Service } from '../types';
import { Calendar, Percent } from 'lucide-react';

interface ServicesSectionProps {
  initialCategory?: 'HAIR' | 'COLOR' | 'MAKEUP' | 'SKINCARE' | 'SPA' | 'NAILS' | 'ALL';
  onBookService: (service: Service) => void;
}

const CATEGORIES: ('ALL' | 'HAIR' | 'COLOR' | 'MAKEUP' | 'SKINCARE' | 'SPA' | 'NAILS')[] = [
  'ALL', 'HAIR', 'COLOR', 'MAKEUP', 'SKINCARE', 'SPA', 'NAILS'
];

export default function ServicesSection({ initialCategory, onBookService }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'HAIR' | 'COLOR' | 'MAKEUP' | 'SKINCARE' | 'SPA' | 'NAILS'>('ALL');

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredServices = SERVICES.filter(service => 
    activeCategory === 'ALL' ? true : service.category === activeCategory
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Services Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-sans tracking-[0.25em] font-black text-primary uppercase">The Luxe Menu</span>
        <h1 className="text-3xl md:text-5xl font-serif text-white font-black uppercase tracking-tight">Curated Experiences</h1>
        <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed">
          Immerse yourself in a portfolio of absolute refinement. Every therapy is tailored precisely to your anatomy, wellness desires, and physical vitality, using only premium formulas.
        </p>
        <div className="w-16 h-1 bg-primary mx-auto mt-2" />
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-none font-sans font-black text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border cursor-pointer ${
              activeCategory === cat
                ? 'bg-primary border-primary text-black font-black scale-102 shadow-[0_0_15px_rgba(209,255,0,0.35)]'
                : 'bg-zinc-900/60 border-white/10 text-on-surface-variant hover:border-primary/50 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group glass-panel rounded-none overflow-hidden flex flex-col justify-between h-full bg-zinc-900/10 border border-white/10 hover:border-primary/50 transition-colors duration-300"
          >
            <div>
              {/* Image Container with hover zoom */}
              <div className="relative h-64 overflow-hidden bg-zinc-900">
                <img
                  src={service.image}
                  alt={service.title}
                  title={service.dataAlt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-70" />
                <span className="absolute top-4 left-4 font-sans text-[8px] tracking-[0.25em] bg-black text-primary border border-primary/40 px-3 py-1 rounded-none uppercase font-black select-none">
                  {service.category}
                </span>
                <span className="absolute bottom-4 right-4 text-xs font-mono text-black bg-primary px-3 py-1.5 rounded-none border-b-2 border-black font-black select-none">
                  {service.price}
                </span>
              </div>

              {/* Text details */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-serif font-black uppercase tracking-tight text-white group-hover:text-primary transition-colors duration-350">
                  {service.title}
                </h3>
                <p className="text-xs text-on-surface-variant font-normal leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Book Service Action Footer */}
            <div className="p-6 pt-0">
              <button
                onClick={() => onBookService(service)}
                className="w-full py-3.5 btn-primary text-xs font-sans font-black tracking-widest uppercase rounded-none inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Special Guarantee Info */}
      <div className="glass-panel rounded-none p-6 border border-white/10 flex items-center justify-center gap-4 max-w-xl mx-auto !mt-16 text-center text-xs text-on-surface-variant font-light">
        <div>
          <span className="font-sans font-black text-primary text-[10px] tracking-[0.25em] block mb-1 uppercase">CANCELLATION POLICY</span>
          Please notify us 24 hours in advance to cancel or adjust scheduled bookings without incurring charges.
        </div>
      </div>
    </div>
  );
}
