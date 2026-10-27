import React from 'react';
import { Sparkles, ArrowRight, ShoppingBag, Star, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { BRAND_CONFIG } from '../../config/snackConfig';
import { SnackPouchMockup } from '../packaging/SnackPouchMockup';
import { FloatingBadge } from '../packaging/FloatingBadge';
import { WavyDivider } from '../common/WavyDivider';

export const HeroSection: React.FC = () => {
  const {
    customBrandName,
    customTagline,
    activeHeroFlavor,
    setActiveHeroFlavor,
    addToCart,
    setCurrentView
  } = useCart();

  const currentFlavor = BRAND_CONFIG.flavors.find(f => f.id === activeHeroFlavor) || BRAND_CONFIG.flavors[0];

  const handleHeroQuickAdd = () => {
    // Add popular 6-pack of current flavor
    addToCart(currentFlavor, BRAND_CONFIG.bundles[2], 1);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24 transition-colors duration-700"
      style={{
        backgroundColor: currentFlavor.colorScheme.bgPastel
      }}
    >
      {/* Subtle background circles for organic depth */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-white/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-white/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Oversized Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border-2 border-snack-dark shadow-playful-sm text-xs sm:text-sm font-display font-bold text-snack-dark">
              <Sparkles size={16} className="text-amber-500 fill-amber-500" />
              <span>{customTagline}</span>
            </div>

            {/* Oversized Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-snack-dark leading-[1.05]">
              MEET YOUR NEW <br />
              <span className="relative inline-block text-snack-dark">
                SNACK OBSESSION
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-white/80 rounded-full -z-10 transform -rotate-1" />
              </span>
            </h1>

            {/* Brand Story / Subtitle */}
            <p className="font-sans text-base sm:text-lg text-snack-dark/80 max-w-xl leading-relaxed">
              Air-popped organic whole grains crisped to golden perfection in 100% cold-pressed avocado oil. Mindfully seasoned with uncompromised flavor for study sessions and everyday cravings.
            </p>

            {/* Interactive Hero Flavor Switcher */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <span className="font-display font-bold text-xs uppercase tracking-wider text-snack-dark/70">
                Choose Flavor:
              </span>
              <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-full border-2 border-snack-dark shadow-playful-sm">
                {BRAND_CONFIG.flavors.map((flavor) => {
                  const isActive = activeHeroFlavor === flavor.id;
                  return (
                    <button
                      key={flavor.id}
                      onClick={() => setActiveHeroFlavor(flavor.id)}
                      className={`px-4 py-2 rounded-full font-display font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-snack-dark text-white shadow-sm scale-105'
                          : 'text-snack-dark hover:bg-black/5'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        flavor.id === 'original' ? 'bg-amber-400' : flavor.id === 'sweet' ? 'bg-orange-400' : 'bg-teal-400'
                      }`} />
                      <span>{flavor.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
              <button
                onClick={() => {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-snack-dark hover:bg-black text-white font-display font-bold text-lg shadow-playful hover:shadow-playful-sm active:translate-y-1 transition-all flex items-center justify-center gap-2 border-2 border-snack-dark group"
              >
                <span>Shop All Bites</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleHeroQuickAdd}
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-snack-warm text-snack-dark font-display font-bold text-base shadow-playful hover:shadow-playful-sm active:translate-y-1 transition-all flex items-center justify-center gap-2 border-2 border-snack-dark"
              >
                <ShoppingBag size={18} className="text-amber-600" />
                <span>Quick Add Party Box ($20.94)</span>
              </button>
            </div>

            {/* Micro Social Proof / Claims */}
            <div className="flex items-center gap-4 pt-2 text-xs font-sans font-medium text-snack-dark/80">
              <div className="flex items-center text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold">4.9/5 Rating</span>
              <span className="text-snack-dark/40">•</span>
              <span>840+ Student Reviews</span>
              <span className="text-snack-dark/40">•</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check size={14} /> Zero Seed Oils
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Packaging Display + Floating Doodles */}
          <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
            
            {/* Center Pouch Mockup with Ambient Halo */}
            <div className="relative">
              {/* Halos */}
              <div
                className="absolute inset-0 rounded-full blur-2xl transform scale-90 opacity-70 transition-all duration-700 -z-10"
                style={{ backgroundColor: currentFlavor.colorScheme.primaryAccent }}
              />

              {/* Floating Badges */}
              <FloatingBadge
                icon="🥑"
                title="Cold-Pressed"
                subtitle="100% Avocado Oil"
                positionClass="-top-4 -left-10"
                delay="0s"
              />

              <FloatingBadge
                icon="💨"
                title="Air-Popped"
                subtitle="Never Deep-Fried"
                positionClass="-top-2 -right-8"
                delay="1s"
              />

              <FloatingBadge
                icon="⚡"
                title="110 Calories"
                subtitle="Guilt-Free Crunch"
                positionClass="bottom-14 -left-12"
                delay="2s"
              />

              <FloatingBadge
                icon="🌱"
                title="Organic Corn"
                subtitle="Non-GMO Verified"
                positionClass="bottom-10 -right-8"
                delay="1.5s"
              />

              {/* The Realistic Pouch Mockup */}
              <div className="transform hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => {
                  setCurrentView('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <SnackPouchMockup flavor={currentFlavor} size="hero" animate={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Campus Retailers / Press Marquee Ribbon */}
        <div className="mt-16 pt-8 border-t border-snack-dark/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display font-bold text-xs uppercase tracking-widest text-snack-dark/70 text-center md:text-left">
            Carried In Campus Hubs & Bodegas:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="font-display font-black text-base tracking-wider text-snack-dark">NYU CAMPUS STORE</span>
            <span className="font-display font-black text-base tracking-wider text-snack-dark">STERN CAFE</span>
            <span className="font-display font-black text-base tracking-wider text-snack-dark">W. 4TH BODEGA</span>
            <span className="font-display font-black text-base tracking-wider text-snack-dark">WESTSIDE MARKET</span>
            <span className="font-display font-black text-base tracking-wider text-snack-dark">WHOLESOME PANTRY</span>
          </div>
        </div>
      </div>

      {/* Scallop wavy border into next section */}
      <div className="absolute -bottom-1 left-0 right-0">
        <WavyDivider fillColor="#FFFDF7" bgColor="transparent" height={16} />
      </div>
    </section>
  );
};
