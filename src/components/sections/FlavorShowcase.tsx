import React, { useState } from 'react';
import { BRAND_CONFIG, FlavorConfig } from '../../config/snackConfig';
import { SnackPouchMockup } from '../packaging/SnackPouchMockup';
import { ShoppingBag, Star, Sparkles, Check, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const FlavorShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'original' | 'sweet' | 'savory'>('original');
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const flavor = BRAND_CONFIG.flavors.find(f => f.id === activeTab) || BRAND_CONFIG.flavors[0];

  const handleAdd = () => {
    addToCart(flavor, BRAND_CONFIG.bundles[2], 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section className="py-20 bg-snack-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-snack-warm border-2 border-snack-dark text-xs font-display font-bold text-snack-dark shadow-playful-sm">
            <Sparkles size={14} className="text-amber-500 fill-amber-500" />
            <span>TASTE EXPLORATION</span>
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-snack-dark">
            EXPLORE THE FLAVOR SPECTRUM
          </h2>
          <p className="font-sans text-base text-gray-600">
            Crafted with culinary intent. Switch between our recipes to discover your favorite crunch.
          </p>
        </div>

        {/* Big Flavor Selection Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 bg-snack-warm rounded-full border-2 border-snack-dark shadow-playful max-w-full overflow-x-auto">
            {BRAND_CONFIG.flavors.map((f) => {
              const isSelected = activeTab === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveTab(f.id)}
                  className={`px-5 sm:px-8 py-3 rounded-full font-display font-bold text-sm sm:text-base transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                    isSelected
                      ? 'bg-snack-dark text-white shadow-md scale-102'
                      : 'text-snack-dark hover:bg-black/5'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/20"
                    style={{ backgroundColor: f.colorScheme.primaryAccent }}
                  />
                  <span>{f.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase Feature Container */}
        <div
          className="rounded-5xl border-3 border-snack-dark p-8 sm:p-12 shadow-playful-lg transition-colors duration-500 relative overflow-hidden"
          style={{ backgroundColor: flavor.colorScheme.bgPastel }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Big Interactive Mockup Display */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <div
                className="absolute w-72 h-72 rounded-full blur-2xl opacity-60 pointer-events-none"
                style={{ backgroundColor: flavor.colorScheme.primaryAccent }}
              />
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                <SnackPouchMockup flavor={flavor} size="hero" animate={true} />
              </div>
            </div>

            {/* Right: Flavor Story, Ingredients & Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="px-3.5 py-1 rounded-full text-xs font-display font-bold border-2 border-snack-dark"
                    style={{
                      backgroundColor: '#FFFFFF',
                      color: flavor.colorScheme.textColor
                    }}
                  >
                    ★ {flavor.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-badge font-bold text-snack-dark">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span>{flavor.rating.toFixed(1)} / 5.0</span>
                    <span className="text-gray-600 font-normal">({flavor.reviewCount} reviews)</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-5xl text-snack-dark leading-tight">
                  {flavor.name}
                </h3>
                <p className="font-display font-bold text-lg sm:text-xl text-amber-950/80 mt-1">
                  "{flavor.tagline}"
                </p>
                <p className="font-sans text-base text-gray-800 mt-3 leading-relaxed">
                  {flavor.longDescription}
                </p>
              </div>

              {/* Taste Notes Badges */}
              <div>
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-snack-dark/80 mb-2">
                  Tasting Profile:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {flavor.tasteNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-display font-bold bg-white text-snack-dark border-2 border-snack-dark shadow-playful-sm"
                    >
                      ✨ {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutrition Scorecard */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 border-2 border-snack-dark shadow-playful-sm">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-snack-dark/80 mb-3">
                  Nutrition Highlights (Per Serving):
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2 rounded-2xl bg-snack-cream border border-snack-dark/10">
                    <span className="block font-badge font-extrabold text-2xl text-snack-dark">
                      {flavor.nutrition.calories}
                    </span>
                    <span className="text-[11px] font-sans text-gray-500 font-semibold">Calories</span>
                  </div>
                  <div className="p-2 rounded-2xl bg-snack-cream border border-snack-dark/10">
                    <span className="block font-badge font-extrabold text-2xl text-snack-dark">
                      {flavor.nutrition.protein}
                    </span>
                    <span className="text-[11px] font-sans text-gray-500 font-semibold">Protein</span>
                  </div>
                  <div className="p-2 rounded-2xl bg-snack-cream border border-snack-dark/10">
                    <span className="block font-badge font-extrabold text-2xl text-snack-dark">
                      {flavor.nutrition.fiber}
                    </span>
                    <span className="text-[11px] font-sans text-gray-500 font-semibold">Dietary Fiber</span>
                  </div>
                  <div className="p-2 rounded-2xl bg-snack-cream border border-snack-dark/10">
                    <span className="block font-badge font-extrabold text-2xl text-snack-dark">
                      {flavor.nutrition.sugar}
                    </span>
                    <span className="text-[11px] font-sans text-gray-500 font-semibold">Sugars</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  onClick={handleAdd}
                  className={`w-full sm:w-auto px-8 py-4 rounded-full font-display font-bold text-base border-2 border-snack-dark shadow-playful active:translate-y-1 transition-all flex items-center justify-center gap-2 ${
                    justAdded ? 'bg-emerald-600 text-white' : 'bg-snack-dark hover:bg-black text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check size={20} />
                      <span>Added 6-Pack to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={20} className="text-snack-yellow" />
                      <span>Add 6-Pack Party Box ($20.94)</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
