import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { THERAPISTS, GALLERY_ITEMS } from '../data';
import { Therapist } from '../types';
import { Star, Award, Heart, CheckCircle, X, Calendar } from 'lucide-react';

interface TherapistsSectionProps {
  onSelectTherapist: (therapist: Therapist) => void;
}

export default function TherapistsSection({ onSelectTherapist }: TherapistsSectionProps) {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);

  // Filter gallery looks created by this therapist based on category
  const getTherapistGalleryIndex = (title: string) => {
    if (title.includes('HAIR')) return GALLERY_ITEMS.filter(g => g.category === 'HAIR');
    if (title.includes('MAKEUP')) return GALLERY_ITEMS.filter(g => g.category === 'MAKEUP');
    if (title.includes('SKIN') || title.includes('CLINICAL')) return GALLERY_ITEMS.filter(g => g.category === 'SPA');
    return GALLERY_ITEMS.filter(g => g.category === 'NAILS');
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Therapists Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-sans tracking-[0.25em] font-black text-primary uppercase">The Master Craftsmen</span>
        <h1 className="text-3xl md:text-5xl font-serif text-white font-black uppercase tracking-tight">Our Artisans</h1>
        <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed">
          Meet the exceptional artisans dedicated to your aesthetic and physical wellness. Each has spent years mastering their dynamic medium to deliver flawless, tailored sanctuaries of shape, skin, and tone.
        </p>
        <div className="w-16 h-1 bg-primary mx-auto mt-2" />
      </div>

      {/* Artisans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {THERAPISTS.map((therapist, index) => (
          <motion.div
            key={therapist.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group glass-panel rounded-none overflow-hidden flex flex-col justify-between h-full bg-zinc-900/10 border border-white/10 hover:border-primary/50 transition-colors"
          >
            <div>
              {/* Image with subtle fade */}
              <div className="relative h-72 overflow-hidden bg-zinc-900">
                <img
                  src={therapist.image}
                  alt={therapist.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-70" />
                
                {/* Ribbon Tag */}
                <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
                  <span className="font-sans text-[8px] tracking-[0.2em] bg-black text-primary border border-primary/30 px-2.5 py-1 rounded-none uppercase font-black">
                    {therapist.title}
                  </span>
                  {therapist.subtitle && (
                    <span className="font-sans text-[8px] tracking-[0.2em] bg-primary text-black px-2.5 py-1 rounded-none uppercase font-black">
                      {therapist.subtitle}
                    </span>
                  )}
                </div>
              </div>

              {/* Artisan bios */}
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-serif font-black uppercase tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                  {therapist.name}
                </h3>
                <p className="text-xs text-on-surface-variant font-normal leading-relaxed">
                  {therapist.description}
                </p>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedTherapist(therapist)}
                className="w-full py-3 text-xs font-sans tracking-widest text-[#f2ca50] border border-primary/30 rounded-none hover:bg-primary/10 hover:border-primary uppercase font-black transition-all duration-300 cursor-pointer text-center"
              >
                View Portfolio
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Portfolio Lightbox Modal */}
      <AnimatePresence>
        {selectedTherapist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-md"
            onClick={() => setSelectedTherapist(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-3xl w-full rounded-none overflow-hidden glass-panel max-h-[92vh] flex flex-col border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Banner */}
              <div className="relative p-6 md:p-8 bg-zinc-950 border-b border-white/5 flex flex-col md:flex-row gap-6 items-start md:items-center">
                <button
                  onClick={() => setSelectedTherapist(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-none border border-white/10 hover:border-primary hover:text-black hover:bg-primary transition-colors text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <img
                  src={selectedTherapist.image}
                  alt={selectedTherapist.name}
                  className="w-20 h-20 rounded-none object-cover border border-primary/40 p-1"
                />

                <div className="space-y-2">
                  <div className="flex gap-2 items-center flex-wrap">
                    <h2 className="text-2xl font-serif text-white font-black uppercase tracking-tight">{selectedTherapist.name}</h2>
                    <span className="font-sans text-[8px] tracking-[0.25em] bg-primary text-black px-2.5 py-1 rounded-none uppercase font-black">
                      {selectedTherapist.title}
                    </span>
                  </div>
                  <p className="text-xs text-primary/80 font-mono tracking-wider font-bold">
                    {selectedTherapist.subtitle ? `${selectedTherapist.subtitle} PRACTITIONER` : "ACCIDITED WELLNESS DESIGNER"}
                  </p>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 bg-zinc-950/40">
                <div className="space-y-3">
                  <h4 className="font-sans text-[10px] tracking-[0.25em] text-primary uppercase font-black">Biographical Context</h4>
                  <p className="text-xs text-on-surface-variant font-normal leading-relaxed">
                    With over a decade of dedication to aesthetic symmetry, {selectedTherapist.name} is known for luxurious client satisfaction and impeccable results. Standard treatments are styled to individual muscle structures or hair textures using custom organic oils.
                  </p>
                </div>

                {/* Accolades & Badges */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-zinc-900/60 rounded-none p-4 border border-white/10 flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <span className="text-[10px] font-sans font-black text-white block uppercase">AWARDS</span>
                      <span className="text-[10px] text-on-surface-variant font-semibold">Top Stylist 2024</span>
                    </div>
                  </div>
                  <div className="bg-zinc-900/60 rounded-none p-4 border border-white/10 flex items-center gap-3">
                    <Star className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <span className="text-[10px] font-sans font-black text-white block uppercase">RATING</span>
                      <span className="text-[10px] text-on-surface-variant font-semibold">5.0 ★ (450+ reviews)</span>
                    </div>
                  </div>
                  <div className="bg-zinc-900/60 rounded-none p-4 border border-white/10 flex items-center gap-3">
                    <Heart className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <span className="text-[10px] font-sans font-black text-white block uppercase">SPECIALTY</span>
                      <span className="text-[10px] text-on-surface-variant font-semibold">Bespoke Textures</span>
                    </div>
                  </div>
                </div>

                {/* Certified Accreditations */}
                <div className="space-y-3">
                  <h4 className="font-sans text-[10px] tracking-[0.25em] text-primary uppercase font-black">Certified Treatment Guarantee</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <li className="flex items-center gap-2 text-xs text-on-surface font-semibold">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" /> Bespoke Organic Formulas
                    </li>
                    <li className="flex items-center gap-2 text-xs text-on-surface font-semibold">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" /> Advanced Skin/Fiber Diagnostics
                    </li>
                    <li className="flex items-center gap-2 text-xs text-on-surface font-semibold">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" /> Clean Sandalwood Fragrance Journeys
                    </li>
                    <li className="flex items-center gap-2 text-xs text-on-surface font-semibold">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" /> Tailored Scalp & Shoulder Massage Included
                    </li>
                  </ul>
                </div>

                {/* Selected Creations / Works */}
                <div className="space-y-3">
                  <h4 className="font-sans text-[10px] tracking-[0.25em] text-primary uppercase font-black">Aesthetic Portfolio Highlight</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {getTherapistGalleryIndex(selectedTherapist.title).slice(0, 3).map((gal) => (
                      <div key={gal.id} className="relative rounded-none overflow-hidden h-24 bg-zinc-900 border border-white/5">
                        <img src={gal.image} alt={gal.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                        <span className="absolute bottom-1 left-2 text-[8px] bg-black/80 px-1 text-white font-sans tracking-wider font-bold truncate max-w-[90%] select-none uppercase">
                          {gal.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA Action in Modal */}
              <div className="p-6 bg-zinc-950 border-t border-white/5 flex justify-between items-center flex-wrap gap-4">
                <div>
                  <p className="text-[10px] text-on-surface-variant font-semibold uppercase tracking-wider">Available for immediate bespoke sessions.</p>
                  <p className="text-xs text-white font-bold uppercase tracking-tight">Schedule with {selectedTherapist.name}</p>
                </div>
                <button
                  onClick={() => {
                    const t = selectedTherapist;
                    setSelectedTherapist(null);
                    onSelectTherapist(t);
                  }}
                  className="px-6 py-3.5 btn-primary font-sans text-xs tracking-widest uppercase rounded-none inline-flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book With Me
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
