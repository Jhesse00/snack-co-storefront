import React from 'react';
import { BRAND_CONFIG } from '../../config/snackConfig';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-snack-dark text-white select-none z-50 relative border-b border-snack-dark/20">
      {/* Top Academic Banner */}
      <div className="bg-purple-950/80 text-purple-200 text-xs py-1.5 px-4 text-center font-medium border-b border-purple-800/40 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>{BRAND_CONFIG.academicDisclaimer}</span>
      </div>

      {/* Infinite Marquee Ticker */}
      <div className="overflow-hidden py-2.5 whitespace-nowrap bg-snack-dark flex items-center group">
        <div className="inline-flex animate-marquee group-hover:[animation-play-state:paused] items-center gap-12 font-display text-xs md:text-sm font-semibold tracking-wider text-snack-yellow">
          {BRAND_CONFIG.marqueeItems.concat(BRAND_CONFIG.marqueeItems).map((text, idx) => (
            <span key={idx} className="inline-flex items-center gap-3">
              <span>{text}</span>
              <span className="text-white/40 text-[10px]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
