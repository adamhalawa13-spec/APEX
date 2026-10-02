import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  Banknote,
  Lock,
  Apple,
  Fingerprint,
  Check,
  AlertCircle,
  XCircle,
  Plus,
  RefreshCw,
  Wallet,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ApexLogo } from '../components/common/ApexLogo';
import { OrderCustomerInfo } from '../types';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    cartTotal,
    placeOrder,
    setCurrentView,
    currentUser,
    applePayBalance,
    topUpApplePay,
    setApplePayBalance,
    deductApplePay,
  } = useShop();

  const [formData, setFormData] = useState<OrderCustomerInfo>({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    city: currentUser?.city || 'Cairo',
    district: currentUser?.district || '',
    apartment: currentUser?.apartment || '',
  });

  // Card payment fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.fullName,
        phone: prev.phone || currentUser.phone,
        email: prev.email || currentUser.email,
        address: prev.address || currentUser.address,
        city: prev.city || currentUser.city,
        district: prev.district || currentUser.district || '',
      }));
    }
  }, [currentUser]);

  const [paymentMethod, setPaymentMethod] = useState<'Apple Pay' | 'Credit / Debit Card' | 'Cash on Delivery'>('Apple Pay');
  const [completedOrder, setCompletedOrder] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Apple Pay Interactive Sheet State
  const [showApplePaySheet, setShowApplePaySheet] = useState(false);
  const [applePayStatus, setApplePayStatus] = useState<'idle' | 'authenticating' | 'success' | 'declined'>('idle');
  const [applePayError, setApplePayError] = useState<string | null>(null);

  const hasEnoughAppleCash = applePayBalance >= cartTotal;
  const appleCashShortage = Math.max(0, cartTotal - applePayBalance);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setCardExpiry(raw);
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvc(raw);
  };

  const triggerOrderCreation = (method: 'Apple Pay' | 'Credit / Debit Card' | 'Cash on Delivery') => {
    const order = placeOrder({
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        size: item.size || 'Standard',
        color: item.color,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.images[0],
      })),
      subtotal: cartSubtotal,
      shipping: 0, // Zero shipping fee
      total: cartTotal,
      customer: formData,
      customerEmail: formData.email,
      paymentMethod: method,
      paymentDetails:
        method === 'Apple Pay'
          ? {
              method: 'Apple Pay',
              cardBrand: 'Apple Cash / Apple Pay Wallet',
              transactionRef: `APL-${Math.floor(100000 + Math.random() * 900000)}`,
              status: `PAID VIA APPLE PAY · EGP ${cartTotal.toLocaleString()} TRANSFERRED`,
            }
          : method === 'Credit / Debit Card'
          ? {
              method: 'Credit / Debit Card',
              cardBrand: 'Encrypted Gateway',
              transactionRef: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
              status: 'AUTHORIZED & PROCESSED SECURELY',
            }
          : {
              method: 'Cash on Delivery',
              status: 'PAYMENT DUE ON DOORSTEP',
            },
    });

    setCompletedOrder(order);
    setIsSubmitting(false);
    setShowApplePaySheet(false);
  };

  const openApplePaySheet = () => {
    if (!formData.fullName || !formData.phone || !formData.email || !formData.address) {
      setErrorMsg('Please complete your name, phone, email, and shipping address first.');
      return;
    }
    setErrorMsg(null);
    setApplePayStatus('idle');
    setApplePayError(null);
    setShowApplePaySheet(true);
  };

  const executeApplePayAuthorization = () => {
    // Check if user has sufficient funds in Apple Wallet
    if (applePayBalance < cartTotal) {
      setApplePayStatus('declined');
      setApplePayError(
        `Insufficient funds in Apple Wallet. Available: EGP ${applePayBalance.toLocaleString()}, Required: EGP ${cartTotal.toLocaleString()}. Shortage: EGP ${(cartTotal - applePayBalance).toLocaleString()}.`
      );
      return;
    }

    setApplePayError(null);
    setApplePayStatus('authenticating');

    // Simulate authentic biometric authorization scan
    setTimeout(() => {
      // Actually deduct the money from the user's Apple Pay balance
      const deducted = deductApplePay(cartTotal);

      if (!deducted) {
        setApplePayStatus('declined');
        setApplePayError('Payment declined: Could not deduct funds from Apple Wallet.');
        return;
      }

      setApplePayStatus('success');

      // Finalize order creation and settlement
      setTimeout(() => {
        triggerOrderCreation('Apple Pay');
      }, 800);
    }, 1100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.email || !formData.address) {
      setErrorMsg('Please complete all required shipping fields.');
      return;
    }

    if (paymentMethod === 'Apple Pay') {
      openApplePaySheet();
      return;
    }

    if (paymentMethod === 'Credit / Debit Card') {
      if (!cardNumber || !cardExpiry || !cardCvc || !cardHolder) {
        setErrorMsg('Please fill in your card details to process payment.');
        return;
      }
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    setTimeout(() => {
      triggerOrderCreation(paymentMethod);
    }, 800);
  };

  // If order was just placed, display high-end Order Confirmation (NO print receipt button for customer)
  if (completedOrder) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white pt-12 pb-32">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-[#0e0e11] border border-white/10 p-8 sm:p-12 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center mx-auto text-white">
              <CheckCircle className="w-8 h-8 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <ApexLogo size="sm" variant="horizontal" color="silver" />
              <h1 className="font-brand text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white pt-2">
                ORDER CONFIRMED
              </h1>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400">
                REFERENCE #{completedOrder.orderId}
              </p>
            </div>

            <p className="text-sm text-zinc-300 font-light leading-relaxed max-w-md mx-auto">
              Thank you, {completedOrder.customer.fullName}. Your APEX pieces are reserved and entering our white-glove dispatch queue with zero shipping fees.
            </p>

            {/* Tracking summary box */}
            <div className="p-6 bg-zinc-950 border border-white/5 text-left space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-zinc-500 uppercase">TRACKING CODE</span>
                <span className="font-bold text-white tracking-widest">{completedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-zinc-500 uppercase">PAYMENT METHOD</span>
                <span className="text-zinc-300 flex items-center gap-1.5 font-medium">
                  {completedOrder.paymentMethod === 'Apple Pay' && <Apple className="w-4 h-4 fill-white text-white" />}
                  {completedOrder.paymentMethod}
                </span>
              </div>
              {completedOrder.paymentMethod === 'Apple Pay' && (
                <div className="flex justify-between items-center pb-3 border-b border-white/5 text-[11px]">
                  <span className="text-zinc-500 uppercase">FUNDS SETTLEMENT</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    EGP {completedOrder.total.toLocaleString()} Debited & Sent to APEX
                  </span>
                </div>
              )}
              {completedOrder.paymentMethod === 'Apple Pay' && (
                <div className="flex justify-between items-center pb-3 border-b border-white/5 text-[11px]">
                  <span className="text-zinc-500 uppercase">REMAINING WALLET BALANCE</span>
                  <span className="text-zinc-300 font-semibold">
                    EGP {applePayBalance.toLocaleString()}
                  </span>
                </div>
              )}
              {completedOrder.paymentMethod === 'Credit / Debit Card' && (
                <div className="flex justify-between items-center pb-3 border-b border-white/5 text-[11px]">
                  <span className="text-zinc-500 uppercase">TRANSACTION STATUS</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Encrypted Authorization Verified
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-zinc-500 uppercase">SHIPPING FEES</span>
                <span className="text-emerald-400 font-semibold">FREE (EGP 0)</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-zinc-500 uppercase">ESTIMATED DISPATCH</span>
                <span className="text-zinc-300">{completedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between items-center pt-2 text-sm font-bold text-white">
                <span>TOTAL CHARGED</span>
                <span className="tabular-nums">EGP {completedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="p-4 bg-[#121215] border border-white/5 text-left text-xs font-mono text-zinc-400 space-y-1">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">
                DELIVERY DESTINATION
              </span>
              <p className="text-zinc-200">
                {completedOrder.customer.address}, {completedOrder.customer.district ? `${completedOrder.customer.district}, ` : ''}{completedOrder.customer.city}
              </p>
              <p className="text-zinc-500 text-[11px]">
                Courier will contact you at {completedOrder.customer.phone} prior to dispatch.
              </p>
            </div>

            {/* Actions for customer */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setCurrentView('account')}
                className="px-8 py-3.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                VIEW LIVE STATUS IN ACCOUNT
              </button>
              <button
                onClick={() => setCurrentView('home')}
                className="px-8 py-3.5 bg-transparent border border-white/20 text-white font-brand font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors cursor-pointer"
              >
                RETURN TO STORE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty cart guard
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <ApexLogo size="sm" variant="horizontal" color="silver" />
          <h2 className="font-brand text-2xl font-bold uppercase tracking-wider text-white">
            YOUR SHOPPING BAG IS EMPTY
          </h2>
          <p className="text-xs text-zinc-400 font-light">
            Select items from our collection before proceeding to checkout.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="px-8 py-3.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors cursor-pointer mt-4"
          >
            DISCOVER PIECES
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-8 pb-32">
      {/* Apple Pay Interactive Native Sheet Modal */}
      {showApplePaySheet && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full sm:max-w-lg bg-[#141418] border border-white/20 rounded-t-3xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl animate-in slide-in-from-bottom duration-300 space-y-6">
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-white">
                <Apple className="w-6 h-6 fill-white" />
                <span className="font-semibold text-lg tracking-tight">Pay</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowApplePaySheet(false);
                  setApplePayStatus('idle');
                  setApplePayError(null);
                }}
                className="text-xs font-mono uppercase text-zinc-400 hover:text-white px-2 py-1"
              >
                Cancel
              </button>
            </div>

            {/* Apple Card / Apple Cash Virtual Visual */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-700 p-5 border border-white/20 shadow-xl space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-1.5 text-white">
                  <Apple className="w-5 h-5 fill-white" />
                  <span className="text-sm font-semibold tracking-wider font-mono">Cash</span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 bg-black/40 px-2 py-0.5 rounded">
                  Default Device Card
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-widest block">
                  Available Apple Wallet Balance
                </span>
                <div className="text-2xl font-bold font-mono text-white tracking-tight">
                  EGP {applePayBalance.toLocaleString()}
                </div>
              </div>

              {/* Status Badge inside Card */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                {hasEnoughAppleCash ? (
                  <div className="text-emerald-400 flex items-center gap-1.5 font-medium">
                    <Check className="w-4 h-4" />
                    <span>Sufficient Funds (After: EGP {(applePayBalance - cartTotal).toLocaleString()})</span>
                  </div>
                ) : (
                  <div className="text-red-400 flex items-center gap-1.5 font-medium">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Insufficient Funds (Short by EGP {appleCashShortage.toLocaleString()})</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 bg-black/50 border border-white/10 rounded-xl space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>PAYEE</span>
                <span className="text-white font-medium">APEX ATELIER CAIRO</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>SHIPPING FEES</span>
                <span className="text-emerald-400 font-semibold">FREE (EGP 0)</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>DELIVERY TO</span>
                <span className="text-zinc-200 truncate max-w-[200px]">{formData.city}, {formData.address}</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                <span>TOTAL DUE</span>
                <span className="tabular-nums text-base">EGP {cartTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Error or Decline Message */}
            {applePayError && (
              <div className="p-3.5 bg-red-950/70 border border-red-500/50 rounded-lg text-red-200 text-xs font-mono flex items-start gap-2.5 animate-in fade-in">
                <XCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-red-300 uppercase tracking-wide">
                    PAYMENT NOT COMPLETED
                  </div>
                  <div className="leading-relaxed text-[11px]">{applePayError}</div>
                </div>
              </div>
            )}

            {/* Interactive Top-Up / Balance Adjuster (allows testing insufficient & sufficient funds) */}
            <div className="p-4 bg-zinc-900/90 border border-white/10 rounded-xl space-y-3 font-mono">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <Wallet className="w-3.5 h-3.5 text-zinc-400" />
                  Manage Apple Cash Funds:
                </span>
                <span className="text-[10px] text-zinc-500">Live Test Simulation</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {!hasEnoughAppleCash && (
                  <button
                    type="button"
                    onClick={() => {
                      topUpApplePay(appleCashShortage);
                      setApplePayError(null);
                      setApplePayStatus('idle');
                    }}
                    className="col-span-2 py-2 px-2.5 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-[10px] font-bold uppercase rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Shortage (+EGP {appleCashShortage.toLocaleString()})</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    topUpApplePay(1000);
                    setApplePayError(null);
                    setApplePayStatus('idle');
                  }}
                  className="py-2 px-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 text-[10px] uppercase rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>+1,000</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    topUpApplePay(5000);
                    setApplePayError(null);
                    setApplePayStatus('idle');
                  }}
                  className="py-2 px-2 bg-white/5 border border-white/10 text-white hover:bg-white/10 text-[10px] uppercase rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>+5,000</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setApplePayBalance(0);
                    setApplePayStatus('idle');
                    setApplePayError(null);
                  }}
                  title="Set balance to 0 to test decline"
                  className="py-2 px-2 bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-900/40 text-[10px] uppercase rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>0 EGP (Test)</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setApplePayBalance(10000);
                    setApplePayError(null);
                    setApplePayStatus('idle');
                  }}
                  title="Set balance to 10,000 to test success"
                  className="py-2 px-2 bg-white/5 border border-white/10 text-zinc-300 hover:text-white text-[10px] uppercase rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>10k EGP</span>
                </button>
              </div>
            </div>

            {/* Biometric Status Animation */}
            {applePayStatus === 'authenticating' && (
              <div className="py-4 flex flex-col items-center justify-center space-y-3 animate-pulse">
                <div className="w-16 h-16 rounded-full border-2 border-white/40 border-t-white flex items-center justify-center animate-spin">
                  <Fingerprint className="w-8 h-8 text-white" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-300">
                  Verifying Face ID & Debiting Funds...
                </span>
              </div>
            )}

            {applePayStatus === 'success' && (
              <div className="py-4 flex flex-col items-center justify-center space-y-3 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div className="text-center font-mono space-y-0.5">
                  <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
                    Done · Payment Authorized
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    EGP {cartTotal.toLocaleString()} debited and sent to APEX
                  </span>
                </div>
              </div>
            )}

            {/* Apple Pay Action Button */}
            {applePayStatus !== 'authenticating' && applePayStatus !== 'success' && (
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={executeApplePayAuthorization}
                  className={`w-full py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xl active:scale-[0.99] ${
                    hasEnoughAppleCash
                      ? 'bg-white text-black hover:bg-zinc-200'
                      : 'bg-red-950/60 border border-red-500/50 text-red-200 hover:bg-red-900/70'
                  }`}
                >
                  <Apple className={`w-5 h-5 ${hasEnoughAppleCash ? 'fill-black' : 'fill-red-200'}`} />
                  <span className="text-sm font-semibold tracking-tight uppercase">
                    {hasEnoughAppleCash
                      ? `Double Click / Pay EGP ${cartTotal.toLocaleString()}`
                      : 'DECLINED · INSUFFICIENT FUNDS (ADD FUNDS)'}
                  </span>
                </button>

                <p className="text-[10px] font-mono text-center text-zinc-500 uppercase tracking-widest">
                  Biometric Face ID / Touch ID Verified · 256-bit Tokenized Transfer
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Form & Payment (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h1 className="font-brand text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                SECURE CHECKOUT
              </h1>
              <p className="text-xs text-zinc-400 font-light mt-1">
                Complimentary express courier delivery on all orders.
              </p>
            </div>

            {/* Apple Pay Express Checkout Banner */}
            <div className="bg-[#121215] border border-white/15 p-5 space-y-3 rounded-sm">
              <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Apple className="w-4 h-4 fill-white text-white" />
                  <span>APPLE PAY EXPRESS CHECKOUT</span>
                </span>
                <span className="text-emerald-400 font-semibold">1-TAP WALLET</span>
              </div>

              {/* Wallet Balance Preview Banner */}
              <div className="flex items-center justify-between p-3 bg-black/50 border border-white/10 rounded text-xs font-mono">
                <div className="text-zinc-300">
                  <span>Apple Cash Balance: </span>
                  <strong className="text-white font-bold">EGP {applePayBalance.toLocaleString()}</strong>
                </div>
                {hasEnoughAppleCash ? (
                  <span className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded">
                    SUFFICIENT FUNDS
                  </span>
                ) : (
                  <span className="text-[10px] text-red-400 font-bold px-2 py-0.5 bg-red-500/10 border border-red-500/30 rounded">
                    SHORT BY EGP {appleCashShortage.toLocaleString()}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setPaymentMethod('Apple Pay');
                  openApplePaySheet();
                }}
                disabled={isSubmitting}
                className="w-full py-3.5 bg-black hover:bg-zinc-900 border border-white/20 text-white rounded font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-lg active:scale-[0.99]"
              >
                <Apple className="w-5 h-5 fill-white text-white" />
                <span className="text-sm font-semibold tracking-tight uppercase">Pay with Apple Pay</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <span className="relative bg-[#09090b] px-4 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500">
                OR COMPLETE DISPATCH DETAILS
              </span>
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-950/60 border border-red-500/40 text-red-200 text-xs font-mono">
                {errorMsg}
              </div>
            )}

            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-300">
                  01 / CONTACT INFORMATION
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Adam Halawa"
                      className="w-full bg-[#121215] border border-white/10 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Email Address (Invoice receipt) *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="adam@example.com"
                      className="w-full bg-[#121215] border border-white/10 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Mobile Number (Courier dispatch) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+20 100 000 0000"
                      className="w-full bg-[#121215] border border-white/10 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-300">
                  02 / DELIVERY ADDRESS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street name, villa, building number"
                      className="w-full bg-[#121215] border border-white/10 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Cairo"
                      className="w-full bg-[#121215] border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      District / Area
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="e.g. Fifth Settlement, Zamalek, Maadi"
                      className="w-full bg-[#121215] border border-white/10 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-mono uppercase text-zinc-400 mb-1">
                      Apartment / Building / Floor (Optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      placeholder="Floor 2, Apt 14"
                      className="w-full bg-[#121215] border border-white/10 px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-300">
                  03 / PAYMENT METHOD
                </h3>
                <div className="space-y-3">
                  {/* Option 1: Apple Pay */}
                  <label
                    className={`flex items-start gap-4 p-4 border transition-all cursor-pointer ${
                      paymentMethod === 'Apple Pay'
                        ? 'bg-white/5 border-white ring-1 ring-white'
                        : 'bg-[#121215] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Apple Pay"
                      checked={paymentMethod === 'Apple Pay'}
                      onChange={() => setPaymentMethod('Apple Pay')}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Apple className="w-4 h-4 text-white fill-white" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          Apple Pay
                        </span>
                        <span className="ml-auto px-2 py-0.5 bg-white/10 text-[10px] font-mono font-semibold text-white rounded">
                          RECOMMENDED
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 font-light">
                        Biometric one-tap checkout using Apple Cash. Balance is checked and debited upon payment authorization.
                      </p>

                      {/* Apple Wallet live fund status */}
                      <div className="mt-3 p-3 bg-black/60 border border-white/10 rounded space-y-2 text-xs font-mono">
                        <div className="flex justify-between items-center">
                          <span className="text-zinc-400">Apple Wallet Balance:</span>
                          <span className="text-white font-bold">EGP {applePayBalance.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-zinc-400">Order Total:</span>
                          <span className="text-white font-semibold">EGP {cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[11px]">
                          {hasEnoughAppleCash ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              Ready · Remaining after order: EGP {(applePayBalance - cartTotal).toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-red-400 font-bold flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              Cannot proceed: Short by EGP {appleCashShortage.toLocaleString()}
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              openApplePaySheet();
                            }}
                            className="text-[10px] underline uppercase text-zinc-300 hover:text-white"
                          >
                            Manage Funds
                          </button>
                        </div>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: Credit / Debit Card */}
                  <label
                    className={`flex flex-col gap-3 p-4 border transition-all cursor-pointer ${
                      paymentMethod === 'Credit / Debit Card'
                        ? 'bg-white/5 border-white ring-1 ring-white'
                        : 'bg-[#121215] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Credit / Debit Card"
                        checked={paymentMethod === 'Credit / Debit Card'}
                        onChange={() => setPaymentMethod('Credit / Debit Card')}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-zinc-300" />
                          <span className="text-xs font-bold uppercase tracking-wider text-white">
                            Credit / Debit Card
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1 font-light">
                          Visa, Mastercard, Meeza. Processed through a 256-bit encrypted gateway.
                        </p>
                      </div>
                    </div>

                    {/* Card input fields when Credit / Debit Card is selected */}
                    {paymentMethod === 'Credit / Debit Card' && (
                      <div
                        className="pt-3 border-t border-white/10 space-y-3 cursor-default"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            required={paymentMethod === 'Credit / Debit Card'}
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="NAME AS PRINTED ON CARD"
                            className="w-full bg-zinc-900 border border-white/20 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono uppercase"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            required={paymentMethod === 'Credit / Debit Card'}
                            maxLength={19}
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="•••• •••• •••• ••••"
                            className="w-full bg-zinc-900 border border-white/20 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono tracking-widest"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                              Expiry (MM/YY)
                            </label>
                            <input
                              type="text"
                              required={paymentMethod === 'Credit / Debit Card'}
                              maxLength={5}
                              value={cardExpiry}
                              onChange={handleExpiryChange}
                              placeholder="MM/YY"
                              className="w-full bg-zinc-900 border border-white/20 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase text-zinc-400 mb-1">
                              Security Code (CVC)
                            </label>
                            <input
                              type="password"
                              required={paymentMethod === 'Credit / Debit Card'}
                              maxLength={4}
                              value={cardCvc}
                              onChange={handleCvcChange}
                              placeholder="•••"
                              className="w-full bg-zinc-900 border border-white/20 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono"
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-zinc-950 border border-white/10 rounded-sm text-[11px] font-mono space-y-1">
                          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                            <Lock className="w-3.5 h-3.5" />
                            <span>256-BIT ENCRYPTED TRANSACTION</span>
                          </div>
                          <div className="text-zinc-400 text-[10px]">
                            Protected by end-to-end TLS encryption. Your card details are securely tokenized and protected.
                          </div>
                        </div>
                      </div>
                    )}
                  </label>

                  {/* Option 3: Cash on Delivery */}
                  <label
                    className={`flex items-start gap-4 p-4 border transition-all cursor-pointer ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'bg-white/5 border-white ring-1 ring-white'
                        : 'bg-[#121215] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash on Delivery"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-zinc-300" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          Cash on Delivery
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 font-light">
                        Pay cash or doorstep POS card upon parcel arrival. Zero fees.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#101013] border border-white/10 p-6 sm:p-8 space-y-6 sticky top-24">
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-zinc-400 pb-3 border-b border-white/10">
                ORDER SUMMARY ({cart.reduce((a, b) => a + b.quantity, 0)})
              </h3>

              {/* Items preview */}
              <div className="space-y-4 max-h-72 overflow-y-auto pr-2 divide-y divide-white/5">
                {cart.map((item) => (
                  <div key={item.id} className="pt-3 first:pt-0 flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-18 object-cover bg-zinc-900 border border-white/10 shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <div className="font-brand font-bold text-white uppercase line-clamp-1">
                          {item.product.name}
                        </div>
                        <div className="text-[11px] font-mono text-zinc-400 mt-0.5">
                          {item.color} · QTY: {item.quantity}
                        </div>
                      </div>
                      <div className="font-semibold text-white tabular-nums">
                        EGP {(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div className="space-y-2 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="text-white tabular-nums">EGP {cartSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping Fees</span>
                  <span className="text-emerald-400 font-bold uppercase tracking-wider">
                    FREE (EGP 0)
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="tabular-nums">EGP {cartTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                form="checkout-form"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black font-brand font-bold text-xs uppercase tracking-[0.25em] hover:bg-zinc-200 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-2xl flex items-center justify-center gap-2"
              >
                {paymentMethod === 'Apple Pay' ? (
                  <>
                    <Apple className="w-4 h-4 fill-black" />
                    <span>{isSubmitting ? 'AUTHORIZING...' : 'PAY WITH APPLE PAY'}</span>
                  </>
                ) : (
                  <span>{isSubmitting ? 'AUTHENTICATING ORDER...' : 'PLACE ORDER'}</span>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest text-center">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Delivery Surcharge · Guaranteed Dispatch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
