import React from 'react';
import { ArrowRight, Sparkles, Camera } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, ASSETS } from '../data/products';
import { Hero } from '../components/home/Hero';
import { ProductCard } from '../components/product/ProductCard';
import { ApexLogo } from '../components/common/ApexLogo';
import { SocialSection } from '../components/home/SocialSection';

export const HomeView: React.FC = () => {
  const { setCurrentView } = useShop();

  // Exactly THREE products on the home page as requested
  const threeProducts = PRODUCTS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
      {/* 1. Cinematic Hero with SHOP and EXPLORE (Optimized for Mobile, Tablet, Laptop) */}
      <Hero />

      {/* 2. THE THREE SIGNATURE PRODUCTS */}
      <section className="py-20 sm:py-28 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-white/10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ApexLogo size="sm" variant="star-only" color="silver" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400">
                CURATED TRIO · THREE PIECES
              </span>
            </div>
            <h2 className="font-brand text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
              THE THREE ICONS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-lg">
              Three definitive garments crafted from custom heavyweight French Terry with hand-finished serialized hardware.
            </p>
          </div>

          {/* Direct Actions: SHOP and EXPLORE */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('shop')}
              className="px-6 py-3 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors flex items-center gap-2 cursor-pointer shadow-xl"
            >
              <span>SHOP ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCurrentView('collections')}
              className="px-6 py-3 bg-zinc-900 border border-white/20 text-white font-brand font-bold text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>EXPLORE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Responsive Grid for EXACTLY 3 Products: 1 col on Mobile, 3 cols on Tablet & Laptop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {threeProducts.map((product) => (
            <div key={product.id} className="flex flex-col">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Quick responsive bottom bar for the three products */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-500 gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Complimentary express delivery on all orders · Zero shipping fees</span>
          </div>
          <button
            onClick={() => setCurrentView('shop')}
            className="text-white hover:underline underline-offset-4 uppercase tracking-widest text-xs flex items-center gap-1 font-bold"
          >
            <span>DISCOVER FULL CATALOG ({PRODUCTS.length} PIECES)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. EDITORIAL PICTURE STORY 1: FORM & MOTION (Large Cinematic Image) */}
      <section className="relative py-12 sm:py-20 lg:py-24 bg-black border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-zinc-900 border border-white/10 group">
            <img
              src={ASSETS.night}
              alt="APEX Campaign Photography — Form & Motion"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-[1.05] group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

            <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-end">
              <div className="max-w-xl space-y-3 sm:space-y-4">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-zinc-400 block">
                  EDITORIAL PICTURE ARCHIVE · CAIRO TRANSIT
                </span>
                <h3 className="font-brand text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
                  FORM & MOTION
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-md hidden sm:block">
                  Nocturnal architectural photography exploring raw concrete geometries, structured silhouettes, and movement.
                </p>

                {/* Prominent SHOP and EXPLORE Buttons for Mobile, Tablet, Laptop */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => setCurrentView('shop')}
                    className="px-8 py-3.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.25em] hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xl"
                  >
                    <span>SHOP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentView('collections')}
                    className="px-8 py-3.5 bg-black/60 backdrop-blur-md border border-white/30 text-white font-brand font-bold text-xs uppercase tracking-[0.25em] hover:bg-white/15 hover:border-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>EXPLORE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EDITORIAL PICTURE STORY 2: TWO. ONE ENERGY (Lifestyle Photography) */}
      <section className="py-20 sm:py-28 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Photography Canvas */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-zinc-900 border border-white/10 group shadow-2xl">
              <img
                src={ASSETS.matching}
                alt="APEX Streetwear Photography — Coordinated Silhouettes"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 block mb-0.5">
                    VISUAL CHRONICLE
                  </span>
                  <p className="text-xs sm:text-sm font-semibold tracking-wider text-white">
                    OBSIDIAN & CHALK HARMONY
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-black border border-white/40" />
                  <span className="w-3 h-3 rounded-full bg-white border border-black/40" />
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Content with SHOP and EXPLORE */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <ApexLogo size="sm" variant="star-only" color="silver" />
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
                CAMPAIGN IMAGERY
              </span>
            </div>

            <h2 className="font-brand text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
              TWO.
              <br />
              ONE ENERGY.
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              Monochrome pairings sharing a unified design philosophy. Pure architectural drape, 480 GSM French Terry, and the embroidered APEX star mark.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={() => setCurrentView('shop')}
                className="px-8 py-3.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.25em] hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>SHOP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentView('collections')}
                className="px-8 py-3.5 bg-zinc-900 border border-white/20 text-white font-brand font-bold text-xs uppercase tracking-[0.25em] hover:bg-zinc-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>EXPLORE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VISUAL MOODBOARD / PICS GALLERY (Pure Pictures across Mobile, Tablet, Laptop) */}
      <section className="py-16 sm:py-24 bg-[#070709] border-t border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2 text-zinc-400 font-mono text-[11px] uppercase tracking-[0.3em]">
                <Camera className="w-3.5 h-3.5" />
                <span>VISUAL ARCHIVE</span>
              </div>
              <h3 className="font-brand text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                PURE CAMPAIGN VISIONS
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('shop')}
                className="px-5 py-2.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                SHOP
              </button>
              <button
                onClick={() => setCurrentView('collections')}
                className="px-5 py-2.5 bg-transparent border border-white/20 text-white font-brand font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors cursor-pointer"
              >
                EXPLORE
              </button>
            </div>
          </div>

          {/* Responsive 3-Image Picture Gallery (Mobile 1 col, Tablet/Laptop 3 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/10 group">
              <img
                src={ASSETS.hero}
                alt="APEX Campaign Photography 1"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-[1.06] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-zinc-300">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">PICTURE 01</span>
                <span>MONUMENTAL ARCHITECTURE</span>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/10 group">
              <img
                src={ASSETS.hoodie}
                alt="APEX Campaign Photography 2"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-[1.06] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-zinc-300">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">PICTURE 02</span>
                <span>FRENCH TERRY CRAFT</span>
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/10 group sm:col-span-2 md:col-span-1">
              <img
                src={ASSETS.night}
                alt="APEX Campaign Photography 3"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter contrast-[1.06] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-zinc-300">
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">PICTURE 03</span>
                <span>NOCTURNAL STREETWEAR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER (SHOP & EXPLORE) */}
      <section className="py-20 sm:py-28 bg-[#09090b] text-center border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <ApexLogo size="md" variant="vertical" color="light" />
          <h2 className="font-brand text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            ELEVATE YOUR WARDROBE
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-md mx-auto">
            Experience our full collection with zero shipping fees across all orders.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentView('shop')}
              className="w-full sm:w-auto px-10 py-4 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.25em] hover:bg-zinc-200 transition-colors cursor-pointer shadow-2xl flex items-center justify-center gap-2"
            >
              <span>SHOP FULL STORE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('collections')}
              className="w-full sm:w-auto px-10 py-4 bg-zinc-900 border border-white/20 text-white font-brand font-bold text-xs uppercase tracking-[0.25em] hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>EXPLORE LOOKBOOK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. Instagram / Social Section ("APEX WORLD") */}
      <SocialSection />
    </div>
  );
};
