import React, { useState } from 'react';
import {
  Lock,
  Printer,
  Search,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  LogOut,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Banknote,
  XCircle,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderStatus } from '../types';
import { ApexLogo } from '../components/common/ApexLogo';

const STATUS_LIST: OrderStatus[] = [
  'ORDER PLACED',
  'PROCESSING',
  'PACKED',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

export const AdminView: React.FC = () => {
  const {
    orders,
    isAdmin,
    loginAdmin,
    logoutAdmin,
    updateOrderStatus,
    setPrintingOrder,
    setCurrentView,
  } = useShop();

  const [passkeyInput, setPasskeyInput] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkeyInput.trim()) {
      setErrorMsg('Please enter the owner passkey');
      return;
    }
    const ok = loginAdmin(passkeyInput);
    if (!ok) {
      setErrorMsg('Invalid password. Access is strictly restricted to APEX owner.');
    } else {
      setErrorMsg(null);
    }
  };

  const handleQuickUnlock = () => {
    loginAdmin('Adouma1234');
  };

  // If not authenticated as Admin, show high-security luxury login gate
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md bg-[#101014] border border-white/15 p-8 sm:p-10 space-y-8 shadow-2xl">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-white/5 border border-white/20 rounded-full flex items-center justify-center mx-auto text-white">
              <Lock className="w-6 h-6 stroke-[1.75]" />
            </div>
            <ApexLogo size="sm" variant="horizontal" color="silver" />
            <h1 className="font-brand text-2xl font-bold uppercase tracking-wider text-white">
              ADMIN ATELIER CONTROL
            </h1>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Restricted owner portal for order fulfillment, live dispatch tracking status, and official receipt printing.
            </p>
          </div>

          <form onSubmit={handleAdminAuth} className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-2">
                OWNER PASSWORD
              </label>
              <input
                type="password"
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-zinc-900 border border-white/20 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors tracking-widest font-mono"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-950/50 border border-red-500/40 text-red-200 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.25em] hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              AUTHENTICATE AS OWNER
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center space-y-3">
            <button
              onClick={handleQuickUnlock}
              className="text-xs font-mono text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Quick Owner Unlock (Adouma1234)
            </button>

            <div>
              <button
                onClick={() => setCurrentView('home')}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-300 cursor-pointer"
              >
                ← Return to Client Storefront
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate live metrics from actual customer orders
  const activeOrders = orders.filter((o) => o.status !== 'CANCELLED');
  const totalRevenue = activeOrders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = activeOrders.filter((o) => o.status !== 'DELIVERED').length;
  const deliveredOrders = activeOrders.filter((o) => o.status === 'DELIVERED').length;
  const cancelledOrders = orders.filter((o) => o.status === 'CANCELLED').length;

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'ALL' && o.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = o.orderId.toLowerCase().includes(q);
      const matchCustomer = o.customer.fullName.toLowerCase().includes(q);
      const matchPhone = o.customer.phone.includes(q);
      const matchEmail = o.customer.email.toLowerCase().includes(q);
      const matchTracking = o.trackingNumber.toLowerCase().includes(q);
      return matchId || matchCustomer || matchPhone || matchEmail || matchTracking;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Control Bar */}
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald-400 font-bold">
                OWNER ATELIER CONTROL PANEL · LIVE
              </span>
            </div>
            <h1 className="font-brand text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              APEX ORDERS MANAGEMENT
            </h1>
            <p className="text-xs font-mono text-zinc-400">
              Modify live dispatch status (instant customer sync) & generate official printable receipts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2.5 bg-zinc-900 border border-white/10 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              View Storefront
            </button>
            <button
              onClick={logoutAdmin}
              className="flex items-center gap-2 px-4 py-2.5 bg-red-950/40 border border-red-500/30 text-red-200 hover:bg-red-900/60 transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Exit Admin</span>
            </button>
          </div>
        </div>

        {/* Real-time KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#101014] border border-white/10 p-6 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
              <span>Gross Sales (EGP)</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              EGP {totalRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] font-mono text-zinc-400">Across {activeOrders.length} active orders</div>
          </div>

          <div className="bg-[#101014] border border-white/10 p-6 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
              <span>Total Orders</span>
              <Package className="w-4 h-4 text-zinc-300" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
              {orders.length}
            </div>
            <div className="text-[11px] font-mono text-zinc-400">{cancelledOrders} cancelled by customers</div>
          </div>

          <div className="bg-[#101014] border border-white/10 p-6 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
              <span>Pending Fulfillment</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400 tabular-nums">
              {pendingOrders}
            </div>
            <div className="text-[11px] font-mono text-zinc-400">Awaiting packaging or courier</div>
          </div>

          <div className="bg-[#101014] border border-white/10 p-6 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-500 uppercase tracking-widest">
              <span>Delivered</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 tabular-nums">
              {deliveredOrders}
            </div>
            <div className="text-[11px] font-mono text-zinc-400">Completed deliveries</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#101014] border border-white/10 p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders by customer name, order #, email, phone, or waybill..."
                className="w-full bg-zinc-900 border border-white/10 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white font-mono"
              />
            </div>

            {/* Quick status tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {['ALL', ...STATUS_LIST].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-2 text-[11px] font-mono uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                    statusFilter === st
                      ? 'bg-white text-black font-bold'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Listing */}
        <div className="space-y-6">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
            <span>SHOWING {filteredOrders.length} CUSTOMER ORDERS</span>
            <span className="text-zinc-500">
              * Status changes reflect immediately in the customer account.
            </span>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="py-20 text-center border border-white/10 bg-[#101014] p-8 space-y-3">
              <Package className="w-10 h-10 text-zinc-600 mx-auto" />
              <p className="font-brand text-lg text-white">NO ORDERS RECORDED</p>
              <p className="text-xs text-zinc-400 font-mono">
                No orders match your filter. Only real customer purchases will show here.
              </p>
            </div>
          ) : (
            filteredOrders.map((ord) => {
              const isCancelled = ord.status === 'CANCELLED';

              return (
                <div
                  key={ord.orderId}
                  className={`bg-[#101014] border p-6 sm:p-8 space-y-6 transition-all hover:border-white/30 ${
                    isCancelled ? 'border-red-950/40 opacity-85' : 'border-white/15'
                  }`}
                >
                  {/* Header row: Order ID, Date, Total, Quick Actions */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-white/10 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-brand font-bold text-xl text-white tracking-wider">
                          #{ord.orderId}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 border font-mono text-[11px] uppercase tracking-wider ${
                            isCancelled
                              ? 'bg-red-950/80 border-red-500/50 text-red-300'
                              : 'bg-zinc-800 border-white/10 text-zinc-300'
                          }`}
                        >
                          {ord.paymentMethod}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-zinc-400">
                        Placed on {ord.date} · Waybill: <strong className="text-zinc-200">{ord.trackingNumber}</strong>
                      </div>
                    </div>

                    {/* Actions & Print */}
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Status Changer Dropdown (Instant Sync with Customer Portal) */}
                      <div className="flex items-center gap-2 bg-zinc-900 border border-white/20 px-3 py-1.5">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                          CHANGE SHIPPING STATUS:
                        </span>
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.orderId, e.target.value as OrderStatus)}
                          className="bg-transparent text-white font-mono text-xs font-bold uppercase tracking-wider focus:outline-none cursor-pointer py-1"
                        >
                          {STATUS_LIST.map((st) => (
                            <option key={st} value={st} className="bg-zinc-900 text-white">
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* PRINT OFFICIAL RECEIPT BUTTON (Exclusive to Admin) */}
                      <button
                        onClick={() => setPrintingOrder(ord)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors cursor-pointer shadow-lg"
                        title="Generate official printable receipt"
                      >
                        <Printer className="w-4 h-4" />
                        <span>PRINT RECEIPT</span>
                      </button>
                    </div>
                  </div>

                  {/* Customer Details & Delivery Destination */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono py-2 bg-zinc-950/60 p-4 border border-white/5">
                    <div className="space-y-1">
                      <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">
                        CUSTOMER CONTACT
                      </span>
                      <div className="font-bold text-white text-sm">{ord.customer.fullName}</div>
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <Phone className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{ord.customer.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <Mail className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{ord.customer.email}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">
                        DELIVERY ADDRESS
                      </span>
                      <div className="flex items-start gap-1.5 text-zinc-300">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0 mt-0.5" />
                        <div>
                          <div>{ord.customer.address}</div>
                          <div>{ord.customer.district ? `${ord.customer.district}, ` : ''}{ord.customer.city}</div>
                          {ord.customer.apartment && <div className="text-zinc-400">{ord.customer.apartment}</div>}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1 md:text-right">
                      <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">
                        PAYMENT & SETTLEMENT
                      </span>
                      <div className="text-zinc-300 font-semibold">{ord.paymentMethod}</div>
                      {ord.paymentMethod === 'Apple Pay' ? (
                        <div className="pt-1 text-[11px] text-emerald-400 space-y-0.5">
                          <div className="flex items-center gap-1 justify-end font-medium">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Apple Pay · Funds Debited & Received</span>
                          </div>
                          <div className="text-zinc-400 text-[10px]">
                            {ord.paymentDetails?.transactionRef || 'Ref: Apple Wallet'} · Transferred to APEX
                          </div>
                        </div>
                      ) : ord.paymentMethod === 'Credit / Debit Card' ? (
                        <div className="pt-1 text-[11px] text-emerald-400 space-y-0.5">
                          <div className="flex items-center gap-1 justify-end">
                            <CreditCard className="w-3.5 h-3.5" />
                            <span>Card Payment · Authorized</span>
                          </div>
                          <div className="text-zinc-400 text-[10px]">
                            {ord.paymentDetails?.transactionRef || 'Settlement Verified'}
                          </div>
                        </div>
                      ) : (
                        <div className="text-[11px] text-zinc-400">Cash on Delivery on arrival</div>
                      )}
                      <div className="text-zinc-400 text-[11px] pt-1">
                        Shipping: <span className="text-emerald-400 font-bold">Free (EGP 0)</span>
                      </div>
                      <div className="text-base font-bold text-white pt-1">
                        Total: EGP {ord.total.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Ordered Items List */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 block">
                      PURCHASED PIECES ({ord.items.reduce((acc, i) => acc + i.quantity, 0)} ITEMS)
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {ord.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 bg-zinc-900/80 p-3 border border-white/5 items-center"
                        >
                          <img
                            src={item.image}
                            alt={item.productName}
                            referrerPolicy="no-referrer"
                            className="w-14 h-16 object-cover bg-black shrink-0"
                          />
                          <div className="text-xs font-mono space-y-0.5">
                            <div className="font-brand font-bold text-white uppercase line-clamp-1">
                              {item.productName}
                            </div>
                            <div className="text-[11px] text-zinc-400">
                              Color: {item.color}
                            </div>
                            <div className="text-[11px] text-zinc-300">
                              Qty: <strong className="text-white">{item.quantity}</strong> · EGP {item.price.toLocaleString()} each
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
