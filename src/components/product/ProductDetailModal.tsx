import React, { useState } from 'react';
import { X, Heart, ShieldCheck, Truck, RefreshCw, Ruler, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { ApexLogo } from '../common/ApexLogo';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, isInWishlist, toggleWishlist, setIsSizeGuideOpen, setCurrentView, setIsCartOpen } = useShop();

  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Obsidian Black');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('materials');
  const [quantity, setQuantity] = useState(1);

  const isFavorited = isInWishlist(product.id);

  const handleAddToBag = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsCartOpen(false);
    onClose();
    setCurrentView('checkout');
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion((prev) => (prev === section ? null : section));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-0 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl min-h-screen md:min-h-[85vh] bg-[#0d0d0f] border-0 md:border md:border-white/10 shadow-2xl flex flex-col overflow-hidden">
        {/* Top bar modal control */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0d0d0f]/95 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center gap-3">
            <ApexLogo size="sm" variant="horizontal" />
            <span className="text-zinc-600">/</span>
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-mono">
              {product.collection}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-white text-white' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Main Content: Split Gallery (Left) & Contiguous Purchase Module (Right) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-y-auto">
          {/* Gallery Column (7 cols on desktop) */}
          <div className="lg:col-span-7 bg-[#141417] p-4 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
            {/* Primary Dominant Image */}
            <div className="relative aspect-[3/4] w-full max-h-[640px] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`${product.name} view ${activeImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Discreet Official Brand Mark Overlay on clothing view */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-300">
                  <span className="text-white">★</span> APEX OFFICIAL
                </span>
              </div>

              {product.isLimited && (
                <div className="absolute top-4 right-4">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-zinc-300 bg-black/80 px-2.5 py-1 border border-white/20">
                    EDITION {product.editionNumber}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="mt-4 grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-[3/4] overflow-hidden border transition-all ${
                    activeImageIndex === idx
                      ? 'border-white opacity-100 ring-1 ring-white'
                      : 'border-white/10 opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 text-[8px] font-mono text-zinc-400 bg-black/60 px-1">
                    0{idx + 1}
                  </div>
                </button>
              ))}
            </div>

            {/* Image angle callouts */}
            <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-widest text-zinc-500 font-mono">
              <span>View: Front / Profile / Architecture / Detail</span>
              <span>100% Studio Capture</span>
            </div>
          </div>

          {/* Product Purchase Module (5 cols on desktop) */}
          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-[#0d0d0f]">
            <div>
              {/* Collection kicker */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-zinc-500 font-medium mb-2">
                <span>{product.collection}</span>
                <span>·</span>
                <span className="text-zinc-400">UNISEX SILHOUETTE</span>
              </div>

              {/* Product Title */}
              <h1 className="font-brand text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mt-3 text-xl font-bold tabular-nums text-white tracking-wide">
                EGP {product.price.toLocaleString()}
              </div>

              {/* Short Editorial Description */}
              <p className="mt-4 text-sm text-zinc-300 leading-relaxed font-light border-b border-white/5 pb-6">
                "{product.shortDescription}"
              </p>

              {/* Color Picker */}
              <div className="mt-6">
                <div className="flex justify-between items-center text-xs uppercase tracking-widest text-zinc-400 mb-2">
                  <span>Color: <strong className="text-white">{selectedColor}</strong></span>
                  <span className="text-zinc-500">{product.colors.length} shades</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`group relative flex items-center justify-center p-1 rounded-full border transition-all ${
                        selectedColor === c.name
                          ? 'border-white scale-110'
                          : 'border-white/20 hover:border-white/50'
                      }`}
                      title={c.name}
                    >
                      <span
                        className="w-5 h-5 rounded-full block border border-black/40"
                        style={{ backgroundColor: c.hex }}
                      />
                      {selectedColor === c.name && (
                        <Check className="w-3 h-3 text-white absolute inset-0 m-auto drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-xs uppercase tracking-widest text-zinc-400">Quantity</span>
                <div className="flex items-center border border-white/10 bg-zinc-900/80">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-zinc-400 hover:text-white text-sm"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-mono text-white tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-zinc-400 hover:text-white text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons: ADD TO BAG & BUY NOW */}
              <div className="mt-8 space-y-3">
                <button
                  onClick={handleAddToBag}
                  className="w-full py-4 bg-white text-black font-bold text-xs uppercase tracking-[0.25em] transition-all hover:bg-zinc-200 active:scale-[0.99] cursor-pointer shadow-xl"
                >
                  ADD TO BAG
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-transparent border border-white/20 text-white font-bold text-xs uppercase tracking-[0.25em] transition-all hover:bg-white/10 active:scale-[0.99] cursor-pointer"
                >
                  BUY NOW
                </button>
              </div>

              {/* Trust markers */}
              <div className="mt-6 grid grid-cols-2 gap-4 py-4 border-t border-b border-white/5 text-[11px] text-zinc-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-zinc-300" />
                  <span>Complimentary Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-zinc-300" />
                  <span>14-Day Returns & Exchanges</span>
                </div>
              </div>

              {/* Editorial Technical Accordions */}
              <div className="mt-6 divide-y divide-white/5 text-xs">
                {/* Materials */}
                <div className="py-3">
                  <button
                    onClick={() => toggleAccordion('materials')}
                    className="w-full flex items-center justify-between uppercase tracking-widest text-zinc-300 hover:text-white font-medium cursor-pointer"
                  >
                    <span>Materials</span>
                    {activeAccordion === 'materials' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {activeAccordion === 'materials' && (
                    <p className="mt-2 text-zinc-400 leading-relaxed font-light pl-1">
                      {product.specs.materials}
                    </p>
                  )}
                </div>

                {/* Fit */}
                <div className="py-3">
                  <button
                    onClick={() => toggleAccordion('fit')}
                    className="w-full flex items-center justify-between uppercase tracking-widest text-zinc-300 hover:text-white font-medium cursor-pointer"
                  >
                    <span>Fit & Silhouette</span>
                    {activeAccordion === 'fit' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {activeAccordion === 'fit' && (
                    <p className="mt-2 text-zinc-400 leading-relaxed font-light pl-1">
                      {product.specs.fit}
                    </p>
                  )}
                </div>

                {/* Care */}
                <div className="py-3">
                  <button
                    onClick={() => toggleAccordion('care')}
                    className="w-full flex items-center justify-between uppercase tracking-widest text-zinc-300 hover:text-white font-medium cursor-pointer"
                  >
                    <span>Care Instructions</span>
                    {activeAccordion === 'care' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {activeAccordion === 'care' && (
                    <p className="mt-2 text-zinc-400 leading-relaxed font-light pl-1">
                      {product.specs.care}
                    </p>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div className="py-3">
                  <button
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full flex items-center justify-between uppercase tracking-widest text-zinc-300 hover:text-white font-medium cursor-pointer"
                  >
                    <span>Shipping & Returns</span>
                    {activeAccordion === 'shipping' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {activeAccordion === 'shipping' && (
                    <div className="mt-2 text-zinc-400 leading-relaxed font-light space-y-1.5 pl-1">
                      <p>{product.specs.shipping}</p>
                      <p>{product.specs.returns}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
