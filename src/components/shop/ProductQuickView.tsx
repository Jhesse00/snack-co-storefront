import React, { useState } from 'react';
import { X, Check, Star, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { SnackPouchMockup } from '../packaging/SnackPouchMockup';
import { BRAND_CONFIG } from '../../config/snackConfig';

export const ProductQuickView: React.FC = () => {
  const { selectedFlavorForModal, setSelectedFlavorForModal, addToCart } = useCart();
  const [bundleId, setBundleId] = useState('6pack');
  const [added, setAdded] = useState(false);

  if (!selectedFlavorForModal) return null;

  const flavor = selectedFlavorForModal;
  const bundle = BRAND_CONFIG.bundles.find(b => b.id === bundleId) || BRAND_CONFIG.bundles[2];

  const handleAdd = () => {
    addToCart(flavor, bundle, 1);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setSelectedFlavorForModal(null);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-5xl border-3 border-snack-dark p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedFlavorForModal(null)}
          className="absolute top-5 right-5 w-10 h-10 rounded-full border-2 border-snack-dark bg-snack-warm hover:bg-snack-yellow/50 flex items-center justify-center text-snack-dark shadow-playful-sm transition-all z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Mockup & Visuals */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-4xl border-2 border-snack-dark"
            style={{ backgroundColor: flavor.colorScheme.bgPastel }}
          >
            <SnackPouchMockup flavor={flavor} size="lg" animate={true} />
            <span className="mt-4 font-badge text-xs font-bold uppercase tracking-wider text-snack-dark/70">
              Prototype Mockup • 4.5 OZ
            </span>
          </div>

          {/* Right Column: Details & Nutrition */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-3 py-0.5 rounded-full text-xs font-display font-bold border border-snack-dark"
                  style={{
                    backgroundColor: flavor.colorScheme.bgPastel,
                    color: flavor.colorScheme.textColor
                  }}
                >
                  {flavor.badge}
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-snack-dark">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span>{flavor.rating.toFixed(1)}</span>
                  <span className="text-gray-400">({flavor.reviewCount} reviews)</span>
                </div>
              </div>

              <h3 className="font-display font-extrabold text-3xl text-snack-dark">
                {flavor.name}
              </h3>
              <p className="font-sans text-sm text-gray-600 mt-2 leading-relaxed">
                {flavor.longDescription}
              </p>
            </div>

            {/* Nutrition Highlights Grid */}
            <div className="bg-snack-warm rounded-3xl p-4 border border-snack-dark/20">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-snack-dark/80 mb-2.5">
                Nutritional Highlights (Per Serving):
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-white rounded-2xl p-2 border border-snack-dark/10">
                  <span className="block font-badge font-extrabold text-lg text-snack-dark">
                    {flavor.nutrition.calories}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-medium">Calories</span>
                </div>
                <div className="bg-white rounded-2xl p-2 border border-snack-dark/10">
                  <span className="block font-badge font-extrabold text-lg text-snack-dark">
                    {flavor.nutrition.protein}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-medium">Protein</span>
                </div>
                <div className="bg-white rounded-2xl p-2 border border-snack-dark/10">
                  <span className="block font-badge font-extrabold text-lg text-snack-dark">
                    {flavor.nutrition.fiber}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-medium">Fiber</span>
                </div>
                <div className="bg-white rounded-2xl p-2 border border-snack-dark/10">
                  <span className="block font-badge font-extrabold text-lg text-snack-dark">
                    {flavor.nutrition.sugar}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase font-medium">Sugar</span>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-snack-dark/80 mb-1">
                Ingredients:
              </h4>
              <p className="font-sans text-xs text-gray-700">
                {flavor.ingredients.join(', ')}.
              </p>
            </div>

            {/* Bundle Selector & Add Action */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2">
                {BRAND_CONFIG.bundles.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBundleId(b.id)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-display font-bold border-2 transition-all ${
                      bundleId === b.id
                        ? 'border-snack-dark bg-snack-yellow/40 shadow-playful-sm'
                        : 'border-gray-200 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <div>{b.label}</div>
                    <div className="text-[11px] text-amber-900">${b.totalPrice.toFixed(2)}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleAdd}
                className={`w-full py-3.5 px-6 rounded-full font-display font-bold text-base border-2 border-snack-dark shadow-playful active:translate-y-1 transition-all flex items-center justify-center gap-2 ${
                  added ? 'bg-emerald-600 text-white' : 'bg-snack-dark hover:bg-black text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check size={20} />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={20} className="text-snack-yellow" />
                    <span>Add {bundle.label} • ${bundle.totalPrice.toFixed(2)}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
