import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight, Lock } from 'lucide-react';
import { useShop, ViewMode } from '../../context/ShopContext';
import { ApexLogo } from '../common/ApexLogo';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    categoryFilter,
    goToCategory,
    cartCount,
    setIsCartOpen,
    wishlist,
    currentUser,
    isAdmin,
    setIsSearchOpen,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: ViewMode) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Slim dismissible luxury announcement ticker */}
      <div className="bg-zinc-950 border-b border-white/5 py-2 px-4 text-center text-[11px] uppercase tracking-[0.25em] text-zinc-400 font-medium">
        <span>Complimentary Express Delivery on All Orders · Zero Shipping Fees</span>
        <span className="mx-2 text-zinc-600 hidden sm:inline">·</span>
        <span className="text-zinc-300 hidden sm:inline">Fall 2026 Collection Live</span>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#09090b]/90 backdrop-blur-md border-white/10 shadow-xl py-3'
            : 'bg-[#09090b]/70 backdrop-blur-sm border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Zone 1 (Left): Official APEX Brand Mark (Star with APEX underneath) */}
            <button
              onClick={() => handleNavClick('home')}
              className="group flex items-center focus:outline-none cursor-pointer text-left transition-opacity hover:opacity-90"
              aria-label="APEX Home"
            >
              <ApexLogo size="md" variant="vertical" color="light" />
            </button>

            {/* Zone 2 (Center): Clean Luxury Navigation Links (HOME, HOODIES, COLLECTIONS, ABOUT) */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-[0.25em]">
              {/* HOME Tab (Replaced New Arrivals) */}
              <button
                onClick={() => handleNavClick('home')}
                className={`transition-colors cursor-pointer py-1 relative ${
                  currentView === 'home'
                    ? 'text-white after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                HOME
              </button>

              {/* HOODIES Tab */}
              <button
                onClick={() => {
                  goToCategory('HOODIES');
                  setMobileMenuOpen(false);
                }}
                className={`transition-colors cursor-pointer py-1 relative ${
                  currentView === 'shop' && categoryFilter === 'HOODIES'
                    ? 'text-white after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                HOODIES
              </button>

              {/* COLLECTIONS Tab */}
              <button
                onClick={() => handleNavClick('collections')}
                className={`transition-colors cursor-pointer py-1 relative ${
                  currentView === 'collections'
                    ? 'text-white after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                COLLECTIONS
              </button>

              {/* ABOUT Tab */}
              <button
                onClick={() => handleNavClick('about')}
                className={`transition-colors cursor-pointer py-1 relative ${
                  currentView === 'about'
                    ? 'text-white after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                ABOUT
              </button>
            </nav>

            {/* Zone 3 (Right): Actions (Search, Account, Wishlist, Shopping Bag, Owner Lock) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/5"
                aria-label="Search APEX"
                title="Search (Press /)"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
              </button>

              {/* Account / Login */}
              <button
                onClick={() => setCurrentView('account')}
                className={`p-2 transition-colors cursor-pointer rounded-full hover:bg-white/5 relative ${
                  currentView === 'account' ? 'text-white bg-white/10' : 'text-zinc-400 hover:text-white'
                }`}
                aria-label="Account"
                title={currentUser ? `Account: ${currentUser.fullName}` : 'Sign In'}
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                {currentUser && (
                  <span className="absolute bottom-1 right-1 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-black" />
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setCurrentView('account')}
                className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/5 relative"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-zinc-200 rounded-full ring-2 ring-black" />
                )}
              </button>

              {/* Shopping Bag */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/10 cursor-pointer"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                <span className="text-xs font-semibold tabular-nums tracking-wider">
                  {cartCount}
                </span>
              </button>

              {/* Exclusive Store Owner Admin Lock Button (Only Admin Entry in Store) */}
              <button
                onClick={() => handleNavClick('admin')}
                className={`p-2 transition-colors cursor-pointer rounded-full hover:bg-white/5 relative ${
                  currentView === 'admin'
                    ? 'text-amber-400 bg-white/10 ring-1 ring-amber-400/50'
                    : 'text-zinc-400 hover:text-amber-400'
                }`}
                aria-label="Owner Admin Lock"
                title="Store Owner Portal"
              >
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.75]" />
                {isAdmin && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-black" />
                )}
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Luxury Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#09090b] border-b border-white/10 px-6 pt-6 pb-8 space-y-6 animate-in slide-in-from-top duration-200">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <ApexLogo size="sm" variant="horizontal" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col space-y-4 text-sm font-semibold uppercase tracking-[0.25em]">
              {/* HOME */}
              <button
                onClick={() => handleNavClick('home')}
                className="text-left text-zinc-300 hover:text-white py-1 flex items-center justify-between"
              >
                <span>HOME</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
              </button>

              {/* HOODIES */}
              <button
                onClick={() => {
                  goToCategory('HOODIES');
                  setMobileMenuOpen(false);
                }}
                className="text-left text-zinc-300 hover:text-white py-1 flex items-center justify-between"
              >
                <span>HOODIES</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
              </button>

              {/* COLLECTIONS */}
              <button
                onClick={() => handleNavClick('collections')}
                className="text-left text-zinc-300 hover:text-white py-1 flex items-center justify-between"
              >
                <span>COLLECTIONS</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
              </button>

              {/* ABOUT */}
              <button
                onClick={() => handleNavClick('about')}
                className="text-left text-zinc-300 hover:text-white py-1 flex items-center justify-between"
              >
                <span>ABOUT APEX</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
              </button>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-4">
              <button
                onClick={() => {
                  setCurrentView('account');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-3 bg-zinc-900 border border-white/10 text-center text-xs uppercase tracking-widest font-semibold text-white rounded-sm"
              >
                {currentUser ? 'My Account' : 'Sign In'}
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-3 bg-white text-black text-center text-xs uppercase tracking-widest font-bold rounded-sm"
              >
                Bag ({cartCount})
              </button>
            </div>

            <div className="pt-1">
              <button
                onClick={() => {
                  setCurrentView('admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-zinc-950 border border-white/10 text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Store Owner Admin Panel</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
