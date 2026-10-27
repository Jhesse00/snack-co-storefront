import React, { useState } from 'react';
import { ShoppingBag, Star, Info, Check, Sparkles } from 'lucide-react';
import { FlavorConfig, BundleOption, BRAND_CONFIG } from '../../config/snackConfig';
import { SnackPouchMockup } from '../packaging/SnackPouchMockup';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  flavor: FlavorConfig;
}

export const ProductCard: React.FC<ProductCardProps> = ({ flavor }) => {
  const { addToCart, setSelectedFlavorForModal } = useCart();
  const [selectedBundleId, setSelectedBundleId] = useState<string>('6pack');
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const selectedBundle = BRAND_CONFIG.bundles.find(b => b.id === selectedBundleId) || BRAND_CONFIG.bundles[2];

  const handleAddToCart = () => {
    addToCart(flavor, selectedBundle, 1);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 2000);
  };

  return (
    <div
      className="group relative bg-white rounded-4xl border-2 border-snack-dark p-6 sm:p-7 shadow-playful hover:shadow-playful-lg transition-all duration-300 flex flex-col justify-between"
      style={{
        backgroundColor: '#FFFFFF'
      }}
    >
      {/* Top Badge & Rating */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className="px-3 py-1 rounded-full text-xs font-display font-bold border-2 border-snack-dark shadow-playful-sm flex items-center gap-1"
            style={{
              backgroundColor: flavor.colorScheme.bgPastel,
              color: flavor.colorScheme.textColor
            }}
          >
            <Sparkles size={12} />
            <span>{flavor.badge}</span>
          </span>

          <div className="flex items-center gap-1 text-xs font-badge font-bold text-snack-dark bg-snack-warm px-2.5 py-1 rounded-full border border-snack-dark/20">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span>{flavor.rating.toFixed(1)}</span>
            <span className="text-gray-400 font-normal">({flavor.reviewCount})</span>
          </div>
        </div>

        {/* Center Pouch Artwork */}
        <div
          className="relative py-4 flex items-center justify-center cursor-pointer group-hover:scale-105 transition-transform duration-300"
          onClick={() => setSelectedFlavorForModal(flavor)}
        >
          {/* Pastel background halo */}
          <div
            className="absolute w-44 h-44 rounded-full blur-xl opacity-40 -z-0"
            style={{ backgroundColor: flavor.colorScheme.primaryAccent }}
          />
          <SnackPouchMockup flavor={flavor} size="md" animate={false} />
        </div>

        {/* Product Title & Info */}
        <div className="mt-4 text-center">
          <h3 className="font-display font-extrabold text-2xl text-snack-dark tracking-tight">
            {flavor.name}
          </h3>
          <p className="font-sans text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
            {flavor.description}
          </p>
        </div>

        {/* Taste Notes Pills */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {flavor.tasteNotes.map((note, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-full text-[11px] font-sans font-medium bg-snack-warm text-snack-dark/80 border border-snack-dark/10"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Bundle Selector */}
        <div className="mt-6">
          <label className="block text-center font-display font-bold text-xs uppercase tracking-wider text-snack-dark/70 mb-2">
            Select Bundle Pack:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {BRAND_CONFIG.bundles.map((bundle) => {
              const isSelected = bundle.id === selectedBundleId;
              return (
                <button
                  key={bundle.id}
                  onClick={() => setSelectedBundleId(bundle.id)}
                  className={`relative p-2 rounded-2xl border-2 text-left transition-all ${
                    isSelected
                      ? 'border-snack-dark bg-snack-yellow/30 shadow-playful-sm font-bold'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {bundle.isPopular && (
                    <span className="absolute -top-2.5 right-2 px-1.5 py-0.5 rounded-full bg-snack-dark text-snack-yellow text-[9px] font-display font-extrabold uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                  <div className="font-display text-xs text-snack-dark leading-tight">
                    {bundle.label}
                  </div>
                  <div className="font-badge text-xs font-bold text-amber-900 mt-0.5">
                    ${bundle.totalPrice.toFixed(2)}
                    <span className="text-[10px] text-gray-500 font-normal ml-1">
                      (${bundle.pricePerBag.toFixed(2)}/bag)
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2">
        <button
          onClick={handleAddToCart}
          className={`w-full py-3.5 px-4 rounded-full font-display font-bold text-sm tracking-wide border-2 border-snack-dark shadow-playful hover:shadow-playful-sm active:translate-y-0.5 transition-all flex items-center justify-center gap-2 ${
            isAddedRecently
              ? 'bg-emerald-500 text-white border-emerald-700'
              : 'bg-snack-dark hover:bg-black text-white'
          }`}
        >
          {isAddedRecently ? (
            <>
              <Check size={18} />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingBag size={18} className="text-snack-yellow" />
              <span>Add to Cart • ${selectedBundle.totalPrice.toFixed(2)}</span>
            </>
          )}
        </button>

        <button
          onClick={() => setSelectedFlavorForModal(flavor)}
          className="w-full py-2 text-center text-xs font-sans font-semibold text-gray-500 hover:text-snack-dark transition-colors flex items-center justify-center gap-1.5"
        >
          <Info size={13} />
          <span>View Ingredients & Nutrition Facts</span>
        </button>
      </div>
    </div>
  );
};
