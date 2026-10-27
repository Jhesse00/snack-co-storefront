import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Zap, Lock, CreditCard, Truck, Check, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';
import { BRAND_CONFIG } from '../../config/snackConfig';

export const CheckoutPage: React.FC = () => {
  const {
    items,
    subtotal,
    shippingCost,
    discountAmount,
    finalTotal,
    appliedPromo,
    completeDemoOrder,
    setCurrentView
  } = useCart();

  // Form Fields
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('NY');
  const [zipCode, setZipCode] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'pickup' | 'express'>('standard');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto-fill demo button
  const handleAutoFill = () => {
    setEmail('alex.rivera@nyu.edu');
    setFirstName('Alex');
    setLastName('Rivera');
    setAddress('726 Broadway, Suite 400');
    setCity('New York');
    setState('NY');
    setZipCode('10003');
    setErrorMsg(null);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !address || !city || !zipCode) {
      setErrorMsg('Please complete all required shipping fields (or click Autofill Demo Info above).');
      return;
    }

    setIsPlacingOrder(true);

    // Trigger celebratory confetti burst!
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 250);
    } catch (err) {
      console.warn('Confetti error:', err);
    }

    setTimeout(() => {
      completeDemoOrder({
        customerName: `${firstName} ${lastName}`,
        email,
        address,
        city,
        zipCode,
        shippingMethod: shippingMethod === 'pickup' ? 'Campus Hub Pickup' : shippingMethod === 'express' ? 'Express Courier' : 'Standard Delivery',
        items,
        subtotal,
        discount: discountAmount,
        shipping: shippingCost,
        total: finalTotal
      });
    }, 600);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-snack-cream flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-5xl border-3 border-snack-dark p-8 text-center space-y-4 shadow-playful">
          <div className="w-16 h-16 rounded-full bg-snack-yellow border-2 border-snack-dark mx-auto flex items-center justify-center text-3xl">
            🍿
          </div>
          <h2 className="font-display font-black text-2xl text-snack-dark">Your Bag Is Empty</h2>
          <p className="font-sans text-xs text-gray-600">
            Please add some crunchy snack bites before proceeding to checkout.
          </p>
          <button
            onClick={() => setCurrentView('shop')}
            className="w-full py-3 rounded-full bg-snack-dark text-white font-display font-bold text-sm hover:bg-black transition-colors"
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-snack-cream min-h-screen pb-20 select-none">
      
      {/* Top Academic Safety Banner */}
      <div className="bg-amber-100 border-b border-amber-300 py-2.5 px-4 text-center text-xs font-display font-bold text-amber-950 flex items-center justify-center gap-2">
        <Lock size={14} className="text-amber-800" />
        <span>DEMO CHECKOUT ENVIRONMENT • NO REAL PAYMENT PROCESSED • NO DATA STORED</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Back Button */}
        <button
          onClick={() => setCurrentView('shop')}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white border-2 border-snack-dark shadow-playful-sm text-xs font-display font-bold text-snack-dark hover:bg-snack-yellow/40 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Return to Shop</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Checkout Forms */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Demo Autofill Pill */}
            <div className="bg-gradient-to-r from-snack-yellow to-amber-200 border-2 border-snack-dark rounded-3xl p-4 shadow-playful-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Zap size={20} className="text-amber-900 fill-amber-900" />
                <div>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-snack-dark">
                    University Reviewer Shortcut
                  </h4>
                  <p className="font-sans text-[11px] text-amber-950">
                    Click to instantly populate realistic NYU campus student test info.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAutoFill}
                className="px-4 py-2 rounded-full bg-snack-dark hover:bg-black text-white font-display font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap active:scale-95 transition-all"
              >
                <span>⚡ Autofill Demo Info</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-2xl bg-rose-100 border border-rose-300 text-rose-800 text-xs font-medium flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Contact Information */}
              <div className="bg-white rounded-4xl border-2 border-snack-dark p-6 shadow-playful-sm space-y-4">
                <h3 className="font-display font-bold text-lg text-snack-dark border-b pb-2">
                  1. Contact Information
                </h3>
                <div>
                  <label className="block text-xs font-display font-bold text-gray-700 mb-1">
                    Student Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. yourname@nyu.edu"
                    className="w-full text-xs p-3 rounded-2xl border-2 border-snack-dark/30 focus:border-snack-dark focus:outline-none focus:ring-1 focus:ring-snack-yellow"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    Simulated order confirmation will be displayed on screen.
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-4xl border-2 border-snack-dark p-6 shadow-playful-sm space-y-4">
                <h3 className="font-display font-bold text-lg text-snack-dark border-b pb-2">
                  2. Campus Shipping Address
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-display font-bold text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Alex"
                      className="w-full text-xs p-3 rounded-2xl border-2 border-snack-dark/30 focus:border-snack-dark focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-display font-bold text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Rivera"
                      className="w-full text-xs p-3 rounded-2xl border-2 border-snack-dark/30 focus:border-snack-dark focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-display font-bold text-gray-700 mb-1">
                    Street Address / Dorm / Campus Building *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 726 Broadway, Suite 400"
                    className="w-full text-xs p-3 rounded-2xl border-2 border-snack-dark/30 focus:border-snack-dark focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-display font-bold text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="New York"
                      className="w-full text-xs p-3 rounded-2xl border-2 border-snack-dark/30 focus:border-snack-dark focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-display font-bold text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="NY"
                      className="w-full text-xs p-3 rounded-2xl border-2 border-snack-dark/30 focus:border-snack-dark focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-display font-bold text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="10003"
                      className="w-full text-xs p-3 rounded-2xl border-2 border-snack-dark/30 focus:border-snack-dark focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-4xl border-2 border-snack-dark p-6 shadow-playful-sm space-y-3">
                <h3 className="font-display font-bold text-lg text-snack-dark border-b pb-2">
                  3. Shipping Method
                </h3>
                
                <div className="space-y-2">
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-snack-dark bg-snack-yellow/20 shadow-playful-sm'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck size={18} className="text-amber-700" />
                      <div>
                        <span className="font-display font-bold text-xs text-snack-dark block">
                          Standard Campus Ground (2-3 Days)
                        </span>
                        <span className="font-sans text-[11px] text-gray-500">
                          Free for orders over $35
                        </span>
                      </div>
                    </div>
                    <span className="font-badge font-bold text-xs text-snack-dark">
                      {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('pickup')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      shippingMethod === 'pickup'
                        ? 'border-snack-dark bg-snack-yellow/20 shadow-playful-sm'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck size={18} className="text-emerald-700" />
                      <div>
                        <span className="font-display font-bold text-xs text-snack-dark block">
                          Campus Hub Locker Pickup
                        </span>
                        <span className="font-sans text-[11px] text-gray-500">
                          Kimmel Student Center Parcel Locker
                        </span>
                      </div>
                    </div>
                    <span className="font-badge font-bold text-xs text-emerald-700">
                      FREE
                    </span>
                  </label>
                </div>
              </div>

              {/* Demo Payment Simulation */}
              <div className="bg-white rounded-4xl border-2 border-snack-dark p-6 shadow-playful-sm space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-display font-bold text-lg text-snack-dark">
                    4. Payment Simulation
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-display font-bold border border-emerald-300">
                    Demo Mode Active
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-snack-warm border border-snack-dark/20 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-display font-bold text-snack-dark">
                    <CreditCard size={16} className="text-amber-700" />
                    <span>Fictional Test Credit Card (Pre-loaded)</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="col-span-2 bg-white p-2.5 rounded-xl border font-mono text-gray-700">
                      •••• •••• •••• 4242
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border font-mono text-gray-700 text-center">
                      12 / 28
                    </div>
                  </div>

                  <p className="text-[11px] font-sans text-gray-600">
                    ✨ No credit card will ever be charged. This simulates the full checkout transaction for the NYU business venture assessment.
                  </p>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={isPlacingOrder}
                  className="w-full py-4 px-6 rounded-full bg-snack-dark hover:bg-black text-white font-display font-bold text-base shadow-playful hover:shadow-playful-sm active:translate-y-1 transition-all border-2 border-snack-dark flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isPlacingOrder ? (
                    <span>Processing Demo Order...</span>
                  ) : (
                    <>
                      <Check size={20} className="text-snack-yellow" />
                      <span>Place Demo Order • ${finalTotal.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-5xl border-3 border-snack-dark p-6 sm:p-7 shadow-playful sticky top-28 space-y-5">
              <h3 className="font-display font-black text-xl text-snack-dark pb-3 border-b-2 border-snack-dark">
                Order Summary ({items.length})
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl border-2 border-snack-dark flex items-center justify-center text-xl flex-shrink-0"
                      style={{ backgroundColor: item.colorScheme.bgPastel }}
                    >
                      {item.flavorId === 'original' ? '🍿' : item.flavorId === 'sweet' ? '🍯' : '🧄'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-display font-bold text-xs text-snack-dark truncate">
                        {item.flavorName}
                      </h4>
                      <p className="font-sans text-[11px] text-gray-500">
                        {item.bundleLabel} (Qty: {item.quantity})
                      </p>
                    </div>

                    <span className="font-badge font-bold text-xs text-snack-dark">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 pt-4 border-t border-gray-100 text-xs font-sans text-gray-700">
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

                <div className="flex justify-between text-lg font-display font-black text-snack-dark pt-3 border-t-2 border-snack-dark">
                  <span>Total Due:</span>
                  <span className="font-badge text-2xl text-amber-950">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-snack-warm rounded-2xl p-3 border border-snack-dark/20 flex items-center gap-2 text-[11px] text-gray-600">
                <ShieldCheck size={18} className="text-emerald-700 flex-shrink-0" />
                <span>Encrypted Demo Protocol • Simulated for NYU Assessment</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
