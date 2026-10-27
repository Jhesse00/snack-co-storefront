import React, { useState } from 'react';
import { Sliders, RotateCcw, X, Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BRAND_CONFIG } from '../../config/snackConfig';

export const DemoToolbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    customBrandName,
    setCustomBrandName,
    customTagline,
    setCustomTagline,
    activeHeroFlavor,
    setActiveHeroFlavor,
    addToCart
  } = useCart();

  const handleReset = () => {
    setCustomBrandName(BRAND_CONFIG.companyName);
    setCustomTagline(BRAND_CONFIG.tagline);
    setActiveHeroFlavor('original');
  };

  const handleQuickSeedCart = () => {
    addToCart(BRAND_CONFIG.flavors[0], BRAND_CONFIG.bundles[1], 1);
    addToCart(BRAND_CONFIG.flavors[2], BRAND_CONFIG.bundles[2], 1);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      {/* Floating Toggle Button */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-snack-dark text-white border-2 border-snack-yellow shadow-float hover:scale-105 transition-all text-xs font-display font-bold group"
          title="Open Prototype Presentation Controls"
        >
          <Sliders size={14} className="text-snack-yellow group-hover:rotate-45 transition-transform" />
          <span>Demo Customizer</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      ) : (
        /* Expanded Controls Drawer */
        <div className="w-80 sm:w-96 bg-white border-2 border-snack-dark rounded-3xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-snack-yellow/40 text-snack-dark">
                <Sliders size={16} />
              </span>
              <div>
                <h4 className="font-display font-bold text-sm text-snack-dark">
                  Prototype Customizer
                </h4>
                <p className="font-sans text-[10px] text-gray-500">
                  NYU Presentation Tools
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-4 pt-3">
            {/* Live Brand Name Editing */}
            <div>
              <label className="block font-display font-bold text-xs text-snack-dark mb-1">
                Company / Brand Placeholder:
              </label>
              <input
                type="text"
                value={customBrandName}
                onChange={(e) => setCustomBrandName(e.target.value)}
                placeholder="e.g. SNACK CO."
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-300 font-display font-semibold focus:outline-none focus:ring-2 focus:ring-snack-yellow"
              />
            </div>

            {/* Live Tagline Editing */}
            <div>
              <label className="block font-display font-bold text-xs text-snack-dark mb-1">
                Tagline Placeholder:
              </label>
              <input
                type="text"
                value={customTagline}
                onChange={(e) => setCustomTagline(e.target.value)}
                placeholder="e.g. Better Snacking Starts Here"
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-gray-300 font-sans focus:outline-none focus:ring-2 focus:ring-snack-yellow"
              />
            </div>

            {/* Hero Flavor Switcher */}
            <div>
              <label className="block font-display font-bold text-xs text-snack-dark mb-1">
                Active Hero Packaging Flavor:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {BRAND_CONFIG.flavors.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveHeroFlavor(f.id)}
                    className={`px-2 py-1.5 rounded-xl border text-[11px] font-display font-bold capitalize transition-all ${
                      activeHeroFlavor === f.id
                        ? 'border-snack-dark bg-snack-dark text-white'
                        : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {f.id}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                onClick={handleQuickSeedCart}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-snack-warm hover:bg-snack-yellow/40 text-snack-dark font-display font-bold text-[11px] border border-snack-dark/30 transition-all"
              >
                <Sparkles size={12} className="text-amber-600" />
                <span>+ Seed Test Cart</span>
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-gray-500 hover:text-gray-800 text-[11px] font-sans hover:bg-gray-100 transition-all"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
