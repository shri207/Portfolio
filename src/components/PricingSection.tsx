import React from 'react';
import { motion } from 'motion/react';
import { PACKAGES, ALACARTE_SERVICES } from '../data';
import { Package } from '../types';
import { Check, Flame, Award, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  onSelectPackage: (pkg: Package) => void;
}

export default function PricingSection({ onSelectPackage }: PricingSectionProps) {
  return (
    <div className="space-y-20 pb-16">
      {/* Pricing Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-sans tracking-[0.25em] font-black text-primary uppercase">The Price Portfolios</span>
        <h1 className="text-3xl md:text-5xl font-serif text-white font-black uppercase tracking-tight">Sanctuary Awaits</h1>
        <p className="text-xs md:text-sm text-on-surface-variant font-normal leading-relaxed">
          Transparent pricing for bespoke physical retreats, wellness packages, and master artisan styling sessions. Every investment guarantees organic botanical inputs and a private sanctuary wash session.
        </p>
        <div className="w-16 h-1 bg-primary mx-auto mt-2" />
      </div>

      {/* Packages Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PACKAGES.map((pkg, index) => {
          const isFeatured = pkg.badge !== undefined;
          return (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-none p-8 flex flex-col justify-between relative border ${
                isFeatured
                  ? 'bg-zinc-900/40 border-2 border-primary shadow-[0_0_25px_rgba(209,255,0,0.15)]'
                  : 'bg-zinc-950/80 border-white/10 hover:border-primary/50 transition-colors'
              }`}
            >
              {/* Featured Ribbon Badge */}
              {isFeatured && (
                <span className="absolute -top-3.5 right-6 bg-primary text-black font-sans text-[9px] tracking-[0.2em] uppercase font-black px-3.5 py-1.5 rounded-none shadow-[0_0_15px_rgba(209,255,0,0.45)] flex items-center gap-1.5 selection:none select-none">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  {pkg.badge}
                </span>
              )}

              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-primary font-black">
                    {pkg.tier} Suite
                  </span>
                  <h3 className="text-2xl font-serif text-white font-black uppercase tracking-tight">{pkg.name}</h3>
                </div>

                <div className="flex items-baseline gap-1 py-3 border-b border-white/10">
                  <span className="text-4xl font-serif text-primary font-black tracking-tight">{pkg.price}</span>
                  <span className="text-xs text-on-surface-variant font-normal uppercase tracking-wider">/ session</span>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-3.5 pt-2">
                  {pkg.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs font-normal text-on-surface/90">
                      <span className="w-4 h-4 rounded-none bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 select-none">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <button
                  onClick={() => onSelectPackage(pkg)}
                  className={`w-full py-4 text-xs font-sans font-black tracking-widest uppercase rounded-none cursor-pointer transition-all ${
                    isFeatured
                      ? 'btn-primary'
                      : 'btn-ghost'
                  }`}
                >
                  {pkg.ctaText}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* A La Carte Services Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-[10px] tracking-[0.25em] font-sans font-black text-primary uppercase">Custom Combos</h2>
          <p className="text-3xl font-serif text-white font-black uppercase tracking-tight">A La Carte Services</p>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {ALACARTE_SERVICES.map((categoryBlock, index) => (
            <div key={index} className="glass-panel p-8 rounded-none border border-white/10 bg-zinc-900/10 space-y-6">
              <h3 className="font-serif text-xl font-black uppercase tracking-tight text-white border-b border-white/10 pb-3.5 flex items-center justify-between">
                <span className="text-primary">{categoryBlock.category}</span>
                <Award className="w-4 h-4 opacity-70 text-primary" />
              </h3>

              <div className="space-y-6">
                {categoryBlock.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="group cursor-pointer">
                    {/* Name, connecting dots, and price row */}
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="text-sm text-white font-serif font-black uppercase tracking-normal group-hover:text-primary transition-colors">
                        {item.name}
                      </span>
                      {/* Dotted connector */}
                      <span className="flex-1 border-b border-dashed border-white/10 group-hover:border-primary/30 transition-colors mx-1" />
                      <span className="text-sm font-black font-mono text-primary group-hover:scale-103 transition-transform">
                        {item.price}
                      </span>
                    </div>
                    {/* Duration info */}
                    <p className="text-[10px] text-on-surface-variant font-sans font-bold uppercase tracking-wider mt-1.5">
                      Duration: {item.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Quick notes */}
      <div className="max-w-2xl mx-auto bg-zinc-950 border border-white/10 rounded-none p-6 flex gap-4 text-xs text-on-surface-variant font-normal items-start">
        <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-sans font-black text-white uppercase block text-[10px] tracking-[0.2em]">RESERVATION AND DEPOSIT</span>
          <span>We require a 20% deposit to secure highly premium bookings over $200. This is safely managed via custom authorization holds. Taxes and gratuary charges are processed in-salon.</span>
        </div>
      </div>
    </div>
  );
}
