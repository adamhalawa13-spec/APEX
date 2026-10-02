import React from 'react';
import { X, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ApexLogo } from '../common/ApexLogo';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    shippingFee,
    cartTotal,
    setCurrentView,
  } = useShop();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
  };

  const handleViewBagClick = () => {
    setIsCartOpen(false);
    setCurrentView('shop');
  };

  const freeShippingThreshold = 2500;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0e0e11] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#121215]">
            <div className="flex items-center gap-3">
              <ApexLogo size="sm" variant="star-only" color="light" />
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
                SHOPPING BAG ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Banner */}
          <div className="px-6 py-2.5 bg-zinc-950 border-b border-white/5 text-xs text-zinc-300">
            <div className="text-[11px] font-mono text-emerald-400 text-center tracking-wider flex items-center justify-center gap-1.5">
              <span>✓</span>
              <span>COMPLIMENTARY EXPRESS DELIVERY ON ALL ORDERS · ZERO FEES</span>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-white/5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <ShoppingBag className="w-10 h-10 text-zinc-600 stroke-[1.25]" />
                <h3 className="font-brand text-lg font-bold tracking-wide text-zinc-300">
                  YOUR BAG IS EMPTY
                </h3>
                <p className="text-xs text-zinc-500 max-w-xs font-light">
                  Elevated pieces engineered for everyday movement await.
                </p>
                <button
                  onClick={handleViewBagClick}
                  className="mt-2 px-6 py-3 bg-white text-black text-xs uppercase font-bold tracking-[0.2em] hover:bg-zinc-200 transition-colors"
                >
                  DISCOVER COLLECTION
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-5 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-zinc-900 border border-white/10 shrink-0 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-brand text-xs font-bold tracking-wider text-zinc-100 uppercase line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zinc-500 hover:text-white p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
                        <span>COLOR: {item.color}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Stepper */}
                      <div className="flex items-center border border-white/10 bg-zinc-900">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white text-xs"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-[11px] font-mono text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="px-2 py-0.5 text-zinc-400 hover:text-white text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="text-xs font-semibold tabular-nums text-white">
                        EGP {(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#121215] border-t border-white/10 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white font-mono tabular-nums">
                    EGP {cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-emerald-400 font-mono font-semibold">
                    FREE (EGP 0)
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/5">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">
                    EGP {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-white text-black text-xs uppercase font-bold tracking-[0.25em] flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleViewBagClick}
                  className="w-full py-3 bg-transparent border border-white/15 text-zinc-300 text-xs uppercase font-semibold tracking-[0.2em] hover:bg-white/5 transition-colors cursor-pointer"
                >
                  CONTINUE SHOPPING
                </button>
              </div>

              <div className="text-center text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                SECURE 256-BIT ENCRYPTED CHECKOUT
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
