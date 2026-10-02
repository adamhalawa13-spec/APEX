import React, { useState } from 'react';
import { X, Printer, ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Order } from '../../types';
import { ApexLogo } from './ApexLogo';

interface ReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  const [hasPrinted, setHasPrinted] = useState(false);

  if (!order) return null;

  const handlePrint = () => {
    setHasPrinted(true);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white">
      {/* Container */}
      <div className="relative w-full max-w-3xl bg-[#0d0d10] border border-white/20 text-white shadow-2xl overflow-hidden print:border-none print:shadow-none print:bg-white print:text-black print:max-w-none print:w-full">
        {/* Modal Top Actions (Hidden in print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-zinc-950/80 no-print">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-white/20 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ORDERS</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-zinc-200 transition-colors text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>{hasPrinted ? 'RE-PRINT RECEIPT' : 'PRINT RECEIPT'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close receipt"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Post-print prompt bar */}
        {hasPrinted && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/40 px-6 py-3 flex items-center justify-between no-print animate-in fade-in">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Receipt sent to printer.</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO ORDERS</span>
            </button>
          </div>
        )}

        {/* Printable Receipt Paper */}
        <div id="printable-receipt" className="p-8 sm:p-12 space-y-8 bg-[#0d0d10] text-white print:bg-white print:text-black print:p-8">
          {/* Header with Official Logo */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-white/15 pb-8 print:border-black/20">
            <div>
              <div className="mb-2">
                <ApexLogo size="md" variant="vertical" color="light" />
              </div>
              <p className="text-[11px] font-mono tracking-[0.25em] text-zinc-400 print:text-zinc-600 uppercase">
                HAUTE COUTURE & ELEVATED ESSENTIALS
              </p>
              <p className="text-[11px] font-mono text-zinc-400 print:text-zinc-600">
                Cairo & Alexandria Flagship · Tax ID: 749-301-820
              </p>
            </div>

            <div className="text-left sm:text-right font-mono space-y-1">
              <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400 print:text-zinc-600 block">
                TAX INVOICE & RECEIPT
              </span>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-white print:text-black">
                #{order.orderId}
              </div>
              <div className="text-xs text-zinc-400 print:text-zinc-600">
                Date: {order.date} · {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="inline-block mt-1 px-2.5 py-0.5 bg-white/10 text-white print:bg-zinc-100 print:text-black text-[11px] font-bold tracking-widest uppercase border border-white/20 print:border-black/20">
                STATUS: {order.status}
              </div>
            </div>
          </div>

          {/* Customer & Shipping Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono border-b border-white/15 pb-8 print:border-black/20">
            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 print:text-zinc-600 block">
                BILLED & SHIPPED TO:
              </span>
              <div className="text-sm font-bold text-white print:text-black">
                {order.customer.fullName}
              </div>
              <div className="text-zinc-300 print:text-zinc-700 leading-relaxed">
                <div>{order.customer.address}</div>
                <div>{order.customer.district}, {order.customer.city}</div>
                {order.customer.apartment && <div>{order.customer.apartment}</div>}
              </div>
              <div className="text-zinc-400 print:text-zinc-600 pt-1">
                Phone: {order.customer.phone}
              </div>
              <div className="text-zinc-400 print:text-zinc-600">
                Email: {order.customer.email}
              </div>
            </div>

            <div className="space-y-2 sm:text-right">
              <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 print:text-zinc-600 block">
                DISPATCH & PAYMENT LOGISTICS:
              </span>
              <div>
                <span className="text-zinc-400 print:text-zinc-600">Payment Mode: </span>
                <span className="font-semibold text-white print:text-black">{order.paymentMethod}</span>
              </div>
              <div>
                <span className="text-zinc-400 print:text-zinc-600">Waybill Courier No: </span>
                <span className="font-semibold text-white print:text-black tracking-widest">{order.trackingNumber}</span>
              </div>
              <div>
                <span className="text-zinc-400 print:text-zinc-600">Estimated Delivery: </span>
                <span className="text-zinc-300 print:text-zinc-700">{order.estimatedDelivery}</span>
              </div>
              <div>
                <span className="text-zinc-400 print:text-zinc-600">Fulfillment Center: </span>
                <span className="text-zinc-300 print:text-zinc-700">APEX Atelier Hub — Cairo East</span>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400 print:text-zinc-600 block">
              PURCHASED PIECES
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-white/20 print:border-black/30 text-zinc-400 print:text-zinc-600 text-[11px] uppercase tracking-wider">
                    <th className="py-2.5 font-semibold">Item & Description</th>
                    <th className="py-2.5 font-semibold text-center">Color</th>
                    <th className="py-2.5 font-semibold text-center">Qty</th>
                    <th className="py-2.5 font-semibold text-right">Price</th>
                    <th className="py-2.5 font-semibold text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 print:divide-black/10">
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-white/5 print:hover:bg-transparent">
                      <td className="py-3 font-brand font-bold uppercase text-white print:text-black">
                        {item.productName}
                      </td>
                      <td className="py-3 text-center text-zinc-300 print:text-zinc-800">
                        {item.color}
                      </td>
                      <td className="py-3 text-center text-zinc-300 print:text-zinc-800 font-semibold">
                        {item.quantity}
                      </td>
                      <td className="py-3 text-right tabular-nums text-zinc-300 print:text-zinc-800">
                        EGP {item.price.toLocaleString()}
                      </td>
                      <td className="py-3 text-right tabular-nums font-semibold text-white print:text-black">
                        EGP {(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals Calculation */}
          <div className="border-t border-white/15 pt-6 print:border-black/20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 font-mono text-xs">
            <div className="space-y-1.5 max-w-sm text-zinc-400 print:text-zinc-600 text-[11px]">
              <div className="flex items-center gap-1.5 text-white print:text-black font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400 print:text-emerald-700" />
                <span>APEX AUTHENTICITY CERTIFICATE</span>
              </div>
              <p className="leading-relaxed">
                Every APEX garment is crafted from custom heavy French Terry with hand-finished hardware and serialized branding. Valid for 14-day exchange with original tags intact.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2">
              <div className="flex justify-between text-zinc-400 print:text-zinc-600">
                <span>Subtotal:</span>
                <span className="tabular-nums">EGP {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-zinc-400 print:text-zinc-600">
                <span>Shipping:</span>
                <span>{order.shipping === 0 ? 'COMPLIMENTARY' : `EGP ${order.shipping}`}</span>
              </div>
              <div className="flex justify-between text-zinc-400 print:text-zinc-600">
                <span>VAT / Tax (14%):</span>
                <span>INCLUDED</span>
              </div>
              <div className="border-t border-white/20 print:border-black/30 pt-2 flex justify-between font-bold text-sm text-white print:text-black">
                <span>TOTAL PAID:</span>
                <span className="tabular-nums">EGP {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Official Sign-off Seal */}
          <div className="border-t border-dashed border-white/10 print:border-black/20 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-500 print:text-zinc-600 gap-4">
            <div>
              AUTHORIZED APEX SIGNATURE & STAMP · OFFICIAL RECORD
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 print:text-emerald-600" />
              <span>DIGITALLY VERIFIED INVOICE</span>
            </div>
          </div>
        </div>

        {/* Footer print / close / back button */}
        <div className="px-6 py-4 bg-zinc-950/90 border-t border-white/10 flex items-center justify-between no-print">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-white/20 text-white hover:bg-zinc-800 transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>BACK TO ORDERS</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-transparent border border-white/10 text-zinc-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer"
            >
              CLOSE
            </button>
            <button
              onClick={handlePrint}
              className="px-6 py-2.5 bg-white text-black font-brand font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <Printer className="w-4 h-4" />
              <span>{hasPrinted ? 'RE-PRINT RECEIPT' : 'PRINT RECEIPT'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
