import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ApexLogo } from '../common/ApexLogo';

export const Footer: React.FC = () => {
  const { setCurrentView, goToCategory, setIsSizeGuideOpen, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    showToast('Welcome to APEX. Early access unlocked.');
  };

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <button
              onClick={() => setCurrentView('home')}
              className="text-left cursor-pointer focus:outline-none"
            >
              <ApexLogo size="lg" variant="vertical" color="light" />
            </button>

            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              Modern confidence, ambition, and movement. Elevated everyday fashion engineered with brutalist silhouettes, pure materials, and timeless precision.
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400 block">
                FLAGSHIP ATELIER
              </span>
              <p className="text-xs text-zinc-300 font-mono mt-1">
                Cairo & Alexandria, Egypt · International Transit
              </p>
            </div>
          </div>

          {/* Nav Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-zinc-400">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-zinc-400">
              <li>
                <button
                  onClick={() => setCurrentView('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    goToCategory('ALL');
                    setCurrentView('shop');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop All
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    goToCategory('HOODIES');
                    setCurrentView('shop');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Hoodies
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('collections')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About APEX
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge & Support (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-zinc-400">
              CLIENT SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs uppercase tracking-wider text-zinc-400">
              <li>
                <button
                  onClick={() => setCurrentView('account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order Tracking & History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping & Dispatch
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('account')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  14-Day Returns & Exchanges
                </button>
              </li>
              <li>
                <span className="text-zinc-500">Concierge: contact@apex-brand.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-white">
              JOIN APEX
            </h4>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Get early access to new releases and limited collections.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 p-3 bg-zinc-900 border border-white/20 text-xs font-mono text-zinc-200">
                <Check className="w-4 h-4 text-white" />
                <span>YOU HAVE JOINED APEX.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full bg-zinc-900/90 border border-white/20 px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors tracking-wider"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 px-4 py-2 bg-white text-black font-brand font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer"
                  >
                    JOIN
                  </button>
                </div>
                <p className="text-[10px] text-zinc-500 font-mono">
                  By joining, you agree to our private collection advisories.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-4">
          <div>
            © 2026 APEX. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6 text-[11px] tracking-widest">
            <span>MODERN</span>
            <span>·</span>
            <span>CONFIDENT</span>
            <span>·</span>
            <span>MINIMAL</span>
            <span>·</span>
            <span>ELEVATED</span>
            <span>·</span>
            <span className="text-zinc-300 font-bold">APEX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
