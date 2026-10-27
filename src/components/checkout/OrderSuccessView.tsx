import React, { useEffect } from 'react';
import { CheckCircle2, ArrowRight, Printer, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../../context/CartContext';

export const OrderSuccessView: React.FC = () => {
  const { lastOrder, setCurrentView, customBrandName } = useCart();

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.5 }
      });
    } catch (e) {
      console.warn(e);
    }
  }, []);

  if (!lastOrder) {
    return (
      <div className="min-h-screen bg-snack-cream flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="font-display font-bold text-xl">No active order found.</h2>
          <button
            onClick={() => setCurrentView('home')}
            className="px-6 py-2.5 rounded-full bg-snack-dark text-white font-display text-sm font-bold"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-snack-cream py-12 md:py-20 select-none">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Card */}
        <div className="bg-white rounded-5xl border-3 border-snack-dark p-8 sm:p-12 shadow-playful-lg space-y-8 relative overflow-hidden">
          
          {/* Top celebratory header */}
          <div className="text-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-snack-yellow border-3 border-snack-dark mx-auto flex items-center justify-center text-4xl shadow-playful animate-bounce">
              🎉
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-display font-bold border border-emerald-300">
              <CheckCircle2 size={14} />
              <span>DEMO ORDER CONFIRMED</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl text-snack-dark tracking-tight">
              THANK YOU, {lastOrder.customerName.toUpperCase()}!
            </h1>

            <p className="font-sans text-sm sm:text-base text-gray-600 max-w-lg mx-auto">
              Your simulated crunch order has been received. A demonstration confirmation has been logged for review.
            </p>
          </div>

          {/* Order Details Pill Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-snack-warm rounded-3xl p-4 border-2 border-snack-dark/20 text-center text-xs">
            <div>
              <span className="block text-gray-500 font-sans">Order Number:</span>
              <span className="font-badge font-extrabold text-sm text-snack-dark">
                {lastOrder.orderNumber}
              </span>
            </div>
            <div>
              <span className="block text-gray-500 font-sans">Date:</span>
              <span className="font-badge font-semibold text-snack-dark">
                {lastOrder.date.split(',')[0]}
              </span>
            </div>
            <div>
              <span className="block text-gray-500 font-sans">Shipping:</span>
              <span className="font-badge font-semibold text-emerald-700">
                {lastOrder.shippingMethod}
              </span>
            </div>
            <div>
              <span className="block text-gray-500 font-sans">Total Demo Paid:</span>
              <span className="font-badge font-extrabold text-sm text-amber-950">
                ${lastOrder.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Items Purchased List */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base text-snack-dark border-b pb-2">
              Bites in this Order:
            </h3>

            <div className="divide-y divide-gray-100">
              {lastOrder.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border border-snack-dark flex items-center justify-center text-lg"
                      style={{ backgroundColor: item.colorScheme.bgPastel }}
                    >
                      {item.flavorId === 'original' ? '🍿' : item.flavorId === 'sweet' ? '🍯' : '🧄'}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs sm:text-sm text-snack-dark">
                        {item.flavorName}
                      </h4>
                      <p className="font-sans text-[11px] text-gray-500">
                        {item.bundleLabel} (Qty: {item.quantity})
                      </p>
                    </div>
                  </div>

                  <span className="font-badge font-bold text-sm text-snack-dark">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address Summary */}
          <div className="bg-snack-cream rounded-3xl p-4 border border-snack-dark/20 text-xs font-sans text-gray-700 space-y-1">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-snack-dark mb-1">
              Campus Destination:
            </h4>
            <p><strong>Recipient:</strong> {lastOrder.customerName} ({lastOrder.email})</p>
            <p><strong>Address:</strong> {lastOrder.address}, {lastOrder.city}, {lastOrder.zipCode}</p>
          </div>

          {/* Academic Prototype Venture Note */}
          <div className="p-4 rounded-3xl bg-purple-50 border border-purple-200 text-xs text-purple-950 flex items-start gap-3">
            <div className="text-xl">🎓</div>
            <div>
              <h5 className="font-display font-bold text-purple-900">
                Venture Assessment Milestone Completed
              </h5>
              <p className="font-sans text-purple-800/80 mt-0.5 leading-relaxed">
                This simulated order validates user flow completion, cart metrics, discount calculation, and checkout interactivity for the <strong>{customBrandName}</strong> university pitch.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex-1 py-4 px-6 rounded-full bg-snack-dark hover:bg-black text-white font-display font-bold text-sm shadow-playful hover:shadow-playful-sm active:translate-y-1 transition-all border-2 border-snack-dark flex items-center justify-center gap-2"
            >
              <span>Back to Storefront</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-snack-warm text-snack-dark font-display font-bold text-sm shadow-playful hover:shadow-playful-sm active:translate-y-1 transition-all border-2 border-snack-dark flex items-center justify-center gap-2"
            >
              <Printer size={16} className="text-gray-600" />
              <span>Print Demo Receipt</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
