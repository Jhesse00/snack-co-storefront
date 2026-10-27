import React, { useState } from 'react';
import { BRAND_CONFIG, FlavorConfig } from '../../config/snackConfig';
import { ProductCard } from './ProductCard';
import { Sparkles, ArrowLeft, HelpCircle, Package, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { WavyDivider } from '../common/WavyDivider';

export const ShopPage: React.FC = () => {
  const { setCurrentView, customBrandName } = useCart();
  const [filter, setFilter] = useState<'all' | 'original' | 'sweet' | 'savory'>('all');

  const filteredFlavors = filter === 'all'
    ? BRAND_CONFIG.flavors
    : BRAND_CONFIG.flavors.filter(f => f.id === filter);

  return (
    <div className="bg-snack-cream min-h-screen pb-20">
      
      {/* Shop Header Banner */}
      <div className="bg-snack-warm py-12 md:py-16 border-b-2 border-snack-dark relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white border-2 border-snack-dark shadow-playful-sm text-xs font-display font-bold text-snack-dark hover:bg-snack-yellow/40 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </button>

          <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-snack-yellow text-amber-950 border-2 border-snack-dark font-display font-bold text-xs shadow-playful-sm flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>THE OFFICIAL STOREFRONT</span>
            </span>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-snack-dark">
              ALL SNACK BITES
            </h1>

            <p className="font-sans text-sm sm:text-base text-gray-700">
              Select your crunch quantity below. All orders over $35 receive free campus delivery.
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-5 py-2 rounded-full font-display font-bold text-xs transition-all border-2 ${
                  filter === 'all'
                    ? 'border-snack-dark bg-snack-dark text-white shadow-playful-sm'
                    : 'border-snack-dark/30 bg-white text-snack-dark hover:bg-snack-warm'
                }`}
              >
                All Flavors (3)
              </button>
              <button
                onClick={() => setFilter('original')}
                className={`px-5 py-2 rounded-full font-display font-bold text-xs transition-all border-2 ${
                  filter === 'original'
                    ? 'border-snack-dark bg-amber-400 text-snack-dark shadow-playful-sm'
                    : 'border-snack-dark/30 bg-white text-snack-dark hover:bg-snack-warm'
                }`}
              >
                🍿 Original Sea Salt
              </button>
              <button
                onClick={() => setFilter('sweet')}
                className={`px-5 py-2 rounded-full font-display font-bold text-xs transition-all border-2 ${
                  filter === 'sweet'
                    ? 'border-snack-dark bg-orange-400 text-snack-dark shadow-playful-sm'
                    : 'border-snack-dark/30 bg-white text-snack-dark hover:bg-snack-warm'
                }`}
              >
                🍯 Sweet Cinnamon
              </button>
              <button
                onClick={() => setFilter('savory')}
                className={`px-5 py-2 rounded-full font-display font-bold text-xs transition-all border-2 ${
                  filter === 'savory'
                    ? 'border-snack-dark bg-teal-400 text-snack-dark shadow-playful-sm'
                    : 'border-snack-dark/30 bg-white text-snack-dark hover:bg-snack-warm'
                }`}
              >
                🧄 Savory Herb
              </button>
            </div>
          </div>
        </div>

        {/* Scallop wavy border decoration */}
        <div className="absolute -bottom-1 left-0 right-0">
          <WavyDivider fillColor="#FFFDF7" bgColor="transparent" height={14} />
        </div>
      </div>

      {/* Main Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFlavors.map((flavor) => (
            <ProductCard key={flavor.id} flavor={flavor} />
          ))}
        </div>

        {/* FAQs Accordion / Grid */}
        <div className="mt-24 bg-white rounded-5xl border-3 border-snack-dark p-8 sm:p-12 shadow-playful">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
            <span className="font-display font-bold text-xs uppercase tracking-wider text-amber-800 bg-snack-warm px-3 py-1 rounded-full border border-snack-dark/20">
              Campus Questions Answered
            </span>
            <h3 className="font-display font-black text-2xl sm:text-4xl text-snack-dark">
              FREQUENTLY ASKED QUESTIONS
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-3xl bg-snack-cream border-2 border-snack-dark/20 space-y-2">
              <h4 className="font-display font-bold text-base text-snack-dark flex items-center gap-2">
                <Package size={18} className="text-amber-600" />
                How are the snack bites cooked?
              </h4>
              <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                We expand non-GMO whole grains in specialized hot air chambers rather than boiling oil vats. Once puffed light, they are delicately misted with pure avocado oil for crunch and seasoning adhesion.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-snack-cream border-2 border-snack-dark/20 space-y-2">
              <h4 className="font-display font-bold text-base text-snack-dark flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-600" />
                Are they vegan and gluten-free?
              </h4>
              <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                Yes! All three recipes are 100% plant-based, dairy-free, certified gluten-free, and contain zero seed oils or synthetic preservatives.
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-snack-cream border-2 border-snack-dark/20 space-y-2">
              <h4 className="font-display font-bold text-base text-snack-dark flex items-center gap-2">
                <Heart size={18} className="text-rose-500" />
                What is the shelf life of each pouch?
              </h4>
              <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                Our oxygen-barrier recyclable pouches lock in crispiness for up to 9 months unopened. Once opened, we recommend eating within 5 days for peak crunch!
              </p>
            </div>

            <div className="p-5 rounded-3xl bg-snack-cream border-2 border-snack-dark/20 space-y-2">
              <h4 className="font-display font-bold text-base text-snack-dark flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                How does campus delivery work?
              </h4>
              <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed">
                In our university prototype test, orders ship via campus parcel lockers or standard ground delivery in 2-3 business days. Free shipping applies automatically over $35.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
