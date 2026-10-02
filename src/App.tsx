/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { CollectionsView } from './views/CollectionsView';
import { LookbookView } from './views/LookbookView';
import { AboutView } from './views/AboutView';
import { AccountView } from './views/AccountView';
import { CheckoutView } from './views/CheckoutView';
import { AdminView } from './views/AdminView';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { SearchModal } from './components/search/SearchModal';
import { SizeGuideModal } from './components/common/SizeGuideModal';
import { ReceiptModal } from './components/common/ReceiptModal';

const AppContent: React.FC = () => {
  const {
    currentView,
    selectedProduct,
    closeProductModal,
    toastMessage,
    printingOrder,
    setPrintingOrder,
  } = useShop();

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Sticky Luxury Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'collections' && <CollectionsView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'account' && <AccountView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'admin' && <AdminView />}
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Official Tax Receipt & Invoice Modal */}
      {printingOrder && (
        <ReceiptModal order={printingOrder} onClose={() => setPrintingOrder(null)} />
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal product={selectedProduct} onClose={closeProductModal} />

      {/* Shopping Bag Slide-out Drawer */}
      <CartDrawer />

      {/* Full-Screen Luxury Search Interface */}
      <SearchModal />

      {/* Size & Fit Guide Modal */}
      <SizeGuideModal />

      {/* Subtle Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141418] border border-white/20 text-white text-xs font-mono uppercase tracking-wider py-3 px-5 shadow-2xl animate-in slide-in-from-bottom-3 duration-200 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
