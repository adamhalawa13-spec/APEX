import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ASSETS } from '../../data/products';
import { ApexLogo } from '../common/ApexLogo';

export const MatchingSection: React.FC = () => {
  const { setCurrentView, goToCategory } = useShop();

  const handleExplore = () => {
    goToCategory('HOODIES');
  };

  return (
    <section className="relative py-24 sm:py-32 bg-[#0c0c0e] border-t border-b border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual campaign photography */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-zinc-900 border border-white/10 group">
              <img
                src={ASSETS.matching}
                alt="APEX Matching Collection — Two silhouettes in complementary hoodies"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Subdued design marker callout */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 block mb-1">
                    APEX COMPLEMENTARY CODES
                  </span>
                  <p className="text-xs sm:text-sm font-semibold tracking-wider text-white">
                    OBSIDIAN STAR & CHALK STAR
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-black border border-white/30" />
                  <span className="w-3 h-3 rounded-full bg-zinc-200 border border-black/30" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Copy & Intent */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-3">
              <ApexLogo size="sm" variant="star-only" color="silver" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
                COORDINATED SILHOUETTES
              </span>
            </div>

            <h2 className="font-brand text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
              TWO.
              <br />
              ONE ENERGY.
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              Engineered for those who move together. Subtle, balanced monochrome pairings that share a singular design DNA without literal repetition. Cut with identical heavyweight French Terry and the official APEX star emblem.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={handleExplore}
                className="px-8 py-3.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.25em] transition-all hover:bg-zinc-200 active:scale-95 flex items-center gap-2 cursor-pointer shadow-xl"
              >
                <span>EXPLORE MATCHING</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Unisex · Suitable for all pairings
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
