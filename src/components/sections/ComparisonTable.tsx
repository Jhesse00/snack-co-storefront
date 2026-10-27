import React from 'react';
import { Check, X, ShieldCheck, Sparkles } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/snackConfig';
import { useCart } from '../../context/CartContext';
import { WavyDivider } from '../common/WavyDivider';

export const ComparisonTable: React.FC = () => {
  const { customBrandName } = useCart();

  return (
    <section id="why-us-section" className="py-20 bg-snack-warm relative overflow-hidden">
      {/* Top wavy scallop border */}
      <div className="absolute top-0 left-0 right-0">
        <WavyDivider fillColor="#FFFDF7" bgColor="transparent" height={14} flip={true} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border-2 border-snack-dark shadow-playful-sm text-xs font-display font-bold text-snack-dark">
            <Sparkles size={14} className="text-amber-500 fill-amber-500" />
            <span>INGREDIENTS WITH INTEGRITY</span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-snack-dark tracking-tight">
            HOW WE SNACK UP
          </h2>

          <p className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed">
            See how {customBrandName} compares to standard vending machine snacks. We believe delicious crunch shouldn't require cheap industrial chemicals.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="max-w-4xl mx-auto bg-white rounded-5xl border-3 border-snack-dark shadow-playful overflow-hidden">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-snack-dark text-white p-5 sm:p-6 items-center">
            <div className="col-span-5 sm:col-span-4 font-display font-bold text-xs sm:text-base tracking-wider uppercase text-gray-300">
              Snack Standard
            </div>
            <div className="col-span-4 sm:col-span-4 text-center font-display font-black text-sm sm:text-xl text-snack-yellow flex items-center justify-center gap-1.5">
              <span>★ {customBrandName}</span>
            </div>
            <div className="col-span-3 sm:col-span-4 text-center font-display font-bold text-xs sm:text-base text-gray-400">
              Standard Junk Snacks
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y-2 divide-gray-100">
            {BRAND_CONFIG.comparisonMatrix.map((row, idx) => (
              <div
                key={idx}
                className={`grid grid-cols-12 p-4 sm:p-6 items-center transition-colors ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-snack-warm/30'
                }`}
              >
                {/* Feature Label */}
                <div className="col-span-5 sm:col-span-4 font-display font-bold text-xs sm:text-base text-snack-dark">
                  {row.feature}
                </div>

                {/* Snack Co Column (Winner) */}
                <div className="col-span-4 sm:col-span-4 text-center px-2 py-1.5 rounded-2xl bg-amber-50/80 border border-amber-200">
                  <div className="flex items-center justify-center gap-1.5 font-display font-extrabold text-xs sm:text-sm text-amber-950">
                    <Check size={16} className="text-emerald-600 stroke-[3]" />
                    <span>{row.snackCo}</span>
                  </div>
                </div>

                {/* Traditional Snack Column */}
                <div className="col-span-3 sm:col-span-4 text-center px-2 py-1 text-xs sm:text-sm font-sans text-gray-500 flex items-center justify-center gap-1.5">
                  <X size={15} className="text-rose-500 stroke-[2.5] hidden sm:inline" />
                  <span>{row.traditional}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Brand Pillars Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {BRAND_CONFIG.brandPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-4xl border-2 border-snack-dark p-6 shadow-playful hover:shadow-playful-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-3xl bg-snack-warm border-2 border-snack-dark flex items-center justify-center text-3xl shadow-playful-sm mb-4">
                  {pillar.icon}
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-snack-yellow/40 text-amber-900 font-display font-bold text-[11px] mb-2 border border-amber-300">
                  {pillar.badge}
                </span>
                <h3 className="font-display font-extrabold text-xl text-snack-dark leading-snug">
                  {pillar.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-sans font-semibold text-emerald-700">
                <ShieldCheck size={14} />
                <span>Verified Quality Standard</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
