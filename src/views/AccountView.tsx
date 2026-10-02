import React, { useState } from 'react';
import {
  Package,
  Heart,
  MapPin,
  Check,
  Truck,
  LogOut,
  ShieldCheck,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { OrderStatus } from '../types';
import { ProductCard } from '../components/product/ProductCard';
import { ApexLogo } from '../components/common/ApexLogo';

const TRACKING_STEPS: OrderStatus[] = [
  'ORDER PLACED',
  'PROCESSING',
  'PACKED',
  'SHIPPED',
  'DELIVERED',
];

export const AccountView: React.FC = () => {
  const {
    orders,
    wishlist,
    currentUser,
    login,
    signup,
    logout,
    cancelOrder,
    setCurrentView,
  } = useShop();

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [cityInput, setCityInput] = useState('Cairo');
  const [addressInput, setAddressInput] = useState('');
  const [districtInput, setDistrictInput] = useState('');

  const [activeTab, setActiveTab] = useState<'orders' | 'tracking' | 'wishlist' | 'addresses'>('orders');
  const [selectedOrderIndex, setSelectedOrderIndex] = useState(0);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);

  // Filter orders strictly for the current authenticated user (no fake orders fallback)
  const displayedOrders = currentUser
    ? orders.filter(
        (o) =>
          o.customerEmail?.toLowerCase() === currentUser.email.toLowerCase() ||
          o.customer.email?.toLowerCase() === currentUser.email.toLowerCase()
      )
    : [];

  const activeOrder = displayedOrders[selectedOrderIndex] || displayedOrders[0];
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const getStepProgressIndex = (status: OrderStatus) => {
    return TRACKING_STEPS.indexOf(status);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(emailInput, passwordInput);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      email: emailInput,
      fullName: nameInput,
      phone: phoneInput,
      city: cityInput,
      address: addressInput,
      district: districtInput,
    });
  };

  const confirmCancel = () => {
    if (orderToCancel) {
      cancelOrder(orderToCancel);
      setOrderToCancel(null);
    }
  };

  // If user is NOT signed in, display registration/sign-in interface
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white pt-12 pb-32">
        <div className="max-w-md mx-auto px-4 sm:px-6">
          <div className="bg-[#101014] border border-white/15 p-8 sm:p-10 space-y-8 shadow-2xl">
            <div className="text-center space-y-3">
              <ApexLogo size="sm" variant="vertical" color="light" />
              <h1 className="font-brand text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white pt-2">
                APEX CLIENT PORTAL
              </h1>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                Sign in or register to store your verified delivery coordinates, track real-time dispatch progress, and access past order history.
              </p>
            </div>

            {/* Tab switch between Sign In and Register */}
            <div className="grid grid-cols-2 p-1 bg-zinc-900 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setAuthMode('signin')}
                className={`py-2 text-center uppercase tracking-wider transition-colors cursor-pointer ${
                  authMode === 'signin' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('signup')}
                className={`py-2 text-center uppercase tracking-wider transition-colors cursor-pointer ${
                  authMode === 'signup' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>

            {authMode === 'signin' ? (
              <form onSubmit={handleSignInSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1.5">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-zinc-900 border border-white/15 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors tracking-wide font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1.5">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-zinc-900 border border-white/15 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors tracking-wide font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.25em] hover:bg-zinc-200 transition-colors cursor-pointer mt-2"
                >
                  SIGN IN TO ACCOUNT
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full bg-zinc-900 border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-zinc-900 border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                    PHONE NUMBER *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    placeholder="+20 100 000 0000"
                    className="w-full bg-zinc-900 border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                    DELIVERY STREET ADDRESS *
                  </label>
                  <input
                    type="text"
                    required
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    placeholder="Street, Building, Villa or Compound"
                    className="w-full bg-zinc-900 border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                      CITY *
                    </label>
                    <input
                      type="text"
                      required
                      value={cityInput}
                      onChange={(e) => setCityInput(e.target.value)}
                      placeholder="Cairo"
                      className="w-full bg-zinc-900 border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-1">
                      DISTRICT
                    </label>
                    <input
                      type="text"
                      value={districtInput}
                      onChange={(e) => setDistrictInput(e.target.value)}
                      placeholder="e.g. Fifth Settlement"
                      className="w-full bg-zinc-900 border border-white/15 px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors font-mono"
                    />
                  </div>
                </div>

                <p className="text-[10px] text-zinc-500 font-mono">
                  * Address coordinates are automatically saved to your profile and pre-filled for rapid checkout.
                </p>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.25em] hover:bg-zinc-200 transition-colors cursor-pointer mt-2"
                >
                  REGISTER ACCOUNT & SAVE ADDRESS
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Account Header */}
        <div className="py-10 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ApexLogo size="sm" variant="star-only" color="light" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400">
                APEX CLIENT ATELIER
              </span>
            </div>
            <h1 className="font-brand text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              MY ACCOUNT
            </h1>
            <p className="text-xs font-mono text-zinc-400 mt-1">
              Welcome back, <strong className="text-white">{currentUser.fullName}</strong> ({currentUser.email})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="flex items-center gap-1.5 px-3 py-2 bg-zinc-900/60 border border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-red-400 hover:border-red-400/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation (Segmented control) */}
        <div className="py-6 border-b border-white/5 flex gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'orders', label: `My Orders (${displayedOrders.length})`, icon: Package },
            { id: 'tracking', label: 'Live Shipping Tracker', icon: Truck },
            { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
            { id: 'addresses', label: 'Delivery Coordinates', icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-black font-bold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="pt-8">
          {/* TAB 1: MY ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {displayedOrders.length === 0 ? (
                <div className="py-20 text-center border border-white/10 bg-[#101014] p-8 space-y-4">
                  <Package className="w-12 h-12 text-zinc-600 mx-auto" />
                  <p className="font-brand text-xl text-white">NO ORDERS RECORDED YET</p>
                  <p className="text-xs text-zinc-400 font-mono">
                    You have not placed any orders yet. Explore our elevated essentials with zero shipping fees.
                  </p>
                  <button
                    onClick={() => setCurrentView('shop')}
                    className="mt-4 px-6 py-3 bg-white text-black text-xs font-brand uppercase font-bold tracking-widest cursor-pointer"
                  >
                    START SHOPPING
                  </button>
                </div>
              ) : (
                displayedOrders.map((ord, idx) => {
                  const canCancel = ord.status !== 'CANCELLED' && ord.status !== 'DELIVERED';
                  const isCancelled = ord.status === 'CANCELLED';

                  return (
                    <div
                      key={ord.orderId}
                      className={`bg-[#101014] border p-6 sm:p-8 space-y-6 ${
                        isCancelled ? 'border-red-950/40 opacity-80' : 'border-white/15'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-4 text-xs font-mono">
                        <div className="space-y-1">
                          <span className="text-zinc-500 uppercase tracking-widest text-[10px]">ORDER ID</span>
                          <div className="font-bold text-white text-base tracking-wider">#{ord.orderId}</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-zinc-500 uppercase tracking-widest text-[10px]">ORDER DATE</span>
                          <div className="text-zinc-300">{ord.date}</div>
                        </div>

                        {/* Live Shipping Status Badge (Read-only for Customer) */}
                        <div className="space-y-1">
                          <span className="text-zinc-500 uppercase tracking-widest text-[10px]">
                            SHIPPING STATUS
                          </span>
                          <div>
                            <span
                              className={`px-2.5 py-1 text-xs font-bold tracking-widest uppercase inline-block border ${
                                isCancelled
                                  ? 'bg-red-950/80 border-red-500/50 text-red-300'
                                  : ord.status === 'DELIVERED'
                                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                                  : 'bg-white/15 text-white border-white/20'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-zinc-500 uppercase tracking-widest text-[10px]">TOTAL</span>
                          <div className="font-bold text-white tabular-nums text-sm">
                            EGP {ord.total.toLocaleString()}
                          </div>
                        </div>

                        {/* Customer Actions */}
                        <div className="flex items-center gap-2 pt-2 sm:pt-0">
                          <button
                            onClick={() => {
                              setSelectedOrderIndex(idx);
                              setActiveTab('tracking');
                            }}
                            className="px-3.5 py-2 bg-zinc-900 border border-white/20 text-white text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors cursor-pointer"
                          >
                            TRACK STATUS
                          </button>

                          {/* Customer Cancel Order Action */}
                          {canCancel && (
                            <button
                              onClick={() => setOrderToCancel(ord.orderId)}
                              className="px-3.5 py-2 bg-red-950/40 border border-red-500/30 text-red-300 text-xs uppercase tracking-wider hover:bg-red-900/60 hover:text-white transition-colors cursor-pointer"
                            >
                              CANCEL ORDER
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Notice informing customer that status is live & read-only */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 bg-zinc-950 p-3 border border-white/5">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>
                            {isCancelled
                              ? 'This order has been cancelled upon your request.'
                              : 'Shipping status is managed by APEX Dispatch and updates in real-time.'}
                          </span>
                        </div>
                        <span className="text-zinc-400 hidden md:inline">
                          Waybill: {ord.trackingNumber}
                        </span>
                      </div>

                      {/* Order items */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                        {ord.items.map((item, i) => (
                          <div key={i} className="flex gap-3 bg-zinc-900/60 p-3 border border-white/5 items-center">
                            <img
                              src={item.image}
                              alt={item.productName}
                              referrerPolicy="no-referrer"
                              className="w-16 h-20 object-cover bg-black shrink-0"
                            />
                            <div className="text-xs flex flex-col justify-between">
                              <div>
                                <div className="font-brand font-bold text-white uppercase line-clamp-1">
                                  {item.productName}
                                </div>
                                <div className="text-[11px] font-mono text-zinc-400 mt-1">
                                  {item.color} · QTY: {item.quantity}
                                </div>
                              </div>
                              <div className="font-mono text-white tabular-nums pt-2">
                                EGP {item.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 2: LIVE SHIPPING TRACKER */}
          {activeTab === 'tracking' && activeOrder && (
            <div className="bg-[#101014] border border-white/15 p-6 sm:p-12 space-y-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
                    LIVE DISPATCH TRACKER · READ-ONLY
                  </span>
                  <h2 className="font-brand text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mt-1">
                    ORDER #{activeOrder.orderId}
                  </h2>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-xs font-mono text-right">
                    <span className="text-zinc-500 block">WAYBILL / TRACKING</span>
                    <span className="font-bold text-white tracking-widest">{activeOrder.trackingNumber}</span>
                  </div>

                  {activeOrder.status !== 'CANCELLED' && activeOrder.status !== 'DELIVERED' && (
                    <button
                      onClick={() => setOrderToCancel(activeOrder.orderId)}
                      className="px-4 py-2 bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-900/60 hover:text-white text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      CANCEL ORDER
                    </button>
                  )}
                </div>
              </div>

              {activeOrder.status === 'CANCELLED' ? (
                <div className="p-6 bg-red-950/30 border border-red-500/30 text-red-200 text-xs font-mono flex items-center gap-3">
                  <XCircle className="w-5 h-5 shrink-0 text-red-400" />
                  <div>
                    <strong className="block text-white text-sm">ORDER CANCELLED</strong>
                    <span>This parcel reservation was cancelled. No delivery or payment charge will take place.</span>
                  </div>
                </div>
              ) : (
                /* 5-Step Order Tracking Visualizer */
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest">
                    <span className="text-zinc-400">
                      Current Dispatch Status: <strong className="text-white font-bold">{activeOrder.status}</strong>
                    </span>
                    <span className="text-zinc-500 text-[11px]">
                      * Managed by APEX Dispatch Atelier
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-2 sm:gap-4 relative pt-4">
                    {TRACKING_STEPS.map((step, index) => {
                      const currentIndex = getStepProgressIndex(activeOrder.status);
                      const isCompleted = index <= currentIndex;
                      const isCurrent = index === currentIndex;

                      return (
                        <div key={step} className="flex flex-col items-center text-center space-y-2">
                          {/* Step Marker */}
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs transition-all border ${
                              isCompleted
                                ? 'bg-white text-black font-bold border-white shadow-lg'
                                : 'bg-zinc-900 text-zinc-500 border-white/10'
                            } ${isCurrent ? 'ring-4 ring-white/20' : ''}`}
                          >
                            {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : index + 1}
                          </div>

                          {/* Step Label */}
                          <span
                            className={`text-[9px] sm:text-[11px] font-mono uppercase tracking-wider ${
                              isCompleted ? 'text-white font-bold' : 'text-zinc-600'
                            }`}
                          >
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress bar line connecting */}
                  <div className="w-full bg-zinc-800 h-1 overflow-hidden mt-2">
                    <div
                      className="bg-white h-full transition-all duration-700"
                      style={{
                        width: `${((getStepProgressIndex(activeOrder.status) + 1) / TRACKING_STEPS.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Courier ETA Callout */}
              <div className="p-6 bg-zinc-950 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 uppercase block mb-1">DESTINATION</span>
                  <span className="text-zinc-200">
                    {activeOrder.customer.address}, {activeOrder.customer.district}, {activeOrder.customer.city}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase block mb-1">RECIPIENT</span>
                  <span className="text-zinc-200">{activeOrder.customer.fullName} ({activeOrder.customer.phone})</span>
                </div>

                <div>
                  <span className="text-zinc-500 uppercase block mb-1">ESTIMATED ARRIVAL</span>
                  <span className="font-bold text-white">
                    {activeOrder.status === 'CANCELLED' ? 'N/A (Cancelled)' : activeOrder.estimatedDelivery}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="py-20 text-center border border-white/10 bg-[#101014] p-8 space-y-3">
                  <Heart className="w-10 h-10 text-zinc-600 mx-auto stroke-[1.25]" />
                  <p className="font-brand text-lg text-white">YOUR WISHLIST IS EMPTY</p>
                  <p className="text-xs text-zinc-400 font-light">
                    Tap the heart icon on any APEX piece to save it for later.
                  </p>
                  <button
                    onClick={() => setCurrentView('shop')}
                    className="mt-4 px-6 py-2.5 bg-white text-black text-xs uppercase font-bold tracking-widest cursor-pointer"
                  >
                    EXPLORE PIECES
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-[#101014] border border-white/15 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest">
                  <span className="text-white font-bold">PRIMARY RESIDENCE (SAVED PROFILE)</span>
                  <span className="text-emerald-400">ACTIVE</span>
                </div>
                <div className="text-xs text-zinc-300 font-light leading-relaxed">
                  <p className="font-bold text-white text-sm">{currentUser.fullName}</p>
                  <p>{currentUser.address || 'Address not yet specified'}</p>
                  <p>{currentUser.district ? `${currentUser.district}, ` : ''}{currentUser.city || 'Cairo'}</p>
                  <p className="mt-2 font-mono text-zinc-400">{currentUser.phone}</p>
                  <p className="font-mono text-zinc-500">{currentUser.email}</p>
                </div>
                <div className="pt-2 text-[11px] text-zinc-500 font-mono">
                  * Pre-fills on every checkout. You can modify coordinates during final confirmation.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Order Confirmation Modal */}
      {orderToCancel && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#101014] border border-white/20 p-6 sm:p-8 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-950/60 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-brand text-lg font-bold uppercase text-white">
              CANCEL ORDER #{orderToCancel}?
            </h3>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Are you sure you want to cancel this order? Dispatch processing will be stopped immediately.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setOrderToCancel(null)}
                className="flex-1 py-2.5 bg-zinc-900 border border-white/10 text-xs font-mono uppercase text-zinc-300 hover:text-white"
              >
                Keep Order
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-xs font-mono uppercase text-white font-bold"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
