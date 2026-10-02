import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, ASSETS } from '../../data/products';
import { ApexLogo } from '../common/ApexLogo';

export const LimitedSection: React.FC = () => {
  const { openProductModal, goToCategory } = useShop();

  const limitedProduct = PRODUCTS.find((p) => p.isLimited) || PRODUCTS[0];

  const handleView = () => {
    openProductModal(limitedProduct);
  };

  return (
    <section className="relative py-28 sm:py-36 bg-[#070708] border-t border-b border-zinc-900 text-white overflow-hidden">
      {/* Subtle metallic radial background effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Editorial info column */}
          <div className="max-w-xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[10px] uppercase font-mono tracking-[0.3em] text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
              <span>COLLECTOR ARCHIVE RELEASE</span>
            </div>

            <h2 className="font-brand text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              LIMITED
              <br />
              BY DESIGN.
            </h2>

            <p className="text-base text-zinc-400 font-light leading-relaxed">
              Selected APEX pieces produced in limited quantities. Constructed from custom 540 GSM Japanese terry with pure silver thread star embroidery and individual hand-numbered serial plaques.
            </p>

            {/* Release Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b border-white/10 font-mono text-xs">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
                  COLLECTION
                </span>
                <span className="font-bold text-zinc-200">APEX LIMITED</span>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
                  EDITION NUMBER
                </span>
                <span className="font-bold text-white tracking-widest">
                  {limitedProduct.editionNumber || '042/150'}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
                  RELEASE DATE
                </span>
                <span className="font-bold text-zinc-200">
                  {limitedProduct.releaseDate || 'FALL 2026'}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
                  REMAINING STOCK
                </span>
                <span className="font-bold text-white tabular-nums">
                  {limitedProduct.remainingStock || 14} / {limitedProduct.totalStock || 150}
                </span>
              </div>
            </div>

            {/* Stock Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                <span>91% OF ARCHIVE ALLOTTED</span>
                <span>STRICT LIMIT: 1 PER ORDER</span>
              </div>
              <div className="w-full bg-zinc-900 h-1 overflow-hidden">
                <div className="bg-zinc-200 h-full w-[91%]" />
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleView}
                className="px-8 py-4 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.25em] transition-all hover:bg-zinc-200 active:scale-95 flex items-center gap-3 cursor-pointer shadow-2xl"
              >
                <span>VIEW LIMITED RELEASE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="w-full lg:w-[480px] bg-[#121215] border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl group cursor-pointer"
            onClick={handleView}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black mb-6">
              <img
                src={limitedProduct.images[0]}
                alt={limitedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3">
                <ApexLogo size="sm" variant="clothing-badge" />
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block">
                  APEX ARCHIVE SPECIMEN
                </span>
                <h3 className="font-brand text-base font-bold text-white uppercase tracking-wider mt-1">
                  {limitedProduct.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono font-bold text-white">
                  EGP {limitedProduct.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
