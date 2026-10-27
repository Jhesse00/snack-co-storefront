import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { WavyDivider } from './WavyDivider';

export const Navbar: React.FC = () => {
  const {
    customBrandName,
    totalItemCount,
    subtotal,
    openCart,
    currentView,
    setCurrentView
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'shop', anchor?: string) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    if (anchor) {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-snack-cream/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl border-2 border-snack-dark bg-white shadow-playful-sm text-snack-dark focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Brand Logo Wordmark */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-11 h-11 rounded-2xl bg-snack-yellow border-2 border-snack-dark flex items-center justify-center font-display font-extrabold text-2xl shadow-playful-sm group-hover:rotate-6 transition-transform">
                🍿
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-snack-dark group-hover:text-amber-800 transition-colors">
                  {customBrandName}
                </span>
                <span className="font-badge text-[9px] font-bold uppercase tracking-widest text-amber-900/60 -mt-1">
                  Air-Popped Goodness
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`font-display text-base font-bold transition-colors hover:text-amber-700 ${
                currentView === 'home' ? 'text-amber-800 underline decoration-wavy decoration-snack-yellow underline-offset-8' : 'text-snack-dark'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop')}
              className={`font-display text-base font-bold transition-colors hover:text-amber-700 ${
                currentView === 'shop' ? 'text-amber-800 underline decoration-wavy decoration-snack-yellow underline-offset-8' : 'text-snack-dark'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => handleNavClick('home', 'flavors-section')}
              className="font-display text-base font-bold text-snack-dark hover:text-amber-700 transition-colors"
            >
              Flavors
            </button>
            <button
              onClick={() => handleNavClick('home', 'why-us-section')}
              className="font-display text-base font-bold text-snack-dark hover:text-amber-700 transition-colors"
            >
              Why Us
            </button>
            <button
              onClick={() => handleNavClick('home', 'reviews-section')}
              className="font-display text-base font-bold text-snack-dark hover:text-amber-700 transition-colors"
            >
              Reviews
            </button>
          </nav>

          {/* Right Action: Cart Pill Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('shop')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-snack-dark bg-snack-warm hover:bg-snack-yellow/40 font-display font-bold text-xs uppercase tracking-wider text-snack-dark shadow-playful-sm transition-all"
            >
              <Sparkles size={14} className="text-amber-600" />
              <span>Explore Sampler</span>
            </button>

            <button
              onClick={openCart}
              className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border-2 border-snack-dark bg-snack-dark hover:bg-black text-white shadow-playful active:translate-y-0.5 transition-all"
              aria-label={`Open shopping cart with ${totalItemCount} items`}
            >
              <ShoppingBag size={18} className="text-snack-yellow group-hover:scale-110 transition-transform" />
              <span className="font-display font-bold text-sm tracking-wide">Cart</span>
              
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-snack-yellow text-snack-dark font-badge font-extrabold text-xs shadow-sm">
                {totalItemCount}
              </span>

              {subtotal > 0 && (
                <span className="hidden md:inline-block font-badge font-semibold text-xs text-white/80 border-l border-white/20 pl-2">
                  ${subtotal.toFixed(2)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b-2 border-snack-dark bg-snack-warm px-6 py-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          <button
            onClick={() => handleNavClick('home')}
            className="text-left font-display font-bold text-lg text-snack-dark hover:text-amber-700"
          >
            🏠 Home
          </button>
          <button
            onClick={() => handleNavClick('shop')}
            className="text-left font-display font-bold text-lg text-snack-dark hover:text-amber-700"
          >
            🛍️ Shop All Bites
          </button>
          <button
            onClick={() => handleNavClick('home', 'flavors-section')}
            className="text-left font-display font-bold text-lg text-snack-dark hover:text-amber-700"
          >
            ✨ Flavors Showcase
          </button>
          <button
            onClick={() => handleNavClick('home', 'why-us-section')}
            className="text-left font-display font-bold text-lg text-snack-dark hover:text-amber-700"
          >
            🌱 Why Snack Co.
          </button>
          <button
            onClick={() => handleNavClick('home', 'reviews-section')}
            className="text-left font-display font-bold text-lg text-snack-dark hover:text-amber-700"
          >
            ⭐️ Student Reviews
          </button>
        </div>
      )}

      {/* Scallop wavy border decoration under navbar */}
      <WavyDivider fillColor="#FFFDF7" bgColor="transparent" height={8} />
    </header>
  );
};
