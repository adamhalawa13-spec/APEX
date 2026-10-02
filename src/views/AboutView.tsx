import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ASSETS } from '../data/products';
import { ApexLogo } from '../components/common/ApexLogo';

export const AboutView: React.FC = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-8 pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-16 text-center space-y-4 border-b border-white/10">
          <ApexLogo size="md" variant="vertical" color="light" />
          <h1 className="font-brand text-5xl sm:text-7xl font-black uppercase tracking-tight text-white">
            FIND YOUR APEX.
          </h1>
          <p className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-400">
            THE MANIFESTO OF MODERN MOVEMENT
          </p>
        </div>

        {/* Section 1: Philosophy */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-4 text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
            01 / PURPOSE
          </div>
          <div className="md:col-span-8 space-y-6 text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
            <p>
              APEX was founded on a singular realization: everyday streetwear had lost its restraint. We design elevated clothing built around strong silhouettes, refined details, and uncompromising timeless construction.
            </p>
            <p className="text-zinc-400 text-sm sm:text-base">
              Every garment is designed for active modern life. We do not chase fleeting trends or cover garments in screaming graphics. Instead, we obsess over fabric density, drop-shoulder geometry, and silent luxury craftsmanship that endures.
            </p>
          </div>
        </div>

        {/* Large Editorial Break Photography */}
        <div className="my-8 aspect-[16/9] overflow-hidden bg-zinc-900 border border-white/10 relative">
          <img
            src={ASSETS.hero}
            alt="APEX Atelier & Architectural Campaign"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover filter contrast-[1.05] brightness-90"
          />
          <div className="absolute bottom-4 left-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-300 bg-black/60 px-2.5 py-1">
              ARCHITECTURAL STUDY 01
            </span>
          </div>
        </div>

        {/* Section 2: The Official Mark */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-t border-white/10">
          <div className="md:col-span-4 text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
            02 / THE EMBLEM
          </div>
          <div className="md:col-span-8 flex flex-col sm:flex-row items-center gap-8 bg-[#121215] border border-white/5 p-8">
            <div className="shrink-0 p-6 bg-black border border-white/10">
              <ApexLogo size="xl" variant="vertical" color="light" />
            </div>
            <div className="space-y-3">
              <h3 className="font-brand text-lg font-bold uppercase tracking-wider text-white">
                THE STAR & APEX LOCKUP
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                The official APEX logo combines an exact geometric star emblem anchored directly above the APEX wordmark. On our clothing, this mark is applied with high-density tonal embroidery or sterling silver hardware — never duplicated unnecessarily, preserving purity and authority.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Material Standards */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-white/10">
          <div className="md:col-span-4 text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
            03 / MATERIAL CODE
          </div>
          <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-zinc-950 border border-white/5 space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">480–540 GSM</span>
              <h4 className="font-brand text-sm font-bold text-white uppercase">CUSTOM FRENCH TERRY</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Dense, pre-shrunk combed yarns providing substantial architectural weight without stiffness.
              </p>
            </div>

            <div className="p-6 bg-zinc-950 border border-white/5 space-y-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">UNISEX ENGINEERING</span>
              <h4 className="font-brand text-sm font-bold text-white uppercase">UNIVERSAL PROPORTIONS</h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Precision grading calibrated for men, women, and teenagers seeking elevated modern silhouettes.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center pt-12 border-t border-white/10 space-y-6">
          <h3 className="font-brand text-2xl sm:text-3xl font-extrabold uppercase text-white">
            WEAR CONFIDENCE.
          </h3>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-8 py-3.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.25em] hover:bg-zinc-200 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-xl"
          >
            <span>SHOP THE COLLECTION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
