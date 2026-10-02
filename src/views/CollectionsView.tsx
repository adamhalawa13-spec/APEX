import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { COLLECTIONS_DATA } from '../data/products';
import { ApexLogo } from '../components/common/ApexLogo';

export const CollectionsView: React.FC = () => {
  const { goToCollection } = useShop();

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-12 border-b border-white/10 space-y-4 text-center max-w-2xl mx-auto">
          <ApexLogo size="sm" variant="star-only" color="silver" />
          <h1 className="font-brand text-4xl sm:text-6xl font-black uppercase tracking-tight text-white">
            APEX COLLECTIONS
          </h1>
          <p className="text-sm text-zinc-400 font-light leading-relaxed">
            Curated architectural releases engineered around movement, volume, and material integrity. Each series explores an uncompromising facet of modern luxury streetwear.
          </p>
        </div>

        {/* Collections Editorial List */}
        <div className="mt-16 space-y-20">
          {COLLECTIONS_DATA.map((col, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <div
                key={col.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#101013] border border-white/5 p-6 sm:p-10 group transition-all duration-300 hover:border-white/20"
              >
                {/* Image Column (7 cols) */}
                <div
                  className={`lg:col-span-7 relative overflow-hidden bg-black aspect-[16/10] cursor-pointer ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                  onClick={() => goToCollection(col.id)}
                >
                  <img
                    src={col.image}
                    alt={col.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter contrast-[1.05] brightness-90 group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  {/* Corner indicator */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-300 bg-black/60 px-2 py-1 backdrop-blur-md">
                      SERIES {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                  </div>
                </div>

                {/* Content Column (5 cols) */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">
                      <span>SERIES 0{index + 1}</span>
                      <span>{col.itemCount}</span>
                    </div>

                    <h2 className="font-brand text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                      {col.title}
                    </h2>

                    <p className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                      "{col.tagline}"
                    </p>
                  </div>

                  <p className="text-sm text-zinc-400 font-light leading-relaxed">
                    {col.description}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => goToCollection(col.id)}
                      className="px-8 py-3.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.25em] transition-all hover:bg-zinc-200 active:scale-95 inline-flex items-center gap-2 cursor-pointer shadow-lg"
                    >
                      <span>SHOP {col.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
