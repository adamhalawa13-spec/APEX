import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, COLLECTIONS_DATA } from '../../data/products';
import { Product } from '../../types';
import { ApexLogo } from '../common/ApexLogo';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, openProductModal, goToCategory, goToCollection } = useShop();
  const [query, setQuery] = useState('');

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
      if (e.key === '/' && !isSearchOpen) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return PRODUCTS.slice(0, 4);
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter((p) => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchCollection = p.collection.toLowerCase().includes(q);
      const matchColor = p.colors.some((c) => c.name.toLowerCase().includes(q));
      const matchSize = p.sizes.some((s) => s.toLowerCase() === q);
      const matchDesc = p.shortDescription.toLowerCase().includes(q);
      return matchName || matchCategory || matchCollection || matchColor || matchSize || matchDesc;
    });
  }, [query]);

  const handleSelectProduct = (p: Product) => {
    setIsSearchOpen(false);
    openProductModal(p);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl flex flex-col animate-in fade-in duration-200">
      {/* Search Header */}
      <div className="max-w-5xl w-full mx-auto px-6 pt-8 pb-4 flex items-center justify-between border-b border-white/10">
        <ApexLogo size="sm" variant="horizontal" />
        <button
          onClick={() => setIsSearchOpen(false)}
          className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs uppercase tracking-widest"
        >
          <span>CLOSE</span>
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Search Input Area */}
      <div className="max-w-5xl w-full mx-auto px-6 py-10">
        <div className="relative border-b-2 border-white/30 focus-within:border-white transition-colors pb-3 flex items-center gap-4">
          <Search className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH APEX..."
            className="w-full bg-transparent text-xl sm:text-3xl font-brand font-bold uppercase tracking-wider text-white placeholder-zinc-600 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-500 hover:text-white p-1 text-xs uppercase font-mono"
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Quick Filter Prompts */}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-zinc-500 uppercase tracking-widest mr-2">Quick Searches:</span>
          {['HOODIES', 'T-SHIRTS', 'OVERSIZED', 'APEX NIGHT', 'APEX CORE', 'BLACK'].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white uppercase tracking-wider text-[11px] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Section */}
        <div className="mt-12">
          <div className="flex justify-between items-center pb-4 border-b border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-400">
            <span>{query ? `RESULTS FOR "${query}" (${filteredProducts.length})` : 'RECOMMENDED PIECES'}</span>
            <span>PRESS ESC TO CLOSE</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="font-brand text-lg text-zinc-400">NO PIECES MATCHED YOUR QUERY</p>
              <p className="text-xs text-zinc-500 font-light max-w-sm mx-auto">
                Try searching by silhouette (e.g. Hoodie, Tee), collection (e.g. Form, Night), or shade (e.g. Obsidian, Chalk).
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => handleSelectProduct(p)}
                  className="group bg-[#111114] border border-white/5 hover:border-white/20 transition-all p-3 cursor-pointer flex flex-col justify-between"
                >
                  <div className="aspect-[3/4] bg-zinc-900 overflow-hidden relative mb-3">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[9px] font-mono tracking-widest text-zinc-400 bg-black/60 px-1.5 py-0.5">
                        {p.collection}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-brand text-xs font-bold text-white uppercase line-clamp-1 group-hover:text-zinc-300">
                      {p.name}
                    </h4>
                    <p className="text-[11px] text-zinc-400 mt-1 tabular-nums">
                      EGP {p.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
