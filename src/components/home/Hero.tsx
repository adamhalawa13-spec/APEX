import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ApexLogo } from '../common/ApexLogo';
import { ASSETS } from '../../data/products';

export const Hero: React.FC = () => {
  const { setCurrentView, goToGender } = useShop();

  const handleScrollDown = () => {
    const section = document.getElementById('new-arrivals-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-[92vh] sm:h-screen min-h-[640px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Cinematic Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.hero}
          alt="APEX Campaign — Models in modern architectural setting"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] transform scale-100 transition-transform duration-1000"
        />
        {/* Measured Scrim Overlay for WCAG contrast and luxury depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center justify-center">
        {/* Subtle, prominent official brand mark */}
        <div className="mb-4 sm:mb-6 animate-in fade-in duration-700">
          <ApexLogo size="lg" variant="vertical" color="light" />
        </div>

        {/* Hero Headline */}
        <div className="space-y-2 sm:space-y-3">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.4em] text-zinc-300 font-mono">
            FALL / WINTER 2026
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white font-brand text-balance leading-none">
            RISE ABOVE ORDINARY.
          </h1>

          <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-300/90 font-light tracking-wide leading-relaxed pt-2">
            Elevated essentials designed for everyday movement.
          </p>
        </div>

        {/* Action Buttons: SHOP and EXPLORE (Optimized for Mobile, Tablet, Laptop) */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full sm:w-auto max-w-md sm:max-w-none">
          <button
            onClick={() => setCurrentView('shop')}
            className="w-full sm:w-auto px-10 py-4 bg-white text-black font-brand font-bold text-xs sm:text-sm uppercase tracking-[0.25em] transition-all hover:bg-zinc-200 active:scale-95 cursor-pointer shadow-2xl flex items-center justify-center gap-2"
          >
            <span>SHOP</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentView('collections')}
            className="w-full sm:w-auto px-10 py-4 bg-black/50 backdrop-blur-md border border-white/30 text-white font-brand font-bold text-xs sm:text-sm uppercase tracking-[0.25em] transition-all hover:bg-white/15 hover:border-white active:scale-95 cursor-pointer flex items-center justify-center gap-2 shadow-xl"
          >
            <span>EXPLORE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <button
        onClick={handleScrollDown}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 text-zinc-400 hover:text-white transition-colors cursor-pointer group"
        aria-label="Scroll to new arrivals"
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.3em]">
          DISCOVER
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce text-zinc-400 group-hover:text-white" />
      </button>
    </section>
  );
};
