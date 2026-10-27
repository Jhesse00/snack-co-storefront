import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, Tag, Check, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BRAND_CONFIG } from '../../config/snackConfig';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    totalItemCount,
    freeShippingThreshold,
    amountUntilFreeShipping,
    freeShippingProgress,
    isFreeShipping,
    shippingCost,
    discountAmount,
    finalTotal,
    promoCode,
    appliedPromo,
    promoError,
    applyPromoCode,
    removePromoCode,
    setCurrentView
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromoCode(inputCode);
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l-3 border-snack-dark flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* --- DRAWER HEADER --- */}
          <div className="p-6 border-b-2 border-snack-dark bg-snack-warm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-snack-yellow border-2 border-snack-dark flex items-center justify-center font-display font-extrabold text-lg shadow-playful-sm">
                  🛍️
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-snack-dark">
                    Your Snack Stash
                  </h3>
                  <span className="font-badge text-xs font-semibold text-gray-500">
                    {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} in bag
                  </span>
                </div>
              </div>

              <button
                onClick={closeCart}
                className="w-9 h-9 rounded-full border-2 border-snack-dark bg-white hover:bg-snack-yellow flex items-center justify-center text-snack-dark shadow-playful-sm transition-all"
                aria-label="Close cart drawer"
              >
                <X size={18} />
              </button>
            </div>

            {/* --- FREE SHIPPING PROGRESS BAR --- */}
            <div className="mt-4 bg-white rounded-2xl border-2 border-snack-dark p-3 shadow-playful-sm">
              <div className="flex items-center justify-between text-xs font-display font-bold mb-1.5">
                <span className="flex items-center gap-1.5 text-snack-dark">
                  <Truck size={14} className="text-amber-600" />
                  {isFreeShipping ? (
                    <span className="text-emerald-700">🎉 Free Campus Shipping Unlocked!</span>
                  ) : (
                    <span>Add ${amountUntilFreeShipping.toFixed(2)} for FREE Shipping</span>
                  )}
                </span>
                <span className="font-badge text-[11px] text-gray-500">
                  ${freeShippingThreshold.toFixed(0)} Goal
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full h-3 rounded-full bg-gray-100 border border-snack-dark/30 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-snack-yellow to-emerald-400 transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* --- CART ITEMS LIST --- */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-snack-warm border-2 border-snack-dark flex items-center justify-center text-4xl shadow-playful">
                  🍿
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-xl text-snack-dark">
                    Your bag is hungry!
                  </h4>
                  <p className="font-sans text-xs text-gray-500 mt-1 max-w-xs">
                    You haven't added any crunchy bites yet. Pick a flavor and stock up for study sessions.
                  </p>
                </div>
                <button
                  onClick={() => {
                    closeCart();
                    setCurrentView('shop');
                  }}
                  className="px-6 py-3 rounded-full bg-snack-dark text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-black transition-all shadow-playful"
                >
                  Explore Flavors
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-3xl border-2 border-snack-dark bg-snack-cream shadow-playful-sm flex items-center gap-3 relative transition-all"
                >
                  {/* Thumbnail Badge */}
                  <div
                    className="w-16 h-16 rounded-2xl border-2 border-snack-dark flex items-center justify-center text-2xl flex-shrink-0 shadow-sm"
                    style={{ backgroundColor: item.colorScheme.bgPastel }}
                  >
                    {item.flavorId === 'original' ? '🍿' : item.flavorId === 'sweet' ? '🍯' : '🧄'}
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-sm text-snack-dark truncate">
                      {item.flavorName}
                    </h4>
                    <span className="font-badge text-xs font-semibold text-amber-900 block">
                      {item.bundleLabel}
                    </span>
                    <span className="font-badge text-xs font-extrabold text-snack-dark mt-0.5 block">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                      {item.quantity > 1 && (
                        <span className="font-normal text-[11px] text-gray-500 ml-1">
                          (${item.unitPrice.toFixed(2)} ea)
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Quantity Controllers */}
                  <div className="flex items-center gap-1.5 bg-white border-2 border-snack-dark rounded-full p-1 shadow-sm flex-shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 text-snack-dark"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="font-badge font-bold text-xs px-1 text-snack-dark">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-gray-100 text-snack-dark"
                      aria-label="Increase quantity"
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* --- FOOTER & TOTALS --- */}
          {items.length > 0 && (
            <div className="p-6 border-t-2 border-snack-dark bg-snack-warm space-y-4">
              
              {/* Promo Code Input */}
              <div className="space-y-1.5">
                {!appliedPromo ? (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag size={13} className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Coupon (try NYUAI)"
                        className="w-full pl-8 pr-3 py-2 text-xs rounded-full border-2 border-snack-dark font-display font-semibold uppercase focus:outline-none focus:ring-1 focus:ring-snack-yellow"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-full bg-snack-dark text-white font-display font-bold text-xs hover:bg-black transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-between p-2 px-3 rounded-2xl bg-emerald-100 border border-emerald-400 text-emerald-900 text-xs font-display font-bold">
                    <div className="flex items-center gap-1.5">
                      <Check size={14} className="text-emerald-700" />
                      <span>Code: {appliedPromo.code} ({appliedPromo.description})</span>
                    </div>
                    <button
                      onClick={removePromoCode}
                      className="text-emerald-700 hover:text-emerald-950 font-sans text-xs underline"
                    >
                      Remove
                    </button>
                  </div>
                )}

                {promoError && (
                  <p className="text-[11px] text-rose-600 font-sans font-medium pl-2">
                    {promoError}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs font-sans text-gray-700 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-badge font-bold text-snack-dark">${subtotal.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({appliedPromo.code}):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping:</span>
                  {shippingCost === 0 ? (
                    <span className="font-badge font-bold text-emerald-700">FREE</span>
                  ) : (
                    <span className="font-badge font-bold text-snack-dark">${shippingCost.toFixed(2)}</span>
                  )}
                </div>

                <div className="flex justify-between text-base font-display font-extrabold text-snack-dark pt-2 border-t border-snack-dark/15">
                  <span>Estimated Total:</span>
                  <span className="font-badge text-xl text-amber-950">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 px-6 rounded-full bg-snack-dark hover:bg-black text-white font-display font-bold text-base shadow-playful hover:shadow-playful-sm active:translate-y-1 transition-all border-2 border-snack-dark flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Demo Checkout</span>
                <ArrowRight size={18} className="text-snack-yellow group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-[10px] text-center text-gray-500 font-sans">
                🔒 Academic Demo Checkout • Fictional test orders only
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
