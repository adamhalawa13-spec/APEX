import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';
import { ApexLogo } from '../common/ApexLogo';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductModal, addToCart, isInWishlist, toggleWishlist } = useShop();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [imageLoaded, setImageLoaded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 'Standard', selectedColor, 1);
  };

  const handleCardClick = () => {
    openProductModal(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-[#121214] border border-white/5 rounded-none overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl cursor-pointer"
    >
      {/* Visual Canvas / Product Photography (dominates 70% of card) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#18181b]">
        {/* Fallback styling container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-zinc-900/60 z-0">
          <ApexLogo size="sm" variant="star-only" color="silver" />
          <span className="mt-2 text-[10px] tracking-widest text-zinc-500 uppercase font-mono">
            {product.name}
          </span>
        </div>

        {/* Primary Image with smooth hover scale */}
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`relative z-10 w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Subtle clothing brand mark indicator (official star + APEX) */}
        <div className="absolute bottom-3 left-3 z-20 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono text-zinc-300 tracking-wider">
            <span className="text-white">★</span> APEX
          </span>
        </div>

        {/* Unboxed subtle editorial tag if limited / new */}
        {product.isLimited ? (
          <div className="absolute top-3 left-3 z-20">
            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-200 bg-black/70 backdrop-blur-md px-2 py-0.5 border border-white/10 uppercase">
              {product.editionNumber ? `EDITION ${product.editionNumber}` : 'LIMITED RUN'}
            </span>
          </div>
        ) : product.isNew ? (
          <div className="absolute top-3 left-3 z-20">
            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
              NEW RELEASE
            </span>
          </div>
        ) : null}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white transition-transform hover:scale-110 active:scale-95 cursor-pointer"
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart
            className={`w-3.5 h-3.5 ${
              isFavorited ? 'fill-white text-white' : 'text-zinc-400 group-hover:text-white'
            }`}
          />
        </button>

        {/* Quick Add Overlay on hover */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute inset-x-3 bottom-3 z-30 transition-all duration-300 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hidden sm:block"
        >
          <button
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-[0.2em] transition-all hover:bg-zinc-200 active:scale-[0.99] flex items-center justify-center gap-1.5 shadow-lg cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-[#0e0e10]">
        <div>
          {/* Subtle Category & Collection kicker */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-medium mb-1">
            <span>{product.collection}</span>
            <span className="text-[10px] font-mono text-zinc-600">UNISEX</span>
          </div>

          {/* Product Name */}
          <h3 className="font-brand font-bold text-sm tracking-wide text-zinc-100 line-clamp-1 group-hover:text-white transition-colors">
            {product.name}
          </h3>

          {/* Short description quote */}
          <p className="mt-1 text-xs text-zinc-400 line-clamp-1 font-light leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
          {/* Price */}
          <div className="text-sm font-semibold tabular-nums tracking-wide text-white">
            EGP {product.price.toLocaleString()}
          </div>

          {/* Color options indicator */}
          <div
            className="flex items-center space-x-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                title={color.name}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor === color.name
                    ? 'ring-1 ring-white ring-offset-2 ring-offset-black scale-110'
                    : 'border-white/20 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Color: ${color.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
