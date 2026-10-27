import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { WavyDivider } from './WavyDivider';

export const Footer: React.FC = () => {
  const { customBrandName, setCurrentView } = useCart();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <footer className="relative bg-snack-dark text-white pt-6 pb-12 overflow-hidden">
      {/* Top wavy scallop border */}
      <div className="-mt-8 mb-8">
        <WavyDivider fillColor="#1C2833" bgColor="transparent" height={16} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍿</span>
              <span className="font-display font-extrabold text-3xl tracking-wide text-snack-yellow">
                {customBrandName}
              </span>
            </div>
            
            <p className="font-sans text-sm text-gray-300 max-w-sm leading-relaxed">
              Air-popped organic whole grains crisped in pure cold-pressed avocado oil.
              Mindfully seasoned with uncompromised flavor for study marathons, dorm hangouts, and anytime crunching.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs font-badge font-semibold text-snack-yellow bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <ShieldCheck size={14} className="text-snack-yellow" />
              <span>100% Student Verified Prototype</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-display font-bold text-lg text-white">Explore</h4>
            <ul className="flex flex-col gap-2 font-sans text-sm text-gray-300">
              <li>
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-snack-yellow transition-colors"
                >
                  Shop All Flavors
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => {
                      document.getElementById('flavors-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-snack-yellow transition-colors"
                >
                  Original Sea Salt
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => {
                      document.getElementById('flavors-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-snack-yellow transition-colors"
                >
                  Sweet Cinnamon Glaze
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => {
                      document.getElementById('flavors-section')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                  className="hover:text-snack-yellow transition-colors"
                >
                  Savory Herb & Garlic
                </button>
              </li>
            </ul>
          </div>

          {/* About / Pillars */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-display font-bold text-lg text-white">Our Standards</h4>
            <ul className="flex flex-col gap-2 font-sans text-sm text-gray-300">
              <li>No Seed Oils</li>
              <li>Always Air-Popped</li>
              <li>Non-GMO Whole Corn</li>
              <li>Himalayan Mineral Salt</li>
              <li>Recyclable Pouches</li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-display font-bold text-lg text-white">Stay In The Loop</h4>
            <p className="font-sans text-xs text-gray-300 leading-relaxed">
              Subscribe for early access to university tasting events and prototype discount drops.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter campus email..."
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-snack-yellow"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-full bg-snack-yellow text-snack-dark font-display font-bold text-xs flex items-center justify-center hover:bg-amber-400 transition-colors"
                  aria-label="Submit email"
                >
                  <Send size={12} />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 animate-in fade-in">
                  <CheckCircle2 size={13} />
                  <span>Prototype newsletter simulated! Coupon code: <strong>NYUAI</strong></span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Academic Project Disclosure Notice Box */}
        <div className="mt-8 bg-purple-900/30 border border-purple-500/30 rounded-3xl p-5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 flex items-center justify-center text-xl flex-shrink-0">
              🎓
            </div>
            <div>
              <h5 className="font-display font-bold text-sm text-purple-200">
                NYU AI-First Business Venture Assessment Prototype
              </h5>
              <p className="font-sans text-xs text-purple-300/80 mt-0.5 max-w-2xl">
                This website is an early-stage prototype prepared for academic review. Product names, flavor variants, and packaging designs represent non-final placeholders. No live transactions or financial processing occur on this site.
              </p>
            </div>
          </div>
          <span className="font-badge text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/20 whitespace-nowrap">
            Academic Demo v1.0
          </span>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {customBrandName}. Prototype created with <Heart size={12} className="inline text-rose-500 fill-rose-500" /> for university assessment.</p>
          <div className="flex items-center gap-6">
            <span>Terms of Demo</span>
            <span>Privacy Prototype</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
