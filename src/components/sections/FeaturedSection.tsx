import React from 'react';
import { BRAND_CONFIG } from '../../config/snackConfig';
import { ProductCard } from '../shop/ProductCard';
import { Sparkles, ArrowRight, PackageCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const FeaturedSection: React.FC = () => {
  const { setCurrentView, addToCart } = useCart();

  const handleAddSamplerBox = () => {
    // Add the 12-pack sampler
    addToCart(BRAND_CONFIG.flavors[0], BRAND_CONFIG.bundles[3], 1);
  };

  return (
    <section id="flavors-section" className="py-16 md:py-24 bg-snack-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-snack-warm border-2 border-snack-dark shadow-playful-sm text-xs font-display font-bold text-snack-dark">
            <Sparkles size={14} className="text-amber-500 fill-amber-500" />
            <span>THE CORE TRIO</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-snack-dark tracking-tight">
            HEALTHIER-FOR-YOU CRUNCH YOU'LL CRAVE
          </h2>

          <p className="font-sans text-base sm:text-lg text-gray-600 leading-relaxed">
            Every bag is popped fresh under gentle hot air pressure, drizzled with 100% cold-pressed avocado oil, and seasoned with real kitchen spices.
          </p>
        </div>

        {/* 3-Column Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRAND_CONFIG.flavors.map((flavor) => (
            <ProductCard key={flavor.id} flavor={flavor} />
          ))}
        </div>

        {/* Big Sampler Pack Promo Banner */}
        <div className="mt-16 bg-gradient-to-r from-snack-yellow via-amber-200 to-orange-200 rounded-5xl border-3 border-snack-dark p-8 sm:p-10 shadow-playful relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 z-10">
            <span className="px-3 py-1 rounded-full bg-snack-dark text-snack-yellow font-display font-bold text-xs uppercase tracking-wider">
              Can't Decide on Just One?
            </span>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-snack-dark">
              TRY THE 12-PACK ULTIMATE SAMPLER
            </h3>
            <p className="font-sans text-sm sm:text-base text-snack-dark/80 max-w-xl">
              Includes 4 bags of Original Sea Salt, 4 Sweet Cinnamon Glaze, and 4 Savory Herb & Garlic. Qualifies for instant <strong>FREE SHIPPING</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 z-10 flex-shrink-0">
            <button
              onClick={handleAddSamplerBox}
              className="px-8 py-4 rounded-full bg-snack-dark hover:bg-black text-white font-display font-bold text-base shadow-playful hover:shadow-playful-sm active:translate-y-1 transition-all border-2 border-snack-dark flex items-center gap-2"
            >
              <PackageCheck size={18} className="text-snack-yellow" />
              <span>Add 12-Pack Sampler ($35.88)</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-4 rounded-full bg-white hover:bg-snack-warm text-snack-dark font-display font-bold text-sm shadow-playful hover:shadow-playful-sm active:translate-y-1 transition-all border-2 border-snack-dark flex items-center gap-1.5"
            >
              <span>View All Options</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Decorative background doodles */}
          <div className="absolute -right-8 -bottom-8 opacity-20 text-9xl pointer-events-none select-none">
            🍿
          </div>
        </div>

      </div>
    </section>
  );
};
