import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Maximize2, X, Plus, Calendar } from 'lucide-react';

interface GallerySectionProps {
  onNavigate: (tab: 'home' | 'services' | 'gallery' | 'therapists' | 'pricing' | 'book') => void;
}

const CATEGORIES: ('ALL' | 'HAIR' | 'MAKEUP' | 'SPA' | 'NAILS' | 'INTERIOR')[] = [
  'ALL', 'HAIR', 'MAKEUP', 'SPA', 'NAILS', 'INTERIOR'
];

export default function GallerySection({ onNavigate }: GallerySectionProps) {
  const [activeTab, setActiveTab] = useState<'ALL' | 'HAIR' | 'MAKEUP' | 'SPA' | 'NAILS' | 'INTERIOR'>('ALL');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(item =>
    activeTab === 'ALL' ? true : item.category === activeTab
  );

  return (
    <div className="space-y-12 pb-16">
      {/* Gallery Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-sans tracking-[0.25em] font-black text-primary uppercase">The Visual Sanctuary</span>
        <h1 className="text-3xl md:text-5xl font-serif text-white font-black uppercase tracking-tight">Our Gallery</h1>
        <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed">
          Immerse yourself in our private photo archives. These portraits capture the absolute flawless results of our precision stylers, facial specialist procedures, and our serene wash lounge design.
        </p>
        <div className="w-16 h-1 bg-primary mx-auto mt-2" />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
        {CATEGORIES.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-none font-sans font-black text-[10px] tracking-[0.2em] uppercase transition-all duration-300 border cursor-pointer ${
              activeTab === tab
                ? 'bg-primary border-primary text-black font-black scale-102 shadow-[0_0_15px_rgba(209,255,0,0.35)]'
                : 'bg-zinc-900/60 border-white/10 text-on-surface-variant hover:border-primary/50 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Image Grid with staggered loading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="group relative rounded-none overflow-hidden aspect-clone h-80 bg-zinc-950 border border-white/10 hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                title={item.dataAlt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 focus-within:scale-105 opacity-80 group-hover:opacity-100"
              />

              {/* Dynamic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
              
              {/* Dynamic Text details on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0 z-10">
                <span className="font-sans text-[8px] tracking-[0.25em] text-primary font-black uppercase mb-1">
                  {item.category}
                </span>
                <h3 className="text-lg font-serif font-black uppercase tracking-tight text-white mb-4">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-xs font-sans font-black text-white/90">
                  <span className="w-6 h-6 rounded-none bg-primary/20 border border-primary/40 flex items-center justify-center">
                    <Maximize2 className="w-3 h-3 text-primary" />
                  </span>
                  CLICK TO ZOOM
                </div>
              </div>

              {/* Tag indicator for smaller screen accessibility */}
              <span className="absolute top-4 left-4 p-1 px-2 rounded-none font-sans font-bold text-[8px] tracking-wider text-primary bg-black uppercase border border-primary/30">
                {item.category}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Full-Screen Zoom Overlay Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-md"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-4xl w-full rounded-none overflow-hidden glass-panel max-h-[90vh] flex flex-col border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header inside modal */}
              <div className="p-4 bg-zinc-950 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[8px] tracking-[0.25em] bg-primary text-black px-2.5 py-1 rounded-none uppercase font-black select-none">
                    {selectedItem.category}
                  </span>
                  <h3 className="font-serif text-lg text-white font-black uppercase tracking-tight">{selectedItem.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-none border border-white/10 hover:border-primary hover:text-black hover:bg-primary transition-colors text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Big Image Content */}
              <div className="flex-1 bg-zinc-950 overflow-hidden flex items-center justify-center">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  title={selectedItem.dataAlt}
                  className="max-h-[60vh] max-w-full object-contain"
                />
              </div>

              {/* Alt details / footer action */}
              <div className="p-6 bg-zinc-950 border-t border-white/5 space-y-4">
                <p className="text-xs text-on-surface-variant italic font-normal">
                  {selectedItem.dataAlt || "A demonstration of Luxe Salon's premier cosmetic techniques."}
                </p>
                <div className="flex justify-between items-center flex-wrap gap-4">
                  <p className="text-xs text-white/70 font-semibold uppercase tracking-wider">Love this look? Book an artisan session now.</p>
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      onNavigate('book');
                    }}
                    className="px-6 py-3.5 btn-primary font-sans text-xs tracking-widest uppercase rounded-none inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Design
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
