import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { LOOKBOOK_ITEMS, PRODUCTS } from '../data/products';
import { ApexLogo } from '../components/common/ApexLogo';

export const LookbookView: React.FC = () => {
  const { openProductModal, setCurrentView, goToCategory } = useShop();

  const handleProductLink = (index: number) => {
    // Map lookbook items to actual products
    const product = PRODUCTS[index % PRODUCTS.length];
    openProductModal(product);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-12 border-b border-white/10 space-y-3">
          <div className="flex items-center gap-2">
            <ApexLogo size="sm" variant="star-only" color="light" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400">
              EDITORIAL ARCHIVE
            </span>
          </div>

          <h1 className="font-brand text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            FALL / WINTER 2026 CAMPAIGN
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl">
            Photography captured across brutalist concrete facades, raw industrial travertine, and nocturnal transit centers.
          </p>
        </div>

        {/* Lookbook Spreads */}
        <div className="mt-16 space-y-28">
          {LOOKBOOK_ITEMS.map((item, idx) => (
            <div key={item.id} className="space-y-6">
              {/* Massive Full Editorial Canvas */}
              <div
                className="relative aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-zinc-950 border border-white/10 group cursor-pointer"
                onClick={() => handleProductLink(idx)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-[1.06] brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Micro Star Badge on Campaign Image */}
                <div className="absolute top-6 right-6 pointer-events-none">
                  <ApexLogo size="sm" variant="vertical" color="light" />
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-400 block">
                      {item.season}
                    </span>
                    <h2 className="font-brand text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                      {item.title}
                    </h2>
                    <p className="text-xs font-mono text-zinc-400">
                      LOCATION: {item.location}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductLink(idx);
                    }}
                    className="px-5 py-2.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-lg"
                  >
                    <span>SHOP FEATURED PIECE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Minimal caption line underneath */}
              <div className="flex justify-between items-center text-xs font-mono text-zinc-500 uppercase tracking-widest px-1">
                <span>INDEX / {item.id.toUpperCase()}</span>
                <span>FEATURING: {item.featuredProduct}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to shop catalog */}
        <div className="mt-32 p-12 bg-[#0e0e11] border border-white/10 text-center space-y-6">
          <ApexLogo size="sm" variant="vertical" color="light" />
          <h3 className="font-brand text-3xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            EXPERIENCE THE COLLECTION
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md mx-auto">
            All pieces featured across the Fall 2026 Lookbook are crafted in limited runs with complimentary Egyptian dispatch.
          </p>
          <div>
            <button
              onClick={() => {
                goToCategory('ALL');
                setCurrentView('shop');
              }}
              className="px-8 py-3.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.25em] hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              EXPLORE FULL SHOP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
