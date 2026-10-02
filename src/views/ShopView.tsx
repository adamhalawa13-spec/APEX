import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { ProductCategory, CollectionName } from '../types';
import { ApexLogo } from '../components/common/ApexLogo';

const CATEGORIES: ProductCategory[] = [
  'ALL',
  'HOODIES',
  'OVERSIZED',
  'ESSENTIALS',
  'LIMITED EDITION',
];

const COLLECTIONS: (CollectionName | 'ALL')[] = [
  'ALL',
  'APEX CORE',
  'APEX MOTION',
  'APEX FORM',
  'APEX NIGHT',
  'APEX LIMITED',
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];
const COLORS = ['Obsidian Black', 'Chalk White', 'Ash Grey', 'Charcoal'];

export const ShopView: React.FC = () => {
  const {
    categoryFilter,
    setCategoryFilter,
    collectionFilter,
    setCollectionFilter,
    genderFilter,
    setGenderFilter,
  } = useShop();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (categoryFilter !== 'ALL') {
        if (categoryFilter === 'ESSENTIALS') {
          if (product.collection !== 'APEX CORE') return false;
        } else if (product.category !== categoryFilter) {
          return false;
        }
      }

      // Collection filter
      if (collectionFilter !== 'ALL' && product.collection !== collectionFilter) {
        return false;
      }

      // Gender filter
      if (genderFilter !== 'all') {
        if (product.gender && product.gender !== 'unisex' && product.gender !== genderFilter) {
          return false;
        }
      }

      // Size filter
      if (selectedSize && !product.sizes.includes(selectedSize)) {
        return false;
      }

      // Color filter
      if (selectedColor && !product.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()))) {
        return false;
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // featured
    });
  }, [categoryFilter, collectionFilter, genderFilter, selectedSize, selectedColor, maxPrice, sortBy]);

  const resetFilters = () => {
    setCategoryFilter('ALL');
    setCollectionFilter('ALL');
    setGenderFilter('all');
    setSelectedSize(null);
    setSelectedColor(null);
    setMaxPrice(5000);
    setSortBy('featured');
  };

  const hasActiveFilters =
    categoryFilter !== 'ALL' ||
    collectionFilter !== 'ALL' ||
    genderFilter !== 'all' ||
    selectedSize !== null ||
    selectedColor !== null ||
    maxPrice < 5000;

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-6 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="py-8 sm:py-12 border-b border-white/10 space-y-4">
          <div className="flex items-center gap-2">
            <ApexLogo size="sm" variant="star-only" color="light" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400">
              COLLECTION CATALOG
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-brand text-4xl sm:text-5xl font-black uppercase tracking-tight text-white">
                SHOP ALL APEX
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1">
                Heavyweight French Terry hoodies, architectural tees, and limited releases.
              </p>
            </div>

            {/* Filter Count & Reset */}
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span>{filteredProducts.length} PIECES AVAILABLE</span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-white underline underline-offset-4 hover:text-zinc-300 cursor-pointer"
                >
                  RESET FILTERS
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Primary Category Tabs (Functional segmented controls) */}
        <div className="py-6 border-b border-white/5 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 sm:gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 text-xs font-mono font-medium uppercase tracking-[0.15em] whitespace-nowrap transition-colors cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-white text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500">SORT:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-900 border border-white/10 text-white text-xs font-mono uppercase px-3 py-1.5 focus:outline-none focus:border-white"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Grid & Filters Row */}
        <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 space-y-8 pr-6 border-r border-white/5">
            {/* Gender Filter */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-300 mb-3">
                DEPARTMENT
              </h4>
              <div className="space-y-1.5 text-xs uppercase tracking-wider text-zinc-400">
                {['all', 'men', 'women'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenderFilter(g as any)}
                    className={`w-full text-left py-1 flex items-center justify-between transition-colors ${
                      genderFilter === g ? 'text-white font-bold' : 'hover:text-white'
                    }`}
                  >
                    <span>{g === 'all' ? 'All Genders (Unisex)' : `Shop ${g}`}</span>
                    {genderFilter === g && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Collection Filter */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-300 mb-3">
                COLLECTIONS
              </h4>
              <div className="space-y-1.5 text-xs uppercase tracking-wider text-zinc-400">
                {COLLECTIONS.map((col) => (
                  <button
                    key={col}
                    onClick={() => setCollectionFilter(col)}
                    className={`w-full text-left py-1 flex items-center justify-between transition-colors ${
                      collectionFilter === col ? 'text-white font-bold' : 'hover:text-white'
                    }`}
                  >
                    <span>{col}</span>
                    {collectionFilter === col && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h4 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-300 mb-3">
                SHADE
              </h4>
              <div className="space-y-2 text-xs text-zinc-400">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(selectedColor === color ? null : color)}
                    className={`w-full flex items-center justify-between py-1 transition-colors ${
                      selectedColor === color ? 'text-white font-bold' : 'hover:text-white'
                    }`}
                  >
                    <span>{color}</span>
                    {selectedColor === color && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max Slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                <span>MAX PRICE</span>
                <span className="text-white">EGP {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="5000"
                step="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-white bg-zinc-800 h-1 cursor-pointer"
              />
            </div>
          </div>

          {/* Product Grid Area (9 cols on desktop) */}
          <div className="lg:col-span-9">
            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/10 text-xs font-mono uppercase tracking-wider text-white"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>FILTERS {hasActiveFilters ? '(ACTIVE)' : ''}</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-900 border border-white/10 text-white text-xs font-mono uppercase px-3 py-2"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>

            {/* Mobile Collapsible Filters */}
            {mobileFilterOpen && (
              <div className="lg:hidden p-6 bg-zinc-950 border border-white/10 mb-8 space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-zinc-300 mb-2">SIZING</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                        className={`py-2 text-xs font-mono text-center border ${
                          selectedSize === size
                            ? 'bg-white text-black font-bold'
                            : 'bg-zinc-900 text-zinc-400 border-white/10'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-zinc-300 mb-2">COLLECTIONS</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {COLLECTIONS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setCollectionFilter(c)}
                        className={`p-2 text-left border ${
                          collectionFilter === c
                            ? 'bg-white text-black font-bold'
                            : 'bg-zinc-900 text-zinc-400 border-white/10'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={resetFilters}
                    className="flex-1 py-2 text-xs font-mono uppercase text-zinc-400 border border-white/10"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="flex-1 py-2 text-xs font-mono uppercase bg-white text-black font-bold"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}

            {/* Product Cards Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center border border-white/5 p-8 bg-[#101013]">
                <ApexLogo size="sm" variant="star-only" color="silver" />
                <h3 className="font-brand text-lg font-bold text-white mt-4 uppercase">
                  NO PIECES FOUND
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-1 max-w-sm mx-auto">
                  Adjust your criteria or clear active filters to discover other APEX silhouettes.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-6 py-2.5 bg-white text-black text-xs uppercase font-bold tracking-widest hover:bg-zinc-200"
                >
                  RESET ALL FILTERS
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
