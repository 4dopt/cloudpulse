import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Globe, Server, Check, ArrowRight, ShieldCheck, Tag, Trash2 } from 'lucide-react';
import { useCart } from '@/src/context/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    selectedDomain,
    setSelectedDomain,
    selectedHosting,
    setSelectedHosting,
    billingCycle,
    setBillingCycle,
    formatPrice,
    calculateTotalGBP,
    promoCode,
    applyPromoCode,
    discountPercent,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  const totals = calculateTotalGBP();
  const hasItems = selectedDomain || selectedHosting;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode) return;
    const success = applyPromoCode(inputCode);
    if (success) {
      setPromoMessage({ text: '20% discount applied! (WELCOME123)' });
    } else {
      setPromoMessage({ text: 'Invalid code. Try "WELCOME123"', error: true });
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-xs"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white border-l border-zinc-200 p-6 flex flex-col shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-zinc-950">Your Order Summary</h3>
                  <p className="text-xs text-zinc-500">CloudPulse · Next-Gen Cloud Infrastructure</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 py-6 space-y-6">
              {!hasItems ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400">
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                  <h4 className="font-display font-bold text-base text-zinc-950">Your cart is empty</h4>
                  <p className="text-sm text-zinc-500 max-w-xs mx-auto">
                    Select a domain name or choose a cloud hosting tier to get started.
                  </p>
                </div>
              ) : (
                <>
                  {/* Selected Domain */}
                  {selectedDomain && (
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedDomain(null)}
                        className="absolute top-3 right-3 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer p-1"
                        title="Remove domain"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-950 text-base">{selectedDomain.domain}</span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                              {selectedDomain.action}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Includes Free Privacy Protection & Anycast DNS
                          </p>
                          <div className="mt-2 text-sm font-bold text-zinc-950">
                            {formatPrice(selectedDomain.priceGBP)}{' '}
                            <span className="text-xs font-normal text-zinc-500">/ 1st year</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Selected Hosting */}
                  {selectedHosting && (
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 relative group">
                      <button
                        type="button"
                        onClick={() => setSelectedHosting(null)}
                        className="absolute top-3 right-3 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer p-1"
                        title="Remove hosting"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 shrink-0">
                          <Server className="h-5 w-5" />
                        </div>
                        <div className="flex-1 pr-6">
                          <span className="font-bold text-zinc-950 text-base block">{selectedHosting.name}</span>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            Autoscaling Cloud · 100% NVMe SSD · StackCP
                          </p>

                          {/* Billing cycle toggle */}
                          <div className="mt-3 inline-flex p-0.5 rounded-lg bg-white border border-zinc-200 text-xs shadow-xs">
                            <button
                              type="button"
                              onClick={() => setBillingCycle('annual')}
                              className={cn(
                                "px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium",
                                billingCycle === 'annual' ? "bg-zinc-950 text-white font-semibold" : "text-zinc-600 hover:text-zinc-950"
                              )}
                            >
                              Annual (Save 20%)
                            </button>
                            <button
                              type="button"
                              onClick={() => setBillingCycle('monthly')}
                              className={cn(
                                "px-2.5 py-1 rounded-md transition-all cursor-pointer font-medium",
                                billingCycle === 'monthly' ? "bg-zinc-950 text-white font-semibold" : "text-zinc-600 hover:text-zinc-950"
                              )}
                            >
                              Monthly
                            </button>
                          </div>

                          <div className="mt-2 text-sm font-bold text-zinc-950">
                            {formatPrice(
                              billingCycle === 'annual'
                                ? selectedHosting.annualPriceGBP * 12
                                : selectedHosting.monthlyPriceGBP
                            )}{' '}
                            <span className="text-xs font-normal text-zinc-500">
                              / {billingCycle === 'annual' ? 'year' : 'month'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Promo code input */}
                  <form onSubmit={handleApplyCode} className="pt-2">
                    <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
                      Coupon Code
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                        <input
                          type="text"
                          placeholder="e.g. WELCOME123"
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value)}
                          className="w-full h-10 pl-9 pr-3 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 h-10 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold transition-all cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                    {promoMessage && (
                      <p
                        className={cn(
                          "text-xs mt-1.5 flex items-center gap-1 font-medium",
                          promoMessage.error ? "text-rose-600" : "text-emerald-700"
                        )}
                      >
                        {!promoMessage.error && <Check className="h-3 w-3" />}
                        {promoMessage.text}
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>

            {/* Footer Summary */}
            {hasItems && (
              <div className="border-t border-zinc-100 pt-4 space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-zinc-500">
                    <span>Subtotal</span>
                    <span className="text-zinc-950 font-medium">{formatPrice(totals.subtotal)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Promo Discount ({discountPercent}%)</span>
                      <span>-{formatPrice(totals.discountAmount)}</span>
                    </div>
                  )}
                  {totals.savings > 0 && (
                    <div className="flex justify-between text-blue-600 text-xs font-medium">
                      <span>Total Savings</span>
                      <span>{formatPrice(totals.savings)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-extrabold text-zinc-950 pt-2 border-t border-zinc-100">
                    <span>Total Due Today</span>
                    <span className="font-display text-xl text-blue-600">{formatPrice(totals.total)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-zinc-500 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200/80">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>30-Day Money-Back Guarantee · Instant Setup</span>
                </div>

                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/25 cursor-pointer text-sm"
                >
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
