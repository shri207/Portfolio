import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Sparkles, Paintbrush, Compass, Calendar, CheckCircle2 } from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (tab: 'home' | 'services' | 'gallery' | 'therapists' | 'pricing' | 'book') => void;
  onSelectCategory?: (category: 'HAIR' | 'COLOR' | 'MAKEUP' | 'SKINCARE' | 'SPA' | 'NAILS') => void;
}

export default function HomeSection({ onNavigate, onSelectCategory }: HomeSectionProps) {
  const features = [
    {
      title: 'Precision Styling',
      icon: <Scissors className="w-6 h-6 text-primary" />,
      description: 'Meticulous cuts styled specifically to frame your features and elevate your personal symmetry.',
      category: 'HAIR' as const,
    },
    {
      title: 'Color Mastery',
      icon: <Paintbrush className="w-6 h-6 text-primary" />,
      description: 'Dimensional color, custom hand-painted highlights, and organic formulas tailored to you.',
      category: 'COLOR' as const,
    },
    {
      title: 'Luxury Treatments',
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      description: 'Transformative facial therapies and body treatments styled for longevity and radiance.',
      category: 'SKINCARE' as const,
    },
  ];

  const handleDiscoverMore = (category: 'HAIR' | 'COLOR' | 'MAKEUP' | 'SKINCARE' | 'SPA' | 'NAILS') => {
    if (onSelectCategory) {
      onSelectCategory(category);
    }
    onNavigate('services');
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Grand Hero Section - Immersive Design */}
      <section className="relative rounded-3xl overflow-hidden min-h-[550px] flex flex-col lg:flex-row bg-zinc-950 border border-white/5">
        
        {/* Left Column (Typography & Action Highlights) */}
        <div className="w-full lg:w-[60%] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative min-h-[480px]">
          {/* Background Image with Dark Vignette for Left Column */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATr2XT-1YW4x0P8e-XCwrHlBYln5KpAriKOKtN2_QBbpsYoeM932rYdWoZL3Zs-zuhNx56MVmH3_fXLznHCoc0ocJnkn1SuVtzhfRJ-W-0smaAhlC1kaREKfAo1qSDcxze18gd19k-lZQF-1jKLzUdJjHlqwqmUxFMgqDquxy2dFtiAXo3JAyyc7YGkA8kH_eLIpjBi4_BiLVi61KwaaLGl04eavAPa2izxdayl4EPxZHebBojPENV8ojGxVd1L92IIUMkaP5JB6ZZ"
              alt="Luxe Salon Wash Lounge Ambient View"
              className="w-full h-full object-cover opacity-20 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] font-black tracking-[0.3em] uppercase text-primary">
                Global Retrospective / Welcome
              </span>
              <div className="h-[1px] w-12 bg-white/20"></div>
            </div>

            <h1 className="text-5xl md:text-7xl font-sans font-black leading-[0.85] tracking-[-0.04em] uppercase text-white">
              TRANSFORM<br />
              <span className="flex items-center flex-wrap gap-3 mt-1">
                AESTHETICS
                <span className="text-[14px] md:text-[18px] font-medium tracking-[0.2em] text-primary/60">[2026]</span>
              </span>
            </h1>

            <div className="mt-8 flex flex-col sm:flex-row gap-8">
              <div className="max-w-xs">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">Concept / Sanctuary</h3>
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  Step into a private digital sanctuary where elite organic alchemy meets professional aesthetic mastery. We deliver tailored design for hair, color, and wellness.
                </p>
              </div>
              <div className="flex flex-row sm:flex-col justify-end items-center sm:items-start gap-1">
                <div className="text-4xl md:text-5xl font-black italic text-primary leading-none">01.</div>
                <div className="text-[8px] font-bold uppercase tracking-widest text-white/40">SESSION Issue</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => onNavigate('book')}
                className="px-8 py-3.5 btn-primary text-xs tracking-widest cursor-pointer"
              >
                Book Appointment
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="px-8 py-3.5 btn-ghost text-xs tracking-widest cursor-pointer"
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (Visual Focus - Abstract CSS Artwork from Bold Typography) */}
        <div className="hidden lg:flex lg:w-[40%] border-l border-white/10 p-12 flex-col relative bg-zinc-950">
          <div className="flex-grow relative min-h-[280px]">
            {/* Abstract CSS Artwork */}
            <div className="absolute inset-0 bg-neutral-900/60 rounded-[2rem] overflow-hidden border border-white/5">
              <div className="absolute top-[-20%] right-[-10%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_#D1FF00_0%,_transparent_50%)] opacity-15 blur-3xl"></div>
              
              {/* Rotating circles and vector shapes */}
              <div className="absolute inset-8 border border-white/10 rounded-full flex items-center justify-center animate-[spin_45s_linear_infinite]">
                <div className="absolute inset-6 border border-white/5 rounded-full"></div>
                <div className="w-1/2 h-1/2 bg-gradient-to-tr from-primary to-transparent rounded-lg rotate-12 opacity-70 shadow-[0_0_50px_rgba(209,255,0,0.25)]"></div>
              </div>
              
              {/* Overlay Text */}
              <div className="absolute bottom-8 left-8 text-[44px] font-black opacity-10 tracking-tighter text-white select-none">PROJECTION</div>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between relative z-10">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">Director</div>
              <div className="text-sm font-black text-white uppercase">LUXE MASTER ARTISANS</div>
            </div>
            <button 
              onClick={() => onNavigate('book')}
              className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300 transform active:scale-95 group cursor-pointer"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" className="group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

      </section>

      {/* Philosophy Highlights / Curated Focus Cards */}
      <section className="space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-xs tracking-[0.25em] font-sans font-black text-primary uppercase">Our Distinct Philosophy</h2>
          <p className="text-3xl font-serif text-white font-black uppercase tracking-tight">A Sanctuary Standard of Excellence</p>
          <div className="w-16 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-panel p-8 rounded-none flex flex-col justify-between group h-full border border-white/10 hover:border-primary/50 transition-colors bg-zinc-900/20"
            >
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-none bg-neutral-900 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {feat.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-black uppercase tracking-tight text-white group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-on-surface-variant font-normal leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/5 mt-6">
                <button
                  onClick={() => handleDiscoverMore(feat.category)}
                  className="inline-flex items-center text-xs tracking-[0.15em] text-primary hover:text-white uppercase font-sans font-black group-hover:underline cursor-pointer"
                >
                  Discover More
                  <Compass className="w-3.5 h-3.5 ml-1.5 opacity-75 group-hover:rotate-45 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Promotional Sanctuary Banner */}
      <section className="rounded-none border-2 border-primary/40 bg-zinc-950/80 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="space-y-4 max-w-xl relative z-10">
          <span className="text-primary font-mono text-[10px] tracking-[0.25em] uppercase font-bold">Unparalleled Luxuries</span>
          <h3 className="text-2xl md:text-3xl font-serif font-black text-white uppercase tracking-tight">Join Our Club & Experience Serenity</h3>
          <p className="text-xs text-on-surface-variant font-normal leading-relaxed">
            Every Luxe Salon appointment comes with a complimentary hot beverage, sparkling champagne or refreshing organic mocktail, a relaxing hair wash massage, and curated botanical sensory journeys.
          </p>
          <ul className="grid grid-cols-2 gap-3 text-xs font-bold text-white/90">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> PREMIUM BOTANICAL ITEMS
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> EXQUISITE PRIVATE WASHSUITES
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> HANDCRAFTED HERBAL TEAS
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> DYNAMIC SOUND THERAPY WAVES
            </li>
          </ul>
        </div>
        <div className="relative z-10">
          <button
            onClick={() => onNavigate('pricing')}
            className="px-8 py-4 btn-ghost font-sans text-xs tracking-widest uppercase rounded-none border-primary hover:bg-primary/20 text-primary cursor-pointer whitespace-nowrap"
          >
            View Pricing Packages
          </button>
        </div>
      </section>
    </div>
  );
}
